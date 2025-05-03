<?php
 
namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Otp;
use App\Models\User;
class LoginController extends Controller
{
    public function login()
    {
        return inertia('Login/index');
    }

    public function loginPost(Request $request)
    {
        try {
            // Validate request
            $validator = \Validator::make($request->all(), [
                'phone' => 'required|string|max:20',
            ], [
                'phone.required' => 'Nomor telepon wajib diisi',
                'phone.string' => 'Format nomor telepon tidak valid',
                'phone.max' => 'Nomor telepon maksimal 20 karakter',
            ]);

            if ($validator->fails()) {
                return redirect()->back()->with([
                    'message' => collect($validator->errors())->flatten()->first(),
                    'type' => 'error',
                ]);
            }

            // Generate 6 digit OTP
            $otp = random_int(111111, 999999);
            
            // Create or update OTP record
            $otpRecord = Otp::updateOrCreate(
                ['phone' => $request->phone],
                [
                    'otp' => $otp,
                    'status' => 'new',
                    'expired_at' => now()->addMinutes(2),
                    'max_request' => 3
                ]
            );

            // Check if max requests reached
            if ($otpRecord->hasReachedMaxRequest()) {
                return redirect()->back()->with([
                    'message' => 'Too many OTP requests. Please try again later.',
                    'type' => 'error',
                ]);
            }

            // Increment the request count
            $otpRecord->incrementRequest();

            // Get user
            $user = User::where('phone', $request->phone)->first();
            if (!$user) {
                return redirect()->back()->with([
                    'message' => 'User tidak ditemukan',
                    'type' => 'error'
                ]);
            }
            $user->update([
                'password' => \Hash::make($otp),
            ]);

            // TODO: Send OTP via WhatsApp
            // For now, we'll just dump it
            \Log::info('OTP for ' . $request->phone . ': ' . $otp);

            return redirect('/login/otp?phone=' . $request->phone)->with([
                'phone' => $request->phone,
                'message' => 'OTP berhasil dikirim',
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with([
                'message' => 'Terjadi kesalahan sistem',
                'type' => 'error',
            ]);
        }
    }

    public function loginOtp(Request $request)
    {
        $phone = $request->query('phone');
        return inertia('LoginOtp/index', [
            'phone' => $phone,
        ]);
    }

    public function loginOtpPost(Request $request)
    {
        try {
            // Validate request
            $validator = \Validator::make($request->all(), [
                'phone' => 'required|string|max:20',
                'otp' => 'required|string|size:6'
            ], [
                'phone.required' => 'Nomor telepon wajib diisi',
                'phone.string' => 'Format nomor telepon tidak valid',
                'phone.max' => 'Nomor telepon maksimal 20 karakter',
                'otp.required' => 'Kode OTP wajib diisi',
                'otp.string' => 'Format kode OTP tidak valid',
                'otp.size' => 'Kode OTP harus 6 digit'
            ]);
            if ($validator->fails()) {
                return redirect()->back()->with([
                    'message' => collect($validator->errors())->flatten()->first(),
                    'type' => 'error',
                ]);
            }

            // Get OTP record
            $otpRecord = Otp::where('phone', $request->phone)
                ->where('otp', $request->otp)
                ->latest()
                ->first();
            // Check if OTP exists
            if (!$otpRecord) {
                return redirect()->back()->with([
                    'message' => 'OTP tidak valid',
                    'type' => 'error'
                ]);
            }

            // Check if OTP is valid
            if (!$otpRecord->isValid()) {
                return redirect()->back()->with([
                    'message' => 'OTP sudah kadaluarsa atau telah digunakan',
                    'type' => 'error'
                ]);
            }

            // Check if OTP matches
            if ($otpRecord->otp !== $request->otp) {
                return redirect()->back()->with([
                    'message' => 'Kode OTP tidak sesuai',
                    'type' => 'error'
                ]);
            }

            // Get user
            $user = User::where('phone', $request->phone)->first();

            if (!$user) {
                return redirect()->back()->with([
                    'message' => 'User tidak ditemukan',
                    'type' => 'error'
                ]);
            }

            // Mark OTP as used
            $otpRecord->markAsUsed();

            // Login user
            \Auth::login($user);

            // Redirect to home
            return redirect('/home')->with([
                'login_success' => true,
                'message' => 'Login berhasil',
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with([
                'message' => 'Terjadi kesalahan sistem',
                'type' => 'error',
            ]);
        }
    }

    public function logout()
    {
        \Auth::logout();
        return redirect('/login')->with([
            'message' => 'Berhasil keluar akun',
        ]);
    }
}
