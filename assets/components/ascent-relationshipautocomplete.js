// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2022
$.ascent = $.ascent?$.ascent:{};

var RelationshipAutocomplete = {

    // Default options.
	options: {
      source: '',
      displayField: ''
    },

    _init: function () {

        var self = this;

        // console.log(this.options.source);

        $(this.element).find('.ra-input').autocomplete({
            source: this.options.source,
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

        $(this.element).on('click', '.ra-clear', function() {
            self.setValue(null);
            return false;
        });
            

    },

    setValue: function(item) {

       
        if(item) {

            let display = item[this.options.displayField];

            if (!display) {
                display = item.label;
            }

            $(this.element).find('.ra-value').val(item.id);
            $(this.element).find('.ra-label').html(display);
            $(this.element).addClass("has-value");
        } else {
            $(this.element).find('.ra-value').val('');
            $(this.element).find('.ra-input').val('');
            $(this.element).find('.ra-label').html('');
            $(this.element).removeClass("has-value");
        }   

    }

}

$.widget('ascent.relationshipautocomplete', RelationshipAutocomplete);
$.extend($.ascent.RelationshipAutocomplete, {
		 
		
}); 

$(document).ready(function(){
   // $('.cms-relatedtokens').relatedtokens();
});