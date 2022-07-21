<?php

namespace AscentCreative\Forms\Components\Display;

use Illuminate\View\Component;

class Blade extends Component
{


    public $label;
    public $name;
    public $blade;

    public $wrapper;
    public $class;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $blade, $label, $wrapper="bootstrapformgroup", $class = '')
    {
 
        $this->label = $label;
        $this->name = $name;
        // $this->value = $value;
        $this->blade = $blade;

        $this->wrapper = $wrapper;
        $this->class = $class;

    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('forms::components.display.blade');
    }
}
