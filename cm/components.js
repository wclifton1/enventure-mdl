function MaterialComponentsNav() {
    "use strict";
    this.element_ = document.querySelector(".mdl-js-components"),
    this.element_ && (this.componentLinks = this.element_.querySelectorAll(".mdl-components__link"),
    this.activeLink = null,
    this.activePage = null,
    this.init())
}
MaterialComponentsNav.prototype.linksMap_ = {},
MaterialComponentsNav.prototype.CssClasses_ = {
    ACTIVE: "is-active"
},
MaterialComponentsNav.prototype.init = function() {
    "use strict";
    for (var t = 0; t < this.componentLinks.length; t++)
        this.componentLinks[t].addEventListener("click", this.clickHandler(this.componentLinks[t])),
        this.linksMap_["#" + this.componentLinks[t].href.split("#")[1]] = this.componentLinks[t];
    if (this.displaySectionForFragment(window.location.hash.split("/")[0]),
    "onhashchange"in window) {
        var s = this;
        window.onhashchange = function() {
            s.displaySectionForFragment(window.location.hash.split("/")[0])
        }
    }
}
,
MaterialComponentsNav.prototype.displaySectionForFragment = function(t) {
    "use strict";
    t && this.linksMap_[t] && this.linksMap_[t].click ? this.linksMap_[t].click() : t && "" !== t && "#" !== t || this.displayIndexPage()
}
,
MaterialComponentsNav.prototype.displayIndexPage = function() {
    "use strict";
    this.activeLink && this.activeLink.classList.remove(this.CssClasses_.ACTIVE),
    this.activeLink = null,
    this.activePage && this.activePage.classList.remove(this.CssClasses_.ACTIVE),
    this.activePage = this.element_.querySelector("#index-section"),
    this.activePage.classList.add(this.CssClasses_.ACTIVE)
}
,
MaterialComponentsNav.prototype.clickHandler = function(t) {
    "use strict";
    return function(s) {
        s.preventDefault();
        var i = this.findPage(t);
        this.activePage && this.activePage.classList.remove(this.CssClasses_.ACTIVE),
        this.activeLink && this.activeLink.classList.remove(this.CssClasses_.ACTIVE),
        this.activePage = i,
        this.activeLink = t,
        t.classList.add(this.CssClasses_.ACTIVE),
        i.classList.add(this.CssClasses_.ACTIVE);
        var e = window.location.hash.split("/")[0]
          , n = t.href.split("#")[1];
        return e !== "#" + n && (history.pushState(null, "Material Design Lite", t),
        document.getElementById("content").scrollTop = 0,
        ga && ga("send", "pageview", "/components/" + n)),
        !0
    }
    .bind(this)
}
,
MaterialComponentsNav.prototype.findPage = function(t) {
    "use strict";
    var s = t.href.split("#")[1];
    return this.element_.querySelector("#" + s)
}
,
window.addEventListener("load", function() {
    "use strict";
    new MaterialComponentsNav
});
