<x-cms-modal modalid="ajaxModal" :title="$title" :size="$size" :showHeader="$modalShowHeader" :showFooter="$modalShowFooter">

    <x-slot name="formstart">@formstart($form)</x-slot>

    @formbody($form)
    
    <x-slot name="footer">

        <button class="button btn btn-secondary btn-cancel" data-dismiss="modal">Cancel</button>
        <button class="button btn btn-primary btn-ok">OK</button>
        
    </x-slot>

    <x-slot name="formend">@formend($form)</x-slot>

</x-cms-modal>