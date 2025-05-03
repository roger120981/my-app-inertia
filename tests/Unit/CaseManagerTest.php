<?php

namespace Tests\Unit;

use App\Models\Agency;
use App\Models\CaseManager;
use App\Models\Participant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CaseManagerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->agency = Agency::create(['name' => 'Care Agency']);
    }

    public function test_can_create_case_manager(): void
    {
        $caseManager = CaseManager::create([
            'name' => 'John Doe',
            'email' => 'john@care.com',
            'phone' => '123-456-7891',
            'agency_id' => $this->agency->id,
        ]);

        $this->assertNotNull($caseManager->id);
        $this->assertEquals('John Doe', $caseManager->name);
        $this->assertEquals('john@care.com', $caseManager->email);
        $this->assertEquals($this->agency->id, $caseManager->agency_id);
    }

    public function test_case_manager_belongs_to_agency(): void
    {
        $caseManager = CaseManager::create([
            'name' => 'John Doe',
            'agency_id' => $this->agency->id,
        ]);

        $this->assertEquals($this->agency->id, $caseManager->agency->id);
        $this->assertEquals('Care Agency', $caseManager->agency->name);
    }

    public function test_case_manager_has_participants(): void
    {
        $caseManager = CaseManager::create([
            'name' => 'John Doe',
            'agency_id' => $this->agency->id,
        ]);
        Participant::create([
            'name' => 'AJ',
            'medicaid_id' => '12345',
            'is_active' => true,
            'case_manager_id' => $caseManager->id,
        ]);

        $this->assertCount(1, $caseManager->participants);
        $this->assertEquals('AJ', $caseManager->participants->first()->name);
    }
}