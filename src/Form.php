<?php
namespace AscentCreative\Forms;

use AscentCreative\Forms\FormObjectBase;

use AscentCreative\Forms\Traits\Structural;
use AscentCreative\Forms\Traits\CanValidate;


class Form extends FormObjectBase   {

    use Structural, CanValidate;

    public $method = 'POST';
    protected $data = null;
    public $dirtyDetect = true;
    public $readonly = false;
    public $tag_attributes = [];

    public function render() {   
        $this->populate();
        return view('forms::form', ['form'=>$this]);
    }

    public function data($data) {
        $this->data = $data;
        $this->populate();
        return $this;
    }

    public function attribute($name, $value) {
        $this->tag_attributes[$name] = $value;
        return $this;
    }

}