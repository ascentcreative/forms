<?php


Route::middleware('web')->group( function() {

    Route::get('/help/modal/{key}', function($key) {
        return view('help::modal', ['key' => $key]);
    })->name('help.modal');

});




/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->middleware(['auth', 'can:administer'])->group(function() {

    Route::resource('fieldhelp', \AscentCreative\Help\Controllers\Admin\FieldHelpController::class, ['as'=>'admin']);

});

