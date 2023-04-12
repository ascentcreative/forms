// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2022
$.ascent = $.ascent?$.ascent:{};

var ToggleSwitch = {

    // // Default options.
	// options: {

    // },

    _init: function () {

        var self = this;

        console.log('TS init');

        $(this.element).on('click', 'input', function(e) {
            self.updateUI();
        });

        this.updateUI();

        this.element.addClass("initialised");
      
    },

    updateUI: function() {
        $(this.element).find('label').removeClass('selected');
        $(this.element).find('input:checked').parents('label').addClass('selected');
    }

}

$.widget('ascent.toggleswitch', ToggleSwitch);
$.extend($.ascent.ToggleSwitch, {
		 
		
}); 

$(document).ready(function(){
   $('.toggle-switch').not('.initialised').toggleswitch();
});