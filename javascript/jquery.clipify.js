/*!
 * jquery.clipify v0.0.1
 *
 * Copyright (c) 2012 Takayuki Sugita, http://github.com/sugilog
 * Released under the MIT License
*/

jQuery.clipify = {};

(function(jQuery){
  if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    }
  }

  jQuery.clipify.swfLoaded = false;

  // define text to set clipboard, return String.
  jQuery.clipify.setCopyText = function(target){
    return target.data().clipify || target.text().trim();
  };

  // define callback on mouseover clipify target, after setCopyText
  jQuery.clipify.onMouseover = function(target){
    console.log("mouseover");
    console.log(target);
  };

  // define callback after set clipboard.
  jQuery.clipify.afterClick = function(_copiedText){
    alert("copied: " + _copiedText);
  };

  jQuery.fn.clipify = function(options){
    if (jQuery.clipify.swfLoaded) {
      return
    }

    var _this = this;
    var selectors = {
      clipifyId: "clipify_swf",
      target:    "clipify_target",
      current:   "clipify_current_target"
    }

    clipifyArea = {
      height: 15,
      width:  15
    }

    options = options || {};
    options.url = options.url || "Clipify.swf";
    options.mode = options.mode || "";

    jQuery(_this).css({border: "1px solid #666666"}).append(
      jQuery("<object>").css({top: 0, left: 0, position: "absolute"}).prop({id: selectors.clipifyId, data: options.url, name: selectors.clipifyId, type: "application/x-shockwave-flash", width: clipifyArea.width, height: clipifyArea.height})
        .append( jQuery("<param>").prop({name: "menu", value: false}) )
        .append( jQuery("<param>").prop({name: "allowscriptaccess", value: "always"}) )
        // FIXME
        //.append( jQuery("<param>").prop({name: "wmode", value: "transparent"}) )
        .append( jQuery("<param>").prop({name: "flashvars", value: ("mode=" + options.mode)}) )
    );

    jQuery.clipify.swfLoaded = true

    var _swf = function(){
      return document[selectors.clipifyId] || window[selectors.clipifyId];
    };

    var _setClipify = function(_copyText){
      _swf().setClipify(_copyText);
    };

    var _setCurrentTarget = function(currentTarget){
      jQuery("." + selectors.target).removeClass(selectors.current);
      currentTarget.addClass(selectors.current);
    };

    jQuery("." + selectors.target).on("mouseover", function(_event){
      var target = jQuery(_event.target);
      var _copyText = jQuery.clipify.setCopyText(target);
      _setClipify(_copyText);

      _setCurrentTarget(target);

      jQuery(_this).css({position: "absolute"}).css(target.position()).css(clipifyArea);

      jQuery.clipify.onMouseover(target);

      jQuery(this).on("mousemove.clipify", function(_event){
        jQuery(_this).css({top: _event.pageY - 10, left: _event.pageX - 5});
      });
    });

    jQuery("." + selectors.target).on("mouseout", function(){
      jQuery(this).off("mousemove.clipify");
    })
  };
})(jQuery);
