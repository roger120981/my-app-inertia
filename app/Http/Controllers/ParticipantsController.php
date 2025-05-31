<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\CaseManager;
use App\Models\Participant;
use App\Models\Service;
use App\Tables\Participants;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ParticipantsController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('participants/index', [
            'participants' => Participants::make(),
        ]);
    }

    public function create()
    {
        return Inertia::render('participants/create', [
            'caseManagers' => CaseManager::with('agency')
                ->select('id', 'name', 'agency_id')
                ->orderBy('name')
                ->get()
                ->map(function ($caseManager) {
                    return [
                        'id' => $caseManager->id,
                        'name' => $caseManager->name,
                        'agency_name' => $caseManager->agency->name ?? '',
                        'display_name' => $caseManager->name . ' (' . ($caseManager->agency->name ?? 'No Agency') . ')',
                    ];
                }),
            'agencies' => Agency::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'medicaid_id' => 'required|string|max:255|unique:participants',
            'gender' => 'required|in:male,female,other',
            'dob' => 'required|date|before:today',
            'address' => 'required|string|max:500',
            'primary_phone' => 'required|string|max:20',
            'secondary_phone' => 'nullable|string|max:20',
            'community' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'case_manager_id' => 'required|exists:case_managers,id',
            'services' => 'nullable|array',
            'services.*.agency_id' => 'required|exists:agencies,id',
            'services.*.type' => 'required|in:Home Care,HDM,ADHC',
            'services.*.weekly_hours' => 'nullable|integer|min:1',
            'services.*.weekly_units' => 'nullable|integer|min:1',
            'services.*.start_date' => 'nullable|date',
            'services.*.end_date' => 'nullable|date|after_or_equal:services.*.start_date',
        ]);

        DB::transaction(function () use ($request) {
            // Create the participant
            $participant = Participant::create([
                'name' => $request->name,
                'medicaid_id' => $request->medicaid_id,
                'gender' => $request->gender,
                'dob' => $request->dob,
                'address' => $request->address,
                'primary_phone' => $request->primary_phone,
                'secondary_phone' => $request->secondary_phone,
                'community' => $request->community,
                'is_active' => $request->boolean('is_active', true),
                'case_manager_id' => $request->case_manager_id,
            ]);

            // Create services if provided
            if ($request->has('services') && is_array($request->services)) {
                foreach ($request->services as $serviceData) {
                    Service::create([
                        'participant_id' => $participant->id,
                        'agency_id' => $serviceData['agency_id'],
                        'type' => $serviceData['type'],
                        'weekly_hours' => $serviceData['weekly_hours'] ?: null,
                        'weekly_units' => $serviceData['weekly_units'] ?: null,
                        'start_date' => $serviceData['start_date'] ?: now()->format('Y-m-d'),
                        'end_date' => $serviceData['end_date'] ?: now()->addYear()->format('Y-m-d'),
                        'status' => 'pending',
                    ]);
                }
            }
        });

        return redirect()->route('participants.index')->with('success', 'Participant created successfully.');
    }

    public function show(Participant $participant)
    {
        return Inertia::render('participants/show', [
            'participant' => $participant->load('caseManager.agency', 'services.agency'),
        ]);
    }

    public function edit(Participant $participant)
    {
        return Inertia::render('participants/edit', [
            'participant' => $participant->load('services.agency'),
            'caseManagers' => CaseManager::with('agency')
                ->select('id', 'name', 'agency_id')
                ->orderBy('name')
                ->get()
                ->map(function ($caseManager) {
                    return [
                        'id' => $caseManager->id,
                        'name' => $caseManager->name,
                        'agency_name' => $caseManager->agency->name ?? '',
                        'display_name' => $caseManager->name . ' (' . ($caseManager->agency->name ?? 'No Agency') . ')',
                    ];
                }),
            'agencies' => Agency::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Participant $participant)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'medicaid_id' => 'required|string|max:255|unique:participants,medicaid_id,' . $participant->id,
            'gender' => 'required|in:male,female,other',
            'dob' => 'required|date|before:today',
            'address' => 'required|string|max:500',
            'primary_phone' => 'required|string|max:20',
            'secondary_phone' => 'nullable|string|max:20',
            'community' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'case_manager_id' => 'required|exists:case_managers,id',
        ]);

        $participant->update([
            'name' => $request->name,
            'medicaid_id' => $request->medicaid_id,
            'gender' => $request->gender,
            'dob' => $request->dob,
            'address' => $request->address,
            'primary_phone' => $request->primary_phone,
            'secondary_phone' => $request->secondary_phone,
            'community' => $request->community,
            'is_active' => $request->boolean('is_active', true),
            'case_manager_id' => $request->case_manager_id,
        ]);

        return redirect()->route('participants.index')->with('success', 'Participant updated successfully.');
    }

    public function destroy(Participant $participant)
    {
        $participant->delete();

        return redirect()->route('participants.index')->with('success', 'Participant deleted successfully.');
    }
}
