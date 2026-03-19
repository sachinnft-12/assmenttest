<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class CustomerPageController extends Controller
{
    public function show(string $creatorSlug): Response
    {
        $creator = User::query()
            ->where('slug', $creatorSlug)
            ->with(['trackingCodes' => fn ($query) => $query->where('is_active', true)->latest()])
            ->firstOrFail();

        return Inertia::render('Customer/Show', [
            'creator' => [
                'id' => $creator->id,
                'name' => $creator->name,
                'slug' => $creator->slug,
            ],
            'trackingCodes' => $creator->trackingCodes->map(fn ($trackingCode) => [
                'id' => $trackingCode->id,
                'name' => $trackingCode->name,
                'script' => $trackingCode->script,
            ]),
        ]);
    }
}
