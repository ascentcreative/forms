@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    <div class="p-3 bg-light border">
    <div class="ajaxuploadmulti" id="{{nameToId($name)}}"" name="{{ $name }}">
        <input type="file" multiple class="ajaxupload-file" accept="{{ join(',', $accept) }}" id="{{nameToId($name)}}-upload">        
    </div>

    <label class="button btn btn-primary btn-sm bi-plus-circle-fill mb-0" for="{{ nameToId($name) }}-upload">
        Add Files
    </label>
    </div>


    {{-- Tempted to set this as a template, and have the jQuery Widget control creation 
        of them at runtime (both on load, and when new files are added) --}}

    <template id="ajaxuploadmulti-item">
        <div class="ajaxuploadmulti-ui ajaxupload-ui form-control">
            <div class="ajaxupload-display">
                
                <A href="#" onclick="return false;" class="ajaxupload-reset bi-x-square-fill text-lg text-danger" style="font-size: 1.2rem; padding-right: 20px;"></A>
                <div class="ajaxupload-progress"></div>
                <div class="ajaxupload-text"></div>

            </div>

            <input type="hidden" name="{{$name}}[999][id]" class="ajaxuploadmulti-id" xid="{{nameToId($name)}}-id" value="">
            <input type="hidden" name="{{$name}}[999][original_name]" class="ajaxuploadmulti-label" xid="{{nameToId($name)}}-label" value="">
        </div> 
    </template>


@overwrite
{{-- 
@once
    @push('scripts')
        @scripttag('/vendor/ascent/cms/form/components/ascent-ajaxuploadmulti.js')
    @endpush
    @push('styles')
        @style('/vendor/ascent/cms/form/components/ascent-ajaxuploadmulti.css')
    @endpush
@endonce --}}

@push('scripts')
    <script>
        $(document).ready(function() {
            $('#{{ nameToId($name) }}').ajaxuploadmulti({
                data: @json($value),
                sortable: {{ $sortable ? 'true' : 'false' }},
                disk: '{{ $disk }}',
                path: '{{ $path }}',
                preserveFilename: {{ $preserveFilename ? 'true':'false' }}
            });
        });
    </script>
@endpush