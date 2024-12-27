<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Companie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataCompanie = Companie::all();
        return response()->json([
            'status' => true,
            'message' => 'Data found',
            'type' => 'company',
            'data' => $dataCompanie
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|email|unique:companies,email',
            'logo' => 'required|image|mimes:jpeg,png,jpg|max:3062',
            'website' => 'required|url',
        ];

        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Failed to add data",
                'errors' => $validate->errors(),
            ], 422);
        }

        // Handle file upload
        if ($request->hasFile('logo')) {
            $filePath = $request->file('logo')->store('logos','public');
            if (!$filePath) {
                return response()->json([
                    'status' => false,
                    'message' => "Failed to upload logo",
                ], 500);
            }
            $fileName = basename($filePath);
        } else {
            return response()->json([
                'status' => false,
                'message' => "File upload failed",
            ], 400);
        }

        // Save data to database
        $dataCompanie = new Companie;
        $dataCompanie->name = $request->name;
        $dataCompanie->email = $request->email;
        $dataCompanie->logo = $fileName;
        $dataCompanie->website = $request->website;
        $dataCompanie->save();

        return response()->json([
            'status' => true,
            'message' => 'Data created successfully',
            'data' => $dataCompanie,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $dataCompanie = Companie::find($id);
        if ($dataCompanie) {
            return response()->json([
                'status' => true,
                'message' => 'Data found',
                'type' => 'company',
                'data' => $dataCompanie
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => "Data not found"
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    
    $dataCompanie = Companie::find($id);
    if (empty($dataCompanie)) {
    return response()->json([
        'status' => false,
        'message' => 'Data not found',
    ], 404);
    }

    $rules = [
            'name' => 'required',
            'email' => 'required|email',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:3062',
            'website' => 'required|url',
        ];

        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Failed to add data",
                'errors' => $validate->errors(),
            ], 422);
        }

        // Handle file upload
        if ($request->hasFile('logo')) {
            // Hapus logo lama jika ada
            if ($dataCompanie->logo) {
                $oldFilePath = storage_path("app/public/logos/{$dataCompanie->logo}");
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath);
                }
            }
    
            $filePath = $request->file('logo')->store('logos', 'public');
            if (!$filePath) {
                return response()->json([
                    'status' => false,
                    'message' => "Failed to upload logo",
                ], 500);
            }
            $dataCompanie->logo = basename($filePath); // Update logo hanya jika ada file baru
        }

    $dataCompanie->name = $request->name;
    $dataCompanie->email = $request->email;
    $dataCompanie->website = $request->website;
    $dataCompanie->save();

    return response()->json([
        'status' => true,
        'message' => 'Data updated successfully',
        'data' => $dataCompanie,
    ], 200);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dataCompany = Companie::find($id);
        if (empty($dataCompany)) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found'
            ], 404);
        }

        // Delete the logo file if exists
        if ($dataCompany->logo) {
            $oldFilePath = storage_path("app/public/logos/{$dataCompany->logo}");
            if (file_exists($oldFilePath)) {
                unlink($oldFilePath);
            }
        }

        $dataCompany->delete();

        return response()->json([
            'status' => true,
            'message' => 'Data deleted successfully',
        ], 200);
    }
}
