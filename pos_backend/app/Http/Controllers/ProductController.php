<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Product::with('category')->get();
        return response()->json([
            'status' => 'success',
            'message' => 'Data berhasil dimuat',
            'data' => $product,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:products,name',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Input salah',
                'error' => $validator->errors(),
            ], 422);
        }

        $product = Product::create($request->all());
        
        return response()->json([
            'status' => 'success',
            'message' => 'Data berhasil disimpan',
            'data' => $product,
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product tidak ditemukan',
                'error' => null,
            ], 404);
        }

        $product->update($request->all());
        
        return response()->json([
            'status' => 'success',
            'message' => 'Produk berhasil diupdate',
            'data' => $product,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Produk tidak ditemukan',
                'error' => null,
            ], 404);
        } else {
            $product->delete();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Produk berhasil dihapus',
            'data' => null,
        ]);
    }
}
