<?php
namespace AscentCreative\Forms\Fields;

use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;
use AscentCreative\Forms\Traits\CanBeValidated;
use AscentCreative\Forms\Traits\CanHaveValue;


class PivotList extends FormObjectBase implements FormComponent {

    use CanBeValidated, CanHaveValue;

    public $component = 'forms-fields-pivotlist';

    public function __construct($name, $label=null, $type="text") {
        $this->name = $name;
        $this->label = $label;
        $this->type = $type;
    }
    

}