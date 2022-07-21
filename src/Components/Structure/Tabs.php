<?php

namespace AscentCreative\Forms\Components\Structure;

use Illuminate\View\Component;

class Tabs extends Component
{

    public $tabbar;
    public $styled=true;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($styled=true)
    {
        $this->styled = $styled;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('forms::components.structure.tabs');
    }
}
