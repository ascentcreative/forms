@extends('forms::components.wrappers.' . $wrapper)

{{-- @once
    @push('styles')
        @style('/vendor/ascent/cms/form/components/ascent-biblereflist.css')
    @endpush

    @push('scripts')
        @script('/vendor/ascent/cms/form/components/ascent-biblereflist.js')
    @endpush
@endonce --}}

@push('scripts')
    <script language="javascript">
        
        $(document).ready(function() {
            
            $('#{{$name}}').biblereflist({
                deuterocanonical: '{{$deuterocanonical}}',
                data: @json($value),
                placeholder: 'Enter a Bible Reference...',
                allowItemDrag: 1
                

            });

        });
    </script>
@endpush

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    <input name="{{$name}}" id="{{$name}}" value="" class="form-control"/>

@overwrite