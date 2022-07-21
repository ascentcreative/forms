<?php
namespace AscentCreative\Forms;

use Illuminate\View\ComponentAttributeBag;

class FormObjectBase {

    public $name = '';
    public $model = null;

   /**
    * Static make function for convenience
    * Just calls the constructor. 
    * Variadic params mean the constructor signature matches whatever definition the child class has. 
    *
    * @param mixed ...$args
    * 
    * @return [type]
    */
    static function make(...$args) {
        $cls = get_called_class();
        return new $cls(...$args);
    }

    /**
     * Magic Attribute Setter
     * @param mixed $method
     * @param mixed $params=null
     * 
     * @return [type]
     */
    public function __call($method, $params=null) {
        // var_dump($params);
        if(!method_exists($this, $method)) {
            if(isset($params[0])) {
                $this->$method = $params[0];
            }
            return $this;
        }
    
    }


    /**
     * Export all the attributes as an array
     * - May need to implement an 'Appends' / 'Excludes' like Eloquent does
     * @return [type]
     */
    protected function buildAttributesArray() {

        $out = [];
        foreach($this as $key=>$value) {
            $out[$key] = $value;
        }

        if($this->canHaveValue ?? false) {
            $out['value'] = old(dotname($this->name), $this->value ?? $this->default); 
        }

        if(property_exists($this, 'rules')) {
            if(in_array('required', $this->rules)) {
                $out['required'] = true;
            }
        }

        return $out;

    }

    /**
     * Returns the attributes in a component bag
     * @return [type]
     */
    public function getAttributes() {
        return new ComponentAttributeBag($this->buildAttributesArray());
    }

    public function populate($data=null) {

        $this->model($data);
        
        if(is_null($data)) {
            if(isset($this->data)) {
                $data = $this->data;
            } else {
                throw new \Exception("No data to populate with");
            }
        }

        if(isset($this->defaultValueFunction) && $this->defaultValueFunction instanceof \Closure) {
            $fn = $this->defaultValueFunction;
            $this->default = $fn($data);
        }

        // if the data has a property for the name of this object, set the value:
        if(isset($this->name) && $this->name != '') {

            // allow for value to have been set as a closure?
            if(isset($this->valueFunction) && $this->valueFunction instanceof \Closure) {
                $fn = $this->valueFunction;
                $this->value = $fn($data);
            }

            $prop = dotname($this->name);
            $value = $this->traverseData($data, $prop);
            // $value = '';
            
            if($value) { //isset($data->$prop)) {
                $this->value($value); //$data->$prop);
            } else {
                // dump('no value for ' . $prop);
            }
        }

        // dd(collect($data->toArray())); //->pluck(dotname($this->name)));
            
        // recurse:
        if(isset($this->children)) {
            foreach($this->children as $child) {
                $child->populate($data);
            }
        }

        return $this;
    }


    public function traverseData($data, $key) {

        if(str_contains($key, '.')) {
            $ary = explode('.', $key);
            $thisKey = array_shift($ary);
            if(isset($data->$thisKey)) {
                $data = $data->$thisKey;
                return $this->traverseData($data, join('.', $ary));
            }
        } else {

            if(is_array($data)) {
                $data = (object) $data;
            }
     
            if(isset($data->$key)) {
                return $data->$key;
            } else {
                // return '';
            }
        }

    }


}
