@extends('forms::components.wrappers.' . $wrapper)

@section('element')

@foreach($options as $key=>$opt)

    <label for="{{ nameToId($name) }}-{{$key}}">

        <input type="checkbox" value="{{ $key }}" id="{{ nameToId($name) }}-{{$key}}" name="{{ $name }}[]" @if($value == $key || in_array($key, $value ?? [])) checked @endif>
        <span>{!! $opt !!}</span>

    </label>

@endforeach


@overwrite
