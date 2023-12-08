<?php

namespace Tests\Feature\RegistrationController;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;
use function PHPUnit\Framework\assertTrue;

it("creates a new user", function () {
    assertDatabaseCount('users', 0);

    register([
        'full_name'             => 'Some really long but valid full name',
        'username'              => 'some.valid.username',
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

function register($attributes = [])
{
    return test()->post(route('registration.store'), [
        ...$attributes,
    ]);
}
