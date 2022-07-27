<?php 
namespace AscentCreative\Forms\Traits;

use AscentCreative\Forms\Contracts\FormComponent;

trait Structural {

    public $children = [];

    public $defaults = [];

    public function add(FormComponent $component) {
        foreach($this->defaults as $key=>$value) {
            if(!isset($component->$key)) {
                $component->$key($value);
            }
        }
        $this->children[] = $component;
        return $this;
    }

    public function children(Array $children) {
        foreach($children as $child) {

            if($child instanceof \Closure) {
                // evaluate the closure and add the results:
                $items = $child();
                // dd($items);
                if(is_array($items)) {
                    $this->children($items);
                } else {
                    $this->add($items);
                }
                continue;
            } 

            $this->add($child);
        }
        return $this;
    }

    public function renderChildren() {
        
    }

    public function findElementContaining($name) {        
        $match = collect($this->children)->where('name', $name)->first();
        if(!is_null($match)) {
            return $this;
        } else {
            foreach($this->children as $child) {
                if(method_exists($child, 'findElementContaining')) {
                    $match = $child->findElementContaining($name);
                    if(!is_null($match)) {
                        return $child;
                    }
                }
            }
        }
    }

    public function appendChildren($name, $children) {
        // find the element with the provided name.
        // get the children array it's part of, and insert the elements after it.
        $elm = $this->findElementContaining($name);
        if(is_null($elm)) {
            throw new \Exception('Requested element "' . $name . '" not found');
        }

        $elm->children($children);
    }

    public function addAfter($name, $children) {
       
        // find the element with the provided name.
        // get the children array it's part of, and insert the elements after it.
        $elm = $this->findElementContaining($name);
        if(is_null($elm)) {
            throw new \Exception('Requested element "' . $name . '" not found');
        }

        $collection = collect($elm->children);
        $index = $collection->pluck('name')->search($name);

        $spliced = $collection->splice($index+1);

        $elm->children = $collection->merge($children)->merge($spliced);
        
    }

    public function addBefore($name, $children) {

         // find the element with the provided name.
        // get the children array it's part of, and insert the elements after it.
        $elm = $this->findElementContaining($name);
        if(is_null($elm)) {
            throw new \Exception('Requested element "' . $name . '" not found');
        }

        $collection = collect($elm->children);
        $index = $collection->pluck('name')->search($name);

        $spliced = $collection->splice($index);

        $elm->children = $collection->merge($children)->merge($spliced);

    }

    public function getElement($name) {

        $idx = collect($this->children)->pluck('name')->search($name);
        if($idx) {
            return $this->children[$idx];
        } else {
            foreach($this->children as $child) {
                if(method_exists($child, 'getElement')) {
                    $elm = $child->getElement($name);
                    if(!is_null($elm)) {
                        return $elm;
                    }
                }
            }
        }

        return null;
            
    }

}