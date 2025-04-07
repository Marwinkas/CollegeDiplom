<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Songs;
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
    public function dashboard()
    {
        $cards = Card::orderBy('created_at', 'desc')->get();

        $cards = $cards->map(function ($card) {
            $folderPath = public_path(parse_url($card->imgurl, PHP_URL_PATH)); // путь к папке на сервере

            $files = [];
            if (is_dir($folderPath)) {
                $fileNames = scandir($folderPath);
                foreach ($fileNames as $fileName) {
                    if ($fileName !== '.' && $fileName !== '..') {
                        $files[] = asset(parse_url($card->imgurl, PHP_URL_PATH) . '/' . $fileName);
                    }
                }
            }

            $card->files = $files;
            return $card;
        });

        return Inertia::render('dashboard', [
            'cards' => $cards,
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
                'author' => Auth::user()->name,
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
            'author' => Auth::user()->name ?? $request->input('author'),
            'imgurl' => implode(',', $imgUrls),   // Массив URL изображений
            'videourl' => implode(',', $videoUrls), // Массив URL видео
            'audiourl' => implode(',', $audioUrls), // Массив URL аудио
        ]);

        return Inertia::location(route('dashboard'));
    }

}
