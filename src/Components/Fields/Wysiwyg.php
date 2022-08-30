<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component;

class Wysiwyg extends Component
{

   
    public $label;
    public $name;
    public $value;

    public $styled;
  
    public $wrapper;
    public $class;
    public $readonly;

    public $toolbar;
    public $placeholder;



    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label, $name, $value, 
                        $toolbar='', $placeholder = '',
                        $wrapper='bootstrapformgroup', $class='',
                        $styled=false, $readonly=false    
                    )
    {
       
        $this->label = $label;
        $this->name = $name;
        $this->value = $value;

        $this->styled = $styled;

        $this->toolbar = $toolbar;
        $this->placeholder = $placeholder;
       
        $this->wrapper = $wrapper;
        $this->class = $class;
        $this->readonly = $readonly;

    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('forms::components.fields.wysiwyg');
    }
}
