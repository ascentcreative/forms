// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2022
$.ascent = $.ascent?$.ascent:{};

var SubformLoader = {

    // // Default options.
	// options: {

    // },

    _init: function () {

        var self = this;

        // alert('SFLoader: ' + this.element.data('source') );
        let map = this.element.data('map')

        // watch for changes in the watched field, and use that value to request a subform.

        $(document).on('change', '[name=' + this.element.data('source') + ']', function (e) {
            // alert('changed');
            $(self.element).css('opacity', 0.5);
            
            let source = e.target;
            console.log(source);

            $.ajax({
                'method': 'post',
                'url': '/forms/subformloader',
                'data': {
                    'key': $(source).val(),
                    'map': map
                }
            }).done(function(data) { 
                $(self.element).html(data);
                $(self.element).css('opacity', 1);
            });

        });

        // load it over AJAX and replace the content accordingly
        $(this.element).addClass("initialised");
      

    },

    _destroy: function() {
        $(document).off('change', '[name=' + this.element.data('source') + ']');
    }

}

$.widget('ascent.subformloader', SubformLoader);
$.extend($.ascent.SubformLoader, {
		 
		
}); 

$(document).ready(function(){
   $('.subform-loader').subformloader();
});



MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    // ...
    $('.subform-loader').not('.initialised').subformloader();

    // if (.removedNodes) console.log(1);
    // console.log(mutations);


});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
subtree: true,
childList: true
//...
});
