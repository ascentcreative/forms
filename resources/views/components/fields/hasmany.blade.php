@extends('forms::components.wrappers.' . $wrapper)

@php $tmp_label = $label; @endphp
@section('name'){{$name}}@overwrite

@section('element')

    {{-- Hidden element - ensures an empty field is processed --}}
    <input type="hidden" value="" name="{{ $name }}" />

    <div class="border p-3 bg-light hasmany" id="{{ nameToId($name) }}" data-fieldname="{{ $name }}">

        <div class="hasmany-items">
     
            
            @if(isset($value))
                @foreach($value as $idx=>$item)

                    {{-- Removed source from blade path - not sure we need it --}}
                    {{-- @include('admin.' . $source . '.hasmany.' . $target . '.item', ['item'=> (object) $item, 'name'=>$name . '[' . $idx . ']' ] ) --}}

                    @include('components.hasmany.' . $target . '.item', ['item'=> (object) $item, 'name'=>$name . '[' . $idx . ']' ] )

                @endforeach
            @endif

        </div>
    
        {{-- Derive route name from parent and target models --}}
        <a href="{{ route('cms.components.hasmany', ['source'=>$source, 'target'=>$target, 'fieldname'=>$name]) }}" class="hasmany-add button btn btn-sm btn-primary modal-link" xdata-toggle="modal" xdata-target="#hasmanyedit">Add New</a>

    </div>

@overwrite

@section('label'){{$tmp_label}}@overwrite
{{-- 
@once
    @push('scripts')
        @script('/vendor/ascent/cms/form/components/ascent-hasmany.js')
    @endpush
@endonce --}}

@push('scripts')

<script>
    $(document).ready(function() {
        $('#{{ nameToId($name) }}').hasmany();
    });
</script>

@endpush