<?php
 
namespace App\Http\Controllers\Frontend;
 
use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Wallet;

class HomeController extends Controller
{
    public function home()
    {
        $user = \Auth::user();
    
        $wallet = $user->wallet;

        $payments = Payment::whereHas('walletMutations', function ($query) use ($wallet) {
            $query->where('wallet_id', $wallet->id);
        })
        ->with(['walletMutations.user'])
        ->where('status', 'paid')
        ->latest()
        ->take(10)
        ->get();

        return inertia('Home/index', [
            'user' => $user,
            'wallet' => [
                'balance' => $wallet->balance,
                'total_in' => $wallet->total_in,
                'total_out' => $wallet->total_out,
            ],
            'recent_payments' => $payments->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'notes' => $payment->notes,
                    'total_amount' => $payment->total_amount,
                    'paid_at' => $payment->paid_at?->format('d M Y H:i'),
                    'users' => $payment->walletMutations->map(fn($m) => $m->user->fullname),
                ];
            }),
        ]);
    }
}
