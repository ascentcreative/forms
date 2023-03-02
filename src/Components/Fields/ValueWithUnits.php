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
    public function __construct($label, $name, $value, $units, $wrapper="bootstrapformgroup", $class='', $preserveUnitKeys=false, $allowStringValue=false)
    {
     
        $this->orig = $value;

        if(!$preserveUnitKeys) {
            $this->units = collect($units)->mapWithKeys(function($item, $key) {
                return [$item => $item];
            })->toArray();
        } else {
            $this->units = $units;
        }


        // parse incoming value...
        if(!is_null($value) && $value != '') {
            
            if($allowStringValue) {
                $unitMatch = join('|', array_filter(array_keys($units)));
                $pattern = '/(?<amount>.*?(?=(' . $unitMatch . '|$)))?(?<unit>' . $unitMatch . ')?/';
                preg_match($pattern, $value, $matches);
            } else {
                preg_match('/(?<amount>\-?\d*\.?\d+)\s?(?<unit>' . join('|', $units) . '+)/', $value, $matches);
            }

            // dump($pattern);
            // dump($matches);

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
