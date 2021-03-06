/*!
 * jquery.clipify v0.0.1
 *
 * Copyright (c) 2012 Takayuki Sugita, http://github.com/sugilog
 * Released under the MIT License
*/

package
{
  import flash.display.Sprite;
  import flash.display.LoaderInfo;
  import flash.system.*;
  import flash.events.MouseEvent;
  import flash.external.ExternalInterface;
  import flash.ui.Mouse;
  import flash.ui.MouseCursor;

  public class Clipify extends Sprite
  {
    private var _copyText:String;
    private var _debug:Boolean = false;

    public function Clipify()
    {
      _copyText = "";
      _setMode();
      onCreate();
    }

    private function onCreate():void
    {
      Security.allowDomain("*");

      if(ExternalInterface.available)
      {
        ExternalInterface.addCallback("setClipify", onMouseOver);
      }

      stage.addEventListener(MouseEvent.CLICK, onClick);
      Mouse.cursor = MouseCursor.BUTTON;
    }

    private function onMouseOver(text:String):void
    {
      this._copyText = text;
      _logger("set copytext: " + this._copyText);
    }

    private function onClick(event:MouseEvent):void
    {
      System.setClipboard(this._copyText);
      _logger("set clipboard: " + this._copyText);
      afterClick();
    }

    private function afterClick():void
    {
      ExternalInterface.call("(function(){ jQuery.clipify.afterClick('" + this._copyText.replace(/\r\n|\r|\n/g, "\\n") + "'); })");
      _logger("afterClick");
    }

    private function _setMode():void
    {
      var flashvars:Object = LoaderInfo(this.root.loaderInfo).parameters;
      var mode:String = String(flashvars["mode"]);

      if (mode == "debug")
      {
        this._debug = true;
      }
    }

    private function _logger(msg:String):void
    {
      if (this._debug)
      {
        ExternalInterface.call("console.log", msg);
      }
    }
  }
}
