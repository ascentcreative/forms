<?php
namespace AscentCreative\Forms;

use Illuminate\View\ComponentAttributeBag;

class FormObjectBase {

    public $name = '';
    public $model = null;

    public $parent = null;

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
        $instance = new $cls(...$args);
        return $instance->initialise();
    }

    static function makeWithDefaults($defaults, ...$args) {
        $cls = get_called_class();
        $instance = new $cls(...$args);
        return $instance->defaults($defaults)
                        ->initialise();
    }

    public function initialise() {
        // does nothing - overrideable
        return $this;
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

            $value = $this->value;
            if(is_null($value)) {
                $value = $this->default;
            }

            // value may be a model. 
            // Old does incoorrect/odd things when failover is a model (i.e. tries to get the field value from the model)
            // so, we'll separate out the value so we can actually return the model as a value.
            
            // also, only allow old() to be used if there is actually old data.
            // otherwise, stored DB values may be used for relationships
            if(count(request()->old()) > 0) {
                $out['value'] = old(dotname($this->name), $value); // ??  $value;  
            } else {
                $out['value'] = $value;
            }

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
                return;
            }

            $prop = dotname($this->name);
            $value = $this->traverseData($data, $prop);
            // $value = '';

            if(!is_null($value)) { //isset($data->$prop)) {
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

            if(is_array($data)) {

                if(isset($data[$thisKey])) {
                    $data = $data[$thisKey];
                    return $this->traverseData($data, join('.', $ary));
                }

            } else if(isset($data->$thisKey)) {
                $data = $data->$thisKey;

                if($data instanceof \Illuminate\Database\Eloquent\Collection) {
                    // the property is a collection, but we're looking for a single item within it
                    // (the provided $key had a dot, meaning a property with a sub property)
                    // - most likely something like: metadata.somekey                 
                    if($data->count() > 0) {

                        // We need to extract the value for "somekey" from the collection. 
                        // - The models in the collection will likely have a key field and a value field.
                        // - The names of these fields will be defined as static variables on the model class:
                        $cls = get_class($data[0]);
                        $keyField = $cls::$forms_keyfield; //'key';
                        $valueField = $cls::$forms_valuefield; // 'value';
                        
                        $subkey = array_shift($ary); // get the second half of the original key
                        $data = $data->keyBy($keyField); 
                        return $data[$subkey]->$valueField ?? null;

                    }

                } else {
                    return $this->traverseData($data, join('.', $ary));
                }

            } else {
           //     dump('end traverse empty handed');
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
