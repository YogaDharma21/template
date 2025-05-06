<?php

use App\Http\Controllers\Auth;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', Auth\LoginController::class)
        ->middleware('guest')
        ->name('auth.login');

    Route::post('/register', Auth\RegisterController::class)
        ->middleware('guest')
        ->name('auth.register');

    Route::post('/forgot-password', Auth\PasswordResetLinkController::class)
        ->middleware('guest')
        ->name('password.email');

    Route::post('/reset-password', Auth\NewPasswordController::class)
        ->middleware('guest')
        ->name('password.store');

    Route::post('/logout', Auth\LogoutController::class)->middleware('auth:sanctum')->name('auth.logout');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [UserController::class, 'show'])->name('auth.profile');
});
