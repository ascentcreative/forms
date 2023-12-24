// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021
$.ascent = $.ascent?$.ascent:{};

var DateTimeField = {


    _init: function () {

        var self = this;

        // console.log(this.element.data());
        
        // console.log('CD INIT');

        this.element.addClass('initialised');

        // alert('DTF');
// 
        console.log(this.element);

        $(this.element).on('change', function(e) {
            console.log('dtf change');

            let out = $(self.element).find('.dtf-date').val() + " " + $(self.element).find('.dtf-time').val();

            console.log(out);

            $(self.element).find('.dtf-output').val(out);

            // if($out != '--') {
            //     $(self.element).find('.compound-date-output').val($out);
            // } else {
            //     $(self.element).find('.compound-date-output').val(null);
            // }
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

$.widget('ascent.datetimefield', DateTimeField);
$.extend($.ascent.DateTimeField, {
		 
		
}); 


$(document).ready(function(){
   $('.datetime-element').not('.initialised').datetimefield();
});



MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    // ...
    $('.datetime-element').not('.initialised').datetimefield();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  childList: true
  //...
});