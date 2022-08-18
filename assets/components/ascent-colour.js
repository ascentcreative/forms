// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021
$.ascent = $.ascent?$.ascent:{};

var ColourField = {

    options: {
        palette: null
    },


    _init: function () {

        var self = this;

        this.element.addClass('initialised');

        console.log('colour init');

        this.options.palette = $(this.element).data('palette').split(',');
      
        $(this.element).spectrum({

            showPalette: true,
            showPaletteOnly: false,

            palette: self.options.palette,
            
            hideAfterPaletteSelect: true,
            togglePaletteOnly: false
        
        });



    }

}

$.widget('ascent.colourfield', ColourField);
$.extend($.ascent.ColourField, {
		 
		
}); 


$(document).ready(function(){
    $('.colour').not('.manual-init').not('.initialised').colourfield();
});



MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    // ...
    $('.colour').not('.manual-init').not('.initialised').colourfield();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  childList: true
  //...
});