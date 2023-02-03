{{-- No need to render any of this on a read-only form --}}
@if(!$form->readonly)

<form method="{{ ($form->method == 'PUT' ? 'POST' : $form->method) ?? 'POST' }}" action="{{ $form->action ?? url()->current() }}" id={{ $name ?? ($name = 'frm_' . uniqid()) }} 
    {{-- enctype="multipart/form-data" --}}
    enctype="application/x-www-form-urlencoded"
    
    @foreach($form->tag_attributes as $name=>$value)
        {{ $name }}="{{ $value }}"
    @endforeach
    
    >
    @if($form->method == 'PUT')
        @method('PUT')
    @endif
    @csrf
    <input type="submit" disabled="" style="display: none">

@if($form->dirtyDetect)
    @push('scripts')

        @script('/vendor/ascent/cms/jquery/areyousure/jquery.are-you-sure.js')
        @script('/vendor/ascent/cms/jquery/areyousure/ays-beforeunload-shim.js')

        <script language="javascript">
            $(document).ready(function() {
                $('#{{ $name }}').areYouSure( {'message':'Your edits have not been saved!'} );
            });

            // prevent submission if a field has 'block-submit' set. 
            // This is used by, for example, file uploaders. The form must not submit while they are active.
            $('form').submit(function(e) {
                if( (blockers = $(this).find('.block-submit')).length > 0) {

                    let msg = "You cannot submit this form";

                    let blockmsg = $(blockers[0]).data('block-submit-message');

                    if (blockmsg) {
                        msg += ' beacuse ' + blockmsg;
                    }

                    msg += '.';

                    alert(msg);
                    e.preventDefault();
                }
            });

        </script>


        {{-- Need something here to detect validation errors on load and switch to the first affected tab (?scroll into view too) --}}
       
    @endpush
@endif

@endif