<div class="simple-form-element element-wrapper {{$class}}" id="{{$name}}-wrapper">

    @hasSection('label')
        <label for="@yield('name')" class="simple-form-element-label">@yield('label')</label>
    @endif

    @yield('element')
    
</div> 