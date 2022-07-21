// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021
$.ascent = $.ascent?$.ascent:{};

var RelatedTokens = {

    // Default options.
	options: {
        fieldName: 'tags',
        tokenName: 'tag'
    },

    _init: function () {

        var self = this;

        console.log(this.element.data());
        
        val = this.element.data('tokens');

        //this.element.val('');

        this.element.wrap('<DIV class="cms-relatedtokens"></DIV>');

        this.element = this.element.parents('.cms-relatedtokens');

        this.element.prepend('<div class="rt_tokens"></div>');

        for($iTkn = 0; $iTkn < val.length; $iTkn++) {
            this.addToken(val[$iTkn][this.options.tokenName], val[$iTkn]['id']);
        }

        this.element.on('click', 'A.rt_remove', function() {
            $(this).parents('.rt_token').remove();
        });

        this.element.find("INPUT[type=text]").on('keydown', function(e) {

            console.log(e.which);

            var breaks = [9,13,188];

            if(breaks.includes(e.which)) {

                self.addToken($(this).val());
                $(this).val('');
                e.preventDefault();
                
            }


        });

        // this.addToken('test new');

        // this.addToken('Tag 2', 2);

    },

    addToken: function (label, id='') {

        var idx = this.element.find('.rt_token').length;
        // this.element.find('.rt_tokens').append('<div class="rt_token">' + label + '<input type="text" name="tags[' + idx + '][tag]" value="' + label + '"><input type="text" name="tags[' + idx + '][id]" value="' + id + '"></div>');
        this.element.find('.rt_tokens').append('<div class="rt_token">' + label + '<input type="hidden" name="' + this.options.fieldName + '[][' + this.options.tokenName + ']" value="' + label + '"><A href="#delete-token" class="bi-x-square-fill text-danger rt_remove"></A></div>');

        

    }

}

$.widget('ascent.relatedtokens', RelatedTokens);
$.extend($.ascent.RelatedTokens, {
		 
		
}); 

$(document).ready(function(){
   // $('.cms-relatedtokens').relatedtokens();
});