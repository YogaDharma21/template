<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NewPasswordController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            // 'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.

        // $status = Password::reset(
        //     $request->only('email', 'password', 'password_confirmation', 'token'),
        //     function ($user) use ($request) {
        //         $user->forceFill([
        //             'password' => Hash::make($request->string('password')),
        //             'remember_token' => Str::random(60),
        //         ])->save();

        //         event(new PasswordReset($user));
        //     }
        // );

        // if ($status != Password::PASSWORD_RESET) {
        //     throw ValidationException::withMessages([
        //         'email' => [__($status)],
        //     ]);
        // }

        // return response()->json(['status' => __($status)]);
    }
}
