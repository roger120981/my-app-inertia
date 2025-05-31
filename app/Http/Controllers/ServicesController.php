<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\Participant;
use App\Models\Service;
use App\Tables\Services;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicesController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('services/index', [
            'services' => Services::make(),
        ]);
    }

    public function create()
    {
        return Inertia::render('services/create', [
            'participants' => Participant::select('id', 'name', 'medicaid_id')
                ->where('is_active', true)
                ->orderBy('name')
                ->get(),
            'agencies' => Agency::select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'participant_id' => 'required|exists:participants,id',
            'agency_id' => 'required|exists:agencies,id',
            'type' => 'required|in:Home Care,HDM,ADHC',
            'weekly_hours' => 'nullable|integer|min:1',
            'weekly_units' => 'nullable|integer|min:1',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|in:pending,approved,active,expired',
        ]);

        Service::create([
            'participant_id' => $request->participant_id,
            'agency_id' => $request->agency_id,
            'type' => $request->type,
            'weekly_hours' => $request->weekly_hours,
            'weekly_units' => $request->weekly_units,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'status' => $request->status,
        ]);

        return redirect()->route('services.index')->with('success', 'Service created successfully.');
    }

    public function show(Service $service)
    {
        return Inertia::render('services/show', [
            'service' => $service->load('participant', 'agency', 'caregivers'),
        ]);
    }

    public function edit(Service $service)
    {
        return Inertia::render('services/edit', [
            'service' => $service,
            'participants' => Participant::select('id', 'name', 'medicaid_id')
                ->where('is_active', true)
                ->orderBy('name')
                ->get(),
            'agencies' => Agency::select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $request->validate([
            'participant_id' => 'required|exists:participants,id',
            'agency_id' => 'required|exists:agencies,id',
            'type' => 'required|in:Home Care,HDM,ADHC',
            'weekly_hours' => 'nullable|integer|min:1',
            'weekly_units' => 'nullable|integer|min:1',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|in:pending,approved,active,expired',
        ]);

        $service->update([
            'participant_id' => $request->participant_id,
            'agency_id' => $request->agency_id,
            'type' => $request->type,
            'weekly_hours' => $request->weekly_hours,
            'weekly_units' => $request->weekly_units,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'status' => $request->status,
        ]);

        return redirect()->route('services.index')->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('services.index')->with('success', 'Service deleted successfully.');
    }
}
