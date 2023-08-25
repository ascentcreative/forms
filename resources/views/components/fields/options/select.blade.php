@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

<select name="{{ $name }}" class="{{ $attributes['elementClass'] }} @if($wrapper != 'compound') form-control @endif">

@if($includeNullItem) 

    <option value="" @if($value == '') selected @endif>

        {!! $nullItemLabel ?? '- Select -' !!}

    </option>

@endif

@foreach($options as $key=>$opt)

    <option value="{{ $key }}" @if($value == $key) selected @endif>

        {!! $opt !!}

    </option>

@endforeach
</select>


@overwrite