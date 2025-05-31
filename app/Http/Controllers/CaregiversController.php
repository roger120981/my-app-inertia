<?php

namespace App\Http\Controllers;

use App\Models\Caregiver;
use App\Tables\Caregivers;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CaregiversController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('caregivers/index', [
            'caregivers' => Caregivers::make(),
        ]);
    }

    public function create()
    {
        return Inertia::render('caregivers/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255|unique:caregivers',
            'phone' => 'nullable|string|max:20',
            'is_active' => 'boolean',
            'certifications' => 'nullable|array',
            'certifications.*' => 'string|max:255',
            'available_hours' => 'required|integer|min:1|max:168',
        ]);

        Caregiver::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'is_active' => $request->boolean('is_active', true),
            'certifications' => $request->certifications ?: [],
            'available_hours' => $request->available_hours,
        ]);

        return redirect()->route('caregivers.index')->with('success', 'Caregiver created successfully.');
    }

    public function show(Caregiver $caregiver)
    {
        return Inertia::render('caregivers/show', [
            'caregiver' => $caregiver->load('services.participant', 'services.agency'),
        ]);
    }

    public function edit(Caregiver $caregiver)
    {
        return Inertia::render('caregivers/edit', [
            'caregiver' => $caregiver,
        ]);
    }

    public function update(Request $request, Caregiver $caregiver)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255|unique:caregivers,email,' . $caregiver->id,
            'phone' => 'nullable|string|max:20',
            'is_active' => 'boolean',
            'certifications' => 'nullable|array',
            'certifications.*' => 'string|max:255',
            'available_hours' => 'required|integer|min:1|max:168',
        ]);

        $caregiver->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'is_active' => $request->boolean('is_active', true),
            'certifications' => $request->certifications ?: [],
            'available_hours' => $request->available_hours,
        ]);

        return redirect()->route('caregivers.index')->with('success', 'Caregiver updated successfully.');
    }

    public function destroy(Caregiver $caregiver)
    {
        $caregiver->delete();

        return redirect()->route('caregivers.index')->with('success', 'Caregiver deleted successfully.');
    }
}
