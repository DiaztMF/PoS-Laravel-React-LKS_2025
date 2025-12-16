<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Elektronik'],
            ['name' => 'Fashion'],
            ['name' => 'Makanan & Minuman'],
            ['name' => 'Kesehatan'],
            ['name' => 'Olahraga'],
            ['name' => 'Rumah Tangga'],
            ['name' => 'Otomotif'],
            ['name' => 'Buku & Alat Tulis'],
            ['name' => 'Perlengkapan Sekolah'],
            ['name' => 'Gaming'],
        ];

        Category::insert($categories);
    }
}
