<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Frontend\LoginController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\ProfileController;
use App\Http\Controllers\Frontend\ReportController;
use App\Http\Controllers\Frontend\MemberController;
use App\Http\Controllers\FrontEnd\PaymentController;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'login']);
    Route::post('/login', [LoginController::class, 'loginPost']);
    Route::get('/login/otp', [LoginController::class, 'loginOtp']);
    Route::post('/login/otp', [LoginController::class, 'loginOtpPost']);
});

Route::middleware('auth')->group(function () {
    Route::get('/home', [HomeController::class, 'home']);
    Route::get('/profile', [ProfileController::class, 'profile']);
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::get('/report', [ReportController::class, 'report']);
    Route::get('/payment', [PaymentController::class, 'payment']);
    Route::get('/payment/qr', [PaymentController::class, 'paymentQR']);
    Route::get('/payment/success', [PaymentController::class, 'paymentSuccess']);
    Route::get('/members', [MemberController::class, 'members'])->middleware('role:admin,finance');
});
