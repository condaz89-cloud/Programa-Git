<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

// Página principal de Perfumería
Route::get('/', function () {
    return view('welcome');
});

// Prueba de conexión a la base de datos
Route::get('/db-check', function () {
    DB::connection()->getPdo();

    return 'Conexión a MySQL exitosa';
});