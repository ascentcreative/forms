// ******
// Custom form component to enter & edit pivot records
// Expects incoming Pivot Table data from Laravel Eloquent
// Allows for setting of fields on the Pivot Record:
// - AddToAll - A field name and fixed value. Used when a siingle pivot table differentiates between different types (i.e. a role type where a single pivot may record different roles)
// - PivotField - An editable field value to collect for each pivot row
// - SortField - Captures the sort order of the pivot rows
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2020


$.ascent = $.ascent?$.ascent:{};

var PivotList = {
        
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
            var outer = $('<div class="pivotlist p-3 bg-light border" style="xbackground: #eee"></div>');
            obj.wrap(outer);
            outer = obj.closest('.pivotlist');
            outer.attr('id', obj.attr('id'));
            outer.attr('name', obj.attr('name'));
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
				// outer.css('max-width', '600px');
			}
			
			if (!opts.placeholder) {
				opts.placeholder = '';
            }
            

			// create the UL and autocomplete fields
			$(outer).append('<UL class="pivotlist-list list-group pb-2"></UL>');
			$(outer).find(".pivotlist-list").append('<LI class="emptyDisp list-group-item border-0 bg-transparent">No items selected</LI>');
			
            // ** temp removal of 'add' button as it does nothing! ** //
            // $(outer).append('<DIV class="inputbar d-flex align-items-center"><INPUT type="text" id="' + thisID + '-input" class="flex-fill mr-2 form-control" spellcheck="false" placeholder="' + opts.placeholder + '"/><A href="#" id="' + thisID + '-addlink" class="btn-sm btn-primary">Add</A></DIV>');
            $(outer).append('<DIV class="inputbar d-flex align-items-center"><INPUT type="text" id="' + thisID + '-input" class="flex-fill mr-2 form-control" spellcheck="false" placeholder="' + opts.placeholder + '"/></DIV>');
            
		
            // url building:
            let urlsep = '?';
            if(opts.optionRoute.indexOf('?') != -1) {
                urlsep = '&';
            }

			// autocomplete and events
			$("#" + thisID + "-input").autocomplete({
				source: opts.optionRoute + urlsep + 'return_field=' + self.options.labelField, //opts.autocompleteURL,
			    minLength: 2,
			    select: function( event, ui ) {

                        // console.log(self);
			    	
                        lblfld = self.options.labelField;

			    		// console.log(ui);
			    	
			    		if (  $("#" + thisID + " #" + ui.item.id).length > 0 ) {
                            // check for duplicates (across all source fields)
                            alert ("That item has already been added.")
			    		} else { 

                            if(ui.item.id == 'create' && opts.storeRoute) {
                                // fire off a request to create the new term.
                               // alert(ui.item.term);

                                $.ajax({

                                    type: 'POST',
                                    url: opts.storeRoute,
                                    data: {
                                        [lblfld] : ui.item.term
                                    },
                                    headers: {
                                        'Accept' : "application/json"
                                    }
                                }).done(function(data, xhr, request){
                                 //   console.log(data);  
                                  //  alert(data.id);
                                    ui.item.id = data.id;
                                    ui.item.label = data[self.options.labelField]; //theme;

                                    self.createBlock('', ui.item.id, ui.item.label, ui.item);
                                    $("#" + thisID + "-input").val('');
                                });
                                   
                            } else {

                                self.createBlock('', ui.item.id, ui.item.label, ui.item);
                                $("#" + thisID + "-input").val('');
                            }

			    		
						}
						
						
			     	return false;
    
                },
    			
			}).autocomplete('instance')._renderItem = function( ul, item ) {

                // console.log(item);
                //return $( "<li>" ).append( renderItem(item) ).appendTo( ul );
                if(item.formattedlabel) {
                    return $( "<li>").append(item.formattedlabel).appendTo(ul);
                } else {
                    return $( "<li>").append('<div>' + item.label + '<div>').appendTo(ul);
                }
                
        
            };;
			
			$("#" + thisID + "-input").keypress(function(){
				$("#" + thisID + "-input").removeData();
			});
			
			
			// Add button and events
			$("#" + thisID + "-addlink").button({
				
			}).click(function (event) {
				 
				var sel = $("#" + thisID + "-input").data();
				
				if (sel['display']) {
					
					if (  $("#" + thisID + " #" + sel['idModel']).length > 0 ) {
						// check for duplicates (across all source fields)
						alert ("That item has already been added.")
					} else {
						// add block to current source field
						self.createBlock('', sel['idModel'], sel['display']);
						$("#" + thisID + "-input").removeData();
						$("#" + thisID + "-input")[0].value = "";
					
					}
					
				} else {
					alert ('Nothing Selected');
				}
				
				return false;
			});
			
            // create items for incoming data 
        	for(item in opts.data) {
	
				self.createBlock('', item, opts.data[item].label, opts.data[item]);
			
			}
            
            if (opts.allowItemDrag) {
	
				$("#" + thisID + " .pivotlist-list").sortable({
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
		
		createBlock: function (idLink, idModel, display, item) {

			// console.log(idModel);
			// console.log(item);
            
            var thisID = (this.element)[0].id;
            var thisName = (this.element).attr('name');

            // console.log(thisName);

			var fldName = thisID; //.split('-')[1];
			var widget = this.widget;
			
			idx = $("#" + thisID + " .pivotlist-list LI.link").length; // + 1;
			
			liStr = '<div class="pivotlist-item-label flex-fill">' + display + '</div>';
		    liStr += '<INPUT type="hidden" class="id" name="' + thisName + '[' + item.id + ']" value="' + item.id + '">';
            
            // write in any set values for the pivot table
            for(key in this.options.addToAll) {
                liStr += '<INPUT type="hidden" class="ata-' + key + '" name="' + thisName + '[' + item.id + '][' + key + ']" value="' + this.options.addToAll[key] + '">';
            }
            
            // if a pivot table sort field is set, create the field
            if (this.options.sortField) {
                liStr += '<INPUT type="hidden" class="sortField" name="' + thisName + '[' + item.id + '][' + this.options.sortField + ']" value="' + idx + '">';
			}
			
		//	liStr += '<INPUT type="hidden" class="BREAKME" name="' + fldName + '[' + idModel + '][breakme]" value="' + idx + '">';
            
            
            // pivotField is a user-editable field on the pivot table.
            // if set, this displays a text field on the pivot row which can be given a value. Also reads the incoming value from the data.
            if(this.options.pivotField) {
				var pivotval = item[this.options.pivotField] != null? item[this.options.pivotField] : '';
			   
				liStr += '<div class="pivotlist-pivotfieldwrap form-inline">';
               if (this.options.pivotFieldLabel) {
                   liStr += '<label class="mr-2">' + this.options.pivotFieldLabel + '</label>';
               }
               liStr += '<INPUT type="text" class="pivotField form-control w-25" placeholder="' + this.options.pivotFieldPlaceholder + '" name="' + thisName + '[' + item.id + '][' + this.options.pivotField + ']" value="' + pivotval + '">';
               liStr += '</div>';
            }


            // the delete link for the item
        	liStr += '<A href="#" class="deleteLink text-danger" tabindex="-1"><i class="bi-x-square-fill text-danger fs-1"/></A>';
			
			safeid = item.id; //.replace('~', '_');
            
            // add the created LI to the List
			$("#" + thisID + " .pivotlist-list").append('<LI class="link list-group-item border mb-2 d-flex justify-content-between align-items-center" id="' + safeid + '">' + liStr + '</LI>');
			// if not already hidden, hide the placeholder 'No Items' element
			$("#" + thisID + " .pivotlist-list LI.emptyDisp").hide();
			
			
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

$.widget('ascent.pivotlist', PivotList);
$.extend($.ascent.PivotList, {
		 
		
}); 