var telerikReportViewer = function(e) {
    "use strict";
    var t = /{(\w+?)}/g
      , r = {
        DELETE: 46,
        BACKSPACE: 8,
        TAB: 9,
        ESC: 27,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        END: 35,
        HOME: 36
    };
    function n() {
        if (window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
            var e = Object.keys(r)
              , t = e.length;
            return function(n) {
                for (var a = 0; a < t; a++)
                    if (r[e[a]] == n)
                        return !0
            }
        }
        return function(e) {
            return !1
        }
    }
    function a(e, t, r, n) {
        return {
            left: e,
            top: t,
            width: r,
            height: n,
            right: function() {
                return e + r
            },
            bottom: function() {
                return t + n
            },
            union: function(r) {
                var n = Math.min(e, r.left)
                  , i = Math.min(t, r.top);
                return a(n, i, Math.max(this.right(), r.right()) - n, Math.max(this.bottom(), r.bottom()) - i)
            }
        }
    }
    function i() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
            var t = 16 * Math.random() | 0;
            return ("x" == e ? t : 3 & t | 8).toString(16)
        }
        ))
    }
    function o(e, t) {
        return c(l(e, t), t)
    }
    function s(e, t, r) {
        return e.replace(new RegExp(t,"g"), r)
    }
    function l(e, t) {
        return void 0 === t && (t = "s"),
        e.replace(new RegExp("^[" + t + "]+"), "")
    }
    function c(e, t) {
        return void 0 === t && (t = "s"),
        e.replace(new RegExp("[" + t + "]+$"), "")
    }
    function u(e, r) {
        var n = Array.isArray(r);
        return e.replace(t, (function(e, t) {
            return r[n ? parseInt(t) : t]
        }
        ))
    }
    function d(e) {
        return $("<div>").text(e).html()
    }
    function f(e) {
        return /^(\-|\+)?([0-9]+)$/.test(e) ? Number(e) : NaN
    }
    function p(e) {
        return /^(\-|\+)?([0-9]+(\.[0-9]+)?)$/.test(e) ? Number(e) : NaN
    }
    function h(e) {
        return e instanceof Date ? e : (/Z|[\+\-]\d\d:?\d\d/i.test(e) || (e += "Z"),
        new Date(e))
    }
    function g(e) {
        return new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()))
    }
    function m(e) {
        return new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds())
    }
    function v(e, t) {
        if (e instanceof Date && t instanceof Date) {
            if (e.getTime() !== t.getTime())
                return !1
        } else if (e !== t)
            return !1;
        return !0
    }
    function E(e, t) {
        if (e && t && e.report === t.report) {
            var r = "";
            e.parameters && (r = JSON.stringify(e.parameters));
            var n = "";
            return t.parameters && (n = JSON.stringify(t.parameters)),
            r === n
        }
        return !1
    }
    function b(e, t) {
        if (null === e)
            return null === t;
        if (null === t)
            return !1;
        if (e.length !== t.length)
            return !1;
        for (var r = e.length - 1; r >= 0; r--)
            if (!v(e[r], t[r]))
                return !1;
        return !0
    }
    function P() {
        var e = /Version\/(\d+.\d+.\d+) Safari/.exec(navigator.userAgent);
        return !(e && e.length > 1) || parseFloat(e[1]) >= 6
    }
    function T(e) {
        return !!e && "internalservererror" === s(e, " ", "").toLowerCase()
    }
    function S(e) {
        var t = "ArgumentException";
        return R(M(e), t, "System." + t)
    }
    function _(e) {
        var t = "InvalidClientException";
        return R(M(e), t, "Telerik.Reporting.Services.Engine." + t)
    }
    function C(e) {
        return I(M(e))
    }
    function I(e) {
        var t = "DrawingFactoryUnavailableException";
        return R(e, t, "Telerik.Drawing.Contract." + t)
    }
    function R(e, t, r) {
        return e && e.exceptionType && A(e.exceptionType, t, r)
    }
    function A(e, t, r) {
        return e && (e === r || e.endsWith(t))
    }
    function w(e) {
        try {
            return JSON.parse(e, (function(e, t) {
                if (e && t) {
                    var r = e.charAt(0);
                    if (r === r.toUpperCase())
                        this[r.toLowerCase() + e.slice(1)] = t
                }
                return t
            }
            ))
        } catch (e) {
            return null
        }
    }
    function M(e) {
        return !(!e || !e.responseText) && w(e.responseText)
    }
    function y(e) {
        return !!Array.isArray(e) || "number" == typeof (Boolean(e) && "length"in e && e.length)
    }
    function N(e) {
        return V(e, {
            dataType: "script",
            cache: !0
        })
    }
    function D(e) {
        return e.filter((function(e, t, r) {
            return r.lastIndexOf(e) === t
        }
        ))
    }
    function k(e) {
        var t = window.console;
        t && t.error && t.error(e)
    }
    function L(e) {
        if (e && e.length < 6) {
            var t = 1
              , r = e.split("");
            for ("#" !== r[0] && (t = 0); t < r.length; t++)
                r[t] = r[t] + r[t];
            e = r.join("")
        }
        var n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return n ? parseInt(n[1], 16) + ", " + parseInt(n[2], 16) + ", " + parseInt(n[3], 16) : null
    }
    function x(e) {
        return !!e && e.indexOf(",") > -1
    }
    function O(e) {
        if ("transparent" === e.toLowerCase())
            return 0;
        if (!x(e))
            return 1;
        -1 !== e.indexOf("#") && (e = L(e));
        var t = e.split(",").map((function(e) {
            return e.trim()
        }
        ));
        return 4 === t.length ? parseFloat((parseFloat(t[3].replace(/[()]/g, "")) / 255).toFixed(2)) : 1
    }
    function V(e, t) {
        return new Promise((function(r, n) {
            $.ajax(e, t).done((function(e) {
                return r(e)
            }
            )).fail((function(e, t, r) {
                n(function(e, t, r) {
                    return {
                        xhr: e,
                        status: t,
                        error: r
                    }
                }(e, t, r))
            }
            ))
        }
        ))
    }
    function F(e) {
        return Object.prototype.toString.call(e).slice(8, -1)
    }
    var G = Object.freeze({
        __proto__: null,
        isSpecialKey: n,
        rectangle: a,
        generateGuidString: i,
        trim: o,
        replaceAll: s,
        lTrim: l,
        rTrim: c,
        stringFormat: u,
        escapeHtml: d,
        tryParseInt: f,
        tryParseFloat: p,
        parseToLocalDate: h,
        adjustTimezone: g,
        unadjustTimezone: m,
        areEqual: v,
        reportSourcesAreEqual: E,
        areEqualArrays: b,
        isSvgSupported: P,
        isInternalServerError: T,
        isSystemArgumentException: S,
        isInvalidClientException: _,
        isApplicationException: C,
        isApplicationExceptionInstance: I,
        isExceptionOfType: function(e, t) {
            return R(M(e), t, t)
        },
        exceptionTypeNamesMatch: A,
        parseJSON: w,
        getExceptionInstance: M,
        extend: function() {
            var e, t, r, n, a = 0, i = arguments.length;
            for (n = i > 1 && arguments[a++] || {}; a < i; a++)
                if (null != (r = arguments[a]))
                    for (t in r)
                        n[t],
                        n !== (e = r[t]) && void 0 !== e && (n[t] = e);
            return n
        },
        each: function(e, t) {
            var r, n = 0;
            if (y(e))
                for (r = e.length; n < r && !1 !== t.call(e[n], n, e[n]); n++)
                    ;
            else
                for (n in e)
                    if (!1 === t.call(e[n], n, e[n]))
                        break;
            return e
        },
        selector: function() {
            return document.querySelectorAll(arguments[0])
        },
        isArray: y,
        loadScriptWithCallback: function(e, t, r) {
            var n = document.createElement("script");
            n.src = e,
            n.onload = function() {
                t(r)
            }
            ,
            n.onerror = function() {
                k(new Error("Failed to load script " + e))
            }
            ,
            document.head.appendChild(n)
        },
        loadScript: N,
        filterUniqueLastOccurrence: D,
        logError: k,
        findElement: function(e) {
            e.constructor != Array && (e = [e]);
            for (var t = $(e[0]), r = 1; r < e.length; r++)
                t = t.find(e[r]);
            return t
        },
        toRgbColor: L,
        isRgbColor: x,
        getColorAlphaValue: O,
        $ajax: V,
        type: F,
        isEqual: function e(t, r) {
            if (t === r)
                return !0;
            if (t != t && r != r)
                return !0;
            if (t != t && r == r || t == t && r != r)
                return !1;
            const n = F(t);
            if (n !== F(r))
                return !1;
            if ("Array" === n) {
                if (t.length !== r.length)
                    return !1;
                const n = t.length;
                for (let a = 0; a < n; a++)
                    if (!e(t[a], r[a]))
                        return !1;
                return !0
            }
            if ("Object" === n) {
                const n = Object.keys(t)
                  , a = Object.keys(r);
                if (n.length !== a.length)
                    return !1;
                const i = n.length;
                for (let a = 0; a < i; a++) {
                    const i = n[a];
                    if (!e(t[i], r[i]))
                        return !1
                }
                return !0
            }
            return "Date" === n && t.getTime() === r.getTime()
        }
    });
    function U(e) {
        return parseInt(e, 10) || 0
    }
    function B(e) {
        var t = $(e);
        return {
            left: U(t.css("marginLeft")),
            right: U(t.css("marginRight")),
            top: U(t.css("marginTop")),
            bottom: U(t.css("marginBottom"))
        }
    }
    function H(e) {
        var t = $(e);
        return {
            left: U(t.css("paddingLeft")),
            right: U(t.css("paddingRight")),
            top: U(t.css("paddingTop")),
            bottom: U(t.css("paddingBottom"))
        }
    }
    function z(e) {
        var t = $(e);
        return {
            left: U(t.css("borderLeftWidth")),
            right: U(t.css("borderRightWidth")),
            top: U(t.css("borderTopWidth")),
            bottom: U(t.css("borderBottomWidth"))
        }
    }
    function W(e, t, r, n, a) {
        n = n || 0,
        a = a || 0;
        var i = u("scale({0}, {1})", [t = t || 1, r = r || 1])
          , o = u("{0} {1}", [n, a]);
        $(e).css("transform", i).css("transform-origin", o)
    }
    var j, K = Object.freeze({
        __proto__: null,
        getMargins: B,
        getPadding: H,
        getBorderWidth: z,
        scale: W
    });
    window.telerikReportViewer || (window.telerikReportViewer = {}),
    (j = window.telerikReportViewer).sr || (j.sr = {
        controllerNotInitialized: "Controller is not initialized.",
        noReportInstance: "No report instance.",
        missingTemplate: "!obsolete resource!",
        noReport: "No report.",
        noReportDocument: "No report document.",
        missingOrInvalidParameter: "There are missing or invalid parameter values. Please input valid data for the following parameters:\n",
        invalidParameter: "Please input a valid value.",
        invalidDateTimeValue: "Please input a valid date.",
        parameterIsEmpty: "Parameter value cannot be empty.",
        cannotValidateType: "Cannot validate parameter of type {type}.",
        loadingFormats: "Loading...",
        loadingReport: "Loading report...",
        loadingParameters: "Loading parameters...",
        autoRunDisabled: "Please validate the report parameter values and press Preview to generate the report.",
        preparingDownload: "Preparing document to download. Please wait...",
        preparingPrint: "Preparing document to print. Please wait...",
        errorLoadingTemplates: "Error loading the report viewer's templates. (templateUrl = '{0}').",
        errorServiceUrl: "Cannot access the Reporting REST service. (serviceUrl = '{0}'). Make sure the service address is correct and enable CORS if needed. (https://enable-cors.org)",
        errorServiceVersion: "The version of the Report Viewer '{1}' does not match the version of the Reporting REST Service '{0}'. Please make sure both are running same version.",
        loadingReportPagesInProgress: "{0} pages loaded so far...",
        loadedReportPagesComplete: "Done. Total {0} pages loaded.",
        noPageToDisplay: "No page to display.",
        errorDeletingReportInstance: "Error deleting report instance: '{0}'.",
        errorRegisteringViewer: "Error registering the viewer with the service.",
        noServiceClient: "No serviceClient has been specified for this controller.",
        errorRegisteringClientInstance: "Error registering client instance.",
        errorCreatingReportInstance: "Error creating report instance (Report = '{0}').",
        errorCreatingReportDocument: "Error creating report document (Report = '{0}'; Format = '{1}').",
        unableToGetReportParameters: "Unable to get report parameters.",
        errorObtainingAuthenticationToken: "Error obtaining authentication token.",
        clientExpired: "Click 'Refresh' to restore client session.",
        promisesChainStopError: "Error shown. Throwing promises chain stop error.",
        renderingCanceled: "Report processing was canceled.",
        tryReportPreview: "The report may now be previewed.",
        parameterEditorSelectNone: "clear selection",
        parameterEditorSelectAll: "select all",
        parametersAreaPreviewButton: "Preview",
        menuNavigateBackwardText: "Navigate Backward",
        menuNavigateBackwardTitle: "Navigate Backward",
        menuNavigateForwardText: "Navigate Forward",
        menuNavigateForwardTitle: "Navigate Forward",
        menuStopRenderingText: "Stop Rendering",
        menuStopRenderingTitle: "Stop Rendering",
        menuRefreshText: "Refresh",
        menuRefreshTitle: "Refresh",
        menuFirstPageText: "First Page",
        menuFirstPageTitle: "First Page",
        menuLastPageText: "Last Page",
        menuLastPageTitle: "Last Page",
        menuPreviousPageTitle: "Previous Page",
        menuNextPageTitle: "Next Page",
        menuPageNumberTitle: "Page Number Selector",
        menuDocumentMapTitle: "Toggle Document Map",
        menuParametersAreaTitle: "Toggle Parameters Area",
        menuZoomInTitle: "Zoom In",
        menuZoomOutTitle: "Zoom Out",
        menuPageStateTitle: "Toggle FullPage/PageWidth",
        menuPrintText: "Print...",
        menuContinuousScrollText: "Toggle Continuous Scrolling",
        menuSendMailText: "Send an email",
        menuPrintTitle: "Print",
        menuContinuousScrollTitle: "Toggle Continuous Scrolling",
        menuSendMailTitle: "Send an email",
        menuExportText: "Export",
        menuExportTitle: "Export",
        menuPrintPreviewText: "Toggle Print Preview",
        menuPrintPreviewTitle: "Toggle Print Preview",
        menuSearchText: "Search",
        menuSearchTitle: "Toggle Search",
        menuSideMenuTitle: "Toggle Side Menu",
        sendEmailFromLabel: "From:",
        sendEmailToLabel: "To:",
        sendEmailCCLabel: "CC:",
        sendEmailSubjectLabel: "Subject:",
        sendEmailFormatLabel: "Format:",
        sendEmailSendLabel: "Send",
        sendEmailCancelLabel: "Cancel",
        ariaLabelPageNumberSelector: "Page number selector. Showing page {0} of {1}.",
        ariaLabelPageNumberEditor: "Page number editor",
        ariaLabelExpandable: "Expandable",
        ariaLabelSelected: "Selected",
        ariaLabelParameter: "parameter",
        ariaLabelErrorMessage: "Error message",
        ariaLabelParameterInfo: "Contains {0} options",
        ariaLabelMultiSelect: "Multiselect",
        ariaLabelMultiValue: "Multivalue",
        ariaLabelSingleValue: "Single value",
        ariaLabelParameterDateTime: "DateTime",
        ariaLabelParameterString: "String",
        ariaLabelParameterNumerical: "Numerical",
        ariaLabelParameterBoolean: "Boolean",
        ariaLabelParametersAreaPreviewButton: "Preview the report",
        ariaLabelMainMenu: "Main menu",
        ariaLabelCompactMenu: "Compact menu",
        ariaLabelSideMenu: "Side menu",
        ariaLabelDocumentMap: "Document map area",
        ariaLabelDocumentMapSplitter: "Document map area splitbar.",
        ariaLabelParametersAreaSplitter: "Parameters area splitbar.",
        ariaLabelPagesArea: "Report contents area",
        ariaLabelSearchDialogArea: "Search area",
        ariaLabelSendEmailDialogArea: "Send email area",
        ariaLabelSearchDialogStop: "Stop search",
        ariaLabelSearchDialogOptions: "Search options",
        ariaLabelSearchDialogNavigateUp: "Navigate up",
        ariaLabelSearchDialogNavigateDown: "Navigate down",
        ariaLabelSearchDialogMatchCase: "Match case",
        ariaLabelSearchDialogMatchWholeWord: "Match whole word",
        ariaLabelSearchDialogUseRegex: "Use regex",
        ariaLabelMenuNavigateBackward: "Navigate backward",
        ariaLabelMenuNavigateForward: "Navigate forward",
        ariaLabelMenuStopRendering: "Stop rendering",
        ariaLabelMenuRefresh: "Refresh",
        ariaLabelMenuFirstPage: "First page",
        ariaLabelMenuLastPage: "Last page",
        ariaLabelMenuPreviousPage: "Previous page",
        ariaLabelMenuNextPage: "Next page",
        ariaLabelMenuPageNumber: "Page number selector",
        ariaLabelMenuDocumentMap: "Toggle document map",
        ariaLabelMenuParametersArea: "Toggle parameters area",
        ariaLabelMenuZoomIn: "Zoom in",
        ariaLabelMenuZoomOut: "Zoom out",
        ariaLabelMenuPageState: "Toggle FullPage/PageWidth",
        ariaLabelMenuPrint: "Print",
        ariaLabelMenuContinuousScroll: "Continuous scrolling",
        ariaLabelMenuSendMail: "Send an email",
        ariaLabelMenuExport: "Export",
        ariaLabelMenuPrintPreview: "Toggle print preview",
        ariaLabelMenuSearch: "Search in report contents",
        ariaLabelMenuSideMenu: "Toggle side menu",
        ariaLabelSendEmailFrom: "From email address",
        ariaLabelSendEmailTo: "Recipient email address",
        ariaLabelSendEmailCC: "Carbon Copy email address",
        ariaLabelSendEmailSubject: "Email subject:",
        ariaLabelSendEmailFormat: "Report format:",
        ariaLabelSendEmailSend: "Send email",
        ariaLabelSendEmailCancel: "Cancel sending email",
        searchDialogTitle: "Search in report contents",
        searchDialogSearchInProgress: "searching...",
        searchDialogNoResultsLabel: "No results",
        searchDialogResultsFormatLabel: "Result {0} of {1}",
        searchDialogStopTitle: "Stop Search",
        searchDialogNavigateUpTitle: "Navigate Up",
        searchDialogNavigateDownTitle: "Navigate Down",
        searchDialogMatchCaseTitle: "Match Case",
        searchDialogMatchWholeWordTitle: "Match Whole Word",
        searchDialogUseRegexTitle: "Use Regex",
        searchDialogCaptionText: "Find",
        searchDialogPageText: "page",
        sendEmailDialogTitle: "Send Email",
        sendEmailValidationEmailRequired: "Email field is required",
        sendEmailValidationEmailFormat: "Email format is not valid",
        sendEmailValidationSingleEmail: "The field accepts a single email address only",
        sendEmailValidationFormatRequired: "Format field is required",
        errorSendingDocument: "Error sending report document (Report = '{0}')."
    });
    var Y = Y || {};
    const X = (window.telerikReportViewer || {}).sr || {}
      , q = $.extend({}, Y, X);
    var J = {};
    function Z(e) {
        var t, r, n, a = !1, i = {
            CONFIRM_KEY: 13,
            CONTENT_AREA_KEY: 67,
            DOCUMENT_MAP_AREA_KEY: 68,
            MENU_AREA_KEY: 77,
            PARAMETERS_AREA_KEY: 80
        };
        if (e = $.extend({}, J, e),
        !(t = e.controller))
            throw "No controller (telerikReporting.ReportViewerController) has been specified.";
        function o() {
            r || (!function() {
                (r = {})[i.DOCUMENT_MAP_AREA_KEY] = $("div[data-role=telerik_ReportViewer_DocumentMapArea] div[data-role=treeview]"),
                r[i.MENU_AREA_KEY] = $("ul[data-role=telerik_ReportViewer_MainMenu]"),
                r[i.CONTENT_AREA_KEY] = s();
                var e = $("div[data-role=telerik_ReportViewer_ParametersArea] div.trv-parameters-area-content");
                e && (r[i.PARAMETERS_AREA_KEY] = e,
                function(e) {
                    if (0 === e.length)
                        return;
                    var t = e.parent("div[data-role=telerik_ReportViewer_ParametersArea]");
                    if (!c(t))
                        return;
                    Array.from(e.children()).forEach((e => {
                        $(e).on("keydown", (e => {
                            e.which == i.CONFIRM_KEY && (t.find("button.trv-parameters-area-preview-button").focus(),
                            e.preventDefault())
                        }
                        ))
                    }
                    ))
                }(e))
            }(),
            $(document.body).off("keydown", l),
            $(document.body).on("keydown", l))
        }
        function s() {
            return $("div[data-role=telerik_ReportViewer_PagesArea]")
        }
        function l(e) {
            if (r && e.altKey && e.ctrlKey) {
                var t = r[e.which];
                if (t && c(t.parent())) {
                    var a = "k-focus";
                    n && n.removeClass(a),
                    t.addClass(a),
                    t.focus(),
                    n = t,
                    e.preventDefault()
                }
            }
        }
        function c(e) {
            return e && !(e.hasClass("k-collapsed") || e.hasClass("trv-hidden"))
        }
        return t.reportLoadComplete((function() {
            o();
            var e = s();
            e.length > 0 && e.focus()
        }
        )).pageReady((function(e, t) {
            !function(e) {
                if (!e)
                    return;
                o(),
                function(e) {
                    if (!e)
                        return;
                    var t = e.find("div [data-reporting-action]");
                    if (!t.length > 0)
                        return;
                    Array.from(t).forEach((e => {
                        var t = $(e);
                        t.on("keydown", (e => {
                            e.which == i.CONFIRM_KEY && t.trigger("click")
                        }
                        ))
                    }
                    ))
                }(r[i.CONTENT_AREA_KEY])
            }(t),
            a = !0
        }
        )).error((function(e, t) {
            !function() {
                var e = $("div.trv-pages-area div.trv-error-message");
                if (0 === e.length)
                    return;
                e.attr("tabIndex", 0),
                e.focus()
            }(),
            window.setTimeout(o, 500)
        }
        )),
        t.updateUI((function(e) {
            var n, o, s;
            a && (n = document.querySelectorAll(".trv-report-pager"),
            o = t.getCurrentPageNumber(),
            s = t.getPageCount(),
            n.forEach((e => {
                e.setAttribute("aria-label", u(q.ariaLabelPageNumberSelector, [o, s])),
                e.querySelectorAll("input[data-role=telerik_ReportViewer_PageNumberInput]").forEach((e => {
                    e.setAttribute("aria-label", q.ariaLabelPageNumberEditor)
                }
                ))
            }
            )),
            function() {
                var e = r[i.MENU_AREA_KEY];
                if (!e)
                    return;
                Array.from(e).forEach((e => {
                    var t = $(e).children("li.k-item");
                    Array.from(t).forEach((e => {
                        var t = $(e);
                        if (!t.hasClass("trv-report-pager")) {
                            var r = t.attr("aria-label")
                              , n = u(". {0}", [q.ariaLabelExpandable])
                              , a = t.find("ul").length > 0 && r.indexOf(n) < 0 ? n : ""
                              , i = u(". {0}", [q.ariaLabelSelected])
                              , o = t.hasClass("k-selected") && r.indexOf(i) < 0 ? i : ""
                              , s = r + a + o;
                            t.attr("aria-label", s),
                            t.hasClass("k-disabled") ? t.attr("aria-disabled", "true") : t.removeAttr("aria-disabled")
                        }
                    }
                    ))
                }
                ))
            }())
        }
        )),
        {
            getKeyMap: function() {
                return i
            },
            setKeyMap: function(e) {
                i = e,
                r = void 0
            }
        }
    }
    const Q = {
        viewerInstances: []
    };
    class ee {
        static bind(e, ...t) {
            const r = t[0].commands
              , n = t[1];
            ee.attachCommands(e, r, n);
            var a = e.find('[data-role^="telerik_ReportViewer_"]');
            Array.from(a).forEach((e => {
                var r = $(e)
                  , n = $.fn[r.attr("data-role")];
                "function" == typeof n && n.apply(r, t)
            }
            ))
        }
        static attachCommands(e, t, r) {
            var n = '[data-command^="telerik_ReportViewer_"]'
              , a = "[data-target-report-viewer]" + n;
            e.on("click", n, (function(e) {
                var r = $(this).attr("data-command");
                if (r) {
                    var n = r.substring(21)
                      , a = t[n];
                    a && a.enabled() && a.exec($(this).attr("data-command-parameter")),
                    e.preventDefault()
                }
            }
            )),
            Q.CommandHandlerAttached || ($(document.body).on("click", a, (function(e) {
                var t = $(this)
                  , r = t.attr("data-command")
                  , n = t.attr("data-target-report-viewer");
                if (r && n) {
                    var a = r.substring(21)
                      , i = $(n).data("telerik_ReportViewer").commands[a];
                    i.enabled() && i.exec($(this).attr("data-command-parameter")),
                    e.preventDefault()
                }
            }
            )),
            Q.CommandHandlerAttached = !0),
            Object.entries(t).forEach(( ([t,n]) => {
                !function(e, t, r, n) {
                    if (t) {
                        var a = '[data-command="telerik_ReportViewer_' + e + '"]'
                          , i = '[data-target-report-viewer="' + r.selector + '"]' + a
                          , o = n.find(a)
                          , s = $(i);
                        $(t).on("enabledChanged", (function(e) {
                            (t.enabled() ? $.fn.removeClass : $.fn.addClass).call(o.parent("li"), "k-disabled"),
                            (t.enabled() ? $.fn.removeClass : $.fn.addClass).call(s, r.disabledButtonClass)
                        }
                        )).on("checkedChanged", (function(e) {
                            var n = o.parent("li");
                            (t.checked() ? $.fn.addClass : $.fn.removeClass).call(n, function(e) {
                                return e.hasClass("trv-menu-toggleable") ? "k-selected !k-bg-primary" : "k-selected"
                            }(n)),
                            (t.checked() ? $.fn.addClass : $.fn.removeClass).call(s, r.checkedButtonClass)
                        }
                        ))
                    }
                }(t, n, r, e)
            }
            ))
        }
    }
    const te = {
        INTERACTIVE: "INTERACTIVE",
        PRINT_PREVIEW: "PRINT_PREVIEW"
    }
      , re = {
        AUTO_SELECT: "AUTO_SELECT",
        FORCE_PDF_PLUGIN: "FORCE_PDF_PLUGIN",
        FORCE_PDF_FILE: "FORCE_PDF_FILE"
    }
      , ne = {
        SINGLE_PAGE: "SINGLE_PAGE",
        CONTINUOUS_SCROLL: "CONTINUOUS_SCROLL"
    }
      , ae = {
        FIT_PAGE_WIDTH: "FIT_PAGE_WIDTH",
        FIT_PAGE: "FIT_PAGE",
        SPECIFIC: "SPECIFIC"
    }
      , ie = {
        INTEGER: "System.Int64",
        FLOAT: "System.Double",
        STRING: "System.String",
        DATETIME: "System.DateTime",
        BOOLEAN: "System.Boolean"
    }
      , oe = {
        COMBO_BOX: "COMBO_BOX",
        LIST_VIEW: "LIST_VIEW"
    }
      , se = {
        RIGHT: "RIGHT",
        LEFT: "LEFT",
        TOP: "TOP",
        BOTTOM: "BOTTOM"
    }
      , le = {
        RIGHT: "RIGHT",
        LEFT: "LEFT"
    };
    function ce(e) {
        var t = !0
          , r = !1
          , n = {
            enabled: function(e) {
                if (0 === arguments.length)
                    return t;
                var r = Boolean(e);
                return t = r,
                $(this).trigger("enabledChanged"),
                n
            },
            checked: function(e) {
                if (0 === arguments.length)
                    return r;
                var t = Boolean(e);
                return r = t,
                $(this).trigger("checkedChanged"),
                n
            },
            exec: e
        };
        return n
    }
    var ue = {};
    ue[ae.FIT_PAGE] = {
        scaleMode: ae.FIT_PAGE_WIDTH
    },
    ue[ae.FIT_PAGE_WIDTH] = {
        scaleMode: ae.SPECIFIC,
        scale: 1
    },
    ue[ae.SPECIFIC] = {
        scaleMode: ae.FIT_PAGE
    };
    var de = [.1, .25, .5, .75, 1, 1.5, 2, 4, 8];
    function fe(e) {
        var t = e.controller;
        if (!t)
            throw "No options.controller.";
        var r = e.history;
        if (!r)
            throw "No options.history.";
        return {
            historyBack: new ce((function() {
                r.back()
            }
            )),
            historyForward: new ce((function() {
                r.forward()
            }
            )),
            stopRendering: new ce((function() {
                t.stopRendering()
            }
            )),
            goToPrevPage: new ce((function() {
                t.navigateToPage(t.getCurrentPageNumber() - 1)
            }
            )),
            goToNextPage: new ce((function() {
                t.navigateToPage(t.getCurrentPageNumber() + 1)
            }
            )),
            goToFirstPage: new ce((function() {
                t.navigateToPage(1)
            }
            )),
            goToLastPage: new ce((function() {
                t.navigateToPage(t.getPageCount())
            }
            )),
            goToPage: new ce((function(e) {
                if (!isNaN(e)) {
                    var r = t.getPageCount();
                    return e > r ? e = r : e < 1 && (e = 1),
                    t.navigateToPage(e),
                    e
                }
            }
            )),
            refresh: new ce((function() {
                t.refreshReport(!0, !1)
            }
            )),
            export: new ce((function(e) {
                e && t.exportReport(e)
            }
            )),
            print: new ce((function() {
                t.printReport()
            }
            )),
            pageMode: new ce((function() {
                t.setPageMode(t.getPageMode() === ne.SINGLE_PAGE ? ne.CONTINUOUS_SCROLL : ne.SINGLE_PAGE)
            }
            )),
            togglePrintPreview: new ce((function() {
                t.setViewMode(t.getViewMode() === te.PRINT_PREVIEW ? te.INTERACTIVE : te.PRINT_PREVIEW)
            }
            )),
            toggleDocumentMap: new ce((function() {
                var e;
                t.setDocumentMapVisible({
                    visible: (e = {},
                    t.getDocumentMapState(e),
                    !Boolean(e.visible))
                })
            }
            )),
            toggleParametersArea: new ce((function() {
                var e;
                t.setParametersAreaVisible({
                    visible: (e = {},
                    t.getParametersAreaState(e),
                    !Boolean(e.visible))
                })
            }
            )),
            zoom: new ce((function(e) {
                t.setScale(e)
            }
            )),
            zoomIn: new ce((function() {
                n(1)
            }
            )),
            zoomOut: new ce((function() {
                n(-1)
            }
            )),
            toggleSideMenu: new ce((function() {
                var e;
                t.setSideMenuVisible({
                    visible: (e = {},
                    t.getSideMenuVisible(e),
                    !Boolean(e.visible))
                })
            }
            )),
            toggleZoomMode: new ce((function(e) {
                var r = t.getScale()
                  , n = t.getScaleMode();
                t.setScale(ue[n].scale || r),
                t.setScaleMode(ue[n].scaleMode)
            }
            )),
            toggleSearchDialog: new ce((function() {
                var e;
                t.setSearchDialogVisible({
                    visible: (e = {},
                    t.getSearchDialogState(e),
                    !Boolean(e.visible))
                })
            }
            )),
            toggleSendEmailDialog: new ce((function() {
                var e;
                t.setSendEmailDialogVisible({
                    visible: (e = {},
                    t.getSendEmailDialogState(e),
                    !Boolean(e.visible))
                })
            }
            ))
        };
        function n(e) {
            t.setScale(function(e, t) {
                for (var r = -1, n = de.length, a = 0; a < n; a++) {
                    var i = de[a];
                    if (e < i) {
                        r = a - .5;
                        break
                    }
                    if (e === i) {
                        r = a;
                        break
                    }
                }
                r += t,
                r = t >= 0 ? Math.round(r - .49) : Math.round(r + .49);
                r < 0 ? r = 0 : r > n - 1 && (r = n - 1);
                return de[r]
            }(t.getScale(), e))
        }
    }
    function pe() {
        return {
            hasPdfPlugin: function() {
                return null !== (e = null,
                $.each(["AcroPDF.PDF.1", "PDF.PdfCtrl.6", "PDF.PdfCtrl.5"], (function(t, r) {
                    try {
                        if (e = new ActiveXObject(r))
                            return !1
                    } catch (e) {}
                }
                )),
                e);
                var e
            }
        }
    }
    function he() {
        return {
            hasPdfPlugin: function() {
                return function() {
                    var e = /Firefox[\/\s](\d+\.\d+)/.exec(navigator.userAgent);
                    if (null !== e && e.length > 1 && parseFloat(e[1]) >= 19)
                        return !1;
                    var t = navigator.mimeTypes["application/pdf"]
                      , r = null !== t ? t.enabledPlugin : null;
                    if (r) {
                        var n = r.description;
                        return -1 !== n.indexOf("Adobe") && (-1 === n.indexOf("Version") || parseFloat(n.split("Version")[1]) >= 6)
                    }
                    return !1
                }()
            }
        }
    }
    function ge(e) {
        return {
            hasPdfPlugin: function() {
                return t = navigator.plugins,
                r = !1,
                $.each(t, (function(n, a) {
                    if (t[n].name === e || "Adobe Acrobat" === t[n].name)
                        return r = !0,
                        !1
                }
                )),
                r;
                var t, r
            }
        }
    }
    var me = function() {
        if (window.navigator) {
            var e = window.navigator.userAgent.toLowerCase();
            return e.indexOf("msie") > -1 || e.indexOf("mozilla") > -1 && e.indexOf("trident") > -1 ? pe() : e.indexOf("firefox") > -1 ? he() : e.indexOf("edg/") > -1 ? ge("Microsoft Edge PDF Plugin") : e.indexOf("chrome") > -1 ? ge("Chrome PDF Viewer") : e.indexOf("safari") > -1 ? ge("WebKit built-in PDF") : {
                hasPdfPlugin: function() {
                    return !1
                }
            }
        }
        return null
    }()
      , ve = !!me && me.hasPdfPlugin()
      , Ee = function() {
        var e;
        function t() {
            return window.navigator && window.navigator.msSaveOrOpenBlob
        }
        var r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? function(e) {
            window.open(e, "_self")
        }
        : function(r) {
            var n = null;
            if (e || ((e = document.createElement("iframe")).style.display = "none",
            e.onload = function() {
                try {
                    e.contentDocument.execCommand("print", !0, null)
                } catch (e) {
                    k(e)
                } finally {
                    n && (window.URL || window.webkitURL).revokeObjectURL(n)
                }
            }
            ),
            function(e) {
                var t = window.location
                  , r = document.createElement("a");
                r.setAttribute("href", e),
                "" == r.host && (r.href = r.href);
                return t.hostname === r.hostname && t.protocol === r.protocol && t.port === r.port
            }(r) && t())
                return e.src = r,
                void document.body.appendChild(e);
            var a = new XMLHttpRequest;
            a.open("GET", r, !0),
            a.responseType = "arraybuffer",
            a.onload = function(r) {
                if (200 === this.status) {
                    var a = new Blob([this.response],{
                        type: "application/pdf"
                    });
                    t() ? window.navigator.msSaveOrOpenBlob(a) : (n = (window.URL || window.webkitURL).createObjectURL(a),
                    e.src = n,
                    document.body.appendChild(e))
                } else
                    console.log("Could not retrieve remote PDF document.")
            }
            ,
            a.send()
        }
        ;
        return {
            print: function(e) {
                r(e)
            },
            getDirectPrintState: function() {
                return ve
            }
        }
    }()
      , be = function() {
        var e = {};
        function t(e, t, r, n) {
            var a = [].concat(t).map((function(t) {
                return function(e, t, r) {
                    if (e.availableValues) {
                        if (!Array.from(e.availableValues).some((function(e) {
                            return r(t, e.value)
                        }
                        ))) {
                            if (e.allowNull && !t)
                                return t;
                            throw q.invalidParameter
                        }
                    }
                    return t
                }(e, r(t), n)
            }
            ));
            if (e.multivalue) {
                if (null == t || 0 == t.length) {
                    if (e.allowNull)
                        return t;
                    throw q.invalidParameter
                }
                return a
            }
            return a[0]
        }
        function r(e, t) {
            return e.allowNull && -1 != [null, "", void 0].indexOf(t)
        }
        return e[ie.STRING] = {
            validate: function(e, r) {
                return t(e, r, (function(t) {
                    if (!t) {
                        if (e.allowNull)
                            return null;
                        if (e.allowBlank)
                            return "";
                        throw q.parameterIsEmpty
                    }
                    return t
                }
                ), (function(e, t) {
                    return e == t
                }
                ))
            }
        },
        e[ie.FLOAT] = {
            validate: function(e, n) {
                return t(e, n, (function(t) {
                    var n = p(t);
                    if (isNaN(n)) {
                        if (r(e, t))
                            return null;
                        throw q.parameterIsEmpty
                    }
                    return n
                }
                ), (function(e, t) {
                    return p(e) == p(t)
                }
                ))
            }
        },
        e[ie.INTEGER] = {
            validate: function(e, n) {
                return t(e, n, (function(t) {
                    var n = f(t);
                    if (isNaN(n)) {
                        if (r(e, t))
                            return null;
                        throw q.parameterIsEmpty
                    }
                    return n
                }
                ), (function(e, t) {
                    return f(e) == p(t)
                }
                ))
            }
        },
        e[ie.DATETIME] = {
            validate: function(e, r) {
                return t(e, r, (function(t) {
                    if (e.allowNull && (null === t || "" === t || void 0 === t))
                        return null;
                    if (!isNaN(Date.parse(t)))
                        return e.availableValues ? t : h(t);
                    throw q.invalidDateTimeValue
                }
                ), (function(e, t) {
                    return e = h(e),
                    t = h(t),
                    e.getTime() == t.getTime()
                }
                ))
            }
        },
        e[ie.BOOLEAN] = {
            validate: function(e, n) {
                return t(e, n, (function(t) {
                    if (-1 != ["true", "false"].indexOf(String(t).toLowerCase()))
                        return Boolean(t);
                    if (r(e, t))
                        return null;
                    throw q.parameterIsEmpty
                }
                ), (function(e, t) {
                    return Boolean(e) == Boolean(t)
                }
                ))
            }
        },
        {
            validate: function(t, r) {
                var n = e[t.type];
                if (!n)
                    throw u(q.cannotValidateType, t);
                return n.validate(t, r)
            }
        }
    }();
    function Pe(e) {
        return 1e3 * e
    }
    function Te(e, t, r) {
        if (!e)
            throw q.noServiceClient;
        if ("number" != typeof (n = r) || !isFinite(n))
            throw "sessionTimeoutSeconds must a number and must be finite";
        var n, a, i;
        function o() {
            i <= 0 || (i = Math.min(i, 2147483647),
            a = setInterval((function() {
                e.keepClientAlive(t)
            }
            ), i))
        }
        function s() {
            a && (clearInterval(a),
            a = null)
        }
        return i = r <= 120 ? Pe(r) / 2 : Pe(r - 60),
        {
            start: o,
            restart: function() {
                s(),
                o()
            },
            stop: s
        }
    }
    var Se = Object.defineProperty
      , _e = (e, t, r) => (( (e, t, r) => {
        t in e ? Se(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: r
        }) : e[t] = r
    }
    )(e, "symbol" != typeof t ? t + "" : t, r),
    r);
    class Ce extends EventTarget {
        constructor() {
            super(),
            _e(this, "_events"),
            _e(this, "_eventsCount"),
            this._events = {},
            this._eventsCount = 0
        }
        addListener(e, t) {
            if ("function" != typeof t)
                throw new TypeError("listener must be a function");
            function r(e) {
                t.call(this, e, ...e.detail)
            }
            return this._events[e] || (this._events[e] = []),
            r.listener = t,
            this._events[e].push(r),
            this._eventsCount++,
            this.addEventListener(e, r.bind(this)),
            this
        }
        on(e, t) {
            return this.addListener(e, t)
        }
        trigger(e, ...t) {
            if (!this._events[e])
                return;
            const r = new CustomEvent(e,{
                detail: t,
                cancelable: !0
            });
            return this.dispatchEvent(r)
        }
        emit(e, ...t) {
            return this.trigger(e, ...t)
        }
        removeListener(e, t) {
            return this._events[e] ? (this._events[e] = this._events[e].filter((r => r.listener !== t || (this.removeEventListener(e, r),
            !1))),
            0 === this._events[e].length && (delete this._events[e],
            this._eventsCount--),
            this) : this
        }
        removeAllListeners(e) {
            return void 0 === e ? (Object.keys(this._events).forEach((e => {
                this.removeAllListeners(e)
            }
            )),
            this) : (this._events[e] && (this._events[e].forEach((t => {
                this.removeEventListener(e, t)
            }
            )),
            delete this._events[e],
            this._eventsCount--),
            this)
        }
        off(e, t) {
            return void 0 === e ? this.removeAllListeners() : void 0 === t ? this.removeAllListeners(e) : this.removeListener(e, t)
        }
    }
    var Ie = {
        pagePollIntervalMs: 500,
        documentInfoPollIntervalMs: 2e3
    };
    function Re(e) {
        var t, r, n, a, i, o, s, l, c, p, h, g, m, v, E, b = {}, I = te.INTERACTIVE, R = ne.CONTINUOUS_SCROLL, y = re.AUTO_SELECT, N = !1, D = be, k = new Ce;
        H();
        var L = (e = $.extend({}, Ie, e)).settings;
        "function" == typeof L.getPrintMode && (y = L.getPrintMode());
        var x = e.serviceClient;
        if (!x)
            throw q.noServiceClient;
        function O() {
            t = null,
            a = null,
            F(),
            E = null,
            L.setClientId(null)
        }
        function V() {
            if ("function" != typeof L.getKeepClientAlive)
                throw new Error("Required settings.getKeepClientAlive() is not supplied for ReportViewerController");
            if (L.getKeepClientAlive() && t)
                return x.getClientsSessionTimeoutSeconds().then((function(e) {
                    (E = new Te(x,t,e)).start()
                }
                ))
        }
        function F() {
            L.getKeepClientAlive() && E && E.stop()
        }
        function G(e, t, r) {
            var n = "";
            if (!e.xhr)
                throw n = e,
                b.raiseError(X({
                    responseText: n
                }, null, null, null)),
                n;
            var a = e.xhr;
            _(a) && (N = !0,
            b.clientExpired());
            var i = X(a, e.status, T(e.error) ? "" : e.error, t);
            if (b.raiseError(i),
            !r) {
                if (C(a)) {
                    var o = M(a);
                    if (o)
                        throw o
                }
                throw a.responseJSON && a.responseJSON.exceptionMessage ? a.responseJSON.exceptionMessage : q.promisesChainStopError
            }
        }
        function U() {
            return a || (a = x.registerClient().catch((function(e) {
                G(e, q.errorRegisteringViewer)
            }
            )).then((function(e) {
                t = e,
                F(),
                L.setClientId(t),
                V()
            }
            )).catch(O)),
            a
        }
        function B() {
            var e, n;
            return i || (i = (e = s,
            n = l,
            ie(),
            x.createReportInstance(t, e, n).catch((function(t) {
                G(t, u(q.errorCreatingReportInstance, [d(e)]))
            }
            ))).then((function(e) {
                r = e
            }
            ))).catch((function(e) {
                i = null
            }
            )),
            i
        }
        function H() {
            n = null,
            r = null,
            i = null,
            z()
        }
        function z() {
            p = h = 0
        }
        function W(e, n, a, i, o) {
            return ie(),
            oe(),
            x.createReportDocument(t, r, e, n, a, i, o).catch((function(t) {
                G(t, u(q.errorCreatingReportDocument, [d(s), d(e)]))
            }
            ))
        }
        function j(e, t, n, a) {
            return a.isCanceled || t !== r ? Promise.reject() : x.getDocumentInfo(e, t, n).catch(G).then((function(r) {
                return r && r.documentReady || (r.promise = new Promise((function(e, t) {
                    window.setTimeout(e, a.documentInfoPollIntervalMs)
                }
                )).then((function() {
                    return j(e, t, n, a)
                }
                ))),
                r
            }
            ))
        }
        function K(a, i, o, s) {
            var l, c = {};
            function u(e) {
                a && (n = e,
                a && a.beginLoadReport(),
                ie(),
                oe(),
                se(),
                d(j(t, r, n, c)))
            }
            function d(e) {
                e.then((function(e) {
                    e.documentReady ? function(e) {
                        a && a.onReportLoadComplete(e)
                    }(e) : (!function(e) {
                        a && (h = e.pageCount,
                        a.reportLoadProgress(e))
                    }(e),
                    d(e.promise))
                }
                ))
            }
            function f(a) {
                return new Promise((function(i, o) {
                    var s = function() {
                        x.getPage(t, r, n, a).catch(G).then((function(t) {
                            t.pageReady ? i(t) : window.setTimeout(s, e.pagePollIntervalMs)
                        }
                        ))
                    };
                    s()
                }
                ))
            }
            function p() {
                if (!l) {
                    var t = I === te.PRINT_PREVIEW ? "HTML5" : "HTML5Interactive"
                      , r = function() {
                        var e = Y();
                        return e.ContentOnly = !0,
                        e.UseSVG = P(),
                        e
                    }();
                    n = {
                        deviceInfo: r
                    },
                    c.documentInfoPollIntervalMs = e.pagePollIntervalMs,
                    a && a.beforeLoadReport(n),
                    l = U().then(B).then((function() {
                        return W(t, r, i, o, s)
                    }
                    )).then(u)
                }
                var n;
                return l
            }
            return {
                beginLoad: function() {
                    p()
                },
                beginGetPage: function(t) {
                    ie(),
                    p().then((function() {
                        return function(e) {
                            a && a.beginLoadPage(e)
                        }(t),
                        f(t)
                    }
                    )).then((function(t) {
                        c.documentInfoPollIntervalMs = e.documentInfoPollIntervalMs,
                        a && a.pageReady(t)
                    }
                    ))
                },
                getPageData: function(e) {
                    return ie(),
                    p().then((function() {
                        return f(e)
                    }
                    ))
                },
                dispose: function() {
                    a = null
                },
                cancel: function() {
                    c.isCanceled = !0
                }
            }
        }
        function Y() {
            var e = {};
            L.getEnableAccessibility() && (e.enableAccessibility = !0,
            e.contentTabIndex = L.contentTabIndex);
            var t = {};
            b.getSearchDialogState(t);
            var r = t.visible
              , n = !L.getSearchMetadataOnDemand() || r;
            return e.enableSearch = n,
            e
        }
        function X(e, t, r, n) {
            var a, i = w(e.responseText), o = "";
            if (i) {
                var s = A(i.exceptionType || i.error, a = "InvalidParameterException", "Telerik.Reporting.Services.Engine." + a) ? q.missingOrInvalidParameter : "";
                if (s)
                    return s;
                o = d(i.message);
                var l = d(i.exceptionMessage || i.error_description);
                l && (o ? o += " " + l : o = l)
            } else
                o = d(e.responseText);
            return (n || r) && (o && (o = " " + o),
            o = d(n || r) + o),
            _(e) && (o += "<br />" + q.clientExpired),
            o
        }
        function J() {
            le();
            var e = {
                ImmediatePrint: !0
            }
              , t = {
                deviceInfo: e,
                handled: !1
            };
            if (b.printStarted(t),
            !t.handled) {
                b.setUIState({
                    operationName: "PrintInProgress",
                    inProgress: !0
                }),
                b.showNotification({
                    stringResources: "preparingPrint"
                });
                var r = "response-content-disposition=" + (function() {
                    switch (y) {
                    case re.FORCE_PDF_FILE:
                    case !1:
                        return !1;
                    case re.FORCE_PDF_PLUGIN:
                    case !0:
                        return !0;
                    default:
                        return Ee.getDirectPrintState()
                    }
                }() ? "inline" : "attachment");
                Q("PDF", e).then((function(e) {
                    var t = x.formatDocumentUrl(e.clientId, e.instanceId, e.documentId, r)
                      , n = {
                        url: t,
                        handled: !1
                    };
                    b.printReady(n),
                    b.hideNotification(),
                    b.setUIState({
                        operationName: "PrintInProgress",
                        inProgress: !1
                    }),
                    n.handled || Ee.print(t)
                }
                ))
            }
        }
        function Z(e) {
            le(),
            e.deviceInfo || (e.deviceInfo = Y());
            var n = {
                deviceInfo: e.deviceInfo,
                handled: !1,
                format: e.format
            };
            b.sendEmailStarted(n);
            n.handled || Q(e.format, e.deviceInfo).then((function(n) {
                var a = x.formatDocumentUrl(n.clientId, n.instanceId, n.documentId, "response-content-disposition=attachment");
                e.url = a,
                e.handled = !1,
                b.sendEmailReady(e),
                delete e.deviceInfo,
                e.handled || function(e, n) {
                    ie(),
                    oe(),
                    x.sendDocument(t, r, e, n).catch((function(e) {
                        G(e, u(q.errorSendingDocument, [d(s)]))
                    }
                    ))
                }(n.documentId, e)
            }
            ))
        }
        function Q(a, i) {
            return le(),
            U().then(B).then((function() {
                return W(a, i, !0, n)
            }
            )).then((function(n) {
                return function(e, t, r, n) {
                    return new Promise((function(a, i) {
                        var o = function(n) {
                            n.then((function(n) {
                                n.documentReady ? a({
                                    clientId: e,
                                    instanceId: t,
                                    documentId: r
                                }) : o(n.promise)
                            }
                            ))
                        };
                        o(j(e, t, r, n))
                    }
                    ))
                }(t, r, n, e)
            }
            ))
        }
        function ee(e) {
            le(),
            oe(),
            se(),
            ge(),
            b.refreshReportCore(!1, n, e)
        }
        function ie() {
            if (!t)
                throw q.controllerNotInitialized
        }
        function oe() {
            if (!r)
                throw q.noReportInstance
        }
        function se() {
            if (!n)
                throw q.noReportDocument
        }
        function le() {
            if (!s)
                throw q.noReport
        }
        function ce(e, t) {
            return "function" == typeof t[0] ? k.on(e, t[0]) : k.trigger(e, ...t),
            b
        }
        function ue(e, t) {
            if (e)
                for (var r = 0, n = e.length; r < n; r++) {
                    var a = e[r];
                    if (a.id === t)
                        return a.page;
                    var i = ue(a.items, t);
                    if (i)
                        return i
                }
            return null
        }
        function de(e) {
            fe(e),
            b.reportSourceChanged()
        }
        function fe(e) {
            "function" == typeof L.setReportSource && L.setReportSource(e)
        }
        t = L.getClientId(),
        V();
        var pe = {
            sorting: function(e) {
                ee(e.Id)
            },
            toggleVisibility: function(e) {
                ee(e.Id)
            },
            navigateToReport: function(e) {
                var t, r, n = e.Value;
                ge(),
                b.setReportSource({
                    report: n.Report,
                    parameters: (t = n.ParameterValues,
                    r = {},
                    Array.isArray(t) && t.forEach((function(e) {
                        r[e.Key] = e.Value
                    }
                    )),
                    r)
                }),
                b.refreshReport(!1, !0)
            },
            navigateToUrl: function(e) {
                var t = e.Value;
                window.open(t.Url, t.Target)
            },
            navigateToBookmark: function(e) {
                var t = e.Value
                  , r = ue(m, t);
                b.navigateToPage(r, {
                    type: "bookmark",
                    id: t
                })
            },
            customAction: function(e) {}
        };
        function he(e) {
            var t = e.action
              , r = pe[t.Type];
            "function" == typeof r && window.setTimeout((function() {
                !function(e) {
                    b.interactiveActionExecuting(e)
                }(e),
                e.cancel || r(t)
            }
            ), 0)
        }
        function ge() {
            b.serverActionStarted()
        }
        function me(e) {
            if (!S(e.xhr))
                throw G(e, null, !0),
                null;
            throw w(e.xhr.responseText).exceptionMessage
        }
        return b.Events = {
            ERROR: "error",
            EXPORT_STARTED: "exportStarted",
            EXPORT_DOCUMENT_READY: "exportDocumentReady",
            PRINT_STARTED: "printStarted",
            PRINT_DOCUMENT_READY: "printDocumentReady",
            BEFORE_LOAD_PARAMETERS: "beforeLoadParameters",
            LOADED_REPORT_CHANGE: "loadedReportChange",
            BEFORE_LOAD_REPORT: "beforeLoadReport",
            BEGIN_LOAD_REPORT: "beginLoadReport",
            REPORT_LOAD_COMPLETE: "reportLoadComplete",
            REPORT_LOAD_PROGRESS: "reportLoadProgress",
            REPORT_LOAD_FAIL: "reportLoadFail",
            BEGIN_LOAD_PAGE: "beginLoadPage",
            PAGE_READY: "pageReady",
            VIEW_MODE_CHANGED: "viewModeChanged",
            PAGE_MODE_CHANGED: "pageModeChanged",
            PRINT_MODE_CHANGED: "printModeChanged",
            REPORT_SOURCE_CHANGED: "reportSourceChanged",
            NAVIGATE_TO_PAGE: "navigateToPage",
            CURRENT_PAGE_CHANGED: "currentPageChanged",
            GET_DOCUMENT_MAP_STATE: "trv.GET_DOCUMENT_MAP_STATE",
            SET_DOCUMENT_MAP_VISIBLE: "trv.SET_DOCUMENT_MAP_VISIBLE",
            GET_PARAMETER_AREA_STATE: "trv.GET_PARAMETER_AREA_STATE",
            SET_PARAMETER_AREA_VISIBLE: "trv.SET_PARAMETER_AREA_VISIBLE",
            SCALE_CHANGED: "scaleChanged",
            SCALE_MODE_CHANGED: "scaleModeChanged",
            SERVER_ACTION_STARTED: "serverActionStarted",
            SET_TOGGLE_SIDE_MENU: "trv.SET_TOGGLE_SIDE_MENU",
            GET_TOGGLE_SIDE_MENU: "trv.GET_TOGGLE_SIDE_MENU",
            UPDATE_UI: "trv.UPDATE_UI",
            CSS_LOADED: "cssLoaded",
            RELOAD_PARAMETERS: "reloadParameters",
            PARAMETERS_LOADED: "parametersLoaded",
            INTERACTIVE_ACTION_EXECUTING: "interactiveActionExecuting",
            INTERACTIVE_ACTION_ENTER: "interactiveActionEnter",
            INTERACTIVE_ACTION_LEAVE: "interactiveActionLeave",
            UPDATE_UI_INTERNAL: "trv.UPDATE_UI_INTERNAL",
            CLIENT_EXPIRED: "clientExpired",
            TOOLTIP_OPENING: "tooltipOpening",
            TOOLTIP_CLOSING: "tooltipClosing",
            PAGE_NUMBER: "trv.PAGE_NUMBER",
            PAGE_COUNT: "trv.PAGE_COUNT",
            GET_SEARCH_DIALOG_STATE: "trv.GET_SEARCH_DIALOG_STATE",
            GET_SEND_EMAIL_DIALOG_STATE: "trv.GET_SEND_EMAIL_DIALOG_STATE",
            SET_SEARCH_DIALOG_VISIBLE: "trv.SET_SEARCH_DIALOG_VISIBLE",
            SET_SEND_EMAIL_DIALOG_VISIBLE: "trv.SET_SEND_EMAIL_DIALOG_VISIBLE",
            SEND_EMAIL_STARTED: "sendEmailStarted",
            SEND_EMAIL_READY: "sendEmailDocumentReady",
            SHOW_NOTIFICATION: "trv.SHOW_NOTIFICATION",
            HIDE_NOTIFICATION: "trv.HIDE_NOTIFICATION",
            UI_STATE: "trv.UI_STATE",
            SCROLL_PAGE_READY: "scrollPageReady",
            UPDATE_SCROLL_PAGE_DIMENSIONS_READY: "trv.UPDATE_SCROLL_PAGE_DIMENSIONS_READY",
            MISSING_OR_INVALID_PARAMETERS: "missingOrInvalidParameters",
            RENDERING_STOPPED: "renderingStopped"
        },
        $.extend(b, {
            getPageData: function(e) {
                if (g)
                    return g.getPageData(e)
            },
            getReportSource: function() {
                return null === s ? null : {
                    report: s,
                    parameters: $.extend({}, l)
                }
            },
            setReportSource: function(e) {
                return null === e ? (s = l = null,
                H(),
                de(e),
                this) : (s = e.report,
                b.setParameters(e.parameters),
                de(e),
                this)
            },
            updateSettings: function(t) {
                e.settings = $.extend({}, t, e.settings)
            },
            clearReportSource: function() {
                return s = l = null,
                H(),
                de(void 0),
                this
            },
            getReportDocumentId: function() {
                return n
            },
            setReportDocumentId: function(e) {
                n = e
            },
            setParameters: function(e) {
                l = e,
                b.parametersLoaded()
            },
            setProcessedParameter: function(e) {
                c = e
            },
            getPageCount: function() {
                return h
            },
            getCurrentPageNumber: function() {
                return p
            },
            setCurrentPageNumber: function(e) {
                var t, r = f(e);
                return r !== p && (p = r,
                t = r,
                L.setPageNumber(t),
                b.currentPageChanged()),
                this
            },
            getScale: function() {
                return L.getScale()
            },
            setScale: function(e) {
                return L.getScale() !== e && (L.setScale(e),
                b.scaleChanged(e),
                b.setScaleMode(ae.SPECIFIC)),
                b
            },
            getScaleMode: function() {
                return L.getScaleMode()
            },
            setScaleMode: function(e) {
                return L.getScaleMode() !== e && (L.setScaleMode(e),
                b.scaleModeChanged(e)),
                b
            },
            getViewMode: function() {
                return I
            },
            setViewMode: function(e) {
                return I !== e && (I = e,
                b.viewModeChanged(e),
                s && b.refreshReportCore(!1, n)),
                b
            },
            getPageMode: function() {
                return R
            },
            setPageMode: function(e) {
                return R !== e && (R = e,
                b.pageModeChanged(e),
                s && b.refreshReportCore(!1, n)),
                b
            },
            getPrintMode: function() {
                return y
            },
            setPrintMode: function(e) {
                return y !== e && (y = e,
                b.printModeChanged(e)),
                b
            },
            previewReport: function(e, t, r) {
                b.loadedReportChange(),
                b.respectReportAutoRun = !1,
                b.refreshReportCore(e, t, r)
            },
            refreshReportCore: function(e, t, r) {
                !function(e, t, r) {
                    s ? (g && (g.dispose(),
                    g = null),
                    H(),
                    (g = new K(b,!e,t,r)).beginLoad()) : b.raiseError(q.noReport)
                }(e, t, r)
            },
            stopRendering: function() {
                le(),
                oe(),
                se(),
                x.deleteReportDocument(t, r, n).catch(G).then((function() {
                    g && g.cancel(),
                    z(),
                    b.renderingStopped()
                }
                ))
            },
            getReportParameters: function() {
                if (!l)
                    return [];
                var e = {};
                for (var t in c) {
                    var r = c[t]
                      , n = l[t];
                    r && r.availableValues ? r.multivalue ? e[t] = we(r, n, t) : e[t] = Ae(r, n, t) : e[t] = n
                }
                return e
            },
            refreshReport: function(e, t, r, n) {
                if (b.loadedReportChange(),
                N && (N = !1,
                O()),
                s) {
                    var a = b.loadParameters(null);
                    a.then((function(a) {
                        var i = {}
                          , o = []
                          , s = !1;
                        Array.from(a || []).forEach((e => {
                            try {
                                var t = D.validate(e, e.value);
                                i[e.id] = t
                            } catch (t) {
                                return s = !0,
                                void o.push(e)
                            }
                        }
                        )),
                        s ? (b.raiseError(q.missingOrInvalidParameter),
                        function(e) {
                            for (var t = document.querySelector(".trv-pages-area .trv-error-message"), r = document.createElement("ul"), n = 0; n < e.length; n++) {
                                var a = document.createElement("li");
                                a.classList.add(e[n].name),
                                a.innerText = u("{0} ({1})", [e[n].text, e[n].name]),
                                r.appendChild(a)
                            }
                            t.appendChild(r)
                        }(o),
                        b.missingOrInvalidParameters()) : (b.respectReportAutoRun = t,
                        b.setParameters(i),
                        b.isReportAutoRun() ? b.refreshReportCore(e, r, n) : b.showNotification({
                            stringResources: "autoRunDisabled"
                        }))
                    }
                    )),
                    b.reloadParameters(a)
                } else
                    b.raiseError(q.noReport)
            },
            isReportAutoRun: function() {
                var e, t = !0;
                return l && (t = null == (e = l.trv_AutoRun) || e),
                !b.respectReportAutoRun || t
            },
            exportReport: function(e, t) {
                !function(e, t) {
                    le(),
                    t || (t = Y());
                    var r = {
                        format: e,
                        deviceInfo: t,
                        handled: !1
                    };
                    b.exportStarted(r),
                    r.handled || (b.setUIState({
                        operationName: "ExportInProgress",
                        inProgress: !0
                    }),
                    b.showNotification({
                        stringResources: "preparingDownload"
                    }),
                    Q(e, r.deviceInfo).then((function(t) {
                        var r = x.formatDocumentUrl(t.clientId, t.instanceId, t.documentId, "response-content-disposition=attachment")
                          , n = {
                            url: r,
                            format: e,
                            handled: !1,
                            windowOpenTarget: "_self"
                        };
                        b.exportReady(n),
                        b.hideNotification(),
                        b.setUIState({
                            operationName: "ExportInProgress",
                            inProgress: !1
                        }),
                        n.handled || window.open(r, n.windowOpenTarget)
                    }
                    )))
                }(e, t)
            },
            sendReport: function(e) {
                Z(e)
            },
            printReport: function() {
                J()
            },
            getReportPage: function(e) {
                var t;
                t = e,
                g && g.beginGetPage(t)
            },
            executeReportAction: function(e) {
                he(e)
            },
            reportActionEnter: function(e) {
                !function(e) {
                    b.interactiveActionEnter({
                        action: e.action,
                        element: e.element
                    })
                }(e)
            },
            reportActionLeave: function(e) {
                !function(e) {
                    b.interactiveActionLeave({
                        action: e.action,
                        element: e.element
                    })
                }(e)
            },
            reportToolTipOpening: function(e) {
                !function(e) {
                    b.toolTipOpening(e)
                }(e)
            },
            loadParameters: function(e) {
                return null === s ? {} : (b.beforeLoadParameters(null === e),
                function(e, r) {
                    return U().then((function() {
                        return x.getParameters(t, e, r || l || {}).catch((function(e) {
                            G(e, q.unableToGetReportParameters)
                        }
                        ))
                    }
                    ))
                }(s, e))
            },
            getDocumentFormats: function() {
                return v ? Promise.resolve(v) : (o || (o = x.getDocumentFormats().catch(G)),
                o)
            },
            getServiceVersion: function() {
                return x.getServiceVersion().catch(G)
            },
            setAuthenticationToken: function(e) {
                x.setAccessToken(e)
            },
            clientId: function() {
                return t
            },
            onReportLoadComplete: function(e) {
                h = e.pageCount,
                m = e.bookmarkNodes,
                v = e.renderingExtensions,
                fe(b.getReportSource()),
                b.reportLoadComplete(e)
            },
            raiseError: function(...e) {
                var t = function(e) {
                    var t = e.length;
                    return 1 === t ? e[0] : t > 1 ? u(e[0], Array.prototype.slice.call(e, 1)) : ""
                }(e);
                b.error(t)
            },
            getSearchResults: function(e, a) {
                return function(e) {
                    return e.searchToken && "" !== e.searchToken ? x.getSearchResults(t, r, n, e.searchToken, e.matchCase, e.matchWholeWord, e.useRegex).catch(me) : Promise.resolve(null)
                }(e)
            },
            on: function(e, t) {
                return k.on(e, t),
                b
            },
            trigger: function(e, ...t) {
                return k.trigger(e, ...t),
                b
            },
            showNotification: function(...e) {
                return ce(b.Events.SHOW_NOTIFICATION, e)
            },
            hideNotification: function(...e) {
                return ce(b.Events.HIDE_NOTIFICATION, e)
            },
            setUIState: function(...e) {
                return ce(b.Events.UI_STATE, e)
            },
            error: function(...e) {
                return ce(b.Events.ERROR, e)
            },
            reloadParameters: function(...e) {
                return ce(b.Events.RELOAD_PARAMETERS, e)
            },
            parametersLoaded: function(...e) {
                return ce(b.Events.PARAMETERS_LOADED, e)
            },
            exportStarted: function(...e) {
                return ce(b.Events.EXPORT_STARTED, e)
            },
            exportReady: function(...e) {
                return ce(b.Events.EXPORT_DOCUMENT_READY, e)
            },
            sendEmailStarted: function(...e) {
                return ce(b.Events.SEND_EMAIL_STARTED, e)
            },
            sendEmailReady: function(...e) {
                return ce(b.Events.SEND_EMAIL_READY, e)
            },
            printStarted: function(...e) {
                return ce(b.Events.PRINT_STARTED, e)
            },
            printReady: function(...e) {
                return ce(b.Events.PRINT_DOCUMENT_READY, e)
            },
            beforeLoadParameters: function(...e) {
                return ce(b.Events.BEFORE_LOAD_PARAMETERS, e)
            },
            loadedReportChange: function(...e) {
                return ce(b.Events.LOADED_REPORT_CHANGE, e)
            },
            beforeLoadReport: function(...e) {
                return ce(b.Events.BEFORE_LOAD_REPORT, e)
            },
            beginLoadReport: function(...e) {
                return ce(b.Events.BEGIN_LOAD_REPORT, e)
            },
            reportLoadComplete: function(...e) {
                return ce(b.Events.REPORT_LOAD_COMPLETE, e)
            },
            reportLoadProgress: function(...e) {
                return ce(b.Events.REPORT_LOAD_PROGRESS, e)
            },
            reportLoadFail: function(...e) {
                return ce(b.Events.REPORT_LOAD_FAIL, e)
            },
            beginLoadPage: function(...e) {
                return ce(b.Events.BEGIN_LOAD_PAGE, e)
            },
            pageReady: function(...e) {
                return ce(b.Events.PAGE_READY, e)
            },
            viewModeChanged: function(...e) {
                return ce(b.Events.VIEW_MODE_CHANGED, e)
            },
            pageModeChanged: function(...e) {
                return ce(b.Events.PAGE_MODE_CHANGED, e)
            },
            printModeChanged: function(...e) {
                return ce(b.Events.PRINT_MODE_CHANGED, e)
            },
            reportSourceChanged: function(...e) {
                return ce(b.Events.REPORT_SOURCE_CHANGED, e)
            },
            navigateToPage: function(...e) {
                return ce(b.Events.NAVIGATE_TO_PAGE, e)
            },
            currentPageChanged: function(...e) {
                return ce(b.Events.CURRENT_PAGE_CHANGED, e)
            },
            getDocumentMapState: function(...e) {
                return ce(b.Events.GET_DOCUMENT_MAP_STATE, e)
            },
            setDocumentMapVisible: function(...e) {
                return ce(b.Events.SET_DOCUMENT_MAP_VISIBLE, e)
            },
            getParametersAreaState: function(...e) {
                return ce(b.Events.GET_PARAMETER_AREA_STATE, e)
            },
            setParametersAreaVisible: function(...e) {
                return ce(b.Events.SET_PARAMETER_AREA_VISIBLE, e)
            },
            setSideMenuVisible: function(...e) {
                return ce(b.Events.SET_TOGGLE_SIDE_MENU, e)
            },
            getSideMenuVisible: function(...e) {
                return ce(b.Events.GET_TOGGLE_SIDE_MENU, e)
            },
            scaleChanged: function(...e) {
                return ce(b.Events.SCALE_CHANGED, e)
            },
            scaleModeChanged: function(...e) {
                return ce(b.Events.SCALE_MODE_CHANGED, e)
            },
            serverActionStarted: function(...e) {
                return ce(b.Events.SERVER_ACTION_STARTED, e)
            },
            cssLoaded: function(...e) {
                return ce(b.Events.CSS_LOADED, e)
            },
            interactiveActionExecuting: function(...e) {
                return ce(b.Events.INTERACTIVE_ACTION_EXECUTING, e)
            },
            interactiveActionEnter: function(...e) {
                return ce(b.Events.INTERACTIVE_ACTION_ENTER, e)
            },
            interactiveActionLeave: function(...e) {
                return ce(b.Events.INTERACTIVE_ACTION_LEAVE, e)
            },
            updateUI: function(...e) {
                return ce(b.Events.UPDATE_UI, e)
            },
            updateUIInternal: function(...e) {
                return ce(b.Events.UPDATE_UI_INTERNAL, e)
            },
            toolTipOpening: function(...e) {
                return ce(b.Events.TOOLTIP_OPENING, e)
            },
            pageNumberChange: function(...e) {
                return ce(b.Events.PAGE_NUMBER, e)
            },
            pageCountChange: function(...e) {
                return ce(b.Events.PAGE_COUNT, e)
            },
            getSearchDialogState: function(...e) {
                return ce(b.Events.GET_SEARCH_DIALOG_STATE, e)
            },
            getSendEmailDialogState: function(...e) {
                return ce(b.Events.GET_SEND_EMAIL_DIALOG_STATE, e)
            },
            setSearchDialogVisible: function(...e) {
                return ce(b.Events.SET_SEARCH_DIALOG_VISIBLE, e)
            },
            setSendEmailDialogVisible: function(...e) {
                return ce(b.Events.SET_SEND_EMAIL_DIALOG_VISIBLE, e)
            },
            scrollPageReady: function(...e) {
                return ce(b.Events.SCROLL_PAGE_READY, e)
            },
            updatePageDimensionsReady: function(...e) {
                return ce(b.Events.UPDATE_SCROLL_PAGE_DIMENSIONS_READY, e)
            },
            missingOrInvalidParameters: function(...e) {
                return ce(b.Events.MISSING_OR_INVALID_PARAMETERS, e)
            },
            renderingStopped: function(...e) {
                return ce(b.Events.RENDERING_STOPPED, e)
            },
            clientExpired: function(...e) {
                return ce(b.Events.CLIENT_EXPIRED, e)
            },
            dispose: function() {
                F(),
                this.serviceClientSentinel = null
            }
        }),
        b
    }
    function Ae(e, t, r) {
        try {
            var n = e.availableValues.find((e => e.value === t));
            if (!n)
                throw new Error(`The available values of parameter ${r} do not contain Value property that equals ${t}`);
            return {
                valueMember: t,
                displayMember: n.name
            }
        } catch (e) {
            k(e)
        }
    }
    function we(e, t, r) {
        var n = [];
        for (var a in t)
            n.push(Ae(e, t[a], r));
        return n
    }
    const Me = {
        EXPORT_BEGIN: "EXPORT_BEGIN",
        EXPORT_END: "EXPORT_END",
        PRINT_BEGIN: "PRINT_BEGIN",
        PRINT_END: "PRINT_END",
        RENDERING_BEGIN: "RENDERING_BEGIN",
        RENDERING_END: "RENDERING_END",
        PAGE_READY: "PAGE_READY",
        ERROR: "ERROR",
        UPDATE_UI: "UPDATE_UI",
        INTERACTIVE_ACTION_EXECUTING: "INTERACTIVE_ACTION_EXECUTING",
        INTERACTIVE_ACTION_ENTER: "INTERACTIVE_ACTION_ENTER",
        INTERACTIVE_ACTION_LEAVE: "INTERACTIVE_ACTION_LEAVE",
        VIEWER_TOOLTIP_OPENING: "VIEWER_TOOLTIP_OPENING",
        SEND_EMAIL_BEGIN: "SEND_EMAIL_BEGIN",
        SEND_EMAIL_END: "SEND_EMAIL_END",
        PARAMETERS_LOADED: "PARAMETERS_LOADED"
    };
    function ye(e) {
        var t = e.controller;
        if (!t)
            throw "No controller (telerikReporting.reportViewerController) has been specified.";
        var r = e.settings
          , n = r.getHistory() || {
            records: [],
            position: -1
        };
        function a() {
            var e = n.records;
            return e.length > 0 ? e[n.position] : null
        }
        function i() {
            r.setHistory(n)
        }
        function o(e) {
            !function() {
                var e = n.records.length - 1;
                for (; e >= 0 && !0 === n.records[e].temp; )
                    n.records.splice(e, 1),
                    n.position >= e && n.position--,
                    e--
            }();
            var r, o, s, l = a(), c = t.getReportSource();
            l && E(l.reportSource, c) || (r = {
                reportSource: c,
                pageNumber: 1,
                temp: e
            },
            o = n.records,
            s = n.position,
            (o = Array.prototype.slice.call(o, 0, s + 1)).push(r),
            n.records = o,
            n.position = o.length - 1,
            i())
        }
        function s(e, r) {
            t.setReportDocumentId(e.reportDocumentId),
            t.setViewMode(e.viewMode),
            t.setReportSource(e.reportSource),
            t.refreshReport(!1, r, e.reportDocumentId),
            t.navigateToPage(e.pageNumber)
        }
        function l(e) {
            var t = n.position
              , r = n.records.length
              , a = t + e;
            return 0 <= a && a < r
        }
        function c(e) {
            var t = n.position
              , r = n.records.length
              , o = t + e;
            if (o < 0 ? o = 0 : o >= r && (o = r - 1),
            o != t) {
                var l = a()
                  , c = l.reportSource ? l.reportSource.report : "";
                n.position = o,
                i();
                var u = a();
                s(u, c !== (u.reportSource ? u.reportSource.report : ""))
            }
        }
        return t.loadedReportChange((function() {
            o(!0)
        }
        )).currentPageChanged((function() {
            var e;
            (e = a()) && (e.pageNumber = t.getCurrentPageNumber(),
            e.viewMode = t.getViewMode(),
            e.reportDocumentId = t.getReportDocumentId(),
            i())
        }
        )).reportLoadComplete((function(e, t) {
            o(!1)
        }
        )).clientExpired((function() {
            for (var e = n.records, t = 0; t < e.length; t++)
                e[t].reportDocumentId = null
        }
        )),
        {
            back: function() {
                c(-1)
            },
            forward: function() {
                c(1)
            },
            canMoveBack: function() {
                return l(-1)
            },
            canMoveForward: function() {
                return l(1)
            },
            loadCurrent: function() {
                var e = a();
                return e && s(e, !1),
                Boolean(e)
            }
        }
    }
    function Ne(e, t) {
        var r, n;
        function a(e, r) {
            var n = t[e];
            "function" == typeof n && n(r)
        }
        !function(e) {
            if ("function" == typeof $.fn.kendoTouch)
                try {
                    $(e).mousedown((function() {
                        n = !0
                    }
                    )).mouseup((function() {
                        n = !1
                    }
                    )).kendoTouch({
                        multiTouch: !0,
                        enableSwipe: !0,
                        swipe: function(e) {
                            n || function(e) {
                                a("swipe", e)
                            }(e)
                        },
                        gesturestart: function(e) {
                            n || function(e) {
                                r = kendo.touchDelta(e.touches[0], e.touches[1]).distance
                            }(e)
                        },
                        gestureend: function(e) {},
                        gesturechange: function(e) {
                            n || function(e) {
                                var t = kendo.touchDelta(e.touches[0], e.touches[1]).distance;
                                (function(e) {
                                    a("pinch", e)
                                }
                                )({
                                    distance: t,
                                    lastDistance: r
                                }),
                                r = t
                            }(e)
                        },
                        doubletap: function(e) {
                            n || function(e) {
                                a("doubletap", e)
                            }(e)
                        },
                        touchstart: function(e) {
                            n || a("touchstart")
                        }
                    })
                } catch (e) {
                    throw console.error("Instantiation of Kendo Touch threw an exception", e),
                    e
                }
        }(e)
    }
    var De = {
        controller: {},
        $placeholder: null,
        $pageContainer: null,
        pageContainer: null,
        $pageWrapper: null,
        pageWrapper: null,
        viewMode: null,
        loadedPage: {},
        scrollInProgress: !1,
        enabled: !1,
        pageCount: 0,
        additionalTopOffset: 130,
        pageDistance: 20,
        oldScrollTopPosition: 0,
        skeletonTemplate: '<div class="trv-report-page trv-skeleton-page trv-skeleton-{0}" style="{1}" data-page="{0}"><div class="trv-skeleton-wrapper" style="{2}"></div></div>',
        init: function(e, t) {
            var r = this;
            r.$placeholder = $("[data-selector='" + t.viewerSelector + "']").find(e),
            r.$pageContainer = this.$placeholder.find(".trv-page-container"),
            r.pageContainer = this.$pageContainer[0],
            r.$pageWrapper = this.$placeholder.find(".trv-page-wrapper"),
            r.pageWrapper = this.$pageWrapper[0],
            r.controller = t.controller,
            r.viewMode = null,
            r.loadedPage = {},
            r.scrollInProgress = !1,
            r.enabled = !1,
            r.pageCount = 0,
            r.controller.scaleChanged((function(e, t) {
                r.enabled && setTimeout((function() {
                    r._loadMorePages(),
                    r._keepCurrentPageInToView()
                }
                ), 100)
            }
            )).loadedReportChange((function(e) {
                r.enabled && (r.disable(),
                "loadedReportChange" !== e.type && setTimeout((function() {
                    r.controller.getPageData(1).then((function(e) {
                        r.renderPage(e)
                    }
                    ))
                }
                )))
            }
            )).viewModeChanged((function(e) {
                r.enabled && r.disable()
            }
            )).interactiveActionExecuting((function(e, t) {
                var n = t.action.Type;
                !r.enabled || "sorting" !== n && "toggleVisibility" !== n || r.disable()
            }
            )).updatePageDimensionsReady((function(e, t) {
                r.enabled && r._currentPageNumber() > 0 && r._keepCurrentPageInToView()
            }
            )).pageCountChange((function(e, t) {
                r.enabled && r.pageCount !== t && (r._currentPageNumber() > 0 && !r.scrollInProgress && r._loadMorePages(),
                t > 1 && r._initEvents(),
                r.pageCount = t)
            }
            ))
        },
        isEnabled: function() {
            return this.enabled
        },
        disable: function() {
            this.$pageWrapper.empty(),
            this.enabled = !1,
            this.loadedPage = {},
            this.pageCount = 0,
            this.$placeholder.removeClass("scrollable"),
            this._unbind()
        },
        enable: function() {
            this.enabled = !0,
            this.$placeholder.addClass("scrollable"),
            this._initEvents()
        },
        renderPage: function(e) {
            var t = this
              , r = t.controller.getViewMode()
              , n = t.$placeholder.find('[data-page="' + e.pageNumber + '"]');
            t.enabled ? (r === t.viewMode && n.length ? t._navigateToPage(e, n) : t._updatePageArea(e),
            t.viewMode = t.controller.getViewMode()) : (t.enabled = !0,
            t.$placeholder.addClass("scrollable"),
            r === t.viewMode && n.length ? (t._render(e, !0),
            this.$pageContainer.scrollTop(3),
            t._setCurrentPage(e.pageNumber)) : t._updatePageArea(e),
            t.viewMode = t.controller.getViewMode(),
            t._loadMorePages())
        },
        navigateToElement: function(e, t) {
            var r = this;
            r.scrollInProgress = !0,
            r._isSkeletonScreen(null, t) ? r.controller.getPageData(t).then((function(n) {
                r._render(n, !1),
                r.$pageContainer.animate({
                    scrollTop: e
                }, 500, (function() {
                    r._setCurrentPage(t),
                    setTimeout((function() {
                        r.scrollInProgress = !1
                    }
                    ), 100)
                }
                ))
            }
            )) : r.$pageContainer.animate({
                scrollTop: e
            }, 500, (function() {
                r._setCurrentPage(t),
                setTimeout((function() {
                    r.scrollInProgress = !1
                }
                ), 100)
            }
            ))
        },
        _setCurrentPage: function(e) {
            var t = this;
            e !== t._currentPageNumber() && t.controller.setCurrentPageNumber(e),
            t.controller.getPageCount() > 1 && (t.$placeholder.find(".k-state-default").removeClass("k-state-default"),
            t.$placeholder.find('[data-page="' + e + '"]').addClass("k-state-default")),
            t._loadNextPreviousPage(e)
        },
        _updatePageArea: function(e) {
            var t = this
              , r = 0
              , n = e.pageNumber;
            t.scrollInProgress = !0,
            n > 1 && t._generateSkeletonScreens(n),
            t._render(e, !1),
            t._setCurrentPage(e.pageNumber),
            setTimeout((function() {
                r = n > 1 ? t.$placeholder.find('[data-page="' + n + '"]').position().top : 0,
                t.$pageContainer.animate({
                    scrollTop: r
                }, 0, (function() {
                    t.scrollInProgress = !1
                }
                ))
            }
            ), 100)
        },
        _navigateToPage: function(e, t) {
            var r = this;
            r.scrollInProgress = !0;
            var n = t.position().top
              , a = r.$placeholder.find(".trv-report-page")
              , i = e.pageNumber;
            $(a[0]).height(),
            r._isSkeletonScreen(t, i) ? r.controller.getPageData(i).then((function(e) {
                r._render(e, !1),
                r.$pageContainer.animate({
                    scrollTop: n
                }, 500, (function() {
                    setTimeout((function() {
                        r._setCurrentPage(e.pageNumber),
                        r.scrollInProgress = !1
                    }
                    ))
                }
                ))
            }
            )) : (r._updatePageContent(e, t),
            r.$pageContainer.animate({
                scrollTop: n
            }, 500, (function() {
                setTimeout((function() {
                    r._setCurrentPage(e.pageNumber),
                    r.scrollInProgress = !1
                }
                ))
            }
            )))
        },
        _updatePageContent: function(e, t) {
            this._updatePageStyle(e);
            var r = e.pageNumber
              , n = $($.parseHTML(e.pageContent)).find("div.sheet")
              , a = this.$placeholder.find('[data-page="' + r + '"]');
            n.css("margin", 0),
            a.append(n).append($('<div class="trv-page-overlay"></div>')),
            t.replaceWith(a),
            this.controller.scrollPageReady({
                page: e,
                target: a
            })
        },
        _currentPageNumber: function() {
            return this.controller.getCurrentPageNumber()
        },
        _isSkeletonScreen: function(e, t) {
            return e || (e = this.$placeholder.find('[data-page="' + t + '"]')),
            e.hasClass("trv-skeleton-" + t)
        },
        _addSkeletonScreen: function(e, t) {
            var r = this
              , n = t ? parseInt(e + 1) : parseInt(e - 1)
              , a = r.$placeholder.find('[data-page="' + n + '"]')
              , i = a.attr("style")
              , o = a.find("sheet").attr("style")
              , s = u(r.skeletonTemplate, [e, i, o]);
            t ? r.$pageWrapper.prepend(s) : r.$pageWrapper.append(s)
        },
        _generateSkeletonScreens: function(e) {
            for (var t = this, r = "", n = this.$placeholder.find('[data-page="1"]'), a = n.attr("style"), i = n.find("sheet").attr("style"), o = t.$placeholder.find(".trv-report-page").last().attr("data-page"), s = o ? parseInt(o) + 1 : 1; s < e; s++)
                r += u(t.skeletonTemplate, [s, a, i]);
            t.$pageWrapper.append($(r))
        },
        _loadMorePages: function() {
            var e = this
              , t = e.controller.getPageCount()
              , r = e.$pageContainer.innerHeight() > e.$pageWrapper.innerHeight();
            if (t > 1)
                if (r) {
                    e.scrollInProgress = !0;
                    var n = parseInt(e.$placeholder.find(".trv-report-page").last().attr("data-page")) + 1;
                    n <= t && e.controller.getPageData(n).then((function(t) {
                        e._render(t, !1),
                        e._loadMorePages(),
                        e.scrollInProgress = !1
                    }
                    ))
                } else
                    e._loadVisiblePages(),
                    e.scrollInProgress = !1
        },
        _loadVisiblePages: function() {
            var e = this
              , t = e.$placeholder.find(".trv-report-page");
            Array.from(t).forEach((t => {
                var r = $(t)
                  , n = parseInt(r.attr("data-page"));
                e._scrolledInToView(r) && e._isSkeletonScreen(r, n) && e.controller.getPageData(n).then((t => {
                    e._render(t, !1)
                }
                ))
            }
            ))
        },
        _scrolledInToView: function(e) {
            var t = e[0].getBoundingClientRect()
              , r = e.closest(".trv-pages-area")[0].getBoundingClientRect()
              , n = r.top
              , a = r.top + r.height
              , i = t.top
              , o = i + e.outerHeight(!0)
              , s = this.additionalTopOffset + n;
            return i > 0 && i < a || o < a && o > s
        },
        _render: function(e, t) {
            var r = this
              , n = e.pageNumber
              , a = r.$placeholder.find('[data-page="' + n + '"]');
            if (t || !a || !a.length || r._isSkeletonScreen(a, n)) {
                r.loadedPage[n] = e,
                r._updatePageStyle(e);
                var i = $($.parseHTML(e.pageContent)).find("div.sheet")
                  , o = $('<div class="trv-report-page" data-page="' + n + '"></div>');
                i.css("margin", 0),
                o.append(i).append($('<div class="trv-page-overlay"></div>')),
                t && r.$pageWrapper.empty(),
                r.$pageWrapper.removeData().data("pageNumber", n);
                var s = r.$placeholder.find(".trv-skeleton-" + n);
                s.length ? s.replaceWith(o) : r.$pageWrapper.append(o),
                r.controller.scrollPageReady({
                    page: e,
                    target: o
                })
            }
        },
        _updatePageStyle: function(e) {
            var t, r = this, n = r.loadedPage[r._lastLoadedPage()] || e, a = "trv-" + r.controller.clientId() + "-styles";
            $("#" + a).remove(),
            (t = $("<style id=" + a + "></style>")).append(n.pageStyles),
            t.appendTo("head")
        },
        _lastLoadedPage: function() {
            var e;
            for (var t in this.loadedPage)
                this.loadedPage.hasOwnProperty(t) && (e = t);
            return e
        },
        _loadNextPreviousPage: function(e) {
            var t, r, n, a, i = this;
            e < i.controller.getPageCount() && (t = e + 1,
            n = i.$placeholder.find('[data-page="' + t + '"]')),
            e > 1 && (r = e - 1,
            a = i.$placeholder.find('[data-page="' + r + '"]')),
            a && a.length && i._isSkeletonScreen(a, r) && i.controller.getPageData(r).then((function(e) {
                i._render(e, !1)
            }
            )),
            n && n.length && i._isSkeletonScreen(n, t) && i.controller.getPageData(t).then((function(e) {
                i._render(e, !1)
            }
            ))
        },
        _clickPage: function(e) {
            var t = this
              , r = t._currentPageNumber()
              , n = parseInt(e.attr("data-page"));
            r !== n && (t._isSkeletonScreen(e, n) ? t.controller.getPageData(n).then((function(e) {
                t._render(e, !1, !0),
                t._setCurrentPage(e.pageNumber)
            }
            )) : t._setCurrentPage(n))
        },
        _initEvents: function() {
            var e = this;
            e.$pageContainer.off("click", ".trv-report-page").on("click", ".trv-report-page", (function(t) {
                e._clickPage($(t.currentTarget))
            }
            )),
            e.$pageContainer.scroll((function() {
                var t = e.$placeholder.find(".trv-report-page")
                  , r = parseInt((e.$pageContainer.scrollTop() + e.$pageContainer.innerHeight()).toFixed(0));
                e.scrollInProgress || e.oldScrollTopPosition === r || (e.oldScrollTopPosition > r ? e._scrollUp(t) : e._scrollDown(t, r)),
                e.oldScrollTopPosition = r
            }
            )),
            e.$pageContainer.scroll((function() {
                var t = e.$placeholder.find(".trv-report-page")
                  , r = parseInt((e.$pageContainer.scrollTop() + e.$pageContainer.innerHeight()).toFixed(0));
                !e.scrollInProgress && t.length && e.oldScrollTopPosition !== r && e._advanceCurrentPage(t)
            }
            ))
        },
        _unbind: function() {
            this.$pageContainer.off("click", ".trv-report-page"),
            this.$pageContainer.off("scroll")
        },
        _advanceCurrentPage: function(e) {
            var t, r = this, n = r._findNewCurrentPage(e), a = r._currentPageNumber(), i = r._scrolledInToView(r.$placeholder.find('[data-page="' + a + '"]'));
            -1 !== n ? (n = $(n),
            a === (t = parseInt(n.attr("data-page"))) || i || (r._isSkeletonScreen(n, t) ? r.controller.getPageData(t).then((function(e) {
                r._render(e, !1, !0),
                r._setCurrentPage(e.pageNumber)
            }
            )) : r._setCurrentPage(t))) : console.log("Page not found - ", n)
        },
        _findNewCurrentPage: function(e) {
            var t = this
              , r = Math.floor(e.length / 2)
              , n = t._findPageInViewPort(r, e);
            return 1 === e.length ? e[0] : 0 === n ? e[r] : n < 0 && e.length > 1 ? t._findNewCurrentPage(e.splice(r, Number.MAX_VALUE)) : n > 0 && e.length > 1 ? t._findNewCurrentPage(e.splice(0, r)) : -1
        },
        _findPageInViewPort: function(e, t) {
            var r = this.$placeholder.find(t[e])
              , n = r[0].getBoundingClientRect()
              , a = r.closest(".trv-pages-area")[0].getBoundingClientRect()
              , i = a.top;
            a.top,
            a.height;
            var o = n.top
              , s = o + r.outerHeight(!0)
              , l = this.additionalTopOffset + i;
            return o <= l && l < s ? 0 : s < l ? -1 : 1
        },
        _scrollDown: function(e, t) {
            var r = this;
            if (t >= r.pageContainer.scrollHeight - 5) {
                var n = parseInt($(e[e.length - 1]).attr("data-page")) + 1;
                r._currentPageNumber() < n && n <= r.controller.getPageCount() && (r._addSkeletonScreen(n, !1),
                r.controller.getPageData(n).then((function(e) {
                    r._render(e, !1)
                }
                )))
            } else
                r._advanceCurrentPage(e),
                r._loadVisiblePages()
        },
        _scrollUp: function(e) {
            var t = this;
            if (0 === t.$pageContainer.scrollTop()) {
                var r = $(e[0])
                  , n = parseInt(r.attr("data-page")) - 1;
                t._currentPageNumber() > n && n >= 1 && (t._addSkeletonScreen(n, !0),
                t.controller.getPageData(n).then((function(e) {
                    t._render(e, !1),
                    t.$pageContainer.scrollTop(3)
                }
                )))
            } else
                t._advanceCurrentPage(e),
                t._loadVisiblePages()
        },
        _keepCurrentPageInToView: function() {
            var e = this
              , t = e.$placeholder.find('[data-page="' + e._currentPageNumber() + '"]')
              , r = t.position().top
              , n = t.innerHeight()
              , a = e.$pageContainer.innerHeight();
            e.scrollInProgress = !0,
            n < a && (r = parseInt(r - (a - n) / 2)),
            e.$pageContainer.animate({
                scrollTop: r
            }, 0, (function() {
                setTimeout((function() {
                    e.scrollInProgress = !1
                }
                ), 100)
            }
            ))
        }
    }
      , $e = {
        $placeholder: null,
        $scrollableContainer: null,
        itemsInitialState: {},
        xFrozenAreasBounds: {},
        yFrozenAreasBounds: {},
        freezeMaxZIndex: {},
        zIndex: 1,
        freezeBGColor: {},
        currentlyFrozenContainer: {
            vertical: {},
            horizontal: {}
        },
        isInitialize: !1,
        scaleFactor: null,
        init: function(e) {
            this.$placeholder = e,
            this.$scrollableContainer = e.find(".trv-page-container"),
            this.isInitialize && this.reset(e),
            this._attachToScrollEvent(),
            this.isInitialize = !0
        },
        reset: function(e) {
            this.$placeholder = e,
            this.$scrollableContainer = e.find(".trv-page-container"),
            this.itemsInitialState = {},
            this.xFrozenAreasBounds = {},
            this.yFrozenAreasBounds = {},
            this.currentlyfreezedContainer = {
                vertical: {},
                horizontal: {}
            }
        },
        setScaleFactor: function(e) {
            this.scaleFactor = e
        },
        _attachToScrollEvent: function() {
            var e = this;
            this.$scrollableContainer.scroll((function() {
                var t = e.$scrollableContainer.find("div[data-sticky-id]");
                if (t.length)
                    for (var r = t.map((function(e, t) {
                        return $(t).attr("data-sticky-id")
                    }
                    )).get(), n = r.filter((function(e, t) {
                        return t === r.indexOf(e)
                    }
                    )), a = e.$scrollableContainer.scrollTop(), i = e.$scrollableContainer.scrollLeft(), o = 0; o < n.length; o++) {
                        var s = n[o];
                        e.itemsInitialState[s] || e._saveFreezeItemsInitialState(s),
                        e._updateFreezeItemsOnScroll(s, a, i)
                    }
            }
            ))
        },
        _saveFreezeItemsInitialState: function(e) {
            var t, r, n = $("[data-sticky-direction][data-sticky-id='" + e + "']"), i = $("[data-reporting-action][data-sticky-id='" + e + "']");
            this.itemsInitialState[e] = {},
            this.freezeBGColor[e] = $("[data-id='" + e + "']").attr("data-sticky-bg-color");
            for (var o = 0; o < n.length; o++) {
                var s = $(n[o])
                  , l = s.attr("data-sticky-direction")
                  , c = s.attr("data-id")
                  , u = s.position()
                  , d = {
                    top: u.top / this.scaleFactor,
                    left: u.left / this.scaleFactor
                }
                  , f = a(d.left, d.top, s.outerWidth(!0) * this.scaleFactor, s.outerHeight(!0) * this.scaleFactor);
                switch (l) {
                case "Vertical":
                    t = t ? t.union(f) : f;
                    break;
                case "Horizontal":
                    r = r ? r.union(f) : f
                }
                this._saveFreezeItemInitialState(e, s, c, d)
            }
            this.freezeMaxZIndex[e] = i.length ? i.css("zIndex") : this.zIndex,
            this.yFrozenAreasBounds[e] = t,
            this.xFrozenAreasBounds[e] = r
        },
        _saveFreezeItemInitialState: function(e, t, r, n) {
            var a = t.css("background-color")
              , i = this._hasSetBgColor(a)
              , o = {
                top: n.top,
                left: n.left,
                zIndex: t.css("zIndex"),
                hasBgColor: i
            };
            this.itemsInitialState[e][r] = o
        },
        _updateFreezeItemsOnScroll: function(e, t, r) {
            var n = $("div[data-id='" + e + "']");
            if (this._isInScrollVisibleArea(n)) {
                var a = n.closest(".trv-report-page")
                  , i = a.position()
                  , o = parseFloat(a.css("margin-top"))
                  , s = parseFloat(a.css("padding-top"))
                  , l = parseFloat(a.css("padding-left"))
                  , c = parseFloat(a.css("border-top-width"))
                  , u = parseFloat(a.css("border-left-width"))
                  , d = $("[data-sticky-direction*='Horizontal'][data-sticky-id='" + e + "']")
                  , f = $("[data-sticky-direction*='Vertical'][data-sticky-id='" + e + "']")
                  , p = d.length > 0
                  , h = f.length > 0
                  , g = n.position()
                  , m = g.top + i.top + o + s + c
                  , v = g.left + l + u
                  , E = t - m
                  , b = r - v;
                h && E > 0 ? t <= n.outerHeight() * this.scaleFactor + m - this.yFrozenAreasBounds[e].height && (this.currentlyFrozenContainer.vertical[e] = !0,
                this._updateUIElementsPosition(f, "top", E / this.scaleFactor, e)) : this.currentlyFrozenContainer.vertical[e] && (delete this.currentlyFrozenContainer.vertical[e],
                this._updateUIElementsPosition(f, "top", -1, e)),
                p && b > 0 ? r <= n.outerWidth() * this.scaleFactor + v - this.xFrozenAreasBounds[e].width && (this.currentlyFrozenContainer.horizontal[e] = !0,
                this._updateUIElementsPosition(d, "left", b / this.scaleFactor, e)) : this.currentlyFrozenContainer.horizontal[e] && (delete this.currentlyFrozenContainer.horizontal[e],
                this._updateUIElementsPosition(d, "left", -1, e))
            } else
                (this.currentlyFrozenContainer.horizontal[e] || this.currentlyFrozenContainer.vertical[e]) && this._resetToDefaultPosition(e)
        },
        _resetToDefaultPosition: function(e) {
            var t = $("[data-sticky-direction*='Horizontal'][data-sticky-id='" + e + "']")
              , r = $("[data-sticky-direction*='Vertical'][data-sticky-id='" + e + "']");
            this._updateUIElementsPosition(r, "top", -1, e),
            this._updateUIElementsPosition(t, "left", -1, e),
            delete this.currentlyFrozenContainer.horizontal[e],
            delete this.currentlyFrozenContainer.vertical[e]
        },
        _updateUIElementsPosition: function(e, t, r, n) {
            for (var a = 0; a < e.length; a++) {
                var i = $(e[a])
                  , o = i.attr("data-sticky-direction").indexOf(",") > 0
                  , s = i.attr("data-id")
                  , l = this.itemsInitialState[n][s]
                  , c = l[t]
                  , u = l.zIndex
                  , d = l.hasBgColor
                  , f = 1
                  , p = this.freezeMaxZIndex[n] ? this.freezeMaxZIndex[n] : f
                  , h = {
                    "z-index": f = o ? "auto" !== u ? u : p + 2 : "auto" !== u ? u + 1 : p
                };
                r >= 0 ? c += r : h["z-index"] = u,
                d || this._applyBgColorOnScroll(i, o, d, r >= 0, n),
                h[t] = c + "px",
                i.css(h)
            }
        },
        _applyBgColorOnScroll: function(e, t, r, n, a) {
            return !!e.is("img") || (t && this._isFrozen(a) && !r ? (e.css("background-color", this.freezeBGColor[a]),
            !0) : void (n ? e.css("background-color", this.freezeBGColor[a]) : e.css("background-color", "initial")))
        },
        _hasSetBgColor: function(e) {
            return O(e) > 0
        },
        _isFrozen: function(e) {
            return this.currentlyFrozenContainer.horizontal[e] || this.currentlyFrozenContainer.vertical[e]
        },
        _isInScrollVisibleArea: function(e) {
            var t = e.closest(".trv-report-page")
              , r = e.position();
            return this._isVisibleVertically(e, t, r) && this._isVisibleHorizontally(e, t, r)
        },
        _isVisibleHorizontally: function(e, t, r) {
            var n = parseFloat(t.css("padding-left"))
              , a = this.$scrollableContainer.scrollLeft()
              , i = this.$scrollableContainer.width()
              , o = e.outerWidth(!0) * this.scaleFactor
              , s = r.left + n;
            return s > a - o && s < a + o + i
        },
        _isVisibleVertically: function(e, t, r) {
            var n = parseFloat(t.css("padding-top"))
              , a = t.position()
              , i = this.$scrollableContainer.scrollTop()
              , o = this.$scrollableContainer.height()
              , s = e.outerHeight(!0) * this.scaleFactor
              , l = r.top + n + a.top;
            return l > i - s && l < i + s + o
        }
    }
      , ke = {};
    function Le(e, t, r) {
        var n = (t = $.extend({}, ke, t, r)).controller;
        if (!n)
            throw "No controller (telerikReportViewer.reportViewerController) has been specified.";
        var a, i, o, s, l, c, p, h, g, m = $(e), v = m.find(".trv-page-container"), E = v[0], b = m.find(".trv-page-wrapper"), P = b[0], T = m.find(".trv-error-message"), S = n.getScaleMode(), _ = n.getScale(), C = .1, I = 8, R = !0, A = !1, w = !1, M = '.trv-page-container {background: #ffffff url("{0}") no-repeat center 50px}', y = "trv-initial-image-styles", N = $.extend({}, De), D = null;
        function k() {
            c && window.clearTimeout(c)
        }
        function L() {
            F(l),
            l = !1
        }
        function x() {
            return -1 !== [ae.FIT_PAGE, ae.FIT_PAGE_WIDTH].indexOf(S)
        }
        function O() {
            for (var e = 0, t = v.find(".trv-report-page"), r = t.length; e < r; e++) {
                var a = parseInt($(t[e]).attr("data-page"));
                Z(t[e], S, _, a)
            }
            n.updatePageDimensionsReady()
        }
        function V({scale: e, scaleMode: t}) {
            _ = e || _,
            S = t || S,
            _ = Math.max(C, Math.min(I, _)),
            O()
        }
        function F(e) {
            v.off("click", "[data-reporting-action]", Q),
            v.off("mouseenter", "[data-reporting-action]", ee),
            v.off("mouseleave", "[data-reporting-action]", re),
            v.off("mouseenter", "[data-tooltip-title],[data-tooltip-text]", oe),
            v.off("mouseleave", "[data-tooltip-title],[data-tooltip-text]", le),
            i = void 0,
            e && b.empty(),
            X()
        }
        function G(e) {
            var t = v.find(".trv-report-page");
            return n.getPageMode() === ne.SINGLE_PAGE ? Array.from(t).find((t => J(t) === e)) : Array.from(t).find((t => parseInt($(t).attr("data-page")) === e))
        }
        function U(e, t) {
            R ? function(e, t) {
                var r = G(e);
                r ? (t && j(t, e),
                N.isEnabled() && !t && N.navigateToElement(r.offsetTop, e)) : (i = t,
                function(e) {
                    Y(!0),
                    window.setTimeout(n.getReportPage.bind(n, e), 1),
                    o = null
                }(e))
            }(e, t) : function(e, t) {
                o = e,
                s = t
            }(e, t)
        }
        function j(e, r) {
            if (e) {
                var n = v.find("[data-" + e.type + "-id=" + e.id + "]")[0];
                if (n) {
                    if (t.enableAccessibility) {
                        var a = K($(n));
                        a && a.focus()
                    }
                    for (var i = v[0], o = 0, s = 0; n && n !== i; ) {
                        if ($(n).is(".trv-page-wrapper")) {
                            var l = $(n).data("pageScale");
                            "number" == typeof l && (o *= l,
                            s *= l)
                        }
                        o += n.offsetTop,
                        s += n.offsetLeft,
                        n = n.offsetParent
                    }
                    N.isEnabled() && r ? N.navigateToElement(o, r) : (i.scrollTop = o,
                    i.scrollLeft = s)
                } else
                    N.isEnabled() && r && N.navigateToElement(m.find('[data-page="' + r + '"]')[0].offsetTop, r)
            }
        }
        function K(e) {
            if (!e || 0 === e.length)
                return null;
            var t = f(e.attr("tabindex"));
            return !isNaN(t) && t > -1 ? e : K(e.next())
        }
        function Y(e) {
            (e ? $.fn.addClass : $.fn.removeClass).call(m, "trv-loading")
        }
        function X(e) {
            T.text(e),
            (e ? $.fn.addClass : $.fn.removeClass).call(m, "trv-error")
        }
        function J(e, t) {
            var r = e.$ ? e : $(e)
              , n = "pageNumber";
            return void 0 === t ? r.data(n) : (r.data(n, t),
            e)
        }
        function Z(e, t, r, n) {
            var a = $(e)
              , i = n ? a : a.find("div.trv-report-page")
              , o = i.find("div.sheet")
              , s = i.find("div.trv-skeleton-wrapper")
              , l = o[0] || s[0]
              , c = s[0];
            if (l) {
                var u, d, f = a.data("box");
                if (!f) {
                    var p = B(a)
                      , h = z(i)
                      , g = H(i);
                    f = {
                        padLeft: p.left + h.left + g.left,
                        padRight: p.right + h.right + g.right,
                        padTop: p.top + h.top + g.top,
                        padBottom: p.bottom + h.bottom + g.bottom
                    },
                    a.data("box", f)
                }
                void 0 === a.data("pageWidth") ? (u = l.offsetWidth,
                d = l.offsetHeight,
                a.data("pageWidth", u),
                a.data("pageHeight", d)) : (u = a.data("pageWidth"),
                d = a.data("pageHeight"));
                var m = d > u && t === ae.FIT_PAGE_WIDTH ? 20 : 0
                  , v = (E.clientWidth - m - f.padLeft - f.padRight) / u
                  , b = (E.clientHeight - 1 - f.padTop - f.padBottom) / d;
                t === ae.FIT_PAGE_WIDTH ? r = v : r && t !== ae.FIT_PAGE || (r = Math.min(v, b)),
                D && D.setScaleFactor(r),
                a.data("pageScale", r),
                i.data("pageScale", r),
                c || W(o, r, r),
                i.css({
                    height: r * d,
                    width: r * u
                })
            }
        }
        function Q(e) {
            var t = ie($(this).attr("data-reporting-action"));
            t && (o = function(e, t) {
                if (N.isEnabled() && ("sorting" === t || "toggleVisibility" === t))
                    return $(e.target).closest(".trv-report-page").attr("data-page") || n.getCurrentPageNumber();
                return n.getCurrentPageNumber()
            }(e, t.Type),
            n.executeReportAction({
                element: e.currentTarget,
                action: t,
                cancel: !1
            })),
            e.stopPropagation()
        }
        function ee(e) {
            var t = ie($(this).attr("data-reporting-action"));
            null !== t && e.currentTarget === this && n.reportActionEnter({
                element: e.currentTarget,
                action: t
            })
        }
        function re(e) {
            var t = ie($(this).attr("data-reporting-action"));
            null !== t && e.currentTarget === this && n.reportActionLeave({
                element: e.currentTarget,
                action: t
            })
        }
        function ie(e) {
            return a ? Array.from(a).find((function(t) {
                return t.Id === e
            }
            )) : null
        }
        function oe(e) {
            var r = $(this)
              , a = r.attr("data-tooltip-title")
              , i = r.attr("data-tooltip-text");
            if (a || i) {
                var o = {
                    element: e.currentTarget,
                    toolTip: {
                        title: a || "",
                        text: i || ""
                    },
                    cancel: !1
                };
                if (n.reportToolTipOpening(o),
                !o.cancel) {
                    var s, l, c, u, d = function(e) {
                        var r = t.templates["trv-pages-area-kendo-tooltip"]
                          , n = $(r)
                          , a = n.find(".trv-pages-area-kendo-tooltip-title")
                          , i = n.find(".trv-pages-area-kendo-tooltip-text");
                        return a.html(se(e.toolTip.title)),
                        i.html(se(e.toolTip.text)),
                        n.clone().wrap("<p>").parent().html()
                    }(o), f = e.currentTarget.viewportElement, p = function(e, t) {
                        var r = e.data("kendoTooltip");
                        if (!r)
                            try {
                                r = e.kendoTooltip({
                                    content: t,
                                    autohide: !0,
                                    callout: !1
                                }).data("kendoTooltip")
                            } catch (e) {
                                throw console.error("Instantiation of Kendo Tooltip threw an exception", e),
                                e
                            }
                        return r
                    }(r, d);
                    p.show(r),
                    f && "svg" === f.nodeName && (s = p,
                    c = (l = e).pageX,
                    u = l.pageY,
                    s.popup.element.closest("[role=region]").css({
                        left: c + 10,
                        top: u + 5
                    }))
                }
            }
        }
        function se(e) {
            return e = (e = (e = d(e)).replaceAll("\r\n", "<br>")).replaceAll("\n", "<br>")
        }
        function le(e) {
            var t = $(this).data("kendoTooltip");
            t && t.hide()
        }
        function ce() {
            $("#" + y).remove()
        }
        (p = m).attr("aria-label", q[p.attr("aria-label")]),
        N && N.init(e, t),
        $(window).on("resize", (function(e, t) {
            x() && O()
        }
        )),
        Ne(m, {
            swipe: function(e) {
                var t = n.getCurrentPageNumber();
                h && "left" === e.direction ? t < n.getPageCount() && n.navigateToPage(t + 1) : g && "right" === e.direction && t > 1 && n.navigateToPage(t - 1)
            },
            pinch: function(e) {
                var t = G(n.getCurrentPageNumber());
                V({
                    scale: ($(t).data("pageScale") || _) * (e.distance / e.lastDistance),
                    scaleMode: ae.SPECIFIC
                })
            },
            doubletap: function(e) {
                t.commands.toggleZoomMode.exec()
            },
            touchstart: function(e) {
                var t = P;
                g = 0 === t.scrollLeft,
                h = t.scrollWidth - t.offsetWidth === t.scrollLeft
            }
        }),
        n.pageModeChanged((function() {
            n.getPageMode() === ne.CONTINUOUS_SCROLL ? N.enable() : N.disable(),
            n.refreshReport(!0)
        }
        )).reportSourceChanged((function() {
            l = !0,
            o = null,
            s = null,
            R = !1
        }
        )).beforeLoadParameters((function(e, t) {
            t && (k(),
            X(q.loadingParameters))
        }
        )).beforeLoadReport((function() {
            R = !1,
            o || (o = 1),
            k(),
            F(),
            Y(!0),
            n.isReportAutoRun() && X(q.loadingReport)
        }
        )).beginLoadReport((function(e, t) {
            var r;
            R = !0,
            (r = G(o)) && J(r, -1)
        }
        )).reportLoadProgress((function(e, t) {
            var r, n;
            r = o,
            n = t.pageCount,
            r && r <= n && U(r, s),
            X(u(q.loadingReportPagesInProgress, [t.pageCount]))
        }
        )).reportLoadComplete((function(e, t) {
            var r, a;
            0 === t.pageCount ? (L(),
            X(q.noPageToDisplay)) : (r = o,
            a = t.pageCount,
            r && U(r = Math.min(r, a), s),
            X(u(q.loadedReportPagesComplete, [t.pageCount])),
            c = window.setTimeout(X, 2e3),
            v.on("click", "[data-reporting-action]", Q),
            v.on("mouseenter", "[data-reporting-action]", ee),
            v.on("mouseleave", "[data-reporting-action]", re),
            v.on("mouseenter", "[data-tooltip-title],[data-tooltip-text]", oe),
            v.on("mouseleave", "[data-tooltip-title],[data-tooltip-text]", le)),
            t.containsFrozenContent && !D && (D = $.extend({}, $e),
            n.getViewMode() === te.INTERACTIVE && D.init(m))
        }
        )).navigateToPage((function(e, t, r) {
            U(t, r)
        }
        )).pageReady((function(e, t) {
            n.getPageMode() === ne.SINGLE_PAGE ? (N.isEnabled() && N.disable(),
            function(e) {
                a = JSON.parse(e.pageActions),
                function(e) {
                    var t = "trv-" + n.clientId() + "-styles";
                    $("#" + t).remove();
                    var r = $("<style id=" + t + "></style>");
                    r.append(e.pageStyles),
                    r.appendTo("head")
                }(e);
                var t = e.pageNumber
                  , r = $($.parseHTML(e.pageContent))
                  , o = r.find("div.sheet")
                  , s = $('<div class="trv-report-page" data-page="' + t + '"></div>');
                o.css("margin", 0),
                s.append(o).append($('<div class="trv-page-overlay"></div>'));
                var l = b.empty().removeData().data("pageNumber", t).append(s);
                n.setCurrentPageNumber(t),
                n.getViewMode() === te.INTERACTIVE ? (m.removeClass("printpreview"),
                m.addClass("interactive")) : (m.removeClass("interactive"),
                m.addClass("printpreview"));
                Z(l, S, _),
                v.scrollTop(0),
                v.scrollLeft(0),
                j(i)
            }(t)) : N.renderPage(t),
            w || (w = !0),
            A && ce(),
            n.getViewMode() === te.INTERACTIVE && D && D.init(m),
            Y(!1)
        }
        )).error((function(e, t) {
            Y(!1),
            L(),
            X(t)
        }
        )).showNotification((function(e, t) {
            X(q[t.stringResources])
        }
        )).hideNotification((function(e, t) {
            X()
        }
        )).scaleChanged((function(e, t) {
            V({
                scale: t,
                scaleMode: n.getScaleMode()
            })
        }
        )).scaleModeChanged((function(e, t) {
            V({
                scale: n.getScale(),
                scaleMode: t
            })
        }
        )).serverActionStarted((function() {
            Y(!0),
            X(q.loadingReport)
        }
        )).scrollPageReady((function(e, t) {
            !function(e) {
                var t = JSON.parse(e.page.pageActions);
                a = a ? a.concat(t) : t;
                n.getViewMode() === te.INTERACTIVE ? (m.removeClass("printpreview"),
                m.addClass("interactive")) : (m.removeClass("interactive"),
                m.addClass("printpreview"));
                Z(e.target, S, _, e.page.pageNumber)
            }(t)
        }
        )).missingOrInvalidParameters((function(e, r) {
            var n;
            t.initialPageAreaImageUrl && !w && (L(),
            n = $("<style id=" + y + "></style>"),
            ce(),
            n.append(u(M, [t.initialPageAreaImageUrl])),
            n.appendTo("head"),
            A = !0)
        }
        )).renderingStopped((function() {
            F(!0),
            X(q.renderingCanceled)
        }
        )),
        n.setDocumentMapVisible((function() {
            x() && setTimeout((function() {
                O()
            }
            ))
        }
        )).setParametersAreaVisible((function() {
            x() && setTimeout((function() {
                O()
            }
            ))
        }
        ))
    }
    var xe, Oe = {
        MultiSelect: function(e, t) {
            return Boolean(e.availableValues) && e.multivalue && (!t || !t.multiSelect || t.multiSelect !== oe.COMBO_BOX)
        },
        MultiSelectCombo: function(e, t) {
            return Boolean(e.availableValues) && e.multivalue && t && t.multiSelect && t.multiSelect === oe.COMBO_BOX
        },
        SingleSelect: function(e, t) {
            return Boolean(e.availableValues) && !e.multivalue && (!t || !t.singleSelect || t.singleSelect !== oe.COMBO_BOX)
        },
        SingleSelectCombo: function(e, t) {
            return Boolean(e.availableValues) && !e.multivalue && t && t.singleSelect && t.singleSelect === oe.COMBO_BOX
        },
        MultiValue: function(e) {
            return Boolean(e.multivalue)
        },
        DateTime: function(e) {
            return e.type === ie.DATETIME
        },
        String: function(e) {
            return e.type === ie.STRING
        },
        Number: function(e) {
            switch (e.type) {
            case ie.INTEGER:
            case ie.FLOAT:
                return !0;
            default:
                return !1
            }
        },
        Boolean: function(e) {
            return e.type === ie.BOOLEAN
        },
        Default: function(e) {
            return !0
        }
    }, Ve = {
        formatValue: function(e) {
            var t = "";
            return e && [].concat(e).forEach((function(e) {
                t.length > 0 && (t += "\n"),
                t += e
            }
            )),
            t
        },
        parseValues: function(e) {
            return ("" + e).split("\n")
        }
    };
    function Fe(e) {
        function t(t) {
            return !!n(t.keyCode) || (r = $(e).val() + String.fromCharCode(t.charCode),
            /^(\-|\+)?([0-9]*)$/.test(r));
            var r
        }
        function r(e) {}
        return $(e).on("keypress", t).on("paste", r),
        {
            dispose: function() {
                !function(e) {
                    $(e).off("keypress", t).off("paste", r)
                }(e)
            }
        }
    }
    function Ge(e) {
        function t(t) {
            return !!n(t.keyCode) || (r = $(e).val() + String.fromCharCode(t.charCode),
            /^(\-|\+)?([0-9]*(\.[0-9]*)?)$/.test(r));
            var r
        }
        function r(e) {}
        return $(e).on("keypress", t).on("paste", r),
        {
            dispose: function() {
                !function(e) {
                    $(e).off("keypress", t).off("paste", r)
                }(e)
            }
        }
    }
    function Ue(e, t, r) {
        (e ? $.fn.addClass : $.fn.removeClass).call(r, t)
    }
    function Be(e, t) {
        Ue(!t, "k-disabled", e)
    }
    function He(e, t, r, n, a) {
        n || (n = "");
        var i = u("{0}. {1} {2}. {3}", [r, t, q.ariaLabelParameter, n]);
        e.attr("aria-label", i),
        je(e, a)
    }
    var ze = 0;
    function We(e) {
        if (!xe) {
            var t = $("div.trv-parameters-area-content");
            if (t.length > 0) {
                var r = t.attr("tabIndex");
                r && (xe = f(r))
            }
            xe && !isNaN(xe) || (xe = 300)
        }
        var n = e.closest(".trv-parameter-value")
          , a = n.find(".trv-select-all")
          , i = n.find(".trv-select-none")
          , o = e.closest(".k-widget").find(".k-input")
          , s = o && o.length;
        a && a.length && a.attr("tabindex", xe + ++ze),
        i && i.length && i.attr("tabindex", xe + ++ze),
        s ? o.attr("tabindex", xe + ++ze) : e.attr("tabindex", xe + ++ze)
    }
    function je(e, t) {
        var r = u(" {0}:", [q.ariaLabelErrorMessage])
          , n = e.attr("aria-label");
        if (n) {
            var a = n.indexOf(r);
            a > -1 && (n = n.substring(0, a)),
            t && "" !== t ? (e.attr("aria-required", !0),
            e.attr("aria-invalid", !0),
            n += r + t) : e.removeAttr("aria-invalid"),
            e.attr("aria-label", n)
        }
    }
    function Ke(e) {
        return kendo.version >= "2017.3.1018" || e
    }
    var Ye = [{
        match: Oe.MultiSelect,
        createEditor: function(e, t) {
            var r = $(e)
              , n = !0;
            r.html(t.templates["trv-parameter-editor-available-values-multiselect"]);
            var a, i, o, s, l = r.find(".trv-list"), c = r.find(".trv-select-all"), d = r.find(".trv-select-none"), f = t.parameterChanged;
            function p(e) {
                s && (function(e) {
                    var t = l.find(".trv-listviewitem");
                    Array.from(t).forEach((t => {
                        var r = $(t)
                          , n = e.filter(r).length > 0;
                        r.attr("aria-selected", n)
                    }
                    ))
                }(e),
                function(e) {
                    var t = i.availableValues
                      , r = $.map(e, (function(e) {
                        return t[$(e).index()].value
                    }
                    ));
                    g();
                    var n = !i.autoRefresh && !i.childParameters;
                    o = window.setTimeout((function() {
                        b(i.value, r) || f(i, r),
                        o = null
                    }
                    ), n ? 0 : 1e3)
                }(e))
            }
            function g() {
                o && window.clearTimeout(o)
            }
            function m() {
                return $(a.element).find(".k-selected")
            }
            function E(e) {
                if (n) {
                    var t = $(e.target)
                      , r = a.select();
                    t.hasClass("k-selected") ? r.splice($.inArray(t[0], r), 1) : r.push(t),
                    a.clearSelection(),
                    a.select(r),
                    a.trigger("change")
                }
            }
            function P(e) {
                p(m())
            }
            function T(e) {
                if (n && 32 === e.which) {
                    var t = a.element.find(".k-focus");
                    t.length > 0 && (t.toggleClass("k-selected"),
                    p(m()),
                    e.preventDefault())
                }
            }
            function S(e) {
                !function(e) {
                    Array.isArray(e) || (e = [e]);
                    var t = l.find(".trv-listviewitem");
                    $.each(i.availableValues, ( (r, n) => {
                        var a, i, o = !1;
                        $.each(e, ( (e, t) => {
                            var r = n.value;
                            return t instanceof Date && (r = h(n.value)),
                            !(o = v(t, r))
                        }
                        )),
                        a = $(t[r]),
                        Ue(i = o, "k-selected", a),
                        a.attr("aria-selected", i)
                    }
                    ))
                }(e),
                p(m())
            }
            return c.text(q[c.text()]),
            c.click((function(e) {
                e.preventDefault(),
                n && S(i.availableValues.map((function(e) {
                    return e.value
                }
                )))
            }
            )),
            d.text(q[d.text()]),
            d.click((function(e) {
                e.preventDefault(),
                n && S([])
            }
            )),
            {
                beginEdit: function(e) {
                    s = !1,
                    a && (a.element.off("touch click", ".trv-listviewitem", E),
                    a.element.off("keydown", T)),
                    i = e;
                    try {
                        a = l.kendoListView({
                            template: kendo.template('<div class="trv-listviewitem" style="cursor: pointer">${name}</div>'),
                            dataSource: {
                                data: i.availableValues
                            },
                            selectable: "MULTIPLE",
                            navigatable: Ke(t.enableAccessibility),
                            change: P
                        }).data("kendoListView")
                    } catch (e) {
                        throw console.error("Instantiation of Kendo ListView as MultiSelect parameter editor threw an exception", e),
                        e
                    }
                    We(l),
                    S(i.value),
                    a.element.off().on("touch click", ".trv-listviewitem", E),
                    a.element.on("keydown", T),
                    s = !0
                },
                enable: function(e) {
                    Be(l, n = e)
                },
                clearPendingChange: g,
                addAccessibility: function(e) {
                    var t = u(q.ariaLabelParameterInfo, [e.availableValues.length]);
                    He(l, q.ariaLabelMultiSelect, e.text, t, e.Error),
                    l.attr("aria-multiselectable", "true");
                    var r = l.find(".trv-listviewitem");
                    Array.from(r).forEach((e => {
                        $(e).attr("aria-label", e.innerText)
                    }
                    ))
                },
                setAccessibilityErrorState: function(e) {
                    je(l, e.Error)
                },
                destroy: function() {
                    a.destroy()
                }
            }
        }
    }, {
        match: Oe.MultiSelectCombo,
        createEditor: function(e, t) {
            var r, n, a, i, o, s, l = $(e), c = !0, d = t.parameterChanged, f = !0;
            function p(e) {
                !function(e) {
                    h();
                    var t = !s.autoRefresh && !s.childParameters;
                    o = window.setTimeout((function() {
                        b(s.value, e) || d(s, e),
                        o = null
                    }
                    ), t ? 0 : 1e3)
                }(e)
            }
            function h() {
                o && window.clearTimeout(o)
            }
            function g() {
                f && p(i.value())
            }
            return l.html(t.templates["trv-parameter-editor-available-values-multiselect-combo"]),
            r = l.find(".trv-combo"),
            (n = l.find(".trv-select-none")) && (n.text(q[n.text()]),
            n.click((function(e) {
                e.preventDefault(),
                i.value([]),
                i.trigger("change")
            }
            ))),
            (a = l.find(".trv-select-all")) && (a.text(q[a.text()]),
            a.click((function(e) {
                if (e.preventDefault(),
                c) {
                    var t = $.map(s.availableValues, (function(e) {
                        return e.value
                    }
                    ));
                    i.value(t),
                    i.trigger("change")
                }
            }
            ))),
            {
                beginEdit: function(e) {
                    i && i.unbind("change", g),
                    s = e;
                    try {
                        i = r.kendoMultiSelect({
                            itemTemplate: '<div class="trv-editoritem">${name}</div>',
                            dataSource: s.availableValues,
                            dataTextField: "name",
                            dataValueField: "value",
                            value: s.value,
                            filter: "contains",
                            autoClose: !1,
                            open: function() {
                                f = !1
                            },
                            close: function(e) {
                                f = !0,
                                g()
                            },
                            autoWidth: !0,
                            clearButton: !1
                        }).data("kendoMultiSelect")
                    } catch (e) {
                        throw console.error("Instantiation of Kendo MultiSelect as MultiSelectCombo parameter editor threw an exception", e),
                        e
                    }
                    We(r),
                    i.bind("change", g)
                },
                enable: function(e) {
                    c = e,
                    i.enable(e)
                },
                clearPendingChange: h,
                addAccessibility: function(e) {
                    var t = i.input
                      , r = u(q.ariaLabelParameterInfo, [e.availableValues.length]);
                    He(t, q.ariaLabelMultiSelect, e.text, r, e.Error);
                    var n = i.items();
                    Array.from(n).forEach((e => {
                        $(e).attr("aria-label", e.innerText)
                    }
                    ))
                },
                setAccessibilityErrorState: function(e) {
                    je(r, e.Error)
                },
                destroy: function() {
                    i.destroy()
                }
            }
        }
    }, {
        match: Oe.SingleSelect,
        createEditor: function(e, t) {
            var r = $(e)
              , n = !0;
            r.html(t.templates["trv-parameter-editor-available-values"]);
            var a, i, o = r.find(".trv-list"), s = r.find(".trv-select-none"), l = t.parameterChanged;
            function c(e) {
                !function(e) {
                    var t = i.availableValues
                      , r = $.map(e, (function(e) {
                        return t[$(e).index()].value
                    }
                    ));
                    Array.isArray(r) && (r = r[0]);
                    l(i, r)
                }(e)
            }
            function d() {
                c(a.select())
            }
            function f() {
                var e, t;
                We(o),
                e = i.value,
                t = o.find(".trv-listviewitem"),
                $.each(i.availableValues, ( (r, n) => {
                    var i = n.value;
                    return e instanceof Date && (i = h(n.value)),
                    !v(e, i) || (a.select(t[r]),
                    !1)
                }
                )),
                a.bind("change", d)
            }
            return s && (s.text(q[s.text()]),
            s.click((function(e) {
                e.preventDefault(),
                a.clearSelection(),
                a.trigger("change")
            }
            ))),
            {
                beginEdit: function(e) {
                    a && a.unbind("change", d),
                    i = e;
                    try {
                        a = o.kendoListView({
                            template: '<div class="trv-listviewitem">${name}</div>',
                            dataSource: {
                                data: i.availableValues
                            },
                            selectable: !0,
                            navigatable: Ke(t.enableAccessibility)
                        }).data("kendoListView")
                    } catch (e) {
                        throw console.error("Instantiation of Kendo ListView as SingleSelect parameter editor threw an exception", e),
                        e
                    }
                    f()
                },
                enable: function(e) {
                    Be(o, n = e),
                    n ? (a.bind("change", d),
                    o.addClass("k-selectable")) : (a.unbind("change", d),
                    o.removeClass("k-selectable"))
                },
                addAccessibility: function(e) {
                    var t = u(q.ariaLabelParameterInfo, [e.availableValues.length]);
                    He(o, q.ariaLabelSingleValue, e.text, t, e.Error);
                    var r = o.find(".trv-listviewitem");
                    Array.from(r).forEach((e => {
                        $(e).attr("aria-label", e.innerText)
                    }
                    ))
                },
                setAccessibilityErrorState: function(e) {
                    je(o, e.Error)
                },
                destroy: function() {
                    a.destroy()
                }
            }
        }
    }, {
        match: Oe.SingleSelectCombo,
        createEditor: function(e, t) {
            var r, n, a, i, o = $(e), s = t.parameterChanged;
            function l(e, t) {
                !function(e, t) {
                    var r = t || "";
                    !t && e >= 0 && (r = i.availableValues[e].value);
                    s(i, r)
                }(e, t)
            }
            function c(e) {
                l(a.select(), this.value())
            }
            return o.html(t.templates["trv-parameter-editor-available-values-combo"]),
            r = o.find(".trv-combo"),
            (n = o.find(".trv-select-none")) && (n.text(q[n.text()]),
            n.click((function(e) {
                e.preventDefault(),
                a.value(""),
                a.trigger("change")
            }
            ))),
            {
                beginEdit: function(e) {
                    a && a.unbind("change", c),
                    i = e;
                    try {
                        a = r.kendoComboBox({
                            template: '<div class="trv-editoritem">${name}</div>',
                            dataSource: i.availableValues,
                            dataTextField: "name",
                            dataValueField: "value",
                            value: i.value,
                            filter: "contains",
                            suggest: !0,
                            clearButton: !1
                        }).data("kendoComboBox")
                    } catch (e) {
                        throw console.error("Instantiation of Kendo ComboBox as SingleSelectCombo parameter editor threw an exception", e),
                        e
                    }
                    We(r),
                    a.bind("change", c)
                },
                enable: function(e) {
                    a.enable(e)
                },
                addAccessibility: function(e) {
                    var t = a.input
                      , r = u(q.ariaLabelParameterInfo, [e.availableValues.length]);
                    He(t, q.ariaLabelSingleValue, e.text, r, e.Error);
                    var n = a.items();
                    Array.from(n).forEach((e => {
                        $(e).attr("aria-label", e.innerText)
                    }
                    ))
                },
                setAccessibilityErrorState: function(e) {
                    je(r, e.Error)
                },
                destroy: function() {
                    a.destroy()
                }
            }
        }
    }, {
        match: Oe.MultiValue,
        createEditor: function(e, t) {
            var r, n = $(e);
            n.html(t.templates["trv-parameter-editor-multivalue"]);
            var a = n.find("textarea").on("change", (function() {
                t.parameterChanged && t.parameterChanged(r, Ve.parseValues(this.value))
            }
            ));
            return {
                beginEdit: function(e) {
                    var t;
                    r = e,
                    t = e.value,
                    r.value = t,
                    a.val(Ve.formatValue(t)),
                    We(a)
                },
                enable: function(e) {
                    Be(a, e),
                    a.prop("disabled", !e)
                },
                addAccessibility: function(e) {
                    He(a, q.ariaLabelMultiValue, e.text, null, e.Error)
                },
                setAccessibilityErrorState: function(e) {
                    je(a, e.Error)
                }
            }
        }
    }, {
        match: Oe.DateTime,
        createEditor: function(e, t) {
            var r, n = $(e);
            n.html(t.templates["trv-parameter-editor-datetime"]);
            try {
                var a = n.find("input[type=datetime]").kendoDatePicker({
                    change: function() {
                        var e = t.parameterChanged;
                        if (e) {
                            var n = this.value();
                            null !== n && (n = g(n)),
                            e(r, n)
                        }
                    }
                })
                  , i = a.data("kendoDatePicker")
            } catch (e) {
                throw console.error("Instantiation of Kendo DatePicker as DateTime parameter editor threw an exception", e),
                e
            }
            return {
                beginEdit: function(e) {
                    r = e,
                    function(e) {
                        r.value = e;
                        var t = null;
                        try {
                            e && (t = m(e))
                        } catch (e) {
                            t = null
                        }
                        i.value(t)
                    }(e.value),
                    We(a)
                },
                enable: function(e) {
                    i.enable(e),
                    Be(a, e)
                },
                addAccessibility: function(e) {
                    He(a, q.ariaLabelParameterDateTime, e.text, null, e.Error),
                    a.attr("aria-live", "assertive")
                },
                setAccessibilityErrorState: function(e) {
                    je(a, e.Error)
                },
                destroy: function() {
                    i.destroy()
                }
            }
        }
    }, {
        match: Oe.String,
        createEditor: function(e, t) {
            var r, n = $(e);
            n.html(t.templates["trv-parameter-editor-text"]);
            var a = n.find('input[type="text"]').change((function() {
                t.parameterChanged && t.parameterChanged(r, a.val())
            }
            ));
            return {
                beginEdit: function(e) {
                    var t;
                    r = e,
                    t = e.value,
                    r.value = t,
                    a.val(t),
                    We(a)
                },
                enable: function(e) {
                    a.prop("disabled", !e),
                    Be(a, e)
                },
                addAccessibility: function(e) {
                    He(a, q.ariaLabelParameterString, e.text, null, e.Error),
                    a.attr("aria-live", "assertive")
                },
                setAccessibilityErrorState: function(e) {
                    je(a, e.Error)
                }
            }
        }
    }, {
        match: Oe.Number,
        createEditor: function(e, t) {
            var r, n, a = $(e);
            a.html(t.templates["trv-parameter-editor-number"]);
            var i = a.find("input[type=number]").on("change", (function() {
                t.parameterChanged && t.parameterChanged(r, i.val())
            }
            ));
            return {
                beginEdit: function(e) {
                    n && n.dispose(),
                    r = e,
                    i.val(r.value),
                    n = r.type === ie.INTEGER ? Fe(i) : Ge(i),
                    We(i)
                },
                enable: function(e) {
                    i.prop("disabled", !e),
                    Be(i, e)
                },
                addAccessibility: function(e) {
                    He(i, q.ariaLabelParameterNumerical, e.text, null, e.Error),
                    i.attr("aria-live", "assertive")
                },
                setAccessibilityErrorState: function(e) {
                    je(i, e.Error)
                }
            }
        }
    }, {
        match: Oe.Boolean,
        createEditor: function(e, t) {
            var r, n = $(e);
            n.html(t.templates["trv-parameter-editor-boolean"]);
            var a = n.find("input[type=checkbox]").on("change", (function() {
                t.parameterChanged && t.parameterChanged(r, this.checked)
            }
            ));
            return {
                beginEdit: function(e) {
                    var t;
                    r = e,
                    t = e.value,
                    r.value = t,
                    a[0].checked = !0 === t,
                    We(a)
                },
                enable: function(e) {
                    Be(a, e),
                    a.attr("disabled", !e)
                },
                addAccessibility: function(e) {
                    He(a, q.ariaLabelParameterBoolean, e.text, null, e.Error),
                    a.attr("aria-live", "assertive")
                },
                setAccessibilityErrorState: function(e) {
                    je(a, e.Error)
                }
            }
        }
    }, {
        match: Oe.Default,
        createEditor: function(e, t) {
            var r = $(e);
            return r.html('<div class="trv-parameter-editor-generic"></div>'),
            {
                beginEdit: function(e) {
                    r.find(".trv-parameter-editor-generic").text(e.Error ? "(error)" : e.value)
                },
                enable: function(e) {}
            }
        }
    }];
    function Xe(e, t) {
        var r, n = !!e.querySelectorAll && e.querySelectorAll(".trv-menu-small")[0], a = {
            small: {
                documentMapVisible: !1,
                parametersAreaVisible: !1,
                onDocumentMapVisibleChanged: function(e, r) {
                    r.visible && t.setParametersAreaVisible({
                        visible: !1
                    })
                },
                onParameterAreaVisibleChanged: function(e, r) {
                    r.visible && t.setDocumentMapVisible({
                        visible: !1
                    })
                },
                onBeforeLoadReport: function() {
                    t.setParametersAreaVisible({
                        visible: !1
                    }),
                    t.setDocumentMapVisible({
                        visible: !1
                    })
                },
                onNavigateToPage: function() {
                    t.setParametersAreaVisible({
                        visible: !1
                    }),
                    t.setDocumentMapVisible({
                        visible: !1
                    })
                }
            },
            large: {
                documentMapVisible: !0,
                parametersAreaVisible: !0
            }
        };
        function i(e) {
            var t, n = h();
            if (n !== r) {
                var i = a[r]
                  , o = a[n];
                r = n,
                e && e.call(void 0, i, o),
                m((t = o).documentMapVisible),
                v(t.parametersAreaVisible)
            }
        }
        function o(e, t) {
            p("onDocumentMapVisibleChanged", arguments)
        }
        function s(e, t) {
            p("onParameterAreaVisibleChanged", arguments)
        }
        function l() {
            p("onBeforeLoadReport", arguments)
        }
        function c() {
            p("onNavigateToPage", arguments)
        }
        function u() {
            p("onReportLoadComplete", arguments)
        }
        function d() {
            i((function(e, t) {
                g(e)
            }
            ))
        }
        function f() {
            i(null)
        }
        function p(e, t) {
            var n = a[r]
              , i = n[e];
            "function" == typeof i && i.apply(n, t)
        }
        function h() {
            var e = $(window).width() / parseFloat($("body").css("font-size"));
            return n && e <= 40.5 ? "small" : "large"
        }
        function g(e) {
            e.documentMapVisible = m(),
            e.parametersAreaVisible = v()
        }
        function m() {
            if (0 === arguments.length) {
                var e = {};
                return t.getDocumentMapState(e),
                e.visible
            }
            return t.setDocumentMapVisible({
                visible: Boolean(arguments[0])
            }),
            this
        }
        function v() {
            if (0 === arguments.length) {
                var e = {};
                return t.getParametersAreaState(e),
                e.visible
            }
            return t.setParametersAreaVisible({
                visible: Boolean(arguments[0])
            }),
            this
        }
        return r = h(),
        g(a.large),
        {
            attach: function() {
                window.addEventListener("resize", d),
                t.setDocumentMapVisible(o),
                t.setParametersAreaVisible(s),
                t.beforeLoadReport(l),
                t.navigateToPage(c),
                t.reportLoadComplete(u),
                t.cssLoaded(f)
            },
            dispose: function() {
                window.removeEventListener("resize", d)
            }
        }
    }
    var qe = Object.defineProperty
      , Je = Object.getOwnPropertySymbols
      , Ze = Object.prototype.hasOwnProperty
      , Qe = Object.prototype.propertyIsEnumerable
      , et = (e, t, r) => t in e ? qe(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[t] = r
      , tt = (e, t) => {
        for (var r in t || (t = {}))
            Ze.call(t, r) && et(e, r, t[r]);
        if (Je)
            for (var r of Je(t))
                Qe.call(t, r) && et(e, r, t[r]);
        return e
    }
      , rt = "application/json; charset=UTF-8"
      , nt = "application/x-www-form-urlencoded; charset=UTF-8"
      , at = "GET"
      , it = "POST"
      , ot = "DELETE"
      , st = {};
    function lt(e) {
        const t = {
            Accept: "application/json, text/javascript, */*; q=0.01"
        };
        return e && (t.Authorization = "Bearer " + e),
        t
    }
    function ct(e) {
        var t, r = c((e = $.extend({}, st, e)).serviceUrl || e.baseUrl, "\\/"), n = V;
        function a(e) {
            if (!e)
                throw "Invalid clientID"
        }
        function i() {
            if (!t) {
                var r = e.loginInfo;
                if (r && r.url && (r.username || r.password)) {
                    const e = r.url;
                    t = n(e, {
                        method: it,
                        data: {
                            grant_type: "password",
                            username: r.username,
                            password: r.password
                        },
                        dataType: "json",
                        contentType: nt
                    }).then((function(e) {
                        return e.access_token
                    }
                    ))
                } else
                    t = Promise.resolve()
            }
            return t
        }
        return {
            _urlFromTemplate: function(e, t) {
                return u(e, t = $.extend({}, {
                    baseUrl: r
                }, t))
            },
            registerClient: function(e) {
                const t = `${r}/clients`;
                return i().then((function(r) {
                    return n(t, tt({
                        headers: lt(r),
                        method: it,
                        dataType: "json",
                        data: JSON.stringify({
                            timeStamp: Date.now()
                        })
                    }, e))
                }
                )).then((function(e) {
                    if (e.Message)
                        throw e.Message;
                    return e.clientId
                }
                ))
            },
            unregisterClient: function(e, t) {
                a(e);
                const o = `${r}/clients/${e}`;
                return i().then((function(e) {
                    return n(o, tt({
                        headers: lt(e),
                        method: ot
                    }, t))
                }
                ))
            },
            getParameters: function(e, t, o, s) {
                a(e);
                const l = `${r}/clients/${e}/parameters`;
                return i().then((function(e) {
                    return n(l, tt({
                        headers: lt(e),
                        method: it,
                        contentType: rt,
                        dataType: "json",
                        data: JSON.stringify({
                            report: t,
                            parameterValues: o
                        })
                    }, s))
                }
                ))
            },
            createReportInstance: function(e, t, o, s) {
                a(e);
                const l = `${r}/clients/${e}/instances`;
                return i().then((function(e) {
                    return n(l, tt({
                        headers: lt(e),
                        method: it,
                        contentType: rt,
                        dataType: "json",
                        data: JSON.stringify({
                            report: t,
                            parameterValues: o
                        })
                    }, s))
                }
                )).then((function(e) {
                    return e.instanceId
                }
                ))
            },
            deleteReportInstance: function(e, t, o) {
                a(e);
                const s = `${r}/clients/${e}/instances/${t}`;
                return i().then((function(e) {
                    return n(s, tt({
                        headers: lt(e),
                        method: ot
                    }, o))
                }
                ))
            },
            createReportDocument: function(e, t, o, s, l, c, u, d) {
                a(e);
                const f = `${r}/clients/${e}/instances/${t}/documents`;
                return i().then((function(e) {
                    return (s = s || {}).BasePath = r,
                    n(f, tt({
                        headers: lt(e),
                        method: it,
                        contentType: rt,
                        dataType: "json",
                        data: JSON.stringify({
                            format: o,
                            deviceInfo: s,
                            useCache: l,
                            baseDocumentID: c,
                            actionID: u
                        })
                    }, d))
                }
                )).then((function(e) {
                    return e.documentId
                }
                ))
            },
            sendDocument: function(e, t, o, s, l) {
                a(e);
                const c = `${r}/clients/${e}/instances/${t}/documents/${o}/send`;
                return i().then((function(e) {
                    return n(c, tt({
                        headers: lt(e),
                        method: it,
                        contentType: rt,
                        data: JSON.stringify({
                            from: s.from,
                            to: s.to,
                            cc: s.cc,
                            subject: s.subject,
                            body: s.body
                        })
                    }, l))
                }
                ))
            },
            deleteReportDocument: function(e, t, o, s) {
                a(e);
                const l = `${r}/clients/${e}/instances/${t}/documents/${o}`;
                return i().then((function(e) {
                    return n(l, tt({
                        headers: lt(e),
                        method: ot
                    }, s))
                }
                ))
            },
            getDocumentInfo: function(e, t, o, s) {
                a(e);
                const l = `${r}/clients/${e}/instances/${t}/documents/${o}/info`;
                return i().then((function(e) {
                    return n(l, tt({
                        headers: lt(e),
                        method: at,
                        dataType: "json"
                    }, s))
                }
                ))
            },
            getPage: function(e, t, o, s, l) {
                a(e);
                const c = `${r}/clients/${e}/instances/${t}/documents/${o}/pages/${s}`;
                return i().then((function(e) {
                    return n(c, tt({
                        headers: lt(e),
                        method: at,
                        dataType: "json"
                    }, l))
                }
                ))
            },
            get: function(e) {
                return n(e, {
                    method: at
                })
            },
            formatDocumentUrl: function(e, t, n, a) {
                var i = `${r}/clients/${e}/instances/${t}/documents/${n}`;
                return a && (i += "?" + a),
                i
            },
            getDocumentFormats: function(e) {
                const t = `${r}/formats`;
                return i().then((function(r) {
                    return n(t, tt({
                        headers: lt(r),
                        method: at,
                        dataType: "json"
                    }, e))
                }
                ))
            },
            getServiceVersion: function(e) {
                const t = `${r}/version`;
                return i().then((function(r) {
                    return n(t, tt({
                        headers: lt(r),
                        method: at,
                        dataType: "json"
                    }, e))
                }
                ))
            },
            getResource: function(e, t, o, s, l) {
                a(e);
                const c = `${r}/clients/${e}/instances/${t}/documents/${o}/resources/${s}`;
                return i().then((function(e) {
                    return n(c, tt({
                        headers: lt(e),
                        method: at,
                        dataType: (null == l ? void 0 : l.dataType) || "json"
                    }, l))
                }
                ))
            },
            getSearchResults: function(e, t, o, s, l, c, u, d) {
                a(e);
                const f = `${r}/clients/${e}/instances/${t}/documents/${o}/search`;
                return i().then((function(e) {
                    return n(f, tt({
                        headers: lt(e),
                        method: it,
                        contentType: rt,
                        dataType: "json",
                        data: JSON.stringify({
                            searchToken: s,
                            matchCase: l,
                            matchWholeWord: c,
                            useRegularExpressions: u
                        })
                    }, d))
                }
                ))
            },
            setAccessToken: function(e) {
                t = Promise.resolve(e)
            },
            login: i,
            keepClientAlive: function(e, t) {
                const a = `${r}/clients/keepAlive/${e}`;
                return i().then((function(e) {
                    return n(a, tt({
                        headers: lt(e),
                        method: it
                    }, t))
                }
                ))
            },
            getClientsSessionTimeoutSeconds: function(e) {
                const t = `${r}/clients/sessionTimeout`;
                return i().then((function(r) {
                    return n(t, tt({
                        headers: lt(r),
                        method: at
                    }, e))
                }
                )).then((function(e) {
                    return e.clientSessionTimeout
                }
                ))
            }
        }
    }
    function ut(e) {
        var t = {
            ExportInProgress: 1,
            PrintInProgress: 2,
            RenderInProgress: 4
        };
        function r(e) {
            return !!(s & e)
        }
        function n(e, t) {
            t ? s |= e : s &= ~e
        }
        var a, i = e.controller, o = e.history, s = 0, l = e.commands;
        if (!i)
            throw "No controller (telerikReporting.ReportViewerController) has been specified.";
        function c() {
            a || (a = !0,
            window.setTimeout((function() {
                try {
                    e = i.getReportSource(),
                    n = i.getPageCount(),
                    s = i.getCurrentPageNumber(),
                    c = e && e.report,
                    d = (u = c && n > 0) && s < n,
                    f = u && s > 1,
                    p = u && s,
                    T = {},
                    i.getDocumentMapState(T),
                    h = T,
                    g = function() {
                        var e = {};
                        return i.getParametersAreaState(e),
                        e
                    }(),
                    m = function() {
                        var e = {};
                        return i.getSearchDialogState(e),
                        e
                    }(),
                    v = function() {
                        var e = {};
                        return i.getSendEmailDialogState(e),
                        e
                    }(),
                    E = r(t.RenderInProgress),
                    b = r(t.PrintInProgress),
                    P = r(t.ExportInProgress),
                    l.goToFirstPage.enabled(f),
                    l.goToPrevPage.enabled(f),
                    l.stopRendering.enabled(c && E),
                    l.goToLastPage.enabled(d),
                    l.goToNextPage.enabled(d),
                    l.goToPage.enabled(u),
                    l.print.enabled(u && !E && !b),
                    l.export.enabled(u && !E && !P),
                    l.refresh.enabled(c),
                    l.historyBack.enabled(o && o.canMoveBack()),
                    l.historyForward.enabled(o && o.canMoveForward()),
                    l.toggleDocumentMap.enabled(c && h.enabled).checked(h.enabled && h.visible),
                    l.toggleParametersArea.enabled(c && g.enabled).checked(g.enabled && g.visible),
                    l.togglePrintPreview.enabled(u).checked(i.getViewMode() == te.PRINT_PREVIEW),
                    l.pageMode.enabled(u).checked(i.getPageMode() == ne.CONTINUOUS_SCROLL),
                    l.zoom.enabled(p),
                    l.zoomIn.enabled(p),
                    l.zoomOut.enabled(p),
                    l.toggleZoomMode.enabled(p).checked(i.getScaleMode() == ae.FIT_PAGE || i.getScaleMode() == ae.FIT_PAGE_WIDTH),
                    l.toggleSearchDialog.enabled(u).checked(m.visible),
                    l.toggleSendEmailDialog.enabled(u).checked(v.visible),
                    i.updateUI(null),
                    i.pageNumberChange(s),
                    i.pageCountChange(n)
                } finally {
                    a = !1
                }
                var e, n, s, c, u, d, f, p, h, g, m, v, E, b, P, T
            }
            ), 10))
        }
        i.setParametersAreaVisible(c),
        i.setDocumentMapVisible(c),
        i.updateUIInternal(c),
        i.setSearchDialogVisible(c),
        i.setSendEmailDialogVisible(c),
        i.scaleModeChanged(c),
        i.currentPageChanged(c),
        i.beforeLoadReport((function() {
            n(t.RenderInProgress, !0),
            c()
        }
        )),
        i.reportLoadProgress(c),
        i.reportLoadComplete((function() {
            n(t.RenderInProgress, !1),
            c()
        }
        )),
        i.reportSourceChanged(c),
        i.viewModeChanged(c),
        i.pageModeChanged((function() {
            c()
        }
        )),
        i.setUIState((function(e, r) {
            n(t[r.operationName], r.inProgress),
            c()
        }
        )),
        i.error((function() {
            n(t.ExportInProgress, !1),
            n(t.PrintInProgress, !1),
            n(t.RenderInProgress, !1),
            c()
        }
        )),
        i.renderingStopped((function() {
            n(t.RenderInProgress, !1),
            c()
        }
        )),
        c()
    }
    var dt = {};
    var ft, pt, ht = {}, gt = "pa.parametersReady", mt = "pa.Error";
    function vt(e, t, r) {
        t = $.extend({}, ht, t, r);
        var n = {}
          , a = $(n)
          , i = {}
          , o = t.controller;
        if (!o)
            throw "No controller (telerikReporting.reportViewerController) has been specified.";
        var s, l, c, u = Ye;
        t.parameterEditors && t.parameterEditors.length > 0 && (u = [].concat(t.parameterEditors, Ye));
        var f = void 0
          , p = $(e)
          , h = p.find(".trv-parameters-area-content")
          , g = p.find(".trv-error-message")
          , m = p.find(".trv-parameters-area-preview-button");
        m.text(q[m.text()]),
        m.attr("aria-label", q[m.attr("aria-label")]),
        m.on("click", (function(e) {
            e.preventDefault(),
            R() && w()
        }
        ));
        var v, E = t.templates["trv-parameter"], b = !1 !== t.parametersAreaVisible, P = t.enableAccessibility;
        function T(e, t) {
            e.style.display = t ? "none" : ""
        }
        function S(e) {
            var r = $(E)
              , n = r.find(".trv-parameter-value")
              , a = r.find(".trv-parameter-title")
              , o = r.find(".trv-parameter-error")
              , l = r.find(".trv-parameter-error-message")
              , f = r.find(".trv-parameter-use-default input")
              , p = t.parameters && t.parameters.editors ? t.parameters.editors : null
              , h = function(e, t) {
                var r = Array.from(u).find((r => r.match(e, t)));
                return r
            }(e, p)
              , g = d(e.text)
              , v = !e.isVisible;
            v && (g += " [<b>hidden</b>]"),
            a.html(g).attr("title", g),
            l.text(e.Error),
            (e.Error ? $.fn.show : $.fn.hide).call(o);
            var b = h.createEditor(n, {
                templates: t.templates,
                parameterChanged: function(e, t) {
                    var r = document.querySelector(".trv-pages-area .trv-error-message ul li." + e.name);
                    try {
                        t = be.validate(e, t),
                        o.hide(),
                        r && T(r, !0),
                        function(e, t) {
                            delete e.Error,
                            e.value = t,
                            s[e.id] = t,
                            void 0 !== c ? e.id in c && (s[e.id] = t) : s[e.id] = t;
                            if (N(e),
                            e.childParameters)
                                G(y);
                            else {
                                var r = R();
                                if (_(r),
                                r) {
                                    var n = document.querySelector(".trv-pages-area .trv-error-message");
                                    m.is(":visible") && n && (n.textContent = q.tryReportPreview),
                                    y()
                                }
                            }
                        }(e, t)
                    } catch (t) {
                        r && T(r, !1),
                        e.Error = t,
                        e.value = [],
                        l.text(t),
                        o.show(),
                        _(!1)
                    } finally {
                        !function(e) {
                            var t = i[e.id];
                            if (!t || !P)
                                return;
                            t.setAccessibilityErrorState(e)
                        }(e)
                    }
                },
                enableAccessibility: P
            });
            (i[e.id] = b,
            b.beginEdit(e),
            P && !v && b.addAccessibility(e),
            f.length > 0) && (f.on("click", (function() {
                var t = $(this).is(":checked");
                t ? (delete s[e.id],
                delete c[e.id],
                N(e),
                G(H)) : (s[e.id] = e.value,
                c[e.id] = e.value),
                b.enable(!t),
                M()
            }
            )),
            null !== c ? e.id in c || (f.prop("checked", !0),
            b.enable(!1)) : v && (f.prop("checked", !0),
            b.enable(!1)));
            return r
        }
        function _(e) {
            e ? (m.prop("disabled", !1),
            m.removeClass("k-disabled")) : (m.prop("disabled", !0),
            m.addClass("k-disabled"))
        }
        function C(e) {
            g.text(e),
            (e ? $.fn.addClass : $.fn.removeClass).call(p, "trv-error")
        }
        function I() {
            (Array.from(l).every((e => !e.isVisible || e.autoRefresh)) && o.isReportAutoRun() ? $.fn.removeClass : $.fn.addClass).call(p, "preview")
        }
        function R() {
            return Array.from(l).every((e => !e.Error))
        }
        function A(e) {
            var r;
            s = {},
            f = {},
            l = e || [],
            Object.entries(i).forEach(( ([e,t]) => {
                "function" == typeof t.destroy && t.destroy()
            }
            )),
            i = {};
            var n = $("<div></div>");
            Array.from(l).forEach((e => {
                try {
                    e.value = be.validate(e, e.value)
                } catch (t) {
                    e.Error = e.Error || t
                }
                !Boolean(e.Error) ? s[e.id] = e.value : e.Error = q.invalidParameter,
                e.availableValues ? f[e.id] = {
                    valueMember: e.value,
                    displayMember: e.label,
                    availableValues: e.availableValues,
                    multivalue: e.multivalue
                } : f[e.id] = e.value,
                (e.isVisible || t.showHiddenParameters) && (r = S(e)) && n.append(r)
            }
            )),
            void 0 !== c && (null === c ? (c = {},
            Array.from(l).forEach((e => {
                e.isVisible ? c[e.id] = e.value : delete s[e.id]
            }
            ))) : Array.from(l).forEach((e => {
                e.id in c || delete s[e.id]
            }
            ))),
            h.empty(),
            l.length > 0 && (h.append(n.children()),
            P && h.attr("aria-label", "Parameters area. Contains " + l.length + " parameters.")),
            I(),
            _(R()),
            o.setProcessedParameter($.extend({}, f))
        }
        function w() {
            o.setParameters($.extend({}, s)),
            o.previewReport(!1)
        }
        function M() {
            n.parametersReady(s)
        }
        function y() {
            M(),
            function() {
                for (var e = !0, t = l.length - 1; e && t >= 0; t--) {
                    var r = l[t];
                    e = r.id in s && (Boolean(r.autoRefresh) || !r.isVisible)
                }
                return e
            }() && w()
        }
        function N(e) {
            e.childParameters && Array.from(e.childParameters).forEach((e => {
                var t = function(e) {
                    if (l)
                        for (var t = 0; t < l.length; t++) {
                            var r = l[t];
                            if (r.id === e)
                                return r
                        }
                    return null
                }(e);
                t && N(t),
                delete s[e],
                function(e) {
                    if (i) {
                        var t = i[e];
                        t && "function" == typeof t.clearPendingChange && t.clearPendingChange()
                    }
                }(e)
            }
            ))
        }
        function D(e) {
            return !(!e || null === e) && Array.from(e).some((e => e.isVisible))
        }
        (v = p.find(".trv-parameters-area-preview-button")) && (v.attr("aria-label", q[v.attr("aria-label")]),
        v.text(q[v.text()]));
        var k = 0;
        function L() {
            k++,
            p.addClass("trv-loading")
        }
        function x() {
            k > 0 && 0 == --k && p.removeClass("trv-loading")
        }
        var O = !1;
        function V(e, r) {
            F(e),
            A(e),
            C(""),
            O && b && (z(!0),
            P && function() {
                var e = p.prev()
                  , r = p.find(".trv-parameters-area-content").attr("tabIndex");
                t.parametersAreaPosition !== se.TOP && t.parametersAreaPosition !== se.LEFT || (e = p.next());
                e.attr("aria-label", q.ariaLabelParametersAreaSplitter),
                e.attr("tabIndex", r)
            }()),
            o.updateUIInternal(),
            "function" == typeof r && r(),
            x()
        }
        function F(e) {
            O = D(e) || !o.isReportAutoRun(),
            z(b && O)
        }
        function G(e) {
            U(o.loadParameters(s), e)
        }
        function U(e, t) {
            L(),
            e.then((function(e) {
                V(e, t)
            }
            )).catch((function(e) {
                x(),
                W(),
                p.hasClass("trv-hidden") || C(e),
                n.error(e)
            }
            ))
        }
        function B(e, t) {
            var r = function(e) {
                var t;
                return e && e.length && (t = e[0]),
                "function" == typeof t ? t : null
            }(t);
            return r ? a.on(e, r) : a.trigger(e, t),
            o
        }
        function H() {
            null === c && (c = $.extend({}, s)),
            M()
        }
        function z(e) {
            var r = Q.viewerInstances.find((e => e.id === t.viewerSelector + "-parameters-splitter"));
            if (r) {
                var n = p.prev();
                t.parametersAreaPosition !== se.TOP && t.parametersAreaPosition !== se.LEFT || (n = p.next()),
                (O ? $.fn.removeClass : $.fn.addClass).call(n, "trv-hidden"),
                r.instance.toggle(".trv-parameters-area", e)
            }
        }
        function W() {
            A([])
        }
        return o.reloadParameters((function(e, t) {
            C(),
            h.empty(),
            U(t, H)
        }
        )).beforeLoadReport((function() {
            k = 0,
            L()
        }
        )).reportLoadComplete((function() {
            F(l),
            I()
        }
        )).error(x).pageReady(x),
        o.getParametersAreaState((function(e, t) {
            var r = !1;
            l && (r = D(l) || !o.isReportAutoRun()),
            t.enabled = r,
            t.visible = b
        }
        )).setParametersAreaVisible((function(e, t) {
            b = t.visible,
            z(t.visible && (D(l) || !o.isReportAutoRun()))
        }
        )),
        $.extend(n, {
            allParametersValid: function() {
                return R()
            },
            clear: function() {
                W()
            },
            error: function() {
                return B(mt, arguments)
            },
            parametersReady: function() {
                return B(gt, arguments)
            },
            fill: function(e) {
                return A(e)
            },
            setParameters: function(e) {
                c = null === e ? null : $.extend({}, e)
            }
        }),
        n
    }
    var Et = {};
    function bt(e) {
        if (e) {
            var t, r = e.find(".trv-search-dialog-caption-label"), n = e.find(".trv-search-dialog-search-options"), a = e.find("a[data-command='telerik_ReportViewer_searchDialog_StopSearch']"), i = e.find("a[data-command='telerik_ReportViewer_searchDialog_MatchCase']"), o = e.find("a[data-command='telerik_ReportViewer_searchDialog_MatchWholeWord']"), s = e.find("a[data-command='telerik_ReportViewer_searchDialog_UseRegex']"), l = e.find("a[data-command='telerik_ReportViewer_searchDialog_NavigateUp']"), c = e.find("a[data-command='telerik_ReportViewer_searchDialog_NavigateDown']");
            Tt(e, "aria-label"),
            Tt(n, "aria-label"),
            (t = r) && t.text(q[t.text()]),
            Pt(a),
            Pt(i),
            Pt(o),
            Pt(s),
            Pt(l),
            Pt(c)
        }
    }
    function Pt(e) {
        Tt(e, "title"),
        Tt(e, "aria-label")
    }
    function Tt(e, t) {
        e && e.attr(t, q[e.attr(t)])
    }
    var St = {};
    function _t(e) {
        if (e) {
            var t = e.find(".trv-replace-string")
              , r = e.find("[aria-label]")
              , n = e.find("[title]");
            t.length && Array.from(t).forEach((e => {
                var t;
                (t = $(e)) && t.text(q[t.text()])
            }
            )),
            r.length && Array.from(r).forEach((e => {
                Ct($(e), "aria-label")
            }
            )),
            n.length && Array.from(n).forEach((e => {
                Ct($(e), "title")
            }
            ))
        }
    }
    function Ct(e, t) {
        e && e.attr(t, q[e.attr(t)])
    }
    var It = Object.defineProperty
      , Rt = (e, t, r) => (( (e, t, r) => {
        t in e ? It(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: r
        }) : e[t] = r
    }
    )(e, "symbol" != typeof t ? t + "" : t, r),
    r);
    class At {
        constructor() {
            Rt(this, "_data", {}),
            this._data = {}
        }
        get length() {
            return Object.keys(this._data).length
        }
        getItem(e) {
            return this._data[e] || null
        }
        setItem(e, t) {
            this._data[e] = t
        }
        removeItem(e) {
            delete this._data[e]
        }
        key(e) {
            return Object.keys(this._data)[e] || null
        }
        clear() {
            this._data = {}
        }
    }
    const wt = (Mt = {},
    {
        load: function(e, t, r) {
            var n = Mt[e];
            return n || (Mt[e] = n = r.get(e).then((function(e) {
                var r = {}
                  , n = []
                  , a = c(t, "\\/") + "/";
                e = s(e, "{service}/", a),
                e = s(e, "{service}", a);
                var i = $("<div></div>").html(e);
                return Array.from(i.find("template")).forEach((e => {
                    var t = $(e);
                    r[t.attr("id")] = o(t.html(), "\n \t")
                }
                )),
                Array.from(i.find("link")).forEach((e => {
                    n.push(o(e.outerHTML, "\n \t"))
                }
                )),
                n = D(n),
                {
                    templates: r,
                    styleSheets: n
                }
            }
            ))),
            n
        }
    });
    var Mt, yt = Object.defineProperty, Nt = (e, t, r) => (( (e, t, r) => {
        t in e ? yt(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: r
        }) : e[t] = r
    }
    )(e, "symbol" != typeof t ? t + "" : t, r),
    r);
    class Dt {
        constructor(e, t, r) {
            Nt(this, "_id"),
            Nt(this, "_storage"),
            Nt(this, "_defaults"),
            this._id = e,
            this._storage = t,
            this._defaults = r || {}
        }
        formatKey(e) {
            return this._id + "_" + e
        }
        getItem(e) {
            var t = this._storage.getItem(this.formatKey(e));
            if ("string" == typeof t)
                try {
                    t = JSON.parse(t)
                } catch (e) {
                    t = null
                }
            return null != t ? t : this._defaults[e]
        }
        setItem(e, t) {
            var r = this.formatKey(e);
            this._storage.setItem(r, JSON.stringify(t))
        }
        getViewMode() {
            return this.getItem("viewMode")
        }
        setViewMode(e) {
            this.setItem("viewMode", e)
        }
        getPageMode() {
            return this.getItem("pageMode")
        }
        setPageMode(e) {
            this.setItem("pageMode", e)
        }
        getPrintMode() {
            return this.getItem("printMode")
        }
        setPrintMode(e) {
            this.setItem("printMode", e)
        }
        getScale() {
            return this.getItem("scale")
        }
        setScale(e) {
            this.setItem("scale", e)
        }
        getScaleMode() {
            return this.getItem("scaleMode")
        }
        setScaleMode(e) {
            this.setItem("scaleMode", e)
        }
        getDocumentMapVisible() {
            return this.getItem("documentMapVisible")
        }
        setDocumentMapVisible(e) {
            this.setItem("documentMapVisible", e)
        }
        getParametersAreaVisible() {
            return this.getItem("parametersAreaVisible")
        }
        setParametersAreaVisible(e) {
            this.setItem("parametersAreaVisible", e)
        }
        getHistory() {
            return this.getItem("history")
        }
        setHistory(e) {
            this.setItem("history", e)
        }
        getClientId() {
            return this.getItem("clientId")
        }
        setClientId(e) {
            this.setItem("clientId", e)
        }
        getReportSource() {
            return this.getItem("reportSource")
        }
        setReportSource(e) {
            this.setItem("reportSource", e)
        }
        getPageNumber() {
            return this.getItem("pageNumber")
        }
        setPageNumber(e) {
            this.setItem("pageNumber", e)
        }
        getEnableAccessibility() {
            return this.getItem("enableAccessibility")
        }
        setEnableAccessibility(e) {
            this.setItem("enableAccessibility", e)
        }
        getAccessibilityKeyMap() {
            return this.getItem("accessibilityKeyMap")
        }
        setAccessibilityKeyMap(e) {
            this.setItem("accessibilityKeyMap", e)
        }
        getSearchMetadataOnDemand() {
            return this.getItem("searchMetadataOnDemand")
        }
        setSearchMetadataOnDemand(e) {
            this.setItem("searchMetadataOnDemand", e)
        }
        getKeepClientAlive() {
            return this.getItem("keepClientAlive")
        }
        setKeepClientAlive(e) {
            this.setItem("keepClientAlive", e)
        }
    }
    var $t = Object.defineProperty
      , kt = (e, t, r) => (( (e, t, r) => {
        t in e ? $t(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: r
        }) : e[t] = r
    }
    )(e, "symbol" != typeof t ? t + "" : t, r),
    r);
    class Lt {
        constructor(e, t) {
            kt(this, "element"),
            kt(this, "$element"),
            kt(this, "options"),
            this.element = e,
            this.$element = $(e),
            this.options = t
        }
    }
    var xt = Object.defineProperty
      , Ot = (e, t, r) => (( (e, t, r) => {
        t in e ? xt(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: r
        }) : e[t] = r
    }
    )(e, "symbol" != typeof t ? t + "" : t, r),
    r);
    var Vt = Object.defineProperty
      , Ft = (e, t, r) => (( (e, t, r) => {
        t in e ? Vt(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: r
        }) : e[t] = r
    }
    )(e, "symbol" != typeof t ? t + "" : t, r),
    r);
    const Gt = Q.viewerInstances;
    function Ut(e, t) {
        var r = t.serviceUrl
          , n = "";
        t.reportServer && (n = c(t.reportServer.url, "\\/"),
        r = n + "/api/reports");
        var a, o, s, l = $(e), f = {}, p = t.id || `trv_${e.id}`, h = {}, g = {}, m = {}, v = {}, E = {}, b = {}, P = "";
        if (t.viewerSelector = "reportViewer-" + i(),
        l.attr("data-selector", t.viewerSelector),
        function(e) {
            if (!e)
                return l.text("The report viewer configuration options are not initialized."),
                !1;
            if (e.reportServer) {
                if (!e.reportServer.url)
                    return l.text("The report server URL is not specified."),
                    !1
            } else if (!e.serviceUrl)
                return l.text("The serviceUrl is not specified."),
                !1;
            return !0
        }(t)) {
            var T, S = "19.0.25.211";
            if (t = $.extend({}, function(e, t) {
                return {
                    id: null,
                    serviceUrl: null,
                    templateUrl: c(e, "\\/") + "/resources/templates/telerikReportViewerTemplate-" + t + ".html/",
                    reportSource: null,
                    reportServer: null,
                    authenticationToken: null,
                    sendEmail: null,
                    scale: 1,
                    scaleMode: ae.FIT_PAGE,
                    viewMode: te.INTERACTIVE,
                    pageMode: ne.CONTINUOUS_SCROLL,
                    parametersAreaPosition: se.RIGHT,
                    documentMapAreaPosition: le.LEFT,
                    parameters: {
                        editors: {
                            multiSelect: oe.LIST_VIEW,
                            singleSelect: oe.LIST_VIEW
                        }
                    },
                    persistSession: !1,
                    parameterEditors: [],
                    disabledButtonClass: null,
                    checkedButtonClass: null,
                    parametersAreaVisible: !0,
                    documentMapVisible: !0,
                    enableAccessibility: !1,
                    searchMetadataOnDemand: !1,
                    initialPageAreaImageUrl: null,
                    keepClientAlive: !0
                }
            }(r, S), t),
            h = new Dt(p,t.persistSession ? window.sessionStorage : new At,{
                scale: t.scale,
                scaleMode: t.scaleMode,
                printMode: t.printMode ? t.printMode : t.directPrint,
                enableAccessibility: t.enableAccessibility,
                searchMetadataOnDemand: t.searchMetadataOnDemand,
                sendEmail: t.sendEmail,
                parametersAreaPosition: t.parametersAreaPosition,
                documentMapAreaPosition: t.documentMapAreaPosition,
                keepClientAlive: t.keepClientAlive
            }),
            t.reportServer ? (P = c(t.reportServer.url, "\\/"),
            b.serviceUrl = P + "/api/reports",
            b.loginInfo = {
                url: P + "/Token",
                username: t.reportServer.username,
                password: t.reportServer.password
            }) : b.serviceUrl = t.serviceUrl,
            o = new ct(b),
            (g = t.controller) ? g.updateSettings(h) : g = new Re({
                serviceClient: o,
                settings: h
            }),
            s = new ye({
                controller: g,
                settings: h
            }),
            v = new fe({
                controller: g,
                history: s
            }),
            new ut({
                controller: g,
                history: s,
                commands: v
            }),
            E = {
                stringResources: q,
                refreshReport: function(e) {
                    return 0 === arguments.length && (e = !0),
                    g.refreshReport(e, !0),
                    E
                },
                reportSource: function(e) {
                    return e || null === e ? (g.setReportSource(e),
                    g.refreshReport(!1, !0),
                    E) : g.getReportSource()
                },
                clearReportSource: function() {
                    return g.clearReportSource(),
                    E
                },
                viewMode: function(e) {
                    return e ? (g.setViewMode(e),
                    E) : g.getViewMode()
                },
                pageMode: function(e) {
                    return e ? (g.setPageMode(e),
                    E) : g.getPageMode()
                },
                printMode: function(e) {
                    return e ? (g.setPrintMode(e),
                    E) : g.getPrintMode()
                },
                scale: function({scale: e, scaleMode: t}={}) {
                    return e || t ? (g.setScale(e || g.getScale()),
                    g.setScaleMode(t || g.getScaleMode()),
                    E) : {
                        scale: g.getScale(),
                        scaleMode: g.getScaleMode()
                    }
                },
                currentPage: function() {
                    return g.getCurrentPageNumber()
                },
                pageCount: function() {
                    return g.getPageCount()
                },
                parametersAreaVisible: function(e) {
                    g.setParametersAreaVisible({
                        visible: e
                    })
                },
                getReportParameters: function() {
                    return g.getReportParameters()
                },
                isReportAutoRun: function() {
                    return g.isReportAutoRun()
                },
                authenticationToken: function(e) {
                    return e && g.setAuthenticationToken(e),
                    E
                },
                bind: function(e, t) {
                    _(e, t, !0)
                },
                unbind: function(e, t) {
                    _(e, t, !1)
                },
                accessibilityKeyMap: function(e) {
                    if (a)
                        return e ? (a.setKeyMap(e),
                        E) : a.getKeyMap()
                },
                commands: v,
                dispose: function() {
                    g.dispose(),
                    m && m.dispose()
                }
            },
            !window.Promise)
                throw "The current browser does not support the Promise feature which is required for using the Report Viewer.";
            return function(e) {
                return window.kendo ? Promise.resolve() : N(c(r, "\\/") + "/resources/js/telerikReportViewer.kendo-" + e + ".min.js/").catch((function(e) {
                    k("Kendo could not be loaded automatically. Make sure 'options.serviceUrl' / 'options.reportServer.url' is correct and accessible. The error is: " + e.error)
                }
                ))
            }(T = S).then((function() {}
            )).then((function() {
                E.authenticationToken(t.authenticationToken),
                g.getServiceVersion().catch((function(e) {
                    var t = I(e) ? e.exceptionMessage : u(q.errorServiceUrl, [d(r)]);
                    return l.text(t),
                    Promise.reject()
                }
                )).then((function(e) {
                    if (e !== T)
                        return l.text(u(q.errorServiceVersion, [e, T])),
                        Promise.reject();
                    wt.load(t.templateUrl, r, o).catch((function() {
                        return l.text(u(q.errorLoadingTemplates, [d(t.templateUrl)])),
                        Promise.reject()
                    }
                    )).then((function(e) {
                        return f = e.templates,
                        function(e) {
                            if (!e)
                                return Promise.resolve();
                            var t = $("head")
                              , r = t.find("link").map((function(e, t) {
                                return t.outerHTML
                            }
                            )).toArray()
                              , n = [];
                            return Array.from(e).forEach((e => {
                                -1 === r.indexOf(e) && n.push(new Promise((function(r, n) {
                                    var a = $(e);
                                    a.on("load", r),
                                    a.on("onerror", (function() {
                                        k("error loading stylesheet " + e),
                                        r()
                                    }
                                    )),
                                    t.append(a)
                                }
                                )))
                            }
                            )),
                            Promise.all(n).then(g.cssLoaded)
                        }(e.styleSheets)
                    }
                    )).then(A)
                }
                ))
            }
            )),
            E
        }
        function _(e, t, r) {
            "function" == typeof t ? r ? $(E).on(e, {
                sender: E
            }, t) : $(E).off(e, t) : t || r || $(E).off(e)
        }
        function C() {
            var r, n, i, o, s, c, u;
            l.html(f["trv-report-viewer"]),
            ee.bind(l, {
                controller: g,
                commands: v,
                templates: f
            }, t),
            (m = new Xe(e,g)).attach(),
            function() {
                var e = {
                    max: "500px",
                    min: "50px",
                    size: "210px",
                    collapsible: !0
                }
                  , r = l.find(".trv-parameters-area")
                  , n = [{}]
                  , a = {
                    max: "500px",
                    min: "50px",
                    size: "210px",
                    collapsible: !0,
                    collapsed: !0
                }
                  , i = l.find(".trv-document-map")
                  , o = [{}]
                  , s = "horizontal";
                t.documentMapAreaPosition === le.RIGHT ? (i.insertAfter(l.find(".trv-pages-area")),
                o.push(a)) : o.unshift(a);
                t.parametersAreaPosition !== se.TOP && t.parametersAreaPosition !== se.BOTTOM || (s = "vertical",
                r.addClass("-vertical"),
                e.size = "130px");
                t.parametersAreaPosition === se.LEFT || t.parametersAreaPosition === se.TOP ? (r.insertBefore(l.find(".trv-document-map-splitter")),
                n.unshift(e)) : n.push(e);
                try {
                    var c = l.find(".trv-document-map-splitter").kendoSplitter({
                        panes: o,
                        expand: function(e) {
                            R(e.pane, !0)
                        },
                        collapse: function(e) {
                            R(e.pane, !1)
                        },
                        resize: function(e) {}
                    }).data("kendoSplitter")
                } catch (e) {
                    throw console.error("Instantiation of Kendo Splitter as Document Map splitter threw an exception", e),
                    e
                }
                try {
                    var u = l.find(".trv-parameters-splitter").kendoSplitter({
                        panes: n,
                        orientation: s,
                        expand: function(e) {
                            R(e.pane, !0)
                        },
                        collapse: function(e) {
                            R(e.pane, !1)
                        },
                        resize: function(e) {}
                    }).data("kendoSplitter")
                } catch (e) {
                    throw console.error("Instantiation of Kendo Splitter as Parameters area splitter threw an exception", e),
                    e
                }
                var d = {
                    id: t.viewerSelector + "-parameters-splitter",
                    instance: u
                }
                  , f = {
                    id: t.viewerSelector + "-document-map-splitter",
                    instance: c
                };
                Gt.push(d),
                Gt.push(f)
            }(),
            function() {
                var e = {
                    EXPORT_BEGIN: g.Events.EXPORT_STARTED,
                    EXPORT_END: g.Events.EXPORT_DOCUMENT_READY,
                    PRINT_BEGIN: g.Events.PRINT_STARTED,
                    PRINT_END: g.Events.PRINT_DOCUMENT_READY,
                    RENDERING_BEGIN: g.Events.BEFORE_LOAD_REPORT,
                    RENDERING_END: g.Events.REPORT_LOAD_COMPLETE,
                    PAGE_READY: g.Events.PAGE_READY,
                    ERROR: g.Events.ERROR,
                    UPDATE_UI: g.Events.UPDATE_UI,
                    INTERACTIVE_ACTION_EXECUTING: g.Events.INTERACTIVE_ACTION_EXECUTING,
                    INTERACTIVE_ACTION_ENTER: g.Events.INTERACTIVE_ACTION_ENTER,
                    INTERACTIVE_ACTION_LEAVE: g.Events.INTERACTIVE_ACTION_LEAVE,
                    VIEWER_TOOLTIP_OPENING: g.Events.TOOLTIP_OPENING,
                    SEND_EMAIL_BEGIN: g.Events.SEND_EMAIL_STARTED,
                    SEND_EMAIL_END: g.Events.SEND_EMAIL_READY,
                    PARAMETERS_LOADED: g.Events.PARAMETERS_LOADED
                }
                  , t = $(E);
                for (const [r,n] of Object.entries(e))
                    g.on(n, (function(e, n) {
                        t.trigger(r, n)
                    }
                    ))
            }(),
            _(Me.EXPORT_BEGIN, t.exportBegin, !0),
            _(Me.EXPORT_END, t.exportEnd, !0),
            _(Me.PRINT_BEGIN, t.printBegin, !0),
            _(Me.PRINT_END, t.printEnd, !0),
            _(Me.RENDERING_BEGIN, t.renderingBegin, !0),
            _(Me.RENDERING_END, t.renderingEnd, !0),
            _(Me.PAGE_READY, t.pageReady, !0),
            _(Me.ERROR, t.error, !0),
            _(Me.UPDATE_UI, t.updateUi, !0),
            _(Me.INTERACTIVE_ACTION_EXECUTING, t.interactiveActionExecuting, !0),
            _(Me.INTERACTIVE_ACTION_ENTER, t.interactiveActionEnter, !0),
            _(Me.INTERACTIVE_ACTION_LEAVE, t.interactiveActionLeave, !0),
            _(Me.VIEWER_TOOLTIP_OPENING, t.viewerToolTipOpening, !0),
            _(Me.SEND_EMAIL_BEGIN, t.sendEmailBegin, !0),
            _(Me.SEND_EMAIL_END, t.sendEmailEnd, !0),
            _(Me.PARAMETERS_LOADED, t.parametersLoaded, !0),
            r = h.getViewMode(),
            n = h.getPageMode(),
            i = h.getPrintMode(),
            o = h.getScale(),
            s = h.getScaleMode(),
            c = h.getDocumentMapVisible(),
            u = h.getParametersAreaVisible(),
            h.getAccessibilityKeyMap(),
            g.setViewMode(r || t.viewMode),
            g.setPageMode(n || t.pageMode),
            g.setPrintMode(i || t.printMode),
            g.setScale(o || t.scale),
            g.setScaleMode(s || t.scaleMode),
            g.setDocumentMapVisible({
                visible: c || t.documentMapVisible
            }),
            g.setParametersAreaVisible({
                visible: u || t.parametersAreaVisible
            }),
            g.printModeChanged((function() {
                h.setPrintMode(g.getPrintMode())
            }
            )),
            g.viewModeChanged((function() {
                h.setViewMode(g.getViewMode())
            }
            )),
            g.pageModeChanged((function() {
                h.setPageMode(g.getPageMode())
            }
            )),
            g.scaleChanged((function(e, t) {
                h.setScale(t)
            }
            )),
            g.scaleModeChanged((function(e, t) {
                h.setScaleMode(t)
            }
            )),
            g.setSideMenuVisible((function(e, t) {
                window.setTimeout((function() {
                    (t.visible ? $.fn.addClass : $.fn.removeClass).call(l, "trv-side-menu-visible")
                }
                ), 1)
            }
            )),
            g.setDocumentMapVisible((function() {
                var e = {};
                g.getDocumentMapState(e),
                h.setDocumentMapVisible(e.visible)
            }
            )),
            g.setParametersAreaVisible((function() {
                var e = {};
                g.getParametersAreaState(e),
                h.setParametersAreaVisible(e.visible)
            }
            )),
            function(e) {
                if (e.enableAccessibility) {
                    a = new Z({
                        controller: g,
                        templates: f
                    });
                    var t = e.accessibilityKeyMap;
                    t && a.setKeyMap(t),
                    h.contentTabIndex = function() {
                        var e = "div.trv-pages-area";
                        try {
                            var t = l.find(e);
                            if (0 === t.length)
                                throw "Selector " + e + " did not return a result.";
                            return parseInt(t.attr("tabindex"))
                        } catch (e) {
                            return console && console.log(e),
                            0
                        }
                    }()
                }
            }(t)
        }
        function R(e, t) {
            switch ($(e).attr("data-id")) {
            case "trv-document-map":
                g.setDocumentMapVisible({
                    visible: t
                });
                break;
            case "trv-parameters-area":
                g.setParametersAreaVisible({
                    visible: t
                })
            }
        }
        function A() {
            var e = !1;
            C(),
            g.reportLoadComplete((function() {
                !1 === t.documentMapVisible && g.setDocumentMapVisible({
                    visible: !1
                })
            }
            ));
            var r = h.getReportSource();
            if (void 0 !== r) {
                g.setReportSource(r);
                var n = h.getPageNumber();
                void 0 !== n && g.navigateToPage(n),
                e = !0
            } else
                t.viewMode && g.setViewMode(t.viewMode),
                t.pageMode && g.setPageMode(t.pageMode),
                t.reportSource && (g.setReportSource(t.reportSource),
                e = !0);
            "function" == typeof t.ready && t.ready.call(E),
            e && g.refreshReport(!1, !0)
        }
    }
    var Bt = "telerik_ReportViewer";
    $.fn[Bt] = function(e) {
        return this.selector && !e.selector && (e.selector = this.selector),
        this.each((function() {
            $.data(this, Bt) || $.data(this, Bt, new Ut(this,e))
        }
        ))
    }
    ;
    const Ht = [{
        name: "telerik_ReportViewer_DocumentMapArea",
        constructor: function(e, t, r) {
            var n = (t = $.extend({}, dt, t, r)).controller;
            if (!n)
                throw "No controller (telerikReporting.reportViewerController) has been specified.";
            var a, i, o = $(e), s = !1 !== t.documentMapVisible, l = t.enableAccessibility, c = null, u = !1;
            function d(e) {
                var t = this.dataItem(e.node)
                  , r = t.page
                  , a = t.id;
                n.navigateToPage(r, {
                    type: "bookmark",
                    id: a
                })
            }
            function f(e) {
                l && window.setTimeout((function() {
                    p(e.node)
                }
                ), 100)
            }
            function p(e) {
                var t = $(e).find("li");
                Array.from(t).forEach((e => {
                    var t = $(e);
                    t.attr("aria-label", t[0].innerText)
                }
                ))
            }
            function h() {
                g([])
            }
            function g(e) {
                var r = e && !$.isEmptyObject(e)
                  , n = a.data("kendoTreeView");
                if (!n)
                    try {
                        a.kendoTreeView({
                            dataTextField: "text",
                            select: d
                        }),
                        n = a.data("kendoTreeView")
                    } catch (e) {
                        throw console.error("Instantiation of Kendo TreeView as Document Map threw an exception", e),
                        e
                    }
                n.setDataSource(e),
                l && function(e) {
                    e.bind("expand", f),
                    e.element.attr("aria-label", q.ariaLabelDocumentMap);
                    var r = e.element.find("ul");
                    Array.from(r).forEach((e => {
                        p(e)
                    }
                    )),
                    u && function() {
                        var e = o.next();
                        t.documentMapAreaPosition === le.RIGHT && (e = o.prev());
                        e.attr("aria-label", q.ariaLabelDocumentMapSplitter)
                    }()
                }(n),
                v(r)
            }
            function m() {
                o.removeClass("trv-loading")
            }
            function v(e) {
                var r = Q.viewerInstances.find((e => e.id === t.viewerSelector + "-document-map-splitter")).instance
                  , n = o.next();
                t.documentMapAreaPosition === le.RIGHT && (n = o.prev()),
                r && ((u ? $.fn.removeClass : $.fn.addClass).call(n, "trv-hidden"),
                r.toggle(".trv-document-map", e))
            }
            (a = $('<div id="' + t.viewerSelector + '-documentMap"></div>')).appendTo(e),
            n.beforeLoadParameters((function() {
                !function() {
                    u = !1,
                    v(!1);
                    var e, t = n.getReportSource().report, r = c !== t || (e = {},
                    n.getDocumentMapState(e),
                    !e.visible);
                    c = t,
                    r && h()
                }()
            }
            )).beginLoadReport((function() {
                o.addClass("trv-loading")
            }
            )).reportLoadComplete((function(e, t) {
                t.documentMapAvailable ? (u = !0,
                g(t.documentMapNodes),
                n.setDocumentMapVisible({
                    enabled: !0,
                    visible: s
                })) : v(u = !1),
                m()
            }
            )).error((function(e, t) {
                m(),
                h()
            }
            )).renderingStopped((function() {
                u = !1,
                v(!1)
            }
            )),
            n.setDocumentMapVisible((function(e, t) {
                v((s = t.visible) && u)
            }
            )).getDocumentMapState((function(e, t) {
                t.enabled = u,
                t.visible = s
            }
            )),
            (i = o.find(".trv-document-map-overlay")) && i.attr("aria-label", q[i.attr("aria-label")])
        }
    }, {
        name: "telerik_ReportViewer_MainMenu",
        constructor: function(e, t, r) {
            var n, a = $.extend({}, t, r), i = $(e).data("kendoMenu"), o = e.childNodes, s = a.controller, l = a.enableAccessibility;
            if (!s)
                throw "No controller (telerikReporting.ReportViewerController) has been specified.";
            function c(t) {
                Array.from($(e).find("ul[data-command-list=export-format-list]")).forEach((e => {
                    var r, n = $(e), a = n.parents("li"), o = l ? a.attr("tabindex") : -1;
                    o || (o = 1),
                    n.empty(),
                    Array.from(t).forEach((e => {
                        var t = "<li " + (l ? u('aria-label="{localizedName}" ', e) : " ") + u('tabindex="' + o + '"><a tabindex="-1" href="#" data-command="telerik_ReportViewer_export" data-command-parameter="{name}"><span>{localizedName}</span></a></li>', e);
                        i.append(t, a)
                    }
                    )),
                    l && (r = a.find("li"),
                    Array.from(r).forEach((e => {
                        var t = $(e);
                        t.off("keydown"),
                        t.on("keydown", (e => {
                            switch (e.which) {
                            case kendo.keys.ENTER:
                                d(t);
                                break;
                            case kendo.keys.UP:
                                var r = t.prev();
                                r.length > 0 ? r.trigger("focus") : t.parents("li").trigger("focus");
                                break;
                            case kendo.keys.DOWN:
                                var n = t.next();
                                n.length > 0 ? n.trigger("focus") : t.parent().children("li").first().trigger("focus")
                            }
                        }
                        ))
                    }
                    )))
                }
                ))
            }
            function d(e) {
                if (v(e))
                    r = "#trv-main-menu-export-command",
                    $("[data-role='telerik_ReportViewer_MainMenu']").data("kendoMenu").open(r);
                else if (e && e.length > 0) {
                    var t = e.children("a");
                    t.length > 0 && t.click()
                }
                var r
            }
            function p(e) {
                var t, r = $(e.item);
                t = r,
                ft && ft.is(t) && window.setTimeout((function() {
                    var e = t.find("li");
                    e.length > 0 && e[0].focus()
                }
                ), 100)
            }
            function h(e) {
                pt = void 0
            }
            function g(e) {
                switch (e.which) {
                case kendo.keys.ENTER:
                    if (!l) {
                        var t = m();
                        t.length > 0 && (v(t) && pt && (t = pt),
                        d(t))
                    }
                    break;
                case kendo.keys.RIGHT:
                    l ? function() {
                        var e = m();
                        if (!e || !e.length > 0)
                            return;
                        var t = e.next();
                        "none" == t.css("display") && (t = t.next());
                        !t.length > 0 && (t = $(o).filter("li.k-item").first());
                        t.focus()
                    }() : function() {
                        var e = i.element.children("li.k-item")
                          , t = e.filter(".k-focus");
                        if (kendo.version >= "2017.3.913")
                            return void (n = t);
                        if (t.hasClass("k-disabled"))
                            if (!n || t.is(n)) {
                                var r = t.next();
                                !r.length > 0 && (r = e.first()),
                                t.toggleClass("k-focus"),
                                r.toggleClass("k-focus"),
                                n = r,
                                i._oldHoverItem = r
                            } else
                                n = t;
                        else
                            i._oldHoverItem = t,
                            n = t
                    }();
                    break;
                case kendo.keys.LEFT:
                    l ? function() {
                        var e = m();
                        if (!e || !e.length > 0)
                            return;
                        var t = e.prev();
                        "none" == t.css("display") && (t = t.prev());
                        !t.length > 0 && (t = $(o).filter("li.k-item").last());
                        t.focus()
                    }() : (r = i.element.children("li.k-item.k-focus"),
                    n = r);
                    break;
                case kendo.keys.DOWN:
                case kendo.keys.UP:
                    l || (pt = function() {
                        var e = i.element.find('li.k-item.k-focus [data-command="telerik_ReportViewer_export"]');
                        if (1 === e.length)
                            return e.parent("li");
                        return
                    }())
                }
                var r
            }
            function m() {
                var e, t = document.activeElement;
                if (t && "li" == t.localName)
                    for (var r = $(o).filter("li.k-item"), n = 0; n < r.length; n++) {
                        var a = r[n];
                        if (t === a) {
                            e = $(a);
                            break
                        }
                    }
                else
                    t && "input" == t.localName ? e = $(t).closest("li.k-item") : 0 === (e = i.element.children("li.k-item.k-focus")).length && (e = i.element.children("li.k-item").first());
                return e
            }
            function v(e) {
                if (0 !== e.length) {
                    var t = e.attr("id");
                    return "trv-main-menu-export-command" == t || "trv-side-menu-export-command" == t
                }
            }
            i || function() {
                try {
                    i = $(e).kendoMenu().data("kendoMenu")
                } catch (e) {
                    throw console.error("Instantiation of Kendo Menu as Main Menu threw an exception", e),
                    e
                }
                i.bind("activate", p),
                i.bind("deactivate", h),
                i.element.off("keydown", g),
                i.element.on("keydown", g),
                a.enableAccessibility && (t = $('[data-role="telerik_ReportViewer_MainMenu"]'),
                Array.from(t).forEach((e => {
                    var t = $(e)
                      , r = t.find("li")
                      , n = 0
                      , a = t.attr("tabIndex");
                    a && ((n = f(a)) && !isNaN(n) || (n = 0)),
                    function(e, t) {
                        Array.from(e).forEach((e => {
                            var r = $(e);
                            r.attr("tabindex", t),
                            r.on("focus", (e => {
                                r.addClass("k-focus")
                            }
                            )),
                            r.on("blur", (e => {
                                r.removeClass("k-focus")
                            }
                            ));
                            var n = r.children("a");
                            if (n.length > 0) {
                                var a = $(n);
                                a.attr("tabindex", -1),
                                r.attr("title", a.attr("title"))
                            }
                            r.off("keydown"),
                            r.on("keydown", (function(e) {
                                e.which == kendo.keys.ENTER && (d(r),
                                ft = r)
                            }
                            ))
                        }
                        ))
                    }(r, n);
                    var i = r.find('input[data-role="telerik_ReportViewer_PageNumberInput"]');
                    i.length > 0 && i.attr("tabindex", n)
                }
                )));
                var t;
                !function() {
                    var e = $("ul[data-role=telerik_ReportViewer_MainMenu]");
                    if (!e)
                        return;
                    Array.from(e).forEach((e => {
                        var t = $(e)
                          , r = t.children("li.k-item");
                        t.attr("aria-label", q[t.attr("aria-label")]),
                        Array.from(r).forEach((e => {
                            var t = $(e);
                            if (t.attr("aria-label", q[t.attr("aria-label")]),
                            t.hasClass("trv-report-pager"))
                                t.attr("title", q[t.attr("title")]);
                            else {
                                var r = t.find("a");
                                r && r.attr("title", q[r.attr("title")])
                            }
                        }
                        ))
                    }
                    ))
                }()
            }(),
            s.reportLoadComplete((function(e, t) {
                l || i && i._oldHoverItem && i._oldHoverItem.toggleClass("k-focus"),
                t.renderingExtensions ? c(t.renderingExtensions) : s.getDocumentFormats().then(c)
            }
            ))
        }
    }, {
        name: "telerik_ReportViewer_PagesArea",
        constructor: Le
    }, {
        name: "telerik_ReportViewer_ParametersArea",
        constructor: vt
    }, {
        name: "telerik_ReportViewer_SearchDialog",
        constructor: class {
            constructor(e, t, r) {
                if (this.options = $.extend({}, Et, t),
                this.viewerOptions = r,
                this.element = e,
                this.controller = this.options.controller,
                this.initialized = !1,
                this.dialogVisible = !1,
                this.$element,
                this.$inputBox,
                this.$searchOptionsPlaceholder,
                this.searchOptionsMenu,
                this.$stopSearchPlaceholder,
                this.stopSearchMenu,
                this.$navigationPlaceholder,
                this.navigationMenu,
                this.$resultsLabel,
                this.$resultsPlaceholder,
                this.kendoComboBox,
                this.kendoSearchDialog,
                this.stopSearchCommand,
                this.optionsCommandSet,
                this.navigationCommandSet,
                this.searchResults,
                this.mruList = [],
                this.inputComboRebinding,
                this.searchMetadataRequested,
                this.searchMetadataLoaded,
                this.pendingHighlightItem,
                this.windowLocation,
                this.reportViewerWrapper = $("[data-selector='" + this.viewerOptions.viewerSelector + "']").find(".trv-report-viewer"),
                this.lastSearch = "",
                this.highlightManager = {
                    shadedClassName: "trv-search-dialog-shaded-result",
                    highlightedClassName: "trv-search-dialog-highlighted-result",
                    current: null,
                    elements: []
                },
                !this.controller)
                    throw "No controller (telerikReporting.ReportViewerController) has been specified.";
                this.controller.pageReady(this.onPageReady.bind(this)).scrollPageReady(this.onPageReady.bind(this)).beginLoadReport(this.closeAndClear.bind(this)).viewModeChanged(this.closeAndClear.bind(this)),
                this.controller.setSendEmailDialogVisible(( (e, t) => {
                    t.visible && this.dialogVisible && this.toggle(!this.dialogVisible)
                }
                )).getSearchDialogState(( (e, t) => {
                    t.visible = this.dialogVisible
                }
                )).setSearchDialogVisible(( (e, t) => {
                    this.toggleSearchDialog(t.visible)
                }
                )),
                $(window).on("resize", ( () => {
                    this.kendoSearchDialog && this.kendoSearchDialog.options.visible && (this.storeDialogPosition(),
                    this.adjustDialogPosition())
                }
                ))
            }
            closeAndClear() {
                this.searchMetadataRequested || (this.toggle(!1),
                this.searchMetadataLoaded = !1)
            }
            toggleSearchDialog(e) {
                if ((this.dialogVisible = e,
                e) && (this.viewerOptions.searchMetadataOnDemand && !this.searchMetadataLoaded))
                    return this.searchMetadataRequested = !0,
                    this.controller.reportLoadComplete(( (e, t) => {
                        this.searchMetadataRequested && (this.toggle(!0),
                        this.searchMetadataRequested = !1)
                    }
                    )),
                    void this.controller.refreshReport(!0);
                this.toggle(e)
            }
            toggle(e) {
                this.dialogVisible = e,
                e ? (this.searchMetadataLoaded = !0,
                this.ensureInitialized(),
                this.kendoSearchDialog.open(),
                this.kendoComboBox.value(""),
                this.updateResultsUI(null),
                this.toggleErrorLabel(!1, null)) : (this.clearColoredItems(),
                this.kendoSearchDialog && this.kendoSearchDialog.options.visible && this.kendoSearchDialog.close())
            }
            ensureInitialized() {
                if (!this.initialized) {
                    this.$element = $(this.element),
                    this.$inputBox = this.$element.find(".trv-search-dialog-input-box"),
                    this.$resultsLabel = this.$element.find(".trv-search-dialog-results-label"),
                    this.$resultsPlaceholder = this.$element.find(".trv-search-dialog-results-area"),
                    this.initResultsArea(),
                    bt(this.$element);
                    try {
                        this.$searchOptionsPlaceholder = this.$element.find(".trv-search-dialog-search-options").kendoMenu(),
                        this.$stopSearchPlaceholder = this.$element.find(".trv-search-dialog-stopsearch-placeholder").kendoMenu(),
                        this.$navigationPlaceholder = this.$element.find(".trv-search-dialog-navigational-buttons").kendoMenu()
                    } catch (e) {
                        throw console.error("Instantiation of Kendo Menu for Search Dialog threw an exception", e),
                        e
                    }
                    this.searchOptionsMenu = this.$searchOptionsPlaceholder.data("kendoMenu"),
                    this.stopSearchMenu = this.$stopSearchPlaceholder.data("kendoMenu"),
                    this.navigationMenu = this.$navigationPlaceholder.data("kendoMenu"),
                    this.searchOptionsMenu.element.on("keydown", this.onKeyDown),
                    this.stopSearchMenu.element.on("keydown", this.onKeyDown),
                    this.navigationMenu.element.on("keydown", this.onKeyDown),
                    this.overrideDefaultMenuStyling(".trv-search-dialog-search-options");
                    try {
                        this.kendoComboBox = this.$inputBox.kendoComboBox({
                            dataTextField: "value",
                            dataValueField: "value",
                            dataSource: this.mruList,
                            contentElement: "",
                            change: this.kendoComboBoxSelect.bind(this),
                            ignoreCase: !1,
                            filtering: this.onInputFiltering.bind(this),
                            filter: "startswith",
                            delay: 1e3,
                            open: e => {
                                this.inputComboRebinding && e.preventDefault()
                            }
                            ,
                            select: this.processComboBoxEvent.bind(this)
                        }).data("kendoComboBox")
                    } catch (e) {
                        throw console.error("Instantiation of Kendo ComboBox as search input threw an exception", e),
                        e
                    }
                    try {
                        this.kendoSearchDialog = this.reportViewerWrapper.find(".trv-search-window").kendoWindow({
                            title: q.searchDialogTitle,
                            height: 390,
                            width: 310,
                            minWidth: 310,
                            minHeight: 390,
                            maxHeight: 700,
                            scrollable: !1,
                            close: () => {
                                this.storeDialogPosition(),
                                this.lastSearch = ""
                            }
                            ,
                            open: () => {
                                this.adjustDialogPosition()
                            }
                            ,
                            deactivate: () => {
                                this.controller.setSearchDialogVisible({
                                    visible: !1
                                })
                            }
                            ,
                            activate: () => {
                                this.kendoComboBox.input.focus()
                            }
                        }).data("kendoWindow")
                    } catch (e) {
                        throw console.error("Instantiation of Kendo Window for Search dialog threw an exception", e),
                        e
                    }
                    this.kendoSearchDialog.wrapper.addClass("trv-search"),
                    this.initCommands(),
                    this.initialized = !0
                }
            }
            overrideDefaultMenuStyling(e) {
                for (var t = $(e).find(".k-menu-item"), r = 0; r < t.length; r++)
                    $(t[r]).removeClass("k-item")
            }
            onKeyDown(e) {
                var t = $(e.target).find(".k-focus");
                if (13 === e.keyCode && t && t.length > 0) {
                    var r = t.children("a");
                    r.length > 0 && r.click()
                }
            }
            storeDialogPosition() {
                var e = this.kendoSearchDialog.element.parent(".k-window");
                this.windowLocation = e.offset()
            }
            adjustDialogPosition() {
                var e = $(window).innerWidth()
                  , t = $(window).innerHeight()
                  , r = this.kendoSearchDialog.wrapper
                  , n = r.outerWidth(!0)
                  , a = r.outerHeight(!0)
                  , i = 10;
                if (this.windowLocation) {
                    var o = this.windowLocation.left
                      , s = this.windowLocation.top
                      , l = s + a;
                    o + n > e - i && (o = Math.max(i, e - n - i),
                    r.css({
                        left: o
                    }),
                    this.kendoSearchDialog.setOptions({
                        position: {
                            left: o
                        }
                    })),
                    l > t - i && (s = Math.max(i, t - a - i),
                    r.css({
                        top: s
                    }),
                    this.kendoSearchDialog.setOptions({
                        position: {
                            top: s
                        }
                    }))
                } else {
                    var c = this.reportViewerWrapper[0].getBoundingClientRect();
                    r.css({
                        top: c.top + i,
                        left: c.right - n - i
                    }),
                    this.kendoSearchDialog.setOptions({
                        position: {
                            top: c.top + i,
                            left: c.right - n - i
                        }
                    })
                }
            }
            processComboBoxEvent(e) {
                if (window.event || window.event.type) {
                    var t = window.event;
                    "keydown" === t.type && (e.preventDefault(),
                    40 === t.keyCode && this.moveListSelection(1),
                    38 === t.keyCode && this.moveListSelection(-1))
                }
            }
            initCommands() {
                this.optionsCommandSet = {
                    searchDialog_MatchCase: new ce,
                    searchDialog_MatchWholeWord: new ce,
                    searchDialog_UseRegex: new ce
                },
                Object.entries(this.optionsCommandSet).forEach(( ([e,t]) => {
                    t.exec = () => {
                        this.toggleCommand(t)
                    }
                }
                )),
                ee.attachCommands(this.$searchOptionsPlaceholder, this.optionsCommandSet, this.viewerOptions),
                this.stopSearchCommand = new ce(( () => {
                    this.stopSearch()
                }
                )),
                ee.attachCommands(this.$stopSearchPlaceholder, {
                    searchDialog_StopSearch: this.stopSearchCommand
                }, this.viewerOptions),
                this.navigationCommandSet = {
                    searchDialog_NavigateUp: new ce(( () => {
                        this.moveListSelection(-1)
                    }
                    )),
                    searchDialog_NavigateDown: new ce(( () => {
                        this.moveListSelection(1)
                    }
                    ))
                },
                ee.attachCommands(this.$navigationPlaceholder, this.navigationCommandSet, this.viewerOptions)
            }
            initResultsArea() {
                try {
                    this.$resultsPlaceholder.kendoListView({
                        selectable: !0,
                        navigatable: !0,
                        dataSource: {},
                        contentElement: "",
                        template: "<div class='trv-search-dialog-results-row'><span>#: description #</span> <span class='trv-search-dialog-results-pageSpan'>" + q.searchDialogPageText + " #:page#</span></div>",
                        change: e => {
                            var t = e.sender
                              , r = t.select().index()
                              , n = t.dataSource.view()
                              , a = n[r];
                            this.onSelectedItem(a),
                            this.updateUI(r, n.length)
                        }
                    })
                } catch (e) {
                    throw console.error("Instantiation of Kendo ListView as search result area threw an exception", e),
                    e
                }
            }
            stopSearch() {
                this.setStopButtonEnabledState(!1)
            }
            toggleCommand(e) {
                e.checked(!e.checked()),
                this.searchForCurrentToken()
            }
            setStopButtonEnabledState(e) {
                this.stopSearchCommand.enabled(e)
            }
            onPageReady(e, t) {
                this.dialogVisible && this.colorPageElements(this.searchResults)
            }
            onInputFiltering(e) {
                e.preventDefault(),
                e.filter && e.filter.value !== this.lastSearch && (this.lastSearch = e.filter.value,
                this.searchForToken(this.lastSearch))
            }
            kendoComboBoxSelect(e) {
                var t = e.sender.value();
                t && this.lastSearch !== t && (this.lastSearch = t,
                this.searchForToken(this.lastSearch))
            }
            searchForCurrentToken() {
                this.kendoComboBox && this.searchForToken(this.kendoComboBox.value())
            }
            searchForToken(e) {
                this.onSearchStarted(),
                this.addToMRU(e),
                this.controller.getSearchResults({
                    searchToken: e,
                    matchCase: this.optionsCommandSet.searchDialog_MatchCase.checked(),
                    matchWholeWord: this.optionsCommandSet.searchDialog_MatchWholeWord.checked(),
                    useRegex: this.optionsCommandSet.searchDialog_UseRegex.checked()
                }).then((e => {
                    this.updateResultsUI(e, null)
                }
                )).catch((e => {
                    e && this.updateResultsUI(null, e)
                }
                ))
            }
            onSearchStarted() {
                this.$resultsLabel.text(q.searchDialogSearchInProgress),
                this.clearColoredItems(),
                this.searchResults = null,
                this.setStopButtonEnabledState(!0),
                this.toggleErrorLabel(!1, null)
            }
            updateResultsUI(e, t) {
                this.setStopButtonEnabledState(!1),
                t && this.toggleErrorLabel(!0, t),
                this.displayResultsList(e),
                this.searchResults = e,
                e && e.length > 0 ? (this.colorPageElements(e),
                this.selectFirstElement()) : this.updateUI(-1, 0)
            }
            addToMRU(e) {
                if (e && "" !== e) {
                    var t = this.mruList.filter((t => t.value === e));
                    t && t.length > 0 || (this.mruList.unshift({
                        value: e
                    }),
                    this.mruList.length > 10 && this.mruList.pop(),
                    this.inputComboRebinding = !0,
                    this.kendoComboBox.dataSource.data(this.mruList),
                    this.kendoComboBox.select((t => t.value === e)),
                    this.inputComboRebinding = !1)
                }
            }
            displayResultsList(e) {
                e || (e = []),
                this.$resultsPlaceholder.data("kendoListView").dataSource.data(e)
            }
            colorPageElements(e) {
                if (e && 0 !== e.length) {
                    var t = this.$element.parent().find(".trv-page-container").find("[data-search-id]");
                    Array.from(e).forEach((e => {
                        var r = t.filter("[data-search-id=" + e.id + "]");
                        r && (r.addClass(this.highlightManager.shadedClassName),
                        this.highlightManager.elements.push(r))
                    }
                    )),
                    this.highlightItem(this.pendingHighlightItem),
                    this.pendingHighlightItem = null
                }
            }
            highlightItem(e) {
                if (e) {
                    var t = e.id
                      , r = $(this.highlightManager.elements.filter((e => e.attr("data-search-id") === t))).first();
                    if (r && (this.highlightManager.current = r[0],
                    this.highlightManager.current)) {
                        var n = $("[data-search-id='" + t + "']");
                        n.removeClass(this.highlightManager.shadedClassName),
                        n.addClass(this.highlightManager.highlightedClassName)
                    }
                }
            }
            selectFirstElement() {
                var e = this.$resultsPlaceholder.data("kendoListView")
                  , t = e.element.children().first();
                e.select(t),
                e.trigger("change")
            }
            onSelectedItem(e) {
                e && (this.highlightManager.current && (this.highlightManager.current.removeClass(this.highlightManager.highlightedClassName),
                this.highlightManager.current.addClass(this.highlightManager.shadedClassName)),
                e.page === this.controller.getCurrentPageNumber() ? this.highlightItem(e) : this.controller.getPageMode() !== ne.CONTINUOUS_SCROLL ? this.clearColoredItems() : this.highlightItem(e),
                this.pendingHighlightItem = e,
                this.controller.navigateToPage(e.page, {
                    type: "search",
                    id: e.id
                }))
            }
            updateUI(e, t) {
                var r = 0 === t ? q.searchDialogNoResultsLabel : u(q.searchDialogResultsFormatLabel, [e + 1, t]);
                this.$resultsLabel.text(r);
                var n = e > 0
                  , a = e < t - 1;
                this.navigationCommandSet.searchDialog_NavigateUp.enabled(n),
                this.navigationCommandSet.searchDialog_NavigateDown.enabled(a)
            }
            clearColoredItems() {
                this.highlightManager.elements && this.highlightManager.elements.length > 0 && Array.from(this.highlightManager.elements).forEach((e => {
                    e.removeClass(this.highlightManager.shadedClassName)
                }
                )),
                this.highlightManager.current && this.highlightManager.current.removeClass(this.highlightManager.highlightedClassName),
                this.highlightManager.elements = [],
                this.highlightManager.current = null
            }
            moveListSelection(e) {
                var t = this.$resultsPlaceholder.data("kendoListView")
                  , r = t.select();
                if (r) {
                    var n = t.select().trigger("change").index()
                      , a = t.dataSource.view()
                      , i = Math.min(a.length - 1, Math.max(0, n + e));
                    if (i !== n) {
                        var o = a[i]
                          , s = t.element.find('[data-uid="' + o.uid + '"]');
                        s && (t.select(s),
                        t.trigger("change"),
                        this.scrollIfNeeded(s[0], t.element[0]))
                    }
                } else
                    r = t.element.children().first(),
                    t.select(r),
                    t.trigger("change")
            }
            scrollIfNeeded(e, t) {
                if (e.offsetTop - e.clientHeight < t.scrollTop)
                    e.scrollIntoView();
                else {
                    var r = e.offsetTop + e.offsetHeight;
                    r > t.scrollTop + t.offsetHeight && (t.scrollTop = r - t.offsetHeight)
                }
            }
            toggleErrorLabel(e, t) {
                var r = this.$searchOptionsPlaceholder.find("i[data-role='telerik_ReportViewer_SearchDialog_Error']");
                if (r && 0 !== r.length) {
                    var n = this.$searchOptionsPlaceholder.data("kendoMenu").element.find("li").last();
                    e ? (r[0].title = t,
                    n.show()) : n.hide()
                } else
                    console.log(t)
            }
        }
    }, {
        name: "telerik_ReportViewer_SendEmail",
        constructor: function(e, t, r) {
            var n, a, i, o, s, l, c, u, d, f, p, h, g, m = (t = $.extend({}, St, t)).controller, v = !1, E = !1, b = r.viewerSelector, P = $("[data-selector='" + b + "']").find(".trv-report-viewer");
            if (!m)
                throw "No controller (telerikReporting.ReportViewerController) has been specified.";
            function T() {
                S(!1)
            }
            function S(t) {
                E = t,
                t ? (!function() {
                    if (!v) {
                        n = $(e),
                        i = n.find("[name='from']"),
                        o = n.find("[name='to']"),
                        s = n.find("[name='cc']"),
                        l = n.find("[name='subject']"),
                        u = n.find("[name='format']"),
                        d = n.find("textarea"),
                        n.find(".trv-send-email-field input").each((function() {
                            var e = $(this)
                              , t = e.attr("name");
                            e.attr("id", b + "-" + t)
                        }
                        )),
                        n.find(".trv-send-email-label label").each((function() {
                            var e = $(this)
                              , t = e.attr("for");
                            e.attr("for", b + "-" + t)
                        }
                        )),
                        h = {
                            sendEmail_Cancel: new ce((function() {
                                k()
                            }
                            )),
                            sendEmail_Send: new ce((function() {
                                var e, t, r, n, a;
                                a = {
                                    from: i.val(),
                                    to: o.val(),
                                    cc: s.val(),
                                    subject: l.val(),
                                    format: c.value(),
                                    body: _(),
                                    deviceInfo: {}
                                },
                                e = w(i) || !N(i, !1),
                                t = w(o) || !N(o, !0),
                                r = s.val().length && !N(s, !0),
                                (n = c.value().length) || M(u, "data-required-msg"),
                                !(e || t || r) && n && (m.sendReport(a),
                                k())
                            }
                            ))
                        },
                        ee.attachCommands(n.find(".trv-send-email-actions"), h, r),
                        _t(n);
                        try {
                            a = P.find(".trv-send-email-window").kendoWindow({
                                title: q.sendEmailDialogTitle,
                                minWidth: 350,
                                minHeight: 350,
                                maxHeight: 900,
                                modal: !0,
                                close: function() {
                                    C(),
                                    $(".k-invalid-msg").removeClass("-visible")
                                },
                                open: function() {
                                    I(),
                                    R()
                                },
                                deactivate: function() {
                                    m.setSendEmailDialogVisible({
                                        visible: !1
                                    })
                                },
                                activate: function() {
                                    a.wrapper.find(".trv-send-email-fields input[type='email']:visible").first().focus(),
                                    setTimeout((function() {
                                        i.off("blur").on("blur", (function(e) {
                                            w($(this)) || N($(this), !1)
                                        }
                                        )),
                                        o.off("blur").on("blur", (function(e) {
                                            w($(this)) || N($(this), !0)
                                        }
                                        )),
                                        s.off("blur").on("blur", (function(e) {
                                            $(this).val().length ? N($(this), !0) : y($(this))
                                        }
                                        ))
                                    }
                                    ), 250)
                                }
                            }).data("kendoWindow")
                        } catch (e) {
                            throw console.error("Instantiation of Kendo Window for Send Email dialog threw an exception", e),
                            e
                        }
                        a.wrapper.addClass("trv-send-email");
                        try {
                            c = u.kendoComboBox({
                                dataTextField: "localizedName",
                                dataValueField: "name",
                                dataSource: p || [],
                                filter: "startswith",
                                dataBound: function() {
                                    this.select(0),
                                    this.trigger("change")
                                }
                            }).data("kendoComboBox")
                        } catch (e) {
                            throw console.error("Instantiation of Kendo ComboBox as document format selector threw an exception", e),
                            e
                        }
                        n.on("keydown", '[name="format_input"]', (function(e) {
                            var t = 9;
                            e.keyCode === t && f && setTimeout((function() {
                                f.focus()
                            }
                            ))
                        }
                        ));
                        try {
                            f = d.kendoEditor({
                                tools: ["bold", "italic", "underline", "strikethrough", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "cleanFormatting", "formatting", "fontName", "fontSize", "foreColor", "backColor", "subscript", "superscript"]
                            }).data("kendoEditor")
                        } catch (e) {
                            throw console.error("Instantiation of Kendo Editor for Email body editor threw an exception", e),
                            e
                        }
                        A(r.sendEmail),
                        v = !0
                    }
                }(),
                A(r.sendEmail),
                a.open()) : a && a.options.visible && a.close()
            }
            function _() {
                return f ? f.value() : ""
            }
            function C() {
                var e = a.element.parent(".k-window");
                g = e.offset()
            }
            function I() {
                var e = a.element.parent(".k-window")
                  , t = 350;
                $(window).width() > 800 && (t = 720),
                e.css({
                    width: t
                }),
                a.refresh({
                    width: t
                })
            }
            function R() {
                if (g) {
                    var e = 10
                      , t = $(window).innerWidth()
                      , r = $(window).innerHeight()
                      , n = a.wrapper
                      , i = n.outerWidth(!0)
                      , o = n.outerHeight(!0)
                      , s = g.left
                      , l = g.top
                      , c = l + o;
                    s + i > t - e && (s = Math.max(e, t - i - e),
                    n.css({
                        left: s
                    }),
                    a.setOptions({
                        position: {
                            left: s
                        }
                    })),
                    c > r - e && (l = Math.max(e, r - o - e),
                    n.css({
                        top: l
                    }),
                    a.setOptions({
                        position: {
                            top: l
                        }
                    }))
                } else
                    a.center()
            }
            function A(e) {
                i.val(e && e.from || ""),
                o.val(e && e.to || ""),
                s.val(e && e.cc || ""),
                l.val(e && e.subject || ""),
                e && e.format ? c.value(e.format) : c.select(0),
                c.trigger("change"),
                f.value(e && e.body || "")
            }
            function w(e) {
                return e.val().length ? (y(e),
                !1) : (M(e, "data-required-msg"),
                !0)
            }
            function M(e, t) {
                var r = q[e.attr(t)];
                $('[data-for="' + e.attr("name") + '"]').addClass("-visible").text(r)
            }
            function y(e) {
                $('[data-for="' + e.attr("name") + '"]').removeClass("-visible")
            }
            function N(e, t) {
                var r = e.val();
                if (t) {
                    for (var n = r.split(/[\s,;]+/), a = 0; a < n.length; a++)
                        if (!D(n[a].trim(), e))
                            return !1;
                    return !0
                }
                return D(r, e)
            }
            function D(e, t) {
                return e.indexOf(",") > -1 || e.indexOf(";") > -1 ? (M(t, "data-single-email-msg"),
                !1) : !!/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(e) || (M(t, "data-email-msg"),
                !1)
            }
            function k() {
                a.close()
            }
            r.sendEmail && r.sendEmail.enabled ? (m.beginLoadReport(T).viewModeChanged(T),
            m.getSendEmailDialogState((function(e, t) {
                t.visible = E
            }
            )).setSendEmailDialogVisible((function(e, t) {
                S(t.visible)
            }
            )).setSearchDialogVisible((function(e, t) {
                t.visible && E && S(!E)
            }
            )),
            m.getDocumentFormats().then((function(e) {
                p = e
            }
            )),
            $(window).resize((function() {
                a && a.options.visible && (C(),
                I(),
                R())
            }
            ))) : $("[data-selector='" + b + "']").find("a[data-command='telerik_ReportViewer_toggleSendEmailDialog']").closest(".k-item ").hide()
        }
    }, {
        name: "telerik_ReportViewer_SideMenu",
        constructor: function(e, t, r) {
            var n, a = $.extend({}, t, r), i = $(e).data("kendoMenu"), o = a.enableAccessibility, s = 3, l = !1, c = a.controller;
            if (!c)
                throw "No controller (telerikReporting.ReportViewerController) has been specified.";
            function d(e) {
                var t = $(e.item);
                n.unbind("expand", d),
                n.append({
                    text: q.loadingFormats,
                    spriteCssClass: "k-icon k-loading"
                }, t),
                a.controller.getDocumentFormats().then(f).then((function() {
                    n.expand(t)
                }
                )).then((function() {
                    n.bind("expand", d)
                }
                ))
            }
            function f(t) {
                Array.from($(e).find("ul[data-command-list=export-format-list]")).forEach((e => {
                    var r = $(e)
                      , a = r.parents("li")
                      , i = a.attr("tabindex");
                    i || (i = s),
                    r.empty(),
                    Array.from(t).forEach((e => {
                        var t = "<li " + (o ? u('aria-label="{localizedName}" ', e) : " ") + u('tabindex="' + i + '"><a tabindex="-1" href="#" data-command="telerik_ReportViewer_export" data-command-parameter="{name}"><span>{localizedName}</span></a></li>', e);
                        n.append(t, a)
                    }
                    )),
                    h(a.find("li"), i),
                    p(a)
                }
                ))
            }
            function p(e) {
                Array.from(e.find("li")).forEach((e => {
                    0 === $(e).children("ul").length && $(e).children("a").on("click", (e => {
                        c.setSideMenuVisible({
                            visible: !l
                        })
                    }
                    ))
                }
                ))
            }
            function h(e, t) {
                e.attr("tabindex", t);
                var r = e.find("li");
                Array.from(r).forEach((e => {
                    var r = $(e);
                    r.attr("tabindex", t);
                    var n = r.children("a");
                    n.length > 0 && $(n).attr("tabindex", -1);
                    r.on("focus", (e => {
                        var t = r.children("a");
                        t.length > 0 && t.addClass("k-focus")
                    }
                    )),
                    r.on("blur", (e => {
                        var t = r.children("a");
                        t.length > 0 && t.removeClass("k-focus")
                    }
                    )),
                    r.off("keydown", m),
                    r.on("keydown", m)
                }
                ))
            }
            function g(e) {
                if (e.which == kendo.keys.ENTER) {
                    var t, r = !1, a = document.activeElement;
                    if (a && "li" == a.localName)
                        for (var i = n.element.find("li.k-item"), o = 0; o < i.length; o++) {
                            var s = i[o];
                            if (a === s) {
                                t = $(s),
                                r = !0;
                                break
                            }
                        }
                    else
                        t = n.select();
                    if (!t || !t.length > 0)
                        return;
                    v(t, r)
                }
            }
            function m(e) {
                e.which == kendo.keys.ENTER && v($(e.target), !1)
            }
            function v(e, t) {
                if (!(!e.length > 0))
                    if (0 === e.children("ul").length) {
                        var r = e.find("a");
                        r.length > 0 && r[0].click()
                    } else
                        t && (e.hasClass("k-active") ? n.collapse(e) : n.expand(e))
            }
            i || function(e) {
                var t = $(e);
                try {
                    n = t.children("ul").kendoPanelBar().data("kendoPanelBar")
                } catch (e) {
                    throw console.error("Instantiation of Kendo PanelBar as side menu threw an exception", e),
                    e
                }
                n.bind("expand", d),
                n.element.off("keydown", g),
                n.element.on("keydown", g),
                function(e) {
                    if (!e)
                        return;
                    var t = e.children("ul")
                      , r = e.attr("tabindex");
                    h(t, r || s)
                }(t),
                p(t),
                t.click((function(t) {
                    t.target == e && c.setSideMenuVisible({
                        visible: !l
                    })
                }
                )),
                function() {
                    var e = $("div[data-role=telerik_ReportViewer_SideMenu] > ul");
                    if (!e)
                        return;
                    Array.from(e).forEach((e => {
                        var t = $(e)
                          , r = t.children("li.k-panelbar-header");
                        t.attr("aria-label", q[t.attr("aria-label")]),
                        Array.from(r).forEach((e => {
                            var t = $(e)
                              , r = t.find("a");
                            if (t.attr("aria-label", q[t.attr("aria-label")]),
                            r) {
                                var n = r.find("span:not(.k-icon)");
                                r.attr("title", q[r.attr("title")]),
                                n && n.text(q[n.text()])
                            }
                        }
                        ))
                    }
                    ))
                }()
            }(e),
            c.setSideMenuVisible((function(e, t) {
                var r;
                (r = n.element.parent()).position().left < 0 || !r.is(":visible") ? r.show() : window.setTimeout((function() {
                    r.hide()
                }
                ), 500),
                o && n.element.focus(),
                (l = t.visible) || n.collapse($("#trv-side-menu-export-command"))
            }
            )).getSideMenuVisible((function(e, t) {
                t.visible = l
            }
            ))
        }
    }, {
        name: "telerik_ReportViewer_LinkButton",
        constructor: class extends Lt {
            constructor(e, t) {
                super(e, t),
                Ot(this, "cmd");
                var r = this.$element.attr("data-command");
                r && (this.cmd = this.options.commands[r]),
                this.cmd && (this.$element.on("click", (e => {
                    this.cmd.enabled() ? this.cmd.exec($(this).attr("data-command-parameter")) : e.preventDefault()
                }
                )),
                $(this.cmd).on("enabledChanged", (e => {
                    (this.cmd.enabled() ? $.fn.removeClass : $.fn.addClass).call(this.$element, "disabled")
                }
                )).on("checkedChanged", (e => {
                    (this.cmd.checked() ? $.fn.addClass : $.fn.removeClass).call(this.$element, "checked")
                }
                )))
            }
        }
    }, {
        name: "telerik_ReportViewer_PageNumberInput",
        constructor: class extends Lt {
            constructor(e, t) {
                super(e, t),
                Ft(this, "cmd"),
                Ft(this, "_numeric"),
                this.cmd = this.options.commands.goToPage,
                this._numeric = new kendo.ui.NumericTextBox(this.element,{
                    format: "0",
                    decimals: 0,
                    min: 0,
                    spinners: !1,
                    change: this._onChange.bind(this),
                    spin: this._onChange.bind(this)
                }),
                this._numeric._text[0].dataset.role = "telerik_ReportViewer_PageNumberInput",
                this._numeric.element[0].dataset.role = "",
                this.options.controller.on("reportLoadComplete", ( (e, t) => {
                    this._numeric.max(t.pageCount),
                    this._numeric.min(Math.min(1, t.pageCount)),
                    this._numeric.value(Math.min(1, t.pageCount))
                }
                )).on("loadedReportChange", (e => {
                    this._numeric.min(0),
                    this._numeric.max(0),
                    this._numeric.value(0)
                }
                )).on("renderingStopped", (e => {
                    this._numeric.min(0),
                    this._numeric.max(0),
                    this._numeric.value(0)
                }
                )).pageNumberChange(( (e, t) => {
                    this._numeric.value(t)
                }
                ))
            }
            _onChange(e, t) {
                var r = f(this._numeric.value());
                isNaN(r) || this.cmd.exec(r)
            }
            _onSpin(e, t) {
                return this._onChange(e, t)
            }
        }
    }, {
        name: "telerik_ReportViewer_PageCountLabel",
        constructor: class extends Lt {
            constructor(e, t) {
                super(e, t),
                this.options.controller.pageCountChange(( (e, t) => {
                    this.$element.text(t)
                }
                ))
            }
        }
    }];
    return Ht.forEach((e => {
        $.fn[e.name] = function(t, r) {
            return this.each((function() {
                $.data(this, e.name) || $.data(this, e.name, new e.constructor(this,t,r))
            }
            ))
        }
    }
    )),
    e.Accessibility = Z,
    e.Binder = ee,
    e.CommandSet = fe,
    e.DocumentMapAreaPositions = le,
    e.Events = Me,
    e.GlobalSettings = Q,
    e.HistoryManager = ye,
    e.PageModes = ne,
    e.PagesArea = Le,
    e.ParameterEditorTypes = oe,
    e.ParameterEditors = Ye,
    e.ParameterTypes = ie,
    e.ParameterValidators = be,
    e.ParametersArea = vt,
    e.ParametersAreaPositions = se,
    e.PerspectiveManager = Xe,
    e.PrintManager = Ee,
    e.PrintModes = re,
    e.ReportViewer = Ut,
    e.ReportViewerController = Re,
    e.ScaleModes = ae,
    e.Scroll = De,
    e.ServiceClient = ct,
    e.TouchBehavior = Ne,
    e.UIController = ut,
    e.UIFreezeCoordinator = $e,
    e.ViewModes = te,
    e.domUtils = K,
    e.parameterEditorsMatch = Oe,
    e.utils = G,
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e
}({});
 