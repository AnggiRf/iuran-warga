<?php
 
namespace App\Http\Controllers\Frontend;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\WalletMutation;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function report(Request $request)
    {
        $user = \Auth::user();
        $finance = User::where('role', 'finance')->firstOrFail();
        $financeWallet = $finance->wallet;

        $startDate = $request->start_date;
        $endDate = $request->end_date;

        $start = $startDate ? Carbon::parse($startDate)->startOfDay() : null;
        $end = $endDate ? Carbon::parse($endDate)->endOfDay() : null;

        $mutationQuery = WalletMutation::with('user')
            ->where('wallet_id', $financeWallet->id);

        if ($start && $end) {
            $mutationQuery->whereBetween('created_at', [$start, $end]);
        }

        if ($start && $end) {
            $totalIn = (clone $mutationQuery)->where('type', 'in')->sum('amount');
            $totalOut = (clone $mutationQuery)->where('type', 'out')->sum('amount');
            $balance = $totalIn - $totalOut;
            
        }else{
            $totalIn = $financeWallet->total_in;
            $totalOut = $financeWallet->total_out;
            $balance = $financeWallet->balance;
        }
        
        $mutations = $mutationQuery
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        return inertia('Report/index', [
            'wallet' => [
                'balance' => $balance,
                'total_in' => $totalIn,
                'total_out' => $totalOut,
            ],
            'mutations' => $mutations,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]
        ]);    
    }
}
