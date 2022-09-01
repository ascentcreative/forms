// ******
// Wrapper Widget which utilises the Croppie image cropper library from https://github.com/Foliotek/Croppie
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021


$.ascent = $.ascent?$.ascent:{};

var CroppieUpload = {

    vpw: 0,
    vph: 0,
        
    // Default options.
    options: {
        targetWidth: 0,
        targetHeight: 0,
        previewScale: 0.7,
        constrained: true,
        quality: 0.1,
        popover: true,
        endpoint: '/cms/croppieupload',
        filedestination: '/upload/default'
    },

    _init: function () {
        
        var self = this;
        this.widget = this;
        
        var thisID = (this.element)[0].id;
        
        var obj = this.element;

        // incoming options
        this.vpw = self.options.targetWidth * self.options.previewScale;
		this.vph = self.options.targetHeight * self.options.previewScale;

        /**
         * Configure the UI
         */
        var dimensions = '';
        if(self.options.targetWidth != 0 || self.options.targetHeight != 0) {
            var dimensions = "(" + self.options.targetWidth + "px x " + self.options.targetHeight + "px)";
        } else {
            this.vpw = 300;
            this.vph = 300;
        }

      
        
        obj.wrap('<DIV class="croppieupload empty"></DIV>');
		this.root = $(obj).parent('.croppieupload');
        this.root.append('<DIV class="cu_trigger"><DIV class="cu_message"><div>Click to upload an image</div><div>' + dimensions + '</div></DIV></DIV><INPUT type="file" id="cu_file"/>');
        this.root.append('<DIV class="cu_actions"><A href="" class="button cu_remove nochevron btn-primary btn-sm">Remove</A><A href="" class="button cu_change nochevron btn-primary btn-sm">Change</A></DIV>');
			
        if(!self.options.constrained) {
            this.root.addClass('unconstrained');
        }

        // "remove" link action:
        this.root.find('.cu_remove').click(function() {
            if (confirm('Remove Image?')) {
                self.clearValue();
            }
            return false;
        });	

        // "change" link action:
        this.root.find('.cu_change').click(function() {
            $(this).parents(".croppieupload").find('INPUT#cu_file').trigger("click");
            return false;
        });	

        if(obj.val()) {
            this.setValue(obj.val(), this.vpw, this.vph);
        }

        $(this.root).find('.cu_trigger').click(function() {
            $(this).parents(".croppieupload").find('INPUT#cu_file').trigger("click");
        });

        // when a file is selected, read the contents:
        this.root.find('#cu_file').change(function() { 
			self.readFile(this);
        });

        // instead of pixel sizes, let's use aspect ratio...
       //this.root.css('width', (this.vpw==0?400:this.vpw) + 'px').css('height', (this.vph==0?200:this.vph) + 'px');

       if(self.options.constrained) {
            this.root.css('max-width', (this.vpw==0?400:this.vpw) + 'px');
            // this.root.css('aspect-ratio', (this.vpw==0?400:this.vpw) + ' / ' + (this.vph==0?200:this.vph));
            this.root.css('width', (this.vpw==0?400:this.vpw)+'px').css('height', (this.vph==0?200:this.vph) + 'px');
       }   

        var opts = self.options;

    },

    setValue: function(url, vpw, vph) {

        //console.log('croppie - set value: ' + vpw + ', ' + vph);
		
        self = this;

        //console.log('setting to: ' + url);
			
        this.element.val(url);

        //console.log(this.element.val());

        // don't need to set size here - it'll be set on init instead
        //this.root.css('width', (vpw==0?400:vpw) + 'px').css('height', (vph==0?200:vph) + 'px').css('background-size', '100%');
        // this.root.css('background-image', "url('" + url + "')");
        this.root.css('background-size', 'contain');
        this.root.css('background-position', 'center');
        this.root.removeClass('empty').addClass('has-image');

        $(this.root).find('img').remove();
        this.root.prepend('<img src="' + url + '"/>');
        
    },

    clearValue: function() {
			
        this.root.css('background-image', 'none');
        this.root.addClass('empty').removeClass('has-image');
        $(this.root).find('img').remove();
        this.element.val('');
        
    },		

    readFile: function (input) {

        // alert('reading file');
			
        var self = this;
        
        if (input.files && input.files[0]) {
             
            console.log('reading input...');
             
            var reader = new FileReader();
            
            reader.onload = function (e) {
                
                img = new Image;
                img.onload = function() {
                    self.startCroppie(e.target.result, img.width, img.height, input.files[0].type);
                };
                img.src = e.target.result;
                                
            }
            
            reader.readAsDataURL(input.files[0]);

        } else {
            
            alert("Sorry - your browser doesn't support the FileReader API");
            
        }

    },


    newStartCroppie: function(url, filewidth, fileheight, filetype) {

        $('#modal-' + $(this.element).attr('id')).on('click', '.btn-ok', function(e) {
            alert('ok');
            $(this).parent('.modal').modal('hide');
            e.preventDefault();
        }).on('hidden.bs.modal', function() {
            alert('hidden');
        }).modal();
 
    },

    startCroppie: function(url, filewidth, fileheight, filetype) {

        console.log('startCroppie: ' + filewidth + ', ' + fileheight);
			
        var self = this;
        
        // needs to be converted to a bootstrap modal ideally, but maybe just use the CSS from the old version for now...
        $('BODY').append('<DIV class="cu_curtain"></DIV>');
        
        $('.cu_curtain').append('<DIV class="cu_wrap"><DIV class="croppie"></DIV><DIV class="cudlg_actions"><A href="" class="btn btn-secondary button cu_cancel nochevron">Cancel</A><A href="" class="button btn btn-primary cu_result nochevron">OK</A></DIV>');
        
        console.log(self.options);

        console.log('startCroppie: ' + self.options.targetWidth + ', ' + self.options.targetHeight + ', ' + self.options.previewScale);
        
        this.vpw = self.options.targetWidth * self.options.previewScale;

        console.log('vpw: ' + this.vpw + ', vph: ' + this.vph);

        if (this.vpw == 0) {
            this.vpw = this.vph * (filewidth / fileheight);
        }
        
        this.vph = self.options.targetHeight * self.options.previewScale;
        console.log('vph: ' + this.vph);
        if (this.vph == 0) {
            this.vph = this.vpw * (fileheight / filewidth);
        }
        
        console.log('startCroppie: ' + this.vpw + ', ' + this.vph);

        $('.cu_wrap .croppie').croppie({
            
            viewport: {
                width: this.vpw,
                height: this.vph
            },
            boundary: {
                width: this.vpw + 0,
                height: this.vph + 0
            },
            enableExif: true,
            enableResize: (self.options.constrained ? false : true)
            
        });
        
        $('.cu_wrap .croppie').croppie('bind', {
            url: url
        }).then(function(){
            console.log('jQuery bind complete');
        });
        
        $('.cu_cancel').click(function() {
            $('.cu_curtain').remove();
            return false;
        });

        
        $('.cu_result').click(function() {

            switch(filetype) {
                case 'image/jpeg':
                case 'image/jpg':
                    var format = 'jpeg';
                    var ext = 'jpg';
                    break;

                case 'image/png':
                    var format = 'png';
                    var ext = 'png';
                    break;
            }
            
            $('.cu_wrap .croppie').croppie('result', {
                
                type: 'blob',
                size: {width: self.options.targetWidth, height: self.options.targetHeight},
                format: format,
                quality: self.options.quality
                
            }).then(function (resp) {
                
                var fd = new FormData();
                fd.append('destination', self.options.filedestination);
                fd.append('randomisefilename', 1);
                fd.append('payload', resp, 'myfile.' + ext);

                console.log(fd);

                $.ajax({
                    type: 'POST',
                    url: self.options.endpoint,
                    data: fd,
                    processData: false,
                    contentType: false
                }).done(function(data) {
                    
                    self.setValue(data['path'], this.vpw, this.vph);
                    $('.cu_curtain').remove();
                    
                }).fail(function(data) {

                    alert('Image Upload Failed: (' + data.status + ') ' + data.responseJSON.message);

                });
                        
            });
            
            return false;
            
        });
        
    }
    


}

$.widget('ascent.croppieupload', CroppieUpload);
$.extend($.ascent.CroppieUpload, {
		 
		
}); 