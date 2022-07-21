@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    <div class="video-embed">

        <div class="video-frame">

        </div>


    <x-cms-form-input type="text" name="{{$name}}" value="{!! $value !!}" label="Video URL" wrapper="simple" class="video-embed-url">
        Either the Page URL or Share URL: <code>https://www.youtube.com/watch?v=[code]</code>, <code>https://youtu.be/[code]</code>
    </x-cms-form-input>

    </div>
    {{-- <input type="text" name="{{$name}}" value="{!! $value !!}" class="form-control" placeholder="Video URL" title="Video URL"  /> --}}

@overwrite

@once
@push('scripts')

<script>

    $(document).ready(function() { 
        
        $('.video-embed-url').on('change', function() {
            updatePreview($(this).closest('.video-embed')); 
        });

        $('.video-embed').each(function() {
           // console.log(i);
           //console.log($this);
            updatePreview($(this)); 
        });

    })
   

    function updatePreview(elm) {
        var url = elm.find('.video-embed-url INPUT').val();
        console.log(elm.find('video-frame'));

        $.ajax({
            url: '/cms/video-embed/render',
            method: 'POST',
            data: {
                url: url
            } 
        
        }).done(function(data, xhr, request) {
            console.log(data); 
            elm.find('.video-frame').html(data);
        });
        
    }

</script>

@endpush
@endonce