<?php


use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GeneralController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['prefix' => 'api'], function () {
    Route::get('/categories', [CategoryController::class, 'fetchCategories']);
    Route::get('/states', [GeneralController::class, 'getAllStates']);
    Route::post('/cities', [GeneralController::class, 'getCitiesByState']);
});

