<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\State;
use Illuminate\Http\Request;

class GeneralController extends Controller
{
    /**
     * Fetch all states from the API.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllStates()
    {
        $states = State::select('id', 'name', 'country_id')->get();
        return response()->json($states);
    }

    /**
     * Fetch all cities from the API.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCitiesByState(Request $request)
    {
        $request->validate([
            'state_id' => 'required|integer|exists:states,id',
        ]);

        $cities = City::select('id', 'name', 'state_id')
            ->where('state_id', $request->state_id)
            ->get();

        return response()->json($cities);
    }
}
