<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PasswordResetLinkController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.

        // $status = Password::sendResetLink(
        //     $request->only('email')
        // );

        // if ($status != Password::RESET_LINK_SENT) {
        //     throw ValidationException::withMessages([
        //         'email' => [__($status)],
        //     ]);
        // }

        // return response()->json(['status' => __($status)]);
    }
}
