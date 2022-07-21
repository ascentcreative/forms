<?php
namespace AscentCreative\Forms\Fields;

use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;
use Illuminate\View\ComponentAttributeBag;

class Button extends FormObjectBase implements FormComponent {

    public $component = 'forms-fields-button';
    
    public function __construct($name) {
        $this->name = $name;
    }

}