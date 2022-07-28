<?php
namespace AscentCreative\Forms\Fields;

use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;
use Illuminate\View\ComponentAttributeBag;

class BlockSelect extends FormObjectBase implements FormComponent {

    public $component = 'forms-fields-blockselect';
    
    public function __construct($name, $label) {
        $this->name = $name;
        $this->label = $label;
    }

}