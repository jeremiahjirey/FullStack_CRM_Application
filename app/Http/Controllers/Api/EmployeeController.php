<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataEmployee = Employee::all();
        return response()->json([
            'status'=>true,
            'message'=>'data is found',
            'type'=>'employees',
            'data'=>$dataEmployee
        ],200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dataEmployee = new Employee;

        $rules=[
            'first_name'=>'required',
            'last_name'=>'required',
            'company_id'=>'required',
            'email'=>'required',
            'phone'=>'required',
            'division_id'=>'required',
        ];

        $validate = Validator::make($request->all(),$rules);
        if($validate -> fails()){
            return response()->json([
                'status'=>false,
                'message'=>"failed to add data",
                'data'=>$validate->errors()
            ]);
        }

        $dataEmployee->first_name = $request->first_name;
        $dataEmployee->last_name = $request->last_name;
        $dataEmployee->company_id = $request->company_id;
        $dataEmployee->email = $request->email;
        $dataEmployee->phone = $request->phone;
        $dataEmployee->division_id= $request->division_id;

        $post = $dataEmployee->save();

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
        $dataEmployee = Employee::find($id);
        if($dataEmployee){
            return response()->json([
                'status'=>true,
                'message'=>'data is found',
                'type'=>'employees',
                'data'=>$dataEmployee
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
        $dataEmployee = Employee::find($id);
        if(empty($dataEmployee)){
            return response()->json([
                'status'=>false,
                'message'=>'data not found'
            ],404);
        }

        $rules=[
            'first_name'=>'required',
            'last_name'=>'required',
            'company_id'=>'nullable',
            'email'=>'required',
            'phone'=>'required',
            'division_id'=>'nullable',
        ];

        $validate = Validator::make($request->all(),$rules);
        if($validate -> fails()){
            return response()->json([
                'status'=>false,
                'message'=>"failed to update data",
                'data'=>$validate->errors()
            ]);
        }

        $dataEmployee->first_name = $request->first_name;
        $dataEmployee->last_name = $request->last_name;
        $dataEmployee->company_id = $request->company_id;
        $dataEmployee->email = $request->email;
        $dataEmployee->phone = $request->phone;
        $dataEmployee->division_id= $request->division_id;

        $post = $dataEmployee->save();

        return response()->json([
            'status'=>true,
            'message'=>'update data successfully',
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dataEmployee = Employee::find($id);
        if(empty($dataEmployee)){
            return response()->json([
                'status'=>false,
                'message'=>'data not found'
            ],404);
        }

        $post = $dataEmployee->delete();

        return response()->json([
            'status'=>true,
            'message'=>'delete data successfully',
        ]);
    }
}

