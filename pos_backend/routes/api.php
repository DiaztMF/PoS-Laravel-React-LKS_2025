<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);

    Route::apiResource('categories', CategoryController::class)->except('show');
    Route::apiResource('products', ProductController::class)->except('show');
    Route::apiResource('sales', SaleController::class)->except('update');

    Route::get('/sales-details/{sale_id}', [SaleController::class, 'details']);
});
