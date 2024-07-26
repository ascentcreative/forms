<?php
namespace AscentCreative\Forms\Structure;

use AscentCreative\Forms\Traits\Structural;
use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;
use Illuminate\View\ComponentAttributeBag;

class Subform extends FormObjectBase implements FormComponent {

    use Structural;

    // public $loaderData = [];

    public $component = 'forms-structure-subform';

    public function __construct($name, $loaderData = []) {
        $this->name = $name;
        $this->loaderData = $loaderData;
    }


}