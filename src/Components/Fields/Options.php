<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component;

class Options extends Component
{

    public $type;
    public $label;
    public $name;
    public $value;

    public $options;

    public $includeNullItem;
    public $nullItemLabel;

    public $wrapper;
    public $class;


    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($type, $label, $name, $value, $options, $wrapper="bootstrapformgroup", $class='',
                                    $includeNullItem = true, $nullItemLabel = '- Select -'
                                )
    {
        $this->type = $type;
        $this->label = $label;
        $this->name = $name;
        $this->value = $value;

        $this->options = $options;

        // Only used by SELECT type fields
        $this->includeNullItem = $includeNullItem;
        $this->nullItemLabel = $nullItemLabel;

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
        return view('forms::components.fields.options.' . $this->type);
    }
}
