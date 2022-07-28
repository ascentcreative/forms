<x-cms-modal modalid="ajaxModal" :title="$title" :size="$size">

    <x-slot name="formstart">@formstart($form)</x-slot>

    @formbody($form)
    
    <x-slot name="footer">

        <button class="button btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button class="button btn btn-primary">OK</button>
        
    </x-slot>

    <x-slot name="formend">@formend($form)</x-slot>

</x-cms-modal>