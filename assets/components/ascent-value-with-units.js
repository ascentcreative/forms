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
            $out = $(self.element).find('INPUT.vwu-amount').val() + $(self.element).find('SELECT.vwu-unit').val();

            $(self.element).find('.vwu-output').val($out);
            // $('input[name="{{ $name }}"]').val($out);
        });

        // $(this.element).on('keyup', '.cd-day, .cd-month', function(event) {
        //     if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)){
        //         let len = 2;
        //         if($(this).val().length == len) {
        //             let next = $(this).nextAll('input')[0];
        //             if(next) {
        //                 next.focus();
        //             }
                    
        //         }
        //     }
        // });

        //this.element.val('');


        // this.addToken('test new');

        // this.addToken('Tag 2', 2);

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