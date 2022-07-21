// ******
// Custom form component to enter & edit bible refs
// Expects incoming data from Laravel Eloquent
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021


$.ascent = $.ascent?$.ascent:{};

var AjaxUpload = {
        
    options: {
        disk: 'public',
        path: 'ajaxuploads',
        preserveFilename: false,
        placeholder: 'Choose file'
    },
    
    _init: function () {
        
        var self = this;
        this.widget = this;
        
        idAry = (this.element)[0].id.split('-');
        
        var thisID = (this.element)[0].id;
        
        var fldName = idAry[1];
        
        var obj = this.element;
        
    
        upl = $(this.element).find('input[type="file"]');

        if($(this.element).find('.ajaxupload-value').val() != '') {
            $(this.element).addClass('has-file');
        }

        $(this.element).find('.ajaxupload-reset').on('click', function() {
            self.reset();
        });

        upl.on('change', function() {
           
            var formData = new FormData(); 
            formData.append('payload', this.files[0]); 
            formData.append('disk', self.options.disk);
            formData.append('path', self.options.path);
            formData.append('preserveFilename', self.options.preserveFilename?1:0);

            $.ajax({
                xhr: function()
                {
                    
                  var xhr = new window.XMLHttpRequest();
                  
                  //self.setUploadState();
                  //Upload progress
                  xhr.upload.addEventListener("progress", function(evt){
                
                    if (evt.lengthComputable) {
                      var percentComplete = (evt.loaded / evt.total) * 100;
                      //Do something with upload progress
                      //prog.find('PROGRESS').attr('value', percentComplete);
                      self.updateUI('Uploading...', percentComplete);
                      console.log(percentComplete);

                    }
                  }, false);
                  return xhr;
                },cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                url: "/cms/ajaxupload",
                data: formData
              }).done(function(data, xhr, requesr){

                    
                    //Do something success-ish
                      //$(obj).parents('FORM').unbind('submit', blocksubmit);
                      //console.log(data);
                     // $('INPUT[type=submit]').prop('disabled', false).val($('INPUT[type="submit"]').data('oldval')).css('opacity', 1);
                     // prog.remove();
                     // upl.remove();

                   // self.updateUI(data.original_name + ' : Upload Complete', 0, 'value');
                    //$(self.element).find('.ajaxupload-value').val(data.id);
                    self.setValue(data.id, data.original_name);

                    console.log(data);

                    $(self.element).trigger('change');

                    //   var result = $.parseJSON(data);
                    //   //console.log(result);
                    //   if(result['result'] == 'OK') {
                    //       obj.find('#' + self.fldName + '-filename').val(result['file']);
                    //       self.setCompleteState();
                    //   } else {
                          
                    //   }

                  
              }).fail(function (data) {

                switch(data.status) {
                    case 403:
                        alert('You do not have permission to upload files');

                     //   self.updateUI('You do not have permission to upload files', 0, 'error');

                        break;

                    case 413:
                        alert('The file is too large for the server to accept');
                        //self.updateUI('The file is too large for the server to accept', 0, 'error');
                        break;

                    default:
                        alert('An unexpected error occurred');
                        //self.updateUI('An unexpected error occurred', 0, 'error');
                        break;
                }

              });
          

        });
        
        

    },

    setValue: function(value, text) {
        $(this.element).find('.ajaxupload-value').val(value);
        $(this.element).addClass('has-file');
        this.updateUI(text, 0);
    },

    reset: function() {
        $(this.element).find('.ajaxupload-value').val('');
        $(this.element).removeClass('has-file');
        this.updateUI(this.options.placeholder, 0);
        $(this.element).trigger('change');
    },

    updateUI: function(text, pct=0) {

        var bar = $(this.element).find('.ajaxupload-progress');
        console.log(bar);
        console.log( (100 - pct) + '%');
        bar.css('right', (100 - pct) + '%');

        $(this.element).find('.ajaxupload-text').html(text);

    },

   

}

$.widget('ascent.ajaxupload', AjaxUpload);
$.extend($.ascent.AjaxUpload, {
		 
		
}); 