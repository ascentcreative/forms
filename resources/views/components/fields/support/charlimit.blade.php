@if(isset($charlimit) || isset($attributes['charlimit'])) 

@push('scripts')
    <script>

        $(document).ready(function() {
            $('[name={{ $name }}]').charlimit({
                'max': '{{ $charlimit ?? $attributes['charlimit'] }}',
                'force': true
            });
        });

    </script>
@endpush
@endif


