<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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
        $request->validate([
            'full_name' => ['required', 'max:255'],
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email'),
            ],
            'password' => ['required', Password::default(), 'confirmed'],
        ], [
            'email.unique' => __('The email address [:email] has already been taken.', [
                'email' => $request->input('email'),
            ]),
        ]);

        User::create([
            'full_name' => $request->input('full_name'),
            'username'  => $request->input('username'),
            'email'     => $request->input('email'),
            'password'  => bcrypt($request->input('password')),
        ]);
    }
}
