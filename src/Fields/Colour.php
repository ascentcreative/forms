<?php
namespace AscentCreative\Forms\Fields;

use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;
use AscentCreative\Forms\Traits\CanBeValidated;
use AscentCreative\Forms\Traits\CanHaveValue;


class Colour extends FormObjectBase implements FormComponent {

    use CanBeValidated, CanHaveValue;

    public $component = 'forms-fields-colour';

    public function __construct($name, $label=null) {
        $this->name = $name;
        $this->label = $label;

        $this->palette = \AscentCreative\CMS\Models\Swatch::all()->transform(function($item, $key) { return $item->hex; })->prepend('transparent');
        
    }
    

}