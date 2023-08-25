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
            $(this).find('input').focus();
        });

        $(this.element).on('focus', 'input, select', function(e) {
            $(self.element).addClass("active");
        });

        $(this.element).on('blur', 'input, select', function(e) {
            $(self.element).removeClass("active");
        });

        $(this.element).on('change', 'input, select', function() {
            if($(this).val() == '') {
                $(self.element).removeClass("has-value");
            } else {
                $(self.element).addClass("has-value");
            }
        });

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