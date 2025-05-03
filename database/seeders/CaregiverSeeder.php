<?php

namespace Database\Seeders;

use App\Models\Caregiver;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CaregiverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 15; $i++) {
            Caregiver::create([
                'name' => $faker->name,
                'email' => $faker->optional()->safeEmail,
                'phone' => $faker->optional()->phoneNumber,
                'is_active' => $faker->boolean(90),
                'certifications' => $faker->randomElements(['First Aid', 'CPR', 'Nursing', 'Therapy'], rand(0, 3)),
                'available_hours' => $faker->numberBetween(20, 40),
            ]);
        }
    }
}