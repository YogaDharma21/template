<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return request()->json([
        'message' => 'success'
    ]);
});
