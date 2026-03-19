<?php

use App\Http\Controllers\CustomerPageController;
use App\Http\Controllers\Settings\TrackingCodeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('settings')
    ->name('settings.')
    ->group(function (): void {
        Route::resource('tracking-codes', TrackingCodeController::class)->except(['show']);
    });

Route::prefix('customer')->name('customer.')->group(function (): void {
    Route::get('/{creatorSlug}', [CustomerPageController::class, 'show'])->name('show');
});
