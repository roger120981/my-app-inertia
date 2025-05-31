<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::resource('users', App\Http\Controllers\UsersController::class);
    Route::resource('case-managers', App\Http\Controllers\CaseManagersController::class);
    Route::resource('participants', App\Http\Controllers\ParticipantsController::class);
    Route::resource('caregivers', App\Http\Controllers\CaregiversController::class);
    Route::get('services', [App\Http\Controllers\ServicesController::class, 'index'])->name('services.index');
    Route::get('agencies', [App\Http\Controllers\AgenciesController::class, 'index'])->name('agencies.index');
});

Route::inertiaTable();

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
