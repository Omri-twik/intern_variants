
const sold_out_phrases = ['sold out', 'out of stock', 'unavailable', 'sold_out', 'out_of_stock'];


! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function(e, t, n) {
    "use strict";
    var r;
    let o, i;

    function u(e, t) {
        if (e.nodeType !== Node.ELEMENT_NODE) throw new Error("Can't generate CSS selector for non-element node type.");
        if ("html" === e.tagName.toLowerCase()) return "html";
        const n = {
            root: document.body,
            idName: e => !0,
            className: e => !0,
            tagName: e => !0,
            attr: (e, t) => !1,
            seedMinLength: 1,
            optimizedMinLength: 2,
            threshold: 1e3,
            maxNumberOfTries: 1e4
        };
        o = Object.assign(Object.assign({}, n), t), i = function(e, t) {
            if (e.nodeType === Node.DOCUMENT_NODE) return e;
            if (e === t.root) return e.ownerDocument;
            return e
        }(o.root, n);
        let u = l(e, r.All, () => l(e, r.Two, () => l(e, r.One)));
        if (u) {
            const t = S(function* e(t, n, r = {
                counter: 0,
                visited: new Map
            }) {
                if (t.length > 2 && t.length > o.optimizedMinLength)
                    for (let i = 1; i < t.length - 1; i++) {
                        if (r.counter > o.maxNumberOfTries) return;
                        r.counter += 1;
                        const u = [...t];
                        u.splice(i, 1);
                        const l = a(u);
                        if (r.visited.has(l)) return;
                        s(u) && b(u, n) && (yield u, r.visited.set(l, !0), yield* e(u, n, r))
                    }
            }(u, e));
            return t.length > 0 && (u = t[0]), a(u)
        }
        throw new Error("Selector was not found.")
    }

    function l(e, t, n) {
        let i = null,
            u = [],
            l = e,
            a = 0;
        for (; l && l !== o.root.parentElement;) {
            let e = O(d(l)) || O(...p(l)) || O(...h(l)) || O(g(l)) || [{
                name: "*",
                penalty: 3
            }];
            const f = m(l);
            if (t === r.All) f && (e = e.concat(e.filter(N).map(e => D(e, f))));
            else if (t === r.Two) e = e.slice(0, 1), f && (e = e.concat(e.filter(N).map(e => D(e, f))));
            else if (t === r.One) {
                const [t] = e = e.slice(0, 1);
                f && N(t) && (e = [D(t, f)])
            }
            for (let t of e) t.level = a;
            if (u.push(e), u.length >= o.seedMinLength && (i = c(u, n), i)) break;
            l = l.parentElement, a++
        }
        return i || (i = c(u, n)), i
    }

    function c(e, t) {
        const n = S(function* e(t, n = []) {
            if (t.length > 0)
                for (let r of t[0]) yield* e(t.slice(1, t.length), n.concat(r));
            else yield n
        }(e));
        if (n.length > o.threshold) return t ? t() : null;
        for (let e of n)
            if (s(e)) return e;
        return null
    }

    function a(e) {
        let t = e[0],
            n = t.name;
        for (let r = 1; r < e.length; r++) {
            const o = e[r].level || 0;
            n = t.level === o - 1 ? `${e[r].name} > ${n}` : `${e[r].name} ${n}`, t = e[r]
        }
        return n
    }

    function f(e) {
        return e.map(e => e.penalty).reduce((e, t) => e + t, 0)
    }

    function s(e) {
        switch (i.querySelectorAll(a(e)).length) {
            case 0:
                throw new Error("Can't select any node with this selector: " + a(e));
            case 1:
                return !0;
            default:
                return !1
        }
    }

    function d(e) {
        const t = e.getAttribute("id");
        return t && o.idName(t) ? {
            name: "#" + L(t, {
                isIdentifier: !0
            }),
            penalty: 0
        } : null
    }

    function p(e) {
        return Array.from(e.attributes).filter(e => o.attr(e.name, e.value)).map(e => ({
            name: "[" + L(e.name, {
                isIdentifier: !0
            }) + '="' + L(e.value) + '"]',
            penalty: .5
        }))
    }

    function h(e) {
        return Array.from(e.classList).filter(o.className).map(e => ({
            name: "." + L(e, {
                isIdentifier: !0
            }),
            penalty: 1
        }))
    }

    function g(e) {
        const t = e.tagName.toLowerCase();
        return o.tagName(t) ? {
            name: t,
            penalty: 2
        } : null
    }

    function m(e) {
        const t = e.parentNode;
        if (!t) return null;
        let n = t.firstChild;
        if (!n) return null;
        let r = 0;
        for (; n && (n.nodeType === Node.ELEMENT_NODE && r++, n !== e);) n = n.nextSibling;
        return r
    }

    function D(e, t) {
        return {
            name: e.name + `:nth-child(${t})`,
            penalty: e.penalty + 1
        }
    }

    function N(e) {
        return "html" !== e.name && !e.name.startsWith("#")
    }

    function O(...e) {
        const t = e.filter(y);
        return t.length > 0 ? t : null
    }

    function y(e) {
        return null != e
    }

    function S(e) {
        return Array.from(e).sort((e, t) => f(e) - f(t))
    }

    function b(e, t) {
        return i.querySelector(a(e)) === t
    }
    n.r(t),
        function(e) {
            e[e.All = 0] = "All", e[e.Two = 1] = "Two", e[e.One = 2] = "One"
        }(r || (r = {}));
    const A = /[ -,\.\/:-@\[-\^`\{-~]/,
        E = /[ -,\.\/:-@\[\]\^`\{-~]/,
        M = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g,
        v = {
            escapeEverything: !1,
            isIdentifier: !1,
            quotes: "single",
            wrap: !1
        };

    function L(e, t = {}) {
        const n = Object.assign(Object.assign({}, v), t);
        "single" != n.quotes && "double" != n.quotes && (n.quotes = "single");
        const r = "double" == n.quotes ? '"' : "'",
            o = n.isIdentifier,
            i = e.charAt(0);
        let u = "",
            l = 0;
        const c = e.length;
        for (; l < c;) {
            const t = e.charAt(l++);
            let i = t.charCodeAt(0),
                a = void 0;
            if (i < 32 || i > 126) {
                if (i >= 55296 && i <= 56319 && l < c) {
                    const t = e.charCodeAt(l++);
                    56320 == (64512 & t) ? i = ((1023 & i) << 10) + (1023 & t) + 65536 : l--
                }
                a = "\\" + i.toString(16).toUpperCase() + " "
            } else a = n.escapeEverything ? A.test(t) ? "\\" + t : "\\" + i.toString(16).toUpperCase() + " " : /[\t\n\f\r\x0B]/.test(t) ? "\\" + i.toString(16).toUpperCase() + " " : "\\" == t || !o && ('"' == t && r == t || "'" == t && r == t) || o && E.test(t) ? "\\" + t : t;
            u += a
        }
        return o && (/^-[-\d]/.test(u) ? u = "\\-" + u.slice(1) : /\d/.test(i) && (u = "\\3" + i + " " + u.slice(1))), u = u.replace(M, (function(e, t, n) {
            return t && t.length % 2 ? e : (t || "") + n
        })), !o && n.wrap ? r + u + r : u
    }

    function R(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function T(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? R(Object(n), !0).forEach((function(t) {
                P(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : R(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
        }
        return e
    }

    function P(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }
    var C = ["\\$", "د.إ", "NAƒ", "ƒ", "৳", ".د.ب", "¥", "Col$", "₡", "Kč", "RD$", "د.ج", "£", "€", "FJ$", "£", "£", "GH₵", "£", "GY$", "HK$", "₪", "₹", "د.ع", "J$", "¥", "сом", "៛", "KY$", "£", "L$", "₮", "N$", "₦", "C$", "NZ$", "₱", "zł", "₲", "SI$", "S$", "£", "฿", "TT$", "NT$", "US$", "$U", "₫", "WS$", "EC$", "Z$"],
        K = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUC", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EEK", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GQE", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZM", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEB", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMK", "ZWR"],
        w = ["DIV", "MAIN", "SECTION", "UL", "OL", "LI", "FORM", "ARTICLE"],
        B = function(e) {
            return e.filter((function(e) {
                return w.includes(e.nodeName)
            }))
        },
        $ = function(e) {
            var t = G(e),
                n = 0,
                r = "";
            for (var o in t) {
                var i = t[o].reduce((function(e, t) {
                    return e + t.count
                }), 0);
                i > n && (n = i, r = o)
            }
            return t[r].map((function(e) {
                return e.el
            }))
        },
        j = function(e, t) {
            var n = {};
            return e.forEach((function(e) {
                var r, o = 0;
                t.forEach((function(n) {
                    new RegExp(t === K ? "\\b".concat(n, "\\b") : n, "g");
                    var i = e.innerText.match();
                    i = i && i.length || 0, (i *= 6) > o && (o = i, r = n)
                })), o > 0 && (n[r] = n[r] ? n[r].concat({
                    el: e,
                    count: o
                }) : [{
                    el: e,
                    count: o
                }])
            })), n
        },
        G = function(e) {
            return T(T({}, j(e, K)), j(e, C))
        },
        I = function(e) {
            var t, n = !1,
                r = 0;
            return e.forEach((function(e, o) {
                var i = e.getBoundingClientRect(),
                    u = i.height + i.width;
                o > 0 && Math.abs(u - r) > 200 && (n = !0), u - 200 > r && (t = e, r = u)
            })), n && t
        },
        U = function(e) {
            var t = {};
            e.forEach((function(e) {
                0 !== e.clientHeight && (t[e.nodeName] ? t[e.nodeName].push(e) : t[e.nodeName] = [e])
            }));
            var n = 0,
                r = "",
                o = [],
                i = "";
            return Object.keys(t).forEach((function(e) {
                t[e].length > n && (n = t[e].length, r = e, t[e].forEach((function(e) {
                    o = o.length ? o.filter((function(t) {
                        return Array.from(e.classList).includes(t)
                    })) : Array.from(e.classList)
                })))
            })), o.length && (i = o.reduce((function(e, t) {
                return isNaN(t[0]) ? e + "." + t : e
            }), "")), r + i
        },
        F = function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document.body,
                n = Array.from(t.children);
            if (n = B(n), 0 === (n = $(n)).length) return !1;
            if (1 === n.length) return e(n[0]);
            var r = I(n);
            return r ? e(r) : u(t) + " " + U(n)
        }();
    console.log("Selector:", F)

    let items = document.querySelectorAll(F)
    
    let count = 0;
    //loop through items on page and remove those containing a sold out phrase
    for (let i of items) {
        let sold_out = false;
        let innerString = String(i['innerHTML']).toLowerCase();
        for (let phrase of sold_out_phrases) {
            if (innerString.indexOf(phrase) != -1) {
                sold_out = true;
            }
        }

        if (sold_out == true) {
            i.remove();
            console.log("[-] Sold out item removed");
            count += 1;
        }
    }
    console.log("Items removed: " + count);

}]);

