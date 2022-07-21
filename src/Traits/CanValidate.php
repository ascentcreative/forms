<?php 
namespace AscentCreative\Forms\Traits;

use AscentCreative\Forms\Contracts\FormComponent;
use Illuminate\Support\Facades\Validator;

trait CanValidate {

    /**
     * Perform validation on the supplied input data
     * 
     * @param mixed $input
     * 
     * @return [type]
     */
    public function validate($input) {

        $val = $this->getValidationData($input);
        Validator::validate($input, $val['rules'], $val['messages']);
        
        return true;

    }

    /**
     * Recursive function to get all the rules and messages from the form elements
     * 
     * @param mixed $component=null
     * @param mixed $bag=null
     * 
     * @return [type]
     */
    public function getValidationData($input, $component=null, $bag=null) {

        if(is_null($component)) {
            $component = $this;
        }

        if(is_null($bag)) {
            $bag = ['rules'=>[], 'messages'=>[]];
        }

        if(method_exists($component, 'compileRules')) {
            $bag['rules'] = array_merge($bag['rules'], $component->compileRules($input));
        }

        if(method_exists($component, 'compileMessages')) {
            $bag['messages'] = array_merge($bag['messages'], $component->compileMessages($input));
        }

        if(isset($component->children)) {
            foreach($component->children as $child) {
                $bag = $this->getValidationData($input, $child, $bag);
            }
        }

        return $bag;

    }

}