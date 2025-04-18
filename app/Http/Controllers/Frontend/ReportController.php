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

        $mutations = WalletMutation::with('user')
            ->where('wallet_id', $financeWallet->id)
            ->when($start && $end, function ($query) use ($start, $end) {
                $query->whereBetween('created_at', [$start, $end]);
            })
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        return inertia('Report/index', [
            'wallet' => [
                'balance' => $financeWallet->balance,
                'total_in' => $financeWallet->total_in,
                'total_out' => $financeWallet->total_out,
            ],
            'mutations' => $mutations,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]
        ]);    
    }
}
