@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    <textarea name="{{$name}}" class="code-editor">{{$value}}</textarea>

@overwrite