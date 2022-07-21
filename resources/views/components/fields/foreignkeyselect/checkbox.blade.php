@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    <div style="xcolumns: 3; display: grid">
    <?php 
     
       $opts = $query->orderBy($labelField)->get();

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