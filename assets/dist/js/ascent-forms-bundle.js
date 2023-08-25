function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ******
// Custom form component to enter & edit bible refs
// Expects incoming data from Laravel Eloquent
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021
$.ascent = $.ascent ? $.ascent : {};
var AjaxUpload = {
  options: {
    disk: 'public',
    path: 'ajaxuploads',
    preserveFilename: false,
    placeholder: 'Choose file'
  },
  _init: function _init() {
    var self = this;
    this.widget = this;
    idAry = this.element[0].id.split('-');
    var thisID = this.element[0].id;
    var fldName = idAry[1];
    var obj = this.element; // console.log(obj);
    // alert($(obj).data('disk'));

    this.options.disk = $(obj).data('disk');
    this.options.path = $(obj).data('path');
    this.options.preserveFilename = $(obj).data('preservefilename'); // console.log($(obj).data());

    upl = $(this.element).find('input[type="file"]'); // alert('init uplaoder');

    if ($(this.element).find('.ajaxupload-value').val() != '') {
      $(this.element).addClass('has-file');
    }

    $(this.element).find('.ajaxupload-reset').on('click', function (e) {
      self.reset();
      e.stopPropagation();
    });
    $(upl).on('change', function () {
      var formData = new FormData();
      formData.append('payload', this.files[0]);
      formData.append('disk', self.options.disk);
      formData.append('path', self.options.path);
      formData.append('preserveFilename', self.options.preserveFilename ? 1 : 0);
      $.ajax({
        xhr: function xhr() {
          var xhr = new window.XMLHttpRequest(); //self.setUploadState();
          //Upload progress

          xhr.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
              var percentComplete = evt.loaded / evt.total * 100; //Do something with upload progress
              //prog.find('PROGRESS').attr('value', percentComplete);

              self.updateUI('Uploading...', percentComplete);
              console.log(percentComplete);
            }
          }, false);
          return xhr;
        },
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        url: "/cms/ajaxupload",
        data: formData,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      }).done(function (data, xhr, requesr) {
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
        $(self.element).trigger('change'); //   var result = $.parseJSON(data);
        //   //console.log(result);
        //   if(result['result'] == 'OK') {
        //       obj.find('#' + self.fldName + '-filename').val(result['file']);
        //       self.setCompleteState();
        //   } else {
        //   }
      }).fail(function (data) {
        switch (data.status) {
          case 403:
            alert('You do not have permission to upload files'); //   self.updateUI('You do not have permission to upload files', 0, 'error');

            break;

          case 413:
            alert('The file is too large for the server to accept'); //self.updateUI('The file is too large for the server to accept', 0, 'error');

            break;

          default:
            alert('An unexpected error occurred'); //self.updateUI('An unexpected error occurred', 0, 'error');

            break;
        }

        self.reset();
      });
    });
    $(obj).addClass('initialised');
  },
  setValue: function setValue(value, text) {
    $(this.element).find('.ajaxupload-value').val(value);
    $(this.element).addClass('has-file');
    this.updateUI(text, 0);
  },
  reset: function reset() {
    $(this.element).find('.ajaxupload-value').val('');
    $(this.element).removeClass('has-file');
    this.updateUI(this.options.placeholder, 0);
    console.log(this.element);
    $(this.element).trigger('change');
  },
  updateUI: function updateUI(text) {
    var pct = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var bar = $(this.element).find('.ajaxupload-progress');
    console.log(bar);
    console.log(100 - pct + '%');
    bar.css('right', 100 - pct + '%');
    $(this.element).find('.ajaxupload-text').html(text);
  }
};
$.widget('ascent.ajaxupload', AjaxUpload);
$.extend($.ascent.AjaxUpload, {}); // init on document ready

$(document).ready(function () {
  // alert('init blockselect');
  $('.ajaxupload').not('.initialised').ajaxupload();
});
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function (mutations, observer) {
  // fired when a mutation occurs
  // console.log(mutations, observer);
  // ...
  $('.ajaxupload').not('.initialised').ajaxupload();
}); // define what element should be observed by the observer
// and what types of mutations trigger the callback

observer.observe(document, {
  subtree: true,
  childList: true //...

}); // ******
// Custom form component to enter & edit bible refs
// Expects incoming data from Laravel Eloquent
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
var AjaxUploadMulti = {
  options: {
    disk: 'public',
    path: 'ajaxuploads',
    preserveFilename: 1,
    placeholder: 'Choose file',
    sortable: false
  },
  _init: function _init() {
    var self = this;
    this.widget = this;
    idAry = this.element[0].id.split('-');
    var thisID = this.element[0].id;
    var fldName = idAry[1];
    var obj = this.element;
    console.log(this.options.data);

    for (file in this.options.data) {
      //$(this.element).ajaxuploadmultifile(this.options.data[file]);
      this.createFileBlock(this.options.data[file]);
    }

    upl = $(this.element).find('input[type="file"]');

    if ($(this.element).find('.ajaxupload-value').val() != '') {
      $(this.element).addClass('has-file');
    }

    upl.on('change', function () {
      // for each file selected, create a new uploader bar and show progress as it uploads.
      for (var iFile = 0; iFile < this.files.length; iFile++) {
        var item = self.createFileBlock();
        $(item).ajaxuploadmultifile('upload', this.files[iFile]);
      } //         template = $('template#ajaxuploadmulti-item');
      //         item = $(self.element).append(template.html());
      //         
      //     }

    });

    if (this.options.sortable) {
      $(this.element).sortable({
        update: function update(event, ui) {
          self.updateFileIndexes();
          ui.item.find('input').change();
        }
      });
    }
  },
  createFileBlock: function createFileBlock(data) {
    template = $('template#ajaxuploadmulti-item');
    item = $(template.html());
    $(this.element).append(item);
    $(item).ajaxuploadmultifile({
      disk: this.options.disk,
      path: this.options.path,
      preserveFilename: this.options.preserveFilename
    });

    if (data) {
      console.log('setting data');
      console.log(data);
      $(item).ajaxuploadmultifile('setValue', data.id, data.original_name);
    }

    this.updateFileIndexes();
    return item;
  },
  updateFileIndexes: function updateFileIndexes() {
    fldname = this.element.attr('name');
    $(this.element).find('.ajaxuploadmulti-ui').each(function (index) {
      var prefix = fldname + "[" + index + "]";
      $(this).find("input").each(function () {
        esc = fldname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        re = new RegExp(esc + "\\[\\d+\\]");
        this.name = this.name.replace(re, prefix);
      });
    });
  }
};
$.widget('ascent.ajaxuploadmulti', AjaxUploadMulti);
$.extend($.ascent.AjaxUploadMulti, {});
var AjaxUploadMultiFile = {
  options: {
    disk: 'public',
    path: 'ajaxuploads',
    preserveFilename: false
  },
  _init: function _init() {
    console.log("INIT FILE");
    console.log('this', this.element);
    var self = this;
    $(this.element).find('.ajaxupload-reset').on('click', function () {
      $(self.element).remove();
    });
  },
  setValue: function setValue(value, text) {
    console.log(value, text);
    $(this.element).find('.ajaxuploadmulti-id').val(value);
    $(this.element).find('.ajaxuploadmulti-label').val(text);
    $(this.element).addClass('has-file');
    this.updateUI(text, 0); // fire a change event

    $(this.element).find('.ajaxuploadmulti-label').change();
  },
  updateUI: function updateUI(text) {
    var pct = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var bar = $(this.element).find('.ajaxupload-progress');
    console.log(bar);
    console.log(100 - pct + '%');
    bar.css('right', 100 - pct + '%');
    $(this.element).find('.ajaxupload-text').html(text);
  },
  upload: function upload(file) {
    var self = this;
    var formData = new FormData();
    formData.append('payload', file);
    formData.append('disk', self.options.disk);
    formData.append('path', self.options.path);
    formData.append('preserveFilename', self.options.preserveFilename);
    $.ajax({
      xhr: function xhr() {
        var xhr = new window.XMLHttpRequest(); //self.setUploadState();
        //Upload progress

        xhr.upload.addEventListener("progress", function (evt) {
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total * 100; //Do something with upload progress
            //prog.find('PROGRESS').attr('value', percentComplete);

            self.updateUI('Uploading...', percentComplete);
            console.log(percentComplete);
          }
        }, false);
        return xhr;
      },
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      url: "/cms/ajaxupload",
      data: formData,
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    }).done(function (data, xhr, request) {
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
      $(self.element).trigger('change'); //   var result = $.parseJSON(data);
      //   //console.log(result);
      //   if(result['result'] == 'OK') {
      //       obj.find('#' + self.fldName + '-filename').val(result['file']);
      //       self.setCompleteState();
      //   } else {
      //   }
    }).fail(function (data) {
      switch (data.status) {
        case 403:
          alert('You do not have permission to upload files'); //   self.updateUI('You do not have permission to upload files', 0, 'error');

          break;

        case 413:
          alert('The file is too large for the server to accept'); //self.updateUI('The file is too large for the server to accept', 0, 'error');

          break;

        default:
          alert('An unexpected error occurred'); //self.updateUI('An unexpected error occurred', 0, 'error');

          break;
      }
    });
  }
};
$.widget('ascent.ajaxuploadmultifile', AjaxUploadMultiFile);
$.extend($.ascent.AjaxUploadMultiFile, {}); // ******
// Custom form component to enter & edit bible refs
// Expects incoming data from Laravel Eloquent
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
var BibleRefList = {
  rowCount: 0,
  _init: function _init() {
    var self = this;
    this.widget = this;
    idAry = this.element[0].id.split('-');
    var thisID = this.element[0].id;
    var fldName = idAry[1];
    var obj = this.element; // build the basic UI
    // wrap the main element in a new DIV, transfer the ID and remove initial element.

    var outer = $('<div class="biblereflist p-3 bg-light border" style="xbackground: #eee"></div>');
    obj.wrap(outer);
    outer = obj.closest('.biblereflist');
    outer.attr('id', obj.attr('id'));
    this.element = outer;
    obj.remove(); // read in options and process

    var opts = self.options;

    if (opts.width) {
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
    } // create the UL and autocomplete fields


    $(outer).append('<UL class="biblereflist-list list-group pb-2"></UL>');
    $(outer).find(".biblereflist-list").append('<LI class="emptyDisp list-group-item border-0 bg-transparent">No items selected</LI>');
    $(outer).append('<DIV class="inputbar d-flex align-items-center"><INPUT type="text" id="' + thisID + '-input" class="flex-fill mr-2 form-control" spellcheck="false" placeholder="' + opts.placeholder + '"/><A href="#" id="' + thisID + '-addlink" class="btn-sm btn-primary">Add</A></DIV>');
    $('#' + thisID + '-input').keyup(function (e) {
      if (e.keyCode == 13) {
        self.submitBlock(this);
      }
    });
    console.log(opts.data); // create items for incoming data 

    for (item in opts.data) {
      self.createBlock('', item, opts.data[item].label, opts.data[item]);
    } // Add button and events


    $("#" + thisID + "-addlink").button({}).click(function (event) {
      self.submitBlock($("#" + thisID + "-input"));
      return false;
    });

    if (opts.allowItemDrag) {
      $("#" + thisID + " .biblereflist-list").sortable({
        axis: "y",
        connectWith: '#' + thisID + ' ul',
        containment: '#' + thisID,
        update: function update(event, ui) {
          opts.widget.updateData();
        },
        stop: function stop(event, ui) {}
      });
    }

    opts.widget = this;
  },
  submitBlock: function submitBlock(fld) {
    var self = this; // enter pressed:
    // submit reference for parsing

    $.get('/cms/bibleref/parse/' + $(fld).val(), function (data) {
      console.log(data); //var result = $.parseJSON(data);

      if (data['result'] == 'error') {
        alert(data['message']);
      } else if (data['result'] == 'ok') {
        self.createBlock('', '', '', data['data']);
        $(fld).val('');
      }
    });
  },
  createBlock: function createBlock(idLink, idModel, display, item) {
    console.log(idModel);
    console.log(item);
    var thisID = this.element[0].id;
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
    liStr += '<INPUT type="hidden" class="id" name="' + fldName + '[' + idx + '][endVerse]" value="' + item.endVerse + '">'; // create fields for the various elements of the bible ref:
    //	liStr += '<INPUT type="hidden" class="BREAKME" name="' + fldName + '[' + idModel + '][breakme]" value="' + idx + '">';
    // the delete link for the item

    liStr += '<A href="#" class="deleteLink text-danger" tabindex="-1"><i class="bi-x-square-fill text-danger fs-1"/></A>';
    safeid = item.id; //.replace('~', '_');
    // add the created LI to the List

    $("#" + thisID + " .biblereflist-list").append('<LI class="link list-group-item border mb-2 d-flex justify-content-between align-items-center" id="' + safeid + '">' + liStr + '</LI>'); // if not already hidden, hide the placeholder 'No Items' element

    $("#" + thisID + " .biblereflist-list LI.emptyDisp").hide(); // Code the operation of the delete link:

    $("#" + thisID + " LI#" + safeid + " A.deleteLink").click(function (event) {
      pSrc = $(this).parents(".linklist");
      $(this).parents("LI.link").remove();

      if (pSrc.find("LI.link").length > 0) {
        pSrc.find("LI.emptyDisp").hide();
      } else {
        pSrc.find("LI.emptyDisp").show();
      }

      widget.updateData(); // call method to update the data in the widget (i.e. update sort indeces etc)

      return false;
    });
  },
  updateData: function updateData() {
    thisID = this.widget.element[0].id; // show or hide the 'No Items' block as needed by the amount of data in the widget

    if ($(this.widget.element).find("LI.link").length > 0) {
      $(this.widget.element).find("LI.emptyDisp").hide();
    } else {
      $(this.widget.element).find("LI.emptyDisp").show();
    } // update the sortFields (if specified) so the posted data records the order of the items


    if (this.options.sortField) {
      $(this.widget.element).find('LI.link').each(function (i) {
        $(this).find('.sortField').val(i);
      });
    }
  }
};
$.widget('ascent.biblereflist', BibleRefList);
$.extend($.ascent.BibleRefList, {}); // ******
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
var BlockSelect = {
  _init: function _init() {
    var self = this;
    self.trackOrder = [];
    this.element.addClass('initialised'); // console.log('init BlockSelect');

    $(this.element).off('change', self.processChange);
    $(this.element).on('change', '.cms-blockselect-option INPUT', {
      widget: self
    }, self.processChange);
    $(this.element).find('INPUT:checked').each(function () {
      $(this).parents('.cms-blockselect-option').addClass('selected');
      self.trackOrder.push($(this).attr('id'));
    });
  },
  setOptions: function setOptions($opts) {// replace the existing options with the provided array
  },
  processChange: function processChange(evt) {
    var self = evt.data.widget;

    if ($(this).is(':checked')) {
      $(this).parents('.cms-blockselect-option').addClass('selected');
      self.trackOrder.push($(this).attr('id'));

      if (self.element.data('max-select') != -1 && self.trackOrder.length > self.element.data('max-select')) {
        elm = self.trackOrder.shift();
        $('.cms-blockselect-option INPUT#' + elm).prop('checked', false).parents('.cms-blockselect-option').removeClass('selected');
      }
    } else {
      $(this).parents('.cms-blockselect-option').removeClass('selected');
      self.trackOrder.splice(self.trackOrder.indexOf($(this).attr('id')), 1);
    }
  }
};
$.widget('ascent.blockselect', BlockSelect);
$.extend($.ascent.BlockSelect, {}); // init on document ready

$(document).ready(function () {
  // alert('init blockselect');
  $('.cms-blockselect').not('.initialised').blockselect();
}); // alert('ok');
// make livewire compatible (check for init after DOM update)

document.addEventListener("DOMContentLoaded", function () {
  try {
    Livewire.hook('message.processed', function (message, component) {
      $('.cms-blockselect').not('.initialised').blockselect();
    });
  } catch (e) {}
});
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function (mutations, observer) {
  // fired when a mutation occurs
  // console.log(mutations, observer);
  // ...
  $('.cms-blockselect').not('.initialised').blockselect();
}); // define what element should be observed by the observer
// and what types of mutations trigger the callback

observer.observe(document, {
  subtree: true,
  childList: true //...

}); // ******
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
var ColourField = {
  options: {
    palette: null
  },
  _init: function _init() {
    var self = this;
    this.element.addClass('initialised');
    console.log('colour init');
    this.options.palette = $(this.element).data('palette').split(',');
    $(this.element).spectrum({
      showPalette: true,
      showPaletteOnly: false,
      palette: self.options.palette,
      hideAfterPaletteSelect: true,
      togglePaletteOnly: false
    });
  },
  destroy: function destroy() {
    // alert('destroyiig');
    $(this.element).removeClass('initialised').spectrum('destroy'); // this.element.
  }
};
$.widget('ascent.colourfield', ColourField);
$.extend($.ascent.ColourField, {});
$(document).ready(function () {
  $('.colour').not('.manual-init').not('.initialised').colourfield();
});
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function (mutations, observer) {
  // fired when a mutation occurs
  // console.log(mutations, observer);
  // ...
  $('.colour').not('.manual-init').not('.initialised').colourfield();
}); // define what element should be observed by the observer
// and what types of mutations trigger the callback

observer.observe(document, {
  subtree: true,
  childList: true //...

}); // ******
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
var CompoundDate = {
  _init: function _init() {
    var self = this; // console.log(this.element.data());
    // console.log('CD INIT');

    this.element.addClass('initialised'); // 

    console.log(this.element);
    $(this.element).on('change', 'input', function (e) {
      // console.log('cd change');
      $out = $(self.element).find('INPUT.cd-year').val() + "-" + $(self.element).find('INPUT.cd-month').val() + "-" + $(self.element).find('INPUT.cd-day').val();

      if ($out != '--') {
        $(self.element).find('.compound-date-output').val($out);
      } else {
        $(self.element).find('.compound-date-output').val(null);
      } // $('input[name="{{ $name }}"]').val($out);

    }); // $(this.element).on('keyup', '.cd-day, .cd-month', function(event) {
    //     if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)){
    //         let len = 2;
    //         if($(this).val().length == len) {
    //             let next = $(this).nextAll('input')[0];
    //             if(next) {
    //                 next.focus();
    //             }
    //         }
    //     }
    // });
    //this.element.val('');
    // this.addToken('test new');
    // this.addToken('Tag 2', 2);
  }
};
$.widget('ascent.compounddate', CompoundDate);
$.extend($.ascent.CompoundDate, {});
$(document).ready(function () {//    $('.compound-date').not('.initialised').compounddate();
});
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function (mutations, observer) {
  // fired when a mutation occurs
  // console.log(mutations, observer);
  // ...
  $('.compound-date').not('.initialised').compounddate();
}); // define what element should be observed by the observer
// and what types of mutations trigger the callback

observer.observe(document, {
  subtree: true,
  childList: true //...

}); // ******
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
var CompoundFormElement = {
  _init: function _init() {
    var self = this;
    this.element.addClass('initialised');
    $(this.element).on('click', function (e) {
      $(self.element).addClass("active");
      $(this).find('input').focus();
    });
    $(this.element).on('focus', 'input, select', function (e) {
      $(self.element).addClass("active");
    });
    $(this.element).on('blur', 'input, select', function (e) {
      $(self.element).removeClass("active");
    });
    $(this.element).on('input', 'input, select', function () {
      if ($(this).val() == '') {
        $(self.element).removeClass("has-value");
      } else {
        $(self.element).addClass("has-value");
      }
    });
    window.setInterval(function () {
      if ($(this.element).find('input, select').val() == '') {
        $(self.element).removeClass("has-value");
      } else {
        $(self.element).addClass("has-value");
      }
    }, 100);
  }
};
$.widget('ascent.compoundformelement', CompoundFormElement);
$.extend($.ascent.CompoundFormElement, {});
$(document).ready(function () {
  $('.compound-form-element').not('.initialised').compoundformelement();
});
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function (mutations, observer) {
  // fired when a mutation occurs
  // console.log(mutations, observer);
  // ...
  $('.compound-form-element').not('.initialised').compoundformelement();
}); // define what element should be observed by the observer
// and what types of mutations trigger the callback

observer.observe(document, {
  subtree: true,
  childList: true //...

}); // ******
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2022

$.ascent = $.ascent ? $.ascent : {};
var ForeignKeySelectAutoComplete = {
  // Default options.
  options: {
    source: ''
  },
  _init: function _init() {
    var self = this;
    console.log(this.options.source); // console.log(Buffer.from($(this.element).data('source'), 'base64').toString('ascii'));

    console.log();
    this.options.source = $.parseJSON(atob($(this.element).data('source')));

    $(this.element).find('.fksac-input').autocomplete({
      source: this.options.source,
      // source: this.options.source,
      select: function select(ui, item) {
        self.setValue(item.item);
      }
    }).autocomplete('instance')._renderItem = function (ul, item) {
      if (item.formattedlabel) {
        return $("<li>").append(item.formattedlabel).appendTo(ul);
      } else {
        return $("<li>").append('<div>' + item.label + '<div>').appendTo(ul);
      }
    };

    $(this.element).on('click', '.fksac-clear', function () {
      self.setValue(null);
      return false;
    });
    this.element.addClass('initialised');
  },
  setValue: function setValue(item) {
    if (item) {
      $(this.element).find('.fksac-value').val(item.id);
      $(this.element).find('.fksac-label').html(item.label);
      $(this.element).addClass("has-value");
    } else {
      $(this.element).find('.fksac-value').val('');
      $(this.element).find('.fksac-input').val('');
      $(this.element).find('.fksac-label').html('');
      $(this.element).removeClass("has-value");
    }
  }
};
$.widget('ascent.foreignkeyselectautocomplete', ForeignKeySelectAutoComplete);
$.extend($.ascent.ForeignKeySelectAutoComplete, {}); // init on document ready

$(document).ready(function () {
  // alert('init blockselect');
  $('.foreign-key-select-autocomplete').not('.initialised').foreignkeyselectautocomplete({// source: {!! $vals !!}
  });
});
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function (mutations, observer) {
  // fired when a mutation occurs
  // console.log(mutations, observer);
  // ...
  $('.foreign-key-select-autocomplete').not('.initialised').foreignkeyselectautocomplete({// source: {!! $vals !!}
  });
}); // define what element should be observed by the observer
// and what types of mutations trigger the callback

observer.observe(document, {
  subtree: true,
  childList: true //...

}); // ******
// Form component to work with Eloquent HasMany relationships. 
// Expects routes (in Web.php) to handle creation modal and items. 
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
var HasMany = {
  rowCount: 0,
  _init: function _init() {
    var self = this;
    this.widget = this;
    idAry = this.element[0].id.split('-');
    var thisID = this.element[0].id;
    var fldName = idAry[1];
    var obj = this.element;
    /**
     * Add New button click:
     */

    $(this.element).on('click', '.hasmany-add', function () {
      // .hasmany-add is coded in the blade as a simple modal-link which already knows its URL. 
      // We just need to capture the event of data being returned and handle that data
      $(document).on('modal-link-response', {
        hasmany: self
      }, self.appendItem);
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

    $(this.element).on('click', '.hasmany-edititem', function () {
      // to work with the modal-link setup, we should serialise the item's data
      data = $(this).parents('.hasmany-item').find('INPUT, TEXTAREA').serialize(); // pull in the base URL from the .hasmany-add button

      url = $(this).parents('.hasmany').find('.hasmany-add').attr('href'); // and append the serialised data to it.

      $(this).attr('href', url + "?" + data); // ensure it's a modal link so that the edit screen pops up in a dialog.
      // the modalLink widget will handle the actual flow and creation of the modals

      $(this).addClass('modal-link'); // when we get a positive response from the modalLink, add in returned data

      $(document).on('modal-link-response', {
        hasmany: self
      }, self.replaceItem);
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

    $(this.element).on('click', '.hasmany-item-action', function (e) {
      // to work with the modal-link setup, we should serialise the item's data
      data = $(this).parents('.hasmany-item').find('INPUT, TEXTAREA').serialize();
      data += '&blade=' + $(this).attr('data-blade'); // console.log(data);
      // e.preventDefault();
      // return false;
      // pull in the base URL from the .hasmany-add button

      url = $(this).parents('.hasmany').find('.hasmany-add').attr('href'); // and append the serialised data to it.

      $(this).attr('href', url + "?" + data); // alert('ok : ' + $(this).attr('href'));
      // ensure it's a modal link so that the edit screen pops up in a dialog.
      // the modalLink widget will handle the actual flow and creation of the modals

      $(this).addClass('modal-link'); // when we get a positive response from the modalLink, add in returned data

      $(document).on('modal-link-response', {
        hasmany: self
      }, self.replaceItem);
    });
    /**
    * Removes an item block from the component
    */

    $(this.element).on('click', '.hasmany-removeitem', function (e) {
      e.preventDefault();

      if (confirm("Remove this item?")) {
        $(this).parents('.hasmany-item').remove();
        self.updateIndexes();
      }
    });
    this.updateIndexes();
  },

  /**
   * Create a new item in the field's item list (from the HTML returned in the event)
   * @param {*} e - The event
   */
  appendItem: function appendItem(e) {
    $(e.data.hasmany.element).find('.hasmany-items').append(e.response);
    e.data.hasmany.updateIndexes();
  },

  /**
   * Replace an item in the field's item list with the HTML returned in the event. 
   * The index of the item to replace should be in the HTML.
   * @param {*} e - The event
   */
  replaceItem: function replaceItem(e) {
    elm = $(e.response);
    idx = elm.data('idx');
    $($(e.data.hasmany.element).find('.hasmany-item')[idx]).replaceWith(elm);
    e.data.hasmany.updateIndexes();
  },

  /**
   * Remove the event handlers - the modal has closed, so we mustn't listen for events any longer
   * Any events received may have come from other fields.
   */
  clearHandlers: function clearHandlers() {
    $(document).off('modal-link-response', self.appendItem);
    $(document).off('modal-link-response', self.replaceItem);
  },
  updateIndexes: function updateIndexes() {
    // console.log('update');
    //  alert('update');
    fldname = $(this.element).data('fieldname');
    $(this.element).find('.hasmany-item').each(function (idx) {
      var prefix = fldname + "[" + idx + "]"; // console.log(prefix);

      $(this).find('INPUT, TEXTAREA').each(function (fldidx) {
        esc = fldname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        re = new RegExp(esc + "\\[\\d+\\]");
        this.name = this.name.replace(re, prefix);
      });
    });
  }
};
$.widget('ascent.hasmany', HasMany);
$.extend($.ascent.HasMany, {}); // ******
// Password Field value toggler
// - TODO - Implement!
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
var InputPassword = {
  toggle: null,
  _init: function _init() {
    var self = this;
    this.widget = this;
    idAry = this.element[0].id.split('-');
    var thisID = this.element[0].id;
    var fldName = idAry[1];
    var obj = this.element;
    $(this.element).addClass('initialised'); // this.toggle = $('<div class="input-password-toggle"></div>');
    // console.log($(this.element).position());
    // this.toggle.css('top', $(this.element).position().top + 'px')
    //             .css('right', $(this.element).position().left + $(this.element).innerWidth() + 'px');
    // $('body').append(this.toggle);

    $(this.element).click(this.handleClick);
  },
  handleClick: function handleClick(e) {// detect if click is in the 'after' element
    // console.log($(this));
    // console.log($(this).find(':after'));
  }
};
$.widget('ascent.inputpassword', InputPassword);
$.extend($.ascent.InputPassword, {});
$(document).ready(function () {
  $('.input-password').not('.initialised').inputpassword();
});
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function (mutations, observer) {
  // fired when a mutation occurs
  // console.log(mutations, observer);
  // ...
  $('.input-password').not('.initialised').inputpassword();
}); // define what element should be observed by the observer
// and what types of mutations trigger the callback

observer.observe(document, {
  subtree: true,
  childList: true //...

}); // ******
// Custom form component to enter & edit MorphPivot records
// (based around a HasMany relation to the Pivot Table, which then has a morph connection to the foreign model)
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2022

$.ascent = $.ascent ? $.ascent : {};
var MorphPivot = {
  rowCount: 0,
  _init: function _init() {
    var self = this;
    this.widget = this;
    this.element.addClass('initialised'); // 
    // alert('ok');
    // console.log($(this.element).data()); //'optionroute'));

    var data = $(this.element).data();
    var elm = $(this.element);
    var widget = this; // console.log(data.optionroute);

    $(this.element).find('.mp-search').autocomplete({
      source: data.optionroute,
      minLength: 2,
      select: function select(ui, item) {
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
        }).done(function (data) {
          elm.find('.morphpivot-items').append(data);
          elm.find('.mp-search').val("");
        });
      }
    });
    $(elm).on('click', '.mp-remove', function (e) {
      $(this).parents('.morphpivot-item').remove();
      widget.updateFieldIndexes();
    });
  },
  updateFieldIndexes: function updateFieldIndexes() {
    var fldname = $(this.element).data('fieldname');
    console.log('UFI', fldname); // reapply field indexes to represent reordering

    $(this.element).find('.morphpivot-item').each(function (idx) {
      var prefix = fldname + "[" + idx + "]";
      $(this).find('INPUT').each(function (fldidx) {
        esc = fldname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        re = new RegExp(esc + "\\[\\d+\\]");
        this.name = this.name.replace(re, prefix);
      });
    });
    $(this.element).trigger('change');
  }
};
$.widget('ascent.morphpivot', MorphPivot);
$.extend($.ascent.MorphPivot, {}); // init on document ready

$(document).ready(function () {
  // alert('init blockselect');
  $('.morphpivot').not('.initialised').morphpivot();
}); // alert('ok');
// make livewire compatible (check for init after DOM update)

document.addEventListener("DOMContentLoaded", function () {
  try {
    Livewire.hook('message.processed', function (message, component) {
      $('.morphpivot').not('.initialised').morphpivot();
    });
  } catch (e) {}
});
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function (mutations, observer) {
  // fired when a mutation occurs
  // console.log(mutations, observer);
  // ...
  $('.morphpivot').not('.initialised').morphpivot();
}); // define what element should be observed by the observer
// and what types of mutations trigger the callback

observer.observe(document, {
  subtree: true,
  childList: true //...

}); // ******
// Custom form component to enter & edit pivot records
// Expects incoming Pivot Table data from Laravel Eloquent
// Allows for setting of fields on the Pivot Record:
// - AddToAll - A field name and fixed value. Used when a siingle pivot table differentiates between different types (i.e. a role type where a single pivot may record different roles)
// - PivotField - An editable field value to collect for each pivot row
// - SortField - Captures the sort order of the pivot rows
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2020

$.ascent = $.ascent ? $.ascent : {};
var PivotList = {
  rowCount: 0,
  _init: function _init() {
    var self = this;
    this.widget = this;
    idAry = this.element[0].id.split('-');
    var thisID = this.element[0].id;
    var fldName = idAry[1];
    var obj = this.element; // build the basic UI
    // wrap the main element in a new DIV, transfer the ID and remove initial element.

    var outer = $('<div class="pivotlist p-3 bg-light border" style="xbackground: #eee"></div>');
    obj.wrap(outer);
    outer = obj.closest('.pivotlist');
    outer.attr('id', obj.attr('id'));
    outer.attr('name', obj.attr('name'));
    this.element = outer;
    obj.remove(); // read in options and process

    var opts = self.options;

    if (opts.width) {
      if (typeof opts.width === 'string' && opts.width.slice(-1) == '%') {
        outer.css('width', opts.width);
      } else {
        outer.css('width', opts.width + 'px');
      }
    } else {
      outer.css('max-width', '600px');
    }

    if (!opts.placeholder) {
      opts.placeholder = '';
    } // create the UL and autocomplete fields


    $(outer).append('<UL class="pivotlist-list list-group pb-2"></UL>');
    $(outer).find(".pivotlist-list").append('<LI class="emptyDisp list-group-item border-0 bg-transparent">No items selected</LI>'); // ** temp removal of 'add' button as it does nothing! ** //
    // $(outer).append('<DIV class="inputbar d-flex align-items-center"><INPUT type="text" id="' + thisID + '-input" class="flex-fill mr-2 form-control" spellcheck="false" placeholder="' + opts.placeholder + '"/><A href="#" id="' + thisID + '-addlink" class="btn-sm btn-primary">Add</A></DIV>');

    $(outer).append('<DIV class="inputbar d-flex align-items-center"><INPUT type="text" id="' + thisID + '-input" class="flex-fill mr-2 form-control" spellcheck="false" placeholder="' + opts.placeholder + '"/></DIV>'); // url building:

    var urlsep = '?';

    if (opts.optionRoute.indexOf('?') != -1) {
      urlsep = '&';
    } // autocomplete and events


    $("#" + thisID + "-input").autocomplete({
      source: opts.optionRoute + urlsep + 'return_field=' + self.options.labelField,
      //opts.autocompleteURL,
      minLength: 2,
      select: function select(event, ui) {
        // console.log(self);
        lblfld = self.options.labelField; // console.log(ui);

        if ($("#" + thisID + " #" + ui.item.id).length > 0) {
          // check for duplicates (across all source fields)
          alert("That item has already been added.");
        } else {
          if (ui.item.id == 'create' && opts.storeRoute) {
            // fire off a request to create the new term.
            // alert(ui.item.term);
            $.ajax({
              type: 'POST',
              url: opts.storeRoute,
              data: _defineProperty({}, lblfld, ui.item.term),
              headers: {
                'Accept': "application/json"
              }
            }).done(function (data, xhr, request) {
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
      }
    }).autocomplete('instance')._renderItem = function (ul, item) {
      // console.log(item);
      //return $( "<li>" ).append( renderItem(item) ).appendTo( ul );
      if (item.formattedlabel) {
        return $("<li>").append(item.formattedlabel).appendTo(ul);
      } else {
        return $("<li>").append('<div>' + item.label + '<div>').appendTo(ul);
      }
    };

    ;
    $("#" + thisID + "-input").keypress(function () {
      $("#" + thisID + "-input").removeData();
    }); // Add button and events

    $("#" + thisID + "-addlink").button({}).click(function (event) {
      var sel = $("#" + thisID + "-input").data();

      if (sel['display']) {
        if ($("#" + thisID + " #" + sel['idModel']).length > 0) {
          // check for duplicates (across all source fields)
          alert("That item has already been added.");
        } else {
          // add block to current source field
          self.createBlock('', sel['idModel'], sel['display']);
          $("#" + thisID + "-input").removeData();
          $("#" + thisID + "-input")[0].value = "";
        }
      } else {
        alert('Nothing Selected');
      }

      return false;
    }); // create items for incoming data 

    for (item in opts.data) {
      self.createBlock('', item, opts.data[item].label, opts.data[item]);
    }

    if (opts.allowItemDrag) {
      $("#" + thisID + " .pivotlist-list").sortable({
        axis: "y",
        connectWith: '#' + thisID + ' ul',
        containment: '#' + thisID,
        update: function update(event, ui) {
          opts.widget.updateData();
        },
        stop: function stop(event, ui) {}
      });
    }

    opts.widget = this;
  },
  createBlock: function createBlock(idLink, idModel, display, item) {
    // console.log(idModel);
    // console.log(item);
    var thisID = this.element[0].id;
    var thisName = this.element.attr('name'); // console.log(thisName);

    var fldName = thisID; //.split('-')[1];

    var widget = this.widget;
    idx = $("#" + thisID + " .pivotlist-list LI.link").length; // + 1;

    liStr = '<div class="pivotlist-item-label flex-fill">' + display + '</div>';
    liStr += '<INPUT type="hidden" class="id" name="' + thisName + '[' + item.id + ']" value="' + item.id + '">'; // write in any set values for the pivot table

    for (key in this.options.addToAll) {
      liStr += '<INPUT type="hidden" class="ata-' + key + '" name="' + thisName + '[' + item.id + '][' + key + ']" value="' + this.options.addToAll[key] + '">';
    } // if a pivot table sort field is set, create the field


    if (this.options.sortField) {
      liStr += '<INPUT type="hidden" class="sortField" name="' + thisName + '[' + item.id + '][' + this.options.sortField + ']" value="' + idx + '">';
    } //	liStr += '<INPUT type="hidden" class="BREAKME" name="' + fldName + '[' + idModel + '][breakme]" value="' + idx + '">';
    // pivotField is a user-editable field on the pivot table.
    // if set, this displays a text field on the pivot row which can be given a value. Also reads the incoming value from the data.


    if (this.options.pivotField) {
      var pivotval = item[this.options.pivotField] != null ? item[this.options.pivotField] : '';
      liStr += '<div class="pivotlist-pivotfieldwrap form-inline">';

      if (this.options.pivotFieldLabel) {
        liStr += '<label class="mr-2">' + this.options.pivotFieldLabel + '</label>';
      }

      liStr += '<INPUT type="text" class="pivotField form-control w-25" placeholder="' + this.options.pivotFieldPlaceholder + '" name="' + thisName + '[' + item.id + '][' + this.options.pivotField + ']" value="' + pivotval + '">';
      liStr += '</div>';
    } // the delete link for the item


    liStr += '<A href="#" class="deleteLink text-danger" tabindex="-1"><i class="bi-x-square-fill text-danger fs-1"/></A>';
    safeid = item.id; //.replace('~', '_');
    // add the created LI to the List

    $("#" + thisID + " .pivotlist-list").append('<LI class="link list-group-item border mb-2 d-flex justify-content-between align-items-center" id="' + safeid + '">' + liStr + '</LI>'); // if not already hidden, hide the placeholder 'No Items' element

    $("#" + thisID + " .pivotlist-list LI.emptyDisp").hide(); // Code the operation of the delete link:

    $("#" + thisID + " LI#" + safeid + " A.deleteLink").click(function (event) {
      pSrc = $(this).parents(".linklist");
      $(this).parents("LI.link").remove();

      if (pSrc.find("LI.link").length > 0) {
        pSrc.find("LI.emptyDisp").hide();
      } else {
        pSrc.find("LI.emptyDisp").show();
      }

      widget.updateData(); // call method to update the data in the widget (i.e. update sort indeces etc)

      return false;
    });
  },
  updateData: function updateData() {
    thisID = this.widget.element[0].id; // show or hide the 'No Items' block as needed by the amount of data in the widget

    if ($(this.widget.element).find("LI.link").length > 0) {
      $(this.widget.element).find("LI.emptyDisp").hide();
    } else {
      $(this.widget.element).find("LI.emptyDisp").show();
    } // update the sortFields (if specified) so the posted data records the order of the items


    if (this.options.sortField) {
      $(this.widget.element).find('LI.link').each(function (i) {
        $(this).find('.sortField').val(i);
      });
    }
  }
};
$.widget('ascent.pivotlist', PivotList);
$.extend($.ascent.PivotList, {}); // ******
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
var RelatedTokens = {
  // Default options.
  options: {
    fieldName: 'tags',
    tokenName: 'tag'
  },
  _init: function _init() {
    var self = this;
    console.log(this.element.data());
    val = this.element.data('tokens'); //this.element.val('');

    this.element.wrap('<DIV class="cms-relatedtokens"></DIV>');
    this.element = this.element.parents('.cms-relatedtokens');
    this.element.prepend('<div class="rt_tokens"></div>');

    for ($iTkn = 0; $iTkn < val.length; $iTkn++) {
      this.addToken(val[$iTkn][this.options.tokenName], val[$iTkn]['id']);
    }

    this.element.on('click', 'A.rt_remove', function () {
      $(this).parents('.rt_token').remove();
    });
    this.element.find("INPUT[type=text]").on('keydown', function (e) {
      console.log(e.which);
      var breaks = [9, 13, 188];

      if (breaks.includes(e.which)) {
        self.addToken($(this).val());
        $(this).val('');
        e.preventDefault();
      }
    }); // this.addToken('test new');
    // this.addToken('Tag 2', 2);
  },
  addToken: function addToken(label) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var idx = this.element.find('.rt_token').length; // this.element.find('.rt_tokens').append('<div class="rt_token">' + label + '<input type="text" name="tags[' + idx + '][tag]" value="' + label + '"><input type="text" name="tags[' + idx + '][id]" value="' + id + '"></div>');

    this.element.find('.rt_tokens').append('<div class="rt_token">' + label + '<input type="hidden" name="' + this.options.fieldName + '[][' + this.options.tokenName + ']" value="' + label + '"><A href="#delete-token" class="bi-x-square-fill text-danger rt_remove"></A></div>');
  }
};
$.widget('ascent.relatedtokens', RelatedTokens);
$.extend($.ascent.RelatedTokens, {});
$(document).ready(function () {// $('.cms-relatedtokens').relatedtokens();
}); // ******
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2022

$.ascent = $.ascent ? $.ascent : {};
var RelationshipAutocomplete = {
  // Default options.
  options: {
    source: '',
    displayField: ''
  },
  _init: function _init() {
    var self = this; // console.log(this.options.source);

    $(this.element).find('.ra-input').autocomplete({
      source: this.options.source,
      select: function select(ui, item) {
        self.setValue(item.item);
      }
    }).autocomplete('instance')._renderItem = function (ul, item) {
      if (item.formattedlabel) {
        return $("<li>").append(item.formattedlabel).appendTo(ul);
      } else {
        return $("<li>").append('<div>' + item.label + '<div>').appendTo(ul);
      }
    };

    $(this.element).on('click', '.ra-clear', function () {
      self.setValue(null);
      return false;
    });
  },
  setValue: function setValue(item) {
    if (item) {
      var display = item[this.options.displayField];

      if (!display) {
        display = item.label;
      }

      $(this.element).find('.ra-value').val(item.id);
      $(this.element).find('.ra-label').html(display);
      $(this.element).addClass("has-value");
    } else {
      $(this.element).find('.ra-value').val('');
      $(this.element).find('.ra-input').val('');
      $(this.element).find('.ra-label').html('');
      $(this.element).removeClass("has-value");
    }
  }
};
$.widget('ascent.relationshipautocomplete', RelationshipAutocomplete);
$.extend($.ascent.RelationshipAutocomplete, {});
$(document).ready(function () {// $('.cms-relatedtokens').relatedtokens();
}); // ******
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {}; // fix for sometimes null sender... set in 'over', unset in 'stop'

var sender = null;
var StackBlockEdit = {
  itemCount: 0,
  _init: function _init() {
    var self = this;
    this.widget = this;
    idAry = this.element[0].id.split('-');
    var thisID = this.element[0].id;
    var fldName = idAry[1];
    var obj = this.element; //console.log('block edit init');

    $(this.element).on('click', 'A.blockitem-delete', function () {
      if (confirm("Delete this item?")) {
        var row = $(this).parents('.items');
        $(this).parents('.blockitem').remove();
        $(row).trigger('change');
        self.updateBlockIndexes();
      }

      return false;
    });
    $(this.element).find('.items').sortable({
      connectWith: '.items',
      //containment: '.stack-edit',
      handle: '.blockitem-handle',
      // axis: 'x',
      forcePlaceholderSize: true,
      xevert: 100,
      start: function start(event, ui) {
        $(ui.placeholder).css('height', $(ui.item).height() + 'px');
        sender = this;
      },
      over: function over(event, ui) {
        console.log('over'); // will it fit? 

        empty = self.getEmptyCount();

        if (sender == this) {
          empty += parseInt($(ui.item).find('.item-col-count').val());
        }

        if (parseInt($(ui.item).find('.item-col-count').val()) <= empty) {
          // ok
          //self.updateBlockIndexes();
          $(ui.placeholder).show();
        } else {
          // alert('Too Big - No Space');
          $(this).addClass('drop-not-allowed');
          $(ui.placeholder).hide();
        }
      },
      out: function out(event, ui) {
        $(this).removeClass('drop-not-allowed');
      },
      receive: function receive(event, ui) {
        console.log('receive'); // receiving an item from another list:
        // will it fit? 

        empty = self.getEmptyCount(); // at this point, the size of the dropped element is included...

        empty += parseInt($(ui.item).find('.item-col-count').val());

        if (parseInt($(ui.item).find('.item-col-count').val()) <= empty) {
          // ok
          self.updateBlockIndexes();
        } else {
          // alert('Too Big - No Space');
          $(ui.sender).sortable('cancel');
        }
      },
      remove: function remove(event, ui) {
        console.log('remove');
        self.updateBlockIndexes();
      },
      update: function update(event, ui) {
        console.log('update');
        self.updateBlockIndexes();
      },
      stop: function stop(event, ui) {
        console.log('stop'); // if ($(ui.item).hasClass('number') && $(ui.placeholder).parent()[0] != this) {
        //  $(this).sortable('cancel');
        //}

        sender = null;
      }
    });
    $(this.element).find('.blockitem').each(function () {
      self.initBlockItem(this);
    }); // ITEM ADD buttons:

    $(this.element).on('click', 'A.block-add-item-text', function () {
      self.loadBlockTemplate('text');
      $(this).closest('.show').removeClass('show');
      return false;
    });
    $(this.element).on('click', 'A.block-add-item-image', function () {
      self.loadBlockTemplate('image');
      $(this).closest('.show').removeClass('show');
      return false;
    });
    $(this.element).on('click', 'A.block-add-item-video', function () {
      self.loadBlockTemplate('video');
      $(this).closest('.show').removeClass('show');
      return false;
    });
  },
  getEmptyCount: function getEmptyCount() {
    var empty = 12;
    $(this.element).find('.item-col-count').each(function () {
      empty -= parseInt($(this).val());
    });
    return empty;
  },
  loadBlockTemplate: function loadBlockTemplate(type) {
    // check there's room
    var empty = 12;
    $(this.element).find(".item-col-count").each(function () {
      empty -= parseInt($(this).val());
    });

    if (empty < 1) {
      alert('This row is full - resize the other elements to make room, or add a new row block');
      return false;
    }

    var self = this;
    stackname = $(this.element).parents('.stack-edit').attr('id');
    blockid = $(this.element).parent().children().index(this.element);
    itemid = $(this.element).find('.blockitem').length;
    blockname = stackname + "[" + blockid + "][items][" + itemid + "]";
    console.log(blockname);
    $.get('/admin/stackblock/newitem/' + type + "/" + blockname + "/" + empty, function (data) {
      // $(self.element).find('.stack-output').before(data);
      var newItem = $(data);
      $(self.element).find('.items').append(newItem);
      console.log(newItem);
      self.initBlockItem(newItem);
      self.updateBlockIndexes();
    });
  },
  updateBlockIndexes: function updateBlockIndexes() {
    // console.log('UBI - Block');
    if ($(this.element).find('.blockitem').length == 0) {
      $(this.element).find('.placeholder').show();
    } else {
      $(this.element).find('.placeholder').hide();
    }

    var self = this; // reapply field indexes to represent reordering

    $(this.element).find('.blockitem').each(function (idx) {
      $(this).find('INPUT:not([type=file]), SELECT, TEXTAREA').each(function (fldidx) {
        var ary = $(this).attr('name').split(/(\[|\])/); // console.log(ary);
        // we're allowing drops from other blocks, so need to update ary[2] also...

        blockidx = $(self.element).parent().children('.block-edit').index(self.element); // console.log('BLockIdx : ' + blockidx);

        ary[2] = blockidx;
        ary[10] = idx;
        $(this).attr('name', ary.join(''));
        $(this).change(); // $('#frm_edit').addClass('dirty'); //trigger('checkform.areYouSure');
      });
    });
  },
  initBlockItem: function initBlockItem(item) {
    $(item).resizable({
      handles: 'e',
      placeholder: 'ui-state-highlight',
      create: function create(event, ui) {
        // Prefers an another cursor with two arrows
        $(".ui-resizable-handle").css("cursor", "ew-resize");
      },
      start: function start(event, ui) {
        // sibTotalWidth = ui.originalSize.width + ui.originalElement.next().outerWidth();
        console.log(ui.size);
        var colcount = 12; // change this to alter the number of cols in the row.

        var colsize = $(ui.element).parents('.items').width() / colcount; // set the grid correctly - allows for window to be resized bewteen...

        $(ui.element).resizable('option', 'grid', [colsize, 0]); // min width = 3 cols

        $(ui.element).resizable('option', 'minWidth', colsize * 3 - 1);
        /**
         * old code - fixed items to a single row. 
         */
        // calc the max possible width for this item (to prevent dragging larger than the row)
        // get the col counts of items in the row

        var filled = 0;
        $(ui.element).parents('.items').find('.blockitem').each(function () {
          filled += parseInt($(this).find('.item-col-count').val());
          console.log(filled);
        }); // subtract the col count of this item

        filled -= $(ui.element).find('.item-col-count').val(); // the difference is the max number of cols this can fill

        empty = colcount - filled;
        console.log(empty); // multiply to get a total max width.

        $(ui.element).resizable('option', 'maxWidth', colsize * (colcount - filled));
        /** new code - just set max to row width. **/
        //$(ui.element).resizable('option', 'maxWidth', $(ui.element).parents('.items').width());
      },
      resize: function resize(event, ui) {
        console.log(ui.size.width + " :: " + $(ui.element).parents('.items').width()); // calculate the number of cols currently occupied and write to the col-count field

        cols = ui.size.width / $(ui.element).parents('.items').width() * 12; // need to pull this from the same parameter as in 'start' - should probably widgetise this code...

        console.log(Math.round(cols));
        $(ui.element).find('.item-col-count').val(Math.round(cols));
      },
      stop: function stop(event, ui) {
        //$(ui.element).css('width', $(ui.element).width() + 'px');
        var pct = $(ui.element).width() / $(ui.element).parents('.items').width() * 100;
        $(ui.element).css('width', pct + '%');
        $(ui.element).trigger('change');
      }
    });
  }
};
$.widget('ascent.stackblockedit', StackBlockEdit);
$.extend($.ascent.StackBlockEdit, {}); // ******
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
var StackEdit = {
  rowCount: 0,
  _init: function _init() {
    var self = this;
    this.widget = this;
    idAry = this.element[0].id.split('-');
    var thisID = this.element[0].id;
    var fldName = idAry[1];
    var obj = this.element; // make the stack sortable (drag & drop)

    $(this.element).find('.stack-blocks').sortable({
      axis: 'y',
      handle: '.block-handle',
      start: function start(event, ui) {
        $(ui.placeholder).css('height', $(ui.item).height() + 'px');
      },
      update: function update(event, ui) {
        self.updateBlockIndexes();
      }
    }); //capture the submit event of the form to serialise the stack data

    $(this.element).parents('form').on('submit', function () {
      self.serialise();
    });
    $(this.element).on('change', function () {
      self.serialise();
    });
    $(this.element).on('click', '.block-delete', function () {
      console.log('delete me');

      if (confirm("Delete this block?")) {
        $(this).parents('.block-edit').remove();
        self.updateBlockIndexes();
      }

      return false;
    }); // capture the click event of the add block button
    // (test for now - adds a new row block. Will need to be coded to ask user what block to add)

    $(this.element).find('.stack-add-block').on('click', function () {
      //var type = 'row';\
      var type = $(this).attr('data-block-type');
      var field = $(this).attr('data-block-field'); //'content';

      var idx = $(self.element).find('.block-edit').length; //    alert(idx);

      $.get('/admin/stackblock/make/' + type + '/' + field + '/' + idx, function (data) {
        // $(self.element).find('.stack-output').before(data);
        $(self.element).find('.stack-blocks').append(data);
        self.updateBlockIndexes();
      }); //   alert('hide...');

      $('.btn.dropdown-toggle').dropdown('hide');
      return false;
    });
    this.serialise();
  },
  serialise: function serialise() {
    var data = $(this.element).find('INPUT, SELECT, TEXTAREA').not('.stack-output').serializeJSON(); // console.log(data);
    //  return false;
    // remove the top level wrapper (which is just the field name):

    for (fld in data) {
      $(this.element).find('.stack-output').val(JSON.stringify(data[fld]));
    }
  },
  updateBlockIndexes: function updateBlockIndexes() {
    // console.log('UBI - Stack');
    // console.log($(this.element).find('.block-edit'));
    // reapply field indexes to represent reordering
    $(this.element).find('.block-edit').each(function (idx) {
      $(this).find('INPUT:not([type=file]), SELECT, TEXTAREA').each(function (fldidx) {
        //   console.log(idx + " vs " + fldidx);
        if ($(this).attr('name') != undefined && $(this).attr('name').indexOf('[')) {
          var ary = $(this).attr('name').split(/(\[|\])/);
          ary[2] = idx;
          $(this).attr('name', ary.join(''));
          $(this).change();
        } // $('#frm_edit').addClass('dirty'); //trigger('checkform.areYouSure');

      });
    });
  }
};
$.widget('ascent.stackedit', StackEdit);
$.extend($.ascent.StackEdit, {}); // ******
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2022

$.ascent = $.ascent ? $.ascent : {};
var SubformLoader = {
  // // Default options.
  // options: {
  // },
  _init: function _init() {
    var self = this; // alert('SFLoader');

    var map = this.element.data('map'); // watch for changes in the watched field, and use that value to request a subform.

    $(document).on('change', '[name=' + this.element.data('source') + ']', function (e) {
      // alert('changed');
      $(self.element).css('opacity', 0.5);
      var source = e.target;
      console.log(source);
      $.ajax({
        'method': 'post',
        'url': '/forms/subformloader',
        'data': {
          'key': $(source).val(),
          'map': map
        }
      }).done(function (data) {
        $(self.element).html(data);
        $(self.element).css('opacity', 1);
      });
    }); // load it over AJAX and replace the content accordingly
  }
};
$.widget('ascent.subformloader', SubformLoader);
$.extend($.ascent.SubformLoader, {});
$(document).ready(function () {
  $('.subform-loader').subformloader();
}); // ******
// Code (c) Kieran Metcalfe / Ascent Creative 2022

$.ascent = $.ascent ? $.ascent : {};
var ToggleSwitch = {
  // // Default options.
  // options: {
  // },
  _init: function _init() {
    var self = this;
    console.log('TS init');
    $(this.element).on('click', 'input', function (e) {
      self.updateUI();
    });
    this.updateUI();
    this.element.addClass("initialised");
  },
  updateUI: function updateUI() {
    $(this.element).find('label').removeClass('selected');
    $(this.element).find('input:checked').parents('label').addClass('selected');
  },
  clear: function clear() {
    $(this.element).find('input').prop('checked', false);
    this.updateUI();
  }
};
$.widget('ascent.toggleswitch', ToggleSwitch);
$.extend($.ascent.ToggleSwitch, {});
$(document).ready(function () {
  $('.toggle-switch').not('.initialised').toggleswitch();
}); // ******
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
var ValueWithUnits = {
  _init: function _init() {
    var self = this; // console.log(this.element.data());

    this.element.addClass('initialised');
    $(this.element).on('change', 'input, select', function (e) {
      console.log('VWU change');
      var val = $(self.element).find('INPUT.vwu-amount').val();
      var unit = $(self.element).find('SELECT.vwu-unit').val();
      var out = '';

      if (val) {
        out = val + unit;
      }

      $(self.element).find('.vwu-output').val(out); // $('input[name="{{ $name }}"]').val($out);
    });
  }
};
$.widget('ascent.valuewithunits', ValueWithUnits);
$.extend($.ascent.ValueWithUnits, {});
$(document).ready(function () {
  $('.value-with-units').not('.initialised').valuewithunits();
});
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function (mutations, observer) {
  // fired when a mutation occurs
  // console.log(mutations, observer);
  // ...
  $('.value-with-units').not('.initialised').valuewithunits();
}); // define what element should be observed by the observer
// and what types of mutations trigger the callback

observer.observe(document, {
  subtree: true,
  childList: true //...

}); // ******
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
var Wysiwyg = {
  ck: null,
  options: {
    toolbar: ''
  },
  unid: '',
  _init: function _init() {
    var unid = $(this.element).attr('data-unid');
    this.unid = unid;
    var self = this;
    CKEDITOR.disableAutoInline = true;
    $(this.element).addClass('initialised');
    this.checkEmpty();
    console.log($(this.element).data());

    if ($(this.element).data('alwayson') == 1) {
      this.createEditor();
    } else {
      $(this.element).on('dblclick', function () {
        // alert("dblcick");   
        self.createEditor(); // console.log(self.ck);

        self.ck.on('blur', function () {
          //    alert('blur ck');
          $(self.element).removeClass("active");
          this.destroy();
          self.ck = null;
          $('#edit-' + self.unid).attr('contenteditable', false);
        });
        $('#edit-' + self.unid).focus();
      });
    }
  },
  createEditor: function createEditor() {
    var roxyFileman = '/ascentcore/fileman/index.html';
    var toolbar = $(this.element).data('toolbar'); //this.options.toolbar;

    var palette = $(this.element).data('palette');
    $(this.element).addClass("active");
    $('#edit-' + this.unid).attr('contenteditable', true);
    this.ck = CKEDITOR.inline('edit-' + this.unid, {
      extraAllowedContent: 'form; form[*]; form(*); input; input(*); input[*]; p[style]; script; script(*); script[*]; iframe; code; embed; iframe[*]; embed[*]; span(*); div(*); div(codesnippet)[*]; div[*]; codesnippet; codesnippet[contenteditable]; codesnippet[partial]; codesnippet[*]',
      filebrowserBrowseUrl: roxyFileman,
      filebrowserImageBrowseUrl: roxyFileman + '?type=image',
      removeDialogTabs: 'link:upload;image:upload',
      removePlugins: 'elementspath',
      // extraPlugins: 'font,richcombo,snippet,photogallery,justify,panel,button,floatpanel,panelbutton,colorbutton,colordialog',
      extraPlugins: 'richcombo,justify,panel,button,floatpanel,panelbutton,colorbutton,colordialog',
      contentsCss: ['/css/fck_editorarea.css', '/css/buttons.css'],
      // colorButton_colors: '{{ join(",", \AscentCreative\CMS\Models\Swatch::all()->transform(function($item, $key) { return str_replace('#', '', $item->hex); })->toArray()) }}',
      colorButton_colors: palette,
      entities_additional: '#009',
      toolbar: toolbar
    });
    var self = this;
    this.ck.on('change', function (e) {
      // update the Textarea and fire off a change event (used by Form Dirty checks);
      $('#output-' + self.unid).val($('#edit-' + self.unid).html());
      $('#output-' + self.unid).change();
      self.checkEmpty(); // $('#output-' + unid).trigger('change');
    });
  },
  checkEmpty: function checkEmpty() {
    if (!$('#edit-' + this.unid).text().trim().length) {
      $(this.element).addClass('empty');
    } else {
      $(this.element).removeClass('empty');
    }
  }
};
$.widget('ascent.wysiwyg', Wysiwyg);
$.extend($.ascent.Wysiwyg, {}); // function wysiwyg_init(unid) {
//     var roxyFileman = '/ascentcore/fileman/index.html'; 
//     CKEDITOR.disableAutoInline = true;
//     var ck = CKEDITOR.inline( 'edit-' + unid,
//     {  
//         extraAllowedContent : 'form; form[*]; form(*); input; input(*); input[*]; p[style]; script; script(*); script[*]; iframe; code; embed; iframe[*]; embed[*]; span(*); div(*); div(codesnippet)[*]; div[*]; codesnippet; codesnippet[contenteditable]; codesnippet[partial]; codesnippet[*]', filebrowserBrowseUrl:roxyFileman,
//         filebrowserImageBrowseUrl:roxyFileman+'?type=image',
//         removeDialogTabs: 'link:upload;image:upload',
//         removePlugins : 'elementspath',
//         extraPlugins: 'font,richcombo,snippet,photogallery,justify,panel,button,floatpanel,panelbutton,colorbutton,colordialog',
//         contentsCss: [ '/css/fck_editorarea.css','/css/buttons.css' ],
//         colorButton_colors: '{{ join(",", \AscentCreative\CMS\Models\Swatch::all()->transform(function($item, $key) { return str_replace('#', '', $item->hex); })->toArray()) }}',
//         entities_additional: '#009'
//     }   
//     );
//     ck.on('change', function(e) {
//         console.log(e);
//         // update the Textarea and fire off a change event (used by Form Dirty checks);
//         $('#output-' + unid).val($('#edit-' + unid).html());
//         $('#output-' + unid).change();
//     });
//     console.log('done init');
// }
// init on document ready

$(document).ready(function () {
  $('.wysiwyg-editor').not('.initialised').wysiwyg();
}); // alert('ok');
// alert('ok');
// make livewire compatible (check for init after DOM update)
// document.addEventListener("DOMContentLoaded", () => {
//     try {
//         Livewire.hook('message.processed', (message, component) => {
//             $('.wysiwyg-editor').not('.initialised').wysiwyg();
//         })
//     } catch (e) {
//     }
// });

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function (mutations, observer) {
  // fired when a mutation occurs
  // console.log(mutations, observer);
  // ...
  $('.wysiwyg-editor').not('.initialised').wysiwyg();
}); // define what element should be observed by the observer
// and what types of mutations trigger the callback

observer.observe(document, {
  subtree: true,
  childList: true //...

}); // ******
// Wrapper Widget which utilises the Croppie image cropper library from https://github.com/Foliotek/Croppie
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
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
  _init: function _init() {
    var self = this;
    this.widget = this;
    var thisID = this.element[0].id;
    var obj = this.element; // incoming options

    this.vpw = self.options.targetWidth * self.options.previewScale;
    this.vph = self.options.targetHeight * self.options.previewScale;
    /**
     * Configure the UI
     */

    var dimensions = '';

    if (self.options.targetWidth != 0 || self.options.targetHeight != 0) {
      var dimensions = "(" + self.options.targetWidth + "px x " + self.options.targetHeight + "px)";
    } else {
      this.vpw = 300;
      this.vph = 300;
    }

    obj.wrap('<DIV class="croppieupload empty"></DIV>');
    this.root = $(obj).parent('.croppieupload');
    this.root.append('<DIV class="cu_trigger"><DIV class="cu_message"><div>Click to upload an image</div><div>' + dimensions + '</div></DIV></DIV><INPUT type="file" id="cu_file"/>');
    this.root.append('<DIV class="cu_actions"><A href="" class="button cu_remove nochevron btn-primary btn-sm">Remove</A><A href="" class="button cu_change nochevron btn-primary btn-sm">Change</A></DIV>');

    if (!self.options.constrained) {
      this.root.addClass('unconstrained');
    } // "remove" link action:


    this.root.find('.cu_remove').click(function () {
      if (confirm('Remove Image?')) {
        self.clearValue();
      }

      return false;
    }); // "change" link action:

    this.root.find('.cu_change').click(function () {
      $(this).parents(".croppieupload").find('INPUT#cu_file').trigger("click");
      return false;
    });

    if (obj.val()) {
      this.setValue(obj.val(), this.vpw, this.vph);
    }

    $(this.root).find('.cu_trigger').click(function () {
      $(this).parents(".croppieupload").find('INPUT#cu_file').trigger("click");
    }); // when a file is selected, read the contents:

    this.root.find('#cu_file').change(function () {
      self.readFile(this);
    }); // instead of pixel sizes, let's use aspect ratio...
    //this.root.css('width', (this.vpw==0?400:this.vpw) + 'px').css('height', (this.vph==0?200:this.vph) + 'px');

    if (self.options.constrained) {
      this.root.css('max-width', (this.vpw == 0 ? 400 : this.vpw) + 'px'); // this.root.css('aspect-ratio', (this.vpw==0?400:this.vpw) + ' / ' + (this.vph==0?200:this.vph));

      this.root.css('width', (this.vpw == 0 ? 400 : this.vpw) + 'px').css('height', (this.vph == 0 ? 200 : this.vph) + 'px');
    }

    var opts = self.options;
  },
  setValue: function setValue(url, vpw, vph) {
    //console.log('croppie - set value: ' + vpw + ', ' + vph);
    self = this; //console.log('setting to: ' + url);

    this.element.val(url); //console.log(this.element.val());
    // don't need to set size here - it'll be set on init instead
    //this.root.css('width', (vpw==0?400:vpw) + 'px').css('height', (vph==0?200:vph) + 'px').css('background-size', '100%');
    // this.root.css('background-image', "url('" + url + "')");

    this.root.css('background-size', 'contain');
    this.root.css('background-position', 'center');
    this.root.removeClass('empty').addClass('has-image');
    $(this.root).find('img').remove();
    this.root.prepend('<img src="' + url + '"/>');
  },
  clearValue: function clearValue() {
    this.root.css('background-image', 'none');
    this.root.addClass('empty').removeClass('has-image');
    $(this.root).find('img').remove();
    this.element.val('');
  },
  readFile: function readFile(input) {
    // alert('reading file');
    var self = this;

    if (input.files && input.files[0]) {
      console.log('reading input...');
      var reader = new FileReader();

      reader.onload = function (e) {
        img = new Image();

        img.onload = function () {
          self.startCroppie(e.target.result, img.width, img.height, input.files[0].type);
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    } else {
      alert("Sorry - your browser doesn't support the FileReader API");
    }
  },
  newStartCroppie: function newStartCroppie(url, filewidth, fileheight, filetype) {
    $('#modal-' + $(this.element).attr('id')).on('click', '.btn-ok', function (e) {
      alert('ok');
      $(this).parent('.modal').modal('hide');
      e.preventDefault();
    }).on('hidden.bs.modal', function () {
      alert('hidden');
    }).modal();
  },
  startCroppie: function startCroppie(url, filewidth, fileheight, filetype) {
    console.log('startCroppie: ' + filewidth + ', ' + fileheight);
    var self = this; // needs to be converted to a bootstrap modal ideally, but maybe just use the CSS from the old version for now...

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
      enableResize: self.options.constrained ? false : true
    });
    $('.cu_wrap .croppie').croppie('bind', {
      url: url
    }).then(function () {
      console.log('jQuery bind complete');
    });
    $('.cu_cancel').click(function () {
      $('.cu_curtain').remove();
      return false;
    });
    $('.cu_result').click(function () {
      switch (filetype) {
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
        size: {
          width: self.options.targetWidth,
          height: self.options.targetHeight
        },
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
        }).done(function (data) {
          self.setValue(data['path'], this.vpw, this.vph);
          $('.cu_curtain').remove();
        }).fail(function (data) {
          alert('Image Upload Failed: (' + data.status + ') ' + data.responseJSON.message);
        });
      });
      return false;
    });
  }
};
$.widget('ascent.croppieupload', CroppieUpload);
$.extend($.ascent.CroppieUpload, {});
!function (e, t) {
  "function" == typeof define && define.amd ? define(["exports"], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "string" != typeof exports.nodeName ? t(exports) : t(e.commonJsStrict = {});
}(this, function (e) {
  "function" != typeof Promise && function (e) {
    function t(e, t) {
      return function () {
        e.apply(t, arguments);
      };
    }

    function i(e) {
      if ("object" != _typeof(this)) throw new TypeError("Promises must be constructed via new");
      if ("function" != typeof e) throw new TypeError("not a function");
      this._state = null, this._value = null, this._deferreds = [], s(e, t(o, this), t(r, this));
    }

    function n(e) {
      var t = this;
      return null === this._state ? void this._deferreds.push(e) : void h(function () {
        var i = t._state ? e.onFulfilled : e.onRejected;

        if (null !== i) {
          var n;

          try {
            n = i(t._value);
          } catch (t) {
            return void e.reject(t);
          }

          e.resolve(n);
        } else (t._state ? e.resolve : e.reject)(t._value);
      });
    }

    function o(e) {
      try {
        if (e === this) throw new TypeError("A promise cannot be resolved with itself.");

        if (e && ("object" == _typeof(e) || "function" == typeof e)) {
          var i = e.then;
          if ("function" == typeof i) return void s(t(i, e), t(o, this), t(r, this));
        }

        this._state = !0, this._value = e, a.call(this);
      } catch (e) {
        r.call(this, e);
      }
    }

    function r(e) {
      this._state = !1, this._value = e, a.call(this);
    }

    function a() {
      for (var e = 0, t = this._deferreds.length; t > e; e++) {
        n.call(this, this._deferreds[e]);
      }

      this._deferreds = null;
    }

    function s(e, t, i) {
      var n = !1;

      try {
        e(function (e) {
          n || (n = !0, t(e));
        }, function (e) {
          n || (n = !0, i(e));
        });
      } catch (e) {
        if (n) return;
        n = !0, i(e);
      }
    }

    var l = setTimeout,
        h = "function" == typeof setImmediate && setImmediate || function (e) {
      l(e, 1);
    },
        u = Array.isArray || function (e) {
      return "[object Array]" === Object.prototype.toString.call(e);
    };

    i.prototype["catch"] = function (e) {
      return this.then(null, e);
    }, i.prototype.then = function (e, t) {
      var o = this;
      return new i(function (i, r) {
        n.call(o, new function (e, t, i, n) {
          this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.resolve = i, this.reject = n;
        }(e, t, i, r));
      });
    }, i.all = function () {
      var e = Array.prototype.slice.call(1 === arguments.length && u(arguments[0]) ? arguments[0] : arguments);
      return new i(function (t, i) {
        function n(r, a) {
          try {
            if (a && ("object" == _typeof(a) || "function" == typeof a)) {
              var s = a.then;
              if ("function" == typeof s) return void s.call(a, function (e) {
                n(r, e);
              }, i);
            }

            e[r] = a, 0 == --o && t(e);
          } catch (e) {
            i(e);
          }
        }

        if (0 === e.length) return t([]);

        for (var o = e.length, r = 0; r < e.length; r++) {
          n(r, e[r]);
        }
      });
    }, i.resolve = function (e) {
      return e && "object" == _typeof(e) && e.constructor === i ? e : new i(function (t) {
        t(e);
      });
    }, i.reject = function (e) {
      return new i(function (t, i) {
        i(e);
      });
    }, i.race = function (e) {
      return new i(function (t, i) {
        for (var n = 0, o = e.length; o > n; n++) {
          e[n].then(t, i);
        }
      });
    }, i._setImmediateFn = function (e) {
      h = e;
    }, "undefined" != typeof module && module.exports ? module.exports = i : e.Promise || (e.Promise = i);
  }(this), "function" != typeof window.CustomEvent && function () {
    function e(e, t) {
      t = t || {
        bubbles: !1,
        cancelable: !1,
        detail: void 0
      };
      var i = document.createEvent("CustomEvent");
      return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
    }

    e.prototype = window.Event.prototype, window.CustomEvent = e;
  }(), HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
    value: function value(e, t, i) {
      for (var n = atob(this.toDataURL(t, i).split(",")[1]), o = n.length, r = new Uint8Array(o), a = 0; a < o; a++) {
        r[a] = n.charCodeAt(a);
      }

      e(new Blob([r], {
        type: t || "image/png"
      }));
    }
  });
  var t,
      i,
      n,
      o = ["Webkit", "Moz", "ms"],
      r = document.createElement("div").style,
      a = [1, 8, 3, 6],
      s = [2, 7, 4, 5];

  function l(e) {
    if (e in r) return e;

    for (var t = e[0].toUpperCase() + e.slice(1), i = o.length; i--;) {
      if ((e = o[i] + t) in r) return e;
    }
  }

  function h(e, t) {
    e = e || {};

    for (var i in t) {
      t[i] && t[i].constructor && t[i].constructor === Object ? (e[i] = e[i] || {}, h(e[i], t[i])) : e[i] = t[i];
    }

    return e;
  }

  function u(e) {
    return h({}, e);
  }

  function c(e) {
    if ("createEvent" in document) {
      var t = document.createEvent("HTMLEvents");
      t.initEvent("change", !1, !0), e.dispatchEvent(t);
    } else e.fireEvent("onchange");
  }

  function p(e, t, i) {
    if ("string" == typeof t) {
      var n = t;
      (t = {})[n] = i;
    }

    for (var o in t) {
      e.style[o] = t[o];
    }
  }

  function d(e, t) {
    e.classList ? e.classList.add(t) : e.className += " " + t;
  }

  function m(e, t) {
    for (var i in t) {
      e.setAttribute(i, t[i]);
    }
  }

  function f(e) {
    return parseInt(e, 10);
  }

  function v(e, t) {
    var i = e.naturalWidth,
        n = e.naturalHeight,
        o = t || b(e);

    if (o && o >= 5) {
      var r = i;
      i = n, n = r;
    }

    return {
      width: i,
      height: n
    };
  }

  i = l("transform"), t = l("transformOrigin"), n = l("userSelect");

  var g = {
    translate3d: {
      suffix: ", 0px"
    },
    translate: {
      suffix: ""
    }
  },
      w = function w(e, t, i) {
    this.x = parseFloat(e), this.y = parseFloat(t), this.scale = parseFloat(i);
  };

  w.parse = function (e) {
    return e.style ? w.parse(e.style[i]) : e.indexOf("matrix") > -1 || e.indexOf("none") > -1 ? w.fromMatrix(e) : w.fromString(e);
  }, w.fromMatrix = function (e) {
    var t = e.substring(7).split(",");
    return t.length && "none" !== e || (t = [1, 0, 0, 1, 0, 0]), new w(f(t[4]), f(t[5]), parseFloat(t[0]));
  }, w.fromString = function (e) {
    var t = e.split(") "),
        i = t[0].substring(q.globals.translate.length + 1).split(","),
        n = t.length > 1 ? t[1].substring(6) : 1,
        o = i.length > 1 ? i[0] : 0,
        r = i.length > 1 ? i[1] : 0;
    return new w(o, r, n);
  }, w.prototype.toString = function () {
    var e = g[q.globals.translate].suffix || "";
    return q.globals.translate + "(" + this.x + "px, " + this.y + "px" + e + ") scale(" + this.scale + ")";
  };

  var y = function y(e) {
    if (!e || !e.style[t]) return this.x = 0, void (this.y = 0);
    var i = e.style[t].split(" ");
    this.x = parseFloat(i[0]), this.y = parseFloat(i[1]);
  };

  function b(e) {
    return e.exifdata ? e.exifdata.Orientation : 1;
  }

  function x(e, t, i) {
    var n = t.width,
        o = t.height,
        r = e.getContext("2d");

    switch (e.width = t.width, e.height = t.height, r.save(), i) {
      case 2:
        r.translate(n, 0), r.scale(-1, 1);
        break;

      case 3:
        r.translate(n, o), r.rotate(180 * Math.PI / 180);
        break;

      case 4:
        r.translate(0, o), r.scale(1, -1);
        break;

      case 5:
        e.width = o, e.height = n, r.rotate(90 * Math.PI / 180), r.scale(1, -1);
        break;

      case 6:
        e.width = o, e.height = n, r.rotate(90 * Math.PI / 180), r.translate(0, -o);
        break;

      case 7:
        e.width = o, e.height = n, r.rotate(-90 * Math.PI / 180), r.translate(-n, o), r.scale(1, -1);
        break;

      case 8:
        e.width = o, e.height = n, r.translate(0, n), r.rotate(-90 * Math.PI / 180);
    }

    r.drawImage(t, 0, 0, n, o), r.restore();
  }

  function C() {
    var e,
        t,
        o,
        r,
        a,
        s = this.options.viewport.type ? "cr-vp-" + this.options.viewport.type : null;
    this.options.useCanvas = this.options.enableOrientation || E.call(this), this.data = {}, this.elements = {}, e = this.elements.boundary = document.createElement("div"), t = this.elements.viewport = document.createElement("div"), this.elements.img = document.createElement("img"), o = this.elements.overlay = document.createElement("div"), this.options.useCanvas ? (this.elements.canvas = document.createElement("canvas"), this.elements.preview = this.elements.canvas) : this.elements.preview = this.elements.img, d(e, "cr-boundary"), e.setAttribute("aria-dropeffect", "none"), r = this.options.boundary.width, a = this.options.boundary.height, p(e, {
      width: r + (isNaN(r) ? "" : "px"),
      height: a + (isNaN(a) ? "" : "px")
    }), d(t, "cr-viewport"), s && d(t, s), p(t, {
      width: this.options.viewport.width + "px",
      height: this.options.viewport.height + "px"
    }), t.setAttribute("tabindex", 0), d(this.elements.preview, "cr-image"), m(this.elements.preview, {
      alt: "preview",
      "aria-grabbed": "false"
    }), d(o, "cr-overlay"), this.element.appendChild(e), e.appendChild(this.elements.preview), e.appendChild(t), e.appendChild(o), d(this.element, "croppie-container"), this.options.customClass && d(this.element, this.options.customClass), function () {
      var e,
          t,
          o,
          r,
          a,
          s = this,
          l = !1;

      function h(e, t) {
        var i = s.elements.preview.getBoundingClientRect(),
            n = a.y + t,
            o = a.x + e;
        s.options.enforceBoundary ? (r.top > i.top + t && r.bottom < i.bottom + t && (a.y = n), r.left > i.left + e && r.right < i.right + e && (a.x = o)) : (a.y = n, a.x = o);
      }

      function u(e) {
        s.elements.preview.setAttribute("aria-grabbed", e), s.elements.boundary.setAttribute("aria-dropeffect", e ? "move" : "none");
      }

      function d(i) {
        if ((void 0 === i.button || 0 === i.button) && (i.preventDefault(), !l)) {
          if (l = !0, e = i.pageX, t = i.pageY, i.touches) {
            var o = i.touches[0];
            e = o.pageX, t = o.pageY;
          }

          u(l), a = w.parse(s.elements.preview), window.addEventListener("mousemove", m), window.addEventListener("touchmove", m), window.addEventListener("mouseup", f), window.addEventListener("touchend", f), document.body.style[n] = "none", r = s.elements.viewport.getBoundingClientRect();
        }
      }

      function m(n) {
        n.preventDefault();
        var r = n.pageX,
            l = n.pageY;

        if (n.touches) {
          var u = n.touches[0];
          r = u.pageX, l = u.pageY;
        }

        var d = r - e,
            m = l - t,
            f = {};

        if ("touchmove" == n.type && n.touches.length > 1) {
          var v = n.touches[0],
              g = n.touches[1],
              w = Math.sqrt((v.pageX - g.pageX) * (v.pageX - g.pageX) + (v.pageY - g.pageY) * (v.pageY - g.pageY));
          o || (o = w / s._currentZoom);
          var y = w / o;
          return _.call(s, y), void c(s.elements.zoomer);
        }

        h(d, m), f[i] = a.toString(), p(s.elements.preview, f), B.call(s), t = l, e = r;
      }

      function f() {
        u(l = !1), window.removeEventListener("mousemove", m), window.removeEventListener("touchmove", m), window.removeEventListener("mouseup", f), window.removeEventListener("touchend", f), document.body.style[n] = "", R.call(s), Y.call(s), o = 0;
      }

      s.elements.overlay.addEventListener("mousedown", d), s.elements.viewport.addEventListener("keydown", function (e) {
        var t = 37,
            l = 38,
            u = 39,
            c = 40;

        if (!e.shiftKey || e.keyCode != l && e.keyCode != c) {
          if (s.options.enableKeyMovement && e.keyCode >= 37 && e.keyCode <= 40) {
            e.preventDefault();

            var d = function (e) {
              switch (e) {
                case t:
                  return [1, 0];

                case l:
                  return [0, 1];

                case u:
                  return [-1, 0];

                case c:
                  return [0, -1];
              }
            }(e.keyCode);

            a = w.parse(s.elements.preview), document.body.style[n] = "none", r = s.elements.viewport.getBoundingClientRect(), function (e) {
              var t = e[0],
                  r = e[1],
                  l = {};
              h(t, r), l[i] = a.toString(), p(s.elements.preview, l), B.call(s), document.body.style[n] = "", R.call(s), Y.call(s), o = 0;
            }(d);
          }
        } else {
          var m = 0;
          m = e.keyCode == l ? parseFloat(s.elements.zoomer.value, 10) + parseFloat(s.elements.zoomer.step, 10) : parseFloat(s.elements.zoomer.value, 10) - parseFloat(s.elements.zoomer.step, 10), s.setZoom(m);
        }
      }), s.elements.overlay.addEventListener("touchstart", d);
    }.call(this), this.options.enableZoom && function () {
      var e = this,
          t = e.elements.zoomerWrap = document.createElement("div"),
          i = e.elements.zoomer = document.createElement("input");

      function n() {
        L.call(e, {
          value: parseFloat(i.value),
          origin: new y(e.elements.preview),
          viewportRect: e.elements.viewport.getBoundingClientRect(),
          transform: w.parse(e.elements.preview)
        });
      }

      function o(t) {
        var i, o;
        i = t.wheelDelta ? t.wheelDelta / 1200 : t.deltaY ? t.deltaY / 1060 : t.detail ? t.detail / -60 : 0, o = e._currentZoom + i * e._currentZoom, t.preventDefault(), _.call(e, o), n.call(e);
      }

      d(t, "cr-slider-wrap"), d(i, "cr-slider"), i.type = "range", i.step = "0.0001", i.value = 1, i.style.display = e.options.showZoomer ? "" : "none", i.setAttribute("aria-label", "zoom"), e.element.appendChild(t), t.appendChild(i), e._currentZoom = 1, e.elements.zoomer.addEventListener("input", n), e.elements.zoomer.addEventListener("change", n), e.options.mouseWheelZoom && (e.elements.boundary.addEventListener("mousewheel", o), e.elements.boundary.addEventListener("DOMMouseScroll", o));
    }.call(this), this.options.enableResize && function () {
      var e,
          t,
          i,
          o,
          r,
          a,
          s,
          l = this,
          h = document.createElement("div"),
          u = !1,
          c = 50;
      d(h, "cr-resizer"), p(h, {
        width: this.options.viewport.width + "px",
        height: this.options.viewport.height + "px"
      }), this.options.resizeControls.height && (d(a = document.createElement("div"), "cr-resizer-vertical"), h.appendChild(a));
      this.options.resizeControls.width && (d(s = document.createElement("div"), "cr-resizer-horisontal"), h.appendChild(s));

      function m(a) {
        if ((void 0 === a.button || 0 === a.button) && (a.preventDefault(), !u)) {
          var s = l.elements.overlay.getBoundingClientRect();

          if (u = !0, t = a.pageX, i = a.pageY, e = -1 !== a.currentTarget.className.indexOf("vertical") ? "v" : "h", o = s.width, r = s.height, a.touches) {
            var h = a.touches[0];
            t = h.pageX, i = h.pageY;
          }

          window.addEventListener("mousemove", f), window.addEventListener("touchmove", f), window.addEventListener("mouseup", v), window.addEventListener("touchend", v), document.body.style[n] = "none";
        }
      }

      function f(n) {
        var a = n.pageX,
            s = n.pageY;

        if (n.preventDefault(), n.touches) {
          var u = n.touches[0];
          a = u.pageX, s = u.pageY;
        }

        var d = a - t,
            m = s - i,
            f = l.options.viewport.height + m,
            v = l.options.viewport.width + d;
        "v" === e && f >= c && f <= r ? (p(h, {
          height: f + "px"
        }), l.options.boundary.height += m, p(l.elements.boundary, {
          height: l.options.boundary.height + "px"
        }), l.options.viewport.height += m, p(l.elements.viewport, {
          height: l.options.viewport.height + "px"
        })) : "h" === e && v >= c && v <= o && (p(h, {
          width: v + "px"
        }), l.options.boundary.width += d, p(l.elements.boundary, {
          width: l.options.boundary.width + "px"
        }), l.options.viewport.width += d, p(l.elements.viewport, {
          width: l.options.viewport.width + "px"
        })), B.call(l), j.call(l), R.call(l), Y.call(l), i = s, t = a;
      }

      function v() {
        u = !1, window.removeEventListener("mousemove", f), window.removeEventListener("touchmove", f), window.removeEventListener("mouseup", v), window.removeEventListener("touchend", v), document.body.style[n] = "";
      }

      a && a.addEventListener("mousedown", m);
      s && s.addEventListener("mousedown", m);
      this.elements.boundary.appendChild(h);
    }.call(this);
  }

  function E() {
    return this.options.enableExif && window.EXIF;
  }

  function _(e) {
    if (this.options.enableZoom) {
      var t = this.elements.zoomer,
          i = O(e, 4);
      t.value = Math.max(t.min, Math.min(t.max, i));
    }
  }

  function L(e) {
    var n = this,
        o = e ? e.transform : w.parse(n.elements.preview),
        r = e ? e.viewportRect : n.elements.viewport.getBoundingClientRect(),
        a = e ? e.origin : new y(n.elements.preview);

    function s() {
      var e = {};
      e[i] = o.toString(), e[t] = a.toString(), p(n.elements.preview, e);
    }

    if (n._currentZoom = e ? e.value : n._currentZoom, o.scale = n._currentZoom, n.elements.zoomer.setAttribute("aria-valuenow", n._currentZoom), s(), n.options.enforceBoundary) {
      var l = function (e) {
        var t = this._currentZoom,
            i = e.width,
            n = e.height,
            o = this.elements.boundary.clientWidth / 2,
            r = this.elements.boundary.clientHeight / 2,
            a = this.elements.preview.getBoundingClientRect(),
            s = a.width,
            l = a.height,
            h = i / 2,
            u = n / 2,
            c = -1 * (h / t - o),
            p = -1 * (u / t - r),
            d = 1 / t * h,
            m = 1 / t * u;
        return {
          translate: {
            maxX: c,
            minX: c - (s * (1 / t) - i * (1 / t)),
            maxY: p,
            minY: p - (l * (1 / t) - n * (1 / t))
          },
          origin: {
            maxX: s * (1 / t) - d,
            minX: d,
            maxY: l * (1 / t) - m,
            minY: m
          }
        };
      }.call(n, r),
          h = l.translate,
          u = l.origin;

      o.x >= h.maxX && (a.x = u.minX, o.x = h.maxX), o.x <= h.minX && (a.x = u.maxX, o.x = h.minX), o.y >= h.maxY && (a.y = u.minY, o.y = h.maxY), o.y <= h.minY && (a.y = u.maxY, o.y = h.minY);
    }

    s(), X.call(n), Y.call(n);
  }

  function R() {
    var e = this._currentZoom,
        n = this.elements.preview.getBoundingClientRect(),
        o = this.elements.viewport.getBoundingClientRect(),
        r = w.parse(this.elements.preview.style[i]),
        a = new y(this.elements.preview),
        s = o.top - n.top + o.height / 2,
        l = o.left - n.left + o.width / 2,
        h = {},
        u = {};
    h.y = s / e, h.x = l / e, u.y = (h.y - a.y) * (1 - e), u.x = (h.x - a.x) * (1 - e), r.x -= u.x, r.y -= u.y;
    var c = {};
    c[t] = h.x + "px " + h.y + "px", c[i] = r.toString(), p(this.elements.preview, c);
  }

  function B() {
    if (this.elements) {
      var e = this.elements.boundary.getBoundingClientRect(),
          t = this.elements.preview.getBoundingClientRect();
      p(this.elements.overlay, {
        width: t.width + "px",
        height: t.height + "px",
        top: t.top - e.top + "px",
        left: t.left - e.left + "px"
      });
    }
  }

  y.prototype.toString = function () {
    return this.x + "px " + this.y + "px";
  };

  var z,
      Z,
      M,
      I,
      X = (z = B, Z = 500, function () {
    var e = this,
        t = arguments,
        i = M && !I;
    clearTimeout(I), I = setTimeout(function () {
      I = null, M || z.apply(e, t);
    }, Z), i && z.apply(e, t);
  });

  function Y() {
    var e,
        t = this.get();
    F.call(this) && (this.options.update.call(this, t), this.$ && "undefined" == typeof Prototype ? this.$(this.element).trigger("update", t) : (window.CustomEvent ? e = new CustomEvent("update", {
      detail: t
    }) : (e = document.createEvent("CustomEvent")).initCustomEvent("update", !0, !0, t), this.element.dispatchEvent(e)));
  }

  function F() {
    return this.elements.preview.offsetHeight > 0 && this.elements.preview.offsetWidth > 0;
  }

  function W() {
    var e,
        n = {},
        o = this.elements.preview,
        r = new w(0, 0, 1),
        a = new y();
    F.call(this) && !this.data.bound && (this.data.bound = !0, n[i] = r.toString(), n[t] = a.toString(), n.opacity = 1, p(o, n), e = this.elements.preview.getBoundingClientRect(), this._originalImageWidth = e.width, this._originalImageHeight = e.height, this.data.orientation = b(this.elements.img), this.options.enableZoom ? j.call(this, !0) : this._currentZoom = 1, r.scale = this._currentZoom, n[i] = r.toString(), p(o, n), this.data.points.length ? function (e) {
      if (4 != e.length) throw "Croppie - Invalid number of points supplied: " + e;
      var n = e[2] - e[0],
          o = this.elements.viewport.getBoundingClientRect(),
          r = this.elements.boundary.getBoundingClientRect(),
          a = {
        left: o.left - r.left,
        top: o.top - r.top
      },
          s = o.width / n,
          l = e[1],
          h = e[0],
          u = -1 * e[1] + a.top,
          c = -1 * e[0] + a.left,
          d = {};
      d[t] = h + "px " + l + "px", d[i] = new w(c, u, s).toString(), p(this.elements.preview, d), _.call(this, s), this._currentZoom = s;
    }.call(this, this.data.points) : function () {
      var e = this.elements.preview.getBoundingClientRect(),
          t = this.elements.viewport.getBoundingClientRect(),
          n = this.elements.boundary.getBoundingClientRect(),
          o = t.left - n.left,
          r = t.top - n.top,
          a = o - (e.width - t.width) / 2,
          s = r - (e.height - t.height) / 2,
          l = new w(a, s, this._currentZoom);
      p(this.elements.preview, i, l.toString());
    }.call(this), R.call(this), B.call(this));
  }

  function j(e) {
    var t,
        i,
        n,
        o,
        r = 0,
        a = 1.5,
        s = this.elements.zoomer,
        l = parseFloat(s.value),
        h = this.elements.boundary.getBoundingClientRect(),
        u = v(this.elements.img, this.data.orientation),
        p = this.elements.viewport.getBoundingClientRect();
    this.options.enforceBoundary && (n = p.width / u.width, o = p.height / u.height, r = Math.max(n, o)), r >= a && (a = r + 1), s.min = O(r, 4), s.max = O(a, 4), !e && (l < s.min || l > s.max) ? _.call(this, l < s.min ? s.min : s.max) : e && (i = Math.max(h.width / u.width, h.height / u.height), t = null !== this.data.boundZoom ? this.data.boundZoom : i, _.call(this, t)), c(s);
  }

  function k(e) {
    var t = e.points,
        i = f(t[0]),
        n = f(t[1]),
        o = f(t[2]) - i,
        r = f(t[3]) - n,
        a = e.circle,
        s = document.createElement("canvas"),
        l = s.getContext("2d"),
        h = e.outputWidth || o,
        u = e.outputHeight || r;
    e.outputWidth && e.outputHeight;
    return outputHeightRatio = 1, s.width = h, s.height = u, e.backgroundColor && (l.fillStyle = e.backgroundColor, l.fillRect(0, 0, h, u)), o = Math.min(o, this._originalImageWidth), r = Math.min(r, this._originalImageHeight), l.drawImage(this.elements.preview, i, n, o, r, 0, 0, h, u), a && (l.fillStyle = "#fff", l.globalCompositeOperation = "destination-in", l.beginPath(), l.arc(s.width / 2, s.height / 2, s.width / 2, 0, 2 * Math.PI, !0), l.closePath(), l.fill()), s;
  }

  function H(e, t) {
    var i,
        n,
        o,
        r,
        a = this,
        s = [],
        l = null,
        h = E.call(a);
    if ("string" == typeof e) i = e, e = {};else if (Array.isArray(e)) s = e.slice();else {
      if (void 0 === e && a.data.url) return W.call(a), Y.call(a), null;
      i = e.url, s = e.points || [], l = void 0 === e.zoom ? null : e.zoom;
    }
    return a.data.bound = !1, a.data.url = i || a.data.url, a.data.boundZoom = l, (n = i, o = h, r = new Image(), r.style.opacity = 0, new Promise(function (e) {
      function t() {
        r.style.opacity = 1, setTimeout(function () {
          e(r);
        }, 1);
      }

      r.removeAttribute("crossOrigin"), n.match(/^https?:\/\/|^\/\//) && r.setAttribute("crossOrigin", "anonymous"), r.onload = function () {
        o ? EXIF.getData(r, function () {
          t();
        }) : t();
      }, r.src = n;
    })).then(function (i) {
      if (function (e) {
        this.elements.img.parentNode && (this.elements.img.parentNode.replaceChild(e, this.elements.img), this.elements.preview = e), this.elements.img = e;
      }.call(a, i), s.length) a.options.relative && (s = [s[0] * i.naturalWidth / 100, s[1] * i.naturalHeight / 100, s[2] * i.naturalWidth / 100, s[3] * i.naturalHeight / 100]);else {
        var n,
            o,
            r = v(i),
            l = a.elements.viewport.getBoundingClientRect(),
            h = l.width / l.height;
        r.width / r.height > h ? n = (o = r.height) * h : (n = r.width, o = r.height / h);
        var u = (r.width - n) / 2,
            c = (r.height - o) / 2,
            p = u + n,
            d = c + o;
        a.data.points = [u, c, p, d];
      }
      a.data.points = s.map(function (e) {
        return parseFloat(e);
      }), a.options.useCanvas && function (e) {
        var t = this.elements.canvas,
            i = this.elements.img,
            n = t.getContext("2d"),
            o = E.call(this);
        e = this.options.enableOrientation && e, n.clearRect(0, 0, t.width, t.height), t.width = i.width, t.height = i.height, o && !e ? x(t, i, f(b(i) || 0)) : e && x(t, i, e);
      }.call(a, e.orientation || 1), W.call(a), Y.call(a), t && t();
    })["catch"](function (e) {
      console.error("Croppie:" + e);
    });
  }

  function O(e, t) {
    return parseFloat(e).toFixed(t || 0);
  }

  function A() {
    var e = this.elements.preview.getBoundingClientRect(),
        t = this.elements.viewport.getBoundingClientRect(),
        i = t.left - e.left,
        n = t.top - e.top,
        o = (t.width - this.elements.viewport.offsetWidth) / 2,
        r = (t.height - this.elements.viewport.offsetHeight) / 2,
        a = i + this.elements.viewport.offsetWidth + o,
        s = n + this.elements.viewport.offsetHeight + r,
        l = this._currentZoom;
    (l === 1 / 0 || isNaN(l)) && (l = 1);
    var h = this.options.enforceBoundary ? 0 : Number.NEGATIVE_INFINITY;
    return i = Math.max(h, i / l), n = Math.max(h, n / l), a = Math.max(h, a / l), s = Math.max(h, s / l), {
      points: [O(i), O(n), O(a), O(s)],
      zoom: l,
      orientation: this.data.orientation
    };
  }

  var N = {
    type: "canvas",
    format: "png",
    quality: 1
  },
      S = ["jpeg", "webp", "png"];

  function P(e) {
    var t = this,
        i = A.call(t),
        n = h(u(N), u(e)),
        o = "string" == typeof e ? e : n.type || "base64",
        r = n.size || "viewport",
        a = n.format,
        s = n.quality,
        l = n.backgroundColor,
        c = "boolean" == typeof n.circle ? n.circle : "circle" === t.options.viewport.type,
        m = t.elements.viewport.getBoundingClientRect(),
        f = m.width / m.height;
    return "viewport" === r ? (i.outputWidth = m.width, i.outputHeight = m.height) : "object" == _typeof(r) && (r.width && r.height ? (i.outputWidth = r.width, i.outputHeight = r.height) : r.width ? (i.outputWidth = r.width, i.outputHeight = r.width / f) : r.height && (i.outputWidth = r.height * f, i.outputHeight = r.height)), S.indexOf(a) > -1 && (i.format = "image/" + a, i.quality = s), i.circle = c, i.url = t.data.url, i.backgroundColor = l, new Promise(function (e, n) {
      switch (o.toLowerCase()) {
        case "rawcanvas":
          e(k.call(t, i));
          break;

        case "canvas":
        case "base64":
          e(function (e) {
            return k.call(this, e).toDataURL(e.format, e.quality);
          }.call(t, i));
          break;

        case "blob":
          (function (e) {
            var t = this;
            return new Promise(function (i, n) {
              k.call(t, e).toBlob(function (e) {
                i(e);
              }, e.format, e.quality);
            });
          }).call(t, i).then(e);
          break;

        default:
          e(function (e) {
            var t = e.points,
                i = document.createElement("div"),
                n = document.createElement("img"),
                o = t[2] - t[0],
                r = t[3] - t[1];
            return d(i, "croppie-result"), i.appendChild(n), p(n, {
              left: -1 * t[0] + "px",
              top: -1 * t[1] + "px"
            }), n.src = e.url, p(i, {
              width: o + "px",
              height: r + "px"
            }), i;
          }.call(t, i));
      }
    });
  }

  function D(e) {
    if (!this.options.useCanvas || !this.options.enableOrientation) throw "Croppie: Cannot rotate without enableOrientation && EXIF.js included";
    var t,
        i,
        n,
        o,
        r,
        l = this.elements.canvas;
    this.data.orientation = (t = this.data.orientation, i = e, n = a.indexOf(t) > -1 ? a : s, o = n.indexOf(t), r = i / 90 % n.length, n[(n.length + o + r % n.length) % n.length]), x(l, this.elements.img, this.data.orientation), j.call(this), L.call(this), copy = null;
  }

  if (window.jQuery) {
    var T = window.jQuery;

    T.fn.croppie = function (e) {
      if ("string" === typeof e) {
        var t = Array.prototype.slice.call(arguments, 1),
            i = T(this).data("croppie");
        return "get" === e ? i.get() : "result" === e ? i.result.apply(i, t) : "bind" === e ? i.bind.apply(i, t) : this.each(function () {
          var i = T(this).data("croppie");

          if (i) {
            var n = i[e];
            if (!T.isFunction(n)) throw "Croppie " + e + " method not found";
            n.apply(i, t), "destroy" === e && T(this).removeData("croppie");
          }
        });
      }

      return this.each(function () {
        var t = new q(this, e);
        t.$ = T, T(this).data("croppie", t);
      });
    };
  }

  function q(e, t) {
    if (e.className.indexOf("croppie-container") > -1) throw new Error("Croppie: Can't initialize croppie more than once");

    if (this.element = e, this.options = h(u(q.defaults), t), "img" === this.element.tagName.toLowerCase()) {
      var i = this.element;
      d(i, "cr-original-image"), m(i, {
        "aria-hidden": "true",
        alt: ""
      });
      var n = document.createElement("div");
      this.element.parentNode.appendChild(n), n.appendChild(i), this.element = n, this.options.url = this.options.url || i.src;
    }

    if (C.call(this), this.options.url) {
      var o = {
        url: this.options.url,
        points: this.options.points
      };
      delete this.options.url, delete this.options.points, H.call(this, o);
    }
  }

  q.defaults = {
    viewport: {
      width: 100,
      height: 100,
      type: "square"
    },
    boundary: {},
    orientationControls: {
      enabled: !0,
      leftClass: "",
      rightClass: ""
    },
    resizeControls: {
      width: !0,
      height: !0
    },
    customClass: "",
    showZoomer: !0,
    enableZoom: !0,
    enableResize: !1,
    mouseWheelZoom: !0,
    enableExif: !1,
    enforceBoundary: !0,
    enableOrientation: !1,
    enableKeyMovement: !0,
    update: function update() {}
  }, q.globals = {
    translate: "translate3d"
  }, h(q.prototype, {
    bind: function bind(e, t) {
      return H.call(this, e, t);
    },
    get: function get() {
      var e = A.call(this),
          t = e.points;
      return this.options.relative && (t[0] /= this.elements.img.naturalWidth / 100, t[1] /= this.elements.img.naturalHeight / 100, t[2] /= this.elements.img.naturalWidth / 100, t[3] /= this.elements.img.naturalHeight / 100), e;
    },
    result: function result(e) {
      return P.call(this, e);
    },
    refresh: function refresh() {
      return function () {
        W.call(this);
      }.call(this);
    },
    setZoom: function setZoom(e) {
      _.call(this, e), c(this.elements.zoomer);
    },
    rotate: function rotate(e) {
      D.call(this, e);
    },
    destroy: function destroy() {
      return function () {
        var e, t;
        this.element.removeChild(this.elements.boundary), e = this.element, t = "croppie-container", e.classList ? e.classList.remove(t) : e.className = e.className.replace(t, ""), this.options.enableZoom && this.element.removeChild(this.elements.zoomerWrap), delete this.elements;
      }.call(this);
    }
  }), e.Croppie = window.Croppie = q, "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports && (module.exports = q);
}); // ******
// js code to handle a field which displays values based on the selection in another field.
//  - builds UI in the admin area
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2017
// Code may be used as part of a site built and hosted by Ascent Creative, but may not be transferred to 3rd parties

$.ascent = $.ascent ? $.ascent : {};
var CharLimit = {
  max: 0,
  warndistance: 10,
  options: {
    'max': 0,
    warndistance: 10
  },
  _init: function _init() {
    var self = this;
    this.widget = this;
    var opts = self.options;
    var elm = self.element;
    var counter = $('<SPAN class="charlimit_display" id="charlimit_' + elm.attr('id') + '"><SPAN class="charlimit_count">0</SPAN>/' + opts.max + '</SPAN>');
    elm.wrap('<div class="charlimit_wrap"></div>');
    elm.parent().append(counter);
    $(elm).on('keydown', function (e) {//self.oldval = elm.val();
    });
    $(elm).on('input', function (e) {
      if (elm.val().length > self.options.max && self.options.force) {
        elm.val(elm.val().substr(0, self.options.max));
      }

      self.update();
    });
    $(elm).on('resize', function (e) {
      self.update();
    });
    setTimeout(function () {
      self.update();
    }, 0);
  },
  update: function update() {
    var self = this;
    var elm = this.element;
    var counter = $('#charlimit_' + elm.attr('id'));
    var len = elm.val().length;
    $(counter).find('.charlimit_count').html(len); //console.log(self.options.warndistance);

    if (len >= self.options.max - self.options.warndistance) {
      $(counter).addClass('full');
    } else {
      $(counter).removeClass('full');
    }
  }
};
$.widget('ascent.charlimit', CharLimit);
$.extend($.ascent.charlimit, {});
!function (e) {
  "use strict";

  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = e(require("jquery")) : e(jQuery);
}(function (De, qe) {
  "use strict";

  var e,
      Ie = {
    beforeShow: a,
    move: a,
    change: a,
    show: a,
    hide: a,
    color: !1,
    flat: !1,
    type: "",
    showInput: !1,
    allowEmpty: !0,
    showButtons: !0,
    clickoutFiresChange: !0,
    showInitial: !1,
    showPalette: !0,
    showPaletteOnly: !1,
    hideAfterPaletteSelect: !1,
    togglePaletteOnly: !1,
    showSelectionPalette: !0,
    localStorageKey: !1,
    appendTo: "body",
    maxSelectionSize: 8,
    locale: "en",
    cancelText: "cancel",
    chooseText: "choose",
    togglePaletteMoreText: "more",
    togglePaletteLessText: "less",
    clearText: "Clear Color Selection",
    noColorSelectedText: "No Color Selected",
    preferredFormat: "name",
    className: "",
    containerClassName: "",
    replacerClassName: "",
    showAlpha: !0,
    theme: "sp-light",
    palette: [["#000000", "#444444", "#5b5b5b", "#999999", "#bcbcbc", "#eeeeee", "#f3f6f4", "#ffffff"], ["#f44336", "#744700", "#ce7e00", "#8fce00", "#2986cc", "#16537e", "#6a329f", "#c90076"], ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"], ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"], ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"], ["#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"], ["#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"], ["#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]],
    selectionPalette: [],
    disabled: !1,
    offset: null
  },
      Ve = [],
      We = !!/msie/i.exec(window.navigator.userAgent),
      Be = ((e = document.createElement("div").style).cssText = "background-color:rgba(0,0,0,.5)", t(e.backgroundColor, "rgba") || t(e.backgroundColor, "hsla")),
      Ke = ["<div class='sp-replacer'>", "<div class='sp-preview'><div class='sp-preview-inner'></div></div>", "<div class='sp-dd'>&#9660;</div>", "</div>"].join(""),
      $e = function () {
    var e = "";
    if (We) for (var t = 1; t <= 6; t++) {
      e += "<div class='sp-" + t + "'></div>";
    }
    return ["<div class='sp-container sp-hidden'>", "<div class='sp-palette-container'>", "<div class='sp-palette sp-thumb sp-cf'></div>", "<div class='sp-palette-button-container sp-cf'>", "<button type='button' class='sp-palette-toggle'></button>", "</div>", "</div>", "<div class='sp-picker-container'>", "<div class='sp-top sp-cf'>", "<div class='sp-fill'></div>", "<div class='sp-top-inner'>", "<div class='sp-color'>", "<div class='sp-sat'>", "<div class='sp-val'>", "<div class='sp-dragger'></div>", "</div>", "</div>", "</div>", "<div class='sp-clear sp-clear-display'>", "</div>", "<div class='sp-hue'>", "<div class='sp-slider'></div>", e, "</div>", "</div>", "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>", "</div>", "<div class='sp-input-container sp-cf'>", "<input class='sp-input' type='text' spellcheck='false'  />", "</div>", "<div class='sp-initial sp-thumb sp-cf'></div>", "<div class='sp-button-container sp-cf'>", "<button class='sp-cancel' href='#'></button>", "<button type='button' class='sp-choose'></button>", "</div>", "</div>", "</div>"].join("");
  }();

  function t(e, t) {
    return !!~("" + e).indexOf(t);
  }

  function Xe(e, t, a, o) {
    for (var r = [], n = 0; n < e.length; n++) {
      var s = e[n];

      if (s) {
        var i = tinycolor(s),
            l = i.toHsl().l < .5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
        l += tinycolor.equals(t, s) ? " sp-thumb-active" : "";
        var c = i.toString(o.preferredFormat || "rgb"),
            u = Be ? "background-color:" + i.toRgbString() : "filter:" + i.toFilter();
        r.push('<span title="' + c + '" data-color="' + i.toRgbString() + '" class="' + l + '"><span class="sp-thumb-inner" style="' + u + ';"></span></span>');
      } else r.push('<span class="sp-thumb-el sp-clear-display" ><span class="sp-clear-palette-only" style="background-color: transparent;"></span></span>');
    }

    return "<div class='sp-cf " + a + "'>" + r.join("") + "</div>";
  }

  function n(e, t) {
    var a,
        o,
        r,
        n,
        h = function (e, t) {
      e.locale = e.locale || window.navigator.language, e.locale && (e.locale = e.locale.split("-")[0].toLowerCase()), "en" != e.locale && De.spectrum.localization[e.locale] && (e = De.extend({}, De.spectrum.localization[e.locale], e));
      var a = De.extend({}, Ie, e);
      return a.callbacks = {
        move: Ge(a.move, t),
        change: Ge(a.change, t),
        show: Ge(a.show, t),
        hide: Ge(a.hide, t),
        beforeShow: Ge(a.beforeShow, t)
      }, a;
    }(t, e),
        s = h.type,
        d = "flat" == s,
        i = h.showSelectionPalette,
        l = h.localStorageKey,
        c = h.theme,
        u = h.callbacks,
        f = (a = Qe, function () {
      var e = this,
          t = arguments;
      r && clearTimeout(n), !r && n || (n = setTimeout(function () {
        n = null, a.apply(e, t);
      }, o));
    }),
        p = !(o = 10),
        g = !1,
        b = 0,
        m = 0,
        v = 0,
        x = 0,
        y = 0,
        T = 0,
        w = 0,
        _ = 0,
        k = 0,
        P = 0,
        C = 1,
        S = [],
        M = [],
        z = {},
        j = h.selectionPalette.slice(0),
        A = h.maxSelectionSize,
        R = "sp-dragging",
        F = !1,
        H = null,
        L = e.ownerDocument,
        O = (L.body, De(e)),
        Q = !1,
        E = De($e, L).addClass(c),
        N = E.find(".sp-picker-container"),
        D = E.find(".sp-color"),
        q = E.find(".sp-dragger"),
        I = E.find(".sp-hue"),
        V = E.find(".sp-slider"),
        W = E.find(".sp-alpha-inner"),
        B = E.find(".sp-alpha"),
        K = E.find(".sp-alpha-handle"),
        $ = E.find(".sp-input"),
        X = E.find(".sp-palette"),
        Y = E.find(".sp-initial"),
        G = E.find(".sp-cancel"),
        U = E.find(".sp-clear"),
        J = E.find(".sp-choose"),
        Z = E.find(".sp-palette-toggle"),
        ee = O.is("input"),
        te = (ee && "color" === O.attr("type") && Je(), ee && "color" == s),
        ae = te ? De(Ke).addClass(c).addClass(h.className).addClass(h.replacerClassName) : De([]),
        oe = te ? ae : O,
        re = ae.find(".sp-preview-inner"),
        ne = h.color || ee && O.val(),
        se = !1,
        ie = h.preferredFormat,
        le = !h.showButtons || h.clickoutFiresChange,
        ce = !ne,
        ue = h.allowEmpty,
        fe = null,
        he = null,
        de = null,
        pe = null,
        ge = O.attr("id");

    if (ge !== qe && 0 < ge.length) {
      var be = De('label[for="' + ge + '"]');
      be.length && be.on("click", function (e) {
        return e.preventDefault(), O.spectrum("show"), !1;
      });
    }

    function me() {
      if (h.showPaletteOnly && (h.showPalette = !0), Z.text(h.showPaletteOnly ? h.togglePaletteMoreText : h.togglePaletteLessText), h.palette) {
        S = h.palette.slice(0), M = De.isArray(S[0]) ? S : [S], z = {};

        for (var e = 0; e < M.length; e++) {
          for (var t = 0; t < M[e].length; t++) {
            var a = tinycolor(M[e][t]).toRgbString();
            z[a] = !0;
          }
        }

        h.showPaletteOnly && !ne && (ne = "" === S[0][0] ? S[0][0] : Object.keys(z)[0]);
      }

      E.toggleClass("sp-flat", d), E.toggleClass("sp-input-disabled", !h.showInput), E.toggleClass("sp-alpha-enabled", h.showAlpha), E.toggleClass("sp-clear-enabled", ue), E.toggleClass("sp-buttons-disabled", !h.showButtons), E.toggleClass("sp-palette-buttons-disabled", !h.togglePaletteOnly), E.toggleClass("sp-palette-disabled", !h.showPalette), E.toggleClass("sp-palette-only", h.showPaletteOnly), E.toggleClass("sp-initial-disabled", !h.showInitial), E.addClass(h.className).addClass(h.containerClassName), Qe();
    }

    function ve() {
      if (l) {
        try {
          var e = window.localStorage,
              t = e[l].split(",#");
          1 < t.length && (delete e[l], De.each(t, function (e, t) {
            xe(t);
          }));
        } catch (e) {}

        try {
          j = window.localStorage[l].split(";");
        } catch (e) {}
      }
    }

    function xe(e) {
      if (i) {
        var t = tinycolor(e).toRgbString();
        if (!z[t] && -1 === De.inArray(t, j)) for (j.push(t); j.length > A;) {
          j.shift();
        }
        if (l) try {
          window.localStorage[l] = j.join(";");
        } catch (e) {}
      }
    }

    function ye() {
      var a = Re(),
          e = De.map(M, function (e, t) {
        return Xe(e, a, "sp-palette-row sp-palette-row-" + t, h);
      });
      ve(), j && e.push(Xe(function () {
        var e = [];
        if (h.showPalette) for (var t = 0; t < j.length; t++) {
          var a = tinycolor(j[t]).toRgbString();
          z[a] || e.push(j[t]);
        }
        return e.reverse().slice(0, h.maxSelectionSize);
      }(), a, "sp-palette-row sp-palette-row-selection", h)), X.html(e.join(""));
    }

    function Te() {
      if (h.showInitial) {
        var e = se,
            t = Re();
        Y.html(Xe([e, t], t, "sp-palette-row-initial", h));
      }
    }

    function we() {
      (m <= 0 || b <= 0 || x <= 0) && Qe(), g = !0, E.addClass(R), H = null, O.trigger("dragstart.spectrum", [Re()]);
    }

    function _e() {
      g = !1, E.removeClass(R), O.trigger("dragstop.spectrum", [Re()]);
    }

    function ke(e) {
      if (F) F = !1;else if (null !== e && "" !== e || !ue) {
        var t = tinycolor(e);
        t.isValid() ? (Ae(t), Fe(), Oe()) : $.addClass("sp-validation-error");
      } else Ae(null), Fe(), Oe();
    }

    function Pe() {
      (p ? ze : Ce)();
    }

    function Ce() {
      var e = De.Event("beforeShow.spectrum");
      p ? Qe() : (O.trigger(e, [Re()]), !1 === u.beforeShow(Re()) || e.isDefaultPrevented() || (function () {
        for (var e = 0; e < Ve.length; e++) {
          Ve[e] && Ve[e].hide();
        }
      }(), p = !0, De(L).on("keydown.spectrum", Se), De(L).on("click.spectrum", Me), De(window).on("resize.spectrum", f), ae.addClass("sp-active"), E.removeClass("sp-hidden"), Qe(), He(), se = Re(), Te(), u.show(se), O.trigger("show.spectrum", [se])));
    }

    function Se(e) {
      27 === e.keyCode && ze();
    }

    function Me(e) {
      2 != e.button && (g || (le ? Oe(!0) : je(), ze()));
    }

    function ze() {
      p && !d && (p = !1, De(L).off("keydown.spectrum", Se), De(L).off("click.spectrum", Me), De(window).off("resize.spectrum", f), ae.removeClass("sp-active"), E.addClass("sp-hidden"), u.hide(Re()), O.trigger("hide.spectrum", [Re()]));
    }

    function je() {
      Ae(se, !0), Oe(!0);
    }

    function Ae(e, t) {
      var a, o;
      tinycolor.equals(e, Re()) ? He() : (e && e !== qe || !ue ? (ce = !1, o = (a = tinycolor(e)).toHsv(), _ = o.h % 360 / 360, k = o.s, P = o.v, C = o.a) : ce = !0, He(), a && a.isValid() && !t && (ie = h.preferredFormat || a.getFormat()));
    }

    function Re(e) {
      return e = e || {}, ue && ce ? null : tinycolor.fromRatio({
        h: _,
        s: k,
        v: P,
        a: Math.round(1e3 * C) / 1e3
      }, {
        format: e.format || ie
      });
    }

    function Fe() {
      He(), u.move(Re()), O.trigger("move.spectrum", [Re()]);
    }

    function He() {
      $.removeClass("sp-validation-error"), Le();
      var e = tinycolor.fromRatio({
        h: _,
        s: 1,
        v: 1
      });
      D.css("background-color", e.toHexString());
      var t = ie;
      C < 1 && (0 !== C || "name" !== t) && ("hex" !== t && "hex3" !== t && "hex6" !== t && "name" !== t || (t = "rgb"));
      var a = Re({
        format: t
      }),
          o = "";
      if (re.removeClass("sp-clear-display"), re.css("background-color", "transparent"), !a && ue) re.addClass("sp-clear-display");else {
        var r = a.toHexString(),
            n = a.toRgbString();

        if (Be || 1 === a.alpha ? re.css("background-color", n) : (re.css("background-color", "transparent"), re.css("filter", a.toFilter())), h.showAlpha) {
          var s = a.toRgb();
          s.a = 0;
          var i = tinycolor(s).toRgbString(),
              l = "linear-gradient(left, " + i + ", " + r + ")";
          We ? W.css("filter", tinycolor(i).toFilter({
            gradientType: 1
          }, r)) : (W.css("background", "-webkit-" + l), W.css("background", "-moz-" + l), W.css("background", "-ms-" + l), W.css("background", "linear-gradient(to right, " + i + ", " + r + ")"));
        }

        o = a.toString(t);
      }

      if (h.showInput && $.val(o), O.val(o), "text" == h.type || "component" == h.type) {
        var c = a;

        if (c && he) {
          var u = c.isLight() || c.getAlpha() < .4 ? "black" : "white";
          he.css("background-color", c.toRgbString()).css("color", u);
        } else he.css("background-color", pe).css("color", de);
      }

      h.showPalette && ye(), Te();
    }

    function Le() {
      var e = k,
          t = P;
      if (ue && ce) K.hide(), V.hide(), q.hide();else {
        K.show(), V.show(), q.show();
        var a = e * b,
            o = m - t * m;
        a = Math.max(-v, Math.min(b - v, a - v)), o = Math.max(-v, Math.min(m - v, o - v)), q.css({
          top: o + "px",
          left: a + "px"
        });
        var r = C * y;
        K.css({
          left: r - T / 2 + "px"
        });
        var n = _ * x;
        V.css({
          top: n - w + "px"
        });
      }
    }

    function Oe(e) {
      var t = Re(),
          a = !tinycolor.equals(t, se);
      t && (t.toString(ie), xe(t)), e && a && (u.change(t), F = !0, O.trigger("change", [t]));
    }

    function Qe() {
      var e, t, a, o, r, n, s, i, l, c, u, f;
      p && (b = D.width(), m = D.height(), v = q.height(), I.width(), x = I.height(), w = V.height(), y = B.width(), T = K.width(), d || (E.css("position", "absolute"), h.offset ? E.offset(h.offset) : E.offset((t = oe, a = (e = E).outerWidth(), o = e.outerHeight(), r = t.outerHeight(), n = e[0].ownerDocument, s = n.documentElement, i = s.clientWidth + De(n).scrollLeft(), l = s.clientHeight + De(n).scrollTop(), c = t.offset(), u = c.left, f = c.top, f += r, u -= Math.min(u, i < u + a && a < i ? Math.abs(u + a - i) : 0), {
        top: f -= Math.min(f, l < f + o && o < l ? Math.abs(+(o + r)) : 0),
        bottom: c.bottom,
        left: u,
        right: c.right,
        width: c.width,
        height: c.height
      }))), Le(), h.showPalette && ye(), O.trigger("reflow.spectrum"));
    }

    function Ee() {
      ze(), Q = !0, O.attr("disabled", !0), oe.addClass("sp-disabled");
    }

    !function () {
      if (We && E.find("*:not(input)").attr("unselectable", "on"), me(), fe = De('<span class="sp-original-input-container"></span>'), ["margin"].forEach(function (e) {
        fe.css(e, O.css(e));
      }), "block" == O.css("display") && fe.css("display", "flex"), te) O.after(ae).hide();else if ("text" == s) fe.addClass("sp-colorize-container"), O.addClass("spectrum sp-colorize").wrap(fe);else if ("component" == s) {
        O.addClass("spectrum").wrap(fe);
        var e = De(["<div class='sp-colorize-container sp-add-on'>", "<div class='sp-colorize'></div> ", "</div>"].join(""));
        e.width(O.outerHeight() + "px").css("border-radius", O.css("border-radius")).css("border", O.css("border")), O.addClass("with-add-on").before(e);
      }
      if (he = O.parent().find(".sp-colorize"), de = he.css("color"), pe = he.css("background-color"), ue || U.hide(), d) O.after(E).hide();else {
        var t = "parent" === h.appendTo ? O.parent() : De(h.appendTo);
        1 !== t.length && (t = De("body")), t.append(E);
      }

      function a(e) {
        return e.data && e.data.ignore ? (Ae(De(e.target).closest(".sp-thumb-el").data("color")), Fe()) : (Ae(De(e.target).closest(".sp-thumb-el").data("color")), Fe(), h.hideAfterPaletteSelect ? (Oe(!0), ze()) : Oe()), !1;
      }

      ve(), oe.on("click.spectrum touchstart.spectrum", function (e) {
        Q || Pe(), e.stopPropagation(), De(e.target).is("input") || e.preventDefault();
      }), !O.is(":disabled") && !0 !== h.disabled || Ee(), E.click(Ye), [$, O].forEach(function (t) {
        t.change(function () {
          ke(t.val());
        }), t.on("paste", function () {
          setTimeout(function () {
            ke(t.val());
          }, 1);
        }), t.keydown(function (e) {
          13 == e.keyCode && (ke(De(t).val()), t == O && ze());
        });
      }), G.text(h.cancelText), G.on("click.spectrum", function (e) {
        e.stopPropagation(), e.preventDefault(), je(), ze();
      }), U.attr("title", h.clearText), U.on("click.spectrum", function (e) {
        e.stopPropagation(), e.preventDefault(), ce = !0, Fe(), d && Oe(!0);
      }), J.text(h.chooseText), J.on("click.spectrum", function (e) {
        e.stopPropagation(), e.preventDefault(), We && $.is(":focus") && $.trigger("change"), $.hasClass("sp-validation-error") || (Oe(!0), ze());
      }), Z.text(h.showPaletteOnly ? h.togglePaletteMoreText : h.togglePaletteLessText), Z.on("click.spectrum", function (e) {
        e.stopPropagation(), e.preventDefault(), h.showPaletteOnly = !h.showPaletteOnly, h.showPaletteOnly || d || E.css("left", "-=" + (N.outerWidth(!0) + 5)), me();
      }), Ue(B, function (e, t, a) {
        C = e / y, ce = !1, a.shiftKey && (C = Math.round(10 * C) / 10), Fe();
      }, we, _e), Ue(I, function (e, t) {
        _ = parseFloat(t / x), ce = !1, h.showAlpha || (C = 1), Fe();
      }, we, _e), Ue(D, function (e, t, a) {
        if (a.shiftKey) {
          if (!H) {
            var o = k * b,
                r = m - P * m,
                n = Math.abs(e - o) > Math.abs(t - r);
            H = n ? "x" : "y";
          }
        } else H = null;

        var s = !H || "y" === H;
        H && "x" !== H || (k = parseFloat(e / b)), s && (P = parseFloat((m - t) / m)), ce = !1, h.showAlpha || (C = 1), Fe();
      }, we, _e), ne ? (Ae(ne), He(), ie = tinycolor(ne).format || h.preferredFormat, xe(ne)) : ("" === ne && Ae(ne), He()), d && Ce();
      var o = We ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
      X.on(o, ".sp-thumb-el", a), Y.on(o, ".sp-thumb-el:nth-child(1)", {
        ignore: !0
      }, a);
    }();
    var Ne = {
      show: Ce,
      hide: ze,
      toggle: Pe,
      reflow: Qe,
      option: function option(e, t) {
        return e === qe ? De.extend({}, h) : t === qe ? h[e] : (h[e] = t, "preferredFormat" === e && (ie = h.preferredFormat), void me());
      },
      enable: function enable() {
        Q = !1, O.attr("disabled", !1), oe.removeClass("sp-disabled");
      },
      disable: Ee,
      offset: function offset(e) {
        h.offset = e, Qe();
      },
      set: function set(e) {
        Ae(e), Oe();
      },
      get: Re,
      destroy: function destroy() {
        O.show().removeClass("spectrum with-add-on sp-colorize"), oe.off("click.spectrum touchstart.spectrum"), E.remove(), ae.remove(), he && he.css("background-color", pe).css("color", de);
        var e = O.closest(".sp-original-input-container");
        0 < e.length && e.after(O).remove(), Ve[Ne.id] = null;
      },
      container: E
    };
    return Ne.id = Ve.push(Ne) - 1, Ne;
  }

  function a() {}

  function Ye(e) {
    e.stopPropagation();
  }

  function Ge(e, t) {
    var a = Array.prototype.slice,
        o = a.call(arguments, 2);
    return function () {
      return e.apply(t, o.concat(a.call(arguments)));
    };
  }

  function Ue(s, i, t, e) {
    i = i || function () {}, t = t || function () {}, e = e || function () {};
    var l = document,
        c = !1,
        u = {},
        f = 0,
        h = 0,
        d = ("ontouchstart" in window),
        a = {};

    function p(e) {
      e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.returnValue = !1;
    }

    function o(e) {
      if (c) {
        if (We && l.documentMode < 9 && !e.button) return g();
        var t = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0],
            a = t && t.pageX || e.pageX,
            o = t && t.pageY || e.pageY,
            r = Math.max(0, Math.min(a - u.left, h)),
            n = Math.max(0, Math.min(o - u.top, f));
        d && p(e), i.apply(s, [r, n, e]);
      }
    }

    function g() {
      c && (De(l).off(a), De(l.body).removeClass("sp-dragging"), setTimeout(function () {
        e.apply(s, arguments);
      }, 0)), c = !1;
    }

    a.selectstart = p, a.dragstart = p, a["touchmove mousemove"] = o, a["touchend mouseup"] = g, De(s).on("touchstart mousedown", function (e) {
      (e.which ? 3 == e.which : 2 == e.button) || c || !1 !== t.apply(s, arguments) && (c = !0, f = De(s).height(), h = De(s).width(), u = De(s).offset(), De(l).on(a), De(l.body).addClass("sp-dragging"), o(e), p(e));
    });
  }

  function Je() {
    return De.fn.spectrum.inputTypeColorSupport();
  }

  var s = "spectrum.id";
  De.fn.spectrum = function (a, e) {
    if ("string" != typeof a) return this.spectrum("destroy").each(function () {
      var e = De.extend({}, De(this).data(), a);
      De(this).is("input") ? e.flat || "flat" == e.type ? e.type = "flat" : "color" == De(this).attr("type") ? e.type = "color" : e.type = e.type || "component" : e.type = "noInput";
      var t = n(this, e);
      De(this).data(s, t.id);
    });
    var o = this,
        r = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
      var e = Ve[De(this).data(s)];

      if (e) {
        var t = e[a];
        if (!t) throw new Error("Spectrum: no such method: '" + a + "'");
        "get" == a ? o = e.get() : "container" == a ? o = e.container : "option" == a ? o = e.option.apply(e, r) : "destroy" == a ? (e.destroy(), De(this).removeData(s)) : t.apply(e, r);
      }
    }), o;
  }, De.fn.spectrum.load = !0, De.fn.spectrum.loadOpts = {}, De.fn.spectrum.draggable = Ue, De.fn.spectrum.defaults = Ie, De.fn.spectrum.inputTypeColorSupport = function e() {
    if (void 0 === e._cachedResult) {
      var t = De("<input type='color'/>")[0];
      e._cachedResult = "color" === t.type && "" !== t.value;
    }

    return e._cachedResult;
  }, De.spectrum = {}, De.spectrum.localization = {}, De.spectrum.palettes = {}, De.fn.spectrum.processNativeColorInputs = function () {
    var e = De("input[type=color]");
    e.length && !Je() && e.spectrum({
      preferredFormat: "hex6"
    });
  }, function () {
    var n = /^[\s,#]+/,
        s = /\s+$/,
        o = 0,
        c = Math,
        i = c.round,
        u = c.min,
        f = c.max,
        e = c.random,
        h = function h(e, t) {
      if (t = t || {}, (e = e || "") instanceof h) return e;
      if (!(this instanceof h)) return new h(e, t);

      var a = function (e) {
        var t = {
          r: 0,
          g: 0,
          b: 0
        },
            a = 1,
            o = !1,
            r = !1;
        "string" == typeof e && (e = function (e) {
          e = e.replace(n, "").replace(s, "").toLowerCase();
          var t,
              a = !1;
          if (C[e]) e = C[e], a = !0;else if ("transparent" == e) return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            format: "name"
          };
          if (t = Q.rgb.exec(e)) return {
            r: t[1],
            g: t[2],
            b: t[3]
          };
          if (t = Q.rgba.exec(e)) return {
            r: t[1],
            g: t[2],
            b: t[3],
            a: t[4]
          };
          if (t = Q.hsl.exec(e)) return {
            h: t[1],
            s: t[2],
            l: t[3]
          };
          if (t = Q.hsla.exec(e)) return {
            h: t[1],
            s: t[2],
            l: t[3],
            a: t[4]
          };
          if (t = Q.hsv.exec(e)) return {
            h: t[1],
            s: t[2],
            v: t[3]
          };
          if (t = Q.hsva.exec(e)) return {
            h: t[1],
            s: t[2],
            v: t[3],
            a: t[4]
          };
          if (t = Q.hex8.exec(e)) return {
            a: function (e) {
              return A(e) / 255;
            }(t[1]),
            r: A(t[2]),
            g: A(t[3]),
            b: A(t[4]),
            format: a ? "name" : "hex8"
          };
          if (t = Q.hex6.exec(e)) return {
            r: A(t[1]),
            g: A(t[2]),
            b: A(t[3]),
            format: a ? "name" : "hex"
          };
          if (t = Q.hex3.exec(e)) return {
            r: A(t[1] + "" + t[1]),
            g: A(t[2] + "" + t[2]),
            b: A(t[3] + "" + t[3]),
            format: a ? "name" : "hex"
          };
          return !1;
        }(e));
        "object" == _typeof(e) && (e.hasOwnProperty("r") && e.hasOwnProperty("g") && e.hasOwnProperty("b") ? (t = function (e, t, a) {
          return {
            r: 255 * z(e, 255),
            g: 255 * z(t, 255),
            b: 255 * z(a, 255)
          };
        }(e.r, e.g, e.b), o = !0, r = "%" === String(e.r).substr(-1) ? "prgb" : "rgb") : e.hasOwnProperty("h") && e.hasOwnProperty("s") && e.hasOwnProperty("v") ? (e.s = F(e.s), e.v = F(e.v), t = function (e, t, a) {
          e = 6 * z(e, 360), t = z(t, 100), a = z(a, 100);
          var o = c.floor(e),
              r = e - o,
              n = a * (1 - t),
              s = a * (1 - r * t),
              i = a * (1 - (1 - r) * t),
              l = o % 6;
          return {
            r: 255 * [a, s, n, n, i, a][l],
            g: 255 * [i, a, a, s, n, n][l],
            b: 255 * [n, n, i, a, a, s][l]
          };
        }(e.h, e.s, e.v), o = !0, r = "hsv") : e.hasOwnProperty("h") && e.hasOwnProperty("s") && e.hasOwnProperty("l") && (e.s = F(e.s), e.l = F(e.l), t = function (e, t, a) {
          var o, r, n;

          function s(e, t, a) {
            return a < 0 && (a += 1), 1 < a && --a, a < 1 / 6 ? e + 6 * (t - e) * a : a < .5 ? t : a < 2 / 3 ? e + (t - e) * (2 / 3 - a) * 6 : e;
          }

          if (e = z(e, 360), t = z(t, 100), a = z(a, 100), 0 === t) o = r = n = a;else {
            var i = a < .5 ? a * (1 + t) : a + t - a * t,
                l = 2 * a - i;
            o = s(l, i, e + 1 / 3), r = s(l, i, e), n = s(l, i, e - 1 / 3);
          }
          return {
            r: 255 * o,
            g: 255 * r,
            b: 255 * n
          };
        }(e.h, e.s, e.l), o = !0, r = "hsl"), e.hasOwnProperty("a") && (a = e.a));
        return a = M(a), {
          ok: o,
          format: e.format || r,
          r: u(255, f(t.r, 0)),
          g: u(255, f(t.g, 0)),
          b: u(255, f(t.b, 0)),
          a: a
        };
      }(e);

      this._originalInput = e, this._r = a.r, this._g = a.g, this._b = a.b, this._a = a.a, this._roundA = i(1e3 * this._a) / 1e3, this._format = t.format || a.format, this._gradientType = t.gradientType, this._r < 1 && (this._r = i(this._r)), this._g < 1 && (this._g = i(this._g)), this._b < 1 && (this._b = i(this._b)), this._ok = a.ok, this._tc_id = o++;
    };

    function r(e, t, a) {
      e = z(e, 255), t = z(t, 255), a = z(a, 255);
      var o,
          r,
          n = f(e, t, a),
          s = u(e, t, a),
          i = (n + s) / 2;
      if (n == s) o = r = 0;else {
        var l = n - s;

        switch (r = .5 < i ? l / (2 - n - s) : l / (n + s), n) {
          case e:
            o = (t - a) / l + (t < a ? 6 : 0);
            break;

          case t:
            o = (a - e) / l + 2;
            break;

          case a:
            o = (e - t) / l + 4;
        }

        o /= 6;
      }
      return {
        h: o,
        s: r,
        l: i
      };
    }

    function l(e, t, a) {
      e = z(e, 255), t = z(t, 255), a = z(a, 255);
      var o,
          r,
          n = f(e, t, a),
          s = u(e, t, a),
          i = n,
          l = n - s;
      if (r = 0 === n ? 0 : l / n, n == s) o = 0;else {
        switch (n) {
          case e:
            o = (t - a) / l + (t < a ? 6 : 0);
            break;

          case t:
            o = (a - e) / l + 2;
            break;

          case a:
            o = (e - t) / l + 4;
        }

        o /= 6;
      }
      return {
        h: o,
        s: r,
        v: i
      };
    }

    function t(e, t, a, o) {
      var r = [R(i(e).toString(16)), R(i(t).toString(16)), R(i(a).toString(16))];
      return o && r[0].charAt(0) == r[0].charAt(1) && r[1].charAt(0) == r[1].charAt(1) && r[2].charAt(0) == r[2].charAt(1) ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0) : r.join("");
    }

    function d(e, t, a, o) {
      var r;
      return [R((r = o, Math.round(255 * parseFloat(r)).toString(16))), R(i(e).toString(16)), R(i(t).toString(16)), R(i(a).toString(16))].join("");
    }

    function a(e, t) {
      t = 0 === t ? 0 : t || 10;
      var a = h(e).toHsl();
      return a.s -= t / 100, a.s = j(a.s), h(a);
    }

    function p(e, t) {
      t = 0 === t ? 0 : t || 10;
      var a = h(e).toHsl();
      return a.s += t / 100, a.s = j(a.s), h(a);
    }

    function g(e) {
      return h(e).desaturate(100);
    }

    function b(e, t) {
      t = 0 === t ? 0 : t || 10;
      var a = h(e).toHsl();
      return a.l += t / 100, a.l = j(a.l), h(a);
    }

    function m(e, t) {
      t = 0 === t ? 0 : t || 10;
      var a = h(e).toRgb();
      return a.r = f(0, u(255, a.r - i(-t / 100 * 255))), a.g = f(0, u(255, a.g - i(-t / 100 * 255))), a.b = f(0, u(255, a.b - i(-t / 100 * 255))), h(a);
    }

    function v(e, t) {
      t = 0 === t ? 0 : t || 10;
      var a = h(e).toHsl();
      return a.l -= t / 100, a.l = j(a.l), h(a);
    }

    function x(e, t) {
      var a = h(e).toHsl(),
          o = (i(a.h) + t) % 360;
      return a.h = o < 0 ? 360 + o : o, h(a);
    }

    function y(e) {
      var t = h(e).toHsl();
      return t.h = (t.h + 180) % 360, h(t);
    }

    function T(e) {
      var t = h(e).toHsl(),
          a = t.h;
      return [h(e), h({
        h: (a + 120) % 360,
        s: t.s,
        l: t.l
      }), h({
        h: (a + 240) % 360,
        s: t.s,
        l: t.l
      })];
    }

    function w(e) {
      var t = h(e).toHsl(),
          a = t.h;
      return [h(e), h({
        h: (a + 90) % 360,
        s: t.s,
        l: t.l
      }), h({
        h: (a + 180) % 360,
        s: t.s,
        l: t.l
      }), h({
        h: (a + 270) % 360,
        s: t.s,
        l: t.l
      })];
    }

    function _(e) {
      var t = h(e).toHsl(),
          a = t.h;
      return [h(e), h({
        h: (a + 72) % 360,
        s: t.s,
        l: t.l
      }), h({
        h: (a + 216) % 360,
        s: t.s,
        l: t.l
      })];
    }

    function k(e, t, a) {
      t = t || 6, a = a || 30;
      var o = h(e).toHsl(),
          r = 360 / a,
          n = [h(e)];

      for (o.h = (o.h - (r * t >> 1) + 720) % 360; --t;) {
        o.h = (o.h + r) % 360, n.push(h(o));
      }

      return n;
    }

    function P(e, t) {
      t = t || 6;

      for (var a = h(e).toHsv(), o = a.h, r = a.s, n = a.v, s = [], i = 1 / t; t--;) {
        s.push(h({
          h: o,
          s: r,
          v: n
        })), n = (n + i) % 1;
      }

      return s;
    }

    h.prototype = {
      isDark: function isDark() {
        return this.getBrightness() < 128;
      },
      isLight: function isLight() {
        return !this.isDark();
      },
      isValid: function isValid() {
        return this._ok;
      },
      getOriginalInput: function getOriginalInput() {
        return this._originalInput;
      },
      getFormat: function getFormat() {
        return this._format;
      },
      getAlpha: function getAlpha() {
        return this._a;
      },
      getBrightness: function getBrightness() {
        var e = this.toRgb();
        return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3;
      },
      setAlpha: function setAlpha(e) {
        return this._a = M(e), this._roundA = i(1e3 * this._a) / 1e3, this;
      },
      toHsv: function toHsv() {
        var e = l(this._r, this._g, this._b);
        return {
          h: 360 * e.h,
          s: e.s,
          v: e.v,
          a: this._a
        };
      },
      toHsvString: function toHsvString() {
        var e = l(this._r, this._g, this._b),
            t = i(360 * e.h),
            a = i(100 * e.s),
            o = i(100 * e.v);
        return 1 == this._a ? "hsv(" + t + ", " + a + "%, " + o + "%)" : "hsva(" + t + ", " + a + "%, " + o + "%, " + this._roundA + ")";
      },
      toHsl: function toHsl() {
        var e = r(this._r, this._g, this._b);
        return {
          h: 360 * e.h,
          s: e.s,
          l: e.l,
          a: this._a
        };
      },
      toHslString: function toHslString() {
        var e = r(this._r, this._g, this._b),
            t = i(360 * e.h),
            a = i(100 * e.s),
            o = i(100 * e.l);
        return 1 == this._a ? "hsl(" + t + ", " + a + "%, " + o + "%)" : "hsla(" + t + ", " + a + "%, " + o + "%, " + this._roundA + ")";
      },
      toHex: function toHex(e) {
        return t(this._r, this._g, this._b, e);
      },
      toHexString: function toHexString(e) {
        return "#" + this.toHex(e);
      },
      toHex8: function toHex8() {
        return d(this._r, this._g, this._b, this._a);
      },
      toHex8String: function toHex8String() {
        return "#" + this.toHex8();
      },
      toRgb: function toRgb() {
        return {
          r: i(this._r),
          g: i(this._g),
          b: i(this._b),
          a: this._a
        };
      },
      toRgbString: function toRgbString() {
        return 1 == this._a ? "rgb(" + i(this._r) + ", " + i(this._g) + ", " + i(this._b) + ")" : "rgba(" + i(this._r) + ", " + i(this._g) + ", " + i(this._b) + ", " + this._roundA + ")";
      },
      toPercentageRgb: function toPercentageRgb() {
        return {
          r: i(100 * z(this._r, 255)) + "%",
          g: i(100 * z(this._g, 255)) + "%",
          b: i(100 * z(this._b, 255)) + "%",
          a: this._a
        };
      },
      toPercentageRgbString: function toPercentageRgbString() {
        return 1 == this._a ? "rgb(" + i(100 * z(this._r, 255)) + "%, " + i(100 * z(this._g, 255)) + "%, " + i(100 * z(this._b, 255)) + "%)" : "rgba(" + i(100 * z(this._r, 255)) + "%, " + i(100 * z(this._g, 255)) + "%, " + i(100 * z(this._b, 255)) + "%, " + this._roundA + ")";
      },
      toName: function toName() {
        return 0 === this._a ? "transparent" : !(this._a < 1) && (S[t(this._r, this._g, this._b, !0)] || !1);
      },
      toFilter: function toFilter(e) {
        var t = "#" + d(this._r, this._g, this._b, this._a),
            a = t,
            o = this._gradientType ? "GradientType = 1, " : "";
        e && (a = h(e).toHex8String());
        return "progid:DXImageTransform.Microsoft.gradient(" + o + "startColorstr=" + t + ",endColorstr=" + a + ")";
      },
      toString: function toString(e) {
        var t = !!e;
        e = e || this._format;
        var a = !1,
            o = this._a < 1 && 0 <= this._a;
        return t || !o || "hex" !== e && "hex6" !== e && "hex3" !== e && "name" !== e ? ("rgb" === e && (a = this.toRgbString()), "prgb" === e && (a = this.toPercentageRgbString()), "hex" !== e && "hex6" !== e || (a = this.toHexString()), "hex3" === e && (a = this.toHexString(!0)), "hex8" === e && (a = this.toHex8String()), "name" === e && (a = this.toName()), "hsl" === e && (a = this.toHslString()), "hsv" === e && (a = this.toHsvString()), a || this.toHexString()) : "name" === e && 0 === this._a ? this.toName() : this.toRgbString();
      },
      _applyModification: function _applyModification(e, t) {
        var a = e.apply(null, [this].concat([].slice.call(t)));
        return this._r = a._r, this._g = a._g, this._b = a._b, this.setAlpha(a._a), this;
      },
      lighten: function lighten() {
        return this._applyModification(b, arguments);
      },
      brighten: function brighten() {
        return this._applyModification(m, arguments);
      },
      darken: function darken() {
        return this._applyModification(v, arguments);
      },
      desaturate: function desaturate() {
        return this._applyModification(a, arguments);
      },
      saturate: function saturate() {
        return this._applyModification(p, arguments);
      },
      greyscale: function greyscale() {
        return this._applyModification(g, arguments);
      },
      spin: function spin() {
        return this._applyModification(x, arguments);
      },
      _applyCombination: function _applyCombination(e, t) {
        return e.apply(null, [this].concat([].slice.call(t)));
      },
      analogous: function analogous() {
        return this._applyCombination(k, arguments);
      },
      complement: function complement() {
        return this._applyCombination(y, arguments);
      },
      monochromatic: function monochromatic() {
        return this._applyCombination(P, arguments);
      },
      splitcomplement: function splitcomplement() {
        return this._applyCombination(_, arguments);
      },
      triad: function triad() {
        return this._applyCombination(T, arguments);
      },
      tetrad: function tetrad() {
        return this._applyCombination(w, arguments);
      }
    }, h.fromRatio = function (e, t) {
      if ("object" == _typeof(e)) {
        var a = {};

        for (var o in e) {
          e.hasOwnProperty(o) && (a[o] = "a" === o ? e[o] : F(e[o]));
        }

        e = a;
      }

      return h(e, t);
    }, h.equals = function (e, t) {
      return !(!e || !t) && h(e).toRgbString() == h(t).toRgbString();
    }, h.random = function () {
      return h.fromRatio({
        r: e(),
        g: e(),
        b: e()
      });
    }, h.mix = function (e, t, a) {
      a = 0 === a ? 0 : a || 50;
      var o,
          r = h(e).toRgb(),
          n = h(t).toRgb(),
          s = a / 100,
          i = 2 * s - 1,
          l = n.a - r.a,
          c = 1 - (o = ((o = i * l == -1 ? i : (i + l) / (1 + i * l)) + 1) / 2),
          u = {
        r: n.r * o + r.r * c,
        g: n.g * o + r.g * c,
        b: n.b * o + r.b * c,
        a: n.a * s + r.a * (1 - s)
      };
      return h(u);
    }, h.readability = function (e, t) {
      var a = h(e),
          o = h(t),
          r = a.toRgb(),
          n = o.toRgb(),
          s = a.getBrightness(),
          i = o.getBrightness(),
          l = Math.max(r.r, n.r) - Math.min(r.r, n.r) + Math.max(r.g, n.g) - Math.min(r.g, n.g) + Math.max(r.b, n.b) - Math.min(r.b, n.b);
      return {
        brightness: Math.abs(s - i),
        color: l
      };
    }, h.isReadable = function (e, t) {
      var a = h.readability(e, t);
      return 125 < a.brightness && 500 < a.color;
    }, h.mostReadable = function (e, t) {
      for (var a = null, o = 0, r = !1, n = 0; n < t.length; n++) {
        var s = h.readability(e, t[n]),
            i = 125 < s.brightness && 500 < s.color,
            l = s.brightness / 125 * 3 + s.color / 500;
        (i && !r || i && r && o < l || !i && !r && o < l) && (r = i, o = l, a = h(t[n]));
      }

      return a;
    };

    var C = h.names = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "0ff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "00f",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      burntsienna: "ea7e5d",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "0ff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "f0f",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32"
    },
        S = h.hexNames = function (e) {
      var t = {};

      for (var a in e) {
        e.hasOwnProperty(a) && (t[e[a]] = a);
      }

      return t;
    }(C);

    function M(e) {
      return e = parseFloat(e), (isNaN(e) || e < 0 || 1 < e) && (e = 1), e;
    }

    function z(e, t) {
      var a;
      "string" == typeof (a = e) && -1 != a.indexOf(".") && 1 === parseFloat(a) && (e = "100%");
      var o,
          r = "string" == typeof (o = e) && -1 != o.indexOf("%");
      return e = u(t, f(0, parseFloat(e))), r && (e = parseInt(e * t, 10) / 100), c.abs(e - t) < 1e-6 ? 1 : e % t / parseFloat(t);
    }

    function j(e) {
      return u(1, f(0, e));
    }

    function A(e) {
      return parseInt(e, 16);
    }

    function R(e) {
      return 1 == e.length ? "0" + e : "" + e;
    }

    function F(e) {
      return e <= 1 && (e = 100 * e + "%"), e;
    }

    var H,
        L,
        O,
        Q = (L = "[\\s|\\(]+(" + (H = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)") + ")[,|\\s]+(" + H + ")[,|\\s]+(" + H + ")\\s*\\)?", O = "[\\s|\\(]+(" + H + ")[,|\\s]+(" + H + ")[,|\\s]+(" + H + ")[,|\\s]+(" + H + ")\\s*\\)?", {
      rgb: new RegExp("rgb" + L),
      rgba: new RegExp("rgba" + O),
      hsl: new RegExp("hsl" + L),
      hsla: new RegExp("hsla" + O),
      hsv: new RegExp("hsv" + L),
      hsva: new RegExp("hsva" + O),
      hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    });
    window.tinycolor = h;
  }(), De(function () {
    De.fn.spectrum.load && De.fn.spectrum.processNativeColorInputs();
  });
}), jQuery.spectrum.localization.ar = {
  cancelText: "إلغاء",
  chooseText: "إختار",
  clearText: "إرجاع الألوان على ما كانت",
  noColorSelectedText: "لم تختار أي لون",
  togglePaletteMoreText: "أكثر",
  togglePaletteLessText: "أقل"
}, jQuery.spectrum.localization.ca = {
  cancelText: "Cancel·lar",
  chooseText: "Escollir",
  clearText: "Esborrar color seleccionat",
  noColorSelectedText: "Cap color seleccionat",
  togglePaletteMoreText: "Més",
  togglePaletteLessText: "Menys"
}, jQuery.spectrum.localization.cs = {
  cancelText: "zrušit",
  chooseText: "vybrat",
  clearText: "Resetovat výměr barev",
  noColorSelectedText: "Žádná barva nebyla vybrána",
  togglePaletteMoreText: "více",
  togglePaletteLessText: "méně"
}, jQuery.spectrum.localization.de = {
  cancelText: "Abbrechen",
  chooseText: "Wählen",
  clearText: "Farbauswahl zurücksetzen",
  noColorSelectedText: "Keine Farbe ausgewählt",
  togglePaletteMoreText: "Mehr",
  togglePaletteLessText: "Weniger"
}, jQuery.spectrum.localization.dk = {
  cancelText: "annuller",
  chooseText: "Vælg"
}, jQuery.spectrum.localization.es = {
  cancelText: "Cancelar",
  chooseText: "Elegir",
  clearText: "Borrar color seleccionado",
  noColorSelectedText: "Ningún color seleccionado",
  togglePaletteMoreText: "Más",
  togglePaletteLessText: "Menos"
}, jQuery.spectrum.localization.et = {
  cancelText: "Katkesta",
  chooseText: "Vali",
  clearText: "Tühista värvivalik",
  noColorSelectedText: "Ühtki värvi pole valitud",
  togglePaletteMoreText: "Rohkem",
  togglePaletteLessText: "Vähem"
}, jQuery.spectrum.localization.fa = {
  cancelText: "لغو",
  chooseText: "انتخاب",
  clearText: "تنظیم مجدد رنگ",
  noColorSelectedText: "هیچ رنگی انتخاب نشده است!",
  togglePaletteMoreText: "بیشتر",
  togglePaletteLessText: "کمتر"
}, jQuery.spectrum.localization.fi = {
  cancelText: "Kumoa",
  chooseText: "Valitse"
}, jQuery.spectrum.localization.fr = {
  cancelText: "Annuler",
  chooseText: "Valider",
  clearText: "Effacer couleur sélectionnée",
  noColorSelectedText: "Aucune couleur sélectionnée",
  togglePaletteMoreText: "Plus",
  togglePaletteLessText: "Moins"
}, jQuery.spectrum.localization.gr = {
  cancelText: "Ακύρωση",
  chooseText: "Επιλογή",
  clearText: "Καθαρισμός επιλεγμένου χρώματος",
  noColorSelectedText: "Δεν έχει επιλεχθεί κάποιο χρώμα",
  togglePaletteMoreText: "Περισσότερα",
  togglePaletteLessText: "Λιγότερα"
}, jQuery.spectrum.localization.he = {
  cancelText: "בטל בחירה",
  chooseText: "בחר צבע",
  clearText: "אפס בחירה",
  noColorSelectedText: "לא נבחר צבע",
  togglePaletteMoreText: "עוד צבעים",
  togglePaletteLessText: "פחות צבעים"
}, jQuery.spectrum.localization.hr = {
  cancelText: "Odustani",
  chooseText: "Odaberi",
  clearText: "Poništi odabir",
  noColorSelectedText: "Niti jedna boja nije odabrana",
  togglePaletteMoreText: "Više",
  togglePaletteLessText: "Manje"
}, jQuery.spectrum.localization.hu = {
  cancelText: "Mégsem",
  chooseText: "Mentés",
  clearText: "A színválasztás visszaállítása",
  noColorSelectedText: "Nincs szín kijelölve",
  togglePaletteMoreText: "Több",
  togglePaletteLessText: "Kevesebb"
}, jQuery.spectrum.localization.id = {
  cancelText: "Batal",
  chooseText: "Pilih",
  clearText: "Hapus Pilihan Warna",
  noColorSelectedText: "Warna Tidak Dipilih",
  togglePaletteMoreText: "tambah",
  togglePaletteLessText: "kurangi"
}, jQuery.spectrum.localization.it = {
  cancelText: "annulla",
  chooseText: "scegli",
  clearText: "Annulla selezione colore",
  noColorSelectedText: "Nessun colore selezionato"
}, jQuery.spectrum.localization.ja = {
  cancelText: "中止",
  chooseText: "選択"
}, jQuery.spectrum.localization.ko = {
  cancelText: "취소",
  chooseText: "선택",
  clearText: "선택 초기화",
  noColorSelectedText: "선택된 색상 없음",
  togglePaletteMoreText: "더보기",
  togglePaletteLessText: "줄이기"
}, jQuery.spectrum.localization.lt = {
  cancelText: "Atšaukti",
  chooseText: "Pasirinkti",
  clearText: "Išvalyti pasirinkimą",
  noColorSelectedText: "Spalva nepasirinkta",
  togglePaletteMoreText: "Daugiau",
  togglePaletteLessText: "Mažiau"
}, jQuery.spectrum.localization["nb-no"] = {
  cancelText: "Avbryte",
  chooseText: "Velg",
  clearText: "Tilbakestill",
  noColorSelectedText: "Farge er ikke valgt",
  togglePaletteMoreText: "Mer",
  togglePaletteLessText: "Mindre"
}, jQuery.spectrum.localization["nl-nl"] = {
  cancelText: "Annuleer",
  chooseText: "Kies",
  clearText: "Wis kleur selectie",
  togglePaletteMoreText: "Meer",
  togglePaletteLessText: "Minder"
}, jQuery.spectrum.localization.pl = {
  cancelText: "Anuluj",
  chooseText: "Wybierz",
  clearText: "Usuń wybór koloru",
  noColorSelectedText: "Nie wybrano koloru",
  togglePaletteMoreText: "Więcej",
  togglePaletteLessText: "Mniej"
}, jQuery.spectrum.localization["pt-br"] = {
  cancelText: "Cancelar",
  chooseText: "Escolher",
  clearText: "Limpar cor selecionada",
  noColorSelectedText: "Nenhuma cor selecionada",
  togglePaletteMoreText: "Mais",
  togglePaletteLessText: "Menos"
}, jQuery.spectrum.localization["pt-pt"] = {
  cancelText: "Cancelar",
  chooseText: "Escolher",
  clearText: "Limpar cor seleccionada",
  noColorSelectedText: "Nenhuma cor seleccionada",
  togglePaletteMoreText: "Mais",
  togglePaletteLessText: "Menos"
}, jQuery.spectrum.localization.ru = {
  cancelText: "Отмена",
  chooseText: "Выбрать",
  clearText: "Сбросить",
  noColorSelectedText: "Цвет не выбран",
  togglePaletteMoreText: "Ещё",
  togglePaletteLessText: "Скрыть"
}, jQuery.spectrum.localization.sv = {
  cancelText: "Avbryt",
  chooseText: "Välj"
}, jQuery.spectrum.localization.tr = {
  cancelText: "iptal",
  chooseText: "tamam"
}, jQuery.spectrum.localization["zh-cn"] = {
  cancelText: "取消",
  chooseText: "选择",
  clearText: "清除",
  togglePaletteMoreText: "更多选项",
  togglePaletteLessText: "隐藏",
  noColorSelectedText: "尚未选择任何颜色"
}, jQuery.spectrum.localization["zh-tw"] = {
  cancelText: "取消",
  chooseText: "選擇",
  clearText: "清除",
  togglePaletteMoreText: "更多選項",
  togglePaletteLessText: "隱藏",
  noColorSelectedText: "尚未選擇任何顏色"
};
