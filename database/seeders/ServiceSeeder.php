<?php

namespace Database\Seeders;

use App\Models\Agency;
use App\Models\Participant;
use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $participants = Participant::all();
        $agencies = Agency::all();
        $types = ['Home Care', 'HDM', 'ADHC'];

        for ($i = 0; $i < 20; $i++) {
            $type = $faker->randomElement($types);
            $startDate = $faker->dateTimeBetween('-1 year', 'now');
            $endDate = $faker->dateTimeBetween($startDate, '+1 year');

            $data = [
                'participant_id' => $participants->random()->id,
                'agency_id' => $agencies->random()->id,
                'type' => $type,
                'start_date' => $startDate->format('Y-m-d'),
                'end_date' => $endDate->format('Y-m-d'),
                'status' => $faker->randomElement(['pending', 'approved', 'active', 'expired']),
            ];

            if (in_array($type, ['Home Care', 'ADHC'])) {
                $data['weekly_hours'] = $faker->numberBetween(10, 40);
                $data['weekly_units'] = $faker->optional(0.5)->numberBetween(5, 20);
            } else {
                $data['weekly_units'] = $faker->numberBetween(5, 20);
            }

            Service::create($data);
        }
    }
}