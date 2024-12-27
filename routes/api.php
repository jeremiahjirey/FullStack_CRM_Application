<?php

use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\DivisionController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\UpdatePassword;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// USER API ROUTING
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// DIVISION API ROUTING
Route::get('/divisions',[DivisionController::class,'index']);
Route::get('/divisions/{id}', [DivisionController::class, 'show']);
Route::post('/divisions', [DivisionController::class, 'store']);
Route::put('/divisions/{id}', [DivisionController::class, 'update']);
Route::delete('/divisions/{id}', [DivisionController::class, 'destroy']);

// EMPLOYEE API ROUTING
Route::get('/employees',[EmployeeController::class,'index']);
Route::get('/employees/{id}', [EmployeeController::class, 'show']);
Route::post('/employees', [EmployeeController::class, 'store']);
Route::put('/employees/{id}', [EmployeeController::class, 'update']);
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);

// Companys API ROUTING
Route::get('/company',[CompanyController::class,'index']);
Route::get('/company/{id}', [CompanyController::class, 'show']);
Route::post('/company', [CompanyController::class, 'store']);
Route::post('/company/{id}', [CompanyController::class, 'update']);
Route::delete('/company/{id}', [CompanyController::class, 'destroy']);

Route::post('/login',[LoginController::class,'Authlogin']);

Route::post('/check/{id}',[UpdatePassword::class,'CheckPass']);
Route::put('/update-pass/{id}',[UpdatePassword::class,'updatePass']);

