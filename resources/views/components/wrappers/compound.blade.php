<div>
    <div class="xborder rounded compound-form-element {{ $class }} @if($attributes['required']=='true') required @elseif($attributes['optional'] == 'true') optional @endif">
        <label for="{{ $name }}">{{ $label }}</label>
        @yield('element')
    </div>
   
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
    <div class="cfe-error error-display" for="{{ $name }}"></div>
</div>