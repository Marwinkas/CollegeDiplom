<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Like;
use App\Models\Songs;
use App\Models\Subscriber;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
class MusicController extends Controller
{
    // Метод для отображения страницы и списка песен
    public function index()
    {
        $songs = Songs::orderBy('created_at', 'desc')->get();
        return Inertia::render('Music', [
            'songs' => $songs,
        ]);
    }
public function dashboard(Request $request)
{
    $search = $request->input('search');

    // Основные карточки (новые)
    $cardsQuery = Card::with('user')->orderBy('created_at', 'desc');

    if ($search) {
        $cardsQuery->where(function ($query) use ($search) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        });
    }

    $cards = $cardsQuery->get();
    $randomCardIds = $cards->pluck('id');

    // Популярные карточки
    $cards2Query = Card::with('user')->withCount('likes')
                      ->orderByDesc('likes_count')->take(10);

    if ($search) {
        $cards2Query->where(function ($query) use ($search) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        });
    }

    $cards2 = $cards2Query->get();
    $randomCardIds2 = $cards2->pluck('id');

    $user = Auth::user();
    $likedCardIds = [];
    $likedCardIds2 = [];

    if ($user) {
        $likedCardIds = Like::where('user_id', $user->id)
            ->whereIn('card_id', $randomCardIds)
            ->pluck('card_id')
            ->toArray();

        $likedCardIds2 = Like::where('user_id', $user->id)
            ->whereIn('card_id', $randomCardIds2)
            ->pluck('card_id')
            ->toArray();
    }

    $cards->transform(function ($card) use ($likedCardIds) {
        $card->liked = in_array($card->id, $likedCardIds);
        return $card;
    });

    $cards2->transform(function ($card2) use ($likedCardIds2) {
        $card2->liked = in_array($card2->id, $likedCardIds2);
        return $card2;
    });

    return Inertia::render('dashboard', [
        'cards' => $cards,
        'cards2' => $cards2,
        'search' => $search,
    ]);
}

public function cardviewer($id)
{
    $card = Card::with('user')->findOrFail($id);

    $comments = $card->comments()
        ->with('user')
        ->latest()
        ->get();

    $user = Auth::user();
    $userId = $user ? $user->id : null;

    $recentCards = Card::where('user_id', $card->user->id)
        ->latest()
        ->take(5)
        ->get();

    $randomCards = Card::with('user')->where('id', '!=', $card->id)
        ->inRandomOrder()
        ->take(56)
        ->get();

    $likedCardIds = [];
    $like = null;
    $subscribe = null;
    if ($userId) {
        $allCardIds = $recentCards->pluck('id')->merge($randomCards->pluck('id'))->unique();

        $likedCardIds = Like::where('user_id', $userId)
            ->whereIn('card_id', $allCardIds)
            ->pluck('card_id')
            ->toArray();

        $like = Like::where('user_id', $userId)
            ->where('card_id', $id)
            ->first();

        $subscribe = Subscriber::where('user_id', $userId)
            ->where('target_user_id', $card->user->id)
            ->first();
    }

    $recentCards->transform(function ($card) use ($likedCardIds) {
        $card->liked = in_array($card->id, $likedCardIds);
        return $card;
    });

    $randomCards->transform(function ($card) use ($likedCardIds) {
        $card->liked = in_array($card->id, $likedCardIds);
        return $card;
    });

    $count = Like::where('card_id', operator: $id)->count();
     $count2 = Subscriber::where('target_user_id', $card->user->id)->count();
    return Inertia::render('CardPage', [
        'card' => $card,
        'recentCards' => $recentCards,
        'comments' => $comments,
        'randomCards' => $randomCards,
        'count' => $count,
        'like' => $like,
        'subscriber' => $subscribe,
        'subscribercount' => $count2
    ]);
}


public function profileviewer($id)
{
    $card = Card::with('user')->findOrFail($id);

    $user = Auth::user();
    $userId = $user ? $user->id : null;

    $recentCards = Card::where('user_id', $id   )->with('user')->get();

    // Получаем id карточек из recentCards и randomCards
    $recentCardIds = $recentCards->pluck('id');
    // Получаем лайки пользователя по всем этим карточкам
    $likedCardIds = $userId
        ? Like::where('user_id', $userId)
            ->whereIn('card_id', $recentCardIds)
            ->pluck('card_id')
            ->toArray()
        : [];

    // Добавляем liked к recentCards
    $recentCards->transform(function ($card) use ($likedCardIds) {
        $card->liked = in_array($card->id, $likedCardIds);
        return $card;
    });
    $subscribe = Subscriber::where('user_id', $userId)
            ->where('target_user_id', $card->user->id)
            ->first();
 $count2 = Subscriber::where('target_user_id', $card->user->id)->count();
    return Inertia::render('Profile', [
        'recentCards' => $recentCards,
                'subscriber' => $subscribe,
        'subscribercount' => $count2
    ]);
}
    // Метод для загрузки новой песни
    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'title' => 'required|string',
        ]);

        // Get the uploaded file
        $file = $request->file('audio');

        if ($file && $file->isValid()) {
            // Define the path where you want to save the file in the public folder
            $destinationPath = public_path('music');
            $fileName = time() . '.' . $file->getClientOriginalExtension(); // Unique file name

            // Move the uploaded file to the public/music directory
            $file->move($destinationPath, $fileName);

            // Get the public URL for the stored file
            $url = asset('music/' . $fileName);

            // Store the song details in the database
            Songs::create([
                'title' => $request->input('title'),
                'user_id' => Auth::user(),
                'url' => $url,
            ]);

            return Inertia::location(route('music'));
        } else {
            return response()->json(['message' => 'Ошибка при загрузке файла.'], 400);
        }
    }
    public function dashstore(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'count' => 'required|integer|min:1',
        ]);

        $count = (int) $request->input('count');

        // Создание уникальной папки с меткой времени
        $timestamp = time();
        $folderName = "file/{$timestamp}";
        $destinationPath = public_path($folderName);

        // Сохраняем все файлы в эту папку
        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0777, true);
        }

        // Массив для хранения путей к файлам
        $imgUrls = [];
        $audioUrls = [];
        $videoUrls = [];

        // Обрабатываем каждый файл
        for ($i = 0; $i < $count; $i++) {
            $file = $request->file("files.$i");

            if ($file && $file->isValid()) {
                $fileExtension = $file->getClientOriginalExtension();
                $fileId = uniqid(); // Генерация уникального идентификатора для файла

                // Обработка изображений (например, .jpg, .jpeg, .png)
                if (in_array($fileExtension, ['jpg', 'jpeg', 'png', 'gif'])) {
                    $fileName = "{$fileId}_img." . $fileExtension;
                    $file->move($destinationPath, $fileName);
                    $imgUrls[] = asset($folderName . '/' . $fileName);
                }
                // Обработка аудио (например, .mp3, .wav)
                elseif (in_array($fileExtension, ['mp3', 'wav', 'ogg'])) {
                    $fileName = "{$fileId}_audio." . $fileExtension;
                    $file->move($destinationPath, $fileName);
                    $audioUrls[] = asset($folderName . '/' . $fileName);
                }
                // Обработка видео (например, .mp4, .avi, .mov)
                elseif (in_array($fileExtension, ['mp4', 'avi', 'mov'])) {
                    $fileName = "{$fileId}_video." . $fileExtension;
                    $file->move($destinationPath, $fileName);
                    $videoUrls[] = asset($folderName . '/' . $fileName);
                }
            }
        }

        // Записываем URL к папке и файлам в базу данных
        Card::create([
            'title' => $request->input('title'),
            'user_id' => Auth::user()->id,
            'imgurl' => implode(',', $imgUrls),   // Массив URL изображений
            'videourl' => implode(',', $videoUrls), // Массив URL видео
            'audiourl' => implode(',', $audioUrls), // Массив URL аудио
        ]);

        return Inertia::location(route('dashboard'));
    }
    public function toggleLike($cardId)
    {
        $user = Auth::user();

        $like = Like::where('user_id', $user->id)->where('card_id', $cardId)->first();

        if ($like) {
            $like->delete();
            return response()->json(['liked' => false, 'likes_count' => Like::where('card_id', $cardId)->count()]);
        } else {
            Like::create([
                'user_id' => $user->id,
                'card_id' => $cardId,
            ]);
            return redirect()->back();
        }
    }
public function toggleSubscription($targetUserId)
{
    
    $user = Auth::user();
    if (!$user) {
        return response()->json(['error' => 'Пользователь не аутентифицирован.'], 401);
    }
    if ($user->id == $targetUserId) {
        return response()->json(['error' => 'Нельзя подписаться на самого себя.'], 400);
    }

    $subscription = Subscriber::where('user_id', $user->id)
                                ->where('target_user_id', $targetUserId)
                                ->first();

    if ($subscription) {
        $subscription->delete();
        return redirect()->back();
    } else {
        Subscriber::create([
            'user_id' => $user->id,
            'target_user_id' => $targetUserId,
        ]);
        return redirect()->back();
    }
}

}
