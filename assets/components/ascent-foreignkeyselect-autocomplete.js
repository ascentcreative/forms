// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2022
$.ascent = $.ascent?$.ascent:{};

var ForeignKeySelectAutoComplete = {

    // Default options.
	options: {
      source: ''
    },

    _init: function () {

        var self = this;

        console.log(this.options.source);

        


        // console.log(Buffer.from($(this.element).data('source'), 'base64').toString('ascii'));

        console.log();

        this.options.source = $.parseJSON(atob($(this.element).data('source')))

        $(this.element).find('.fksac-input').autocomplete({
            source: this.options.source,
            // source: this.options.source,
            select: function(ui, item) {
            
                self.setValue(item.item);
         
            }
        }).autocomplete('instance')._renderItem = function( ul, item ) {

            if(item.formattedlabel) {
                return $( "<li>").append(item.formattedlabel).appendTo(ul);
            } else {
                return $( "<li>").append('<div>' + item.label + '<div>').appendTo(ul);
            }
        
        };

        $(this.element).on('click', '.fksac-clear', function() {
            self.setValue(null);
            return false;
        });

        this.element.addClass('initialised');
            

    },

    setValue: function(item) {

        if(item) {
            $(this.element).find('.fksac-value').val(item.id);
            $(this.element).find('.fksac-label').html(item.label);
            $(this.element).addClass("has-value");
        } else {
            $(this.element).find('.fksac-value').val('');
            $(this.element).find('.fksac-input').val('');
            $(this.element).find('.fksac-label').html('');
            $(this.element).removeClass("has-value");
        }   

    }

}

$.widget('ascent.foreignkeyselectautocomplete', ForeignKeySelectAutoComplete);
$.extend($.ascent.ForeignKeySelectAutoComplete, {
		 
		
}); 



// init on document ready
$(document).ready(function(){
    // alert('init blockselect');

    $('.foreign-key-select-autocomplete').not('.initialised').foreignkeyselectautocomplete({
        // source: {!! $vals !!}
    });

});




MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    // ...
    $('.foreign-key-select-autocomplete').not('.initialised').foreignkeyselectautocomplete({
        // source: {!! $vals !!}
    });
    
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  childList: true
  //...
});
