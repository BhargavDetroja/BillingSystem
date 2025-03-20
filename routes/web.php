<?php


use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Business\BusinessProfileController;
use App\Http\Controllers\PartyController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource("transports", TransportController::class);
    Route::resource("parties", PartyController::class);
    Route::get('/cities-by-state/{stateId}', [PartyController::class, 'getCitiesByStateId']);
});

Route::resource('business',BusinessProfileController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/api.php';
