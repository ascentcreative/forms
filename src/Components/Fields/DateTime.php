<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component;

class DateTime extends Component
{

    public $label;
    public $name;
    public $date_value;
    public $time_value;

    public $wrapper;
    public $class;


    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct( $label, $name, $value, $wrapper="bootstrapformgroup", $class='')
    {
       
        $this->label = $label;
        $this->name = $name;
        //$this->value = $value;

      //  dd($value);

        if (is_array($value)) { 

            $this->date_value = $value['date'];
            $this->time_value = $value['time'];


        }  else {

            if (!is_null($value) && trim($value) != '') {
                $ary = explode(" ", $value);
                $this->date_value = $ary[0];
                $this->time_value = $ary[1];
            }

        }

        $this->wrapper = $wrapper;
        $this->class = $class;

    }


    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('forms::components.fields.datetime');
    }
}
