<?php


use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['prefix' => 'api'], function () {
    Route::get('/categories', [CategoryController::class, 'fetchCategories']);
});

