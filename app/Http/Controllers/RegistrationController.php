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
            'username' => [
                'required',
                'min:5',
                'max:32',
                Rule::unique('users', 'username'),
                'regex:/^[a-z1-9_\.]+$/i',
                function ($attribute, $value, $fail) {
                    if (! preg_match('/^[a-z][a-z1-9_.]+/', $value)) {
                        $fail('The username must start with a letter.');
                    }
                },
            ],
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
            'username.unique' => __('The username [:username] has already been taken.', [
                'username' => $request->input('username'),
            ]),
            'username.regex' => 'The username can only have alphanumeric characters, underscores, and periods. The username must start with a letter.',
        ]);

        User::create([
            'full_name' => $request->input('full_name'),
            'username'  => $request->input('username'),
            'email'     => $request->input('email'),
            'password'  => bcrypt($request->input('password')),
        ]);
    }
}
