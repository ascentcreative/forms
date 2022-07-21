@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@php 
    $uniq = uniqid();
@endphp

@section('element')

    <INPUT type="text" name="{{ $name }}_input" id="tkn_{{ $uniq }}" data-tokens="{!! $value !!}" class="cms-relatedtokens form-control" />

@overwrite
{{-- 
@once
    @push('styles')
        @style('/vendor/ascent/cms/form/components/ascent-relatedtokens.css')
    @endpush

    @push('scripts')
        @script('/vendor/ascent/cms/form/components/ascent-relatedtokens.js')
    @endpush
@endonce --}}

@push('scripts')
    <script>
        $('#tkn_{{ $uniq }}').relatedtokens({
            fieldName: '{{ $relationship }}',
            tokenName: '{{ $tokenName }}'
        });
    </script>
@endpush