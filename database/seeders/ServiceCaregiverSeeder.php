<?php

namespace Database\Seeders;

use App\Models\Caregiver;
use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceCaregiverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $services = Service::all();
        $caregivers = Caregiver::all();

        // Mantener un registro de asignaciones para evitar duplicados
        $existingAssignments = [];

        $maxAssignments = min(30, $services->count() * $caregivers->count()); // Evitar más asignaciones que combinaciones posibles

        for ($i = 0; $i < $maxAssignments; $i++) {
            do {
                $service = $services->random();
                $caregiver = $caregivers->random();
                $assignmentKey = $service->id . '-' . $caregiver->id;
            } while (isset($existingAssignments[$assignmentKey])); // Repetir hasta encontrar una combinación única

            $existingAssignments[$assignmentKey] = true;

            $service->caregivers()->attach($caregiver->id, [
                'assigned_hours' => $faker->numberBetween(5, 20),
                'assigned_at' => $faker->dateTimeBetween('-6 months', 'now'),
            ]);
        }
    }
}