@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    <div class="flex flex-nowrap datetime-element">
        <input type="date" name="{{$name}}[date]" value="{!! $date_value !!}" class="form-control dtf-date" />
        &nbsp;
        <input type="time" name="{{$name}}[time]" value="{!! $time_value !!}" class="form-control dtf-time" />
        <input type="text" name="{{ $name }}" value="{{ $value }}" class="dtf-output"/>
    </div>

  
@overwrite