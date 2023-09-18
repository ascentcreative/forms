<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component;

class ContentEditable extends Component
{

   
    public $label;
    public $name;
    public $value;

    public $rows;
    public $cols;

    public $wrapper;
    public $class;

    public $charlimit;


    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label, $name, $value, $rows=null, $cols=null, $wrapper="bootstrapformgroup", $class='', $charlimit=null)
    // public function __construct()
    {
        
        $this->label = $label;
        $this->name = $name;
        $this->value = $value;

        $this->rows = $rows;
        $this->cols = $cols;

        $this->wrapper = $wrapper;
        $this->class = $class;

        $this->charlimit = $charlimit;

    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('forms::components.fields.contenteditable');
    }
}
