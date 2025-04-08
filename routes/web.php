<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\messagecontroller;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\ImageController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/musics', [MusicController::class, 'index'])->name('music');
    Route::post('/musics', [MusicController::class, 'store'])->name('music.post');

    Route::get('/videos', [VideoController::class, 'index'])->name('video');
    Route::post('/videos', [VideoController::class, 'store'])->name('video.post');

    
    Route::get('/images', [ImageController::class, 'index'])->name('image');
    Route::post('/images', [ImageController::class, 'store'])->name('images.post');

    Route::get('/dashboard', [MusicController::class, 'dashboard'])->name('dashboard');
    Route::get('/dashboard/{id}', [MusicController::class, 'cardviewer']);
    Route::post('/dashboard', [MusicController::class, 'dashstore'])->name('dashboard.post');
    
    Route::get('message', [messagecontroller::class, 'receivedMessages'])
    ->name('message');
    Route::post('/messages', [MessageController::class, 'store']);

    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');

});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/friends', [FriendController::class, 'index'])->name('friends.index');
    Route::post('/friends/request/{friendId}', [FriendController::class, 'sendRequest'])->name('friends.request');
    Route::post('/friends/accept/{id}', [FriendController::class, 'acceptRequest'])->name('friends.accept');
    Route::post('/friends/decline/{id}', [FriendController::class, 'declineRequest'])->name('friends.decline');
    Route::post('/friends/send/{friendId}', [FriendController::class, 'sendRequest']);
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
