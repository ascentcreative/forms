<?php
namespace AscentCreative\Forms\Structure;

use AscentCreative\Forms\Traits\Structural;
use AscentCreative\Forms\Contracts\FormComponent;
use AscentCreative\Forms\FormObjectBase;
use Illuminate\View\ComponentAttributeBag;

use AscentCreative\Forms\Structure\HTML;
use AscentCreative\Forms\Fields\Textarea;

class SubformLoader extends FormObjectBase implements FormComponent {

    use Structural;

    public $component = 'forms-structure-subformloader';

    public function __construct($name, $source, $map) {

        $this->name = $name;
        $this->source = $source;
        $this->map = $map;

        $this->children([
            // HTML::make('here')
        ]);

    }

    public function initSubform($data) {

      
        $data = (object) $data;
         // resolve the value of the source field into the relevant subform:
        $source = $this->source; 

        $key = old(dotname($this->source), $data->$source);

        if($key) {
            
            if(isset($this->map[$key])) {
                $subform = $this->map[$key]; //$data->$source];
            } else {
                $subform = $this->map['default'];
            }
        
            // instantiate the necessary subform based on the value
            $this->children([
                $subform::make('dynamic', ['source' => $source, 'key' => $key]),
            ]);

        }



    }

    public function populate($data=null) {

        $this->initSubform($data);
       
        // and then call populate on the parent:
        parent::populate($data);

    }

    public function compileRules($input) {

        $this->initSubform($input);

        return []; // no rules on the subform element. The form will interrogate the child elemnts.

    }


}