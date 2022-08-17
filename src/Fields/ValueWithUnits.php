<?php
namespace AscentCreative\Forms\Fields;

use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;
use AscentCreative\Forms\Traits\CanBeValidated;
use AscentCreative\Forms\Traits\CanHaveValue;


class ValueWithUnits extends FormObjectBase implements FormComponent {

    use CanBeValidated, CanHaveValue;

    public $component = 'forms-fields-value-with-units';

    public function __construct($name, $label=null, $units=[]) {
    
        $this->name = $name;
        $this->label = $label;
        $this->units = $units;

    }
    

}
