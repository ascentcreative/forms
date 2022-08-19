// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021
$.ascent = $.ascent?$.ascent:{};

var CompoundDate = {


    _init: function () {

        var self = this;

        // console.log(this.element.data());
        
        // console.log('CD INIT');

        this.element.addClass('initialised');
// 
        console.log(this.element);

        $(this.element).on('change', 'input', function(e) {
            // console.log('cd change');
            $out = $(self.element).find('INPUT.cd-year').val() + "-" + $(self.element).find('INPUT.cd-month').val() + "-" + $(self.element).find('INPUT.cd-day').val();

            if($out != '--') {
                $(self.element).find('.compound-date-output').val($out);
            } else {
                $(self.element).find('.compound-date-output').val(null);
            }
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

$.widget('ascent.compounddate', CompoundDate);
$.extend($.ascent.CompoundDate, {
		 
		
}); 


$(document).ready(function(){
//    $('.compound-date').not('.initialised').compounddate();
});



MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    // ...
    $('.compound-date').not('.initialised').compounddate();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  childList: true
  //...
});