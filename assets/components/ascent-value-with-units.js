// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021
$.ascent = $.ascent?$.ascent:{};

var ValueWithUnits = {


    _init: function () {

        var self = this;

        // console.log(this.element.data());
        
        this.element.addClass('initialised');

        $(this.element).on('change', 'input, select', function(e) {
            console.log('VWU change');

            let val = $(self.element).find('INPUT.vwu-amount').val();
            let unit = $(self.element).find('SELECT.vwu-unit').val();
            let out = '';
            if(val) {
                out = val + unit;
            }

            $(self.element).find('.vwu-output').val(out);
            // $('input[name="{{ $name }}"]').val($out);
        });


    }

}

$.widget('ascent.valuewithunits', ValueWithUnits);
$.extend($.ascent.ValueWithUnits, {
		 
		
}); 


$(document).ready(function(){
   $('.value-with-units').not('.initialised').valuewithunits();
});



MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    // ...
    $('.value-with-units').not('.initialised').valuewithunits();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  childList: true
  //...
});