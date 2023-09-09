@extends('forms::components.wrappers.' . $wrapper)

@section('label')
@if($labelAfter)

@else
    {{$label}}
@endif
@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    @if($readonly) 

        <div class="col-form-label">
            @if($value == $checkedValue)
                <span class="badge badge-primary">Yes</span>
            @else
                <span class="badge badge-secondary">No</span>
            @endif
        </div>

    @else

        @if(!is_null($uncheckedValue))
            <input type="hidden" id="{{$name}}-unchecked" name="{{$name}}" value="{{$uncheckedValue}}"/>
        @endif
        
        <div style="display: flex; align-items: center; height: 100%;" class="pt-1">
            <input type="checkbox" id="{{$name}}" name="{{$name}}" value="{{$checkedValue}}"
            
            @if($value == $checkedValue)
            checked
            @endif
            
            class="{{ $attributes['control-class'] }}" 
            />

            @if($labelAfter)
                <label class="flex-label-text pl-3 mb-0" for="{{$name}}">@if($labelEscape){{$label}}@else{!! $label !!}@endif</label>
            @endif
        </div>

    @endif

@overwrite