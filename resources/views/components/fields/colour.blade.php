@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite
@section('elementClass'){{$elementClass}}@overwrite
@php
    $id = str_replace(array('[', ']'), array('--', ''), $name);
@endphp

@section('element')

    <input name="{{$name}}" id="{{ $id }}" value="{!! $value !!}" class="manual-init colour form-control {{ $elementClass ?? ''}} " autocomplete="off" data-palette="{!! $attributes['palette']->join(',') !!}"/>

@overwrite

{{-- 
@push('scripts')
    <script>
        $(document).ready(function() {
           
        });
    </script>
@endpush --}}