<?php

namespace Tests\Unit;

use App\Models\Agency;
use App\Models\Caregiver;
use App\Models\Participant;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServiceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->agency = Agency::create([
            'name' => 'Care Agency',
            'contact_info' => ['email' => 'contact@care.com'],
        ]);

        $this->participant = Participant::create([
            'name' => 'AJ',
            'medicaid_id' => '12345',
            'is_active' => true,
        ]);
    }

    public function test_allowed_fields_for_home_care_service(): void
    {
        $service = Service::create([
            'participant_id' => $this->participant->id,
            'agency_id' => $this->agency->id,
            'type' => 'Home Care',
            'weekly_hours' => 20,
            'weekly_units' => 5,
            'start_date' => '2025-03-01',
            'end_date' => '2025-09-01',
            'status' => 'approved',
        ]);

        $this->assertEquals(['weekly_hours', 'weekly_units'], $service->allowed_fields);
    }

    public function test_allowed_fields_for_hdm_service(): void
    {
        $service = Service::create([
            'participant_id' => $this->participant->id,
            'agency_id' => $this->agency->id,
            'type' => 'HDM',
            'weekly_units' => 7,
            'start_date' => '2025-02-01',
            'end_date' => '2025-10-01',
            'status' => 'approved',
        ]);

        $this->assertEquals(['weekly_units'], $service->allowed_fields);
    }

    public function test_hours_label(): void
    {
        $service = Service::create([
            'participant_id' => $this->participant->id,
            'agency_id' => $this->agency->id,
            'type' => 'Home Care',
            'weekly_hours' => 20,
            'start_date' => '2025-03-01',
            'end_date' => '2025-09-01',
            'status' => 'approved',
        ]);

        $this->assertEquals('Weekly Hours', $service->hours_label);
    }

    public function test_units_label(): void
    {
        $service = Service::create([
            'participant_id' => $this->participant->id,
            'agency_id' => $this->agency->id,
            'type' => 'HDM',
            'weekly_units' => 7,
            'start_date' => '2025-02-01',
            'end_date' => '2025-10-01',
            'status' => 'approved',
        ]);

        $this->assertEquals('Weekly Units', $service->units_label);
    }

    public function test_service_belongs_to_many_caregivers(): void
    {
        $service = Service::create([
            'participant_id' => $this->participant->id,
            'agency_id' => $this->agency->id,
            'type' => 'Home Care',
            'weekly_hours' => 20,
            'start_date' => '2025-03-01',
            'end_date' => '2025-09-01',
            'status' => 'approved',
        ]);

        $caregiver = Caregiver::create([
            'name' => 'Caregiver One',
            'is_active' => true,
        ]);

        $service->caregivers()->attach($caregiver->id, ['assigned_hours' => 20]);

        $this->assertCount(1, $service->caregivers);
        $this->assertEquals('Caregiver One', $service->caregivers->first()->name);
        $this->assertEquals(20, $service->caregivers->first()->pivot->assigned_hours);
    }
}