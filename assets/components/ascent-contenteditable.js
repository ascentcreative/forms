
    // ******

    // ******
    // Code (c) Kieran Metcalfe / Ascent Creative 2021
    $.ascent = $.ascent?$.ascent:{};

    var ContentEditable = {

        ck: null,
        options: {
            toolbar: '',
            pasteTextOnly: false,
        },
        unid: '',

        _init: function () {

            let unid = $(this.element).attr('data-unid');

            this.unid = unid;

            
            let self = this;

        
            $(this.element).addClass('initialised');

            self.options.pasteTextOnly = self.element.data('pastetextonly');
            
            /**
             * Handle updates to content div. 
             */
            $(this.element).on('input', '.fce-edit', function(e) {
            
                $(self.element).find('textarea').val($(this).html());

            });


             // ** Strip out HTML on paste **
            $(this.element).on('paste', '.fce-edit', function(e) {

                if(!self.options.pasteTextOnly) {
                    return;
                }
            
                e.preventDefault();
                e.stopPropagation();

                clipboardData = e.originalEvent.clipboardData || window.clipboardData;
                pastedData = clipboardData.getData('Text');

                // paste the text only content in at the cursor position:
                if (window.getSelection) {
            
                    let sel = window.getSelection();

                    if(sel.getRangeAt && sel.rangeCount) {
            
                        let range = sel.getRangeAt(0);
            
                        var el = document.createElement("div");
                        el.innerHTML = pastedData;
            
                        var frag = document.createDocumentFragment(), node, lastNode;
                        while ( (node = el.firstChild) ) {
                            lastNode = frag.appendChild(node);
                        }
                        range.insertNode(frag);
            
                        // Preserve the selection
                        if (lastNode) {
                            range = range.cloneRange();
                            range.setStartAfter(lastNode);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
            
                    }
                } else if (document.selection && document.selection.createRange) {
                    document.selection.createRange().text = pastedData;
                }

                $(this).trigger('input');

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
