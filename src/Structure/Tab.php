<?php
namespace AscentCreative\Forms\Structure;

use AscentCreative\Forms\Traits\Structural;
use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;


class Tab extends FormObjectBase implements FormComponent {

    use Structural;

    public $component = 'forms-structure-tab';

    public function __construct($name, $label) {
        $this->name = $name;
        $this->label = $label;
    }


}