<div class="form-group row element-wrapper @if($attributes['required']) required @endif {{ $class }}" id="{{$name}}-wrapper">
    <label for="@yield('name')" class="col-{{ $attributes['labelcols'] ?? 2 }} col-form-label d-flex justify-content-between">
        <div>@yield('label')@if(in_array('required', $attributes['rules'] ?? []))* @endif
        </div>
        <div>
            @if($attributes['helpkey'])
                <x-help-link :key="$attributes['helpkey']" title="{{ $attributes['helptitle'] ?? $label }}" />
            @endif
        </div>
    </label>
    <div class="col">
        @yield('element')
        <div class="error-display" for="{{ $name }}"></div>
        @if($slot)
            <small class="form-text text-muted">
                {{ $slot }}
            </small>
        @endif
        @isset($attributes['description'])
            <small class="form-text text-muted">
                {!! $attributes['description'] !!}
            </small>
        @endisset
        @if($msg = $errors->first(dotName($name)))
            <small class="validation-error alert alert-danger form-text" role="alert">
                {{ $msg }}
            </small>
        @endif
    </div>
</div> 

@include('cms::components.form.support.charlimit')