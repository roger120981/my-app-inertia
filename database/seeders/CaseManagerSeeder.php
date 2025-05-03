<?php

namespace Database\Seeders;

use App\Models\Agency;
use App\Models\CaseManager;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CaseManagerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $agencies = Agency::all();

        for ($i = 0; $i < 5; $i++) {
            CaseManager::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'phone' => $faker->phoneNumber,
                'agency_id' => $agencies->random()->id,
            ]);
        }
    }
}