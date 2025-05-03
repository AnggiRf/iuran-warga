<?php
 
namespace App\Http\Controllers\Frontend;
 
use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\User;
use App\Models\Wallet;

class HomeController extends Controller
{
    public function home()
    {
        $user = \Auth::user();
        $finance = User::where('role', 'finance')->firstOrFail();
        $role = $user->role;
        $user_wallet = $finance->wallet;

        $payments = Payment::whereHas('walletMutations', function ($query) use ($user_wallet) { 
            $query->where('wallet_id', $user_wallet->id);
        })
        ->with(['walletMutations.user'])
        ->where('status', 'paid')
        ->latest()
        ->take(10)
        ->get();

        return inertia('Home/index', [
            'user' => $user,
            'wallet' => [
                'balance' => $user_wallet->balance,
                'total_in' => $user_wallet->total_in,
                'total_out' => $user_wallet->total_out,
            ],
            'recent_payments' => $payments->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'photo' => $payment->photo,
                    'total_amount' => $payment->total_amount,
                    'paid_at' => $payment->paid_at?->format('d M Y'),
                    'fullname' => $payment->walletMutations->first()?->user->fullname,
                ];
            }),
        ]);
        
    }
}
