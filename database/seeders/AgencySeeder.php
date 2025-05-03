<?php

namespace Database\Seeders;

use App\Models\Agency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AgencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 3; $i++) {
            Agency::create([
                'name' => $faker->company,
                'contact_info' => [
                    'email' => $faker->companyEmail,
                    'phone' => $faker->phoneNumber,
                ],
            ]);
        }
    }
}