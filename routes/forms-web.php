<?php


Route::middleware('web')->group( function() {

    Route::get('/forms/test-form', function() {
        $form = new AscentCreative\Forms\TestForm();

        return view('forms::test', ['form'=>$form]);
        return $form->render();
    });

    Route::post('/forms/test-form', function() {
        $form = new AscentCreative\Forms\TestForm();

        $form->validate(request()->all());

        return view('forms::test-result', ['form'=>$form]);

    });

});




/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->middleware(['auth', 'can:administer'])->group(function() {


    
});

