// ******
// Widgeet which allows a button to redirect a form to a specified URI rather than the one originally specified

$.ascent = $.ascent?$.ascent:{};

var FormRedirect = {
        
    form: null,
    action: null,
    
    _init: function () {
        
        var self = this;
        this.widget = this;
        
        idAry = (this.element)[0].id.split('-');
        
        var thisID = (this.element)[0].id;
        
        var fldName = idAry[1];
        
        var obj = this.element;

        // alert('initing FormRedirect');

        this.action = $(obj).data('formredirect');

        if(selector = $(obj).data('formredirect-form')) {
            this.form = $(selector)[0];
        } else {
            this.form = $(obj).parents('form')[0];
        }
       
        $(obj).on('click', function(e) {
            e.preventDefault();

            $(self.form).attr('action', self.action);
            $(self.form).submit();

        });

        $(obj).addClass('form-redirect-initialised');

    },

}

$.widget('ascent.formredirect', FormRedirect);
$.extend($.ascent.FormRedirect, {
		 
		
}); 



// init on document ready
$(document).ready(function(){
    // alert('init blockselect');
    $('button[data-formredirect]').not('.form-redirect-initialised').formredirect();
});


MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    // ...
    $('button[data-formredirect]').not('.form-redirect-initialised').formredirect();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  childList: true
  //...
});


