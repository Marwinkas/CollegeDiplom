<?php

// app/Http/Controllers/FriendController.php

namespace App\Http\Controllers;

use App\Models\Friendship;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FriendController extends Controller
{
    public function index()
    {
        $user = Auth::user();
    
        $friends = $user->friends()->get();
        $requests = $user->friendRequests()->with('user')->get();
    
        // Исключаем себя, друзей и тех, кому уже отправлены заявки
        $excludedIds = $friends->pluck('id')
            ->merge($requests->pluck('user_id'))
            ->merge([$user->id])
            ->unique();
    
        $otherUsers = User::whereNotIn('id', $excludedIds)->get();
    
        return Inertia::render('Friends', [
            'friends' => $friends,
            'requests' => $requests,
            'otherUsers' => $otherUsers,
        ]);
    }

    public function sendRequest($friendId)
    {
        $user = Auth::user();

        if ($user->id == $friendId) {
            return back()->withErrors(['friend_id' => 'Нельзя добавить себя.']);
        }

        Friendship::firstOrCreate([
            'user_id' => $user->id,
            'friend_id' => $friendId,
        ]);

        return redirect()->back();
    }

    public function acceptRequest($id)
    {
        $request = Friendship::where('id', $id)
            ->where('friend_id', Auth::id())
            ->firstOrFail();

        $request->update(['status' => 'accepted']);

        // Создать обратную связь (в обе стороны)
        Friendship::firstOrCreate([
            'user_id' => Auth::id(),
            'friend_id' => $request->user_id,
        ], [
            'status' => 'accepted',
        ]);

        return redirect()->back();
    }

    public function declineRequest($id)
    {
        $request = Friendship::where('id', $id)
            ->where('friend_id', Auth::id())
            ->firstOrFail();

        $request->update(['status' => 'declined']);

        return redirect()->back();
    }
}
