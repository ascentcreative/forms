@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

<div class="toggle-switch {{ $attributes['class'] ?? '' }}" id="toggle-switch-{{ $name }}">
    @foreach($options as $key=>$disp)
        <label for="{{ nameToId($name) }}_{{ $key }}" tabindex="0"><input type="radio" id="{{ nameToId($name) }}_{{ $key }}" name="{{ $name }}" value="{{ $key }}" @if($value==$key) checked @endif/>{{ $disp }}</label>
    @endforeach
    {{-- <label for="{{ $name }}_all" tabindex="0"><input type="radio" id="{{ $name }}_join_all" name="{{ $name }}" value="all" @if($value=="all") checked @endif/>All</label> --}}
</div>


@overwrite
