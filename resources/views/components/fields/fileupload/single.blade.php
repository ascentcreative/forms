@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')


    <div class="ajaxupload form-control" id="{{nameToId($name)}}"
            data-disk="{{ $disk }}"
            data-path="{{ $path }}"
            data-preservefilename="{{ $preserveFilename ? 'true':'false' }}"
        >

        <input type="file" class="ajaxupload-file" @if($accept) accept="{{ join(',', $accept) }}" @endif id="{{nameToId($name)}}-upload">

        <label class="ajaxupload-ui" for="{{ nameToId($name) }}-upload">
        
            <div class="ajaxupload-display">
                
                <A href="#" onclick="return false;" class="ajaxupload-reset bi-x-square-fill text-lg text-danger" style="font-size: 1.2rem; padding-right: 20px;"></A>
                
                <div class="ajaxupload-progress"></div>
                <div class="ajaxupload-text">
                    
                    @if($value) 
                        @php
                            $file = AscentCreative\CMS\Models\File::find($value);
                        @endphp
                        {{ $file->original_name }}
                    @else
                        Choose file
                    @endif
                    
                </div>

            </div>
        </label>
        <input type="hidden" name="{{$name}}" class="ajaxupload-value" id="{{nameToId($name)}}-value" value="{{ $value }}">
        
        
    </div>

@overwrite
{{-- 
@once
    @push('scripts')
        @script('/vendor/ascent/cms/form/components/ascent-ajaxupload.js')
    @endpush
    @push('styles')
        @style('/vendor/ascent/cms/form/components/ascent-ajaxupload.css')
    @endpush
@endonce --}}
{{-- 
@push('scripts')
    <script>
        $(document).ready(function() {
            $('#{{ nameToId($name) }}').ajaxupload({
                disk: '{{ $disk }}',
                path: '{{ $path }}',
                preserveFilename: {{ $preserveFilename ? 'true':'false' }}
            });
        });
    </script>
@endpush --}}