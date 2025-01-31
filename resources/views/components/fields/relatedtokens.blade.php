@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@php 
    $uniq = uniqid();
@endphp

@section('element')

    <INPUT type="text" name="{{ $name }}_input" id="tkn_{{ $uniq }}" class="item-entry form-control" 
        placeholder="Type to search..."
    />

@overwrite

@push('scripts')
    <script>
        $('#tkn_{{ $uniq }}').relatedtokens({
            value: {!! $value !!},
            fieldName: '{{ $name }}',
            labelField: '{{ $labelField }}',
            allowNewValues: {{ $allowNewValues ? 'true' : 'false' }},
            source: {!! $options !!}
        });
    </script>
@endpush