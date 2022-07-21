@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    <div class="flex flex-nowrap">
        <input type="date" name="{{$name}}[date]" value="{!! $date_value !!}" class="form-control" />
        &nbsp;
        <input type="time" name="{{$name}}[time]" value="{!! $time_value !!}" class="form-control" />
    </div>
@overwrite