<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            AgencySeeder::class,
            CaseManagerSeeder::class,
            ParticipantSeeder::class,
            CaregiverSeeder::class,
            ServiceSeeder::class,
            ServiceCaregiverSeeder::class,
        ]);
    }
}