<?php

namespace App\Http\Controllers;

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
}
