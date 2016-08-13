! function() {
    "use strict";

    function a(a, t) {
        a.state("app", {
            url: "/app",
            "abstract": !0,
            templateUrl: "app/modules/core/app.html"
        }), t.otherwise(function(a) {
            var t = a.get("$state");
            t.go("app.dashboard")
        })
    }
    var t = angular.module("singApp.core", ["singApp.core.utils", "ui.router", "ui.bootstrap", "ngAnimate", "ngStorage"]);
    t.config(a), a.$inject = ["$stateProvider", "$urlRouterProvider"]
}(),
function() {
    "use strict";

    function a(a, t) {
        return a.fn.widgster.Constructor.DEFAULTS.bodySelector = ".widget-body", a(t).on("close.widgster", function(t) {
            var o = a(t.target).closest('.content > .row > [class*="col-"]:not(.widget-container)');
            o.find(".widget").not(t.target).length || o.remove()
        }), {
            restrict: "CEA",
            link: function(a, t, o) {
                "true" !== o.postProcessing && t.widgster()
            }
        }
    }
    angular.module("singApp.core").directive("widget", a), a.$inject = ["jQuery", "$document"]
}(),
function() {
    "use strict";

    function a(a) {
        return {
            restrict: "C",
            link: function(t, o) {
                a(o).find(".input-group-addon + .form-control").on("blur focus", function(t) {
                    a(this).parents(".input-group")["focus" === t.type ? "addClass" : "removeClass"]("focus")
                })
            }
        }
    }

    function t(a) {
        return {
            restrict: "C",
            link: function(t, o) {
                a(o).find(".input-group-addon + .form-control").on("blur focus", function(t) {
                    a(this).parents(".input-group")["focus" === t.type ? "addClass" : "removeClass"]("focus")
                })
            }
        }
    }

    function o(a, t) {
        return {
            restrict: "A",
            link: function(o, i, e) {
                i.on("click change", function(t) {
                    var o = a(this),
                        i = a(o.data("ajax-target"));
                    return i.length > 0 && (t = a.Event("ajax-load:start", {
                        originalEvent: t
                    }), o.trigger(t), !t.isDefaultPrevented() && i.load(o.data("ajax-load"), function() {
                        o.trigger("ajax-load:end")
                    })), !1
                }), e.loadingText && (i.on("ajax-load:start", function() {
                    i.button("loading")
                }), i.on("ajax-load:end", function() {
                    i.button("reset")
                })), a(t.document).on("click", "[data-toggle^=button]", function(t) {
                    return "change" !== a(t.target).find("input").data("ajax-trigger")
                })
            }
        }
    }

    function i(a, t, o) {
        return {
            link: function() {
                a(o).on("ajax-load:end", "#load-notifications-btn", function() {
                    t(function() {
                        a("#notifications-list").find(".bg-attention").removeClass("bg-attention")
                    }, 1e4)
                }), a(o).on("ajax-load:end", "#notifications-toggle input", function() {
                    a("#notifications-list").find("[data-toggle=tooltip]").tooltip()
                }), t(function() {
                    var o = a("#chat-notification");
                    o.removeClass("hide").addClass("animated fadeIn").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        o.removeClass("animated fadeIn"), t(function() {
                            o.addClass("animated fadeOut").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                                o.addClass("hide")
                            })
                        }, 4e3)
                    }), o.siblings('[data-sn-action="toggle-chat-sidebar-state"]').append('<i class="chat-notification-sing animated bounceIn"></i>')
                }, 4e3)
            }
        }
    }

    function e(a) {
        return {
            link: function(t, o) {
                var i = o.data("value"),
                    e = o.find(".progress-bar");
                e.css("opacity", 0), a(function() {
                    e.css({
                        transition: "none",
                        width: 0,
                        opacity: 1
                    }), a(function() {
                        e.css("transition", "").css("width", i + "%")
                    })
                })
            }
        }
    }

    function s(a) {
        return {
            link: function(t, o) {
                o.animateNumber({
                    number: o.text().replace(/ /gi, ""),
                    numberStep: a.animateNumber.numberStepFactories.separator(" "),
                    easing: "easeInQuad"
                }, 1e3)
            }
        }
    }

    function l(a) {
        return {
            restrict: "A",
            link: function(t, o) {
                o.on("click", function() {
                    o.closest("table").find("input[type=checkbox]").not(this).prop("checked", a(this).prop("checked"))
                })
            }
        }
    }

    function n() {
        return {
            restrict: "E",
            link: function(a, t) {
                t.on("click", "a[href=#]", function(a) {
                    a.preventDefault()
                })
            }
        }
    }
    angular.module("singApp.core.utils", []).directive("inputGroupNoBorder", a).directive("inputGroupTransparent", a).directive("ajaxLoad", o).directive("snDemo", i).directive("snProgressAnimate", e).directive("animateNumber", s).directive("checkAll", l).directive("body", n), a.$inject = ["jQuery"], t.$inject = ["jQuery"], o.$inject = ["jQuery", "$window"], i.$inject = ["jQuery", "$timeout", "$document"], e.$inject = ["$timeout"], s.$inject = ["jQuery"], l.$inject = ["jQuery"], n.$inject = []
}(),
function() {
    "use strict";

    function a(a) {
        return {
            link: function(t, o) {
                function i() {
                    a(".sidebar-status .dropdown-toggle").after(o.detach())
                }

                function e() {
                    a("#notifications-dropdown-toggle").after(o.detach())
                }
                t.app.helpers.onScreenSize("xs", i), t.app.helpers.onScreenSize("xs", e, !1), t.app.helpers.isScreen("xs") && i(), a(".sidebar-status").on("show.bs.dropdown", function() {
                    a("#sidebar").css("z-index", 2)
                }).on("hidden.bs.dropdown", function() {
                    a("#sidebar").css("z-index", "")
                })
            },
            templateUrl: "app/modules/core/notifications/notifications.html"
        }
    }
    angular.module("singApp.core").directive("snNotificationsMenu", a), a.$inject = ["jQuery"]
}(),
function() {
    "use strict";

    function a(a, t, o) {
        var i = {
            "toggle-navigation-state": function(a, t) {
                t.app.state["nav-static"] = !t.app.state["nav-static"]
            },
            "toggle-navigation-collapse-state": function() {
                a.toggleNavigationCollapseState()
            },
            "toggle-chat-sidebar-state": function() {
                t(this).find(".chat-notification-sing").remove(), a.toggleChatSidebarState(), o(function() {
                    t(".chat-sidebar-user-group:first-of-type .list-group-item:first-child:not(.js-notification-added)").addClass("active js-notification-added").find(".fa-circle").after('<span class="badge badge-danger pull-right animated bounceInDown">3</span>')
                }, 1e3)
            }
        };
        return {
            restrict: "A",
            link: function(a, t, o) {
                angular.isDefined(o.snAction) && "" !== o.snAction && t.on("click", function(e) {
                    a.$apply(function() {
                        i[o.snAction].call(t[0], e, a)
                    }), e.preventDefault()
                }), angular.isDefined(o.tooltip) && "" !== o.snAction && t.tooltip()
            }
        }
    }

    function t(a, t, o, i, e) {
        var s = function(a, o) {
            this.$el = a, this.scope = o, this.helpers = o.app.helpers, t.toggleNavigationCollapseState = i.proxy(this.toggleNavigationCollapseState, this)
        };
        return s.prototype = {
            expandNavigation: function() {
                this.isNavigationStatic() && (this.helpers.isScreen("md") || this.helpers.isScreen("lg")) || (i("body").removeClass("nav-collapsed"), this.$el.find(".active .active").closest(".collapse").collapse("show").siblings("[data-toggle=collapse]").removeClass("collapsed"))
            },
            collapseNavigation: function() {
                this.isNavigationStatic() && (this.helpers.isScreen("md") || this.helpers.isScreen("lg")) || (i("body").addClass("nav-collapsed"), this.$el.find(".collapse.in").collapse("hide").siblings("[data-toggle=collapse]").addClass("collapsed"))
            },
            checkNavigationState: function() {
                if (this.isNavigationStatic())(this.helpers.isScreen("sm") || this.helpers.isScreen("xs")) && this.collapseNavigation();
                else if (this.helpers.isScreen("md") || this.helpers.isScreen("lg")) {
                    var t = this;
                    a(function() {
                        t.collapseNavigation()
                    }, this.scope.app.settings.navCollapseTimeout)
                } else this.collapseNavigation()
            },
            isNavigationStatic: function() {
                return this.scope.app.state["nav-static"] === !0
            },
            changeActiveNavigationItem: function(a, t, i) {
                var e = this.$el.find('a[href="' + o.href(t, i) + '"]');
                e.is(".active > .collapse > li > a") || this.$el.find(".active .active").closest(".collapse").collapse("hide"), this.$el.find(".sidebar-nav .active").removeClass("active"), e.closest("li").addClass("active").parents("li").addClass("active"), e.closest(".collapse").addClass("in").siblings("a[data-toggle=collapse]").removeClass("collapsed")
            },
            toggleNavigationCollapseState: function() {
                i("body").is(".nav-collapsed") ? this.expandNavigation() : this.collapseNavigation()
            },
            enableSwipeCollapsing: function() {
                var a = this;
                i(".content-wrap").swipe({
                    swipeLeft: function() {
                        a.helpers.isScreen("lg") || i("body").is(".nav-collapsed") || a.collapseNavigation()
                    },
                    swipeRight: function() {
                        a.helpers.isScreen("lg") || i("body").is(".nav-busy") || i("body").is(".nav-collapsed") && a.expandNavigation()
                    },
                    threshold: this.helpers.isScreen("xs") ? 100 : 200
                })
            },
            collapseNavIfSmallScreen: function() {
                (this.helpers.isScreen("xs") || this.helpers.isScreen("sm")) && this.collapseNavigation()
            },
            _sidebarMouseEnter: function() {
                (this.helpers.isScreen("md") || this.helpers.isScreen("lg")) && this.expandNavigation()
            },
            _sidebarMouseLeave: function() {
                (this.helpers.isScreen("md") || this.helpers.isScreen("lg")) && this.collapseNavigation()
            }
        }, {
            replace: !0,
            templateUrl: "app/modules/core/navigation/sidebar.html",
            link: function(l, n) {
                function c() {
                    var a = n.find(".js-sidebar-content");
                    0 !== n.find(".slimScrollDiv").length && a.slimscroll({
                        destroy: !0
                    }), a.slimscroll({
                        height: e.innerHeight,
                        size: "4px"
                    })
                }
                var p = new s(n, l);
                n.on("mouseenter", i.proxy(p._sidebarMouseEnter, p)), n.on("mouseleave", i.proxy(p._sidebarMouseLeave, p)), a(function() {
                    p.changeActiveNavigationItem({}, o.$current, o.params), p.checkNavigationState()
                }), n.on("click", function() {
                    i("body").is(".nav-collapsed") && p.expandNavigation()
                }), l.$watch('app.state["nav-static"]', function(t, o) {
                    t !== o && (t || p.collapseNavigation(), a(function() {
                        i(e).trigger("sn:resize")
                    }))
                }), t.$on("$stateChangeStart", i.proxy(p.changeActiveNavigationItem, p)), t.$on("$stateChangeSuccess", i.proxy(p.collapseNavIfSmallScreen, p)), t.$on("$stateChangeSuccess", function() {
                    e.scrollTo(0, 0)
                }), "ontouchstart" in e && p.enableSwipeCollapsing(), n.find(".collapse").on("show.bs.collapse", function(a) {
                    if (a.target === a.currentTarget) {
                        var t = i(this).prev("[data-toggle=collapse]");
                        i(t.data("parent")).find(".collapse.in").not(i(this)).collapse("hide")
                    }
                }).on("show.bs.collapse", function(a) {
                    a.target === a.currentTarget && i(this).closest("li").addClass("open")
                }).on("hide.bs.collapse", function(a) {
                    a.target === a.currentTarget && i(this).closest("li").removeClass("open")
                }), i(e).on("sn:resize", c), c()
            }
        }
    }
    angular.module("singApp.core").directive("snAction", a).directive("snNavigation", t), a.$inject = ["$rootScope", "jQuery", "$timeout"], t.$inject = ["$timeout", "$rootScope", "$state", "jQuery", "$window"]
}(),
function() {
    "use strict";

    function a(a, t, o, i) {
        return {
            replace: !0,
            templateUrl: "app/modules/core/chat/chat.html",
            controller: "ChatSidebarController",
            link: function(e, s) {
                function l() {
                    var a = t(".chat-sidebar-contacts", s);
                    0 !== s.find(".slimScrollDiv").length && a.slimscroll({
                        destroy: !0
                    }), a.slimscroll({
                        height: o.innerHeight,
                        width: "",
                        size: "4px"
                    })
                }
                var n = t("body").addClass("chat-sidebar-container");
                a.toggleChatSidebarState = function() {
                    n.toggleClass("chat-sidebar-opened")
                }, t(i).on("swipeLeft", ".content-wrap", function() {
                    n.is(".nav-collapsed") && n.addClass("chat-sidebar-opened")
                }).on("swipeRight", function() {
                    n.is(".nav-collapsed.chat-sidebar-opened") && n.removeClass("chat-sidebar-opened").addClass("nav-busy").one(t.support.transition.end, function() {
                        t("body").removeClass("nav-busy")
                    }).emulateTransitionEnd(300)
                }), e.deactivateLink = function(a) {
                    t(a.currentTarget).removeClass("active").find(".badge").remove()
                }, t(o).on("sn:resize", l), l()
            }
        }
    }

    function t(a) {
        a.todayConversations = [{
            name: "Chris Gray",
            status: "success",
            lastMessage: "Hey! What's up? So many times since we",
            image: "assets/images/people/a2.jpg",
            messages: [{
                text: "Hey! What's up?"
            }, {
                text: "Are you there?"
            }, {
                text: "Let me know when you come back."
            }, {
                text: "I am here!",
                fromMe: !0
            }]
        }, {
            name: "Jamey Brownlow",
            status: "gray-light",
            lastMessage: "Good news coming tonight. Seems they agreed to proceed",
            image: "assets/images/avatar.png"
        }, {
            name: "Livia Walsh",
            status: "danger",
            lastMessage: "Check out my latest email plz!",
            image: "assets/images/people/a1.jpg"
        }, {
            name: "Jaron Fitzroy",
            status: "gray-light",
            lastMessage: "What about summer break?",
            image: "assets/images/avatar.png"
        }, {
            name: "Mike Lewis",
            status: "success",
            lastMessage: "Just ain't sure about the weekend now. 90% I'll make it.",
            image: "assets/images/people/a4.jpg"
        }], a.lastWeekConversations = [{
            name: "Freda Edison",
            status: "gray-light",
            lastMessage: "Hey what's up? Me and Monica going for a lunch somewhere. Wanna join?",
            image: "assets/images/people/a6.jpg"
        }, {
            name: "Livia Walsh",
            status: "success",
            lastMessage: "Check out my latest email plz!",
            image: "assets/images/people/a5.jpg"
        }, {
            name: "Jaron Fitzroy",
            status: "warning",
            lastMessage: "What about summer break?",
            image: "assets/images/people/a3.jpg"
        }, {
            name: "Mike Lewis",
            status: "gray-light",
            lastMessage: "Just ain't sure about the weekend now. 90% I'll make it.",
            image: "assets/images/avatar.png"
        }], a.newMessage = "", a.activeConversation = a.todayConversations[0], a.chatAreaOpened = !1, a.openConversation = function(t) {
            a.activeConversation = t, a.chatAreaOpened = !0
        }, a.addMessage = function(t) {
            a.newMessage && (a.activeConversation.messages || (a.activeConversation.messages = [])).push({
                text: a.newMessage,
                fromMe: !0
            }), a.newMessage = ""
        }
    }

    function o() {
        return {
            replace: !0,
            templateUrl: "app/modules/core/chat/chatArea.html",
            scope: {
                conversation: "=snChatArea",
                open: "=",
                filter: "="
            },
            link: function(a, t, o) {
                a.$watch("open", function(a) {
                    t.toggleClass("open", a), t.closest(".chat-sidebar-content").find(".chat-sidebar-contacts").toggleClass("open", !a), t.closest(".chat-sidebar-content").find(".chat-sidebar-footer").toggleClass("open", a), a && t.find(".message-list").slimscroll({
                        height: t.height() - t.find(".title").height() - 10 - parseInt(t.css("margin-top")) - parseInt(t.css("margin-bottom")),
                        width: "",
                        size: "4px"
                    })
                })
            }
        }
    }
    angular.module("singApp.core").directive("snChatSidebar", a).directive("snChatArea", o).controller("ChatSidebarController", t), a.$inject = ["$rootScope", "jQuery", "$window", "$document"], t.$inject = ["$scope"], o.$inject = []
}(),
function() {
    "use strict";
    angular.module("singApp.components.wizard", [])
}(),
function() {
    "use strict";

    function a(a) {
        return {
            link: function(t, o, i) {
                function e() {
                    o.bootstrapWizard({
                        onTabShow: function(a, t, i) {
                            var e = t.find("li").length,
                                s = i + 1,
                                l = s / e * 100,
                                n = o;
                            n.find(".progress-bar").css({
                                width: l + "%"
                            }), s >= e ? (n.find(".pager .next").hide(), n.find(".pager .finish").show(), n.find(".pager .finish").removeClass("disabled")) : (n.find(".pager .next").show(), n.find(".pager .finish").hide()), t.find("li").removeClass("done"), a.prevAll().addClass("done")
                        },
                        onNext: function(t, o, i) {
                            var e = a(t.find("a[data-toggle=tab]").attr("href")),
                                s = e.find("form");
                            return s.length ? s.parsley().validate() : void 0
                        },
                        onTabClick: function(a, t, o, i) {
                            return t.find("li:eq(" + i + ")").is(".done")
                        }
                    }), i.height && o.find(".tab-pane").css({
                        height: i.height
                    })
                }
                e()
            }
        }
    }
    angular.module("singApp.components.wizard").directive("bootstrapWizard", a), a.$inject = ["jQuery"]
}(),
function() {
    "use strict";
    angular.module("singApp.components.tile", [])
}(),
function() {
    "use strict";

    function a() {
        return {
            restrict: "EAC",
            link: function(a, t, o) {
                t.css("height", o.height).liveTile(), a.$on("$stateChangeStart", function() {
                    t.liveTile("destroy", !0)
                })
            }
        }
    }
    angular.module("singApp.components.tile").directive("liveTile", a), a.$inject = []
}(),
function() {
    "use strict";
    angular.module("singApp.components.switchery", [])
}(),
function() {
    "use strict";

    function a(a, t, o, i) {
        function e(o, e, s, l) {
            if (!l) return !1;
            var n = {};
            try {
                n = i(s.uiSwitch)(o)
            } catch (c) {}
            t(function() {
                var t = new a.Switchery(e[0], n),
                    i = t.element;
                i.checked = o.initValue, t.setPosition(!1), i.addEventListener("change", function(a) {
                    o.$apply(function() {
                        l.$setViewValue(i.checked)
                    })
                })
            }, 0)
        }
        return {
            require: "ngModel",
            restrict: "AE",
            scope: {
                initValue: "=ngModel"
            },
            link: e
        }
    }
    angular.module("singApp.components.switchery").directive("uiSwitch", a), a.$inject = ["$window", "$timeout", "$log", "$parse"]
}(),
function() {
    "use strict";
    angular.module("singApp.components.sparkline", [])
}(),
function() {
    "use strict";

    function a(a) {
        return {
            require: "ngModel",
            link: function(t, o, i, e) {
                function s() {
                    var s = angular.isString(e.$viewValue) ? e.$viewValue.replace(/(^,)|(,$)/g, "") : e.$viewValue,
                        l = t[i.options];
                    if (angular.isArray(s) && angular.isArray(l)) l.forEach(function(t, i) {
                        0 === i ? o.sparkline(s[i], t) : o.sparkline(s[i], a.extend({
                            composite: !0
                        }, t))
                    });
                    else {
                        var n;
                        n = angular.isArray(s) ? s : s.split(","), o.sparkline(n, l)
                    }
                }
                t.$watch(i.ngModel, function() {
                    s()
                })
            }
        }
    }
    angular.module("singApp.components.sparkline").directive("jqSparkline", a), a.$inject = ["jQuery"]
}(),
function() {
    "use strict";
    angular.module("singApp.components.skycon", [])
}(),
function() {
    "use strict";

    function a(a) {
        return {
            link: function(t, o, i) {
                var e = new a({
                    color: t.$eval(i.color)
                });
                e.set(o[0], i.skyCon), e.play()
            }
        }
    }

    function t(a) {
        return a.Skycons
    }
    angular.module("singApp.components.skycon").directive("skyCon", a).factory("Skycons", t), a.$inject = ["Skycons"], t.$inject = ["$window"]
}(),
function() {
    "use strict";
    angular.module("singApp.components.rickshaw", [])
}(),
function() {
    "use strict";

    function a(a, t, o, i) {
        return {
            scope: {
                height: "@",
                series: "=",
                realtime: "=",
                seriesData: "=",
                random: "=",
                configureProps: "="
            },
            link: function(e, s, l) {
                function n() {
                    function n() {
                        var a = i.extend({
                            width: s.width(),
                            height: e.height
                        }, e.configureProps);
                        c.configure(a), c.render(), s.find("svg").css({
                            height: e.height
                        })
                    }
                    var c = new o.Graph({
                        element: s[0],
                        height: e.height,
                        renderer: l.renderer || "area",
                        series: e.series
                    });
                    i(a).on("sn:resize", n), n();
                    new o.Graph.HoverDetail({
                        graph: c,
                        xFormatter: function(a) {
                            return new Date(1e3 * a).toString()
                        }
                    });
                    e.realtime && t(function() {
                        e.random.removeData(e.seriesData), e.random.addData(e.seriesData), c.update()
                    }, 1e3)
                }
                e.$watch("series", function(a, t) {
                    angular.isDefined(a) && n()
                })
            }
        }
    }

    function t(a) {
        return a.Rickshaw
    }
    angular.module("singApp.components.rickshaw").directive("rickshawChart", a).factory("Rickshaw", t), a.$inject = ["$window", "$interval", "Rickshaw", "jQuery"], t.$inject = ["$window"]
}(),
function() {
    "use strict";
    angular.module("singApp.components.nvd3", [])
}(),
function() {
    "use strict";

    function a(a, t, o, i) {
        return {
            link: function(e, s, l) {
                function n() {
                    o.addGraph(function() {
                        var o = e[l.chart];
                        return i.select(s.find("svg")[0]).style("height", l.height || "300px").datum(e[l.datum]).transition().duration(500).call(o), t(a).on("sn:resize", o.update), o
                    })
                }
                n()
            }
        }
    }

    function t(a) {
        return a.nv
    }

    function o(a) {
        return a.d3
    }
    angular.module("singApp.components.nvd3").directive("nvd3Chart", a).factory("nv", t).factory("d3", o), a.$inject = ["$window", "jQuery", "nv", "d3"], t.$inject = ["$window"], o.$inject = ["$window"]
}(),
function() {
    "use strict";
    angular.module("singApp.components.morris", [])
}(),
function() {
    "use strict";

    function a(a) {
        function t(a) {
            return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()
        }
        return {
            link: function(o, i, e) {
                function s() {
                    i.css({
                        height: e.height
                    }), a.Morris[t(e.type)](angular.extend({
                        element: i[0]
                    }, o[e.options]))
                }
                s()
            }
        }
    }
    angular.module("singApp.components.morris").directive("morrisChart", a), a.$inject = ["$window"]
}(),
function() {
    "use strict";
    angular.module("singApp.components.mapael", [])
}(),
function() {
    "use strict";

    function a() {
        return {
            require: "ngModel",
            link: function(a, t, o, i) {
                function e() {
                    a.$watch(o.ngModel, function(i, e) {
                        if (angular.isDefined(i)) {
                            var s = t;
                            s.css("height", o.height || 394).css("margin-bottom", o.marginBottom || -15), s.parents(".widget")[0] && s.find(".map").css("height", parseInt(s.parents(".widget").css("height")) - 40), s.mapael(i), a[o.zoom] && s.trigger("zoom", a[o.zoom]), a.$map = s
                        }
                    })
                }
                e()
            }
        }
    }
    angular.module("singApp.components.mapael").directive("snMapaelLayersMap", a), a.$inject = []
}(),
function() {
    "use strict";
    angular.module("singApp.components.holderjs", [])
}(),
function() {
    "use strict";

    function a(a) {
        return {
            link: function(t, o) {
                a.Holder.run({
                    images: o[0]
                })
            }
        }
    }
    angular.module("singApp.components.holderjs").directive("holderjs", a), a.$inject = ["$window"]
}(),
function() {
    "use strict";
    angular.module("singApp.components.gmap", [])
}(),
function() {
    "use strict";

    function a(a, t, o, i) {
        if (!angular.isDefined(i.GMaps)) {
            var e = i.document.createElement("script");
            e.type = "text/javascript", e.src = "http://maps.google.com/maps/api/js?sensor=true&callback=googleMapsLoaded", i.document.body.appendChild(e), a.gmapsLoaded = !1, window.googleMapsLoaded = function() {
                var t = i.document.createElement("script");
                t.type = "text/javascript", t.src = "vendor/gmaps/gmaps.js", t.onload = function() {
                    a.$apply(function() {
                        a.gmapsLoaded = !0
                    })
                }, i.document.body.appendChild(t)
            }
        }
        return {
            link: function(e, s, l) {
                function n() {
                    var a = new i.GMaps({
                        el: s[0],
                        lat: -37.813179,
                        lng: 144.950259,
                        zoomControl: !1,
                        panControl: !1,
                        streetViewControl: !1,
                        mapTypeControl: !1,
                        overviewMapControl: !1
                    });
                    l.contextMenu && (a.setContextMenu({
                        control: "map",
                        options: [{
                            title: "Add marker",
                            name: "add_marker",
                            action: function(a) {
                                this.addMarker({
                                    lat: a.latLng.lat(),
                                    lng: a.latLng.lng(),
                                    animation: i.google.maps.Animation.DROP,
                                    draggable: !0,
                                    title: "New Marker"
                                }), this.hideContextMenu()
                            }
                        }, {
                            title: "Center here",
                            name: "center_here",
                            action: function(a) {
                                this.setCenter(a.latLng.lat(), a.latLng.lng())
                            }
                        }]
                    }), a.setContextMenu({
                        control: "marker",
                        options: [{
                            title: "Center here",
                            name: "center_here",
                            action: function(a) {
                                this.setCenter(a.latLng.lat(), a.latLng.lng())
                            }
                        }]
                    })), o("[data-gmap-zoom-in]").on("click", function() {
                        a.zoomIn(1)
                    }), o("[data-gmap-zoom-out]").on("click", function() {
                        a.zoomOut(1)
                    }), t(function() {
                        a.addMarker({
                            lat: -37.813179,
                            lng: 144.950259,
                            animation: google.maps.Animation.DROP,
                            draggable: !0,
                            title: "Here we are"
                        })
                    }, 3e3)
                }
                a.gmapsLoaded || angular.isDefined(window.GMaps) ? n() : a.$watch("gmapsLoaded", function(a) {
                    a === !0 && n()
                })
            }
        }
    }
    angular.module("singApp.components.gmap").directive("snGmap", a), a.$inject = ["$rootScope", "$timeout", "jQuery", "$window"]
}(),
function() {
    "use strict";
    angular.module("singApp.components.gallery", [])
}(),
function() {
    "use strict";

    function a(a, t, o) {
        return {
            link: function(i, e, s) {
                var l = e.find(".js-shuffle-sizer");
                a(function() {
                    e.shuffle(angular.extend({
                        sizer: l
                    }, i.$eval(s.options))), a(function() {
                        e.shuffle("shuffle", "all")
                    })
                }), o(t).on("sn:resize", function() {
                    e.shuffle("update")
                }), i.$grid = e
            }
        }
    }
    angular.module("singApp.components.gallery").directive("snGallery", a), a.$inject = ["$timeout", "$window", "jQuery"]
}(),
function() {
    "use strict";
    angular.module("singApp.components.flot", [])
}(),
function() {
    "use strict";

    function a(a) {
        return {
            link: function(t, o, i) {
                a.plot(o, t[i.ngModel], t[i.options] || {
                    series: {
                        lines: {
                            show: !0,
                            lineWidth: 1,
                            fill: !1,
                            fillColor: {
                                colors: [{
                                    opacity: .001
                                }, {
                                    opacity: .5
                                }]
                            }
                        },
                        points: {
                            show: !1,
                            fill: !0
                        },
                        shadowSize: 0
                    },
                    legend: !1,
                    grid: {
                        show: !1,
                        margin: 0,
                        labelMargin: 0,
                        axisMargin: 0,
                        hoverable: !0,
                        clickable: !0,
                        tickColor: "rgba(255,255,255,1)",
                        borderWidth: 0
                    }
                })
            }
        }
    }
    angular.module("singApp.components.flot").directive("flotChart", a), a.$inject = ["jQuery"]
}(),
function() {
    "use strict";
    angular.module("singApp.components.dropzone", [])
}(),
function() {
    "use strict";

    function a(a) {
        return function(t, o, i) {
            var e, s;
            e = angular.extend({}, t[i.dropzone]), s = new a(o[0], e.options), angular.forEach(e.eventHandlers, function(a, t) {
                s.on(t, a)
            })
        }
    }

    function t(a) {
        return a.Dropzone
    }
    angular.module("singApp.components.dropzone").directive("dropzone", a).factory("Dropzone", t), a.$inject = ["Dropzone"], t.$inject = ["$window"]
}(),
function() {
    "use strict";

    function a(a) {
        a.state("app.widgets", {
            url: "/widgets",
            templateUrl: "app/modules/widgets/widgets.html"
        })
    }
    var t = angular.module("singApp.widgets", ["ui.router", "ui.bootstrap", "singApp.components.mapael", "singApp.components.tile", "singApp.components.flot", "singApp.components.skycon", "singApp.components.sparkline", "ui.jq"]);
    t.config(a), a.$inject = ["$stateProvider"]
}(),
function() {
    "use strict";

    function a(a, t, o) {
        a.applyToScope = function() {
            a.selectedYear = 2009, a.$watch("selectedYear", function(o, i) {
                o !== i && a.$map.trigger("update", [t[o], {}, {}, {
                    animDuration: 300
                }])
            }), a.data = {
                map: {
                    name: "world_countries",
                    defaultArea: {
                        attrs: {
                            fill: a.app.settings.colors["gray-lighter"],
                            stroke: a.app.settings.colors.gray,
                            "stroke-width": .1
                        },
                        attrsHover: {
                            fill: a.app.settings.colors["gray-light"],
                            animDuration: 100
                        }
                    },
                    defaultPlot: {
                        size: 17,
                        attrs: {
                            fill: a.app.settings.colors["brand-warning"],
                            stroke: "#fff",
                            "stroke-width": 0,
                            "stroke-linejoin": "round"
                        },
                        attrsHover: {
                            "stroke-width": 1,
                            animDuration: 100
                        }
                    },
                    zoom: {
                        enabled: !0,
                        step: 1,
                        maxLevel: 10
                    }
                },
                legend: {
                    area: {
                        display: !1,
                        slices: [{
                            max: 5e6,
                            attrs: {
                                fill: a.app.helpers.lightenColor("#ebeff1", .04)
                            },
                            label: "Less than 5M"
                        }, {
                            min: 5e6,
                            max: 1e7,
                            attrs: {
                                fill: "#ebeff1"
                            },
                            label: "Between 5M and 10M"
                        }, {
                            min: 1e7,
                            max: 5e7,
                            attrs: {
                                fill: a.app.settings.colors["gray-lighter"]
                            },
                            label: "Between 10M and 50M"
                        }, {
                            min: 5e7,
                            attrs: {
                                fill: a.app.helpers.darkenColor("#ebeff1", .1)
                            },
                            label: "More than 50M"
                        }]
                    }
                },
                areas: t[a.selectedYear].areas
            };
            var i = o.fn.mapael.maps.world_countries.getCoords(59.599254, 8.863224);
            a.zoom = [6, i.x, i.y]
        }, a.applyToScope()
    }

    function t(a) {
        a.generateRandomData = function(a) {
            function t() {
                return Math.floor(30 * Math.random()) + 10
            }
            for (var o = [], i = 5, e = 0; e < a.length; e++) {
                for (var s = [], l = 0; 25 > l; l++) s.push([l, Math.floor(i * l) + t()]);
                i--, o.push({
                    data: s,
                    showLabels: !0,
                    label: a[e].label,
                    labelPlacement: "below",
                    canvasRender: !0,
                    cColor: "red",
                    color: a[e].color
                })
            }
            return o
        }
    }

    function o(a, t) {
        a.applyToScope = function() {
            a.data = [4, 6, 5, 7, 5], a.options = {
                type: "line",
                width: "100%",
                height: "60",
                lineColor: a.app.settings.colors.gray,
                fillColor: "transparent",
                spotRadius: 5,
                spotColor: a.app.settings.colors.gray,
                valueSpots: {
                    "0:": a.app.settings.colors.gray
                },
                highlightSpotColor: a.app.settings.colors.white,
                highlightLineColor: a.app.settings.colors.gray,
                minSpotColor: a.app.settings.colors.gray,
                maxSpotColor: a.app.settings.colors["brand-danger"],
                tooltipFormat: new t.SPFormatClass('<span style="color: white">&#9679;</span> {{prefix}}{{y}}{{suffix}}'),
                chartRangeMin: a.app.helpers.min(a.data) - 1
            }
        }, a.applyToScope()
    }

    function i(a, t) {
        a.applyToScope = function() {
            a.seriesData = [
                [],
                []
            ], a.random = new t.Fixtures.RandomData(30);
            for (var o = 0; 30 > o; o++) a.random.addData(a.seriesData);
            a.series = [{
                color: a.app.settings.colors["gray-dark"],
                data: a.seriesData[0],
                name: "Uploads"
            }, {
                color: a.app.settings.colors.gray,
                data: a.seriesData[1],
                name: "Downloads"
            }]
        }, a.applyToScope()
    }

    function e(a, t, o) {
        a.applyRickshawData = function() {
            for (var t = [
                    [],
                    []
                ], i = new o.Fixtures.RandomData(1e4), e = 0; 32 > e; e++) i.addData(t);
            a.series = [{
                name: "pop",
                data: t.shift().map(function(a) {
                    return {
                        x: a.x,
                        y: a.y
                    }
                }),
                color: a.app.helpers.lightenColor(a.app.settings.colors["brand-success"], .09),
                renderer: "bar"
            }, {
                name: "humidity",
                data: t.shift().map(function(a) {
                    return {
                        x: a.x,
                        y: a.y * (.1 * Math.random() + 1.1)
                    }
                }),
                renderer: "line",
                color: a.app.settings.colors.white
            }]
        }, a.applySparklineData = function() {
            var o = [3, 6, 2, 4, 5, 8, 6, 8],
                i = a.app.helpers.max(o),
                e = o.map(function() {
                    return i
                });
            a.sparklineData = [e, o], a.sparklineOptions = [{
                type: "bar",
                height: 26,
                barColor: a.app.settings.colors["gray-lighter"],
                barWidth: 7,
                barSpacing: 5,
                chartRangeMin: a.app.helpers.min(o),
                tooltipFormat: new t.SPFormatClass("")
            }, {
                composite: !0,
                type: "bar",
                barColor: a.app.settings.colors["brand-success"],
                barWidth: 7,
                barSpacing: 5
            }]
        }, a.applyRickshawData(), a.applySparklineData()
    }
    angular.module("singApp.widgets").controller("YearsMapDemoController", a).controller("FlotChartDemoController", t).controller("NasdaqSparklineDemoController", o).controller("RealtimeTrafficWidgetDemoController", i).controller("ChangesChartWidgetDemoController", e), a.$inject = ["$scope", "fakeWorldData", "jQuery"], t.$inject = ["$scope"], o.$inject = ["$scope", "jQuery"], i.$inject = ["$scope", "Rickshaw"], e.$inject = ["$scope", "jQuery", "Rickshaw"]
}(),
function() {
    "use strict";

    function a() {
        return t
    }
    angular.module("singApp.widgets").factory("fakeWorldData", a), a.$inject = [];
    var t = {
        2008: {
            areas: {
                AF: {
                    value: 19880820,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Afghanistan</span><br />Population : 19880820'
                    }
                },
                ZA: {
                    value: 25183856,
                    tooltip: {
                        content: '<span style="font-weight:bold;">South Africa</span><br />Population : 25183856'
                    }
                },
                AL: {
                    value: 51947647,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Albania</span><br />Population : 51947647'
                    }
                },
                DZ: {
                    value: 25677417,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Algeria</span><br />Population : 25677417'
                    }
                },
                DE: {
                    value: 17767648,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Germany</span><br />Population : 17767648'
                    }
                },
                AD: {
                    value: 8241925,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Andorra</span><br />Population : 8241925'
                    }
                },
                AO: {
                    value: 20995901,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Angola</span><br />Population : 20995901'
                    }
                },
                AG: {
                    value: 10080896,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Antigua And Barbuda</span><br />Population : 10080896'
                    }
                },
                SA: {
                    value: 43615610,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saudi Arabia</span><br />Population : 43615610'
                    }
                },
                AR: {
                    value: 44063471,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Argentina</span><br />Population : 44063471'
                    }
                },
                AM: {
                    value: 50763102,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Armenia</span><br />Population : 50763102'
                    }
                },
                AU: {
                    value: 23849414,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Australia</span><br />Population : 23849414'
                    }
                },
                AT: {
                    value: 35652829,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Austria</span><br />Population : 35652829'
                    }
                },
                AZ: {
                    value: 48414118,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Azerbaijan</span><br />Population : 48414118'
                    }
                },
                BS: {
                    value: 4602371,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bahamas</span><br />Population : 4602371'
                    }
                },
                BH: {
                    value: 27673596,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bahrain</span><br />Population : 27673596'
                    }
                },
                BD: {
                    value: 21957431,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bangladesh</span><br />Population : 21957431'
                    }
                },
                BB: {
                    value: 26909491,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Barbados</span><br />Population : 26909491'
                    }
                },
                BE: {
                    value: 15416836,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belgium</span><br />Population : 15416836'
                    }
                },
                BZ: {
                    value: 12194067,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belize</span><br />Population : 12194067'
                    }
                },
                BJ: {
                    value: 657540,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Benin</span><br />Population : 657540'
                    }
                },
                BT: {
                    value: 15115216,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bhutan</span><br />Population : 15115216'
                    }
                },
                BY: {
                    value: 6459622,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belarus</span><br />Population : 6459622'
                    }
                },
                MM: {
                    value: 57901453,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Myanmar</span><br />Population : 57901453'
                    }
                },
                BO: {
                    value: 59731284,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bolivia, Plurinational State Of</span><br />Population : 59731284'
                    }
                },
                BA: {
                    value: 18646918,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bosnia And Herzegovina</span><br />Population : 18646918'
                    }
                },
                BW: {
                    value: 50733853,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Botswana</span><br />Population : 50733853'
                    }
                },
                BR: {
                    value: 35636377,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Brazil</span><br />Population : 35636377'
                    }
                },
                BN: {
                    value: 17606784,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Brunei Darussalam</span><br />Population : 17606784'
                    }
                },
                BG: {
                    value: 13170221,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bulgaria</span><br />Population : 13170221'
                    }
                },
                BF: {
                    value: 11592654,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Burkina Faso</span><br />Population : 11592654'
                    }
                },
                BI: {
                    value: 25889465,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Burundi</span><br />Population : 25889465'
                    }
                },
                KH: {
                    value: 22162167,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cambodia</span><br />Population : 22162167'
                    }
                },
                CM: {
                    value: 4300750,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cameroon</span><br />Population : 4300750'
                    }
                },
                CA: {
                    value: 21939151,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Canada</span><br />Population : 21939151'
                    }
                },
                CV: {
                    value: 19301343,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cape Verde</span><br />Population : 19301343'
                    }
                },
                CF: {
                    value: 11625558,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Central African Republic</span><br />Population : 11625558'
                    }
                },
                CL: {
                    value: 27604132,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Chile</span><br />Population : 27604132'
                    }
                },
                CN: {
                    value: 5026467,
                    tooltip: {
                        content: '<span style="font-weight:bold;">China</span><br />Population : 5026467'
                    }
                },
                CY: {
                    value: 36462634,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cyprus</span><br />Population : 36462634'
                    }
                },
                CO: {
                    value: 14075082,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Colombia</span><br />Population : 14075082'
                    }
                },
                KM: {
                    value: 28795990,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Comoros</span><br />Population : 28795990'
                    }
                },
                CG: {
                    value: 33857730,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Congo</span><br />Population : 33857730'
                    }
                },
                CD: {
                    value: 8113964,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Congo, The Democratic Republic Of The</span><br />Population : 8113964'
                    }
                },
                KP: {
                    value: 27638864,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Korea, Democratic People\'s Republic Of</span><br />Population : 27638864'
                    }
                },
                KR: {
                    value: 43441950,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Korea, Republic Of</span><br />Population : 43441950'
                    }
                },
                CR: {
                    value: 31686063,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Costa Rica</span><br />Population : 31686063'
                    }
                },
                CI: {
                    value: 14745959,
                    tooltip: {
                        content: '<span style="font-weight:bold;">CÔte D\'ivoire</span><br />Population : 14745959'
                    }
                },
                HR: {
                    value: 20495029,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Croatia</span><br />Population : 20495029'
                    }
                },
                CU: {
                    value: 17257635,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cuba</span><br />Population : 17257635'
                    }
                },
                DK: {
                    value: 11614590,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Denmark</span><br />Population : 11614590'
                    }
                },
                DJ: {
                    value: 46999243,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Djibouti</span><br />Population : 46999243'
                    }
                },
                DM: {
                    value: 50671701,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Dominica</span><br />Population : 50671701'
                    }
                },
                EG: {
                    value: 45708673,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Egypt</span><br />Population : 45708673'
                    }
                },
                AE: {
                    value: 16696438,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United Arab Emirates</span><br />Population : 16696438'
                    }
                },
                EC: {
                    value: 5664441,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ecuador</span><br />Population : 5664441'
                    }
                },
                ER: {
                    value: 26447006,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Eritrea</span><br />Population : 26447006'
                    }
                },
                ES: {
                    value: 14610687,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Spain</span><br />Population : 14610687'
                    }
                },
                EE: {
                    value: 134732,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Estonia</span><br />Population : 134732'
                    }
                },
                US: {
                    value: 1182177,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United States</span><br />Population : 1182177'
                    }
                },
                ET: {
                    value: 5849069,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ethiopia</span><br />Population : 5849069'
                    }
                },
                FJ: {
                    value: 19429303,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Fiji</span><br />Population : 19429303'
                    }
                },
                FI: {
                    value: 4982595,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Finland</span><br />Population : 4982595'
                    }
                },
                FR: {
                    value: 54143079,
                    tooltip: {
                        content: '<span style="font-weight:bold;">France</span><br />Population : 54143079'
                    }
                },
                GA: {
                    value: 16956015,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Gabon</span><br />Population : 16956015'
                    }
                },
                GM: {
                    value: 5880145,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Gambia</span><br />Population : 5880145'
                    }
                },
                GE: {
                    value: 44343155,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Georgia</span><br />Population : 44343155'
                    }
                },
                GH: {
                    value: 35387769,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ghana</span><br />Population : 35387769'
                    }
                },
                GR: {
                    value: 57895969,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Greece</span><br />Population : 57895969'
                    }
                },
                GD: {
                    value: 9528839,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Grenada</span><br />Population : 9528839'
                    }
                },
                GT: {
                    value: 41469534,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guatemala</span><br />Population : 41469534'
                    }
                },
                GN: {
                    value: 25406872,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guinea</span><br />Population : 25406872'
                    }
                },
                GQ: {
                    value: 36947055,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Equatorial Guinea</span><br />Population : 36947055'
                    }
                },
                GW: {
                    value: 35991010,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guinea-bissau</span><br />Population : 35991010'
                    }
                },
                GY: {
                    value: 9464859,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guyana</span><br />Population : 9464859'
                    }
                },
                HT: {
                    value: 14841015,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Haiti</span><br />Population : 14841015'
                    }
                },
                HN: {
                    value: 12137399,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Honduras</span><br />Population : 12137399'
                    }
                },
                HU: {
                    value: 1032281,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Hungary</span><br />Population : 1032281'
                    }
                },
                JM: {
                    value: 51282254,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Jamaica</span><br />Population : 51282254'
                    }
                },
                JP: {
                    value: 24280823,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Japan</span><br />Population : 24280823'
                    }
                },
                MH: {
                    value: 11545126,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Marshall Islands</span><br />Population : 11545126'
                    }
                },
                PW: {
                    value: 30068280,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Palau</span><br />Population : 30068280'
                    }
                },
                SB: {
                    value: 324844,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Solomon Islands</span><br />Population : 324844'
                    }
                },
                IN: {
                    value: 44366919,
                    tooltip: {
                        content: '<span style="font-weight:bold;">India</span><br />Population : 44366919'
                    }
                },
                ID: {
                    value: 33298361,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Indonesia</span><br />Population : 33298361'
                    }
                },
                JO: {
                    value: 38864630,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Jordan</span><br />Population : 38864630'
                    }
                },
                IR: {
                    value: 19445755,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iran, Islamic Republic Of</span><br />Population : 19445755'
                    }
                },
                IQ: {
                    value: 35789929,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iraq</span><br />Population : 35789929'
                    }
                },
                IE: {
                    value: 45575229,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ireland</span><br />Population : 45575229'
                    }
                },
                IS: {
                    value: 33036957,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iceland</span><br />Population : 33036957'
                    }
                },
                IL: {
                    value: 1948110,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Israel</span><br />Population : 1948110'
                    }
                },
                IT: {
                    value: 49090479,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Italy</span><br />Population : 49090479'
                    }
                },
                KZ: {
                    value: 46503855,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kazakhstan</span><br />Population : 46503855'
                    }
                },
                KE: {
                    value: 48150885,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kenya</span><br />Population : 48150885'
                    }
                },
                KG: {
                    value: 50785038,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kyrgyzstan</span><br />Population : 50785038'
                    }
                },
                KI: {
                    value: 44959192,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kiribati</span><br />Population : 44959192'
                    }
                },
                KW: {
                    value: 4262362,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kuwait</span><br />Population : 4262362'
                    }
                },
                LA: {
                    value: 29922040,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lao People\'s Democratic Republic</span><br />Population : 29922040'
                    }
                },
                LS: {
                    value: 59259659,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lesotho</span><br />Population : 59259659'
                    }
                },
                LV: {
                    value: 14036694,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Latvia</span><br />Population : 14036694'
                    }
                },
                LB: {
                    value: 36778879,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lebanon</span><br />Population : 36778879'
                    }
                },
                LR: {
                    value: 13916046,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Liberia</span><br />Population : 13916046'
                    }
                },
                LY: {
                    value: 10525100,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Libya</span><br />Population : 10525100'
                    }
                },
                LI: {
                    value: 36813611,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Liechtenstein</span><br />Population : 36813611'
                    }
                },
                LT: {
                    value: 52331528,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lithuania</span><br />Population : 52331528'
                    }
                },
                LU: {
                    value: 5748529,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Luxembourg</span><br />Population : 5748529'
                    }
                },
                MK: {
                    value: 37484488,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Macedonia, The Former Yugoslav Republic Of</span><br />Population : 37484488'
                    }
                },
                MG: {
                    value: 44030567,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Madagascar</span><br />Population : 44030567'
                    }
                },
                MY: {
                    value: 49048435,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malaysia</span><br />Population : 49048435'
                    }
                },
                MW: {
                    value: 40985114,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malawi</span><br />Population : 40985114'
                    }
                },
                MV: {
                    value: 3490945,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Maldives</span><br />Population : 3490945'
                    }
                },
                ML: {
                    value: 56278186,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mali</span><br />Population : 56278186'
                    }
                },
                MT: {
                    value: 55007724,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malta</span><br />Population : 55007724'
                    }
                },
                MA: {
                    value: 5441424,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Morocco</span><br />Population : 5441424'
                    }
                },
                MU: {
                    value: 41447598,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mauritius</span><br />Population : 41447598'
                    }
                },
                MR: {
                    value: 4297094,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mauritania</span><br />Population : 4297094'
                    }
                },
                MX: {
                    value: 8437521,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mexico</span><br />Population : 8437521'
                    }
                },
                FM: {
                    value: 54483088,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Micronesia, Federated States Of</span><br />Population : 54483088'
                    }
                },
                MD: {
                    value: 14707571,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Moldova, Republic Of</span><br />Population : 14707571'
                    }
                },
                MC: {
                    value: 28477917,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Monaco</span><br />Population : 28477917'
                    }
                },
                MN: {
                    value: 57215952,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mongolia</span><br />Population : 57215952'
                    }
                },
                ME: {
                    value: 14025726,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Montenegro</span><br />Population : 14025726'
                    }
                },
                MZ: {
                    value: 56173990,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mozambique</span><br />Population : 56173990'
                    }
                },
                NA: {
                    value: 59561280,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Namibia</span><br />Population : 59561280'
                    }
                },
                NP: {
                    value: 19771139,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nepal</span><br />Population : 19771139'
                    }
                },
                NI: {
                    value: 39434967,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nicaragua</span><br />Population : 39434967'
                    }
                },
                NE: {
                    value: 29199979,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Niger</span><br />Population : 29199979'
                    }
                },
                NG: {
                    value: 58237806,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nigeria</span><br />Population : 58237806'
                    }
                },
                NO: {
                    value: 43981211,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Norway</span><br />Population : 43981211'
                    }
                },
                NZ: {
                    value: 16526434,
                    tooltip: {
                        content: '<span style="font-weight:bold;">New Zealand</span><br />Population : 16526434'
                    }
                },
                OM: {
                    value: 6788662,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Oman</span><br />Population : 6788662'
                    }
                },
                UG: {
                    value: 15148120,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uganda</span><br />Population : 15148120'
                    }
                },
                UZ: {
                    value: 8174289,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uzbekistan</span><br />Population : 8174289'
                    }
                },
                PK: {
                    value: 40765753,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Pakistan</span><br />Population : 40765753'
                    }
                },
                PS: {
                    value: 31993167,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Palestine, State Of</span><br />Population : 31993167'
                    }
                },
                PA: {
                    value: 10782849,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Panama</span><br />Population : 10782849'
                    }
                },
                PG: {
                    value: 328500,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Papua New Guinea</span><br />Population : 328500'
                    }
                },
                PY: {
                    value: 57868549,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Paraguay</span><br />Population : 57868549'
                    }
                },
                NL: {
                    value: 58016617,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Netherlands</span><br />Population : 58016617'
                    }
                },
                PE: {
                    value: 35782617,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Peru</span><br />Population : 35782617'
                    }
                },
                PH: {
                    value: 18571969,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Philippines</span><br />Population : 18571969'
                    }
                },
                PL: {
                    value: 43500446,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Poland</span><br />Population : 43500446'
                    }
                },
                PT: {
                    value: 8112136,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Portugal</span><br />Population : 8112136'
                    }
                },
                QA: {
                    value: 50838050,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Qatar</span><br />Population : 50838050'
                    }
                },
                DO: {
                    value: 31082822,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Dominican Republic</span><br />Population : 31082822'
                    }
                },
                RO: {
                    value: 3277069,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Romania</span><br />Population : 3277069'
                    }
                },
                GB: {
                    value: 15182852,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United Kingdom</span><br />Population : 15182852'
                    }
                },
                RU: {
                    value: 46589771,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Russian Federation</span><br />Population : 46589771'
                    }
                },
                RW: {
                    value: 35989182,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Rwanda</span><br />Population : 35989182'
                    }
                },
                KN: {
                    value: 32664044,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Kitts And Nevis</span><br />Population : 32664044'
                    }
                },
                SM: {
                    value: 2481887,
                    tooltip: {
                        content: '<span style="font-weight:bold;">San Marino</span><br />Population : 2481887'
                    }
                },
                VC: {
                    value: 43628406,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Vincent And The Grenadines</span><br />Population : 43628406'
                    }
                },
                LC: {
                    value: 1469174,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Lucia</span><br />Population : 1469174'
                    }
                },
                SV: {
                    value: 17476996,
                    tooltip: {
                        content: '<span style="font-weight:bold;">El Salvador</span><br />Population : 17476996'
                    }
                },
                WS: {
                    value: 43012369,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Samoa</span><br />Population : 43012369'
                    }
                },
                ST: {
                    value: 32594580,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sao Tome And Principe</span><br />Population : 32594580'
                    }
                },
                SN: {
                    value: 45450925,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Senegal</span><br />Population : 45450925'
                    }
                },
                RS: {
                    value: 53181549,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Serbia</span><br />Population : 53181549'
                    }
                },
                SC: {
                    value: 127420,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Seychelles</span><br />Population : 127420'
                    }
                },
                SL: {
                    value: 34078919,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sierra Leone</span><br />Population : 34078919'
                    }
                },
                SG: {
                    value: 16312558,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Singapore</span><br />Population : 16312558'
                    }
                },
                SK: {
                    value: 25593329,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Slovakia</span><br />Population : 25593329'
                    }
                },
                SI: {
                    value: 6730166,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Slovenia</span><br />Population : 6730166'
                    }
                },
                SO: {
                    value: 38722046,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Somalia</span><br />Population : 38722046'
                    }
                },
                SD: {
                    value: 31982199,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sudan</span><br />Population : 31982199'
                    }
                },
                SS: {
                    value: 30177960,
                    tooltip: {
                        content: '<span style="font-weight:bold;">South Sudan</span><br />Population : 30177960'
                    }
                },
                LK: {
                    value: 45973734,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sri Lanka</span><br />Population : 45973734'
                    }
                },
                SE: {
                    value: 7214587,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sweden</span><br />Population : 7214587'
                    }
                },
                CH: {
                    value: 737973,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Switzerland</span><br />Population : 737973'
                    }
                },
                SR: {
                    value: 12651068,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Suriname</span><br />Population : 12651068'
                    }
                },
                SZ: {
                    value: 11161245,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Swaziland</span><br />Population : 11161245'
                    }
                },
                SY: {
                    value: 49997168,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Syrian Arab Republic</span><br />Population : 49997168'
                    }
                },
                TJ: {
                    value: 40508005,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tajikistan</span><br />Population : 40508005'
                    }
                },
                TZ: {
                    value: 8578277,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tanzania, United Republic Of</span><br />Population : 8578277'
                    }
                },
                TD: {
                    value: 5245828,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Chad</span><br />Population : 5245828'
                    }
                },
                CZ: {
                    value: 7960412,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Czech Republic</span><br />Population : 7960412'
                    }
                },
                TH: {
                    value: 59570420,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Thailand</span><br />Population : 59570420'
                    }
                },
                TL: {
                    value: 23575214,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Timor-leste</span><br />Population : 23575214'
                    }
                },
                TG: {
                    value: 41330606,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Togo</span><br />Population : 41330606'
                    }
                },
                TO: {
                    value: 51444947,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tonga</span><br />Population : 51444947'
                    }
                },
                TT: {
                    value: 56053342,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Trinidad And Tobago</span><br />Population : 56053342'
                    }
                },
                TN: {
                    value: 33307501,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tunisia</span><br />Population : 33307501'
                    }
                },
                TM: {
                    value: 42668704,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Turkmenistan</span><br />Population : 42668704'
                    }
                },
                TR: {
                    value: 21341394,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Turkey</span><br />Population : 21341394'
                    }
                },
                TV: {
                    value: 58034897,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tuvalu</span><br />Population : 58034897'
                    }
                },
                VU: {
                    value: 43390766,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Vanuatu</span><br />Population : 43390766'
                    }
                },
                VE: {
                    value: 22363248,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Venezuela, Bolivarian Republic Of</span><br />Population : 22363248'
                    }
                },
                VN: {
                    value: 28090381,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Viet Nam</span><br />Population : 28090381'
                    }
                },
                UA: {
                    value: 3743209,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ukraine</span><br />Population : 3743209'
                    }
                },
                UY: {
                    value: 29490631,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uruguay</span><br />Population : 29490631'
                    }
                },
                YE: {
                    value: 23467361,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Yemen</span><br />Population : 23467361'
                    }
                },
                ZM: {
                    value: 32382532,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Zambia</span><br />Population : 32382532'
                    }
                },
                ZW: {
                    value: 41056406,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Zimbabwe</span><br />Population : 41056406'
                    }
                }
            }
        },
        2009: {
            areas: {
                AF: {
                    value: 52466800,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Afghanistan</span><br />Population : 52466800'
                    }
                },
                ZA: {
                    value: 26108826,
                    tooltip: {
                        content: '<span style="font-weight:bold;">South Africa</span><br />Population : 26108826'
                    }
                },
                AL: {
                    value: 53559946,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Albania</span><br />Population : 53559946'
                    }
                },
                DZ: {
                    value: 49796088,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Algeria</span><br />Population : 49796088'
                    }
                },
                DE: {
                    value: 16718374,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Germany</span><br />Population : 16718374'
                    }
                },
                AD: {
                    value: 26774219,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Andorra</span><br />Population : 26774219'
                    }
                },
                AO: {
                    value: 54956540,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Angola</span><br />Population : 54956540'
                    }
                },
                AG: {
                    value: 56018610,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Antigua And Barbuda</span><br />Population : 56018610'
                    }
                },
                SA: {
                    value: 54792020,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saudi Arabia</span><br />Population : 54792020'
                    }
                },
                AR: {
                    value: 47445276,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Argentina</span><br />Population : 47445276'
                    }
                },
                AM: {
                    value: 20670517,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Armenia</span><br />Population : 20670517'
                    }
                },
                AU: {
                    value: 6435858,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Australia</span><br />Population : 6435858'
                    }
                },
                AT: {
                    value: 59990860,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Austria</span><br />Population : 59990860'
                    }
                },
                AZ: {
                    value: 18862622,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Azerbaijan</span><br />Population : 18862622'
                    }
                },
                BS: {
                    value: 8730001,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bahamas</span><br />Population : 8730001'
                    }
                },
                BH: {
                    value: 56413459,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bahrain</span><br />Population : 56413459'
                    }
                },
                BD: {
                    value: 15468020,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bangladesh</span><br />Population : 15468020'
                    }
                },
                BB: {
                    value: 21516882,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Barbados</span><br />Population : 21516882'
                    }
                },
                BE: {
                    value: 47213120,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belgium</span><br />Population : 47213120'
                    }
                },
                BZ: {
                    value: 31867035,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belize</span><br />Population : 31867035'
                    }
                },
                BJ: {
                    value: 54126627,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Benin</span><br />Population : 54126627'
                    }
                },
                BT: {
                    value: 46048682,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bhutan</span><br />Population : 46048682'
                    }
                },
                BY: {
                    value: 14447995,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belarus</span><br />Population : 14447995'
                    }
                },
                MM: {
                    value: 28262213,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Myanmar</span><br />Population : 28262213'
                    }
                },
                BO: {
                    value: 39319803,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bolivia, Plurinational State Of</span><br />Population : 39319803'
                    }
                },
                BA: {
                    value: 53148645,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bosnia And Herzegovina</span><br />Population : 53148645'
                    }
                },
                BW: {
                    value: 58312754,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Botswana</span><br />Population : 58312754'
                    }
                },
                BR: {
                    value: 51214618,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Brazil</span><br />Population : 51214618'
                    }
                },
                BN: {
                    value: 44050675,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Brunei Darussalam</span><br />Population : 44050675'
                    }
                },
                BG: {
                    value: 33457398,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bulgaria</span><br />Population : 33457398'
                    }
                },
                BF: {
                    value: 57135520,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Burkina Faso</span><br />Population : 57135520'
                    }
                },
                BI: {
                    value: 16489874,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Burundi</span><br />Population : 16489874'
                    }
                },
                KH: {
                    value: 51472367,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cambodia</span><br />Population : 51472367'
                    }
                },
                CM: {
                    value: 7565564,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cameroon</span><br />Population : 7565564'
                    }
                },
                CA: {
                    value: 38994418,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Canada</span><br />Population : 38994418'
                    }
                },
                CV: {
                    value: 49503608,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cape Verde</span><br />Population : 49503608'
                    }
                },
                CF: {
                    value: 14788003,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Central African Republic</span><br />Population : 14788003'
                    }
                },
                CL: {
                    value: 26013769,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Chile</span><br />Population : 26013769'
                    }
                },
                CN: {
                    value: 2017575,
                    tooltip: {
                        content: '<span style="font-weight:bold;">China</span><br />Population : 2017575'
                    }
                },
                CY: {
                    value: 6121441,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cyprus</span><br />Population : 6121441'
                    }
                },
                CO: {
                    value: 36950711,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Colombia</span><br />Population : 36950711'
                    }
                },
                KM: {
                    value: 49492639,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Comoros</span><br />Population : 49492639'
                    }
                },
                CG: {
                    value: 34183115,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Congo</span><br />Population : 34183115'
                    }
                },
                CD: {
                    value: 11759002,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Congo, The Democratic Republic Of The</span><br />Population : 11759002'
                    }
                },
                KP: {
                    value: 11263614,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Korea, Democratic People\'s Republic Of</span><br />Population : 11263614'
                    }
                },
                KR: {
                    value: 8742797,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Korea, Republic Of</span><br />Population : 8742797'
                    }
                },
                CR: {
                    value: 13819162,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Costa Rica</span><br />Population : 13819162'
                    }
                },
                CI: {
                    value: 42081915,
                    tooltip: {
                        content: '<span style="font-weight:bold;">CÔte D\'ivoire</span><br />Population : 42081915'
                    }
                },
                HR: {
                    value: 40679837,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Croatia</span><br />Population : 40679837'
                    }
                },
                CU: {
                    value: 44154871,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cuba</span><br />Population : 44154871'
                    }
                },
                DK: {
                    value: 28903842,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Denmark</span><br />Population : 28903842'
                    }
                },
                DJ: {
                    value: 42805805,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Djibouti</span><br />Population : 42805805'
                    }
                },
                DM: {
                    value: 18502505,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Dominica</span><br />Population : 18502505'
                    }
                },
                EG: {
                    value: 26569482,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Egypt</span><br />Population : 26569482'
                    }
                },
                AE: {
                    value: 17665280,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United Arab Emirates</span><br />Population : 17665280'
                    }
                },
                EC: {
                    value: 49496295,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ecuador</span><br />Population : 49496295'
                    }
                },
                ER: {
                    value: 47684745,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Eritrea</span><br />Population : 47684745'
                    }
                },
                ES: {
                    value: 36477258,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Spain</span><br />Population : 36477258'
                    }
                },
                EE: {
                    value: 8181601,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Estonia</span><br />Population : 8181601'
                    }
                },
                US: {
                    value: 7869012,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United States</span><br />Population : 7869012'
                    }
                },
                ET: {
                    value: 21529678,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ethiopia</span><br />Population : 21529678'
                    }
                },
                FJ: {
                    value: 4618823,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Fiji</span><br />Population : 4618823'
                    }
                },
                FI: {
                    value: 58480930,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Finland</span><br />Population : 58480930'
                    }
                },
                FR: {
                    value: 13389581,
                    tooltip: {
                        content: '<span style="font-weight:bold;">France</span><br />Population : 13389581'
                    }
                },
                GA: {
                    value: 42990433,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Gabon</span><br />Population : 42990433'
                    }
                },
                GM: {
                    value: 11484802,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Gambia</span><br />Population : 11484802'
                    }
                },
                GE: {
                    value: 16941391,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Georgia</span><br />Population : 16941391'
                    }
                },
                GH: {
                    value: 11773626,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ghana</span><br />Population : 11773626'
                    }
                },
                GR: {
                    value: 5370132,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Greece</span><br />Population : 5370132'
                    }
                },
                GD: {
                    value: 47715821,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Grenada</span><br />Population : 47715821'
                    }
                },
                GT: {
                    value: 1491110,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guatemala</span><br />Population : 1491110'
                    }
                },
                GN: {
                    value: 38586774,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guinea</span><br />Population : 38586774'
                    }
                },
                GQ: {
                    value: 11621902,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Equatorial Guinea</span><br />Population : 11621902'
                    }
                },
                GW: {
                    value: 14102502,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guinea-bissau</span><br />Population : 14102502'
                    }
                },
                GY: {
                    value: 40208212,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guyana</span><br />Population : 40208212'
                    }
                },
                HT: {
                    value: 39544647,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Haiti</span><br />Population : 39544647'
                    }
                },
                HN: {
                    value: 14948868,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Honduras</span><br />Population : 14948868'
                    }
                },
                HU: {
                    value: 21085473,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Hungary</span><br />Population : 21085473'
                    }
                },
                JM: {
                    value: 11420822,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Jamaica</span><br />Population : 11420822'
                    }
                },
                JP: {
                    value: 50212873,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Japan</span><br />Population : 50212873'
                    }
                },
                MH: {
                    value: 58404154,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Marshall Islands</span><br />Population : 58404154'
                    }
                },
                PW: {
                    value: 29355359,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Palau</span><br />Population : 29355359'
                    }
                },
                SB: {
                    value: 3107064,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Solomon Islands</span><br />Population : 3107064'
                    }
                },
                IN: {
                    value: 16307074,
                    tooltip: {
                        content: '<span style="font-weight:bold;">India</span><br />Population : 16307074'
                    }
                },
                ID: {
                    value: 35290884,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Indonesia</span><br />Population : 35290884'
                    }
                },
                JO: {
                    value: 29552783,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Jordan</span><br />Population : 29552783'
                    }
                },
                IR: {
                    value: 13395065,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iran, Islamic Republic Of</span><br />Population : 13395065'
                    }
                },
                IQ: {
                    value: 33292877,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iraq</span><br />Population : 33292877'
                    }
                },
                IE: {
                    value: 48562186,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ireland</span><br />Population : 48562186'
                    }
                },
                IS: {
                    value: 42268372,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iceland</span><br />Population : 42268372'
                    }
                },
                IL: {
                    value: 10462948,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Israel</span><br />Population : 10462948'
                    }
                },
                IT: {
                    value: 46885907,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Italy</span><br />Population : 46885907'
                    }
                },
                KZ: {
                    value: 51421183,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kazakhstan</span><br />Population : 51421183'
                    }
                },
                KE: {
                    value: 58142749,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kenya</span><br />Population : 58142749'
                    }
                },
                KG: {
                    value: 52338840,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kyrgyzstan</span><br />Population : 52338840'
                    }
                },
                KI: {
                    value: 32751788,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kiribati</span><br />Population : 32751788'
                    }
                },
                KW: {
                    value: 27020999,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kuwait</span><br />Population : 27020999'
                    }
                },
                LA: {
                    value: 37866541,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lao People\'s Democratic Republic</span><br />Population : 37866541'
                    }
                },
                LS: {
                    value: 47300864,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lesotho</span><br />Population : 47300864'
                    }
                },
                LV: {
                    value: 56406147,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Latvia</span><br />Population : 56406147'
                    }
                },
                LB: {
                    value: 48364762,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lebanon</span><br />Population : 48364762'
                    }
                },
                LR: {
                    value: 31980371,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Liberia</span><br />Population : 31980371'
                    }
                },
                LY: {
                    value: 53377146,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Libya</span><br />Population : 53377146'
                    }
                },
                LI: {
                    value: 33614606,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Liechtenstein</span><br />Population : 33614606'
                    }
                },
                LT: {
                    value: 38705594,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lithuania</span><br />Population : 38705594'
                    }
                },
                LU: {
                    value: 1174865,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Luxembourg</span><br />Population : 1174865'
                    }
                },
                MK: {
                    value: 38745810,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Macedonia, The Former Yugoslav Republic Of</span><br />Population : 38745810'
                    }
                },
                MG: {
                    value: 29892792,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Madagascar</span><br />Population : 29892792'
                    }
                },
                MY: {
                    value: 11146621,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malaysia</span><br />Population : 11146621'
                    }
                },
                MW: {
                    value: 55890650,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malawi</span><br />Population : 55890650'
                    }
                },
                MV: {
                    value: 1534982,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Maldives</span><br />Population : 1534982'
                    }
                },
                ML: {
                    value: 20906329,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mali</span><br />Population : 20906329'
                    }
                },
                MT: {
                    value: 8740969,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malta</span><br />Population : 8740969'
                    }
                },
                MA: {
                    value: 37018347,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Morocco</span><br />Population : 37018347'
                    }
                },
                MU: {
                    value: 29722787,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mauritius</span><br />Population : 29722787'
                    }
                },
                MR: {
                    value: 12270843,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mauritania</span><br />Population : 12270843'
                    }
                },
                MX: {
                    value: 44591764,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mexico</span><br />Population : 44591764'
                    }
                },
                FM: {
                    value: 54998584,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Micronesia, Federated States Of</span><br />Population : 54998584'
                    }
                },
                MD: {
                    value: 1637350,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Moldova, Republic Of</span><br />Population : 1637350'
                    }
                },
                MC: {
                    value: 39551959,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Monaco</span><br />Population : 39551959'
                    }
                },
                MN: {
                    value: 41952127,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mongolia</span><br />Population : 41952127'
                    }
                },
                ME: {
                    value: 10621985,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Montenegro</span><br />Population : 10621985'
                    }
                },
                MZ: {
                    value: 5256796,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mozambique</span><br />Population : 5256796'
                    }
                },
                NA: {
                    value: 48465302,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Namibia</span><br />Population : 48465302'
                    }
                },
                NP: {
                    value: 13925186,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nepal</span><br />Population : 13925186'
                    }
                },
                NI: {
                    value: 14329175,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nicaragua</span><br />Population : 14329175'
                    }
                },
                NE: {
                    value: 38709250,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Niger</span><br />Population : 38709250'
                    }
                },
                NG: {
                    value: 14676495,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nigeria</span><br />Population : 14676495'
                    }
                },
                NO: {
                    value: 3564065,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Norway</span><br />Population : 3564065'
                    }
                },
                NZ: {
                    value: 26810779,
                    tooltip: {
                        content: '<span style="font-weight:bold;">New Zealand</span><br />Population : 26810779'
                    }
                },
                OM: {
                    value: 10272836,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Oman</span><br />Population : 10272836'
                    }
                },
                UG: {
                    value: 3701165,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uganda</span><br />Population : 3701165'
                    }
                },
                UZ: {
                    value: 23971890,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uzbekistan</span><br />Population : 23971890'
                    }
                },
                PK: {
                    value: 38707422,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Pakistan</span><br />Population : 38707422'
                    }
                },
                PS: {
                    value: 37875681,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Palestine, State Of</span><br />Population : 37875681'
                    }
                },
                PA: {
                    value: 51104938,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Panama</span><br />Population : 51104938'
                    }
                },
                PG: {
                    value: 58301786,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Papua New Guinea</span><br />Population : 58301786'
                    }
                },
                PY: {
                    value: 10709729,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Paraguay</span><br />Population : 10709729'
                    }
                },
                NL: {
                    value: 29795908,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Netherlands</span><br />Population : 29795908'
                    }
                },
                PE: {
                    value: 42703436,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Peru</span><br />Population : 42703436'
                    }
                },
                PH: {
                    value: 59756876,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Philippines</span><br />Population : 59756876'
                    }
                },
                PL: {
                    value: 53258326,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Poland</span><br />Population : 53258326'
                    }
                },
                PT: {
                    value: 44061643,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Portugal</span><br />Population : 44061643'
                    }
                },
                QA: {
                    value: 14062286,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Qatar</span><br />Population : 14062286'
                    }
                },
                DO: {
                    value: 11490286,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Dominican Republic</span><br />Population : 11490286'
                    }
                },
                RO: {
                    value: 7243835,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Romania</span><br />Population : 7243835'
                    }
                },
                GB: {
                    value: 48851010,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United Kingdom</span><br />Population : 48851010'
                    }
                },
                RU: {
                    value: 30697113,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Russian Federation</span><br />Population : 30697113'
                    }
                },
                RW: {
                    value: 46405142,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Rwanda</span><br />Population : 46405142'
                    }
                },
                KN: {
                    value: 43006885,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Kitts And Nevis</span><br />Population : 43006885'
                    }
                },
                SM: {
                    value: 42292136,
                    tooltip: {
                        content: '<span style="font-weight:bold;">San Marino</span><br />Population : 42292136'
                    }
                },
                VC: {
                    value: 8373541,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Vincent And The Grenadines</span><br />Population : 8373541'
                    }
                },
                LC: {
                    value: 27854568,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Lucia</span><br />Population : 27854568'
                    }
                },
                SV: {
                    value: 1438098,
                    tooltip: {
                        content: '<span style="font-weight:bold;">El Salvador</span><br />Population : 1438098'
                    }
                },
                WS: {
                    value: 52463144,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Samoa</span><br />Population : 52463144'
                    }
                },
                ST: {
                    value: 12607196,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sao Tome And Principe</span><br />Population : 12607196'
                    }
                },
                SN: {
                    value: 28841690,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Senegal</span><br />Population : 28841690'
                    }
                },
                RS: {
                    value: 52878101,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Serbia</span><br />Population : 52878101'
                    }
                },
                SC: {
                    value: 17592160,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Seychelles</span><br />Population : 17592160'
                    }
                },
                SL: {
                    value: 19063702,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sierra Leone</span><br />Population : 19063702'
                    }
                },
                SG: {
                    value: 32519632,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Singapore</span><br />Population : 32519632'
                    }
                },
                SK: {
                    value: 38217517,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Slovakia</span><br />Population : 38217517'
                    }
                },
                SI: {
                    value: 25657309,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Slovenia</span><br />Population : 25657309'
                    }
                },
                SO: {
                    value: 33358685,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Somalia</span><br />Population : 33358685'
                    }
                },
                SD: {
                    value: 51991520,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sudan</span><br />Population : 51991520'
                    }
                },
                SS: {
                    value: 7996972,
                    tooltip: {
                        content: '<span style="font-weight:bold;">South Sudan</span><br />Population : 7996972'
                    }
                },
                LK: {
                    value: 14886715,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sri Lanka</span><br />Population : 14886715'
                    }
                },
                SE: {
                    value: 31157770,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sweden</span><br />Population : 31157770'
                    }
                },
                CH: {
                    value: 10510476,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Switzerland</span><br />Population : 10510476'
                    }
                },
                SR: {
                    value: 42707092,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Suriname</span><br />Population : 42707092'
                    }
                },
                SZ: {
                    value: 13358505,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Swaziland</span><br />Population : 13358505'
                    }
                },
                SY: {
                    value: 18076581,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Syrian Arab Republic</span><br />Population : 18076581'
                    }
                },
                TJ: {
                    value: 40979630,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tajikistan</span><br />Population : 40979630'
                    }
                },
                TZ: {
                    value: 13188501,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tanzania, United Republic Of</span><br />Population : 13188501'
                    }
                },
                TD: {
                    value: 19200802,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Chad</span><br />Population : 19200802'
                    }
                },
                CZ: {
                    value: 29680743,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Czech Republic</span><br />Population : 29680743'
                    }
                },
                TH: {
                    value: 6752102,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Thailand</span><br />Population : 6752102'
                    }
                },
                TL: {
                    value: 59831824,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Timor-leste</span><br />Population : 59831824'
                    }
                },
                TG: {
                    value: 591732,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Togo</span><br />Population : 591732'
                    }
                },
                TO: {
                    value: 11685882,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tonga</span><br />Population : 11685882'
                    }
                },
                TT: {
                    value: 40731021,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Trinidad And Tobago</span><br />Population : 40731021'
                    }
                },
                TN: {
                    value: 53477686,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tunisia</span><br />Population : 53477686'
                    }
                },
                TM: {
                    value: 15559421,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Turkmenistan</span><br />Population : 15559421'
                    }
                },
                TR: {
                    value: 59557624,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Turkey</span><br />Population : 59557624'
                    }
                },
                TV: {
                    value: 6269509,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tuvalu</span><br />Population : 6269509'
                    }
                },
                VU: {
                    value: 14716711,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Vanuatu</span><br />Population : 14716711'
                    }
                },
                VE: {
                    value: 32281992,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Venezuela, Bolivarian Republic Of</span><br />Population : 32281992'
                    }
                },
                VN: {
                    value: 59111591,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Viet Nam</span><br />Population : 59111591'
                    }
                },
                UA: {
                    value: 36270694,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ukraine</span><br />Population : 36270694'
                    }
                },
                UY: {
                    value: 53989527,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uruguay</span><br />Population : 53989527'
                    }
                },
                YE: {
                    value: 48887571,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Yemen</span><br />Population : 48887571'
                    }
                },
                ZM: {
                    value: 45913410,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Zambia</span><br />Population : 45913410'
                    }
                },
                ZW: {
                    value: 53987699,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Zimbabwe</span><br />Population : 53987699'
                    }
                }
            }
        },
        2010: {
            areas: {
                AF: {
                    value: 44310251,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Afghanistan</span><br />Population : 44310251'
                    }
                },
                ZA: {
                    value: 33673102,
                    tooltip: {
                        content: '<span style="font-weight:bold;">South Africa</span><br />Population : 33673102'
                    }
                },
                AL: {
                    value: 15131668,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Albania</span><br />Population : 15131668'
                    }
                },
                DZ: {
                    value: 37266956,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Algeria</span><br />Population : 37266956'
                    }
                },
                DE: {
                    value: 49333603,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Germany</span><br />Population : 49333603'
                    }
                },
                AD: {
                    value: 15912225,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Andorra</span><br />Population : 15912225'
                    }
                },
                AO: {
                    value: 14714883,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Angola</span><br />Population : 14714883'
                    }
                },
                AG: {
                    value: 55481177,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Antigua And Barbuda</span><br />Population : 55481177'
                    }
                },
                SA: {
                    value: 46752463,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saudi Arabia</span><br />Population : 46752463'
                    }
                },
                AR: {
                    value: 7861700,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Argentina</span><br />Population : 7861700'
                    }
                },
                AM: {
                    value: 54426419,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Armenia</span><br />Population : 54426419'
                    }
                },
                AU: {
                    value: 15082312,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Australia</span><br />Population : 15082312'
                    }
                },
                AT: {
                    value: 4744955,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Austria</span><br />Population : 4744955'
                    }
                },
                AZ: {
                    value: 15137152,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Azerbaijan</span><br />Population : 15137152'
                    }
                },
                BS: {
                    value: 27569400,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bahamas</span><br />Population : 27569400'
                    }
                },
                BH: {
                    value: 26510986,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bahrain</span><br />Population : 26510986'
                    }
                },
                BD: {
                    value: 41239206,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bangladesh</span><br />Population : 41239206'
                    }
                },
                BB: {
                    value: 13404205,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Barbados</span><br />Population : 13404205'
                    }
                },
                BE: {
                    value: 37096951,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belgium</span><br />Population : 37096951'
                    }
                },
                BZ: {
                    value: 50457825,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belize</span><br />Population : 50457825'
                    }
                },
                BJ: {
                    value: 4613339,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Benin</span><br />Population : 4613339'
                    }
                },
                BT: {
                    value: 8278485,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bhutan</span><br />Population : 8278485'
                    }
                },
                BY: {
                    value: 36212198,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belarus</span><br />Population : 36212198'
                    }
                },
                MM: {
                    value: 17663452,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Myanmar</span><br />Population : 17663452'
                    }
                },
                BO: {
                    value: 12795480,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bolivia, Plurinational State Of</span><br />Population : 12795480'
                    }
                },
                BA: {
                    value: 35325617,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bosnia And Herzegovina</span><br />Population : 35325617'
                    }
                },
                BW: {
                    value: 8068264,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Botswana</span><br />Population : 8068264'
                    }
                },
                BR: {
                    value: 8618493,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Brazil</span><br />Population : 8618493'
                    }
                },
                BN: {
                    value: 33963754,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Brunei Darussalam</span><br />Population : 33963754'
                    }
                },
                BG: {
                    value: 40261225,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bulgaria</span><br />Population : 40261225'
                    }
                },
                BF: {
                    value: 25668277,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Burkina Faso</span><br />Population : 25668277'
                    }
                },
                BI: {
                    value: 13963574,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Burundi</span><br />Population : 13963574'
                    }
                },
                KH: {
                    value: 6346286,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cambodia</span><br />Population : 6346286'
                    }
                },
                CM: {
                    value: 58650934,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cameroon</span><br />Population : 58650934'
                    }
                },
                CA: {
                    value: 12265359,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Canada</span><br />Population : 12265359'
                    }
                },
                CV: {
                    value: 54289319,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cape Verde</span><br />Population : 54289319'
                    }
                },
                CF: {
                    value: 17921200,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Central African Republic</span><br />Population : 17921200'
                    }
                },
                CL: {
                    value: 36210370,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Chile</span><br />Population : 36210370'
                    }
                },
                CN: {
                    value: 40862638,
                    tooltip: {
                        content: '<span style="font-weight:bold;">China</span><br />Population : 40862638'
                    }
                },
                CY: {
                    value: 436352,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cyprus</span><br />Population : 436352'
                    }
                },
                CO: {
                    value: 6916623,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Colombia</span><br />Population : 6916623'
                    }
                },
                KM: {
                    value: 8505157,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Comoros</span><br />Population : 8505157'
                    }
                },
                CG: {
                    value: 34713236,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Congo</span><br />Population : 34713236'
                    }
                },
                CD: {
                    value: 52695301,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Congo, The Democratic Republic Of The</span><br />Population : 52695301'
                    }
                },
                KP: {
                    value: 1410678,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Korea, Democratic People\'s Republic Of</span><br />Population : 1410678'
                    }
                },
                KR: {
                    value: 41050922,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Korea, Republic Of</span><br />Population : 41050922'
                    }
                },
                CR: {
                    value: 6920279,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Costa Rica</span><br />Population : 6920279'
                    }
                },
                CI: {
                    value: 22006787,
                    tooltip: {
                        content: '<span style="font-weight:bold;">CÔte D\'ivoire</span><br />Population : 22006787'
                    }
                },
                HR: {
                    value: 59431492,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Croatia</span><br />Population : 59431492'
                    }
                },
                CU: {
                    value: 49613288,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cuba</span><br />Population : 49613288'
                    }
                },
                DK: {
                    value: 536892,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Denmark</span><br />Population : 536892'
                    }
                },
                DJ: {
                    value: 48761438,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Djibouti</span><br />Population : 48761438'
                    }
                },
                DM: {
                    value: 29357187,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Dominica</span><br />Population : 29357187'
                    }
                },
                EG: {
                    value: 39807880,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Egypt</span><br />Population : 39807880'
                    }
                },
                AE: {
                    value: 28666202,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United Arab Emirates</span><br />Population : 28666202'
                    }
                },
                EC: {
                    value: 3799877,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ecuador</span><br />Population : 3799877'
                    }
                },
                ER: {
                    value: 29115890,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Eritrea</span><br />Population : 29115890'
                    }
                },
                ES: {
                    value: 47200324,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Spain</span><br />Population : 47200324'
                    }
                },
                EE: {
                    value: 14561331,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Estonia</span><br />Population : 14561331'
                    }
                },
                US: {
                    value: 27512732,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United States</span><br />Population : 27512732'
                    }
                },
                ET: {
                    value: 26885727,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ethiopia</span><br />Population : 26885727'
                    }
                },
                FJ: {
                    value: 17506244,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Fiji</span><br />Population : 17506244'
                    }
                },
                FI: {
                    value: 31225406,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Finland</span><br />Population : 31225406'
                    }
                },
                FR: {
                    value: 50640625,
                    tooltip: {
                        content: '<span style="font-weight:bold;">France</span><br />Population : 50640625'
                    }
                },
                GA: {
                    value: 20794821,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Gabon</span><br />Population : 20794821'
                    }
                },
                GM: {
                    value: 46191266,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Gambia</span><br />Population : 46191266'
                    }
                },
                GE: {
                    value: 1911550,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Georgia</span><br />Population : 1911550'
                    }
                },
                GH: {
                    value: 33874182,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ghana</span><br />Population : 33874182'
                    }
                },
                GR: {
                    value: 38921298,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Greece</span><br />Population : 38921298'
                    }
                },
                GD: {
                    value: 19071014,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Grenada</span><br />Population : 19071014'
                    }
                },
                GT: {
                    value: 59522892,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guatemala</span><br />Population : 59522892'
                    }
                },
                GN: {
                    value: 27754028,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guinea</span><br />Population : 27754028'
                    }
                },
                GQ: {
                    value: 19493283,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Equatorial Guinea</span><br />Population : 19493283'
                    }
                },
                GW: {
                    value: 31611115,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guinea-bissau</span><br />Population : 31611115'
                    }
                },
                GY: {
                    value: 7512552,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guyana</span><br />Population : 7512552'
                    }
                },
                HT: {
                    value: 52870789,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Haiti</span><br />Population : 52870789'
                    }
                },
                HN: {
                    value: 50488901,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Honduras</span><br />Population : 50488901'
                    }
                },
                HU: {
                    value: 29527191,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Hungary</span><br />Population : 29527191'
                    }
                },
                JM: {
                    value: 38683658,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Jamaica</span><br />Population : 38683658'
                    }
                },
                JP: {
                    value: 39965088,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Japan</span><br />Population : 39965088'
                    }
                },
                MH: {
                    value: 10236276,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Marshall Islands</span><br />Population : 10236276'
                    }
                },
                PW: {
                    value: 48384870,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Palau</span><br />Population : 48384870'
                    }
                },
                SB: {
                    value: 16389334,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Solomon Islands</span><br />Population : 16389334'
                    }
                },
                IN: {
                    value: 9627551,
                    tooltip: {
                        content: '<span style="font-weight:bold;">India</span><br />Population : 9627551'
                    }
                },
                ID: {
                    value: 46613535,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Indonesia</span><br />Population : 46613535'
                    }
                },
                JO: {
                    value: 33899774,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Jordan</span><br />Population : 33899774'
                    }
                },
                IR: {
                    value: 13632705,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iran, Islamic Republic Of</span><br />Population : 13632705'
                    }
                },
                IQ: {
                    value: 12398803,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iraq</span><br />Population : 12398803'
                    }
                },
                IE: {
                    value: 37948801,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ireland</span><br />Population : 37948801'
                    }
                },
                IS: {
                    value: 21637530,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iceland</span><br />Population : 21637530'
                    }
                },
                IL: {
                    value: 13566897,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Israel</span><br />Population : 13566897'
                    }
                },
                IT: {
                    value: 8969470,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Italy</span><br />Population : 8969470'
                    }
                },
                KZ: {
                    value: 12320199,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kazakhstan</span><br />Population : 12320199'
                    }
                },
                KE: {
                    value: 17213763,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kenya</span><br />Population : 17213763'
                    }
                },
                KG: {
                    value: 29295035,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kyrgyzstan</span><br />Population : 29295035'
                    }
                },
                KI: {
                    value: 49880176,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kiribati</span><br />Population : 49880176'
                    }
                },
                KW: {
                    value: 27755856,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kuwait</span><br />Population : 27755856'
                    }
                },
                LA: {
                    value: 56194098,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lao People\'s Democratic Republic</span><br />Population : 56194098'
                    }
                },
                LS: {
                    value: 43970243,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lesotho</span><br />Population : 43970243'
                    }
                },
                LV: {
                    value: 35921546,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Latvia</span><br />Population : 35921546'
                    }
                },
                LB: {
                    value: 52433896,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lebanon</span><br />Population : 52433896'
                    }
                },
                LR: {
                    value: 24394159,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Liberia</span><br />Population : 24394159'
                    }
                },
                LY: {
                    value: 10795645,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Libya</span><br />Population : 10795645'
                    }
                },
                LI: {
                    value: 17634204,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Liechtenstein</span><br />Population : 17634204'
                    }
                },
                LT: {
                    value: 24582443,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lithuania</span><br />Population : 24582443'
                    }
                },
                LU: {
                    value: 17279571,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Luxembourg</span><br />Population : 17279571'
                    }
                },
                MK: {
                    value: 32724368,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Macedonia, The Former Yugoslav Republic Of</span><br />Population : 32724368'
                    }
                },
                MG: {
                    value: 15608777,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Madagascar</span><br />Population : 15608777'
                    }
                },
                MY: {
                    value: 32179623,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malaysia</span><br />Population : 32179623'
                    }
                },
                MW: {
                    value: 40465961,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malawi</span><br />Population : 40465961'
                    }
                },
                MV: {
                    value: 3059536,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Maldives</span><br />Population : 3059536'
                    }
                },
                ML: {
                    value: 20485889,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mali</span><br />Population : 20485889'
                    }
                },
                MT: {
                    value: 13453561,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malta</span><br />Population : 13453561'
                    }
                },
                MA: {
                    value: 9718951,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Morocco</span><br />Population : 9718951'
                    }
                },
                MU: {
                    value: 24754275,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mauritius</span><br />Population : 24754275'
                    }
                },
                MR: {
                    value: 52856165,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mauritania</span><br />Population : 52856165'
                    }
                },
                MX: {
                    value: 56382383,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mexico</span><br />Population : 56382383'
                    }
                },
                FM: {
                    value: 50454169,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Micronesia, Federated States Of</span><br />Population : 50454169'
                    }
                },
                MD: {
                    value: 51011710,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Moldova, Republic Of</span><br />Population : 51011710'
                    }
                },
                MC: {
                    value: 43460230,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Monaco</span><br />Population : 43460230'
                    }
                },
                MN: {
                    value: 39294211,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mongolia</span><br />Population : 39294211'
                    }
                },
                ME: {
                    value: 18537237,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Montenegro</span><br />Population : 18537237'
                    }
                },
                MZ: {
                    value: 5084964,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mozambique</span><br />Population : 5084964'
                    }
                },
                NA: {
                    value: 12888708,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Namibia</span><br />Population : 12888708'
                    }
                },
                NP: {
                    value: 50167173,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nepal</span><br />Population : 50167173'
                    }
                },
                NI: {
                    value: 39383783,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nicaragua</span><br />Population : 39383783'
                    }
                },
                NE: {
                    value: 19877164,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Niger</span><br />Population : 19877164'
                    }
                },
                NG: {
                    value: 11682226,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nigeria</span><br />Population : 11682226'
                    }
                },
                NO: {
                    value: 27229391,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Norway</span><br />Population : 27229391'
                    }
                },
                NZ: {
                    value: 28759430,
                    tooltip: {
                        content: '<span style="font-weight:bold;">New Zealand</span><br />Population : 28759430'
                    }
                },
                OM: {
                    value: 18641434,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Oman</span><br />Population : 18641434'
                    }
                },
                UG: {
                    value: 531408,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uganda</span><br />Population : 531408'
                    }
                },
                UZ: {
                    value: 58458994,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uzbekistan</span><br />Population : 58458994'
                    }
                },
                PK: {
                    value: 52179804,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Pakistan</span><br />Population : 52179804'
                    }
                },
                PS: {
                    value: 14480899,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Palestine, State Of</span><br />Population : 14480899'
                    }
                },
                PA: {
                    value: 29976880,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Panama</span><br />Population : 29976880'
                    }
                },
                PG: {
                    value: 22184103,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Papua New Guinea</span><br />Population : 22184103'
                    }
                },
                PY: {
                    value: 25410528,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Paraguay</span><br />Population : 25410528'
                    }
                },
                NL: {
                    value: 50448685,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Netherlands</span><br />Population : 50448685'
                    }
                },
                PE: {
                    value: 809265,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Peru</span><br />Population : 809265'
                    }
                },
                PH: {
                    value: 6382846,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Philippines</span><br />Population : 6382846'
                    }
                },
                PL: {
                    value: 13967230,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Poland</span><br />Population : 13967230'
                    }
                },
                PT: {
                    value: 19847915,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Portugal</span><br />Population : 19847915'
                    }
                },
                QA: {
                    value: 23469189,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Qatar</span><br />Population : 23469189'
                    }
                },
                DO: {
                    value: 9183346,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Dominican Republic</span><br />Population : 9183346'
                    }
                },
                RO: {
                    value: 53415534,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Romania</span><br />Population : 53415534'
                    }
                },
                GB: {
                    value: 25631717,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United Kingdom</span><br />Population : 25631717'
                    }
                },
                RU: {
                    value: 58647278,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Russian Federation</span><br />Population : 58647278'
                    }
                },
                RW: {
                    value: 58663730,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Rwanda</span><br />Population : 58663730'
                    }
                },
                KN: {
                    value: 29571063,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Kitts And Nevis</span><br />Population : 29571063'
                    }
                },
                SM: {
                    value: 21003213,
                    tooltip: {
                        content: '<span style="font-weight:bold;">San Marino</span><br />Population : 21003213'
                    }
                },
                VC: {
                    value: 37084155,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Vincent And The Grenadines</span><br />Population : 37084155'
                    }
                },
                LC: {
                    value: 33152121,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Lucia</span><br />Population : 33152121'
                    }
                },
                SV: {
                    value: 37899445,
                    tooltip: {
                        content: '<span style="font-weight:bold;">El Salvador</span><br />Population : 37899445'
                    }
                },
                WS: {
                    value: 49015531,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Samoa</span><br />Population : 49015531'
                    }
                },
                ST: {
                    value: 39270447,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sao Tome And Principe</span><br />Population : 39270447'
                    }
                },
                SN: {
                    value: 20626645,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Senegal</span><br />Population : 20626645'
                    }
                },
                RS: {
                    value: 24116302,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Serbia</span><br />Population : 24116302'
                    }
                },
                SC: {
                    value: 2971792,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Seychelles</span><br />Population : 2971792'
                    }
                },
                SL: {
                    value: 55846778,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sierra Leone</span><br />Population : 55846778'
                    }
                },
                SG: {
                    value: 19215426,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Singapore</span><br />Population : 19215426'
                    }
                },
                SK: {
                    value: 23787262,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Slovakia</span><br />Population : 23787262'
                    }
                },
                SI: {
                    value: 45725125,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Slovenia</span><br />Population : 45725125'
                    }
                },
                SO: {
                    value: 47503772,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Somalia</span><br />Population : 47503772'
                    }
                },
                SD: {
                    value: 56996592,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sudan</span><br />Population : 56996592'
                    }
                },
                SS: {
                    value: 42527948,
                    tooltip: {
                        content: '<span style="font-weight:bold;">South Sudan</span><br />Population : 42527948'
                    }
                },
                LK: {
                    value: 10678653,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sri Lanka</span><br />Population : 10678653'
                    }
                },
                SE: {
                    value: 4882055,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sweden</span><br />Population : 4882055'
                    }
                },
                CH: {
                    value: 12298263,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Switzerland</span><br />Population : 12298263'
                    }
                },
                SR: {
                    value: 56003986,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Suriname</span><br />Population : 56003986'
                    }
                },
                SZ: {
                    value: 785501,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Swaziland</span><br />Population : 785501'
                    }
                },
                SY: {
                    value: 8472253,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Syrian Arab Republic</span><br />Population : 8472253'
                    }
                },
                TJ: {
                    value: 32998569,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tajikistan</span><br />Population : 32998569'
                    }
                },
                TZ: {
                    value: 9930999,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tanzania, United Republic Of</span><br />Population : 9930999'
                    }
                },
                TD: {
                    value: 29148795,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Chad</span><br />Population : 29148795'
                    }
                },
                CZ: {
                    value: 48914991,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Czech Republic</span><br />Population : 48914991'
                    }
                },
                TH: {
                    value: 57325632,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Thailand</span><br />Population : 57325632'
                    }
                },
                TL: {
                    value: 59674616,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Timor-leste</span><br />Population : 59674616'
                    }
                },
                TG: {
                    value: 19021658,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Togo</span><br />Population : 19021658'
                    }
                },
                TO: {
                    value: 27000891,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tonga</span><br />Population : 27000891'
                    }
                },
                TT: {
                    value: 53457578,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Trinidad And Tobago</span><br />Population : 53457578'
                    }
                },
                TN: {
                    value: 31150458,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tunisia</span><br />Population : 31150458'
                    }
                },
                TM: {
                    value: 43407218,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Turkmenistan</span><br />Population : 43407218'
                    }
                },
                TR: {
                    value: 53170581,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Turkey</span><br />Population : 53170581'
                    }
                },
                TV: {
                    value: 19522531,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tuvalu</span><br />Population : 19522531'
                    }
                },
                VU: {
                    value: 19824151,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Vanuatu</span><br />Population : 19824151'
                    }
                },
                VE: {
                    value: 25558597,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Venezuela, Bolivarian Republic Of</span><br />Population : 25558597'
                    }
                },
                VN: {
                    value: 28214685,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Viet Nam</span><br />Population : 28214685'
                    }
                },
                UA: {
                    value: 43498618,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ukraine</span><br />Population : 43498618'
                    }
                },
                UY: {
                    value: 31311322,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uruguay</span><br />Population : 31311322'
                    }
                },
                YE: {
                    value: 38478922,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Yemen</span><br />Population : 38478922'
                    }
                },
                ZM: {
                    value: 2673828,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Zambia</span><br />Population : 2673828'
                    }
                },
                ZW: {
                    value: 3713961,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Zimbabwe</span><br />Population : 3713961'
                    }
                }
            }
        },
        2011: {
            areas: {
                AF: {
                    value: 59288907,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Afghanistan</span><br />Population : 59288907'
                    }
                },
                ZA: {
                    value: 2249731,
                    tooltip: {
                        content: '<span style="font-weight:bold;">South Africa</span><br />Population : 2249731'
                    }
                },
                AL: {
                    value: 54824924,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Albania</span><br />Population : 54824924'
                    }
                },
                DZ: {
                    value: 49159943,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Algeria</span><br />Population : 49159943'
                    }
                },
                DE: {
                    value: 3534817,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Germany</span><br />Population : 3534817'
                    }
                },
                AD: {
                    value: 38597742,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Andorra</span><br />Population : 38597742'
                    }
                },
                AO: {
                    value: 52126792,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Angola</span><br />Population : 52126792'
                    }
                },
                AG: {
                    value: 28357269,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Antigua And Barbuda</span><br />Population : 28357269'
                    }
                },
                SA: {
                    value: 30962173,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saudi Arabia</span><br />Population : 30962173'
                    }
                },
                AR: {
                    value: 36923291,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Argentina</span><br />Population : 36923291'
                    }
                },
                AM: {
                    value: 38080417,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Armenia</span><br />Population : 38080417'
                    }
                },
                AU: {
                    value: 28496197,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Australia</span><br />Population : 28496197'
                    }
                },
                AT: {
                    value: 4924099,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Austria</span><br />Population : 4924099'
                    }
                },
                AZ: {
                    value: 17817004,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Azerbaijan</span><br />Population : 17817004'
                    }
                },
                BS: {
                    value: 40763925,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bahamas</span><br />Population : 40763925'
                    }
                },
                BH: {
                    value: 55192353,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bahrain</span><br />Population : 55192353'
                    }
                },
                BD: {
                    value: 58323722,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bangladesh</span><br />Population : 58323722'
                    }
                },
                BB: {
                    value: 31819507,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Barbados</span><br />Population : 31819507'
                    }
                },
                BE: {
                    value: 58305442,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belgium</span><br />Population : 58305442'
                    }
                },
                BZ: {
                    value: 24211359,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belize</span><br />Population : 24211359'
                    }
                },
                BJ: {
                    value: 54514164,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Benin</span><br />Population : 54514164'
                    }
                },
                BT: {
                    value: 39621423,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bhutan</span><br />Population : 39621423'
                    }
                },
                BY: {
                    value: 58883091,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belarus</span><br />Population : 58883091'
                    }
                },
                MM: {
                    value: 1068841,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Myanmar</span><br />Population : 1068841'
                    }
                },
                BO: {
                    value: 6598550,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bolivia, Plurinational State Of</span><br />Population : 6598550'
                    }
                },
                BA: {
                    value: 31863379,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bosnia And Herzegovina</span><br />Population : 31863379'
                    }
                },
                BW: {
                    value: 40624997,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Botswana</span><br />Population : 40624997'
                    }
                },
                BR: {
                    value: 21330426,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Brazil</span><br />Population : 21330426'
                    }
                },
                BN: {
                    value: 17530008,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Brunei Darussalam</span><br />Population : 17530008'
                    }
                },
                BG: {
                    value: 29135999,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bulgaria</span><br />Population : 29135999'
                    }
                },
                BF: {
                    value: 31609287,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Burkina Faso</span><br />Population : 31609287'
                    }
                },
                BI: {
                    value: 30711737,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Burundi</span><br />Population : 30711737'
                    }
                },
                KH: {
                    value: 40511661,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cambodia</span><br />Population : 40511661'
                    }
                },
                CM: {
                    value: 22079907,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cameroon</span><br />Population : 22079907'
                    }
                },
                CA: {
                    value: 29964084,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Canada</span><br />Population : 29964084'
                    }
                },
                CV: {
                    value: 4878399,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cape Verde</span><br />Population : 4878399'
                    }
                },
                CF: {
                    value: 58696634,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Central African Republic</span><br />Population : 58696634'
                    }
                },
                CL: {
                    value: 31285730,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Chile</span><br />Population : 31285730'
                    }
                },
                CN: {
                    value: 3867514,
                    tooltip: {
                        content: '<span style="font-weight:bold;">China</span><br />Population : 3867514'
                    }
                },
                CY: {
                    value: 9346038,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cyprus</span><br />Population : 9346038'
                    }
                },
                CO: {
                    value: 25288052,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Colombia</span><br />Population : 25288052'
                    }
                },
                KM: {
                    value: 47394092,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Comoros</span><br />Population : 47394092'
                    }
                },
                CG: {
                    value: 11347702,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Congo</span><br />Population : 11347702'
                    }
                },
                CD: {
                    value: 19780279,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Congo, The Democratic Republic Of The</span><br />Population : 19780279'
                    }
                },
                KP: {
                    value: 43239041,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Korea, Democratic People\'s Republic Of</span><br />Population : 43239041'
                    }
                },
                KR: {
                    value: 31095618,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Korea, Republic Of</span><br />Population : 31095618'
                    }
                },
                CR: {
                    value: 20582773,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Costa Rica</span><br />Population : 20582773'
                    }
                },
                CI: {
                    value: 41796747,
                    tooltip: {
                        content: '<span style="font-weight:bold;">CÔte D\'ivoire</span><br />Population : 41796747'
                    }
                },
                HR: {
                    value: 5852725,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Croatia</span><br />Population : 5852725'
                    }
                },
                CU: {
                    value: 32930933,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cuba</span><br />Population : 32930933'
                    }
                },
                DK: {
                    value: 29700851,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Denmark</span><br />Population : 29700851'
                    }
                },
                DJ: {
                    value: 51061066,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Djibouti</span><br />Population : 51061066'
                    }
                },
                DM: {
                    value: 16082229,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Dominica</span><br />Population : 16082229'
                    }
                },
                EG: {
                    value: 13590661,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Egypt</span><br />Population : 13590661'
                    }
                },
                AE: {
                    value: 6880062,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United Arab Emirates</span><br />Population : 6880062'
                    }
                },
                EC: {
                    value: 53188861,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ecuador</span><br />Population : 53188861'
                    }
                },
                ER: {
                    value: 27130679,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Eritrea</span><br />Population : 27130679'
                    }
                },
                ES: {
                    value: 23615430,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Spain</span><br />Population : 23615430'
                    }
                },
                EE: {
                    value: 10148532,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Estonia</span><br />Population : 10148532'
                    }
                },
                US: {
                    value: 23845758,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United States</span><br />Population : 23845758'
                    }
                },
                ET: {
                    value: 22151199,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ethiopia</span><br />Population : 22151199'
                    }
                },
                FJ: {
                    value: 23695862,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Fiji</span><br />Population : 23695862'
                    }
                },
                FI: {
                    value: 7684384,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Finland</span><br />Population : 7684384'
                    }
                },
                FR: {
                    value: 28547382,
                    tooltip: {
                        content: '<span style="font-weight:bold;">France</span><br />Population : 28547382'
                    }
                },
                GA: {
                    value: 14246914,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Gabon</span><br />Population : 14246914'
                    }
                },
                GM: {
                    value: 4472583,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Gambia</span><br />Population : 4472583'
                    }
                },
                GE: {
                    value: 57515744,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Georgia</span><br />Population : 57515744'
                    }
                },
                GH: {
                    value: 42959357,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ghana</span><br />Population : 42959357'
                    }
                },
                GR: {
                    value: 46470951,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Greece</span><br />Population : 46470951'
                    }
                },
                GD: {
                    value: 46436219,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Grenada</span><br />Population : 46436219'
                    }
                },
                GT: {
                    value: 8020736,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guatemala</span><br />Population : 8020736'
                    }
                },
                GN: {
                    value: 12797308,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guinea</span><br />Population : 12797308'
                    }
                },
                GQ: {
                    value: 12126431,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Equatorial Guinea</span><br />Population : 12126431'
                    }
                },
                GW: {
                    value: 20427392,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guinea-bissau</span><br />Population : 20427392'
                    }
                },
                GY: {
                    value: 37027487,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guyana</span><br />Population : 37027487'
                    }
                },
                HT: {
                    value: 33526862,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Haiti</span><br />Population : 33526862'
                    }
                },
                HN: {
                    value: 14166482,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Honduras</span><br />Population : 14166482'
                    }
                },
                HU: {
                    value: 6936731,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Hungary</span><br />Population : 6936731'
                    }
                },
                JM: {
                    value: 52814121,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Jamaica</span><br />Population : 52814121'
                    }
                },
                JP: {
                    value: 50863642,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Japan</span><br />Population : 50863642'
                    }
                },
                MH: {
                    value: 5794229,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Marshall Islands</span><br />Population : 5794229'
                    }
                },
                PW: {
                    value: 56504859,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Palau</span><br />Population : 56504859'
                    }
                },
                SB: {
                    value: 53508762,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Solomon Islands</span><br />Population : 53508762'
                    }
                },
                IN: {
                    value: 40473273,
                    tooltip: {
                        content: '<span style="font-weight:bold;">India</span><br />Population : 40473273'
                    }
                },
                ID: {
                    value: 30062796,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Indonesia</span><br />Population : 30062796'
                    }
                },
                JO: {
                    value: 10022400,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Jordan</span><br />Population : 10022400'
                    }
                },
                IR: {
                    value: 7289535,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iran, Islamic Republic Of</span><br />Population : 7289535'
                    }
                },
                IQ: {
                    value: 7971380,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iraq</span><br />Population : 7971380'
                    }
                },
                IE: {
                    value: 40175308,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ireland</span><br />Population : 40175308'
                    }
                },
                IS: {
                    value: 37829981,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iceland</span><br />Population : 37829981'
                    }
                },
                IL: {
                    value: 32084567,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Israel</span><br />Population : 32084567'
                    }
                },
                IT: {
                    value: 48823590,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Italy</span><br />Population : 48823590'
                    }
                },
                KZ: {
                    value: 19284891,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kazakhstan</span><br />Population : 19284891'
                    }
                },
                KE: {
                    value: 40718225,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kenya</span><br />Population : 40718225'
                    }
                },
                KG: {
                    value: 36171982,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kyrgyzstan</span><br />Population : 36171982'
                    }
                },
                KI: {
                    value: 48845526,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kiribati</span><br />Population : 48845526'
                    }
                },
                KW: {
                    value: 40394669,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kuwait</span><br />Population : 40394669'
                    }
                },
                LA: {
                    value: 9327758,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lao People\'s Democratic Republic</span><br />Population : 9327758'
                    }
                },
                LS: {
                    value: 17679904,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lesotho</span><br />Population : 17679904'
                    }
                },
                LV: {
                    value: 43602814,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Latvia</span><br />Population : 43602814'
                    }
                },
                LB: {
                    value: 26757767,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lebanon</span><br />Population : 26757767'
                    }
                },
                LR: {
                    value: 24149206,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Liberia</span><br />Population : 24149206'
                    }
                },
                LY: {
                    value: 4686459,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Libya</span><br />Population : 4686459'
                    }
                },
                LI: {
                    value: 38711078,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Liechtenstein</span><br />Population : 38711078'
                    }
                },
                LT: {
                    value: 51377311,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lithuania</span><br />Population : 51377311'
                    }
                },
                LU: {
                    value: 15923193,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Luxembourg</span><br />Population : 15923193'
                    }
                },
                MK: {
                    value: 55219773,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Macedonia, The Former Yugoslav Republic Of</span><br />Population : 55219773'
                    }
                },
                MG: {
                    value: 9835943,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Madagascar</span><br />Population : 9835943'
                    }
                },
                MY: {
                    value: 37506424,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malaysia</span><br />Population : 37506424'
                    }
                },
                MW: {
                    value: 5240344,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malawi</span><br />Population : 5240344'
                    }
                },
                MV: {
                    value: 17657968,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Maldives</span><br />Population : 17657968'
                    }
                },
                ML: {
                    value: 22493036,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mali</span><br />Population : 22493036'
                    }
                },
                MT: {
                    value: 58148234,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malta</span><br />Population : 58148234'
                    }
                },
                MA: {
                    value: 42641284,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Morocco</span><br />Population : 42641284'
                    }
                },
                MU: {
                    value: 9929171,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mauritius</span><br />Population : 9929171'
                    }
                },
                MR: {
                    value: 52347980,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mauritania</span><br />Population : 52347980'
                    }
                },
                MX: {
                    value: 36555863,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mexico</span><br />Population : 36555863'
                    }
                },
                FM: {
                    value: 28916638,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Micronesia, Federated States Of</span><br />Population : 28916638'
                    }
                },
                MD: {
                    value: 211508,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Moldova, Republic Of</span><br />Population : 211508'
                    }
                },
                MC: {
                    value: 45116400,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Monaco</span><br />Population : 45116400'
                    }
                },
                MN: {
                    value: 45732437,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mongolia</span><br />Population : 45732437'
                    }
                },
                ME: {
                    value: 14607031,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Montenegro</span><br />Population : 14607031'
                    }
                },
                MZ: {
                    value: 46533103,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mozambique</span><br />Population : 46533103'
                    }
                },
                NA: {
                    value: 36363922,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Namibia</span><br />Population : 36363922'
                    }
                },
                NP: {
                    value: 8931082,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nepal</span><br />Population : 8931082'
                    }
                },
                NI: {
                    value: 20303088,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nicaragua</span><br />Population : 20303088'
                    }
                },
                NE: {
                    value: 57172080,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Niger</span><br />Population : 57172080'
                    }
                },
                NG: {
                    value: 31706171,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nigeria</span><br />Population : 31706171'
                    }
                },
                NO: {
                    value: 59054923,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Norway</span><br />Population : 59054923'
                    }
                },
                NZ: {
                    value: 36645435,
                    tooltip: {
                        content: '<span style="font-weight:bold;">New Zealand</span><br />Population : 36645435'
                    }
                },
                OM: {
                    value: 30256564,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Oman</span><br />Population : 30256564'
                    }
                },
                UG: {
                    value: 6808770,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uganda</span><br />Population : 6808770'
                    }
                },
                UZ: {
                    value: 59457084,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uzbekistan</span><br />Population : 59457084'
                    }
                },
                PK: {
                    value: 24324695,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Pakistan</span><br />Population : 24324695'
                    }
                },
                PS: {
                    value: 53764682,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Palestine, State Of</span><br />Population : 53764682'
                    }
                },
                PA: {
                    value: 27187347,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Panama</span><br />Population : 27187347'
                    }
                },
                PG: {
                    value: 23240689,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Papua New Guinea</span><br />Population : 23240689'
                    }
                },
                PY: {
                    value: 33881494,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Paraguay</span><br />Population : 33881494'
                    }
                },
                NL: {
                    value: 6024557,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Netherlands</span><br />Population : 6024557'
                    }
                },
                PE: {
                    value: 8607525,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Peru</span><br />Population : 8607525'
                    }
                },
                PH: {
                    value: 53358866,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Philippines</span><br />Population : 53358866'
                    }
                },
                PL: {
                    value: 26006457,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Poland</span><br />Population : 26006457'
                    }
                },
                PT: {
                    value: 34914316,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Portugal</span><br />Population : 34914316'
                    }
                },
                QA: {
                    value: 16584930,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Qatar</span><br />Population : 16584930'
                    }
                },
                DO: {
                    value: 43114737,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Dominican Republic</span><br />Population : 43114737'
                    }
                },
                RO: {
                    value: 51240210,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Romania</span><br />Population : 51240210'
                    }
                },
                GB: {
                    value: 18762082,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United Kingdom</span><br />Population : 18762082'
                    }
                },
                RU: {
                    value: 26785187,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Russian Federation</span><br />Population : 26785187'
                    }
                },
                RW: {
                    value: 35561429,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Rwanda</span><br />Population : 35561429'
                    }
                },
                KN: {
                    value: 10373376,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Kitts And Nevis</span><br />Population : 10373376'
                    }
                },
                SM: {
                    value: 45545981,
                    tooltip: {
                        content: '<span style="font-weight:bold;">San Marino</span><br />Population : 45545981'
                    }
                },
                VC: {
                    value: 44823920,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Vincent And The Grenadines</span><br />Population : 44823920'
                    }
                },
                LC: {
                    value: 43802066,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Lucia</span><br />Population : 43802066'
                    }
                },
                SV: {
                    value: 13846582,
                    tooltip: {
                        content: '<span style="font-weight:bold;">El Salvador</span><br />Population : 13846582'
                    }
                },
                WS: {
                    value: 53494138,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Samoa</span><br />Population : 53494138'
                    }
                },
                ST: {
                    value: 46366754,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sao Tome And Principe</span><br />Population : 46366754'
                    }
                },
                SN: {
                    value: 50989774,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Senegal</span><br />Population : 50989774'
                    }
                },
                RS: {
                    value: 22350452,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Serbia</span><br />Population : 22350452'
                    }
                },
                SC: {
                    value: 10784677,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Seychelles</span><br />Population : 10784677'
                    }
                },
                SL: {
                    value: 37029315,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sierra Leone</span><br />Population : 37029315'
                    }
                },
                SG: {
                    value: 10327676,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Singapore</span><br />Population : 10327676'
                    }
                },
                SK: {
                    value: 26525610,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Slovakia</span><br />Population : 26525610'
                    }
                },
                SI: {
                    value: 35345725,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Slovenia</span><br />Population : 35345725'
                    }
                },
                SO: {
                    value: 52377228,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Somalia</span><br />Population : 52377228'
                    }
                },
                SD: {
                    value: 24768899,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sudan</span><br />Population : 24768899'
                    }
                },
                SS: {
                    value: 46962683,
                    tooltip: {
                        content: '<span style="font-weight:bold;">South Sudan</span><br />Population : 46962683'
                    }
                },
                LK: {
                    value: 35455405,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sri Lanka</span><br />Population : 35455405'
                    }
                },
                SE: {
                    value: 38126117,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sweden</span><br />Population : 38126117'
                    }
                },
                CH: {
                    value: 47516568,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Switzerland</span><br />Population : 47516568'
                    }
                },
                SR: {
                    value: 14402295,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Suriname</span><br />Population : 14402295'
                    }
                },
                SZ: {
                    value: 9241842,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Swaziland</span><br />Population : 9241842'
                    }
                },
                SY: {
                    value: 29841608,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Syrian Arab Republic</span><br />Population : 29841608'
                    }
                },
                TJ: {
                    value: 1823806,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tajikistan</span><br />Population : 1823806'
                    }
                },
                TZ: {
                    value: 9335070,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tanzania, United Republic Of</span><br />Population : 9335070'
                    }
                },
                TD: {
                    value: 44683164,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Chad</span><br />Population : 44683164'
                    }
                },
                CZ: {
                    value: 33139325,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Czech Republic</span><br />Population : 33139325'
                    }
                },
                TH: {
                    value: 20593741,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Thailand</span><br />Population : 20593741'
                    }
                },
                TL: {
                    value: 22401636,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Timor-leste</span><br />Population : 22401636'
                    }
                },
                TG: {
                    value: 20107492,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Togo</span><br />Population : 20107492'
                    }
                },
                TO: {
                    value: 23684894,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tonga</span><br />Population : 23684894'
                    }
                },
                TT: {
                    value: 27079495,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Trinidad And Tobago</span><br />Population : 27079495'
                    }
                },
                TN: {
                    value: 14292614,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tunisia</span><br />Population : 14292614'
                    }
                },
                TM: {
                    value: 23492953,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Turkmenistan</span><br />Population : 23492953'
                    }
                },
                TR: {
                    value: 7093939,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Turkey</span><br />Population : 7093939'
                    }
                },
                TV: {
                    value: 34384195,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tuvalu</span><br />Population : 34384195'
                    }
                },
                VU: {
                    value: 35548633,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Vanuatu</span><br />Population : 35548633'
                    }
                },
                VE: {
                    value: 52967673,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Venezuela, Bolivarian Republic Of</span><br />Population : 52967673'
                    }
                },
                VN: {
                    value: 18932086,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Viet Nam</span><br />Population : 18932086'
                    }
                },
                UA: {
                    value: 25660965,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ukraine</span><br />Population : 25660965'
                    }
                },
                UY: {
                    value: 46860315,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uruguay</span><br />Population : 46860315'
                    }
                },
                YE: {
                    value: 16809775,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Yemen</span><br />Population : 16809775'
                    }
                },
                ZM: {
                    value: 4914959,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Zambia</span><br />Population : 4914959'
                    }
                },
                ZW: {
                    value: 14012930,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Zimbabwe</span><br />Population : 14012930'
                    }
                }
            }
        },
        2012: {
            areas: {
                AF: {
                    value: 9658627,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Afghanistan</span><br />Population : 9658627'
                    }
                },
                ZA: {
                    value: 11627386,
                    tooltip: {
                        content: '<span style="font-weight:bold;">South Africa</span><br />Population : 11627386'
                    }
                },
                AL: {
                    value: 4404946,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Albania</span><br />Population : 4404946'
                    }
                },
                DZ: {
                    value: 17385595,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Algeria</span><br />Population : 17385595'
                    }
                },
                DE: {
                    value: 4971627,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Germany</span><br />Population : 4971627'
                    }
                },
                AD: {
                    value: 13638189,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Andorra</span><br />Population : 13638189'
                    }
                },
                AO: {
                    value: 2701248,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Angola</span><br />Population : 2701248'
                    }
                },
                AG: {
                    value: 15126184,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Antigua And Barbuda</span><br />Population : 15126184'
                    }
                },
                SA: {
                    value: 46964511,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saudi Arabia</span><br />Population : 46964511'
                    }
                },
                AR: {
                    value: 12256219,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Argentina</span><br />Population : 12256219'
                    }
                },
                AM: {
                    value: 50485245,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Armenia</span><br />Population : 50485245'
                    }
                },
                AU: {
                    value: 16025561,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Australia</span><br />Population : 16025561'
                    }
                },
                AT: {
                    value: 13965402,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Austria</span><br />Population : 13965402'
                    }
                },
                AZ: {
                    value: 43047101,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Azerbaijan</span><br />Population : 43047101'
                    }
                },
                BS: {
                    value: 11110061,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bahamas</span><br />Population : 11110061'
                    }
                },
                BH: {
                    value: 40674353,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bahrain</span><br />Population : 40674353'
                    }
                },
                BD: {
                    value: 53852427,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bangladesh</span><br />Population : 53852427'
                    }
                },
                BB: {
                    value: 51726459,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Barbados</span><br />Population : 51726459'
                    }
                },
                BE: {
                    value: 17478824,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belgium</span><br />Population : 17478824'
                    }
                },
                BZ: {
                    value: 19813183,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belize</span><br />Population : 19813183'
                    }
                },
                BJ: {
                    value: 44953708,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Benin</span><br />Population : 44953708'
                    }
                },
                BT: {
                    value: 13959918,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bhutan</span><br />Population : 13959918'
                    }
                },
                BY: {
                    value: 52744657,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belarus</span><br />Population : 52744657'
                    }
                },
                MM: {
                    value: 33932678,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Myanmar</span><br />Population : 33932678'
                    }
                },
                BO: {
                    value: 15347372,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bolivia, Plurinational State Of</span><br />Population : 15347372'
                    }
                },
                BA: {
                    value: 55163105,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bosnia And Herzegovina</span><br />Population : 55163105'
                    }
                },
                BW: {
                    value: 10210684,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Botswana</span><br />Population : 10210684'
                    }
                },
                BR: {
                    value: 13773462,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Brazil</span><br />Population : 13773462'
                    }
                },
                BN: {
                    value: 23061545,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Brunei Darussalam</span><br />Population : 23061545'
                    }
                },
                BG: {
                    value: 31201642,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bulgaria</span><br />Population : 31201642'
                    }
                },
                BF: {
                    value: 52730033,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Burkina Faso</span><br />Population : 52730033'
                    }
                },
                BI: {
                    value: 39826160,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Burundi</span><br />Population : 39826160'
                    }
                },
                KH: {
                    value: 36274350,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cambodia</span><br />Population : 36274350'
                    }
                },
                CM: {
                    value: 7591156,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cameroon</span><br />Population : 7591156'
                    }
                },
                CA: {
                    value: 13705826,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Canada</span><br />Population : 13705826'
                    }
                },
                CV: {
                    value: 42831397,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cape Verde</span><br />Population : 42831397'
                    }
                },
                CF: {
                    value: 53113913,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Central African Republic</span><br />Population : 53113913'
                    }
                },
                CL: {
                    value: 19897272,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Chile</span><br />Population : 19897272'
                    }
                },
                CN: {
                    value: 55991190,
                    tooltip: {
                        content: '<span style="font-weight:bold;">China</span><br />Population : 55991190'
                    }
                },
                CY: {
                    value: 43379798,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cyprus</span><br />Population : 43379798'
                    }
                },
                CO: {
                    value: 41758359,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Colombia</span><br />Population : 41758359'
                    }
                },
                KM: {
                    value: 13835614,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Comoros</span><br />Population : 13835614'
                    }
                },
                CG: {
                    value: 12989248,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Congo</span><br />Population : 12989248'
                    }
                },
                CD: {
                    value: 32111987,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Congo, The Democratic Republic Of The</span><br />Population : 32111987'
                    }
                },
                KP: {
                    value: 335812,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Korea, Democratic People\'s Republic Of</span><br />Population : 335812'
                    }
                },
                KR: {
                    value: 24971808,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Korea, Republic Of</span><br />Population : 24971808'
                    }
                },
                CR: {
                    value: 47553128,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Costa Rica</span><br />Population : 47553128'
                    }
                },
                CI: {
                    value: 29618591,
                    tooltip: {
                        content: '<span style="font-weight:bold;">CÔte D\'ivoire</span><br />Population : 29618591'
                    }
                },
                HR: {
                    value: 16824399,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Croatia</span><br />Population : 16824399'
                    }
                },
                CU: {
                    value: 58921479,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cuba</span><br />Population : 58921479'
                    }
                },
                DK: {
                    value: 52985953,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Denmark</span><br />Population : 52985953'
                    }
                },
                DJ: {
                    value: 26540234,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Djibouti</span><br />Population : 26540234'
                    }
                },
                DM: {
                    value: 29452243,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Dominica</span><br />Population : 29452243'
                    }
                },
                EG: {
                    value: 31450250,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Egypt</span><br />Population : 31450250'
                    }
                },
                AE: {
                    value: 12440847,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United Arab Emirates</span><br />Population : 12440847'
                    }
                },
                EC: {
                    value: 43467542,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ecuador</span><br />Population : 43467542'
                    }
                },
                ER: {
                    value: 6397470,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Eritrea</span><br />Population : 6397470'
                    }
                },
                ES: {
                    value: 8073748,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Spain</span><br />Population : 8073748'
                    }
                },
                EE: {
                    value: 58820939,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Estonia</span><br />Population : 58820939'
                    }
                },
                US: {
                    value: 11141137,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United States</span><br />Population : 11141137'
                    }
                },
                ET: {
                    value: 5688205,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ethiopia</span><br />Population : 5688205'
                    }
                },
                FJ: {
                    value: 24357599,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Fiji</span><br />Population : 24357599'
                    }
                },
                FI: {
                    value: 55479349,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Finland</span><br />Population : 55479349'
                    }
                },
                FR: {
                    value: 10051648,
                    tooltip: {
                        content: '<span style="font-weight:bold;">France</span><br />Population : 10051648'
                    }
                },
                GA: {
                    value: 55402573,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Gabon</span><br />Population : 55402573'
                    }
                },
                GM: {
                    value: 26017425,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Gambia</span><br />Population : 26017425'
                    }
                },
                GE: {
                    value: 15519204,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Georgia</span><br />Population : 15519204'
                    }
                },
                GH: {
                    value: 30839697,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ghana</span><br />Population : 30839697'
                    }
                },
                GR: {
                    value: 33868698,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Greece</span><br />Population : 33868698'
                    }
                },
                GD: {
                    value: 48618854,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Grenada</span><br />Population : 48618854'
                    }
                },
                GT: {
                    value: 41893631,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guatemala</span><br />Population : 41893631'
                    }
                },
                GN: {
                    value: 34195911,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guinea</span><br />Population : 34195911'
                    }
                },
                GQ: {
                    value: 29064706,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Equatorial Guinea</span><br />Population : 29064706'
                    }
                },
                GW: {
                    value: 37877509,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guinea-bissau</span><br />Population : 37877509'
                    }
                },
                GY: {
                    value: 27905753,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guyana</span><br />Population : 27905753'
                    }
                },
                HT: {
                    value: 10760913,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Haiti</span><br />Population : 10760913'
                    }
                },
                HN: {
                    value: 39118723,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Honduras</span><br />Population : 39118723'
                    }
                },
                HU: {
                    value: 29359015,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Hungary</span><br />Population : 29359015'
                    }
                },
                JM: {
                    value: 16608694,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Jamaica</span><br />Population : 16608694'
                    }
                },
                JP: {
                    value: 41025330,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Japan</span><br />Population : 41025330'
                    }
                },
                MH: {
                    value: 32208871,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Marshall Islands</span><br />Population : 32208871'
                    }
                },
                PW: {
                    value: 28678998,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Palau</span><br />Population : 28678998'
                    }
                },
                SB: {
                    value: 21105582,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Solomon Islands</span><br />Population : 21105582'
                    }
                },
                IN: {
                    value: 55729786,
                    tooltip: {
                        content: '<span style="font-weight:bold;">India</span><br />Population : 55729786'
                    }
                },
                ID: {
                    value: 6463278,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Indonesia</span><br />Population : 6463278'
                    }
                },
                JO: {
                    value: 11503082,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Jordan</span><br />Population : 11503082'
                    }
                },
                IR: {
                    value: 24549539,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iran, Islamic Republic Of</span><br />Population : 24549539'
                    }
                },
                IQ: {
                    value: 15564905,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iraq</span><br />Population : 15564905'
                    }
                },
                IE: {
                    value: 49860068,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ireland</span><br />Population : 49860068'
                    }
                },
                IS: {
                    value: 43346894,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iceland</span><br />Population : 43346894'
                    }
                },
                IL: {
                    value: 40043692,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Israel</span><br />Population : 40043692'
                    }
                },
                IT: {
                    value: 30971313,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Italy</span><br />Population : 30971313'
                    }
                },
                KZ: {
                    value: 40727365,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kazakhstan</span><br />Population : 40727365'
                    }
                },
                KE: {
                    value: 39976056,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kenya</span><br />Population : 39976056'
                    }
                },
                KG: {
                    value: 50741166,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kyrgyzstan</span><br />Population : 50741166'
                    }
                },
                KI: {
                    value: 2739636,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kiribati</span><br />Population : 2739636'
                    }
                },
                KW: {
                    value: 7143295,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kuwait</span><br />Population : 7143295'
                    }
                },
                LA: {
                    value: 7006195,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lao People\'s Democratic Republic</span><br />Population : 7006195'
                    }
                },
                LS: {
                    value: 9845083,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lesotho</span><br />Population : 9845083'
                    }
                },
                LV: {
                    value: 41310498,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Latvia</span><br />Population : 41310498'
                    }
                },
                LB: {
                    value: 7135983,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lebanon</span><br />Population : 7135983'
                    }
                },
                LR: {
                    value: 39902936,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Liberia</span><br />Population : 39902936'
                    }
                },
                LY: {
                    value: 20308572,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Libya</span><br />Population : 20308572'
                    }
                },
                LI: {
                    value: 47474524,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Liechtenstein</span><br />Population : 47474524'
                    }
                },
                LT: {
                    value: 8883554,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lithuania</span><br />Population : 8883554'
                    }
                },
                LU: {
                    value: 24481903,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Luxembourg</span><br />Population : 24481903'
                    }
                },
                MK: {
                    value: 35334757,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Macedonia, The Former Yugoslav Republic Of</span><br />Population : 35334757'
                    }
                },
                MG: {
                    value: 11872339,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Madagascar</span><br />Population : 11872339'
                    }
                },
                MY: {
                    value: 10514132,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malaysia</span><br />Population : 10514132'
                    }
                },
                MW: {
                    value: 56208722,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malawi</span><br />Population : 56208722'
                    }
                },
                MV: {
                    value: 38076761,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Maldives</span><br />Population : 38076761'
                    }
                },
                ML: {
                    value: 14994568,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mali</span><br />Population : 14994568'
                    }
                },
                MT: {
                    value: 40105844,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malta</span><br />Population : 40105844'
                    }
                },
                MA: {
                    value: 20899017,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Morocco</span><br />Population : 20899017'
                    }
                },
                MU: {
                    value: 41637711,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mauritius</span><br />Population : 41637711'
                    }
                },
                MR: {
                    value: 47481836,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mauritania</span><br />Population : 47481836'
                    }
                },
                MX: {
                    value: 35886813,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mexico</span><br />Population : 35886813'
                    }
                },
                FM: {
                    value: 14018414,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Micronesia, Federated States Of</span><br />Population : 14018414'
                    }
                },
                MD: {
                    value: 29170731,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Moldova, Republic Of</span><br />Population : 29170731'
                    }
                },
                MC: {
                    value: 10124768,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Monaco</span><br />Population : 10124768'
                    }
                },
                MN: {
                    value: 25935165,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mongolia</span><br />Population : 25935165'
                    }
                },
                ME: {
                    value: 41182538,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Montenegro</span><br />Population : 41182538'
                    }
                },
                MZ: {
                    value: 13778946,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mozambique</span><br />Population : 13778946'
                    }
                },
                NA: {
                    value: 13363989,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Namibia</span><br />Population : 13363989'
                    }
                },
                NP: {
                    value: 8379025,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nepal</span><br />Population : 8379025'
                    }
                },
                NI: {
                    value: 18157013,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nicaragua</span><br />Population : 18157013'
                    }
                },
                NE: {
                    value: 38515482,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Niger</span><br />Population : 38515482'
                    }
                },
                NG: {
                    value: 17890124,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nigeria</span><br />Population : 17890124'
                    }
                },
                NO: {
                    value: 11296518,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Norway</span><br />Population : 11296518'
                    }
                },
                NZ: {
                    value: 10457464,
                    tooltip: {
                        content: '<span style="font-weight:bold;">New Zealand</span><br />Population : 10457464'
                    }
                },
                OM: {
                    value: 56583463,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Oman</span><br />Population : 56583463'
                    }
                },
                UG: {
                    value: 14343799,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uganda</span><br />Population : 14343799'
                    }
                },
                UZ: {
                    value: 32815768,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uzbekistan</span><br />Population : 32815768'
                    }
                },
                PK: {
                    value: 53649518,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Pakistan</span><br />Population : 53649518'
                    }
                },
                PS: {
                    value: 51136014,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Palestine, State Of</span><br />Population : 51136014'
                    }
                },
                PA: {
                    value: 23315637,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Panama</span><br />Population : 23315637'
                    }
                },
                PG: {
                    value: 41114902,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Papua New Guinea</span><br />Population : 41114902'
                    }
                },
                PY: {
                    value: 33548798,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Paraguay</span><br />Population : 33548798'
                    }
                },
                NL: {
                    value: 35276260,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Netherlands</span><br />Population : 35276260'
                    }
                },
                PE: {
                    value: 35446265,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Peru</span><br />Population : 35446265'
                    }
                },
                PH: {
                    value: 34322043,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Philippines</span><br />Population : 34322043'
                    }
                },
                PL: {
                    value: 45620929,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Poland</span><br />Population : 45620929'
                    }
                },
                PT: {
                    value: 52057328,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Portugal</span><br />Population : 52057328'
                    }
                },
                QA: {
                    value: 11426306,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Qatar</span><br />Population : 11426306'
                    }
                },
                DO: {
                    value: 40515317,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Dominican Republic</span><br />Population : 40515317'
                    }
                },
                RO: {
                    value: 35581537,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Romania</span><br />Population : 35581537'
                    }
                },
                GB: {
                    value: 54682340,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United Kingdom</span><br />Population : 54682340'
                    }
                },
                RU: {
                    value: 1796386,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Russian Federation</span><br />Population : 1796386'
                    }
                },
                RW: {
                    value: 57822849,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Rwanda</span><br />Population : 57822849'
                    }
                },
                KN: {
                    value: 38996246,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Kitts And Nevis</span><br />Population : 38996246'
                    }
                },
                SM: {
                    value: 26304422,
                    tooltip: {
                        content: '<span style="font-weight:bold;">San Marino</span><br />Population : 26304422'
                    }
                },
                VC: {
                    value: 27147131,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Vincent And The Grenadines</span><br />Population : 27147131'
                    }
                },
                LC: {
                    value: 54422763,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Lucia</span><br />Population : 54422763'
                    }
                },
                SV: {
                    value: 1580682,
                    tooltip: {
                        content: '<span style="font-weight:bold;">El Salvador</span><br />Population : 1580682'
                    }
                },
                WS: {
                    value: 39926700,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Samoa</span><br />Population : 39926700'
                    }
                },
                ST: {
                    value: 18219165,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sao Tome And Principe</span><br />Population : 18219165'
                    }
                },
                SN: {
                    value: 28443185,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Senegal</span><br />Population : 28443185'
                    }
                },
                RS: {
                    value: 18800470,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Serbia</span><br />Population : 18800470'
                    }
                },
                SC: {
                    value: 18802298,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Seychelles</span><br />Population : 18802298'
                    }
                },
                SL: {
                    value: 55503113,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sierra Leone</span><br />Population : 55503113'
                    }
                },
                SG: {
                    value: 7962240,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Singapore</span><br />Population : 7962240'
                    }
                },
                SK: {
                    value: 36371234,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Slovakia</span><br />Population : 36371234'
                    }
                },
                SI: {
                    value: 35934342,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Slovenia</span><br />Population : 35934342'
                    }
                },
                SO: {
                    value: 9839599,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Somalia</span><br />Population : 9839599'
                    }
                },
                SD: {
                    value: 51008054,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sudan</span><br />Population : 51008054'
                    }
                },
                SS: {
                    value: 29958600,
                    tooltip: {
                        content: '<span style="font-weight:bold;">South Sudan</span><br />Population : 29958600'
                    }
                },
                LK: {
                    value: 14575955,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sri Lanka</span><br />Population : 14575955'
                    }
                },
                SE: {
                    value: 21619250,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sweden</span><br />Population : 21619250'
                    }
                },
                CH: {
                    value: 5958749,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Switzerland</span><br />Population : 5958749'
                    }
                },
                SR: {
                    value: 5178192,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Suriname</span><br />Population : 5178192'
                    }
                },
                SZ: {
                    value: 27730264,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Swaziland</span><br />Population : 27730264'
                    }
                },
                SY: {
                    value: 21582690,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Syrian Arab Republic</span><br />Population : 21582690'
                    }
                },
                TJ: {
                    value: 50642453,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tajikistan</span><br />Population : 50642453'
                    }
                },
                TZ: {
                    value: 57495636,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tanzania, United Republic Of</span><br />Population : 57495636'
                    }
                },
                TD: {
                    value: 58550394,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Chad</span><br />Population : 58550394'
                    }
                },
                CZ: {
                    value: 30320544,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Czech Republic</span><br />Population : 30320544'
                    }
                },
                TH: {
                    value: 33437289,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Thailand</span><br />Population : 33437289'
                    }
                },
                TL: {
                    value: 12826556,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Timor-leste</span><br />Population : 12826556'
                    }
                },
                TG: {
                    value: 339468,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Togo</span><br />Population : 339468'
                    }
                },
                TO: {
                    value: 38473438,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tonga</span><br />Population : 38473438'
                    }
                },
                TT: {
                    value: 12371383,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Trinidad And Tobago</span><br />Population : 12371383'
                    }
                },
                TN: {
                    value: 26536578,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tunisia</span><br />Population : 26536578'
                    }
                },
                TM: {
                    value: 15950613,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Turkmenistan</span><br />Population : 15950613'
                    }
                },
                TR: {
                    value: 6731994,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Turkey</span><br />Population : 6731994'
                    }
                },
                TV: {
                    value: 15522860,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tuvalu</span><br />Population : 15522860'
                    }
                },
                VU: {
                    value: 44341327,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Vanuatu</span><br />Population : 44341327'
                    }
                },
                VE: {
                    value: 58586954,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Venezuela, Bolivarian Republic Of</span><br />Population : 58586954'
                    }
                },
                VN: {
                    value: 45536841,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Viet Nam</span><br />Population : 45536841'
                    }
                },
                UA: {
                    value: 41019846,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ukraine</span><br />Population : 41019846'
                    }
                },
                UY: {
                    value: 41906427,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uruguay</span><br />Population : 41906427'
                    }
                },
                YE: {
                    value: 51501615,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Yemen</span><br />Population : 51501615'
                    }
                },
                ZM: {
                    value: 55678602,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Zambia</span><br />Population : 55678602'
                    }
                },
                ZW: {
                    value: 57040464,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Zimbabwe</span><br />Population : 57040464'
                    }
                }
            }
        },
        2013: {
            areas: {
                AF: {
                    value: 30428397,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Afghanistan</span><br />Population : 30428397'
                    }
                },
                ZA: {
                    value: 42385364,
                    tooltip: {
                        content: '<span style="font-weight:bold;">South Africa</span><br />Population : 42385364'
                    }
                },
                AL: {
                    value: 23215097,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Albania</span><br />Population : 23215097'
                    }
                },
                DZ: {
                    value: 59170087,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Algeria</span><br />Population : 59170087'
                    }
                },
                DE: {
                    value: 12696768,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Germany</span><br />Population : 12696768'
                    }
                },
                AD: {
                    value: 30181616,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Andorra</span><br />Population : 30181616'
                    }
                },
                AO: {
                    value: 59475364,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Angola</span><br />Population : 59475364'
                    }
                },
                AG: {
                    value: 31932843,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Antigua And Barbuda</span><br />Population : 31932843'
                    }
                },
                SA: {
                    value: 57555961,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saudi Arabia</span><br />Population : 57555961'
                    }
                },
                AR: {
                    value: 11777282,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Argentina</span><br />Population : 11777282'
                    }
                },
                AM: {
                    value: 18871762,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Armenia</span><br />Population : 18871762'
                    }
                },
                AU: {
                    value: 12534076,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Australia</span><br />Population : 12534076'
                    }
                },
                AT: {
                    value: 58309098,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Austria</span><br />Population : 58309098'
                    }
                },
                AZ: {
                    value: 37712988,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Azerbaijan</span><br />Population : 37712988'
                    }
                },
                BS: {
                    value: 19332419,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bahamas</span><br />Population : 19332419'
                    }
                },
                BH: {
                    value: 36539411,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bahrain</span><br />Population : 36539411'
                    }
                },
                BD: {
                    value: 58009305,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bangladesh</span><br />Population : 58009305'
                    }
                },
                BB: {
                    value: 8779358,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Barbados</span><br />Population : 8779358'
                    }
                },
                BE: {
                    value: 29035458,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belgium</span><br />Population : 29035458'
                    }
                },
                BZ: {
                    value: 49664472,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belize</span><br />Population : 49664472'
                    }
                },
                BJ: {
                    value: 9859707,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Benin</span><br />Population : 9859707'
                    }
                },
                BT: {
                    value: 35417017,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bhutan</span><br />Population : 35417017'
                    }
                },
                BY: {
                    value: 46109006,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Belarus</span><br />Population : 46109006'
                    }
                },
                MM: {
                    value: 27574884,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Myanmar</span><br />Population : 27574884'
                    }
                },
                BO: {
                    value: 16813431,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bolivia, Plurinational State Of</span><br />Population : 16813431'
                    }
                },
                BA: {
                    value: 18416589,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bosnia And Herzegovina</span><br />Population : 18416589'
                    }
                },
                BW: {
                    value: 38731186,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Botswana</span><br />Population : 38731186'
                    }
                },
                BR: {
                    value: 35786273,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Brazil</span><br />Population : 35786273'
                    }
                },
                BN: {
                    value: 32073599,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Brunei Darussalam</span><br />Population : 32073599'
                    }
                },
                BG: {
                    value: 8318701,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Bulgaria</span><br />Population : 8318701'
                    }
                },
                BF: {
                    value: 5030123,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Burkina Faso</span><br />Population : 5030123'
                    }
                },
                BI: {
                    value: 49964264,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Burundi</span><br />Population : 49964264'
                    }
                },
                KH: {
                    value: 38793338,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cambodia</span><br />Population : 38793338'
                    }
                },
                CM: {
                    value: 25713977,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cameroon</span><br />Population : 25713977'
                    }
                },
                CA: {
                    value: 32983945,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Canada</span><br />Population : 32983945'
                    }
                },
                CV: {
                    value: 15824481,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cape Verde</span><br />Population : 15824481'
                    }
                },
                CF: {
                    value: 50075772,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Central African Republic</span><br />Population : 50075772'
                    }
                },
                CL: {
                    value: 1343042,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Chile</span><br />Population : 1343042'
                    }
                },
                CN: {
                    value: 920773,
                    tooltip: {
                        content: '<span style="font-weight:bold;">China</span><br />Population : 920773'
                    }
                },
                CY: {
                    value: 28832550,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cyprus</span><br />Population : 28832550'
                    }
                },
                CO: {
                    value: 49074027,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Colombia</span><br />Population : 49074027'
                    }
                },
                KM: {
                    value: 15696521,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Comoros</span><br />Population : 15696521'
                    }
                },
                CG: {
                    value: 56718735,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Congo</span><br />Population : 56718735'
                    }
                },
                CD: {
                    value: 34704096,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Congo, The Democratic Republic Of The</span><br />Population : 34704096'
                    }
                },
                KP: {
                    value: 48891227,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Korea, Democratic People\'s Republic Of</span><br />Population : 48891227'
                    }
                },
                KR: {
                    value: 59415040,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Korea, Republic Of</span><br />Population : 59415040'
                    }
                },
                CR: {
                    value: 18805954,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Costa Rica</span><br />Population : 18805954'
                    }
                },
                CI: {
                    value: 9104742,
                    tooltip: {
                        content: '<span style="font-weight:bold;">CÔte D\'ivoire</span><br />Population : 9104742'
                    }
                },
                HR: {
                    value: 32680496,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Croatia</span><br />Population : 32680496'
                    }
                },
                CU: {
                    value: 33289221,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Cuba</span><br />Population : 33289221'
                    }
                },
                DK: {
                    value: 35060556,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Denmark</span><br />Population : 35060556'
                    }
                },
                DJ: {
                    value: 17550116,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Djibouti</span><br />Population : 17550116'
                    }
                },
                DM: {
                    value: 13544961,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Dominica</span><br />Population : 13544961'
                    }
                },
                EG: {
                    value: 47759693,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Egypt</span><br />Population : 47759693'
                    }
                },
                AE: {
                    value: 43710666,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United Arab Emirates</span><br />Population : 43710666'
                    }
                },
                EC: {
                    value: 35705841,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ecuador</span><br />Population : 35705841'
                    }
                },
                ER: {
                    value: 34537747,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Eritrea</span><br />Population : 34537747'
                    }
                },
                ES: {
                    value: 3617077,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Spain</span><br />Population : 3617077'
                    }
                },
                EE: {
                    value: 12934408,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Estonia</span><br />Population : 12934408'
                    }
                },
                US: {
                    value: 9287542,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United States</span><br />Population : 9287542'
                    }
                },
                ET: {
                    value: 48861978,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ethiopia</span><br />Population : 48861978'
                    }
                },
                FJ: {
                    value: 11302002,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Fiji</span><br />Population : 11302002'
                    }
                },
                FI: {
                    value: 759909,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Finland</span><br />Population : 759909'
                    }
                },
                FR: {
                    value: 33760846,
                    tooltip: {
                        content: '<span style="font-weight:bold;">France</span><br />Population : 33760846'
                    }
                },
                GA: {
                    value: 39670780,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Gabon</span><br />Population : 39670780'
                    }
                },
                GM: {
                    value: 31505090,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Gambia</span><br />Population : 31505090'
                    }
                },
                GE: {
                    value: 35265292,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Georgia</span><br />Population : 35265292'
                    }
                },
                GH: {
                    value: 54841376,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ghana</span><br />Population : 54841376'
                    }
                },
                GR: {
                    value: 20067276,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Greece</span><br />Population : 20067276'
                    }
                },
                GD: {
                    value: 54866968,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Grenada</span><br />Population : 54866968'
                    }
                },
                GT: {
                    value: 54678684,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guatemala</span><br />Population : 54678684'
                    }
                },
                GN: {
                    value: 48194757,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guinea</span><br />Population : 48194757'
                    }
                },
                GQ: {
                    value: 33104593,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Equatorial Guinea</span><br />Population : 33104593'
                    }
                },
                GW: {
                    value: 42078259,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guinea-bissau</span><br />Population : 42078259'
                    }
                },
                GY: {
                    value: 27178207,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Guyana</span><br />Population : 27178207'
                    }
                },
                HT: {
                    value: 19436615,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Haiti</span><br />Population : 19436615'
                    }
                },
                HN: {
                    value: 31985855,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Honduras</span><br />Population : 31985855'
                    }
                },
                HU: {
                    value: 43679590,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Hungary</span><br />Population : 43679590'
                    }
                },
                JM: {
                    value: 10791989,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Jamaica</span><br />Population : 10791989'
                    }
                },
                JP: {
                    value: 4132574,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Japan</span><br />Population : 4132574'
                    }
                },
                MH: {
                    value: 59764188,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Marshall Islands</span><br />Population : 59764188'
                    }
                },
                PW: {
                    value: 20361584,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Palau</span><br />Population : 20361584'
                    }
                },
                SB: {
                    value: 33598154,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Solomon Islands</span><br />Population : 33598154'
                    }
                },
                IN: {
                    value: 7898260,
                    tooltip: {
                        content: '<span style="font-weight:bold;">India</span><br />Population : 7898260'
                    }
                },
                ID: {
                    value: 9742715,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Indonesia</span><br />Population : 9742715'
                    }
                },
                JO: {
                    value: 22664868,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Jordan</span><br />Population : 22664868'
                    }
                },
                IR: {
                    value: 33824826,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iran, Islamic Republic Of</span><br />Population : 33824826'
                    }
                },
                IQ: {
                    value: 6399298,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iraq</span><br />Population : 6399298'
                    }
                },
                IE: {
                    value: 44774564,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ireland</span><br />Population : 44774564'
                    }
                },
                IS: {
                    value: 11280066,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Iceland</span><br />Population : 11280066'
                    }
                },
                IL: {
                    value: 39550131,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Israel</span><br />Population : 39550131'
                    }
                },
                IT: {
                    value: 5251312,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Italy</span><br />Population : 5251312'
                    }
                },
                KZ: {
                    value: 58162858,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kazakhstan</span><br />Population : 58162858'
                    }
                },
                KE: {
                    value: 36747803,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kenya</span><br />Population : 36747803'
                    }
                },
                KG: {
                    value: 48902195,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kyrgyzstan</span><br />Population : 48902195'
                    }
                },
                KI: {
                    value: 40019928,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kiribati</span><br />Population : 40019928'
                    }
                },
                KW: {
                    value: 33060721,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Kuwait</span><br />Population : 33060721'
                    }
                },
                LA: {
                    value: 59758704,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lao People\'s Democratic Republic</span><br />Population : 59758704'
                    }
                },
                LS: {
                    value: 30059140,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lesotho</span><br />Population : 30059140'
                    }
                },
                LV: {
                    value: 56420771,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Latvia</span><br />Population : 56420771'
                    }
                },
                LB: {
                    value: 42471280,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lebanon</span><br />Population : 42471280'
                    }
                },
                LR: {
                    value: 11053393,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Liberia</span><br />Population : 11053393'
                    }
                },
                LY: {
                    value: 41049094,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Libya</span><br />Population : 41049094'
                    }
                },
                LI: {
                    value: 30119464,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Liechtenstein</span><br />Population : 30119464'
                    }
                },
                LT: {
                    value: 9647659,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Lithuania</span><br />Population : 9647659'
                    }
                },
                LU: {
                    value: 31022498,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Luxembourg</span><br />Population : 31022498'
                    }
                },
                MK: {
                    value: 50050180,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Macedonia, The Former Yugoslav Republic Of</span><br />Population : 50050180'
                    }
                },
                MG: {
                    value: 26631634,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Madagascar</span><br />Population : 26631634'
                    }
                },
                MY: {
                    value: 7592984,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malaysia</span><br />Population : 7592984'
                    }
                },
                MW: {
                    value: 50406641,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malawi</span><br />Population : 50406641'
                    }
                },
                MV: {
                    value: 55190525,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Maldives</span><br />Population : 55190525'
                    }
                },
                ML: {
                    value: 21622906,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mali</span><br />Population : 21622906'
                    }
                },
                MT: {
                    value: 19460379,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Malta</span><br />Population : 19460379'
                    }
                },
                MA: {
                    value: 29896448,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Morocco</span><br />Population : 29896448'
                    }
                },
                MU: {
                    value: 24648251,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mauritius</span><br />Population : 24648251'
                    }
                },
                MR: {
                    value: 20708905,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mauritania</span><br />Population : 20708905'
                    }
                },
                MX: {
                    value: 58352970,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mexico</span><br />Population : 58352970'
                    }
                },
                FM: {
                    value: 20032544,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Micronesia, Federated States Of</span><br />Population : 20032544'
                    }
                },
                MD: {
                    value: 16451486,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Moldova, Republic Of</span><br />Population : 16451486'
                    }
                },
                MC: {
                    value: 59455256,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Monaco</span><br />Population : 59455256'
                    }
                },
                MN: {
                    value: 47523880,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mongolia</span><br />Population : 47523880'
                    }
                },
                ME: {
                    value: 41405554,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Montenegro</span><br />Population : 41405554'
                    }
                },
                MZ: {
                    value: 58678354,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Mozambique</span><br />Population : 58678354'
                    }
                },
                NA: {
                    value: 23677582,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Namibia</span><br />Population : 23677582'
                    }
                },
                NP: {
                    value: 59976236,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nepal</span><br />Population : 59976236'
                    }
                },
                NI: {
                    value: 24756103,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nicaragua</span><br />Population : 24756103'
                    }
                },
                NE: {
                    value: 29656979,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Niger</span><br />Population : 29656979'
                    }
                },
                NG: {
                    value: 8841510,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Nigeria</span><br />Population : 8841510'
                    }
                },
                NO: {
                    value: 18963162,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Norway</span><br />Population : 18963162'
                    }
                },
                NZ: {
                    value: 50574817,
                    tooltip: {
                        content: '<span style="font-weight:bold;">New Zealand</span><br />Population : 50574817'
                    }
                },
                OM: {
                    value: 17365487,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Oman</span><br />Population : 17365487'
                    }
                },
                UG: {
                    value: 20562665,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uganda</span><br />Population : 20562665'
                    }
                },
                UZ: {
                    value: 57387784,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uzbekistan</span><br />Population : 57387784'
                    }
                },
                PK: {
                    value: 49602320,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Pakistan</span><br />Population : 49602320'
                    }
                },
                PS: {
                    value: 19932004,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Palestine, State Of</span><br />Population : 19932004'
                    }
                },
                PA: {
                    value: 34506671,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Panama</span><br />Population : 34506671'
                    }
                },
                PG: {
                    value: 38603226,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Papua New Guinea</span><br />Population : 38603226'
                    }
                },
                PY: {
                    value: 42429236,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Paraguay</span><br />Population : 42429236'
                    }
                },
                NL: {
                    value: 5534652,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Netherlands</span><br />Population : 5534652'
                    }
                },
                PE: {
                    value: 56289154,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Peru</span><br />Population : 56289154'
                    }
                },
                PH: {
                    value: 35612613,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Philippines</span><br />Population : 35612613'
                    }
                },
                PL: {
                    value: 19696191,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Poland</span><br />Population : 19696191'
                    }
                },
                PT: {
                    value: 32201559,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Portugal</span><br />Population : 32201559'
                    }
                },
                QA: {
                    value: 1675738,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Qatar</span><br />Population : 1675738'
                    }
                },
                DO: {
                    value: 31569070,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Dominican Republic</span><br />Population : 31569070'
                    }
                },
                RO: {
                    value: 1993811,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Romania</span><br />Population : 1993811'
                    }
                },
                GB: {
                    value: 8210849,
                    tooltip: {
                        content: '<span style="font-weight:bold;">United Kingdom</span><br />Population : 8210849'
                    }
                },
                RU: {
                    value: 55982050,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Russian Federation</span><br />Population : 55982050'
                    }
                },
                RW: {
                    value: 39575723,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Rwanda</span><br />Population : 39575723'
                    }
                },
                KN: {
                    value: 39862720,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Kitts And Nevis</span><br />Population : 39862720'
                    }
                },
                SM: {
                    value: 51490647,
                    tooltip: {
                        content: '<span style="font-weight:bold;">San Marino</span><br />Population : 51490647'
                    }
                },
                VC: {
                    value: 15173712,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Vincent And The Grenadines</span><br />Population : 15173712'
                    }
                },
                LC: {
                    value: 42785697,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Saint Lucia</span><br />Population : 42785697'
                    }
                },
                SV: {
                    value: 34093543,
                    tooltip: {
                        content: '<span style="font-weight:bold;">El Salvador</span><br />Population : 34093543'
                    }
                },
                WS: {
                    value: 10419076,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Samoa</span><br />Population : 10419076'
                    }
                },
                ST: {
                    value: 4666351,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sao Tome And Principe</span><br />Population : 4666351'
                    }
                },
                SN: {
                    value: 54302115,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Senegal</span><br />Population : 54302115'
                    }
                },
                RS: {
                    value: 35226904,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Serbia</span><br />Population : 35226904'
                    }
                },
                SC: {
                    value: 2924264,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Seychelles</span><br />Population : 2924264'
                    }
                },
                SL: {
                    value: 125592,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sierra Leone</span><br />Population : 125592'
                    }
                },
                SG: {
                    value: 57278104,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Singapore</span><br />Population : 57278104'
                    }
                },
                SK: {
                    value: 3953430,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Slovakia</span><br />Population : 3953430'
                    }
                },
                SI: {
                    value: 57084336,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Slovenia</span><br />Population : 57084336'
                    }
                },
                SO: {
                    value: 7167059,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Somalia</span><br />Population : 7167059'
                    }
                },
                SD: {
                    value: 4916787,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sudan</span><br />Population : 4916787'
                    }
                },
                SS: {
                    value: 50713745,
                    tooltip: {
                        content: '<span style="font-weight:bold;">South Sudan</span><br />Population : 50713745'
                    }
                },
                LK: {
                    value: 51227414,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sri Lanka</span><br />Population : 51227414'
                    }
                },
                SE: {
                    value: 1456378,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Sweden</span><br />Population : 1456378'
                    }
                },
                CH: {
                    value: 171292,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Switzerland</span><br />Population : 171292'
                    }
                },
                SR: {
                    value: 16398474,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Suriname</span><br />Population : 16398474'
                    }
                },
                SZ: {
                    value: 13431625,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Swaziland</span><br />Population : 13431625'
                    }
                },
                SY: {
                    value: 48509174,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Syrian Arab Republic</span><br />Population : 48509174'
                    }
                },
                TJ: {
                    value: 56144742,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tajikistan</span><br />Population : 56144742'
                    }
                },
                TZ: {
                    value: 11448242,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tanzania, United Republic Of</span><br />Population : 11448242'
                    }
                },
                TD: {
                    value: 1725094,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Chad</span><br />Population : 1725094'
                    }
                },
                CZ: {
                    value: 4191070,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Czech Republic</span><br />Population : 4191070'
                    }
                },
                TH: {
                    value: 36190262,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Thailand</span><br />Population : 36190262'
                    }
                },
                TL: {
                    value: 56453675,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Timor-leste</span><br />Population : 56453675'
                    }
                },
                TG: {
                    value: 44185947,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Togo</span><br />Population : 44185947'
                    }
                },
                TO: {
                    value: 53817694,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tonga</span><br />Population : 53817694'
                    }
                },
                TT: {
                    value: 13310977,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Trinidad And Tobago</span><br />Population : 13310977'
                    }
                },
                TN: {
                    value: 22255395,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tunisia</span><br />Population : 22255395'
                    }
                },
                TM: {
                    value: 19142306,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Turkmenistan</span><br />Population : 19142306'
                    }
                },
                TR: {
                    value: 53254670,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Turkey</span><br />Population : 53254670'
                    }
                },
                TV: {
                    value: 30560013,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Tuvalu</span><br />Population : 30560013'
                    }
                },
                VU: {
                    value: 49244031,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Vanuatu</span><br />Population : 49244031'
                    }
                },
                VE: {
                    value: 14572299,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Venezuela, Bolivarian Republic Of</span><br />Population : 14572299'
                    }
                },
                VN: {
                    value: 8117620,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Viet Nam</span><br />Population : 8117620'
                    }
                },
                UA: {
                    value: 41140494,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Ukraine</span><br />Population : 41140494'
                    }
                },
                UY: {
                    value: 8260205,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Uruguay</span><br />Population : 8260205'
                    }
                },
                YE: {
                    value: 28604050,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Yemen</span><br />Population : 28604050'
                    }
                },
                ZM: {
                    value: 13872174,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Zambia</span><br />Population : 13872174'
                    }
                },
                ZW: {
                    value: 28205545,
                    tooltip: {
                        content: '<span style="font-weight:bold;">Zimbabwe</span><br />Population : 28205545'
                    }
                }
            }
        }
    }
}(),
function() {
    "use strict";

    function a(a) {
        a.state("app.ui-tabs-accordion", {
            url: "/ui/tabs-accordion",
            templateUrl: "app/modules/ui-tabs-accordion/ui-tabs-accordion.html"
        })
    }
    var t = angular.module("singApp.ui.tabs-accordion", ["ui.router"]);
    t.config(a), a.$inject = ["$stateProvider"]
}(),
function() {
    "use strict";

    function a(a) {
        a.state("app.ui-notifications", {
            url: "/ui/notifications",
            templateUrl: "app/modules/ui-notifications/ui-notifications.html"
        })
    }
    var t = angular.module("singApp.ui.notifications", ["ui.router"]);
    t.config(a), a.$inject = ["$stateProvider"]
}(),
function() {
    "use strict";

    function a(a, t, o) {
        function i() {
            (function() {
                var o, i, e, s = {}.hasOwnProperty,
                    l = function(a, t) {
                        function o() {
                            this.constructor = a
                        }
                        for (var i in t) s.call(t, i) && (a[i] = t[i]);
                        return o.prototype = t.prototype, a.prototype = new o, a.__super__ = t.prototype, a
                    };
                o = t, e = '<div class="messenger-spinner">\n    <span class="messenger-spinner-side messenger-spinner-side-left">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n    <span class="messenger-spinner-side messenger-spinner-side-right">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n</div>', i = function(a) {
                    function o() {
                        return o.__super__.constructor.apply(this, arguments)
                    }
                    return l(o, a), o.prototype.template = function(a) {
                        var i;
                        return i = o.__super__.template.apply(this, arguments), i.append(t(e)), i
                    }, o
                }(a.Messenger.Message), a.Messenger.themes.air = {
                    Message: i
                }
            }).call(a)
        }
        return {
            link: function(a, e) {
                function s() {
                    i();
                    var a = "air";
                    t.globalMessenger({
                        theme: a
                    }), o.options = {
                        theme: a
                    }, o().post("Thanks for checking out Messenger!");
                    var e = ["bottom", "right"],
                        s = t(".location-selector"),
                        l = function() {
                            for (var i = "messenger-fixed", s = 0; s < e.length; s++) i += " messenger-on-" + e[s];
                            t.globalMessenger({
                                extraClasses: i,
                                theme: a
                            }), o.options = {
                                extraClasses: i,
                                theme: a
                            }
                        };
                    l(), s.locationSelector().on("update", function(a) {
                        e = a, l()
                    }), t("#show-error-message").on("click", function() {
                        var a;
                        return a = 0, o().run({
                            errorMessage: "Error destroying alien planet",
                            successMessage: "Alien planet destroyed!",
                            action: function(t) {
                                return ++a < 3 ? t.error({
                                    status: 500,
                                    readyState: 0,
                                    responseText: 0
                                }) : t.success()
                            }
                        }), !1
                    }), t("#show-info-message").on("click", function() {
                        var a = o().post({
                            message: "Launching thermonuclear war...",
                            actions: {
                                cancel: {
                                    label: "cancel launch",
                                    action: function() {
                                        return a.update({
                                            message: "Thermonuclear war averted",
                                            type: "success",
                                            actions: !1
                                        })
                                    }
                                }
                            }
                        });
                        return !1
                    }), t("#show-success-message").on("click", function() {
                        return o().post({
                            message: "Showing success message was successful!",
                            type: "success",
                            showCloseButton: !0
                        }), !1
                    })
                }
                s()
            }
        }
    }

    function t(a) {
        return a.Messenger
    }
    angular.module("singApp.ui.notifications").directive("messengerDemo", a).factory("Messenger", t), a.$inject = ["$window", "jQuery", "Messenger"], t.$inject = ["$window"]
}(),
function() {
    "use strict";

    function a(a) {
        a.state("app.ui-list-groups", {
            url: "/ui/list-groups",
            templateUrl: "app/modules/ui-list-groups/ui-list-groups.html"
        })
    }
    var t = angular.module("singApp.ui.list-groups", ["ui.router", "ui.jq"]);
    t.config(a), a.$inject = ["$stateProvider"]
}(),
function() {
    "use strict";

    function a(a) {
        a.state("app.ui-icons", {
            url: "/ui/icons",
            templateUrl: "app/modules/ui-icons/ui-icons.html"
        })
    }
    var t = angular.module("singApp.ui.icons", ["ui.router"]);
    t.config(a), a.$inject = ["$stateProvider"]
}(),
function() {
    "use strict";

    function a(a) {
        a.state("app.ui-components", {
            url: "/ui/components",
            templateUrl: "app/modules/ui-components/ui-components.html",
            controller: "UiComponentsDemoController"
        })
    }
    var t = angular.module("singApp.ui.components", ["ui.router", "ui.bootstrap"]);
    t.config(a), a.$inject = ["$stateProvider"]
}(),
function() {
    "use strict";

    function a(a, t) {
        a.alerts = [{
            type: "success",
            msg: t.trustAsHtml('<span class="fw-semi-bold">Success:</span> You successfully read this important alert message.')
        }, {
            type: "info",
            msg: t.trustAsHtml('<span class="fw-semi-bold">Info:</span> This alert needs your attention, but it\'s not super important.')
        }, {
            type: "warning",
            msg: t.trustAsHtml('<span class="fw-semi-bold">Warning:</span> Best check yo self, you\'re not looking too good.')
        }, {
            type: "danger",
            msg: t.trustAsHtml('<span class="fw-semi-bold">Danger:</span> Change this and that and try again.  <a class="btn btn-default btn-xs pull-right mr" href="#">Ignore</a>  <a class="btn btn-danger btn-xs pull-right mr-xs" href="#">Take this action</a>')
        }], a.addAlert = function() {
            a.alerts.push({
                type: "warning",
                msg: t.trustAsHtml("Another alert!")
            })
        }, a.closeAlert = function(t) {
            a.alerts.splice(t, 1)
        }
    }

    function t(a, t) {
        a.open = function() {
            t.open({
                templateUrl: "my-modal18-content.html",
                controller: "ModalInstanceCtrl"
            })
        }
    }

    function o(a, t) {
        a.ok = function() {
            t.close()
        }, a.cancel = function() {
            t.dismiss("cancel")
        }
    }
    angular.module("singApp.ui.components").controller("UiComponentsDemoController", a).controller("ModalDemoCtrl", t).controller("ModalInstanceCtrl", o), a.$inject = ["$scope", "$sce"], t.$inject = ["$scope", "$modal", "$log"], o.$inject = ["$scope", "$modalInstance"]
}(),
function() {
    "use strict";

    function a(a) {
        a.state("app.ui-buttons", {
            url: "/ui/buttons",
            templateUrl: "app/modules/ui-buttons/ui-buttons.html"
        })
    }
    var t = angular.module("singApp.ui.buttons", ["ui.router"]);
    t.config(a), a.$inject = ["$stateProvider"]
}(),
function() {
    "use strict";

    function a(a) {
        a.state("app.tables-dynamic", {
            url: "/tables/dynamic",
            templateUrl: "app/modules/tables-dynamic/tables-dynamic.html",
            controller: "AngularWayCtrl"
        })
    }
    var t = angular.module("singApp.tables.dynamic", ["ui.router", "ngResource", "datatables", "datatables.bootstrap"]);
    t.config(a), a.$inject = ["$stateProvider"]
}(),
function() {
    "use strict";

    function a(a, t, o, i) {
        i.extend(i.fn.dataTableExt.oPagination, {
            bootstrap: {
                fnInit: function(a, t, o) {
                    var e = a.oLanguage.oPaginate,
                        s = function(t) {
                            t.preventDefault(), a.oApi._fnPageChange(a, t.data.action) && o(a)
                        };
                    i(t).append('<ul class="pagination no-margin"><li class="prev disabled"><a href="#">' + e.sPrevious + '</a></li><li class="next disabled"><a href="#">' + e.sNext + "</a></li></ul>");
                    var l = i("a", t);
                    i(l[0]).bind("click.DT", {
                        action: "previous"
                    }, s), i(l[1]).bind("click.DT", {
                        action: "next"
                    }, s)
                },
                fnUpdate: function(a, t) {
                    function o(o) {
                        o.preventDefault(), a._iDisplayStart = (parseInt(i("a", this).text(), 10) - 1) * r.iLength, t(a)
                    }
                    var e, s, l, n, c, p, d = 5,
                        r = a.oInstance.fnPagingInfo(),
                        u = a.aanFeatures.p,
                        m = Math.floor(d / 2);
                    for (r.iTotalPages < d ? (c = 1, p = r.iTotalPages) : r.iPage <= m ? (c = 1, p = d) : r.iPage >= r.iTotalPages - m ? (c = r.iTotalPages - d + 1, p = r.iTotalPages) : (c = r.iPage - m + 1, p = c + d - 1), e = 0, s = u.length; s > e; e++) {
                        for (i("li:gt(0)", u[e]).filter(":not(:last)").remove(), l = c; p >= l; l++) n = l === r.iPage + 1 ? 'class="active"' : "", i("<li " + n + '><a href="#">' + l + "</a></li>").insertBefore(i("li:last", u[e])[0]).bind("click", o);
                        0 === r.iPage ? i("li:first", u[e]).addClass("disabled") : i("li:first", u[e]).removeClass("disabled"), r.iPage === r.iTotalPages - 1 || 0 === r.iTotalPages ? i("li:last", u[e]).addClass("disabled") : i("li:last", u[e]).removeClass("disabled")
                    }
                }
            }
        }), a.people = t("./assets/json/people.json").query(), a.dtOptions = o.newOptions().withBootstrap().withOption("sDom", "<'row'<'col-md-6 hidden-xs'l><'col-md-6'f>r>t<'row'<'col-md-6'i><'col-md-6'p>>").withOption("oLanguage", {
            sLengthMenu: "_MENU_",
            sInfo: "Showing <strong>_START_ to _END_</strong> of _TOTAL_ entries"
        }).withOption("sPaginationType", "bootstrap").withOption("oClasses", {
            sFilter: "pull-right",
            sFilterInput: "form-control input-rounded ml-sm",
            sWrapper: "dataTables_wrapper form-inline",
            sLength: "dataTables_length blahblahcar"
        }).withOption("aoColumns", [null, null, {
            bSortable: !1
        }, null, null, {
            bSortable: !1
        }]).withOption("initComplete", function() {
            i(".dataTables_length select").selectpicker({
                width: "auto"
            })
        })
    }
    angular.module("singApp.tables.dynamic").controller("AngularWayCtrl", a), a.$inject = ["$scope", "$resource", "DTOptionsBuilder", "jQuery"]
}(),
function() {
    "use strict";

    function a(a, t, o, i) {
        return {
            link: function(e, s) {
                function l() {
                    function s(a) {
                        var o = [{
                            name: "id",
                            label: "ID",
                            editable: !1,
                            cell: i.IntegerCell.extend({
                                orderSeparator: ""
                            })
                        }, {
                            name: "name",
                            label: "Name",
                            cell: "string"
                        }, {
                            name: "pop",
                            label: "Population",
                            cell: "integer"
                        }, {
                            name: "url",
                            label: "URL",
                            cell: "uri"
                        }];
                        e.app.helpers.isScreen("xs") && o.splice(3, 1);
                        var s = new i.Grid({
                                columns: o,
                                collection: a,
                                className: "table table-striped table-editable no-margin mb-sm"
                            }),
                            l = new i.Extension.Paginator({
                                slideScale: .25,
                                goBackFirstOnSort: !1,
                                collection: a,
                                controls: {
                                    rewind: {
                                        label: '<i class="fa fa-angle-double-left fa-lg"></i>',
                                        title: "First"
                                    },
                                    back: {
                                        label: '<i class="fa fa-angle-left fa-lg"></i>',
                                        title: "Previous"
                                    },
                                    forward: {
                                        label: '<i class="fa fa-angle-right fa-lg"></i>',
                                        title: "Next"
                                    },
                                    fastForward: {
                                        label: '<i class="fa fa-angle-double-right fa-lg"></i>',
                                        title: "Last"
                                    }
                                }
                            });
                        t("#table-dynamic").html("").append(s.render().$el).append(l.render().$el)
                    }
                    i.InputCellEditor.prototype.attributes["class"] = "form-control input-sm";
                    var l = o.Model.extend({}),
                        n = o.PageableCollection.extend({
                            model: l,
                            url: "./assets/json/pageable-territories.json",
                            state: {
                                pageSize: 9
                            },
                            mode: "client"
                        }),
                        c = new n,
                        p = c;
                    t(a).on("sn:resize", function() {
                        s(c)
                    }), s(c), t("#search-countries").keyup(function() {
                        var a = t(this),
                            o = p.fullCollection.filter(function(t) {
                                return ~t.get("name").toUpperCase().indexOf(a.val().toUpperCase())
                            });
                        s(new n(o, {
                            state: {
                                firstPage: 1,
                                currentPage: 1
                            }
                        }))
                    }), c.fetch()
                }
                l()
            }
        }
    }

    function t(a) {
        return a.Backbone
    }

    function o(a) {
        return a.Backgrid
    }
    angular.module("singApp.tables.dynamic").directive("snBackgridDemo", a).factory("Backbone", t).factory("Backgrid", o), a.$inject = ["$window", "jQuery", "Backbone", "Backgrid"], t.$inject = ["$window"], o.$inject = ["$window"]
}(),
function() {
    "use strict";

    function a(a) {
        a.state("app.profile", {
            url: "/profile",
            templateUrl: "app/modules/profile/profile.html"
        })
    }
    var t = angular.module("singApp.profile", ["ui.router"]);
    t.config(a), a.$inject = ["$stateProvider"]
}(),
function() {
    "use strict";

    function a(a) {
        a.state("app.tables-basic", {
            url: "/tables/basic",
            templateUrl: "app/modules/tables-basic/tables-basic.html"
        })
    }
    var t = angular.module("singApp.tables.basic", ["ui.router"]);
    t.config(a), a.$inject = ["$stateProvider"]
}(),
function() {
    "use strict";

    function a(a) {
        a.state("app.maps-vector", {
            url: "/maps/vector",
            templateUrl: "app/modules/maps-vector/maps-vector.html"
        })
    }
    var t = angular.module("singApp.maps.vector", ["ui.router", "ui.jq"]);
    t.config(a), a.$inject = ["$stateProvider"]
}(),
function() {
    "use strict";

    function a(a) {
        a.state("app.maps-google", {
            url: "/maps/google",
            templateUrl: "app/modules/maps-google/maps-google.html"
        })
    }
    var t = angular.module("singApp.maps.google", ["ui.router", "singApp.components.gmap"]);
    t.config(a), a.$inject = ["$stateProvider"]
}(),
function() {
    "use strict";

    function a(a) {
        a.state("app.inbox", {
            url: "/inbox",
            templateUrl: "app/modules/inbox/inbox.html"
        })
    }
    var t = angular.module("singApp.inbox", ["ui.router", "ui.bootstrap"]);
    t.config(a), a.$inject = ["$stateProvider"]
}(), $(function() {}),
    function() {
        "use strict";

        function a(a) {
            return {
                link: i
            }
        }

        function t() {
            var a = 33,
                t = Backbone.Model.extend({
                    defaults: function() {
                        return {
                            sender: "",
                            senderMail: "",
                            subject: "",
                            body: e[Math.round(3 * Math.random())],
                            receiver: "",
                            timestamp: new Date((new Date).getTime() - 72e5).getTime(),
                            read: !0,
                            starred: !1,
                            attachment: !1,
                            folderId: 1,
                            selected: !1
                        }
                    },
                    markRead: function() {
                        this.save({
                            read: !0
                        })
                    },
                    toggleStarred: function() {
                        this.save({
                            starred: !this.get("starred")
                        })
                    },
                    toggleSelected: function() {
                        this.save({
                            selected: !this.get("selected")
                        })
                    }
                }),
                o = Backbone.Model.extend({
                    defaults: {
                        name: "",
                        current: !1,
                        order: 3,
                        unread: 0
                    },
                    sync: function() {}
                }),
                i = Backbone.Collection.extend({
                    model: o,
                    url: "assets/json/folders.json",
                    comparator: "order",
                    parse: function(t) {
                        return t.push({
                            name: "Starred",
                            id: a,
                            order: 4
                        }), t
                    }
                }),
                s = new i,
                l = Backbone.View.extend({
                    tagName: "li",
                    template: _.template($("#folder-template").html()),
                    events: {
                        click: "selectFolder"
                    },
                    initialize: function() {
                        this.listenTo(this.model, "change", this.render)
                    },
                    render: function() {
                        return this.$el.attr("class", this.model.get("current") ? "active" : ""), this.$el.html(this.template(this.model.toJSON())), this
                    },
                    selectFolder: function(a) {
                        var t = this;
                        s.each(function(a) {
                            a.save({
                                current: a == t.model
                            })
                        }), v.showEmailsView(), a.preventDefault()
                    }
                }),
                n = window.EmailList = Backbone.Collection.extend({
                    model: t,
                    url: "assets/json/emails.json",
                    comparator: function(a) {
                        return -a.get("timestamp")
                    },
                    search: function(a, t) {
                        if ("" == a) return this.where({
                            folderId: t
                        });
                        var o = new RegExp(a, "gi");
                        return this.filter(function(a) {
                            return a.get("folderId") == t && o.test(a.get("subject")) || o.test(a.get("sender"))
                        })
                    }
                }),
                c = new n,
                p = Backbone.View.extend({
                    tagName: "tr",
                    template: _.template($("#mail-item-template").html()),
                    events: {
                        "change .selected-checkbox": "toggleSelected",
                        "click .starred": "toggleStarred",
                        "click .name,.subject": "openEmail"
                    },
                    initialize: function() {
                        this.listenTo(this.model, "change", this.render)
                    },
                    render: function() {
                        return this.$el.attr("class", this.model.get("read") ? "" : "unread"), this.$el.html(this.template(this.model.toJSON())), this
                    },
                    formatDate: function(a) {
                        var t = new Date(a),
                            o = new Date,
                            i = new Date(o.getFullYear(), o.getMonth(), o.getDate());
                        return t.getTime() > i ? t.getHours() + ":" + (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()) : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][t.getMonth()] + " " + t.getDate()
                    },
                    toggleSelected: function() {
                        this.model.toggleSelected()
                    },
                    toggleStarred: function() {
                        this.model.toggleStarred()
                    },
                    openEmail: function() {
                        this.model.save({
                            read: !0
                        }), v.setCurrentView(new d({
                            model: this.model
                        }))
                    }
                }),
                d = Backbone.View.extend({
                    template: _.template($("#email-view-template").html()),
                    attributes: {
                        id: "email-view",
                        "class": "email-view"
                    },
                    events: {
                        "click #email-opened-reply": "replyEmail"
                    },
                    initialize: function() {
                        this.listenTo(this.model, "change", this.render)
                    },
                    render: function() {
                        return $("#widget-email-header").html("<h4>" + this.model.get("subject") + '</h4><div class="widget-controls"><a href="#"><i class="fa fa-print"></i></a></div>'), $("#folder-stats").addClass("hide"), $("#back-btn").removeClass("hide"), this.$el.html(this.template(this.model.toJSON())), this
                    },
                    formatDate: function(a) {
                        var t = new Date(a),
                            o = new Date,
                            i = new Date(o.getFullYear(), o.getMonth(), o.getDate());
                        if (t.getTime() > i) return t.getHours() + ":" + (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes());
                        var e = Math.floor((o.getTime() - t.getTime()) / 864e5);
                        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][t.getMonth()] + " " + t.getDate() + " (" + e + " days ago)"
                    },
                    replyEmail: function() {
                        var a = "<br/><br/><blockquote class='blockquote-sm'>" + this.model.get("body") + "</blockquote> <br/>",
                            o = new t({
                                body: a,
                                receiver: this.model.get("sender") ? this.model.get("sender") : this.model.get("senderMail"),
                                subject: "Re: " + this.model.get("subject")
                            });
                        v.showComposeView(o)
                    }
                }),
                r = Backbone.View.extend({
                    template: _.template($("#compose-view-template").html()),
                    attributes: {
                        id: "compose-view",
                        "class": "compose-view"
                    },
                    events: {
                        "click #compose-save-button, #compose-send-button, #compose-discard-button": "backToFolders"
                    },
                    render: function() {
                        return $("#widget-email-header").html('<h4>Compose <span class="fw-semi-bold">New</span></h4>'), $("#folder-stats").addClass("hide"), $("#back-btn").removeClass("hide"), this.$el.html(this.template(this.model.toJSON())), this._initViewComponents(), this
                    },
                    backToFolders: function() {
                        v.showEmailsView()
                    },
                    _initViewComponents: function() {
                        this.$("textarea").summernote()
                    }
                }),
                u = Backbone.View.extend({
                    tagName: "table",
                    attributes: {
                        id: "folder-view",
                        "class": "table table-striped table-emails table-hover"
                    },
                    template: _.template($("#folders-view-template").html()),
                    events: {
                        "change #toggle-all": "toggleAll"
                    },
                    initialize: function() {
                        this.currentFolderEmails = new n, this.folders = s, this.listenTo(this.currentFolderEmails, "reset", this.renderEmails), this.listenTo(this.currentFolderEmails, "all", this.renderFolderActions), this.listenTo(this.currentFolderEmails, "destroy", this.renderEmails), this.listenTo(this.folders, "change", this.resetEmails)
                    },
                    render: function() {
                        return $("#widget-email-header").html($("#email-list-view-header-template").html()), $("#folder-stats").removeClass("hide"), $("#back-btn").addClass("hide"), $("#select-all").on("click", $.proxy(this.selectAll, this)), $("#select-none").on("click", $.proxy(this.selectNone, this)), $("#select-read").on("click", $.proxy(this.selectRead, this)), $("#select-unread").on("click", $.proxy(this.selectUnread, this)), $("#mark-as-read").on("click", $.proxy(this.markSelectedAsRead, this)), $("#mark-as-unread").on("click", $.proxy(this.markSelectedAsUnread, this)), $("#delete").on("click", $.proxy(this.deleteEmails, this)), this.resetEmails(), this.delegateEvents(this.events), this
                    },
                    renderFolderActions: function() {
                        var a = this.currentFolderEmails.where({
                                selected: !0
                            }).length,
                            t = a == this.currentFolderEmails.length;
                        this.$toggleAllCheckbox = this.$("#toggle-all"), this.$toggleAllCheckbox.prop("checked", t)
                    },
                    addOne: function(a) {
                        var t = new p({
                            model: a
                        });
                        this.$el.find("tbody").append(t.render().el)
                    },
                    renderEmails: function() {
                        this.reset(), this.currentFolderEmails.length ? this.currentFolderEmails.each(this.addOne, this) : this.$el.find("tbody").append('<tr><td colspan="100">Nothing here yet</td></tr>');
                        var a = this.folders.where({
                                current: !0
                            })[0],
                            t = (this.currentFolderEmails.where({
                                read: !1
                            }).length, "Inbox");
                        a && (t = a.get("name"))
                    },
                    reset: function() {
                        this.$el.html(this.template())
                    },
                    resetEmails: function() {
                        var t = this.folders.where({
                                current: !0
                            })[0],
                            o = 1;
                        t && (o = t.get("id")), o == a ? this.currentFolderEmails.reset(c.where({
                            starred: !0
                        })) : this.currentFolderEmails.reset(c.where({
                            folderId: o
                        }))
                    },
                    toggleAll: function() {
                        var a = this.$toggleAllCheckbox.prop("checked");
                        this.currentFolderEmails.each(function(t) {
                            t.save({
                                selected: a
                            })
                        })
                    },
                    selectAll: function() {
                        this.$toggleAllCheckbox.prop("checked", !0), this.toggleAll()
                    },
                    selectNone: function() {
                        this.$toggleAllCheckbox.prop("checked", !1), this.toggleAll()
                    },
                    selectRead: function() {
                        this.selectNone(), _(this.currentFolderEmails.where({
                            read: !0
                        })).each(function(a) {
                            a.save({
                                selected: !0
                            })
                        })
                    },
                    selectUnread: function() {
                        this.selectNone(), _(this.currentFolderEmails.where({
                            read: !1
                        })).each(function(a) {
                            a.save({
                                selected: !0
                            })
                        })
                    },
                    search: function() {
                        var a = this.folders.where({
                                current: !0
                            })[0],
                            t = 1;
                        a && (t = a.get("id")), this.currentFolderEmails.reset(c.search($("#mailbox-search").val(), t))
                    },
                    markSelectedAsRead: function() {
                        _(this.currentFolderEmails.where({
                            selected: !0
                        })).each(function(a) {
                            a.save({
                                read: !0
                            })
                        })
                    },
                    markSelectedAsUnread: function() {
                        _(this.currentFolderEmails.where({
                            selected: !0
                        })).each(function(a) {
                            a.save({
                                read: !1
                            })
                        })
                    },
                    deleteEmails: function() {
                        _(this.currentFolderEmails.where({
                            selected: !0
                        })).each(function(a) {
                            a.destroy()
                        })
                    }
                }),
                m = new u,
                h = Backbone.View.extend({
                    el: $("#content"),
                    $content: $("#mailbox-content"),
                    events: {
                        "keyup #mailbox-search": "search",
                        "click #compose-btn": "handleComposeBtnClick",
                        "click #back-btn": "handleBackBtnClick"
                    },
                    initialize: function() {
                        this.currentView = m, this.folders = s, this.listenTo(this.folders, "reset", this.renderFolders);
                        var a = this;
                        this.folders.fetch({
                            success: function() {
                                c.fetch({
                                    success: function() {
                                        a.render()
                                    },
                                    reset: !0
                                })
                            },
                            reset: !0
                        })
                    },
                    render: function() {
                        this.$content.html(this.currentView.render().el)
                    },
                    setCurrentView: function(a) {
                        this.currentView !== m && this.currentView.remove(), this.currentView = a, this.render()
                    },
                    renderFolders: function() {
                        this.resetFoldersList(), this.folders.each(this.addFolder, this)
                    },
                    resetFoldersList: function() {
                        this.$("#folders-list").html("")
                    },
                    addFolder: function(a) {
                        var t = new l({
                            model: a
                        });
                        this.$("#folders-list").append(t.render().el)
                    },
                    search: function() {
                        "function" == typeof this.currentView.search && this.currentView.search()
                    },
                    showEmailsView: function() {
                        this.currentView != m && this.setCurrentView(m)
                    },
                    handleComposeBtnClick: function() {
                        return this.showComposeView(), !1
                    },
                    handleBackBtnClick: function() {
                        return this.showEmailsView(), !1
                    },
                    showComposeView: function(a) {
                        a = a ? a : new t({
                            body: ""
                        }), this.setCurrentView(new r({
                            model: a
                        }))
                    }
                }),
                v = new h
        }

        function o() {
            setTimeout(function() {
                $("#app-alert").removeClass("hide").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                    $(this).removeClass("animated bounceInLeft")
                })
            }, 3e3)
        }

        function i() {
            setTimeout(function() {
                $("#wysiwyg").summernote(), t(), o()
            }, 0)
        }
        angular.module("singApp.inbox").directive("snInboxApp", a), a.$inject = ["jQuery"];
        var e = ["<p>Why painful the sixteen how minuter looking nor. Subject but why ten earnest husband imagine sixteen brandon. Are unpleasing occasional celebrated motionless unaffected conviction out. Evil make to no five they. Stuff at avoid of sense small fully it whose an. Ten scarcely distance moreover handsome age although. As when have find fine or said no mile. He in dispatched in imprudence dissimilar be possession unreserved insensible. She evil face fine calm have now. Separate screened he outweigh of distance landlord.</p>", "somm text bodt. Reall small. ust few lines", "<p>Lose john poor same it case do year we. Full how way even the sigh. Extremely nor furniture fat questions now provision incommode preserved. Our side fail find like now. Discovered travelling for insensible partiality unpleasing impossible she. Sudden up my excuse to suffer ladies though or. Bachelor possible marianne directly confined relation as on he.</p>", "empty"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.state("app.form-wizard", {
                url: "/form/wizard",
                templateUrl: "app/modules/form-wizard/form-wizard.html"
            })
        }
        var t = angular.module("singApp.form.wizard", ["ui.router", "ui.jq", "singApp.components.wizard"]);
        t.config(a), a.$inject = ["$stateProvider"]
    }(),
    function() {
        "use strict";

        function a(a, t, o, i) {
            function e() {
                i("#fqdn").data("lookup", 1), i("#fqdn").data("is-valid", 1), i("#ip").val("127.0.0.1")
            }
            return a.validateServerLabel = function(a) {
                var t = a.val(),
                    o = {};
                return "" === t ? (o.status = !1, o.msg = "Please enter a label") : o.status = !0, o
            }, a.validateFQDN = function(a) {
                var t = i(a),
                    o = {};
                return t.is(":disabled") ? o.status = !0 : 0 === t.data("lookup") ? (o.status = !1, o.msg = "Preform lookup first") : 0 === t.data("is-valid") ? (o.status = !1, o.msg = "Lookup Failed") : o.status = !0, o
            }, {
                link: function(s, l, n) {
                    function c() {
                        var s = l.wizard({
                            keyboard: !1,
                            contentHeight: 400,
                            contentWidth: 700,
                            backdrop: "static"
                        });
                        i("#fqdn").on("input", function() {
                            0 !== i(this).val().length ? (i("#ip").val("").attr("disabled", "disabled"), i("#fqdn, #ip").parents(".form-group").removeClass("has-error has-success")) : i("#ip").val("").removeAttr("disabled")
                        }), i("#btn-fqdn").find("button").on("click", e);
                        var n = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/,
                            c = 46;
                        i("#ip").on("input", function() {
                            0 !== i(this).val().length ? i("#fqdn").val("").attr("disabled", "disabled") : i("#fqdn").val("").removeAttr("disabled")
                        }).keypress(function(a) {
                            return 8 !== a.which && 0 !== a.which && a.which !== c && (a.which < 48 || a.which > 57) ? (o.log(a.which), !1) : void 0
                        }).keyup(function() {
                            var a = i(this);
                            if (n.test(a.val())) {
                                c = 0;
                                var t = a.val().substr(a.val().length - 1);
                                "." === t && a.val(a.val().slice(0, -1));
                                var e = a.val().split(".");
                                4 === e.length && (o.log("Valid IP"), a.parents(".form-group").removeClass("has-error").addClass("has-success"))
                            } else {
                                for (o.log("Not Valid IP"), a.parents(".form-group").removeClass("has-error has-success").addClass("has-error"); - 1 !== a.val().indexOf("..");) a.val(a.val().replace("..", "."));
                                c = 46
                            }
                        }), s.on("closed", function() {
                            s.reset()
                        }), s.on("reset", function() {
                            s.modal.find(":input").val("").removeAttr("disabled"), s.modal.find(".form-group").removeClass("has-error").removeClass("has-succes"), s.modal.find("#fqdn").data("is-valid", 0).data("lookup", 0)
                        }), s.on("submit", function(a) {
                            ({
                                hostname: i("#new-server-fqdn").val()
                            });
                            this.log("seralize()"), this.log(this.serialize()), this.log("serializeArray()"), this.log(this.serializeArray()), t(function() {
                                a.trigger("success"), a.hideButtons(), a._submitting = !1, a.showSubmitCard("success"), a.updateProgressBar(0)
                            }, 2e3)
                        }), s.el.find(".wizard-success .im-done").click(function() {
                            s.hide(), t(function() {
                                s.reset()
                            }, 250)
                        }), s.el.find(".wizard-success .create-another-server").click(function() {
                            s.reset()
                        }), s.el.find(".wizard-progress-container .progress").removeClass("progress-striped").addClass("progress-xs"), i(".wizard-group-list").click(function() {
                            a.alert("Disabled for demo.")
                        }), i("#open-wizard").click(function(a) {
                            a.preventDefault(), s.show()
                        })
                    }
                    c()
                }
            }
        }
        angular.module("singApp.form.wizard").directive("bootstrapApplicationWizard", a), a.$inject = ["$window", "$timeout", "$log", "jQuery"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.state("app.grid", {
                url: "/grid",
                templateUrl: "app/modules/grid/grid.html"
            })
        }
        var t = angular.module("singApp.grid", ["ui.router"]);
        t.config(a), a.$inject = ["$stateProvider"]
    }(),
    function() {
        "use strict";

        function a(a) {
            return {
                link: function() {
                    function t() {
                        var t = a(".widget"),
                            o = a("#news-widget"),
                            i = a("#shares-widget"),
                            e = a("#autoload-widget");
                        t.on("fullscreen.widgster", function() {
                            a(".content-wrap").css({
                                "-webkit-transform": "none",
                                "-ms-transform": "none",
                                transform: "none",
                                margin: 0,
                                "z-index": 2
                            }), a(".widget-container").sortable("option", "disabled", !0)
                        }).on("restore.widgster closed.widgster", function() {
                            a(".content-wrap").css({
                                "-webkit-transform": "",
                                "-ms-transform": "",
                                transform: "",
                                margin: "",
                                "z-index": ""
                            }), a("body").css({
                                "overflow-y": "scroll"
                            }), a(".widget-container").sortable("option", "disabled", !1)
                        }), o.on("load.widgster", function() {
                            a(this).find('[data-widgster="load"] > i').addClass("fa-spin")
                        }).on("loaded.widgster", function() {
                            a(this).find('[data-widgster="load"] > i').removeClass("fa-spin")
                        }), o.widgster({
                            showLoader: !1,
                            closePrompt: function(t) {
                                a("#news-close-modal").modal("show"), a("#news-widget-remove").on("click", function() {
                                    a("#news-close-modal").on("hidden.bs.modal", t).modal("hide")
                                })
                            }
                        }), i.widgster({
                            loaderTemplate: '<div class="loader animated fadeIn">   <span class="spinner"><i class="fa fa-spinner fa-spin"></i></span></div>'
                        }), e.on("load.widgster", function() {
                            a(this).find(".fa-spinner").addClass("fa-spin in")
                        }).on("loaded.widgster", function() {
                            a(this).find(".fa-spinner").removeClass("fa-spin in")
                        }).on("load.widgster fullscreen.widgster restore.widgster", function() {
                            a(this).find(".dropdown.open > .dropdown-toggle").dropdown("toggle")
                        }), t.widgster(), a(".widget-controls > a").tooltip({
                            placement: "bottom"
                        })
                    }
                    t()
                }
            }
        }
        angular.module("singApp.grid").directive("snGridDemo", a), a.$inject = ["jQuery"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.state("app.form-validation", {
                url: "/form/validation",
                templateUrl: "app/modules/form-validation/form-validation.html"
            })
        }
        var t = angular.module("singApp.form.validation", ["ui.router"]);
        t.config(a), a.$inject = ["$stateProvider"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.state("app.form-elements", {
                url: "/form/elements",
                templateUrl: "app/modules/form-elements/form-elements.html"
            })
        }
        var t = angular.module("singApp.form.elements", ["ui.router", "ui.jq", "ui.event", "ngResource", "singApp.components.dropzone", "singApp.components.switchery", "singApp.components.holderjs", "angular-bootstrap-select", "summernote"]);
        t.config(a), a.$inject = ["$stateProvider"]
    }(),
    function() {
        "use strict";

        function a(a, t, o) {
            a.dtChanged = function(a) {
                t.alert("Angular model changed to: " + a)
            }, o("#datetimepicker2").datetimepicker()
        }

        function t(a) {
            return {
                link: function(t, o, i) {
                    o.on("click", '[data-event="fullscreen"]', function() {
                        a(".page-controls").css("z-index", o.find(".note-editor.fullscreen").length ? 0 : "")
                    })
                }
            }
        }

        function o(a) {
            a.summernote.renderer.addDialogInfo("link", function(a, o) {
                var i = '<div class="form-group"><label>' + a.link.textToDisplay + '</label><input class="note-link-text form-control" type="text" /></div><div class="form-group"><label>' + a.link.url + '</label><input class="note-link-url form-control" type="text" value="http://" /></div>' + (o.disableLinkTarget ? "" : '<div class="checkbox"><input type="checkbox" checked id="summernoteLinkTargetCheckbox"> <label for="summernoteLinkTargetCheckbox">' + a.link.openInNewWindow + "</label></div>"),
                    e = '<button class="btn btn-primary note-link-btn disabled" disabled>' + a.link.insert + "</button>";
                return t("note-link-dialog", a.link.insert, i, e)
            });
            var t = function(a, t, o, i) {
                return '<div class="' + a + ' modal" aria-hidden="false"><div class="modal-dialog"><div class="modal-content">' + (t ? '<div class="modal-header"><button type="button" class="close" aria-hidden="true" tabindex="-1">&times;</button><h4 class="modal-title">' + t + "</h4></div>" : "") + '<div class="modal-body">' + o + "</div>" + (i ? '<div class="modal-footer">' + i + "</div>" : "") + "</div></div></div>"
            }
        }
        angular.module("singApp.form.elements").controller("FormElementsDemoController", a).directive("summernoteFullscreenHelper", t).run(o), a.$inject = ["$scope", "$window", "jQuery"], t.$inject = ["jQuery"], o.$inject = ["jQuery"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.state("app.extra-search", {
                url: "/extra/search",
                templateUrl: "app/modules/extra-search-results/extra-search-results.html"
            })
        }
        var t = angular.module("singApp.extra.search", ["ui.router"]);
        t.config(a), a.$inject = ["$stateProvider"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.state("app.extra-timeline", {
                url: "/extra/timeline",
                templateUrl: "app/modules/extra-time-line/extra-time-line.html"
            })
        }
        var t = angular.module("singApp.extra.timeline", ["ui.router"]);
        t.config(a), a.$inject = ["$stateProvider"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.state("login", {
                url: "/login",
                templateUrl: "app/modules/extra-login-page/extra-login-page.html"
            })
        }
        var t = angular.module("singApp.login", ["ui.router"]);
        t.config(a), a.$inject = ["$stateProvider"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.state("app.extra-invoice", {
                url: "/extra/invoice",
                templateUrl: "app/modules/extra-invoice/extra-invoice.html",
                controller: "InvoiceCtrl"
            })
        }
        var t = angular.module("singApp.extra.invoice", ["ui.router"]);
        t.config(a), a.$inject = ["$stateProvider"]
    }(),
    function() {
        "use strict";

        function a(a, t) {
            a.print = function() {
                t.print()
            }
        }
        angular.module("singApp.extra.invoice").controller("InvoiceCtrl", a), a.$inject = ["$scope", "$window"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.state("app.extra-gallery", {
                url: "/extra/gallery",
                templateUrl: "app/modules/extra-gallery/extra-gallery.html"
            })
        }
        var t = angular.module("singApp.extra.gallery", ["ui.router", "ui.jq", "singApp.components.gallery"]);
        t.config(a), a.$inject = ["$stateProvider"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.items = [{
                name: "Mountains",
                groups: ["nature"],
                src: "assets/images/pictures/1.jpg",
                date: "10 mins"
            }, {
                name: "Empire State Pigeon",
                groups: ["people"],
                src: "assets/images/pictures/2.jpg",
                date: "1 hour",
                like: !0
            }, {
                name: "Big Lake",
                groups: ["nature"],
                src: "assets/images/pictures/3.jpg",
                date: "2 mins",
                like: !0
            }, {
                name: "Forest",
                groups: ["nature"],
                src: "assets/images/pictures/4.jpg",
                date: "2 mins",
                like: !0
            }, {
                name: "Smile",
                groups: ["people"],
                src: "assets/images/pictures/5.jpg",
                date: "2 mins"
            }, {
                name: "Smile",
                groups: ["people"],
                src: "assets/images/pictures/6.jpg",
                date: "1 hour",
                like: !0
            }, {
                name: "Fog",
                groups: ["nature"],
                src: "assets/images/pictures/8.jpg",
                date: "2 mins",
                like: !0
            }, {
                name: "Beach",
                groups: ["people"],
                src: "assets/images/pictures/9.jpg",
                date: "2 mins"
            }, {
                name: "Pause",
                groups: ["people"],
                src: "assets/images/pictures/10.jpg",
                date: "3 hour",
                like: !0
            }, {
                name: "Space",
                groups: ["space"],
                src: "assets/images/pictures/11.jpg",
                date: "3 hour",
                like: !0
            }, {
                name: "Shuttle",
                groups: ["space"],
                src: "assets/images/pictures/13.jpg",
                date: "35 mins",
                like: !0
            }, {
                name: "Sky",
                groups: ["space"],
                src: "assets/images/pictures/14.jpg",
                date: "2 mins"
            }], a.activeGroup = "all", a.order = "asc", a.$watch("activeGroup", function(t, o) {
                t !== o && a.$grid.shuffle("shuffle", t)
            }), a.$watch("order", function(t, o) {
                t !== o && a.$grid.shuffle("sort", {
                    reverse: "desc" === t,
                    by: function(a) {
                        return a.data("title").toLowerCase()
                    }
                })
            })
        }
        angular.module("singApp.extra.gallery").controller("GalleryAppController", a), a.$inject = ["$scope"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.state("error", {
                url: "/error",
                templateUrl: "app/modules/extra-error-page/extra-error-page.html"
            })
        }
        var t = angular.module("singApp.error", ["ui.router"]);
        t.config(a), a.$inject = ["$stateProvider"]
    }(),
    function() {
        "use strict";

        function a(a, t) {
            a.searchResult = function() {
                t.go("app.extra-search")
            }
        }
        angular.module("singApp.error").controller("ErrorSearchController", a), a.$inject = ["$scope", "$state"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.state("app.extra-calendar", {
                url: "/extra/calendar",
                templateUrl: "app/modules/extra-calendar/extra-calendar.html",
                controller: "CalendarAppController"
            })
        }
        var t = angular.module("singApp.extra.calendar", ["ui.router", "ui.bootstrap", "ui.calendar"]);
        t.config(a), a.$inject = ["$stateProvider"]
    }(),
    function() {
        "use strict";

        function a(a, t, o, i, e) {
            a.uiConfig = {
                calendar: {
                    header: {
                        left: "",
                        center: "",
                        right: ""
                    },
                    selectable: !0,
                    selectHelper: !0,
                    select: function(o, i, e) {
                        var s = t.open({
                            templateUrl: "create-event-modal.html",
                            controller: "CreateEventModalInstanceCtrl",
                            size: "sm",
                            resolve: {
                                event: function() {
                                    return {
                                        start: o,
                                        end: i,
                                        allDay: e
                                    }
                                }
                            }
                        });
                        s.result.then(a.addEvent, angular.noop)
                    },
                    editable: !0,
                    droppable: !0,
                    drop: function(a, t) {
                        var e = {
                                title: i.trim(i(t.target).text())
                            },
                            s = i.extend({}, e);
                        s.start = a, s.allDay = !a.hasTime();
                        var l = i(t.target).data("event-class");
                        l && (s.className = [l]), o.calendars.eventsCalendar.fullCalendar("renderEvent", s, !0), i(t.target).remove()
                    },
                    eventClick: function(a) {
                        t.open({
                            templateUrl: "show-event-modal.html",
                            controller: "ShowEventModalInstanceCtrl",
                            size: "sm",
                            resolve: {
                                event: function() {
                                    return a
                                }
                            }
                        })
                    }
                }
            };
            var s = new Date,
                l = s.getDate(),
                n = s.getMonth(),
                c = s.getFullYear();
            a.events = [{
                title: "All Day Event",
                start: new Date(c, n, 1),
                backgroundColor: "#79A5F0",
                textColor: "#fff",
                description: "Will be busy throughout the whole day"
            }, {
                title: "Long Event",
                start: new Date(c, n, l + 5),
                end: new Date(c, n, l + 7),
                description: "This conference should be worse visiting"
            }, {
                id: 999,
                title: "Blah Blah Car",
                start: new Date(c, n, l - 3, 16, 0),
                allDay: !1,
                description: "Agree with this guy on arrival time"
            }, {
                id: 1e3,
                title: "Buy this template",
                start: new Date(c, n, l + 3, 12, 0),
                allDay: !1,
                backgroundColor: "#555",
                textColor: "#fff",
                description: "Make sure everything is consistent first"
            }, {
                title: "Study some Node",
                start: new Date(c, n, l + 18, 12, 0),
                end: new Date(c, n, l + 18, 13, 0),
                backgroundColor: "#79A5F0",
                textColor: "#fff",
                description: "Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices."
            }, {
                title: "Got to school",
                start: new Date(c, n, l + 16, 12, 0),
                end: new Date(c, n, l + 16, 13, 0),
                backgroundColor: "#64bd63",
                textColor: "#fff",
                description: "Time to go back"
            }, {
                title: "Click for Flatlogic",
                start: new Date(c, n, 28),
                end: new Date(c, n, 29),
                url: "http://flatlogic.com/",
                backgroundColor: "#e5603b",
                textColor: "#fff",
                description: "Creative solutions"
            }], a.eventSources = [a.events], a.addEvent = function(t) {
                a.events.push(t)
            }, a.changeView = function(a) {
                o.calendars.eventsCalendar.fullCalendar("changeView", a)
            }, a.currentMonth = function() {
                return o.calendars.eventsCalendar ? e(o.calendars.eventsCalendar.fullCalendar("getDate")).format("MMM YYYY") : void 0
            }, a.currentDay = function() {
                return o.calendars.eventsCalendar ? e(o.calendars.eventsCalendar.fullCalendar("getDate")).format("dddd") : void 0
            }, a.prev = function() {
                o.calendars.eventsCalendar.fullCalendar("prev")
            }, a.next = function() {
                o.calendars.eventsCalendar.fullCalendar("next")
            }
        }

        function t(a, t, o) {
            a.event = o, a.ok = function() {
                t.close(a.event)
            }, a.cancel = function() {
                t.dismiss("cancel")
            }
        }

        function o(a, t, o) {
            a.event = o, a.ok = function() {
                t.close()
            }, a.cancel = function() {
                t.dismiss("cancel")
            }
        }

        function i(a) {
            return a.moment
        }
        angular.module("singApp.extra.calendar").controller("CalendarAppController", a).controller("CreateEventModalInstanceCtrl", t).controller("ShowEventModalInstanceCtrl", o).factory("moment", i), a.$inject = ["$scope", "$modal", "uiCalendarConfig", "jQuery", "moment"], t.$inject = ["$scope", "$modalInstance", "event"], o.$inject = ["$scope", "$modalInstance", "event"], i.$inject = ["$window"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.state("app.dashboard", {
                url: "/dashboard",
                templateUrl: "app/modules/dashboard/dashboard.html",
                controller: "DashboardController"
            })
        }
        var t = angular.module("singApp.dashboard", ["ui.router", "ui.jq", "singApp.components.rickshaw"]);
        t.config(a), a.$inject = ["$stateProvider"]
    }(),
    function() {
        "use strict";

        function a(a) {}

        function t(a, t) {
            var o;
            a.mapData = {
                map: {
                    name: "usa_states",
                    defaultArea: {
                        attrsHover: {
                            fill: "#242424",
                            animDuration: 100
                        },
                        tooltip: {
                            content: function() {
                                return "<strong>" + o + "</strong>"
                            }
                        },
                        eventHandlers: {
                            mouseover: function(a, t) {
                                o = t
                            }
                        }
                    },
                    defaultPlot: {
                        size: 17,
                        attrs: {
                            fill: t.settings.colors["brand-warning"],
                            stroke: "#fff",
                            "stroke-width": 0,
                            "stroke-linejoin": "round"
                        },
                        attrsHover: {
                            "stroke-width": 1,
                            animDuration: 100
                        }
                    },
                    zoom: {
                        enabled: !0,
                        step: .75,
                        mousewheel: !1
                    }
                },
                plots: {
                    ny: {
                        latitude: 40.717079,
                        longitude: -74.00116,
                        tooltip: {
                            content: "New York"
                        }
                    },
                    on: {
                        latitude: 33.145235,
                        longitude: -83.811834,
                        size: 18,
                        tooltip: {
                            content: "Oconee National Forest"
                        }
                    },
                    sf: {
                        latitude: 37.792032,
                        longitude: -122.394613,
                        size: 12,
                        tooltip: {
                            content: "San Francisco"
                        }
                    },
                    la: {
                        latitude: 26.93508,
                        longitude: -80.851766,
                        size: 26,
                        tooltip: {
                            content: "Lake Okeechobee"
                        }
                    },
                    gc: {
                        latitude: 36.331308,
                        longitude: -83.33605,
                        size: 10,
                        tooltip: {
                            content: "Grainger County"
                        }
                    },
                    cc: {
                        latitude: 36.269356,
                        longitude: -76.587477,
                        size: 22,
                        tooltip: {
                            content: "Chowan County"
                        }
                    },
                    ll: {
                        latitude: 30.700644,
                        longitude: -95.145249,
                        tooltip: {
                            content: "Lake Livingston"
                        }
                    },
                    tc: {
                        latitude: 34.546708,
                        longitude: -90.211471,
                        size: 14,
                        tooltip: {
                            content: "Tunica County"
                        }
                    },
                    lc: {
                        latitude: 32.628599,
                        longitude: -103.675115,
                        tooltip: {
                            content: "Lea County"
                        }
                    },
                    uc: {
                        latitude: 40.456692,
                        longitude: -83.522688,
                        size: 11,
                        tooltip: {
                            content: "Union County"
                        }
                    },
                    lm: {
                        latitude: 33.84463,
                        longitude: -118.157483,
                        tooltip: {
                            content: "Lakewood Mutual"
                        }
                    }
                }
            }
        }

        function o(a, t) {
            a.seriesData = [
                [],
                []
            ], a.random = new t.Fixtures.RandomData(30);
            for (var o = 0; 30 > o; o++) a.random.addData(a.seriesData);
            a.series = [{
                color: "#F7653F",
                data: a.seriesData[0],
                name: "Uploads"
            }, {
                color: "#F7D9C5",
                data: a.seriesData[1],
                name: "Downloads"
            }]
        }

        function i(a) {
            var t = new Date;
            a.month = t.getMonth() + 1, a.year = t.getFullYear()
        }

        function e(a) {
            return {
                restrict: "A",
                link: function(t, o, i) {
                    function e() {
                        function e() {
                            c.find(".event").each(function() {
                                var t = a(this),
                                    o = a("<span></span>");
                                o.css("background-color", t.css("background-color")).appendTo(t.find("a")), t.css("background-color", "")
                            })
                        }
                        var s = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                            l = ["S", "M", "T", "W", "T", "F", "S"],
                            n = t.$eval(i.events),
                            c = o;
                        c.calendar({
                            months: s,
                            days: l,
                            events: n,
                            popover_options: {
                                placement: "top",
                                html: !0
                            }
                        }), c.find(".icon-arrow-left").addClass("fa fa-arrow-left"), c.find(".icon-arrow-right").addClass("fa fa-arrow-right"), c.find(".icon-arrow-left, .icon-arrow-right").parent().on("click", e), e()
                    }
                    i.$observe("events", function() {
                        e()
                    })
                }
            }
        }
        angular.module("singApp.dashboard").controller("DashboardController", a).controller("GeoLocationsWidgetDemoController", t).controller("MarketStatsWidgetDemoController", o).controller("BootstrapCalendarDemoController", i).directive("bootstrapCalendar", e), a.$inject = ["$scope"], t.$inject = ["$scope", "config"], o.$inject = ["$scope", "Rickshaw"], i.$inject = ["$scope"], e.$inject = ["jQuery"]
    }(),
    function() {
        "use strict";

        function a(a, t, o, i) {
            var e = this;
            e.title = a.appTitle, t.app = a, t.$state = i, angular.isDefined(o.state) ? t.app.state = o.state : o.state = t.app.state
        }

        function t(a) {
            return a.jQuery
        }

        function o(a, t, o) {
            return function(i, e) {
                var s = t.JSON.parse(t.localStorage.getItem("sing-2-angular-errors")) || {};
                s[(new Date).getTime()] = arguments, t.localStorage.setItem("sing-2-angular-errors", t.JSON.stringify(s)), o.get("config").debug && (a.error.apply(a, arguments), t.alert("check errors"))
            }
        }
        angular.module("singApp.core").controller("App", a).factory("jQuery", t).factory("$exceptionHandler", o), a.$inject = ["config", "$scope", "$localStorage", "$state"], t.$inject = ["$window"], o.$inject = ["$log", "$window", "$injector"]
    }(),
    function() {
        "use strict";

        function a(a, o, i, e) {
            var s = function() {
                this._initResizeEvent(), this._initOnScreenSizeCallbacks()
            };
            return s.prototype = {
                _resizeCallbacks: [],
                _screenSizeCallbacks: {
                    xs: {
                        enter: [],
                        exit: []
                    },
                    sm: {
                        enter: [],
                        exit: []
                    },
                    md: {
                        enter: [],
                        exit: []
                    },
                    lg: {
                        enter: [],
                        exit: []
                    }
                },
                isScreen: function(a) {
                    var i = o.innerWidth;
                    return (i >= t.settings.screens[a + "-min"] || "xs" === a) && (i <= t.settings.screens[a + "-max"] || "lg" === a)
                },
                getScreenSize: function() {
                    var a = o.innerWidth;
                    return a <= t.settings.screens["xs-max"] ? "xs" : a >= t.settings.screens["sm-min"] && a <= t.settings.screens["sm-max"] ? "sm" : a >= t.settings.screens["md-min"] && a <= t.settings.screens["md-max"] ? "md" : a >= t.settings.screens["lg-min"] ? "lg" : void 0
                },
                onScreenSize: function(a, t, o) {
                    o = "undefined" != typeof o ? o : !0, this._screenSizeCallbacks[a][o ? "enter" : "exit"].push(t)
                },
                changeColor: function(a, t, o) {
                    var i = function(a, t) {
                        var o = "0";
                        for (a += ""; a.length < t;) a = o + a;
                        return a
                    };
                    a = a.replace(/^\s*|\s*$/, ""), a = a.replace(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i, "#$1$1$2$2$3$3");
                    var e = Math.round(256 * t) * (o ? -1 : 1),
                        s = a.match(new RegExp("^rgba?\\(\\s*(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])\\s*,\\s*(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])\\s*,\\s*(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])(?:\\s*,\\s*(0|1|0?\\.\\d+))?\\s*\\)$", "i")),
                        l = s && null !== s[4] ? s[4] : null,
                        n = s ? [s[1], s[2], s[3]] : a.replace(/^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i, function() {
                            return parseInt(arguments[1], 16) + "," + parseInt(arguments[2], 16) + "," + parseInt(arguments[3], 16)
                        }).split(/,/);
                    return s ? "rgb" + (null !== l ? "a" : "") + "(" + Math[o ? "max" : "min"](parseInt(n[0], 10) + e, o ? 0 : 255) + ", " + Math[o ? "max" : "min"](parseInt(n[1], 10) + e, o ? 0 : 255) + ", " + Math[o ? "max" : "min"](parseInt(n[2], 10) + e, o ? 0 : 255) + (null !== l ? ", " + l : "") + ")" : ["#", i(Math[o ? "max" : "min"](parseInt(n[0], 10) + e, o ? 0 : 255).toString(16), 2), i(Math[o ? "max" : "min"](parseInt(n[1], 10) + e, o ? 0 : 255).toString(16), 2), i(Math[o ? "max" : "min"](parseInt(n[2], 10) + e, o ? 0 : 255).toString(16), 2)].join("")
                },
                lightenColor: function(a, t) {
                    return this.changeColor(a, t, !1)
                },
                darkenColor: function(a, t) {
                    return this.changeColor(a, t, !0)
                },
                max: function(a) {
                    return Math.max.apply(null, a)
                },
                min: function(a) {
                    return Math.min.apply(null, a)
                },
                _initResizeEvent: function() {
                    var t;
                    a(o).on("resize", function() {
                        i.cancel(t), t = i(function() {
                            a(o).trigger("sn:resize")
                        }, 100)
                    })
                },
                _initOnScreenSizeCallbacks: function() {
                    var t, s = this,
                        l = this.getScreenSize();
                    a(o).resize(function() {
                        i.cancel(t), t = i(function() {
                            var a = s.getScreenSize();
                            a !== l && (s._screenSizeCallbacks[l].exit.forEach(function(t) {
                                t(a, l)
                            }), s._screenSizeCallbacks[a].enter.forEach(function(t) {
                                t(a, l)
                            }), e.log("screen changed. new: " + a + ", old: " + l)), l = a
                        }, 100)
                    })
                }
            }, t.helpers = new s, t
        }
        var t = (angular.module("singApp.core").factory("config", a), {
            name: "sing",
            title: "Sing - Dashboard",
            version: "2.0.0",
            debug: !0,
            settings: {
                colors: {
                    white: "#fff",
                    black: "#000",
                    "gray-light": "#999",
                    "gray-lighter": "#eee",
                    gray: "#666",
                    "gray-dark": "#343434",
                    "gray-darker": "#222",
                    "gray-semi-light": "#777",
                    "gray-semi-lighter": "#ddd",
                    "brand-primary": "#5d8fc2",
                    "brand-success": "#64bd63",
                    "brand-warning": "#f0b518",
                    "brand-danger": "#dd5826",
                    "brand-info": "#5dc4bf"
                },
                screens: {
                    "xs-max": 767,
                    "sm-min": 768,
                    "sm-max": 991,
                    "md-min": 992,
                    "md-max": 1199,
                    "lg-min": 1200
                },
                navCollapseTimeout: 2500
            },
            state: {
                "nav-static": !1
            }
        });
        a.$inject = ["jQuery", "$window", "$timeout", "$log"]
    }(),
    function() {
        "use strict";

        function a(a) {
            a.state("app.charts", {
                url: "/charts",
                templateUrl: "app/modules/charts/charts.html"
            })
        }
        var t = angular.module("singApp.charts", ["ui.router", "ui.jq", "singApp.components.sparkline", "singApp.components.nvd3", "singApp.components.morris"]);
        t.config(a), a.$inject = ["$stateProvider"]
    }(),
    function() {
        "use strict";

        function a(a, t, o, i) {
            a.data1 = [
                [1, 20],
                [2, 20],
                [3, 40],
                [4, 30],
                [5, 40],
                [6, 35],
                [7, 47]
            ], a.data2 = [
                [1, 13],
                [2, 8],
                [3, 17],
                [4, 10],
                [5, 17],
                [6, 15],
                [7, 16]
            ], a.data3 = [
                [1, 23],
                [2, 13],
                [3, 33],
                [4, 16],
                [5, 32],
                [6, 28],
                [7, 31]
            ], a.applyRickshawData = function() {
                a.seriesData = [
                    [],
                    []
                ], a.random = new t.Fixtures.RandomData(30);
                for (var o = 0; 30 > o; o++) a.random.addData(a.seriesData);
                a.series = [{
                    color: "#96E593",
                    data: a.seriesData[0],
                    name: "Uploads"
                }, {
                    color: "#ecfaec",
                    data: a.seriesData[1],
                    name: "Downloads"
                }]
            }, a.applyRickshawData(), a.sparklineCompositeData = [
                [2, 4, 6, 2, 7, 5, 3, 7, 8, 3, 6],
                [5, 3, 7, 8, 3, 6, 2, 4, 6, 2, 7]
            ], a.sparklineCompositeOptions = [{
                width: "100%",
                fillColor: "#ddd",
                height: "100px",
                lineColor: "transparent",
                spotColor: "#c0d0f0",
                minSpotColor: null,
                maxSpotColor: null,
                highlightSpotColor: "#ddd",
                highlightLineColor: "#ddd"
            }, {
                lineColor: "transparent",
                spotColor: "#c0d0f0",
                fillColor: "rgba(192, 208, 240, 0.76)",
                minSpotColor: null,
                maxSpotColor: null,
                highlightSpotColor: "#ddd",
                highlightLineColor: "#ddd"
            }], a.sparklinePieData = [2, 4, 6], a.sparklinePieOptions = {
                type: "pie",
                width: "100px",
                height: "100px",
                sliceColors: ["#F5CB7B", "#FAEEE5", "#f0f0f0"]
            }, a.applyNvd3Data = function() {
                function t(a, t, i) {
                    function e(a) {
                        for (var o = 1 / (.1 + Math.random()), i = 2 * Math.random() - .5, e = 10 / (.1 + Math.random()), s = 0; t > s; s++) {
                            var l = (s / t - i) * e;
                            a[s] += o * Math.exp(-l * l)
                        }
                    }
                    return arguments.length < 3 && (i = 0), o.range(a).map(function() {
                        var a, o = [];
                        for (a = 0; t > a; a++) o[a] = i + i * Math.random();
                        for (a = 0; 5 > a; a++) e(o);
                        return o.map(function(a, t) {
                            return {
                                x: t,
                                y: Math.max(0, a)
                            }
                        })
                    })
                }

                function e(a, o) {
                    var i = (new Date).getTime(),
                        e = 864e5,
                        s = 60,
                        l = s * e,
                        n = i - l,
                        o = o || 45,
                        c = s / o;
                    return t(a.length, o, .1).map(function(t, o) {
                        return {
                            key: a[o],
                            values: t.map(function(a, t) {
                                return {
                                    x: n + a.x * e * c,
                                    y: Math.floor(100 * a.y)
                                }
                            })
                        }
                    })
                }
                a.nvd31Chart = i.models.lineChart().useInteractiveGuideline(!0).margin({
                    left: 28,
                    bottom: 30,
                    right: 0
                }).color(["#82DFD6", "#ddd"]), a.nvd31Chart.xAxis.showMaxMin(!1).tickFormat(function(a) {
                    return o.time.format("%b %d")(new Date(a))
                }), a.nvd31Chart.yAxis.showMaxMin(!1).tickFormat(o.format(",f")), a.nvd31Data = e(["Search", "Referral"], 50).map(function(a, t) {
                    return a.area = !0, a
                }), a.nvd32Chart = i.models.multiBarChart().margin({
                    left: 28,
                    bottom: 30,
                    right: 0
                }).color(["#F7653F", "#ddd"]), a.nvd32Chart.xAxis.showMaxMin(!1).tickFormat(function(a) {
                    return o.time.format("%b %d")(new Date(a))
                }), a.nvd32Chart.yAxis.showMaxMin(!1).tickFormat(o.format(",f")), a.nvd32Data = e(["Uploads", "Downloads"], 10).map(function(a, t) {
                    return a.area = !0, a
                })
            }, a.applyNvd3Data(), a.morris1Options = {
                resize: !0,
                data: [{
                    y: "2006",
                    a: 100,
                    b: 90
                }, {
                    y: "2007",
                    a: 75,
                    b: 65
                }, {
                    y: "2008",
                    a: 50,
                    b: 40
                }, {
                    y: "2009",
                    a: 75,
                    b: 65
                }, {
                    y: "2010",
                    a: 50,
                    b: 40
                }, {
                    y: "2011",
                    a: 75,
                    b: 65
                }, {
                    y: "2012",
                    a: 100,
                    b: 90
                }],
                xkey: "y",
                ykeys: ["a", "b"],
                labels: ["Series A", "Series B"],
                lineColors: ["#88C4EE", "#ccc"]
            }, a.morris2Options = {
                resize: !0,
                data: [{
                    y: "2006",
                    a: 100,
                    b: 90
                }, {
                    y: "2007",
                    a: 75,
                    b: 65
                }, {
                    y: "2008",
                    a: 50,
                    b: 40
                }, {
                    y: "2009",
                    a: 75,
                    b: 65
                }, {
                    y: "2010",
                    a: 50,
                    b: 40
                }, {
                    y: "2011",
                    a: 75,
                    b: 65
                }, {
                    y: "2012",
                    a: 100,
                    b: 90
                }],
                xkey: "y",
                ykeys: ["a", "b"],
                labels: ["Series A", "Series B"],
                lineColors: ["#80DE78", "#9EEE9B"],
                lineWidth: 0
            }, a.morris3Options = {
                data: [{
                    label: "Download Sales",
                    value: 12
                }, {
                    label: "In-Store Sales",
                    value: 30
                }, {
                    label: "Mail-Order Sales",
                    value: 20
                }],
                colors: ["#F7653F", "#F8C0A2", "#e6e6e6"]
            };
            var e = [
                    [13885344e5, 120],
                    [13912128e5, 70],
                    [1393632e6, 100],
                    [13963104e5, 60],
                    [13989024e5, 35]
                ],
                s = [
                    [13885344e5, 90],
                    [13912128e5, 60],
                    [1393632e6, 30],
                    [13963104e5, 73],
                    [13989024e5, 30]
                ],
                l = [
                    [13885344e5, 80],
                    [13912128e5, 40],
                    [1393632e6, 47],
                    [13963104e5, 22],
                    [13989024e5, 24]
                ];
            a.flotBarsData = [{
                label: "Apple",
                data: e,
                bars: {
                    show: !0,
                    barWidth: 31104e4,
                    fill: !0,
                    lineWidth: 0,
                    order: 1
                }
            }, {
                label: "Google",
                data: s,
                bars: {
                    show: !0,
                    barWidth: 31104e4,
                    fill: !0,
                    lineWidth: 0,
                    order: 2
                }
            }, {
                label: "Facebook",
                data: l,
                bars: {
                    show: !0,
                    barWidth: 31104e4,
                    fill: !0,
                    lineWidth: 0,
                    order: 3
                }
            }], a.flotBarsOptions = {
                series: {
                    bars: {
                        show: !0,
                        barWidth: 36288e4,
                        lineWidth: 0,
                        order: 1,
                        fillColor: {
                            colors: [{
                                opacity: 1
                            }, {
                                opacity: .7
                            }]
                        }
                    }
                },
                xaxis: {
                    mode: "time",
                    min: 13874976e5,
                    max: 1400112e6,
                    tickLength: 0,
                    tickSize: [1, "month"],
                    axisLabel: "Month",
                    axisLabelUseCanvas: !0,
                    axisLabelFontSizePixels: 13,
                    axisLabelPadding: 15
                },
                yaxis: {
                    axisLabel: "Value",
                    axisLabelUseCanvas: !0,
                    axisLabelFontSizePixels: 13,
                    axisLabelPadding: 5
                },
                grid: {
                    hoverable: !0,
                    borderWidth: 0
                },
                legend: {
                    backgroundColor: "transparent",
                    labelBoxBorderColor: "none"
                },
                colors: ["#64bd63", "#f0b518", "#F7653F"]
            }
        }

        function t(a) {
            return {
                link: function(t, o, i) {
                    function e() {
                        a.plotAnimator(o, t[i.ngModel], {
                            xaxis: {
                                tickLength: 0,
                                tickDecimals: 0,
                                min: 2,
                                font: {
                                    lineHeight: 13,
                                    weight: "bold",
                                    color: t.app.settings.colors["gray-semi-light"]
                                }
                            },
                            yaxis: {
                                tickDecimals: 0,
                                tickColor: "#f3f3f3",
                                font: {
                                    lineHeight: 13,
                                    weight: "bold",
                                    color: t.app.settings.colors["gray-semi-light"]
                                }
                            },
                            grid: {
                                backgroundColor: {
                                    colors: ["#fff", "#fff"]
                                },
                                borderWidth: 1,
                                borderColor: "#f0f0f0",
                                margin: 0,
                                minBorderMargin: 0,
                                labelMargin: 20,
                                hoverable: !0,
                                clickable: !0,
                                mouseActiveRadius: 6
                            },
                            legend: !1
                        })
                    }
                    e()
                }
            }
        }
        angular.module("singApp.charts").controller("ChartsDemoController", a).directive("flotChartAnimator", t), a.$inject = ["$scope", "Rickshaw", "d3", "nv"], t.$inject = ["jQuery"]
    }(),
    function() {
        "use strict";
        angular.module("singApp", ["singApp.core", "singApp.dashboard", "singApp.form.elements", "singApp.maps.google", "singApp.maps.vector", "singApp.grid", "singApp.tables.basic", "singApp.tables.dynamic", "singApp.extra.calendar", "singApp.extra.invoice", "singApp.login", "singApp.error", "singApp.extra.gallery", "singApp.extra.search", "singApp.extra.timeline", "singApp.ui.components", "singApp.ui.notifications", "singApp.ui.icons", "singApp.ui.buttons", "singApp.ui.tabs-accordion", "singApp.ui.list-groups", "singApp.inbox", "singApp.profile", "singApp.widgets", "singApp.charts", "singApp.form.validation", "singApp.form.wizard"])
    }(), angular.module("singApp").run(["$templateCache", function(a) {
        a.put("app/modules/charts/charts.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">Tables Basic</li></ol><h1 class="page-title">Visual - <span class="fw-semi-bold">Charts</span></h1><div data-ng-controller="ChartsDemoController"><div class="row"><div class="col-md-6 col-lg-5"><section class="widget"><header><h4>Flot <span class="fw-semi-bold">Charts</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><div class="mt mb" id="flot-main" style="width: 100%; height: 260px;" data-flot-chart-animator="" data-ng-init="data = [{ label: \'Traffic\', data: data3, lines: { fill: .3, lineWidth: 0 }, color:[\'#ccc\'] },{ label: \'Traffic\', data: data2, lines: { fill: 0.6, lineWidth: 0 }, color:[\'#F7653F\'] },{ label: \'Traffic\', data: data1, animator: {steps: 60, duration: 1000, start:0}, lines: {lineWidth:2}, shadowSize:0, color: \'#F7553F\' }]" data-ng-model="data"></div><div class="chart-tooltip" id="flot-main-tooltip" style="opacity: 0"></div><p class="fs-mini text-muted">Flot is a <span class="fw-semi-bold">pure</span> JavaScript plotting library for jQuery, with a focus on simple usage, attractive looks and interactive features.</p><h4 class="mt">Interactive <span class="fw-semi-bold">Sparklines</span></h4><div class="row mt"><div class="col-sm-6"><div class="stats-row"><div class="stat-item"><p class="value4 fw-thin">34 567</p><h6 class="name text-muted no-margin">Overall Values</h6></div><div class="stat-item stat-item-mini-chart"><div class="sparkline" data-jq-sparkline="" data-ng-init="sp1Data = [9,12,14,15,10,14,20]; sp1Options = {type: \'bar\', barColor: \'#f0b518\', height: \'30px\', barWidth: 6, barSpacing: 2};" data-ng-model="sp1Data" data-options="sp1Options"></div></div></div></div><div class="col-sm-6"><div class="stats-row"><div class="stat-item"><p class="value4 fw-thin">34 567</p><h6 class="name text-muted no-margin">Overall Values</h6></div><div class="stat-item stat-item-mini-chart"><div class="sparkline" data-jq-sparkline="" data-ng-init="sp2Data = [9,12,14,15,10,14,20]; sp2Options = {type: \'bar\', barColor: \'#FFA587\', height: \'30px\', barWidth: 6, barSpacing: 2}" data-ng-model="sp2Data" data-options="sp2Options"></div></div></div></div></div><p class="fs-mini text-muted">This jQuery plugin generates sparklines (small inline charts) directly in the browser using data supplied either inline in the HTML, or via javascript.</p></div></section></div><div class="col-md-6 col-lg-4"><section class="widget"><header><h4>Realtime <span class="fw-semi-bold">Rickshaw</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p class="fs-mini text-muted mb-lg">Rickshaw provides the elements you need to create interactive graphs: renderers, legends, hovers, range selectors, etc. You put the pieces together. It\'s all based on <span class="fw-semi-bold">d3</span> underneath, so graphs are drawn with standard SVG and styled with CSS. Customize all you like with techniques you already know.</p><h4>720 Users</h4><div class="progress progress-xs"><div class="progress-bar progress-bar-gray-light" style="width: 60%;"></div></div><p class="fs-mini text-muted mb-lg"><span class="circle bg-success text-white"><i class="fa fa-circle"></i></span> &nbsp; Target <span class="fw-semi-bold">820</span> users is <span class="fw-semi-bold">96%</span> reached.</p><div data-rickshaw-chart="" data-series="series" data-height="130" data-realtime="true" data-random="random" data-series-data="seriesData" class="chart-overflow-bottom"></div></div></section></div><div class="col-md-6 col-lg-3"><section class="widget"><header><h4>Line <span class="fw-semi-bold">Sparkline</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p class="fs-mini text-muted">Each example displayed below takes just 1 line of HTML or javascript to generate.</p><div class="stats-row mt"><div class="stat-item"><h6 class="name">Overall Growth</h6><p class="value">43.75%</p></div><div class="stat-item"><h6 class="name">Montly</h6><p class="value">86.34%</p></div></div><p class="text-muted fs-mini"><span class="fw-semi-bold">17% higher</span> than last month</p><div data-jq-sparkline="" data-ng-model="sparklineCompositeData" data-options="sparklineCompositeOptions" class="chart-overflow-bottom"></div></div></section><section class="widget"><header><h4>Sparkline <span class="fw-semi-bold">Pie Charts</span></h4><div class="widget-controls"><a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p class="fs-mini text-muted">Each example displayed below takes just 1 line of HTML or javascript to generate.</p><div data-jq-sparkline="" data-ng-model="sparklinePieData" data-options="sparklinePieOptions" class="chart-overflow-bottom mb-0 text-align-center"></div></div></section></div></div><div class="row"><div class="col-md-7 col-lg-8"><section class="widget"><header><h4><span class="fw-semi-bold">D3</span> Charts</h4><div class="widget-controls"><a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p class="fs-mini text-muted">This project is an attempt to build re-usable charts and chart components for <span class="fw-semi-bold">d3.js</span> without taking away the power that d3.js gives you.</p><div data-nvd3-chart="" data-chart="nvd31Chart" data-datum="nvd31Data"><svg class=""></svg></div></div></section></div><div class="col-md-5 col-lg-4"><section class="widget"><header><h4><span class="fw-semi-bold">D3</span> Charts</h4><div class="widget-controls"><a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p class="fs-mini text-muted">This is a very young collection of components, with the goal of keeping these components very customizeable.</p><div data-nvd3-chart="" data-chart="nvd32Chart" data-datum="nvd32Data"><svg></svg></div></div></section></div></div><div class="row"><div class="col-md-6"><section class="widget"><header><h4>Morris <span class="fw-semi-bold">Area Charts</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p class="fs-mini text-muted">Good-looking charts shouldn\'t be difficult. The public API is terribly simple. It\'s just one function: <code>Morris.Line(options)</code>, where options is an object containing some of the following configuration options.</p><div data-morris-chart="" data-type="area" data-height="343px" data-options="morris2Options"></div></div></section></div><div class="col-md-6"><section class="widget"><header><h4>Morris <span class="fw-semi-bold">Line Charts</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p class="fs-mini text-muted">Good-looking charts shouldn\'t be difficult. The public API is terribly simple. It\'s just one function: <code>Morris.Line(options)</code>, where options is an object containing some of the following configuration options.</p><div data-morris-chart="" data-type="line" data-height="343px" data-options="morris1Options"></div></div></section></div></div><div class="row"><div class="col-md-6 col-lg-4"><section class="widget"><header><h4>Easy <span class="fw-semi-bold">Pie Charts</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body clearfix"><div class="text-align-center"><div class="easy-pie-chart mb-lg" data-ui-jq="easyPieChart" data-ui-options="{ barColor: \'#5dc4bf\', trackColor: \'#ddd\', scaleColor: false, lineWidth: 10, size: 110 }" data-percent="73">73</div></div><p class="fs-mini text-muted">Easy pie chart is a jQuery plugin that uses the canvas element to render simple pie charts for single values. These charts are highly customizable, very easy to implement, scale to the resolution of the display of the client to provide sharp charts even on retina displays.</p></div></section></div><div class="col-md-6 col-lg-4"><section class="widget"><header><h4>Morris <span class="fw-semi-bold">Donut Charts</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><div data-morris-chart="" data-type="donut" data-height="180" data-options="morris3Options"></div><p class="fs-mini text-muted">Donuts a great for representing some parted information like traffice sources, disk partitions, etc. This really couldn\'t be easier. Create a Donut chart using <code>Morris.Donut(options)</code>, with only few options.</p></div></section></div><div class="col-md-12 col-lg-4"><section class="widget"><header><h4>Flot <span class="fw-semi-bold">Bars</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><div class="mt-lg" data-flot-chart="" data-ng-model="flotBarsData" data-options="flotBarsOptions" style="width: 100%; height: 260px;"></div><p class="fs-mini text-muted">Flot is a <span class="fw-semi-bold">pure</span> JavaScript plotting library for jQuery, with a focus on simple usage, attractive looks and interactive features.</p></div></section></div></div></div>'), a.put("app/modules/core/app.html", '<nav sn-navigation=""></nav><nav class="page-controls navbar navbar-default" data-ng-include="\'app/modules/core/navigation/navbar.html\'"></nav><aside sn-chat-sidebar=""></aside><div class="content-wrap"><main id="content" class="content view-animate fade-up" role="main" data-ui-view=""></main></div>'), a.put("app/modules/dashboard/dashboard.html", '<h1 class="page-title">Dashboard <small><small>The Lucky One</small></small></h1><div class="row"><div class="col-md-8"><section class="widget bg-transparent" ng-controller="GeoLocationsWidgetDemoController"><div class="widget-body"><div class="mapael" data-ui-jq="mapael" data-ui-options="mapData"><div class="stats"><h5 class="text-white">GEO-LOCATIONS</h5><p class="h3 text-warning no-margin"><strong data-animate-number="">1 656 843</strong> <i class="fa fa-map-marker"></i></p></div><div class="map"><span>Alternative content for the map</span></div></div></div></section></div><div class="col-md-4"><section class="widget bg-transparent"><header><h4>Map <span class="fw-semi-bold">Statistics</span></h4><div class="widget-controls widget-controls-hover"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p>Status: <strong>Live</strong></p><p><span class="circle bg-warning"><i class="fa fa-map-marker"></i></span> 146 Countries, 2759 Cities</p><div class="row progress-stats"><div class="col-sm-9"><h5 class="name">Foreign Visits</h5><p class="description deemphasize">Some Cool Text</p><div data-progressbar="" data-sn-progress-animate="" data-value="60" class="progress-sm bg-white"></div></div><div class="col-sm-3 text-align-center"><span class="status rounded rounded-lg bg-body-light"><small><span data-animate-number="">75</span>%</small></span></div></div><div class="row progress-stats"><div class="col-sm-9"><h5 class="name">Local Visits</h5><p class="description deemphasize">P. to C. Conversion</p><div data-progressbar="" data-sn-progress-animate="" data-value="39" data-type="danger" class="progress-sm bg-white"></div></div><div class="col-sm-3 text-align-center"><span class="status rounded rounded-lg bg-body-light"><small><span data-animate-number="">84</span>%</small></span></div></div><div class="row progress-stats"><div class="col-sm-9"><h5 class="name">Sound Frequencies</h5><p class="description deemphasize">Average Bitrate</p><div data-progressbar="" data-sn-progress-animate="" data-value="80" data-type="success" class="progress-sm bg-white"></div></div><div class="col-sm-3 text-align-center"><span class="status rounded rounded-lg bg-body-light"><small><span data-animate-number="">92</span>%</small></span></div></div><h5 class="fw-semi-bold mt">Map Distributions</h5><p>Tracking: <strong>Active</strong></p><p><span class="circle bg-warning"><i class="fa fa-cog"></i></span> 391 elements installed, 84 sets</p><div class="input-group mt"><input type="text" class="form-control" placeholder="Search Map"> <span class="input-group-btn"><button type="submit" class="btn btn-default"><i class="fa fa-search text-gray"></i></button></span></div></div></section></div></div><div class="row"><div class="col-md-4"><section class="widget"><header><h5>USERBASE GROWTH</h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><div class="stats-row"><div class="stat-item"><h6 class="name">Overall Growth</h6><p class="value">76.38%</p></div><div class="stat-item"><h6 class="name">Montly</h6><p class="value">10.38%</p></div><div class="stat-item"><h6 class="name">24h</h6><p class="value">3.38%</p></div></div><div class="progress progress-xs"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"></div></div><p><small><span class="circle bg-warning"><i class="glyphicon glyphicon-chevron-up"></i></span></small> <span class="fw-semi-bold">17% higher</span> than last month</p></div></section></div><div class="col-md-4"><section class="widget"><header><h5>TRAFFIC VALUES</h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><div class="stats-row"><div class="stat-item"><h6 class="name">Overall Values</h6><p class="value">17 567 318</p></div><div class="stat-item"><h6 class="name">Montly</h6><p class="value">55 120</p></div><div class="stat-item"><h6 class="name">24h</h6><p class="value">9 695</p></div></div><div class="progress progress-xs"><div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"></div></div><p><small><span class="circle bg-warning"><i class="fa fa-chevron-down"></i></span></small> <span class="fw-semi-bold">8% lower</span> than last month</p></div></section></div><div class="col-md-4"><section class="widget"><header><h5>RANDOM VALUES</h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><div class="stats-row"><div class="stat-item"><h6 class="name">Overcome T.</h6><p class="value">104.85%</p></div><div class="stat-item"><h6 class="name">Takeoff Angle</h6><p class="value">14.29&deg;</p></div><div class="stat-item"><h6 class="name">World Pop.</h6><p class="value">7,211M</p></div></div><div class="progress progress-xs"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"></div></div><p><small><span class="circle bg-warning"><i class="fa fa-plus"></i></span></small> <span class="fw-semi-bold">8 734 higher</span> than last month</p></div></section></div></div><div class="row"><div class="col-md-4"><section class="widget"><header><h5><span class="label label-danger">New</span> Messages</h5><div class="widget-controls"><a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body no-padding"><div class="list-group list-group-lg"><a class="list-group-item" href="#"><span class="thumb-sm pull-left mr"><img class="img-circle" src="assets/images/people/a2.jpg" alt="..."> <i class="status status-bottom bg-success"></i></span><h5 class="no-margin">Chris Gray</h5><p class="help-block text-ellipsis no-margin">Hey! What\'s up? So many times since we</p></a> <a class="list-group-item" href="#"><span class="thumb-sm pull-left mr"><img class="img-circle" src="assets/images/people/a4.jpg" alt="..."> <i class="status status-bottom bg-success"></i></span><h5 class="no-margin">Jamey Brownlow</h5><p class="help-block text-ellipsis no-margin">Good news coming tonight. Seems they agreed to proceed</p></a> <a class="list-group-item" href="#"><span class="thumb-sm pull-left mr"><img class="img-circle" src="assets/images/people/a1.jpg" alt="..."> <i class="status status-bottom bg-warning"></i></span><h5 class="no-margin">Livia Walsh</h5><p class="help-block text-ellipsis no-margin">Check my latest email plz!</p></a> <a class="list-group-item" href="#"><span class="thumb-sm pull-left mr"><img class="img-circle" src="assets/images/people/a5.jpg" alt="..."> <i class="status status-bottom bg-danger"></i></span><h5 class="no-margin">Jaron Fitzroy</h5><p class="help-block text-ellipsis no-margin">What about summer break?</p></a></div></div><footer class="bg-body-light mt"><input type="search" class="form-control input-sm" placeholder="Search"></footer></section></div><div class="col-md-4"><section class="widget"><header><h5>Market <span class="fw-semi-bold">Stats</span></h5><div class="widget-controls"><a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><h3>$720 Earned</h3><p class="fs-mini text-muted mb mt-sm">Target <span class="fw-semi-bold">$820</span> day earnings is <span class="fw-semi-bold">96%</span> reached.</p></div><div class="widget-table-overflow"><table class="table table-striped table-sm"><thead class="no-bd"><tr><th><div class="checkbox"><input id="checkbox210" type="checkbox" data-check-all=""> <label for="checkbox210"></label></div></th><th></th><th></th></tr></thead><tbody><tr><td><div class="checkbox"><input id="checkbox212" type="checkbox"> <label for="checkbox212"></label></div></td><td>HP Core i7</td><td class="text-align-right fw-semi-bold">$346.1</td></tr><tr><td><div class="checkbox"><input id="checkbox214" type="checkbox"> <label for="checkbox214"></label></div></td><td>Air Pro</td><td class="text-align-right fw-semi-bold">$533.1</td></tr></tbody></table></div><div class="widget-body mt-xlg" data-ng-controller="MarketStatsWidgetDemoController"><div class="chart-overflow-bottom" data-rickshaw-chart="" data-series="series" data-height="100" data-realtime="true" data-random="random" data-series-data="seriesData"></div></div></section></div><div class="col-md-4"><section class="widget"><header><h5>Calendar</h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body no-padding"><div class="bg-primary-light" data-bootstrap-calendar="" data-ng-controller="BootstrapCalendarDemoController" data-events="[ [ \'2/\'+month+\'/\'+year, \'The flower bed\', \'#\', app.settings.colors[\'brand-primary\'], \'Contents here\' ], [ \'5/\'+month+\'/\'+year, \'Stop world water pollution\', \'#\', app.settings.colors[\'brand-warning\'], \'Have a kick off meeting with .inc company\' ], [ \'18/\'+month+\'/\'+year, \'Light Blue 2.2 release\', \'#\', app.settings.colors[\'brand-success\'], \'Some contents here\' ], [ \'29/\'+month+\'/\'+year, \'A link\', \'http://www.flatlogic.com\', app.settings.colors[\'brand-danger\'] ] ]"></div><div class="list-group fs-mini"><a href="#" class="list-group-item text-ellipsis"><span class="badge bg-warning">6:45</span> Weed out the flower bed</a> <a href="#" class="list-group-item text-ellipsis"><span class="badge bg-success">9:41</span> Stop world water pollution</a></div></div></section></div></div>'),
            a.put("app/modules/extra-calendar/extra-calendar.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">Calendar</li></ol><div data-ng-controller="CalendarAppController"><div class="row"><div class="col-lg-4"><h1 class="page-title">{{currentMonth()}} - <span class="fw-semi-bold">{{currentDay()}}</span></h1></div></div><div class="row"><div class="col-md-3 col-lg-4"><h4>Draggable <span class="fw-semi-bold">Events</span></h4><p>Just drap and drop events from there directly into the calendar.</p><div class="calendar-external-events mb-lg"><div data-ui-jq="draggable" data-ui-options="{ zIndex: 999, revert: true, revertDuration: 0 }" class="external-event" data-event-class="bg-success text-white"><i class="fa fa-circle fa-fw text-success ml-xs"></i> Make a tea</div><div data-ui-jq="draggable" data-ui-options="{ zIndex: 999, revert: true, revertDuration: 0 }" class="external-event" data-event-class="bg-warning text-white"><i class="fa fa-circle fa-fw text-warning ml-xs"></i> Open windows</div><div data-ui-jq="draggable" data-ui-options="{ zIndex: 999, revert: true, revertDuration: 0 }" class="external-event" data-event-class="bg-gray text-white"><i class="fa fa-circle-o fa-fw text-gray-light ml-xs"></i> Some stuff</div><div data-ui-jq="draggable" data-ui-options="{ zIndex: 999, revert: true, revertDuration: 0 }" class="external-event" data-event-class="bg-danger text-white"><i class="fa fa-square fa-fw text-danger ml-xs"></i> Study UX engineering</div><div data-ui-jq="draggable" data-ui-options="{ zIndex: 999, revert: true, revertDuration: 0 }" class="external-event" data-event-class="bg-gray text-white"><i class="fa fa-circle-o fa-fw text-gray-light ml-xs"></i> Another stuff</div></div></div><div class="col-md-9 col-lg-8"><section class="widget widget-calendar"><div class="widget-body"><div class="calendar-controls"><div class="btn-group"><button class="btn btn-default" data-ng-click="prev()"><i class="fa fa-angle-left"></i></button> <button class="btn btn-default" data-ng-click="next()"><i class="fa fa-angle-right"></i></button></div><div class="btn-group pull-right" data-toggle="buttons"><label class="btn btn-default active" data-ng-click="changeView(\'month\')"><input type="radio" name="view" value="month"> Month</label> <label class="btn btn-default" data-ng-click="changeView(\'agendaWeek\')"><input type="radio" name="view" value="agendaWeek"> Week</label> <label class="btn btn-default" data-ng-click="changeView(\'agendaDay\')"><input type="radio" name="view" value="agendaDay"> Day</label></div></div><div ui-calendar="uiConfig.calendar" ng-model="eventSources" calendar="eventsCalendar"></div></div></section><script type="text/ng-template" id="show-event-modal.html"><div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> <h5 class="modal-title">{{event.title}}</h5> </div> <div class="modal-body fs-mini"> <p><i class="fa fa-calendar text-muted fs-sm"></i> &nbsp; {{event.start | date:\'medium\'}} <p data-ng-if="event.end"> <i class="fa fa-clock-o text-muted fs-sm"></i> &nbsp; {{event.start | date:\'medium\'}} </p> <p data-ng-if="event.description">{{event.description}}</p> </div> <div class="modal-footer no-border"> <button type="button" class="btn btn-default btn-sm" data-ng-click="ok()">OK</button> </div></script><script type="text/ng-template" id="create-event-modal.html"><div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> <h5 class="modal-title">New Event</h5> <p class="fs-mini text-muted mt-sm"> Just enter event name to create a new one </p> </div> <div class="modal-body bg-gray-lighter"> <div class="form-group"> <input type="text" data-ng-model="event.title" class="form-control input-no-border" placeholder="Name"> </div> </div> <div class="modal-footer no-border"> <button data-ng-click="cancel()" class="btn btn-default">Cancel</button> <button data-ng-click="ok()" class="btn btn-success">OK</button> </div></script></div></div></div>'), a.put("app/modules/extra-error-page/extra-error-page.html", '<div class="container"><main id="content" class="error-container" role="main"><div class="row"><div class="col-lg-4 col-sm-6 col-xs-10 col-lg-offset-4 col-sm-offset-3 col-xs-offset-1"><div class="error-container"><h1 class="error-code">404</h1><p class="error-info">Opps, it seems that this page does not exist.</p><p class="error-help mb">If you are sure it should, search for it.</p><form ng-submit="searchResult()" method="get" ng-controller="ErrorSearchController"><div class="form-group"><input class="form-control input-no-border" type="text" placeholder="Search Pages"></div><button type="submit" class="btn btn-inverse">Search <i class="fa fa-search text-warning ml-xs"></i></button></form></div></div></div></main><footer class="page-footer">2015 &copy; Sing. Admin Dashboard Template.</footer></div>'), a.put("app/modules/extra-gallery/extra-gallery.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">Gallery</li></ol><h1 class="page-title">Media - <span class="fw-semi-bold">Images</span></h1><div data-ng-controller="GalleryAppController"><div class="clearfix mb-lg"><div class="btn-group m-b-20"><span class="btn btn-default" data-ng-class="{\'active\': activeGroup == \'all\'}" data-ng-click="activeGroup = \'all\'">All</span> <span class="btn btn-default" data-ng-class="{\'active\': activeGroup == \'nature\'}" data-ng-click="activeGroup = \'nature\'">Nature</span> <span class="btn btn-default" data-ng-class="{\'active\': activeGroup == \'people\'}" data-ng-click="activeGroup = \'people\'">People</span> <span class="btn btn-default" data-ng-class="{\'active\': activeGroup == \'space\'}" data-ng-click="activeGroup = \'space\'">Space</span></div><div class="pull-right m-b-20"><div class="btn-group"><span class="btn btn-default" data-ng-class="{\'active\': order == \'asc\'}" data-ng-click="order = \'asc\'"><i class="fa fa-sort-numeric-asc"></i></span> <span class="btn btn-default" data-ng-class="{\'active\': order == \'desc\'}" data-ng-click="order = \'desc\'"><i class="fa fa-sort-numeric-desc"></i></span></div></div></div><div class="row gallery" data-ui-jq="magnificPopup" data-sn-gallery="" data-options="{ itemSelector: \'.gallery-item\'}" data-ui-options="{ delegate: \'.thumbnail > a\', type: \'image\', gallery: { enabled: true } }"><div data-ng-repeat="item in items" class="col-sm-6 col-md-3 gallery-item" data-groups="{{item.groups}}" data-title="{{item.name}}"><div class="thumbnail"><a href="{{item.src}}"><img data-ng-src="{{item.src}}" alt="..."></a><div class="caption"><h5 class="mt-0 mb-xs">{{item.name}}</h5><ul class="post-links"><li><a href="#">{{item.date}}</a></li><li><a href="#"><span class="text-danger"><i class="fa {{item.like ? \'fa-heart\' : \'fa-heart-o\'}}"></i> Like</span></a></li><li><a href="#">Details</a></li></ul></div></div></div><div class="col-sm-6 col-md-3 js-shuffle-sizer"></div></div></div>'), a.put("app/modules/extra-invoice/extra-invoice.html", '<div class="row"><div class="col-md-11"><section class="widget widget-invoice"><header><div class="row"><div class="col-sm-6 col-print-6"><img src="assets/images/logo/invoice-logo.png" alt="Logo" class="invoice-logo"></div><div class="col-sm-6 col-print-6"><h3 class="text-align-right">#<span class="fw-semi-bold">9.45613</span> / <small>17 May 2014</small></h3><div class="text-muted fs-larger text-align-right">Some Invoice number description or whatever</div></div></div></header><div class="widget-body"><div class="row mb-lg"><section class="col-sm-6 col-print-6"><h4 class="text-muted no-margin">Company Information</h4><h3 class="company-name">Wrapbootstrap LLC</h3><address><strong>2 Infinite Loop</strong><br>Minsk, Belarus 220004<br>088.253.5345<br><abbr title="Work email">e-mail:</abbr> <a href="mailto:#">email@example.com</a><br><abbr title="Work Phone">phone:</abbr> (012) 345-678-901<br><abbr title="Work Fax">fax:</abbr> (012) 678-132-901</address></section><section class="col-sm-6 col-print-6 text-align-right"><h4 class="text-muted no-margin">Client Information</h4><h3 class="client-name">Veronica Niasvizhskaja</h3><address><strong>Consultant</strong> at <a href="#">Allspana</a><br><abbr title="Work email">e-mail:</abbr> <a href="mailto:#">maryna@allspana.by</a><br><abbr title="Work Phone">phone:</abbr> (012) 345-678-901<br><abbr title="Work Fax">fax:</abbr> (012) 678-132-901<p class="no-margin"><strong>Note:</strong></p><p class="text-muted fs-mini">Some nights I stay up cashing in my bad luck. Some nights I call it a draw</p></address></section></div><table class="table table-striped"><thead><tr><th>#</th><th>Item</th><th class="hidden-xs">Description</th><th>Quantity</th><th class="hidden-xs">Price per Unit</th><th>Total</th></tr></thead><tbody><tr><td>1</td><td>Brand-new 27\' monitor</td><td class="hidden-xs">2,560x1,440-pixel (WQHD) resolution supported!</td><td>2</td><td class="hidden-xs">700</td><td>1,400.00</td></tr><tr><td>2</td><td>Domain: okendoken.com</td><td class="hidden-xs">6-month registration</td><td>1</td><td class="hidden-xs">10.99</td><td>21.88</td></tr><tr><td>3</td><td>Atlas Shrugged</td><td class="hidden-xs">Novel by Ayn Rand, first published in 1957 in the US</td><td>5</td><td class="hidden-xs">35</td><td>175.00</td></tr><tr><td>4</td><td>New Song by Dr. Pre</td><td class="hidden-xs">Lyrics: praesent blandit augue non sapien ornare imperdiet</td><td>1</td><td class="hidden-xs">2</td><td>2.00</td></tr></tbody></table><div class="row"><div class="col-sm-8 col-print-6"><p><strong>Note:</strong> Thank you for your business. Keep in mind, sometimes bad things happen. But it\'s just sometimes.</p></div><div class="col-sm-4 col-print-6"><div class="row text-align-right"><div class="col-xs-6"></div><div class="col-xs-3"><p>Subtotal</p><p>Tax(10%)</p><p class="no-margin"><strong>Total</strong></p></div><div class="col-xs-3"><p>1,598.88</p><p>159.89</p><p class="no-margin"><strong>1,758.77</strong></p></div></div></div></div><p class="text-align-right mt-lg mb-xs">Marketing Consultant</p><p class="text-align-right"><span class="fw-semi-bold">Bob Smith</span></p><div class="btn-toolbar mt-lg text-align-right hidden-print"><button data-ng-click="print()" class="btn btn-inverse"><i class="fa fa-print"></i> &nbsp;&nbsp; Print</button> <button class="btn btn-danger">Proceed with Payment &nbsp; <span class="circle bg-white"><i class="fa fa-arrow-right text-danger"></i></span></button></div></div></section></div></div>'), a.put("app/modules/extra-login-page/extra-login-page.html", '<div class="container"><main id="content" class="widget-login-container" role="main"><div class="row"><div class="col-lg-4 col-sm-6 col-xs-10 col-lg-offset-4 col-sm-offset-3 col-xs-offset-1"><h4 class="widget-login-logo animated fadeInUp"><i class="fa fa-circle text-gray"></i> sing <i class="fa fa-circle text-warning"></i></h4><section class="widget widget-login animated fadeInUp"><header><h3>Login to your Sing App</h3></header><div class="widget-body"><p class="widget-login-info">Use Facebook, Twitter or your email to sign in.</p><p class="widget-login-info">Don\'t have an account? Sign up now!</p><form class="login-form mt-lg"><div class="form-group"><input type="text" class="form-control" id="exampleInputEmail1" placeholder="Username"></div><div class="form-group"><input class="form-control" id="pswd" type="text" placeholder="Password"></div><div class="clearfix"><div class="btn-toolbar pull-right"><button type="button" class="btn btn-default btn-sm">Create an Account</button> <a class="btn btn-inverse btn-sm" data-ui-sref="app.dashboard">Login</a></div></div><div class="row"><div class="col-sm-6 col-sm-push-6"><div class="clearfix"><div class="checkbox widget-login-info pull-right ml-n-lg"><input type="checkbox" id="checkbox1" value="1"> <label for="checkbox1">Keep me signed in</label></div></div></div><div class="col-sm-6 col-sm-pull-6"><a class="mr-n-lg" href="#">Trouble with account?</a></div></div></form></div></section></div></div></main><footer class="page-footer">2015 &copy; Sing. Admin Dashboard Template.</footer></div>'), a.put("app/modules/extra-search-results/extra-search-results.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">Search Results</li></ol><h1 class="page-title">Matching - <span class="fw-semi-bold">Results</span></h1><div class="clearfix"><div class="btn-toolbar"><div class="btn-group"><a data-toggle="dropdown" class="btn dropdown-toggle btn-default">Popular <span class="caret"></span></a><ul class="dropdown-menu"><li><a href="#">All</a></li><li><a href="#">Popular</a></li><li><a href="#">Interesting</a></li><li><a href="#">Latest</a></li></ul></div><div class="btn-group"><a data-toggle="dropdown" class="btn dropdown-toggle btn-default">All Time <span class="caret"></span></a><ul class="dropdown-menu"><li><a href="#">Last 24h</a></li><li><a href="#">Last Month</a></li><li><a href="#">Last Year</a></li></ul></div><div class="btn-group pull-right"><button class="btn btn-gray active" type="button"><i class="fa fa-th-list"></i></button> <button class="btn btn-gray" type="button"><i class="fa fa-th-large"></i></button></div></div></div><div class="row"><div class="col-lg-3 col-lg-push-9"><h4>Results <span class="fw-semi-bold">Filtering</span></h4><p class="text-muted fs-mini">Listed content is categorized by the following groups:</p><ul class="nav nav-pills nav-stacked search-result-categories mt"><li><a href="#">Hot Ideas <span class="badge">34</span></a></li><li><a href="#">Latest Pictures <span class="badge">9</span></a></li><li><a href="#">Labels of Day</a></li><li><a href="#">Recent Movies</a></li><li><a href="#">Globals <span class="badge">18</span></a></li></ul></div><div class="col-lg-9 col-lg-pull-3"><p class="search-results-count">About 94 700 000 (0.39 sec.) results</p><section class="search-result-item"><a class="image-link" href="#"><img class="image" src="assets/images/pictures/1.jpg"></a><div class="search-result-item-body"><div class="row"><div class="col-sm-9"><h4 class="search-result-item-heading"><a href="#">Next generation admin template</a></h4><p class="info">New York, NY 20188</p><p class="description">Not just usual Metro. But something bigger. Not just usual widgets, but real widgets. Not just yet another admin template, but next generation admin template.</p></div><div class="col-sm-3 text-align-center"><p class="value3 mt-sm">$9, 700</p><p class="fs-mini text-muted">PER WEEK</p><a class="btn btn-primary btn-info btn-sm" href="#">Learn More</a></div></div></div></section><section class="search-result-item"><a class="image-link" href="#"><img class="image" src="assets/images/pictures/5.jpg"></a><div class="search-result-item-body"><div class="row"><div class="col-sm-9"><h4 class="search-result-item-heading"><a href="#">Try. Posted by Okendoken</a> <span class="badge bg-danger fw-normal pull-right">Best Deal!</span></h4><p class="info">Los Angeles, NY 20188</p><p class="description">You will never know exactly how something will go until you try it. You can think three hundred times and still have no precise result.</p></div><div class="col-sm-3 text-align-center"><p class="value3 mt-sm">$10, 300</p><p class="fs-mini text-muted">PER WEEK</p><a class="btn btn-primary btn-info btn-sm" href="#">Learn More</a></div></div></div></section><section class="search-result-item"><a class="image-link" href="#"><img class="image" src="assets/images/pictures/13.jpg"></a><div class="search-result-item-body"><div class="row"><div class="col-sm-9"><h4 class="search-result-item-heading"><a href="#">Vitaut the Great</a></h4><p class="info">New York, NY 20188</p><p class="description">The Great Prince of the Grand Duchy of Lithuania he had stopped the invasion to Europe of Timur (Tamerlan) from Asia heading a big Army of Belarusians, Lithuanians.</p></div><div class="col-sm-3 text-align-center"><p class="value3 mt-sm">$3, 200</p><p class="fs-mini text-muted">PER WEEK</p><a class="btn btn-info btn-sm" href="#">Learn More</a></div></div></div></section><section class="search-result-item"><a class="image-link" href="#"><img class="image" src="assets/images/pictures/3.jpg"></a><div class="search-result-item-body"><div class="row"><div class="col-sm-9"><h4 class="search-result-item-heading"><a href="#">Can I use CSS3 Radial-Gradient?</a></h4><p class="info">Minsk, NY 20188</p><p class="description">Yes you can! Further more, you should! It let\'s you create really beautiful images either for elements or for the entire background.</p></div><div class="col-sm-3 text-align-center"><p class="value3 mt-sm">$2, 400</p><p class="fs-mini text-muted">PER MONTH</p><a class="btn btn-info btn-sm" href="#">Learn More</a></div></div></div></section><div class="text-align-center"><ul class="pagination pagination-sm"><li class="disabled"><a href="#">Prev</a></li><li class="active"><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li><li><a href="#">4</a></li><li><a href="#">5</a></li><li><a href="#">Next</a></li></ul></div></div></div>'), a.put("app/modules/extra-time-line/extra-time-line.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">Time Line</li></ol><h1 class="page-title">Events - <span class="fw-semi-bold">Feed</span></h1><ul class="timeline"><li class="on-left"><time class="event-time" datetime="2014-05-19 03:04"><span class="date">yesterday</span> <span class="time">8:03 <span class="fw-semi-bold">pm</span></span></time><span class="event-icon event-icon-success"><i class="glyphicon glyphicon-map-marker"></i></span><section class="event"><span class="thumb-sm avatar pull-left mr-sm"><img class="img-circle" src="assets/images/people/a2.jpg" alt="..."></span><h4 class="event-heading"><a href="#">Jessica Nilson</a> <small>@jess</small></h4><p class="fs-sm text-muted">10:12 am - Publicly near Minsk</p><div class="event-map" data-sn-gmap=""></div><footer><ul class="post-links"><li><a href="#">1 hour</a></li><li><a href="#"><span class="text-danger"><i class="fa fa-heart"></i> Like</span></a></li><li><a href="#">Comment</a></li></ul><ul class="post-comments"><li><span class="thumb-xs avatar pull-left mr-sm"><img class="img-circle" src="assets/images/people/a2.jpg" alt="..."></span><div class="comment-body"><h6 class="author fw-semi-bold">Radrigo Gonzales <small>7 mins ago</small></h6><p>Someone said they were the best people out there just few years ago. Don\'t know better options.</p></div></li><li><span class="thumb-xs avatar pull-left mr-sm"><img class="img-circle" src="assets/images/people/a4.jpg" alt="..."></span><div class="comment-body"><h6 class="author fw-semi-bold">Ignacio Abad <small>6 mins ago</small></h6><p>True. Heard absolutely the same.</p></div></li><li><span class="thumb-xs avatar pull-left mr-sm"><img class="img-circle" src="assets/images/avatar.png" alt="..."></span><div class="comment-body"><input class="form-control input-sm" type="text" placeholder="Write your comment..."></div></li></ul></footer></section></li><li><time class="event-time" datetime="2014-05-19 03:04"><span class="date">today</span> <span class="time">9:41 <span class="fw-semi-bold">am</span></span></time><span class="event-icon event-icon-primary"><i class="glyphicon glyphicon-comment"></i></span><section class="event"><span class="thumb-sm avatar pull-left mr-sm"><img class="img-circle" src="assets/images/people/a5.jpg" alt="..."></span><h4 class="event-heading"><a href="#">Bob Nilson</a> <small><a href="#">@nils</a></small></h4><p class="fs-sm text-muted">February 22, 2014 at 01:59 PM</p><p class="fs-mini">There is no such thing as maturity. There is instead an ever-evolving process of maturing. Because when there is a maturity, there is ...</p><footer><ul class="post-links"><li><a href="#">1 hour</a></li><li><a href="#"><span class="text-danger"><i class="fa fa-heart"></i> Like</span></a></li><li><a href="#">Comment</a></li></ul></footer></section></li><li class="on-left"><time class="event-time" datetime="2014-05-19 03:04"><span class="date">yesterday</span> <span class="time">9:03 <span class="fw-semi-bold">am</span></span></time><span class="event-icon event-icon-danger"><i class="glyphicon glyphicon-cutlery"></i></span><section class="event"><h4 class="event-heading"><a href="#">Jessica Smith</a> <small>@jess</small></h4><p class="fs-sm text-muted">February 22, 2014 at 01:59 PM</p><p class="fs-mini">Check out this awesome photo I made in Italy last summer. Seems it was lost somewhere deep inside my brand new HDD 40TB. Thanks god I found it!</p><div class="event-image"><a href="assets/images/pictures/8.jpg" data-ui-jq="magnificPopup" data-ui-options="{type: \'image\'}"><img src="assets/images/pictures/8.jpg"></a></div><footer><div class="clearfix"><ul class="post-links mt-sm pull-left"><li><a href="#">1 hour</a></li><li><a href="#"><span class="text-danger"><i class="fa fa-heart-o"></i> Like</span></a></li><li><a href="#">Comment</a></li></ul><span class="thumb thumb-sm pull-right"><a href="#"><img class="img-circle" src="assets/images/people/a1.jpg"></a></span> <span class="thumb thumb-sm pull-right"><a href="#"><img class="img-circle" src="assets/images/people/a5.jpg"></a></span> <span class="thumb thumb-sm pull-right"><a href="#"><img class="img-circle" src="assets/images/people/a3.jpg"></a></span></div><ul class="post-comments mt-sm"><li><span class="thumb-xs avatar pull-left mr-sm"><img class="img-circle" src="assets/images/people/a1.jpg" alt="..."></span><div class="comment-body"><h6 class="author fw-semi-bold">Ignacio Abad <small>6 mins ago</small></h6><p>Hey, have you heard anything about that?</p></div></li><li><span class="thumb-xs avatar pull-left mr-sm"><img class="img-circle" src="assets/images/avatar.png" alt="..."></span><div class="comment-body"><input class="form-control input-sm" type="text" placeholder="Write your comment..."></div></li></ul></footer></section></li><li><time class="event-time" datetime="2014-05-19 03:04"><span class="date">yesterday</span> <span class="time">9:03 <span class="fw-semi-bold">am</span></span></time><span class="event-icon"><img class="img-circle" src="assets/images/avatar.png"></span><section class="event"><span class="thumb-sm avatar pull-left mr-sm"><img class="img-circle" src="assets/images/people/a6.jpg" alt="..."></span><h4 class="event-heading"><a href="#">Jessica Smith</a> <small>@jess</small></h4><p class="fs-sm text-muted">9:03 am - Publicly near Minsk</p><h4>New <span class="fw-semi-bold">Project</span> Launch</h4><p class="fs-mini">Let\'s try something different this time. Hey, do you wanna join us tonight? We\'re planning to a launch a new project soon. Want to discuss with all of you...</p><a class="mt-n-xs fs-mini text-muted" href="#">Read more...</a><footer><ul class="post-links"><li><a href="#">1 hour</a></li><li><a href="#"><span class="text-danger"><i class="fa fa-heart-o"></i> Like</span></a></li><li><a href="#">Comment</a></li></ul></footer></section></li></ul>'), a.put("app/modules/form-elements/form-elements.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">Form Elements</li></ol><h1 class="page-title">Form - <span class="fw-semi-bold">Inputs & Controls</span></h1><div data-ng-controller="FormElementsDemoController"><div class="row"><div class="col-md-6"><section class="widget"><header><h5>Inputs</h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><form class="form-horizontal" role="form"><fieldset><legend><strong>Horizontal</strong> form</legend><div class="form-group"><label for="normal-field" class="col-sm-4 control-label">Normal field</label><div class="col-sm-7"><input type="text" id="normal-field" class="form-control" placeholder="May have placeholder"></div></div><div class="form-group"><label for="hint-field" class="col-sm-4 control-label">Label hint <span class="help-block">Some help text</span></label><div class="col-sm-7"><input type="text" id="hint-field" class="form-control"></div></div><div class="form-group"><label class="col-sm-4 control-label" for="tooltip-enabled">Tooltip enabled</label><div class="col-sm-7"><input type="text" id="tooltip-enabled" class="form-control" data-tooltip-placement="top" data-tooltip="Some explanation text here" placeholder="Hover over me.."></div></div><div class="form-group"><label class="col-sm-4 control-label" for="disabled-input">Disabled input</label><div class="col-sm-7"><input type="text" id="disabled-input" class="form-control" disabled="disabled" value="Default value"></div></div><div class="form-group"><label class="col-sm-4 control-label" for="max-length">Max length</label><div class="col-sm-7"><input type="text" id="max-length" maxlength="3" class="form-control" placeholder="Max length 3 characters" data-tooltip-placement="top" data-tooltip="You cannot write more than 3 characters."></div></div><div class="form-group"><label class="col-sm-4 control-label" for="prepended-input">Prepended input</label><div class="col-sm-7"><div class="input-group"><span class="input-group-addon"><i class="fa fa-user"></i></span> <input id="prepended-input" class="form-control" size="16" type="text" placeholder="Username"></div></div></div><div class="form-group"><label class="col-sm-4 control-label" for="password-field">Password</label><div class="col-sm-7"><div class="input-group"><span class="input-group-addon"><i class="fa fa-lock"></i></span> <input type="password" class="form-control" id="password-field" placeholder="Password"></div></div></div><div class="form-group"><label class="col-sm-4 control-label" for="appended-input">Appended input</label><div class="col-sm-7"><div class="input-group"><input id="appended-input" class="form-control" size="16" type="text"> <span class="input-group-addon">.00</span></div></div></div><div class="form-group"><label class="col-sm-4 control-label" for="combined-input">Combined</label><div class="col-sm-7"><div class="input-group"><span class="input-group-addon">$</span> <input id="combined-input" class="form-control" size="16" type="text"> <span class="input-group-addon">.00</span></div></div></div><div class="form-group"><label class="col-sm-4 control-label" for="transparent-input">Append Transparent</label><div class="col-sm-7"><div class="input-group input-group-transparent"><input id="transparent-input" class="form-control" type="text"> <span class="input-group-addon"><i class="fa fa-camera"></i></span></div></div></div></fieldset><div class="form-actions"><div class="row"><div class="col-sm-offset-4 col-sm-7"><button type="submit" class="btn btn-primary">Save Changes</button> <button type="button" class="btn btn-inverse">Cancel</button></div></div></div></form></div></section></div><div class="col-md-6"><section class="widget"><header><h5>Prepended and appended inputs</h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><form role="form"><fieldset><legend><strong>Default</strong> Form</legend><div class="row"><div class="col-sm-8"><div class="form-group"><label for="search-input">Search type input</label><div class="input-group"><input type="search" class="form-control" id="search-input"> <span class="input-group-btn"><button type="button" class="btn btn-default">Search</button></span></div></div><div class="form-group"><label for="bar">Whole bar appended</label><div class="input-group"><input type="text" class="form-control" id="bar"><div class="input-group-btn"><button type="button" class="btn btn-danger"><i class="fa fa-pencil"></i></button> <button type="button" class="btn btn-warning"><i class="fa fa-plus"></i></button> <button type="button" class="btn btn-success"><i class="fa fa-refresh"></i></button></div></div></div><div class="form-group"><label for="dropdown-appended">Actions dropdown</label><div class="input-group"><input type="text" class="form-control" id="dropdown-appended"><div class="input-group-btn" data-dropdown=""><button class="btn btn-success dropdown-toggle" data-dropdown-toggle="" data-original-title="" title="">Action <i class="fa fa-caret-down"></i></button><ul class="dropdown-menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div></div></div><div class="form-group"><label for="type-dropdown-appended">Types dropdown</label><div class="input-group"><input type="text" class="form-control" id="type-dropdown-appended"><div class="input-group-btn"><select id="phone-type" class="selectpicker" data-selectpicker="" data-ng-model="option" data-style="btn-primary" data-width="auto"><option>Another type</option><option>Type one</option><option>Next type</option></select></div></div><p class="help-block">You can select some type of a field just right in the place.</p></div><div class="form-group"><label for="segmented-dropdown">Segmented dropdown</label><div class="input-group"><input id="segmented-dropdown" class="form-control" type="text"><div class="input-group-btn" data-dropdown=""><button class="btn btn-warning" data-original-title="" title="" tabindex="-1">Action</button> <button class="btn btn-warning dropdown-toggle" data-dropdown-toggle="" data-original-title="" title=""><i class="fa fa-caret-down"></i></button><ul class="dropdown-menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div></div><span class="help-block">Anything can be appended to the right</span></div><div class="form-group"><label for="no-borders-input">Transparent input</label> <input id="no-borders-input" class="form-control input-no-border bg-gray-lighter" type="text" placeholder="Search Dashboard"><p class="help-block">With <code>.bg-gray-lighter</code>. White by default.</p></div></div></div></fieldset><div class="form-actions"><button type="submit" class="btn btn-inverse">Save Changes</button> <button type="button" class="btn btn-default">Cancel</button></div></form></div></section></div></div><div class="row"><div class="col-md-8"><section class="widget"><header><h5>Form <span class="fw-semi-bold">Options</span></h5><div class="widget-controls"><a class="bg-gray-transparent" href="#"><i class="glyphicon glyphicon-cog text-white"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><form role="form"><fieldset><legend>Control sizing</legend><p>Set input heights using classes like <code>.input-lg</code> and <code>.input-sm</code>. Also works with <code>type="search"</code> inputs and selects. For input groups use <code>.input-group-lg</code> & <code>.input-group-sm</code>.</p><br><div class="form-group"><input type="text" class="form-control input-lg" placeholder=".input-lg"></div><div class="form-group"><input type="text" class="form-control" placeholder="default input"></div><div class="form-group"><input type="text" class="form-control input-sm" placeholder=".input-sm"></div></fieldset></form></div></section></div><div class="col-md-4"><section class="widget"><header><h5>Form <span class="fw-semi-bold">Options</span></h5><div class="widget-controls"><a class="bg-gray-transparent" href="#"><i class="glyphicon glyphicon-cog text-white"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><form role="form"><fieldset><legend>Input Groups</legend><p>Different colors & sizes for any elements including input groups. Elements may be easily styled with classes like <code>.bg-primary</code> or <code>.bg-transparent</code></p><br><div class="form-group"><div class="input-group"><span class="input-group-addon bg-transparent"><i class="fa fa-github-alt"></i></span> <input class="form-control" size="16" type="text" placeholder="First Name"></div></div><div class="form-group"><div class="input-group input-group-lg"><span class="input-group-addon"><i class="fa fa-bars"></i></span> <input class="form-control" size="16" type="text" placeholder="Username"></div></div><div class="form-group"><div class="input-group input-group-sm"><input class="form-control" size="16" type="text" placeholder="City"> <span class="input-group-addon bg-danger text-white"><i class="fa fa-code-fork"></i></span></div></div></fieldset></form></div></section></div></div><div class="row"><div class="col-md-6"><section class="widget"><header><h5><i class="fa fa-font"></i> Textareas</h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><form class="form-horizontal" role="form"><fieldset><legend>Small form</legend><div class="form-group"><label class="col-sm-3 control-label" for="default-textarea">Default textarea</label><div class="col-sm-9"><textarea rows="4" class="form-control" id="default-textarea"></textarea></div></div><div class="form-group"><label class="col-sm-3 control-label" for="elastic-textarea">Auto-growing textarea</label><div class="col-sm-9"><textarea rows="3" class="form-control transition-height" id="elastic-textarea" data-ui-jq="autosize" data-ui-options=\'{append: "\\n"}\' placeholder="Try to add few new lines.."></textarea></div></div><div class="form-group"><label class="col-sm-3 control-label" for="summernote">Wysiwyg (Summernote) <span class="help-block">With bottom toolbar appended</span></label><div class="col-sm-9" summernote-fullscreen-helper=""><textarea summernote="" height="120" id="summernote"></textarea><div class="btn-toolbar"><button type="button" class="btn btn-sm btn-default pull-right">Clear</button> <button type="button" class="btn btn-sm btn-danger pull-right">Save</button></div></div></div><div class="form-group"><label class="col-sm-3 control-label" for="markdown">Markdown Editor</label><div class="col-sm-9"><textarea class="form-control" id="markdown" data-provide="markdown" data-ui-jq="markdown" rows="6">### Hello there\r\nHow are you?\r\n\r\nI have bellow task for you :\r\n\r\nSelect from this text...\r\nClick the bold on THIS WORD and make THESE ONE italic\r\nLink GOOGLE to google.com\r\nTest to insert image (and try to tab after write the image description)\r\nTest Preview\r\nAnd ending here... Click "List"\r\n\r\nEnjoy!\r\n                  </textarea></div></div></fieldset></form></div></section></div><div class="col-md-6"><section class="widget"><header><h5><i class="fa fa-list-alt"></i> Selects</h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><form class="form-horizontal form-label-left" role="form"><fieldset><legend>Default form with labels on left</legend><div class="form-group"><label class="col-sm-4 control-label" for="default-select">Default select</label><div class="col-sm-8"><select data-ui-jq="select2" data-ui-options="{minimumResultsForSearch: 10}" data-placeholder="Which galaxy is closest to Milky Way?" tabindex="-1" class="select2 form-control" id="default-select"><option value=""></option><option value="Magellanic">Large Magellanic Cloud</option><option value="Andromeda">Andromeda Galaxy</option><option value="Sextans">Sextans A</option></select></div></div><div class="form-group"><label class="col-sm-4 control-label" for="country-select">Select with search</label><div class="col-sm-8"><select id="country-select" data-ui-jq="select2" data-placeholder="Select country" class="select2 form-control" tabindex="-1" name="country"><option value=""></option><option value="United States">United States</option><option value="United Kingdom">United Kingdom</option><option value="Afghanistan">Afghanistan</option><option value="Albania">Albania</option><option value="Algeria">Algeria</option><option value="American Samoa">American Samoa</option><option value="Andorra">Andorra</option><option value="Angola">Angola</option><option value="Anguilla">Anguilla</option><option value="Antarctica">Antarctica</option><option value="Antigua and Barbuda">Antigua and Barbuda</option><option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Aruba">Aruba</option><option value="Australia">Australia</option><option value="Austria">Austria</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahamas">Bahamas</option><option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option><option value="Barbados">Barbados</option><option value="Belarus">Belarus</option><option value="Belgium">Belgium</option><option value="Belize">Belize</option><option value="Benin">Benin</option><option value="Bermuda">Bermuda</option><option value="Bhutan">Bhutan</option><option value="Bolivia">Bolivia</option><option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option><option value="Botswana">Botswana</option><option value="Bouvet Island">Bouvet Island</option><option value="Brazil">Brazil</option><option value="British Indian Ocean Territory">British Indian Ocean Territory</option><option value="Brunei Darussalam">Brunei Darussalam</option><option value="Bulgaria">Bulgaria</option><option value="Burkina Faso">Burkina Faso</option><option value="Burundi">Burundi</option><option value="Cambodia">Cambodia</option><option value="Cameroon">Cameroon</option><option value="Canada">Canada</option><option value="Cape Verde">Cape Verde</option><option value="Cayman Islands">Cayman Islands</option><option value="Central African Republic">Central African Republic</option><option value="Chad">Chad</option><option value="Chile">Chile</option><option value="China">China</option><option value="Christmas Island">Christmas Island</option><option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option><option value="Colombia">Colombia</option><option value="Comoros">Comoros</option><option value="Congo">Congo</option><option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option><option value="Cook Islands">Cook Islands</option><option value="Costa Rica">Costa Rica</option><option value="Cote D\'ivoire">Cote D\'ivoire</option><option value="Croatia">Croatia</option><option value="Cuba">Cuba</option><option value="Cyprus">Cyprus</option><option value="Czech Republic">Czech Republic</option><option value="Denmark">Denmark</option><option value="Djibouti">Djibouti</option><option value="Dominica">Dominica</option><option value="Dominican Republic">Dominican Republic</option><option value="Ecuador">Ecuador</option><option value="Egypt">Egypt</option><option value="El Salvador">El Salvador</option><option value="Equatorial Guinea">Equatorial Guinea</option><option value="Eritrea">Eritrea</option><option value="Estonia">Estonia</option><option value="Ethiopia">Ethiopia</option><option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option><option value="Faroe Islands">Faroe Islands</option><option value="Fiji">Fiji</option><option value="Finland">Finland</option><option value="France">France</option><option value="French Guiana">French Guiana</option><option value="French Polynesia">French Polynesia</option><option value="French Southern Territories">French Southern Territories</option><option value="Gabon">Gabon</option><option value="Gambia">Gambia</option><option value="Georgia">Georgia</option><option value="Germany">Germany</option><option value="Ghana">Ghana</option><option value="Gibraltar">Gibraltar</option><option value="Greece">Greece</option><option value="Greenland">Greenland</option><option value="Grenada">Grenada</option><option value="Guadeloupe">Guadeloupe</option><option value="Guam">Guam</option><option value="Guatemala">Guatemala</option><option value="Guinea">Guinea</option><option value="Guinea-bissau">Guinea-bissau</option><option value="Guyana">Guyana</option><option value="Haiti">Haiti</option><option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option><option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option><option value="Honduras">Honduras</option><option value="Hong Kong">Hong Kong</option><option value="Hungary">Hungary</option><option value="Iceland">Iceland</option><option value="India">India</option><option value="Indonesia">Indonesia</option><option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option><option value="Iraq">Iraq</option><option value="Ireland">Ireland</option><option value="Israel">Israel</option><option value="Italy">Italy</option><option value="Jamaica">Jamaica</option><option value="Japan">Japan</option><option value="Jordan">Jordan</option><option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option><option value="Kiribati">Kiribati</option><option value="Korea, Democratic People\'s Republic of">Korea, Democratic People\'s Republic of</option><option value="Korea, Republic of">Korea, Republic of</option><option value="Kuwait">Kuwait</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Lao People\'s Democratic Republic">Lao People\'s Democratic Republic</option><option value="Latvia">Latvia</option><option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option><option value="Liberia">Liberia</option><option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option><option value="Liechtenstein">Liechtenstein</option><option value="Lithuania">Lithuania</option><option value="Luxembourg">Luxembourg</option><option value="Macao">Macao</option><option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option><option value="Madagascar">Madagascar</option><option value="Malawi">Malawi</option><option value="Malaysia">Malaysia</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option><option value="Malta">Malta</option><option value="Marshall Islands">Marshall Islands</option><option value="Martinique">Martinique</option><option value="Mauritania">Mauritania</option><option value="Mauritius">Mauritius</option><option value="Mayotte">Mayotte</option><option value="Mexico">Mexico</option><option value="Micronesia, Federated States of">Micronesia, Federated States of</option><option value="Moldova, Republic of">Moldova, Republic of</option><option value="Monaco">Monaco</option><option value="Mongolia">Mongolia</option><option value="Montserrat">Montserrat</option><option value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option><option value="Myanmar">Myanmar</option><option value="Namibia">Namibia</option><option value="Nauru">Nauru</option><option value="Nepal">Nepal</option><option value="Netherlands">Netherlands</option><option value="Netherlands Antilles">Netherlands Antilles</option><option value="New Caledonia">New Caledonia</option><option value="New Zealand">New Zealand</option><option value="Nicaragua">Nicaragua</option><option value="Niger">Niger</option><option value="Nigeria">Nigeria</option><option value="Niue">Niue</option><option value="Norfolk Island">Norfolk Island</option><option value="Northern Mariana Islands">Northern Mariana Islands</option><option value="Norway">Norway</option><option value="Oman">Oman</option><option value="Pakistan">Pakistan</option><option value="Palau">Palau</option><option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option><option value="Panama">Panama</option><option value="Papua New Guinea">Papua New Guinea</option><option value="Paraguay">Paraguay</option><option value="Peru">Peru</option><option value="Philippines">Philippines</option><option value="Pitcairn">Pitcairn</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option><option value="Puerto Rico">Puerto Rico</option><option value="Qatar">Qatar</option><option value="Reunion">Reunion</option><option value="Romania">Romania</option><option value="Russian Federation">Russian Federation</option><option value="Rwanda">Rwanda</option><option value="Saint Helena">Saint Helena</option><option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option><option value="Saint Lucia">Saint Lucia</option><option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option><option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option><option value="Samoa">Samoa</option><option value="San Marino">San Marino</option><option value="Sao Tome and Principe">Sao Tome and Principe</option><option value="Saudi Arabia">Saudi Arabia</option><option value="Senegal">Senegal</option><option value="Serbia and Montenegro">Serbia and Montenegro</option><option value="Seychelles">Seychelles</option><option value="Sierra Leone">Sierra Leone</option><option value="Singapore">Singapore</option><option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="Solomon Islands">Solomon Islands</option><option value="Somalia">Somalia</option><option value="South Africa">South Africa</option><option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option><option value="Spain">Spain</option><option value="Sri Lanka">Sri Lanka</option><option value="Sudan">Sudan</option><option value="Suriname">Suriname</option><option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option><option value="Swaziland">Swaziland</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option><option value="Syrian Arab Republic">Syrian Arab Republic</option><option value="Taiwan, Province of China">Taiwan, Province of China</option><option value="Tajikistan">Tajikistan</option><option value="Tanzania, United Republic of">Tanzania, United Republic of</option><option value="Thailand">Thailand</option><option value="Timor-leste">Timor-leste</option><option value="Togo">Togo</option><option value="Tokelau">Tokelau</option><option value="Tonga">Tonga</option><option value="Trinidad and Tobago">Trinidad and Tobago</option><option value="Tunisia">Tunisia</option><option value="Turkey">Turkey</option><option value="Turkmenistan">Turkmenistan</option><option value="Turks and Caicos Islands">Turks and Caicos Islands</option><option value="Tuvalu">Tuvalu</option><option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="United Arab Emirates">United Arab Emirates</option><option value="United Kingdom">United Kingdom</option><option value="United States">United States</option><option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option><option value="Uruguay">Uruguay</option><option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="Venezuela">Venezuela</option><option value="Viet Nam">Viet Nam</option><option value="Virgin Islands, British">Virgin Islands, British</option><option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option><option value="Wallis and Futuna">Wallis and Futuna</option><option value="Western Sahara">Western Sahara</option><option value="Yemen">Yemen</option><option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option></select></div></div><div class="form-group"><label class="col-sm-4 control-label" for="multiple-select">Multiple select <span class="help-block">Search enabled</span></label><div class="col-sm-8"><select multiple="" data-ui-jq="select2" data-ui-options="{minimumResultsForSearch: 10}" data-placeholder="Multiple countries this time" data-minimum-results-for-search="10" tabindex="-1" class="select2 form-control" id="multiple-select"><option value="United States">United States</option><option value="United Kingdom">United Kingdom</option><option value="Afghanistan">Afghanistan</option><option value="Albania">Albania</option><option value="Algeria">Algeria</option><option value="American Samoa">American Samoa</option><option value="Andorra">Andorra</option><option value="Angola">Angola</option><option value="Anguilla">Anguilla</option><option value="Antarctica">Antarctica</option><option value="Antigua and Barbuda">Antigua and Barbuda</option><option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Aruba">Aruba</option><option value="Australia">Australia</option><option value="Austria">Austria</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahamas">Bahamas</option><option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option><option value="Barbados">Barbados</option><option selected="selected" value="Belarus">Belarus</option><option value="Belgium">Belgium</option><option value="Belize">Belize</option><option value="Benin">Benin</option><option value="Bermuda">Bermuda</option><option value="Bhutan">Bhutan</option><option value="Bolivia">Bolivia</option><option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option><option value="Botswana">Botswana</option><option value="Bouvet Island">Bouvet Island</option><option value="Brazil">Brazil</option><option value="British Indian Ocean Territory">British Indian Ocean Territory</option><option value="Brunei Darussalam">Brunei Darussalam</option><option value="Bulgaria">Bulgaria</option><option value="Burkina Faso">Burkina Faso</option><option value="Burundi">Burundi</option><option value="Cambodia">Cambodia</option><option value="Cameroon">Cameroon</option><option value="Canada">Canada</option><option value="Cape Verde">Cape Verde</option><option value="Cayman Islands">Cayman Islands</option><option value="Central African Republic">Central African Republic</option><option value="Chad">Chad</option><option value="Chile">Chile</option><option value="China">China</option><option value="Christmas Island">Christmas Island</option><option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option><option value="Colombia">Colombia</option><option value="Comoros">Comoros</option><option value="Congo">Congo</option><option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option><option value="Cook Islands">Cook Islands</option><option value="Costa Rica">Costa Rica</option><option value="Cote D\'ivoire">Cote D\'ivoire</option><option value="Croatia">Croatia</option><option value="Cuba">Cuba</option><option value="Cyprus">Cyprus</option><option value="Czech Republic">Czech Republic</option><option value="Denmark">Denmark</option><option value="Djibouti">Djibouti</option><option value="Dominica">Dominica</option><option value="Dominican Republic">Dominican Republic</option><option value="Ecuador">Ecuador</option><option value="Egypt">Egypt</option><option value="El Salvador">El Salvador</option><option value="Equatorial Guinea">Equatorial Guinea</option><option value="Eritrea">Eritrea</option><option value="Estonia">Estonia</option><option value="Ethiopia">Ethiopia</option><option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option><option value="Faroe Islands">Faroe Islands</option><option value="Fiji">Fiji</option><option value="Finland">Finland</option><option value="France">France</option><option value="French Guiana">French Guiana</option><option value="French Polynesia">French Polynesia</option><option value="French Southern Territories">French Southern Territories</option><option value="Gabon">Gabon</option><option value="Gambia">Gambia</option><option value="Georgia">Georgia</option><option value="Germany">Germany</option><option value="Ghana">Ghana</option><option value="Gibraltar">Gibraltar</option><option value="Greece">Greece</option><option value="Greenland">Greenland</option><option value="Grenada">Grenada</option><option value="Guadeloupe">Guadeloupe</option><option value="Guam">Guam</option><option value="Guatemala">Guatemala</option><option value="Guinea">Guinea</option><option value="Guinea-bissau">Guinea-bissau</option><option value="Guyana">Guyana</option><option value="Haiti">Haiti</option><option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option><option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option><option value="Honduras">Honduras</option><option value="Hong Kong">Hong Kong</option><option value="Hungary">Hungary</option><option value="Iceland">Iceland</option><option value="India">India</option><option value="Indonesia">Indonesia</option><option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option><option value="Iraq">Iraq</option><option value="Ireland">Ireland</option><option value="Israel">Israel</option><option value="Italy">Italy</option><option value="Jamaica">Jamaica</option><option value="Japan">Japan</option><option value="Jordan">Jordan</option><option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option><option value="Kiribati">Kiribati</option><option value="Korea, Democratic People\'s Republic of">Korea, Democratic People\'s Republic of</option><option value="Korea, Republic of">Korea, Republic of</option><option value="Kuwait">Kuwait</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Lao People\'s Democratic Republic">Lao People\'s Democratic Republic</option><option value="Latvia">Latvia</option><option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option><option value="Liberia">Liberia</option><option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option><option value="Liechtenstein">Liechtenstein</option><option value="Lithuania">Lithuania</option><option value="Luxembourg">Luxembourg</option><option value="Macao">Macao</option><option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option><option value="Madagascar">Madagascar</option><option value="Malawi">Malawi</option><option value="Malaysia">Malaysia</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option><option value="Malta">Malta</option><option value="Marshall Islands">Marshall Islands</option><option value="Martinique">Martinique</option><option value="Mauritania">Mauritania</option><option value="Mauritius">Mauritius</option><option value="Mayotte">Mayotte</option><option value="Mexico">Mexico</option><option value="Micronesia, Federated States of">Micronesia, Federated States of</option><option value="Moldova, Republic of">Moldova, Republic of</option><option value="Monaco">Monaco</option><option value="Mongolia">Mongolia</option><option value="Montenegro">Montenegro</option><option value="Montserrat">Montserrat</option><option value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option><option value="Myanmar">Myanmar</option><option value="Namibia">Namibia</option><option value="Nauru">Nauru</option><option value="Nepal">Nepal</option><option value="Netherlands">Netherlands</option><option value="Netherlands Antilles">Netherlands Antilles</option><option value="New Caledonia">New Caledonia</option><option value="New Zealand">New Zealand</option><option value="Nicaragua">Nicaragua</option><option value="Niger">Niger</option><option value="Nigeria">Nigeria</option><option value="Niue">Niue</option><option value="Norfolk Island">Norfolk Island</option><option value="Northern Mariana Islands">Northern Mariana Islands</option><option value="Norway">Norway</option><option value="Oman">Oman</option><option value="Pakistan">Pakistan</option><option value="Palau">Palau</option><option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option><option value="Panama">Panama</option><option value="Papua New Guinea">Papua New Guinea</option><option value="Paraguay">Paraguay</option><option value="Peru">Peru</option><option value="Philippines">Philippines</option><option value="Pitcairn">Pitcairn</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option><option value="Puerto Rico">Puerto Rico</option><option value="Qatar">Qatar</option><option value="Reunion">Reunion</option><option value="Romania">Romania</option><option value="Russian Federation">Russian Federation</option><option value="Rwanda">Rwanda</option><option value="Saint Helena">Saint Helena</option><option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option><option value="Saint Lucia">Saint Lucia</option><option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option><option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option><option value="Samoa">Samoa</option><option value="San Marino">San Marino</option><option value="Sao Tome and Principe">Sao Tome and Principe</option><option value="Saudi Arabia">Saudi Arabia</option><option value="Senegal">Senegal</option><option value="Serbia">Serbia</option><option value="Seychelles">Seychelles</option><option value="Sierra Leone">Sierra Leone</option><option value="Singapore">Singapore</option><option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="Solomon Islands">Solomon Islands</option><option value="Somalia">Somalia</option><option value="South Africa">South Africa</option><option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option><option value="South Sudan">South Sudan</option><option value="Spain">Spain</option><option value="Sri Lanka">Sri Lanka</option><option value="Sudan">Sudan</option><option value="Suriname">Suriname</option><option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option><option value="Swaziland">Swaziland</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option><option value="Syrian Arab Republic">Syrian Arab Republic</option><option value="Taiwan, Republic of China">Taiwan, Republic of China</option><option value="Tajikistan">Tajikistan</option><option value="Tanzania, United Republic of">Tanzania, United Republic of</option><option value="Thailand">Thailand</option><option value="Timor-leste">Timor-leste</option><option value="Togo">Togo</option><option value="Tokelau">Tokelau</option><option value="Tonga">Tonga</option><option value="Trinidad and Tobago">Trinidad and Tobago</option><option value="Tunisia">Tunisia</option><option value="Turkey">Turkey</option><option value="Turkmenistan">Turkmenistan</option><option value="Turks and Caicos Islands">Turks and Caicos Islands</option><option value="Tuvalu">Tuvalu</option><option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="United Arab Emirates">United Arab Emirates</option><option value="United Kingdom">United Kingdom</option><option value="United States">United States</option><option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option><option value="Uruguay">Uruguay</option><option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="Venezuela">Venezuela</option><option value="Viet Nam">Viet Nam</option><option value="Virgin Islands, British">Virgin Islands, British</option><option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option><option value="Wallis and Futuna">Wallis and Futuna</option><option value="Western Sahara">Western Sahara</option><option value="Yemen">Yemen</option><option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option></select></div></div><div class="form-group"><label class="col-sm-4 control-label" for="grouped-select">Select with groups</label><div class="col-sm-8"><select data-placeholder="Your Favorite Football Team" multiple="" tabindex="-1" data-ui-jq="select2" data-ui-options="{minimumResultsForSearch: 10}" class="select2 form-control" id="grouped-select"><option value=""></option><optgroup label="NFC EAST"><option>Dallas Cowboys</option><option>New York Giants</option><option>Philadelphia Eagles</option><option>Washington Redskins</option></optgroup><optgroup label="NFC NORTH"><option>Chicago Bears</option><option>Detroit Lions</option><option>Green Bay Packers</option><option>Minnesota Vikings</option></optgroup><optgroup label="NFC SOUTH"><option>Atlanta Falcons</option><option>Carolina Panthers</option><option>New Orleans Saints</option><option>Tampa Bay Buccaneers</option></optgroup><optgroup label="NFC WEST"><option>Arizona Cardinals</option><option>St. Louis Rams</option><option>San Francisco 49ers</option><option>Seattle Seahawks</option></optgroup><optgroup label="AFC EAST"><option>Buffalo Bills</option><option>Miami Dolphins</option><option>New England Patriots</option><option>New York Jets</option></optgroup><optgroup label="AFC NORTH"><option>Baltimore Ravens</option><option>Cincinnati Bengals</option><option>Cleveland Browns</option><option>Pittsburgh Steelers</option></optgroup><optgroup label="AFC SOUTH"><option>Houston Texans</option><option>Indianapolis Colts</option><option>Jacksonville Jaguars</option><option>Tennessee Titans</option></optgroup><optgroup label="AFC WEST"><option>Denver Broncos</option><option>Kansas City Chiefs</option><option>Oakland Raiders</option><option>San Diego Chargers</option></optgroup></select></div></div></fieldset><fieldset><legend>Dropdown based colored selects</legend><div class="form-group"><label class="col-sm-4 control-label" for="simple-select">Simple select</label><div class="col-sm-8"><select class="selectpicker" data-selectpicker="" data-style="btn-default" data-width="auto" tabindex="-1" id="simple-select"><option value="0">Option One</option><option value="1">Option Two</option><option value="2">Option Three</option></select><span class="help-block">Auto size</span></div></div><div class="form-group"><label class="col-sm-4 control-label" for="simple-red-select">Colored ones <span class="help-block">A bit of Japanese</span></label><div class="col-sm-8"><select class="selectpicker" data-selectpicker="" data-style="btn-danger btn-sm" data-width="auto" tabindex="-1" id="simple-red-select"><option value="0">Ichi</option><option value="1">Ni</option><option value="2">San</option></select><select class="selectpicker" data-selectpicker="" data-style="btn-warning btn-sm" data-width="auto" tabindex="-1" id="simple-orange-select"><option value="0">Shi</option><option value="1">Go</option><option value="2">Roku</option></select><select class="selectpicker" data-selectpicker="" data-style="btn-success btn-sm" data-width="auto" tabindex="-1" id="simple-green-select"><option value="0">Hichi</option><option value="1">Hachi</option><option value="2">Ku</option><option value="3">Ju</option></select></div></div><div class="form-group"><label class="col-sm-4 control-label" for="simple-big-select">Big One <span class="help-block">Size can be controlled with <code>.btn-lg</code> & <code>.btn-sm</code></span></label><div class="col-sm-8"><select class="selectpicker" data-selectpicker="" data-style="btn-default btn-lg" tabindex="-1" id="simple-big-select"><option value="0">Fourth Item</option><option value="1">Fifth Item</option><option value="2">Sixth item</option></select></div></div></fieldset></form></div></section></div></div><div class="row"><div class="col-md-12"><section class="widget"><header><h5>Checkbox <strong>Controls</strong></h5><div class="widget-controls"><a class="bg-gray-transparent" href="#"><i class="glyphicon glyphicon-cog text-white"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><form role="form"><div class="row"><div class="col-md-4"><fieldset><legend>Basic</legend><p>Supports bootstrap brand colors: <code>.checkbox-primary</code>, <code>.checkbox-info</code> etc. Pure <abbr title="Cascading Style Sheet">css</abbr> solution with no javascript. Let your checkboxes shine!</p><div class="checkbox"><input id="checkbox1" type="checkbox"> <label for="checkbox1">Default</label></div><div class="checkbox checkbox-primary"><input id="checkbox2" type="checkbox" checked=""> <label for="checkbox2">Primary</label></div><div class="checkbox checkbox-success"><input id="checkbox3" type="checkbox"> <label for="checkbox3">Success</label></div><div class="checkbox checkbox-info"><input id="checkbox4" type="checkbox" checked=""> <label for="checkbox4">Info</label></div><div class="checkbox checkbox-warning"><input id="checkbox5" type="checkbox"> <label for="checkbox5">Warning</label></div><div class="checkbox checkbox-danger"><input id="checkbox6" type="checkbox" checked=""> <label for="checkbox6">Check me out</label></div></fieldset></div><div class="col-md-4"><fieldset><legend>Circled</legend><p><code>.checkbox-circle</code> for roundness. No more sad controls controls. Check out this brand-new rounded checkboxes!</p><div class="checkbox checkbox-circle"><input id="checkbox7" type="checkbox"> <label for="checkbox7">Simply Rounded</label></div><div class="checkbox checkbox-info checkbox-circle"><input id="checkbox8" type="checkbox" checked=""> <label for="checkbox8">Me too</label></div></fieldset></div><div class="col-md-4"><fieldset><legend>Disabled</legend><p>Disabled state also supported. Full stack checkbox functionality.</p><div class="checkbox"><input id="checkbox9" type="checkbox" disabled=""> <label for="checkbox9">Can\'t check this</label></div><div class="checkbox checkbox-success"><input id="checkbox10" type="checkbox" disabled="" checked=""> <label for="checkbox10">This too</label></div><div class="checkbox checkbox-warning checkbox-circle"><input id="checkbox11" type="checkbox" disabled="" checked=""> <label for="checkbox11">And this</label></div></fieldset></div></div><p class="fs-mini">Built with <a href="https://github.com/flatlogic/awesome-bootstrap-checkbox" target="_blank">awesome-bootstrap-checkbox</a>.</p></form></div></section></div></div><div class="row"><div class="col-md-12"><section class="widget"><header><h5>Radio <strong>Controls</strong></h5><div class="widget-controls"><a class="bg-gray-transparent" href="#"><i class="glyphicon glyphicon-cog text-white"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><form role="form"><div class="row"><div class="col-md-4"><fieldset><legend>Basic</legend><p>Supports bootstrap brand colors: <code>.radio-primary</code>, <code>.radio-danger</code> etc. Pure css solution with no javascript. Let your radios shine!</p><div class="row"><div class="col-sm-6"><div class="radio"><input type="radio" name="radio1" id="radio1" value="option1" checked=""> <label for="radio1">Small</label></div><div class="radio"><input type="radio" name="radio1" id="radio2" value="option2"> <label for="radio2">Big</label></div></div><div class="col-sm-6"><div class="radio radio-danger"><input type="radio" name="radio2" id="radio3" value="option1"> <label for="radio3">Next</label></div><div class="radio radio-danger"><input type="radio" name="radio2" id="radio4" value="option2" checked=""> <label for="radio4">One</label></div></div></div></fieldset></div><div class="col-md-4"><fieldset><legend>Disabled</legend><p>Disabled state also supported. Full stack radios functionality.</p><div class="radio"><input type="radio" name="radio3" id="radio5" value="option1" disabled=""> <label for="radio5">Next</label></div><div class="radio radio-warning"><input type="radio" name="radio3" id="radio6" value="option2" checked="" disabled=""> <label for="radio6">One</label></div></fieldset></div><div class="col-md-4"><fieldset><legend>Cool iOS-like switches</legend><p>Simple component that helps you turn your default HTML checkbox inputs into beautiful iOS 7 style switches in just few simple steps.</p><div class="checkbox-inline checkbox-ios"><label for="checkbox-ios1"><input type="checkbox" id="checkbox-ios1" data-ui-switch="" data-ng-init="switchery1 = true" data-ng-model="switchery1"></label></div><div class="checkbox-inline checkbox-ios"><label for="checkbox-ios2"><input type="checkbox" data-ui-switch="" data-ng-model="switchery2" id="checkbox-ios2"></label></div></fieldset></div></div></form></div></section></div></div><div class="row"><div class="col-md-6"><section class="widget"><header><h5>Pickers</h5><div class="widget-controls"><a class="bg-gray-transparent" href="#"><i class="glyphicon glyphicon-cog text-white"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><form role="form"><fieldset><legend>Date & Time</legend><div class="form-group"><label for="datetimepicker1">In place <span class="help-block">With angular callbacks</span></label> <input id="datetimepicker1" data-ui-jq="datetimepicker" data-ui-options="{ format: \'MM/DD/YYYY\' }" data-ng-init="dt = \'09/13/2014\'" data-ng-model="dt" data-ng-change="dtChanged(dt)" type="text" class="form-control"></div><div class="form-group"><label for="datepicker2i">Time-enabled <span class="help-block">Can be customized for both 24 hour and 12 hour clocks.</span></label><div id="datetimepicker2" class="input-group"><input id="datepicker2i" type="text" class="form-control"> <a class="input-group-addon btn btn-success"><span class="glyphicon glyphicon-calendar"></span></a></div></div></fieldset><fieldset><legend>Colors</legend><div class="form-group"><label for="colorpickeri">Simple select <span class="help-block">Colorpicker plugin for Twitter Bootstrap, originally written by Stefan Petre</span></label><div id="colorpicker" class="input-group" data-ui-jq="colorpicker" data-ui-options="{color: \'#f0b518\'}"><input type="text" value="" class="form-control" id="colorpickeri"> <span class="input-group-addon"><i></i></span></div></div></fieldset></form></div></section></div><div class="col-md-6"><section class="widget"><header><h5>Input <strong>Masks</strong></h5><div class="widget-controls"><a class="bg-gray-transparent" href="#"><i class="glyphicon glyphicon-cog text-white"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><form role="form" class="form-horizontal form-label-left"><fieldset><legend>Masked inputs</legend><div class="form-group"><label class="control-label col-sm-4" for="mask-phone">Phone <span class="help-block">(123) 456-7890</span></label><div class="col-sm-7"><input id="mask-phone" type="text" data-ui-jq="inputmask" data-ui-options="{mask: \'(999) 999-9999\'}" class="form-control"></div></div><div class="form-group"><label class="control-label col-sm-4" for="mask-int-phone">International Phone <span class="help-block">+375 123 456 789</span></label><div class="col-sm-7"><input id="mask-int-phone" data-ui-jq="inputmask" data-ui-options="{mask: \'+999 999 999 999\'}" type="text" class="form-control"></div></div><div class="form-group"><label class="control-label col-sm-4" for="mask-date">Date Format <span class="help-block">07-03-2013</span></label><div class="col-sm-7"><input id="mask-date" data-ui-jq="inputmask" data-ui-options="{mask: \'99-99-999\'}" type="text" class="form-control"></div></div><div class="form-group"><label class="control-label col-sm-4" for="mask-time">Time <span class="help-block">13:43</span></label><div class="col-sm-7"><input id="mask-time" data-ui-jq="inputmask" data-ui-options="{mask: \'99:99\'}" type="text" class="form-control"></div></div></fieldset></form></div></section></div></div><div class="row"><div class="col-md-12"><section class="widget"><header><h5>Sliders</h5><div class="widget-controls"><a class="bg-gray-transparent" href="#"><i class="glyphicon glyphicon-cog text-white"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><div class="row"><div class="col-md-4"><h4>Color Options</h4><p>Sing extends Bootstrap Slider and provides different color options:</p><form><div class="mb-sm"><input class="js-slider" data-ui-jq="slider" id="slider-ex1" data-slider-id="ex1Slider" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"></div><div class="slider-danger mb-sm"><input class="js-slider" data-ui-jq="slider" id="slider-ex2" data-slider-id="ex2Slider" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="18"></div><div class="slider-warning mb-sm"><input class="js-slider" data-ui-jq="slider" id="slider-ex3" data-slider-id="ex3Slider" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="7"></div><div class="slider-success mb-sm"><input class="js-slider" data-ui-jq="slider" id="slider-ex4" data-slider-id="ex4Slider" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="11"></div><div class="slider-inverse mb-sm"><input class="js-slider" data-ui-jq="slider" id="slider-ex5" data-slider-id="ex5Slider" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="4"></div></form></div><div class="col-md-4"><h4>Slider Orientation</h4><p>Vertical orientation is also possible. Simply changing <strong>data-slider-orientation</strong> attribute does the thing.</p><form><div class="row"><div class="col-sm-8 col-sm-offset-2"><input class="js-slider" data-ui-jq="slider" id="slider-ex6" data-slider-orientation="vertical" data-slider-id="ex6Slider" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"> &nbsp;&nbsp;&nbsp;&nbsp; <span class="slider-inverse"><input class="js-slider" data-ui-jq="slider" id="slider-ex7" data-slider-orientation="vertical" data-slider-id="ex7Slider" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="18"></span> &nbsp;&nbsp;&nbsp;&nbsp; <span class=""><input class="js-slider" data-ui-jq="slider" id="slider-ex8" data-slider-orientation="vertical" data-slider-id="ex8Slider" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="7"></span> &nbsp;&nbsp;&nbsp;&nbsp; <span class="slider-inverse"><input class="js-slider" data-ui-jq="slider" id="slider-ex9" data-slider-orientation="vertical" data-slider-id="ex9Slider" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="11"></span> &nbsp;&nbsp;&nbsp;&nbsp; <span class=""><input class="js-slider" data-ui-jq="slider" id="slider-ex10" data-slider-orientation="vertical" data-slider-id="ex10Slider" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="4"></span></div></div></form></div><div class="col-md-4" data-ng-init="counter = 5;"><h4>Range Selector</h4><p>Range selector, options specified via <strong>data-slider-value</strong> attribute as an array. Price range selector:</p><form><span class="slider-warning"><input class="js-slider" data-ng-init="sliderValue = [200,1547]" data-ui-jq="slider" data-ui-event="{ slide: \'sliderValue = $event.value\' }" id="slider-ex11" data-slider-id="ex11Slider" type="text" data-slider-min="0" data-slider-max="2000" data-slider-step="1" data-slider-value="{{sliderValue}}"> &nbsp; <small>{ {{sliderValue}} }</small></span></form></div></div></div></section></div></div><div class="row"><div class="col-md-6"><section class="widget"><header><h5>Simple <strong>file uploads</strong></h5><div class="widget-controls"><a class="bg-gray-transparent" href="#"><i class="glyphicon glyphicon-cog text-white"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><form class="form-horizontal" role="form"><fieldset><blockquote class="blockquote-reverse"><p>The man who is really serious, with the urge to find out what truth is, has no style at all. He lives only in what is.</p><footer>Bruce Lee</footer></blockquote><div class="form-group"><label class="control-label col-sm-4" for="fileupload1">File input widget</label><div class="col-sm-8"><div class="fileinput fileinput-new input-group" data-ui-jq="fileinput" data-ui-options="{\'name\': \'jasnyf1\'}"><div class="form-control" data-trigger="fileinput"><i class="glyphicon glyphicon-file fileinput-exists"></i> <span class="fileinput-filename"></span></div><span class="input-group-addon btn btn-default btn-file"><span class="fileinput-new">Select file</span> <span class="fileinput-exists">Change</span> <input id="fileupload1" type="file"></span> <a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a></div><span class="help-block">Awesome file input plugin allows you to create a visually appealing file or image inputs.</span></div></div><div class="form-group"><label class="control-label col-sm-4" for="fileupload1">Image upload widget</label><div class="col-sm-8"><div class="fileinput fileinput-new" data-ui-jq="fileinput" data-ui-options="{\'name\': \'jasnyf2\'}"><div class="fileinput-new thumbnail" style="width: 200px; height: 150px;"><img holderjs="" data-src="holder.js/100%x100%" alt="..." src=""></div><div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div><div><span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="..."></span> <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a></div></div><span class="help-block">Showing a thumbnail instead of the filename when uploading an image.</span></div></div></fieldset></form></div></section></div><div class="col-md-6"><section class="widget"><header><h5><strong>Drop</strong> Zone</h5><div class="widget-controls"><a class="bg-gray-transparent" href="#"><i class="glyphicon glyphicon-cog text-white"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><form class="dropzone" data-dropzone="" action="#" id="my-awesome-dropzone"></form></div></section></div></div></div>'),
            a.put("app/modules/form-validation/form-validation.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">Form Validation</li></ol><h1 class="page-title">Form - <span class="fw-semi-bold">Validation</span></h1><div class="row"><div class="col-md-8 col-md-offset-1"><section class="widget"><header><h4>Dead simple validation <small>No JS needed to tune-up</small></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a data-widgster="close" title="Close" href="#"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><form class="form-horizontal form-label-left" method="post" data-ui-jq="parsley" data-parsley-priority-enabled="false" novalidate="novalidate"><fieldset><legend>By default validation is started only after at least 3 characters have been input.</legend><div class="form-group"><label class="control-label col-sm-3" for="basic">Simple required</label><div class="col-sm-9"><input type="text" id="basic" name="basic" class="form-control" required="required"></div></div><div class="form-group"><label class="control-label col-sm-3" for="basic-change">Min-length On Change <span class="help-block">At least 10</span></label><div class="col-sm-9"><input type="text" id="basic-change" name="basic-change" class="form-control" data-parsley-trigger="change" data-parsley-minlength="10" required="required"></div></div></fieldset><fieldset><legend><span class="label label-warning text-gray-dark mr-xs">HTML5</span> input types supported</legend><div class="form-group"><label class="control-label col-sm-3" for="email">E-mail</label><div class="col-sm-9"><input type="email" id="email" name="email" class="form-control" data-parsley-trigger="change" data-parsley-validation-threshold="1" required="required"> <span class="help-block">This one is triggered even when 1 character has been input</span></div></div><div class="form-group"><label class="control-label col-sm-3" for="number">Number</label><div class="col-sm-9"><input type="text" id="number" name="number" class="form-control" data-parsley-type="number" required="required"></div></div><div class="form-group"><label class="control-label col-sm-3" for="range">Range</label><div class="col-sm-9"><input type="text" class="form-control" id="range" name="range" data-parsley-range="[10, 100]" data-parsley-trigger="change" data-parsley-validation-threshold="1" required="required"></div></div></fieldset><fieldset><legend>More validation</legend><div class="form-group"><label class="control-label col-sm-3" for="password">Password helpers</label><div class="col-sm-9"><input type="password" id="password" name="password" class="form-control mb-sm" data-parsley-trigger="change" data-parsley-minlength="6" required="required"> <input type="password" id="password-r" name="password-r" class="form-control" data-parsley-trigger="change" data-parsley-minlength="6" data-parsley-equalto="#password" required="required"></div></div><div class="form-group"><label class="control-label col-sm-3" for="website">Website</label><div class="col-sm-9"><input type="text" id="website" name="website" class="form-control" data-parsley-trigger="change" data-parsley-type="url" required="required"></div></div></fieldset><div class="form-actions"><button type="submit" class="btn btn-danger btn-rounded pull-right">Validate &amp; Submit</button> <button type="button" class="btn btn-default btn-rounded">Cancel</button></div></form></div></section></div></div>'), a.put("app/modules/form-wizard/form-wizard.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">Form Wizard</li></ol><h1 class="page-title">Form - <span class="fw-semi-bold">Wizards</span></h1><div class="row"><div class="col-md-12"><section class="widget"><header><h4>Wizard <small>Tunable widget</small></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a data-widgster="close" title="Close" href="#"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><div class="row"><div class="col-md-8"><h4>Inpage <strong>Wizard</strong></h4><p>An example of complete wizard form in widget.</p><div data-bootstrap-wizard="" data-height="444" class="form-wizard"><ul class="nav-justified mb-sm"><li><a href="#tab1" data-toggle="tab"><small>1.</small> Your Details</a></li><li><a href="#tab2" data-toggle="tab"><small>2.</small> Shipping</a></li><li><a href="#tab3" data-toggle="tab"><small>3.</small> Pay</a></li><li><a href="#tab4" data-toggle="tab"><small>4.</small> Thank you!</a></li></ul><div id="bar" class="progress progress-xs"><div class="progress-bar progress-bar-gray-light"></div></div><div class="tab-content"><div class="tab-pane bg-gray-lighter" id="tab1"><form action="" method="POST" data-parsley-priority-enabled="false" novalidate="novalidate"><fieldset><div class="form-group"><label for="username">Username</label> <input type="text" id="username" name="username" placeholder="" class="form-control" required="required"> <span class="help-block">Username can contain any letters or numbers, without spaces</span></div><div class="form-group"><label for="email">Email</label> <input type="email" id="email" name="email" placeholder="" class="form-control" data-parsley-trigger="change" required="required"> <span class="help-block">Please provide your E-mail</span></div><div class="form-group"><label for="address">Address</label> <input type="text" id="address" name="address" placeholder="" class="form-control"> <span class="help-block">Please provide your address</span></div></fieldset></form></div><div class="tab-pane bg-gray-lighter" id="tab2"><form action="" method="POST" data-parsley-priority-enabled="false" novalidate="novalidate"><fieldset><div class="form-group"><label for="country-select">Destination Country</label><select id="country-select" data-placeholder="Choose a Country..." class="form-control chzn-select" data-ui-jq="select2"><option value=""></option><option value="United States">United States</option><option value="United Kingdom">United Kingdom</option><option value="Afghanistan">Afghanistan</option><option value="Albania">Albania</option><option value="Algeria">Algeria</option><option value="American Samoa">American Samoa</option><option value="Andorra">Andorra</option><option value="Angola">Angola</option><option value="Anguilla">Anguilla</option><option value="Antarctica">Antarctica</option><option value="Antigua and Barbuda">Antigua and Barbuda</option><option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Aruba">Aruba</option><option value="Australia">Australia</option><option value="Austria">Austria</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahamas">Bahamas</option><option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option><option value="Barbados">Barbados</option><option value="Belarus">Belarus</option><option value="Belgium">Belgium</option><option value="Belize">Belize</option><option value="Benin">Benin</option><option value="Bermuda">Bermuda</option><option value="Bhutan">Bhutan</option><option value="Bolivia">Bolivia</option><option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option><option value="Botswana">Botswana</option><option value="Bouvet Island">Bouvet Island</option><option value="Brazil">Brazil</option><option value="British Indian Ocean Territory">British Indian Ocean Territory</option><option value="Brunei Darussalam">Brunei Darussalam</option><option value="Bulgaria">Bulgaria</option><option value="Burkina Faso">Burkina Faso</option><option value="Burundi">Burundi</option><option value="Cambodia">Cambodia</option><option value="Cameroon">Cameroon</option><option value="Canada">Canada</option><option value="Cape Verde">Cape Verde</option><option value="Cayman Islands">Cayman Islands</option><option value="Central African Republic">Central African Republic</option><option value="Chad">Chad</option><option value="Chile">Chile</option><option value="China">China</option><option value="Christmas Island">Christmas Island</option><option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option><option value="Colombia">Colombia</option><option value="Comoros">Comoros</option><option value="Congo">Congo</option><option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option><option value="Cook Islands">Cook Islands</option><option value="Costa Rica">Costa Rica</option><option value="Cote D\'ivoire">Cote D\'ivoire</option><option value="Croatia">Croatia</option><option value="Cuba">Cuba</option><option value="Cyprus">Cyprus</option><option value="Czech Republic">Czech Republic</option><option value="Denmark">Denmark</option><option value="Djibouti">Djibouti</option><option value="Dominica">Dominica</option><option value="Dominican Republic">Dominican Republic</option><option value="Ecuador">Ecuador</option><option value="Egypt">Egypt</option><option value="El Salvador">El Salvador</option><option value="Equatorial Guinea">Equatorial Guinea</option><option value="Eritrea">Eritrea</option><option value="Estonia">Estonia</option><option value="Ethiopia">Ethiopia</option><option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option><option value="Faroe Islands">Faroe Islands</option><option value="Fiji">Fiji</option><option value="Finland">Finland</option><option value="France">France</option><option value="French Guiana">French Guiana</option><option value="French Polynesia">French Polynesia</option><option value="French Southern Territories">French Southern Territories</option><option value="Gabon">Gabon</option><option value="Gambia">Gambia</option><option value="Georgia">Georgia</option><option value="Germany">Germany</option><option value="Ghana">Ghana</option><option value="Gibraltar">Gibraltar</option><option value="Greece">Greece</option><option value="Greenland">Greenland</option><option value="Grenada">Grenada</option><option value="Guadeloupe">Guadeloupe</option><option value="Guam">Guam</option><option value="Guatemala">Guatemala</option><option value="Guinea">Guinea</option><option value="Guinea-bissau">Guinea-bissau</option><option value="Guyana">Guyana</option><option value="Haiti">Haiti</option><option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option><option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option><option value="Honduras">Honduras</option><option value="Hong Kong">Hong Kong</option><option value="Hungary">Hungary</option><option value="Iceland">Iceland</option><option value="India">India</option><option value="Indonesia">Indonesia</option><option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option><option value="Iraq">Iraq</option><option value="Ireland">Ireland</option><option value="Israel">Israel</option><option value="Italy">Italy</option><option value="Jamaica">Jamaica</option><option value="Japan">Japan</option><option value="Jordan">Jordan</option><option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option><option value="Kiribati">Kiribati</option><option value="Korea, Democratic People\'s Republic of">Korea, Democratic People\'s Republic of</option><option value="Korea, Republic of">Korea, Republic of</option><option value="Kuwait">Kuwait</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Lao People\'s Democratic Republic">Lao People\'s Democratic Republic</option><option value="Latvia">Latvia</option><option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option><option value="Liberia">Liberia</option><option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option><option value="Liechtenstein">Liechtenstein</option><option value="Lithuania">Lithuania</option><option value="Luxembourg">Luxembourg</option><option value="Macao">Macao</option><option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option><option value="Madagascar">Madagascar</option><option value="Malawi">Malawi</option><option value="Malaysia">Malaysia</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option><option value="Malta">Malta</option><option value="Marshall Islands">Marshall Islands</option><option value="Martinique">Martinique</option><option value="Mauritania">Mauritania</option><option value="Mauritius">Mauritius</option><option value="Mayotte">Mayotte</option><option value="Mexico">Mexico</option><option value="Micronesia, Federated States of">Micronesia, Federated States of</option><option value="Moldova, Republic of">Moldova, Republic of</option><option value="Monaco">Monaco</option><option value="Mongolia">Mongolia</option><option value="Montenegro">Montenegro</option><option value="Montserrat">Montserrat</option><option value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option><option value="Myanmar">Myanmar</option><option value="Namibia">Namibia</option><option value="Nauru">Nauru</option><option value="Nepal">Nepal</option><option value="Netherlands">Netherlands</option><option value="Netherlands Antilles">Netherlands Antilles</option><option value="New Caledonia">New Caledonia</option><option value="New Zealand">New Zealand</option><option value="Nicaragua">Nicaragua</option><option value="Niger">Niger</option><option value="Nigeria">Nigeria</option><option value="Niue">Niue</option><option value="Norfolk Island">Norfolk Island</option><option value="Northern Mariana Islands">Northern Mariana Islands</option><option value="Norway">Norway</option><option value="Oman">Oman</option><option value="Pakistan">Pakistan</option><option value="Palau">Palau</option><option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option><option value="Panama">Panama</option><option value="Papua New Guinea">Papua New Guinea</option><option value="Paraguay">Paraguay</option><option value="Peru">Peru</option><option value="Philippines">Philippines</option><option value="Pitcairn">Pitcairn</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option><option value="Puerto Rico">Puerto Rico</option><option value="Qatar">Qatar</option><option value="Reunion">Reunion</option><option value="Romania">Romania</option><option value="Russian Federation">Russian Federation</option><option value="Rwanda">Rwanda</option><option value="Saint Helena">Saint Helena</option><option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option><option value="Saint Lucia">Saint Lucia</option><option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option><option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option><option value="Samoa">Samoa</option><option value="San Marino">San Marino</option><option value="Sao Tome and Principe">Sao Tome and Principe</option><option value="Saudi Arabia">Saudi Arabia</option><option value="Senegal">Senegal</option><option value="Serbia">Serbia</option><option value="Seychelles">Seychelles</option><option value="Sierra Leone">Sierra Leone</option><option value="Singapore">Singapore</option><option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="Solomon Islands">Solomon Islands</option><option value="Somalia">Somalia</option><option value="South Africa">South Africa</option><option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option><option value="South Sudan">South Sudan</option><option value="Spain">Spain</option><option value="Sri Lanka">Sri Lanka</option><option value="Sudan">Sudan</option><option value="Suriname">Suriname</option><option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option><option value="Swaziland">Swaziland</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option><option value="Syrian Arab Republic">Syrian Arab Republic</option><option value="Taiwan, Republic of China">Taiwan, Republic of China</option><option value="Tajikistan">Tajikistan</option><option value="Tanzania, United Republic of">Tanzania, United Republic of</option><option value="Thailand">Thailand</option><option value="Timor-leste">Timor-leste</option><option value="Togo">Togo</option><option value="Tokelau">Tokelau</option><option value="Tonga">Tonga</option><option value="Trinidad and Tobago">Trinidad and Tobago</option><option value="Tunisia">Tunisia</option><option value="Turkey">Turkey</option><option value="Turkmenistan">Turkmenistan</option><option value="Turks and Caicos Islands">Turks and Caicos Islands</option><option value="Tuvalu">Tuvalu</option><option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="United Arab Emirates">United Arab Emirates</option><option value="United Kingdom">United Kingdom</option><option value="United States">United States</option><option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option><option value="Uruguay">Uruguay</option><option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="Venezuela">Venezuela</option><option value="Viet Nam">Viet Nam</option><option value="Virgin Islands, British">Virgin Islands, British</option><option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option><option value="Wallis and Futuna">Wallis and Futuna</option><option value="Western Sahara">Western Sahara</option><option value="Yemen">Yemen</option><option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option></select><span class="help-block">Please choose your country destination</span></div><div class="form-group"><label for="courier">Choose shipping option</label><select id="courier" data-placeholder="Choose an option.." class="form-control chzn-select" data-ui-jq="select2"><option value=""></option><option value="Australia Post">Australia Post</option><option value="DHL US">DHL US</option><option value="Other">Other</option></select><span class="help-block">Please choose your shipping option</span></div><div class="form-group"><label for="destination">Destination Zip Code</label> <input type="text" id="destination" data-ui-jq="inputmask" data-ui-options="{mask: \'99999\'}" name="destination" placeholder="" class="form-control" required="required"> <span class="help-block">Please provide your Destination Zip Code</span></div><div class="form-group"><label for="dest-address">Destination Address</label> <input type="text" id="dest-address" name="address" placeholder="" class="form-control"> <span class="help-block">Please provide the destination address</span></div></fieldset></form></div><div class="tab-pane bg-gray-lighter" id="tab3"><form action="" method="POST"><fieldset><div class="form-group"><label for="name">Name on the Card</label> <input type="text" id="name" name="name" placeholder="" class="form-control" required="required"></div><div class="form-group"><label for="credit-card-type">Credit Card Type</label><select id="credit-card-type" data-placeholder="Please select.." class="form-control chzn-select" data-ui-jq="select2" required="required"><option value=""></option><option value="Visa">Visa</option><option value="Mastercard">Mastercard</option><option value="Other">Other</option></select></div><div class="form-group"><label for="credit">Credit Card Number</label> <input id="credit" type="text" data-ui-jq="inputmask" data-ui-options="{mask: \'9999-9999-9999-9999\'}" tabindex="3" class="form-control" required="required"></div><div class="form-group"><label for="expiration-date">Expiration Date</label> <input type="text" id="expiration-date" data-ui-jq="datetimepicker" data-ui-options="{ format: \'MM/DD/YYYY\' }" class="form-control" required="required"></div></fieldset></form></div><div class="tab-pane bg-gray-lighter" id="tab4"><h2>Thank you!</h2><p>Your submission has been received.</p></div><ul class="pager wizard"><li class="previous"><button class="btn btn-default btn-rounded pull-left"><i class="fa fa-caret-left"></i> &nbsp; Previous</button></li><li class="next"><button class="btn btn-primary btn-rounded pull-right">Next &nbsp; <i class="fa fa-caret-right"></i></button></li><li class="finish" style="display: none"><button class="btn btn-success btn-rounded pull-right">Finish &nbsp; <i class="glyphicon glyphicon-ok"></i></button></li></ul></div></div></div><div class="col-md-4"><h4>Modal <strong>Application Wizard</strong></h4><p>An example of complete wizard form in a modal.</p><button class="btn btn-info btn-rounded" id="open-wizard" type="button">Launch Wizard</button><div class="wizard" data-bootstrap-application-wizard="" data-title="Create Server"><div class="wizard-card" data-cardname="name"><h3>Name & FQDN</h3><div class="wizard-input-section"><div class="form-group"><div class="col-sm-6"><input type="text" class="form-control" id="label" name="label" placeholder="Server label" data-validate="validateServerLabel"></div></div></div><div class="wizard-input-section"><p>Full Qualified Domain Name</p><div class="form-group"><div class="col-sm-8"><div class="input-group"><input type="text" class="form-control" id="fqdn" name="fqdn" placeholder="FQDN" data-validate="validateFQDN" data-is-valid="0" data-lookup="0"> <span class="input-group-btn" id="btn-fqdn"><button class="btn btn-default" type="button" onclick="lookup();">Lookup</button></span></div></div></div></div><div class="wizard-input-section"><p>Server ip.</p><div class="form-group"><div class="col-sm-8"><input type="text" class="form-control" id="ip" name="ip" placeholder="IP" data-serialize="1"></div></div></div></div><div class="wizard-card" data-cardname="group"><h3>Server Group</h3><div class="wizard-input-section"><p>Where would you like server <strong class="create-server-name"></strong> to go?</p><img class="wizard-group-list" src="../assets/bootstrap-application-wizard/groups.png"></div></div><div class="wizard-card wizard-card-overlay" data-cardname="services"><h3>Service Selection</h3><div class="alert hide">It\'s recommended that you select at least one service, like ping.</div><div class="wizard-input-section"><p>Please choose the services you\'d like Panopta to monitor. Any service you select will be given a default check frequency of 1 minute.</p><select name="services" data-placeholder="Service List" style="width:350px;" data-ui-jq="select2" class="chzn-select create-server-service-list form-control" multiple=""><option value=""></option><optgroup label="Basic"><option selected="" value="icmp.ping">Ping</option><option selected="" value="tcp.ssh">SSH</option><option value="tcp.ftp">FTP</option></optgroup><optgroup label="Web"><option selected="" value="tcp.http">HTTP</option><option value="tcp.https">HTTP (Secure)</option><option value="tcp.dns">DNS</option></optgroup><optgroup label="Email"><option value="tcp.pop">POP</option><option value="tcp.imap">IMAP</option><option value="tcp.smtp">SMTP</option><option value="tcp.pops">POP (Secure)</option><option value="tcp.imaps">IMAP (Secure)</option><option value="tcp.smtps">SMTP (Secure)</option><option value="tcp.http.exchange">Microsoft Exchange</option></optgroup><optgroup label="Databases"><option value="tcp.mysql">MySQL</option><option value="tcp.postgres">PostgreSQL</option><option value="tcp.mssql">Microsoft SQL Server</option></optgroup></select></div></div><div class="wizard-card wizard-card-overlay" data-cardname="location"><h3>Monitoring Location</h3><div class="wizard-input-section"><p>We determined <strong>Chicago</strong> to be the closest location to monitor <strong class="create-server-name"></strong> If you would like to change this, or you think this is incorrect, please select a different monitoring location.</p><select name="location" data-placeholder="Monitor nodes" style="width:350px;" data-ui-jq="select2" class="chzn-select form-control"><option value=""></option><optgroup label="North America"><option>Atlanta</option><option selected="">Chicago</option><option>Dallas</option><option>Denver</option><option>Fremont, CA</option><option>Los Angeles</option><option>Miami</option><option>Newark, NJ</option><option>Phoenix</option><option>Seattle</option><option>Washington, DC</option></optgroup><optgroup label="Europe"><option>Amsterdam, NL</option><option>Berlin</option><option>London</option><option>Milan, Italy</option><option>Nurnberg, Germany</option><option>Paris</option><option>Stockholm</option><option>Vienna</option></optgroup><optgroup label="Asia/Africa"><option>Cairo</option><option>Jakarta</option><option>Johannesburg</option><option>Hong Kong</option><option>Singapore</option><option>Sydney</option><option>Tokyo</option></optgroup></select></div></div><div class="wizard-card wizard-card-overlay"><h3>Notification Schedule</h3><div class="wizard-input-section"><p>Select the notification schedule to be used for outages.</p><select name="notification" data-ui-jq="select2" class="wizard-ns-select chzn-select form-control" data-placeholder="Notification schedule" style="width:350px;"><option value=""></option><option>ALIS Production</option><option>ALIS Development &amp; Staging</option><option>Panopta Development &amp; Staging</option><option>Jira</option><option>QSC Enterprise Production</option><option>QSC Enterprise Development &amp; Staging</option><option>Panopta Production</option><option>Panopta Monitoring Nodes</option><option>Common</option></select></div><div class="wizard-ns-detail hide">Also using <strong>ALIS Production</strong>:<ul id="wizard-ns-detail-servers"><li><img src="../assets/bootstrap-application-wizard/folder.png">Corporate sites</li><li><img src="../assets/bootstrap-application-wizard/folder.png">dt01.sat.medtelligent.com</li><li><img src="../assets/bootstrap-application-wizard/server_new.png">alisonline.com</li><li><img src="../assets/bootstrap-application-wizard/server_new.png">circa-db04.sat.medtelligent.com</li><li><img src="../assets/bootstrap-application-wizard/server_new.png">circa-services01.sat.medtelligent.com</li><li><img src="../assets/bootstrap-application-wizard/server_new.png">circa-web01.sat.medtelligent.com</li><li><img src="../assets/bootstrap-application-wizard/server_new.png">heartbeat.alisonline.com</li><li><img src="../assets/bootstrap-application-wizard/server_new.png">medtelligent.com</li><li><img src="../assets/bootstrap-application-wizard/server_new.png">dt02.fre.medtelligent.com</li><li><img src="../assets/bootstrap-application-wizard/server_new.png">dev03.lin.medtelligent.com</li></ul>img</div></div><div class="wizard-card"><h3>Agent Setup</h3><div class="wizard-input-section"><p>The <a target="_blank" href="http://www.panopta.com/support/knowledgebase/support-questions/how-do-i-install-the-panopta-monitoring-agent/">Panopta Agent</a> allows you to monitor local resources (disk usage, cpu usage, etc). If you would like to set that up now, please download and follow the <a target="_blank" href="http://www.panopta.com/support/knowledgebase/support-questions/how-do-i-install-the-panopta-monitoring-agent/">install instructions.</a></p><div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Download &nbsp; <span class="caret"></span></button><ul class="dropdown-menu"><li><a href="#">.rpm</a></li><li><a href="#">.deb</a></li><li><a href="#">.tar.gz</a></li></ul></div></div><div class="wizard-input-section"><p>You will be given a server key after you install the Agent on <strong class="create-server-name"></strong>. If you know your server key now, please enter it below.</p><div class="form-group"><input type="text" class="create-server-agent-key form-control" placeholder="Server key (optional)" data-validate=""></div></div><div class="wizard-error"><div class="alert alert-error"><strong>There was a problem</strong> with your submission. Please correct the errors and re-submit.</div></div><div class="wizard-failure"><div class="alert alert-error"><strong>There was a problem</strong> submitting the form. Please try again in a minute.</div></div><div class="wizard-success"><div class="alert alert-success"><span class="create-server-name"></span>Server Created <strong>Successfully.</strong></div><a class="btn btn-default create-another-server">Create another server</a> <span style="padding:0 10px">or</span> <a class="btn btn-success im-done">Done</a></div></div></div></div></div></div></section></div></div>'), a.put("app/modules/inbox/inbox.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">Email</li></ol><div class="alert alert-warning alert-sm pull-right no-margin animated bounceInLeft hide" id="app-alert"><button type="button" class="ml-lg close" data-dismiss="alert" aria-hidden="true">×</button> Hey! This is a <span class="fw-semi-bold">real app</span> with CRUD and Search functions. Have fun!</div><h1 class="page-title">Email - <span class="fw-semi-bold">Inbox</span></h1><div class="row" sn-inbox-app=""><div class="col-md-3 col-lg-2"><a class="btn btn-danger btn-block" id="compose-btn" href="#">Compose</a><ul class="nav nav-pills nav-stacked nav-email-folders mt" id="folders-list"><li class="active"><a href="inbox.html"><span class="badge pull-right">2</span> Inbox</a></li><li><a href="#">Starred</a></li><li><a href="#">Sent Mail</a></li><li><a href="#"><span class="badge pull-right">3</span> Draft</a></li><li><a href="#">Trash</a></li></ul><h5 class="mt">QUICK VIEW</h5><ul class="nav nav-pills nav-stacked nav-email-folders mb-lg fs-mini"><li><a href="#"><i class="fa fa-circle text-danger pull-right"></i> Work</a></li><li><a href="#"><i class="fa fa-circle text-white pull-right"></i> Private</a></li><li><a href="#"><i class="fa fa-circle text-gray-light pull-right"></i> Saved</a></li></ul></div><div class="col-md-9 col-lg-10"><div class="clearfix mb-xs"><a class="btn btn-default btn-sm width-50 pull-left hide" id="back-btn" href="inbox.html"><i class="fa fa-angle-left fa-lg"></i></a><div class="pull-right" id="folder-stats"><p class="widget-email-count">Showing 1 - 10 of 96 messages</p><ul class="pagination pagination-sm widget-email-pagination"><li class="prev disabled"><a href="#"><i class="fa fa-chevron-left"></i></a></li><li class="active"><a href="#">1</a></li><li><a href="#">2</a></li><li class="next"><a href="#"><i class="fa fa-chevron-right"></i></a></li></ul></div></div><section class="widget widget-email"><header id="widget-email-header"><div class="row"><div class="col-sm-6"><div class="btn-group"><a class="btn btn-default btn-sm dropdown-toggle" href="#" data-toggle="dropdown">Select <i class="fa fa-angle-down"></i></a><ul class="dropdown-menu"><li><a id="select-all" href="#">All</a></li><li><a id="select-none" href="#">None</a></li><li class="divider"></li><li><a id="select-read" href="#">Read</a></li><li><a id="select-unread" href="#">Unread</a></li></ul></div><div class="btn-group"><a class="btn btn-sm btn-default dropdown-toggle" href="#" data-toggle="dropdown">Actions <i class="fa fa-angle-down"></i></a><ul class="dropdown-menu"><li><a id="reply" href="#">Reply</a></li><li><a id="forward" href="#">Forward</a></li><li><a id="archive" href="#">Archive</a></li><li class="divider"></li><li><a id="mark-as-read" href="#">Mark As Read</a></li><li><a id="mark-as-unread" href="#">Mark As Unread</a></li><li class="divider"></li><li><a id="delete" href="#">Delete</a></li></ul></div></div><div class="col-sm-6"><input class="form-control input-sm width-200 pull-right" id="mailbox-search" type="text" placeholder="Search Messages"></div></div></header><div class="widget-body" id="mailbox-content"><table class="table table-striped table-emails table-hover" id="folder-view"><thead><tr><th colspan="3" id="folder-actions"><div class="checkbox"><input id="toggle-all" type="checkbox"> <label for="toggle-all"></label></div></th></tr></thead><tbody><tr class="unread"><td><div class="checkbox"><input type="checkbox" id="checkbox1"> <label for="checkbox1"></label></div></td><td><span class="starred"><i class="fa fa-star"></i></span></td><td class="name hidden-xs">Philip Horbacheuski</td><td class="subject">Hi, Welcome to Google Mail</td><td class="hidden-xs"><i class="fa fa-paperclip"></i></td><td class="date">May 19</td></tr><tr class="unread"><td><div class="checkbox"><input type="checkbox" id="checkbox2"> <label for="checkbox2"></label></div></td><td><span class="starred"><i class="fa fa-star-o"></i></span></td><td class="name hidden-xs">StackExchange</td><td class="subject">New Python questions for this week!</td><td class="hidden-xs"></td><td class="date">Aug 14</td></tr><tr class=""><td><div class="checkbox"><input type="checkbox" id="checkbox3"> <label for="checkbox3"></label></div></td><td><span class="starred"><i class="fa fa-star-o"></i></span></td><td class="name hidden-xs">notifications@facebook.com</td><td class="subject">Someone just commented on your photo!</td><td class="hidden-xs"></td><td class="date">Aug 7</td></tr><tr class="unread"><td><div class="checkbox"><input type="checkbox" id="checkbox4"> <label for="checkbox4"></label></div></td><td><span class="starred"><i class="fa fa-star"></i></span></td><td class="name hidden-xs">Twitter</td><td class="subject">@hackernews is now following you on Twitter</td><td class="hidden-xs"></td><td class="date">Jul 31</td></tr><tr class=""><td><div class="checkbox"><input type="checkbox" id="checkbox5"> <label for="checkbox5"></label></div></td><td><span class="starred"><i class="fa fa-star-o"></i></span></td><td class="name hidden-xs">Nikola Foley</td><td class="subject">Quiet led own cause three him</td><td class="hidden-xs"><i class="fa fa-paperclip"></i></td><td class="date">Jul 22</td></tr><tr class=""><td><div class="checkbox"><input type="checkbox" id="checkbox6"> <label for="checkbox6"></label></div></td><td><span class="starred"><i class="fa fa-star-o"></i></span></td><td class="name hidden-xs">Ernst Hardy</td><td class="subject">Raising say express had chiefly detract demands she</td><td class="hidden-xs"></td><td class="date">Jul 15</td></tr><tr class=""><td><div class="checkbox"><input type="checkbox" id="checkbox7"> <label for="checkbox7"></label></div></td><td><span class="starred"><i class="fa fa-star-o"></i></span></td><td class="name hidden-xs">LinkedIn</td><td class="subject">Jobs you may be interested in</td><td class="hidden-xs"></td><td class="date">Jul 12</td></tr><tr class=""><td><div class="checkbox"><input type="checkbox" id="checkbox8"> <label for="checkbox8"></label></div></td><td><span class="starred"><i class="fa fa-star"></i></span></td><td class="name hidden-xs">Naevius Victorsson</td><td class="subject">Front no party young abode state up</td><td class="hidden-xs"></td><td class="date">Jul 11</td></tr></tbody></table></div></section></div></div><script type="text/template" id="folders-view-template"><table class="table table-striped table-emails table-hover"> <thead> <tr> <th colspan="3"> <div class="checkbox"> <input type="checkbox" id="toggle-all"> <label for="toggle-all"></label> </div> </th> </tr> </thead> <tbody> </tbody> </table></script><script type="text/template" id="folder-template"><a href="#"> <% if (unread) {%><span class="badge pull-right"><%= unread %></span><% } %> <%= name %> </a></script><script type="text/template" id="mail-item-template"><td> <div class="checkbox"> <% checkboxId = Math.round(Math.random()*2344523) %> <input class="selected-checkbox" type="checkbox" id="checkbox<%= checkboxId %>" <%= selected ? \'checked="checked"\' : \'\'%> /> <label for="checkbox<%= checkboxId %>"></label> </div> </td> <td><span class="starred"><i class="<%= starred ? \'fa fa-star\' : \'fa fa-star-o\'%>"></i></span></td> <td class="name hidden-xs"><%= sender ? sender : senderMail %></td> <td class="subject"><%= subject %></td> <td class="hidden-xs"><% if (attachment) {%><i class="fa fa-paperclip"><% } %></i></td> <td class="date"><%= this.formatDate(timestamp) %></td></script><script type="text/template" id="email-view-template"><div class="email-details clearfix"> <div class="email-details-content"> <span class="thumb thumb-sm pull-left"> <img class="img-circle" src="assets/images/people/a5.jpg" alt="<%= sender %>" title="<%= sender %>"> </span> <div class="pull-left"> <strong><%= sender ? sender : senderMail %></strong> <% if (senderMail) { %> <span class="email">&lt;<%= senderMail %>&gt;</span> <% } %> <span class="receiver">to Wrapbootstrap</span> </div> <div class="email-actions pull-right"> <div class="btn-group"> <button id="email-opened-reply" class="btn btn-sm btn-gray"> <i class="fa fa-reply"></i> Reply </button> <button class="btn btn-sm btn-gray dropdown-toggle" data-toggle="dropdown"> <i class="fa fa-angle-down"></i> </button> <ul class="dropdown-menu pull-right"> <li><a href="#"><i class="fa fa-reply reply-btn"></i> Reply</a></li> <li><a href="#"><i class="fa fa-arrow-right reply-btn"></i> Forward</a></li> <li><a href="#"><i class="fa fa-print"></i> Print</a></li> <li class="divider"></li> <li><a href="#"><i class="fa fa-ban"></i> Spam</a></li> <li><a href="#"><i class="glyphicon glyphicon-trash"></i> Delete</a></li> </ul> </div> </div> <time class="email-date pull-right"> <%= this.formatDate(timestamp) %> </time> </div> </div> <div class="email-body"> <%= body %> </div> <% if (attachment) { %> <% attachments = attachments.split(","); attachmentsCount = attachments.length %> <div class="email-attachments"> <div class="row"> <div class="col-sm-6"> <hr> <p class="details"><strong><%= attachmentsCount %> attachments</strong> &nbsp;-&nbsp; <a href="#">Download all attachments</a> &nbsp;&nbsp;&nbsp;<a href="#">View all Images</a></p> <% i = 1 %> <% _.each(attachments, function(attachment){ %> <% size = Math.round(Math.random()*1000) %> <section class="attachment"> <img class="img-responsive" src="<%= attachment %>" alt=""/> <h5 class="title">some-cool-image<%= i++ %>.jpg</h5> <p class="details"> <%= size %>K &nbsp;&nbsp; <a href="#">View</a> &nbsp;&nbsp; <a href="#">Download</a> </p> </section> <% }); %> </div> </div> </div> <% } %></script><script type="text/template" id="compose-view-template"><form id="email-compose" class="form-email-compose" method="get" action="#"> <div class="form-group"> <input type="email" id="input-to" placeholder="To" class="input-transparent form-control" value="<%= receiver %>"> </div> <div class="form-group"> <input type="text" id="input-subject" placeholder="Subject" class="input-transparent form-control" value="<%= subject %>"> </div> <div class="form-group"> <textarea rows="10" class="form-control" id="wysiwyg" placeholder="Message"><%- body %></textarea> </div> <div class="clearfix"> <div class="btn-toolbar pull-right"> <button type="reset" id="compose-discard-button" class="btn btn-gray">Discard</button> <button type="button" id="compose-save-button" class="btn btn-gray">&nbsp;&nbsp;Save&nbsp;&nbsp;</button> <button type="submit" id="compose-send-button" class="btn btn-danger">&nbsp;&nbsp;&nbsp;Send&nbsp;&nbsp;&nbsp;</button> </div> </div> </form></script><script type="text/template" id="email-list-view-header-template"><div class="row"> <div class="col-sm-6"> <div class="btn-group"> <a class="btn btn-default btn-sm dropdown-toggle" href="#" data-toggle="dropdown"> Select <i class="fa fa-angle-down "></i> </a> <ul class="dropdown-menu"> <li><a id="select-all" href="#">All</a></li> <li><a id="select-none" href="#">None</a></li> <li class="divider"></li> <li><a id="select-read" href="#">Read</a></li> <li><a id="select-unread" href="#">Unread</a></li> </ul> </div> <div class="btn-group"> <a class="btn btn-sm btn-default dropdown-toggle" href="#" data-toggle="dropdown"> Actions <i class="fa fa-angle-down "></i> </a> <ul class="dropdown-menu"> <li><a id="reply" href="#">Reply</a></li> <li><a id="forward" href="#">Forward</a></li> <li><a id="archive" href="#">Archive</a></li> <li class="divider"></li> <li><a id="mark-as-read" href="#">Mark As Read</a></li> <li><a id="mark-as-unread" href="#">Mark As Unread</a></li> <li class="divider"></li> <li><a id="delete" href="#">Delete</a></li> </ul> </div> </div> <div class="col-sm-6"> <input class="form-control input-sm width-200 pull-right" id="mailbox-search" type="text" placeholder="Search Messages"> </div> </div></script>'),
            a.put("app/modules/grid/grid.html", '<style>\r\n  body{\r\n    overflow-x: visible;\r\n  }\r\n</style><ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">Grid</li></ol><h1 class="page-title">Grid - <span class="fw-semi-bold">Options</span></h1><div class="row"><div class="col-md-7 col-lg-offset-1"><section class="widget"><header><h4>Draggable Grid &nbsp;<span class="label label-danger fw-normal">since 2.1</span></h4></header><div class="widget-body"><p><strong>Widgster</strong> is a plugin that allows to easily implement basic widget functions that lots of our customers have requested. For now it has the following essential widget features:</p><ul class="text-list"><li><strong>Collapse/Expand</strong> - all widgets can be collapsed to fill only header\'s vertical space;</li><li><strong>Close</strong> - closable. Any widget may be removed by clicking the close btn;</li><li><strong>Full Screen</strong> - an option to make widget fill the whole window (just like OS);</li><li><strong>Ajax Load</strong> - the hottest option allowing to load/reload widget content asynchronously. You just need to provide an url to fetch the data from. With loader delivered.</li></ul><p>It\'s available under MIT license, check out github to find it.</p><p>Test it out!</p></div></section></div></div><div class="row" data-sn-grid-demo=""><div class="col-md-6 widget-container" data-ui-jq="sortable" data-ui-options="{ connectWith: \'.widget-container\', handle: \'header, .handle\', cursor: \'move\', iframeFix: false, items: \'.widget:not(.locked)\', opacity: 0.8, helper: \'original\', revert: true, forceHelperSize: true, placeholder: \'widget widget-placeholder\', forcePlaceholderSize: true, tolerance: \'pointer\' }"><section class="widget" id="default-widget" data-widgster-load="assets/demo/grid/default.php"><header><h5>Default <span class="fw-semi-bold">Widget</span></h5><div class="widget-controls"><a data-widgster="load" title="Reload" href="#"><i class="fa fa-refresh"></i></a> <a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a data-widgster="fullscreen" title="Full Screen" href="#"><i class="glyphicon glyphicon-fullscreen"></i></a> <a data-widgster="restore" title="Restore" href="#"><i class="glyphicon glyphicon-resize-small"></i></a> <a data-widgster="close" title="Close" href="#"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p>A timestamp this widget was created: Apr 24, 19:07:07</p><p>A timestamp this widget was updated: Apr 24, 19:07:07</p></div></section><section class="widget" id="shares-widget" data-widgster-load="assets/demo/grid/shares.php" data-post-processing="true"><header><h5><span class="label label-primary"><i class="fa fa-facebook"></i></span> &nbsp; Latest <span class="fw-semi-bold">Shares</span></h5><div class="widget-controls"><a data-widgster="load" title="Reload" href="#"><strong class="text-gray-light">Reload</strong></a> <a data-widgster="close" title="Close" href="#"><strong class="text-gray-light">Close</strong></a></div></header><div class="widget-body no-padding"><div class="list-group list-group-lg"><a href="#" class="list-group-item"><span class="thumb-sm pull-left mr"><img class="img-circle" src="assets/images/people/a1.jpg" alt="..."></span> <i class="fa fa-circle pull-right text-danger mt-sm"></i><h5 class="no-margin">Maikel Basso</h5><small class="text-muted">about 2 mins ago</small></a> <a href="#" class="list-group-item"><span class="thumb-sm pull-left mr"><img class="img-circle" src="assets/images/people/a2.jpg" alt="..."></span> <i class="fa fa-circle pull-right text-info mt-sm"></i><h5 class="no-margin">Ianus Arendse</h5><small class="text-muted">about 42 mins ago</small></a> <a href="#" class="list-group-item"><span class="thumb-sm pull-left mr"><img class="img-circle" src="assets/images/people/a3.jpg" alt="..."></span> <i class="fa fa-circle pull-right text-success mt-sm"></i><h5 class="no-margin">Valdemar Landau</h5><small class="text-muted">one hour ago</small></a> <a href="#" class="list-group-item mb-n-md"><span class="thumb-sm pull-left mr"><img class="img-circle" src="assets/images/people/a4.jpg" alt="..."></span> <i class="fa fa-circle pull-right text-warning mt-sm"></i><h5 class="no-margin">Rick Teagan</h5><small class="text-muted">3 hours ago</small></a></div></div></section><section class="widget" id="autoload-widget" data-widgster-load="assets/demo/grid/autoload.php" data-post-processing="true" data-widgster-autoload="true" data-widgster-show-loader="false"><header><h5>Autoload <span class="fw-semi-bold">Widget</span></h5><div class="widget-controls dropdown" data-dropdown="" data-ng-init="isOpen = false" data-is-open="isOpen"><span><i class="fa fa-spinner fa-lg fade mr-xs"></i></span> <a href="#" class="dropdown-toggle" data-dropdown-toggle=""><i class="fa fa-cog"></i></a><ul class="dropdown-menu dropdown-menu-right"><li><a data-widgster="load" title="Reload" ng-click="isOpen = false">Reload &nbsp;&nbsp;<span class="badge bg-success animated bounceIn"><strong>9</strong></span></a></li><li><a data-widgster="fullscreen" title="Full Screen" ng-click="isOpen = false">Fullscreen</a> <a data-widgster="restore" title="Restore" ng-click="isOpen = false">Restore</a></li><li class="divider"></li><li><a data-widgster="close" title="Close" ng-click="isOpen = false">Close</a></li></ul></div></header><div class="widget-body"><h3 class="text-align-center no-margin">Sign up, it\'s <strong>free</strong></h3><p class="lead text-muted text-align-center">Faith makes it possible to achieve that which man\'s mind can conceive and believe.</p><form><div class="form-group"><label for="exampleInputEmail1"><i class="fa fa-circle text-warning"></i> &nbsp; Email address</label> <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email"></div><div class="form-group"><label for="pswd"><i class="fa fa-circle text-danger"></i> &nbsp; Password</label> <input class="form-control" id="pswd" type="text" placeholder="Min 8 characters"></div><p>To make a widget automatically load it\'s content you just need to set <strong>data-widgster-autoload</strong> attribute and provide an url.</p><pre><code>data-widgster-load="server/ajax_widget.html"\r\n                                  data-widgster-autoload="true"</code></pre><p><strong>data-widgster-autoload</strong> may be set to an integer value. If set, for example, to 2000 will refresh widget every 2 seconds.</p><div class="clearfix"><div class="btn-toolbar pull-right"><button type="button" class="btn btn-transparent">Cancel</button> <button type="button" class="btn btn-success">&nbsp;Submit&nbsp;</button></div></div></form></div></section><section class="widget" style="min-height: 200px"><header><h5>Custom <span class="fw-semi-bold">Loader</span></h5></header><div class="widget-body"><div class="loader animated fadeIn handle"><span class="spinner"><i class="fa fa-spinner fa-spin"></i></span></div></div></section></div><div class="col-md-6 widget-container" data-ui-jq="sortable" data-ui-options="{ connectWith: \'.widget-container\', handle: \'header, .handle\', cursor: \'move\', iframeFix: false, items: \'.widget:not(.locked)\', opacity: 0.8, helper: \'original\', revert: true, forceHelperSize: true, placeholder: \'widget widget-placeholder\', forcePlaceholderSize: true, tolerance: \'pointer\' }"><section class="widget" id="news-widget" data-widgster-load="assets/demo/grid/news.php" data-post-processing="true"><header><h5>News <span class="badge bg-success">17</span></h5><span class="text-muted">spinning refresh button & close prompt</span><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a data-widgster="load" title="I am spinning!" href="#"><i class="fa fa-refresh"></i></a> <a data-widgster="close" title="Close" href="#"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body no-padding"><ul class="news-list stretchable"><li><span class="icon bg-danger text-white"><i class="fa fa-star"></i></span><div class="news-item-info"><h4 class="name no-margin mb-xs"><a href="#">First Human Colony on Mars</a></h4><p class="fs-mini">First 700 people will take part in building first human settlement outside of Earth. That\'s awesome, right?</p><time class="help-block">Mar 20, 18:46</time></div></li><li><span class="icon bg-info text-white"><i class="fa fa-microphone"></i></span><div class="news-item-info"><h4 class="name no-margin mb-xs"><a href="#">Light Blue reached $300</a></h4><p class="fs-mini">Light Blue Inc. shares just hit $300 price. "This was inevitable. It should have happen sooner or later" - says NYSE expert.</p><time class="help-block">Sep 25, 11:59</time></div></li><li><span class="icon bg-success text-white"><i class="fa fa-eye"></i></span><div class="news-item-info"><h4 class="name no-margin mb-xs"><a href="#">No more spying</a></h4><p class="fs-mini">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><time class="help-block">Mar 20, 18:46</time></div></li></ul></div><div id="news-close-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="news-close-modal-label" aria-hidden="true" style="display: none;"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4 class="modal-title" id="news-close-modal-label">Sure?</h4></div><div class="modal-body">Do you really want to unrevertably remove this super news widget?</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">No</button> <button type="button" class="btn btn-danger" id="news-widget-remove">Yes, remove widget</button></div></div></div></div></section><section class="widget locked" data-widgster-collapsed="true"><header><h5>Collapsed by default & locked</h5><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a data-widgster="close" title="Close" href="#"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><blockquote>There are no limits. There are plateaus, but you must not stay there, you must go beyond them. If it kills you, it kills you. A man must constantly exceed his level.<footer>Bruce Lee</footer></blockquote><p>To make a widget initially collapsed just add <code>data-widgster-collapsed="true"</code> attribute to <code>.widget</code>.</p><p>To make it locked (prevent dragging) add <code>.locked</code> class.</p></div></section><section class="widget bg-gray"><div class="widget-body no-padding"><div class="jumbotron handle bg-gray text-white mb-0"><div class="container"><h1>Draggable story!</h1><p class="lead"><em>Build</em> your own interfaces! Sit back and relax.</p><p class="text-align-center"><a class="btn btn-danger btn-lg" data-widgster="fullscreen">Fullscreen me! &nbsp; <i class="fa fa-check"></i></a></p><a class="btn btn-danger btn-lg" data-widgster="restore">Want to go back?</a></div></div></div></section></div></div>'), a.put("app/modules/maps-google/maps-google.html", '<div data-sn-gmap="" data-content-menu="true" class="content-map"></div><h1 class="page-title">Google <span class="fw-semi-bold">Maps</span></h1><div class="content-map-controls"><div class="btn-group btn-group-sm"><button class="btn btn-inverse" data-gmap-zoom-in=""><i class="fa fa-plus"></i></button> <button class="btn btn-inverse" data-gmap-zoom-out=""><i class="fa fa-minus"></i></button></div></div>'), a.put("app/modules/maps-vector/maps-vector.html", "<div data-ui-jq=\"vectorMap\" data-ui-options=\"{ map: 'world_mill_en', scaleColors: ['#C8EEFF', '#0071A4'], normalizeFunction: 'polynomial', focusOn:{ x: 0.5359, y: 0.4, scale: 2.5 }, zoomMin:0.85, hoverColor: false, regionStyle:{ initial: { fill: '#bdbdbd', 'fill-opacity': 1, stroke: '#bdbdbd', 'stroke-width': 0, 'stroke-opacity': 0 }, hover: { 'fill-opacity': 0.8 } }, markerStyle: { initial: { fill: app.settings.colors['brand-danger'], stroke: app.helpers.darkenColor(app.settings.colors['brand-danger'],.1), 'fill-opacity': 1, 'stroke-width': 4, 'stroke-opacity': 0.2, r: 5 }, hover: { stroke: 'black', 'stroke-width': 5 } }, backgroundColor: '#eee', markers: [ {latLng: [41.90, 12.45], name: 'Vatican City'}, {latLng: [43.73, 7.41], name: 'Monaco'}, {latLng: [-0.52, 166.93], name: 'Nauru'}, {latLng: [-8.51, 179.21], name: 'Tuvalu'}, {latLng: [43.93, 12.46], name: 'San Marino'}, {latLng: [47.14, 9.52], name: 'Liechtenstein'}, {latLng: [7.11, 171.06], name: 'Marshall Islands'}, {latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'}, {latLng: [3.2, 73.22], name: 'Maldives'}, {latLng: [35.88, 14.5], name: 'Malta'}, {latLng: [12.05, -61.75], name: 'Grenada'}, {latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'}, {latLng: [13.16, -59.55], name: 'Barbados'}, {latLng: [17.11, -61.85], name: 'Antigua and Barbuda'}, {latLng: [-4.61, 55.45], name: 'Seychelles'}, {latLng: [7.35, 134.46], name: 'Palau'}, {latLng: [42.5, 1.51], name: 'Andorra'}, {latLng: [14.01, -60.98], name: 'Saint Lucia'}, {latLng: [6.91, 158.18], name: 'Federated States of Micronesia'}, {latLng: [1.3, 103.8], name: 'Singapore'}, {latLng: [1.46, 173.03], name: 'Kiribati'}, {latLng: [-21.13, -175.2], name: 'Tonga'}, {latLng: [15.3, -61.38], name: 'Dominica'}, {latLng: [-20.2, 57.5], name: 'Mauritius'}, {latLng: [26.02, 50.55], name: 'Bahrain'}, {latLng: [0.33, 6.73], name: 'S?o Tom? and Pr?ncipe'} ] }\" class=\"content-map\"></div><header class=\"page-title\"><h1 class=\"no-margin mb-sm\">Vector <span class=\"fw-semi-bold\">Maps</span></h1><p class=\"page-title h5 no-margin\"><span class=\"fw-semi-bold\">1 656 843</span> <span class=\"ml-xs circle bg-gray\"><i class=\"text-gray-lighter fa fa-circle\"></i></span></p></header>"), a.put("app/modules/profile/profile.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">Profile</li></ol><h1 class="page-title">User - <span class="fw-semi-bold">Profile</span></h1><div class="row profile"><div class="col-md-6"><section class="widget"><div class="widget-body"><div class="widget-top-overflow text-white"><div class="height-250 overflow-hidden"><img class="img-responsive" src="assets/images/pictures/19.jpg"></div><div class="btn-toolbar"><a href="#" class="btn btn-outline btn-sm pull-right"><i class="fa fa-twitter mr-xs"></i> Follow</a></div></div><div class="row"><div class="col-sm-5 text-center"><div class="post-user post-user-profile"><span class="thumb-xlg"><img class="img-circle" src="assets/images/people/a5.jpg" alt="..."></span><h4 class="fw-normal">Adam <span class="fw-semi-bold">Johns</span></h4><p>UI/UX designer</p><a href="#" class="btn btn-danger btn-sm mt">&nbsp;Send <i class="fa fa-envelope ml-xs"></i>&nbsp;</a><ul class="contacts"><li><i class="fa fa-phone fa-fw mr-xs"></i><a href="#">+375 29 555-55-55</a></li><li><i class="fa fa-envelope fa-fw mr-xs"></i><a href="#">psmith@example.com</a></li><li><i class="fa fa-map-marker fa-fw mr-xs"></i><a href="#">Minsk, Belarus</a></li></ul></div></div><div class="col-sm-7"><div class="stats-row stats-row-profile mt text-right"><div class="stat-item"><p class="value">251</p><h5 class="name">Posts</h5></div><div class="stat-item"><p class="value">9.38%</p><h5 class="name">Conversion</h5></div><div class="stat-item"><p class="value">842</p><h5 class="name">Followers</h5></div></div><p class="text-right mt-lg"><a href="#" class="label label-warning">UI/UX</a> <a href="#" class="label label-danger ml-xs">Web Design</a> <a href="#" class="label label-default ml-xs">Mobile Apps</a></p><p class="lead mt-lg">My name is Adam Johns and here is my new Sing user profile page.</p><p>I love reading people\'s summaries page especially those who are in the same industry as me. Sometimes it\'s much easier to find your concentration during the night.</p></div></div></div></section></div><div class="col-md-6"><section class="activities"><h2>Activities</h2><section class="event"><span class="thumb-sm avatar pull-left mr-sm"><img class="img-circle" src="assets/images/people/a5.jpg" alt="..."></span><h4 class="event-heading"><a href="#">Bob Nilson</a> <small><a href="#">@nils</a></small></h4><p class="fs-sm text-muted">February 22, 2014 at 01:59 PM</p><p class="fs-mini">There is no such thing as maturity. There is instead an ever-evolving process of maturing. Because when there is a maturity, there is ...</p><footer><ul class="post-links"><li><a href="#">1 hour</a></li><li><a href="#"><span class="text-danger"><i class="fa fa-heart"></i> Like</span></a></li><li><a href="#">Comment</a></li></ul></footer></section><section class="event"><h4 class="event-heading"><a href="#">Jessica Smith</a> <small>@jess</small></h4><p class="fs-sm text-muted">February 22, 2014 at 01:59 PM</p><p class="fs-mini">Check out this awesome photo I made in Italy last summer. Seems it was lost somewhere deep inside my brand new HDD 40TB. Thanks god I found it!</p><footer><div class="clearfix"><ul class="post-links mt-sm pull-left"><li><a href="#">1 hour</a></li><li><a href="#"><span class="text-danger"><i class="fa fa-heart-o"></i> Like</span></a></li><li><a href="#">Comment</a></li></ul><span class="thumb thumb-sm pull-right"><a href="#"><img class="img-circle" src="assets/images/people/a1.jpg"></a></span> <span class="thumb thumb-sm pull-right"><a href="#"><img class="img-circle" src="assets/images/people/a5.jpg"></a></span> <span class="thumb thumb-sm pull-right"><a href="#"><img class="img-circle" src="assets/images/people/a3.jpg"></a></span></div><ul class="post-comments mt-sm"><li><span class="thumb-xs avatar pull-left mr-sm"><img class="img-circle" src="assets/images/people/a1.jpg" alt="..."></span><div class="comment-body"><h6 class="author fw-semi-bold">Ignacio Abad <small>6 mins ago</small></h6><p>Hey, have you heard anything about that?</p></div></li><li><span class="thumb-xs avatar pull-left mr-sm"><img class="img-circle" src="assets/images/avatar.png" alt="..."></span><div class="comment-body"><input class="form-control input-sm" type="text" placeholder="Write your comment..."></div></li></ul></footer></section><form class="mt" action="#"><div class="form-group mb-0"><label class="sr-only" for="new-event">New event</label> <textarea class="form-control" id="new-event" placeholder="Post something..." rows="3"></textarea></div><div class="btn-toolbar"><div class="btn-group"><a href="#" class="btn btn-sm btn-gray"><i class="fa fa-camera fa-lg"></i></a> <a href="#" class="btn btn-sm btn-gray"><i class="fa fa-map-marker fa-lg"></i></a></div><button type="submit" class="btn btn-danger btn-sm pull-right">Post</button></div></form></section></div></div>'), a.put("app/modules/tables-basic/tables-basic.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">Tables Basic</li></ol><h1 class="page-title">Tables - <span class="fw-semi-bold">Static</span></h1><div class="row"><div class="col-md-12"><section class="widget"><header><h4>Table <span class="fw-semi-bold">Styles</span></h4><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a data-widgster="close" href="#"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><table class="table"><thead><tr><th class="hidden-xs">#</th><th>Picture</th><th>Description</th><th class="hidden-xs">Info</th><th class="hidden-xs">Date</th><th class="hidden-xs">Size</th><th></th></tr></thead><tbody><tr><td class="hidden-xs">1</td><td><img class="img-rounded" src="assets/images/pictures/1.jpg" alt="" height="50"></td><td>Palo Alto</td><td class="hidden-xs"><p class="no-margin"><small><span class="fw-semi-bold">Type:</span> <span class="text-semi-muted">&nbsp; JPEG</span></small></p><p><small><span class="fw-semi-bold">Dimensions:</span> <span class="text-semi-muted">&nbsp; 200x150</span></small></p></td><td class="hidden-xs text-semi-muted">September 14, 2012</td><td class="hidden-xs text-semi-muted">45.6 KB</td><td class="width-150"><div data-progressbar="" data-sn-progress-animate="" data-value="29" data-type="success" class="progress-sm mt-xs"></div></td></tr><tr><td class="hidden-xs">2</td><td><img class="img-rounded" src="assets/images/pictures/2.jpg" alt="" height="50"></td><td>The Sky</td><td class="hidden-xs"><p class="no-margin"><small><span class="fw-semi-bold">Type:</span> <span class="text-semi-muted">&nbsp; PSD</span></small></p><p><small><span class="fw-semi-bold">Dimensions:</span> <span class="text-semi-muted">&nbsp; 2400x1455</span></small></p></td><td class="hidden-xs text-semi-muted">November 14, 2012</td><td class="hidden-xs text-semi-muted">15.3 MB</td><td class="width-150"><div data-progressbar="" data-sn-progress-animate="" data-value="33" data-type="warning" class="progress-sm mt-xs"></div></td></tr><tr><td class="hidden-xs">3</td><td><img class="img-rounded" src="assets/images/pictures/3.jpg" alt="" height="50"></td><td>Down the road<br><span class="label label-danger">INFO!</span></td><td class="hidden-xs"><p class="no-margin"><small><span class="fw-semi-bold">Type:</span> <span class="text-semi-muted">&nbsp; JPEG</span></small></p><p><small><span class="fw-semi-bold">Dimensions:</span> <span class="text-semi-muted">&nbsp; 200x150</span></small></p></td><td class="hidden-xs text-semi-muted">September 14, 2012</td><td class="hidden-xs text-semi-muted">49.0 KB</td><td class="width-150"><div data-progressbar="" data-sn-progress-animate="" data-value="38" data-type="gray" class="progress-sm mt-xs"></div></td></tr><tr><td class="hidden-xs">4</td><td><img class="img-rounded" src="assets/images/pictures/4.jpg" alt="" height="50"></td><td>The Edge</td><td class="hidden-xs"><p class="no-margin"><small><span class="fw-semi-bold">Type:</span> <span class="text-semi-muted">&nbsp; PNG</span></small></p><p><small><span class="fw-semi-bold">Dimensions:</span> <span class="text-semi-muted">&nbsp; 210x160</span></small></p></td><td class="hidden-xs text-semi-muted">September 15, 2012</td><td class="hidden-xs text-semi-muted">69.1 KB</td><td class="width-150"><div data-progressbar="" data-sn-progress-animate="" data-value="17" data-type="danger" class="progress-sm mt-xs"></div></td></tr><tr><td class="hidden-xs">5</td><td><img class="img-rounded" src="assets/images/pictures/11.jpg" alt="" height="50"></td><td>Fortress</td><td class="hidden-xs"><p class="no-margin"><small><span class="fw-semi-bold">Type:</span> <span class="text-semi-muted">&nbsp; JPEG</span></small></p><p><small><span class="fw-semi-bold">Dimensions:</span> <span class="text-semi-muted">&nbsp; 1452x1320</span></small></p></td><td class="hidden-xs text-semi-muted">October 1, 2012</td><td class="hidden-xs text-semi-muted">2.3 MB</td><td class="width-150"><div data-progressbar="" data-sn-progress-animate="" data-value="41" class="progress-sm mt-xs"></div></td></tr></tbody></table><div class="clearfix"><div class="pull-right"><button class="btn btn-default btn-sm">Send to ...</button><div class="btn-group" data-dropdown=""><button class="btn btn-sm btn-inverse dropdown-toggle" data-dropdown-toggle="" data-original-title="" title="">&nbsp; Clear &nbsp; <i class="fa fa-caret-down"></i></button><ul class="dropdown-menu dropdown-menu-right"><li><a href="#">Clear</a></li><li><a href="#">Move ...</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div></div><p>Basic table with styled content</p></div></div></section></div></div><div class="row"><div class="col-md-6"><section class="widget"><header><h5>Table <span class="fw-semi-bold">Styles</span></h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a data-widgster="close" href="#"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><h3>Stripped <span class="fw-semi-bold">Table</span></h3><p>Each row is highlighted. You will never lost there. Just <code>.table-striped</code> it.</p><table class="table table-striped"><thead><tr><th><div class="checkbox"><input id="checkbox1" type="checkbox" data-check-all=""> <label for="checkbox1"></label></div></th><th>First Name</th><th>Last Name</th><th>Info</th></tr></thead><tbody><tr><td><div class="checkbox"><input id="checkbox2" type="checkbox"> <label for="checkbox2"></label></div></td><td>Mark</td><td>Otto</td><td><span class="label label-danger">Online</span></td></tr><tr><td><div class="checkbox"><input id="checkbox3" type="checkbox"> <label for="checkbox3"></label></div></td><td>Jacob <span class="label label-warning text-gray-dark">ALERT!</span></td><td>Thornton</td><td><span class="label bg-gray-light">Away</span></td></tr><tr><td><div class="checkbox"><input id="checkbox4" type="checkbox"> <label for="checkbox4"></label></div></td><td>Larry</td><td>the Bird</td><td><span class="label label-danger">Construct</span></td></tr></tbody></table><br><br><h3>Hover <span class="fw-semi-bold">Table</span></h3><p>Trace only what\'s really important. <code>.table-hover</code> is made for it.</p><div class="table-responsive"><table class="table table-hover"><thead><tr><th>#</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Status</th></tr></thead><tbody><tr><td>1</td><td>Mark</td><td>Otto</td><td><a href="#">ottoto@example.com</a></td><td><span class="badge bg-gray-lighter text-gray">Pending</span></td></tr><tr><td>2</td><td>Jacob</td><td>Thornton</td><td><a href="#">fat.thor@example.com</a></td><td><span class="badge bg-gray-lighter text-gray-light">Unconfirmed</span></td></tr><tr><td>3</td><td>Larry</td><td>the Bird</td><td><a href="#">larry@example.com</a></td><td><span class="badge bg-gray-lighter text-gray">New</span></td></tr><tr><td>4</td><td>Peter</td><td>Horadnia</td><td><a href="#">peter@example.com</a></td><td><span class="badge bg-gray-lighter text-gray-light">Active</span></td></tr></tbody></table></div></div></section></div><div class="col-md-6"><section class="widget"><header><h5>Table <span class="fw-semi-bold">Styles</span></h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a data-widgster="close" href="#"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><h3>Bordered <span class="fw-semi-bold">Table</span></h3><p>Each row is highlighted. You will never lost there. That\'s how all of us learned in school the table should look like. Just add <code>.table-bordered</code> to it.</p><table class="table table-bordered table-lg mt-lg mb-0"><thead><tr><th><div class="checkbox"><input id="checkbox10" type="checkbox" data-check-all=""> <label for="checkbox10"></label></div></th><th>Product</th><th class="text-align-right">Price</th><th class="text-align-center">Sales</th></tr></thead><tbody><tr><td><div class="checkbox"><input id="checkbox11" type="checkbox"> <label for="checkbox11"></label></div></td><td>On the Road</td><td class="text-align-right">$25 224.2</td><td class="text-align-center"><div class="sparkline" data-ui-jq="sparkline" data-ui-options="[13,14,16,15,4,14,20],{type: \'bar\', barColor: \'#618fb0\'}"></div></td></tr><tr><td><div class="checkbox"><input id="checkbox12" type="checkbox"> <label for="checkbox12"></label></div></td><td>HP Core i7</td><td class="text-align-right">$87 346.1</td><td class="text-align-center"><div class="sparkline" data-ui-jq="sparkline" data-ui-options="[14,12,16,11,17,19,16],{type: \'bar\', barColor: \'#999\'}"></div></td></tr><tr><td><div class="checkbox"><input id="checkbox13" type="checkbox"> <label for="checkbox13"></label></div></td><td>Let\'s Dance</td><td class="text-align-right">$57 944.6</td><td class="text-align-center"><div class="sparkline" data-ui-jq="sparkline" data-ui-options="[11,17,19,16,14,12,16],{type: \'bar\', barColor: \'#f0b518\'}"></div></td></tr><tr><td><div class="checkbox"><input id="checkbox14" type="checkbox"> <label for="checkbox14"></label></div></td><td>Air Pro</td><td class="text-align-right">$118 533.1</td><td class="text-align-center"><div class="sparkline" data-ui-jq="sparkline" data-ui-options="[13,14,20,16,15,4,14],{type: \'bar\', barColor: \'#e5603b\'}"></div></td></tr><tr><td><div class="checkbox"><input id="checkbox15" type="checkbox"> <label for="checkbox15"></label></div></td><td>Version Control</td><td class="text-align-right">$72 854.5</td><td class="text-align-center"><div class="sparkline" data-ui-jq="sparkline" data-ui-options="[16,15,4,14,13,14,20],{type: \'bar\', barColor: \'#618fb0\'}"></div></td></tr></tbody></table></div></section><section class="widget"><header><h5>Table <span class="fw-semi-bold">Styles</span></h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a data-widgster="close" href="#"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><h3>Overflow <span class="fw-semi-bold">Table</span></h3><p>Add any non-bordered .table within a widget for a seamless design. Awesome look for no cost. Just wrap the table with simple css class <code>.widget-table-overflow</code> inside of widget</p></div><div class="widget-table-overflow"><table class="table table-striped table-lg mt-lg mb-0"><thead class="no-bd"><tr><th><div class="checkbox"><input id="checkbox210" type="checkbox" data-check-all=""> <label for="checkbox210"></label></div></th><th>Product</th><th class="text-align-right">Price</th><th class="text-align-center">Sales</th></tr></thead><tbody><tr><td><div class="checkbox"><input id="checkbox211" type="checkbox"> <label for="checkbox211"></label></div></td><td>On the Road</td><td class="text-align-right">$25 224.2</td><td class="text-align-center"><div class="sparkline" data-ui-jq="sparkline" data-ui-options="[13,14,16,15,4,14,20],{type: \'bar\', barColor: \'#618fb0\'}"></div></td></tr><tr><td><div class="checkbox"><input id="checkbox212" type="checkbox"> <label for="checkbox212"></label></div></td><td>HP Core i7</td><td class="text-align-right">$87 346.1</td><td class="text-align-center"><div class="sparkline" data-ui-jq="sparkline" data-ui-options="[14,12,16,11,17,19,16],{type: \'bar\', barColor: \'#999\'}"></div></td></tr><tr><td><div class="checkbox"><input id="checkbox213" type="checkbox"> <label for="checkbox213"></label></div></td><td>Let\'s Dance</td><td class="text-align-right">$57 944.6</td><td class="text-align-center"><div class="sparkline" data-ui-jq="sparkline" data-ui-options="[11,17,19,16,14,12,16],{type: \'bar\', barColor: \'#f0b518\'}"></div></td></tr><tr><td><div class="checkbox"><input id="checkbox214" type="checkbox"> <label for="checkbox214"></label></div></td><td>Air Pro</td><td class="text-align-right">$118 533.1</td><td class="text-align-center"><div class="sparkline" data-ui-jq="sparkline" data-ui-options="[13,14,20,16,15,4,14],{type: \'bar\', barColor: \'#e5603b\'}"></div></td></tr><tr><td><div class="checkbox"><input id="checkbox215" type="checkbox"> <label for="checkbox215"></label></div></td><td>Version Control</td><td class="text-align-right">$72 854.5</td><td class="text-align-center"><div class="sparkline" data-ui-jq="sparkline" data-ui-options="[16,15,4,14,13,14,20],{type: \'bar\', barColor: \'#618fb0\'}"></div></td></tr></tbody></table></div></section></div></div>'), a.put("app/modules/tables-dynamic/tables-dynamic.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">Tables Dynamic</li></ol><h1 class="page-title">Dynamic - <span class="fw-semi-bold">Tables</span></h1><section class="widget" data-ng-controller="AngularWayCtrl"><header><h4>The <span class="fw-semi-bold">Angular</span> Way</h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a data-widgster="close" title="Close" href="#"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p>Column sorting, live search, pagination. Built with <a href="http://l-lin.github.io/angular-datatables/#/welcome" target="_blank">angular-datatables</a></p><div class="mt"><table data-datatable="ng" data-dt-options="dtOptions" class="table table-striped table-hover"><thead><tr><th>Id</th><th>Name</th><th class="no-sort hidden-xs">Info</th><th class="hidden-xs">Description</th><th class="hidden-xs">Date</th><th class="no-sort">Status</th></tr></thead><tbody><tr data-ng-repeat="person in people"><td>{{person.id}}</td><td><span class="fw-semi-bold">{{person.name}}</span></td><td class="hidden-xs"><small><span class="fw-semi-bold">Type:</span> &nbsp; {{person.info.type}}</small><br><small><span class="fw-semi-bold">Dimensions:</span> &nbsp; {{person.info.dimensions}}</small></td><td class="hidden-xs"><a href="#">{{person.description}}</a></td><td class="hidden-xs">{{person.date}}</td><td class="width-150"><div class="progress progress-sm mt-xs"><div class="progress-bar progress-bar-{{person.status.type}}" style="width: {{person.status.progress}};"></div></div></td></tr></tbody></table></div></div></section><section class="widget" sn-backgrid-demo=""><header><h4>Table <span class="fw-semi-bold">Styles</span></h4><div class="widget-controls"><div class="width-200"><div class="input-group input-group-sm input-group-transparent input-group-rounded"><span class="input-group-addon"><i class="fa fa-search"></i></span> <input class="form-control" id="search-countries" type="text" placeholder="Search Countries"></div></div></div></header><div class="widget-body"><p>Editable, validatable, filterable and sortable table made with <a href="http://backgridjs.com/" target="_blank">Backgrid.js</a></p><div id="table-dynamic"></div></div></section>'),
            a.put("app/modules/ui-buttons/ui-buttons.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">UI Buttons</li></ol><h1 class="page-title">Buttons - <span class="fw-semi-bold">Styles</span></h1><div class="row"><div class="col-lg-4 col-md-6"><section class="widget"><header><h4>Color <span class="fw-semi-bold">Options</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p class="fs-mini text-muted">Use any of the available button classes to quickly create a styled button. Semantically distinguishable beauty.</p><p class="text-align-center"><button class="btn btn-default width-100 mb-xs" role="button">Default</button> <button class="btn btn-primary width-100 mb-xs" role="button">Primary</button> <button class="btn btn-info width-100 mb-xs" role="button">Info</button> <button class="btn btn-success width-100 mb-xs" role="button">Success</button> <button class="btn btn-warning width-100 mb-xs" role="button">Warning</button> <button class="btn btn-danger width-100 mb-xs" role="button">Danger</button> <button class="btn btn-gray width-100 mb-xs" role="button">Gray</button> <button class="btn btn-inverse width-100 mb-xs" role="button">Inverse</button></p></div></section></div><div class="col-lg-4 col-md-6"><section class="widget"><header><h4>Size <span class="fw-semi-bold">Variants</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p class="fs-mini text-muted">Fancy larger or smaller buttons? Four separate sizes available for all use cases: from tiny 10px button to large one.</p><p class="mb-xs"><button type="button" class="btn btn-primary btn-lg mb-xs">Large button</button> <button type="button" class="btn btn-default btn-lg mb-xs">Large button</button></p><p class="mb-xs"><button type="button" class="btn btn-primary mb-xs">Default button</button> <button type="button" class="btn btn-default mb-xs">Default button</button></p><p class="mb-xs"><button type="button" class="btn btn-primary btn-sm mb-xs">Small button</button> <button type="button" class="btn btn-default btn-sm mb-xs">Small button</button></p><p class="mb-xs"><button type="button" class="btn btn-primary btn-xs mb-xs">Tiny button</button> <button type="button" class="btn btn-default btn-xs mb-xs">Tiny button</button></p></div></section></div><div class="col-lg-4 col-md-6"><section class="widget"><header><h4>Block <span class="fw-semi-bold">Buttons</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p class="fs-mini text-muted">Create block level buttons - those that span the full width of a parent— by adding <code>.btn-block</code>. Great for menu & social buttons.</p><p><button type="button" class="btn btn-info btn-block">Block Button</button></p><p><button type="button" class="btn btn-default btn-block">Show Menu &nbsp;&nbsp;&nbsp;<i class="fa fa-bars"></i></button></p><p><button type="button" class="btn btn-primary btn-block"><i class="fa fa-facebook"></i> Login mit Facebook</button></p><p><button type="button" class="btn btn-warning btn-block">Are you sure?</button></p></div></section></div><div class="col-lg-4 col-md-6"><section class="widget"><header><h4>Disabled <span class="fw-semi-bold">Buttons</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p class="fs-mini text-muted">Make buttons look unclickable by fading them back 50%. Add the <code>.disabled</code> class to <code>&lt;a&gt;</code> buttons.</p><p><button type="button" class="btn btn-primary" disabled="disabled">Primary button</button> <button type="button" class="btn btn-default" disabled="disabled">Button</button></p><p><a href="#" class="btn btn-success btn-sm disabled" role="button">Primary link</a> <a href="#" class="btn btn-default btn-sm disabled" role="button">Link</a></p></div></section></div><div class="col-lg-4 col-md-6"><section class="widget"><header><h4>Button <span class="fw-semi-bold">Groups</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p class="fs-mini text-muted">Group a series of buttons together on a single line with the button group. Add on optional JavaScript radio and checkbox style behavior with Bootstrap buttons plugin.</p><div class="btn-group"><button type="button" class="btn btn-default">Left</button> <button type="button" class="btn btn-default">Middle</button> <button type="button" class="btn btn-default">Right</button></div><div class="btn-toolbar" role="toolbar"><div class="btn-group"><button type="button" class="btn btn-default">1</button> <button type="button" class="btn btn-default">2</button> <button type="button" class="btn btn-default">3</button> <button type="button" class="btn btn-default">4</button></div><div class="btn-group"><button type="button" class="btn btn-default">5</button> <button type="button" class="btn btn-default">6</button> <button type="button" class="btn btn-default">7</button></div><div class="btn-group"><button type="button" class="btn btn-default">8</button></div></div></div></section></div><div class="col-lg-4 col-md-6"><section class="widget"><header><h4>Button <span class="fw-semi-bold">Dropdowns</span></h4><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><p class="fs-mini text-muted">Add dropdown menus to nearly anything with this simple plugin, including the buttons, navbar, tabs, and pills. Both solid & segmented dropdown options available.</p><div class="mb-sm"><div class="btn-group" data-dropdown=""><button class="btn btn-danger dropdown-toggle" data-dropdown-toggle="" data-original-title="" title="">&nbsp; One &nbsp; <i class="fa fa-caret-down"></i></button><ul class="dropdown-menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div><div class="btn-group" data-dropdown=""><button class="btn btn-gray btn-sm dropdown-toggle" data-dropdown-toggle="" data-original-title="" title="">&nbsp; One &nbsp; <i class="fa fa-caret-down"></i></button><ul class="dropdown-menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div></div><div><div class="btn-group" data-dropdown=""><button class="btn btn-default" data-original-title="" title="">Gray</button> <button class="btn btn-default dropdown-toggle" data-dropdown-toggle="" data-original-title="" title=""><i class="fa fa-caret-down"></i></button><ul class="dropdown-menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div><div class="btn-group" data-dropdown=""><button class="btn btn-gray btn-sm" data-original-title="" title="">Gray</button> <button class="btn btn-gray btn-sm dropdown-toggle" data-dropdown-toggle="" data-original-title="" title=""><i class="fa fa-caret-down"></i></button><ul class="dropdown-menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div></div></div></section></div></div><section class="widget"><header><h5>Button <span class="fw-semi-bold">Options</span></h5><div class="widget-controls"><a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><div class="row"><div class="col-lg-4"><h3>Button <span class="fw-semi-bold">Checkboxes</span></h3><p class="fs-mini text-muted">Do more with buttons. Control button states or create groups of buttons for more components like toolbars. Add <code>data-toggle="buttons"</code> to a group of checkboxes for checkbox style toggling on btn-group.</p><div class="mb-sm"><div class="btn-group" data-ng-init="checkboxModel = { left: false, middle: true, right: false }"><label class="btn btn-gray" data-btn-checkbox="" data-ng-model="checkboxModel.left">Left way</label> <label class="btn btn-gray" data-btn-checkbox="" data-ng-model="checkboxModel.middle">Middle way</label> <label class="btn btn-gray" data-btn-checkbox="" data-ng-model="checkboxModel.right">Right way</label></div></div><div class="mb-sm"><div class="btn-group btn-group-sm" data-ng-init="checkbox2Model = { left: false, middle: false, right: false }"><label class="btn btn-default" data-btn-checkbox="" data-ng-model="checkbox2Model.left">Left way</label> <label class="btn btn-default" data-btn-checkbox="" data-ng-model="checkbox2Model.middle">Middle way</label> <label class="btn btn-default" data-btn-checkbox="" data-ng-model="checkbox2Model.right">Right way</label></div></div></div><div class="col-lg-4"><h3>Button <span class="fw-semi-bold">Radios</span></h3><p class="fs-mini text-muted">Do more with buttons. Control button states or create groups of buttons for more components like toolbars. Add <code>data-toggle="buttons"</code> to a group of radio inputs for radio style toggling on btn-group.</p><div class="mb-sm"><div class="btn-group" data-ng-init="radioModel = \'Middle\'"><label class="btn btn-gray" data-btn-radio="\'Left\'" data-ng-model="radioModel">Left way</label> <label class="btn btn-gray" data-btn-radio="\'Middle\'" data-ng-model="radioModel">Middle way</label> <label class="btn btn-gray" data-btn-radio="\'Right\'" data-ng-model="radioModel">Right way</label></div></div><div class="mb-sm"><div class="btn-group btn-group-sm"><label class="btn btn-gray" data-btn-radio="\'Left\'" data-ng-model="radio2Model">Left way</label> <label class="btn btn-gray" data-btn-radio="\'Middle\'" data-ng-model="radio2Model">Middle way</label> <label class="btn btn-gray" data-btn-radio="\'Right\'" data-ng-model="radio2Model">Right way</label></div></div></div><div class="col-lg-4"><h3>Use with <span class="fw-semi-bold">Icons</span></h3><p class="fs-mini text-muted">Fontawesome and Glyph- icons may be used in buttons, button groups for a toolbar, navigation, or prepended form inputs. Let your buttons shine!</p><p class="text-align-center"><button class="btn btn-default width-100 mb-xs" role="button"><i class="glyphicon glyphicon-tree-conifer text-success"></i> Forest</button> <button class="btn btn-default width-100 mb-xs" role="button"><i class="fa fa-check text-danger"></i> Submit</button> <button class="btn btn-default width-100 mb-xs" role="button"><i class="fa fa-facebook text-primary"></i> Login</button></p><p class="text-align-center"><button class="btn btn-inverse width-100 mb-xs" role="button"><i class="fa fa-exclamation text-warning"></i> Error</button> <button class="btn btn-inverse width-100 mb-xs" role="button"><i class="glyphicon glyphicon-globe text-info"></i> <span class="text-info">Globe</span></button> <button class="btn btn-inverse width-100 mb-xs" role="button"><span class="circle bg-white"><i class="fa fa-map-marker text-gray"></i></span> Map</button></p></div></div></div></section>'), a.put("app/modules/ui-components/ui-components.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">UI Components</li></ol><h1 class="page-title">Components - <span class="fw-semi-bold">Bootstrap</span></h1><div data-ng-controller="UiComponentsDemoController"><section class="widget"><header><h5>Alert <span class="fw-semi-bold">Messages</span></h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body clearfix"><h3>Small <span class="fw-semi-bold">Elements</span></h3><p class="mb-lg">Gaining direct user attention on some matter. Add dismiss functionality to all alert messages with this plugin.</p><div data-alert="" data-ng-repeat="alert in alerts" data-type="{{alert.type}} alert-sm" data-close="closeAlert($index)"><div data-ng-bind-html="alert.msg"></div></div><button class="btn btn-default btn-sm pull-right" data-ng-click="addAlert()">Add Alert</button></div></section><div class="row"><div class="col-md-6"><section class="widget"><header><h5>Labels & Badge <span class="fw-semi-bold">Options</span></h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><h3>Label <span class="fw-semi-bold">Colors</span></h3><p>Just add the <code>.label</code> class to inline element to create a label.</p><p><span class="label label-default">Default</span> <span class="label label-primary">Primary</span> <span class="label label-info">Info</span> <span class="label label-success">Success</span> <span class="label label-warning">Warning</span> <span class="label label-danger">Danger</span></p><h3>Badge <span class="fw-semi-bold">Variations</span></h3><p>Same as labels, just add the <code>.badge</code> class to inline element to create a badge.</p><p><button class="btn btn-primary" type="button">Notifications &nbsp;&nbsp; <span class="badge">3</span></button> <span class="badge bg-danger">01</span> <span class="badge bg-warning">20</span> <span class="badge bg-success">31</span> <span class="badge bg-info">18</span> <span class="badge bg-primary">41</span> <span class="badge">9</span></p></div></section></div><div class="col-md-6"><section class="widget"><header><h5>Tooltips & Popover <span class="fw-semi-bold">Variations</span></h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><h3>Position <span class="fw-semi-bold">Tooltips</span></h3><p>Stable four position options available:</p><div class="btn-toolbar"><a href="#" class="btn btn-default" data-tooltip-placement="left" data-tooltip="Tooltip on left">On left</a> <a href="#" class="btn btn-default" data-tooltip-placement="top" data-tooltip="Tooltip on top">On top</a> <a href="#" class="btn btn-default" data-tooltip-placement="bottom" data-tooltip="Tooltip on bottom">On bottom</a> <a href="#" class="btn btn-default" data-tooltip-placement="right" data-tooltip="Tooltip on right">On right</a></div><h3>Popover <span class="fw-semi-bold">Options</span></h3><p>Placing help text where needed:</p><div class="btn-toolbar"><button type="button" class="btn btn-default" title="" data-popover-placement="left" data-popover="And here\'s some amazing content. It\'s very engaging. right?">Popover on left</button> <button type="button" class="btn btn-info" title="" data-popover-placement="top" data-popover="And here\'s some amazing content. It\'s very engaging. right?" data-popover-title="A Title">Titled Popover</button></div><h3><span class="fw-semi-bold">Bootstrap</span> Modals</h3><p>Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.</p><div data-ng-controller="ModalDemoCtrl"><button class="btn btn-gray" data-ng-click="open()">Launch demo modal</button><script type="text/ng-template" id="my-modal18-content.html"><div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title text-align-center fw-bold mt" id="myModalLabel18">One more step</h4> <p class="text-align-center fs-mini text-muted mt-sm"> We need a bit of your detailed information to proceed. US ticketing system requires us to process and check your personal infromation before we can go. </p> </div> <div class="modal-body bg-gray-lighter"> <form> <div class="row"> <div class="col-md-8"> <div class="form-group"> <input type="text" class="form-control input-no-border" placeholder="Name"> </div> </div> <div class="col-md-4"> <div class="form-group"> <input type="text" class="form-control input-no-border" placeholder="Middle Name"> </div> </div> <div class="col-md-12"> <div class="form-group"> <input type="text" class="form-control input-no-border" placeholder="Address"> </div> </div> <div class="col-md-4"> <div class="form-group"> <input type="text" class="form-control input-no-border" placeholder="City"> </div> </div> <div class="col-md-4"> <div class="form-group"> <input type="text" class="form-control input-no-border" placeholder="Country"> </div> </div> <div class="col-md-4"> <div class="form-group"> <input type="text" class="form-control input-no-border" placeholder="Zip"> </div> </div> </div> </form> </div> <div class="modal-footer"> <button type="button" class="btn btn-gray" data-ng-click="cancel()">Close</button> <button type="button" class="btn btn-success" data-ng-click="ok()">Save changes</button> </div></script></div></div></section></div></div><section class="widget"><header><h5>Progress <span class="fw-semi-bold">Bars</span></h5><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><div class="row"><div class="col-md-4"><h3>Progress Bar <span class="fw-semi-bold">Colors</span></h3><p class="fs-mini text-muted">Easily perceptible colored options for Bootstrap progress bars:</p><div class="row"><div class="col-sm-10 col-sm-offset-1"><div data-progressbar="" data-value="75" data-type="danger" class="progress-sm mt"></div><div data-progressbar="" data-value="60" data-type="warning" class="progress-sm mt"></div><div data-progressbar="" data-value="45" data-type="success" class="progress-sm mt"></div><div data-progressbar="" data-value="30" data-type="primary" class="progress-sm mt"></div></div></div></div><div class="col-md-4"><h3>Progress Bar <span class="fw-semi-bold">Sizes</span></h3><p class="fs-mini text-muted">Three different sizes for all of possible use cases:</p><div class="row"><div class="col-sm-10 col-sm-offset-1"><div data-progressbar="" data-value="60" data-type="gray" class="progress-xs mt"></div><div data-progressbar="" data-value="60" data-type="warning" class="progress-xs mt"></div><div data-progressbar="" data-value="33" data-type="info" class="progress-sm mt"></div></div></div></div><div class="col-md-4"><h3>More <span class="fw-semi-bold">Options</span></h3><p class="fs-mini text-muted">Animated, stripped and progress bars containing text:</p><div class="row"><div class="col-sm-10 col-sm-offset-1"><div data-progressbar="" data-value="60" data-type="info" class="progress-striped active mt fw-semi-bold">$24 818</div><div data-progressbar="" data-value="60" data-type="gray-light" class="progress-striped progress-sm mt"></div></div></div></div></div></div></section></div>'), a.put("app/modules/ui-icons/ui-icons.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">UI Icons</li></ol><h1 class="page-title">UI - <span class="fw-semi-bold">Icons</span></h1><div data-tabset="" class="tab-content mb-lg"><div data-tab="" data-heading="Glypicons"><h3>Built-in <span class="fw-semi-bold">Glyphicons</span></h3><div class="row icon-list"><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-asterisk"></span>asterisk</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-plus"></span>plus</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-euro"></span>euro</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-minus"></span>minus</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-cloud"></span>cloud</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-envelope"></span>envelope</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-pencil"></span>pencil</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-glass"></span>glass</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-music"></span>music</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-search"></span>search</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-heart"></span>heart</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-star"></span>star</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-star-empty"></span>star-empty</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-user"></span>user</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-film"></span>film</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-th-large"></span>th-large</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-th"></span>th</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-th-list"></span>th-list</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-ok"></span>ok</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-remove"></span>remove</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-zoom-in"></span>zoom-in</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-zoom-out"></span>zoom-out</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-off"></span>off</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-signal"></span>signal</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-cog"></span>cog</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-trash"></span>trash</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-home"></span>home</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-file"></span>file</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-time"></span>time</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-road"></span>road</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-download-alt"></span>download-alt</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-download"></span>download</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-upload"></span>upload</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-inbox"></span>inbox</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-play-circle"></span>play-circle</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-repeat"></span>repeat</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-refresh"></span>refresh</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-list-alt"></span>list-alt</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-lock"></span>lock</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-flag"></span>flag</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-headphones"></span>headphones</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-volume-off"></span>volume-off</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-volume-down"></span>volume-down</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-volume-up"></span>volume-up</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-qrcode"></span>qrcode</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-barcode"></span>barcode</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-tag"></span>tag</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-tags"></span>tags</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-book"></span>book</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-bookmark"></span>bookmark</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-print"></span>print</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-camera"></span>camera</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-font"></span>font</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-bold"></span>bold</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-italic"></span>italic</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-text-height"></span>text-height</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-text-width"></span>text-width</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-align-left"></span>align-left</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-align-center"></span>align-center</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-align-right"></span>align-right</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-align-justify"></span>align-justify</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-list"></span>list</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-indent-left"></span>indent-left</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-indent-right"></span>indent-right</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-facetime-video"></span>facetime-video</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-picture"></span>picture</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-map-marker"></span>map-marker</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-adjust"></span>adjust</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-tint"></span>tint</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-edit"></span>edit</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-share"></span>share</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-check"></span>check</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-move"></span>move</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-step-backward"></span>step-backward</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-fast-backward"></span>fast-backward</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-backward"></span>backward</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-play"></span>play</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-pause"></span>pause</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-stop"></span>stop</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-forward"></span>forward</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-fast-forward"></span>fast-forward</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-step-forward"></span>step-forward</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-eject"></span>eject</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-chevron-left"></span>chevron-left</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-chevron-right"></span>chevron-right</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-plus-sign"></span>plus-sign</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-minus-sign"></span>minus-sign</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-remove-sign"></span>remove-sign</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-ok-sign"></span>ok-sign</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-question-sign"></span>question-sign</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-info-sign"></span>info-sign</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-screenshot"></span>screenshot</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-remove-circle"></span>remove-circle</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-ok-circle"></span>ok-circle</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-ban-circle"></span>ban-circle</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-arrow-left"></span>arrow-left</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-arrow-right"></span>arrow-right</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-arrow-up"></span>arrow-up</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-arrow-down"></span>arrow-down</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-share-alt"></span>share-alt</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-resize-full"></span>resize-full</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-resize-small"></span>resize-small</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-exclamation-sign"></span>exclamation-sign</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-gift"></span>gift</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-leaf"></span>leaf</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-fire"></span>fire</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-eye-open"></span>eye-open</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-eye-close"></span>eye-close</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-warning-sign"></span>warning-sign</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-plane"></span>plane</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-calendar"></span>calendar</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-random"></span>random</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-comment"></span>comment</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-magnet"></span>magnet</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-chevron-up"></span>chevron-up</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-chevron-down"></span>chevron-down</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-retweet"></span>retweet</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-shopping-cart"></span>shopping-cart</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-folder-close"></span>folder-close</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-folder-open"></span>folder-open</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-resize-vertical"></span>resize-vertical</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-resize-horizontal"></span>resize-horizontal</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-hdd"></span>hdd</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-bullhorn"></span>bullhorn</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-bell"></span>bell</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-certificate"></span>certificate</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-thumbs-up"></span>thumbs-up</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-thumbs-down"></span>thumbs-down</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-hand-right"></span>hand-right</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-hand-left"></span>hand-left</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-hand-up"></span>hand-up</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-hand-down"></span>hand-down</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-circle-arrow-right"></span>circle-arrow-right</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-circle-arrow-left"></span>circle-arrow-left</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-circle-arrow-up"></span>circle-arrow-up</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-circle-arrow-down"></span>circle-arrow-down</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-globe"></span>globe</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-wrench"></span>wrench</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-tasks"></span>tasks</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-filter"></span>filter</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-briefcase"></span>briefcase</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-fullscreen"></span>fullscreen</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-dashboard"></span>dashboard</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-paperclip"></span>paperclip</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-heart-empty"></span>heart-empty</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-link"></span>link</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-phone"></span>phone</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-pushpin"></span>pushpin</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-usd"></span>usd</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-gbp"></span>gbp</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-sort"></span>sort</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-sort-by-alphabet"></span>sort-by-alphabet</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-sort-by-alphabet-alt"></span>sort-by-alphabet-alt</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-sort-by-order"></span>sort-by-order</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-sort-by-order-alt"></span>sort-by-order-alt</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-sort-by-attributes"></span>sort-by-attributes</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-sort-by-attributes-alt"></span>sort-by-attributes-alt</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-unchecked"></span>unchecked</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-expand"></span>expand</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-collapse-down"></span>collapse-down</div><div class="icon-list-item col-md-3 col-sm-4"><span class="glyphicon glyphicon-collapse-up"></span>collapse-up</div></div></div><div data-tab=""><div data-tab-heading="">FA 4.4 <span class="label label-danger">new</span></div><h3>Awesome <span class="fw-semi-bold">Font Awesome</span></h3><div class="row icon-list"><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bed"><i class="fa fa-bed"></i> bed</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/university"><i class="fa fa-bank"></i> bank <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/behance"><i class="fa fa-behance"></i> behance</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/behance-square"><i class="fa fa-behance-square"></i> behance-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bomb"><i class="fa fa-bomb"></i> bomb</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/building"><i class="fa fa-building"></i> building</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/taxi"><i class="fa fa-cab"></i> cab <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/car"><i class="fa fa-car"></i> car</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/child"><i class="fa fa-child"></i> child</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/circle-o-notch"><i class="fa fa-circle-o-notch"></i> circle-o-notch</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/circle-thin"><i class="fa fa-circle-thin"></i> circle-thin</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/codepen"><i class="fa fa-codepen"></i> codepen</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cube"><i class="fa fa-cube"></i> cube</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cubes"><i class="fa fa-cubes"></i> cubes</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/database"><i class="fa fa-database"></i> database</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/delicious"><i class="fa fa-delicious"></i> delicious</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/deviantart"><i class="fa fa-deviantart"></i> deviantart</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/digg"><i class="fa fa-digg"></i> digg</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/drupal"><i class="fa fa-drupal"></i> drupal</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/empire"><i class="fa fa-empire"></i> empire</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/envelope-square"><i class="fa fa-envelope-square"></i> envelope-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/fax"><i class="fa fa-fax"></i> fax</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-archive-o"><i class="fa fa-file-archive-o"></i> file-archive-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-audio-o"><i class="fa fa-file-audio-o"></i> file-audio-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-code-o"><i class="fa fa-file-code-o"></i> file-code-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-excel-o"><i class="fa fa-file-excel-o"></i> file-excel-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-image-o"><i class="fa fa-file-image-o"></i> file-image-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-video-o"><i class="fa fa-file-movie-o"></i> file-movie-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-pdf-o"><i class="fa fa-file-pdf-o"></i> file-pdf-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-image-o"><i class="fa fa-file-photo-o"></i> file-photo-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-image-o"><i class="fa fa-file-picture-o"></i> file-picture-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-powerpoint-o"><i class="fa fa-file-powerpoint-o"></i> file-powerpoint-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-audio-o"><i class="fa fa-file-sound-o"></i> file-sound-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-video-o"><i class="fa fa-file-video-o"></i> file-video-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-word-o"><i class="fa fa-file-word-o"></i> file-word-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-archive-o"><i class="fa fa-file-zip-o"></i> file-zip-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/empire"><i class="fa fa-ge"></i> ge <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/git"><i class="fa fa-git"></i> git</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/git-square"><i class="fa fa-git-square"></i> git-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/google"><i class="fa fa-google"></i> google</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/graduation-cap"><i class="fa fa-graduation-cap"></i> graduation-cap</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/hacker-news"><i class="fa fa-hacker-news"></i> hacker-news</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/header"><i class="fa fa-header"></i> header</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/history"><i class="fa fa-history"></i> history</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/university"><i class="fa fa-institution"></i> institution <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/joomla"><i class="fa fa-joomla"></i> joomla</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/jsfiddle"><i class="fa fa-jsfiddle"></i> jsfiddle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/language"><i class="fa fa-language"></i> language</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/life-ring"><i class="fa fa-life-bouy"></i> life-bouy <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/life-ring"><i class="fa fa-life-ring"></i> life-ring</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/life-ring"><i class="fa fa-life-saver"></i> life-saver <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/graduation-cap"><i class="fa fa-mortar-board"></i> mortar-board <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/openid"><i class="fa fa-openid"></i> openid</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/paper-plane"><i class="fa fa-paper-plane"></i> paper-plane</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/paper-plane-o"><i class="fa fa-paper-plane-o"></i> paper-plane-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/paragraph"><i class="fa fa-paragraph"></i> paragraph</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/paw"><i class="fa fa-paw"></i> paw</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pied-piper"><i class="fa fa-pied-piper"></i> pied-piper</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pied-piper-alt"><i class="fa fa-pied-piper-alt"></i> pied-piper-alt</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pied-piper"><i class="fa fa-pied-piper-square"></i> pied-piper-square <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/qq"><i class="fa fa-qq"></i> qq</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/rebel"><i class="fa fa-ra"></i> ra <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/rebel"><i class="fa fa-rebel"></i> rebel</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/recycle"><i class="fa fa-recycle"></i> recycle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/reddit"><i class="fa fa-reddit"></i> reddit</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/reddit-square"><i class="fa fa-reddit-square"></i> reddit-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/paper-plane"><i class="fa fa-send"></i> send <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/paper-plane-o"><i class="fa fa-send-o"></i> send-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/share-alt"><i class="fa fa-share-alt"></i> share-alt</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/share-alt-square"><i class="fa fa-share-alt-square"></i> share-alt-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/slack"><i class="fa fa-slack"></i> slack</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sliders"><i class="fa fa-sliders"></i> sliders</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/soundcloud"><i class="fa fa-soundcloud"></i> soundcloud</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/space-shuttle"><i class="fa fa-space-shuttle"></i> space-shuttle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/spoon"><i class="fa fa-spoon"></i> spoon</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/spotify"><i class="fa fa-spotify"></i> spotify</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/steam"><i class="fa fa-steam"></i> steam</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/steam-square"><i class="fa fa-steam-square"></i> steam-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/stumbleupon"><i class="fa fa-stumbleupon"></i> stumbleupon</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/stumbleupon-circle"><i class="fa fa-stumbleupon-circle"></i> stumbleupon-circle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/life-ring"><i class="fa fa-support"></i> support <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/taxi"><i class="fa fa-taxi"></i> taxi</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/tencent-weibo"><i class="fa fa-tencent-weibo"></i> tencent-weibo</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/tree"><i class="fa fa-tree"></i> tree</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/university"><i class="fa fa-university"></i> university</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/vine"><i class="fa fa-vine"></i> vine</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/weixin"><i class="fa fa-wechat"></i> wechat <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/weixin"><i class="fa fa-weixin"></i> weixin</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/wordpress"><i class="fa fa-wordpress"></i> wordpress</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/yahoo"><i class="fa fa-yahoo"></i> yahoo</a></div></div></div><div data-tab="" data-heading="Web Application"><div class="row icon-list"><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/adjust"><i class="fa fa-adjust"></i> adjust</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/anchor"><i class="fa fa-anchor"></i> anchor</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/archive"><i class="fa fa-archive"></i> archive</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/arrows"><i class="fa fa-arrows"></i> arrows</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/arrows-h"><i class="fa fa-arrows-h"></i> arrows-h</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/arrows-v"><i class="fa fa-arrows-v"></i> arrows-v</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/asterisk"><i class="fa fa-asterisk"></i> asterisk</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/car"><i class="fa fa-automobile"></i> automobile <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/ban"><i class="fa fa-ban"></i> ban</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/university"><i class="fa fa-bank"></i> bank <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bar-chart-o"><i class="fa fa-bar-chart-o"></i> bar-chart-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/barcode"><i class="fa fa-barcode"></i> barcode</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bars"><i class="fa fa-bars"></i> bars</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/beer"><i class="fa fa-beer"></i> beer</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bell"><i class="fa fa-bell"></i> bell</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bell-o"><i class="fa fa-bell-o"></i> bell-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bolt"><i class="fa fa-bolt"></i> bolt</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bomb"><i class="fa fa-bomb"></i> bomb</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/book"><i class="fa fa-book"></i> book</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bookmark"><i class="fa fa-bookmark"></i> bookmark</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bookmark-o"><i class="fa fa-bookmark-o"></i> bookmark-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/briefcase"><i class="fa fa-briefcase"></i> briefcase</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bug"><i class="fa fa-bug"></i> bug</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/building"><i class="fa fa-building"></i> building</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/building-o"><i class="fa fa-building-o"></i> building-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bullhorn"><i class="fa fa-bullhorn"></i> bullhorn</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bullseye"><i class="fa fa-bullseye"></i> bullseye</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/taxi"><i class="fa fa-cab"></i> cab <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/calendar"><i class="fa fa-calendar"></i> calendar</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/calendar-o"><i class="fa fa-calendar-o"></i> calendar-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/camera"><i class="fa fa-camera"></i> camera</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/camera-retro"><i class="fa fa-camera-retro"></i> camera-retro</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/car"><i class="fa fa-car"></i> car</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/caret-square-o-down"><i class="fa fa-caret-square-o-down"></i> caret-square-o-down</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/caret-square-o-left"><i class="fa fa-caret-square-o-left"></i> caret-square-o-left</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/caret-square-o-right"><i class="fa fa-caret-square-o-right"></i> caret-square-o-right</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/caret-square-o-up"><i class="fa fa-caret-square-o-up"></i> caret-square-o-up</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/certificate"><i class="fa fa-certificate"></i> certificate</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/check"><i class="fa fa-check"></i> check</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/check-circle"><i class="fa fa-check-circle"></i> check-circle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/check-circle-o"><i class="fa fa-check-circle-o"></i> check-circle-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/check-square"><i class="fa fa-check-square"></i> check-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/check-square-o"><i class="fa fa-check-square-o"></i> check-square-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/child"><i class="fa fa-child"></i> child</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/circle"><i class="fa fa-circle"></i> circle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/circle-o"><i class="fa fa-circle-o"></i> circle-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/circle-o-notch"><i class="fa fa-circle-o-notch"></i> circle-o-notch</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/circle-thin"><i class="fa fa-circle-thin"></i> circle-thin</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/clock-o"><i class="fa fa-clock-o"></i> clock-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cloud"><i class="fa fa-cloud"></i> cloud</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cloud-download"><i class="fa fa-cloud-download"></i> cloud-download</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cloud-upload"><i class="fa fa-cloud-upload"></i> cloud-upload</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/code"><i class="fa fa-code"></i> code</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/code-fork"><i class="fa fa-code-fork"></i> code-fork</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/coffee"><i class="fa fa-coffee"></i> coffee</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cog"><i class="fa fa-cog"></i> cog</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cogs"><i class="fa fa-cogs"></i> cogs</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/comment"><i class="fa fa-comment"></i> comment</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/comment-o"><i class="fa fa-comment-o"></i> comment-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/comments"><i class="fa fa-comments"></i> comments</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/comments-o"><i class="fa fa-comments-o"></i> comments-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/compass"><i class="fa fa-compass"></i> compass</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/credit-card"><i class="fa fa-credit-card"></i> credit-card</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/crop"><i class="fa fa-crop"></i> crop</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/crosshairs"><i class="fa fa-crosshairs"></i> crosshairs</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cube"><i class="fa fa-cube"></i> cube</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cubes"><i class="fa fa-cubes"></i> cubes</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cutlery"><i class="fa fa-cutlery"></i> cutlery</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/tachometer"><i class="fa fa-dashboard"></i> dashboard <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/database"><i class="fa fa-database"></i> database</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/desktop"><i class="fa fa-desktop"></i> desktop</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/dot-circle-o"><i class="fa fa-dot-circle-o"></i> dot-circle-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/download"><i class="fa fa-download"></i> download</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pencil-square-o"><i class="fa fa-edit"></i> edit <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/ellipsis-h"><i class="fa fa-ellipsis-h"></i> ellipsis-h</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/ellipsis-v"><i class="fa fa-ellipsis-v"></i> ellipsis-v</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/envelope"><i class="fa fa-envelope"></i> envelope</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/envelope-o"><i class="fa fa-envelope-o"></i> envelope-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/envelope-square"><i class="fa fa-envelope-square"></i> envelope-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/eraser"><i class="fa fa-eraser"></i> eraser</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/exchange"><i class="fa fa-exchange"></i> exchange</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/exclamation"><i class="fa fa-exclamation"></i> exclamation</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/exclamation-circle"><i class="fa fa-exclamation-circle"></i> exclamation-circle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/exclamation-triangle"><i class="fa fa-exclamation-triangle"></i> exclamation-triangle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/external-link"><i class="fa fa-external-link"></i> external-link</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/external-link-square"><i class="fa fa-external-link-square"></i> external-link-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/eye"><i class="fa fa-eye"></i> eye</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/eye-slash"><i class="fa fa-eye-slash"></i> eye-slash</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/fax"><i class="fa fa-fax"></i> fax</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/female"><i class="fa fa-female"></i> female</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/fighter-jet"><i class="fa fa-fighter-jet"></i> fighter-jet</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-archive-o"><i class="fa fa-file-archive-o"></i> file-archive-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-audio-o"><i class="fa fa-file-audio-o"></i> file-audio-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-code-o"><i class="fa fa-file-code-o"></i> file-code-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-excel-o"><i class="fa fa-file-excel-o"></i> file-excel-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-image-o"><i class="fa fa-file-image-o"></i> file-image-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-video-o"><i class="fa fa-file-movie-o"></i> file-movie-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-pdf-o"><i class="fa fa-file-pdf-o"></i> file-pdf-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-image-o"><i class="fa fa-file-photo-o"></i> file-photo-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-image-o"><i class="fa fa-file-picture-o"></i> file-picture-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-powerpoint-o"><i class="fa fa-file-powerpoint-o"></i> file-powerpoint-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-audio-o"><i class="fa fa-file-sound-o"></i> file-sound-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-video-o"><i class="fa fa-file-video-o"></i> file-video-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-word-o"><i class="fa fa-file-word-o"></i> file-word-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-archive-o"><i class="fa fa-file-zip-o"></i> file-zip-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/film"><i class="fa fa-film"></i> film</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/filter"><i class="fa fa-filter"></i> filter</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/fire"><i class="fa fa-fire"></i> fire</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/fire-extinguisher"><i class="fa fa-fire-extinguisher"></i> fire-extinguisher</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/flag"><i class="fa fa-flag"></i> flag</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/flag-checkered"><i class="fa fa-flag-checkered"></i> flag-checkered</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/flag-o"><i class="fa fa-flag-o"></i> flag-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bolt"><i class="fa fa-flash"></i> flash <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/flask"><i class="fa fa-flask"></i> flask</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/folder"><i class="fa fa-folder"></i> folder</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/folder-o"><i class="fa fa-folder-o"></i> folder-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/folder-open"><i class="fa fa-folder-open"></i> folder-open</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/folder-open-o"><i class="fa fa-folder-open-o"></i> folder-open-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/frown-o"><i class="fa fa-frown-o"></i> frown-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/gamepad"><i class="fa fa-gamepad"></i> gamepad</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/gavel"><i class="fa fa-gavel"></i> gavel</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cog"><i class="fa fa-gear"></i> gear <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cogs"><i class="fa fa-gears"></i> gears <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/gift"><i class="fa fa-gift"></i> gift</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/glass"><i class="fa fa-glass"></i> glass</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/globe"><i class="fa fa-globe"></i> globe</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/graduation-cap"><i class="fa fa-graduation-cap"></i> graduation-cap</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/users"><i class="fa fa-group"></i> group <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/hdd-o"><i class="fa fa-hdd-o"></i> hdd-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/headphones"><i class="fa fa-headphones"></i> headphones</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/heart"><i class="fa fa-heart"></i> heart</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/heart-o"><i class="fa fa-heart-o"></i> heart-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/history"><i class="fa fa-history"></i> history</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/home"><i class="fa fa-home"></i> home</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/picture-o"><i class="fa fa-image"></i> image <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/inbox"><i class="fa fa-inbox"></i> inbox</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/info"><i class="fa fa-info"></i> info</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/info-circle"><i class="fa fa-info-circle"></i> info-circle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/university"><i class="fa fa-institution"></i> institution <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/key"><i class="fa fa-key"></i> key</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/keyboard-o"><i class="fa fa-keyboard-o"></i> keyboard-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/language"><i class="fa fa-language"></i> language</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/laptop"><i class="fa fa-laptop"></i> laptop</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/leaf"><i class="fa fa-leaf"></i> leaf</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/gavel"><i class="fa fa-legal"></i> legal <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/lemon-o"><i class="fa fa-lemon-o"></i> lemon-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/level-down"><i class="fa fa-level-down"></i> level-down</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/level-up"><i class="fa fa-level-up"></i> level-up</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/life-ring"><i class="fa fa-life-bouy"></i> life-bouy <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/life-ring"><i class="fa fa-life-ring"></i> life-ring</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/life-ring"><i class="fa fa-life-saver"></i> life-saver <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/lightbulb-o"><i class="fa fa-lightbulb-o"></i> lightbulb-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/location-arrow"><i class="fa fa-location-arrow"></i> location-arrow</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/lock"><i class="fa fa-lock"></i> lock</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/magic"><i class="fa fa-magic"></i> magic</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/magnet"><i class="fa fa-magnet"></i> magnet</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/share"><i class="fa fa-mail-forward"></i> mail-forward <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/reply"><i class="fa fa-mail-reply"></i> mail-reply <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/reply-all"><i class="fa fa-mail-reply-all"></i> mail-reply-all <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/male"><i class="fa fa-male"></i> male</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/map-marker"><i class="fa fa-map-marker"></i> map-marker</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/meh-o"><i class="fa fa-meh-o"></i> meh-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/microphone"><i class="fa fa-microphone"></i> microphone</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/microphone-slash"><i class="fa fa-microphone-slash"></i> microphone-slash</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/minus"><i class="fa fa-minus"></i> minus</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/minus-circle"><i class="fa fa-minus-circle"></i> minus-circle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/minus-square"><i class="fa fa-minus-square"></i> minus-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/minus-square-o"><i class="fa fa-minus-square-o"></i> minus-square-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/mobile"><i class="fa fa-mobile"></i> mobile</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/mobile"><i class="fa fa-mobile-phone"></i> mobile-phone <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/money"><i class="fa fa-money"></i> money</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/moon-o"><i class="fa fa-moon-o"></i> moon-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/graduation-cap"><i class="fa fa-mortar-board"></i> mortar-board <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/music"><i class="fa fa-music"></i> music</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bars"><i class="fa fa-navicon"></i> navicon <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/paper-plane"><i class="fa fa-paper-plane"></i> paper-plane</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/paper-plane-o"><i class="fa fa-paper-plane-o"></i> paper-plane-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/paw"><i class="fa fa-paw"></i> paw</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pencil"><i class="fa fa-pencil"></i> pencil</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pencil-square"><i class="fa fa-pencil-square"></i> pencil-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pencil-square-o"><i class="fa fa-pencil-square-o"></i> pencil-square-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/phone"><i class="fa fa-phone"></i> phone</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/phone-square"><i class="fa fa-phone-square"></i> phone-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/picture-o"><i class="fa fa-photo"></i> photo <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/picture-o"><i class="fa fa-picture-o"></i> picture-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/plane"><i class="fa fa-plane"></i> plane</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/plus"><i class="fa fa-plus"></i> plus</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/plus-circle"><i class="fa fa-plus-circle"></i> plus-circle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/plus-square"><i class="fa fa-plus-square"></i> plus-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/plus-square-o"><i class="fa fa-plus-square-o"></i> plus-square-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/power-off"><i class="fa fa-power-off"></i> power-off</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/print"><i class="fa fa-print"></i> print</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/puzzle-piece"><i class="fa fa-puzzle-piece"></i> puzzle-piece</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/qrcode"><i class="fa fa-qrcode"></i> qrcode</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/question"><i class="fa fa-question"></i> question</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/question-circle"><i class="fa fa-question-circle"></i> question-circle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/quote-left"><i class="fa fa-quote-left"></i> quote-left</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/quote-right"><i class="fa fa-quote-right"></i> quote-right</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/random"><i class="fa fa-random"></i> random</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/recycle"><i class="fa fa-recycle"></i> recycle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/refresh"><i class="fa fa-refresh"></i> refresh</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bars"><i class="fa fa-reorder"></i> reorder <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/reply"><i class="fa fa-reply"></i> reply</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/reply-all"><i class="fa fa-reply-all"></i> reply-all</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/retweet"><i class="fa fa-retweet"></i> retweet</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/road"><i class="fa fa-road"></i> road</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/rocket"><i class="fa fa-rocket"></i> rocket</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/rss"><i class="fa fa-rss"></i> rss</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/rss-square"><i class="fa fa-rss-square"></i> rss-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/search"><i class="fa fa-search"></i> search</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/search-minus"><i class="fa fa-search-minus"></i> search-minus</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/search-plus"><i class="fa fa-search-plus"></i> search-plus</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/paper-plane"><i class="fa fa-send"></i> send <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/paper-plane-o"><i class="fa fa-send-o"></i> send-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/share"><i class="fa fa-share"></i> share</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/share-alt"><i class="fa fa-share-alt"></i> share-alt</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/share-alt-square"><i class="fa fa-share-alt-square"></i> share-alt-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/share-square"><i class="fa fa-share-square"></i> share-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/share-square-o"><i class="fa fa-share-square-o"></i> share-square-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/shield"><i class="fa fa-shield"></i> shield</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/shopping-cart"><i class="fa fa-shopping-cart"></i> shopping-cart</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sign-in"><i class="fa fa-sign-in"></i> sign-in</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sign-out"><i class="fa fa-sign-out"></i> sign-out</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/signal"><i class="fa fa-signal"></i> signal</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sitemap"><i class="fa fa-sitemap"></i> sitemap</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sliders"><i class="fa fa-sliders"></i> sliders</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/smile-o"><i class="fa fa-smile-o"></i> smile-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sort"><i class="fa fa-sort"></i> sort</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sort-alpha-asc"><i class="fa fa-sort-alpha-asc"></i> sort-alpha-asc</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sort-alpha-desc"><i class="fa fa-sort-alpha-desc"></i> sort-alpha-desc</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sort-amount-asc"><i class="fa fa-sort-amount-asc"></i> sort-amount-asc</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sort-amount-desc"><i class="fa fa-sort-amount-desc"></i> sort-amount-desc</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sort-asc"><i class="fa fa-sort-asc"></i> sort-asc</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sort-desc"><i class="fa fa-sort-desc"></i> sort-desc</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sort-desc"><i class="fa fa-sort-down"></i> sort-down <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sort-numeric-asc"><i class="fa fa-sort-numeric-asc"></i> sort-numeric-asc</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sort-numeric-desc"><i class="fa fa-sort-numeric-desc"></i> sort-numeric-desc</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sort-asc"><i class="fa fa-sort-up"></i> sort-up <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/space-shuttle"><i class="fa fa-space-shuttle"></i> space-shuttle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/spinner"><i class="fa fa-spinner"></i> spinner</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/spoon"><i class="fa fa-spoon"></i> spoon</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/square"><i class="fa fa-square"></i> square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/square-o"><i class="fa fa-square-o"></i> square-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/star"><i class="fa fa-star"></i> star</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/star-half"><i class="fa fa-star-half"></i> star-half</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/star-half-o"><i class="fa fa-star-half-empty"></i> star-half-empty <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/star-half-o"><i class="fa fa-star-half-full"></i> star-half-full <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/star-half-o"><i class="fa fa-star-half-o"></i> star-half-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/star-o"><i class="fa fa-star-o"></i> star-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/suitcase"><i class="fa fa-suitcase"></i> suitcase</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sun-o"><i class="fa fa-sun-o"></i> sun-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/life-ring"><i class="fa fa-support"></i> support <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/tablet"><i class="fa fa-tablet"></i> tablet</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/tachometer"><i class="fa fa-tachometer"></i> tachometer</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/tag"><i class="fa fa-tag"></i> tag</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/tags"><i class="fa fa-tags"></i> tags</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/tasks"><i class="fa fa-tasks"></i> tasks</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/taxi"><i class="fa fa-taxi"></i> taxi</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/terminal"><i class="fa fa-terminal"></i> terminal</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/thumb-tack"><i class="fa fa-thumb-tack"></i> thumb-tack</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/thumbs-down"><i class="fa fa-thumbs-down"></i> thumbs-down</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/thumbs-o-down"><i class="fa fa-thumbs-o-down"></i> thumbs-o-down</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/thumbs-o-up"><i class="fa fa-thumbs-o-up"></i> thumbs-o-up</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/thumbs-up"><i class="fa fa-thumbs-up"></i> thumbs-up</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/ticket"><i class="fa fa-ticket"></i> ticket</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/times"><i class="fa fa-times"></i> times</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/times-circle"><i class="fa fa-times-circle"></i> times-circle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/times-circle-o"><i class="fa fa-times-circle-o"></i> times-circle-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/tint"><i class="fa fa-tint"></i> tint</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/caret-square-o-down"><i class="fa fa-toggle-down"></i> toggle-down <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/caret-square-o-left"><i class="fa fa-toggle-left"></i> toggle-left <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/caret-square-o-right"><i class="fa fa-toggle-right"></i> toggle-right <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/caret-square-o-up"><i class="fa fa-toggle-up"></i> toggle-up <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/trash-o"><i class="fa fa-trash-o"></i> trash-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/tree"><i class="fa fa-tree"></i> tree</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/trophy"><i class="fa fa-trophy"></i> trophy</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/truck"><i class="fa fa-truck"></i> truck</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/umbrella"><i class="fa fa-umbrella"></i> umbrella</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/university"><i class="fa fa-university"></i> university</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/unlock"><i class="fa fa-unlock"></i> unlock</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/unlock-alt"><i class="fa fa-unlock-alt"></i> unlock-alt</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/sort"><i class="fa fa-unsorted"></i> unsorted <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/upload"><i class="fa fa-upload"></i> upload</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/user"><i class="fa fa-user"></i> user</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/users"><i class="fa fa-users"></i> users</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/video-camera"><i class="fa fa-video-camera"></i> video-camera</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/volume-down"><i class="fa fa-volume-down"></i> volume-down</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/volume-off"><i class="fa fa-volume-off"></i> volume-off</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/volume-up"><i class="fa fa-volume-up"></i> volume-up</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/exclamation-triangle"><i class="fa fa-warning"></i> warning <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/wheelchair"><i class="fa fa-wheelchair"></i> wheelchair</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/wrench"><i class="fa fa-wrench"></i> wrench</a></div></div></div><div data-tab="" data-heading="Spinner"><div class="row icon-list"><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/circle-o-notch"><i class="fa fa-circle-o-notch"></i> circle-o-notch</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cog"><i class="fa fa-cog"></i> cog</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/cog"><i class="fa fa-gear"></i> gear <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/refresh"><i class="fa fa-refresh"></i> refresh</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/spinner"><i class="fa fa-spinner"></i> spinner</a></div></div></div><div data-tab="" data-heading="Text Editor"><div class="row icon-list"><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/align-center"><i class="fa fa-align-center"></i> align-center</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/align-justify"><i class="fa fa-align-justify"></i> align-justify</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/align-left"><i class="fa fa-align-left"></i> align-left</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/align-right"><i class="fa fa-align-right"></i> align-right</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bold"><i class="fa fa-bold"></i> bold</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/link"><i class="fa fa-chain"></i> chain <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/chain-broken"><i class="fa fa-chain-broken"></i> chain-broken</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/clipboard"><i class="fa fa-clipboard"></i> clipboard</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/columns"><i class="fa fa-columns"></i> columns</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/files-o"><i class="fa fa-copy"></i> copy <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/scissors"><i class="fa fa-cut"></i> cut <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/outdent"><i class="fa fa-dedent"></i> dedent <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/eraser"><i class="fa fa-eraser"></i> eraser</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file"><i class="fa fa-file"></i> file</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-o"><i class="fa fa-file-o"></i> file-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-text"><i class="fa fa-file-text"></i> file-text</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-text-o"><i class="fa fa-file-text-o"></i> file-text-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/files-o"><i class="fa fa-files-o"></i> files-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/floppy-o"><i class="fa fa-floppy-o"></i> floppy-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/font"><i class="fa fa-font"></i> font</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/header"><i class="fa fa-header"></i> header</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/indent"><i class="fa fa-indent"></i> indent</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/italic"><i class="fa fa-italic"></i> italic</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/link"><i class="fa fa-link"></i> link</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/list"><i class="fa fa-list"></i> list</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/list-alt"><i class="fa fa-list-alt"></i> list-alt</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/list-ol"><i class="fa fa-list-ol"></i> list-ol</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/list-ul"><i class="fa fa-list-ul"></i> list-ul</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/outdent"><i class="fa fa-outdent"></i> outdent</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/paperclip"><i class="fa fa-paperclip"></i> paperclip</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/paragraph"><i class="fa fa-paragraph"></i> paragraph</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/clipboard"><i class="fa fa-paste"></i> paste <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/repeat"><i class="fa fa-repeat"></i> repeat</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/undo"><i class="fa fa-rotate-left"></i> rotate-left <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/repeat"><i class="fa fa-rotate-right"></i> rotate-right <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/floppy-o"><i class="fa fa-save"></i> save <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/scissors"><i class="fa fa-scissors"></i> scissors</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/strikethrough"><i class="fa fa-strikethrough"></i> strikethrough</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/subscript"><i class="fa fa-subscript"></i> subscript</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/superscript"><i class="fa fa-superscript"></i> superscript</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/table"><i class="fa fa-table"></i> table</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/text-height"><i class="fa fa-text-height"></i> text-height</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/text-width"><i class="fa fa-text-width"></i> text-width</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/th"><i class="fa fa-th"></i> th</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/th-large"><i class="fa fa-th-large"></i> th-large</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/th-list"><i class="fa fa-th-list"></i> th-list</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/underline"><i class="fa fa-underline"></i> underline</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/undo"><i class="fa fa-undo"></i> undo</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/chain-broken"><i class="fa fa-unlink"></i> unlink <span class="text-muted">(alias)</span></a></div></div></div><div data-tab="" data-heading="Brand"><div class="row icon-list"><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/adn"><i class="fa fa-adn"></i> adn</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/android"><i class="fa fa-android"></i> android</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/apple"><i class="fa fa-apple"></i> apple</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/behance"><i class="fa fa-behance"></i> behance</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/behance-square"><i class="fa fa-behance-square"></i> behance-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bitbucket"><i class="fa fa-bitbucket"></i> bitbucket</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/bitbucket-square"><i class="fa fa-bitbucket-square"></i> bitbucket-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/btc"><i class="fa fa-bitcoin"></i> bitcoin <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/btc"><i class="fa fa-btc"></i> btc</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/codepen"><i class="fa fa-codepen"></i> codepen</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/css3"><i class="fa fa-css3"></i> css3</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/delicious"><i class="fa fa-delicious"></i> delicious</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/deviantart"><i class="fa fa-deviantart"></i> deviantart</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/digg"><i class="fa fa-digg"></i> digg</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/dribbble"><i class="fa fa-dribbble"></i> dribbble</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/dropbox"><i class="fa fa-dropbox"></i> dropbox</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/drupal"><i class="fa fa-drupal"></i> drupal</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/empire"><i class="fa fa-empire"></i> empire</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/facebook"><i class="fa fa-facebook"></i> facebook</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/facebook-square"><i class="fa fa-facebook-square"></i> facebook-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/flickr"><i class="fa fa-flickr"></i> flickr</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/foursquare"><i class="fa fa-foursquare"></i> foursquare</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/empire"><i class="fa fa-ge"></i> ge <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/git"><i class="fa fa-git"></i> git</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/git-square"><i class="fa fa-git-square"></i> git-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/github"><i class="fa fa-github"></i> github</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/github-alt"><i class="fa fa-github-alt"></i> github-alt</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/github-square"><i class="fa fa-github-square"></i> github-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/gittip"><i class="fa fa-gittip"></i> gittip</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/google"><i class="fa fa-google"></i> google</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/google-plus"><i class="fa fa-google-plus"></i> google-plus</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/google-plus-square"><i class="fa fa-google-plus-square"></i> google-plus-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/hacker-news"><i class="fa fa-hacker-news"></i> hacker-news</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/html5"><i class="fa fa-html5"></i> html5</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/instagram"><i class="fa fa-instagram"></i> instagram</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/joomla"><i class="fa fa-joomla"></i> joomla</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/jsfiddle"><i class="fa fa-jsfiddle"></i> jsfiddle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/linkedin"><i class="fa fa-linkedin"></i> linkedin</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/linkedin-square"><i class="fa fa-linkedin-square"></i> linkedin-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/linux"><i class="fa fa-linux"></i> linux</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/maxcdn"><i class="fa fa-maxcdn"></i> maxcdn</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/openid"><i class="fa fa-openid"></i> openid</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pagelines"><i class="fa fa-pagelines"></i> pagelines</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pied-piper"><i class="fa fa-pied-piper"></i> pied-piper</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pied-piper-alt"><i class="fa fa-pied-piper-alt"></i> pied-piper-alt</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pied-piper"><i class="fa fa-pied-piper-square"></i> pied-piper-square <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pinterest"><i class="fa fa-pinterest"></i> pinterest</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pinterest-square"><i class="fa fa-pinterest-square"></i> pinterest-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/qq"><i class="fa fa-qq"></i> qq</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/rebel"><i class="fa fa-ra"></i> ra <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/rebel"><i class="fa fa-rebel"></i> rebel</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/reddit"><i class="fa fa-reddit"></i> reddit</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/reddit-square"><i class="fa fa-reddit-square"></i> reddit-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/renren"><i class="fa fa-renren"></i> renren</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/share-alt"><i class="fa fa-share-alt"></i> share-alt</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/share-alt-square"><i class="fa fa-share-alt-square"></i> share-alt-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/skype"><i class="fa fa-skype"></i> skype</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/slack"><i class="fa fa-slack"></i> slack</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/soundcloud"><i class="fa fa-soundcloud"></i> soundcloud</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/spotify"><i class="fa fa-spotify"></i> spotify</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/stack-exchange"><i class="fa fa-stack-exchange"></i> stack-exchange</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/stack-overflow"><i class="fa fa-stack-overflow"></i> stack-overflow</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/steam"><i class="fa fa-steam"></i> steam</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/steam-square"><i class="fa fa-steam-square"></i> steam-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/stumbleupon"><i class="fa fa-stumbleupon"></i> stumbleupon</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/stumbleupon-circle"><i class="fa fa-stumbleupon-circle"></i> stumbleupon-circle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/tencent-weibo"><i class="fa fa-tencent-weibo"></i> tencent-weibo</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/trello"><i class="fa fa-trello"></i> trello</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/tumblr"><i class="fa fa-tumblr"></i> tumblr</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/tumblr-square"><i class="fa fa-tumblr-square"></i> tumblr-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/twitter"><i class="fa fa-twitter"></i> twitter</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/twitter-square"><i class="fa fa-twitter-square"></i> twitter-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/vimeo-square"><i class="fa fa-vimeo-square"></i> vimeo-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/vine"><i class="fa fa-vine"></i> vine</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/vk"><i class="fa fa-vk"></i> vk</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/weixin"><i class="fa fa-wechat"></i> wechat <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/weibo"><i class="fa fa-weibo"></i> weibo</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/weixin"><i class="fa fa-weixin"></i> weixin</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/windows"><i class="fa fa-windows"></i> windows</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/wordpress"><i class="fa fa-wordpress"></i> wordpress</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/xing"><i class="fa fa-xing"></i> xing</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/xing-square"><i class="fa fa-xing-square"></i> xing-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/yahoo"><i class="fa fa-yahoo"></i> yahoo</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/youtube"><i class="fa fa-youtube"></i> youtube</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/youtube-play"><i class="fa fa-youtube-play"></i> youtube-play</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/youtube-square"><i class="fa fa-youtube-square"></i> youtube-square</a></div></div></div><div data-tab="" data-heading="Other"><h3>File Type <span class="fw-semi-bold">Icons</span></h3><div class="row icon-list"><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file"><i class="fa fa-file"></i> file</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-archive-o"><i class="fa fa-file-archive-o"></i> file-archive-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-audio-o"><i class="fa fa-file-audio-o"></i> file-audio-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-code-o"><i class="fa fa-file-code-o"></i> file-code-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-excel-o"><i class="fa fa-file-excel-o"></i> file-excel-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-image-o"><i class="fa fa-file-image-o"></i> file-image-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-video-o"><i class="fa fa-file-movie-o"></i> file-movie-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-o"><i class="fa fa-file-o"></i> file-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-pdf-o"><i class="fa fa-file-pdf-o"></i> file-pdf-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-image-o"><i class="fa fa-file-photo-o"></i> file-photo-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-image-o"><i class="fa fa-file-picture-o"></i> file-picture-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-powerpoint-o"><i class="fa fa-file-powerpoint-o"></i> file-powerpoint-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-audio-o"><i class="fa fa-file-sound-o"></i> file-sound-o <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-text"><i class="fa fa-file-text"></i> file-text</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-text-o"><i class="fa fa-file-text-o"></i> file-text-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-video-o"><i class="fa fa-file-video-o"></i> file-video-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-word-o"><i class="fa fa-file-word-o"></i> file-word-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/file-archive-o"><i class="fa fa-file-zip-o"></i> file-zip-o <span class="text-muted">(alias)</span></a></div></div><h3>Form Control <span class="fw-semi-bold">Icons</span></h3><div class="row icon-list"><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/check-square"><i class="fa fa-check-square"></i> check-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/check-square-o"><i class="fa fa-check-square-o"></i> check-square-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/circle"><i class="fa fa-circle"></i> circle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/circle-o"><i class="fa fa-circle-o"></i> circle-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/dot-circle-o"><i class="fa fa-dot-circle-o"></i> dot-circle-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/minus-square"><i class="fa fa-minus-square"></i> minus-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/minus-square-o"><i class="fa fa-minus-square-o"></i> minus-square-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/plus-square"><i class="fa fa-plus-square"></i> plus-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/plus-square-o"><i class="fa fa-plus-square-o"></i> plus-square-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/square"><i class="fa fa-square"></i> square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/square-o"><i class="fa fa-square-o"></i> square-o</a></div></div><h3>Currency <span class="fw-semi-bold">Icons</span></h3><div class="row icon-list"><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/btc"><i class="fa fa-bitcoin"></i> bitcoin <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/btc"><i class="fa fa-btc"></i> btc</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/jpy"><i class="fa fa-cny"></i> cny <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/usd"><i class="fa fa-dollar"></i> dollar <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/eur"><i class="fa fa-eur"></i> eur</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/eur"><i class="fa fa-euro"></i> euro <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/gbp"><i class="fa fa-gbp"></i> gbp</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/inr"><i class="fa fa-inr"></i> inr</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/jpy"><i class="fa fa-jpy"></i> jpy</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/krw"><i class="fa fa-krw"></i> krw</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/money"><i class="fa fa-money"></i> money</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/jpy"><i class="fa fa-rmb"></i> rmb <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/rub"><i class="fa fa-rouble"></i> rouble <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/rub"><i class="fa fa-rub"></i> rub</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/rub"><i class="fa fa-ruble"></i> ruble <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/inr"><i class="fa fa-rupee"></i> rupee <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/try"><i class="fa fa-try"></i> try</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/try"><i class="fa fa-turkish-lira"></i> turkish-lira <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/usd"><i class="fa fa-usd"></i> usd</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/krw"><i class="fa fa-won"></i> won <span class="text-muted">(alias)</span></a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/jpy"><i class="fa fa-yen"></i> yen <span class="text-muted">(alias)</span></a></div></div><h3>Video Player <span class="fw-semi-bold">Icons</span></h3><div class="row icon-list"><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/arrows-alt"><i class="fa fa-arrows-alt"></i> arrows-alt</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/backward"><i class="fa fa-backward"></i> backward</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/compress"><i class="fa fa-compress"></i> compress</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/eject"><i class="fa fa-eject"></i> eject</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/expand"><i class="fa fa-expand"></i> expand</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/fast-backward"><i class="fa fa-fast-backward"></i> fast-backward</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/fast-forward"><i class="fa fa-fast-forward"></i> fast-forward</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/forward"><i class="fa fa-forward"></i> forward</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/pause"><i class="fa fa-pause"></i> pause</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/play"><i class="fa fa-play"></i> play</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/play-circle"><i class="fa fa-play-circle"></i> play-circle</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/play-circle-o"><i class="fa fa-play-circle-o"></i> play-circle-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/step-backward"><i class="fa fa-step-backward"></i> step-backward</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/step-forward"><i class="fa fa-step-forward"></i> step-forward</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/stop"><i class="fa fa-stop"></i> stop</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/youtube-play"><i class="fa fa-youtube-play"></i> youtube-play</a></div></div><h3>Medical <span class="fw-semi-bold">Icons</span></h3><div class="row icon-list"><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/ambulance"><i class="fa fa-ambulance"></i> ambulance</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/h-square"><i class="fa fa-h-square"></i> h-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/hospital-o"><i class="fa fa-hospital-o"></i> hospital-o</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/medkit"><i class="fa fa-medkit"></i> medkit</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/plus-square"><i class="fa fa-plus-square"></i> plus-square</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/stethoscope"><i class="fa fa-stethoscope"></i> stethoscope</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/user-md"><i class="fa fa-user-md"></i> user-md</a></div><div class="icon-list-item col-md-3 col-sm-4"><a href="../icon/wheelchair"><i class="fa fa-wheelchair"></i> wheelchair</a></div></div></div></div>'),
            a.put("app/modules/ui-list-groups/ui-list-groups.html", '<style>\r\n  body{\r\n    overflow-x: visible;\r\n  }\r\n</style><ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">UI List Groups</li></ol><h1 class="page-title">Lists - <span class="fw-semi-bold">Sortable Groups</span></h1><section class="widget"><header><h4>Grouped <span class="fw-semi-bold">Lists</span></h4><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><h3>Closest <span class="fw-semi-bold">Stars</span></h3><p>Try to play around with this list. Are you ready to pass an exam on astronomy?</p><ul class="list-group list-group-sortable mt-lg" data-ui-jq="sortable" data-ui-options="{ placeholder: \'list-group-item list-group-item-placeholder\', forcePlaceholderSize: true }"><li class="list-group-item"><i class="fa fa-sort"></i> <a href="#" class="close" data-dismiss="alert" aria-hidden="true">&times;</a> &nbsp;&nbsp;&nbsp; 03 &nbsp;&nbsp;&nbsp; Barnard\'s Star</li><li class="list-group-item"><i class="fa fa-sort"></i> <a href="#" class="close" data-dismiss="alert" aria-hidden="true">&times;</a> &nbsp;&nbsp;&nbsp; 01 &nbsp;&nbsp;&nbsp; The Sun</li><li class="list-group-item"><i class="fa fa-sort"></i> <a href="#" class="close" data-dismiss="alert" aria-hidden="true">&times;</a> &nbsp;&nbsp;&nbsp; 04 &nbsp;&nbsp;&nbsp; Wolf 359</li><li class="list-group-item"><i class="fa fa-sort"></i> <a href="#" class="close" data-dismiss="alert" aria-hidden="true">&times;</a> &nbsp;&nbsp;&nbsp; 02 &nbsp;&nbsp;&nbsp; Proxima Centauri</li><li class="list-group-item"><i class="fa fa-sort"></i> <a href="#" class="close" data-dismiss="alert" aria-hidden="true">&times;</a> &nbsp;&nbsp;&nbsp; 05 &nbsp;&nbsp;&nbsp; Lalande 21185</li></ul></div></section><section class="widget mt-lg"><header><h4>List <span class="fw-semi-bold">Groups</span></h4><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><h3>Nestable <span class="fw-semi-bold">List</span></h3><p class="fs-mini">There is a scientific theory that you can arrange this list in such way that there will be no more saddness in the whole world. Can you? Touch devices supported</p><div class="row"><div class="col-md-6 mt-lg"><div class="dd" data-ui-jq="nestable" data-ui-options="{ group: 1 }"><ol class="dd-list"><li class="dd-item" data-id="1"><div class="dd-handle">Item 1</div></li><li class="dd-item" data-id="2"><div class="dd-handle">Item 2</div><ol class="dd-list"><li class="dd-item" data-id="3"><div class="dd-handle">Item 3</div></li><li class="dd-item" data-id="4"><div class="dd-handle">Item 4</div></li><li class="dd-item" data-id="5"><div class="dd-handle">Item 5</div><ol class="dd-list"><li class="dd-item" data-id="6"><div class="dd-handle">Item 6</div></li><li class="dd-item" data-id="7"><div class="dd-handle">Item 7</div></li><li class="dd-item" data-id="8"><div class="dd-handle">Item 8</div></li></ol></li><li class="dd-item" data-id="9"><div class="dd-handle">Item 9</div></li></ol></li></ol></div></div><div class="col-md-6 mt-lg"><div class="dd" data-ui-jq="nestable" data-ui-options="{ group: 1 }"><ol class="dd-list"><li class="dd-item" data-id="13"><div class="dd-handle">Item 13</div></li><li class="dd-item" data-id="14"><div class="dd-handle">Item 14</div></li><li class="dd-item" data-id="15"><div class="dd-handle">Item 15</div><ol class="dd-list"><li class="dd-item" data-id="16"><div class="dd-handle">Item 16</div></li><li class="dd-item" data-id="17"><div class="dd-handle">Item 17</div></li><li class="dd-item" data-id="18"><div class="dd-handle">Item 18</div></li></ol></li></ol></div></div></div></div></section>'), a.put("app/modules/ui-notifications/ui-notifications.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">UI Notifications</li></ol><h1 class="page-title">Messages - <span class="fw-semi-bold">Notifications</span></h1><section class="widget" data-messenger-demo=""><header><h5>Messenger</h5><div class="widget-controls"><a title="Properties" href="#"><i class="glyphicon glyphicon-cog"></i></a> <a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-plus"></i></a> <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-minus"></i></a> <a data-widgster="close" title="Close" href="#"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><div class="row"><div class="col-md-4"><h4>Layout options</h4><p>There are few position options available for notifications. You can click any of them to change notifications position:</p><div class="location-selector"><div class="bit top left" data-position="top left"></div><div class="bit top right" data-position="top right"></div><div class="bit top" data-position="top"></div><div class="bit bottom left" data-position="bottom left"></div><div class="bit bottom right" data-position="bottom right"></div><div class="bit bottom" data-position="bottom"></div></div></div><div class="col-md-4"><h4>Notification Types</h4><p>Different types of notifications for lost of use cases. Custom classes are also supported.</p><p><a class="btn btn-info" id="show-info-message" href="#">Info Message</a></p><p><a class="btn btn-danger" id="show-error-message" href="#">Error + Retry Message</a></p><p><a class="btn btn-success" id="show-success-message" href="#">Success Message</a></p></div><div class="col-md-4"><h4>Dead Simple Usage</h4><p>Just few lines of code to instantiate a notifications object. Does not require passing any options:</p><pre><code>Messenger().post("Thanks for checking out Messenger!");</code></pre><p>More complex example:</p><pre><code>Messenger().post({\r\n  message: \'There was an explosion while processing your request.\',\r\n  type: \'error\',\r\n  showCloseButton: true\r\n});</code></pre></div></div></div></section>'), a.put("app/modules/ui-tabs-accordion/ui-tabs-accordion.html", '<ol class="breadcrumb"><li>YOU ARE HERE</li><li class="active">UI Tabs & Accordion</li></ol><h1 class="page-title">Tabs & Accordion - <span class="fw-semi-bold">Components</span></h1><div class="row mb-lg"><div class="col-md-6"><div class="clearfix"><ul id="tabs1" class="nav nav-tabs pull-left"><li class="active"><a data-target="#tab1" data-toggle="tab">Basic</a></li><li class=""><a data-target="#tab2" data-toggle="tab">Assumtion</a></li><li class="dropdown" data-dropdown="" data-ng-init="isOpen = false;" data-is-open="isOpen"><a href="" class="dropdown-toggle" data-dropdown-toggle="">Dropdown <b class="caret"></b></a><ul class="dropdown-menu"><li class=""><a data-target="#tab3" href="" tabindex="-1" data-toggle="tab" ng-click="isOpen = false">@fat</a></li><li class=""><a data-target="#tab4" href="" tabindex="-1" data-toggle="tab" ng-click="isOpen = false">@mdo</a></li></ul></li></ul></div><div id="tabs1c" class="tab-content mb-lg"><div class="tab-pane active clearfix" id="tab1"><h2>Tabs-enabled widget</h2><p>You will never know exactly how something will go until you try it.</p><p>You can think three hundred times and still have no precise result. If you see attractive girl all you need to do is to go and ask her to give you her phone. You don’t need to think about HOW it can turn out. All you have to do is to GO and DO IT. It should be super-fast and easy. No hesitation. You ask me: “What to do with these fearful thoughts preventing me from doing that?” The answer is to ignore them, because they can’t disappear immediately.</p><p>The same thing is for startups and ideas. If you have an idea right away after it appears in your mind you should go and make a first step to implement it.</p><div class="pull-right"><button class="btn btn-inverse">Cancel</button> <button class="btn btn-primary">Some button</button></div></div><div class="tab-pane" id="tab2"><p>Why don\'t use Lore Ipsum? I think if some one says don\'t use lore ipsum it\'s very controversial point. I think the opposite actually. Everyone knows what is lore ipsum - it is easy to understand if text is lore ipsum.</p><div class="clearfix"><div class="btn-toolbar"><a class="btn btn-default" href="#">&nbsp;&nbsp;Check&nbsp;&nbsp;</a> <a class="btn btn-primary" href="#">&nbsp;&nbsp;Dance?&nbsp;&nbsp;</a></div></div></div><div class="tab-pane" id="tab3"><p>If you will think too much it will sink in the swamp of never implemented plans and ideas or will just go away or will be implemented by someone else.</p><p><strong>5 months of doing everything to achieve nothing.</strong></p><p>You\'ll automatically skip - because you know - it\'s just non-informative stub. But what if there some text like this one?</p></div><div class="tab-pane" id="tab4"><blockquote class="blockquote-sm mb-xs">Plan it? Make it!</blockquote><p>The same thing is for startups and ideas. If you have an idea right away after it appears in your mind you should go and make a first step to implement it.</p></div></div></div><div class="col-md-6"><div class="tabbable tabs-left mb-lg"><ul id="tabs2" class="nav nav-tabs"><li class=""><a data-target="#tab12" data-toggle="tab">Basic</a></li><li class="active"><a data-target="#tab22" data-toggle="tab">Assumtion</a></li><li class=""><a data-target="#tab32" data-toggle="tab">Works</a></li></ul><div id="tabs2c" class="tab-content"><div class="tab-pane" id="tab12"><p>I had an idea named Great Work. It was a service aimed to help people find their passion. Yes I know it sound crazy and super naïve but I worked on that. I started to work on planning, graphics, presentations, pictures, descriptions, articles, investments and so on. I worked on everything but not the project itself.</p></div><div class="tab-pane active" id="tab22"><p>Why don\'t use Lore Ipsum? I think if some one says don\'t use lore ipsum it\'s very controversial point. I think the opposite actually. Everyone knows what is lore ipsum - it is easy to understand if text is lore ipsum.</p><div class="clearfix"><div class="btn-toolbar"><a class="btn btn-danger" href="#">&nbsp;&nbsp;Check&nbsp;&nbsp;</a> <a class="btn btn-default" href="#">&nbsp;&nbsp;Dance?&nbsp;&nbsp;</a></div></div></div><div class="tab-pane" id="tab32"><p>If you will think too much it will sink in the swamp of never implemented plans and ideas or will just go away or will be implemented by someone else.</p><p><strong>5 months of doing everything to achieve nothing.</strong></p><p>You\'ll automatically skip - because you know - it\'s just non-informative stub. But what if there some text like this one?</p></div></div></div></div><div class="col-md-6"><div class="tabbable tabs-right"><ul id="tabs3" class="nav nav-tabs"><li class=""><a data-target="#tab13" data-toggle="tab">Basic</a></li><li class=""><a data-target="#tab23" data-toggle="tab">Assumtion</a></li><li class="active"><a data-target="#tab33" data-toggle="tab">Works</a></li></ul><div id="tabs3c" class="tab-content"><div class="tab-pane" id="tab13"><p>I had an idea named Great Work. It was a service aimed to help people find their passion. Yes I know it sound crazy and super naïve but I worked on that. I started to work on planning, graphics, presentations, pictures, descriptions, articles, investments and so on. I worked on everything but not the project itself.</p></div><div class="tab-pane" id="tab23"><p>Why don\'t use Lore Ipsum? I think if some one says don\'t use lore ipsum it\'s very controversial point. I think the opposite actually. Everyone knows what is lore ipsum - it is easy to understand if text is lore ipsum.</p><div class="clearfix"><div class="btn-toolbar"><a class="btn btn-primary" href="#">&nbsp;&nbsp;Check&nbsp;&nbsp;</a> <a class="btn btn-default" href="#">&nbsp;&nbsp;Dance?&nbsp;&nbsp;</a></div></div></div><div class="tab-pane active" id="tab33"><p>If you will think too much it will sink in the swamp of never implemented plans and ideas or will just go away or will be implemented by someone else.</p><p><strong>5 months of doing everything to achieve nothing.</strong></p><p>You\'ll automatically skip - because you know - it\'s just non-informative stub. But what if there some text like this one?</p></div></div></div></div></div><div class="row"><div class="col-md-6"><div class="panel-group mb-lg" id="accordion" data-toggle="collapse"><div class="panel panel-default"><div class="panel-heading collapsed"><h5 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion" data-target="#collapseOne">Collapsible Group Item <i class="fa fa-angle-down pull-right"></i></a></h5></div><div id="collapseOne" class="panel-collapse collapse"><div class="panel-body">Get base styles and flexible support for collapsible components like accordions and navigation. Using the collapse plugin, we built a simple accordion by extending the panel component.</div></div></div><div class="panel panel-default"><div class="panel-heading"><h5 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" data-target="#collapseTwo">Random from the Web <i class="fa fa-angle-down pull-right"></i></a></h5></div><div id="collapseTwo" class="panel-collapse collapse in"><div class="panel-body"><p><span class="fw-semi-bold">Light Blue</span> - is a next generation admin template based on the latest Metro design. There are few reasons we want to tell you, why we have created it: We didn\'t like the darkness of most of admin templates, so we created this light one. We didn\'t like the high contrast of most of admin templates, so we created this unobtrusive one. We searched for a solution of how to make widgets look like real widgets, so we decided that deep background - is what makes widgets look real.</p><p class="no-margin text-muted"><em>- Some One</em></p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h5 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion" data-target="#collapseThree">Check It <i class="fa fa-angle-down pull-right"></i></a></h5></div><div id="collapseThree" class="panel-collapse collapse"><div class="panel-body">Why don\'t use Lore Ipsum? I think if some one says don\'t use lore ipsum it\'s very controversial point. I think the opposite actually.</div></div></div></div></div><div class="col-md-6"><div class="panel-group mb-lg" id="accordion2" data-toggle="collapse"><div class="panel panel-default"><div class="panel-heading"><h5 class="panel-title"><a data-toggle="collapse" data-parent="#accordion2" data-target="#collapseOne2">Collapsible Group Item <i class="fa fa-angle-down pull-right"></i></a></h5></div><div id="collapseOne2" class="panel-collapse collapse in"><div class="panel-body">Get base styles and flexible support for collapsible components like accordions and navigation. Using the collapse plugin, we built a simple accordion by extending the panel component.</div></div></div><div class="panel panel-default"><div class="panel-heading collapsed"><h5 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion2" data-target="#collapseTwo2">Normal Text Insertion <i class="fa fa-angle-down pull-right"></i></a></h5></div><div id="collapseTwo2" class="panel-collapse collapse"><div class="panel-body"><p>Why don\'t use Lore Ipsum? I think if some one says don\'t use lore ipsum it\'s very controversial point. I think the opposite actually. Everyone knows what is lore ipsum - it is easy to understand if text is lore ipsum. You\'ll automatically skip - because you know - it\'s just non-informative stub. But what if there some text like this one? You start to read it! But the goal of this text is different. The goal is the example. So a bit of Lore Ipsum is always very good practice. Keep it in mind!</p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h5 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion2" data-target="#collapseThree2">Check It <i class="fa fa-angle-down pull-right"></i></a></h5></div><div id="collapseThree2" class="panel-collapse collapse"><div class="panel-body">Why don\'t use Lore Ipsum? I think if some one says don\'t use lore ipsum it\'s very controversial point. I think the opposite actually.</div></div></div></div></div></div>'), a.put("app/modules/widgets/widgets.html", '<div class="row"><div class="col-md-3 col-sm-6"><section class="widget bg-primary text-white"><div class="widget-body clearfix"><div class="row"><div class="col-xs-3"><span class="widget-icon"><i class="glyphicon glyphicon-globe"></i></span></div><div class="col-xs-9"><h5 class="no-margin">USERS GROWTH</h5><p class="h2 no-margin fw-normal">4,332</p></div></div><div class="row"><div class="col-xs-6"><h5 class="no-margin">Registrations</h5><p class="value4">+830</p></div><div class="col-xs-6"><h5 class="no-margin">Bounce Rate</h5><p class="value4">4.5%</p></div></div></div></section></div><div class="col-md-3 col-sm-6"><section class="widget bg-info text-white"><div class="widget-body clearfix"><div class="row"><div class="col-xs-3"><span class="widget-icon"><i class="glyphicon glyphicon-user"></i></span></div><div class="col-xs-9"><div class="live-tile" data-mode="carousel" data-speed="750" data-delay="3000" data-height="57"><div><h5 class="no-margin">VISITS TODAY</h5><p class="h2 no-margin fw-normal">12,324</p></div><div><h5 class="no-margin">VISITS YESTERDAY</h5><p class="h2 no-margin fw-normal">11,885</p></div></div></div></div><div class="row"><div class="col-xs-6"><h5 class="no-margin">New Visitors</h5><div class="live-tile" data-mode="carousel" data-speed="750" data-delay="3000" data-height="25"><div><p class="value4">1,332</p></div><div><p class="value4">20.1%</p></div></div></div><div class="col-xs-6"><h5 class="no-margin">Bounce Rate</h5><div class="live-tile" data-mode="carousel" data-speed="750" data-delay="3000" data-height="26"><div><p class="value4">217</p></div><div><p class="value4">2.3%</p></div></div></div></div></div></section></div><div class="col-md-3 col-sm-6"><section class="widget bg-gray text-white"><div class="widget-body clearfix"><div class="live-tile" data-mode="fade" data-speed="750" data-delay="4000" data-height="100"><div class="bg-gray"><div class="row"><div class="col-xs-3"><span class="widget-icon"><i class="glyphicon glyphicon-globe"></i></span></div><div class="col-xs-9"><h5 class="no-margin">ORDERS</h5><p class="h2 no-margin fw-normal">82,765</p></div></div><div class="row"><div class="col-xs-6"><h5 class="no-margin">Avg. Time</h5><p class="value4">2:56</p></div><div class="col-xs-6"><h5 class="no-margin">Last Week</h5><p class="value4">374</p></div></div></div><div><div class="row"><div class="col-xs-3"><span class="widget-icon"><i class="glyphicon glyphicon-certificate"></i></span></div><div class="col-xs-9"><h5 class="no-margin">PICKED ORDERS</h5><p class="h2 no-margin fw-normal">13.8%</p></div></div><div class="row"><div class="col-xs-6"><h5 class="no-margin">Basic</h5><p class="value4">3,692</p></div><div class="col-xs-6"><h5 class="no-margin">Advanced</h5><p class="value4">1,441</p></div></div></div></div></div></section></div><div class="col-md-3 col-sm-6"><section class="widget bg-success text-white"><div class="widget-body clearfix"><div class="row"><div class="col-xs-3"><span class="widget-icon"><i class="glyphicon glyphicon-usd"></i></span></div><div class="col-xs-9"><h5 class="no-margin">TOTAL PROFIT</h5><p class="h2 no-margin fw-normal">$7,448</p></div></div><div class="row"><div class="col-xs-6"><h5 class="no-margin">Last Month</h5><p class="value4">$83,541</p></div><div class="col-xs-6"><h5 class="no-margin">Last Week</h5><p class="value4">$17,926</p></div></div></div></section></div></div><div class="row"><div class="col-md-6"><section class="widget widget-chart-stats-simple"><header><div class="row"><div class="col-xs-3"><h4>Total Sales</h4><p class="value4">January, 2014</p></div><div class="col-xs-3"><h4><small>Best</small></h4><p class="value5">March, 2013 + 1</p></div></div><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><div class="chart-stats"><p class="text-muted fs-mini mt-xs"><i class="fa fa-map-marker fa-5x pull-left"></i> <span class="fw-semi-bold text-gray-dark">Jess:</span> Seems like statically it\'s getting impossible to achieve any sort of results in nearest future. The only thing we can hope for is pressing one of these two buttons:</p><div class="btn-toolbar"><button class="btn btn-xs btn-success">Accept</button> <button class="btn btn-xs btn-default">Reject</button></div></div><div class="chart bg-body-light" data-ng-controller="FlotChartDemoController"><div data-flot-chart="" data-ng-init="data = generateRandomData([{ label: \'Visitors\', color: app.helpers.darkenColor(app.settings.colors[\'gray-lighter\'], .05) },{ label: \'Charts\', color: app.settings.colors[\'brand-danger\'] }])" data-ng-model="data" class="chart-inner"></div></div></div></section></div><div class="col-md-6"><section class="widget widget-chart-stats-simple"><header><h5 class="mb-0"><span class="fw-semi-bold">Budget</span> <span class="badge bg-danger">2017</span></h5><span class="text-muted fs-mini">monthly report will be available in <a href="#">6 hours</a></span><div class="widget-controls"><a href="#"><i class="glyphicon glyphicon-cog"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div></header><div class="widget-body"><div class="chart-stats"><div class="row"><div class="col-sm-5"><div class="clearfix"><h6 class="pull-left text-muted mb-xs">Income</h6><p class="pull-right h5 mb-xs"><span class="fw-semi-bold">$14,595</span></p></div><div class="clearfix"><h6 class="pull-left no-margin text-muted">Recent</h6><p class="pull-right"><span class="fw-semi-bold">$7,647</span></p></div></div><div class="col-sm-3 text-align-right"><h6 class="text-muted mb-xs">Inqueries</h6><p class="fw-semi-bold">73 at 14am</p></div><div class="col-sm-4 text-align-right"><h6 class="text-muted mb-xs">Last Updated</h6><p class="fw-semi-bold">23.06.2013</p></div></div></div><div class="chart bg-body-light" data-ng-controller="FlotChartDemoController"><div data-flot-chart="" data-ng-init="data = generateRandomData([{ label: \'Controllers\', color: \'#777\' },{ label: \'Scopes\', color: app.settings.colors[\'brand-warning\'] }])" data-ng-model="data" class="chart-inner"></div></div></div></section></div></div><div class="row"><div class="col-md-4"><section class="widget"><div class="widget-controls"><a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div><div class="widget-body"><div class="widget-top-overflow windget-padding-md clearfix bg-warning text-white"><h3 class="mt-lg mb-lg">Sing - <span class="fw-semi-bold">Next Generation</span> Admin Dashboard Template</h3><ul class="tags text-white pull-right"><li><a href="#">features</a></li></ul></div><div class="post-user mt-n-lg"><span class="thumb-lg pull-left mr"><img class="img-circle" src="assets/images/people/a4.jpg" alt="..."></span><h5 class="mt-sm fw-normal text-white">Jeremy <small class="text-white text-light">@sing</small></h5><p class="fs-mini text-muted"><time>25 mins</time>&nbsp; <i class="fa fa-map-marker"></i> &nbsp; near Amsterdam</p></div><p class="text-light fs-mini m">Lots of cool stuff is happening around you. Just calm down for a sec and listen. Colors, sounds, thoughts, ideas.</p></div><footer class="bg-body-light"><ul class="post-links"><li><a href="#">1 hour</a></li><li><a href="#"><span class="text-danger"><i class="fa fa-heart"></i> Like</span></a></li><li><a href="#">Comment</a></li></ul><ul class="post-comments mt mb-0"><li><span class="thumb-xs avatar pull-left mr-sm"><img class="img-circle" src="assets/images/people/a1.jpg" alt="..."></span><div class="comment-body"><h6 class="author fw-semi-bold">Ignacio Abad <small>6 mins ago</small></h6><p>Hey, have you heard anything about that?</p></div></li><li><span class="thumb-xs avatar pull-left mr-sm"><img class="img-circle" src="assets/images/avatar.png" alt="..."></span><div class="comment-body"><input class="form-control input-sm" type="text" placeholder="Write your comment..."></div></li></ul></footer></section></div><div class="col-md-4"><section class="widget"><div class="widget-controls"><a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div><div class="widget-body"><div class="widget-top-overflow text-white"><img src="assets/images/pictures/17.jpg"><ul class="tags text-white pull-right"><li><a href="#">design</a></li><li><a href="#">white</a></li></ul></div><div class="post-user mt-sm"><span class="thumb pull-left mr"><img class="img-circle" src="assets/images/people/a6.jpg" alt="..."></span><h5 class="mb-xs mt-xs"><span class="fw-semi-bold">Maryna</span> Nilson</h5><p class="fs-mini text-muted"><time>25 mins</time>&nbsp; <i class="fa fa-map-marker"></i> &nbsp; near Amsterdam</p></div><p class="text-light fs-mini m">Lots of cool stuff is happening around you. Just calm down for a sec and listen. Colors, sounds, thoughts, ideas.</p></div><footer class="bg-body-light"><ul class="post-links no-separator"><li><a href="#"><span class="text-danger"><i class="fa fa-heart"></i> 427</span></a></li><li><a href="#"><i class="glyphicon glyphicon-comment"></i> 98</a></li></ul></footer></section></div><div class="col-md-4"><section class="widget"><div class="widget-controls"><a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div><div class="widget-body"><div class="post-user mt-n-xs"><span class="thumb pull-left mr"><img class="img-circle" src="assets/images/people/a2.jpg" alt="..."></span><h5 class="mb-xs mt-xs">Jess <span class="fw-semi-bold">@jessica</span></h5><p class="fs-mini text-muted"><time>25 mins</time>&nbsp; <i class="fa fa-map-marker"></i> &nbsp; near Amsterdam</p></div><div class="widget-middle-overflow windget-padding-md clearfix bg-danger text-white"><h3 class="mt-lg mb-lg">Sing - <span class="fw-semi-bold">Next Generation</span> Admin Dashboard Template</h3><ul class="tags text-white pull-right"><li><a href="#">design</a></li></ul></div><p class="text-light fs-mini mt-sm">Lots of cool stuff is happening around you. Just calm down for a sec and listen. Colors, sounds, thoughts, ideas.</p></div><footer class="bg-body-light"><ul class="post-links"><li><a href="#">1 hour</a></li><li><a href="#"><span class="text-danger"><i class="fa fa-heart"></i> Like</span></a></li><li><a href="#">Comment</a></li></ul></footer></section></div></div><div class="row"><div class="col-md-6"><section class="widget"><div class="widget-image text-white"><img src="assets/images/pictures/18.jpg"><h3 class="title"><span class="fw-normal">Sunnyvale</span>, CA</h3><div class="info text-align-right"><i class="fa fa-map-marker h1 no-margin mr-xs"></i><h6 class="no-margin mt-xs">FLORIDA, USA</h6><p class="fs-sm">9:41 am</p></div><div class="forecast"><div class="row"><div class="col-xs-6 col-sm-4"><div class="row mt-xs"><div class="col-xs-6 no-padding"><canvas data-sky-con="clear-day" data-color="app.settings.colors[\'white\']" width="40" height="40"></canvas><p class="no-margin fw-normal mt-n-xs">sunny</p></div><div class="col-xs-6 no-padding"><h5 class="fw-semi-bold no-margin">SUNDAY</h5><p class="value1">29&deg;</p></div></div></div><div class="col-xs-3 col-sm-2 no-padding"><h6 class="no-margin">TOMMOROW</h6><canvas class="mt-xs" data-sky-con="partly-cloudy-day" data-color="app.settings.colors[\'white\']" width="28" height="28"></canvas><p class="no-margin fw-semi-bold">32&deg;</p></div><div class="col-xs-3 col-sm-2 no-padding"><h6 class="no-margin">TUE</h6><canvas class="mt-xs" data-sky-con="rain" data-color="app.settings.colors[\'white\']" width="28" height="28"></canvas><p class="no-margin fw-semi-bold">25&deg;</p></div><div class="col-xs-3 col-sm-2 no-padding"><h6 class="no-margin">WED</h6><canvas class="mt-xs" data-sky-con="clear-day" data-color="app.helpers.lightenColor(app.settings.colors[\'brand-warning\'], 0.1)" width="28" height="28"></canvas><p class="no-margin fw-semi-bold">28&deg;</p></div><div class="col-xs-3 col-sm-2 no-padding"><h6 class="no-margin">THU</h6><canvas class="mt-xs" data-sky-con="partly-cloudy-day" data-color="app.settings.colors[\'white\']" width="28" height="28"></canvas><p class="no-margin fw-semi-bold">17&deg;</p></div></div></div></div></section><div class="row"><div class="col-sm-6"><section class="widget no-padding text-align-center"><div class="row no-margin"><div class="col-xs-5 bg-danger btlr bblr"><canvas class="mt" data-sky-con="clear-day" data-color="app.settings.colors[\'white\']" width="62" height="62"></canvas><h5 class="text-white fw-normal">FRIDAY</h5></div><div class="col-xs-7"><p class="value0 text-danger mt-n-xs mr-n-xs">33&deg;</p><p class="mt-n-sm mb-xs fw-normal fs-sm text-muted">WINDY</p><div class="row"><div class="col-xs-6 no-padding"><canvas data-sky-con="wind" data-color="app.settings.colors[\'gray-light\']" width="20" height="20"></canvas><div class="display-inline-block"><p class="value5">4</p><p class="fs-sm no-margin mt-n-xs text-muted fw-normal">MPS</p></div></div><div class="col-xs-6 no-padding"><canvas data-sky-con="rain" data-color="app.settings.colors[\'gray-light\']" width="20" height="20"></canvas><div class="display-inline-block"><p class="value5">52</p><p class="fs-sm no-margin mt-n-xs text-muted fw-normal">MM</p></div></div></div></div></div></section></div><div class="col-sm-6"><section class="widget no-padding text-align-center"><div class="row no-margin"><div class="col-xs-7 bg-success btlr bblr"><p class="value0 text-white mt-sm mr-n-xs mb-n-xs">20&deg;</p><p class="text-white display-inline-block fw-normal display-inline-block mb">SUNDAY</p></div><div class="col-xs-5"><canvas class="mt" data-sky-con="partly-cloudy-day" data-color="app.settings.colors[\'brand-success\']" width="60" height="60"></canvas><p class="fw-normal fs-sm text-muted">WINDY</p></div></div></section></div></div></div><div class="col-md-6"><div class="row"><div class="col-sm-6"><section class="widget widget-chart-simple widget-sm"><div class="widget-body"><h5 class="mb-xs fw-normal">Nasdaq</h5><div class="chart-value">355 <span class="fw-semi-bold">USD</span></div><p>Last Sale 354.94 USD</p><div class="chart" data-ng-controller="NasdaqSparklineDemoController"><div data-jq-sparkline="" data-ng-model="data" data-options="options"></div></div></div></section><section class="widget widget-sm bg-primary"><div class="widget-body"><p class="mb-xs"><i class="fa fa-arrow-circle-up fa-3x opacity-50"></i></p><p class="text-light mb"><time>10 June</time></p><h3>Lots of <span class="fw-semi-bold">new</span> amazing possibilities</h3><p class="fs-mini mt"><span class="fw-semi-bold">214</span> likes &nbsp; <span class="fw-semi-bold">96</span> comments</p></div></section></div><div class="col-sm-6"><section class="widget widget-sm bg-success text-white"><div class="widget-body"><p class="mb-xs"><i class="fa fa-comments fa-2x"></i></p><h4>Lots of <span class="fw-semi-bold">possibilities</span> to customize your new <span class="fw-semi-bold">admin template</span></h4><p class="fs-mini mt-sm"><span class="fw-semi-bold">83</span> likes &nbsp; <span class="fw-semi-bold">96</span> comments &nbsp; <span class="fw-semi-bold">7</span> shares</p><p class="text-light fs-sm mt-lg"><time>10 June</time></p></div></section><section class="widget widget-sm"><header><h5>Server <span class="fw-semi-bold">Overview</span></h5></header><div class="widget-body"><div class="clearfix fs-mini"><span class="pull-right no-margin fw-semi-bold">CPU</span> <span class="fs-mini">60% / 37°C / 3.3 Ghz</span></div><div class="progress progress-xs"><div class="progress-bar" style="width: 70%;"></div></div><div class="clearfix fs-mini mt"><span class="pull-right no-margin fw-semi-bold">Mem</span> <span class="fs-mini">29% / 4GB (16 GB)</span></div><div class="progress progress-xs"><div class="progress-bar progress-bar-warning" style="width: 29%;"></div></div><div class="clearfix fs-mini mt"><span class="pull-right no-margin fw-semi-bold">LAN</span> <span class="fs-mini">6 Mb/s <i class="fa fa-caret-down"></i> &nbsp; 3 Mb/s <i class="fa fa-caret-up"></i></span></div><div class="progress progress-xs"><div class="progress-bar progress-bar-danger" style="width: 48%;"></div></div><div class="clearfix fs-mini mt"><span class="pull-right no-margin fw-semi-bold">Access</span> <span class="fs-mini">17 Mb/s <i class="fa fa-caret-up"></i> &nbsp; (+18%)</span></div><div class="progress progress-xs"><div class="progress-bar progress-bar-success" style="width: 64%;"></div></div></div></section></div></div></div></div><div class="row"><div class="col-md-4"><section class="widget"><div class="widget-body" data-ng-controller="YearsMapDemoController"><div data-sn-mapael-layers-map="" data-zoom="zoom" data-ng-model="data" class="mapael"><div class="stats"><h5 class="text-gray-dark">YEARLY <span class="fw-semi-bold">DISTRIBUTIONS</span></h5><span class="pull-left mr-xs"><small><span class="circle bg-warning text-gray-dark"><i class="fa fa-plus"></i></span></small></span><p class="h4 no-margin"><strong>17% last year</strong></p></div><div class="map"><span>Alternative content for the map</span></div><ul class="map-controls nav nav-pills nav-justified"><li data-ng-class="{\'active\': selectedYear == 2008}"><a href="#" data-ng-click="selectedYear = 2008">2008</a></li><li data-ng-class="{\'active\': selectedYear == 2009}"><a href="#" data-ng-click="selectedYear = 2009">2009</a></li><li data-ng-class="{\'active\': selectedYear == 2010}"><a href="#" data-ng-click="selectedYear = 2010">2010</a></li><li data-ng-class="{\'active\': selectedYear == 2011}"><a href="#" data-ng-click="selectedYear = 2011">2011</a></li><li data-ng-class="{\'active\': selectedYear == 2012}"><a href="#" data-ng-click="selectedYear = 2012">2012</a></li><li data-ng-class="{\'active\': selectedYear == 2013}"><a href="#" data-ng-click="selectedYear = 2013">2013</a></li></ul></div></div></section></div><div class="col-md-4"><section class="widget"><header class="bb"><h5>Recent <span class="fw-semi-bold">Chats</span></h5></header><div class="widget-body"><div class="widget-middle-overflow"><ul class="list-group widget-chat-list-group" data-ui-jq="slimscroll" data-ui-options="{ height: \'287px\', size: \'4px\', borderRadius: \'1px\', opacity: .3 }"><li class="list-group-item"><span class="thumb"><img class="img-circle" src="assets/images/people/a6.jpg" alt="..."></span><time class="time">10 sec ago</time><h5 class="sender">Chris Gray</h5><p class="body">Hey! What\'s up? So much time since we saw each other there</p></li><li class="list-group-item on-right"><span class="thumb"><img class="img-circle" src="assets/images/avatar.png" alt="..."></span><time class="time">10 sec ago</time><h5 class="sender">John Doe</h5><p class="body">True! Totally makes sense. But how do we find that?</p></li><li class="list-group-item"><span class="thumb"><img class="img-circle" src="assets/images/people/a6.jpg" alt="..."></span><time class="time">10 sec ago</time><h5 class="sender">Chris Gray</h5><p class="body">OK, but so now what? What should we do now? Not sure actually.</p></li><li class="list-group-item on-right"><span class="thumb"><img class="img-circle" src="assets/images/avatar.png" alt="..."></span><time class="time">10 sec ago</time><h5 class="sender">John Doe</h5><p class="body">Hey guys, didn\'t you notice this conversation is sort of jubberish?</p></li></ul></div></div><footer class="bg-body-light bt"><div class="input-group input-group-sm"><input type="text" class="form-control" placeholder="Your message"> <span class="input-group-btn"><button type="submit" class="btn btn-default">Send</button></span></div></footer></section></div><div class="col-md-4"><section class="widget bg-gray-dark text-white"><div class="widget-body" data-ng-controller="RealtimeTrafficWidgetDemoController"><h4 class="mb-lg">Recent <span class="fw-semi-bold">Update</span></h4><h6>Node.js <span class="fw-semi-bold">4.0.1 distribution</span></h6><div class="progress progress-xs"><div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 77%;"></div></div><p class="mt-sm mb fs-mini"><small><span class="circle bg-warning text-gray-dark"><i class="glyphicon glyphicon-chevron-up"></i></span></small> <strong>17% higher</strong> than last month</p><p class="fs-sm text-gray-lighter mb-0">Remaining hours</p><a class="btn btn-xs btn-gray pull-right ml-xs" href="#"><i class="fa fa-compress"></i> track</a> <a class="btn btn-xs btn-gray pull-right" href="#"><i class="fa fa-pause"></i> pause</a><p class="value4">2h 56m</p><br><div data-rickshaw-chart="" data-series="series" data-height="130" data-realtime="true" data-random="random" data-series-data="seriesData" class="chart-overflow-bottom text-gray-dark"></div></div></section></div></div><div class="row"><div class="col-md-3"><section class="widget windget-padding-lg"><div class="widget-body clearfix"><div class="live-tile" data-mode="carousel" data-speed="750" data-delay="3000" data-height="313"><div><h3>Basic & <span class="fw-semi-bold">Advanced</span> Features</h3><p class="value4 mt-lg">All you need in one app</p><div class="h4 mt-lg mb-lg"><i class="fa fa-quote-left opacity-50"></i> That\'s awesome! <i class="fa fa-quote-right opacity-50"></i></div><div class="widget-footer-bottom"><p>Attention to what\'s really important</p><button class="btn btn-info btn-block mt">Order Now!</button></div></div><div><h3>Beautiful <span class="fw-semi-bold">Thing</span></h3><p class="value4 mt-lg">Life-time package support</p><div class="h4 mt-lg mb-lg"><i class="fa fa-quote-left opacity-50"></i> That\'s awesome! <i class="fa fa-quote-right opacity-50"></i></div><div class="widget-footer-bottom"><p>Attention to what\'s really important</p><button class="btn btn-inverse btn-block mt"><span class="fw-semi-bold text-warning">Ready?</span></button></div></div></div></div></section></div><div class="col-md-3"><section class="widget widget-chart-changes" data-ng-controller="ChangesChartWidgetDemoController"><div class="widget-controls"><a href="#"><i class="fa fa-refresh"></i></a> <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a></div><div class="widget-body"><div class="chart bg-success btlr btrr"><p class="chart-value"><i class="fa fa-caret-up"></i> 352.79</p><p class="chart-value-change">+2.04 (1.69%)</p><div data-rickshaw-chart="" data-series="series" data-height="100" data-renderer="multi" data-configure-props="{gapSize: 0.5, min: \'auto\', strokeWidth: 3}"></div></div><h4 class="chart-title"><span class="fw-normal">Salt Lake City</span>, Utah</h4><p class="deemphasize">Today 13:34</p><div class="mt"><div class="row"><div class="col-xs-6"><p class="h4 no-margin">18.7M</p><p class="deemphasize">Shares Traded</p></div><div class="col-xs-6 text-align-right"><p class="h4 no-margin">19.9B</p><p class="deemphasize">Market Cap</p></div></div></div><div class="mt"><div class="row"><div class="col-xs-6"><p class="h3 no-margin text-success fw-semi-bold">+120.93</p><p class="deemphasize">Yearly Change</p></div><div class="col-xs-6 text-align-right"><span data-jq-sparkline="" data-ng-model="sparklineData" data-options="sparklineOptions"></span><p class="deemphasize">GOOG</p></div></div></div></div></section></div><div class="col-md-3"><section class="widget windget-padding-lg bg-primary text-white"><div class="widget-body clearfix"><div class="live-tile" data-mode="carousel" data-speed="300" data-delay="3000" data-height="313"><div><p class="h4 mt-xs"><i class="fa fa-quote-left opacity-50"></i> Thanks for the awesome support. That\'s awesome! <i class="fa fa-quote-right opacity-50"></i></p><div class="widget-footer-bottom"><span class="thumb pull-left mr"><img class="img-circle" src="assets/images/people/a4.jpg" alt="..."></span><h4 class="no-margin mb-xs"><span class="fw-semi-bold">Miha</span> Koshir</h4><p class="text-light">@miha</p></div></div><div><div class="clearfix mt-xs"><span class="thumb pull-left mr"><img class="img-circle" src="assets/images/people/a3.jpg" alt="..."></span><h4 class="no-margin mb-xs"><span class="fw-semi-bold">Maryna</span> Ess</h4><p class="text-light">@ess</p></div><div class="widget-footer-bottom"><p class="h4"><i class="fa fa-quote-left opacity-50"></i> Could have never imagined it would be so great! <i class="fa fa-quote-right opacity-50"></i></p></div></div></div></div></section></div><div class="col-md-3"><div class="live-tile" data-mode="flip" data-direction="horizontal" data-speed="600" data-delay="3000" data-height="373" data-play-onhover="true"><div><section class="widget windget-padding-lg widget-md bg-gray-dark text-white"><div class="widget-body widget-body-container"><div class="text-align-center"><i class="fa fa-child text-warning fa-5x"></i></div><h3 class="fw-normal">Sing Web App</h3><div class="widget-footer-bottom"><div class="mb-sm">Cutting-edge tech and design delivered</div><p><button class="btn btn-default btn-block">Hover over me!</button></p></div></div></section></div><div><section class="widget windget-padding-lg widget-md"><div class="widget-body widget-body-container"><div class="text-align-center"><i class="fa fa-globe text-primary fa-5x"></i></div><h3 class="fw-normal">Join The Web Now!</h3><div class="widget-footer-bottom"><div class="mb-sm">Cutting-edge tech and design delivered</div><p><button class="btn btn-gray btn-block">Join now!</button></p></div></div></section></div></div></div></div>'),
            a.put("app/modules/core/chat/chat.html", '<aside class="chat-sidebar"><div class="chat-sidebar-content"><header class="chat-sidebar-header"><h4 class="chat-sidebar-title">Contacts</h4><div class="form-group no-margin"><div class="input-group input-group-dark"><input class="form-control fs-mini" ng-model="q" type="text" placeholder="Search..."> <span class="input-group-addon"><i class="fa fa-search"></i></span></div></div></header><div class="chat-sidebar-contacts chat-sidebar-panel open"><h5 class="sidebar-nav-title">Today</h5><div class="list-group chat-sidebar-user-group"><a ng-repeat="conversation in todayConversations | filter: q" ng-click="openConversation(conversation); deactivateLink($event)" class="list-group-item"><i class="fa fa-circle text-{{conversation.status}} pull-right"></i> <span class="thumb-sm pull-left mr"><img class="img-circle" ng-src="{{conversation.image}}" alt="..."></span><h5 class="message-sender">{{conversation.name}}</h5><p class="message-preview">{{conversation.lastMessage}}</p></a></div><h5 class="sidebar-nav-title">Last Week</h5><div class="list-group chat-sidebar-user-group"><a ng-repeat="conversation in lastWeekConversations | filter: q" ng-click="openConversation(conversation); deactivateLink($event)" class="list-group-item"><i class="fa fa-circle text-{{conversation.status}} pull-right"></i> <span class="thumb-sm pull-left mr"><img class="img-circle" ng-src="{{conversation.image}}" alt="..."></span><h5 class="message-sender">{{conversation.name}}</h5><p class="message-preview">{{conversation.lastMessage}}</p></a></div></div><div sn-chat-area="activeConversation" open="chatAreaOpened" filter="q"></div><footer class="chat-sidebar-footer form-group"><input class="form-control input-dark fs-mini" ng-model="newMessage" ng-keypress="$event.which === 13 && addMessage()" type="text" placeholder="Type your message"></footer></div></aside>'), a.put("app/modules/core/chat/chatArea.html", '<div class="chat-sidebar-chat chat-sidebar-panel"><h5 class="title"><a ng-click="open = false"><i class="fa fa-angle-left mr-xs"></i> {{conversation.name}}</a></h5><ul class="message-list"><li ng-repeat="message in conversation.messages | filter: filter" class="message" ng-class="{\'from-me\': message.fromMe}"><span class="thumb-sm"><img class="img-circle" ng-src="{{message.fromMe ? \'assets/images/avatar.png\' :conversation.image}}" alt="..."></span><div class="message-body" ng-bind="message.text"></div></li></ul></div>'), a.put("app/modules/core/navigation/navbar.html", '<div class="container-fluid"><div class="navbar-header"><ul class="nav navbar-nav"><li><a class="hidden-sm hidden-xs" href="#" data-sn-action="toggle-navigation-state" title="Turn on/off sidebar collapsing" data-placement="bottom" data-tooltip=""><i class="fa fa-bars fa-lg"></i></a><a class="visible-sm visible-xs" data-sn-action="toggle-navigation-collapse-state" href="#" title="Show/hide sidebar" data-placement="bottom" data-tooltip=""><span class="rounded rounded-lg bg-gray text-white visible-xs"><i class="fa fa-bars fa-lg"></i></span> <i class="fa fa-bars fa-lg hidden-xs"></i></a></li><li class="ml-sm mr-n-xs hidden-xs"><a href="#"><i class="fa fa-refresh fa-lg"></i></a></li><li class="ml-n-xs hidden-xs"><a href="#"><i class="fa fa-times fa-lg"></i></a></li></ul><ul class="nav navbar-nav navbar-right visible-xs"><li><a href="#" data-sn-action="toggle-chat-sidebar-state"><span class="rounded rounded-lg bg-gray text-white"><i class="fa fa-globe fa-lg"></i></span></a></li></ul><a class="navbar-brand visible-xs" href="index.html"><i class="fa fa-circle text-gray mr-n-sm"></i> <i class="fa fa-circle text-warning"></i> &nbsp; {{app.name}} &nbsp; <i class="fa fa-circle text-warning mr-n-sm"></i> <i class="fa fa-circle text-gray"></i></a></div><div class="collapse navbar-collapse"><form class="navbar-form navbar-left" role="search"><div class="form-group"><div class="input-group input-group-no-border"><span class="input-group-addon"><i class="fa fa-search"></i></span> <input class="form-control" type="text" placeholder="Search Dashboard"></div></div></form><ul class="nav navbar-nav navbar-right"><li class="dropdown" dropdown=""><a dropdown-toggle="" class="dropdown-toggle dropdown-toggle-notifications" id="notifications-dropdown-toggle"><span class="thumb-sm avatar pull-left"><img class="img-circle" src="assets/images/people/a5.jpg" alt="..."></span> &nbsp; Philip <strong>Smith</strong>&nbsp; <span class="circle bg-warning fw-bold">13</span> <b class="caret"></b></a><div class="dropdown-menu animated animated-fast fadeInUp" sn-notifications-menu=""></div></li><li class="dropdown" data-dropdown=""><a href="" class="dropdown-toggle" data-dropdown-toggle=""><i class="fa fa-cog fa-lg"></i></a><ul class="dropdown-menu"><li><a href="#"><i class="glyphicon glyphicon-user"></i> &nbsp; My Account</a></li><li class="divider"></li><li><a data-ui-sref="app.extra-calendar">Calendar</a></li><li><a data-ui-sref="app.inbox">Inbox &nbsp;&nbsp;<span class="badge bg-danger animated bounceIn">9</span></a></li><li class="divider"></li><li><a data-ui-sref="login"><i class="fa fa-sign-out"></i> &nbsp; Log Out</a></li></ul></li><li><a href="#" data-sn-action="toggle-chat-sidebar-state"><i class="fa fa-globe fa-lg"></i></a><div id="chat-notification" class="chat-notification hide"><div class="chat-notification-inner"><h6 class="title"><span class="thumb-xs"><img src="assets/images/people/a6.jpg" class="img-circle mr-xs pull-left"></span> Jess Smith</h6><p class="text">Hey! What\'s up?</p></div></div></li></ul></div></div>'), a.put("app/modules/core/navigation/sidebar.html", '<nav id="sidebar" role="navigation" class="sidebar"><div class="js-sidebar-content"><header class="logo hidden-xs"><a href="index.html">{{app.name}}</a></header><div class="sidebar-status visible-xs"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="thumb-sm avatar pull-right"><img class="img-circle" src="assets/images/people/a5.jpg" alt="..."></span><span class="circle bg-warning fw-bold text-gray-dark">13</span> &nbsp; Philip <strong>Smith</strong> <b class="caret"></b></a></div><ul class="sidebar-nav"><li><a class="collapsed" data-target="#sidebar-dashboard" data-toggle="collapse" data-parent="#sidebar"><span class="icon"><i class="fa fa-desktop"></i></span> Dashboard <i class="toggle fa fa-angle-down"></i></a><ul id="sidebar-dashboard" class="collapse"><li><a data-ui-sref="app.dashboard">Dashboard</a></li><li><a data-ui-sref="app.widgets">Widgets</a></li></ul></li><li><a data-ui-sref="app.inbox"><span class="icon"><i class="fa fa-envelope"></i></span> Email <span class="label label-danger">9</span></a></li><li><a data-ui-sref="app.charts"><span class="icon"><i class="glyphicon glyphicon-stats"></i></span> Charts</a></li><li><a data-ui-sref="app.profile"><span class="icon"><i class="glyphicon glyphicon-user"></i></span> Profile <sup class="text-warning fw-semi-bold">new</sup></a></li></ul><h5 class="sidebar-nav-title">Template <a class="action-link" href="#"><i class="glyphicon glyphicon-refresh"></i></a></h5><ul class="sidebar-nav"><li><a class="collapsed" data-target="#sidebar-forms" data-toggle="collapse" data-parent="#sidebar"><span class="icon"><i class="glyphicon glyphicon-align-right"></i></span> Forms <i class="toggle fa fa-angle-down"></i></a><ul id="sidebar-forms" class="collapse"><li><a data-ui-sref="app.form-elements">Form Elements</a></li><li><a data-ui-sref="app.form-validation">Form Validation</a></li><li><a data-ui-sref="app.form-wizard">Form Wizard</a></li></ul></li><li><a class="collapsed" data-target="#sidebar-ui" data-toggle="collapse" data-parent="#sidebar"><span class="icon"><i class="glyphicon glyphicon-tree-conifer"></i></span> UI Elements <i class="toggle fa fa-angle-down"></i></a><ul id="sidebar-ui" class="collapse"><li><a data-ui-sref="app.ui-components">Components</a></li><li><a data-ui-sref="app.ui-notifications">Notifications</a></li><li><a data-ui-sref="app.ui-icons">Icons</a></li><li><a data-ui-sref="app.ui-buttons">Buttons</a></li><li><a data-ui-sref="app.ui-tabs-accordion">Tabs & Accordion</a></li><li><a data-ui-sref="app.ui-list-groups">List Groups</a></li></ul></li><li><a data-ui-sref="app.grid"><span class="icon"><i class="glyphicon glyphicon-th"></i></span> Grid</a></li><li><a class="collapsed" data-target="#sidebar-maps" data-toggle="collapse" data-parent="#sidebar"><span class="icon"><i class="glyphicon glyphicon-map-marker"></i></span> Maps <i class="toggle fa fa-angle-down"></i></a><ul id="sidebar-maps" class="collapse"><li><a data-ui-sref="app.maps-google">Google Maps</a></li><li><a data-ui-sref="app.maps-vector">Vector Maps</a></li></ul></li><li><a class="collapsed" data-target="#sidebar-tables" data-toggle="collapse" data-parent="#sidebar"><span class="icon"><i class="fa fa-table"></i></span> Tables <i class="toggle fa fa-angle-down"></i></a><ul id="sidebar-tables" class="collapse"><li><a data-ui-sref="app.tables-basic">Tables Basic</a></li><li><a data-ui-sref="app.tables-dynamic">Tables Dynamic <sup class="bg-transparent text-danger fs-sm fw-bold">ng</sup></a></li></ul></li><li><a class="collapsed" data-target="#sidebar-extra" data-toggle="collapse" data-parent="#sidebar"><span class="icon"><i class="fa fa-leaf"></i></span> Extra <i class="toggle fa fa-angle-down"></i></a><ul id="sidebar-extra" class="collapse"><li><a data-ui-sref="app.extra-calendar">Calendar <sup class="bg-transparent text-danger fs-sm fw-bold">ng</sup></a></li><li><a data-ui-sref="app.extra-invoice">Invoice</a></li><li><a data-ui-sref="login">Login Page</a></li><li><a data-ui-sref="error">Error Page</a></li><li><a data-ui-sref="app.extra-gallery">Gallery <sup class="bg-transparent text-danger fs-sm fw-bold">ng</sup></a></li><li><a data-ui-sref="app.extra-search">Search Results</a></li><li><a data-ui-sref="app.extra-timeline">Time Line</a></li></ul></li><li><a class="collapsed" data-target="#sidebar-levels" data-toggle="collapse" data-parent="#sidebar"><span class="icon"><i class="fa fa-folder-open"></i></span> Menu Levels <i class="toggle fa fa-angle-down"></i></a><ul id="sidebar-levels" class="collapse"><li><a href="">Level 1</a></li><li><a class="collapsed" data-target="#sidebar-sub-levels" data-toggle="collapse" data-parent="#sidebar-levels">Level 2 <i class="toggle fa fa-angle-down"></i></a><ul id="sidebar-sub-levels" class="collapse"><li><a href="">Level 3</a></li><li><a href="">Level 3</a></li></ul></li></ul></li></ul><h5 class="sidebar-nav-title">Labels <a class="action-link" href="#"><i class="glyphicon glyphicon-plus"></i></a></h5><ul class="sidebar-labels"><li><a href="#"><i class="fa fa-circle text-warning mr-xs"></i> <span class="label-name">My Recent</span></a></li><li><a href="#"><i class="fa fa-circle text-gray mr-xs"></i> <span class="label-name">Starred</span></a></li><li><a href="#"><i class="fa fa-circle text-danger mr-xs"></i> <span class="label-name">Background</span></a></li></ul><h5 class="sidebar-nav-title">Projects</h5><div class="sidebar-alerts"><div class="alert fade in"><a href="#" class="close" data-dismiss="alert" aria-hidden="true">&times;</a> <span class="text-white fw-semi-bold">Sales Report</span><br><div class="progress progress-xs mt-xs mb-0"><div class="progress-bar progress-bar-gray-light" style="width: 16%"></div></div><small>Calculating x-axis bias... 65%</small></div><div class="alert fade in"><a href="#" class="close" data-dismiss="alert" aria-hidden="true">&times;</a> <span class="text-white fw-semi-bold">Personal Responsibility</span><br><div class="progress progress-xs mt-xs mb-0"><div class="progress-bar progress-bar-danger" style="width: 23%"></div></div><small>Provide required notes</small></div></div></div></nav>'), a.put("app/modules/core/notifications/notifications.html", '<section class="panel notifications"><header class="panel-heading"><div class="text-align-center mb-sm"><strong>You have 13 notifications</strong></div><div class="btn-group btn-group-sm btn-group-justified" id="notifications-toggle" data-toggle="buttons"><label class="btn btn-default active"><input type="radio" checked="" data-ajax-trigger="change" data-ajax-load="assets/demo/notifications/notifications.html" data-ajax-target="#notifications-list"> Notifications</label> <label class="btn btn-default"><input type="radio" data-ajax-trigger="change" data-ajax-load="assets/demo/notifications/messages.html" data-ajax-target="#notifications-list"> Messages</label> <label class="btn btn-default"><input type="radio" data-ajax-trigger="change" data-ajax-load="assets/demo/notifications/progress.html" data-ajax-target="#notifications-list"> Progress</label></div></header><div id="notifications-list" class="list-group thin-scroll"><div class="list-group-item"><span class="thumb-sm pull-left mr clearfix"><img class="img-circle" src="assets/images/people/a3.jpg" alt="..."></span><p class="no-margin overflow-hidden">1 new user just signed up! Check out <a href="#">Monica Smith</a>\'s account.<time class="help-block no-margin">2 mins ago</time></p></div><a class="list-group-item" href="#"><span class="thumb-sm pull-left mr"><i class="glyphicon glyphicon-upload fa-lg"></i></span><p class="text-ellipsis no-margin">2.1.0-pre-alpha just released.</p><time class="help-block no-margin">5h ago</time></a> <a class="list-group-item" href="#"><span class="thumb-sm pull-left mr"><i class="fa fa-bolt fa-lg"></i></span><p class="text-ellipsis no-margin">Server load limited.</p><time class="help-block no-margin">7h ago</time></a><div class="list-group-item"><span class="thumb-sm pull-left mr clearfix"><img class="img-circle" src="assets/images/people/a5.jpg" alt="..."></span><p class="no-margin overflow-hidden">User <a href="#">Jeff</a> registered &nbsp;&nbsp; <button class="btn btn-xs btn-success">Allow</button> <button class="btn btn-xs btn-danger">Deny</button><time class="help-block no-margin">12:18 AM</time></p></div><div class="list-group-item"><span class="thumb-sm pull-left mr"><i class="fa fa-shield fa-lg"></i></span><p class="no-margin overflow-hidden">Instructions for changing your Envato Account password. Please check your account <a href="#">security page</a>.<time class="help-block no-margin">12:18 AM</time></p></div><a class="list-group-item" href="#"><span class="thumb-sm pull-left mr"><span class="rounded bg-primary rounded-lg"><i class="fa fa-facebook text-white"></i></span></span><p class="text-ellipsis no-margin">New <strong>76</strong> facebook likes received.</p><time class="help-block no-margin">15 Apr 2014</time></a> <a class="list-group-item" href="#"><span class="thumb-sm pull-left mr"><span class="circle circle-lg bg-gray-dark"><i class="fa fa-circle-o text-white"></i></span></span><p class="text-ellipsis no-margin">Dark matter detected.</p><time class="help-block no-margin">15 Apr 2014</time></a></div><footer class="panel-footer text-sm"><button class="btn btn-xs btn-link pull-right btn-notifications-reload" id="load-notifications-btn" data-ajax-load="assets/demo/notifications/notifications.php" data-ajax-target="#notifications-list" data-loading-text="<i class=\'fa fa-refresh fa-spin mr-xs\'></i> Loading..."><i class="fa fa-refresh"></i></button> <span class="fs-mini">Synced at: 21 Apr 2014 18:36</span></footer></section>')
    }]);
