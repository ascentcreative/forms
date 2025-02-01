// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021
$.ascent = $.ascent?$.ascent:{};

var RelatedTokens = {

    // Default options.
	options: {
        value: null,
        fieldName: 'tags',
        labelField: 'title',
        allowNewValues: true,
        source: null
    },

    _init: function () {

        var self = this;
        
        val = this.options.value;

        //this.element.val('');

        this.element.wrap('<DIV class="relatedtokens form-control p-2 bg-light"></DIV>');

        this.element = this.element.parents('.relatedtokens');

        // this.element.prepend('<div class="rt_tokens"></div>');
        for($iTkn = 0; $iTkn < val.length; $iTkn++) {
            this.addToken(val[$iTkn][this.options.labelField], val[$iTkn]['id']);
        }

        this.element.on('click', 'A.rt_remove', function() {
            $(this).parents('.rt_token').remove();
            self.updateFieldIndexes();
        });


        // uses keyup rather than down so the e ventr fires after the autocomplete select callback 
        // if needed. That means the field is empty and the addToken will return and not add a second token
        this.element.find("INPUT[type=text]").on('keyup', function(e) {

            // only create new tokens on Enter etc if new values allowed
            // (existing values come from the autocomplete and are handled by the select callback)
            if(self.options.allowNewValues) {
                var breaks = [9,13,188];

                if(breaks.includes(e.which)) {
                    self.addToken($(this).val());
                    e.preventDefault();
                }

            }

        });

        console.log(self.options)

        // Create an autocompleete widget
        // Should the valuesbe fetched by ajax or passed into the widget?
        // Maybe either or - just let the calling code pass in either the array or a URL string
        this.element.find('.item-entry').autocomplete({
            source: self.options.source,
            select: function( event, ui) {
                self.addToken(ui.item.label, ui.item.id);
                return false;
            }
        });

    },

    addToken: function (label, id='') {

        if (label == '')
            return;

        // check if token exits. Don't allow duplicates.
        // NB - this could be a duplicate of a new value (null id), or not.
        // might be best to check on label value.
        let dupe = false;
        this.element.find(".rt_token .token-label").each(function (idx) {
            console.log($(this).val(), label);
            if($(this).val() == label) {
                alert("That item has already been added.");
                dupe = true;
                return;
            }
        });

        if(dupe)
            return;
        
        
        var idx = this.element.find('.rt_token').length;

        token = '<div class="rt_token">';
        token += label;
        token += '<input type="hidden" class="token-label" name="' + this.options.fieldName + '[' + idx + '][' + this.options.labelField + ']" value="' + label + '">';
        token += '<input type="hidden" class="token-id" name="' + this.options.fieldName + '[' + idx + '][id]" value="' + id + '">';
        token += '<A href="#delete-token" class="bi-x-square-fill text-danger rt_remove"></A>';
        token += '</div>';

        this.element.find('input.item-entry').before(token);

        this.element.find('input.item-entry').val(''); //.autocomplete('close');

    },

    updateFieldIndexes: function() {

        var fldname = this.options.fieldName;

        console.log('UFI', fldname);

        // reapply field indexes to represent reordering
        $(this.element).find('.rt_token').each(function(idx) {

            var prefix = fldname + "[" + idx + "]";

            $(this).find('INPUT').each(function(fldidx) {

                esc = fldname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                re = new RegExp(esc + "\\[\\d+\\]");
                
                this.name = this.name.replace(re, prefix);   
                
            });

        });

        // $(this.element).trigger('change');

        
    }   

}

$.widget('ascent.relatedtokens', RelatedTokens);
$.extend($.ascent.RelatedTokens, {
		 
		
}); 

$(document).ready(function(){
   // $('.cms-relatedtokens').relatedtokens();
});