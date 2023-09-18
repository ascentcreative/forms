<?php
namespace AscentCreative\Forms\Fields;

use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;
use AscentCreative\Forms\Traits\CanBeValidated;
use AscentCreative\Forms\Traits\CanHaveValue;


class ContentEditable extends FormObjectBase implements FormComponent {

    use CanBeValidated, CanHaveValue;

    public $component = 'forms-fields-contenteditable';

    public function __construct($name, $label=null) {
        $this->name = $name;
        $this->label = $label;
    }
    

}