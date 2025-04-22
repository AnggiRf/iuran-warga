<?php
 
namespace App\Http\Controllers\Frontend;
 
use App\Http\Controllers\Controller;
 
class ReportController extends Controller
{
    public function report()
    {
        $user = \Auth::user();
    
        $wallet = $user->wallet;
        return inertia('Report/index');
    }
}
