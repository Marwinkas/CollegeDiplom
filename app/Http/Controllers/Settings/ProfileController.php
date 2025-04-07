<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(Request $request)
    {
        dd($request->hasFile('photo'));
        // Валидируем входящие данные
        $request->validate([
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    
        // Получаем текущего аутентифицированного пользователя
        $user = Auth::user();
    
        // Если файл передан в запросе, обрабатываем его
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            
            // Убедитесь, что файл загружен
            if (!$photo->isValid()) {
                return back()->withErrors(['photo' => 'Файл не валиден.']);
            }
        
            // Сохраните файл с явным именем для проверки
            $photoPath = $photo->storeAs('img', 'test.jpg', 'public');
            dd($photoPath); // Проверьте вывод пути
        } else {
            // Если файл не загружен, сохраняем существующий путь
            $photoPath = $user->photo;
        }
    
        // Обновляем данные пользователя, сохраняя путь к фото
        try {
            $user->update(['photo' => $photoPath]);
        } catch (\Exception $e) {
            dd($e->getMessage()); // Выведет ошибку, если она есть
        }
    
        // Напоминаем: для доступа к файлам через браузер необходимо создать символическую ссылку,
        // выполнив команду: php artisan storage:link
    
        // Перенаправляем обратно на страницу редактирования профиля
        return to_route('profile.edit');
    }
    
    
    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
