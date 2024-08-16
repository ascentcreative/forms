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

    public $package;
    public $package_hint;



    public $wrapper;
    public $class;

    // need to implement sortable and max items options
    public $sortable;
    public $maxitems;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label, $name,
                                $relationship,
                                $model=null,
                                $package='app',
                                $wrapper="bootstrapformgroup", $class='',
                                $sortable=false,
                                $maxitems=null)
    {
      
        $this->label = $label;

        $this->name = $name;

        $this->package = $package;
        $this->package_hint = $package == 'app' ? '' : ($package . '::');

        

        if (is_string($relationship)) {
            // dump($model);
            $relationship = $this->traverseRelationship($model, $relationship); //$model->address->country();
        } else {
             //$relationship;
        }

        $val = [];
        if ($relationship) {
            $val = $relationship->get();
        }        

        $this->value = old($name, $val);

        $this->relationship = $relationship;
    
        // // if($relationship == null) {
        //     dump($model);
        //     dump($relationship);
        // }

        $this->source = $relationship->getParent()->getTable();
        $this->target = $relationship->getRelated()->getTable();

        session(['modelTableCache.' . $this->source => get_class($relationship->getParent()) ]);
        session(['modelTableCache.' . $this->target => get_class($relationship->getRelated()) ]);

        $this->wrapper = $wrapper;
        $this->class = $class;

        $this->sortable = $sortable;
        $this->maxitems = $maxitems;

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
