<?php

namespace AscentCreative\Forms\Components\Structure;

use Illuminate\View\Component;

class HTML extends Component
{

    public $htmlStart;
    public $htmlEnd;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($htmlStart=null, $htmlEnd=null)
    {
        $this->htmlStart = $htmlStart;
        $this->htmlEnd = $htmlEnd;       
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('forms::components.structure.html');
    }
}
