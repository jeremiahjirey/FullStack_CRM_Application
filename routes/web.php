<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route Login
Route::get('/login', function () {
    return Inertia::render('Login');
});


// Route Show data
Route::get('/', function () {
    return Inertia::render('Dashboard');
}); 
Route::get('data/users', function () {
    return Inertia::render('Users');
});
Route::get('data/employees', function () {
    return Inertia::render('Employees');
});
Route::get('data/divisions', function () {
    return Inertia::render('Divisions');
});
Route::get('data/companyes', function () {
    return Inertia::render('Companyes');
});

// Route Profile
Route::get('user/profile', function () {
    return Inertia::render('Profile');
});


// Route Edit
Route::get('data/edit/user', function () {
    return Inertia::render('edit/EditUser');
});
Route::get('data/edit/company', function () {
    return Inertia::render('edit/EditCompany');
});
Route::get('data/edit/division', function () {
    return Inertia::render('edit/EditDivision');
});
Route::get('data/edit/employee', function () {
    return Inertia::render('edit/EditEmployes');
});

// Route Add Data
Route::get('add-data/user', function () {
    return Inertia::render('add/AddUser');
});
Route::get('add-data/company', function () {
    return Inertia::render('add/AddCompany');
});
Route::get('add-data/division', function () {
    return Inertia::render('add/AddDivision');
});
Route::get('add-data/employee', function () {
    return Inertia::render('add/AddEmployes');
});
