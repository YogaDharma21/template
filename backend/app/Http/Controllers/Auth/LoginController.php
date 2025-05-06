<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Exception;

class LoginController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            try {
                $validated = $request->validate([
                    'email' => 'required|email',
                    'password' => 'required|string|min:8',
                    'device_name' => 'required|string',
                ]);
            } catch (ValidationException $e) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $e->errors(),
                ], 422);
            }

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'message' => 'Authentication failed',
                    'errors' => ['email' => ['No user found with this email']],
                ], 404);
            }

            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Authentication failed',
                    'errors' => ['password' => ['Invalid password']],
                ], 401);
            }

            try {
                $token = $user->createToken($request->device_name, ['*'], now()->addMinutes(config('sanctum.expiration')))->plainTextToken;

                return response()->json([
                    'token' => $token,
                    'expires_in' => config('sanctum.expiration') * 60,
                    'user' => $user
                ]);
            } catch (Exception $e) {
                return response()->json([
                    'message' => 'Token generation failed',
                    'errors' => ['token' => ['Could not create access token']],
                ], 500);
            }

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Server error',
                'errors' => ['server' => [$e->getMessage()]],
            ], 500);
        }
    }
}
