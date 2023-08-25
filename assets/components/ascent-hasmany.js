// ******
// Form component to work with Eloquent HasMany relationships. 
// Expects routes (in Web.php) to handle creation modal and items. 
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021


$.ascent = $.ascent?$.ascent:{};

var HasMany = {
        
		rowCount: 0,

		_init: function () {
            
			var self = this;
			this.widget = this;
			
			idAry = (this.element)[0].id.split('-');
			
			var thisID = (this.element)[0].id;
			
			var fldName = idAry[1];
			
            var obj = this.element;

            /**
             * Add New button click:
             */
             $(this.element).on('click', '.hasmany-add', function() {
                
                // .hasmany-add is coded in the blade as a simple modal-link which already knows its URL. 
                // We just need to capture the event of data being returned and handle that data
                $(document).on('modal-link-response', { hasmany: self }, self.appendItem);

             });

            

            /**
             * Catches all the dialog close events and removes the handlers for this widget
             * (Doesn't matter if it fires inbetween)
             * (Tried using one(), but this means the handlers don't get removed if the modal is cancelled)
             */
            $(document).on('hidden.bs.modal', '#ajaxModal', self.clearHandlers);

            
            /**
             * Edit an item row
             */
            $(this.element).on('click', '.hasmany-edititem', function() {

                // to work with the modal-link setup, we should serialise the item's data
                data = ($(this).parents('.hasmany-item').find('INPUT, TEXTAREA').serialize());

                // pull in the base URL from the .hasmany-add button
                url = $(this).parents('.hasmany').find('.hasmany-add').attr('href');
                // and append the serialised data to it.
                $(this).attr('href', url + "?" + data);

                // ensure it's a modal link so that the edit screen pops up in a dialog.
                // the modalLink widget will handle the actual flow and creation of the modals
                $(this).addClass('modal-link');

                // when we get a positive response from the modalLink, add in returned data
                $(document).on('modal-link-response', { hasmany: self }, self.replaceItem );

            });


            /**
             * Custom action hook, allowing a modal to be displayed and the calling item to be replaced
             * 
             * Passing in a 'blade' parameter will divert the edit action to a different modal UI
             *  - that modal UI can submit to a different route than the base one to avoid generic proccessing
             *  - but the custom route must render a new copy of the item blade to replace the existing one. 
             * 
             *  - the 'blade' parameter should be in the data-blade attribute of the calling link/button
             *       - blade file assumed to be in same directory as the item and modal blades
             * 
             */
             $(this.element).on('click', '.hasmany-item-action', function(e) {

                // to work with the modal-link setup, we should serialise the item's data
                data = ($(this).parents('.hasmany-item').find('INPUT, TEXTAREA').serialize());

                data += '&blade=' + $(this).attr('data-blade');

                // console.log(data);

                // e.preventDefault();

                // return false;
                // pull in the base URL from the .hasmany-add button
                url = $(this).parents('.hasmany').find('.hasmany-add').attr('href');
                // and append the serialised data to it.
                $(this).attr('href', url + "?" + data);
               // alert('ok : ' + $(this).attr('href'));

                // ensure it's a modal link so that the edit screen pops up in a dialog.
                // the modalLink widget will handle the actual flow and creation of the modals
                $(this).addClass('modal-link');

                // when we get a positive response from the modalLink, add in returned data
                $(document).on('modal-link-response', { hasmany: self }, self.replaceItem );

            });


             /**
             * Removes an item block from the component
             */
              $(this.element).on('click', '.hasmany-removeitem', function(e) {
                e.preventDefault();
                if(confirm("Remove this item?")) {
                    $(this).parents('.hasmany-item').remove();
                    self.updateIndexes();
                    $(self.element).trigger('change');
                }
            });

            
            this.updateIndexes();
			
		},

        /**
         * Create a new item in the field's item list (from the HTML returned in the event)
         * @param {*} e - The event
         */
        appendItem: function(e) {
            $(e.data.hasmany.element).find('.hasmany-items').append(e.response);
            e.data.hasmany.updateIndexes();
            $(e.data.hasmany.element).trigger('change');
        },
        

        /**
         * Replace an item in the field's item list with the HTML returned in the event. 
         * The index of the item to replace should be in the HTML.
         * @param {*} e - The event
         */
        replaceItem: function(e) {
         
            elm = $(e.response);
            idx = elm.data('idx');
         
            $($(e.data.hasmany.element).find('.hasmany-item')[idx]).replaceWith(elm);

            e.data.hasmany.updateIndexes();

            $(e.data.hasmany.element).trigger('change');

        },

        /**
         * Remove the event handlers - the modal has closed, so we mustn't listen for events any longer
         * Any events received may have come from other fields.
         */
        clearHandlers: function() {
            $(document).off('modal-link-response', self.appendItem );
            $(document).off('modal-link-response', self.replaceItem );
        },


        updateIndexes: function() {

            // console.log('update');
          //  alert('update');

            fldname = ($(this.element).data('fieldname'));

            $(this.element).find('.hasmany-item').each(function(idx) {

                var prefix = fldname + "[" + idx + "]";

                // console.log(prefix);

                $(this).find('INPUT, TEXTAREA').each(function(fldidx) {

                    esc = fldname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                    re = new RegExp(esc + "\\[\\d+\\]");
                        
                    this.name = this.name.replace(re, prefix);   

                });
                       
            });

        }

}

$.widget('ascent.hasmany', HasMany);
$.extend($.ascent.HasMany, {
		 
		
}); 