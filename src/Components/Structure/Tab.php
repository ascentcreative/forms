<?php

namespace AscentCreative\Forms\Components\Structure;

use Illuminate\View\Component;

class Tab extends Component
{

    public $tabstack;

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
        return view('forms::components.structure.tab');
    }
}
