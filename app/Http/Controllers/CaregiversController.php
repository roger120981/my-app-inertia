<?php

namespace App\Http\Controllers;

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
}
