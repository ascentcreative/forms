<?php
namespace AscentCreative\Forms\Structure;

use AscentCreative\Forms\Traits\Structural;
use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;


class HTML extends FormObjectBase implements FormComponent {

    use Structural;

    public $component = 'forms-structure-html';

    public function __construct($htmlStart, $htmlEnd=null) {
        $this->htmlStart = $htmlStart;
        $this->htmlEnd = $htmlEnd;
    }



}