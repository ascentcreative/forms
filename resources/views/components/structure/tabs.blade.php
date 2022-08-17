@if($styled)<div class="cms-screenblock-tabs bg-white rounded shadow" style="">@endif
    <ul class="nav nav-tabs @if($styled) px-3 pt-3 bg-light @endif" id="myTab" role="tablist">

        @stack($attributes['tabstack'])

    </ul>


    <div class="tab-content" id="tabs">

        {{ $slot }}

    </div>

@if($styled)</div>@endif