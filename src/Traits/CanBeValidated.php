<?php 
namespace AscentCreative\Forms\Traits;

use AscentCreative\Forms\Contracts\FormComponent;

/**
 * Functions used by elements which might need to generate validation rules and messages
 */
trait CanBeValidated {

    public $rules = [];
    public $messages = [];
    public $unique_class = '';

    /**
     * appends a number of rules to the array
     * @param mixed $mixed
     * 
     * @return [type]
     */
    public function rules($mixed) {
        if(!is_array($mixed)) {
            $mixed = [$mixed];
        }
        $this->rules = array_merge($this->rules, $mixed);
        return $this;
    }

    /**
     * appends a number of messages to the array
     * @param mixed $mixed
     * 
     * @return [type]
     */
    public function messages($mixed) {
        if(!is_array($mixed)) {
            $mixed = [$mixed];
        }
        $this->messages = array_merge($this->messages, $mixed);
        return $this;
    }

    /**
     * helper function to set the required rule
     * @param mixed $bool
     * @param mixed $msg=null
     * 
     * @return [type]
     */
    public function required($bool, $msg=null) {
        if($bool){
            // put required at the start of the array...
            $this->rules = array_merge(['required'], $this->rules); //'required';
        } else {
            unset($this->rules[array_search('required', $this->rules)]);
        }
        if($msg) {
            $this->messages['required'] = $msg;
        }
        return $this;
    }

    /**
     * helper function to set the unique rule
     * @param mixed $class
     * @param mixed $bool=true
     * @param mixed $msg=null
     * 
     * @return [type]
     */
    public function unique($class, $bool=true, $msg=null) {
        
        $this->unique_class = $class;
        if($bool) {
            $this->rules[] = 'unique';
        } else {
            unset($this->rules[array_search('unique', $this->rules)]);
        }

        if($msg) {
            $this->messages['required'] = $msg;
        }
        return $this;
    }

    /**
     * compiles the rules into the format needed by the validator
     * @param mixed $input
     * 
     * @return [type]
     */
    public function compileRules ($input) {
      
        // compile the 'unique' rule, if set:
        if(($idx = array_search('unique', $this->rules)) !== false) {
            $unique = 'unique:' . $this->unique_class . ',' . $this->name;

            // if there's an ID in the input, use that to set the exclude parameter
            if(isset($input['id'])) {
                $unique .= ',' . $input['id'];
            }

            $this->rules[$idx] = $unique;
        }

        // key the rules against the field name
        return [dotname($this->name) => $this->rules]; // don't use a string / join as some rules may be objects

    }

    /**
     * compiles the messages array into the format needed by the validator
     * @param mixed $input
     * 
     * @return [type]
     */
    public function compileMessages($input) {

        $out = [];
        foreach($this->messages as $key=>$value) {
            $out[dotname($this->name) . '.' . $key] = $value;
        }

        return $out;
    }


}