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
    var obj = this.element;
    upl = $(this.element).find('input[type="file"]');

    if ($(this.element).find('.ajaxupload-value').val() != '') {
      $(this.element).addClass('has-file');
    }

    $(this.element).find('.ajaxupload-reset').on('click', function () {
      self.reset();
    });
    upl.on('change', function () {
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
        data: formData
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
      });
    });
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
$.extend($.ascent.AjaxUpload, {}); // ******
// Custom form component to enter & edit bible refs
// Expects incoming data from Laravel Eloquent
// ******
// Code (c) Kieran Metcalfe / Ascent Creative 2021

$.ascent = $.ascent ? $.ascent : {};
var AjaxUploadMulti = {
  options: {
    disk: 'public',
    path: 'ajaxuploads',
    preserveFilename: false,
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
    $(item).ajaxuploadmultifile();

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
    formData.append('disk', 'public'); //self.options.disk);

    formData.append('path', 'ajaxuploads'); //self.options.path);

    formData.append('preserveFilename', 1); //self.options.preserveFilename?1:0);

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
      data: formData
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
// Code (c) Kieran Metcalfe / Ascent Creative 2022

$.ascent = $.ascent ? $.ascent : {};
var ForeignKeySelectAutoComplete = {
  // Default options.
  options: {
    source: ''
  },
  _init: function _init() {
    var self = this;
    console.log(this.options.source);

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
$.extend($.ascent.ForeignKeySelectAutoComplete, {});
$(document).ready(function () {// $('.cms-relatedtokens').relatedtokens();
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
