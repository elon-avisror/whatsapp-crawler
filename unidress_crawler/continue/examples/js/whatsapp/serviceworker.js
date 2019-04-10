/*! Copyright (c) 2015 WhatsApp Inc.  All Rights Reserved. */
!(function(e) {
  function t(n) {
    if (r[n]) return r[n].exports;
    var o = (r[n] = { exports: {}, id: n, loaded: !1 });
    return e[n].call(o.exports, o, o.exports, t), (o.loaded = !0), o.exports;
  }
  var r = {};
  return (
    (t.m = e),
    (t.c = r),
    (t.oe = function(e) {
      throw e;
    }),
    (t.p = "/"),
    t((t.s = 113))
  );
})([
  function(e, t, r) {
    var n = r(35)("wks"),
      o = r(22),
      i = r(3).Symbol,
      c = "function" == typeof i,
      u = (e.exports = function(e) {
        return n[e] || (n[e] = (c && i[e]) || (c ? i : o)("Symbol." + e));
      });
    u.store = n;
  },
  function(e, t) {
    var r = (e.exports = { version: "2.5.5" });
    "number" == typeof __e && (__e = r);
  },
  function(e, t) {
    "use strict";
    (t.__esModule = !0),
      (t["default"] = function(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      });
  },
  function(e, t) {
    var r = (e.exports =
      "undefined" != typeof window && window.Math == Math
        ? window
        : "undefined" != typeof self && self.Math == Math
          ? self
          : Function("return this")());
    "number" == typeof __g && (__g = r);
  },
  function(e, t, r) {
    var n = r(6),
      o = r(47),
      i = r(37),
      c = Object.defineProperty;
    t.f = r(7)
      ? Object.defineProperty
      : function(e, t, r) {
          if ((n(e), (t = i(t, !0)), n(r), o))
            try {
              return c(e, t, r);
            } catch (u) {}
          if ("get" in r || "set" in r)
            throw TypeError("Accessors not supported!");
          return "value" in r && (e[t] = r.value), e;
        };
  },
  function(e, t) {
    "use strict";
    var r = {
      REQUEST_STREAMING_INFO: "GET_STREAMING_INFO",
      REQUEST_RMR: "REQUEST_RMR",
      SEND_STREAMING_CHUNK: "SEND_STREAMING_CHUNK",
      EXP_BACKOFF: "EXP_BACKOFF",
      LOG: "LOG",
      UPLOAD_LOGS: "UPLOAD_LOGS",
      REQUEST_DOCUMENT_DOWNLOAD: "REQUEST_DOCUMENT_DOWNLOAD",
      SET_L10N: "SET_L10N",
      STREAMING_SUPPORTED: "STREAMING_SUPPORTED",
      REMOVE_PP: "REMOVE_PP",
      LOGOUT: "LOGOUT",
      CLEAN_ASSETS: "CLEAN_ASSETS"
    };
    e.exports = r;
  },
  function(e, t, r) {
    var n = r(11);
    e.exports = function(e) {
      if (!n(e)) throw TypeError(e + " is not an object!");
      return e;
    };
  },
  function(e, t, r) {
    e.exports = !r(21)(function() {
      return (
        7 !=
        Object.defineProperty({}, "a", {
          get: function() {
            return 7;
          }
        }).a
      );
    });
  },
  function(e, t) {
    var r = {}.hasOwnProperty;
    e.exports = function(e, t) {
      return r.call(e, t);
    };
  },
  function(e, t, r) {
    var n = r(3),
      o = r(1),
      i = r(28),
      c = r(10),
      u = r(8),
      a = "prototype",
      s = function(e, t, r) {
        var f,
          l,
          h,
          p = e & s.F,
          d = e & s.G,
          v = e & s.S,
          y = e & s.P,
          m = e & s.B,
          g = e & s.W,
          b = d ? o : o[t] || (o[t] = {}),
          _ = b[a],
          S = d ? n : v ? n[t] : (n[t] || {})[a];
        d && (r = t);
        for (f in r)
          (l = !p && S && void 0 !== S[f]),
            (l && u(b, f)) ||
              ((h = l ? S[f] : r[f]),
              (b[f] =
                d && "function" != typeof S[f]
                  ? r[f]
                  : m && l
                    ? i(h, n)
                    : g && S[f] == h
                      ? (function(e) {
                          var t = function(t, r, n) {
                            if (this instanceof e) {
                              switch (arguments.length) {
                                case 0:
                                  return new e();
                                case 1:
                                  return new e(t);
                                case 2:
                                  return new e(t, r);
                              }
                              return new e(t, r, n);
                            }
                            return e.apply(this, arguments);
                          };
                          return (t[a] = e[a]), t;
                        })(h)
                      : y && "function" == typeof h
                        ? i(Function.call, h)
                        : h),
              y &&
                (((b.virtual || (b.virtual = {}))[f] = h),
                e & s.R && _ && !_[f] && c(_, f, h)));
      };
    (s.F = 1),
      (s.G = 2),
      (s.S = 4),
      (s.P = 8),
      (s.B = 16),
      (s.W = 32),
      (s.U = 64),
      (s.R = 128),
      (e.exports = s);
  },
  function(e, t, r) {
    var n = r(4),
      o = r(20);
    e.exports = r(7)
      ? function(e, t, r) {
          return n.f(e, t, o(1, r));
        }
      : function(e, t, r) {
          return (e[t] = r), e;
        };
  },
  function(e, t) {
    e.exports = function(e) {
      return "object" == typeof e ? null !== e : "function" == typeof e;
    };
  },
  function(e, t) {
    e.exports = {};
  },
  function(e, t, r) {
    var n = r(61),
      o = r(29);
    e.exports = function(e) {
      return n(o(e));
    };
  },
  function(e, t, r) {
    "use strict";
    function n(e, t) {
      function r() {
        if (n) return (o = !0), n;
        var i = Array.prototype.slice.call(arguments);
        return (
          (n = new Promise(function(e, c) {
            self.setTimeout(function() {
              (n = null), o && (e(r.apply(null, i)), (o = !1)), e();
            }, t);
          })),
          Promise.resolve(e.apply(null, i))
        );
      }
      var n = void 0,
        o = void 0;
      return r;
    }
    function o(e) {
      return new Promise(function(t) {
        setTimeout(t, e);
      });
    }
    function i() {
      return 0 === g.length
        ? Promise.resolve()
        : p
            .broadcast(d.LOG, { buffer: g, level: v.LOG, message: g })
            .then(function(e) {
              g = [];
            })
            ["catch"](function() {});
    }
    function c() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return (
        t.length && g.push({ level: v.ERROR_VERBOSE, message: t }),
        (_ = _ || u())
      );
    }
    function u() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
      return b
        .then(function() {
          return p.broadcast(d.UPLOAD_LOGS, { buffer: g });
        })
        ["catch"](function(t) {
          return e < y
            ? o(m).then(function() {
                return u(e + 1);
              })
            : Promise.reject("Max generation reached. Failed to upload.");
        })
        .then(function(e) {
          return (_ = void 0), e;
        })
        ["catch"](function(e) {
          l("Unable to send upload request, error: " + e), (_ = void 0);
        });
    }
    function a() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      h(v.LOG, t);
    }
    function s() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      h(v.INFO, t);
    }
    function f() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      h(v.WARN, t);
    }
    function l() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      h(v.ERROR, t);
    }
    function h(e, t) {
      0 !== t.length && (g.push({ level: e, message: t }), (b = S()));
    }
    var p = r(15),
      d = r(5),
      v = {
        LOG: "log",
        INFO: "info",
        WARN: "warn",
        ERROR: "error",
        ERROR_VERBOSE: "errorVerbose"
      },
      y = 3,
      m = 1e3,
      g = [],
      b = Promise.resolve(),
      _ = void 0,
      S = n(i, 500);
    self.addEventListener("error", function(e) {
      c(
        "Global Scope error: " +
          e.error +
          ", stack: " +
          (e.error ? e.error.stack : "")
      );
    }),
      (e.exports = { log: a, info: s, warn: f, error: l, upload: c });
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var o = r(2),
      i = n(o),
      c = r(17),
      u = n(c),
      a = (function() {
        function e(t) {
          var r = this;
          (0, i["default"])(this, e),
            (this.onMessage = function(t) {
              if (
                t.data &&
                t.data.action &&
                t.ports.length &&
                (e.isSW() ||
                  t.source === self.navigator.serviceWorker.controller)
              ) {
                var n =
                  "function" == typeof t.waitUntil
                    ? t.waitUntil.bind(t)
                    : Promise.resolve.bind(Promise);
                n(
                  Promise.resolve(r.requestHandler(t.data))
                    .then(function(e) {
                      t.ports[0].postMessage(e);
                    })
                    ["catch"](function(e) {
                      t.ports[0].postMessage({ error: e && e.toString() });
                    })
                );
              }
            }),
            (this.requestHandler = t);
        }
        return (
          (0, u["default"])(
            e,
            [
              {
                key: "init",
                value: function() {
                  var t = e.isSW() ? self : self.navigator.serviceWorker;
                  try {
                    t.addEventListener("message", this.onMessage);
                  } catch (r) {}
                }
              }
            ],
            [
              {
                key: "isSW",
                value: function() {
                  return !self.window;
                }
              },
              {
                key: "getRequestor",
                value: function(t) {
                  return e.isSW()
                    ? "string" == typeof t
                      ? self.clients.get(t)
                      : Promise.resolve(t)
                    : self.navigator.serviceWorker.ready.then(function() {
                        return self.navigator.serviceWorker.controller;
                      });
                }
              },
              {
                key: "broadcast",
                value: function(t, r) {
                  if (!e.isSW())
                    throw new Error("Broadcast called from non-serviceworker.");
                  return self.clients.matchAll().then(function(n) {
                    return 0 === n.length
                      ? Promise.reject("No clients available.")
                      : Promise.all(
                          n.map(function(n) {
                            return e.request(n, t, r);
                          })
                        );
                  });
                }
              },
              {
                key: "request",
                value: function(t, r, n) {
                  var o = "0.3.1071",
                    i = new MessageChannel(),
                    c = new Promise(function(c, u) {
                      return (
                        (i.port1.onmessage = function(e) {
                          e.data && e.data.error ? u(e.data.error) : c(e.data);
                        }),
                        e.getRequestor(t).then(function(e) {
                          return e
                            ? void e.postMessage(
                                { action: r, message: n, version: o },
                                [i.port2]
                              )
                            : u("No ServiceWorker controlling this client.");
                        })
                      );
                    });
                  return c;
                }
              }
            ]
          ),
          e
        );
      })();
    e.exports = a;
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var o = r(2),
      i = n(o),
      c = r(17),
      u = n(c),
      a = new RegExp(
        "(" +
          self.registration.scope +
          "|https://dyn.web.whatsapp.com/)([^?]*)(?:\\?(.*))?"
      ),
      s = (function() {
        function e(t, r) {
          (0, i["default"])(this, e),
            (this.matchFetch = function() {
              return !1;
            }),
            (this.matchAction = function() {
              return !1;
            }),
            (this.matchInstall = function() {
              return !1;
            }),
            (this.matchActivate = function() {
              return !1;
            }),
            (this.cache = t),
            (this.store = r);
        }
        return (
          (0, u["default"])(e, null, [
            {
              key: "parseUrl",
              value: function(e) {
                var t = e.match(a);
                if (t) {
                  var r = void 0;
                  if (t[3]) {
                    var n = {};
                    t[3].split("&").forEach(function(e) {
                      var t = e.split("=");
                      n[t[0]] = t[1];
                    }),
                      (r = n);
                  }
                  return { base: t[1], relativePath: t[2], queryParams: r };
                }
              }
            },
            {
              key: "convertToUrl",
              value: function(e, t) {
                var r = Object.keys(t)
                  .map(function(e) {
                    return [e, t[e]].map(encodeURIComponent).join("=");
                  })
                  .join("&");
                return r.length
                  ? e.endsWith("/")
                    ? e + "?" + r
                    : e + "/?" + r
                  : e;
              }
            }
          ]),
          e
        );
      })();
    (s.RequestType = { GET: "GET" }), (e.exports = s);
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.__esModule = !0;
    var o = r(67),
      i = n(o);
    t["default"] = (function() {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            (0, i["default"])(e, n.key, n);
        }
      }
      return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    })();
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.__esModule = !0;
    var o = r(68),
      i = n(o),
      c = r(66),
      u = n(c),
      a = r(44),
      s = n(a);
    t["default"] = function(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            ("undefined" == typeof t ? "undefined" : (0, s["default"])(t))
        );
      (e.prototype = (0, u["default"])(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })),
        t && (i["default"] ? (0, i["default"])(e, t) : (e.__proto__ = t));
    };
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.__esModule = !0;
    var o = r(44),
      i = n(o);
    t["default"] = function(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t ||
        ("object" !==
          ("undefined" == typeof t ? "undefined" : (0, i["default"])(t)) &&
          "function" != typeof t)
        ? e
        : t;
    };
  },
  function(e, t) {
    e.exports = function(e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
      };
    };
  },
  function(e, t) {
    e.exports = function(e) {
      try {
        return !!e();
      } catch (t) {
        return !0;
      }
    };
  },
  function(e, t) {
    var r = 0,
      n = Math.random();
    e.exports = function(e) {
      return "Symbol(".concat(
        void 0 === e ? "" : e,
        ")_",
        (++r + n).toString(36)
      );
    };
  },
  function(e, t, r) {
    "use strict";
    var n = r(98)(!0);
    r(48)(
      String,
      "String",
      function(e) {
        (this._t = String(e)), (this._i = 0);
      },
      function() {
        var e,
          t = this._t,
          r = this._i;
        return r >= t.length
          ? { value: void 0, done: !0 }
          : ((e = n(t, r)), (this._i += e.length), { value: e, done: !1 });
      }
    );
  },
  function(e, t, r) {
    var n = r(51),
      o = r(30);
    e.exports =
      Object.keys ||
      function(e) {
        return n(e, o);
      };
  },
  function(e, t) {
    t.f = {}.propertyIsEnumerable;
  },
  function(e, t) {
    "use strict";
    function r(e) {
      var t = e.match(c);
      if (t) return { base: t[1], relativePath: t[2], queryParams: t[3] };
    }
    function n(e) {
      var t = {};
      return (
        e.split("&").forEach(function(e) {
          var r = e.split("=");
          t[r[0]] = r[1];
        }),
        t
      );
    }
    function o(e, t, r) {
      return "string" == typeof e
        ? ((r = r || {}),
          (r.credentials = "same-origin"),
          new Request(t || e, r))
        : new Request(t || e.url, {
            method: void 0 === r.method ? e.method : r.method,
            headers: void 0 === r.headers ? e.headers : r.headers,
            mode: void 0 === r.mode ? e.mode : r.mode,
            credentials: "same-origin",
            cache: void 0 === r.cache ? e.cache : r.cache,
            redirect: void 0 === r.redirect ? e.redirect : r.redirect,
            integrity: void 0 === r.integrity ? e.integrity : r.integrity
          });
    }
    function i(e) {
      return e && e.locale ? "%F0%9F%8C%90/" + e.locale : "";
    }
    var c = new RegExp(
      "(" +
        self.registration.scope +
        "|https://dyn.web.whatsapp.com/)([^?]*)(?:\\?(.*))?"
    );
    e.exports = {
      parseUrl: r,
      parseQueryParams: n,
      manuallyCloneRequest: o,
      getIndexPath: i
    };
  },
  function(e, t) {
    var r = {}.toString;
    e.exports = function(e) {
      return r.call(e).slice(8, -1);
    };
  },
  function(e, t, r) {
    var n = r(81);
    e.exports = function(e, t, r) {
      if ((n(e), void 0 === t)) return e;
      switch (r) {
        case 1:
          return function(r) {
            return e.call(t, r);
          };
        case 2:
          return function(r, n) {
            return e.call(t, r, n);
          };
        case 3:
          return function(r, n, o) {
            return e.call(t, r, n, o);
          };
      }
      return function() {
        return e.apply(t, arguments);
      };
    };
  },
  function(e, t) {
    e.exports = function(e) {
      if (void 0 == e) throw TypeError("Can't call method on  " + e);
      return e;
    };
  },
  function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
      ","
    );
  },
  function(e, t) {
    e.exports = !0;
  },
  function(e, t, r) {
    var n = r(6),
      o = r(94),
      i = r(30),
      c = r(34)("IE_PROTO"),
      u = function() {},
      a = "prototype",
      s = function() {
        var e,
          t = r(46)("iframe"),
          n = i.length,
          o = "<",
          c = ">";
        for (
          t.style.display = "none",
            r(86).appendChild(t),
            t.src = "javascript:",
            e = t.contentWindow.document,
            e.open(),
            e.write(o + "script" + c + "document.F=Object" + o + "/script" + c),
            e.close(),
            s = e.F;
          n--;

        )
          delete s[a][i[n]];
        return s();
      };
    e.exports =
      Object.create ||
      function(e, t) {
        var r;
        return (
          null !== e
            ? ((u[a] = n(e)), (r = new u()), (u[a] = null), (r[c] = e))
            : (r = s()),
          void 0 === t ? r : o(r, t)
        );
      };
  },
  function(e, t, r) {
    var n = r(4).f,
      o = r(8),
      i = r(0)("toStringTag");
    e.exports = function(e, t, r) {
      e &&
        !o((e = r ? e : e.prototype), i) &&
        n(e, i, { configurable: !0, value: t });
    };
  },
  function(e, t, r) {
    var n = r(35)("keys"),
      o = r(22);
    e.exports = function(e) {
      return n[e] || (n[e] = o(e));
    };
  },
  function(e, t, r) {
    var n = r(3),
      o = "__core-js_shared__",
      i = n[o] || (n[o] = {});
    e.exports = function(e) {
      return i[e] || (i[e] = {});
    };
  },
  function(e, t) {
    var r = Math.ceil,
      n = Math.floor;
    e.exports = function(e) {
      return isNaN((e = +e)) ? 0 : (e > 0 ? n : r)(e);
    };
  },
  function(e, t, r) {
    var n = r(11);
    e.exports = function(e, t) {
      if (!n(e)) return e;
      var r, o;
      if (t && "function" == typeof (r = e.toString) && !n((o = r.call(e))))
        return o;
      if ("function" == typeof (r = e.valueOf) && !n((o = r.call(e)))) return o;
      if (!t && "function" == typeof (r = e.toString) && !n((o = r.call(e))))
        return o;
      throw TypeError("Can't convert object to primitive value");
    };
  },
  function(e, t, r) {
    var n = r(3),
      o = r(1),
      i = r(31),
      c = r(39),
      u = r(4).f;
    e.exports = function(e) {
      var t = o.Symbol || (o.Symbol = i ? {} : n.Symbol || {});
      "_" == e.charAt(0) || e in t || u(t, e, { value: c.f(e) });
    };
  },
  function(e, t, r) {
    t.f = r(0);
  },
  function(e, t, r) {
    r(103);
    for (
      var n = r(3),
        o = r(10),
        i = r(12),
        c = r(0)("toStringTag"),
        u = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(
          ","
        ),
        a = 0;
      a < u.length;
      a++
    ) {
      var s = u[a],
        f = n[s],
        l = f && f.prototype;
      l && !l[c] && o(l, c, s), (i[s] = i.Array);
    }
  },
  function(e, t, r) {
    "use strict";
    function n() {
      return s
        ? s
        : (s = new Promise(function(e, t) {
            var r = self.indexedDB.open(c, u);
            (r.onupgradeneeded = function(e) {
              var t = e.target.result;
              e.target.transaction.onerror = function(e) {
                i.error("Unable to upgrade database, error: " + e.target.error);
              };
              for (var r in a)
                t.objectStoreNames.contains(r) && t.deleteObjectStore(r),
                  t.createObjectStore(r, a[r]);
            }),
              (r.onsuccess = function(t) {
                e(t.target.result);
              }),
              (r.onerror = function(e) {
                t(e.target.error);
              });
          })["catch"](function(e) {
            throw (i.error("Unable to open sw database, error: " + e),
            (s = void 0),
            e);
          }));
    }
    function o(e) {
      (this.storeName = e), (this.storeCache = {});
    }
    var i = r(14),
      c = "sw",
      u = 2,
      a = { prefs: {}, pp: {} },
      s = void 0;
    o.prototype = {
      _callAction: function(e, t) {
        var r = this;
        return n().then(function(n) {
          var o = n
              .transaction([r.storeName], "readwrite")
              .objectStore(r.storeName),
            i = o[e].apply(o, t);
          return new Promise(function(e, t) {
            (i.onsuccess = function(t) {
              e(t.target.result);
            }),
              (i.onerror = function(e) {
                t(e.target.error);
              });
          });
        });
      },
      get: function(e) {
        var t = this;
        return void 0 !== this.storeCache[e]
          ? this.storeCache[e]
          : (this.storeCache[e] = this._callAction("get", [e])["catch"](
              function(r) {
                i.error(
                  "Unable to fetch from db, object store: " +
                    t.storeName +
                    ", key: " +
                    t.key +
                    ", error: " +
                    r
                ),
                  (t.storeCache[e] = void 0);
              }
            ));
      },
      put: function(e, t) {
        var r = this;
        return (
          (this.storeCache[e] = Promise.resolve(t)),
          this._callAction("put", [t, e])["catch"](function(e) {
            i.error(
              "Unable to put to db, object store: " +
                r.storeName +
                ", key: " +
                r.key +
                ", value: " +
                r.value +
                ", error: " +
                e
            );
          })
        );
      },
      delete: function(e) {
        var t = this;
        return (
          (this.storeCache[e] = Promise.resolve(void 0)),
          this._callAction("delete", [e])["catch"](function(e) {
            i.error(
              "Unable to delete in db, object store: " +
                t.storeName +
                ", key: " +
                t.key +
                ", error: " +
                e
            );
          })
        );
      },
      clear: function() {
        var e = this;
        return (
          (this.storeCache = {}),
          this._callAction("clear")["catch"](function(t) {
            i.error(
              "Unable to clear object store: " + e.storeName + ", error: " + t
            );
          })
        );
      }
    };
    var f = { ObjectStore: o };
    e.exports = f;
    for (var l in a) e.exports[l] = new o(l);
  },
  function(e, t) {
    t.f = Object.getOwnPropertySymbols;
  },
  function(e, t, r) {
    var n = r(29);
    e.exports = function(e) {
      return Object(n(e));
    };
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.__esModule = !0;
    var o = r(70),
      i = n(o),
      c = r(69),
      u = n(c),
      a =
        "function" == typeof u["default"] && "symbol" == typeof i["default"]
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                "function" == typeof u["default"] &&
                e.constructor === u["default"] &&
                e !== u["default"].prototype
                ? "symbol"
                : typeof e;
            };
    t["default"] =
      "function" == typeof u["default"] && "symbol" === a(i["default"])
        ? function(e) {
            return "undefined" == typeof e ? "undefined" : a(e);
          }
        : function(e) {
            return e &&
              "function" == typeof u["default"] &&
              e.constructor === u["default"] &&
              e !== u["default"].prototype
              ? "symbol"
              : "undefined" == typeof e
                ? "undefined"
                : a(e);
          };
  },
  function(e, t, r) {
    var n = r(27),
      o = r(0)("toStringTag"),
      i =
        "Arguments" ==
        n(
          (function() {
            return arguments;
          })()
        ),
      c = function(e, t) {
        try {
          return e[t];
        } catch (r) {}
      };
    e.exports = function(e) {
      var t, r, u;
      return void 0 === e
        ? "Undefined"
        : null === e
          ? "Null"
          : "string" == typeof (r = c((t = Object(e)), o))
            ? r
            : i
              ? n(t)
              : "Object" == (u = n(t)) && "function" == typeof t.callee
                ? "Arguments"
                : u;
    };
  },
  function(e, t, r) {
    var n = r(11),
      o = r(3).document,
      i = n(o) && n(o.createElement);
    e.exports = function(e) {
      return i ? o.createElement(e) : {};
    };
  },
  function(e, t, r) {
    e.exports =
      !r(7) &&
      !r(21)(function() {
        return (
          7 !=
          Object.defineProperty(r(46)("div"), "a", {
            get: function() {
              return 7;
            }
          }).a
        );
      });
  },
  function(e, t, r) {
    "use strict";
    var n = r(31),
      o = r(9),
      i = r(52),
      c = r(10),
      u = r(12),
      a = r(90),
      s = r(33),
      f = r(96),
      l = r(0)("iterator"),
      h = !([].keys && "next" in [].keys()),
      p = "@@iterator",
      d = "keys",
      v = "values",
      y = function() {
        return this;
      };
    e.exports = function(e, t, r, m, g, b, _) {
      a(r, t, m);
      var S,
        w,
        O,
        P = function(e) {
          if (!h && e in x) return x[e];
          switch (e) {
            case d:
              return function() {
                return new r(this, e);
              };
            case v:
              return function() {
                return new r(this, e);
              };
          }
          return function() {
            return new r(this, e);
          };
        },
        E = t + " Iterator",
        R = g == v,
        A = !1,
        x = e.prototype,
        T = x[l] || x[p] || (g && x[g]),
        j = T || P(g),
        M = g ? (R ? P("entries") : j) : void 0,
        k = "Array" == t ? x.entries || T : T;
      if (
        (k &&
          ((O = f(k.call(new e()))),
          O !== Object.prototype &&
            O.next &&
            (s(O, E, !0), n || "function" == typeof O[l] || c(O, l, y))),
        R &&
          T &&
          T.name !== v &&
          ((A = !0),
          (j = function() {
            return T.call(this);
          })),
        (n && !_) || (!h && !A && x[l]) || c(x, l, j),
        (u[t] = j),
        (u[E] = y),
        g)
      )
        if (((S = { values: R ? j : P(v), keys: b ? j : P(d), entries: M }), _))
          for (w in S) w in x || i(x, w, S[w]);
        else o(o.P + o.F * (h || A), t, S);
      return S;
    };
  },
  function(e, t, r) {
    var n = r(25),
      o = r(20),
      i = r(13),
      c = r(37),
      u = r(8),
      a = r(47),
      s = Object.getOwnPropertyDescriptor;
    t.f = r(7)
      ? s
      : function(e, t) {
          if (((e = i(e)), (t = c(t, !0)), a))
            try {
              return s(e, t);
            } catch (r) {}
          if (u(e, t)) return o(!n.f.call(e, t), e[t]);
        };
  },
  function(e, t, r) {
    var n = r(51),
      o = r(30).concat("length", "prototype");
    t.f =
      Object.getOwnPropertyNames ||
      function(e) {
        return n(e, o);
      };
  },
  function(e, t, r) {
    var n = r(8),
      o = r(13),
      i = r(83)(!1),
      c = r(34)("IE_PROTO");
    e.exports = function(e, t) {
      var r,
        u = o(e),
        a = 0,
        s = [];
      for (r in u) r != c && n(u, r) && s.push(r);
      for (; t.length > a; ) n(u, (r = t[a++])) && (~i(s, r) || s.push(r));
      return s;
    };
  },
  function(e, t, r) {
    e.exports = r(10);
  },
  function(e, t, r) {
    var n = r(36),
      o = Math.min;
    e.exports = function(e) {
      return e > 0 ? o(n(e), 9007199254740991) : 0;
    };
  },
  function(e, t, r) {
    var n = r(45),
      o = r(0)("iterator"),
      i = r(12);
    e.exports = r(1).getIteratorMethod = function(e) {
      if (void 0 != e) return e[o] || e["@@iterator"] || i[n(e)];
    };
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var o = r(2),
      i = n(o),
      c = r(19),
      u = n(c),
      a = r(18),
      s = n(a),
      f = r(16),
      l = r(5),
      h = "^img/",
      p = (function(e) {
        function t() {
          var e, r, n, o;
          (0, i["default"])(this, t);
          for (var c = arguments.length, a = Array(c), s = 0; s < c; s++)
            a[s] = arguments[s];
          return (
            (r = n = (0, u["default"])(
              this,
              (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
                e,
                [this].concat(a)
              )
            )),
            (n.matchFetch = function(e) {
              var t = e.request,
                r = f.parseUrl(t.url);
              return (
                t.method === f.RequestType.GET &&
                !!r &&
                r.base === self.registration.scope &&
                !!r.relativePath.match(h)
              );
            }),
            (n.onFetch = function(e) {
              var t = e.request;
              return n.cache.matchOrFetch(t).then(function(e) {
                return e.ok ? e : n.cache.fetchAndPut(t);
              });
            }),
            (n.matchAction = function(e) {
              return l.CLEAN_ASSETS === e;
            }),
            (n.onAction = function(e, t) {
              var r = new Set(t);
              return n.cache
                .keys()
                .then(function(e) {
                  if (e) {
                    var t = [];
                    return (
                      e.forEach(function(e) {
                        var n = e.url.lastIndexOf("/") + 1,
                          o = e.url.slice(n);
                        r.has(o) || t.push(e);
                      }),
                      Promise.all(
                        t.map(function(e) {
                          return n.cache["delete"](e);
                        })
                      )
                    );
                  }
                })
                .then(function() {});
            }),
            (o = r),
            (0, u["default"])(n, o)
          );
        }
        return (0, s["default"])(t, e), t;
      })(f);
    e.exports = p;
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      (this.cacheName = e),
        (this.openCachePromise = self.caches.open(this.cacheName));
    }
    function o(e) {
      var t = this;
      return s
        .then(function(t) {
          var r = t.find(function(t) {
            return t !== e && f.test(t);
          });
          if (r) return new n(r);
        })
        ["catch"](function(e) {
          i.error(
            "Could not find previous cache, current cache:" +
              t.cacheName +
              ", error: " +
              e
          );
        });
    }
    var i = r(14),
      c = r(41),
      u = r(26),
      a = c.prefs,
      s = self.caches.keys(),
      f = /wa\d+\.\d+\.\d+(\.[id])?(\.canary)?$/,
      l = ["wa-pp", "wa-assets"];
    (n.prototype = {
      update: function(e, t) {
        var r = this;
        return o(this.cacheName)
          .then(function(n) {
            if (n)
              return (
                i.log("Updating cache: " + r.cacheName),
                a.get("l10n").then(function(o) {
                  return Promise.all(
                    r
                      .prefetchHashedResources(e, n)
                      .concat(r.prefetchUnhashedResources(t, o))
                  );
                })
              );
          })
          ["catch"](function(e) {
            i.error(
              "Error occured while updating cache:" +
                r.cacheName +
                ", error: " +
                e
            );
          });
      },
      prefetchHashedResources: function(e, t) {
        var r = this;
        return e.map(function(e) {
          var n = self.registration.scope + e;
          return t
            .match(n)
            ["catch"](function(e) {
              i.error(
                "Unable to match prev. cache, cache name: " +
                  t.cacheName +
                  ", request: " +
                  n +
                  ", error: " +
                  e
              );
            })
            .then(function(e) {
              return e ? r.put(n, e) : r.fetchAndPut(n);
            });
        });
      },
      prefetchUnhashedResources: function(e, t) {
        var r = this;
        return e.map(function(e) {
          return "" === e
            ? r.fetchAndPut(
                self.registration.scope + u.getIndexPath(t),
                self.registration.scope,
                { cache: "reload" }
              )
            : r.fetchAndPut(self.registration.scope + e);
        });
      },
      cleanup: function() {
        var e = this;
        return s.then(function(t) {
          return Promise.all(
            t.map(function(t) {
              if (t !== e.cacheName && !l.includes(t))
                return self.caches["delete"](t)["catch"](function(r) {
                  i.error(
                    "Unable to delete cache: " +
                      t +
                      ", current cache: " +
                      e.cacheName +
                      ", error: " +
                      r
                  );
                });
            })
          );
        });
      },
      matchOrFetch: function(e, t, r) {
        var n = this;
        return (
          (t = t || e.url || e),
          this.match(t).then(function(o) {
            return o || n.fetchAndPut(e, t, r);
          })
        );
      },
      fetchAndPut: function(e, t, r) {
        var n = this,
          o = u.manuallyCloneRequest(e, void 0, {
            redirect: "manual",
            mode: "cors"
          });
        return self
          .fetch(o, r)
          .then(function(r) {
            return (
              r.ok
                ? ((t = t || (e instanceof Request && e.url) || e),
                  n.put(t, r.clone()))
                : "opaqueredirect" !== r.type &&
                  i.error(
                    "Received invalid response, url: " +
                      r.url +
                      ", status: " +
                      r.status +
                      ", type: " +
                      r.type
                  ),
              r
            );
          })
          ["catch"](function(t) {
            throw (i.error(
              "Unable to fetch request: " +
                ((e instanceof Request && e.url) || e) +
                ", error: " +
                t
            ),
            t);
          });
      },
      reset: function() {
        var e = this;
        return (this.openCachePromise = self.caches["delete"](
          this.cacheName
        ).then(function() {
          return self.caches.open(e.cacheName);
        }));
      },
      match: function(e, t) {
        var r = this;
        return this.openCachePromise
          .then(function(r) {
            return r.match(e, t);
          })
          ["catch"](function(t) {
            i.error(
              "Unable to match request: " +
                (e.url || e) +
                ", in cache: " +
                r.cacheName +
                ", error: " +
                t
            );
          });
      },
      put: function(e, t) {
        var r = this;
        return this.openCachePromise
          .then(function(r) {
            return r.put(e, t);
          })
          ["catch"](function(n) {
            i.error(
              "Unable to put in cache: " +
                r.cacheName +
                ", request: " +
                (e.url || e) +
                ", response status: " +
                t.status +
                ", err: " +
                n
            );
          });
      },
      delete: function(e, t) {
        var r = this;
        return this.openCachePromise
          .then(function(r) {
            return r["delete"](e, t);
          })
          ["catch"](function(t) {
            i.error(
              "Unable to delete request: " +
                (e.url || e) +
                ", in cache: " +
                r.cacheName +
                ", error: " +
                t
            );
          });
      },
      keys: function(e, t) {
        var r = this;
        return this.openCachePromise
          .then(function(r) {
            return r.keys(e, t);
          })
          ["catch"](function(t) {
            i.error(
              "Unable to match request: " +
                ((e && e.url) || e) +
                ", in cache: " +
                r.cacheName +
                ", error: " +
                t
            );
          });
      }
    }),
      (e.exports = n);
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var o = r(2),
      i = n(o),
      c = r(19),
      u = n(c),
      a = r(18),
      s = n(a),
      f = r(16),
      l = r(5),
      h = r(15),
      p = "download/blob",
      d = (function(e) {
        function t() {
          var e, r, n, o;
          (0, i["default"])(this, t);
          for (var c = arguments.length, a = Array(c), s = 0; s < c; s++)
            a[s] = arguments[s];
          return (
            (r = n = (0, u["default"])(
              this,
              (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
                e,
                [this].concat(a)
              )
            )),
            (n.matchFetch = function(e) {
              var t = e.request,
                r = f.parseUrl(t.url);
              return (
                t.method === f.RequestType.GET &&
                !!r &&
                !!r.relativePath.match(p)
              );
            }),
            (n.onFetch = function(e) {
              var t = e.request,
                r = e.client,
                n = e.clientId,
                o = f.parseUrl(t.url);
              if (!o.queryParams || !o.queryParams.msgId)
                return Promise.reject("Invalid msgId");
              var i = n || (r && r.id);
              return i
                ? h.request(i, l.REQUEST_DOCUMENT_DOWNLOAD, o.queryParams.msgId)
                : Promise.reject("No client id found.");
            }),
            (o = r),
            (0, u["default"])(n, o)
          );
        }
        return (0, s["default"])(t, e), t;
      })(f);
    e.exports = d;
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var o = r(2),
      i = n(o),
      c = r(17),
      u = n(c),
      a = r(19),
      s = n(a),
      f = r(18),
      l = n(f),
      h = r(16),
      p = r(5),
      d = { credentials: "include" },
      v = (function(e) {
        function t() {
          var e, r, n, o;
          (0, i["default"])(this, t);
          for (var c = arguments.length, u = Array(c), a = 0; a < c; a++)
            u[a] = arguments[a];
          return (
            (r = n = (0, s["default"])(
              this,
              (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
                e,
                [this].concat(u)
              )
            )),
            (n.matchFetch = function(e) {
              var t = e.request,
                r = h.parseUrl(t.url);
              return (
                t.method === h.RequestType.GET &&
                !!r &&
                "https://dyn.web.whatsapp.com/" === r.base &&
                "pp" === r.relativePath
              );
            }),
            (n.onFetch = function(e) {
              var t = e.request,
                r = h.parseUrl(t.url);
              if (!r || !r.queryParams) return self.fetch(t);
              var o = r.queryParams,
                i = o.e,
                c = o.t,
                u = o.u,
                a = o.i,
                s =
                  "" +
                  r.base +
                  r.relativePath +
                  "?t=" +
                  c +
                  "&u=" +
                  u +
                  "&i=" +
                  a,
                f = i ? self.decodeURIComponent(i) : t;
              return n.cache
                .matchOrFetch(f, s)
                .then(function(e) {
                  return !e.ok && i ? n.cache.fetchAndPut(t, s, d) : e;
                })
                ["catch"](function(e) {
                  if (i) return n.cache.fetchAndPut(t, s, d);
                })
                .then(function(e) {
                  return (
                    e.ok &&
                      n.store.get(u).then(function(e) {
                        if (e !== a)
                          return Promise.all([
                            n.removePPFromCache(u, a),
                            n.store.put(u, a)
                          ]);
                      }),
                    e
                  );
                });
            }),
            (n.matchAction = function(e) {
              return p.REMOVE_PP === e || p.LOGOUT === e;
            }),
            (n.onAction = function(e, t) {
              switch (e) {
                case p.REMOVE_PP:
                  var r = self.encodeURIComponent(t);
                  return n.store
                    .get(r)
                    .then(function(e) {
                      if (e)
                        return Promise.all([
                          n.removePPFromCache(r, e),
                          n.store["delete"](r)
                        ]);
                    })
                    .then(function() {});
                default:
                  return Promise.all([n.cache.reset(), n.store.clear()]).then(
                    function() {}
                  );
              }
            }),
            (o = r),
            (0, s["default"])(n, o)
          );
        }
        return (
          (0, l["default"])(t, e),
          (0, u["default"])(t, [
            {
              key: "removePPFromCache",
              value: function(e, t) {
                return Promise.all([
                  this.cache["delete"](
                    "https://dyn.web.whatsapp.com/pp?t=s&u=" + e + "&i=" + t
                  ),
                  this.cache["delete"](
                    "https://dyn.web.whatsapp.com/pp?t=l&u=" + e + "&i=" + t
                  )
                ]);
              }
            }
          ]),
          t
        );
      })(h);
    e.exports = v;
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var o = r(14),
      i = n(o);
    e.exports = function(e) {
      self.addEventListener("install", function(t) {
        i["default"].log("Installing...");
        var r = e
          .filter(function(e) {
            return e.matchInstall(t);
          })
          .map(function(e) {
            return Promise.resolve(e.onInstall(t));
          });
        t.waitUntil(
          Promise.all(r)
            .then(function() {
              return self.skipWaiting();
            })
            ["catch"](function(e) {
              i["default"].error("onInstall error: " + String(e));
            })
        );
      }),
        self.addEventListener("activate", function(t) {
          i["default"].log("Activating...");
          var r = e
            .filter(function(e) {
              return e.matchActivate(t);
            })
            .map(function(e) {
              return e.onActivate(t);
            });
          t.waitUntil(
            self.clients
              .claim()
              .then(function() {
                return Promise.all(r);
              })
              ["catch"](function(e) {
                i["default"].error("onActivate error: " + e + ".");
              })
          );
        }),
        self.addEventListener("fetch", function(t) {
          var r = e.find(function(e) {
            return e.matchFetch(t);
          });
          if (r) return t.respondWith(r.onFetch(t));
        });
      var t = r(15),
        n = new t(function(t) {
          var r = t.action,
            n = t.message,
            o = e.find(function(e) {
              return e.matchAction(r);
            });
          return o ? o.onAction(r, n) : Promise.reject("Invalid Action: " + r);
        });
      n.init();
    };
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var o = r(2),
      i = n(o),
      c = r(19),
      u = n(c),
      a = r(18),
      s = n(a),
      f = r(16),
      l = r(5),
      h = r(62),
      p = r(15),
      d = "/stream/video",
      v = (function(e) {
        function t() {
          var e, r, n, o;
          (0, i["default"])(this, t);
          for (var c = arguments.length, a = Array(c), s = 0; s < c; s++)
            a[s] = arguments[s];
          return (
            (r = n = (0, u["default"])(
              this,
              (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
                e,
                [this].concat(a)
              )
            )),
            (n.matchFetch = function(e) {
              var t = e.request,
                r = f.parseUrl(t.url);
              return !!(
                t.method === f.RequestType.GET &&
                r &&
                r.queryParams &&
                r.queryParams.key &&
                t.url.match(d)
              );
            }),
            (n.onFetch = function(e) {
              var t = e.request,
                r = e.client,
                n = e.clientId,
                o = f.parseUrl(t.url),
                i = n || (r && r.id);
              return i
                ? p
                    .request(i, l.REQUEST_STREAMING_INFO, {
                      key: o.queryParams.key
                    })
                    .then(function(e) {
                      var r = e.cryptoKeys,
                        n = e.streamData,
                        o = new h(i, r, n);
                      return o.fetchAndDecrypt(t);
                    })
                : Promise.reject("No client id found.");
            }),
            (n.matchAction = function(e) {
              return e === l.STREAMING_SUPPORTED;
            }),
            (n.onAction = function(e, t) {
              return !(
                !self.crypto ||
                (!self.crypto.subtle && !self.crypto.webkitSubtle)
              );
            }),
            (o = r),
            (0, u["default"])(n, o)
          );
        }
        return (0, s["default"])(t, e), t;
      })(f);
    e.exports = v;
  },
  function(e, t, r) {
    var n = r(27);
    e.exports = Object("z").propertyIsEnumerable(0)
      ? Object
      : function(e) {
          return "String" == n(e) ? e.split("") : Object(e);
        };
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function o() {
      return self.crypto.subtle || self.crypto.webkitSubtle;
    }
    var i = r(2),
      c = n(i),
      u = r(17),
      a = n(u),
      s = r(5),
      f = n(s),
      l = r(26),
      h = r(14),
      p = r(15),
      d = 1024,
      v = 16,
      y = 10,
      m = 64 * d,
      g = 24 * m,
      b = (function() {
        function e(t, r, n) {
          (0, c["default"])(this, e), (this.generation = 0);
          for (var o = r.sidecar, i = [], u = 0; u < o.byteLength; u += y)
            i.push(o.slice(u, u + y));
          (this.cryptoKeys = {
            iv: r.iv,
            sidecar: i,
            cipherKey: r.cipherKey,
            macKey: r.macKey
          }),
            (this.streamData = n),
            (this.clientId = t);
        }
        return (
          (0, a["default"])(e, [
            {
              key: "fetchAndDecrypt",
              value: function(e) {
                var t = this,
                  r = this.streamData,
                  n = r.clientUrl,
                  o = r.msgKey,
                  i = this.parseClientRange(e.headers),
                  c = i.clientRangeStart,
                  u = i.clientRangeEnd,
                  a = this.computeServerRange(c, u),
                  s = a.serverRangeStart,
                  l = a.serverRangeEnd,
                  d = this.createServerRequest(e, s, l, n);
                return fetch(d).then(function(r) {
                  return r
                    ? 404 === r.status
                      ? t.handleRMR(e, o)
                      : r.status >= 400
                        ? (h.log(
                            "sw:videoStreaming:processRequest server returns " +
                              r.status +
                              " error"
                          ),
                          t.generation++,
                          p
                            .request(t.clientId, f["default"].EXP_BACKOFF, {
                              generation: t.generation
                            })
                            .then(function() {
                              return t.fetchAndDecrypt(e);
                            }))
                        : ((t.generation = 0),
                          r.arrayBuffer().then(function(e) {
                            var n = e.byteLength;
                            return !e || n < v
                              ? (h.log(
                                  "sw:videoStreaming:processRequest ciphertext is too short - " +
                                    n +
                                    " bytes"
                                ),
                                new Response(
                                  "Ciphertext is too short - " + n + " bytes",
                                  { status: 500 }
                                ))
                              : t
                                  .validateSidecar(s, e)
                                  .then(function() {
                                    return t.cleanupCiphertextAndIv(s, e);
                                  })
                                  .then(function(e) {
                                    var r = e.ciphertext,
                                      n = e.iv;
                                    return t.decrypt(r, n);
                                  })
                                  .then(function(e) {
                                    e = t.cleanupPlaintext(
                                      e,
                                      {
                                        clientRangeStart: c,
                                        clientRangeEnd: u
                                      },
                                      { serverRangeStart: s, serverRangeEnd: l }
                                    );
                                    var n = t.createClientResponse(r, e, c);
                                    return t.sendBackArrayBuffer(c, e), n;
                                  });
                          }))
                    : (h.log(
                        "sw:videoStreaming:processRequest receive no response from server"
                      ),
                      null);
                });
              }
            },
            {
              key: "decrypt",
              value: function(e, t) {
                var r = this.cryptoKeys.cipherKey,
                  n = { name: "AES-CBC", iv: new Uint8Array(t) };
                return o()
                  .importKey("raw", new Uint8Array(r), n, !1, ["decrypt"])
                  ["catch"](function(e) {
                    throw (h.log(
                      "sw:videoStreaming:decrypt importKey error: " + String(e)
                    ),
                    e);
                  })
                  .then(function(t) {
                    return o().decrypt(n, t, e);
                  })
                  ["catch"](function(e) {
                    throw (h.log(
                      "sw:videoStreaming:decrypt decrypt error: " + String(e)
                    ),
                    e);
                  });
              }
            },
            {
              key: "handleRMR",
              value: function(e, t) {
                var r = this;
                return p
                  .request(this.clientId, f["default"].REQUEST_RMR, { key: t })
                  .then(function(t) {
                    return (
                      (r.cryptoKeys.cipherKey = t.cipherKey),
                      (r.cryptoKeys.iv = t.iv),
                      (r.streamData.clientUrl = t.clientUrl),
                      (r.streamData.size = t.size),
                      r.fetchAndDecrypt(e)
                    );
                  });
              }
            },
            {
              key: "cleanupCiphertextAndIv",
              value: function(e, t) {
                var r = this,
                  n = 0 === e,
                  o = t.byteLength % v === 0,
                  i = !o,
                  c = void 0;
                return (
                  n
                    ? (c = this.cryptoKeys.iv)
                    : ((c = t.slice(0, v)), (t = t.slice(v))),
                  i && (t = t.slice(0, t.byteLength - y)),
                  o
                    ? this.getEncryptedPadding(t).then(function(e) {
                        return (
                          (t = r.concatUint8Arrays(
                            new Uint8Array(t),
                            new Uint8Array(e)
                          )),
                          { ciphertext: t, iv: c }
                        );
                      })
                    : Promise.resolve({ ciphertext: t, iv: c })
                );
              }
            },
            {
              key: "cleanupPlaintext",
              value: function(e, t, r) {
                var n = t.clientRangeStart,
                  o = t.clientRangeEnd,
                  i = r.serverRangeStart,
                  c = r.serverRangeEnd,
                  u = 0 === i ? 0 : n - (i + v),
                  a = o ? c - o : 0;
                return (e = e.slice(u, e.byteLength - a));
              }
            },
            {
              key: "getEncryptedPadding",
              value: function(e) {
                var t = this.cryptoKeys.cipherKey,
                  r = { name: "AES-CBC", iv: e.slice(0 - v) };
                return o()
                  .importKey("raw", new Uint8Array(t), r, !1, ["encrypt"])
                  ["catch"](function(e) {
                    h.log(
                      "sw:videoStreaming:getEncryptedPadding importKey error: " +
                        String(e)
                    );
                  })
                  .then(function(e) {
                    var t = new Uint8Array([]);
                    return o().encrypt(r, e, t);
                  })
                  ["catch"](function(e) {
                    h.log(
                      "sw:videoStreaming:getEncryptedPadding encrypt error: " +
                        String(e)
                    );
                  });
              }
            },
            {
              key: "validateSidecar",
              value: function(e, t) {
                var r = this,
                  n = this.cryptoKeys,
                  i = n.macKey,
                  c = n.iv,
                  u = n.sidecar,
                  a = { name: "HMAC", hash: { name: "SHA-256" } },
                  s = void 0,
                  f = void 0;
                0 === e
                  ? ((s = 0), (f = c))
                  : ((s = (e + v) / m), (f = t.slice(0, v)), (t = t.slice(v)));
                var l = t.byteLength / m;
                return o()
                  .importKey("raw", new Uint8Array(i), a, !1, ["sign"])
                  .then(function(e) {
                    for (var n = [], o = 0; o < l; o++) {
                      var i = s + o,
                        c = u[i],
                        a = o * m,
                        h = t.slice(a, a + m),
                        p = f;
                      f = h.slice(m - v, m - v + v);
                      var d = r.concatUint8Arrays(
                        new Uint8Array(p),
                        new Uint8Array(h)
                      );
                      n.push(r.validateChunk(d, e, c));
                    }
                    return Promise.all(n);
                  });
              }
            },
            {
              key: "validateChunk",
              value: function(e, t, r) {
                var n = this;
                return o()
                  .sign({ name: "HMAC" }, t, e)
                  .then(function(e) {
                    var t = e.slice(0, y);
                    if (!n.areBuffersEqual(t, r))
                      return Promise.reject(
                        "Invalid Chunk: Does not match sidecar."
                      );
                  });
              }
            },
            {
              key: "areBuffersEqual",
              value: function(e, t) {
                if (e.byteLength !== t.byteLength) return !1;
                (e = new Uint8Array(e)), (t = new Uint8Array(t));
                for (var r = 0; r < e.byteLength; r++)
                  if (e[r] !== t[r]) return !1;
                return !0;
              }
            },
            {
              key: "concatUint8Arrays",
              value: function(e, t) {
                var r = new Uint8Array(e.length + t.length);
                return r.set(e), r.set(t, e.length), r;
              }
            },
            {
              key: "createClientResponse",
              value: function(e, t, r) {
                var n = this.streamData.size,
                  o = this.getContentRange(r, t),
                  i = o.contentRangeStart,
                  c = o.contentRangeEnd,
                  u = "bytes " + i + "-" + c + "/" + n,
                  a = new Headers(e.headers);
                a.set("Content-Range", u),
                  a.set("Content-Length", "" + t.byteLength);
                var s = new Response(t, {
                  status: e.status,
                  statusText: e.statusText,
                  headers: a
                });
                return s;
              }
            },
            {
              key: "getContentRange",
              value: function(e, t) {
                var r = e,
                  n = e + t.byteLength - 1;
                return { contentRangeStart: r, contentRangeEnd: n };
              }
            },
            {
              key: "sendBackArrayBuffer",
              value: function(e, t) {
                var r = this.getContentRange(e, t),
                  n = r.contentRangeStart,
                  o = r.contentRangeEnd,
                  i = { start: n, end: o, buffer: t };
                p.request(this.clientId, f["default"].SEND_STREAMING_CHUNK, {
                  msgKey: this.streamData.msgKey,
                  data: i
                });
              }
            },
            {
              key: "createServerRequest",
              value: function(e, t, r, n) {
                var o = new Headers();
                o.set("Range", "bytes=" + t + "-" + r);
                var i = l.manuallyCloneRequest(e, n, {
                  credentials: "omit",
                  headers: o,
                  mode: "cors",
                  referrer: e.referrer
                });
                return i;
              }
            },
            {
              key: "parseClientRange",
              value: function(e) {
                var t = e.get("Range");
                t || (t = "0-");
                var r = t.replace("bytes=", "").split("-"),
                  n = parseInt(r[0]),
                  o = parseInt(r[1]);
                return (
                  isNaN(o) && (o = null),
                  { clientRangeStart: n, clientRangeEnd: o }
                );
              }
            },
            {
              key: "computeServerRange",
              value: function(e, t) {
                var r = e,
                  n = t;
                return (
                  (r = e ? this.roundDown(e, m) : 0),
                  (n = t ? this.roundUp(t, m) - 1 : r + g - 1),
                  r > 0 && (r -= v),
                  { serverRangeStart: r, serverRangeEnd: n }
                );
              }
            },
            {
              key: "roundUp",
              value: function(e, t) {
                return Math.ceil(e / t) * t;
              }
            },
            {
              key: "roundDown",
              value: function(e, t) {
                return Math.floor(e / t) * t;
              }
            }
          ]),
          e
        );
      })();
    e.exports = b;
  },
  function(e, t, r) {
    e.exports = { default: r(73), __esModule: !0 };
  },
  function(e, t, r) {
    e.exports = { default: r(74), __esModule: !0 };
  },
  function(e, t, r) {
    e.exports = { default: r(75), __esModule: !0 };
  },
  function(e, t, r) {
    e.exports = { default: r(76), __esModule: !0 };
  },
  function(e, t, r) {
    e.exports = { default: r(77), __esModule: !0 };
  },
  function(e, t, r) {
    e.exports = { default: r(78), __esModule: !0 };
  },
  function(e, t, r) {
    e.exports = { default: r(79), __esModule: !0 };
  },
  function(e, t, r) {
    e.exports = { default: r(80), __esModule: !0 };
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.__esModule = !0;
    var o = r(65),
      i = n(o),
      c = r(64),
      u = n(c);
    t["default"] = (function() {
      function e(e, t) {
        var r = [],
          n = !0,
          o = !1,
          i = void 0;
        try {
          for (
            var c, a = (0, u["default"])(e);
            !(n = (c = a.next()).done) &&
            (r.push(c.value), !t || r.length !== t);
            n = !0
          );
        } catch (s) {
          (o = !0), (i = s);
        } finally {
          try {
            !n && a["return"] && a["return"]();
          } finally {
            if (o) throw i;
          }
        }
        return r;
      }
      return function(t, r) {
        if (Array.isArray(t)) return t;
        if ((0, i["default"])(Object(t))) return e(t, r);
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      };
    })();
  },
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.__esModule = !0;
    var o = r(63),
      i = n(o);
    t["default"] = function(e) {
      if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
      }
      return (0, i["default"])(e);
    };
  },
  function(e, t, r) {
    r(23), r(102), (e.exports = r(1).Array.from);
  },
  function(e, t, r) {
    r(40), r(23), (e.exports = r(100));
  },
  function(e, t, r) {
    r(40), r(23), (e.exports = r(101));
  },
  function(e, t, r) {
    r(104);
    var n = r(1).Object;
    e.exports = function(e, t) {
      return n.create(e, t);
    };
  },
  function(e, t, r) {
    r(105);
    var n = r(1).Object;
    e.exports = function(e, t, r) {
      return n.defineProperty(e, t, r);
    };
  },
  function(e, t, r) {
    r(106), (e.exports = r(1).Object.setPrototypeOf);
  },
  function(e, t, r) {
    r(108), r(107), r(109), r(110), (e.exports = r(1).Symbol);
  },
  function(e, t, r) {
    r(23), r(40), (e.exports = r(39).f("iterator"));
  },
  function(e, t) {
    e.exports = function(e) {
      if ("function" != typeof e) throw TypeError(e + " is not a function!");
      return e;
    };
  },
  function(e, t) {
    e.exports = function() {};
  },
  function(e, t, r) {
    var n = r(13),
      o = r(53),
      i = r(99);
    e.exports = function(e) {
      return function(t, r, c) {
        var u,
          a = n(t),
          s = o(a.length),
          f = i(c, s);
        if (e && r != r) {
          for (; s > f; ) if (((u = a[f++]), u != u)) return !0;
        } else
          for (; s > f; f++)
            if ((e || f in a) && a[f] === r) return e || f || 0;
        return !e && -1;
      };
    };
  },
  function(e, t, r) {
    "use strict";
    var n = r(4),
      o = r(20);
    e.exports = function(e, t, r) {
      t in e ? n.f(e, t, o(0, r)) : (e[t] = r);
    };
  },
  function(e, t, r) {
    var n = r(24),
      o = r(42),
      i = r(25);
    e.exports = function(e) {
      var t = n(e),
        r = o.f;
      if (r)
        for (var c, u = r(e), a = i.f, s = 0; u.length > s; )
          a.call(e, (c = u[s++])) && t.push(c);
      return t;
    };
  },
  function(e, t, r) {
    var n = r(3).document;
    e.exports = n && n.documentElement;
  },
  function(e, t, r) {
    var n = r(12),
      o = r(0)("iterator"),
      i = Array.prototype;
    e.exports = function(e) {
      return void 0 !== e && (n.Array === e || i[o] === e);
    };
  },
  function(e, t, r) {
    var n = r(27);
    e.exports =
      Array.isArray ||
      function(e) {
        return "Array" == n(e);
      };
  },
  function(e, t, r) {
    var n = r(6);
    e.exports = function(e, t, r, o) {
      try {
        return o ? t(n(r)[0], r[1]) : t(r);
      } catch (i) {
        var c = e["return"];
        throw (void 0 !== c && n(c.call(e)), i);
      }
    };
  },
  function(e, t, r) {
    "use strict";
    var n = r(32),
      o = r(20),
      i = r(33),
      c = {};
    r(10)(c, r(0)("iterator"), function() {
      return this;
    }),
      (e.exports = function(e, t, r) {
        (e.prototype = n(c, { next: o(1, r) })), i(e, t + " Iterator");
      });
  },
  function(e, t, r) {
    var n = r(0)("iterator"),
      o = !1;
    try {
      var i = [7][n]();
      (i["return"] = function() {
        o = !0;
      }),
        Array.from(i, function() {
          throw 2;
        });
    } catch (c) {}
    e.exports = function(e, t) {
      if (!t && !o) return !1;
      var r = !1;
      try {
        var i = [7],
          c = i[n]();
        (c.next = function() {
          return { done: (r = !0) };
        }),
          (i[n] = function() {
            return c;
          }),
          e(i);
      } catch (u) {}
      return r;
    };
  },
  function(e, t) {
    e.exports = function(e, t) {
      return { value: t, done: !!e };
    };
  },
  function(e, t, r) {
    var n = r(22)("meta"),
      o = r(11),
      i = r(8),
      c = r(4).f,
      u = 0,
      a =
        Object.isExtensible ||
        function() {
          return !0;
        },
      s = !r(21)(function() {
        return a(Object.preventExtensions({}));
      }),
      f = function(e) {
        c(e, n, { value: { i: "O" + ++u, w: {} } });
      },
      l = function(e, t) {
        if (!o(e))
          return "symbol" == typeof e
            ? e
            : ("string" == typeof e ? "S" : "P") + e;
        if (!i(e, n)) {
          if (!a(e)) return "F";
          if (!t) return "E";
          f(e);
        }
        return e[n].i;
      },
      h = function(e, t) {
        if (!i(e, n)) {
          if (!a(e)) return !0;
          if (!t) return !1;
          f(e);
        }
        return e[n].w;
      },
      p = function(e) {
        return s && d.NEED && a(e) && !i(e, n) && f(e), e;
      },
      d = (e.exports = {
        KEY: n,
        NEED: !1,
        fastKey: l,
        getWeak: h,
        onFreeze: p
      });
  },
  function(e, t, r) {
    var n = r(4),
      o = r(6),
      i = r(24);
    e.exports = r(7)
      ? Object.defineProperties
      : function(e, t) {
          o(e);
          for (var r, c = i(t), u = c.length, a = 0; u > a; )
            n.f(e, (r = c[a++]), t[r]);
          return e;
        };
  },
  function(e, t, r) {
    var n = r(13),
      o = r(50).f,
      i = {}.toString,
      c =
        "object" == typeof window && window && Object.getOwnPropertyNames
          ? Object.getOwnPropertyNames(window)
          : [],
      u = function(e) {
        try {
          return o(e);
        } catch (t) {
          return c.slice();
        }
      };
    e.exports.f = function(e) {
      return c && "[object Window]" == i.call(e) ? u(e) : o(n(e));
    };
  },
  function(e, t, r) {
    var n = r(8),
      o = r(43),
      i = r(34)("IE_PROTO"),
      c = Object.prototype;
    e.exports =
      Object.getPrototypeOf ||
      function(e) {
        return (
          (e = o(e)),
          n(e, i)
            ? e[i]
            : "function" == typeof e.constructor && e instanceof e.constructor
              ? e.constructor.prototype
              : e instanceof Object
                ? c
                : null
        );
      };
  },
  function(e, t, r) {
    var n = r(11),
      o = r(6),
      i = function(e, t) {
        if ((o(e), !n(t) && null !== t))
          throw TypeError(t + ": can't set as prototype!");
      };
    e.exports = {
      set:
        Object.setPrototypeOf ||
        ("__proto__" in {}
          ? (function(e, t, n) {
              try {
                (n = r(28)(
                  Function.call,
                  r(49).f(Object.prototype, "__proto__").set,
                  2
                )),
                  n(e, []),
                  (t = !(e instanceof Array));
              } catch (o) {
                t = !0;
              }
              return function(e, r) {
                return i(e, r), t ? (e.__proto__ = r) : n(e, r), e;
              };
            })({}, !1)
          : void 0),
      check: i
    };
  },
  function(e, t, r) {
    var n = r(36),
      o = r(29);
    e.exports = function(e) {
      return function(t, r) {
        var i,
          c,
          u = String(o(t)),
          a = n(r),
          s = u.length;
        return a < 0 || a >= s
          ? e
            ? ""
            : void 0
          : ((i = u.charCodeAt(a)),
            i < 55296 ||
            i > 56319 ||
            a + 1 === s ||
            (c = u.charCodeAt(a + 1)) < 56320 ||
            c > 57343
              ? e
                ? u.charAt(a)
                : i
              : e
                ? u.slice(a, a + 2)
                : ((i - 55296) << 10) + (c - 56320) + 65536);
      };
    };
  },
  function(e, t, r) {
    var n = r(36),
      o = Math.max,
      i = Math.min;
    e.exports = function(e, t) {
      return (e = n(e)), e < 0 ? o(e + t, 0) : i(e, t);
    };
  },
  function(e, t, r) {
    var n = r(6),
      o = r(54);
    e.exports = r(1).getIterator = function(e) {
      var t = o(e);
      if ("function" != typeof t) throw TypeError(e + " is not iterable!");
      return n(t.call(e));
    };
  },
  function(e, t, r) {
    var n = r(45),
      o = r(0)("iterator"),
      i = r(12);
    e.exports = r(1).isIterable = function(e) {
      var t = Object(e);
      return void 0 !== t[o] || "@@iterator" in t || i.hasOwnProperty(n(t));
    };
  },
  function(e, t, r) {
    "use strict";
    var n = r(28),
      o = r(9),
      i = r(43),
      c = r(89),
      u = r(87),
      a = r(53),
      s = r(84),
      f = r(54);
    o(
      o.S +
        o.F *
          !r(91)(function(e) {
            Array.from(e);
          }),
      "Array",
      {
        from: function(e) {
          var t,
            r,
            o,
            l,
            h = i(e),
            p = "function" == typeof this ? this : Array,
            d = arguments.length,
            v = d > 1 ? arguments[1] : void 0,
            y = void 0 !== v,
            m = 0,
            g = f(h);
          if (
            (y && (v = n(v, d > 2 ? arguments[2] : void 0, 2)),
            void 0 == g || (p == Array && u(g)))
          )
            for (t = a(h.length), r = new p(t); t > m; m++)
              s(r, m, y ? v(h[m], m) : h[m]);
          else
            for (l = g.call(h), r = new p(); !(o = l.next()).done; m++)
              s(r, m, y ? c(l, v, [o.value, m], !0) : o.value);
          return (r.length = m), r;
        }
      }
    );
  },
  function(e, t, r) {
    "use strict";
    var n = r(82),
      o = r(92),
      i = r(12),
      c = r(13);
    (e.exports = r(48)(
      Array,
      "Array",
      function(e, t) {
        (this._t = c(e)), (this._i = 0), (this._k = t);
      },
      function() {
        var e = this._t,
          t = this._k,
          r = this._i++;
        return !e || r >= e.length
          ? ((this._t = void 0), o(1))
          : "keys" == t
            ? o(0, r)
            : "values" == t
              ? o(0, e[r])
              : o(0, [r, e[r]]);
      },
      "values"
    )),
      (i.Arguments = i.Array),
      n("keys"),
      n("values"),
      n("entries");
  },
  function(e, t, r) {
    var n = r(9);
    n(n.S, "Object", { create: r(32) });
  },
  function(e, t, r) {
    var n = r(9);
    n(n.S + n.F * !r(7), "Object", { defineProperty: r(4).f });
  },
  function(e, t, r) {
    var n = r(9);
    n(n.S, "Object", { setPrototypeOf: r(97).set });
  },
  function(e, t) {},
  function(e, t, r) {
    "use strict";
    var n = r(3),
      o = r(8),
      i = r(7),
      c = r(9),
      u = r(52),
      a = r(93).KEY,
      s = r(21),
      f = r(35),
      l = r(33),
      h = r(22),
      p = r(0),
      d = r(39),
      v = r(38),
      y = r(85),
      m = r(88),
      g = r(6),
      b = r(11),
      _ = r(13),
      S = r(37),
      w = r(20),
      O = r(32),
      P = r(95),
      E = r(49),
      R = r(4),
      A = r(24),
      x = E.f,
      T = R.f,
      j = P.f,
      M = n.Symbol,
      k = n.JSON,
      U = k && k.stringify,
      N = "prototype",
      C = p("_hidden"),
      L = p("toPrimitive"),
      I = {}.propertyIsEnumerable,
      q = f("symbol-registry"),
      F = f("symbols"),
      D = f("op-symbols"),
      G = Object[N],
      K = "function" == typeof M,
      W = n.QObject,
      H = !W || !W[N] || !W[N].findChild,
      B =
        i &&
        s(function() {
          return (
            7 !=
            O(
              T({}, "a", {
                get: function() {
                  return T(this, "a", { value: 7 }).a;
                }
              })
            ).a
          );
        })
          ? function(e, t, r) {
              var n = x(G, t);
              n && delete G[t], T(e, t, r), n && e !== G && T(G, t, n);
            }
          : T,
      V = function(e) {
        var t = (F[e] = O(M[N]));
        return (t._k = e), t;
      },
      Q =
        K && "symbol" == typeof M.iterator
          ? function(e) {
              return "symbol" == typeof e;
            }
          : function(e) {
              return e instanceof M;
            },
      z = function(e, t, r) {
        return (
          e === G && z(D, t, r),
          g(e),
          (t = S(t, !0)),
          g(r),
          o(F, t)
            ? (r.enumerable
                ? (o(e, C) && e[C][t] && (e[C][t] = !1),
                  (r = O(r, { enumerable: w(0, !1) })))
                : (o(e, C) || T(e, C, w(1, {})), (e[C][t] = !0)),
              B(e, t, r))
            : T(e, t, r)
        );
      },
      J = function(e, t) {
        g(e);
        for (var r, n = y((t = _(t))), o = 0, i = n.length; i > o; )
          z(e, (r = n[o++]), t[r]);
        return e;
      },
      X = function(e, t) {
        return void 0 === t ? O(e) : J(O(e), t);
      },
      Y = function(e) {
        var t = I.call(this, (e = S(e, !0)));
        return (
          !(this === G && o(F, e) && !o(D, e)) &&
          (!(t || !o(this, e) || !o(F, e) || (o(this, C) && this[C][e])) || t)
        );
      },
      $ = function(e, t) {
        if (((e = _(e)), (t = S(t, !0)), e !== G || !o(F, t) || o(D, t))) {
          var r = x(e, t);
          return (
            !r || !o(F, t) || (o(e, C) && e[C][t]) || (r.enumerable = !0), r
          );
        }
      },
      Z = function(e) {
        for (var t, r = j(_(e)), n = [], i = 0; r.length > i; )
          o(F, (t = r[i++])) || t == C || t == a || n.push(t);
        return n;
      },
      ee = function(e) {
        for (
          var t, r = e === G, n = j(r ? D : _(e)), i = [], c = 0;
          n.length > c;

        )
          !o(F, (t = n[c++])) || (r && !o(G, t)) || i.push(F[t]);
        return i;
      };
    K ||
      ((M = function() {
        if (this instanceof M) throw TypeError("Symbol is not a constructor!");
        var e = h(arguments.length > 0 ? arguments[0] : void 0),
          t = function(r) {
            this === G && t.call(D, r),
              o(this, C) && o(this[C], e) && (this[C][e] = !1),
              B(this, e, w(1, r));
          };
        return i && H && B(G, e, { configurable: !0, set: t }), V(e);
      }),
      u(M[N], "toString", function() {
        return this._k;
      }),
      (E.f = $),
      (R.f = z),
      (r(50).f = P.f = Z),
      (r(25).f = Y),
      (r(42).f = ee),
      i && !r(31) && u(G, "propertyIsEnumerable", Y, !0),
      (d.f = function(e) {
        return V(p(e));
      })),
      c(c.G + c.W + c.F * !K, { Symbol: M });
    for (
      var te = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(
          ","
        ),
        re = 0;
      te.length > re;

    )
      p(te[re++]);
    for (var ne = A(p.store), oe = 0; ne.length > oe; ) v(ne[oe++]);
    c(c.S + c.F * !K, "Symbol", {
      for: function(e) {
        return o(q, (e += "")) ? q[e] : (q[e] = M(e));
      },
      keyFor: function(e) {
        if (!Q(e)) throw TypeError(e + " is not a symbol!");
        for (var t in q) if (q[t] === e) return t;
      },
      useSetter: function() {
        H = !0;
      },
      useSimple: function() {
        H = !1;
      }
    }),
      c(c.S + c.F * !K, "Object", {
        create: X,
        defineProperty: z,
        defineProperties: J,
        getOwnPropertyDescriptor: $,
        getOwnPropertyNames: Z,
        getOwnPropertySymbols: ee
      }),
      k &&
        c(
          c.S +
            c.F *
              (!K ||
                s(function() {
                  var e = M();
                  return (
                    "[null]" != U([e]) ||
                    "{}" != U({ a: e }) ||
                    "{}" != U(Object(e))
                  );
                })),
          "JSON",
          {
            stringify: function(e) {
              for (var t, r, n = [e], o = 1; arguments.length > o; )
                n.push(arguments[o++]);
              if (((r = t = n[1]), (b(t) || void 0 !== e) && !Q(e)))
                return (
                  m(t) ||
                    (t = function(e, t) {
                      if (
                        ("function" == typeof r && (t = r.call(this, e, t)),
                        !Q(t))
                      )
                        return t;
                    }),
                  (n[1] = t),
                  U.apply(k, n)
                );
            }
          }
        ),
      M[N][L] || r(10)(M[N], L, M[N].valueOf),
      l(M, "Symbol"),
      l(Math, "Math", !0),
      l(n.JSON, "JSON", !0);
  },
  function(e, t, r) {
    r(38)("asyncIterator");
  },
  function(e, t, r) {
    r(38)("observable");
  },
  ,
  function(e, t, r) {
    "use strict";
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var o = r(71),
      i = n(o),
      c = r(72),
      u = n(c),
      a = r(2),
      s = n(a),
      f = r(17),
      l = n(f),
      h = r(19),
      p = n(h),
      d = r(18),
      v = n(d),
      y = r(14),
      m = n(y),
      g = r(5),
      b = r(26),
      _ = r(16),
      S = 2592e6,
      w = function() {
        return {
          version: "0.3.1071",
          releaseDate: 0,
          unhashedResources: [],
          hashedResources: [],
          l10n: { locales: {} }
        };
      },
      O = (function(e) {
        function t(e, r) {
          (0, s["default"])(this, t);
          var n = (0, p["default"])(
            this,
            (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r)
          );
          (n.matchInstall = function(e) {
            return !0;
          }),
            (n.onInstall = function(e) {
              return n.store.get("l10n").then(function(e) {
                var t;
                return (
                  (t = n.cacheObject.hashedResources).push.apply(
                    t,
                    (0, u["default"])(n.cachedL10nHashes(n.cacheObject, e))
                  ),
                  n.cache.update(
                    n.cacheObject.hashedResources,
                    n.cacheObject.unhashedResources
                  )
                );
              });
            }),
            (n.matchActivate = function(e) {
              return !0;
            }),
            (n.onActivate = function(e) {
              return n.cache.cleanup();
            }),
            (n.matchFetch = function(e) {
              var t = e.request,
                r = _.parseUrl(t.url);
              return (
                t.method === _.RequestType.GET &&
                !n.isCacheStale() &&
                !!r &&
                r.base === self.registration.scope &&
                n.cacheList.has(r.relativePath)
              );
            }),
            (n.onFetch = function(e) {
              var t = e.request,
                r = _.parseUrl(t.url);
              return r
                ? n.cache.matchOrFetch(t, "" + r.base + r.relativePath)
                : self.fetch(t);
            }),
            (n.matchAction = function(e) {
              return e === g.SET_L10N;
            }),
            (n.onAction = function(e, t) {
              return n.store
                .get("l10n")
                .then(function(e) {
                  if (!e || t.locale !== e.locale) {
                    var r = n.cachedL10nHashes(n.cacheObject, t),
                      o = (0, i["default"])(r, 1),
                      c = o[0];
                    if (!c) return n.store["delete"]("l10n");
                    var u = "" + self.registration.scope + b.getIndexPath(t);
                    return Promise.all([
                      n.cache.fetchAndPut(u, self.registration.scope),
                      n.store.put("l10n", { locale: t.locale, isRTL: t.isRTL })
                    ]);
                  }
                })
                .then(function() {});
            });
          try {
            if (
              ((n.cacheObject = {
                version: "0.3.1071",
                hashedResources: [
                  "66.8691f31d11f9cd4e3d1e.js",
                  "ac82f443cb6f5d87ab09.js",
                  "app.2edf32bb08199be594e2.js",
                  "app2.7882d00541f8a72b09d4.js",
                  "milan.d9999f8e57ee56f8c1d3.js",
                  "opus.7513134f18a38036cc51.js",
                  "pdf.9928d1da93cd85861976.js",
                  "pdf.worker.fc0b1bfdd5dbccf8371ca82433178e93.js",
                  "progress.6c7bfe223a0c813c0cd227e602d48cad.js",
                  "svg.b95a3ce3185990bd2aa3.js",
                  "vendor1.e3cebb7e80be6f8b6ac2.js",
                  "vendor2.3973e7c149ced441846f.js",
                  "browsers_35006b1bcc03e7c3329d2998b0bd0ee1.css",
                  "cssm_7dad2a49233ed8f56c979aa23ba9251b.css"
                ],
                unhashedResources: [
                  "",
                  "assets/0a598282e94e87dea63e466d115e4a83.mp3",
                  "assets/10ce945f706bbd216466cd05f672164d.mp4",
                  "assets/a0f99e8cbba9eaa747ec23ffb30d63fe.mp4"
                ],
                l10n: {
                  locales: {
                    "af.e1a3925b292865905f16.js":
                      "locales/af.e1a3925b292865905f16.js",
                    "ar.bdae8e2c918179675018.js":
                      "locales/ar.bdae8e2c918179675018.js",
                    "az.7bbd6da8974888d8749a.js":
                      "locales/az.7bbd6da8974888d8749a.js",
                    "bg.bcce09d748d3f10a6834.js":
                      "locales/bg.bcce09d748d3f10a6834.js",
                    "bn.1f82e04561a0e76f62e5.js":
                      "locales/bn.1f82e04561a0e76f62e5.js",
                    "ca.2666efa126f0b1886106.js":
                      "locales/ca.2666efa126f0b1886106.js",
                    "cs.d37fc0c56836526e51f8.js":
                      "locales/cs.d37fc0c56836526e51f8.js",
                    "da.8257ee1989af3a8990bd.js":
                      "locales/da.8257ee1989af3a8990bd.js",
                    "de.b90cc4befc9b741cb6aa.js":
                      "locales/de.b90cc4befc9b741cb6aa.js",
                    "el.d6219c163a830678041a.js":
                      "locales/el.d6219c163a830678041a.js",
                    "en.fa66d856bbdb4dcec395.js":
                      "locales/en.fa66d856bbdb4dcec395.js",
                    "es.ebb46858c653afe29315.js":
                      "locales/es.ebb46858c653afe29315.js",
                    "et.1e68bf978094387b2c08.js":
                      "locales/et.1e68bf978094387b2c08.js",
                    "fa.bc4dd8fb1fe2ccb98722.js":
                      "locales/fa.bc4dd8fb1fe2ccb98722.js",
                    "fi.456fe02db3b68be6003b.js":
                      "locales/fi.456fe02db3b68be6003b.js",
                    "fil.8e2ff5d1801ecc2780ef.js":
                      "locales/fil.8e2ff5d1801ecc2780ef.js",
                    "fr.fdc831b03725bdb071c7.js":
                      "locales/fr.fdc831b03725bdb071c7.js",
                    "ga.f319f28146e8d5342802.js":
                      "locales/ga.f319f28146e8d5342802.js",
                    "gu.b826f4206ef0e250c21a.js":
                      "locales/gu.b826f4206ef0e250c21a.js",
                    "he.b30ee8aa602c40c2c848.js":
                      "locales/he.b30ee8aa602c40c2c848.js",
                    "hi.26eb57ecc9979d38c2e7.js":
                      "locales/hi.26eb57ecc9979d38c2e7.js",
                    "hr.5e7831d8f95e197d33da.js":
                      "locales/hr.5e7831d8f95e197d33da.js",
                    "hu.fc3c777f2578882a0818.js":
                      "locales/hu.fc3c777f2578882a0818.js",
                    "id.dace8b1be43c177f2dc0.js":
                      "locales/id.dace8b1be43c177f2dc0.js",
                    "it.e0328ed46f5cbd0a981c.js":
                      "locales/it.e0328ed46f5cbd0a981c.js",
                    "ja.3e6dfd60d9da70d8cd7f.js":
                      "locales/ja.3e6dfd60d9da70d8cd7f.js",
                    "kk.2ee915b5e485e8c87870.js":
                      "locales/kk.2ee915b5e485e8c87870.js",
                    "kn.30a0dda5812a170ea2e6.js":
                      "locales/kn.30a0dda5812a170ea2e6.js",
                    "ko.8a6dc68823a20b7d2044.js":
                      "locales/ko.8a6dc68823a20b7d2044.js",
                    "lt.fde1e97f5707b00b5cdf.js":
                      "locales/lt.fde1e97f5707b00b5cdf.js",
                    "lv.6208f1e0c8882d3f5546.js":
                      "locales/lv.6208f1e0c8882d3f5546.js",
                    "mk.18c6c3b3ef8d9fb56e6e.js":
                      "locales/mk.18c6c3b3ef8d9fb56e6e.js",
                    "ml.1a2b9d8c48b861f59e23.js":
                      "locales/ml.1a2b9d8c48b861f59e23.js",
                    "mr.f064bc33cb18785c3c77.js":
                      "locales/mr.f064bc33cb18785c3c77.js",
                    "ms.87be2654bd226cdae34d.js":
                      "locales/ms.87be2654bd226cdae34d.js",
                    "nb.d0d79d10e28da2f1058a.js":
                      "locales/nb.d0d79d10e28da2f1058a.js",
                    "nl.274474c1eabf559eb129.js":
                      "locales/nl.274474c1eabf559eb129.js",
                    "pa.9ca561d11e4827455fd4.js":
                      "locales/pa.9ca561d11e4827455fd4.js",
                    "pl.294c4b8c7824102a1c2c.js":
                      "locales/pl.294c4b8c7824102a1c2c.js",
                    "pt-BR.385f20e6c6e37bdc6177.js":
                      "locales/pt-BR.385f20e6c6e37bdc6177.js",
                    "pt.f2b86af38fb0802755c1.js":
                      "locales/pt.f2b86af38fb0802755c1.js",
                    "ro.eb7dc16bef8245a7241e.js":
                      "locales/ro.eb7dc16bef8245a7241e.js",
                    "ru.6748fea5db1a337a4d96.js":
                      "locales/ru.6748fea5db1a337a4d96.js",
                    "sk.39114a26931731c6cca3.js":
                      "locales/sk.39114a26931731c6cca3.js",
                    "sl.fcc849a77debd9447134.js":
                      "locales/sl.fcc849a77debd9447134.js",
                    "sq.a0bd984906b90b02c6bd.js":
                      "locales/sq.a0bd984906b90b02c6bd.js",
                    "sr.f906e2ba447418f104ff.js":
                      "locales/sr.f906e2ba447418f104ff.js",
                    "sv.efc78c56a411d45c08a2.js":
                      "locales/sv.efc78c56a411d45c08a2.js",
                    "sw.156787945f18acf30745.js":
                      "locales/sw.156787945f18acf30745.js",
                    "ta.fc8ed0966a8a5ec86a74.js":
                      "locales/ta.fc8ed0966a8a5ec86a74.js",
                    "th.772201c2b6f1fe3e8604.js":
                      "locales/th.772201c2b6f1fe3e8604.js",
                    "tr.376ca22663799aebbfbe.js":
                      "locales/tr.376ca22663799aebbfbe.js",
                    "uk.ab04048ae91ea87f078d.js":
                      "locales/uk.ab04048ae91ea87f078d.js",
                    "ur.1e644166a5937a6edaea.js":
                      "locales/ur.1e644166a5937a6edaea.js",
                    "uz.17281775cf6898334449.js":
                      "locales/uz.17281775cf6898334449.js",
                    "vi.94faaf79f0e1419a546b.js":
                      "locales/vi.94faaf79f0e1419a546b.js",
                    "zh-CN.d3659a4e615b75ff77b3.js":
                      "locales/zh-CN.d3659a4e615b75ff77b3.js",
                    "zh-TW.3d5da98d6ac5e67afb94.js":
                      "locales/zh-TW.3d5da98d6ac5e67afb94.js"
                  },
                  styles: {}
                },
                releaseDate: 1538765718649
              }),
              !n.cacheObject.l10n || !n.cacheObject.l10n.locales)
            )
              throw new Error("Outdated Cache Schema");
          } catch (o) {
            (n.cacheObject = w()),
              m["default"].error("Unable to read cache list: " + o);
          }
          return (
            (n.cacheList = new Set(
              [].concat(
                (0, u["default"])(n.cacheObject.hashedResources),
                (0, u["default"])(n.cacheObject.unhashedResources),
                (0, u["default"])(Object.values(n.cacheObject.l10n.locales))
              )
            )),
            n
          );
        }
        return (
          (0, v["default"])(t, e),
          (0, l["default"])(t, [
            {
              key: "cachedL10nHashes",
              value: function(e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  r = t.locale,
                  n = e.l10n.locales[r];
                return n ? [n] : [];
              }
            },
            {
              key: "isCacheStale",
              value: function() {
                return new Date().getTime() - this.cacheObject.releaseDate >= S;
              }
            }
          ]),
          t
        );
      })(_);
    e.exports = O;
  },
  function(e, t, r) {
    "use strict";
    var n = r(56),
      o = r(41),
      i = r(57),
      c = r(58),
      u = r(60),
      a = r(112),
      s = r(55),
      f = [
        new i(),
        new c(new n("wa-pp"), o.pp),
        new u(),
        new a(new n("wa0.3.1071"), o.prefs),
        new s(new n("wa-assets"))
      ],
      l = r(59);
    l(f);
  }
]);
