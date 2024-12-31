<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataUser = User::all();
        return response()->json([
            'status'=>true,
            'message'=>'data is found',
            'type'=>'users',
            'data'=>$dataUser
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dataUser = new User;

        $rules=[
            'ussername'=>'required',
            'email'=>'required',
            'password'=>'required',
            'role'=>'required'
        ];

        $validate = Validator::make($request->all(),$rules);
        if($validate -> fails()){
            return response()->json([
                'status'=>false,
                'message'=>"failed to add data",
                'data'=>$validate->errors()
            ]);
        }

        $dataUser->ussername = $request->ussername;
        $dataUser->email = $request->email;
        if ($request->password) {
            $dataUser->password = bcrypt($request->password);
        }
        $dataUser->role = $request->role;

        $post = $dataUser->save();

        return response()->json([
            'status'=>true,
            'message'=>'create data successfully',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $dataUser = User::find($id);
        if($dataUser){
            return response()->json([
                'status'=>true,
                'message'=>'data is found',
                'type'=>'users',
                'data'=>$dataUser
            ],200);
        }else{
            return response()->json([
                'status'=>false,
                'message'=>"data not found"
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $dataUser = User::find($id);
    if (empty($dataUser)) {
        return response()->json([
            'status' => false,
            'message' => 'data not found'
        ], 404);
    }

    $rules = [
        'ussername' => 'required',
        'email' => 'required|email',
        'password' => 'nullable|min:8',
        'role' => 'nullable', // Role tetap nullable
    ];

    $validate = Validator::make($request->all(), $rules);
    if ($validate->fails()) {
        return response()->json([
            'status' => false,
            'message' => 'failed to update data',
            'data' => $validate->errors()
        ], 422);
    }

    // Update ussername dan email
    $dataUser->ussername = $request->ussername;
    $dataUser->email = $request->email;
    
    if ($request->password) {
        $dataUser->password = bcrypt($request->password);
    }

    if ($request->has('role')) {
        $dataUser->role = $request->role;
    }

    $dataUser->save();

    return response()->json([
        'status' => true,
        'message' => 'update data successfully',
    ], 200);
}



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dataUser = User::find($id);
        if(empty($dataUser)){
            return response()->json([
                'status'=>false,
                'message'=>'data not found'
            ],404);
        }

        $post = $dataUser->delete();

        return response()->json([
            'status'=>true,
            'message'=>'delete data successfully',
        ]);
    }
}

