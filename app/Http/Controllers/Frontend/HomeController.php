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
        $role = $user->role;
        $user_wallet = $user->wallet;

        if ($role === 'finance') {
            //finance
            //ambil semua data payment paling baru, berdasar data wallet yang saat ini aktif.
            //cek apakah data payment memiliki WalletMutation
            //cek juga apakah WalletMutation memiliki id_wallet yang sama dengan id wallet yang saat ini aktif.
            //sehingga data payment yang muncul adalah data yang payment yang dimiliki oleh wallet tersebut karena terhungung dengan WalletMutations 
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
                        'notes' => $payment->notes,
                        'total_amount' => $payment->total_amount,
                        'paid_at' => $payment->paid_at?->format('d M Y'),
                        'users' => $payment->walletMutations->map(fn($m) => $m->user->fullname),
                    ];
                }),
            ]);
        }
        
        if ($role === 'user') {
            //user
            //ambil semua data payment dan wallet yang sesuai dengan user_id dari user yang aktif saja.
            $payments = Payment::where('user_id', $user->id)
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
                        'notes' => $payment->notes,
                        'total_amount' => $payment->total_amount,
                        'paid_at' => $payment->paid_at?->format('d M Y'),
                        'users' => $payment->user->fullname,
                    ];
                }),
            ]);
        }
        
    }
}
