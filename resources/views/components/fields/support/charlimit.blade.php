
@if(isset($charlimit)) 
{{-- @once
    @push('scripts')
        @script('/vendor/ascent/cms/form/components/charlimit/ascent.jquery.charlimit.js')
    @endpush
    @push('styles')
        @style('/vendor/ascent/cms/form/components/charlimit/ascent.jquery.charlimit.css')
    @endpush
@endonce --}}

@push('scripts')
    <script>

        $(document).ready(function() {
            $('[name={{ $name }}]').charlimit({
                'max': '{{ $charlimit }}',
                'force': true
            });
        });

    </script>
@endpush
@endif


