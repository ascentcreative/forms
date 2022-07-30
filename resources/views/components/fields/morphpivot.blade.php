@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite


@section('element')

    {{-- Hidden element - ensures an empty field is processed --}}
    <input type="hidden" value="" name="{{ $name }}" />

    <div class="border p-3 bg-light morphpivot" id="{{ nameToId($name) }}" style="max-width: 600px"
        data-fieldname="{{ $name }}"
        data-optionroute="{{ $optionRoute }}"
        data-bladepath="{{ $bladepath }}"
        data-morph="{{ $morph }}"
        
        >

        <div class="morphpivot-items">
     
            
            @if(isset($value))
                @foreach($value as $idx=>$item)
                   
                    @include($bladepath . '.' . $morph . '.item', ['item'=> (object) $item, 'name'=>$name . '[' . $idx . ']' ] )

                @endforeach
            @endif

        </div>
    
        {{-- Derive route name from parent and target models --}}
        
        <input type="text" class="form-control mp-search" name="{{ $name }}_search" placeholder="Type a few characters to search..."/>

    </div>

@overwrite


@push('scripts')

<script>
    $(document).ready(function() {
        // alert('ok');
        // $('#{{ nameToId($name) }}_search').autocomplete({
            // console.log($('[name={{ $name }}_search]'));
       

    });
</script>

@endpush