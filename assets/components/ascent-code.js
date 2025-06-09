// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021
$.ascent = $.ascent?$.ascent:{};

var Code = {

    options: {
        
    },


    _init: function () {

        var self = this;

        this.element.addClass('initialised');

        //allow textareas (with code class) to accept tabs:

        $(document).delegate('.code-editor', 'keydown', function(e) { 
            var keyCode = e.keyCode || e.which; 

            if (keyCode == 9) { 
                e.preventDefault(); 
                var start = $(this).get(0).selectionStart;
                var end = $(this).get(0).selectionEnd;

                // set textarea value to: text before caret + tab + text after caret
                $(this).val($(this).val().substring(0, start)
                            + "\t"
                            + $(this).val().substring(end));

                // put caret at right position again
                $(this).get(0).selectionStart = 
                $(this).get(0).selectionEnd = start + 1;
            } 
        });


    },

}

$.widget('ascent.code', Code);
$.extend($.ascent.Code, {
		 
		
}); 


$(document).ready(function(){
    $('.code-editor').not('.initialised').code();
});



MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    // ...
    $('.code-editor').not('.initialised').code();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  childList: true
  //...
});