<?php
namespace AscentCreative\Forms\Display;

use AscentCreative\Forms\Traits\Structural;
use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;


class Blade extends FormObjectBase implements FormComponent {

    use Structural;

    public $component = 'forms-display-blade';

    public function __construct($name, $blade, $label) {
        $this->name = $name;
        $this->blade = $blade;
        $this->label = $label;
    }



}