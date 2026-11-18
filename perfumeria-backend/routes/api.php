<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;

Route::prefix('v1')->group(function () {

    // Rutas públicas
    Route::post('/auth/login', [AuthController::class, 'login'])
        ->middleware('throttle:5,1');

    // Rutas protegidas
    Route::middleware('api.auth')->group(function () {

        Route::get('/auth/me', [AuthController::class, 'me']);

        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Ruta temporal para probar permisos
        Route::get('/security/permission-check', function () {
            return response()->json([
                'message' => 'Permiso validado correctamente.'
            ]);
        })->middleware('permission:USUARIO.LEER');
        
        // Módulo de categorías
        Route::prefix('categories')
            ->middleware('permission:PRODUCTO.LEER')
            ->group(function () {

                Route::get('/', [CategoryController::class, 'index']);
                Route::get('/{id}', [CategoryController::class, 'show']);

                Route::post('/', [CategoryController::class, 'store'])
                    ->middleware('permission:PRODUCTO.GESTIONAR');

                Route::put('/{id}', [CategoryController::class, 'update'])
                    ->middleware('permission:PRODUCTO.GESTIONAR');

                Route::delete('/{id}', [CategoryController::class, 'destroy'])
                    ->middleware('permission:PRODUCTO.GESTIONAR');
            });

    });
});

