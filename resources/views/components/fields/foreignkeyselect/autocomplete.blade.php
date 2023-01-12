@extends('forms::components.wrappers.' . $wrapper)

@php $tmp_label = $label; @endphp
@section('name'){{$name}}@overwrite

@php 

$vals = $query->orderBy($sortField, $sortDirection)->get()
            ->transform(function($item) use ($labelField, $idField) {
                return [
                        'id' => $item->$idField,
                        'label' => $item->$labelField,
                        'value' => $item->$labelField,
                    ]; 
            });
  

if($value) {
    $sel = $vals->where('id', $value)->first();
    $display = $sel['label'];
}

@endphp


@section('element')

    @if($readonly)

        <div class="col-form-label  border-bottom p-2">
            {{ $opts->keyBy($idField)->get($value)->$labelField ?? 'n/a' }}
        </div>

    @else


        

    <div class="fksac-wrap @isset($value) has-value @endisset " id="{{ nameToId($name) }}"
            data-source="{!! base64_encode($vals) !!}"
        >
        <div class="fksac-entry">
            <input type="text" id="{{ nameToId($name) }}-entry" name="{{$name}}-entry" placeholder="{{ $nullItemLabel ?? '' }}" class="form-control fksac-input" value="{{ $display ?? '' }}">
        </div>
        <div class="fksac-display form-control">
            <span class="fksac-label">{{ $display ?? ''}}</span><a href="#" class="fksac-clear bi-x-square-fill text-danger"></a>
        </div>
        <input type="hidden" class="fksac-value" id="{{ nameToId($name) }}-value" name="{{$name}}" value="{{ $value }}" />
    </div>

    @endif

@overwrite

{{-- 
@once

    @push('styles')
        @style('/vendor/ascent/cms/form/components/ascent-foreignkeyselect-autocomplete.css')
    @endpush

    @push('scripts')
        @script('/vendor/ascent/cms/form/components/ascent-foreignkeyselect-autocomplete.js')
    @endpush

@endonce
 --}}

@push('scripts')
    <script>

        $('#{{ nameToId($name) }}').foreignkeyselectautocomplete({
            // source: {!! $vals !!}
        });
        
    </script>
@endpush


@section('label'){{$tmp_label}}@overwrite

