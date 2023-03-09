<div id="{{$name}}-wrapper">
@yield('element')

@if($errors->first($name))
    <small class="validation-error alert alert-danger form-text" role="alert">
        {!! $errors->first($name) !!}
    </small>
    @else

        @if(trim($slot))
            <small class="form-text text-muted">
                {{ $slot }}
            </small>
        @endif
        @isset($attributes['description'])
            <small class="form-text text-muted">
                {!! $attributes['description'] !!}
            </small>
        @endisset

    @endif
    <div class="error-display" for="{{ $name }}"></div>
</div>

@include('cms::components.form.support.charlimit')