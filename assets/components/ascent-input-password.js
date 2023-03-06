// ******
// Password Field value toggler
// - TODO - Implement!
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021


$.ascent = $.ascent?$.ascent:{};

var InputPassword = {

        toggle: null,
        
		_init: function () {
            
			var self = this;
			this.widget = this;
			
			idAry = (this.element)[0].id.split('-');
			
			var thisID = (this.element)[0].id;
			
			var fldName = idAry[1];
			
            var obj = this.element;

            $(this.element).addClass('initialised');

            // this.toggle = $('<div class="input-password-toggle"></div>');
            
            // console.log($(this.element).position());

            // this.toggle.css('top', $(this.element).position().top + 'px')
            //             .css('right', $(this.element).position().left + $(this.element).innerWidth() + 'px');

            // $('body').append(this.toggle);

            $(this.element).click(this.handleClick);
			
		},


        handleClick: function(e) {
            // detect if click is in the 'after' element
            // console.log($(this));
            // console.log($(this).find(':after'));
        },


}

$.widget('ascent.inputpassword', InputPassword);
$.extend($.ascent.InputPassword, {}); 




$(document).ready(function(){
    $('.input-password').not('.initialised').inputpassword();
});



MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    // ...
    $('.input-password').not('.initialised').inputpassword();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  childList: true
  //...
});