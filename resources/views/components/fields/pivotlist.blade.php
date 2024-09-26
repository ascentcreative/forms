@extends('forms::components.wrappers.' . $wrapper)

@once
    @push('styles')
        @style('/vendor/ascent/cms/form/components/ascent-pivotlist.css')
    @endpush

    @push('scripts')
        @scripttag('/vendor/ascent/cms/form/components/ascent-pivotlist.js')
    @endpush
@endonce

@push('scripts')
    <script language="javascript">
        $(document).ready(function() {
            
            $('#{{$id}}').pivotlist({
                optionRoute: '{{$optionRoute}}',
                @if($storeRoute)
                storeRoute: '{{$storeRoute}}',
                @endif
                labelField: '{{$labelField}}',
                data: @json($value),
                placeholder: 'Type a few characters to search...',
                allowItemDrag: 1,
                addToAll: @json($addToAll),
                sortField: '{{$sortField}}',
                pivotField: '{{$pivotField}}',
                pivotFieldLabel: '{{$pivotFieldLabel}}',
                pivotFieldPlaceholder: '{{$pivotFieldPlaceholder}}'

            });

        });
    </script>
@endpush

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    {{-- Hidden element - ensures an empty field is processed --}}
    <input type="hidden" value="" name="{{ $name }}" />

    <input name="{{$name}}" id="{{$id}}" value="" class="form-control"/>

@overwrite