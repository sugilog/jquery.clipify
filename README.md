jquery.clipify
========================================

jquery plugin to copy text

Usage
------------------------------------------------------------

    <div id="[clipify_swf_container]"></div>
    <span class="clipify_target">hoge</span>
    <span class="clipify_target" data-clipify="some text">hoge</span>
    $(clipify_swf_container).clipify(options);

<dl>
  <dt>clipify_swf_container</dt>
  <dd>
    swf container to append Clipify.swf
  </dd>
  <dt>clipify_target</dt>
  <dd>
    selector `.clipify_target` will be click-and-copy element
  </dd>
  <dt>copyText</dt>
  <dd>
    Clipify default setting is `$([clicked]".clipify_target").data().clipify || $([clicked]".clipify_target").text()`
    <br />
    You can change the behavior with `$.clipify.setCopyText`.
  </dd>
</dl>


Callback functions
------------------------------------------------------------
<dl>
  <dt>[String] `$.clipify.setCopyText(targetElement)`</dt>
  <dd>
    setCopyText call after mouse-over `.clipify_target`.
    <br />
    `targetElement` is mouse-over-ed element.
  </dd>
  <dt>[Void] `$.clipify.afterClick(copiedText)`</dt>
  <dd>
    afterClick call after set text to clipboard by swf.
    <br />
    default setting is `alert("copied: " + copiedText);`.
  </dd>
  <dt>[Void] `$.clipify.onMouseOver(targetElement)`</dt>
  <dd>
    !!EXPERIMENTAL!!
    <br />
    onMouseOver call on mouseover event, after setCopyText called
  </dd>`
</dl>


Options
------------------------------------------------------------
<dl>
  <dt>url</dt>
  <dd>
    [String] url for Clipify.swf location
    <br />
    default is [document path]/Clipify.swf
  <dt>mode</dt>
  <dd>
    [String] mode type for debuging
    <br />
    default is "undefined" for no-debuging mode
    <br />
    "debug" is debuging mode, messages output to console
  </dd>
</dl>


Licence
------------------------------------------------------------
jquery.clipify is licenced under the MIT License.


