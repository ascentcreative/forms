@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

<div class="checkbox-columns-container">
    <div class="checkbox-columns-inner">

    @foreach($options as $key=>$opt)

        <label for="{{ nameToId($name) }}-{{$key}}">

            <input type="checkbox" value="{{ $key }}" id="{{ nameToId($name) }}-{{$key}}" name="{{ $name }}[]" @if($value == $key || in_array($key, $value ?? [])) checked @endif>
            <span>{!! $opt !!}</span>

        </label>

    @endforeach

    </div>

</div>

@overwrite
