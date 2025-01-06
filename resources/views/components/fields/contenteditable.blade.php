@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    <div class="forms-contenteditable" data-pastetextonly="{{ $pasteTextOnly }}">
        <div class="form-control fce-edit" contenteditable="true" 
        @isset($attributes['min-height']) style="min-height: {{ $attributes['min-height'] }}" @endisset
        >{!! $value !!}</div>
        <textarea name="{{$name}}" id="{{ nameToId($name) }}">{{$value}}</textarea>
    </div>

@overwrite