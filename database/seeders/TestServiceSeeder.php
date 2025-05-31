<?php

namespace Database\Seeders;

use App\Models\Agency;
use App\Models\Participant;
use App\Models\Service;
use Illuminate\Database\Seeder;

class TestServiceSeeder extends Seeder
{
    public function run()
    {
        // Get the first participant and agency
        $participant = Participant::first();
        $agency = Agency::first();

        if ($participant && $agency) {
            // Create some test services
            Service::create([
                'participant_id' => $participant->id,
                'agency_id' => $agency->id,
                'type' => 'Home Care',
                'weekly_hours' => 20,
                'weekly_units' => null,
                'start_date' => '2025-01-01',
                'end_date' => '2025-12-31',
                'status' => 'active',
            ]);

            Service::create([
                'participant_id' => $participant->id,
                'agency_id' => $agency->id,
                'type' => 'HDM',
                'weekly_hours' => null,
                'weekly_units' => 10,
                'start_date' => '2025-02-01',
                'end_date' => '2025-11-30',
                'status' => 'pending',
            ]);

            $this->command->info('Test services created successfully!');
        } else {
            $this->command->error('No participants or agencies found. Please run other seeders first.');
        }
    }
}
