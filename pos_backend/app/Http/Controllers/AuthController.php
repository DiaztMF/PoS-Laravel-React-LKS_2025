<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) return response()->json([
            'status' => 'error',
            'message' => 'Input salah',
            'errors' => $validator->errors(),
        ], 422);

        if(!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email atau Password salah',
                'errors' => null
            ], 401);
        }

        $user = $request->user();
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

    public function logout(Request $request) {
        $request->user()->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logout berhasil',
            'data' => null,
        ]);
    }

    public function profile(Request $request) {
        return response()->json([
            'status' => 'success',
            'message' => 'Data profile',
            'data' => $request->user(),
        ], 200);
    }
}
