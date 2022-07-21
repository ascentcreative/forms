@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

@foreach($options as $key=>$opt)

    <label for="{{ nameToId($name) }}-{{$key}}">

        <input type="radio" value="{{ $key }}" id="{{ nameToId($name) }}-{{$key}}" name="{{ $name }}" @if($value == $key ) checked @endif>
        <span>{{ $opt }}</span>

    </label>

@endforeach

@overwrite

