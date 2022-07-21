<?php
namespace AscentCreative\Forms\Structure;

use AscentCreative\Forms\Traits\Structural;
use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;
use Illuminate\View\ComponentAttributeBag;

class Fieldset extends FormObjectBase implements FormComponent {

    use Structural;

    public $component = 'forms-structure-fieldset';

    public function __construct($name) {
        $this->name = $name;
    }


}