<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            "name" => "required|string|min:3|max:20|unique:users,name",
            "email" => "required|email|unique:users,email",
            "password" => "required|string|min:8|confirmed",
            "device_name" => "required|string",
        ]);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password),
        ]);

        $token = $user->createToken($request->device_name)->plainTextToken;

        return response()->json([
            "user" => $user,
            "token" => $token,
        ], 201);
    }
}
