<?php
namespace AscentCreative\Forms\Structure;

use AscentCreative\Forms\Traits\Structural;
use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;


class HR extends FormObjectBase implements FormComponent {

    use Structural;

    public $component = 'forms-structure-hr';



}