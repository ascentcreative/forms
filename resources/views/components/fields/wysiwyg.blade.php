@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@php
    $unid = uniqid();
@endphp

@section('element')


   <div class="wysiwyg-editor @if($styled) wysiwyg-editor-styled @endif" data-toolbar="{{ $toolbar }}" data-unid="{{ $unid }}" style="width: 100%; height: 100%;">

       <div @if(!$readonly) contenteditable="true" @else class="p-2" @endif id="edit-{{ $unid }}" style="height: 100%; outline-offset: 6px" placeholder="{{ $placeholder }}" >{!! $value !!}</div>

    </div>

   <div style="display: none">
        output:
        <textarea name="{{$name}}" id="output-{{$unid}}" wire:model="{{ dotname($name) }}" class="wysiwyg-output">{!! $value !!}</textarea>
   </div>

@overwrite

{{-- @once
    @push('lib')
        @script('/vendor/ascent/cms/ckeditor/ckeditor.js', false)
        @script('/vendor/ascent/cms/ckeditor/adapters/jquery.js', false)
    @endpush
@endonce --}}

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