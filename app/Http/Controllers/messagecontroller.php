<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class messagecontroller extends Controller
{
    public function receivedMessages()
    {
        $user = auth()->user();
        $user2 = User::findOrFail(1);
        // Получаем отправленные сообщения
        $sentMessages = $user->sentMessages()->with(['receiver', 'sender'])->get();

        // Получаем полученные сообщения
        $receivedMessages = $user2->receivedMessages()->with(['sender', 'receiver'])->get();

        // Объединяем отправленные и полученные сообщения
        $allMessages = $sentMessages->merge($receivedMessages);

        // Сортируем сообщения по дате создания
        $sortedMessages = $allMessages->sortBy('created_at')->values()->toArray();
        // Передаем сообщения на страницу с использованием Inertia
        return Inertia::render('message/MyMessages', [
            'users' => User::all(),
            'messages' => $sortedMessages,
        ]);
    }
    public function store(Request $request)
    {
        // Валидируем данные
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id', // Проверяем, что получатель существует
            'content' => 'required|string|min:1', // Проверяем, что сообщение не пустое
        ]);
        $userId = Auth::id();
        // Сохраняем сообщение
        $message = new Message();
        $message->sender_id = $userId; // предполагаем, что пользователь авторизован
        $message->receiver_id = $validated['receiver_id'];
        $message->content = $validated['content'];
        $message->save();

        // Возвращаем успешный ответ
        return response()->json(['message' => 'Сообщение отправлено успешно!'], 200);
    }
}
