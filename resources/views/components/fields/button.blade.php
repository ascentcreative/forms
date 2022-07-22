@extends('forms::components.wrappers.' . $wrapper)

@section('label')@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    <button name="{{$name}}" value="{{$value}}" class="btn button {{$attributes['buttonclass'] ??  $class }}">{{$label}}</button>

@overwrite