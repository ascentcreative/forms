// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021
$.ascent = $.ascent?$.ascent:{};

var CompoundFormElement = {


    _init: function () {

        var self = this;

        this.element.addClass('initialised');

        $(this.element).on('click', function(e) {
            $(self.element).addClass("active");
            $(this).find('input, [contenteditable]').focus();
        });

        $(this.element).on('focus', 'input, select, [contenteditable]', function(e) {
            $(self.element).addClass("active");
        });

        $(this.element).on('blur', 'input, select, .fce-edit', function(e) {
            $(self.element).removeClass("active");
        });

        $(this.element).on('input', 'input, select, textarea, .fce-edit', function() {
            let val = '';
            if(this.tagName == 'DIV') {
                val = $(this).html();
            } else {
                val = $(this).val();
            }
            if(val == '') {
                $(self.element).removeClass("has-value");
            } else {
                $(self.element).addClass("has-value");
            }
        });

        if($(this.element).find('input, select, textarea').val() != '') {
            self.checkValue();
            $(this.element).addClass("has-value");
        }

        window.setTimeout(function () {
      
            let elm = $(self.element).find('input, select');
            if(elm.length > 0 && elm.is(':-webkit-autofill')) {
                $(self.element).addClass("has-value");
            }
            
        }, 100);

    },

    checkValue: function () {
        
    }

   

}

$.widget('ascent.compoundformelement', CompoundFormElement);
$.extend($.ascent.CompoundFormElement, {
		 
		
}); 


$(document).ready(function(){
   $('.compound-form-element').not('.initialised').compoundformelement();
});



MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    // ...
    $('.compound-form-element').not('.initialised').compoundformelement();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  childList: true
  //...
});