@extends('forms::components.wrappers.' . $wrapper)

@section('name'){{$name}}@overwrite

@section('element')

    <input type="hidden" name="{{$name}}" value="{!! $value !!}"/>

@overwrite