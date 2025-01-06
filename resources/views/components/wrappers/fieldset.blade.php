<div class="simple-form-element element-wrapper @if($attributes['required']) required @endif {{$class}}" id="{{$name}}-wrapper">

    <fieldset>
        @hasSection('label')
            <legend> 
                @yield('label')@if(in_array('required', $attributes['rules'] ?? []))* @endif 
                @if($attributes['helpkey'])
                    <x-help-link :key="$attributes['helpkey']" title="{{ $attributes['helptitle'] ?? $label }}" />
                @endif
            </legend>
        @endif

        @yield('element')    
    
        @if($errors->first(dotName($name)))
        {{-- @if($errors->first($name)) --}}
            <small class="validation-error alert alert-danger form-text" role="alert">
                {!! $errors->first(dotName($name)) !!}
                {{-- {!! $errors->first($name) !!} --}}
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

    </fieldset>

</div> 
