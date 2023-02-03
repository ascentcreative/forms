@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    @if($preelement || $postelement)
        <div class="form-inline text-nowrap flex-nowrap">
    @endif

    @if($preelement)
    {{ $preelement }}&nbsp;
    @endif

    @if($attributes['readonly'] && $type != 'hidden')

        <div class="col-form-label border-bottom p-2" style="min-height: 2.5em;">
         {{ $value }}
        </div>

    @else

        <input type="{{$type}}" name="{{$name}}" id="{{ nameToId($name) }}" value="{!! $value !!}" @if($type=='file' && $accept != '') accept="{{ $accept }}" @endif
            class="form-control{{ ($type=='file' ? '-file' : '') }} {{ $attributes['control-class'] }}" 
            @if($required) required @endif

            @if($type=='number') 
                @if($min) min="{{ $min }}" @endif
                @if($step) step="{{ $step }}" @endif 
            @endif
            @if($type=='file')
                @if($multiple) multiple @endif
            @endif
            @if($wireModel) wire:model.lazy="{{ $wireModel }}" @endif
            {{-- @if($validators) data-validators="{{ Crypt::encryptString($validators) }}" @endif --}}
            autocomplete="{{ $autocomplete ? 'on' : 'off' }}"
            @if($placeholder) placeholder="{{ $placeholder }}" @endif
            @if($size) size="{{ $size }}" @endif
        />

    @endif

    @if($postelement)
       {{ $postelement }}
    @endif

    @if($preelement || $postelement)
        </div>
    @endif

@overwrite