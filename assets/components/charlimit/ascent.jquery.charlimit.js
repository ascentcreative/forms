// ******
// js code to handle a field which displays values based on the selection in another field.
//  - builds UI in the admin area
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2017
// Code may be used as part of a site built and hosted by Ascent Creative, but may not be transferred to 3rd parties

$.ascent = $.ascent?$.ascent:{};

var CharLimit = {
		
	max: 0,
	warndistance: 10,
    options: {
        'max': 0,
        warndistance: 10
    },
	
	_init: function () {
		var self = this;
		this.widget = this;
			
		var opts = self.options;
		
		var elm = self.element;

        // alert('CL init');
		
		var counter = $('<SPAN class="charlimit_display" id="charlimit_' + elm.attr('id') + '"><SPAN class="charlimit_count">0</SPAN>/' + opts.max + '</SPAN>');

        elm.wrap('<div class="charlimit_wrap"></div>');
		
		elm.parent().append(counter);
		
		$(elm).on('keydown', function(e) {
			
            let val = elm.val();
            
            if(val == '') {
                val = elm.html();
            }

			self.oldval = val;
			
		});
		
		$(elm).on('input', function(e) {

            let val = elm.val();
            
            if(val == '') {
                val = elm.text();
            }
            
			if(val.length > self.options.max && self.options.force) {
                if(elm.val()) {
				    elm.val(elm.val().substr(0, self.options.max));
                } else {
                    elm.html(self.oldval);
                }
			}
			
			self.update();
		
		});
		
		
		$(elm).on('resize', function(e) {
			self.update();
		});
		
		setTimeout(function() {
			self.update();
		}, 0);
		

	},
	
	update: function() {

        var self = this;
		var elm = this.element;
		var counter = $('#charlimit_' + elm.attr('id'));

        let len = 0;
		if(elm.val()) {
		    len = elm.val().length;
        } else {
            len = elm.text().length; // for contenteditables
        }

		$(counter).find('.charlimit_count').html(len);
				
		if (len >= (self.options.max - self.options.warndistance)) {
			$(counter).addClass('full'); 
		} else {
			$(counter).removeClass('full');
		}
		
	}
	
}

$.widget('ascent.charlimit', CharLimit);
$.extend($.ascent.charlimit, {
		 
		
}); 