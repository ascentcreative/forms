<?php
namespace AscentCreative\Forms\Traits;

trait UsesRelationships {

    public function traverseRelationship($model, $key) {

        if(str_contains($key, '.')) {
            $ary = explode('.', $key);
            $thisKey = array_shift($ary);
            if($model->$thisKey) {
                $model = $model->$thisKey;
            } else {
                $model = $model->$thisKey()->getRelated();
            }
            return $this->traverseRelationship($model, join('.', $ary));
        } else {
            if(method_exists($model, $key)) {
                return $model->$key();
            }
        }

    }
    
}