<?php

namespace Tests\Unit;

use App\Models\Agency;
use App\Models\CaseManager;
use App\Models\Participant;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ParticipantTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->agency = Agency::create(['name' => 'Care Agency']);
        $this->caseManager = CaseManager::create([
            'name' => 'John Doe',
            'agency_id' => $this->agency->id,
        ]);
    }

    public function test_can_create_participant(): void
    {
        $participant = Participant::create([
            'name' => 'AJ',
            'medicaid_id' => '12345',
            'gender' => 'Male',
            'dob' => '1950-01-01',
            'address' => '123 Main St',
            'primary_phone' => '123-456-7892',
            'community' => 'Downtown',
            'is_active' => true,
            'case_manager_id' => $this->caseManager->id,
        ]);

        $this->assertNotNull($participant->id);
        $this->assertEquals('AJ', $participant->name);
        $this->assertEquals('12345', $participant->medicaid_id);
        $this->assertTrue($participant->is_active);
        $this->assertEquals($this->caseManager->id, $participant->case_manager_id);
    }

    public function test_participant_belongs_to_case_manager(): void
    {
        $participant = Participant::create([
            'name' => 'AJ',
            'medicaid_id' => '12345',
            'is_active' => true,
            'case_manager_id' => $this->caseManager->id,
        ]);

        $this->assertEquals($this->caseManager->id, $participant->caseManager->id);
        $this->assertEquals('John Doe', $participant->caseManager->name);
    }

    public function test_participant_has_services(): void
    {
        $participant = Participant::create([
            'name' => 'AJ',
            'medicaid_id' => '12345',
            'is_active' => true,
        ]);
        Service::create([
            'participant_id' => $participant->id,
            'agency_id' => $this->agency->id,
            'type' => 'Home Care',
            'weekly_hours' => 20,
            'start_date' => '2025-03-01',
            'end_date' => '2025-09-01',
            'status' => 'approved',
        ]);

        $this->assertCount(1, $participant->services);
        $this->assertEquals('Home Care', $participant->services->first()->type);
    }
}