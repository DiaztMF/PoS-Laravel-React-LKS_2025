<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Samsung A55',
                'category_id' => 1,
                'price' => 5000000,
                'stock' => 10,
            ],
            [
                'name' => 'iPhone 13',
                'category_id' => 1,
                'price' => 12000000,
                'stock' => 5,
            ],
            [
                'name' => 'Xiaomi Redmi Note 13',
                'category_id' => 1,
                'price' => 3500000,
                'stock' => 15,
            ],
            [
                'name' => 'OPPO Reno 11',
                'category_id' => 1,
                'price' => 5500000,
                'stock' => 8,
            ],
            [
                'name' => 'Vivo V29',
                'category_id' => 1,
                'price' => 6000000,
                'stock' => 7,
            ],
            [
                'name' => 'ASUS ROG Phone 7',
                'category_id' => 1,
                'price' => 10000000,
                'stock' => 4,
            ],
            [
                'name' => 'Realme 12 Pro',
                'category_id' => 1,
                'price' => 4200000,
                'stock' => 12,
            ],
            [
                'name' => 'Infinix Zero 30',
                'category_id' => 1,
                'price' => 3200000,
                'stock' => 20,
            ],
            [
                'name' => 'Google Pixel 7',
                'category_id' => 1,
                'price' => 9000000,
                'stock' => 6,
            ],
            [
                'name' => 'Sony Xperia 5 V',
                'category_id' => 1,
                'price' => 11000000,
                'stock' => 3,
            ],
        ];

        Product::insert($products);
    }
}
