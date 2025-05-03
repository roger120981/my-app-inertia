<?php

namespace Database\Seeders;

use App\Models\CaseManager;
use App\Models\Participant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ParticipantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $caseManagers = CaseManager::all();

        for ($i = 0; $i < 10; $i++) {
            Participant::create([
                'name' => $i === 0 ? 'AJ' : $faker->name,
                'medicaid_id' => $faker->unique()->numerify('#####'),
                'gender' => $faker->randomElement(['Male', 'Female', null]),
                'dob' => $faker->dateTimeBetween('-90 years', '-60 years')->format('Y-m-d'),
                'address' => $faker->address,
                'primary_phone' => $faker->phoneNumber,
                'secondary_phone' => $faker->optional()->phoneNumber,
                'community' => $faker->city,
                'is_active' => $faker->boolean(80),
                'case_manager_id' => $caseManagers->random()->id,
            ]);
        }
    }
}