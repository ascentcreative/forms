<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component;

/*
 *
 * Creates a SELECT element, populated from a specified DB table, with the selected ID as the value. 
 * Ideal for one-to-many liinkages.
 * 
 */
class BlockSelect extends Component
{

    public $label;
    public $name;
    public $value;

    public $columns;
    public $options;
    public $maxSelect;
    public $maxHeight;
  //

    public $layout;

    public $wrapper;
    public $class;

    public $blockblade;

    public $optionLabelField;
    public $optionKeyField;


    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label, $name, $value=[], $options, $columns=2, $maxSelect=-1, $maxHeight=null, $layout="flex",
                            $optionLabelField='', $optionKeyField=null, $valueField=null, $blockblade='', $wrapper='bootstrapformgroup', $class='')
    {

        $this->label = $label;
        $this->name = $name;

        // ensure the value is an array.
        // extract fields from the Elqouent collection if needed:
        if(!is_null($valueField) && ($value instanceof \Illuminate\Database\Eloquent\Collection)) {
            $this->value = $value->transform( function($item) use ($valueField) { 
                return $item->$valueField;
            })->toArray();
        } else {
            $this->value = $value;
        }
        

        $this->columns = $columns;
        $this->maxSelect = $maxSelect;
        $this->maxHeight = $maxHeight;

        $this->layout = $layout;

        $this->wrapper = $wrapper;
        $this->class = $class;
        $this->blockblade = $blockblade;

        $this->optionLabelField = $optionLabelField;

        // map the options array if needed.
        // (the component blade will read the label field to extract that)
        if(!is_null($optionKeyField)) {
            $this->options = $options->keyBy($optionKeyField);
        } else {
            $this->options = $options;
        }

        
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('forms::components.fields.blockselect');
    }
}
