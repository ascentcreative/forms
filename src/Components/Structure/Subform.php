<?php

namespace AscentCreative\Forms\Components\Structure;

use Illuminate\View\Component;

class Subform extends Component
{

    public $loaderData = [];

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
       
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('forms::components.structure.subform');
    }
}
