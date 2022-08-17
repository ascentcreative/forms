
// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021
CKEDITOR.disableAutoInline = true;

$.ascent = $.ascent?$.ascent:{};

var Wysiwyg = {

    ck: null,

    _init: function () {

        let unid = $(this.element).attr('data-unid');

        let roxyFileman = '/ascentcore/fileman/index.html'; 

        this.ck = CKEDITOR.inline( 'edit-' + unid,
            {  
                extraAllowedContent : 'form; form[*]; form(*); input; input(*); input[*]; p[style]; script; script(*); script[*]; iframe; code; embed; iframe[*]; embed[*]; span(*); div(*); div(codesnippet)[*]; div[*]; codesnippet; codesnippet[contenteditable]; codesnippet[partial]; codesnippet[*]', filebrowserBrowseUrl:roxyFileman,
                filebrowserImageBrowseUrl:roxyFileman+'?type=image',
                removeDialogTabs: 'link:upload;image:upload',
                removePlugins : 'elementspath',

                extraPlugins: 'font,richcombo,snippet,photogallery,justify,panel,button,floatpanel,panelbutton,colorbutton,colordialog',
                contentsCss: [ '/css/fck_editorarea.css','/css/buttons.css' ],
                // colorButton_colors: '{{ join(",", \AscentCreative\CMS\Models\Swatch::all()->transform(function($item, $key) { return str_replace('#', '', $item->hex); })->toArray()) }}',
                entities_additional: '#009'
            }   

        );

        this.ck.on('change', function(e) {
            console.log('wysiwyg change4');
            // update the Textarea and fire off a change event (used by Form Dirty checks);
            $('#output-' + unid).val($('#edit-' + unid).html());
            $('#output-' + unid).change();
            // $('#output-' + unid).trigger('change');
        });

        $(this.element).addClass('initialised');

    }
    
}


$.widget('ascent.wysiwyg', Wysiwyg);
$.extend($.ascent.Wysiwyg, {
		 
}); 







// function wysiwyg_init(unid) {

//     var roxyFileman = '/ascentcore/fileman/index.html'; 

//     CKEDITOR.disableAutoInline = true;
//     var ck = CKEDITOR.inline( 'edit-' + unid,
    
//     {  
//         extraAllowedContent : 'form; form[*]; form(*); input; input(*); input[*]; p[style]; script; script(*); script[*]; iframe; code; embed; iframe[*]; embed[*]; span(*); div(*); div(codesnippet)[*]; div[*]; codesnippet; codesnippet[contenteditable]; codesnippet[partial]; codesnippet[*]', filebrowserBrowseUrl:roxyFileman,
//         filebrowserImageBrowseUrl:roxyFileman+'?type=image',
//         removeDialogTabs: 'link:upload;image:upload',
//         removePlugins : 'elementspath',

//         extraPlugins: 'font,richcombo,snippet,photogallery,justify,panel,button,floatpanel,panelbutton,colorbutton,colordialog',
//         contentsCss: [ '/css/fck_editorarea.css','/css/buttons.css' ],
//         colorButton_colors: '{{ join(",", \AscentCreative\CMS\Models\Swatch::all()->transform(function($item, $key) { return str_replace('#', '', $item->hex); })->toArray()) }}',
//         entities_additional: '#009'
//     }   
    
//     );

//     ck.on('change', function(e) {
//         console.log(e);
//         // update the Textarea and fire off a change event (used by Form Dirty checks);
//         $('#output-' + unid).val($('#edit-' + unid).html());
//         $('#output-' + unid).change();
//     });

//     console.log('done init');

// }


// init on document ready
$(document).ready(function(){
   $('.wysiwyg-editor').not('.initialised').wysiwyg();
});

// alert('ok');


// alert('ok');
// make livewire compatible (check for init after DOM update)
// document.addEventListener("DOMContentLoaded", () => {
//     try {
//         Livewire.hook('message.processed', (message, component) => {
//             $('.wysiwyg-editor').not('.initialised').wysiwyg();
//         })
//     } catch (e) {
        
//     }
// });



MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    // ...
    $('.wysiwyg-editor').not('.initialised').wysiwyg();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  childList: true
  //...
});
