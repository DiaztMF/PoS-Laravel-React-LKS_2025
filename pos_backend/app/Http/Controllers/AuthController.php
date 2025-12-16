<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        if(!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email atau Password salah',
                'error' => null
            ], 422);
        }

        $user = User::where('email', $request->email)->first();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil',
            'data' => [
                'user' => $user->name,
                'token' => $token,
            ]
        ]);
    }

    public function logout() {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logout berhasil',
            'data' => null,
        ]);
    }

    public function profile() {
        return response()->json([
            'status' => 'success',
            'message' => 'Data profile',
            'data' => auth()->user(),
        ], 200);
    }
}
