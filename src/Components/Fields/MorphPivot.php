<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component;
use Illuminate\Database\Eloquent\Collection;

class MorphPivot extends Component
{

    public $label;
    public $name;
    public $id;
    public $value;

    public $morph; // the morph label: xyz_type / xyz_id.

    public $bladepath;

    public $dataval;

    public $optionRoute;
    public $storeRoute;
    public $labelField;
    public $addToAll;
    public $sortField;
    public $pivotField;
    public $pivotFieldLabel;
    public $pivotFieldPlaceholder;

    public $wrapper;
    public $class;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label, $name, $value, $morph, $optionRoute, $optionModel, $labelField, 
                                $bladepath='components.morphpivot', 
                                $addToAll=null, $sortField=null, 
                                $pivotField=null, $pivotFieldLabel=null, $pivotFieldPlaceholder=null,
                                $class="", $storeRoute=null,
                                $wrapper="bootstrapformgroup")
    {
     
        /*
          The Label to display next to the component
          */
        $this->label = $label;

        /* 
        The field name (to match model property name)
        */
        $this->name = $name;
        $this->id = str_replace(array('[', ']'), array('--', ''), $name);
        
        /*
        The value to set the component with on form load
        */
        //$this->value = $value;
        $this->morph = $morph;
        

        $this->bladepath = $bladepath;
     
        
        /*
        The URL to which the type-ahead/automplete terms will be sent
        */
        $this->optionRoute = $optionRoute;

        /*
        The URL to which requests to create a new item will be sent
        (Optional - only use if simple values as typed wouuld make a valid item. i.e. simple themes etc)
        */
        $this->storeRoute = $storeRoute;

        /*
        The field from the autocomplete data to be used as the label for the individual elements
        */
        $this->labelField = $labelField;

        /*
        [OPTIONAL] 
        An array of fieldname=>value - this will be set on all items when the data is submitted.
        Useful where the pivot rows are classified by different types/roles
        */
        $this->addToAll = $addToAll;

        /*
        [OPTIONAL]
        The name of the pivot table field which controls the sort order of the elements. 
        Specifying this makes the list draggable/sortable. The indexes are written to this field and
        submitted to the server
        */
        $this->sortField = $sortField;

        /* 
        [OPTIONAL]
        The fieldname of a text field to add to the elements. Allows extra user input to be given. 
        The entered value will be written the field of this name in the pivot table.
        */
        $this->pivotField = $pivotField;

        /*
        [OPTIONAL]
        A text label for the above pivotField
        */
        $this->pivotFieldLabel = $pivotFieldLabel;

        /*
        [OPTIONAL]
        Text to show in the pivotField when no value ahs been entered
        */
        $this->pivotFieldPlaceholder = $pivotFieldPlaceholder;

        // can something here fill in the missing display-only data?
        // i.e. if we tell the component which model it's displaying, and the label property
        // the code can fetch that on load. 
        // this will keep the transmitted data to a minimum and match the format required for the sync
        // 

        $this->optionModel = $optionModel; // really we should pull this out of the relationship

        

        if (is_object($value) && $value instanceof Collection) {

            $this->value = $value;

        } else if (is_array($value)) {

            $val = [];

            foreach($value as $item) {

                $inst = $optionModel::find($item['id']);

                if(!$inst) {
                    $inst = (object) $item;
                    $morphtype = $item[$morph . '_type'];
                    $morphid = $item[$morph . '_id'];
                    $morphInst = $morphtype::find($morphid);
                    $inst->$morph = $morphInst;
                }

                $val[] = $inst;

            }

            $this->value = $val;

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
        return view('forms::components.fields.morphpivot');
    }
}
