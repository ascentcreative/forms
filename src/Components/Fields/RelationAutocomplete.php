<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component;
use AscentCreative\Forms\Traits\UsesRelationships;

/*
 *
 * Creates a SELECT element, populated from a specified DB table, with the selected ID as the value. 
 * Ideal for one-to-many liinkages.
 * 
 */
class RelationAutocomplete extends Component
{

    use UsesRelationships;

    // public $type;
    public $label;
    public $relationship;

    public $name;
    public $value;
    public $readonly;
    public $display;
    public $displayField;
    public $dataurl;

    public $placeholder;
    
    public $wrapper;
    public $class;


    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label, $relationship, $dataurl, $name=null, $model=null, $displayField='title', $placeholder="Begin typing to search...", $wrapper='bootstrapformgroup', $class='', $readonly=false)
    {
       
        $this->label = $label;

        if (is_string($relationship)) {
            // dd($model);
            $relationship = $this->traverseRelationship($model, $relationship); //$model->address->country();
        } else {
             //$relationship;
        }

        $this->dataurl = $dataurl;

        if (is_null($name)) {
            $this->name = $relationship->getRelationName() . '_id';
        } else {
            $this->name = $name;
        }
        
        $this->readonly = $readonly;


        $related = $relationship->getRelated();

        // if the field has [] in, then we need to convert to dot notation
        $oldname = str_replace(['[', ']'], ['.', ''], $this->name);

        if($old = old($oldname)) {
          
            $foreign = $related::find($old); //->first();
            // dd($foreign);
        } else {
            $foreign = $relationship->first();
        }


        // from the relation, build up the data...

        // get the foreign model
        
       
        $this->displayField = $displayField;
        if($foreign) {
            $this->value = $foreign->id;
            $this->display = $foreign->$displayField;
        }
       // dd($relationship);
        $this->placeholder = $placeholder;

    
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
        return view('forms::components.fields.relationautocomplete');
    }
}
