<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component;

class Colour extends Component
{

    public $label;
    public $name;
    public $value;

    public $wrapper;
    public $class;
    public $elementClass;
    public $palette;

    public $manualInit;


    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label, $name, $value, $wrapper="bootstrapformgroup", $class='', $elementClass = '', $manualInit=false)
    {
    
        $this->label = $label;
        $this->name = $name;
        $this->value = $value;

        $this->wrapper = $wrapper;
        $this->class = $class;
        $this->elementClass = $elementClass;

        $this->palette = \AscentCreative\CMS\Models\Swatch::all()->transform(function($item, $key) { return $item->hex; })->prepend('transparent');
        
        $this->manualInit = $manualInit;

    }


    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('forms::components.fields.colour');
    }
}
