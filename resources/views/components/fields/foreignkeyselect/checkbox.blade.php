@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    {{-- Need a hidden text element to allow for an empty value --}}
    {{-- Otherwise, values won't be deleted when the model is saved when all checkboxes have been unticked --}}
    <input type="hidden" name="{{$name}}" value=""/>

    <div style="xcolumns: 3; display: grid">
    <?php 
     
        if($readonly) {
            $opts = $readOnlyQuery->orderBy($sortField, $sortDirection)->get();
        } else {
            $opts = $query->orderBy($sortField, $sortDirection)->get();
        }

       if(is_array($value) || is_null($value)) {
           $keys = $value;
       } else {
           $keys = array_keys($value->keyBy($idField)->toArray());
       }

        ?>

        @foreach ($opts as $opt)
      
            <label class="col-form-label" style="display: block">
                <input type="checkbox" name="{{$name}}[]" value="{{ $opt->$idField }}" xclass="form-control" 

                @if(!is_null($value) && array_search($opt->$idField, $keys) !== false)

                {{-- @if (array_search($opt->$idField, $value->toArray() ) !== false) --}}
                    checked="checked"
                @endif 


                /> {{ $opt->$labelField }}
            </label>

       
        @endforeach

    </div>

@overwrite