<?php

namespace AscentCreative\Forms\Components\Fields;

use Illuminate\View\Component;

class Croppie extends Component
{

   
    public $label;
    public $name;
    public $value;
  
    public $width;
    public $height;
    public $constrained;
    public $previewScale;
    public $quality;

    public $wrapper;
    public $class;



    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label, $name, $value, $width=0, $height=0, $previewScale=0.5, $quality=0.5, $responsive=false,
                        $wrapper='bootstrapformgroup', $class=''        
                    )
    {
       
        $this->label = $label;
        $this->name = $name;
        $this->value = $value;

        $this->width = $width;
        $this->height = $height;
        
        if ($width == 0 && $height == 0) {
            $this->constrained = 0;
        } else {
            $this->constrained = 1;
        }

        $this->quality = $quality;
        $this->previewScale = $previewScale;
       
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
        return view('forms::components.fields.croppie');
    }
}
