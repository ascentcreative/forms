@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@php $unid = 'fld-' . uniqid(); @endphp

@section('element')

    <input type="text" name="{{ $name }}" value="{{ $value }}" id="{{ $unid }}" />

    <x-cms-modal modalid="modal-{{ $unid }}">
        CROPPIE MODAL {{ $unid }}

        <button class="btn-ok">OK</button>
        <x-slot name="buttons">
           
        </x-slot>
    </x-cms-modal>
{{--     
   <x-cms-form-input type="text" name="{{ $name }}" value="{{$value}}" label="{{$label}}" wrapper="none">
   </x-cms-form-input> --}}

@overwrite

{{-- 
@once
    @push('scripts')
        @scripttag('/vendor/ascent/cms/form/components/croppie/croppie.min.js')
        @scripttag('/vendor/ascent/cms/form/components/croppie/ascent-croppieupload.js')
    @endpush
@endonce --}}

@push('scripts')
    <script>
        $(document).ready(function() {
            $('#{{$unid}}').croppieupload({
                constrained: {{ $constrained }},
                targetWidth: {{ $width }},
                targetHeight: {{ $height }},
                previewScale: {{ $previewScale ?? 0.5 }},
                quality: {{ $quality ?? 0.5 }}
            });
        });
    </script>
@endpush

{{-- 
@once
    @push('styles')
        @style('/vendor/ascent/cms/form/components/croppie/croppie.css')
        @style('/vendor/ascent/cms/form/components/croppie/ascent-croppieupload.css')
    @endpush
@endonce --}}