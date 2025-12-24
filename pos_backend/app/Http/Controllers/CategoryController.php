<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Data berhasil dimuat',
            'data' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:categories,name'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Input salah',
                'errors' => $validator->errors(),
            ], 422);
        }

        $category = Category::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data berhasil disimpan',
            'data' => $category,
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Kategori tidak ditemukan',
                'errors' => null,
            ], 404);
        }

        $category->update($request->all());

        return response()->json([
            'status' => "success",
            'message' => "Kategori berhasil diupdate",
            'data' => $category,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Kategori tidak ditemukan',
                'errors' => null,
            ], 404);
        } else {
            $category->delete();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Kategori berhasil dihapus',
            'data' => null,
        ]);
    }
}
