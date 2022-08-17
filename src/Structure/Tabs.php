<?php
namespace AscentCreative\Forms\Structure;

use AscentCreative\Forms\Traits\Structural;
use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;


class Tabs extends FormObjectBase implements FormComponent {

    use Structural;

    public $component = 'forms-structure-tabs';
    public $tabstack;

    public function __construct($name) {
        $this->name = $name;
        $this->tabstack = 'tabs_' . uniqid();
    }
}