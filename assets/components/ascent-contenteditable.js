
    // ******

    // ******
    // Code (c) Kieran Metcalfe / Ascent Creative 2021
    $.ascent = $.ascent?$.ascent:{};

    var ContentEditable = {

        ck: null,
        options: {
            toolbar: ''
        },
        unid: '',

        _init: function () {

            let unid = $(this.element).attr('data-unid');

            this.unid = unid;

            
            let self = this;

        
            $(this.element).addClass('initialised');
            
            /**
             * Handle updates to content div. 
             */
            $(this.element).on('input', '.fce-edit', function(e) {
            
                $(self.element).find('textarea').val($(this).html());

            });


        }
        
    }


    $.widget('ascent.contenteditable', ContentEditable);
    $.extend($.ascent.ContentEditable, {
            
    }); 








    // init on document ready
    $(document).ready(function(){
    $('.forms-contenteditable').not('.initialised').contenteditable();
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
        $('.forms-contenteditable').not('.initialised').contenteditable();
    });

    // define what element should be observed by the observer
    // and what types of mutations trigger the callback
    observer.observe(document, {
    subtree: true,
    childList: true
    //...
    });
