
// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021
$.ascent = $.ascent?$.ascent:{};

var Wysiwyg = {

    ck: null,
    options: {
        toolbar: ''
    },
    unid: '',

    _init: function () {

        let unid = $(this.element).attr('data-unid');

        this.unid = unid;

        
        let self = this;

        CKEDITOR.disableAutoInline = true;
       
        $(this.element).addClass('initialised');
        this.checkEmpty()

        console.log($(this.element).data());

        if($(this.element).data('alwayson') == 1) {

            this.createEditor();

        } else {
        
            $(this.element).on('dblclick', function() {
                // alert("dblcick");   
            
                
                self.createEditor();


                // console.log(self.ck);

                self.ck.on('blur', function() {
                //    alert('blur ck');
                    $(self.element).removeClass("active");
                this.destroy();
                self.ck = null;
                $('#edit-' + self.unid).attr('contenteditable', false);
                });

                $('#edit-' + self.unid).focus();


            });

        }

    },

    createEditor: function() {

        let roxyFileman = '/ascentcore/fileman/index.html'; 

        let toolbar = $(this.element).data('toolbar'); //this.options.toolbar;
        let palette = $(this.element).data('palette');


        $(this.element).addClass("active");

        $('#edit-' + this.unid).attr('contenteditable', true);

        this.ck = CKEDITOR.inline( 'edit-' + this.unid,
            {  
                extraAllowedContent : 'form; form[*]; form(*); input; input(*); input[*]; p[style]; script; script(*); script[*]; iframe; code; embed; iframe[*]; embed[*]; span(*); div(*); div(codesnippet)[*]; div[*]; codesnippet; codesnippet[contenteditable]; codesnippet[partial]; codesnippet[*]', 
                filebrowserBrowseUrl:roxyFileman,
                filebrowserImageBrowseUrl:roxyFileman+'?type=image',
                removeDialogTabs: 'link:upload;image:upload',
                removePlugins : 'elementspath',

                // extraPlugins: 'font,richcombo,snippet,photogallery,justify,panel,button,floatpanel,panelbutton,colorbutton,colordialog',
                extraPlugins: 'richcombo,justify,panel,button,floatpanel,panelbutton,colorbutton,colordialog',
                contentsCss: [ '/css/fck_editorarea.css','/css/buttons.css' ],
                // colorButton_colors: '{{ join(",", \AscentCreative\CMS\Models\Swatch::all()->transform(function($item, $key) { return str_replace('#', '', $item->hex); })->toArray()) }}',
                colorButton_colors: palette,
                entities_additional: '#009',
                toolbar: toolbar
            }   

        );

        let self = this;

        this.ck.on('change', function(e) {
                // update the Textarea and fire off a change event (used by Form Dirty checks);
                $('#output-' + self.unid).val($('#edit-' + self.unid).html());
                $('#output-' + self.unid).change();
    
                self.checkEmpty();
    
                // $('#output-' + unid).trigger('change');
            });

    },

    checkEmpty: function() {

        if(!$('#edit-' + this.unid).text().trim().length) {
            $(this.element).addClass('empty');
        } else {
            $(this.element).removeClass('empty')
        }

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
