<div class="inline-form-element inline-wrapper flex-align-center element-wrapper @if($attributes['required']) required @endif {{$class}} flex" id="{{$name}}-wrapper">

    @hasSection('label')
        <label for="@yield('name')" class="inline-form-element-label mr-3">
            @yield('label')
            @if($attributes['helpkey'])
                <x-help-link :key="$attributes['helpkey']" title="{{ $attributes['helptitle'] ?? $label }}" />
            @endif
        </label>
    @endif

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

@include('forms::components.fields.support.charlimit')