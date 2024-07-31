<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component;

class Input extends Component
{

    public $type;
    public $label;
    public $name;
    public $value;

    public $accept;
    public $autocomplete;

    public $wrapper;
    public $class;

    public $multiple; // only used on file inputs

    public $validators;
    public $required = false;

    public $wireModel;

    public $preelement;
    public $postelement;

    public $placeholder;

    public $size;

    public $min;
    public $step;

    public $autocompleteOptions;


    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($type, $label, $name, $value, $accept="", 
                                    $autocomplete=false, $wrapper="bootstrapformgroup", $class='', $multiple='false',
                                    $wireModel='',
                                    $validators='',
                                    $preelement='',
                                    $postelement='',
                                    $placeholder='',
                                    $size='',
                                    $min=0,
                                    $step=0.01,
                                    $autocompleteOptions = null // used by text input to allow options to be set
                                    )
    {
        $this->type = $type;
        $this->label = $label;
        $this->name = $name;
        $this->value = $value;

        $this->accept = $accept;
        $this->autocomplete = $autocomplete;

        if($this->type == 'hidden') {
            $this->wrapper = 'none';
        } else {
           $this->wrapper = $wrapper;
        }
        $this->class = $class;

        $this->multiple = $multiple;

        $this->preelement= $preelement;
        $this->postelement = $postelement;

        $this->placeholder = $placeholder;
        $this->size = $size;
        $this->min = $min;
        $this->step = $step;

        $this->autocompleteOptions = $autocompleteOptions;

        $this->validators = $validators;
        $aryVld = explode("|", $validators);
        if(array_search('required', $aryVld) !== false) {
            $this->required = true;
        }


        $this->wireModel = $wireModel;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('forms::components.fields.input');
    }
}
