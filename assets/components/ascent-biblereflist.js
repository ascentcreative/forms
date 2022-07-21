// ******
// Custom form component to enter & edit bible refs
// Expects incoming data from Laravel Eloquent
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021


$.ascent = $.ascent?$.ascent:{};

var BibleRefList = {
        
		rowCount: 0,

		_init: function () {
            
			var self = this;
			this.widget = this;
			
			idAry = (this.element)[0].id.split('-');
			
			var thisID = (this.element)[0].id;
			
			var fldName = idAry[1];
			
            var obj = this.element;
            
            // build the basic UI
            // wrap the main element in a new DIV, transfer the ID and remove initial element.
            var outer = $('<div class="biblereflist p-3 bg-light border" style="xbackground: #eee"></div>');
            obj.wrap(outer);
            outer = obj.closest('.biblereflist');
            outer.attr('id', obj.attr('id'));
            this.element = outer;
            obj.remove();
            
            // read in options and process
            var opts = self.options;
            
			if(opts.width) {
				
				if (typeof opts.width === 'string' && opts.width.slice(-1) == '%') {
					    outer.css('width', opts.width);
					} else {
						outer.css('width', opts.width + 'px');
					}
				
			} else {
				outer.css('width', '600px');
			}
			
			if (!opts.placeholder) {
				opts.placeholder = '';
            }
			


			

			// create the UL and autocomplete fields
			$(outer).append('<UL class="biblereflist-list list-group pb-2"></UL>');
			$(outer).find(".biblereflist-list").append('<LI class="emptyDisp list-group-item border-0 bg-transparent">No items selected</LI>');
			$(outer).append('<DIV class="inputbar d-flex align-items-center"><INPUT type="text" id="' + thisID + '-input" class="flex-fill mr-2 form-control" spellcheck="false" placeholder="' + opts.placeholder + '"/><A href="#" id="' + thisID + '-addlink" class="btn-sm btn-primary">Add</A></DIV>');
		

			$('#' + thisID + '-input').keyup(function (e) {

				if(e.keyCode == 13) {
					self.submitBlock(this);
				}
			
			});



			console.log(opts.data);
			// create items for incoming data 
        	for(item in opts.data) {
	
				self.createBlock('', item, opts.data[item].label, opts.data[item]);
			
			}



			// Add button and events
			$("#" + thisID + "-addlink").button({
				
			}).click(function (event) {
				 
				self.submitBlock($("#" + thisID + "-input"));
				
				return false;
			}); 
			
            
            
            if (opts.allowItemDrag) {
	
				$("#" + thisID + " .biblereflist-list").sortable({
					axis: "y",
					connectWith: '#' + thisID + ' ul',
					containment: '#' + thisID,
				
				update: function(event, ui) {
					opts.widget.updateData();
				},
				
				stop: function(event, ui) {
					
				}
				
			}); 
			}
			
			opts.widget = this;
			
			
		},

		submitBlock: function(fld) {

			var self = this;
			// enter pressed:
			// submit reference for parsing
			$.get('/cms/bibleref/parse/' + $(fld).val(), 
						
				function(data) {
					console.log(data);
					//var result = $.parseJSON(data);
					if (data['result'] == 'error') {
						alert(data['message']);
					} else if (data['result'] == 'ok') {
						self.createBlock('', '', '', data['data']);
						$(fld).val('');
					}
								
				}
						
			);

		},
		
		createBlock: function (idLink, idModel, display, item) {

			console.log(idModel);
			console.log(item);
            
            var thisID = (this.element)[0].id;
			var fldName = thisID; //.split('-')[1];
			var widget = this.widget;
			
			idx = $("#" + thisID + " .biblereflist-list LI.link").length; // + 1;
			
			console.log(item);

			liStr = '<div class="biblereflist-item-label flex-fill">' + item.ref + '</div>';
			liStr += '<INPUT type="hidden" class="id" name="' + fldName + '[' + idx + '][ref]" value="' + item.ref + '">';
			liStr += '<INPUT type="hidden" class="id" name="' + fldName + '[' + idx + '][book]" value="' + item.book + '">';
			liStr += '<INPUT type="hidden" class="id" name="' + fldName + '[' + idx + '][startChapter]" value="' + item.startChapter + '">';
			liStr += '<INPUT type="hidden" class="id" name="' + fldName + '[' + idx + '][startVerse]" value="' + item.startVerse + '">';
			liStr += '<INPUT type="hidden" class="id" name="' + fldName + '[' + idx + '][endChapter]" value="' + item.endChapter + '">';
			liStr += '<INPUT type="hidden" class="id" name="' + fldName + '[' + idx + '][endVerse]" value="' + item.endVerse + '">';
			

			// create fields for the various elements of the bible ref:
			


		//	liStr += '<INPUT type="hidden" class="BREAKME" name="' + fldName + '[' + idModel + '][breakme]" value="' + idx + '">';
            
            

            // the delete link for the item
        	liStr += '<A href="#" class="deleteLink text-danger" tabindex="-1"><i class="bi-x-square-fill text-danger fs-1"/></A>';
			
			safeid = item.id; //.replace('~', '_');
            
            // add the created LI to the List
			$("#" + thisID + " .biblereflist-list").append('<LI class="link list-group-item border mb-2 d-flex justify-content-between align-items-center" id="' + safeid + '">' + liStr + '</LI>');
			// if not already hidden, hide the placeholder 'No Items' element
			$("#" + thisID + " .biblereflist-list LI.emptyDisp").hide();
			
			
			// Code the operation of the delete link:
			$("#" + thisID + " LI#" + safeid + " A.deleteLink").click(function (event) {
				
				pSrc = $(this).parents(".linklist");
				$(this).parents("LI.link").remove();
				
				if(pSrc.find("LI.link").length > 0) {
					pSrc.find("LI.emptyDisp").hide();
				} else {
					pSrc.find("LI.emptyDisp").show();
				}
				
				widget.updateData(); // call method to update the data in the widget (i.e. update sort indeces etc)
				return false;
				
			});
			
		},
		
		updateData: function() {
			
			thisID = (this.widget.element)[0].id;
			
			// show or hide the 'No Items' block as needed by the amount of data in the widget
			if($(this.widget.element).find("LI.link").length > 0) {
				$(this.widget.element).find("LI.emptyDisp").hide();
			} else {
				$(this.widget.element).find("LI.emptyDisp").show();
			}
	
            // update the sortFields (if specified) so the posted data records the order of the items
            if (this.options.sortField) {

                $(this.widget.element).find('LI.link').each(function(i) {
                    $(this).find('.sortField').val(i);
                });

            }
			
			
		}

}

$.widget('ascent.biblereflist', BibleRefList);
$.extend($.ascent.BibleRefList, {
		 
		
}); 