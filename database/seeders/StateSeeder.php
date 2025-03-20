<?php

namespace Database\Seeders;

use App\Models\State;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        State::truncate();
        Schema::enableForeignKeyConstraints();

        $states = [

            [
                'id'            =>  1591,
                'country_id'    =>  103,
                'name'          =>  "Andaman and Nicobar Islands",
                'created_at'    =>  now()->addSeconds(1591),
                'updated_at'    =>  now()->addSeconds(1591),
            ],
            [
                'id'            =>  1592,
                'country_id'    =>  103,
                'name'          =>  "Andhra Pradesh",
                'created_at'    =>  now()->addSeconds(1592),
                'updated_at'    =>  now()->addSeconds(1592),
            ],
            [
                'id'            =>  1593,
                'country_id'    =>  103,
                'name'          =>  "Arunachal Pradesh",
                'created_at'    =>  now()->addSeconds(1593),
                'updated_at'    =>  now()->addSeconds(1593),
            ],
            [
                'id'            =>  1594,
                'country_id'    =>  103,
                'name'          =>  "Assam",
                'created_at'    =>  now()->addSeconds(1594),
                'updated_at'    =>  now()->addSeconds(1594),
            ],
            [
                'id'            =>  1595,
                'country_id'    =>  103,
                'name'          =>  "Bihar",
                'created_at'    =>  now()->addSeconds(1595),
                'updated_at'    =>  now()->addSeconds(1595),
            ],
            [
                'id'            =>  1596,
                'country_id'    =>  103,
                'name'          =>  "Chandigarh",
                'created_at'    =>  now()->addSeconds(1596),
                'updated_at'    =>  now()->addSeconds(1596),
            ],
            [
                'id'            =>  1597,
                'country_id'    =>  103,
                'name'          =>  "Chhattisgarh",
                'created_at'    =>  now()->addSeconds(1597),
                'updated_at'    =>  now()->addSeconds(1597),
            ],
            [
                'id'            =>  1598,
                'country_id'    =>  103,
                'name'          =>  "Dadra and Nagar Haveli and Daman and Diu",
                'created_at'    =>  now()->addSeconds(1598),
                'updated_at'    =>  now()->addSeconds(1598),
            ],
            [
                'id'            =>  1599,
                'country_id'    =>  103,
                'name'          =>  "Delhi",
                'created_at'    =>  now()->addSeconds(1599),
                'updated_at'    =>  now()->addSeconds(1599),
            ],
            [
                'id'            =>  1600,
                'country_id'    =>  103,
                'name'          =>  "Goa",
                'created_at'    =>  now()->addSeconds(1600),
                'updated_at'    =>  now()->addSeconds(1600),
            ],
            [
                'id'            =>  1601,
                'country_id'    =>  103,
                'name'          =>  "Gujarat",
                'created_at'    =>  now()->addSeconds(1601),
                'updated_at'    =>  now()->addSeconds(1601),
            ],
            [
                'id'            =>  1602,
                'country_id'    =>  103,
                'name'          =>  "Haryana",
                'created_at'    =>  now()->addSeconds(1602),
                'updated_at'    =>  now()->addSeconds(1602),
            ],
            [
                'id'            =>  1603,
                'country_id'    =>  103,
                'name'          =>  "Himachal Pradesh",
                'created_at'    =>  now()->addSeconds(1603),
                'updated_at'    =>  now()->addSeconds(1603),
            ],
            [
                'id'            =>  1604,
                'country_id'    =>  103,
                'name'          =>  "Jammu and Kashmir",
                'created_at'    =>  now()->addSeconds(1604),
                'updated_at'    =>  now()->addSeconds(1604),
            ],
            [
                'id'            =>  1605,
                'country_id'    =>  103,
                'name'          =>  "Jharkhand",
                'created_at'    =>  now()->addSeconds(1605),
                'updated_at'    =>  now()->addSeconds(1605),
            ],
            [
                'id'            =>  1606,
                'country_id'    =>  103,
                'name'          =>  "Karnataka",
                'created_at'    =>  now()->addSeconds(1606),
                'updated_at'    =>  now()->addSeconds(1606),
            ],
            [
                'id'            =>  1607,
                'country_id'    =>  103,
                'name'          =>  "Kerala",
                'created_at'    =>  now()->addSeconds(1607),
                'updated_at'    =>  now()->addSeconds(1607),
            ],
            [
                'id'            =>  1608,
                'country_id'    =>  103,
                'name'          =>  "Ladakh",
                'created_at'    =>  now()->addSeconds(1608),
                'updated_at'    =>  now()->addSeconds(1608),
            ],
            [
                'id'            =>  1609,
                'country_id'    =>  103,
                'name'          =>  "Lakshadweep",
                'created_at'    =>  now()->addSeconds(1609),
                'updated_at'    =>  now()->addSeconds(1609),
            ],
            [
                'id'            =>  1610,
                'country_id'    =>  103,
                'name'          =>  "Madhya Pradesh",
                'created_at'    =>  now()->addSeconds(1610),
                'updated_at'    =>  now()->addSeconds(1610),
            ],
            [
                'id'            =>  1611,
                'country_id'    =>  103,
                'name'          =>  "Maharashtra",
                'created_at'    =>  now()->addSeconds(1611),
                'updated_at'    =>  now()->addSeconds(1611),
            ],
            [
                'id'            =>  1612,
                'country_id'    =>  103,
                'name'          =>  "Manipur",
                'created_at'    =>  now()->addSeconds(1612),
                'updated_at'    =>  now()->addSeconds(1612),
            ],
            [
                'id'            =>  1613,
                'country_id'    =>  103,
                'name'          =>  "Meghalaya",
                'created_at'    =>  now()->addSeconds(1613),
                'updated_at'    =>  now()->addSeconds(1613),
            ],
            [
                'id'            =>  1614,
                'country_id'    =>  103,
                'name'          =>  "Mizoram",
                'created_at'    =>  now()->addSeconds(1614),
                'updated_at'    =>  now()->addSeconds(1614),
            ],
            [
                'id'            =>  1615,
                'country_id'    =>  103,
                'name'          =>  "Nagaland",
                'created_at'    =>  now()->addSeconds(1615),
                'updated_at'    =>  now()->addSeconds(1615),
            ],
            [
                'id'            =>  1616,
                'country_id'    =>  103,
                'name'          =>  "Odisha",
                'created_at'    =>  now()->addSeconds(1616),
                'updated_at'    =>  now()->addSeconds(1616),
            ],
            [
                'id'            =>  1617,
                'country_id'    =>  103,
                'name'          =>  "Puducherry",
                'created_at'    =>  now()->addSeconds(1617),
                'updated_at'    =>  now()->addSeconds(1617),
            ],
            [
                'id'            =>  1618,
                'country_id'    =>  103,
                'name'          =>  "Punjab",
                'created_at'    =>  now()->addSeconds(1618),
                'updated_at'    =>  now()->addSeconds(1618),
            ],
            [
                'id'            =>  1619,
                'country_id'    =>  103,
                'name'          =>  "Rajasthan",
                'created_at'    =>  now()->addSeconds(1619),
                'updated_at'    =>  now()->addSeconds(1619),
            ],
            [
                'id'            =>  1620,
                'country_id'    =>  103,
                'name'          =>  "Sikkim",
                'created_at'    =>  now()->addSeconds(1620),
                'updated_at'    =>  now()->addSeconds(1620),
            ],
            [
                'id'            =>  1621,
                'country_id'    =>  103,
                'name'          =>  "Tamil Nadu",
                'created_at'    =>  now()->addSeconds(1621),
                'updated_at'    =>  now()->addSeconds(1621),
            ],
            [
                'id'            =>  1622,
                'country_id'    =>  103,
                'name'          =>  "Telangana",
                'created_at'    =>  now()->addSeconds(1622),
                'updated_at'    =>  now()->addSeconds(1622),
            ],
            [
                'id'            =>  1623,
                'country_id'    =>  103,
                'name'          =>  "Tripura",
                'created_at'    =>  now()->addSeconds(1623),
                'updated_at'    =>  now()->addSeconds(1623),
            ],
            [
                'id'            =>  1624,
                'country_id'    =>  103,
                'name'          =>  "Uttar Pradesh",
                'created_at'    =>  now()->addSeconds(1624),
                'updated_at'    =>  now()->addSeconds(1624),
            ],
            [
                'id'            =>  1625,
                'country_id'    =>  103,
                'name'          =>  "Uttarakhand",
                'created_at'    =>  now()->addSeconds(1625),
                'updated_at'    =>  now()->addSeconds(1625),
            ],
            [
                'id'            =>  1626,
                'country_id'    =>  103,
                'name'          =>  "West Bengal",
                'created_at'    =>  now()->addSeconds(1626),
                'updated_at'    =>  now()->addSeconds(1626),
            ],
        ];

        $state_chunks = array_chunk($states, 2000);
        foreach ($state_chunks as $state) {
            State::insert($state);
        }
    }
}
