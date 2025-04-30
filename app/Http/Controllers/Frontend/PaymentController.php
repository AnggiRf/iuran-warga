<?php

namespace App\Http\Controllers\FrontEnd;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function payment() {
        return inertia('Payment/index');
    }

    public function paymentQR() {
        return inertia('PaymentQR/index');
    }

    public function paymentSuccess() {
        return inertia('PaymentSuccess/index');
    }
}
