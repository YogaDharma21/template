<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', function (Request $request) {
    return response()->json([
        'halo' => 'halo',
        'data' => $request->all(),
        'status' => 200,
        'time' => time(),
    ]);
});
