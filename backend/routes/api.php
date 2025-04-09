<?php

use App\Http\Controllers\Auth;
use Illuminate\Auth\Events\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', Auth\LoginController::class);
    Route::post('/register', Auth\RegisterController::class);
    Route::post('/logout', Auth\LogoutController::class)->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
