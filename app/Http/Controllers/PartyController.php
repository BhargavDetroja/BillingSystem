<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Party;
use App\Models\State;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class PartyController extends Controller
{
    public function index()
    {
        $filters = request()->only(['search', 'status', 'state_id']);

        $parties = Party::query()
            ->when(isset($filters['search']), function ($query) use ($filters) {
                $query->where(function ($query) use ($filters) {
                    $query->where('name', 'like', "%{$filters['search']}%")
                        ->orWhere('mobile_number', 'like', "%{$filters['search']}%")
                        ->orWhere('email', 'like', "%{$filters['search']}%")
                        ->orWhere('gst_no', 'like', "%{$filters['search']}%");
                });
            })
            ->when(isset($filters['status']), function ($query) use ($filters) {
                $query->where('status', $filters['status']);
            })
            ->when(isset($filters['state_id']), function ($query) use ($filters) {
                $query->where('state_id', $filters['state_id']);
            })
            ->with(['state'])
            ->paginate(10)
            ->withQueryString();



        return Inertia::render('parties/index', [
            'filters' => $filters,
            'parties' => $parties,
            'states' => $this->getState(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'gst_no' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'mobile_number' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'state_id' => 'nullable|exists:states,id',
            'city_id' => 'nullable|exists:cities,id',
            'pin_code' => 'required|string|max:10',
            'account_number' => 'required|string|max:255',
            'account_person_name' => 'required|string|max:255',
            'ifsc_code' => 'required|string|max:20',
            'branch_name' => 'required|string|max:255',
            'status' => 'nullable|string|max:1',
        ]);

        Party::create($validated);

        return redirect()->route('parties.index')->with('success', 'Party added successfully');
    }

    public function create()
    {
        $states = State::select('id', 'name', 'country_id')->get();

        return Inertia::render('parties/create_edit', [
            'states' => $states,
            'cities' => [],
        ]);
    }

    public function edit(string $id)
    {
        $party = Party::findOrFail($id);
        return Inertia::render('parties/create_edit', [
            'party' => $party,
            'states' => $this->getState(),
            'cities' => $this->getCitiesByStateId($party->state_id),
        ]);
    }

    public function update(Request $request, string $id)
    {
        $party = Party::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'gst_no' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'mobile_number' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'state_id' => 'nullable|exists:states,id',
            'city_id' => 'nullable|exists:cities,id',
            'pin_code' => 'required|string|max:10',
            'account_number' => 'required|string|max:255',
            'account_person_name' => 'required|string|max:255',
            'ifsc_code' => 'required|string|max:20',
            'branch_name' => 'required|string|max:255',
            'status' => 'nullable|string|max:1',
        ]);

        $party->update($validated);

        return to_route('parties.index')->with('success', 'Party updated successfully');
    }

    public function destroy(string $id)
    {
        $party = Party::findOrFail($id);
        $party->delete();

        return to_route('parties.index')->with('success', 'Party deleted successfully');
    }

    /**
     * Get cities by state ID.
     *
     * @param int $stateId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCitiesByStateId($stateId)
    {
        return City::select('id', 'name', 'state_id')->where('state_id', $stateId)->get();
    }

    public function getState()
    {
        $cacheKey = 'all_states';

        // Cache duration (in minutes)
        $cacheDuration = 60 * 24 * 7; // 7 days

        // Try to retrieve states from cache
        return Cache::remember($cacheKey, $cacheDuration, function () {
            return State::select('id', 'name', 'country_id')->get();
        });
    }
}
