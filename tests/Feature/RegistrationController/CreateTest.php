<?php

declare(strict_types=1);

namespace Tests\Feature\RegistrationController;

use Inertia\Testing\AssertableInertia;

it('shows the registration page', function () {
    test()->get(route('registration.create'))->assertInertia(fn (AssertableInertia $page) => $page
        ->component('registration/create')
        ->has('links')
    );
});
