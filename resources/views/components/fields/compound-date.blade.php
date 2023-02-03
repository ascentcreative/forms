@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite
@section('name'){{$name}}@overwrite

@section('element')

    @if($attributes['readonly'])

        <div class="col-form-label border-bottom p-2" style="min-height: 2.5em;">
            {{-- @dump($value) --}}
            @if($value)
            {{ join(' / ', $value)}}
            @endif
        </div>

    @else

    <div class="flex form-inline compound-date" id="{{ nameToId($name) }}">
        <input type="text" width="12" size="3" name="{{ $name }}[day]" value="{{ $value['day'] ?? '' }}" class="cd-day form-control text-center" maxlength="2" placeholder="DD">
        <span class="mx-2">/</span>
        <input type="text" width="20" size="3" name="{{ $name }}[month]" value="{{ $value['month'] ?? '' }}"class="cd-month form-control text-center" maxlength="2" placeholder="MM">
        <span class="mx-2">/</span>
        <input type="text" width="20" size="5" name="{{ $name }}[year]" value="{{ $value['year'] ?? '' }}"class="cd-year form-control text-center" maxlength="4" placeholder="YYYY">
        <input type="hidden" class="compound-date-output" name="{{ $name }}" value="{{ $orig }}" />
    </div>

    @endif
   

@overwrite


{{-- 
@push('scripts')
<script>
    $(document).ready(function() {

        $(document).on('change', '#{{ nameToId($name) }}', function(e) {
            $out = $(this).find('INPUT.cd-year').val() + "-" + $(this).find('INPUT.cd-month').val() + "-" + $(this).find('INPUT.cd-day').val();
            $('input[name="{{ $name }}"]').val($out);
        });

        $(document).on('keyup', '#{{ nameToId($name) }} .cd-day, #{{ nameToId($name) }} .cd-month', function(event) {
            if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)){
                let len = 2;
                if($(this).val().length == len) {
                    let next = $(this).nextAll('input')[0];
                    if(next) {
                        next.focus();
                    }
                    
                }
            }
        });

    });
</script>
@endpush --}}
