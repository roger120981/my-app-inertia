<?php

namespace App\Http\Controllers;

use App\Tables\Participants;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParticipantsController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('participants/index', [
            'participants' => Participants::make(),
        ]);
    }
}
