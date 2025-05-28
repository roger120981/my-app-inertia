<?php

namespace App\Http\Controllers;

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
}
