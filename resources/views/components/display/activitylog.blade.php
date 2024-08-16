
<table class="table">
    <thead>
        <th width="100">Action</th>
        <th width="250">Date</th>
        <th>User</th>
    </thead>

    <tbody>

        @foreach($attributes['model']->activities()->with('causer')->get() as $log)

            <tr>

                <td><span class="badge badge-secondary">{{ strtoupper($log->event) }}<span></td>
                <td>{{ $log->created_at->format('j M Y \a\t H:m:s') }}</td>
                <td>{{ $log->causer->name ?? "SYSTEM" }}</td>

            </tr>

        @endforeach

    </tbody>

</table>