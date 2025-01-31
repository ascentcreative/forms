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
class RelatedTokens extends Component {

    use UsesRelationships;

    public $label;
    public $name;
    public $value;

    public $relationship;
    public $tokenName;
    public $labelField;
    public $idField;
    public $options;
  

    public $wrapper;
    public $class;

    public $allowNewValues;

  


    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label, $name, $value=[], $relationship=null, 
                            $labelField='title', $idField='id',
                            $tokenName='tag',
                            $wrapper='bootstrapformgroup', $class='', $allowNewValues=false, $model=null)
    {

        $this->label = $label;
        $this->name = $name;
        
        $this->value = $value;
        
        $this->relationship = $relationship ?? $name;

        if(is_string($this->relationship)) {
            $this->relationship = $this->traverseRelationship($model, $this->relationship);
        }

        $related = $this->relationship->getRelated();

        $this->tokenName = $tokenName;

        $this->wrapper = $wrapper;
        $this->class = $class;

        $this->allowNewValues = $allowNewValues;

        $this->labelField = $labelField;
        $this->idField = $idField;

        $this->options = $related::all()
                            ->transform(function($item) use ($labelField, $idField) {
                                return [
                                    'id' => $item->$idField,
                                    'label' => $item->$labelField
                                ];
                            });


    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('forms::components.fields.relatedtokens');
    }
}
