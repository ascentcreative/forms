<div>
    <div class="xborder rounded compound-form-element {{ $class }} @if($attributes['required']=='true') required @elseif($attributes['optional'] == 'true') optional @endif">
        <label for="{{ $name }}">{{ $label }}</label>
        @yield('element')
    </div>
    @isset($attributes['description'])
        <small class="form-text text-muted">
            {!! $attributes['description'] !!}
        </small>
    @endisset
    <div class="cfe-error error-display" for="{{ $name }}"></div>
</div>