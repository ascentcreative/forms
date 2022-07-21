@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@php $unid = 'fld-' . uniqid(); @endphp

@once
    @push('scripts')
        @script('/vendor/ascent/cms/ckeditor/ckeditor.js', false)
        @script('/vendor/ascent/cms/ckeditor/adapters/jquery.js', false)
    @endpush
@endonce

@push('scripts')

<script language="javascript">

    var roxyFileman = '/ascentcore/fileman/index.html'; 

      $(document).ready(function(){ 

              
        var ck = CKEDITOR.replace($('textarea#{{$unid}}')[0], 

            { width : '100%', height : '{{ $height }}', 
                extraAllowedContent : 'form; form[*]; form(*); input; input(*); input[*]; p[style]; script; script(*); script[*]; iframe; code; embed; iframe[*]; embed[*]; span(*); div(*); div(codesnippet)[*]; div[*]; codesnippet; codesnippet[contenteditable]; codesnippet[partial]; codesnippet[*]', filebrowserBrowseUrl:roxyFileman,
                filebrowserImageBrowseUrl:roxyFileman+'?type=image',
                removeDialogTabs: 'link:upload;image:upload',
                removePlugins : 'elementspath',
                extraPlugins: 'font,richcombo,snippet,photogallery,justify,panel,button,floatpanel,panelbutton,colorbutton,colordialog',
                contentsCss: [ '/css/fck_editorarea.css','/css/buttons.css' ],
                colorButton_colors: '{{ join(",", \AscentCreative\CMS\Models\Swatch::all()->transform(function($item, $key) { return str_replace('#', '', $item->hex); })->toArray()) }}'
            }

        );

        ck.on('change', function(e) {
            // update the Textarea and fire off a change event (used by Form Dirty checks);
            ck.updateElement();
            $(ck.element.$).change();

        });
        
    });


    </script>
@endpush

@section('element')

    <textarea id="{{$unid}}" name="{{$name}}" class="form-control">{!! $value !!}</textarea>

@overwrite