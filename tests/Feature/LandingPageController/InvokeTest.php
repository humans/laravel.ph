<?php

declare(strict_types=1);

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia;

it('shows the landing page', function () {
    test()->get(route('landing'))->assertInertia(fn (AssertableInertia $page) => $page
        ->component('landing')
    );
});
