@extends('forms::components.wrappers.' . $wrapper)


@section('element')

    <div class="flex form-inline value-with-units" id="{{ nameToId($name) }}">
        <input type="text" width="12" size="5" name="{{ $name }}[amount]" value="{{ $value['amount'] ?? '' }}" class="vwu-amount form-control text-center">
        &nbsp;
        <x-forms-fields-options type="select" wrapper="none" label="" name="{{ $name }}[unit]" elementClass="vwu-unit" value="{{ $value['unit'] ?? '' }}"
            :options="$units" :includeNullItem="false" />
        <input type="hidden" class="vwu-output" name="{{ $name }}" value="{{ $orig }}" />
    </div> 
   

@overwrite


@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite


