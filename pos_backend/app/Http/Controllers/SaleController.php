<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\SalesDetail;
use App\Models\Sale;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::with(['user', 'details.product'])->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 'success',
            'message' => 'Data berhasil dimuat',
            'data' => $sales,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $sale = Sale::create([
                'user_id' => auth()->id(),
                'total_price' => 0,
            ]);

            $totalPrice = 0;

            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);

                if (!$product) {
                    throw new \Exception("Produk ID {$item['product_id']} tidak ditemukan");
                }

                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Stok tersisa {$product->stock}, tidak mencukupi untuk permintaan");
                }

                $subTotal = $product->price * $item['quantity'];
                $totalPrice += $subTotal;

                $product->decrement('stock', $item['quantity']);   

                $sale->details->create([
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'subtotal' => $subTotal
                ]);

                $sale->update([
                    'total_price' => $totalPrice,
                ]);
            }
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Transaksi berhasil',
                'data' => $sale,
            ], 201);
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'status' => 'error',
                'message' => 'Transaksi gagal',
                'errors' => $e->getMessage(),
            ], 400);
        };
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $sale = Sale::with(['user', 'details.product'])->find($id);
        if (!$sale) return response()->json([
            'status' => 'error',
            'message' => "Data transaksi tidak ditemukan",
            'errors' => null,
        ], 404);

        return response()->json([
            'status' => 'success',
            'message' => 'Data transaksi berhasil dimuat',
            'data' => $sale,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $sale = Sale::with('details')->find($id);

        if (!$sale) {
            return response()->json([
                'status' => 'error',
                'message' => 'Transaksi tidak ditemukan',
                'errors' => null
            ], 404);
        }

        DB::beginTransaction();

        try {
            foreach ($sale->details as $detail) {
                $product = Product::find($detail->product_id);

                $product->increment('stock', $detail->quantity);
            }

            $sale->details()->delete();

            $sale->delete();

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Transaksi dihapus dan stok telah dikembalikan',
                'data' => null
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menghapus transaksi',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    public function details($sale_id) {
        $details = SalesDetail::with('product')->where('sale_id', $sale_id)->get();

        if ($details->isEmpty()) return response()->json([
            'status' => 'error',
            'message' => 'Data detail transaksi tidak ditemukan',
            'errors' => null,
        ], 404);

        return response()->json([
            'status' => 'success',
            'message' => 'Data detail transaksi berhasil dimuat',
            'data' => $details,
        ]);
    }
}
