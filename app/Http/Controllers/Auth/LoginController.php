<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    // public function index(){
    //     return redirect('/login');
    // }

    Public function Authlogin(Request $request){
    $login = $request->validate([
        'email'=>'required',
        'password'=>'required'
    ]);

    

    if(Auth::attempt($login)){
        return response()->json([
            'status'=>true,
            'message'=>'login successfully',
            'data'=>Auth::user()],200);
    }else{
        return response()->json([
            'status'=>false,
            'message'=>'login failed',
        ],404);
    }
}
}
