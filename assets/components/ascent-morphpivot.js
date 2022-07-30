// ******
// Custom form component to enter & edit MorphPivot records
// (based around a HasMany relation to the Pivot Table, which then has a morph connection to the foreign model)
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2022


$.ascent = $.ascent?$.ascent:{};

var MorphPivot = {
        
    rowCount: 0,

    _init: function () {
            
        var self = this;
        this.widget = this;

        this.element.addClass('initialised');
// 
        // alert('ok');
        // console.log($(this.element).data()); //'optionroute'));

        let data = $(this.element).data();
        let elm = $(this.element);
        let widget = this;

        // console.log(data.optionroute);

        $(this.element).find('.mp-search').autocomplete({
            source: data.optionroute,
            minLength: 2,
            select: function(ui, item) {
                $.ajax({
                    method: 'post',
                    url: '/forms/components/morphpivot/add',
                    data: {
                        bladepath: data.bladepath,
                        morph: data.morph,
                        field: data.fieldname,
                        idx: elm.find('.morphpivot-item').length,
                        item: item.item
                    }
                }).done(function(data) {
                    elm.find('.morphpivot-items').append(data);
                    elm.find('.mp-search').val("");
                });
            }
        });

        $(elm).on('click', '.mp-remove', function(e) {
            $(this).parents('.morphpivot-item').remove();
            widget.updateFieldIndexes();
        });
			
			
    },
		
    updateFieldIndexes: function() {

        var fldname = $(this.element).data('fieldname');

        console.log('UFI', fldname);

        // reapply field indexes to represent reordering
        $(this.element).find('.morphpivot-item').each(function(idx) {

            var prefix = fldname + "[" + idx + "]";

            $(this).find('INPUT').each(function(fldidx) {

                esc = fldname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                re = new RegExp(esc + "\\[\\d+\\]");
                
                this.name = this.name.replace(re, prefix);   
                
            });

        });

        $(this.element).trigger('change');

        
    }   

}

$.widget('ascent.morphpivot', MorphPivot);
$.extend($.ascent.MorphPivot, {
		 
		
}); 





// init on document ready
$(document).ready(function(){
    // alert('init blockselect');
    $('.morphpivot').not('.initialised').morphpivot();

});

// alert('ok');



// make livewire compatible (check for init after DOM update)
document.addEventListener("DOMContentLoaded", () => {
    try {
        Livewire.hook('message.processed', (message, component) => {
            $('.morphpivot').not('.initialised').morphpivot();
        })
    } catch (e) {
        
    }
});



MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    // ...
    $('.morphpivot').not('.initialised').morphpivot();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  childList: true
  //...
});


