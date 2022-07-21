@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite
@section('elementClass'){{$elementClass}}@overwrite
@php
    $id = str_replace(array('[', ']'), array('--', ''), $name);
@endphp

@section('element')

    <input name="{{$name}}" id="{{ $id }}" value="{!! $value !!}" class="form-control {{ $elementClass ?? ''}} " autocomplete="off"/>

@overwrite
{{-- 
@once

    @push('styles')
        @style('/vendor/ascent/cms/spectrum/spectrum.min.css')
    @endpush

    @push('scripts')
        @script('/vendor/ascent/cms/spectrum/spectrum.min.js')
    @endpush

@endonce --}}

@push('scripts')
    <script>
        $(document).ready(function() {
            $('#{{ $id }}').spectrum({
                showPalette: true,
                showPaletteOnly: true,

                palette: [{!! \AscentCreative\CMS\Models\Swatch::all()->transform(function($item, $key) { return $item->hex; })->prepend('transparent') !!}],
                
                hideAfterPaletteSelect: true,
                togglePaletteOnly: true
            
            });
        });
    </script>
@endpush