@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

@foreach($options as $key=>$opt)

    <label for="{{ nameToId($name) }}-{{$key}}"  style="display: flex; align-items: center; xheight: 100%; gap: 0.5rem;">

        <input type="radio" value="{{ $key }}" id="{{ nameToId($name) }}-{{$key}}" name="{{ $name }}" 
                @if($value == $key ) checked @endif
                class="{{ $attributes['control-class'] }}" 
                >
        <span>{{ $opt }}</span>

    </label>

@endforeach

@overwrite

