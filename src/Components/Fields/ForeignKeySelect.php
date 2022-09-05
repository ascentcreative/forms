<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component;

/*
 *
 * Creates a SELECT element, populated from a specified DB table, with the selected ID as the value. 
 * Ideal for one-to-many liinkages.
 * 
 */
class ForeignKeySelect extends Component
{

    public $type;
    public $label;
    public $name;
    public $value;
    public $readonly;

  //  public $model;
    public $query;
    public $readOnlyQuery;
    public $labelField;
    public $sortField;
    public $sortDirection;
    public $idField;
    public $nullItemLabel;


    public $wrapper;
    public $class;

    public $attr;


    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label, $name, $query, $type='select', $value=[], $readOnlyQuery=null, $labelField="title", $sortField=null, $sortDirection="ASC", $idField="id", $nullItemLabel=null, $wrapper='bootstrapformgroup', $class='', $readonly=false)
    {
        $this->type = $type;
        $this->label = $label;
        $this->name = $name;
        $this->value = $value;
        $this->readonly = $readonly;
        
        if(is_null($nullItemLabel)) {
            switch($type) {
                case 'autocomplete':
                    $nullItemLabel = "Enter a few characters to search...";
                    break;

                default:
                    $nullItemLabel = "Please Select:";
                    break;
            }
        }

        $this->nullItemLabel = $nullItemLabel;

        // foreign model / table info:
          //  $this->model = $model;

        $this->query = $query; // Builder instance allowing filters to be applied to the dataset
        $this->readOnlyQuery = $readOnlyQuery ?? $query;

        $this->labelField = $labelField;
        if(is_null($sortField)) {
            $this->sortField = $labelField;
        } else {
            $this->sortField = $sortField;
        }
        $this->sortDirection = $sortDirection;
        $this->idField = $idField;

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
        return view('forms::components.fields.foreignkeyselect.' . $this->type);
    }
}
