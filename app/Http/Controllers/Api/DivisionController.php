<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Division;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DivisionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataDivision = Division::all();
        return response()->json([
            'status'=>true,
            'message'=>'data is found',
            'type'=>'divisions',
            'data'=>$dataDivision
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dataDivision = new Division;

        $rules=[
            'name_division'=>'required',
            'company_id'=>'nullable'
        ];

        $validate = Validator::make($request->all(),$rules);
        if($validate -> fails()){
            return response()->json([
                'status'=>false,
                'message'=>"failed to add data",
                'data'=>$validate->errors()
            ]);
        }

        $dataDivision->name_division = $request->name_division;
        $dataDivision->company_id = $request->company_id;

        $dataDivision->save();

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
        $dataDivision = Division::find($id);
        if($dataDivision){
            return response()->json([
                'status'=>true,
                'message'=>'data is found',
                'type'=>'divisions',
                'data'=>$dataDivision
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
        $dataDivision = Division::find($id);
        if(empty($dataDivision)){
            return response()->json([
                'status'=>false,
                'message'=>'data not found'
            ],404);
        }

        $rules=[
            'name_division'=>'required',
            'company_id'=>'nullable'
        ];

        $validate = Validator::make($request->all(),$rules);
        if($validate -> fails()){
            return response()->json([
                'status'=>false,
                'message'=>"failed to update data",
                'data'=>$validate->errors()
            ]);
        }

        $dataDivision->name_division = $request->name_division;
        $dataDivision->company_id = $request->company_id;

        $dataDivision->save();

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
        $dataDivision = Division::find($id);
        if(empty($dataDivision)){
            return response()->json([
                'status'=>false,
                'message'=>'data not found'
            ],404);
        }

        $dataDivision->delete();

        return response()->json([
            'status'=>true,
            'message'=>'delete data successfully',
        ]);
    }
}

