{{-- @aware(['idx'=>-1]) --}}

@push($attributes['parent']->tabstack)
    <li class="nav-item">
        <a class="nav-link @if($attributes['element-index'] == 0) active @endif" id="{{ $attributes['name'] }}-tab" data-toggle="tab" href="#{{ $attributes['name'] }}-pane" role="tab" aria-controls="{{ $attributes['name'] }}-pane" aria-selected="false">{{ $attributes['label'] }}</a>
    </li>
@endpush


<div class="tab-pane p-3  @if($attributes['element-index'] == 0) active @endif" id="{{ $attributes['name'] }}-pane" role="tabpanel" aria-labelledby="{{ $attributes['name'] }}-tab">

    {{ $slot }}

</div>