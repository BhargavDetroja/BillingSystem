<?php

namespace App\Http\Controllers;

use App\Models\Transport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransportController extends Controller
{
    public function index()
    {
        $filters = request()->only(['search', 'status']);

        $transports = Transport::query()
            ->when(isset($filters['search']), function ($query) use ($filters) {
                $query->where(function ($query) use ($filters) {
                    $query->where('name', 'like', "%{$filters['search']}%")
                        ->orWhere('transport_id', 'like', "%{$filters['search']}%")
                        ->orWhere('mobile_number', 'like', "%{$filters['search']}%")
                        ->orWhere('gst_no', 'like', "%{$filters['search']}%");
                });
            })
            ->when(isset($filters['status']), function ($query) use ($filters) {
                $query->where('status', $filters['status']);
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('transports/index', [
            'filters' => $filters,
            'transports' => $transports,
        ]);
    }

    public function create()
    {
        // Generate next transport ID (you can customize this as needed)
        $lastTransport = Transport::orderBy('id', 'desc')->first();
        $nextId = $lastTransport ? 'TR' . str_pad((intval(substr($lastTransport->transport_id, 2)) + 1), 3, '0', STR_PAD_LEFT) : 'TR001';

        return Inertia::render('transports/create_edit', [
            'nextTransportId' => $nextId
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'transport_id' => 'required|string|max:255|unique:transports',
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'mobile_number' => 'nullable|string|max:20',
            'gst_no' => 'nullable|string|max:20',
            'status' => 'nullable|string|max:1',
        ]);

        Transport::create($validated);

        return redirect()->route('transports.index')->with('success', 'Transport added successfully');
    }

    public function edit(string $id)
    {
        $transport = Transport::findOrFail($id);

        return Inertia::render('transports/create_edit', [
            'transport' => $transport,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $transport = Transport::findOrFail($id);

        $validated = $request->validate([
            'transport_id' => 'required|string|max:255|unique:transports,transport_id,' . $id,
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'mobile_number' => 'nullable|string|max:20',
            'gst_no' => 'nullable|string|max:20',
            'status' => 'nullable|string|max:1',
        ]);

        $transport->update($validated);

        return to_route('transports.index')->with('success', 'Transport updated successfully');
    }

    public function destroy(string $id)
    {
        $transport = Transport::findOrFail($id);
        $transport->delete();

        return to_route('transports.index')->with('success', 'Transport deleted successfully');
    }
}
