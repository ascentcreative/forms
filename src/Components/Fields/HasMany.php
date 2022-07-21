<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component; 
use AscentCreative\Forms\Traits\UsesRelationships;

/* Form component designed to work with a HasMany eloquent relation */
class HasMany extends Component
{

    use UsesRelationships;


    public $label;
    public $name;
    public $value;

    public $relationship;

    public $source;
    public $target;




    public $wrapper;
    public $class;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label, $name,
                                $relationship,
                                $model=null,
                                $wrapper="bootstrapformgroup", $class='')
    {
      
        $this->label = $label;

        $this->name = $name;

        if (is_string($relationship)) {
            // dd($model);
            $relationship = $this->traverseRelationship($model, $relationship); //$model->address->country();
        } else {
             //$relationship;
        }

        $this->value = old($name, $relationship->get());

        $this->relationship = $relationship;
    
      
        $this->source = $relationship->getParent()->getTable();
        $this->target = $relationship->getRelated()->getTable();

        session(['modelTableCache.' . $this->source => get_class($relationship->getParent()) ]);
        session(['modelTableCache.' . $this->target => get_class($relationship->getRelated()) ]);

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
        return view('forms::components.fields.hasmany');
    }
}
