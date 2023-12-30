
@if(isset($charlimit)) 

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


