<?php
namespace AscentCreative\Forms\Display;

use AscentCreative\Forms\Traits\Structural;
use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;


class ActivityLog extends FormObjectBase implements FormComponent {

    use Structural;

    public $component = 'forms-display-activitylog';

    public function __construct($name, $label) {
        $this->name = $name;
        $this->label = $label;
    }



}