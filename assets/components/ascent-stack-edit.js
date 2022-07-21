// ******

// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021


$.ascent = $.ascent?$.ascent:{};

var StackEdit = {
        
		rowCount: 0,

		_init: function () {

            
			var self = this;
			this.widget = this;
			
			idAry = (this.element)[0].id.split('-');
			
			var thisID = (this.element)[0].id;
			
			var fldName = idAry[1];
			
            var obj = this.element;
            
            // make the stack sortable (drag & drop)
           $(this.element).find('.stack-blocks').sortable({
                axis: 'y',
                handle: '.block-handle',
                start: function(event, ui) {
                    $(ui.placeholder).css('height', $(ui.item).height() + 'px');
                },
                update: function(event, ui) {
                    
                    self.updateBlockIndexes();

                }
            });

            //capture the submit event of the form to serialise the stack data
            $(this.element).parents('form').on('submit', function() {

                self.serialise();

            });


            $(this.element).on('change', function() {

                self.serialise();

            });





            $(this.element).on('click', '.block-delete', function() {
                console.log('delete me');

                if (confirm("Delete this block?")) {
                    $(this).parents('.block-edit').remove();
                    self.updateBlockIndexes();
                }

                return false;
            }); 
            
            // capture the click event of the add block button
            // (test for now - adds a new row block. Will need to be coded to ask user what block to add)
            $(this.element).find('.stack-add-block').on('click', function() {

                //var type = 'row';\
            
                var type = $(this).attr('data-block-type');
                var field = $(this).attr('data-block-field'); //'content';
                var idx = $(self.element).find('.block-edit').length;

            //    alert(idx);

                $.get('/admin/stackblock/make/' + type + '/' + field + '/' + idx, function(data) {
                   // $(self.element).find('.stack-output').before(data);
                   $(self.element).find('.stack-blocks').append(data);
                   self.updateBlockIndexes();
                
                });

             //   alert('hide...');
                $('.btn.dropdown-toggle').dropdown('hide');

                return false;

            });

            this.serialise();


		},

        serialise: function() {

            var data = $(this.element).find('INPUT, SELECT, TEXTAREA').not('.stack-output').serializeJSON();

           // console.log(data);
         //  return false;
         
            // remove the top level wrapper (which is just the field name):
            for(fld in data) {
          
                $(this.element).find('.stack-output').val(
                    JSON.stringify(data[fld])
                );

            }

        },

        updateBlockIndexes: function() {

            // console.log('UBI - Stack');

            // console.log($(this.element).find('.block-edit'));

            // reapply field indexes to represent reordering
            $(this.element).find('.block-edit').each(function(idx) {

                $(this).find('INPUT:not([type=file]), SELECT, TEXTAREA').each(function(fldidx) {

                 //   console.log(idx + " vs " + fldidx);

                    if($(this).attr('name') != undefined && $(this).attr('name').indexOf('[')) {
                        var ary = $(this).attr('name').split(/(\[|\])/);
                        ary[2] = idx;
                        $(this).attr('name', ary.join(''));
                        $(this).change();
                    }
                  
                   // $('#frm_edit').addClass('dirty'); //trigger('checkform.areYouSure');
                    
                });

            });

            

        }   

}

$.widget('ascent.stackedit', StackEdit);
$.extend($.ascent.StackEdit, {
		 
		
}); 