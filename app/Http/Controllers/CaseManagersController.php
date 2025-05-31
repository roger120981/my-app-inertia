<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\CaseManager;
use App\Tables\CaseManagers;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CaseManagersController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('case-managers/index', [
            'caseManagers' => CaseManagers::make(),
        ]);
    }

    public function create()
    {
        return Inertia::render('case-managers/create', [
            'agencies' => Agency::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:case_managers',
            'phone' => 'nullable|string|max:20',
            'agency_id' => 'required|exists:agencies,id',
        ]);

        CaseManager::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'agency_id' => $request->agency_id,
        ]);

        return redirect()->route('case-managers.index')->with('success', 'Case Manager created successfully.');
    }

    public function show(CaseManager $caseManager)
    {
        return Inertia::render('case-managers/show', [
            'caseManager' => $caseManager->load('agency', 'participants'),
        ]);
    }

    public function edit(CaseManager $caseManager)
    {
        return Inertia::render('case-managers/edit', [
            'caseManager' => $caseManager,
            'agencies' => Agency::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, CaseManager $caseManager)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:case_managers,email,' . $caseManager->id,
            'phone' => 'nullable|string|max:20',
            'agency_id' => 'required|exists:agencies,id',
        ]);

        $caseManager->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'agency_id' => $request->agency_id,
        ]);

        return redirect()->route('case-managers.index')->with('success', 'Case Manager updated successfully.');
    }

    public function destroy(CaseManager $caseManager)
    {
        $caseManager->delete();

        return redirect()->route('case-managers.index')->with('success', 'Case Manager deleted successfully.');
    }
}
