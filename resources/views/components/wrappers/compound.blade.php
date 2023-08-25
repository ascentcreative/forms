<div>
    <div class="xborder rounded compound-form-element @if($attributes['required']=='true') required @elseif($attributes['optional'] == 'true') optional @endif">
        <label for="{{ $name }}">{{ $label }}</label>
        @yield('element')
    </div>
    <div class="cfe-error error-display" for="{{ $name }}"></div>
</div>