<?php

namespace Tests\Unit;

use App\Models\Agency;
use App\Models\Caregiver;
use App\Models\Participant;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CaregiverTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->agency = Agency::create(['name' => 'Care Agency']);
        $this->participant = Participant::create(['name' => 'AJ', 'medicaid_id' => '12345', 'is_active' => true]);
        $this->service = Service::create([
            'participant_id' => $this->participant->id,
            'agency_id' => $this->agency->id,
            'type' => 'Home Care',
            'weekly_hours' => 20,
            'start_date' => '2025-03-01',
            'end_date' => '2025-09-01',
            'status' => 'approved',
        ]);
    }

    public function test_can_create_caregiver(): void
    {
        $caregiver = Caregiver::create([
            'name' => 'Caregiver One',
            'email' => 'caregiver@care.com',
            'phone' => '123-456-7893',
            'is_active' => true,
            'certifications' => ['First Aid', 'CPR'],
            'available_hours' => 40,
        ]);

        $this->assertNotNull($caregiver->id);
        $this->assertEquals('Caregiver One', $caregiver->name);
        $this->assertTrue($caregiver->is_active);
        $this->assertEquals(['First Aid', 'CPR'], $caregiver->certifications);
        $this->assertEquals(40, $caregiver->available_hours);
    }

    public function test_caregiver_belongs_to_many_services(): void
    {
        $caregiver = Caregiver::create([
            'name' => 'Caregiver One',
            'is_active' => true,
        ]);
        $caregiver->services()->attach($this->service->id, ['assigned_hours' => 20]);

        $this->assertCount(1, $caregiver->services);
        $this->assertEquals('Home Care', $caregiver->services->first()->type);
        $this->assertEquals(20, $caregiver->services->first()->pivot->assigned_hours);
    }
}