<?php
 
namespace App\Http\Controllers\Frontend;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
 
class MemberController extends Controller
{
    public function members(Request $request)
    {
        $search = $request->input('search'); //get search

        //user query
        $users = User::query()
                    ->select(['id', 'fullname', 'address', 'photo'])
                    ->where('role', 'user')
                    ->when($search, function ($query, $search) {
                        $query->where('fullname', 'like', "%{$search}%");
                    })
                    ->orderBy('fullname')
                    ->paginate(10)
                    ->withQueryString();

        return inertia('Member/index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
            ]
        ]);
    }
}
