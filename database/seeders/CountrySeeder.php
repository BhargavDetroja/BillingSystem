<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Country::truncate();
        Schema::enableForeignKeyConstraints();

        $countries =
            [
                "id"            =>  103,
                "name"          =>  "India",
                "phone_code"    =>  91,
                "iso2"          =>  "IN",
                "iso3"          =>  "IND",
                "region"        =>  "Asia",
                "subregion"     =>  "Southern Asia",
                "flag_png"      =>  "admin/images/flags/png/ind.png",
                "flag_svg"      =>  "admin/images/flags/svg/ind.svg",
                "flag_emoji"    =>  "🇮🇳",
                "created_at"    =>  now()->addSeconds(103),
                "updated_at"    =>  now()->addSeconds(103),
            ];

        Country::insert($countries);
    }
}
