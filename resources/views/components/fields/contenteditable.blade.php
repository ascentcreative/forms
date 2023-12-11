@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    <div class="forms-contenteditable">
        <div class="fce-edit" contenteditable="true" 
        @isset($attributes['min-height']) style="min-height: {{ $attributes['min-height'] }}" @endisset
        >{!! $value !!}</div>
        <textarea name="{{$name}}" id="{{ nameToId($name) }}">{{$value}}</textarea>
    </div>

@overwrite