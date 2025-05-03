<?php

namespace Tests\Unit;

use App\Models\Agency;
use App\Models\CaseManager;
use App\Models\Participant; // Añadido
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AgencyTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_agency(): void
    {
        $agency = Agency::create([
            'name' => 'Care Agency',
            'contact_info' => ['email' => 'contact@care.com', 'phone' => '123-456-7890'],
        ]);

        $this->assertNotNull($agency->id);
        $this->assertEquals('Care Agency', $agency->name);
        $this->assertEquals(['email' => 'contact@care.com', 'phone' => '123-456-7890'], $agency->contact_info);
    }

    public function test_agency_has_case_managers(): void
    {
        $agency = Agency::create(['name' => 'Care Agency']);
        CaseManager::create([
            'name' => 'John Doe',
            'email' => 'john@care.com',
            'phone' => '123-456-7891',
            'agency_id' => $agency->id,
        ]);

        $this->assertCount(1, $agency->caseManagers);
        $this->assertEquals('John Doe', $agency->caseManagers->first()->name);
    }

    public function test_agency_has_services(): void
    {
        $agency = Agency::create(['name' => 'Care Agency']);
        $participant = Participant::create(['name' => 'AJ', 'medicaid_id' => '12345', 'is_active' => true]);
        Service::create([
            'participant_id' => $participant->id,
            'agency_id' => $agency->id,
            'type' => 'Home Care',
            'weekly_hours' => 20,
            'start_date' => '2025-03-01',
            'end_date' => '2025-09-01',
            'status' => 'approved',
        ]);

        $this->assertCount(1, $agency->services);
        $this->assertEquals('Home Care', $agency->services->first()->type);
    }
}