@extends('forms::components.wrappers.' . $wrapper)

@php $tmp_label = $label; @endphp
@section('name'){{$name}}@overwrite

@section('element')

    @if($readonly)

        <div class="col-form-label border-bottom p-2">
            {{ $display }}
        </div>

    @else

        <div class="ra-wrap @isset($value) has-value @endisset " id="{{ nameToId($name) }}">
            <div class="ra-entry">
                <input type="text" id="{{ nameToId($name) }}-entry" name="{{$name}}-entry" placeholder="{{ $placeholder }}" class="form-control ra-input" value="{{ $display }}">
            </div>
            <div class="ra-display form-control">
                <span class="ra-label">{{ $display }}</span><a href="#" class="ra-clear bi-x-square-fill text-danger"></a>
            </div>
            <input type="hidden" class="ra-value" id="{{ nameToId($name) }}-value" name="{{$name}}" value="{{ $value }}" />
        </div>

    @endif 
    
@overwrite
{{-- 
@once

    @push('styles')
        @style('/vendor/ascent/cms/form/components/ascent-relationshipautocomplete.css')
    @endpush

    @push('scripts')
        @scripttag('/vendor/ascent/cms/form/components/ascent-relationshipautocomplete.js')
    @endpush

@endonce --}}


@push('scripts')
    <script>

        $('#{{ nameToId($name) }}').relationshipautocomplete({
            source: '{!! $dataurl !!}',
            displayField: '{{ $displayField }}'
        });
        
    </script>
@endpush


@section('label'){{$tmp_label}}@overwrite