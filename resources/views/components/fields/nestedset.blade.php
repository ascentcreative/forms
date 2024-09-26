@extends('forms::components.wrappers.' . $wrapper)

@section('label'){{$label}}@overwrite

@push('scripts')
    
    {{-- @scripttag('/vendor/ascent/cms/jquery/ascent.cms.nestedset.js') --}}

    <script>
        $('#{{$name}}').nestedset({

            scopeFieldName: '{{ $scopeFieldName }}',
            relationshipFieldName: '{{ $relationshipFieldName }}',
            relationFieldName: '{{ $relationFieldName }}',
            scopeData: {!! $scopeData->get() !!},
            //nestedSetData: {!! $nestedSetData->withDepth()->get() !!}
            nestedSetData: {!! $nestedSetData->orderBy('_lft')->get()->toTree() !!},
            nullScopeLabel: '{{ $nullScopeLabel }}'
        });
    </script>
@endpush

@section('element')

    <div class="nestedset" name="{{$name}}" id="{{$name}}">

        <div style="display: none">
        <INPUT type="text" class="ns_scopefield" xname="{{$scopeFieldName}}" value="{{$scopeValue}}" id="scopeField"/>
        <INPUT type="text" class="ns_relationshipfield" xname="{{$relationshipFieldName}}" value="{{$relationshipValue}}" id="relationshipField"/>
        <INPUT type="text" class="ns_relationfield" xname="{{$relationFieldName}}" value="{{$relationValue}}" id="relationField"/>
        <INPUT type="text" class="ns_relationlabel" xname="{{$relationLabel}}" value="{{$relationLabel}}" id="relationLabel"/>
        </div>
       
    </div>

    {{-- <div style="display: flex;" id="menu_pos">
        <div style="flex: 0 0 20%;">
        <select class="form-control" name="{{$name}}[context_type]">
            <option value="first-child">First Child Of</option>
            <option value="before">Sibling Before</option> 
            <option value="after">Sibling After</option>
        </select>
        </div>

        <div style="flex: 0 0 80%; padding-left: 10px;">
        <select name="{{$name}}[context_id]" id="menu_context" class="form-control" style="display:flex: 0 0 70%;">
            <option value="">Please Select:</option>

            <?php 
            
            //$opts = $model::orderBy($labelField)->get(); 
        //   $opts = $query->orderBy($labelField)->get();
            
            // $menus = AscentCreative\CMS\Models\Menu::all();

            // foreach($menus as $menu) {

            // $opts = AscentCreative\CMS\Models\MenuItem::scoped([ 'menu_id' => $menu->id ])->withDepth()->orderBy('menu_id')->orderBy('_lft')->get();

            ?>

                @foreach ($opts as $opt)

                    <option data-menu-id="{{ $opt->menu_id }}" value="{{ $opt->id }}" @if ($contextId == $opt->id)
                        selected
                    @endif>{{ $opt->depth }} {{ $opt->itemTitle }}</option>

                @endforeach

            <?php } ?>

        </select>

        </div>

    </div>

    <div id="menu_first">
        <div class="form-control" style="border: 0;">
        This will be the first item in this menu
        </div>
    </div> --}}

@overwrite