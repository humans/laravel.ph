<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class RegistrationController
{
    public function create()
    {
        return inertia('registration/create', [
            'links' => [
                'store_path' => route('registration.store'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        // $request->validate([
        //     'full_name' => ['required'],
        //     'email' => ['required', 'email'],
        //     'password' => Password::default(),
        // ]);

        User::create([
            'full_name' => $request->input('full_name'),
            'username'  => $request->input('username'),
            'email'     => $request->input('email'),
            'password'  => bcrypt($request->input('password')),
        ]);
    }
}
