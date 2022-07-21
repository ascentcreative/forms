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

$(document).ready(function(){
   // $('.cms-relatedtokens').relatedtokens();
});