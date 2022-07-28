@php $child_idx = 0; @endphp
@foreach($children as $child)
  
    <x-dynamic-component :component="$child->component" :attributes="$child->getAttributes()" readonly="{{ $form->readonly ?? false }}" element-index="{{ $child_idx }}">

        @isset($child->children)
            @include('forms::children', ['children'=>$child->children])
        @endisset
        
    </x-dynamic-component>

    @php $child_idx++; @endphp

@endforeach