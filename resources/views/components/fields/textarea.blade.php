@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    @if($attributes['readonly'])

        <div class="col-form-label border-bottom p-2" style="min-height: 2.5em;">
            {{ $value }}
        </div>

    @else

        <textarea name="{{$name}}" id="{{ nameToId($name) }}" @isset($rows) rows="{{ $rows }}" @endisset @isset($cols) cols="{{ $cols }}" @endisset class="form-control">{{$value}}</textarea>

    @endif

@overwrite