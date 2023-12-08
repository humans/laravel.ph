<?php

declare(strict_types=1);

namespace Tests\Feature\RegistrationController;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use function Pest\Laravel\assertDatabaseCount;

it('creates a new user', function () {
    assertDatabaseCount('users', 0);

    register([
        'full_name'             => 'Some really long but valid full name',
        'username'              => 'some.valid.user_name123',
        'email'                 => 'this.is.a.valid.email@laravel.ph',
        'password'              => 'a safe and secure valid password 123 $$$ @',
        'password_confirmation' => 'a safe and secure valid password 123 $$$ @',
    ]);

    assertDatabaseCount('users', 1);

    expect($user = User::first())
        ->full_name->toBe('Some really long but valid full name')
        ->email->toBe('this.is.a.valid.email@laravel.ph');

    expect(Hash::check('a safe and secure valid password 123 $$$ @', $user->password))
        ->toBeTrue();
});

it('validates the data', function ($attribute, $value, $message) {
    register([
        $attribute => $value,
    ])->assertInvalid([
        $attribute => $message,
    ]);
})->with([
    'full_name is required'                      => ['full_name', null, 'The full name field is required.'],
    'full_name must be less than 255 characters' => ['full_name', Str::random(300), 'The full name field must not be greater than 255 characters.'],
    'username is required'                       => ['username', null, 'The username field is required.'],
    'username is at least 5 characters'          => ['username', 'smol', 'The username field must be at least 5 characters.'],
    'username is less than 32 characters'        => ['username', Str::random(33), 'The username field must not be greater than 32 characters.'],
    'email is required'                          => ['email', null, 'The email field is required.'],
    'email is a valid email'                     => ['email', 'not an email', 'The email field must be a valid email address.'],
    'password is required'                       => ['password', null, 'The password field is required.'],
    'password is at least 8 characters'          => ['password', 'short', 'The password field must be at least 8 characters.'],
]);

it('validates that the email address is unique', function () {
    User::factory()->create([
        'email' => 'existing.email@laravel.ph',
    ]);

    register([
        'email' => 'existing.email@laravel.ph',
    ])->assertInvalid([
        'email' => 'The email address [existing.email@laravel.ph] has already been taken.',
    ]);
});

it('validates that the username is unique', function () {
    User::factory()->create([
        'username' => 'unique.username',
    ]);

    register([
        'username' => 'unique.username',
    ])->assertInvalid([
        'username' => 'The username [unique.username] has already been taken.',
    ]);
});

it("validates the username", function ($username) {
    register([
        'username' => $username
    ])->assertInvalid([
        'username' => 'The username can only have alphanumeric characters, underscores, and periods.',
    ]);
})->with([
    'white space',
    'dollar$sign',
    'at@sign',
    'da-sh',
]);

it("should validate that the first character is always a letter", function ($letter) {
    register([
        'username' => $letter.'valid.username',
    ])->assertInvalid([
        'username' => 'The username must start with a letter.',
    ]);
})->with([
    '.',
    '_',
    '1',
]);

it('validates that the password is confirmed', function () {
    register([
        'password' => 'this is a valid secure p@ssword 123',
        'password_confirmation' => 'not the same',
    ])->assertInvalid([
        'password' => 'The password field confirmation does not match.',
    ]);
});

function register($attributes = [])
{
    return test()->post(route('registration.store'), [
        'full_name'             => 'Some Full Name',
        'username'              => 'some.username',
        'email'                 => 'some.email@laravel.ph',
        'password'              => 'a secure valid password 123 $$$ @',
        'password_confirmation' => 'a secure valid password 123 $$$ @',
        ...$attributes,
    ]);
}
