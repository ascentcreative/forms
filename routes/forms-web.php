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

    Route::post('/forms/subformloader', function() {

        // dd(request()->all());
        $key = request()->key;
        $map = (array) json_decode(decrypt(request()->map));

        // dd($map);

        $cls = $map[$key];

        $form = $cls::make('dynamic');

        return view('forms::children', ['children'=>$form->children])->render();


    })->name('forms.subformloader');

});



// generate item blade for MorphPivot
Route::post('/forms/components/morphpivot/add', function() {
    
    $opts = request()->all();

    // dd($opts);
    $morph = $opts['morph'];
    $idx = $opts['idx'];

    $cls = $opts['item']['type'];
    $item = (object) [
        $morph . '_type' => $opts['item']['type'],  
        $morph . '_id' => $opts['item']['id'],
    ];


    $item->$morph = $cls::find($opts['item']['id']);

    return view($opts['bladepath'] . '.' . $opts['morph'] . '.item', ['item'=>$item, 'morph'=>$morph, 'idx'=>-1, 'name'=>$opts['field'] . '[' . $idx . ']'])->render();

    
})->name('forms.components.morphpivot.add');



/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->middleware(['auth', 'can:administer'])->group(function() {


    
});

