/*!
 * jquery.clipify v0.0.1
 *
 * Copyright (c) 2012 Takayuki Sugita, http://github.com/sugilog
 * Released under the MIT License
*/

jQuery.clipify = {};

(function(jQuery){
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
    if (jQuery.clipify.swfLoaded){
      return
    }

    var _this = this;
    var selectors = {
      appendId:  "clipify_object",
      clipifyId: "clipify_swf",
      target:    "clipify_target",
      current:   "clipify_current_target"
    }

    options = options || {};
    options.url = options.url || "Clipify.swf"
    options.mode = options.mode || "";

    jQuery(this).append(
      jQuery("<span>").prop("id", selectors.appendId)
    );

    var flashvars  = { mode: options.mode }
    var params     = { menu: false, allowscriptaccess: "always", wmode: "transparent" };
    var attributes = { id: selectors.clipifyId, name: selectors.clipifyId };
    swfobject.embedSWF(options.url, selectors.appendId, "0", "0", "9.0.0", "", flashvars, params, attributes);

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

      jQuery(_this).css({position: "absolute"}).css(target.position());
      jQuery(_swf()).css({width: target.width(), height: target.height()});

      jQuery.clipify.onMouseover(target);
    });
  };
})(jQuery);
