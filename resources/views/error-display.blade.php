<div class="error-display" for="{{ $name }}">
    @if($errors->first(dotName($name)))
        <small class="validation-error alert alert-danger form-text" role="alert">
            {!! $errors->first(dotName($name)) !!}
        </small>
    @endif
</div>