!function(a) {
	"use strict";
	a.fn.swipeEvents = function() {
		return this.each(function() {
			function e(a) {
				var e = a.originalEvent.touches;
				e && e.length && (b = e[0].pageX, c = e[0].pageY, d.bind("touchmove", f))
			}
			function f(a) {
				var e = a.originalEvent.touches;
				if (e && e.length) {
					var g = b - e[0].pageX,
						h = c - e[0].pageY;
					g >= 50 && d.trigger("swipeLeft"), -50 >= g && d.trigger("swipeRight"), h >= 50 && d.trigger("swipeUp"), -50 >= h && d.trigger("swipeDown"), (Math.abs(g) >= 50 || Math.abs(h) >= 50) && d.unbind("touchmove", f)
				}
			}
			var b, c, d = a(this);
			d.bind("touchstart", e)
		})
	};
	var b = function(b, c) {
			this.container = "string" == typeof b ? a(b) : b;
			var d = this.config;
			return this.config = a.extend(!0, d, c || {}), this.version = "1.2.1", this.index = 0, this.doms = [], this.dotsDoms = [], this.navDoms = [], this.sLock = !0, this.section = a(this.config.section, this.container), this.pageLength = this.section.length, this.pageLength ? (this.init(), void 0) : !1
		};
	b.prototype = {
		config: {
			section: "section",
			navgation: ["nav", "li", "data-index"],
			direction: "vertical",
			easing: "ease",
			animationTime: 1e3,
			currentClass: "current",
			hideScrollBar: !0,
			dots: !0,
			keyboard: !0,
			loop: !1,
			callback: function() {}
		},
		supportCss: function(a) {
			var b = document.documentElement.style,
				c = ["Webkit", "Moz", "ms", "O"],
				d = c.length,
				e = 0;
			if (a in b) return !0;
			for (a = a.replace(/^[a-z]/, function(a) {
				return a.toUpperCase()
			}), e; d > e; e++) if (c[e] + a in b) return !0;
			return !1
		},
		moveUp: function() {
			if (this.index > 0) this.index--;
			else {
				if (!this.config.loop) return;
				this.index = this.pageLength - 1
			}
			this.moveTo(this.index)
		},
		moveDown: function() {
			if (this.index < this.pageLength - 1) this.index++;
			else {
				if (!this.config.loop) return;
				this.index = 0
			}
			this.moveTo(this.index)
		},
		moveTo: function(a) {
			return 0 > a || a > this.pageLength - 1 ? !1 : (this.transLate(a), void 0)
		},
		transLate: function(a) {
			var b = this,
				c = b.config,
				d = -1 * Math.floor(100 * a / b.pageLength).toFixed(2);
			if (b.sLock = !1, b.index = a, b.supportCss("transform") && b.supportCss("transition")) {
				var e = "all " + c.animationTime + "ms " + c.easing,
					f = "";
				"vertical" == c.direction ? f = "translate3d(0," + d + "%,0)" : "horizontal" == c.direction && (f = "translate3d(" + d + "%,0,0)"), b.container.css({
					WebkitTransition: e,
					MozTransition: e,
					msTransition: e,
					transition: e,
					WebkitTransform: f,
					MozTransform: f,
					msTransform: f,
					transform: f
				}).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
					b.sLock = !0, "function" == typeof c.callback && c.callback(a)
				})
			} else {
				var g = "vertical" == c.direction ? {
					top: d + "100%"
				} : {
					left: d + "100%"
				};
				b.container.animate(g, c.animationTime, c.easing, function() {
					b.sLock = !0, "function" == typeof c.callback && c.callback(a)
				})
			}
			b.config.dots && b.dotsDoms[a].addClass(c.currentClass).siblings().removeClass(c.currentClass), b.config.navgation && b.navDoms[a].addClass(c.currentClass).siblings().removeClass(c.currentClass), b.section.eq(a).addClass(c.currentClass).siblings().removeClass(c.currentClass)
		},
		init: function() {
			var b = this;
			b.section.each(function() {
				b.doms.push(a(this))
			}), b.initStyle(), b.config.dots && b.initDots(), b.config.navgation && b.initNavgation(), b.action()
		},
		action: function() {
			var b = this;
			a(document).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function(a) {
				if (b.sLock) {
					a.preventDefault();
					var c = a.originalEvent.wheelDelta || -a.originalEvent.detail;
					0 > c ? b.moveDown() : b.moveUp()
				}
			}), b.config.keyboard && a(document).bind("keydown", function(a) {
				(37 == a.keyCode || 38 == a.keyCode || 39 == a.keyCode || 40 == a.keyCode) && b.sLock && (a.preventDefault(), 37 == a.keyCode || 38 == a.keyCode ? b.moveUp() : (39 == a.keyCode || 40 == a.keyCode) && b.moveDown())
			}), a(document).swipeEvents().bind("swipeLeft swipeUp", function(a) {
				b.sLock && (a.preventDefault(), b.moveDown())
			}), a(document).swipeEvents().bind("swipeRight swipeDown", function(a) {
				b.sLock && (a.preventDefault(), b.moveUp())
			})
		},
		initStyle: function() {
			var b = this,
				c = b.config;
			a("html,body").css({
				width: "100%",
				height: "100%",
				overflow: c.hideScrollBar ? "hidden" : "inherit"
			}), "vertical" == c.direction ? (b.container.css({
				width: "100%",
				height: 100 * b.pageLength + "%",
				"float": "none",
				position: "relative"
			}), b.section.css({
				width: "100%",
				height: Math.floor(100 / b.pageLength).toFixed(2) + "%",
				"float": "none"
			})) : (b.container.css({
				height: "100%",
				width: 100 * b.pageLength + "%",
				"float": "left",
				position: "relative"
			}), b.section.css({
				height: "100%",
				width: Math.floor(100 / b.pageLength).toFixed(2) + "%",
				"float": "left"
			}))
		},
		initDots: function() {
			if (this.config.dots) {
				var b = 0,
					c = '<div class="scroll-dots-wrap page-dots"><ul>';
				for (b; b < this.pageLength; b++) c += '<li class="dot' + (b == this.index ? " current" : "") + '" data-index="' + b + '"></li>';
				c += "</ul></div>";
				var d = a(c);
				d.appendTo("body");
				var e = this;
				d.find(".dot").each(function(b) {
					e.dotsDoms.push(a(this)), a(this).bind("click", function() {
						e.moveTo(b)
					})
				})
			}
		},
		initNavgation: function() {
			if (0 != this.config.navgation) {
				var c = (a(this.config.navgation[0]), a(this.config.navgation[1])),
					d = this;
				d.config.navgation[2] || (d.config.navgation[2] = "data-index"), c.length && c.each(function(b, c) {
					a(c).attr(d.config.navgation[2]) || a(c).attr(d.config.navgation[2], b), d.navDoms.push(a(this)), a(c).bind("click", function() {
						var b = a(this).attr(d.config.navgation[2]);
						d.moveTo(b)
					})
				})
			}
		}
	}, window.smohanScrollPage = function(a, c) {
		var d = new b(a, c);
		return {
			version: d.version,
			index: d.index,
			moveDown: function() {
				d.moveDown()
			},
			moveUp: function() {
				d.moveUp()
			},
			moveTo: function(a) {
				d.moveTo(a)
			}
		}
	}, a.fn.smohanScrollPage = function(a) {
		return smohanScrollPage(this, a)
	}
}(jQuery);