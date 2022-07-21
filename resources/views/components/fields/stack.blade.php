@extends('forms::components.wrappers.' . $wrapper)

@php $tmp_label = $label; @endphp


@section('name'){{$name}}@overwrite

{{-- @push('styles')
@style('/css/screen.css')
@endpush --}}

@section('element')

    @php 

        // set a default value
    
        if(is_null($value) || $value == '') {

            $obj =  [ 
                    
                    (object)[
                                'type'=>'row',
                                'bgcolor'=>'',
                                // 'items'=> [
                                //     (object) [
                                //         'type'=>'text',
                                //         'content'=>''
                                //     ]

                                // ]
                    ]
            ];

            $value = (object) $obj;

        }

        $safename = str_replace(array('[', ']'), array('_', ''), $name)

    @endphp

    <div class="stack-edit" id="{{$safename}}" name="{{$name}}">

        <div class="flex flex-between pb-2">

        <div class="btn-group dropright">
            <A class="btn btn-secondary btn-sm dropdown-toggle" href="#" data-toggle="dropdown" >Add Block</A>
            <div class="dropdown-menu dropdown-menu-right" style="">

                <a class="stack-add-block dropdown-item text-sm btn-option" href="#" data-block-type="row" data-block-field="{{ $safename }}">Text/Image/Video Row</a>

                @foreach(config('cms.core_page_blocks') as $key=>$val) 

                    <a class="stack-add-block dropdown-item text-sm btn-option" href="#" data-block-type="{{ $key }}" data-block-field="{{ $safename }}">{{ $val }}</a>

                @endforeach

                @if(count(config('cms.custom_page_blocks')) > 0)

                    <div class="dropdown-divider"></div>

                    @foreach(config('cms.custom_page_blocks') as $key=>$val) 

                        <a class="stack-add-block dropdown-item text-sm btn-option" href="#" data-block-type="{{ $key }}" data-block-field="{{ $safename }}">{{ $val }}</a>

                    @endforeach

                @endif

            </div>
      </div>  

        @if($previewable)
            <button class="btn btn-sm btn-primary bi-eye-fill" id="stack-preview">Preview</button>
        @endif
        
        </div>

        {{-- @dd($value); --}}

        {{-- for each row, show the relevant edit blade --}}
        <div class="stack-blocks">
        @foreach($value as $key=>$block)
            
            <x-cms-form-stackblock type="{{ $block->type }}" name="{{ $safename }}[{{$key}}]" :value="$block" />

        @endforeach
        </div>

  

        {{--  --}}


    {{-- 
        This field receives the serialized & stringified JSON on save.
        Using the main field name means that all the actual heirarchical fields are replaced / ignored
    --}}
        <input type="hidden" name="{{$name}}" class="stack-output"/>
   
    </div>





@overwrite

@once
    @push('styles')
        @style('/vendor/ascent/cms/form/components/ascent-stack-edit.css')
    @endpush
    @push('lib')
        @script('/vendor/ascent/cms/js/jquery.serializejson.js')
        @script('/vendor/ascent/cms/form/components/ascent-stack-edit.js')
        @script('/vendor/ascent/cms/form/components/ascent-stack-block-edit.js')
    @endpush
@endonce




@push('scripts')

    <script>
      
        $(document).ready(function() {
            $('.stack-edit#{{$safename}}').stackedit();
        });



        /** prototype previews **/
        $('#stack-preview').click(function() {

            // grab all form data, serialise and post to an endpoint in a popup window. Simples.

            $.ajax({ 
    
                type: 'POST',
                url: '/admin/previewtest',
                data: $('form#frm_edit').serialize(),
                headers: {
                    'Accept' : "application/json"
                }

            }).done(function(data, xhr, request) {

                console.log(data);
                
                // put the resulting HTML in the preview popup.
                w = window.open('', '_preview', "height=800,width=1200");
                w.document.open();
                w.document.write(data);
                w.document.close();

            }).fail(function(data) {
                alert(data.responseJSON.message);
            });

            return false;
        });



    </script>

@endpush

@section('label'){{$tmp_label}}@overwrite