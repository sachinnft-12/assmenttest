<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\TrackingCode;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrackingCodeController extends Controller
{
    public function index(Request $request): Response
    {
        $trackingCodes = $request->user()
            ->trackingCodes()
            ->latest()
            ->get(['id', 'name', 'script', 'is_active', 'updated_at']);

        return Inertia::render('Settings/TrackingCodes/Index', [
            'trackingCodes' => $trackingCodes,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Settings/TrackingCodes/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $attributes = $this->validated($request);

        $request->user()->trackingCodes()->create($attributes);

        return redirect()
            ->route('settings.tracking-codes.index')
            ->with('success', 'Tracking code created successfully.');
    }

    public function edit(TrackingCode $trackingCode): Response
    {
        $this->authorizeOwnership($trackingCode);

        return Inertia::render('Settings/TrackingCodes/Edit', [
            'trackingCode' => $trackingCode,
        ]);
    }

    public function update(Request $request, TrackingCode $trackingCode): RedirectResponse
    {
        $this->authorizeOwnership($trackingCode);

        $trackingCode->update($this->validated($request));

        return redirect()
            ->route('settings.tracking-codes.index')
            ->with('success', 'Tracking code updated successfully.');
    }

    public function destroy(TrackingCode $trackingCode): RedirectResponse
    {
        $this->authorizeOwnership($trackingCode);
        $trackingCode->delete();

        return redirect()
            ->route('settings.tracking-codes.index')
            ->with('success', 'Tracking code deleted successfully.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'script' => ['required', 'string'],
            'is_active' => ['sometimes', 'boolean'],
        ]);
    }

    private function authorizeOwnership(TrackingCode $trackingCode): void
    {
        abort_unless($trackingCode->user_id === auth()->id(), 403);
    }
}
