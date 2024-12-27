<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UpdatePassword extends Controller
{
    public function checkPass(Request $request, string $id)
    {
        // Cek apakah user dengan ID diberikan ada
        $dataUser = User::find($id);
        if (!$dataUser) {
            return response()->json([
                'status' => false,
                'message' => 'User not found',
            ], 404);
        }

        // Validasi password
        $request->validate([
            'password' => 'required',
        ]);

        // Cek apakah password cocok dengan hashed password di database
        if (Hash::check($request->password, $dataUser->password)) {
            return response()->json([
                'status' => true,
                'message' => 'Password is correct',
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Password is incorrect',
            ], 401); // Gunakan status 401 untuk autentikasi gagal
        }
    }

    public function updatePass(Request $request, string $id)
    {
        // Cek apakah user dengan ID diberikan ada
        $dataUser = User::find($id);
        if (!$dataUser) {
            return response()->json([
                'status' => false,
                'message' => 'User not found',
            ], 404);
        }

        // Validasi password baru
        $validate = Validator::make($request->all(), [
            'password' => 'required|min:8', // Tambahkan aturan panjang minimum password
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validate->errors(),
            ], 422);
        }

        // Update password user
        $dataUser->password = bcrypt($request->password);
        $dataUser->save();

        return response()->json([
            'status' => true,
            'message' => 'Password updated successfully',
        ], 200);
    }
}
