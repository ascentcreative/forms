<?php
namespace AscentCreative\Forms\Components;

use Illuminate\View\Component;

class FormModal extends Component
{

    public $form;
    public $title;
    public $closebutton;
    public $centered = false;
    public $size;

    public $modalShowHeader = true;
    public $modalShowFooter = true;

    public function __construct($form, $title='', $closebutton=true, $centered=false, $showHeader=true, $showFooter=true, $size="modal-lg") {

        $this->form = $form;
        $this->title = $title;
        $this->closebutton = $closebutton;
        $this->centered = $centered;
        $this->modalShowHeader = $showHeader;
        $this->modalShowFooter = $showFooter;
        $this->size = $size;

    }


    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('forms::components.formmodal');
    }

}