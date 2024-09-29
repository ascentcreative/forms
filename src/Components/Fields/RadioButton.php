<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component;

class RadioButton extends Component
{

   
    public $label;
    public $name;
    public $value;
    public $readonly;
    public $checkedValue;
    public $uncheckedValue;

    public $labelEscape;
    public $labelAfter;
    public $wrapper;
    public $class;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label, $name, $value, $labelEscape=true, $labelAfter=false, $checkedValue=1, $uncheckedValue=null, $wrapper="bootstrapformgroup", $class='', $readonly=false)
    {
       
        $this->label = $label;
        $this->name = $name;
        $this->value = $value;
        $this->readonly = $readonly;

        $this->checkedValue = $checkedValue;
        $this->uncheckedValue = $uncheckedValue;

        $this->wrapper = $wrapper;
        $this->labelEscape = $labelEscape;
        $this->labelAfter = $labelAfter;
        $this->class = $class;

    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('forms::components.fields.radiobutton');
    }
}
