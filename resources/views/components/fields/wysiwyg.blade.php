@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@php
    $unid = uniqid();
@endphp

@section('element')

   <div class="wysiwyg-editor @if($styled) wysiwyg-editor-styled @endif" style="width: 100%; height: 100%;">

       <div @if(!$readonly) contenteditable="true" @else class="p-2" @endif id="edit-{{ $unid }}">{!! $value !!}</div>

    </div>

   <div style="display: none">
   output:
   <textarea name="{{$name}}" id="output-{{$unid}}" class="wysiwyg-output">{!! $value !!}</textarea>
   </div>

@overwrite

@once
    @push('lib')
        @script('/vendor/ascent/cms/ckeditor/ckeditor.js', false)
        @script('/vendor/ascent/cms/ckeditor/adapters/jquery.js', false)
    @endpush
@endonce

{{-- @push('styles')

   <style>
       .wysiwyg-editor * {
           white-space: pre-wrap !important;
           tab-size: 10 !important;
       }
    </style>

@endpush --}}

@if(!$readonly)
    @push('scripts')
    <SCRIPT>


            var roxyFileman = '/ascentcore/fileman/index.html'; 

            CKEDITOR.disableAutoInline = true;
            var ck = CKEDITOR.inline( 'edit-{{$unid}}',
            
            {  
                extraAllowedContent : 'form; form[*]; form(*); input; input(*); input[*]; p[style]; script; script(*); script[*]; iframe; code; embed; iframe[*]; embed[*]; span(*); div(*); div(codesnippet)[*]; div[*]; codesnippet; codesnippet[contenteditable]; codesnippet[partial]; codesnippet[*]', filebrowserBrowseUrl:roxyFileman,
                filebrowserImageBrowseUrl:roxyFileman+'?type=image',
                removeDialogTabs: 'link:upload;image:upload',
                removePlugins : 'elementspath',

                extraPlugins: 'font,richcombo,snippet,photogallery,justify,panel,button,floatpanel,panelbutton,colorbutton,colordialog',
                contentsCss: [ '/css/fck_editorarea.css','/css/buttons.css' ],
                colorButton_colors: '{{ join(",", \AscentCreative\CMS\Models\Swatch::all()->transform(function($item, $key) { return str_replace('#', '', $item->hex); })->toArray()) }}',
                entities_additional: '#009'
            }   
            
            );

            ck.on('change', function(e) {
                    // update the Textarea and fire off a change event (used by Form Dirty checks);
                    $('#output-{{$unid}}').val($('#edit-{{$unid}}').html());
                    $('#output-{{$unid}}').change();

                });


        

        
        

        </SCRIPT>
    @endpush
@endif