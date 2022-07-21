@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    <textarea name="{{$name}}" id="{{ nameToId($name) }}" @isset($rows) rows="{{ $rows }}" @endisset @isset($cols) cols="{{ $cols }}" @endisset class="form-control">{{$value}}</textarea>

@overwrite