<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component;

class ValueWithUnits extends Component
{

    public $label;
    public $name;
    public $value;
    public $orig;

    public $units;
    
    public $wrapper;
    public $class;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label, $name, $value, $units, $wrapper="bootstrapformgroup", $class='')
    {
     
        $this->orig = $value;

        $this->units = collect($units)->mapWithKeys(function($item, $key) {
            return [$item => $item];
        })->toArray();

        // $value="50px";
        
        // parse incoming value...
        if(!is_null($value) && $value != '') {
            
            preg_match('/(?<amount>\-?\d*\.?\d+)\s?(?<unit>' . join('|', $units) . '+)/', $value, $matches);
            // dd($matches);
            $this->value=$matches;

        }


        $this->label = $label;
        $this->name = $name;
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
        return view('forms::components.fields.value-with-units');
    }
}
