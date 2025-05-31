<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Tables\Agencies;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgenciesController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('agencies/index', [
            'agencies' => Agencies::make(),
        ]);
    }

    public function create()
    {
        return Inertia::render('agencies/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:500',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:50',
            'zip_code' => 'nullable|string|max:10',
            'license_number' => 'nullable|string|max:100',
            'is_active' => 'boolean',
        ]);

        Agency::create([
            'name' => $request->name,
            'contact_person' => $request->contact_person,
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'zip_code' => $request->zip_code,
            'license_number' => $request->license_number,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()->route('agencies.index')->with('success', 'Agency created successfully.');
    }

    public function show(Agency $agency)
    {
        return Inertia::render('agencies/show', [
            'agency' => $agency->load('services.participant', 'caseManagers'),
        ]);
    }

    public function edit(Agency $agency)
    {
        return Inertia::render('agencies/edit', [
            'agency' => $agency,
        ]);
    }

    public function update(Request $request, Agency $agency)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:500',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:50',
            'zip_code' => 'nullable|string|max:10',
            'license_number' => 'nullable|string|max:100',
            'is_active' => 'boolean',
        ]);

        $agency->update([
            'name' => $request->name,
            'contact_person' => $request->contact_person,
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'zip_code' => $request->zip_code,
            'license_number' => $request->license_number,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()->route('agencies.index')->with('success', 'Agency updated successfully.');
    }

    public function destroy(Agency $agency)
    {
        $agency->delete();

        return redirect()->route('agencies.index')->with('success', 'Agency deleted successfully.');
    }
}
