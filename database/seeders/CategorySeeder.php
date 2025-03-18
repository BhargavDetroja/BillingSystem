<?php

namespace Database\Seeders;

use App\Enum\StatusEnums;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "name" => "Brass",
                "status" => StatusEnums::ACTIVE->value,
            ],
            [
                "name" => "Copper",
                "status" => StatusEnums::ACTIVE->value,
            ],
            [
                "name" => "Electronics",
                "status" => StatusEnums::ACTIVE->value,
            ],
            [
                "name" => "Others",
                "status" => StatusEnums::ACTIVE->value,
            ],
        ];
        Category::insert($data);
    }
}
