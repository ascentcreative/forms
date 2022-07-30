<div class="bg-white border p-2 mb-3 morphpivot-item" data-idx="{{ $idx }}">
    
    {{-- @section('item-content')
        
        @overwrite
    @show --}}
    <div class="flex flex-between">
        <div>
            @yield('item-content')
        </div>
        <div>
            <a href="#" class="mp-remove bi-x-square-fill text-danger"></a>
        </div>
    </div>

    <div class="d-none">
      
        @yield('item-fields')

        @php
            $morphtype = $morph . '_type';
            $morphid = $morph . '_id';
        @endphp
        <input type="hidden" name="{{ $name }}[id]" value="{{ $item->id ?? '' }}"/>  
        <input type="hidden" name="{{ $name }}[{{ $morphtype }}]" value="{{ $item->$morphtype ?? ''}}"/>  
        <input type="hidden" name="{{ $name }}[{{ $morphid }}]" value="{{ $item->$morphid ?? ''}}"/>  
       
    </div>

    {{-- {{ $morph }} --}}
   
    {{-- @dump($item); --}}


</div>