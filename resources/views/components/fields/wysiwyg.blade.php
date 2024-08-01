@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@php
    $unid = uniqid();
@endphp

@section('element')


    @if($readonly)

        <div class="col-form-label border rounded p-2" style="min-height: 2.5em;">
         {!! nl2br($value) !!}
        </div>

    @else


        <div class="wysiwyg-editor @if($styled) wysiwyg-editor-styled @endif" data-alwayson="{{ $alwayson }}" data-toolbar="{{ $toolbar }}" data-palette="{{ join(",", \AscentCreative\CMS\Models\Swatch::all()->transform(function($item, $key) { return str_replace('#', '', $item->hex); })->toArray()) }}" data-unid="{{ $unid }}" style="width: 100%; height: 100%;">

            <div @if(!$readonly) @else class="p-2" @endif id="edit-{{ $unid }}" style="height: 100%; xoutline-offset: 6px" placeholder="{{ $placeholder }}" >{!! $value !!}</div>

        </div>

        <div style="display: none">
                <textarea name="{{$name}}" id="output-{{$unid}}" wire:model="{{ dotname($name) }}" class="wysiwyg-output">{!! $value !!}</textarea>
        </div>

   @endif

@overwrite


@once
    @push('scripts')
        @script('/vendor/ascent/cms/ckeditor/ckeditor.js', false)
        @script('/vendor/ascent/cms/ckeditor/adapters/jquery.js', false)
        <script>
            CKEDITOR.disableAutoInline = true;
        </script>
    @endpush
@endonce

{{-- @push('styles') --}}
{{-- 
   <style>
    .empty[contenteditable=true]:not(:focus):before{
        content:'place';
        color:grey;
        font-style:italic;
    }
    </style> --}}

{{-- @endpush --}}
{{-- 
@if(!$readonly)
    @push('scripts')
    <SCRIPT>

          

        </SCRIPT>
    @endpush
@endif --}}