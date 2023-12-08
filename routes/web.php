<?php

declare(strict_types=1);

use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::get('/', LandingPageController::class)->name('landing');
Route::get('register', [RegistrationController::class, 'create'])->name('registration.create');
Route::post('register', [RegistrationController::class, 'store'])->name('registration.store');
