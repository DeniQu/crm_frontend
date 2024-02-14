(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const a of i.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
const I = { context: void 0, registry: void 0 };
function we(e) {
  I.context = e;
}
const go = (e, t) => e === t,
  vt = Symbol("solid-proxy"),
  fa = Symbol("solid-track"),
  jt = { equals: go };
let yt = null,
  po = wo;
const ae = 1,
  wt = 2,
  mo = { owned: null, cleanups: null, context: null, owner: null },
  gn = {};
var D = null;
let w = null,
  W = null,
  ne = null,
  X = null,
  Yt = 0;
function Te(e, t) {
  const n = W,
    r = D,
    o = e.length === 0,
    i = t === void 0 ? r : t,
    a = o
      ? mo
      : {
          owned: null,
          cleanups: null,
          context: i ? i.context : null,
          owner: i,
        },
    s = o ? e : () => e(() => G(() => Me(a)));
  (D = a), (W = null);
  try {
    return ue(s, !0);
  } finally {
    (W = n), (D = r);
  }
}
function z(e, t) {
  t = t ? Object.assign({}, jt, t) : jt;
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    r = (o) => (
      typeof o == "function" &&
        (w && w.running && w.sources.has(n)
          ? (o = o(n.tValue))
          : (o = o(n.value))),
      vo(n, o)
    );
  return [yo.bind(n), r];
}
function Ar(e, t, n) {
  const r = ut(e, t, !0, ae);
  et(r);
}
function ie(e, t, n) {
  const r = ut(e, t, !1, ae);
  et(r);
}
function At(e, t, n) {
  po = ya;
  const r = ut(e, t, !1, ae),
    o = qe && Ae(qe);
  o && (r.suspense = o),
    (!n || !n.render) && (r.user = !0),
    X ? X.push(r) : et(r);
}
function B(e, t, n) {
  n = n ? Object.assign({}, jt, n) : jt;
  const r = ut(e, t, !0, 0);
  return (
    (r.observers = null),
    (r.observerSlots = null),
    (r.comparator = n.equals || void 0),
    et(r),
    yo.bind(r)
  );
}
function da(e) {
  return e && typeof e == "object" && "then" in e;
}
function Jn(e, t, n) {
  let r, o, i;
  (arguments.length === 2 && typeof t == "object") || arguments.length === 1
    ? ((r = !0), (o = e), (i = t || {}))
    : ((r = e), (o = t), (i = n || {}));
  let a = null,
    s = gn,
    c = null,
    l = !1,
    u = !1,
    g = "initialValue" in i,
    p = typeof r == "function" && B(r);
  const m = new Set(),
    [v, A] = (i.storage || z)(i.initialValue),
    [P, O] = z(void 0),
    [b, _] = z(void 0, { equals: !1 }),
    [S, x] = z(g ? "ready" : "unresolved");
  if (I.context) {
    c = `${I.context.id}${I.context.count++}`;
    let C;
    i.ssrLoadFrom === "initial"
      ? (s = i.initialValue)
      : I.load && (C = I.load(c)) && (s = C);
  }
  function $(C, R, H, te) {
    return (
      a === C &&
        ((a = null),
        te !== void 0 && (g = !0),
        (C === s || R === s) &&
          i.onHydrated &&
          queueMicrotask(() => i.onHydrated(te, { value: R })),
        (s = gn),
        w && C && l
          ? (w.promises.delete(C),
            (l = !1),
            ue(() => {
              (w.running = !0), Z(R, H);
            }, !1))
          : Z(R, H)),
      R
    );
  }
  function Z(C, R) {
    ue(() => {
      R === void 0 && A(() => C),
        x(R !== void 0 ? "errored" : g ? "ready" : "unresolved"),
        O(R);
      for (const H of m.keys()) H.decrement();
      m.clear();
    }, !1);
  }
  function se() {
    const C = qe && Ae(qe),
      R = v(),
      H = P();
    if (H !== void 0 && !a) throw H;
    return (
      W &&
        !W.user &&
        C &&
        Ar(() => {
          b(),
            a &&
              (C.resolved && w && l
                ? w.promises.add(a)
                : m.has(C) || (C.increment(), m.add(C)));
        }),
      R
    );
  }
  function F(C = !0) {
    if (C !== !1 && u) return;
    u = !1;
    const R = p ? p() : r;
    if (((l = w && w.running), R == null || R === !1)) {
      $(a, G(v));
      return;
    }
    w && a && w.promises.delete(a);
    const H = s !== gn ? s : G(() => o(R, { value: v(), refetching: C }));
    return da(H)
      ? ((a = H),
        "value" in H
          ? (H.status === "success"
              ? $(a, H.value, void 0, R)
              : $(a, void 0, void 0, R),
            H)
          : ((u = !0),
            queueMicrotask(() => (u = !1)),
            ue(() => {
              x(g ? "refreshing" : "pending"), _();
            }, !1),
            H.then(
              (te) => $(H, te, void 0, R),
              (te) => $(H, void 0, So(te), R)
            )))
      : ($(a, H, void 0, R), H);
  }
  return (
    Object.defineProperties(se, {
      state: { get: () => S() },
      error: { get: () => P() },
      loading: {
        get() {
          const C = S();
          return C === "pending" || C === "refreshing";
        },
      },
      latest: {
        get() {
          if (!g) return se();
          const C = P();
          if (C && !a) throw C;
          return v();
        },
      },
    }),
    p ? Ar(() => F(!1)) : F(!1),
    [se, { refetch: F, mutate: A }]
  );
}
function Rd(e, t = go, n) {
  const r = new Map(),
    o = ut(
      (i) => {
        const a = e();
        for (const [s, c] of r.entries())
          if (t(s, a) !== t(s, i))
            for (const l of c.values())
              (l.state = ae), l.pure ? ne.push(l) : X.push(l);
        return a;
      },
      void 0,
      !0,
      ae
    );
  return (
    et(o),
    (i) => {
      const a = W;
      if (a) {
        let s;
        (s = r.get(i)) ? s.add(a) : r.set(i, (s = new Set([a]))),
          de(() => {
            s.delete(a), !s.size && r.delete(i);
          });
      }
      return t(i, w && w.running && w.sources.has(o) ? o.tValue : o.value);
    }
  );
}
function Ld(e) {
  return ue(e, !1);
}
function G(e) {
  if (W === null) return e();
  const t = W;
  W = null;
  try {
    return e();
  } finally {
    W = t;
  }
}
function Zn(e, t, n) {
  const r = Array.isArray(e);
  let o,
    i = n && n.defer;
  return (a) => {
    let s;
    if (r) {
      s = Array(e.length);
      for (let l = 0; l < e.length; l++) s[l] = e[l]();
    } else s = e();
    if (i) {
      i = !1;
      return;
    }
    const c = G(() => t(s, o, a));
    return (o = s), c;
  };
}
function Qt(e) {
  At(() => G(e));
}
function de(e) {
  return (
    D === null ||
      (D.cleanups === null ? (D.cleanups = [e]) : D.cleanups.push(e)),
    e
  );
}
function ha(e, t) {
  yt || (yt = Symbol("error")),
    (D = ut(void 0, void 0, !0)),
    (D.context = { ...D.context, [yt]: [t] }),
    w && w.running && w.sources.add(D);
  try {
    return e();
  } catch (n) {
    Pt(n);
  } finally {
    D = D.owner;
  }
}
function Wt() {
  return D;
}
function bo(e, t) {
  const n = D,
    r = W;
  (D = e), (W = null);
  try {
    return ue(t, !0);
  } catch (o) {
    Pt(o);
  } finally {
    (D = n), (W = r);
  }
}
function ga(e) {
  if (w && w.running) return e(), w.done;
  const t = W,
    n = D;
  return Promise.resolve().then(() => {
    (W = t), (D = n);
    let r;
    return (
      qe &&
        ((r =
          w ||
          (w = {
            sources: new Set(),
            effects: [],
            promises: new Set(),
            disposed: new Set(),
            queue: new Set(),
            running: !0,
          })),
        r.done || (r.done = new Promise((o) => (r.resolve = o))),
        (r.running = !0)),
      ue(e, !1),
      (W = D = null),
      r ? r.done : void 0
    );
  });
}
const [Nd, _r] = z(!1);
function pa(e) {
  X.push.apply(X, e), (e.length = 0);
}
function Xe(e, t) {
  const n = Symbol("context");
  return { id: n, Provider: va(n), defaultValue: e };
}
function Ae(e) {
  return D && D.context && D.context[e.id] !== void 0
    ? D.context[e.id]
    : e.defaultValue;
}
function Yn(e) {
  const t = B(e),
    n = B(() => Dn(t()));
  return (
    (n.toArray = () => {
      const r = n();
      return Array.isArray(r) ? r : r != null ? [r] : [];
    }),
    n
  );
}
let qe;
function ma() {
  return qe || (qe = Xe());
}
function yo() {
  const e = w && w.running;
  if (this.sources && (e ? this.tState : this.state))
    if ((e ? this.tState : this.state) === ae) et(this);
    else {
      const t = ne;
      (ne = null), ue(() => Vt(this), !1), (ne = t);
    }
  if (W) {
    const t = this.observers ? this.observers.length : 0;
    W.sources
      ? (W.sources.push(this), W.sourceSlots.push(t))
      : ((W.sources = [this]), (W.sourceSlots = [t])),
      this.observers
        ? (this.observers.push(W),
          this.observerSlots.push(W.sources.length - 1))
        : ((this.observers = [W]),
          (this.observerSlots = [W.sources.length - 1]));
  }
  return e && w.sources.has(this) ? this.tValue : this.value;
}
function vo(e, t, n) {
  let r = w && w.running && w.sources.has(e) ? e.tValue : e.value;
  if (!e.comparator || !e.comparator(r, t)) {
    if (w) {
      const o = w.running;
      (o || (!n && w.sources.has(e))) && (w.sources.add(e), (e.tValue = t)),
        o || (e.value = t);
    } else e.value = t;
    e.observers &&
      e.observers.length &&
      ue(() => {
        for (let o = 0; o < e.observers.length; o += 1) {
          const i = e.observers[o],
            a = w && w.running;
          (a && w.disposed.has(i)) ||
            ((a ? !i.tState : !i.state) &&
              (i.pure ? ne.push(i) : X.push(i), i.observers && Ao(i)),
            a ? (i.tState = ae) : (i.state = ae));
        }
        if (ne.length > 1e6) throw ((ne = []), new Error());
      }, !1);
  }
  return t;
}
function et(e) {
  if (!e.fn) return;
  Me(e);
  const t = Yt;
  Sr(e, w && w.running && w.sources.has(e) ? e.tValue : e.value, t),
    w &&
      !w.running &&
      w.sources.has(e) &&
      queueMicrotask(() => {
        ue(() => {
          w && (w.running = !0),
            (W = D = e),
            Sr(e, e.tValue, t),
            (W = D = null);
        }, !1);
      });
}
function Sr(e, t, n) {
  let r;
  const o = D,
    i = W;
  W = D = e;
  try {
    r = e.fn(t);
  } catch (a) {
    return (
      e.pure &&
        (w && w.running
          ? ((e.tState = ae),
            e.tOwned && e.tOwned.forEach(Me),
            (e.tOwned = void 0))
          : ((e.state = ae), e.owned && e.owned.forEach(Me), (e.owned = null))),
      (e.updatedAt = n + 1),
      Pt(a)
    );
  } finally {
    (W = i), (D = o);
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && "observers" in e
      ? vo(e, r, !0)
      : w && w.running && e.pure
      ? (w.sources.add(e), (e.tValue = r))
      : (e.value = r),
    (e.updatedAt = n));
}
function ut(e, t, n, r = ae, o) {
  const i = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: D,
    context: D ? D.context : null,
    pure: n,
  };
  return (
    w && w.running && ((i.state = 0), (i.tState = r)),
    D === null ||
      (D !== mo &&
        (w && w.running && D.pure
          ? D.tOwned
            ? D.tOwned.push(i)
            : (D.tOwned = [i])
          : D.owned
          ? D.owned.push(i)
          : (D.owned = [i]))),
    i
  );
}
function Ht(e) {
  const t = w && w.running;
  if ((t ? e.tState : e.state) === 0) return;
  if ((t ? e.tState : e.state) === wt) return Vt(e);
  if (e.suspense && G(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Yt); ) {
    if (t && w.disposed.has(e)) return;
    (t ? e.tState : e.state) && n.push(e);
  }
  for (let r = n.length - 1; r >= 0; r--) {
    if (((e = n[r]), t)) {
      let o = e,
        i = n[r + 1];
      for (; (o = o.owner) && o !== i; ) if (w.disposed.has(o)) return;
    }
    if ((t ? e.tState : e.state) === ae) et(e);
    else if ((t ? e.tState : e.state) === wt) {
      const o = ne;
      (ne = null), ue(() => Vt(e, n[0]), !1), (ne = o);
    }
  }
}
function ue(e, t) {
  if (ne) return e();
  let n = !1;
  t || (ne = []), X ? (n = !0) : (X = []), Yt++;
  try {
    const r = e();
    return ba(n), r;
  } catch (r) {
    n || (X = null), (ne = null), Pt(r);
  }
}
function ba(e) {
  if ((ne && (wo(ne), (ne = null)), e)) return;
  let t;
  if (w) {
    if (!w.promises.size && !w.queue.size) {
      const r = w.sources,
        o = w.disposed;
      X.push.apply(X, w.effects), (t = w.resolve);
      for (const i of X) "tState" in i && (i.state = i.tState), delete i.tState;
      (w = null),
        ue(() => {
          for (const i of o) Me(i);
          for (const i of r) {
            if (((i.value = i.tValue), i.owned))
              for (let a = 0, s = i.owned.length; a < s; a++) Me(i.owned[a]);
            i.tOwned && (i.owned = i.tOwned),
              delete i.tValue,
              delete i.tOwned,
              (i.tState = 0);
          }
          _r(!1);
        }, !1);
    } else if (w.running) {
      (w.running = !1), w.effects.push.apply(w.effects, X), (X = null), _r(!0);
      return;
    }
  }
  const n = X;
  (X = null), n.length && ue(() => po(n), !1), t && t();
}
function wo(e) {
  for (let t = 0; t < e.length; t++) Ht(e[t]);
}
function ya(e) {
  let t,
    n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? (e[n++] = r) : Ht(r);
  }
  if (I.context) {
    if (I.count) {
      I.effects || (I.effects = []), I.effects.push(...e.slice(0, n));
      return;
    } else
      I.effects &&
        ((e = [...I.effects, ...e]), (n += I.effects.length), delete I.effects);
    we();
  }
  for (t = 0; t < n; t++) Ht(e[t]);
}
function Vt(e, t) {
  const n = w && w.running;
  n ? (e.tState = 0) : (e.state = 0);
  for (let r = 0; r < e.sources.length; r += 1) {
    const o = e.sources[r];
    if (o.sources) {
      const i = n ? o.tState : o.state;
      i === ae
        ? o !== t && (!o.updatedAt || o.updatedAt < Yt) && Ht(o)
        : i === wt && Vt(o, t);
    }
  }
}
function Ao(e) {
  const t = w && w.running;
  for (let n = 0; n < e.observers.length; n += 1) {
    const r = e.observers[n];
    (t ? !r.tState : !r.state) &&
      (t ? (r.tState = wt) : (r.state = wt),
      r.pure ? ne.push(r) : X.push(r),
      r.observers && Ao(r));
  }
}
function Me(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        r = e.sourceSlots.pop(),
        o = n.observers;
      if (o && o.length) {
        const i = o.pop(),
          a = n.observerSlots.pop();
        r < o.length &&
          ((i.sourceSlots[a] = r), (o[r] = i), (n.observerSlots[r] = a));
      }
    }
  if (w && w.running && e.pure) {
    if (e.tOwned) {
      for (t = e.tOwned.length - 1; t >= 0; t--) Me(e.tOwned[t]);
      delete e.tOwned;
    }
    _o(e, !0);
  } else if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) Me(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  w && w.running ? (e.tState = 0) : (e.state = 0);
}
function _o(e, t) {
  if ((t || ((e.tState = 0), w.disposed.add(e)), e.owned))
    for (let n = 0; n < e.owned.length; n++) _o(e.owned[n]);
}
function So(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function Er(e, t, n) {
  try {
    for (const r of t) r(e);
  } catch (r) {
    Pt(r, (n && n.owner) || null);
  }
}
function Pt(e, t = D) {
  const n = yt && t && t.context && t.context[yt],
    r = So(e);
  if (!n) throw r;
  X
    ? X.push({
        fn() {
          Er(r, n, t);
        },
        state: ae,
      })
    : Er(r, n, t);
}
function Dn(e) {
  if (typeof e == "function" && !e.length) return Dn(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const r = Dn(e[n]);
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r);
    }
    return t;
  }
  return e;
}
function va(e, t) {
  return function (r) {
    let o;
    return (
      ie(
        () =>
          (o = G(
            () => (
              (D.context = { ...D.context, [e]: r.value }), Yn(() => r.children)
            )
          )),
        void 0
      ),
      o
    );
  };
}
const wa = Symbol("fallback");
function Cr(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function Aa(e, t, n = {}) {
  let r = [],
    o = [],
    i = [],
    a = 0,
    s = t.length > 1 ? [] : null;
  return (
    de(() => Cr(i)),
    () => {
      let c = e() || [],
        l,
        u;
      return (
        c[fa],
        G(() => {
          let p = c.length,
            m,
            v,
            A,
            P,
            O,
            b,
            _,
            S,
            x;
          if (p === 0)
            a !== 0 &&
              (Cr(i), (i = []), (r = []), (o = []), (a = 0), s && (s = [])),
              n.fallback &&
                ((r = [wa]),
                (o[0] = Te(($) => ((i[0] = $), n.fallback()))),
                (a = 1));
          else if (a === 0) {
            for (o = new Array(p), u = 0; u < p; u++)
              (r[u] = c[u]), (o[u] = Te(g));
            a = p;
          } else {
            for (
              A = new Array(p),
                P = new Array(p),
                s && (O = new Array(p)),
                b = 0,
                _ = Math.min(a, p);
              b < _ && r[b] === c[b];
              b++
            );
            for (
              _ = a - 1, S = p - 1;
              _ >= b && S >= b && r[_] === c[S];
              _--, S--
            )
              (A[S] = o[_]), (P[S] = i[_]), s && (O[S] = s[_]);
            for (m = new Map(), v = new Array(S + 1), u = S; u >= b; u--)
              (x = c[u]),
                (l = m.get(x)),
                (v[u] = l === void 0 ? -1 : l),
                m.set(x, u);
            for (l = b; l <= _; l++)
              (x = r[l]),
                (u = m.get(x)),
                u !== void 0 && u !== -1
                  ? ((A[u] = o[l]),
                    (P[u] = i[l]),
                    s && (O[u] = s[l]),
                    (u = v[u]),
                    m.set(x, u))
                  : i[l]();
            for (u = b; u < p; u++)
              u in A
                ? ((o[u] = A[u]), (i[u] = P[u]), s && ((s[u] = O[u]), s[u](u)))
                : (o[u] = Te(g));
            (o = o.slice(0, (a = p))), (r = c.slice(0));
          }
          return o;
        })
      );
      function g(p) {
        if (((i[u] = p), s)) {
          const [m, v] = z(u);
          return (s[u] = v), t(c[u], m);
        }
        return t(c[u]);
      }
    }
  );
}
function M(e, t) {
  return G(() => e(t || {}));
}
function Dt() {
  return !0;
}
const Rn = {
  get(e, t, n) {
    return t === vt ? n : e.get(t);
  },
  has(e, t) {
    return t === vt ? !0 : e.has(t);
  },
  set: Dt,
  deleteProperty: Dt,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Dt,
      deleteProperty: Dt,
    };
  },
  ownKeys(e) {
    return e.keys();
  },
};
function pn(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function _a() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const n = this[e]();
    if (n !== void 0) return n;
  }
}
function Ut(...e) {
  let t = !1;
  for (let i = 0; i < e.length; i++) {
    const a = e[i];
    (t = t || (!!a && vt in a)),
      (e[i] = typeof a == "function" ? ((t = !0), B(a)) : a);
  }
  if (t)
    return new Proxy(
      {
        get(i) {
          for (let a = e.length - 1; a >= 0; a--) {
            const s = pn(e[a])[i];
            if (s !== void 0) return s;
          }
        },
        has(i) {
          for (let a = e.length - 1; a >= 0; a--) if (i in pn(e[a])) return !0;
          return !1;
        },
        keys() {
          const i = [];
          for (let a = 0; a < e.length; a++) i.push(...Object.keys(pn(e[a])));
          return [...new Set(i)];
        },
      },
      Rn
    );
  const n = {},
    r = {},
    o = new Set();
  for (let i = e.length - 1; i >= 0; i--) {
    const a = e[i];
    if (!a) continue;
    const s = Object.getOwnPropertyNames(a);
    for (let c = 0, l = s.length; c < l; c++) {
      const u = s[c];
      if (u === "__proto__" || u === "constructor") continue;
      const g = Object.getOwnPropertyDescriptor(a, u);
      if (!o.has(u))
        g.get
          ? (o.add(u),
            Object.defineProperty(n, u, {
              enumerable: !0,
              configurable: !0,
              get: _a.bind((r[u] = [g.get.bind(a)])),
            }))
          : (g.value !== void 0 && o.add(u), (n[u] = g.value));
      else {
        const p = r[u];
        p
          ? g.get
            ? p.push(g.get.bind(a))
            : g.value !== void 0 && p.push(() => g.value)
          : n[u] === void 0 && (n[u] = g.value);
      }
    }
  }
  return n;
}
function Eo(e, ...t) {
  if (vt in e) {
    const o = new Set(t.length > 1 ? t.flat() : t[0]),
      i = t.map(
        (a) =>
          new Proxy(
            {
              get(s) {
                return a.includes(s) ? e[s] : void 0;
              },
              has(s) {
                return a.includes(s) && s in e;
              },
              keys() {
                return a.filter((s) => s in e);
              },
            },
            Rn
          )
      );
    return (
      i.push(
        new Proxy(
          {
            get(a) {
              return o.has(a) ? void 0 : e[a];
            },
            has(a) {
              return o.has(a) ? !1 : a in e;
            },
            keys() {
              return Object.keys(e).filter((a) => !o.has(a));
            },
          },
          Rn
        )
      ),
      i
    );
  }
  const n = {},
    r = t.map(() => ({}));
  for (const o of Object.getOwnPropertyNames(e)) {
    const i = Object.getOwnPropertyDescriptor(e, o),
      a = !i.get && !i.set && i.enumerable && i.writable && i.configurable;
    let s = !1,
      c = 0;
    for (const l of t)
      l.includes(o) &&
        ((s = !0), a ? (r[c][o] = i.value) : Object.defineProperty(r[c], o, i)),
        ++c;
    s || (a ? (n[o] = i.value) : Object.defineProperty(n, o, i));
  }
  return [...r, n];
}
function ee(e) {
  let t, n;
  const r = (o) => {
    const i = I.context;
    if (i) {
      const [s, c] = z();
      I.count || (I.count = 0),
        I.count++,
        (n || (n = e())).then((l) => {
          we(i), I.count--, c(() => l.default), we();
        }),
        (t = s);
    } else if (!t) {
      const [s] = Jn(() => (n || (n = e())).then((c) => c.default));
      t = s;
    }
    let a;
    return B(
      () =>
        (a = t()) &&
        G(() => {
          if (!i) return a(o);
          const s = I.context;
          we(i);
          const c = a(o);
          return we(s), c;
        })
    );
  };
  return (
    (r.preload = () => n || ((n = e()).then((o) => (t = () => o.default)), n)),
    r
  );
}
let Sa = 0;
function Co() {
  const e = I.context;
  return e ? `${e.id}${e.count++}` : `cl-${Sa++}`;
}
const Po = (e) => `Stale read from <${e}>.`;
function Bd(e) {
  const t = "fallback" in e && { fallback: () => e.fallback };
  return B(Aa(() => e.each, e.children, t || void 0));
}
function ze(e) {
  const t = e.keyed,
    n = B(() => e.when, void 0, { equals: (r, o) => (t ? r === o : !r == !o) });
  return B(
    () => {
      const r = n();
      if (r) {
        const o = e.children;
        return typeof o == "function" && o.length > 0
          ? G(() =>
              o(
                t
                  ? r
                  : () => {
                      if (!G(n)) throw Po("Show");
                      return e.when;
                    }
              )
            )
          : o;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
function $d(e) {
  let t = !1;
  const n = (i, a) =>
      i[0] === a[0] && (t ? i[1] === a[1] : !i[1] == !a[1]) && i[2] === a[2],
    r = Yn(() => e.children),
    o = B(
      () => {
        let i = r();
        Array.isArray(i) || (i = [i]);
        for (let a = 0; a < i.length; a++) {
          const s = i[a].when;
          if (s) return (t = !!i[a].keyed), [a, s, i[a]];
        }
        return [-1];
      },
      void 0,
      { equals: n }
    );
  return B(
    () => {
      const [i, a, s] = o();
      if (i < 0) return e.fallback;
      const c = s.children;
      return typeof c == "function" && c.length > 0
        ? G(() =>
            c(
              t
                ? a
                : () => {
                    if (G(o)[0] !== i) throw Po("Match");
                    return s.when;
                  }
            )
          )
        : c;
    },
    void 0,
    void 0
  );
}
function Fd(e) {
  return e;
}
let at;
function To() {
  at && [...at].forEach((e) => e());
}
function Ea(e) {
  let t;
  I.context && I.load && (t = I.load(I.context.id + I.context.count));
  const [n, r] = z(t, void 0);
  return (
    at || (at = new Set()),
    at.add(r),
    de(() => at.delete(r)),
    B(
      () => {
        let o;
        if ((o = n())) {
          const i = e.fallback;
          return typeof i == "function" && i.length
            ? G(() => i(o, () => r()))
            : i;
        }
        return ha(() => e.children, r);
      },
      void 0,
      void 0
    )
  );
}
const Ca = Xe();
function Io(e) {
  let t = 0,
    n,
    r,
    o,
    i,
    a;
  const [s, c] = z(!1),
    l = ma(),
    u = {
      increment: () => {
        ++t === 1 && c(!0);
      },
      decrement: () => {
        --t === 0 && c(!1);
      },
      inFallback: s,
      effects: [],
      resolved: !1,
    },
    g = Wt();
  if (I.context && I.load) {
    const v = I.context.id + I.context.count;
    let A = I.load(v);
    if (
      (A && (typeof A != "object" || A.status !== "success") && (o = A),
      o && o !== "$$f")
    ) {
      const [P, O] = z(void 0, { equals: !1 });
      (i = P),
        o
          .then(() => {
            I.gather(v), we(r), O(), we();
          })
          .catch((b) => {
            if (b || I.done) return b && (a = b), O();
          });
    }
  }
  const p = Ae(Ca);
  p && (n = p.register(u.inFallback));
  let m;
  return (
    de(() => m && m()),
    M(l.Provider, {
      value: u,
      get children() {
        return B(() => {
          if (a) throw a;
          if (((r = I.context), i)) return i(), (i = void 0);
          r && o === "$$f" && we();
          const v = B(() => e.children);
          return B((A) => {
            const P = u.inFallback(),
              { showContent: O = !0, showFallback: b = !0 } = n ? n() : {};
            if ((!P || (o && o !== "$$f")) && O)
              return (
                (u.resolved = !0),
                m && m(),
                (m = r = o = void 0),
                pa(u.effects),
                v()
              );
            if (b)
              return m
                ? A
                : Te(
                    (_) => (
                      (m = _),
                      r && (we({ id: r.id + "f", count: 0 }), (r = void 0)),
                      e.fallback
                    ),
                    g
                  );
          });
        });
      },
    })
  );
}
const Pa = [
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "inert",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected",
  ],
  Ta = new Set([
    "className",
    "value",
    "readOnly",
    "formNoValidate",
    "isMap",
    "noModule",
    "playsInline",
    ...Pa,
  ]),
  Ia = new Set(["innerHTML", "textContent", "innerText", "children"]),
  ka = Object.assign(Object.create(null), {
    className: "class",
    htmlFor: "for",
  }),
  xa = Object.assign(Object.create(null), {
    class: "className",
    formnovalidate: { $: "formNoValidate", BUTTON: 1, INPUT: 1 },
    ismap: { $: "isMap", IMG: 1 },
    nomodule: { $: "noModule", SCRIPT: 1 },
    playsinline: { $: "playsInline", VIDEO: 1 },
    readonly: { $: "readOnly", INPUT: 1, TEXTAREA: 1 },
  });
function Oa(e, t) {
  const n = xa[e];
  return typeof n == "object" ? (n[t] ? n.$ : void 0) : n;
}
const Ma = new Set([
    "beforeinput",
    "click",
    "dblclick",
    "contextmenu",
    "focusin",
    "focusout",
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "pointerdown",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "touchend",
    "touchmove",
    "touchstart",
  ]),
  Da = new Set([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animate",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "color-profile",
    "cursor",
    "defs",
    "desc",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "font",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "foreignObject",
    "g",
    "glyph",
    "glyphRef",
    "hkern",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "metadata",
    "missing-glyph",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "set",
    "stop",
    "svg",
    "switch",
    "symbol",
    "text",
    "textPath",
    "tref",
    "tspan",
    "use",
    "view",
    "vkern",
  ]),
  Ra = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
  };
function La(e, t, n) {
  let r = n.length,
    o = t.length,
    i = r,
    a = 0,
    s = 0,
    c = t[o - 1].nextSibling,
    l = null;
  for (; a < o || s < i; ) {
    if (t[a] === n[s]) {
      a++, s++;
      continue;
    }
    for (; t[o - 1] === n[i - 1]; ) o--, i--;
    if (o === a) {
      const u = i < r ? (s ? n[s - 1].nextSibling : n[i - s]) : c;
      for (; s < i; ) e.insertBefore(n[s++], u);
    } else if (i === s)
      for (; a < o; ) (!l || !l.has(t[a])) && t[a].remove(), a++;
    else if (t[a] === n[i - 1] && n[s] === t[o - 1]) {
      const u = t[--o].nextSibling;
      e.insertBefore(n[s++], t[a++].nextSibling),
        e.insertBefore(n[--i], u),
        (t[o] = n[i]);
    } else {
      if (!l) {
        l = new Map();
        let g = s;
        for (; g < i; ) l.set(n[g], g++);
      }
      const u = l.get(t[a]);
      if (u != null)
        if (s < u && u < i) {
          let g = a,
            p = 1,
            m;
          for (
            ;
            ++g < o && g < i && !((m = l.get(t[g])) == null || m !== u + p);

          )
            p++;
          if (p > u - s) {
            const v = t[a];
            for (; s < u; ) e.insertBefore(n[s++], v);
          } else e.replaceChild(n[s++], t[a++]);
        } else a++;
      else t[a++].remove();
    }
  }
}
const Pr = "_$DX_DELEGATE";
function Na(e, t, n, r = {}) {
  let o;
  return (
    Te((i) => {
      (o = i),
        t === document ? e() : le(t, e(), t.firstChild ? null : void 0, n);
    }, r.owner),
    () => {
      o(), (t.textContent = "");
    }
  );
}
function tt(e, t, n) {
  let r;
  const o = () => {
      const a = document.createElement("template");
      return (
        (a.innerHTML = e),
        n ? a.content.firstChild.firstChild : a.content.firstChild
      );
    },
    i = t
      ? () => G(() => document.importNode(r || (r = o()), !0))
      : () => (r || (r = o())).cloneNode(!0);
  return (i.cloneNode = i), i;
}
function Tt(e, t = window.document) {
  const n = t[Pr] || (t[Pr] = new Set());
  for (let r = 0, o = e.length; r < o; r++) {
    const i = e[r];
    n.has(i) || (n.add(i), t.addEventListener(i, Ua));
  }
}
function Ln(e, t, n) {
  I.context || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n));
}
function Ba(e, t, n, r) {
  I.context ||
    (r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r));
}
function $a(e, t) {
  I.context || (t == null ? e.removeAttribute("class") : (e.className = t));
}
function ko(e, t, n, r) {
  if (r)
    Array.isArray(n)
      ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1]))
      : (e[`$$${t}`] = n);
  else if (Array.isArray(n)) {
    const o = n[0];
    e.addEventListener(t, (n[0] = (i) => o.call(e, n[1], i)));
  } else e.addEventListener(t, n);
}
function Fa(e, t, n = {}) {
  const r = Object.keys(t || {}),
    o = Object.keys(n);
  let i, a;
  for (i = 0, a = o.length; i < a; i++) {
    const s = o[i];
    !s || s === "undefined" || t[s] || (Tr(e, s, !1), delete n[s]);
  }
  for (i = 0, a = r.length; i < a; i++) {
    const s = r[i],
      c = !!t[s];
    !s || s === "undefined" || n[s] === c || !c || (Tr(e, s, !0), (n[s] = c));
  }
  return n;
}
function ja(e, t, n) {
  if (!t) return n ? Ln(e, "style") : t;
  const r = e.style;
  if (typeof t == "string") return (r.cssText = t);
  typeof n == "string" && (r.cssText = n = void 0),
    n || (n = {}),
    t || (t = {});
  let o, i;
  for (i in n) t[i] == null && r.removeProperty(i), delete n[i];
  for (i in t) (o = t[i]), o !== n[i] && (r.setProperty(i, o), (n[i] = o));
  return n;
}
function De(e, t = {}, n, r) {
  const o = {};
  return (
    r || ie(() => (o.children = st(e, t.children, o.children))),
    ie(() => t.ref && t.ref(e)),
    ie(() => Wa(e, t, n, !0, o, !0)),
    o
  );
}
function jd(e, t, n) {
  return G(() => e(t, n));
}
function le(e, t, n, r) {
  if ((n !== void 0 && !r && (r = []), typeof t != "function"))
    return st(e, t, r, n);
  ie((o) => st(e, t(), o, n), r);
}
function Wa(e, t, n, r, o = {}, i = !1) {
  t || (t = {});
  for (const a in o)
    if (!(a in t)) {
      if (a === "children") continue;
      o[a] = Ir(e, a, null, o[a], n, i);
    }
  for (const a in t) {
    if (a === "children") {
      r || st(e, t.children);
      continue;
    }
    const s = t[a];
    o[a] = Ir(e, a, s, o[a], n, i);
  }
}
function Ha(e) {
  let t, n;
  return !I.context || !(t = I.registry.get((n = qa())))
    ? e()
    : (I.completed && I.completed.add(t), I.registry.delete(n), t);
}
function Va(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase());
}
function Tr(e, t, n) {
  const r = t.trim().split(/\s+/);
  for (let o = 0, i = r.length; o < i; o++) e.classList.toggle(r[o], n);
}
function Ir(e, t, n, r, o, i) {
  let a, s, c, l, u;
  if (t === "style") return ja(e, n, r);
  if (t === "classList") return Fa(e, n, r);
  if (n === r) return r;
  if (t === "ref") i || n(e);
  else if (t.slice(0, 3) === "on:") {
    const g = t.slice(3);
    r && e.removeEventListener(g, r), n && e.addEventListener(g, n);
  } else if (t.slice(0, 10) === "oncapture:") {
    const g = t.slice(10);
    r && e.removeEventListener(g, r, !0), n && e.addEventListener(g, n, !0);
  } else if (t.slice(0, 2) === "on") {
    const g = t.slice(2).toLowerCase(),
      p = Ma.has(g);
    if (!p && r) {
      const m = Array.isArray(r) ? r[0] : r;
      e.removeEventListener(g, m);
    }
    (p || n) && (ko(e, g, n, p), p && Tt([g]));
  } else if (t.slice(0, 5) === "attr:") Ln(e, t.slice(5), n);
  else if (
    (u = t.slice(0, 5) === "prop:") ||
    (c = Ia.has(t)) ||
    (!o && ((l = Oa(t, e.tagName)) || (s = Ta.has(t)))) ||
    (a = e.nodeName.includes("-"))
  ) {
    if (u) (t = t.slice(5)), (s = !0);
    else if (I.context) return n;
    t === "class" || t === "className"
      ? $a(e, n)
      : a && !s && !c
      ? (e[Va(t)] = n)
      : (e[l || t] = n);
  } else {
    const g = o && t.indexOf(":") > -1 && Ra[t.split(":")[0]];
    g ? Ba(e, g, t, n) : Ln(e, ka[t] || t, n);
  }
  return n;
}
function Ua(e) {
  const t = `$$${e.type}`;
  let n = (e.composedPath && e.composedPath()[0]) || e.target;
  for (
    e.target !== n &&
      Object.defineProperty(e, "target", { configurable: !0, value: n }),
      Object.defineProperty(e, "currentTarget", {
        configurable: !0,
        get() {
          return n || document;
        },
      }),
      I.registry && !I.done && (I.done = _$HY.done = !0);
    n;

  ) {
    const r = n[t];
    if (r && !n.disabled) {
      const o = n[`${t}Data`];
      if ((o !== void 0 ? r.call(n, o, e) : r.call(n, e), e.cancelBubble))
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function st(e, t, n, r, o) {
  if (I.context) {
    !n && (n = [...e.childNodes]);
    let s = [];
    for (let c = 0; c < n.length; c++) {
      const l = n[c];
      l.nodeType === 8 && l.data.slice(0, 2) === "!$" ? l.remove() : s.push(l);
    }
    n = s;
  }
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const i = typeof t,
    a = r !== void 0;
  if (
    ((e = (a && n[0] && n[0].parentNode) || e),
    i === "string" || i === "number")
  ) {
    if (I.context) return n;
    if ((i === "number" && (t = t.toString()), a)) {
      let s = n[0];
      s && s.nodeType === 3 ? (s.data = t) : (s = document.createTextNode(t)),
        (n = rt(e, n, r, s));
    } else
      n !== "" && typeof n == "string"
        ? (n = e.firstChild.data = t)
        : (n = e.textContent = t);
  } else if (t == null || i === "boolean") {
    if (I.context) return n;
    n = rt(e, n, r);
  } else {
    if (i === "function")
      return (
        ie(() => {
          let s = t();
          for (; typeof s == "function"; ) s = s();
          n = st(e, s, n, r);
        }),
        () => n
      );
    if (Array.isArray(t)) {
      const s = [],
        c = n && Array.isArray(n);
      if (Nn(s, t, n, o)) return ie(() => (n = st(e, s, n, r, !0))), () => n;
      if (I.context) {
        if (!s.length) return n;
        if (r === void 0) return [...e.childNodes];
        let l = s[0],
          u = [l];
        for (; (l = l.nextSibling) !== r; ) u.push(l);
        return (n = u);
      }
      if (s.length === 0) {
        if (((n = rt(e, n, r)), a)) return n;
      } else
        c
          ? n.length === 0
            ? kr(e, s, r)
            : La(e, n, s)
          : (n && rt(e), kr(e, s));
      n = s;
    } else if (t.nodeType) {
      if (I.context && t.parentNode) return (n = a ? [t] : t);
      if (Array.isArray(n)) {
        if (a) return (n = rt(e, n, r, t));
        rt(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function Nn(e, t, n, r) {
  let o = !1;
  for (let i = 0, a = t.length; i < a; i++) {
    let s = t[i],
      c = n && n[i],
      l;
    if (!(s == null || s === !0 || s === !1))
      if ((l = typeof s) == "object" && s.nodeType) e.push(s);
      else if (Array.isArray(s)) o = Nn(e, s, c) || o;
      else if (l === "function")
        if (r) {
          for (; typeof s == "function"; ) s = s();
          o =
            Nn(e, Array.isArray(s) ? s : [s], Array.isArray(c) ? c : [c]) || o;
        } else e.push(s), (o = !0);
      else {
        const u = String(s);
        c && c.nodeType === 3 && c.data === u
          ? e.push(c)
          : e.push(document.createTextNode(u));
      }
  }
  return o;
}
function kr(e, t, n = null) {
  for (let r = 0, o = t.length; r < o; r++) e.insertBefore(t[r], n);
}
function rt(e, t, n, r) {
  if (n === void 0) return (e.textContent = "");
  const o = r || document.createTextNode("");
  if (t.length) {
    let i = !1;
    for (let a = t.length - 1; a >= 0; a--) {
      const s = t[a];
      if (o !== s) {
        const c = s.parentNode === e;
        !i && !a
          ? c
            ? e.replaceChild(o, s)
            : e.insertBefore(o, n)
          : c && s.remove();
      } else i = !0;
    }
  } else e.insertBefore(o, n);
  return [o];
}
function qa() {
  const e = I.context;
  return `${e.id}${e.count++}`;
}
function za(e) {
  return I.context ? void 0 : e.children;
}
const xo = !1,
  Ka = "http://www.w3.org/2000/svg";
function Oo(e, t = !1) {
  return t ? document.createElementNS(Ka, e) : document.createElement(e);
}
function Wd(e) {
  const { useShadow: t } = e,
    n = document.createTextNode(""),
    r = () => e.mount || document.body,
    o = Wt();
  let i,
    a = !!I.context;
  return (
    At(
      () => {
        a && (Wt().user = a = !1), i || (i = bo(o, () => B(() => e.children)));
        const s = r();
        if (s instanceof HTMLHeadElement) {
          const [c, l] = z(!1),
            u = () => l(!0);
          Te((g) => le(s, () => (c() ? g() : i()), null)), de(u);
        } else {
          const c = Oo(e.isSVG ? "g" : "div", e.isSVG),
            l = t && c.attachShadow ? c.attachShadow({ mode: "open" }) : c;
          Object.defineProperty(c, "_$host", {
            get() {
              return n.parentNode;
            },
            configurable: !0,
          }),
            le(l, i),
            s.appendChild(c),
            e.ref && e.ref(c),
            de(() => s.removeChild(c));
        }
      },
      void 0,
      { render: !a }
    ),
    n
  );
}
function Hd(e) {
  const [t, n] = Eo(e, ["component"]),
    r = B(() => t.component);
  return B(() => {
    const o = r();
    switch (typeof o) {
      case "function":
        return G(() => o(n));
      case "string":
        const i = Da.has(o),
          a = I.context ? Ha() : Oo(o, i);
        return De(a, n, i), a;
    }
  });
}
const Ga = "modulepreload",
  Ja = function (e) {
    return "/utf/" + e;
  },
  xr = {},
  U = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const o = document.getElementsByTagName("link");
    return Promise.all(
      n.map((i) => {
        if (((i = Ja(i)), i in xr)) return;
        xr[i] = !0;
        const a = i.endsWith(".css"),
          s = a ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let u = o.length - 1; u >= 0; u--) {
            const g = o[u];
            if (g.href === i && (!a || g.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${i}"]${s}`)) return;
        const l = document.createElement("link");
        if (
          ((l.rel = a ? "stylesheet" : Ga),
          a || ((l.as = "script"), (l.crossOrigin = "")),
          (l.href = i),
          document.head.appendChild(l),
          a)
        )
          return new Promise((u, g) => {
            l.addEventListener("load", u),
              l.addEventListener("error", () =>
                g(new Error(`Unable to preload CSS for ${i}`))
              );
          });
      })
    )
      .then(() => t())
      .catch((i) => {
        const a = new Event("vite:preloadError", { cancelable: !0 });
        if (((a.payload = i), window.dispatchEvent(a), !a.defaultPrevented))
          throw i;
      });
  },
  Za = Symbol("store-raw"),
  Ya = Symbol("store-node"),
  ot = Symbol("store-has"),
  Qa = Symbol("store-self");
function _t(e) {
  let t;
  return (
    e != null &&
    typeof e == "object" &&
    (e[vt] ||
      !(t = Object.getPrototypeOf(e)) ||
      t === Object.prototype ||
      Array.isArray(e))
  );
}
function Bn(e, t = new Set()) {
  let n, r, o, i;
  if ((n = e != null && e[Za])) return n;
  if (!_t(e) || t.has(e)) return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? (e = e.slice(0)) : t.add(e);
    for (let a = 0, s = e.length; a < s; a++)
      (o = e[a]), (r = Bn(o, t)) !== o && (e[a] = r);
  } else {
    Object.isFrozen(e) ? (e = Object.assign({}, e)) : t.add(e);
    const a = Object.keys(e),
      s = Object.getOwnPropertyDescriptors(e);
    for (let c = 0, l = a.length; c < l; c++)
      (i = a[c]), !s[i].get && ((o = e[i]), (r = Bn(o, t)) !== o && (e[i] = r));
  }
  return e;
}
function Xa(e, t) {
  let n = e[t];
  return (
    n || Object.defineProperty(e, t, { value: (n = Object.create(null)) }), n
  );
}
function Or(e, t, n) {
  if (e[t]) return e[t];
  const [r, o] = z(n, { equals: !1, internal: !0 });
  return (r.$ = o), (e[t] = r);
}
function Ee(e, t, n, r = !1) {
  if (!r && e[t] === n) return;
  const o = e[t],
    i = e.length;
  n === void 0
    ? (delete e[t], e[ot] && e[ot][t] && o !== void 0 && e[ot][t].$())
    : ((e[t] = n), e[ot] && e[ot][t] && o === void 0 && e[ot][t].$());
  let a = Xa(e, Ya),
    s;
  if (((s = Or(a, t, o)) && s.$(() => n), Array.isArray(e) && e.length !== i)) {
    for (let c = e.length; c < i; c++) (s = a[c]) && s.$();
    (s = Or(a, "length", i)) && s.$(e.length);
  }
  (s = a[Qa]) && s.$();
}
const $n = Symbol("store-root");
function it(e, t, n, r, o) {
  const i = t[n];
  if (e === i) return;
  if (n !== $n && (!_t(e) || !_t(i) || (o && e[o] !== i[o]))) {
    Ee(t, n, e);
    return;
  }
  if (Array.isArray(e)) {
    if (e.length && i.length && (!r || (o && e[0] && e[0][o] != null))) {
      let c, l, u, g, p, m, v, A;
      for (
        u = 0, g = Math.min(i.length, e.length);
        u < g && (i[u] === e[u] || (o && i[u] && e[u] && i[u][o] === e[u][o]));
        u++
      )
        it(e[u], i, u, r, o);
      const P = new Array(e.length),
        O = new Map();
      for (
        g = i.length - 1, p = e.length - 1;
        g >= u &&
        p >= u &&
        (i[g] === e[p] || (o && i[u] && e[u] && i[g][o] === e[p][o]));
        g--, p--
      )
        P[p] = i[g];
      if (u > p || u > g) {
        for (l = u; l <= p; l++) Ee(i, l, e[l]);
        for (; l < e.length; l++) Ee(i, l, P[l]), it(e[l], i, l, r, o);
        i.length > e.length && Ee(i, "length", e.length);
        return;
      }
      for (v = new Array(p + 1), l = p; l >= u; l--)
        (m = e[l]),
          (A = o && m ? m[o] : m),
          (c = O.get(A)),
          (v[l] = c === void 0 ? -1 : c),
          O.set(A, l);
      for (c = u; c <= g; c++)
        (m = i[c]),
          (A = o && m ? m[o] : m),
          (l = O.get(A)),
          l !== void 0 && l !== -1 && ((P[l] = i[c]), (l = v[l]), O.set(A, l));
      for (l = u; l < e.length; l++)
        l in P ? (Ee(i, l, P[l]), it(e[l], i, l, r, o)) : Ee(i, l, e[l]);
    } else for (let c = 0, l = e.length; c < l; c++) it(e[c], i, c, r, o);
    i.length > e.length && Ee(i, "length", e.length);
    return;
  }
  const a = Object.keys(e);
  for (let c = 0, l = a.length; c < l; c++) it(e[a[c]], i, a[c], r, o);
  const s = Object.keys(i);
  for (let c = 0, l = s.length; c < l; c++)
    e[s[c]] === void 0 && Ee(i, s[c], void 0);
}
function es(e, t = {}) {
  const { merge: n, key: r = "id" } = t,
    o = Bn(e);
  return (i) => {
    if (!_t(i) || !_t(o)) return o;
    const a = it(o, { [$n]: i }, $n, n, r);
    return a === void 0 ? i : a;
  };
}
function ts(e, t) {
  e && t && Na(e, t === document ? t.body : t);
}
const Mo = Xe(),
  ns = ["title", "meta"],
  Mr = [],
  Dr = ["name", "http-equiv", "content", "charset", "media"].concat([
    "property",
  ]),
  Rr = (e, t) => {
    const n = Object.fromEntries(
      Object.entries(e.props)
        .filter(([r]) => t.includes(r))
        .sort()
    );
    return (
      (Object.hasOwn(n, "name") || Object.hasOwn(n, "property")) &&
        ((n.name = n.name || n.property), delete n.property),
      e.tag + JSON.stringify(n)
    );
  };
function rs() {
  if (!I.context) {
    const n = document.head.querySelectorAll("[data-sm]");
    Array.prototype.forEach.call(n, (r) => r.parentNode.removeChild(r));
  }
  const e = new Map();
  function t(n) {
    if (n.ref) return n.ref;
    let r = document.querySelector(`[data-sm="${n.id}"]`);
    return (
      r
        ? (r.tagName.toLowerCase() !== n.tag &&
            (r.parentNode && r.parentNode.removeChild(r),
            (r = document.createElement(n.tag))),
          r.removeAttribute("data-sm"))
        : (r = document.createElement(n.tag)),
      r
    );
  }
  return {
    addTag(n) {
      if (ns.indexOf(n.tag) !== -1) {
        const i = n.tag === "title" ? Mr : Dr,
          a = Rr(n, i);
        e.has(a) || e.set(a, []);
        let s = e.get(a),
          c = s.length;
        (s = [...s, n]), e.set(a, s);
        let l = t(n);
        (n.ref = l), De(l, n.props);
        let u = null;
        for (var r = c - 1; r >= 0; r--)
          if (s[r] != null) {
            u = s[r];
            break;
          }
        return (
          l.parentNode != document.head && document.head.appendChild(l),
          u && u.ref && document.head.removeChild(u.ref),
          c
        );
      }
      let o = t(n);
      return (
        (n.ref = o),
        De(o, n.props),
        o.parentNode != document.head && document.head.appendChild(o),
        -1
      );
    },
    removeTag(n, r) {
      const o = n.tag === "title" ? Mr : Dr,
        i = Rr(n, o);
      if (n.ref) {
        const a = e.get(i);
        if (a) {
          if (n.ref.parentNode) {
            n.ref.parentNode.removeChild(n.ref);
            for (let s = r - 1; s >= 0; s--)
              a[s] != null && document.head.appendChild(a[s].ref);
          }
          (a[r] = null), e.set(i, a);
        } else n.ref.parentNode && n.ref.parentNode.removeChild(n.ref);
      }
    },
  };
}
const Do = (e) => {
    const t = rs();
    return M(Mo.Provider, {
      value: t,
      get children() {
        return e.children;
      },
    });
  },
  Qn = (e, t, n) => (
    os({
      tag: e,
      props: t,
      setting: n,
      id: Co(),
      get name() {
        return t.name || t.property;
      },
    }),
    null
  );
function os(e) {
  const t = Ae(Mo);
  if (!t) throw new Error("<MetaProvider /> should be in the tree");
  ie(() => {
    const n = t.addTag(e);
    de(() => t.removeTag(e, n));
  });
}
const is = (e) => Qn("title", e, { escape: !0, close: !0 }),
  bt = (e) => Qn("meta", e),
  as = (e) => Qn("link", e);
function ss(e, t, n) {
  return e.addEventListener(t, n), () => e.removeEventListener(t, n);
}
function cs([e, t], n, r) {
  return [n ? () => n(e()) : e, r ? (o) => t(r(o)) : t];
}
function ls(e) {
  try {
    return document.querySelector(e);
  } catch {
    return null;
  }
}
function us(e, t) {
  const n = ls(`#${e}`);
  n ? n.scrollIntoView() : t && window.scrollTo(0, 0);
}
function fs(e, t, n, r) {
  let o = !1;
  const i = (s) => (typeof s == "string" ? { value: s } : s),
    a = cs(
      z(i(e()), { equals: (s, c) => s.value === c.value }),
      void 0,
      (s) => (!o && t(s), s)
    );
  return (
    n &&
      de(
        n((s = e()) => {
          (o = !0), a[1](i(s)), (o = !1);
        })
      ),
    { signal: a, utils: r }
  );
}
function ds(e) {
  if (e) {
    if (Array.isArray(e)) return { signal: e };
  } else return { signal: z({ value: "" }) };
  return e;
}
function hs() {
  return fs(
    () => ({
      value:
        window.location.pathname +
        window.location.search +
        window.location.hash,
      state: history.state,
    }),
    ({ value: e, replace: t, scroll: n, state: r }) => {
      t
        ? window.history.replaceState(r, "", e)
        : window.history.pushState(r, "", e),
        us(window.location.hash.slice(1), n);
    },
    (e) => ss(window, "popstate", () => e()),
    { go: (e) => window.history.go(e) }
  );
}
function gs() {
  let e = new Set();
  function t(o) {
    return e.add(o), () => e.delete(o);
  }
  let n = !1;
  function r(o, i) {
    if (n) return !(n = !1);
    const a = {
      to: o,
      options: i,
      defaultPrevented: !1,
      preventDefault: () => (a.defaultPrevented = !0),
    };
    for (const s of e)
      s.listener({
        ...a,
        from: s.location,
        retry: (c) => {
          c && (n = !0), s.navigate(o, i);
        },
      });
    return !a.defaultPrevented;
  }
  return { subscribe: t, confirm: r };
}
const ps = /^(?:[a-z0-9]+:)?\/\//i,
  ms = /^\/+|(\/)\/+$/g;
function Ue(e, t = !1) {
  const n = e.replace(ms, "$1");
  return n ? (t || /^[?#]/.test(n) ? n : "/" + n) : "";
}
function $t(e, t, n) {
  if (ps.test(t)) return;
  const r = Ue(e),
    o = n && Ue(n);
  let i = "";
  return (
    !o || t.startsWith("/")
      ? (i = r)
      : o.toLowerCase().indexOf(r.toLowerCase()) !== 0
      ? (i = r + o)
      : (i = o),
    (i || "/") + Ue(t, !i)
  );
}
function bs(e, t) {
  if (e == null) throw new Error(t);
  return e;
}
function Ro(e, t) {
  return Ue(e).replace(/\/*(\*.*)?$/g, "") + Ue(t);
}
function ys(e) {
  const t = {};
  return (
    e.searchParams.forEach((n, r) => {
      t[r] = n;
    }),
    t
  );
}
function vs(e, t, n) {
  const [r, o] = e.split("/*", 2),
    i = r.split("/").filter(Boolean),
    a = i.length;
  return (s) => {
    const c = s.split("/").filter(Boolean),
      l = c.length - a;
    if (l < 0 || (l > 0 && o === void 0 && !t)) return null;
    const u = { path: a ? "" : "/", params: {} },
      g = (p) => (n === void 0 ? void 0 : n[p]);
    for (let p = 0; p < a; p++) {
      const m = i[p],
        v = c[p],
        A = m[0] === ":",
        P = A ? m.slice(1) : m;
      if (A && mn(v, g(P))) u.params[P] = v;
      else if (A || !mn(v, m)) return null;
      u.path += `/${v}`;
    }
    if (o) {
      const p = l ? c.slice(-l).join("/") : "";
      if (mn(p, g(o))) u.params[o] = p;
      else return null;
    }
    return u;
  };
}
function mn(e, t) {
  const n = (r) => r.localeCompare(e, void 0, { sensitivity: "base" }) === 0;
  return t === void 0
    ? !0
    : typeof t == "string"
    ? n(t)
    : typeof t == "function"
    ? t(e)
    : Array.isArray(t)
    ? t.some(n)
    : t instanceof RegExp
    ? t.test(e)
    : !1;
}
function ws(e) {
  const [t, n] = e.pattern.split("/*", 2),
    r = t.split("/").filter(Boolean);
  return r.reduce(
    (o, i) => o + (i.startsWith(":") ? 2 : 3),
    r.length - (n === void 0 ? 0 : 1)
  );
}
function Lo(e) {
  const t = new Map(),
    n = Wt();
  return new Proxy(
    {},
    {
      get(r, o) {
        return (
          t.has(o) ||
            bo(n, () =>
              t.set(
                o,
                B(() => e()[o])
              )
            ),
          t.get(o)()
        );
      },
      getOwnPropertyDescriptor() {
        return { enumerable: !0, configurable: !0 };
      },
      ownKeys() {
        return Reflect.ownKeys(e());
      },
    }
  );
}
function As(e, t) {
  const n = new URLSearchParams(e);
  Object.entries(t).forEach(([o, i]) => {
    i == null || i === "" ? n.delete(o) : n.set(o, String(i));
  });
  const r = n.toString();
  return r ? `?${r}` : "";
}
function No(e) {
  let t = /(\/?\:[^\/]+)\?/.exec(e);
  if (!t) return [e];
  let n = e.slice(0, t.index),
    r = e.slice(t.index + t[0].length);
  const o = [n, (n += t[1])];
  for (; (t = /^(\/\:[^\/]+)\?/.exec(r)); )
    o.push((n += t[1])), (r = r.slice(t[0].length));
  return No(r).reduce((i, a) => [...i, ...o.map((s) => s + a)], []);
}
const _s = 100,
  Bo = Xe(),
  Xt = Xe(),
  It = () => bs(Ae(Bo), "Make sure your app is wrapped in a <Router />");
let St;
const en = () => St || Ae(Xt) || It().base,
  Ss = (e) => {
    const t = en();
    return B(() => t.resolvePath(e()));
  },
  Es = (e) => {
    const t = It();
    return B(() => {
      const n = e();
      return n !== void 0 ? t.renderPath(n) : n;
    });
  },
  Xn = () => It().navigatorFactory(),
  er = () => It().location,
  Vd = () => en().params,
  Ud = () => {
    const e = er(),
      t = Xn(),
      n = (r, o) => {
        const i = G(() => e.pathname + As(e.search, r) + e.hash);
        t(i, { scroll: !1, resolve: !1, ...o });
      };
    return [e.query, n];
  };
function Cs(e, t = "", n) {
  const { component: r, data: o, children: i } = e,
    a = !i || (Array.isArray(i) && !i.length),
    s = {
      key: e,
      element: r
        ? () => M(r, {})
        : () => {
            const { element: c } = e;
            return c === void 0 && n ? M(n, {}) : c;
          },
      preload: e.component ? r.preload : e.preload,
      data: o,
    };
  return $o(e.path).reduce((c, l) => {
    for (const u of No(l)) {
      const g = Ro(t, u),
        p = a ? g : g.split("/*", 1)[0];
      c.push({
        ...s,
        originalPath: u,
        pattern: p,
        matcher: vs(p, !a, e.matchFilters),
      });
    }
    return c;
  }, []);
}
function Ps(e, t = 0) {
  return {
    routes: e,
    score: ws(e[e.length - 1]) * 1e4 - t,
    matcher(n) {
      const r = [];
      for (let o = e.length - 1; o >= 0; o--) {
        const i = e[o],
          a = i.matcher(n);
        if (!a) return null;
        r.unshift({ ...a, route: i });
      }
      return r;
    },
  };
}
function $o(e) {
  return Array.isArray(e) ? e : [e];
}
function Fo(e, t = "", n, r = [], o = []) {
  const i = $o(e);
  for (let a = 0, s = i.length; a < s; a++) {
    const c = i[a];
    if (c && typeof c == "object" && c.hasOwnProperty("path")) {
      const l = Cs(c, t, n);
      for (const u of l) {
        r.push(u);
        const g = Array.isArray(c.children) && c.children.length === 0;
        if (c.children && !g) Fo(c.children, u.pattern, n, r, o);
        else {
          const p = Ps([...r], o.length);
          o.push(p);
        }
        r.pop();
      }
    }
  }
  return r.length ? o : o.sort((a, s) => s.score - a.score);
}
function Ts(e, t) {
  for (let n = 0, r = e.length; n < r; n++) {
    const o = e[n].matcher(t);
    if (o) return o;
  }
  return [];
}
function Is(e, t) {
  const n = new URL("http://sar"),
    r = B(
      (c) => {
        const l = e();
        try {
          return new URL(l, n);
        } catch {
          return console.error(`Invalid path ${l}`), c;
        }
      },
      n,
      { equals: (c, l) => c.href === l.href }
    ),
    o = B(() => r().pathname),
    i = B(() => r().search, !0),
    a = B(() => r().hash),
    s = B(() => "");
  return {
    get pathname() {
      return o();
    },
    get search() {
      return i();
    },
    get hash() {
      return a();
    },
    get state() {
      return t();
    },
    get key() {
      return s();
    },
    query: Lo(Zn(i, () => ys(r()))),
  };
}
function ks(e, t = "", n, r) {
  const {
      signal: [o, i],
      utils: a = {},
    } = ds(e),
    s = a.parsePath || ((F) => F),
    c = a.renderPath || ((F) => F),
    l = a.beforeLeave || gs(),
    u = $t("", t),
    g = void 0;
  if (u === void 0) throw new Error(`${u} is not a valid base path`);
  u && !o().value && i({ value: u, replace: !0, scroll: !1 });
  const [p, m] = z(!1),
    v = async (F) => {
      m(!0);
      try {
        await ga(F);
      } finally {
        m(!1);
      }
    },
    [A, P] = z(o().value),
    [O, b] = z(o().state),
    _ = Is(A, O),
    S = [],
    x = {
      pattern: u,
      params: {},
      path: () => u,
      outlet: () => null,
      resolvePath(F) {
        return $t(u, F);
      },
    };
  if (n)
    try {
      (St = x),
        (x.data = n({ data: void 0, params: {}, location: _, navigate: Z(x) }));
    } finally {
      St = void 0;
    }
  function $(F, C, R) {
    G(() => {
      if (typeof C == "number") {
        C &&
          (a.go
            ? l.confirm(C, R) && a.go(C)
            : console.warn(
                "Router integration does not support relative routing"
              ));
        return;
      }
      const {
          replace: H,
          resolve: te,
          scroll: he,
          state: be,
        } = { replace: !1, resolve: !0, scroll: !0, ...R },
        fe = te ? F.resolvePath(C) : $t("", C);
      if (fe === void 0) throw new Error(`Path '${C}' is not a routable path`);
      if (S.length >= _s) throw new Error("Too many redirects");
      const Ne = A();
      if ((fe !== Ne || be !== O()) && !xo) {
        if (l.confirm(fe, R)) {
          const _e = S.push({ value: Ne, replace: H, scroll: he, state: O() });
          v(() => {
            P(fe), b(be), To();
          }).then(() => {
            S.length === _e && se({ value: fe, state: be });
          });
        }
      }
    });
  }
  function Z(F) {
    return (F = F || Ae(Xt) || x), (C, R) => $(F, C, R);
  }
  function se(F) {
    const C = S[0];
    C &&
      ((F.value !== C.value || F.state !== C.state) &&
        i({ ...F, replace: C.replace, scroll: C.scroll }),
      (S.length = 0));
  }
  ie(() => {
    const { value: F, state: C } = o();
    G(() => {
      F !== A() &&
        v(() => {
          P(F), b(C);
        });
    });
  });
  {
    let F = function (C) {
      if (
        C.defaultPrevented ||
        C.button !== 0 ||
        C.metaKey ||
        C.altKey ||
        C.ctrlKey ||
        C.shiftKey
      )
        return;
      const R = C.composedPath().find(
        (Ne) => Ne instanceof Node && Ne.nodeName.toUpperCase() === "A"
      );
      if (!R || !R.hasAttribute("link")) return;
      const H = R.href;
      if (R.target || (!H && !R.hasAttribute("state"))) return;
      const te = (R.getAttribute("rel") || "").split(/\s+/);
      if (R.hasAttribute("download") || (te && te.includes("external"))) return;
      const he = new URL(H);
      if (
        he.origin !== window.location.origin ||
        (u &&
          he.pathname &&
          !he.pathname.toLowerCase().startsWith(u.toLowerCase()))
      )
        return;
      const be = s(he.pathname + he.search + he.hash),
        fe = R.getAttribute("state");
      C.preventDefault(),
        $(x, be, {
          resolve: !1,
          replace: R.hasAttribute("replace"),
          scroll: !R.hasAttribute("noscroll"),
          state: fe && JSON.parse(fe),
        });
    };
    Tt(["click"]),
      document.addEventListener("click", F),
      de(() => document.removeEventListener("click", F));
  }
  return {
    base: x,
    out: g,
    location: _,
    isRouting: p,
    renderPath: c,
    parsePath: s,
    navigatorFactory: Z,
    beforeLeave: l,
  };
}
function xs(e, t, n, r, o) {
  const { base: i, location: a, navigatorFactory: s } = e,
    { pattern: c, element: l, preload: u, data: g } = r().route,
    p = B(() => r().path);
  u && u();
  const m = {
    parent: t,
    pattern: c,
    get child() {
      return n();
    },
    path: p,
    params: o,
    data: t.data,
    outlet: l,
    resolvePath(v) {
      return $t(i.path(), v, p());
    },
  };
  if (g)
    try {
      (St = m),
        (m.data = g({ data: t.data, params: o, location: a, navigate: s(m) }));
    } finally {
      St = void 0;
    }
  return m;
}
const Os = tt("<a link>"),
  Ms = (e) => {
    const { source: t, url: n, base: r, data: o, out: i } = e,
      a = t || hs(),
      s = ks(a, r, o);
    return M(Bo.Provider, {
      value: s,
      get children() {
        return e.children;
      },
    });
  },
  Ds = (e) => {
    const t = It(),
      n = en(),
      r = Yn(() => e.children),
      o = B(() => Fo(r(), Ro(n.pattern, e.base || ""), jo)),
      i = B(() => Ts(o(), t.location.pathname)),
      a = Lo(() => {
        const u = i(),
          g = {};
        for (let p = 0; p < u.length; p++) Object.assign(g, u[p].params);
        return g;
      });
    t.out &&
      t.out.matches.push(
        i().map(({ route: u, path: g, params: p }) => ({
          originalPath: u.originalPath,
          pattern: u.pattern,
          path: g,
          params: p,
        }))
      );
    const s = [];
    let c;
    const l = B(
      Zn(i, (u, g, p) => {
        let m = g && u.length === g.length;
        const v = [];
        for (let A = 0, P = u.length; A < P; A++) {
          const O = g && g[A],
            b = u[A];
          p && O && b.route.key === O.route.key
            ? (v[A] = p[A])
            : ((m = !1),
              s[A] && s[A](),
              Te((_) => {
                (s[A] = _),
                  (v[A] = xs(
                    t,
                    v[A - 1] || n,
                    () => l()[A + 1],
                    () => i()[A],
                    a
                  ));
              }));
        }
        return (
          s.splice(u.length).forEach((A) => A()), p && m ? p : ((c = v[0]), v)
        );
      })
    );
    return M(ze, {
      get when() {
        return l() && c;
      },
      keyed: !0,
      children: (u) =>
        M(Xt.Provider, {
          value: u,
          get children() {
            return u.outlet();
          },
        }),
    });
  },
  jo = () => {
    const e = en();
    return M(ze, {
      get when() {
        return e.child;
      },
      keyed: !0,
      children: (t) =>
        M(Xt.Provider, {
          value: t,
          get children() {
            return t.outlet();
          },
        }),
    });
  };
function Rs(e) {
  e = Ut({ inactiveClass: "inactive", activeClass: "active" }, e);
  const [, t] = Eo(e, [
      "href",
      "state",
      "class",
      "activeClass",
      "inactiveClass",
      "end",
    ]),
    n = Ss(() => e.href),
    r = Es(n),
    o = er(),
    i = B(() => {
      const a = n();
      if (a === void 0) return !1;
      const s = Ue(a.split(/[?#]/, 1)[0]).toLowerCase(),
        c = Ue(o.pathname).toLowerCase();
      return e.end ? s === c : c.startsWith(s);
    });
  return (() => {
    const a = Os();
    return (
      De(
        a,
        Ut(t, {
          get href() {
            return r() || e.href;
          },
          get state() {
            return JSON.stringify(e.state);
          },
          get classList() {
            return {
              ...(e.class && { [e.class]: !0 }),
              [e.inactiveClass]: !i(),
              [e.activeClass]: i(),
              ...t.classList,
            };
          },
          get "aria-current"() {
            return i() ? "page" : void 0;
          },
        }),
        !1,
        !1
      ),
      a
    );
  })();
}
function qd(e) {
  const t = Xn(),
    n = er(),
    { href: r, state: o } = e,
    i = typeof r == "function" ? r({ navigate: t, location: n }) : r;
  return t(i, { replace: !0, state: o }), null;
}
(function () {
  var e = {},
    t = "";
  try {
    t = location.hash.toString();
  } catch {}
  var n = c(t),
    r = O("initParams");
  if (r) for (var o in r) typeof n[o] > "u" && (n[o] = r[o]);
  P("initParams", n);
  var i = !1,
    a;
  try {
    if (((i = window.parent != null && window != window.parent), i)) {
      window.addEventListener("message", function (b) {
        if (b.source === window.parent) {
          try {
            var _ = JSON.parse(b.data);
          } catch {
            return;
          }
          if (!(!_ || !_.eventType))
            if (_.eventType == "set_custom_style")
              b.origin === "https://web.telegram.org" &&
                (a.innerHTML = _.eventData);
            else if (_.eventType == "reload_iframe") {
              try {
                window.parent.postMessage(
                  JSON.stringify({ eventType: "iframe_will_reload" }),
                  "*"
                );
              } catch {}
              location.reload();
            } else p(_.eventType, _.eventData);
        }
      }),
        (a = document.createElement("style")),
        document.head.appendChild(a);
      try {
        window.parent.postMessage(
          JSON.stringify({
            eventType: "iframe_ready",
            eventData: { reload_supported: !0 },
          }),
          "*"
        );
      } catch {}
    }
  } catch {}
  function s(b) {
    try {
      return (b = b.replace(/\+/g, "%20")), decodeURIComponent(b);
    } catch {
      return b;
    }
  }
  function c(b) {
    b = b.replace(/^#/, "");
    var _ = {};
    if (!b.length) return _;
    if (b.indexOf("=") < 0 && b.indexOf("?") < 0) return (_._path = s(b)), _;
    var S = b.indexOf("?");
    if (S >= 0) {
      var x = b.substr(0, S);
      (_._path = s(x)), (b = b.substr(S + 1));
    }
    var $ = l(b);
    for (var Z in $) _[Z] = $[Z];
    return _;
  }
  function l(b) {
    var _ = {};
    if (!b.length) return _;
    var S = b.split("&"),
      x,
      $,
      Z,
      se;
    for (x = 0; x < S.length; x++)
      ($ = S[x].split("=")),
        (Z = s($[0])),
        (se = $[1] == null ? null : s($[1])),
        (_[Z] = se);
    return _;
  }
  function u(b, _) {
    var S = b.indexOf("#");
    if (S < 0) return b + "#" + _;
    var x = b.substr(S + 1);
    return x.indexOf("=") >= 0 || x.indexOf("?") >= 0
      ? b + "&" + _
      : x.length > 0
      ? b + "?" + _
      : b + _;
  }
  function g(b, _, S) {
    if (
      (_ || (_ = function () {}),
      S === void 0 && (S = ""),
      localStorage.getItem("tg-debug") &&
        console.log("[Telegram.WebView] > postEvent", b, S),
      window.TelegramWebviewProxy !== void 0)
    )
      TelegramWebviewProxy.postEvent(b, JSON.stringify(S)), _();
    else if (window.external && "notify" in window.external)
      window.external.notify(JSON.stringify({ eventType: b, eventData: S })),
        _();
    else if (i)
      try {
        var x = "https://web.telegram.org";
        (x = "*"),
          window.parent.postMessage(
            JSON.stringify({ eventType: b, eventData: S }),
            x
          ),
          _();
      } catch ($) {
        _($);
      }
    else _({ notAvailable: !0 });
  }
  function p(b, _) {
    localStorage.getItem("tg-debug") &&
      console.log("[Telegram.WebView] < receiveEvent", b, _),
      m(b, function (S) {
        S(b, _);
      });
  }
  function m(b, _) {
    var S = e[b];
    if (!(S === void 0 || !S.length))
      for (var x = 0; x < S.length; x++)
        try {
          _(S[x]);
        } catch {}
  }
  function v(b, _) {
    e[b] === void 0 && (e[b] = []);
    var S = e[b].indexOf(_);
    S === -1 && e[b].push(_);
  }
  function A(b, _) {
    if (e[b] !== void 0) {
      var S = e[b].indexOf(_);
      S !== -1 && e[b].splice(S, 1);
    }
  }
  function P(b, _) {
    try {
      return (
        window.sessionStorage.setItem("__telegram__" + b, JSON.stringify(_)), !0
      );
    } catch {}
    return !1;
  }
  function O(b) {
    try {
      return JSON.parse(window.sessionStorage.getItem("__telegram__" + b));
    } catch {}
    return null;
  }
  window.Telegram || (window.Telegram = {}),
    (window.Telegram.WebView = {
      initParams: n,
      isIframe: i,
      onEvent: v,
      offEvent: A,
      postEvent: g,
      receiveEvent: p,
      callEventCallbacks: m,
    }),
    (window.Telegram.Utils = {
      urlSafeDecode: s,
      urlParseQueryString: l,
      urlParseHashParams: c,
      urlAppendHashParams: u,
      sessionStorageSet: P,
      sessionStorageGet: O,
    }),
    (window.TelegramGameProxy_receiveEvent = p),
    (window.TelegramGameProxy = { receiveEvent: p });
})();
(function () {
  var e = window.Telegram.Utils,
    t = window.Telegram.WebView,
    n = t.initParams,
    r = t.isIframe,
    o = {},
    i = "",
    a = {},
    s = {},
    c = "light",
    l = "7.0",
    u = "unknown";
  if (n.tgWebAppData && n.tgWebAppData.length) {
    (i = n.tgWebAppData), (a = e.urlParseQueryString(i));
    for (var g in a) {
      var p = a[g];
      try {
        ((p.substr(0, 1) == "{" && p.substr(-1) == "}") ||
          (p.substr(0, 1) == "[" && p.substr(-1) == "]")) &&
          (a[g] = JSON.parse(p));
      } catch {}
    }
  }
  if (n.tgWebAppThemeParams && n.tgWebAppThemeParams.length) {
    var m = n.tgWebAppThemeParams;
    try {
      var v = JSON.parse(m);
      v && F(v);
    } catch {}
  }
  var v = e.sessionStorageGet("themeParams");
  v && F(v),
    n.tgWebAppVersion && (l = n.tgWebAppVersion),
    n.tgWebAppPlatform && (u = n.tgWebAppPlatform);
  function A(f, d) {
    d.theme_params &&
      (F(d.theme_params),
      window.Telegram.WebApp.MainButton.setParams({}),
      fn(),
      x("themeChanged"));
  }
  var P = window.innerHeight;
  function O(f, d) {
    d.height && (window.removeEventListener("resize", b), be(d));
  }
  function b(f) {
    P != window.innerHeight &&
      ((P = window.innerHeight), x("viewportChanged", { isStateStable: !0 }));
  }
  function _(f) {
    if (!(f.metaKey || f.ctrlKey)) {
      for (var d = f.target; d.tagName != "A" && d.parentNode; )
        d = d.parentNode;
      d.tagName == "A" &&
        d.target != "_blank" &&
        (d.protocol == "http:" || d.protocol == "https:") &&
        d.hostname == "t.me" &&
        (o.openTgLink(d.href), f.preventDefault());
    }
  }
  function S(f) {
    return f.toString().replace(/^\s+|\s+$/g, "");
  }
  function x(f) {
    var d = Array.prototype.slice.call(arguments);
    (f = d.shift()),
      t.callEventCallbacks("webview:" + f, function (h) {
        h.apply(o, d);
      });
  }
  function $(f, d) {
    t.onEvent("webview:" + f, d);
  }
  function Z(f, d) {
    t.offEvent("webview:" + f, d);
  }
  function se(f, d) {
    var h = document.documentElement;
    h && h.style && h.style.setProperty && h.style.setProperty("--tg-" + f, d);
  }
  function F(f) {
    f.bg_color == "#1c1c1d" &&
      f.bg_color == f.secondary_bg_color &&
      (f.secondary_bg_color = "#2c2c2e");
    var d;
    for (var h in f)
      (d = dt(f[h])) &&
        ((s[h] = d),
        h == "bg_color" &&
          ((c = zi(d) ? "dark" : "light"), se("color-scheme", c)),
        (h = "theme-" + h.split("_").join("-")),
        se(h, d));
    e.sessionStorageSet("themeParams", s);
  }
  var C = {};
  function R(f) {
    for (var d = 100; --d; ) {
      for (
        var h = "",
          y = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          E = y.length,
          N = 0;
        N < f;
        N++
      )
        h += y[Math.floor(Math.random() * E)];
      if (!C[h]) return (C[h] = {}), h;
    }
    throw Error("WebAppCallbackIdGenerateFailed");
  }
  var H = !1,
    te = !1,
    he = !0;
  function be(f) {
    typeof f < "u" &&
      ((he = !!f.is_expanded),
      (H = f.height),
      f.is_state_stable && (te = f.height),
      x("viewportChanged", { isStateStable: !!f.is_state_stable }));
    var d, h;
    H !== !1
      ? (d = H - ge + "px")
      : (d = ge ? "calc(100vh - " + ge + "px)" : "100vh"),
      te !== !1
        ? (h = te - ge + "px")
        : (h = ge ? "calc(100vh - " + ge + "px)" : "100vh"),
      se("viewport-height", d),
      se("viewport-stable-height", h);
  }
  var fe = !1;
  function Ne(f) {
    if (!K("6.2")) {
      console.warn(
        "[Telegram.WebApp] Closing confirmation is not supported in version " +
          l
      );
      return;
    }
    (fe = !!f),
      t.postEvent("web_app_setup_closing_behavior", !1, {
        need_confirmation: fe,
      });
  }
  var _e = "bg_color",
    ft = null;
  function Vi() {
    return _e == "secondary_bg_color"
      ? s.secondary_bg_color
      : _e == "bg_color"
      ? s.bg_color
      : ft;
  }
  function Ui(f) {
    if (!K("6.1")) {
      console.warn(
        "[Telegram.WebApp] Header color is not supported in version " + l
      );
      return;
    }
    K("6.9") ||
      (s.bg_color && s.bg_color == f
        ? (f = "bg_color")
        : s.secondary_bg_color &&
          s.secondary_bg_color == f &&
          (f = "secondary_bg_color"));
    var d = null,
      h = null;
    if (f == "bg_color" || f == "secondary_bg_color") h = f;
    else if (K("6.9") && ((d = dt(f)), !d))
      throw (
        (console.error("[Telegram.WebApp] Header color format is invalid", f),
        Error("WebAppHeaderColorInvalid"))
      );
    if (!K("6.9") && h != "bg_color" && h != "secondary_bg_color")
      throw (
        (console.error(
          "[Telegram.WebApp] Header color key should be one of Telegram.WebApp.themeParams.bg_color, Telegram.WebApp.themeParams.secondary_bg_color, 'bg_color', 'secondary_bg_color'",
          f
        ),
        Error("WebAppHeaderColorKeyInvalid"))
      );
    (_e = h), (ft = d), gr();
  }
  var hr = null,
    un = null;
  function gr() {
    (hr != _e || un != ft) &&
      ((hr = _e),
      (un = ft),
      un
        ? t.postEvent("web_app_set_header_color", !1, { color: ft })
        : t.postEvent("web_app_set_header_color", !1, { color_key: _e }));
  }
  var Mt = "bg_color";
  function pr() {
    return Mt == "secondary_bg_color"
      ? s.secondary_bg_color
      : Mt == "bg_color"
      ? s.bg_color
      : Mt;
  }
  function qi(f) {
    if (!K("6.1")) {
      console.warn(
        "[Telegram.WebApp] Background color is not supported in version " + l
      );
      return;
    }
    var d;
    if (f == "bg_color" || f == "secondary_bg_color") d = f;
    else if (((d = dt(f)), !d))
      throw (
        (console.error(
          "[Telegram.WebApp] Background color format is invalid",
          f
        ),
        Error("WebAppBackgroundColorInvalid"))
      );
    (Mt = d), fn();
  }
  var mr = null;
  function fn() {
    var f = pr();
    mr != f &&
      ((mr = f), t.postEvent("web_app_set_background_color", !1, { color: f }));
  }
  function dt(f) {
    f += "";
    var d;
    if ((d = /^\s*#([0-9a-f]{6})\s*$/i.exec(f)))
      return "#" + d[1].toLowerCase();
    if ((d = /^\s*#([0-9a-f])([0-9a-f])([0-9a-f])\s*$/i.exec(f)))
      return ("#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3]).toLowerCase();
    if (
      (d =
        /^\s*rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)\s*$/.exec(
          f
        ))
    ) {
      var h = parseInt(d[1]),
        y = parseInt(d[2]),
        E = parseInt(d[3]);
      return (
        (h = (h < 16 ? "0" : "") + h.toString(16)),
        (y = (y < 16 ? "0" : "") + y.toString(16)),
        (E = (E < 16 ? "0" : "") + E.toString(16)),
        "#" + h + y + E
      );
    }
    return !1;
  }
  function zi(f) {
    (f = f.replace(/[\s#]/g, "")),
      f.length == 3 && (f = f[0] + f[0] + f[1] + f[1] + f[2] + f[2]);
    var d = parseInt(f.substr(0, 2), 16),
      h = parseInt(f.substr(2, 2), 16),
      y = parseInt(f.substr(4, 2), 16),
      E = Math.sqrt(0.299 * (d * d) + 0.587 * (h * h) + 0.114 * (y * y));
    return E < 120;
  }
  function Ki(f, d) {
    typeof f != "string" && (f = ""),
      typeof d != "string" && (d = ""),
      (f = f.replace(/^\s+|\s+$/g, "").split(".")),
      (d = d.replace(/^\s+|\s+$/g, "").split("."));
    var h = Math.max(f.length, d.length),
      y,
      E,
      N;
    for (y = 0; y < h; y++)
      if (((E = parseInt(f[y]) || 0), (N = parseInt(d[y]) || 0), E != N))
        return E > N ? 1 : -1;
    return 0;
  }
  function K(f) {
    return Ki(l, f) >= 0;
  }
  function Gi(f) {
    if (window.Blob)
      try {
        return new Blob([f]).size;
      } catch {}
    for (var d = f.length, h = f.length - 1; h >= 0; h--) {
      var y = f.charCodeAt(h);
      y > 127 && y <= 2047 ? d++ : y > 2047 && y <= 65535 && (d += 2),
        y >= 56320 && y <= 57343 && h--;
    }
    return d;
  }
  var Ji = (function () {
      var f = !1,
        d = {};
      Object.defineProperty(d, "isVisible", {
        set: function (L) {
          j({ is_visible: L });
        },
        get: function () {
          return f;
        },
        enumerable: !0,
      });
      var h = null;
      t.onEvent("back_button_pressed", y);
      function y() {
        x("backButtonClicked");
      }
      function E() {
        return { is_visible: f };
      }
      function N(L) {
        return typeof L > "u" && (L = E()), JSON.stringify(L);
      }
      function k() {
        return K("6.1")
          ? !0
          : (console.warn(
              "[Telegram.WebApp] BackButton is not supported in version " + l
            ),
            !1);
      }
      function Y() {
        var L = E(),
          Q = N(L);
        h !== Q && ((h = Q), t.postEvent("web_app_setup_back_button", !1, L));
      }
      function j(L) {
        return (
          k() && (typeof L.is_visible < "u" && (f = !!L.is_visible), Y()), d
        );
      }
      return (
        (d.onClick = function (L) {
          return k() && $("backButtonClicked", L), d;
        }),
        (d.offClick = function (L) {
          return k() && Z("backButtonClicked", L), d;
        }),
        (d.show = function () {
          return j({ is_visible: !0 });
        }),
        (d.hide = function () {
          return j({ is_visible: !1 });
        }),
        d
      );
    })(),
    ge = 0,
    Zi = (function () {
      var f = !1,
        d = !0,
        h = !1,
        y = "CONTINUE",
        E = !1,
        N = !1,
        k = {};
      Object.defineProperty(k, "text", {
        set: function (T) {
          k.setParams({ text: T });
        },
        get: function () {
          return y;
        },
        enumerable: !0,
      }),
        Object.defineProperty(k, "color", {
          set: function (T) {
            k.setParams({ color: T });
          },
          get: function () {
            return E || s.button_color || "#2481cc";
          },
          enumerable: !0,
        }),
        Object.defineProperty(k, "textColor", {
          set: function (T) {
            k.setParams({ text_color: T });
          },
          get: function () {
            return N || s.button_text_color || "#ffffff";
          },
          enumerable: !0,
        }),
        Object.defineProperty(k, "isVisible", {
          set: function (T) {
            k.setParams({ is_visible: T });
          },
          get: function () {
            return f;
          },
          enumerable: !0,
        }),
        Object.defineProperty(k, "isProgressVisible", {
          get: function () {
            return h;
          },
          enumerable: !0,
        }),
        Object.defineProperty(k, "isActive", {
          set: function (T) {
            k.setParams({ is_active: T });
          },
          get: function () {
            return d;
          },
          enumerable: !0,
        });
      var Y = null;
      t.onEvent("main_button_pressed", Se);
      var j = null,
        L = {};
      if (n.tgWebAppDebug) {
        (j = document.createElement("tg-main-button")),
          (L = {
            font: "600 14px/18px sans-serif",
            display: "none",
            width: "100%",
            height: "48px",
            borderRadius: "0",
            background: "no-repeat right center",
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "0",
            margin: "0",
            padding: "15px 20px",
            textAlign: "center",
            boxSizing: "border-box",
            zIndex: "10000",
          });
        for (var Q in L) j.style[Q] = L[Q];
        document.addEventListener("DOMContentLoaded", function T(me) {
          document.removeEventListener("DOMContentLoaded", T),
            document.body.appendChild(j),
            j.addEventListener("click", Se, !1);
        });
      }
      function Se() {
        d && x("mainButtonClicked");
      }
      function yr() {
        var T = k.color,
          me = k.textColor;
        return f
          ? {
              is_visible: !0,
              is_active: d,
              is_progress_visible: h,
              text: y,
              color: T,
              text_color: me,
            }
          : { is_visible: !1 };
      }
      function ca(T) {
        return typeof T > "u" && (T = yr()), JSON.stringify(T);
      }
      function hn() {
        var T = yr(),
          me = ca(T);
        Y !== me &&
          ((Y = me),
          t.postEvent("web_app_setup_main_button", !1, T),
          n.tgWebAppDebug && la(T));
      }
      function la(T) {
        T.is_visible
          ? ((j.style.display = "block"),
            (ge = 48),
            (j.style.opacity = T.is_active ? "1" : "0.8"),
            (j.style.cursor = T.is_active ? "pointer" : "auto"),
            (j.disabled = !T.is_active),
            (j.innerText = T.text),
            (j.style.backgroundImage = T.is_progress_visible
              ? "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewport%3D%220%200%2048%2048%22%20width%3D%2248px%22%20height%3D%2248px%22%3E%3Ccircle%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20stroke%3D%22%23fff%22%20stroke-width%3D%222.25%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%20stroke-dashoffset%3D%22106%22%20r%3D%229%22%20stroke-dasharray%3D%2256.52%22%20rotate%3D%22-90%22%3E%3Canimate%20attributeName%3D%22stroke-dashoffset%22%20attributeType%3D%22XML%22%20dur%3D%22360s%22%20from%3D%220%22%20to%3D%2212500%22%20repeatCount%3D%22indefinite%22%3E%3C%2Fanimate%3E%3CanimateTransform%20attributeName%3D%22transform%22%20attributeType%3D%22XML%22%20type%3D%22rotate%22%20dur%3D%221s%22%20from%3D%22-90%2024%2024%22%20to%3D%22630%2024%2024%22%20repeatCount%3D%22indefinite%22%3E%3C%2FanimateTransform%3E%3C%2Fcircle%3E%3C%2Fsvg%3E')"
              : "none"),
            (j.style.backgroundColor = T.color),
            (j.style.color = T.text_color))
          : ((j.style.display = "none"), (ge = 0)),
          document.documentElement &&
            ((document.documentElement.style.boxSizing = "border-box"),
            (document.documentElement.style.paddingBottom = ge + "px")),
          be();
      }
      function ua(T) {
        if (typeof T.text < "u") {
          var me = S(T.text);
          if (!me.length)
            throw (
              (console.error(
                "[Telegram.WebApp] Main button text is required",
                T.text
              ),
              Error("WebAppMainButtonParamInvalid"))
            );
          if (me.length > 64)
            throw (
              (console.error(
                "[Telegram.WebApp] Main button text is too long",
                me
              ),
              Error("WebAppMainButtonParamInvalid"))
            );
          y = me;
        }
        if (typeof T.color < "u")
          if (T.color === !1 || T.color === null) E = !1;
          else {
            var vr = dt(T.color);
            if (!vr)
              throw (
                (console.error(
                  "[Telegram.WebApp] Main button color format is invalid",
                  T.color
                ),
                Error("WebAppMainButtonParamInvalid"))
              );
            E = vr;
          }
        if (typeof T.text_color < "u")
          if (T.text_color === !1 || T.text_color === null) N = !1;
          else {
            var wr = dt(T.text_color);
            if (!wr)
              throw (
                (console.error(
                  "[Telegram.WebApp] Main button text color format is invalid",
                  T.text_color
                ),
                Error("WebAppMainButtonParamInvalid"))
              );
            N = wr;
          }
        if (typeof T.is_visible < "u") {
          if (T.is_visible && !k.text.length)
            throw (
              (console.error("[Telegram.WebApp] Main button text is required"),
              Error("WebAppMainButtonParamInvalid"))
            );
          f = !!T.is_visible;
        }
        return typeof T.is_active < "u" && (d = !!T.is_active), hn(), k;
      }
      return (
        (k.setText = function (T) {
          return k.setParams({ text: T });
        }),
        (k.onClick = function (T) {
          return $("mainButtonClicked", T), k;
        }),
        (k.offClick = function (T) {
          return Z("mainButtonClicked", T), k;
        }),
        (k.show = function () {
          return k.setParams({ is_visible: !0 });
        }),
        (k.hide = function () {
          return k.setParams({ is_visible: !1 });
        }),
        (k.enable = function () {
          return k.setParams({ is_active: !0 });
        }),
        (k.disable = function () {
          return k.setParams({ is_active: !1 });
        }),
        (k.showProgress = function (T) {
          return (d = !!T), (h = !0), hn(), k;
        }),
        (k.hideProgress = function () {
          return k.isActive || (d = !0), (h = !1), hn(), k;
        }),
        (k.setParams = ua),
        k
      );
    })(),
    br = (function () {
      var f = !1,
        d = {};
      Object.defineProperty(d, "isVisible", {
        set: function (L) {
          j({ is_visible: L });
        },
        get: function () {
          return f;
        },
        enumerable: !0,
      });
      var h = null;
      t.onEvent("settings_button_pressed", y);
      function y() {
        x("settingsButtonClicked");
      }
      function E() {
        return { is_visible: f };
      }
      function N(L) {
        return typeof L > "u" && (L = E()), JSON.stringify(L);
      }
      function k() {
        return K("6.10")
          ? !0
          : (console.warn(
              "[Telegram.WebApp] SettingsButton is not supported in version " +
                l
            ),
            !1);
      }
      function Y() {
        var L = E(),
          Q = N(L);
        h !== Q &&
          ((h = Q), t.postEvent("web_app_setup_settings_button", !1, L));
      }
      function j(L) {
        return (
          k() && (typeof L.is_visible < "u" && (f = !!L.is_visible), Y()), d
        );
      }
      return (
        (d.onClick = function (L) {
          return k() && $("settingsButtonClicked", L), d;
        }),
        (d.offClick = function (L) {
          return k() && Z("settingsButtonClicked", L), d;
        }),
        (d.show = function () {
          return j({ is_visible: !0 });
        }),
        (d.hide = function () {
          return j({ is_visible: !1 });
        }),
        d
      );
    })(),
    Yi = (function () {
      var f = {};
      function d(h) {
        if (!K("6.1"))
          return (
            console.warn(
              "[Telegram.WebApp] HapticFeedback is not supported in version " +
                l
            ),
            f
          );
        if (h.type == "impact") {
          if (
            h.impact_style != "light" &&
            h.impact_style != "medium" &&
            h.impact_style != "heavy" &&
            h.impact_style != "rigid" &&
            h.impact_style != "soft"
          )
            throw (
              (console.error(
                "[Telegram.WebApp] Haptic impact style is invalid",
                h.impact_style
              ),
              Error("WebAppHapticImpactStyleInvalid"))
            );
        } else if (h.type == "notification") {
          if (
            h.notification_type != "error" &&
            h.notification_type != "success" &&
            h.notification_type != "warning"
          )
            throw (
              (console.error(
                "[Telegram.WebApp] Haptic notification type is invalid",
                h.notification_type
              ),
              Error("WebAppHapticNotificationTypeInvalid"))
            );
        } else if (h.type != "selection_change")
          throw (
            (console.error(
              "[Telegram.WebApp] Haptic feedback type is invalid",
              h.type
            ),
            Error("WebAppHapticFeedbackTypeInvalid"))
          );
        return t.postEvent("web_app_trigger_haptic_feedback", !1, h), f;
      }
      return (
        (f.impactOccurred = function (h) {
          return d({ type: "impact", impact_style: h });
        }),
        (f.notificationOccurred = function (h) {
          return d({ type: "notification", notification_type: h });
        }),
        (f.selectionChanged = function () {
          return d({ type: "selection_change" });
        }),
        f
      );
    })(),
    Qi = (function () {
      var f = {};
      function d(h, y, E) {
        if (!K("6.9"))
          throw (
            (console.error(
              "[Telegram.WebApp] CloudStorage is not supported in version " + l
            ),
            Error("WebAppMethodUnsupported"))
          );
        return dn(h, y, E), f;
      }
      return (
        (f.setItem = function (h, y, E) {
          return d("saveStorageValue", { key: h, value: y }, E);
        }),
        (f.getItem = function (h, y) {
          return f.getItems(
            [h],
            y
              ? function (E, N) {
                  E ? y(E) : y(null, N[h]);
                }
              : null
          );
        }),
        (f.getItems = function (h, y) {
          return d("getStorageValues", { keys: h }, y);
        }),
        (f.removeItem = function (h, y) {
          return f.removeItems([h], y);
        }),
        (f.removeItems = function (h, y) {
          return d("deleteStorageValues", { keys: h }, y);
        }),
        (f.getKeys = function (h) {
          return d("getStorageKeys", {}, h);
        }),
        f
      );
    })(),
    ht = {};
  function Xi(f, d) {
    if (d.slug && ht[d.slug]) {
      var h = ht[d.slug];
      delete ht[d.slug],
        h.callback && h.callback(d.status),
        x("invoiceClosed", { url: h.url, status: d.status });
    }
  }
  var gt = !1;
  function ea(f, d) {
    if (gt) {
      var h = gt;
      gt = !1;
      var y = null;
      typeof d.button_id < "u" && (y = d.button_id),
        h.callback && h.callback(y),
        x("popupClosed", { button_id: y });
    }
  }
  var Be = !1;
  function ta(f, d) {
    if (Be) {
      var h = Be,
        y = null;
      typeof d.data < "u" && (y = d.data),
        h.callback &&
          h.callback(y) &&
          ((Be = !1), t.postEvent("web_app_close_scan_qr_popup", !1)),
        x("qrTextReceived", { data: y });
    }
  }
  function na(f, d) {
    Be = !1;
  }
  function ra(f, d) {
    if (d.req_id && C[d.req_id]) {
      var h = C[d.req_id];
      delete C[d.req_id];
      var y = null;
      typeof d.data < "u" && (y = d.data),
        h.callback && h.callback(y),
        x("clipboardTextReceived", { data: y });
    }
  }
  var pt = !1;
  function oa(f, d) {
    if (pt) {
      var h = pt;
      (pt = !1),
        h.callback && h.callback(d.status == "allowed"),
        x("writeAccessRequested", { status: d.status });
    }
  }
  function ia(f, d) {
    var h,
      y,
      E = 0,
      N = function () {
        dn("getRequestedContact", {}, function (Y, j) {
          j && j.length
            ? (clearTimeout(y), f(j))
            : ((E += 50), (h = setTimeout(N, E)));
        });
      },
      k = function () {
        clearTimeout(h), f("");
      };
    (y = setTimeout(k, d)), N();
  }
  var mt = !1;
  function aa(f, d) {
    if (mt) {
      var h = mt;
      mt = !1;
      var y = d.status == "sent",
        E = { status: d.status };
      y
        ? ia(function (N) {
            if (N && N.length) {
              (E.response = N), (E.responseUnsafe = e.urlParseQueryString(N));
              for (var k in E.responseUnsafe) {
                var Y = E.responseUnsafe[k];
                try {
                  ((Y.substr(0, 1) == "{" && Y.substr(-1) == "}") ||
                    (Y.substr(0, 1) == "[" && Y.substr(-1) == "]")) &&
                    (E.responseUnsafe[k] = JSON.parse(Y));
                } catch {}
              }
            }
            h.callback && h.callback(y, E), x("contactRequested", E);
          }, 3e3)
        : (h.callback && h.callback(y, E), x("contactRequested", E));
    }
  }
  function sa(f, d) {
    if (d.req_id && C[d.req_id]) {
      var h = C[d.req_id];
      delete C[d.req_id];
      var y = null,
        E = null;
      typeof d.result < "u" && (y = d.result),
        typeof d.error < "u" && (E = d.error),
        h.callback && h.callback(E, y);
    }
  }
  function dn(f, d, h) {
    if (!K("6.9"))
      throw (
        (console.error(
          "[Telegram.WebApp] Method invokeCustomMethod is not supported in version " +
            l
        ),
        Error("WebAppMethodUnsupported"))
      );
    var y = R(16),
      E = { req_id: y, method: f, params: d || {} };
    (C[y] = { callback: h }),
      t.postEvent("web_app_invoke_custom_method", !1, E);
  }
  window.Telegram || (window.Telegram = {}),
    Object.defineProperty(o, "initData", {
      get: function () {
        return i;
      },
      enumerable: !0,
    }),
    Object.defineProperty(o, "initDataUnsafe", {
      get: function () {
        return a;
      },
      enumerable: !0,
    }),
    Object.defineProperty(o, "version", {
      get: function () {
        return l;
      },
      enumerable: !0,
    }),
    Object.defineProperty(o, "platform", {
      get: function () {
        return u;
      },
      enumerable: !0,
    }),
    Object.defineProperty(o, "colorScheme", {
      get: function () {
        return c;
      },
      enumerable: !0,
    }),
    Object.defineProperty(o, "themeParams", {
      get: function () {
        return s;
      },
      enumerable: !0,
    }),
    Object.defineProperty(o, "isExpanded", {
      get: function () {
        return he;
      },
      enumerable: !0,
    }),
    Object.defineProperty(o, "viewportHeight", {
      get: function () {
        return (H === !1 ? window.innerHeight : H) - ge;
      },
      enumerable: !0,
    }),
    Object.defineProperty(o, "viewportStableHeight", {
      get: function () {
        return (te === !1 ? window.innerHeight : te) - ge;
      },
      enumerable: !0,
    }),
    Object.defineProperty(o, "isClosingConfirmationEnabled", {
      set: function (f) {
        Ne(f);
      },
      get: function () {
        return fe;
      },
      enumerable: !0,
    }),
    Object.defineProperty(o, "headerColor", {
      set: function (f) {
        Ui(f);
      },
      get: function () {
        return Vi();
      },
      enumerable: !0,
    }),
    Object.defineProperty(o, "backgroundColor", {
      set: function (f) {
        qi(f);
      },
      get: function () {
        return pr();
      },
      enumerable: !0,
    }),
    Object.defineProperty(o, "BackButton", { value: Ji, enumerable: !0 }),
    Object.defineProperty(o, "MainButton", { value: Zi, enumerable: !0 }),
    Object.defineProperty(o, "SettingsButton", { value: br, enumerable: !0 }),
    Object.defineProperty(o, "HapticFeedback", { value: Yi, enumerable: !0 }),
    Object.defineProperty(o, "CloudStorage", { value: Qi, enumerable: !0 }),
    (o.setHeaderColor = function (f) {
      o.headerColor = f;
    }),
    (o.setBackgroundColor = function (f) {
      o.backgroundColor = f;
    }),
    (o.enableClosingConfirmation = function () {
      o.isClosingConfirmationEnabled = !0;
    }),
    (o.disableClosingConfirmation = function () {
      o.isClosingConfirmationEnabled = !1;
    }),
    (o.isVersionAtLeast = function (f) {
      return K(f);
    }),
    (o.onEvent = function (f, d) {
      $(f, d);
    }),
    (o.offEvent = function (f, d) {
      Z(f, d);
    }),
    (o.sendData = function (f) {
      if (!f || !f.length)
        throw (
          (console.error("[Telegram.WebApp] Data is required", f),
          Error("WebAppDataInvalid"))
        );
      if (Gi(f) > 4096)
        throw (
          (console.error("[Telegram.WebApp] Data is too long", f),
          Error("WebAppDataInvalid"))
        );
      t.postEvent("web_app_data_send", !1, { data: f });
    }),
    (o.switchInlineQuery = function (f, d) {
      if (!K("6.6"))
        throw (
          (console.error(
            "[Telegram.WebApp] Method switchInlineQuery is not supported in version " +
              l
          ),
          Error("WebAppMethodUnsupported"))
        );
      if (!n.tgWebAppBotInline)
        throw (
          (console.error(
            "[Telegram.WebApp] Inline mode is disabled for this bot. Read more about inline mode: https://core.telegram.org/bots/inline"
          ),
          Error("WebAppInlineModeDisabled"))
        );
      if (((f = f || ""), f.length > 256))
        throw (
          (console.error("[Telegram.WebApp] Inline query is too long", f),
          Error("WebAppInlineQueryInvalid"))
        );
      var h = [];
      if (d) {
        if (!Array.isArray(d))
          throw (
            (console.error(
              "[Telegram.WebApp] Choose chat types should be an array",
              d
            ),
            Error("WebAppInlineChooseChatTypesInvalid"))
          );
        for (
          var y = { users: 1, bots: 1, groups: 1, channels: 1 }, E = 0;
          E < d.length;
          E++
        ) {
          var N = d[E];
          if (!y[N])
            throw (
              (console.error(
                "[Telegram.WebApp] Choose chat type is invalid",
                N
              ),
              Error("WebAppInlineChooseChatTypeInvalid"))
            );
          y[N] != 2 && ((y[N] = 2), h.push(N));
        }
      }
      t.postEvent("web_app_switch_inline_query", !1, {
        query: f,
        chat_types: h,
      });
    }),
    (o.openLink = function (y, d) {
      var h = document.createElement("A");
      if (((h.href = y), h.protocol != "http:" && h.protocol != "https:"))
        throw (
          (console.error("[Telegram.WebApp] Url protocol is not supported", y),
          Error("WebAppTgUrlInvalid"))
        );
      var y = h.href;
      (d = d || {}),
        K("6.1")
          ? t.postEvent("web_app_open_link", !1, {
              url: y,
              try_instant_view: K("6.4") && !!d.try_instant_view,
            })
          : window.open(y, "_blank");
    }),
    (o.openTelegramLink = function (f) {
      var d = document.createElement("A");
      if (((d.href = f), d.protocol != "http:" && d.protocol != "https:"))
        throw (
          (console.error("[Telegram.WebApp] Url protocol is not supported", f),
          Error("WebAppTgUrlInvalid"))
        );
      if (d.hostname != "t.me")
        throw (
          (console.error("[Telegram.WebApp] Url host is not supported", f),
          Error("WebAppTgUrlInvalid"))
        );
      var h = d.pathname + d.search;
      r || K("6.1")
        ? t.postEvent("web_app_open_tg_link", !1, { path_full: h })
        : (location.href = "https://t.me" + h);
    }),
    (o.openInvoice = function (f, d) {
      var h = document.createElement("A"),
        y,
        E;
      if (
        ((h.href = f),
        (h.protocol != "http:" && h.protocol != "https:") ||
          h.hostname != "t.me" ||
          !(y = h.pathname.match(/^\/(\$|invoice\/)([A-Za-z0-9\-_=]+)$/)) ||
          !(E = y[2]))
      )
        throw (
          (console.error("[Telegram.WebApp] Invoice url is invalid", f),
          Error("WebAppInvoiceUrlInvalid"))
        );
      if (!K("6.1"))
        throw (
          (console.error(
            "[Telegram.WebApp] Method openInvoice is not supported in version " +
              l
          ),
          Error("WebAppMethodUnsupported"))
        );
      if (ht[E])
        throw (
          (console.error("[Telegram.WebApp] Invoice is already opened"),
          Error("WebAppInvoiceOpened"))
        );
      (ht[E] = { url: f, callback: d }),
        t.postEvent("web_app_open_invoice", !1, { slug: E });
    }),
    (o.showPopup = function (f, d) {
      if (!K("6.2"))
        throw (
          (console.error(
            "[Telegram.WebApp] Method showPopup is not supported in version " +
              l
          ),
          Error("WebAppMethodUnsupported"))
        );
      if (gt)
        throw (
          (console.error("[Telegram.WebApp] Popup is already opened"),
          Error("WebAppPopupOpened"))
        );
      var h = "",
        y = "",
        E = [],
        N = {};
      if (typeof f.title < "u") {
        if (((h = S(f.title)), h.length > 64))
          throw (
            (console.error("[Telegram.WebApp] Popup title is too long", h),
            Error("WebAppPopupParamInvalid"))
          );
        h.length > 0 && (N.title = h);
      }
      if ((typeof f.message < "u" && (y = S(f.message)), !y.length))
        throw (
          (console.error(
            "[Telegram.WebApp] Popup message is required",
            f.message
          ),
          Error("WebAppPopupParamInvalid"))
        );
      if (y.length > 256)
        throw (
          (console.error("[Telegram.WebApp] Popup message is too long", y),
          Error("WebAppPopupParamInvalid"))
        );
      if (((N.message = y), typeof f.buttons < "u")) {
        if (!Array.isArray(f.buttons))
          throw (
            (console.error(
              "[Telegram.WebApp] Popup buttons should be an array",
              f.buttons
            ),
            Error("WebAppPopupParamInvalid"))
          );
        for (var k = 0; k < f.buttons.length; k++) {
          var Y = f.buttons[k],
            j = {},
            L = "";
          if (typeof Y.id < "u" && ((L = Y.id.toString()), L.length > 64))
            throw (
              (console.error(
                "[Telegram.WebApp] Popup button id is too long",
                L
              ),
              Error("WebAppPopupParamInvalid"))
            );
          j.id = L;
          var Q = Y.type;
          if (
            (typeof Q > "u" && (Q = "default"),
            (j.type = Q),
            !(Q == "ok" || Q == "close" || Q == "cancel"))
          )
            if (Q == "default" || Q == "destructive") {
              var Se = "";
              if ((typeof Y.text < "u" && (Se = S(Y.text)), !Se.length))
                throw (
                  (console.error(
                    "[Telegram.WebApp] Popup button text is required for type " +
                      Q,
                    Y.text
                  ),
                  Error("WebAppPopupParamInvalid"))
                );
              if (Se.length > 64)
                throw (
                  (console.error(
                    "[Telegram.WebApp] Popup button text is too long",
                    Se
                  ),
                  Error("WebAppPopupParamInvalid"))
                );
              j.text = Se;
            } else
              throw (
                (console.error(
                  "[Telegram.WebApp] Popup button type is invalid",
                  Q
                ),
                Error("WebAppPopupParamInvalid"))
              );
          E.push(j);
        }
      } else E.push({ id: "", type: "close" });
      if (E.length < 1)
        throw (
          (console.error(
            "[Telegram.WebApp] Popup should have at least one button"
          ),
          Error("WebAppPopupParamInvalid"))
        );
      if (E.length > 3)
        throw (
          (console.error(
            "[Telegram.WebApp] Popup should not have more than 3 buttons"
          ),
          Error("WebAppPopupParamInvalid"))
        );
      (N.buttons = E),
        (gt = { callback: d }),
        t.postEvent("web_app_open_popup", !1, N);
    }),
    (o.showAlert = function (f, d) {
      o.showPopup(
        { message: f },
        d
          ? function () {
              d();
            }
          : null
      );
    }),
    (o.showConfirm = function (f, d) {
      o.showPopup(
        { message: f, buttons: [{ type: "ok", id: "ok" }, { type: "cancel" }] },
        d
          ? function (h) {
              d(h == "ok");
            }
          : null
      );
    }),
    (o.showScanQrPopup = function (f, d) {
      if (!K("6.4"))
        throw (
          (console.error(
            "[Telegram.WebApp] Method showScanQrPopup is not supported in version " +
              l
          ),
          Error("WebAppMethodUnsupported"))
        );
      if (Be)
        throw (
          (console.error("[Telegram.WebApp] Popup is already opened"),
          Error("WebAppScanQrPopupOpened"))
        );
      var h = "",
        y = {};
      if (typeof f.text < "u") {
        if (((h = S(f.text)), h.length > 64))
          throw (
            (console.error(
              "[Telegram.WebApp] Scan QR popup text is too long",
              h
            ),
            Error("WebAppScanQrPopupParamInvalid"))
          );
        h.length > 0 && (y.text = h);
      }
      (Be = { callback: d }), t.postEvent("web_app_open_scan_qr_popup", !1, y);
    }),
    (o.closeScanQrPopup = function () {
      if (!K("6.4"))
        throw (
          (console.error(
            "[Telegram.WebApp] Method closeScanQrPopup is not supported in version " +
              l
          ),
          Error("WebAppMethodUnsupported"))
        );
      (Be = !1), t.postEvent("web_app_close_scan_qr_popup", !1);
    }),
    (o.readTextFromClipboard = function (f) {
      if (!K("6.4"))
        throw (
          (console.error(
            "[Telegram.WebApp] Method readTextFromClipboard is not supported in version " +
              l
          ),
          Error("WebAppMethodUnsupported"))
        );
      var d = R(16),
        h = { req_id: d };
      (C[d] = { callback: f }),
        t.postEvent("web_app_read_text_from_clipboard", !1, h);
    }),
    (o.requestWriteAccess = function (f) {
      if (!K("6.9"))
        throw (
          (console.error(
            "[Telegram.WebApp] Method requestWriteAccess is not supported in version " +
              l
          ),
          Error("WebAppMethodUnsupported"))
        );
      if (pt)
        throw (
          (console.error("[Telegram.WebApp] Write access is already requested"),
          Error("WebAppWriteAccessRequested"))
        );
      (pt = { callback: f }), t.postEvent("web_app_request_write_access");
    }),
    (o.requestContact = function (f) {
      if (!K("6.9"))
        throw (
          (console.error(
            "[Telegram.WebApp] Method requestContact is not supported in version " +
              l
          ),
          Error("WebAppMethodUnsupported"))
        );
      if (mt)
        throw (
          (console.error("[Telegram.WebApp] Contact is already requested"),
          Error("WebAppContactRequested"))
        );
      (mt = { callback: f }), t.postEvent("web_app_request_phone");
    }),
    (o.invokeCustomMethod = function (f, d, h) {
      dn(f, d, h);
    }),
    (o.ready = function () {
      t.postEvent("web_app_ready");
    }),
    (o.expand = function () {
      t.postEvent("web_app_expand");
    }),
    (o.close = function () {
      t.postEvent("web_app_close");
    }),
    (window.Telegram.WebApp = o),
    gr(),
    fn(),
    be(),
    n.tgWebAppShowSettings && br.show(),
    window.addEventListener("resize", b),
    r && document.addEventListener("click", _),
    t.onEvent("theme_changed", A),
    t.onEvent("viewport_changed", O),
    t.onEvent("invoice_closed", Xi),
    t.onEvent("popup_closed", ea),
    t.onEvent("qr_text_received", ta),
    t.onEvent("scan_qr_popup_closed", na),
    t.onEvent("clipboard_text_received", ra),
    t.onEvent("write_access_requested", oa),
    t.onEvent("phone_requested", aa),
    t.onEvent("custom_method_invoked", sa),
    t.postEvent("web_app_request_theme"),
    t.postEvent("web_app_request_viewport");
})();
const V = Telegram.WebApp,
  Ls = [
    {
      component: ee(() =>
        U(
          () => import("./(home)-2b289f71.js"),
          [
            "assets/(home)-2b289f71.js",
            "assets/project.network-beff772d.js",
            "assets/project.context-77f57be8.js",
            "assets/persist-resource-4ec7c87b.js",
            "assets/createPath-63910385.js",
            "assets/Calendar-81dc3ec9.js",
            "assets/profile.context-43c1a76f.js",
            "assets/Arrow-d3382362.js",
            "assets/initials-avatar-9db499e5.js",
            "assets/model-fc7144ae.js",
            "assets/index-dfeb92b4.js",
            "assets/Checkmark-572d5fea.js",
            "assets/Calendar-6472949d.css",
            "assets/create-task.ui-e3c37910.js",
            "assets/Create-b0921969.js",
            "assets/create-task-81f4148f.css",
            "assets/premium-star-370dd05f.js",
          ]
        )
      ),
      path: "",
    },
    {
      component: ee(() => U(() => import("./_...404_-9bf3ae04.js"), [])),
      path: "/*404",
    },
    {
      component: ee(() =>
        U(
          () => import("./_projectId_-f2c34a9a.js"),
          [
            "assets/_projectId_-f2c34a9a.js",
            "assets/project.network-beff772d.js",
            "assets/project.context-77f57be8.js",
            "assets/persist-resource-4ec7c87b.js",
            "assets/createPath-63910385.js",
          ]
        )
      ),
      children: [
        {
          component: ee(() =>
            U(
              () => import("./_taskId_-840f9725.js"),
              [
                "assets/_taskId_-840f9725.js",
                "assets/Calendar-81dc3ec9.js",
                "assets/profile.context-43c1a76f.js",
                "assets/persist-resource-4ec7c87b.js",
                "assets/project.context-77f57be8.js",
                "assets/createPath-63910385.js",
                "assets/Arrow-d3382362.js",
                "assets/initials-avatar-9db499e5.js",
                "assets/model-fc7144ae.js",
                "assets/index-dfeb92b4.js",
                "assets/Checkmark-572d5fea.js",
                "assets/Calendar-6472949d.css",
                "assets/editor.ui-26b87555.js",
                "assets/context-icon-a63c7b85.js",
                "assets/checkbox-f3ed67d7.js",
              ]
            )
          ),
          path: "/:taskId",
        },
        {
          component: ee(() =>
            U(
              () => import("./create-task-be93f03b.js"),
              [
                "assets/create-task-be93f03b.js",
                "assets/Calendar-81dc3ec9.js",
                "assets/profile.context-43c1a76f.js",
                "assets/persist-resource-4ec7c87b.js",
                "assets/project.context-77f57be8.js",
                "assets/createPath-63910385.js",
                "assets/Arrow-d3382362.js",
                "assets/initials-avatar-9db499e5.js",
                "assets/model-fc7144ae.js",
                "assets/index-dfeb92b4.js",
                "assets/Checkmark-572d5fea.js",
                "assets/Calendar-6472949d.css",
                "assets/editor.ui-26b87555.js",
                "assets/context-icon-a63c7b85.js",
                "assets/checkbox-f3ed67d7.js",
              ]
            )
          ),
          path: "/create-task",
        },
        {
          component: ee(() =>
            U(
              () => import("./index-d441d54f.js"),
              [
                "assets/index-d441d54f.js",
                "assets/project.context-77f57be8.js",
                "assets/persist-resource-4ec7c87b.js",
                "assets/createPath-63910385.js",
                "assets/profile.context-43c1a76f.js",
                "assets/Calendar-81dc3ec9.js",
                "assets/Arrow-d3382362.js",
                "assets/initials-avatar-9db499e5.js",
                "assets/model-fc7144ae.js",
                "assets/index-dfeb92b4.js",
                "assets/Checkmark-572d5fea.js",
                "assets/Calendar-6472949d.css",
                "assets/project.network-beff772d.js",
                "assets/context-icon-a63c7b85.js",
                "assets/checkbox-f3ed67d7.js",
                "assets/create-task.ui-e3c37910.js",
                "assets/Create-b0921969.js",
                "assets/create-task-81f4148f.css",
              ]
            )
          ),
          path: "/",
        },
      ],
      path: "/:projectId",
    },
    {
      component: ee(() =>
        U(
          () => import("./create-task-eea76392.js"),
          [
            "assets/create-task-eea76392.js",
            "assets/Calendar-81dc3ec9.js",
            "assets/profile.context-43c1a76f.js",
            "assets/persist-resource-4ec7c87b.js",
            "assets/project.context-77f57be8.js",
            "assets/createPath-63910385.js",
            "assets/Arrow-d3382362.js",
            "assets/initials-avatar-9db499e5.js",
            "assets/model-fc7144ae.js",
            "assets/index-dfeb92b4.js",
            "assets/Checkmark-572d5fea.js",
            "assets/Calendar-6472949d.css",
            "assets/editor.ui-26b87555.js",
            "assets/context-icon-a63c7b85.js",
            "assets/checkbox-f3ed67d7.js",
          ]
        )
      ),
      path: "/create-task",
    },
    {
      component: ee(() => U(() => import("./demo-36fd4ac4.js"), [])),
      path: "/demo",
    },
    {
      component: ee(() =>
        U(
          () => import("./about-d32f4e6b.js"),
          [
            "assets/about-d32f4e6b.js",
            "assets/links-fe3ad866.js",
            "assets/index-dfeb92b4.js",
            "assets/Arrow-d3382362.js",
            "assets/createPath-63910385.js",
            "assets/initials-avatar-9db499e5.js",
          ]
        )
      ),
      path: "/profile/about",
    },
    {
      component: ee(() =>
        U(
          () => import("./index-621fe767.js"),
          [
            "assets/index-621fe767.js",
            "assets/profile.context-43c1a76f.js",
            "assets/persist-resource-4ec7c87b.js",
            "assets/links-fe3ad866.js",
            "assets/index-dfeb92b4.js",
            "assets/Arrow-d3382362.js",
            "assets/createPath-63910385.js",
            "assets/initials-avatar-9db499e5.js",
          ]
        )
      ),
      path: "/profile/",
    },
    {
      component: ee(() =>
        U(
          () => import("./hour-cycle-edd8b8de.js"),
          [
            "assets/hour-cycle-edd8b8de.js",
            "assets/index-927492b3.js",
            "assets/index-dfeb92b4.js",
            "assets/Arrow-d3382362.js",
            "assets/createPath-63910385.js",
            "assets/Checkmark-572d5fea.js",
          ]
        )
      ),
      path: "/profile/settings/hour-cycle",
    },
    {
      component: ee(() =>
        U(
          () => import("./index-e325b433.js"),
          [
            "assets/index-e325b433.js",
            "assets/index-927492b3.js",
            "assets/index-dfeb92b4.js",
            "assets/Arrow-d3382362.js",
            "assets/createPath-63910385.js",
          ]
        )
      ),
      path: "/profile/settings/",
    },
    {
      component: ee(() =>
        U(
          () => import("./language-44fc61a1.js"),
          [
            "assets/language-44fc61a1.js",
            "assets/index-dfeb92b4.js",
            "assets/Arrow-d3382362.js",
            "assets/createPath-63910385.js",
            "assets/Checkmark-572d5fea.js",
          ]
        )
      ),
      path: "/profile/settings/language",
    },
    {
      component: ee(() =>
        U(
          () => import("./timezone-1e3e61b7.js"),
          [
            "assets/timezone-1e3e61b7.js",
            "assets/model-fc7144ae.js",
            "assets/index-927492b3.js",
            "assets/index-dfeb92b4.js",
            "assets/Arrow-d3382362.js",
            "assets/createPath-63910385.js",
            "assets/Checkmark-572d5fea.js",
          ]
        )
      ),
      path: "/profile/settings/timezone",
    },
    {
      component: ee(() =>
        U(
          () => import("./subscription-a4dc9702.js"),
          [
            "assets/subscription-a4dc9702.js",
            "assets/subscribe.ui-d710022a.js",
            "assets/model-fc7144ae.js",
            "assets/profile.context-43c1a76f.js",
            "assets/persist-resource-4ec7c87b.js",
            "assets/index-df6ea570.js",
            "assets/checkbox-f3ed67d7.js",
            "assets/Arrow-d3382362.js",
            "assets/createPath-63910385.js",
            "assets/Create-b0921969.js",
            "assets/premium-star-370dd05f.js",
          ]
        )
      ),
      children: [
        {
          component: ee(() =>
            U(
              () => import("./_result_-fffd1af6.js"),
              ["assets/_result_-fffd1af6.js", "assets/index-df6ea570.js"]
            )
          ),
          path: "/:result",
        },
        {
          component: ee(() => U(() => import("./index-5ca3b7b9.js"), [])),
          path: "/",
        },
      ],
      path: "/profile/subscription",
    },
    {
      component: ee(() =>
        U(
          () => import("./subscribe-878cb959.js"),
          [
            "assets/subscribe-878cb959.js",
            "assets/subscribe.ui-d710022a.js",
            "assets/model-fc7144ae.js",
            "assets/profile.context-43c1a76f.js",
            "assets/persist-resource-4ec7c87b.js",
            "assets/index-df6ea570.js",
            "assets/checkbox-f3ed67d7.js",
            "assets/Arrow-d3382362.js",
            "assets/createPath-63910385.js",
            "assets/Create-b0921969.js",
            "assets/premium-star-370dd05f.js",
          ]
        )
      ),
      path: "/subscribe",
    },
  ],
  Ns = () => Ls,
  Wo = "$FETCH",
  Ho = Xe({ $type: Wo }),
  Bs = () => Ae(Ho),
  zd = Rs,
  $s = Ds,
  Kd = jo,
  Fs = Xn,
  js = tt(
    "<div><div><p id=error-message></p><button id=reset-errors>Clear errors and retry</button><pre>"
  );
function Ws(e) {
  return M(Ea, {
    fallback: (t, n) =>
      M(ze, {
        get when() {
          return !e.fallback;
        },
        get fallback() {
          return B(() => !!e.fallback)() && e.fallback(t, n);
        },
        get children() {
          return M(Hs, { error: t });
        },
      }),
    get children() {
      return e.children;
    },
  });
}
function Hs(e) {
  return (
    At(() => console.error(e.error)),
    console.log(e.error),
    (() => {
      const t = js(),
        n = t.firstChild,
        r = n.firstChild,
        o = r.nextSibling,
        i = o.nextSibling;
      return (
        t.style.setProperty("padding", "16px"),
        n.style.setProperty("background-color", "rgba(252, 165, 165)"),
        n.style.setProperty("color", "rgb(153, 27, 27)"),
        n.style.setProperty("border-radius", "5px"),
        n.style.setProperty("overflow", "scroll"),
        n.style.setProperty("padding", "16px"),
        n.style.setProperty("margin-bottom", "8px"),
        r.style.setProperty("font-weight", "bold"),
        le(r, () => e.error.message),
        ko(o, "click", To, !0),
        o.style.setProperty("color", "rgba(252, 165, 165)"),
        o.style.setProperty("background-color", "rgb(153, 27, 27)"),
        o.style.setProperty("border-radius", "5px"),
        o.style.setProperty("padding", "4px 8px"),
        i.style.setProperty("margin-top", "8px"),
        i.style.setProperty("width", "100%"),
        le(i, () => e.error.stack),
        t
      );
    })()
  );
}
Tt(["click"]);
const Vs = !1,
  Us = !1,
  qs = !1;
function zs() {
  return qs;
}
function Ks() {
  return Vs;
}
function Gs() {
  return (
    Bs(),
    [
      Us,
      M(za, {
        get children() {
          return [M(zs, {}), B(() => xo)];
        },
      }),
    ]
  );
}
function Js() {
  return [M(Ks, {}), M(Gs, {})];
}
function Zs(e) {
  return De(document.documentElement, e, !1, !0), e.children;
}
function Ys(e) {
  return De(document.head, e, !1, !0), e.children;
}
function Qs(e) {
  return De(document.body, e, !1, !0), e.children;
}
const Xs = () => /iPhone|iPad|iPod/.test(window.navigator.userAgent),
  Vo = () => /Android/.test(window.navigator.userAgent),
  Gd = () => Vo() || Xs(),
  Jd = (e, t) =>
    (function n(r) {
      return r?.tagName.toLowerCase() === "dialog"
        ? !0
        : r === null ||
          t === null ||
          (r === document.documentElement && t !== document.documentElement)
        ? !1
        : r === t
        ? !0
        : n(r?.parentElement ?? null);
    })(e),
  ec = (e, t) =>
    new Promise((n, r) =>
      setTimeout(() => {
        try {
          e(), n();
        } catch (o) {
          r(o);
        }
      }, t)
    ),
  tc = () => {
    const e = (n) =>
      n?.tagName.toLowerCase() == "input" ||
      n?.tagName.toLowerCase() == "textarea";
    function t() {
      const n = document.activeElement;
      e(n) &&
        ec(() => {
          "scrollIntoViewIfNeeded" in n &&
          typeof n.scrollIntoViewIfNeeded == "function"
            ? n.scrollIntoViewIfNeeded()
            : n.scrollIntoView();
        });
    }
    Qt(() => {
      Vo() && window.addEventListener("resize", t);
    }),
      de(() => {
        window.removeEventListener("resize", t);
      });
  },
  Ke = (e) => e?.[0]?.(),
  Uo = (e, t) => e?.[1]?.(t);
var nc = ((e) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
      ? new Proxy(e, { get: (t, n) => (typeof require < "u" ? require : t)[n] })
      : e)(function (e) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e + '" is not supported');
  }),
  rc = (e) => (
    typeof e.clear == "function" ||
      (e.clear = () => {
        let t;
        for (; (t = e.key(0)); ) e.removeItem(t);
      }),
    e
  ),
  oc = (e) => {
    if (!e) return "";
    let t = "";
    for (const n in e) {
      if (!e.hasOwnProperty(n)) continue;
      const r = e[n];
      t +=
        r instanceof Date
          ? `; ${n}=${r.toUTCString()}`
          : typeof r == "boolean"
          ? `; ${n}`
          : `; ${n}=${r}`;
    }
    return t;
  },
  Lr;
try {
  Lr = nc("solid-start/server").useRequest;
} catch {
  Lr = () => (
    console.warn(
      "It seems you attempt to use cookieStorage on the server without having solid-start installed"
    ),
    { request: { headers: { get: () => "" } } }
  );
}
var $e = rc({
  _read: () => document.cookie,
  _write: (e, t, n) => {
    document.cookie = `${e}=${t}${oc(n)}`;
  },
  getItem: (e, t) =>
    $e
      ._read(t)
      .match("(^|;)\\s*" + e + "\\s*=\\s*([^;]+)")
      ?.pop() ?? null,
  setItem: (e, t, n) => {
    const r = $e.getItem(e);
    $e._write(e, t, n);
    const o = Object.assign(new Event("storage"), {
      key: e,
      oldValue: r,
      newValue: t,
      url: globalThis.document.URL,
      storageArea: $e,
    });
    window.dispatchEvent(o);
  },
  removeItem: (e) => {
    $e._write(e, "deleted", { expires: new Date(0) });
  },
  key: (e) => {
    let t = null,
      n = 0;
    return (
      $e
        ._read()
        .replace(
          /(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,
          (r, o) => (!t && o && n++ === e && (t = o), "")
        ),
      t
    );
  },
  get length() {
    let e = 0;
    return (
      $e
        ._read()
        .replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g, (t) => ((e += t ? 1 : 0), "")),
      e
    );
  },
});
function qo(e, t = {}) {
  const n = t.storage || globalThis.localStorage;
  if (!n) return e;
  const r = t.name || `storage-${Co()}`,
    o = t.serialize || JSON.stringify.bind(JSON),
    i = t.deserialize || JSON.parse.bind(JSON),
    a = n.getItem(r, t.storageOptions),
    s =
      typeof e[0] == "function"
        ? (l) => e[1](() => i(l))
        : (l) => e[1](es(i(l)));
  let c = !0;
  return (
    a instanceof Promise ? a.then((l) => c && l && s(l)) : a && s(a),
    [
      e[0],
      typeof e[0] == "function"
        ? (l) => {
            const u = e[1](l);
            return (
              l != null
                ? n.setItem(r, o(u), t.storageOptions)
                : n.removeItem(r),
              (c = !1),
              u
            );
          }
        : (...l) => {
            e[1](...l),
              n.setItem(r, o(G(() => e[0])), t.storageOptions),
              (c = !1);
          },
    ]
  );
}
function ic(e, t) {
  return function n(r, ...o) {
    const i = e();
    if (!i || !(r in i)) return r;
    const a = this.plugins ?? t ?? [];
    for (const [l, u] of a.entries())
      if (u.match(i[r], r, i)) {
        const g = c.call(this, u, l, i);
        try {
          const p = u.translate.call(g, ...o);
          if (typeof p == "string") return p;
        } catch (p) {
          console.error(
            `[intl-schematic] ${u.name} error for key "${r}":
`,
            p
          );
        }
      }
    const s = i[r];
    return typeof s == "string" ? s : r;
    function c(l, u, g) {
      const p = a.reduce((P, O) => ({ ...P, [O.name]: A(O) }), {}),
        m = {
          name: l.name,
          originalCallArgs: o,
          originalKey: r,
          originalValue: g[r],
          ...this.pluginContext,
          plugins: p,
          doc: g,
          key: r,
          value: g[r],
          translate: v,
        };
      return m;
      function v(P, ...O) {
        return n.call(
          {
            plugins: P !== r ? a : a?.slice(u),
            pluginContext: { ...m, key: P, value: g[P] },
          },
          P,
          ...O
        );
      }
      function A(P) {
        return {
          translate: (O, ...b) =>
            P.translate.call({ ...m, key: O, value: g[O] }, ...b),
          match: P.match,
          info: P.info,
        };
      }
    }
  }.bind({ plugins: t });
}
function ac(e, t) {
  return (n) => {
    const [r, { mutate: o }] = Jn(e, (s) =>
      Promise.resolve(s)
        .then((c) => Promise.all([n(c), c]))
        .then(
          ([c, l]) => (
            c.remote?.then((u) => {
              u && o(([g, p] = [c.default, l]) => [{ ...g, ...u }, p]);
            }),
            [c.default, l]
          )
        )
    );
    return ic(
      () => r.latest?.[0],
      t(() => r.latest?.[1] ?? new Intl.Locale(navigator.language))
    );
  };
}
var tr = (e, t, n) => ({
    name: e,
    match: t,
    translate: n.translate ?? (() => {}),
    info: n.info,
  }),
  sc = (e) => tr("Locale", (t) => !1, { info: e });
function cc(e) {
  return Array.isArray(e);
}
var lc = (e = " ") =>
    tr("ArraysPlugin", cc, {
      translate(t, n = e) {
        const r = /^.*?:/,
          o = t ?? {},
          i = (c) => {
            if (r.test(c)) {
              const [u, g] = c.split(":"),
                p = isNaN(Number(u)) ? 0 : Number(u),
                m = s(o, g);
              return [String(m[p])];
            }
            const l =
              c in o ? this.translate(c, ...s(o, c)) : this.translate(c);
            return typeof l == "string" ? [l] : [];
          },
          a = this.value.reduce((c, l) => {
            if (typeof l == "string") return [...c, ...i(l)];
            const u = Object.keys(l)[0];
            if (typeof o[u] > "u" && u in l) o[u] = s(l, u);
            else if (u in l) {
              const g = s(o, u),
                p = s(l, u);
              o[u] = g.map((m, v) => {
                const A = p[v];
                return typeof m == "object" && typeof A == "object"
                  ? { ...A, ...m }
                  : m ?? A;
              });
            }
            return [...c, ...i(u)];
          }, []);
        if (typeof n == "string") return a.join(n);
        return n(a, e);
        function s(c, l) {
          const u = c[l];
          return Array.isArray(u) ? u : u == null ? [] : [u];
        }
      },
    }),
  uc = (e, t) => Object.keys(e).reduce((n, r) => ({ ...n, [r]: e[r](t) }), {}),
  fc = (e) => {
    const t = {};
    return tr(
      "ProcessorsPlugin",
      function (r) {
        if (typeof r != "object" || r == null) return !1;
        const o = Object.keys(r),
          i = [],
          a = o.filter((c) => (c in e ? !0 : (i.push(c), !1))),
          s = ["input", "parameter", "processor"];
        return (
          (a.length === 1 && i.every((c) => c === "input")) ||
          (a.length === 0 && i.every((c) => s.includes(c)))
        );
      },
      {
        info: e,
        translate(n, r) {
          var o;
          const i = this.plugins.Locale?.info() ?? new Intl.Locale("ia"),
            a = t[(o = String(i.baseName))] ?? (t[o] = uc(e, i)),
            s =
              "processor" in this.value &&
              typeof this.value.processor == "object"
                ? Object.keys(this.value.processor)[0]
                : Object.keys(this.value).find((v) => v !== "input") ?? "",
            c = a[s];
          if (!c) return;
          const l =
              "parameter" in this.value ? this.value.parameter : this.value[s],
            u = this.value.input ? dc(this.value.input, n) : n,
            g = { ...l, ...r };
          return c(g, this.key, this.doc)(u, g) ?? void 0;
        },
      }
    );
  };
function dc(e, t) {
  if (typeof t == "object" && t != null)
    for (const r in t) t[r] == null && delete t[r];
  return typeof e == "object" && typeof t == "object" ? { ...e, ...t } : t ?? e;
}
var hc = Object.defineProperty,
  gc = (e, t, n) =>
    t in e
      ? hc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  pc = (e, t, n) => (gc(e, typeof t != "symbol" ? t + "" : t, n), n),
  kt = (e, t, n) => {
    const r = {},
      o = n?.options,
      i = n?.format;
    return (a) => {
      var s;
      const c = r[(s = a.baseName)] ?? (r[s] = {});
      return (l, u) => {
        let g = c[u] ?? (c[u] = new e(a.language, o?.(l) ?? l));
        const p = (v, A) => {
            if (A) {
              const P = { ...l, ...A },
                O = u + JSON.stringify(P);
              g = c[O] ?? (c[O] = new e(a.language, P));
            }
            try {
              return g.format(typeof v == "string" ? t(v) : v);
            } catch {
              return String(v);
            }
          },
          m = i?.(p, t) ?? p;
        return (m.toParts = g.formatToParts?.bind(g)), m;
      };
    };
  },
  Nr = kt(Intl.DateTimeFormat, (e) => new Date(e)),
  mc = class {
    constructor(e, t) {
      pc(this, "displayNames"),
        (this.displayNames = new Intl.DisplayNames(
          t?.localeOverride ?? e,
          t ?? { type: "language" }
        ));
    }
    format(e) {
      return this.displayNames.of(e) ?? e;
    }
  },
  Br = kt(mc, (e) => e),
  $r = kt(Intl.NumberFormat, Number),
  Fr = (e) => {
    const t = new Intl.PluralRules(e.language);
    return (r) => (o) =>
      r[t.select(o)] ?? Object.values(r)[0] ?? String(t.select(o));
  },
  nr = {
    date: Nr,
    number: $r,
    plural: Fr,
    display: Br,
    "intl/date": Nr,
    "intl/number": $r,
    "intl/plural": Fr,
    "intl/display": Br,
  },
  bc = () => (e, t) => (n) => {
    const r =
      typeof n == "string"
        ? { key: n, fallback: t }
        : {
            fallback:
              ("default" in n
                ? n.default
                : "fallback" in n
                ? n.fallback
                : void 0) ?? t,
            key: ("key" in n ? n.key : "value" in n ? n.value : "") ?? "",
          };
    try {
      return e && r.key in e ? e[r.key] : String(r.fallback) ?? t;
    } catch {
      return String(r.fallback) ?? t;
    }
  },
  yc = (e, t, n = " ") => [sc(e), lc(n), fc(t)];
const xt = "Local",
  zo =
    typeof Intl.supportedValuesOf == "function"
      ? Intl.supportedValuesOf("timeZone")
      : [
          "Europe/Andorra",
          "Asia/Dubai",
          "Asia/Kabul",
          "Europe/Tirane",
          "Asia/Yerevan",
          "Antarctica/Casey",
          "Antarctica/Davis",
          "Antarctica/DumontDUrville",
          "Antarctica/Mawson",
          "Antarctica/Palmer",
          "Antarctica/Rothera",
          "Antarctica/Syowa",
          "Antarctica/Troll",
          "Antarctica/Vostok",
          "America/Argentina/Buenos_Aires",
          "America/Argentina/Cordoba",
          "America/Argentina/Salta",
          "America/Argentina/Jujuy",
          "America/Argentina/Tucuman",
          "America/Argentina/Catamarca",
          "America/Argentina/La_Rioja",
          "America/Argentina/San_Juan",
          "America/Argentina/Mendoza",
          "America/Argentina/San_Luis",
          "America/Argentina/Rio_Gallegos",
          "America/Argentina/Ushuaia",
          "Pacific/Pago_Pago",
          "Europe/Vienna",
          "Australia/Lord_Howe",
          "Antarctica/Macquarie",
          "Australia/Hobart",
          "Australia/Currie",
          "Australia/Melbourne",
          "Australia/Sydney",
          "Australia/Broken_Hill",
          "Australia/Brisbane",
          "Australia/Lindeman",
          "Australia/Adelaide",
          "Australia/Darwin",
          "Australia/Perth",
          "Australia/Eucla",
          "Asia/Baku",
          "America/Barbados",
          "Asia/Dhaka",
          "Europe/Brussels",
          "Europe/Sofia",
          "Atlantic/Bermuda",
          "Asia/Brunei",
          "America/La_Paz",
          "America/Noronha",
          "America/Belem",
          "America/Fortaleza",
          "America/Recife",
          "America/Araguaina",
          "America/Maceio",
          "America/Bahia",
          "America/Sao_Paulo",
          "America/Campo_Grande",
          "America/Cuiaba",
          "America/Santarem",
          "America/Porto_Velho",
          "America/Boa_Vista",
          "America/Manaus",
          "America/Eirunepe",
          "America/Rio_Branco",
          "America/Nassau",
          "Asia/Thimphu",
          "Europe/Minsk",
          "America/Belize",
          "America/St_Johns",
          "America/Halifax",
          "America/Glace_Bay",
          "America/Moncton",
          "America/Goose_Bay",
          "America/Blanc-Sablon",
          "America/Toronto",
          "America/Nipigon",
          "America/Thunder_Bay",
          "America/Iqaluit",
          "America/Pangnirtung",
          "America/Atikokan",
          "America/Winnipeg",
          "America/Rainy_River",
          "America/Resolute",
          "America/Rankin_Inlet",
          "America/Regina",
          "America/Swift_Current",
          "America/Edmonton",
          "America/Cambridge_Bay",
          "America/Yellowknife",
          "America/Inuvik",
          "America/Creston",
          "America/Dawson_Creek",
          "America/Fort_Nelson",
          "America/Vancouver",
          "America/Whitehorse",
          "America/Dawson",
          "Indian/Cocos",
          "Europe/Zurich",
          "Africa/Abidjan",
          "Pacific/Rarotonga",
          "America/Santiago",
          "America/Punta_Arenas",
          "Pacific/Easter",
          "Asia/Shanghai",
          "Asia/Urumqi",
          "America/Bogota",
          "America/Costa_Rica",
          "America/Havana",
          "Atlantic/Cape_Verde",
          "America/Curacao",
          "Indian/Christmas",
          "Asia/Nicosia",
          "Asia/Famagusta",
          "Europe/Prague",
          "Europe/Berlin",
          "Europe/Copenhagen",
          "America/Santo_Domingo",
          "Africa/Algiers",
          "America/Guayaquil",
          "Pacific/Galapagos",
          "Europe/Tallinn",
          "Africa/Cairo",
          "Africa/El_Aaiun",
          "Europe/Madrid",
          "Africa/Ceuta",
          "Atlantic/Canary",
          "Europe/Helsinki",
          "Pacific/Fiji",
          "Atlantic/Stanley",
          "Pacific/Chuuk",
          "Pacific/Pohnpei",
          "Pacific/Kosrae",
          "Atlantic/Faroe",
          "Europe/Paris",
          "Europe/London",
          "Asia/Tbilisi",
          "America/Cayenne",
          "Africa/Accra",
          "Europe/Gibraltar",
          "America/Godthab",
          "America/Danmarkshavn",
          "America/Scoresbysund",
          "America/Thule",
          "Europe/Athens",
          "Atlantic/South_Georgia",
          "America/Guatemala",
          "Pacific/Guam",
          "Africa/Bissau",
          "America/Guyana",
          "Asia/Hong_Kong",
          "America/Tegucigalpa",
          "America/Port-au-Prince",
          "Europe/Budapest",
          "Asia/Jakarta",
          "Asia/Pontianak",
          "Asia/Makassar",
          "Asia/Jayapura",
          "Europe/Dublin",
          "Asia/Jerusalem",
          "Asia/Kolkata",
          "Indian/Chagos",
          "Asia/Baghdad",
          "Asia/Tehran",
          "Atlantic/Reykjavik",
          "Europe/Rome",
          "America/Jamaica",
          "Asia/Amman",
          "Asia/Tokyo",
          "Africa/Nairobi",
          "Asia/Bishkek",
          "Pacific/Tarawa",
          "Pacific/Enderbury",
          "Pacific/Kiritimati",
          "Asia/Pyongyang",
          "Asia/Seoul",
          "Asia/Almaty",
          "Asia/Qyzylorda",
          "Asia/Qostanay",
          "Asia/Aqtobe",
          "Asia/Aqtau",
          "Asia/Atyrau",
          "Asia/Oral",
          "Asia/Beirut",
          "Asia/Colombo",
          "Africa/Monrovia",
          "Europe/Vilnius",
          "Europe/Luxembourg",
          "Europe/Riga",
          "Africa/Tripoli",
          "Africa/Casablanca",
          "Europe/Monaco",
          "Europe/Chisinau",
          "Pacific/Majuro",
          "Pacific/Kwajalein",
          "Asia/Yangon",
          "Asia/Ulaanbaatar",
          "Asia/Hovd",
          "Asia/Choibalsan",
          "Asia/Macau",
          "America/Martinique",
          "Europe/Malta",
          "Indian/Mauritius",
          "Indian/Maldives",
          "America/Mexico_City",
          "America/Cancun",
          "America/Merida",
          "America/Monterrey",
          "America/Matamoros",
          "America/Mazatlan",
          "America/Chihuahua",
          "America/Ojinaga",
          "America/Hermosillo",
          "America/Tijuana",
          "America/Bahia_Banderas",
          "Asia/Kuala_Lumpur",
          "Asia/Kuching",
          "Africa/Maputo",
          "Africa/Windhoek",
          "Pacific/Noumea",
          "Pacific/Norfolk",
          "Africa/Lagos",
          "America/Managua",
          "Europe/Amsterdam",
          "Europe/Oslo",
          "Asia/Kathmandu",
          "Pacific/Nauru",
          "Pacific/Niue",
          "Pacific/Auckland",
          "Pacific/Chatham",
          "America/Panama",
          "America/Lima",
          "Pacific/Tahiti",
          "Pacific/Marquesas",
          "Pacific/Gambier",
          "Pacific/Port_Moresby",
          "Pacific/Bougainville",
          "Asia/Manila",
          "Asia/Karachi",
          "Europe/Warsaw",
          "America/Miquelon",
          "Pacific/Pitcairn",
          "America/Puerto_Rico",
          "Asia/Gaza",
          "Asia/Hebron",
          "Europe/Lisbon",
          "Atlantic/Madeira",
          "Atlantic/Azores",
          "Pacific/Palau",
          "America/Asuncion",
          "Asia/Qatar",
          "Indian/Reunion",
          "Europe/Bucharest",
          "Europe/Belgrade",
          "Europe/Kaliningrad",
          "Europe/Moscow",
          "Europe/Simferopol",
          "Europe/Kirov",
          "Europe/Astrakhan",
          "Europe/Volgograd",
          "Europe/Saratov",
          "Europe/Ulyanovsk",
          "Europe/Samara",
          "Asia/Yekaterinburg",
          "Asia/Omsk",
          "Asia/Novosibirsk",
          "Asia/Barnaul",
          "Asia/Tomsk",
          "Asia/Novokuznetsk",
          "Asia/Krasnoyarsk",
          "Asia/Irkutsk",
          "Asia/Chita",
          "Asia/Yakutsk",
          "Asia/Khandyga",
          "Asia/Vladivostok",
          "Asia/Ust-Nera",
          "Asia/Magadan",
          "Asia/Sakhalin",
          "Asia/Srednekolymsk",
          "Asia/Kamchatka",
          "Asia/Anadyr",
          "Asia/Riyadh",
          "Pacific/Guadalcanal",
          "Indian/Mahe",
          "Africa/Khartoum",
          "Europe/Stockholm",
          "Asia/Singapore",
          "America/Paramaribo",
          "Africa/Juba",
          "Africa/Sao_Tome",
          "America/El_Salvador",
          "Asia/Damascus",
          "America/Grand_Turk",
          "Africa/Ndjamena",
          "Indian/Kerguelen",
          "Asia/Bangkok",
          "Asia/Dushanbe",
          "Pacific/Fakaofo",
          "Asia/Dili",
          "Asia/Ashgabat",
          "Africa/Tunis",
          "Pacific/Tongatapu",
          "Europe/Istanbul",
          "America/Port_of_Spain",
          "Pacific/Funafuti",
          "Asia/Taipei",
          "Europe/Kiev",
          "Europe/Uzhgorod",
          "Europe/Zaporozhye",
          "Pacific/Wake",
          "America/New_York",
          "America/Detroit",
          "America/Kentucky/Louisville",
          "America/Kentucky/Monticello",
          "America/Indiana/Indianapolis",
          "America/Indiana/Vincennes",
          "America/Indiana/Winamac",
          "America/Indiana/Marengo",
          "America/Indiana/Petersburg",
          "America/Indiana/Vevay",
          "America/Chicago",
          "America/Indiana/Tell_City",
          "America/Indiana/Knox",
          "America/Menominee",
          "America/North_Dakota/Center",
          "America/North_Dakota/New_Salem",
          "America/North_Dakota/Beulah",
          "America/Denver",
          "America/Boise",
          "America/Phoenix",
          "America/Los_Angeles",
          "America/Anchorage",
          "America/Juneau",
          "America/Sitka",
          "America/Metlakatla",
          "America/Yakutat",
          "America/Nome",
          "America/Adak",
          "Pacific/Honolulu",
          "America/Montevideo",
          "Asia/Samarkand",
          "Asia/Tashkent",
          "America/Caracas",
          "Asia/Ho_Chi_Minh",
          "Pacific/Efate",
          "Pacific/Wallis",
          "Pacific/Apia",
          "Africa/Johannesburg",
          "Pacific/Midway",
          "Pacific/Johnston",
          "America/Santa_Isabel",
          "America/Ciudad_Juarez",
          "America/Cayman",
          "America/Coral_Harbour",
          "America/Indianapolis",
          "America/Louisville",
          "America/Montreal",
          "America/Anguilla",
          "America/Antigua",
          "America/Aruba",
          "America/Dominica",
          "America/Grenada",
          "America/Guadeloupe",
          "America/Kralendijk",
          "America/Lower_Princes",
          "America/Marigot",
          "America/Montserrat",
          "America/St_Barthelemy",
          "America/St_Kitts",
          "America/St_Lucia",
          "America/St_Thomas",
          "America/St_Vincent",
          "America/Tortola",
          "America/Buenos_Aires",
          "America/Catamarca",
          "America/Cordoba",
          "America/Jujuy",
          "America/Mendoza",
          "Africa/Bamako",
          "Africa/Banjul",
          "Africa/Conakry",
          "Africa/Dakar",
          "Africa/Freetown",
          "Africa/Lome",
          "Africa/Nouakchott",
          "Africa/Ouagadougou",
          "Atlantic/Faeroe",
          "Atlantic/St_Helena",
          "Europe/Guernsey",
          "Europe/Isle_of_Man",
          "Europe/Jersey",
          "Africa/Bangui",
          "Africa/Brazzaville",
          "Africa/Douala",
          "Africa/Kinshasa",
          "Africa/Libreville",
          "Africa/Luanda",
          "Africa/Malabo",
          "Africa/Niamey",
          "Africa/Porto-Novo",
          "Arctic/Longyearbyen",
          "Europe/Bratislava",
          "Europe/Busingen",
          "Europe/Ljubljana",
          "Europe/Podgorica",
          "Europe/San_Marino",
          "Europe/Sarajevo",
          "Europe/Skopje",
          "Europe/Vaduz",
          "Europe/Vatican",
          "Europe/Zagreb",
          "Africa/Blantyre",
          "Africa/Bujumbura",
          "Africa/Gaborone",
          "Africa/Harare",
          "Africa/Kigali",
          "Africa/Lubumbashi",
          "Africa/Lusaka",
          "Africa/Maseru",
          "Africa/Mbabane",
          "Europe/Mariehamn",
          "Africa/Addis_Ababa",
          "Africa/Asmera",
          "Africa/Dar_es_Salaam",
          "Africa/Djibouti",
          "Africa/Kampala",
          "Africa/Mogadishu",
          "Asia/Aden",
          "Asia/Bahrain",
          "Asia/Kuwait",
          "Indian/Antananarivo",
          "Indian/Comoro",
          "Indian/Mayotte",
          "Asia/Muscat",
          "Asia/Calcutta",
          "Asia/Katmandu",
          "Asia/Rangoon",
          "Asia/Phnom_Penh",
          "Asia/Saigon",
          "Asia/Vientiane",
          "Pacific/Saipan",
          "Pacific/Truk",
          "Pacific/Ponape",
          "Antarctica/McMurdo",
        ],
  Et = z(ct()),
  vc = nr.date(new Intl.Locale("ia")),
  qt = () => Ke(Et),
  Ko = () => (Ke(Et).id === xt ? Ac() : Ke(Et).id),
  wc = (e) => (Uo(Et, e), e),
  Zd = (e) => {
    if (!e) return e ?? null;
    const t = new Date(e);
    return an(e) ? t.setUTCHours(0, 0, 0, 0) : t.setUTCSeconds(1, 1), t;
  },
  Yd = (e) => {
    if (!e) return e ?? null;
    const t = new Date(e);
    return an(t) ? t.setUTCSeconds(0, 0) : t.setUTCSeconds(1, 1), t;
  };
function tn(e = new Date()) {
  return e.getTimezoneOffset();
}
const nn = (e = new Date()) => {
  const t = Ke(Et);
  return t ? t.offset : tn(e);
};
function Go(e) {
  if (!e) return 0;
  if (e === xt) return tn();
  try {
    const [t, n] = (Sc("longOffset", e)?.slice(3) ?? "0:0")
      .split(":")
      .map(Number);
    if (isNaN(t) || isNaN(n)) throw "invalid timezone value";
    return -t * 60 + (n ? (t < 0 ? n : -n) : 0);
  } catch {
    const n = new Date(new Date().toLocaleString("en", { timeZone: e })),
      r = new Date(new Date().toLocaleString("en", { timeZone: "UTC" }));
    return -Math.round((n.getTime() - r.getTime()) / (60 * 1e3));
  }
}
function ct(e, t) {
  if (typeof e > "u") return ct(tn(), xt);
  typeof t == "string" && (e = Go(t));
  const n = typeof t == "string" ? t : typeof t == "number" ? zo[t] : _c(e);
  if (!n) return ct();
  const r = Math.floor(Math.abs(e) / 60),
    o = (e <= 0 ? "+" : "-") + [r, ("00" + (e % 60)).slice(-2)].join(":");
  return { id: n, offset: e, offsetName: o };
}
function Ac() {
  return new Intl.DateTimeFormat().resolvedOptions().timeZone;
}
const Qd = () => ct();
function _c(e) {
  return zo.find((t) => Go(t) === e);
}
function Sc(e, t = Intl.DateTimeFormat().resolvedOptions().timeZone, n) {
  return (n ? nr.date(n) : vc)({ timeZoneName: e, timeZone: t }, t + e)
    .toParts()
    .find((r) => r.type === "timeZoneName").value;
}
function Xd(e) {
  return Array.isArray(e.timeZones)
    ? e.timeZones
    : typeof e.getTimeZones == "function"
    ? e.getTimeZones() ?? []
    : [];
}
const jr = (e) => Math.floor(e.getTime() / 1e3 / 60),
  rr =
    (e) =>
    (...t) => {
      const n = t[t.length - 1],
        r = e(...t);
      return typeof n != "function" || e.length >= t.length ? r : n?.(r) ?? r;
    },
  Jo = rr((e) => {
    const t = new Date(e);
    return t.setMinutes(t.getMinutes() + t.getTimezoneOffset() - nn(e)), t;
  }),
  eh = rr((e) => {
    const t = new Date(e);
    return t.setMinutes(t.getMinutes() - t.getTimezoneOffset() + nn(e)), t;
  }),
  th = rr((e, t, n) => {
    const r = new Date(e);
    return r?.setHours(t, n, 1, 1), r;
  }),
  Ec = (e) => {
    const t = new Date(e);
    return t?.setUTCSeconds(0, 0), t;
  },
  nh = (e, t = rn()) =>
    !!e &&
    (or(e)
      ? jr(e) - nn(e) < jr(t)
      : e.getUTCFullYear() == t.getUTCFullYear()
      ? e.getUTCMonth() == t.getUTCMonth()
        ? e.getUTCDate() < t.getUTCDate()
        : e.getUTCMonth() < t.getUTCMonth()
      : e.getUTCFullYear() < t.getUTCFullYear()),
  ye = (e, t = rn()) =>
    !!e &&
    (or(e)
      ? Jo(
          e,
          (n) =>
            n.getFullYear() == t.getUTCFullYear() &&
            n.getMonth() == t.getUTCMonth() &&
            n.getDate() == t.getUTCDate()
        )
      : e.getUTCFullYear() == t.getUTCFullYear() &&
        e.getUTCMonth() == t.getUTCMonth() &&
        e.getUTCDate() == t.getUTCDate()),
  rn = () =>
    Jo(
      new Date(),
      (e) => (
        e.setUTCFullYear(e.getFullYear(), e.getMonth(), e.getDate()), Ec(e)
      )
    ),
  on =
    (e) =>
    (t = rn()) => {
      const n = new Date(t);
      return n.setDate(t.getDate() + e), n;
    },
  Cc = on(-1),
  Pc = on(1),
  Tc = on(2),
  an = (e) => !!e && e.getSeconds() === 0 && e?.getMilliseconds() === 0,
  or = (e) => !!e && (e.getSeconds() !== 0 || e?.getMilliseconds() !== 0),
  rh = (e) => e?.toISOString() ?? null;
function re(e, t) {
  Ic(e) && (e = "100%");
  var n = kc(e);
  return (
    (e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e)))),
    n && (e = parseInt(String(e * t), 10) / 100),
    Math.abs(e - t) < 1e-6
      ? 1
      : (t === 360
          ? (e = (e < 0 ? (e % t) + t : e % t) / parseFloat(String(t)))
          : (e = (e % t) / parseFloat(String(t))),
        e)
  );
}
function Rt(e) {
  return Math.min(1, Math.max(0, e));
}
function Ic(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function kc(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function Zo(e) {
  return (e = parseFloat(e)), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function Lt(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function He(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function xc(e, t, n) {
  return { r: re(e, 255) * 255, g: re(t, 255) * 255, b: re(n, 255) * 255 };
}
function Wr(e, t, n) {
  (e = re(e, 255)), (t = re(t, 255)), (n = re(n, 255));
  var r = Math.max(e, t, n),
    o = Math.min(e, t, n),
    i = 0,
    a = 0,
    s = (r + o) / 2;
  if (r === o) (a = 0), (i = 0);
  else {
    var c = r - o;
    switch (((a = s > 0.5 ? c / (2 - r - o) : c / (r + o)), r)) {
      case e:
        i = (t - n) / c + (t < n ? 6 : 0);
        break;
      case t:
        i = (n - e) / c + 2;
        break;
      case n:
        i = (e - t) / c + 4;
        break;
    }
    i /= 6;
  }
  return { h: i, s: a, l: s };
}
function bn(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * (6 * n)
      : n < 1 / 2
      ? t
      : n < 2 / 3
      ? e + (t - e) * (2 / 3 - n) * 6
      : e
  );
}
function Oc(e, t, n) {
  var r, o, i;
  if (((e = re(e, 360)), (t = re(t, 100)), (n = re(n, 100)), t === 0))
    (o = n), (i = n), (r = n);
  else {
    var a = n < 0.5 ? n * (1 + t) : n + t - n * t,
      s = 2 * n - a;
    (r = bn(s, a, e + 1 / 3)), (o = bn(s, a, e)), (i = bn(s, a, e - 1 / 3));
  }
  return { r: r * 255, g: o * 255, b: i * 255 };
}
function Hr(e, t, n) {
  (e = re(e, 255)), (t = re(t, 255)), (n = re(n, 255));
  var r = Math.max(e, t, n),
    o = Math.min(e, t, n),
    i = 0,
    a = r,
    s = r - o,
    c = r === 0 ? 0 : s / r;
  if (r === o) i = 0;
  else {
    switch (r) {
      case e:
        i = (t - n) / s + (t < n ? 6 : 0);
        break;
      case t:
        i = (n - e) / s + 2;
        break;
      case n:
        i = (e - t) / s + 4;
        break;
    }
    i /= 6;
  }
  return { h: i, s: c, v: a };
}
function Mc(e, t, n) {
  (e = re(e, 360) * 6), (t = re(t, 100)), (n = re(n, 100));
  var r = Math.floor(e),
    o = e - r,
    i = n * (1 - t),
    a = n * (1 - o * t),
    s = n * (1 - (1 - o) * t),
    c = r % 6,
    l = [n, a, i, i, s, n][c],
    u = [s, n, n, a, i, i][c],
    g = [i, i, s, n, n, a][c];
  return { r: l * 255, g: u * 255, b: g * 255 };
}
function Vr(e, t, n, r) {
  var o = [
    He(Math.round(e).toString(16)),
    He(Math.round(t).toString(16)),
    He(Math.round(n).toString(16)),
  ];
  return r &&
    o[0].startsWith(o[0].charAt(1)) &&
    o[1].startsWith(o[1].charAt(1)) &&
    o[2].startsWith(o[2].charAt(1))
    ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0)
    : o.join("");
}
function Dc(e, t, n, r, o) {
  var i = [
    He(Math.round(e).toString(16)),
    He(Math.round(t).toString(16)),
    He(Math.round(n).toString(16)),
    He(Rc(r)),
  ];
  return o &&
    i[0].startsWith(i[0].charAt(1)) &&
    i[1].startsWith(i[1].charAt(1)) &&
    i[2].startsWith(i[2].charAt(1)) &&
    i[3].startsWith(i[3].charAt(1))
    ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) + i[3].charAt(0)
    : i.join("");
}
function Rc(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function Ur(e) {
  return ce(e) / 255;
}
function ce(e) {
  return parseInt(e, 16);
}
function Lc(e) {
  return { r: e >> 16, g: (e & 65280) >> 8, b: e & 255 };
}
var Fn = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
};
function Nc(e) {
  var t = { r: 0, g: 0, b: 0 },
    n = 1,
    r = null,
    o = null,
    i = null,
    a = !1,
    s = !1;
  return (
    typeof e == "string" && (e = Fc(e)),
    typeof e == "object" &&
      (ve(e.r) && ve(e.g) && ve(e.b)
        ? ((t = xc(e.r, e.g, e.b)),
          (a = !0),
          (s = String(e.r).substr(-1) === "%" ? "prgb" : "rgb"))
        : ve(e.h) && ve(e.s) && ve(e.v)
        ? ((r = Lt(e.s)),
          (o = Lt(e.v)),
          (t = Mc(e.h, r, o)),
          (a = !0),
          (s = "hsv"))
        : ve(e.h) &&
          ve(e.s) &&
          ve(e.l) &&
          ((r = Lt(e.s)),
          (i = Lt(e.l)),
          (t = Oc(e.h, r, i)),
          (a = !0),
          (s = "hsl")),
      Object.prototype.hasOwnProperty.call(e, "a") && (n = e.a)),
    (n = Zo(n)),
    {
      ok: a,
      format: e.format || s,
      r: Math.min(255, Math.max(t.r, 0)),
      g: Math.min(255, Math.max(t.g, 0)),
      b: Math.min(255, Math.max(t.b, 0)),
      a: n,
    }
  );
}
var Bc = "[-\\+]?\\d+%?",
  $c = "[-\\+]?\\d*\\.\\d+%?",
  Pe = "(?:".concat($c, ")|(?:").concat(Bc, ")"),
  yn = "[\\s|\\(]+("
    .concat(Pe, ")[,|\\s]+(")
    .concat(Pe, ")[,|\\s]+(")
    .concat(Pe, ")\\s*\\)?"),
  vn = "[\\s|\\(]+("
    .concat(Pe, ")[,|\\s]+(")
    .concat(Pe, ")[,|\\s]+(")
    .concat(Pe, ")[,|\\s]+(")
    .concat(Pe, ")\\s*\\)?"),
  pe = {
    CSS_UNIT: new RegExp(Pe),
    rgb: new RegExp("rgb" + yn),
    rgba: new RegExp("rgba" + vn),
    hsl: new RegExp("hsl" + yn),
    hsla: new RegExp("hsla" + vn),
    hsv: new RegExp("hsv" + yn),
    hsva: new RegExp("hsva" + vn),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  };
function Fc(e) {
  if (((e = e.trim().toLowerCase()), e.length === 0)) return !1;
  var t = !1;
  if (Fn[e]) (e = Fn[e]), (t = !0);
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var n = pe.rgb.exec(e);
  return n
    ? { r: n[1], g: n[2], b: n[3] }
    : ((n = pe.rgba.exec(e)),
      n
        ? { r: n[1], g: n[2], b: n[3], a: n[4] }
        : ((n = pe.hsl.exec(e)),
          n
            ? { h: n[1], s: n[2], l: n[3] }
            : ((n = pe.hsla.exec(e)),
              n
                ? { h: n[1], s: n[2], l: n[3], a: n[4] }
                : ((n = pe.hsv.exec(e)),
                  n
                    ? { h: n[1], s: n[2], v: n[3] }
                    : ((n = pe.hsva.exec(e)),
                      n
                        ? { h: n[1], s: n[2], v: n[3], a: n[4] }
                        : ((n = pe.hex8.exec(e)),
                          n
                            ? {
                                r: ce(n[1]),
                                g: ce(n[2]),
                                b: ce(n[3]),
                                a: Ur(n[4]),
                                format: t ? "name" : "hex8",
                              }
                            : ((n = pe.hex6.exec(e)),
                              n
                                ? {
                                    r: ce(n[1]),
                                    g: ce(n[2]),
                                    b: ce(n[3]),
                                    format: t ? "name" : "hex",
                                  }
                                : ((n = pe.hex4.exec(e)),
                                  n
                                    ? {
                                        r: ce(n[1] + n[1]),
                                        g: ce(n[2] + n[2]),
                                        b: ce(n[3] + n[3]),
                                        a: Ur(n[4] + n[4]),
                                        format: t ? "name" : "hex8",
                                      }
                                    : ((n = pe.hex3.exec(e)),
                                      n
                                        ? {
                                            r: ce(n[1] + n[1]),
                                            g: ce(n[2] + n[2]),
                                            b: ce(n[3] + n[3]),
                                            format: t ? "name" : "hex",
                                          }
                                        : !1)))))))));
}
function ve(e) {
  return !!pe.CSS_UNIT.exec(String(e));
}
var jc = (function () {
  function e(t, n) {
    t === void 0 && (t = ""), n === void 0 && (n = {});
    var r;
    if (t instanceof e) return t;
    typeof t == "number" && (t = Lc(t)), (this.originalInput = t);
    var o = Nc(t);
    (this.originalInput = t),
      (this.r = o.r),
      (this.g = o.g),
      (this.b = o.b),
      (this.a = o.a),
      (this.roundA = Math.round(100 * this.a) / 100),
      (this.format = (r = n.format) !== null && r !== void 0 ? r : o.format),
      (this.gradientType = n.gradientType),
      this.r < 1 && (this.r = Math.round(this.r)),
      this.g < 1 && (this.g = Math.round(this.g)),
      this.b < 1 && (this.b = Math.round(this.b)),
      (this.isValid = o.ok);
  }
  return (
    (e.prototype.isDark = function () {
      return this.getBrightness() < 128;
    }),
    (e.prototype.isLight = function () {
      return !this.isDark();
    }),
    (e.prototype.getBrightness = function () {
      var t = this.toRgb();
      return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
    }),
    (e.prototype.getLuminance = function () {
      var t = this.toRgb(),
        n,
        r,
        o,
        i = t.r / 255,
        a = t.g / 255,
        s = t.b / 255;
      return (
        i <= 0.03928
          ? (n = i / 12.92)
          : (n = Math.pow((i + 0.055) / 1.055, 2.4)),
        a <= 0.03928
          ? (r = a / 12.92)
          : (r = Math.pow((a + 0.055) / 1.055, 2.4)),
        s <= 0.03928
          ? (o = s / 12.92)
          : (o = Math.pow((s + 0.055) / 1.055, 2.4)),
        0.2126 * n + 0.7152 * r + 0.0722 * o
      );
    }),
    (e.prototype.getAlpha = function () {
      return this.a;
    }),
    (e.prototype.setAlpha = function (t) {
      return (
        (this.a = Zo(t)), (this.roundA = Math.round(100 * this.a) / 100), this
      );
    }),
    (e.prototype.isMonochrome = function () {
      var t = this.toHsl().s;
      return t === 0;
    }),
    (e.prototype.toHsv = function () {
      var t = Hr(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
    }),
    (e.prototype.toHsvString = function () {
      var t = Hr(this.r, this.g, this.b),
        n = Math.round(t.h * 360),
        r = Math.round(t.s * 100),
        o = Math.round(t.v * 100);
      return this.a === 1
        ? "hsv(".concat(n, ", ").concat(r, "%, ").concat(o, "%)")
        : "hsva("
            .concat(n, ", ")
            .concat(r, "%, ")
            .concat(o, "%, ")
            .concat(this.roundA, ")");
    }),
    (e.prototype.toHsl = function () {
      var t = Wr(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
    }),
    (e.prototype.toHslString = function () {
      var t = Wr(this.r, this.g, this.b),
        n = Math.round(t.h * 360),
        r = Math.round(t.s * 100),
        o = Math.round(t.l * 100);
      return this.a === 1
        ? "hsl(".concat(n, ", ").concat(r, "%, ").concat(o, "%)")
        : "hsla("
            .concat(n, ", ")
            .concat(r, "%, ")
            .concat(o, "%, ")
            .concat(this.roundA, ")");
    }),
    (e.prototype.toHex = function (t) {
      return t === void 0 && (t = !1), Vr(this.r, this.g, this.b, t);
    }),
    (e.prototype.toHexString = function (t) {
      return t === void 0 && (t = !1), "#" + this.toHex(t);
    }),
    (e.prototype.toHex8 = function (t) {
      return t === void 0 && (t = !1), Dc(this.r, this.g, this.b, this.a, t);
    }),
    (e.prototype.toHex8String = function (t) {
      return t === void 0 && (t = !1), "#" + this.toHex8(t);
    }),
    (e.prototype.toHexShortString = function (t) {
      return (
        t === void 0 && (t = !1),
        this.a === 1 ? this.toHexString(t) : this.toHex8String(t)
      );
    }),
    (e.prototype.toRgb = function () {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a,
      };
    }),
    (e.prototype.toRgbString = function () {
      var t = Math.round(this.r),
        n = Math.round(this.g),
        r = Math.round(this.b);
      return this.a === 1
        ? "rgb(".concat(t, ", ").concat(n, ", ").concat(r, ")")
        : "rgba("
            .concat(t, ", ")
            .concat(n, ", ")
            .concat(r, ", ")
            .concat(this.roundA, ")");
    }),
    (e.prototype.toPercentageRgb = function () {
      var t = function (n) {
        return "".concat(Math.round(re(n, 255) * 100), "%");
      };
      return { r: t(this.r), g: t(this.g), b: t(this.b), a: this.a };
    }),
    (e.prototype.toPercentageRgbString = function () {
      var t = function (n) {
        return Math.round(re(n, 255) * 100);
      };
      return this.a === 1
        ? "rgb("
            .concat(t(this.r), "%, ")
            .concat(t(this.g), "%, ")
            .concat(t(this.b), "%)")
        : "rgba("
            .concat(t(this.r), "%, ")
            .concat(t(this.g), "%, ")
            .concat(t(this.b), "%, ")
            .concat(this.roundA, ")");
    }),
    (e.prototype.toName = function () {
      if (this.a === 0) return "transparent";
      if (this.a < 1) return !1;
      for (
        var t = "#" + Vr(this.r, this.g, this.b, !1),
          n = 0,
          r = Object.entries(Fn);
        n < r.length;
        n++
      ) {
        var o = r[n],
          i = o[0],
          a = o[1];
        if (t === a) return i;
      }
      return !1;
    }),
    (e.prototype.toString = function (t) {
      var n = !!t;
      t = t ?? this.format;
      var r = !1,
        o = this.a < 1 && this.a >= 0,
        i = !n && o && (t.startsWith("hex") || t === "name");
      return i
        ? t === "name" && this.a === 0
          ? this.toName()
          : this.toRgbString()
        : (t === "rgb" && (r = this.toRgbString()),
          t === "prgb" && (r = this.toPercentageRgbString()),
          (t === "hex" || t === "hex6") && (r = this.toHexString()),
          t === "hex3" && (r = this.toHexString(!0)),
          t === "hex4" && (r = this.toHex8String(!0)),
          t === "hex8" && (r = this.toHex8String()),
          t === "name" && (r = this.toName()),
          t === "hsl" && (r = this.toHslString()),
          t === "hsv" && (r = this.toHsvString()),
          r || this.toHexString());
    }),
    (e.prototype.toNumber = function () {
      return (
        (Math.round(this.r) << 16) +
        (Math.round(this.g) << 8) +
        Math.round(this.b)
      );
    }),
    (e.prototype.clone = function () {
      return new e(this.toString());
    }),
    (e.prototype.lighten = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.l += t / 100), (n.l = Rt(n.l)), new e(n);
    }),
    (e.prototype.brighten = function (t) {
      t === void 0 && (t = 10);
      var n = this.toRgb();
      return (
        (n.r = Math.max(0, Math.min(255, n.r - Math.round(255 * -(t / 100))))),
        (n.g = Math.max(0, Math.min(255, n.g - Math.round(255 * -(t / 100))))),
        (n.b = Math.max(0, Math.min(255, n.b - Math.round(255 * -(t / 100))))),
        new e(n)
      );
    }),
    (e.prototype.darken = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.l -= t / 100), (n.l = Rt(n.l)), new e(n);
    }),
    (e.prototype.tint = function (t) {
      return t === void 0 && (t = 10), this.mix("white", t);
    }),
    (e.prototype.shade = function (t) {
      return t === void 0 && (t = 10), this.mix("black", t);
    }),
    (e.prototype.desaturate = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.s -= t / 100), (n.s = Rt(n.s)), new e(n);
    }),
    (e.prototype.saturate = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.s += t / 100), (n.s = Rt(n.s)), new e(n);
    }),
    (e.prototype.greyscale = function () {
      return this.desaturate(100);
    }),
    (e.prototype.spin = function (t) {
      var n = this.toHsl(),
        r = (n.h + t) % 360;
      return (n.h = r < 0 ? 360 + r : r), new e(n);
    }),
    (e.prototype.mix = function (t, n) {
      n === void 0 && (n = 50);
      var r = this.toRgb(),
        o = new e(t).toRgb(),
        i = n / 100,
        a = {
          r: (o.r - r.r) * i + r.r,
          g: (o.g - r.g) * i + r.g,
          b: (o.b - r.b) * i + r.b,
          a: (o.a - r.a) * i + r.a,
        };
      return new e(a);
    }),
    (e.prototype.analogous = function (t, n) {
      t === void 0 && (t = 6), n === void 0 && (n = 30);
      var r = this.toHsl(),
        o = 360 / n,
        i = [this];
      for (r.h = (r.h - ((o * t) >> 1) + 720) % 360; --t; )
        (r.h = (r.h + o) % 360), i.push(new e(r));
      return i;
    }),
    (e.prototype.complement = function () {
      var t = this.toHsl();
      return (t.h = (t.h + 180) % 360), new e(t);
    }),
    (e.prototype.monochromatic = function (t) {
      t === void 0 && (t = 6);
      for (
        var n = this.toHsv(), r = n.h, o = n.s, i = n.v, a = [], s = 1 / t;
        t--;

      )
        a.push(new e({ h: r, s: o, v: i })), (i = (i + s) % 1);
      return a;
    }),
    (e.prototype.splitcomplement = function () {
      var t = this.toHsl(),
        n = t.h;
      return [
        this,
        new e({ h: (n + 72) % 360, s: t.s, l: t.l }),
        new e({ h: (n + 216) % 360, s: t.s, l: t.l }),
      ];
    }),
    (e.prototype.onBackground = function (t) {
      var n = this.toRgb(),
        r = new e(t).toRgb(),
        o = n.a + r.a * (1 - n.a);
      return new e({
        r: (n.r * n.a + r.r * r.a * (1 - n.a)) / o,
        g: (n.g * n.a + r.g * r.a * (1 - n.a)) / o,
        b: (n.b * n.a + r.b * r.a * (1 - n.a)) / o,
        a: o,
      });
    }),
    (e.prototype.triad = function () {
      return this.polyad(3);
    }),
    (e.prototype.tetrad = function () {
      return this.polyad(4);
    }),
    (e.prototype.polyad = function (t) {
      for (
        var n = this.toHsl(), r = n.h, o = [this], i = 360 / t, a = 1;
        a < t;
        a++
      )
        o.push(new e({ h: (r + a * i) % 360, s: n.s, l: n.l }));
      return o;
    }),
    (e.prototype.equals = function (t) {
      return this.toRgbString() === new e(t).toRgbString();
    }),
    e
  );
})();
function Wc(e, t) {
  return e === void 0 && (e = ""), t === void 0 && (t = {}), new jc(e, t);
}
const Hc = tt(
    '<button class="fixed bg-tg_button c-tg_button_text z-100000">&lt; Back <!>/'
  ),
  Vc = tt(
    '<button class="absolute bottom-0 w-full mt-2 rounded-2 p-3 c-tg_button_text z-999999999 bg-tg_button">main-button <!>/'
  ),
  Fe = [];
function oh(e) {
  let t = 0;
  const n = Ut({ isVisible: !0, onClick: () => history.back() }, e);
  ie(() => {
    n.isVisible !== !1 ? V.BackButton.show() : V.BackButton.hide();
  });
  function r() {
    Fe.length - 1 === t && n.onClick();
  }
  return (
    Qt(() => {
      V.BackButton.onClick(r),
        (t = Fe.length),
        Fe.push(n),
        setTimeout(() => {
          n.isVisible !== !1 ? V.BackButton.show() : V.BackButton.hide();
        }, 10);
    }),
    de(() => {
      V.BackButton.offClick(r),
        Fe.pop(),
        setTimeout(() => {
          Fe.length === 0
            ? V.BackButton.hide()
            : Fe.at(-1)?.isVisible !== !1
            ? V.BackButton.show()
            : V.BackButton.hide();
        }, 10);
    }),
    M(ze, {
      get when() {
        return n.isVisible && !1;
      },
      get children() {
        const o = Hc(),
          i = o.firstChild,
          a = i.nextSibling;
        return (
          a.nextSibling,
          (o.$$click = r),
          le(o, t, a),
          le(o, () => Fe.length, null),
          o
        );
      },
    })
  );
}
const J = V.MainButton,
  Uc = (e, t) => {
    const n = getComputedStyle(document.documentElement),
      r = n.getPropertyValue(e);
    return r || n.getPropertyValue(t);
  },
  Yo = (e, t) => Wc(Uc(e, t));
function qr() {
  const e = Yo("--tg-theme-button-color", "--default-tg-theme-button-color");
  return J.setParams({ color: e.toHexString() }), e;
}
const Ce = [];
function ih(e) {
  let t = Ce.length;
  const n = () => Yo("--tg-theme-hint-color", "--default-tg-theme-hint-color");
  ie(() => {
    J.setParams({
      is_visible: e.isVisible !== !1,
      color: e.backgroundColor,
      text_color: e.textColor,
      text: e.text,
    });
  });
  let r = J.color;
  ie(() => {
    e.disabled
      ? ((r = J.color), J.disable(), J.setParams({ color: n().toHexString() }))
      : (J.enable(),
        e.backgroundColor
          ? J.setParams({ color: e.backgroundColor ?? r })
          : qr());
  }),
    ie(() => {
      e.showProgress ? J.showProgress() : J.hideProgress();
    });
  function o() {
    Ce.length - 1 === t && e.onClick?.();
  }
  return (
    Qt(() => {
      console.count("mount"),
        J.onClick(o),
        (t = Ce.length),
        Ce.push(e),
        setTimeout(() => {
          e.isVisible !== !1 ? J.show() : J.hide();
        }, 10);
    }),
    de(() => {
      console.count("cleanup"),
        J.offClick(o),
        Ce.pop(),
        setTimeout(() => {
          if (Ce.length === 0) J.hide();
          else {
            const i = Ce.at(-1);
            i &&
              (J.setParams({
                is_visible: i.isVisible !== !1,
                color: i.backgroundColor,
                text_color: i.textColor,
                text: i.text,
                is_active: !i.disabled,
              }),
              i.disabled
                ? ((r = J.color),
                  J.disable(),
                  J.setParams({ color: n().toHexString() }))
                : (J.enable(),
                  i.backgroundColor
                    ? J.setParams({ color: i.backgroundColor ?? r })
                    : qr()));
          }
        }, 10);
    }),
    M(ze, {
      get when() {
        return e.isVisible && !1;
      },
      get children() {
        const i = Vc(),
          a = i.firstChild,
          s = a.nextSibling;
        return (
          s.nextSibling,
          (i.$$click = (c) => (c.stopPropagation(), o())),
          le(i, t, s),
          le(i, () => Ce.length, null),
          i
        );
      },
    })
  );
}
const Qo = {
  setItem(e, t) {
    return t === void 0
      ? this.removeItem(e)
      : (localStorage.setItem(e, t),
        new Promise((n, r) =>
          V.CloudStorage.setItem(e, t, (o, i) => (o || !i ? r(o) : n()))
        ));
  },
  getItem(e) {
    return new Promise((t, n) =>
      V.CloudStorage.getItem(e, (r, o) =>
        r && !localStorage.getItem(e)
          ? n(r)
          : t(
              o != null
                ? (localStorage.setItem(e, o), o)
                : localStorage.getItem(e) ?? null
            )
      )
    );
  },
  removeItem(e) {
    return (
      localStorage.removeItem(e),
      new Promise((t, n) =>
        V.CloudStorage.removeItem(e, (r, o) => (r || !o ? n(r) : t()))
      )
    );
  },
  clear() {
    const e = new Promise((t, n) =>
      V.CloudStorage.getKeys((r, o) => (r ? n(r) : t(o)))
    );
    return (
      localStorage.clear(),
      new Promise((t, n) =>
        e.then(
          (r) =>
            r && V.CloudStorage.removeItems(r, (o, i) => (o || !i ? n(o) : t()))
        )
      )
    );
  },
  key(e) {
    return new Promise((n, r) =>
      V.CloudStorage.getKeys((o, i) => (o ? r(o) : n(i)))
    ).then((n) => n?.[e] ?? null);
  },
  get length() {
    return new Promise((e, t) =>
      V.CloudStorage.getKeys((n, r) => (n || !r ? t(n) : e(r.length)))
    );
  },
  getAll() {
    return new Promise((t, n) =>
      V.CloudStorage.getKeys((r, o) => (r ? n(r) : t(o)))
    ).then((t) => t && V.CloudStorage.getItems(t));
  },
};
Tt(["click"]);
const [qc, ah] = qo(z(), { name: "hourCycle", storage: Qo }),
  sh = [void 0, "h11", "h12", "h23", "h24"],
  ch = () => {
    const e = Ge();
    return Array.isArray(e.hourCycles) && e.hourCycles[0]
      ? e.hourCycles[0]
      : typeof e.getHourCycles == "function"
      ? e.getHourCycles()
      : e.hourCycle;
  },
  Xo = "locale",
  zr =
    localStorage.getItem(Xo) ||
    V.initDataUnsafe.user?.language_code ||
    window.navigator.language,
  ei = qo(
    z(new Intl.Locale(zr), { equals: (e, t) => e.baseName == t.baseName }),
    {
      name: Xo,
      storage: Qo,
      serialize(e) {
        return e.baseName;
      },
      deserialize(e) {
        try {
          return new Intl.Locale(e);
        } catch {
          return new Intl.Locale(zr);
        }
      },
    }
  ),
  Ge = () => Ke(ei),
  zc = (e) => Uo(ei, new Intl.Locale(e)),
  ti = (e) => new Date(e),
  ni = (e, t) => ({ ...e, timeZone: t ?? Ko(), hourCycle: qc() }),
  Kc =
    (e, t) =>
    (...n) => {
      const [r, o] = n,
        i = typeof r == "string" ? t(r) : r;
      return e(r, ni(o, an(i) ? "UTC" : void 0));
    },
  Kr = kt(Intl.DateTimeFormat, ti, { format: Kc }),
  Gc = ac(Ge, (e) =>
    yc(e, {
      ...nr,
      dictionary: bc,
      date: Kr,
      "intl/date": Kr,
      "relative-date": kt(Intl.DateTimeFormat, ti, {
        format: (t) => (n, r) => {
          const o = new Date(n.date),
            i = rn(),
            a = ni(
              {
                ...r,
                year: o.getFullYear() !== i.getFullYear() ? "numeric" : r?.year,
              },
              an(o) ? "UTC" : void 0
            ),
            s = Pc(),
            c = Cc(),
            l = Tc(),
            u = Object.keys(n)
              .map(Number)
              .filter((v) => !isNaN(v))
              .map((v) => ({ delta: v, date: on(v)(i) })),
            g = () => {
              const v = u.find((A) => ye(o, A.date))?.delta;
              return v && v in n ? n[v] : void 0;
            },
            p =
              ((ye(o, i) && n.today) ||
                (ye(o, s) && n.tomorrow) ||
                (ye(o, c) && n.yesterday) ||
                (ye(o, l) && n.afterTomorrow) ||
                g()) &&
              or(o),
            m = t(
              (ye(o, i)
                ? n.today
                : ye(o, s)
                ? n.tomorrow
                : ye(o, c)
                ? n.yesterday
                : ye(o, l)
                ? n.afterTomorrow
                : g()) ?? n.date,
              a
            );
          return p
            ? `${m}, ${t(o, {
                ...a,
                hour: "2-digit",
                minute: "2-digit",
                day: void 0,
                month: void 0,
                year: void 0,
              })}`
            : m;
        },
      }),
    })
  ),
  Jc = { "Content-Type": "application/json" };
function ri(e = {}) {
  const {
    fetch: t = globalThis.fetch,
    querySerializer: n,
    bodySerializer: r,
    ...o
  } = e;
  let i = o.baseUrl ?? "";
  i.endsWith("/") && (i = i.slice(0, -1));
  async function a(s, c) {
    const {
        fetch: l = t,
        headers: u,
        body: g,
        params: p = {},
        parseAs: m = "json",
        querySerializer: v = n ?? Zc,
        bodySerializer: A = r ?? Yc,
        ...P
      } = c || {},
      O = Qc(s, { baseUrl: i, params: p, querySerializer: v }),
      b = Xc(Jc, e?.headers, u, p.header),
      _ = { redirect: "follow", ...o, ...P, headers: b };
    g && (_.body = A(g)),
      _.body instanceof FormData && b.delete("Content-Type");
    const S = await l(O, _);
    if (S.status === 204 || S.headers.get("Content-Length") === "0")
      return S.ok ? { data: {}, response: S } : { error: {}, response: S };
    if (S.ok) {
      let $;
      if (m !== "stream") {
        const Z = S.clone();
        $ = typeof Z[m] == "function" ? await Z[m]() : await Z.text();
      } else $ = S.clone().body;
      return { data: $, response: S };
    }
    let x = {};
    try {
      x = await S.clone().json();
    } catch {
      x = await S.clone().text();
    }
    return { error: x, response: S };
  }
  return {
    async GET(s, ...c) {
      return a(s, { ...c[0], method: "GET" });
    },
    async PUT(s, ...c) {
      return a(s, { ...c[0], method: "PUT" });
    },
    async POST(s, ...c) {
      return a(s, { ...c[0], method: "POST" });
    },
    async DELETE(s, ...c) {
      return a(s, { ...c[0], method: "DELETE" });
    },
    async OPTIONS(s, ...c) {
      return a(s, { ...c[0], method: "OPTIONS" });
    },
    async HEAD(s, ...c) {
      return a(s, { ...c[0], method: "HEAD" });
    },
    async PATCH(s, ...c) {
      return a(s, { ...c[0], method: "PATCH" });
    },
    async TRACE(s, ...c) {
      return a(s, { ...c[0], method: "TRACE" });
    },
  };
}
function Zc(e) {
  const t = new URLSearchParams();
  if (e && typeof e == "object")
    for (const [n, r] of Object.entries(e)) r != null && t.set(n, r);
  return t.toString();
}
function Yc(e) {
  return JSON.stringify(e);
}
function Qc(e, t) {
  let n = `${t.baseUrl}${e}`;
  if (t.params.path)
    for (const [o, i] of Object.entries(t.params.path))
      n = n.replace(`{${o}}`, encodeURIComponent(String(i)));
  const r = t.querySerializer(t.params.query ?? {});
  return r && (n += `?${r}`), n;
}
function Xc(...e) {
  const t = new Headers();
  for (const n of e) {
    if (!n || typeof n != "object") continue;
    const r = n instanceof Headers ? n.entries() : Object.entries(n);
    for (const [o, i] of r)
      i === null ? t.delete(o) : i !== void 0 && t.set(o, i);
  }
  return t;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const oi = function (e) {
    const t = [];
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      let o = e.charCodeAt(r);
      o < 128
        ? (t[n++] = o)
        : o < 2048
        ? ((t[n++] = (o >> 6) | 192), (t[n++] = (o & 63) | 128))
        : (o & 64512) === 55296 &&
          r + 1 < e.length &&
          (e.charCodeAt(r + 1) & 64512) === 56320
        ? ((o = 65536 + ((o & 1023) << 10) + (e.charCodeAt(++r) & 1023)),
          (t[n++] = (o >> 18) | 240),
          (t[n++] = ((o >> 12) & 63) | 128),
          (t[n++] = ((o >> 6) & 63) | 128),
          (t[n++] = (o & 63) | 128))
        : ((t[n++] = (o >> 12) | 224),
          (t[n++] = ((o >> 6) & 63) | 128),
          (t[n++] = (o & 63) | 128));
    }
    return t;
  },
  el = function (e) {
    const t = [];
    let n = 0,
      r = 0;
    for (; n < e.length; ) {
      const o = e[n++];
      if (o < 128) t[r++] = String.fromCharCode(o);
      else if (o > 191 && o < 224) {
        const i = e[n++];
        t[r++] = String.fromCharCode(((o & 31) << 6) | (i & 63));
      } else if (o > 239 && o < 365) {
        const i = e[n++],
          a = e[n++],
          s = e[n++],
          c =
            (((o & 7) << 18) | ((i & 63) << 12) | ((a & 63) << 6) | (s & 63)) -
            65536;
        (t[r++] = String.fromCharCode(55296 + (c >> 10))),
          (t[r++] = String.fromCharCode(56320 + (c & 1023)));
      } else {
        const i = e[n++],
          a = e[n++];
        t[r++] = String.fromCharCode(
          ((o & 15) << 12) | ((i & 63) << 6) | (a & 63)
        );
      }
    }
    return t.join("");
  },
  ii = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/=";
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_.";
    },
    HAS_NATIVE_SUPPORT: typeof atob == "function",
    encodeByteArray(e, t) {
      if (!Array.isArray(e))
        throw Error("encodeByteArray takes an array as a parameter");
      this.init_();
      const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        r = [];
      for (let o = 0; o < e.length; o += 3) {
        const i = e[o],
          a = o + 1 < e.length,
          s = a ? e[o + 1] : 0,
          c = o + 2 < e.length,
          l = c ? e[o + 2] : 0,
          u = i >> 2,
          g = ((i & 3) << 4) | (s >> 4);
        let p = ((s & 15) << 2) | (l >> 6),
          m = l & 63;
        c || ((m = 64), a || (p = 64)), r.push(n[u], n[g], n[p], n[m]);
      }
      return r.join("");
    },
    encodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? btoa(e)
        : this.encodeByteArray(oi(e), t);
    },
    decodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? atob(e)
        : el(this.decodeStringToByteArray(e, t));
    },
    decodeStringToByteArray(e, t) {
      this.init_();
      const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        r = [];
      for (let o = 0; o < e.length; ) {
        const i = n[e.charAt(o++)],
          s = o < e.length ? n[e.charAt(o)] : 0;
        ++o;
        const l = o < e.length ? n[e.charAt(o)] : 64;
        ++o;
        const g = o < e.length ? n[e.charAt(o)] : 64;
        if ((++o, i == null || s == null || l == null || g == null))
          throw new tl();
        const p = (i << 2) | (s >> 4);
        if ((r.push(p), l !== 64)) {
          const m = ((s << 4) & 240) | (l >> 2);
          if ((r.push(m), g !== 64)) {
            const v = ((l << 6) & 192) | g;
            r.push(v);
          }
        }
      }
      return r;
    },
    init_() {
      if (!this.byteToCharMap_) {
        (this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {});
        for (let e = 0; e < this.ENCODED_VALS.length; e++)
          (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
            (this.charToByteMap_[this.byteToCharMap_[e]] = e),
            (this.byteToCharMapWebSafe_[e] =
              this.ENCODED_VALS_WEBSAFE.charAt(e)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
            e >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
      }
    },
  };
class tl extends Error {
  constructor() {
    super(...arguments), (this.name = "DecodeBase64StringError");
  }
}
const nl = function (e) {
    const t = oi(e);
    return ii.encodeByteArray(t, !0);
  },
  ai = function (e) {
    return nl(e).replace(/\./g, "");
  },
  rl = function (e) {
    try {
      return ii.decodeString(e, !0);
    } catch (t) {
      console.error("base64Decode failed: ", t);
    }
    return null;
  };
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ol() {
  if (typeof self < "u") return self;
  if (typeof window < "u") return window;
  if (typeof global < "u") return global;
  throw new Error("Unable to locate global object.");
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const il = () => ol().__FIREBASE_DEFAULTS__,
  al = () => {
    if (typeof process > "u" || typeof process.env > "u") return;
    const e = {}.__FIREBASE_DEFAULTS__;
    if (e) return JSON.parse(e);
  },
  sl = () => {
    if (typeof document > "u") return;
    let e;
    try {
      e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    } catch {
      return;
    }
    const t = e && rl(e[1]);
    return t && JSON.parse(t);
  },
  cl = () => {
    try {
      return il() || al() || sl();
    } catch (e) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
      return;
    }
  },
  si = () => {
    var e;
    return (e = cl()) === null || e === void 0 ? void 0 : e.config;
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ll {
  constructor() {
    (this.reject = () => {}),
      (this.resolve = () => {}),
      (this.promise = new Promise((t, n) => {
        (this.resolve = t), (this.reject = n);
      }));
  }
  wrapCallback(t) {
    return (n, r) => {
      n ? this.reject(n) : this.resolve(r),
        typeof t == "function" &&
          (this.promise.catch(() => {}), t.length === 1 ? t(n) : t(n, r));
    };
  }
}
function ci() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function ul() {
  return new Promise((e, t) => {
    try {
      let n = !0;
      const r = "validate-browser-context-for-indexeddb-analytics-module",
        o = self.indexedDB.open(r);
      (o.onsuccess = () => {
        o.result.close(), n || self.indexedDB.deleteDatabase(r), e(!0);
      }),
        (o.onupgradeneeded = () => {
          n = !1;
        }),
        (o.onerror = () => {
          var i;
          t(
            ((i = o.error) === null || i === void 0 ? void 0 : i.message) || ""
          );
        });
    } catch (n) {
      t(n);
    }
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const fl = "FirebaseError";
class Re extends Error {
  constructor(t, n, r) {
    super(n),
      (this.code = t),
      (this.customData = r),
      (this.name = fl),
      Object.setPrototypeOf(this, Re.prototype),
      Error.captureStackTrace &&
        Error.captureStackTrace(this, sn.prototype.create);
  }
}
class sn {
  constructor(t, n, r) {
    (this.service = t), (this.serviceName = n), (this.errors = r);
  }
  create(t, ...n) {
    const r = n[0] || {},
      o = `${this.service}/${t}`,
      i = this.errors[t],
      a = i ? dl(i, r) : "Error",
      s = `${this.serviceName}: ${a} (${o}).`;
    return new Re(o, s, r);
  }
}
function dl(e, t) {
  return e.replace(hl, (n, r) => {
    const o = t[r];
    return o != null ? String(o) : `<${r}?>`;
  });
}
const hl = /\{\$([^}]+)}/g;
function jn(e, t) {
  if (e === t) return !0;
  const n = Object.keys(e),
    r = Object.keys(t);
  for (const o of n) {
    if (!r.includes(o)) return !1;
    const i = e[o],
      a = t[o];
    if (Gr(i) && Gr(a)) {
      if (!jn(i, a)) return !1;
    } else if (i !== a) return !1;
  }
  for (const o of r) if (!n.includes(o)) return !1;
  return !0;
}
function Gr(e) {
  return e !== null && typeof e == "object";
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const gl = 1e3,
  pl = 2,
  ml = 4 * 60 * 60 * 1e3,
  bl = 0.5;
function yl(e, t = gl, n = pl) {
  const r = t * Math.pow(n, e),
    o = Math.round(bl * r * (Math.random() - 0.5) * 2);
  return Math.min(ml, r + o);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Le(e) {
  return e && e._delegate ? e._delegate : e;
}
class Je {
  constructor(t, n, r) {
    (this.name = t),
      (this.instanceFactory = n),
      (this.type = r),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = "LAZY"),
      (this.onInstanceCreated = null);
  }
  setInstantiationMode(t) {
    return (this.instantiationMode = t), this;
  }
  setMultipleInstances(t) {
    return (this.multipleInstances = t), this;
  }
  setServiceProps(t) {
    return (this.serviceProps = t), this;
  }
  setInstanceCreatedCallback(t) {
    return (this.onInstanceCreated = t), this;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const je = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class vl {
  constructor(t, n) {
    (this.name = t),
      (this.container = n),
      (this.component = null),
      (this.instances = new Map()),
      (this.instancesDeferred = new Map()),
      (this.instancesOptions = new Map()),
      (this.onInitCallbacks = new Map());
  }
  get(t) {
    const n = this.normalizeInstanceIdentifier(t);
    if (!this.instancesDeferred.has(n)) {
      const r = new ll();
      if (
        (this.instancesDeferred.set(n, r),
        this.isInitialized(n) || this.shouldAutoInitialize())
      )
        try {
          const o = this.getOrInitializeService({ instanceIdentifier: n });
          o && r.resolve(o);
        } catch {}
    }
    return this.instancesDeferred.get(n).promise;
  }
  getImmediate(t) {
    var n;
    const r = this.normalizeInstanceIdentifier(t?.identifier),
      o = (n = t?.optional) !== null && n !== void 0 ? n : !1;
    if (this.isInitialized(r) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({ instanceIdentifier: r });
      } catch (i) {
        if (o) return null;
        throw i;
      }
    else {
      if (o) return null;
      throw Error(`Service ${this.name} is not available`);
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(t) {
    if (t.name !== this.name)
      throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (((this.component = t), !!this.shouldAutoInitialize())) {
      if (Al(t))
        try {
          this.getOrInitializeService({ instanceIdentifier: je });
        } catch {}
      for (const [n, r] of this.instancesDeferred.entries()) {
        const o = this.normalizeInstanceIdentifier(n);
        try {
          const i = this.getOrInitializeService({ instanceIdentifier: o });
          r.resolve(i);
        } catch {}
      }
    }
  }
  clearInstance(t = je) {
    this.instancesDeferred.delete(t),
      this.instancesOptions.delete(t),
      this.instances.delete(t);
  }
  async delete() {
    const t = Array.from(this.instances.values());
    await Promise.all([
      ...t.filter((n) => "INTERNAL" in n).map((n) => n.INTERNAL.delete()),
      ...t.filter((n) => "_delete" in n).map((n) => n._delete()),
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(t = je) {
    return this.instances.has(t);
  }
  getOptions(t = je) {
    return this.instancesOptions.get(t) || {};
  }
  initialize(t = {}) {
    const { options: n = {} } = t,
      r = this.normalizeInstanceIdentifier(t.instanceIdentifier);
    if (this.isInitialized(r))
      throw Error(`${this.name}(${r}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const o = this.getOrInitializeService({
      instanceIdentifier: r,
      options: n,
    });
    for (const [i, a] of this.instancesDeferred.entries()) {
      const s = this.normalizeInstanceIdentifier(i);
      r === s && a.resolve(o);
    }
    return o;
  }
  onInit(t, n) {
    var r;
    const o = this.normalizeInstanceIdentifier(n),
      i =
        (r = this.onInitCallbacks.get(o)) !== null && r !== void 0
          ? r
          : new Set();
    i.add(t), this.onInitCallbacks.set(o, i);
    const a = this.instances.get(o);
    return (
      a && t(a, o),
      () => {
        i.delete(t);
      }
    );
  }
  invokeOnInitCallbacks(t, n) {
    const r = this.onInitCallbacks.get(n);
    if (r)
      for (const o of r)
        try {
          o(t, n);
        } catch {}
  }
  getOrInitializeService({ instanceIdentifier: t, options: n = {} }) {
    let r = this.instances.get(t);
    if (
      !r &&
      this.component &&
      ((r = this.component.instanceFactory(this.container, {
        instanceIdentifier: wl(t),
        options: n,
      })),
      this.instances.set(t, r),
      this.instancesOptions.set(t, n),
      this.invokeOnInitCallbacks(r, t),
      this.component.onInstanceCreated)
    )
      try {
        this.component.onInstanceCreated(this.container, t, r);
      } catch {}
    return r || null;
  }
  normalizeInstanceIdentifier(t = je) {
    return this.component ? (this.component.multipleInstances ? t : je) : t;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function wl(e) {
  return e === je ? void 0 : e;
}
function Al(e) {
  return e.instantiationMode === "EAGER";
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class _l {
  constructor(t) {
    (this.name = t), (this.providers = new Map());
  }
  addComponent(t) {
    const n = this.getProvider(t.name);
    if (n.isComponentSet())
      throw new Error(
        `Component ${t.name} has already been registered with ${this.name}`
      );
    n.setComponent(t);
  }
  addOrOverwriteComponent(t) {
    this.getProvider(t.name).isComponentSet() && this.providers.delete(t.name),
      this.addComponent(t);
  }
  getProvider(t) {
    if (this.providers.has(t)) return this.providers.get(t);
    const n = new vl(t, this);
    return this.providers.set(t, n), n;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var q;
(function (e) {
  (e[(e.DEBUG = 0)] = "DEBUG"),
    (e[(e.VERBOSE = 1)] = "VERBOSE"),
    (e[(e.INFO = 2)] = "INFO"),
    (e[(e.WARN = 3)] = "WARN"),
    (e[(e.ERROR = 4)] = "ERROR"),
    (e[(e.SILENT = 5)] = "SILENT");
})(q || (q = {}));
const Sl = {
    debug: q.DEBUG,
    verbose: q.VERBOSE,
    info: q.INFO,
    warn: q.WARN,
    error: q.ERROR,
    silent: q.SILENT,
  },
  El = q.INFO,
  Cl = {
    [q.DEBUG]: "log",
    [q.VERBOSE]: "log",
    [q.INFO]: "info",
    [q.WARN]: "warn",
    [q.ERROR]: "error",
  },
  Pl = (e, t, ...n) => {
    if (t < e.logLevel) return;
    const r = new Date().toISOString(),
      o = Cl[t];
    if (o) console[o](`[${r}]  ${e.name}:`, ...n);
    else
      throw new Error(
        `Attempted to log a message with an invalid logType (value: ${t})`
      );
  };
class li {
  constructor(t) {
    (this.name = t),
      (this._logLevel = El),
      (this._logHandler = Pl),
      (this._userLogHandler = null);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(t) {
    if (!(t in q))
      throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);
    this._logLevel = t;
  }
  setLogLevel(t) {
    this._logLevel = typeof t == "string" ? Sl[t] : t;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(t) {
    if (typeof t != "function")
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = t;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(t) {
    this._userLogHandler = t;
  }
  debug(...t) {
    this._userLogHandler && this._userLogHandler(this, q.DEBUG, ...t),
      this._logHandler(this, q.DEBUG, ...t);
  }
  log(...t) {
    this._userLogHandler && this._userLogHandler(this, q.VERBOSE, ...t),
      this._logHandler(this, q.VERBOSE, ...t);
  }
  info(...t) {
    this._userLogHandler && this._userLogHandler(this, q.INFO, ...t),
      this._logHandler(this, q.INFO, ...t);
  }
  warn(...t) {
    this._userLogHandler && this._userLogHandler(this, q.WARN, ...t),
      this._logHandler(this, q.WARN, ...t);
  }
  error(...t) {
    this._userLogHandler && this._userLogHandler(this, q.ERROR, ...t),
      this._logHandler(this, q.ERROR, ...t);
  }
}
const Tl = (e, t) => t.some((n) => e instanceof n);
let Jr, Zr;
function Il() {
  return (
    Jr ||
    (Jr = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function kl() {
  return (
    Zr ||
    (Zr = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const ui = new WeakMap(),
  Wn = new WeakMap(),
  fi = new WeakMap(),
  wn = new WeakMap(),
  ir = new WeakMap();
function xl(e) {
  const t = new Promise((n, r) => {
    const o = () => {
        e.removeEventListener("success", i), e.removeEventListener("error", a);
      },
      i = () => {
        n(Ie(e.result)), o();
      },
      a = () => {
        r(e.error), o();
      };
    e.addEventListener("success", i), e.addEventListener("error", a);
  });
  return (
    t
      .then((n) => {
        n instanceof IDBCursor && ui.set(n, e);
      })
      .catch(() => {}),
    ir.set(t, e),
    t
  );
}
function Ol(e) {
  if (Wn.has(e)) return;
  const t = new Promise((n, r) => {
    const o = () => {
        e.removeEventListener("complete", i),
          e.removeEventListener("error", a),
          e.removeEventListener("abort", a);
      },
      i = () => {
        n(), o();
      },
      a = () => {
        r(e.error || new DOMException("AbortError", "AbortError")), o();
      };
    e.addEventListener("complete", i),
      e.addEventListener("error", a),
      e.addEventListener("abort", a);
  });
  Wn.set(e, t);
}
let Hn = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === "done") return Wn.get(e);
      if (t === "objectStoreNames") return e.objectStoreNames || fi.get(e);
      if (t === "store")
        return n.objectStoreNames[1]
          ? void 0
          : n.objectStore(n.objectStoreNames[0]);
    }
    return Ie(e[t]);
  },
  set(e, t, n) {
    return (e[t] = n), !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === "done" || t === "store")
      ? !0
      : t in e;
  },
};
function Ml(e) {
  Hn = e(Hn);
}
function Dl(e) {
  return e === IDBDatabase.prototype.transaction &&
    !("objectStoreNames" in IDBTransaction.prototype)
    ? function (t, ...n) {
        const r = e.call(An(this), t, ...n);
        return fi.set(r, t.sort ? t.sort() : [t]), Ie(r);
      }
    : kl().includes(e)
    ? function (...t) {
        return e.apply(An(this), t), Ie(ui.get(this));
      }
    : function (...t) {
        return Ie(e.apply(An(this), t));
      };
}
function Rl(e) {
  return typeof e == "function"
    ? Dl(e)
    : (e instanceof IDBTransaction && Ol(e),
      Tl(e, Il()) ? new Proxy(e, Hn) : e);
}
function Ie(e) {
  if (e instanceof IDBRequest) return xl(e);
  if (wn.has(e)) return wn.get(e);
  const t = Rl(e);
  return t !== e && (wn.set(e, t), ir.set(t, e)), t;
}
const An = (e) => ir.get(e);
function Ll(e, t, { blocked: n, upgrade: r, blocking: o, terminated: i } = {}) {
  const a = indexedDB.open(e, t),
    s = Ie(a);
  return (
    r &&
      a.addEventListener("upgradeneeded", (c) => {
        r(Ie(a.result), c.oldVersion, c.newVersion, Ie(a.transaction), c);
      }),
    n && a.addEventListener("blocked", (c) => n(c.oldVersion, c.newVersion, c)),
    s
      .then((c) => {
        i && c.addEventListener("close", () => i()),
          o &&
            c.addEventListener("versionchange", (l) =>
              o(l.oldVersion, l.newVersion, l)
            );
      })
      .catch(() => {}),
    s
  );
}
const Nl = ["get", "getKey", "getAll", "getAllKeys", "count"],
  Bl = ["put", "add", "delete", "clear"],
  _n = new Map();
function Yr(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
  if (_n.get(t)) return _n.get(t);
  const n = t.replace(/FromIndex$/, ""),
    r = t !== n,
    o = Bl.includes(n);
  if (
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) ||
    !(o || Nl.includes(n))
  )
    return;
  const i = async function (a, ...s) {
    const c = this.transaction(a, o ? "readwrite" : "readonly");
    let l = c.store;
    return (
      r && (l = l.index(s.shift())),
      (await Promise.all([l[n](...s), o && c.done]))[0]
    );
  };
  return _n.set(t, i), i;
}
Ml((e) => ({
  ...e,
  get: (t, n, r) => Yr(t, n) || e.get(t, n, r),
  has: (t, n) => !!Yr(t, n) || e.has(t, n),
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class $l {
  constructor(t) {
    this.container = t;
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((n) => {
        if (Fl(n)) {
          const r = n.getImmediate();
          return `${r.library}/${r.version}`;
        } else return null;
      })
      .filter((n) => n)
      .join(" ");
  }
}
function Fl(e) {
  const t = e.getComponent();
  return t?.type === "VERSION";
}
const Vn = "@firebase/app",
  Qr = "0.9.22";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ze = new li("@firebase/app"),
  jl = "@firebase/app-compat",
  Wl = "@firebase/analytics-compat",
  Hl = "@firebase/analytics",
  Vl = "@firebase/app-check-compat",
  Ul = "@firebase/app-check",
  ql = "@firebase/auth",
  zl = "@firebase/auth-compat",
  Kl = "@firebase/database",
  Gl = "@firebase/database-compat",
  Jl = "@firebase/functions",
  Zl = "@firebase/functions-compat",
  Yl = "@firebase/installations",
  Ql = "@firebase/installations-compat",
  Xl = "@firebase/messaging",
  eu = "@firebase/messaging-compat",
  tu = "@firebase/performance",
  nu = "@firebase/performance-compat",
  ru = "@firebase/remote-config",
  ou = "@firebase/remote-config-compat",
  iu = "@firebase/storage",
  au = "@firebase/storage-compat",
  su = "@firebase/firestore",
  cu = "@firebase/firestore-compat",
  lu = "firebase",
  uu = "10.5.2";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Un = "[DEFAULT]",
  fu = {
    [Vn]: "fire-core",
    [jl]: "fire-core-compat",
    [Hl]: "fire-analytics",
    [Wl]: "fire-analytics-compat",
    [Ul]: "fire-app-check",
    [Vl]: "fire-app-check-compat",
    [ql]: "fire-auth",
    [zl]: "fire-auth-compat",
    [Kl]: "fire-rtdb",
    [Gl]: "fire-rtdb-compat",
    [Jl]: "fire-fn",
    [Zl]: "fire-fn-compat",
    [Yl]: "fire-iid",
    [Ql]: "fire-iid-compat",
    [Xl]: "fire-fcm",
    [eu]: "fire-fcm-compat",
    [tu]: "fire-perf",
    [nu]: "fire-perf-compat",
    [ru]: "fire-rc",
    [ou]: "fire-rc-compat",
    [iu]: "fire-gcs",
    [au]: "fire-gcs-compat",
    [su]: "fire-fst",
    [cu]: "fire-fst-compat",
    "fire-js": "fire-js",
    [lu]: "fire-js-all",
  };
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const zt = new Map(),
  qn = new Map();
function du(e, t) {
  try {
    e.container.addComponent(t);
  } catch (n) {
    Ze.debug(
      `Component ${t.name} failed to register with FirebaseApp ${e.name}`,
      n
    );
  }
}
function lt(e) {
  const t = e.name;
  if (qn.has(t))
    return (
      Ze.debug(`There were multiple attempts to register component ${t}.`), !1
    );
  qn.set(t, e);
  for (const n of zt.values()) du(n, e);
  return !0;
}
function ar(e, t) {
  const n = e.container.getProvider("heartbeat").getImmediate({ optional: !0 });
  return n && n.triggerHeartbeat(), e.container.getProvider(t);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const hu = {
    "no-app":
      "No Firebase App '{$appName}' has been created - call initializeApp() first",
    "bad-app-name": "Illegal App name: '{$appName}",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "no-options":
      "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument":
      "First argument to `onLog` must be null or a function.",
    "idb-open":
      "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get":
      "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set":
      "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete":
      "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
  },
  ke = new sn("app", "Firebase", hu);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class gu {
  constructor(t, n, r) {
    (this._isDeleted = !1),
      (this._options = Object.assign({}, t)),
      (this._config = Object.assign({}, n)),
      (this._name = n.name),
      (this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled),
      (this._container = r),
      this.container.addComponent(new Je("app", () => this, "PUBLIC"));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(t) {
    this.checkDestroyed(), (this._automaticDataCollectionEnabled = t);
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(t) {
    this._isDeleted = t;
  }
  checkDestroyed() {
    if (this.isDeleted) throw ke.create("app-deleted", { appName: this._name });
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const pu = uu;
function di(e, t = {}) {
  let n = e;
  typeof t != "object" && (t = { name: t });
  const r = Object.assign({ name: Un, automaticDataCollectionEnabled: !1 }, t),
    o = r.name;
  if (typeof o != "string" || !o)
    throw ke.create("bad-app-name", { appName: String(o) });
  if ((n || (n = si()), !n)) throw ke.create("no-options");
  const i = zt.get(o);
  if (i) {
    if (jn(n, i.options) && jn(r, i.config)) return i;
    throw ke.create("duplicate-app", { appName: o });
  }
  const a = new _l(o);
  for (const c of qn.values()) a.addComponent(c);
  const s = new gu(n, r, a);
  return zt.set(o, s), s;
}
function mu(e = Un) {
  const t = zt.get(e);
  if (!t && e === Un && si()) return di();
  if (!t) throw ke.create("no-app", { appName: e });
  return t;
}
function xe(e, t, n) {
  var r;
  let o = (r = fu[e]) !== null && r !== void 0 ? r : e;
  n && (o += `-${n}`);
  const i = o.match(/\s|\//),
    a = t.match(/\s|\//);
  if (i || a) {
    const s = [`Unable to register library "${o}" with version "${t}":`];
    i &&
      s.push(
        `library name "${o}" contains illegal characters (whitespace or "/")`
      ),
      i && a && s.push("and"),
      a &&
        s.push(
          `version name "${t}" contains illegal characters (whitespace or "/")`
        ),
      Ze.warn(s.join(" "));
    return;
  }
  lt(new Je(`${o}-version`, () => ({ library: o, version: t }), "VERSION"));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const bu = "firebase-heartbeat-database",
  yu = 1,
  Ct = "firebase-heartbeat-store";
let Sn = null;
function hi() {
  return (
    Sn ||
      (Sn = Ll(bu, yu, {
        upgrade: (e, t) => {
          switch (t) {
            case 0:
              e.createObjectStore(Ct);
          }
        },
      }).catch((e) => {
        throw ke.create("idb-open", { originalErrorMessage: e.message });
      })),
    Sn
  );
}
async function vu(e) {
  try {
    return await (await hi()).transaction(Ct).objectStore(Ct).get(gi(e));
  } catch (t) {
    if (t instanceof Re) Ze.warn(t.message);
    else {
      const n = ke.create("idb-get", { originalErrorMessage: t?.message });
      Ze.warn(n.message);
    }
  }
}
async function Xr(e, t) {
  try {
    const r = (await hi()).transaction(Ct, "readwrite");
    await r.objectStore(Ct).put(t, gi(e)), await r.done;
  } catch (n) {
    if (n instanceof Re) Ze.warn(n.message);
    else {
      const r = ke.create("idb-set", { originalErrorMessage: n?.message });
      Ze.warn(r.message);
    }
  }
}
function gi(e) {
  return `${e.name}!${e.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const wu = 1024,
  Au = 30 * 24 * 60 * 60 * 1e3;
class _u {
  constructor(t) {
    (this.container = t), (this._heartbeatsCache = null);
    const n = this.container.getProvider("app").getImmediate();
    (this._storage = new Eu(n)),
      (this._heartbeatsCachePromise = this._storage
        .read()
        .then((r) => ((this._heartbeatsCache = r), r)));
  }
  async triggerHeartbeat() {
    const n = this.container
        .getProvider("platform-logger")
        .getImmediate()
        .getPlatformInfoString(),
      r = eo();
    if (
      (this._heartbeatsCache === null &&
        (this._heartbeatsCache = await this._heartbeatsCachePromise),
      !(
        this._heartbeatsCache.lastSentHeartbeatDate === r ||
        this._heartbeatsCache.heartbeats.some((o) => o.date === r)
      ))
    )
      return (
        this._heartbeatsCache.heartbeats.push({ date: r, agent: n }),
        (this._heartbeatsCache.heartbeats =
          this._heartbeatsCache.heartbeats.filter((o) => {
            const i = new Date(o.date).valueOf();
            return Date.now() - i <= Au;
          })),
        this._storage.overwrite(this._heartbeatsCache)
      );
  }
  async getHeartbeatsHeader() {
    if (
      (this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
      this._heartbeatsCache === null ||
        this._heartbeatsCache.heartbeats.length === 0)
    )
      return "";
    const t = eo(),
      { heartbeatsToSend: n, unsentEntries: r } = Su(
        this._heartbeatsCache.heartbeats
      ),
      o = ai(JSON.stringify({ version: 2, heartbeats: n }));
    return (
      (this._heartbeatsCache.lastSentHeartbeatDate = t),
      r.length > 0
        ? ((this._heartbeatsCache.heartbeats = r),
          await this._storage.overwrite(this._heartbeatsCache))
        : ((this._heartbeatsCache.heartbeats = []),
          this._storage.overwrite(this._heartbeatsCache)),
      o
    );
  }
}
function eo() {
  return new Date().toISOString().substring(0, 10);
}
function Su(e, t = wu) {
  const n = [];
  let r = e.slice();
  for (const o of e) {
    const i = n.find((a) => a.agent === o.agent);
    if (i) {
      if ((i.dates.push(o.date), to(n) > t)) {
        i.dates.pop();
        break;
      }
    } else if ((n.push({ agent: o.agent, dates: [o.date] }), to(n) > t)) {
      n.pop();
      break;
    }
    r = r.slice(1);
  }
  return { heartbeatsToSend: n, unsentEntries: r };
}
class Eu {
  constructor(t) {
    (this.app = t),
      (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
  }
  async runIndexedDBEnvironmentCheck() {
    return ci()
      ? ul()
          .then(() => !0)
          .catch(() => !1)
      : !1;
  }
  async read() {
    return (await this._canUseIndexedDBPromise)
      ? (await vu(this.app)) || { heartbeats: [] }
      : { heartbeats: [] };
  }
  async overwrite(t) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const o = await this.read();
      return Xr(this.app, {
        lastSentHeartbeatDate:
          (n = t.lastSentHeartbeatDate) !== null && n !== void 0
            ? n
            : o.lastSentHeartbeatDate,
        heartbeats: t.heartbeats,
      });
    } else return;
  }
  async add(t) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const o = await this.read();
      return Xr(this.app, {
        lastSentHeartbeatDate:
          (n = t.lastSentHeartbeatDate) !== null && n !== void 0
            ? n
            : o.lastSentHeartbeatDate,
        heartbeats: [...o.heartbeats, ...t.heartbeats],
      });
    } else return;
  }
}
function to(e) {
  return ai(JSON.stringify({ version: 2, heartbeats: e })).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Cu(e) {
  lt(new Je("platform-logger", (t) => new $l(t), "PRIVATE")),
    lt(new Je("heartbeat", (t) => new _u(t), "PRIVATE")),
    xe(Vn, Qr, e),
    xe(Vn, Qr, "esm2017"),
    xe("fire-js", "");
}
Cu("");
const Pu = (e, t) => t.some((n) => e instanceof n);
let no, ro;
function Tu() {
  return (
    no ||
    (no = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function Iu() {
  return (
    ro ||
    (ro = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const pi = new WeakMap(),
  zn = new WeakMap(),
  mi = new WeakMap(),
  En = new WeakMap(),
  sr = new WeakMap();
function ku(e) {
  const t = new Promise((n, r) => {
    const o = () => {
        e.removeEventListener("success", i), e.removeEventListener("error", a);
      },
      i = () => {
        n(Oe(e.result)), o();
      },
      a = () => {
        r(e.error), o();
      };
    e.addEventListener("success", i), e.addEventListener("error", a);
  });
  return (
    t
      .then((n) => {
        n instanceof IDBCursor && pi.set(n, e);
      })
      .catch(() => {}),
    sr.set(t, e),
    t
  );
}
function xu(e) {
  if (zn.has(e)) return;
  const t = new Promise((n, r) => {
    const o = () => {
        e.removeEventListener("complete", i),
          e.removeEventListener("error", a),
          e.removeEventListener("abort", a);
      },
      i = () => {
        n(), o();
      },
      a = () => {
        r(e.error || new DOMException("AbortError", "AbortError")), o();
      };
    e.addEventListener("complete", i),
      e.addEventListener("error", a),
      e.addEventListener("abort", a);
  });
  zn.set(e, t);
}
let Kn = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === "done") return zn.get(e);
      if (t === "objectStoreNames") return e.objectStoreNames || mi.get(e);
      if (t === "store")
        return n.objectStoreNames[1]
          ? void 0
          : n.objectStore(n.objectStoreNames[0]);
    }
    return Oe(e[t]);
  },
  set(e, t, n) {
    return (e[t] = n), !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === "done" || t === "store")
      ? !0
      : t in e;
  },
};
function Ou(e) {
  Kn = e(Kn);
}
function Mu(e) {
  return e === IDBDatabase.prototype.transaction &&
    !("objectStoreNames" in IDBTransaction.prototype)
    ? function (t, ...n) {
        const r = e.call(Cn(this), t, ...n);
        return mi.set(r, t.sort ? t.sort() : [t]), Oe(r);
      }
    : Iu().includes(e)
    ? function (...t) {
        return e.apply(Cn(this), t), Oe(pi.get(this));
      }
    : function (...t) {
        return Oe(e.apply(Cn(this), t));
      };
}
function Du(e) {
  return typeof e == "function"
    ? Mu(e)
    : (e instanceof IDBTransaction && xu(e),
      Pu(e, Tu()) ? new Proxy(e, Kn) : e);
}
function Oe(e) {
  if (e instanceof IDBRequest) return ku(e);
  if (En.has(e)) return En.get(e);
  const t = Du(e);
  return t !== e && (En.set(e, t), sr.set(t, e)), t;
}
const Cn = (e) => sr.get(e);
function Ru(e, t, { blocked: n, upgrade: r, blocking: o, terminated: i } = {}) {
  const a = indexedDB.open(e, t),
    s = Oe(a);
  return (
    r &&
      a.addEventListener("upgradeneeded", (c) => {
        r(Oe(a.result), c.oldVersion, c.newVersion, Oe(a.transaction));
      }),
    n && a.addEventListener("blocked", () => n()),
    s
      .then((c) => {
        i && c.addEventListener("close", () => i()),
          o && c.addEventListener("versionchange", () => o());
      })
      .catch(() => {}),
    s
  );
}
const Lu = ["get", "getKey", "getAll", "getAllKeys", "count"],
  Nu = ["put", "add", "delete", "clear"],
  Pn = new Map();
function oo(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
  if (Pn.get(t)) return Pn.get(t);
  const n = t.replace(/FromIndex$/, ""),
    r = t !== n,
    o = Nu.includes(n);
  if (
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) ||
    !(o || Lu.includes(n))
  )
    return;
  const i = async function (a, ...s) {
    const c = this.transaction(a, o ? "readwrite" : "readonly");
    let l = c.store;
    return (
      r && (l = l.index(s.shift())),
      (await Promise.all([l[n](...s), o && c.done]))[0]
    );
  };
  return Pn.set(t, i), i;
}
Ou((e) => ({
  ...e,
  get: (t, n, r) => oo(t, n) || e.get(t, n, r),
  has: (t, n) => !!oo(t, n) || e.has(t, n),
}));
const bi = "@firebase/installations",
  cr = "0.6.4";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const yi = 1e4,
  vi = `w:${cr}`,
  wi = "FIS_v2",
  Bu = "https://firebaseinstallations.googleapis.com/v1",
  $u = 60 * 60 * 1e3,
  Fu = "installations",
  ju = "Installations";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Wu = {
    "missing-app-config-values":
      'Missing App configuration value: "{$valueName}"',
    "not-registered": "Firebase Installation is not registered.",
    "installation-not-found": "Firebase Installation not found.",
    "request-failed":
      '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
    "app-offline": "Could not process request. Application offline.",
    "delete-pending-registration":
      "Can't delete installation while there is a pending registration request.",
  },
  Ye = new sn(Fu, ju, Wu);
function Ai(e) {
  return e instanceof Re && e.code.includes("request-failed");
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function _i({ projectId: e }) {
  return `${Bu}/projects/${e}/installations`;
}
function Si(e) {
  return {
    token: e.token,
    requestStatus: 2,
    expiresIn: Vu(e.expiresIn),
    creationTime: Date.now(),
  };
}
async function Ei(e, t) {
  const r = (await t.json()).error;
  return Ye.create("request-failed", {
    requestName: e,
    serverCode: r.code,
    serverMessage: r.message,
    serverStatus: r.status,
  });
}
function Ci({ apiKey: e }) {
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": e,
  });
}
function Hu(e, { refreshToken: t }) {
  const n = Ci(e);
  return n.append("Authorization", Uu(t)), n;
}
async function Pi(e) {
  const t = await e();
  return t.status >= 500 && t.status < 600 ? e() : t;
}
function Vu(e) {
  return Number(e.replace("s", "000"));
}
function Uu(e) {
  return `${wi} ${e}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function qu(
  { appConfig: e, heartbeatServiceProvider: t },
  { fid: n }
) {
  const r = _i(e),
    o = Ci(e),
    i = t.getImmediate({ optional: !0 });
  if (i) {
    const l = await i.getHeartbeatsHeader();
    l && o.append("x-firebase-client", l);
  }
  const a = { fid: n, authVersion: wi, appId: e.appId, sdkVersion: vi },
    s = { method: "POST", headers: o, body: JSON.stringify(a) },
    c = await Pi(() => fetch(r, s));
  if (c.ok) {
    const l = await c.json();
    return {
      fid: l.fid || n,
      registrationStatus: 2,
      refreshToken: l.refreshToken,
      authToken: Si(l.authToken),
    };
  } else throw await Ei("Create Installation", c);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ti(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function zu(e) {
  return btoa(String.fromCharCode(...e))
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ku = /^[cdef][\w-]{21}$/,
  Gn = "";
function Gu() {
  try {
    const e = new Uint8Array(17);
    (self.crypto || self.msCrypto).getRandomValues(e),
      (e[0] = 112 + (e[0] % 16));
    const n = Ju(e);
    return Ku.test(n) ? n : Gn;
  } catch {
    return Gn;
  }
}
function Ju(e) {
  return zu(e).substr(0, 22);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function cn(e) {
  return `${e.appName}!${e.appId}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ii = new Map();
function ki(e, t) {
  const n = cn(e);
  xi(n, t), Zu(n, t);
}
function xi(e, t) {
  const n = Ii.get(e);
  if (n) for (const r of n) r(t);
}
function Zu(e, t) {
  const n = Yu();
  n && n.postMessage({ key: e, fid: t }), Qu();
}
let Ve = null;
function Yu() {
  return (
    !Ve &&
      "BroadcastChannel" in self &&
      ((Ve = new BroadcastChannel("[Firebase] FID Change")),
      (Ve.onmessage = (e) => {
        xi(e.data.key, e.data.fid);
      })),
    Ve
  );
}
function Qu() {
  Ii.size === 0 && Ve && (Ve.close(), (Ve = null));
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Xu = "firebase-installations-database",
  ef = 1,
  Qe = "firebase-installations-store";
let Tn = null;
function lr() {
  return (
    Tn ||
      (Tn = Ru(Xu, ef, {
        upgrade: (e, t) => {
          switch (t) {
            case 0:
              e.createObjectStore(Qe);
          }
        },
      })),
    Tn
  );
}
async function Kt(e, t) {
  const n = cn(e),
    o = (await lr()).transaction(Qe, "readwrite"),
    i = o.objectStore(Qe),
    a = await i.get(n);
  return (
    await i.put(t, n), await o.done, (!a || a.fid !== t.fid) && ki(e, t.fid), t
  );
}
async function Oi(e) {
  const t = cn(e),
    r = (await lr()).transaction(Qe, "readwrite");
  await r.objectStore(Qe).delete(t), await r.done;
}
async function ln(e, t) {
  const n = cn(e),
    o = (await lr()).transaction(Qe, "readwrite"),
    i = o.objectStore(Qe),
    a = await i.get(n),
    s = t(a);
  return (
    s === void 0 ? await i.delete(n) : await i.put(s, n),
    await o.done,
    s && (!a || a.fid !== s.fid) && ki(e, s.fid),
    s
  );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function ur(e) {
  let t;
  const n = await ln(e.appConfig, (r) => {
    const o = tf(r),
      i = nf(e, o);
    return (t = i.registrationPromise), i.installationEntry;
  });
  return n.fid === Gn
    ? { installationEntry: await t }
    : { installationEntry: n, registrationPromise: t };
}
function tf(e) {
  const t = e || { fid: Gu(), registrationStatus: 0 };
  return Mi(t);
}
function nf(e, t) {
  if (t.registrationStatus === 0) {
    if (!navigator.onLine) {
      const o = Promise.reject(Ye.create("app-offline"));
      return { installationEntry: t, registrationPromise: o };
    }
    const n = {
        fid: t.fid,
        registrationStatus: 1,
        registrationTime: Date.now(),
      },
      r = rf(e, n);
    return { installationEntry: n, registrationPromise: r };
  } else
    return t.registrationStatus === 1
      ? { installationEntry: t, registrationPromise: of(e) }
      : { installationEntry: t };
}
async function rf(e, t) {
  try {
    const n = await qu(e, t);
    return Kt(e.appConfig, n);
  } catch (n) {
    throw (
      (Ai(n) && n.customData.serverCode === 409
        ? await Oi(e.appConfig)
        : await Kt(e.appConfig, { fid: t.fid, registrationStatus: 0 }),
      n)
    );
  }
}
async function of(e) {
  let t = await io(e.appConfig);
  for (; t.registrationStatus === 1; )
    await Ti(100), (t = await io(e.appConfig));
  if (t.registrationStatus === 0) {
    const { installationEntry: n, registrationPromise: r } = await ur(e);
    return r || n;
  }
  return t;
}
function io(e) {
  return ln(e, (t) => {
    if (!t) throw Ye.create("installation-not-found");
    return Mi(t);
  });
}
function Mi(e) {
  return af(e) ? { fid: e.fid, registrationStatus: 0 } : e;
}
function af(e) {
  return e.registrationStatus === 1 && e.registrationTime + yi < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function sf({ appConfig: e, heartbeatServiceProvider: t }, n) {
  const r = cf(e, n),
    o = Hu(e, n),
    i = t.getImmediate({ optional: !0 });
  if (i) {
    const l = await i.getHeartbeatsHeader();
    l && o.append("x-firebase-client", l);
  }
  const a = { installation: { sdkVersion: vi, appId: e.appId } },
    s = { method: "POST", headers: o, body: JSON.stringify(a) },
    c = await Pi(() => fetch(r, s));
  if (c.ok) {
    const l = await c.json();
    return Si(l);
  } else throw await Ei("Generate Auth Token", c);
}
function cf(e, { fid: t }) {
  return `${_i(e)}/${t}/authTokens:generate`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function fr(e, t = !1) {
  let n;
  const r = await ln(e.appConfig, (i) => {
    if (!Di(i)) throw Ye.create("not-registered");
    const a = i.authToken;
    if (!t && ff(a)) return i;
    if (a.requestStatus === 1) return (n = lf(e, t)), i;
    {
      if (!navigator.onLine) throw Ye.create("app-offline");
      const s = hf(i);
      return (n = uf(e, s)), s;
    }
  });
  return n ? await n : r.authToken;
}
async function lf(e, t) {
  let n = await ao(e.appConfig);
  for (; n.authToken.requestStatus === 1; )
    await Ti(100), (n = await ao(e.appConfig));
  const r = n.authToken;
  return r.requestStatus === 0 ? fr(e, t) : r;
}
function ao(e) {
  return ln(e, (t) => {
    if (!Di(t)) throw Ye.create("not-registered");
    const n = t.authToken;
    return gf(n)
      ? Object.assign(Object.assign({}, t), { authToken: { requestStatus: 0 } })
      : t;
  });
}
async function uf(e, t) {
  try {
    const n = await sf(e, t),
      r = Object.assign(Object.assign({}, t), { authToken: n });
    return await Kt(e.appConfig, r), n;
  } catch (n) {
    if (
      Ai(n) &&
      (n.customData.serverCode === 401 || n.customData.serverCode === 404)
    )
      await Oi(e.appConfig);
    else {
      const r = Object.assign(Object.assign({}, t), {
        authToken: { requestStatus: 0 },
      });
      await Kt(e.appConfig, r);
    }
    throw n;
  }
}
function Di(e) {
  return e !== void 0 && e.registrationStatus === 2;
}
function ff(e) {
  return e.requestStatus === 2 && !df(e);
}
function df(e) {
  const t = Date.now();
  return t < e.creationTime || e.creationTime + e.expiresIn < t + $u;
}
function hf(e) {
  const t = { requestStatus: 1, requestTime: Date.now() };
  return Object.assign(Object.assign({}, e), { authToken: t });
}
function gf(e) {
  return e.requestStatus === 1 && e.requestTime + yi < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function pf(e) {
  const t = e,
    { installationEntry: n, registrationPromise: r } = await ur(t);
  return r ? r.catch(console.error) : fr(t).catch(console.error), n.fid;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function mf(e, t = !1) {
  const n = e;
  return await bf(n), (await fr(n, t)).token;
}
async function bf(e) {
  const { registrationPromise: t } = await ur(e);
  t && (await t);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function yf(e) {
  if (!e || !e.options) throw In("App Configuration");
  if (!e.name) throw In("App Name");
  const t = ["projectId", "apiKey", "appId"];
  for (const n of t) if (!e.options[n]) throw In(n);
  return {
    appName: e.name,
    projectId: e.options.projectId,
    apiKey: e.options.apiKey,
    appId: e.options.appId,
  };
}
function In(e) {
  return Ye.create("missing-app-config-values", { valueName: e });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ri = "installations",
  vf = "installations-internal",
  wf = (e) => {
    const t = e.getProvider("app").getImmediate(),
      n = yf(t),
      r = ar(t, "heartbeat");
    return {
      app: t,
      appConfig: n,
      heartbeatServiceProvider: r,
      _delete: () => Promise.resolve(),
    };
  },
  Af = (e) => {
    const t = e.getProvider("app").getImmediate(),
      n = ar(t, Ri).getImmediate();
    return { getId: () => pf(n), getToken: (o) => mf(n, o) };
  };
function _f() {
  lt(new Je(Ri, wf, "PUBLIC")), lt(new Je(vf, Af, "PRIVATE"));
}
_f();
xe(bi, cr);
xe(bi, cr, "esm2017");
const kn = "@firebase/remote-config",
  so = "0.4.4";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Sf {
  constructor() {
    this.listeners = [];
  }
  addEventListener(t) {
    this.listeners.push(t);
  }
  abort() {
    this.listeners.forEach((t) => t());
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Li = "remote-config";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ef = {
    "registration-window":
      "Undefined window object. This SDK only supports usage in a browser environment.",
    "registration-project-id":
      "Undefined project identifier. Check Firebase app initialization.",
    "registration-api-key":
      "Undefined API key. Check Firebase app initialization.",
    "registration-app-id":
      "Undefined app identifier. Check Firebase app initialization.",
    "storage-open":
      "Error thrown when opening storage. Original error: {$originalErrorMessage}.",
    "storage-get":
      "Error thrown when reading from storage. Original error: {$originalErrorMessage}.",
    "storage-set":
      "Error thrown when writing to storage. Original error: {$originalErrorMessage}.",
    "storage-delete":
      "Error thrown when deleting from storage. Original error: {$originalErrorMessage}.",
    "fetch-client-network":
      "Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.",
    "fetch-timeout":
      'The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',
    "fetch-throttle":
      'The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',
    "fetch-client-parse":
      "Fetch client could not parse response. Original error: {$originalErrorMessage}.",
    "fetch-status":
      "Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.",
    "indexed-db-unavailable": "Indexed DB is not supported by current browser",
  },
  oe = new sn("remoteconfig", "Remote Config", Ef);
function Cf(e, t) {
  return e instanceof Re && e.code.indexOf(t) !== -1;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Pf = !1,
  Tf = "",
  co = 0,
  If = ["1", "true", "t", "yes", "y", "on"];
class xn {
  constructor(t, n = Tf) {
    (this._source = t), (this._value = n);
  }
  asString() {
    return this._value;
  }
  asBoolean() {
    return this._source === "static"
      ? Pf
      : If.indexOf(this._value.toLowerCase()) >= 0;
  }
  asNumber() {
    if (this._source === "static") return co;
    let t = Number(this._value);
    return isNaN(t) && (t = co), t;
  }
  getSource() {
    return this._source;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function kf(e = mu()) {
  return (e = Le(e)), ar(e, Li).getImmediate();
}
async function xf(e) {
  const t = Le(e),
    [n, r] = await Promise.all([
      t._storage.getLastSuccessfulFetchResponse(),
      t._storage.getActiveConfigEtag(),
    ]);
  return !n || !n.config || !n.eTag || n.eTag === r
    ? !1
    : (await Promise.all([
        t._storageCache.setActiveConfig(n.config),
        t._storage.setActiveConfigEtag(n.eTag),
      ]),
      !0);
}
function Of(e) {
  const t = Le(e);
  return (
    t._initializePromise ||
      (t._initializePromise = t._storageCache.loadFromStorage().then(() => {
        t._isInitializationComplete = !0;
      })),
    t._initializePromise
  );
}
async function Mf(e) {
  const t = Le(e),
    n = new Sf();
  setTimeout(async () => {
    n.abort();
  }, t.settings.fetchTimeoutMillis);
  try {
    await t._client.fetch({
      cacheMaxAgeMillis: t.settings.minimumFetchIntervalMillis,
      signal: n,
    }),
      await t._storageCache.setLastFetchStatus("success");
  } catch (r) {
    const o = Cf(r, "fetch-throttle") ? "throttle" : "failure";
    throw (await t._storageCache.setLastFetchStatus(o), r);
  }
}
function Df(e, t) {
  return Ot(Le(e), t).asNumber();
}
function Rf(e, t) {
  return Ot(Le(e), t).asString();
}
function Ot(e, t) {
  const n = Le(e);
  n._isInitializationComplete ||
    n._logger.debug(
      `A value was requested for key "${t}" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.`
    );
  const r = n._storageCache.getActiveConfig();
  return r && r[t] !== void 0
    ? new xn("remote", r[t])
    : n.defaultConfig && n.defaultConfig[t] !== void 0
    ? new xn("default", String(n.defaultConfig[t]))
    : (n._logger.debug(
        `Returning static value for key "${t}". Define a default or remote value if this is unintentional.`
      ),
      new xn("static"));
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Lf {
  constructor(t, n, r, o) {
    (this.client = t),
      (this.storage = n),
      (this.storageCache = r),
      (this.logger = o);
  }
  isCachedDataFresh(t, n) {
    if (!n)
      return (
        this.logger.debug("Config fetch cache check. Cache unpopulated."), !1
      );
    const r = Date.now() - n,
      o = r <= t;
    return (
      this.logger.debug(
        `Config fetch cache check. Cache age millis: ${r}. Cache max age millis (minimumFetchIntervalMillis setting): ${t}. Is cache hit: ${o}.`
      ),
      o
    );
  }
  async fetch(t) {
    const [n, r] = await Promise.all([
      this.storage.getLastSuccessfulFetchTimestampMillis(),
      this.storage.getLastSuccessfulFetchResponse(),
    ]);
    if (r && this.isCachedDataFresh(t.cacheMaxAgeMillis, n)) return r;
    t.eTag = r && r.eTag;
    const o = await this.client.fetch(t),
      i = [this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())];
    return (
      o.status === 200 &&
        i.push(this.storage.setLastSuccessfulFetchResponse(o)),
      await Promise.all(i),
      o
    );
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Nf(e = navigator) {
  return (e.languages && e.languages[0]) || e.language;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Bf {
  constructor(t, n, r, o, i, a) {
    (this.firebaseInstallations = t),
      (this.sdkVersion = n),
      (this.namespace = r),
      (this.projectId = o),
      (this.apiKey = i),
      (this.appId = a);
  }
  async fetch(t) {
    const [n, r] = await Promise.all([
        this.firebaseInstallations.getId(),
        this.firebaseInstallations.getToken(),
      ]),
      i = `${
        window.FIREBASE_REMOTE_CONFIG_URL_BASE ||
        "https://firebaseremoteconfig.googleapis.com"
      }/v1/projects/${this.projectId}/namespaces/${this.namespace}:fetch?key=${
        this.apiKey
      }`,
      a = {
        "Content-Type": "application/json",
        "Content-Encoding": "gzip",
        "If-None-Match": t.eTag || "*",
      },
      s = {
        sdk_version: this.sdkVersion,
        app_instance_id: n,
        app_instance_id_token: r,
        app_id: this.appId,
        language_code: Nf(),
      },
      c = { method: "POST", headers: a, body: JSON.stringify(s) },
      l = fetch(i, c),
      u = new Promise((P, O) => {
        t.signal.addEventListener(() => {
          const b = new Error("The operation was aborted.");
          (b.name = "AbortError"), O(b);
        });
      });
    let g;
    try {
      await Promise.race([l, u]), (g = await l);
    } catch (P) {
      let O = "fetch-client-network";
      throw (
        (P?.name === "AbortError" && (O = "fetch-timeout"),
        oe.create(O, { originalErrorMessage: P?.message }))
      );
    }
    let p = g.status;
    const m = g.headers.get("ETag") || void 0;
    let v, A;
    if (g.status === 200) {
      let P;
      try {
        P = await g.json();
      } catch (O) {
        throw oe.create("fetch-client-parse", {
          originalErrorMessage: O?.message,
        });
      }
      (v = P.entries), (A = P.state);
    }
    if (
      (A === "INSTANCE_STATE_UNSPECIFIED"
        ? (p = 500)
        : A === "NO_CHANGE"
        ? (p = 304)
        : (A === "NO_TEMPLATE" || A === "EMPTY_CONFIG") && (v = {}),
      p !== 304 && p !== 200)
    )
      throw oe.create("fetch-status", { httpStatus: p });
    return { status: p, eTag: m, config: v };
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function $f(e, t) {
  return new Promise((n, r) => {
    const o = Math.max(t - Date.now(), 0),
      i = setTimeout(n, o);
    e.addEventListener(() => {
      clearTimeout(i),
        r(oe.create("fetch-throttle", { throttleEndTimeMillis: t }));
    });
  });
}
function Ff(e) {
  if (!(e instanceof Re) || !e.customData) return !1;
  const t = Number(e.customData.httpStatus);
  return t === 429 || t === 500 || t === 503 || t === 504;
}
class jf {
  constructor(t, n) {
    (this.client = t), (this.storage = n);
  }
  async fetch(t) {
    const n = (await this.storage.getThrottleMetadata()) || {
      backoffCount: 0,
      throttleEndTimeMillis: Date.now(),
    };
    return this.attemptFetch(t, n);
  }
  async attemptFetch(t, { throttleEndTimeMillis: n, backoffCount: r }) {
    await $f(t.signal, n);
    try {
      const o = await this.client.fetch(t);
      return await this.storage.deleteThrottleMetadata(), o;
    } catch (o) {
      if (!Ff(o)) throw o;
      const i = {
        throttleEndTimeMillis: Date.now() + yl(r),
        backoffCount: r + 1,
      };
      return await this.storage.setThrottleMetadata(i), this.attemptFetch(t, i);
    }
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Wf = 60 * 1e3,
  Hf = 12 * 60 * 60 * 1e3;
class Vf {
  constructor(t, n, r, o, i) {
    (this.app = t),
      (this._client = n),
      (this._storageCache = r),
      (this._storage = o),
      (this._logger = i),
      (this._isInitializationComplete = !1),
      (this.settings = {
        fetchTimeoutMillis: Wf,
        minimumFetchIntervalMillis: Hf,
      }),
      (this.defaultConfig = {});
  }
  get fetchTimeMillis() {
    return this._storageCache.getLastSuccessfulFetchTimestampMillis() || -1;
  }
  get lastFetchStatus() {
    return this._storageCache.getLastFetchStatus() || "no-fetch-yet";
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ft(e, t) {
  const n = e.target.error || void 0;
  return oe.create(t, { originalErrorMessage: n && n?.message });
}
const We = "app_namespace_store",
  Uf = "firebase_remote_config",
  qf = 1;
function zf() {
  return new Promise((e, t) => {
    try {
      const n = indexedDB.open(Uf, qf);
      (n.onerror = (r) => {
        t(Ft(r, "storage-open"));
      }),
        (n.onsuccess = (r) => {
          e(r.target.result);
        }),
        (n.onupgradeneeded = (r) => {
          const o = r.target.result;
          switch (r.oldVersion) {
            case 0:
              o.createObjectStore(We, { keyPath: "compositeKey" });
          }
        });
    } catch (n) {
      t(oe.create("storage-open", { originalErrorMessage: n?.message }));
    }
  });
}
class Kf {
  constructor(t, n, r, o = zf()) {
    (this.appId = t),
      (this.appName = n),
      (this.namespace = r),
      (this.openDbPromise = o);
  }
  getLastFetchStatus() {
    return this.get("last_fetch_status");
  }
  setLastFetchStatus(t) {
    return this.set("last_fetch_status", t);
  }
  getLastSuccessfulFetchTimestampMillis() {
    return this.get("last_successful_fetch_timestamp_millis");
  }
  setLastSuccessfulFetchTimestampMillis(t) {
    return this.set("last_successful_fetch_timestamp_millis", t);
  }
  getLastSuccessfulFetchResponse() {
    return this.get("last_successful_fetch_response");
  }
  setLastSuccessfulFetchResponse(t) {
    return this.set("last_successful_fetch_response", t);
  }
  getActiveConfig() {
    return this.get("active_config");
  }
  setActiveConfig(t) {
    return this.set("active_config", t);
  }
  getActiveConfigEtag() {
    return this.get("active_config_etag");
  }
  setActiveConfigEtag(t) {
    return this.set("active_config_etag", t);
  }
  getThrottleMetadata() {
    return this.get("throttle_metadata");
  }
  setThrottleMetadata(t) {
    return this.set("throttle_metadata", t);
  }
  deleteThrottleMetadata() {
    return this.delete("throttle_metadata");
  }
  async get(t) {
    const n = await this.openDbPromise;
    return new Promise((r, o) => {
      const a = n.transaction([We], "readonly").objectStore(We),
        s = this.createCompositeKey(t);
      try {
        const c = a.get(s);
        (c.onerror = (l) => {
          o(Ft(l, "storage-get"));
        }),
          (c.onsuccess = (l) => {
            const u = l.target.result;
            r(u ? u.value : void 0);
          });
      } catch (c) {
        o(oe.create("storage-get", { originalErrorMessage: c?.message }));
      }
    });
  }
  async set(t, n) {
    const r = await this.openDbPromise;
    return new Promise((o, i) => {
      const s = r.transaction([We], "readwrite").objectStore(We),
        c = this.createCompositeKey(t);
      try {
        const l = s.put({ compositeKey: c, value: n });
        (l.onerror = (u) => {
          i(Ft(u, "storage-set"));
        }),
          (l.onsuccess = () => {
            o();
          });
      } catch (l) {
        i(oe.create("storage-set", { originalErrorMessage: l?.message }));
      }
    });
  }
  async delete(t) {
    const n = await this.openDbPromise;
    return new Promise((r, o) => {
      const a = n.transaction([We], "readwrite").objectStore(We),
        s = this.createCompositeKey(t);
      try {
        const c = a.delete(s);
        (c.onerror = (l) => {
          o(Ft(l, "storage-delete"));
        }),
          (c.onsuccess = () => {
            r();
          });
      } catch (c) {
        o(oe.create("storage-delete", { originalErrorMessage: c?.message }));
      }
    });
  }
  createCompositeKey(t) {
    return [this.appId, this.appName, this.namespace, t].join();
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Gf {
  constructor(t) {
    this.storage = t;
  }
  getLastFetchStatus() {
    return this.lastFetchStatus;
  }
  getLastSuccessfulFetchTimestampMillis() {
    return this.lastSuccessfulFetchTimestampMillis;
  }
  getActiveConfig() {
    return this.activeConfig;
  }
  async loadFromStorage() {
    const t = this.storage.getLastFetchStatus(),
      n = this.storage.getLastSuccessfulFetchTimestampMillis(),
      r = this.storage.getActiveConfig(),
      o = await t;
    o && (this.lastFetchStatus = o);
    const i = await n;
    i && (this.lastSuccessfulFetchTimestampMillis = i);
    const a = await r;
    a && (this.activeConfig = a);
  }
  setLastFetchStatus(t) {
    return (this.lastFetchStatus = t), this.storage.setLastFetchStatus(t);
  }
  setLastSuccessfulFetchTimestampMillis(t) {
    return (
      (this.lastSuccessfulFetchTimestampMillis = t),
      this.storage.setLastSuccessfulFetchTimestampMillis(t)
    );
  }
  setActiveConfig(t) {
    return (this.activeConfig = t), this.storage.setActiveConfig(t);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Jf() {
  lt(new Je(Li, e, "PUBLIC").setMultipleInstances(!0)),
    xe(kn, so),
    xe(kn, so, "esm2017");
  function e(t, { instanceIdentifier: n }) {
    const r = t.getProvider("app").getImmediate(),
      o = t.getProvider("installations-internal").getImmediate();
    if (typeof window > "u") throw oe.create("registration-window");
    if (!ci()) throw oe.create("indexed-db-unavailable");
    const { projectId: i, apiKey: a, appId: s } = r.options;
    if (!i) throw oe.create("registration-project-id");
    if (!a) throw oe.create("registration-api-key");
    if (!s) throw oe.create("registration-app-id");
    n = n || "firebase";
    const c = new Kf(s, r.name, n),
      l = new Gf(c),
      u = new li(kn);
    u.logLevel = q.ERROR;
    const g = new Bf(o, pu, n, i, a, s),
      p = new jf(g, c),
      m = new Lf(p, c, l, u),
      v = new Vf(r, m, l, c, u);
    return Of(v), v;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Zf(e) {
  return (e = Le(e)), await Mf(e), xf(e);
}
Jf();
var Yf = "firebase",
  Qf = "10.5.2";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ xe(Yf, Qf, "app");
const Ni = Promise.resolve(
    JSON.parse(
      '{"apiKey":"AIzaSyAzXfMjJ8FvhZp3FQATMICH-ndLjXNVUeg","authDomain":"utasks-prod.firebaseapp.com","databaseURL":"https://utasks-prod-default-rtdb.europe-west1.firebasedatabase.app","projectId":"utasks-prod","storageBucket":"utasks-prod.appspot.com","messagingSenderId":"5984125385","appId":"1:5984125385:web:a25ad2d9018c01ec712818"}'
    )
  ),
  Bi = Ni.then(di),
  On = Bi.then(kf),
  nt = On.then(Zf)
    .then(() => On)
    .catch(() => On),
  lh = (e) => nt.then((t) => Df(t, e)),
  $i = (e) => nt.then((t) => Rf(t, e)),
  uh = (e) => nt.then((t) => JSON.parse(Ot(t, e).asString())),
  fh = (e) => nt.then((t) => JSON.parse(Ot(t, e).asString())),
  dh = (e) => nt.then((t) => Ot(t, e).asString()),
  Xf = "backurl",
  ed = () => $i(Xf);
let Nt = "https://utasks.io/utb";
const Fi = nt.then(() =>
    ed().then(
      (e) => (
        (Nt = e || Nt),
        Bi.then((t) => {
          console.info("Version: v1.2.4:production"),
            console.info(
              `Environment: ${t.options.projectId}:${new URL(Nt).hostname}`
            );
        }),
        { baseUrl: Nt }
      )
    )
  ),
  td = Fi.then((e) => ri(e));
function Gt(e, t) {
  return arguments.length === 1
    ? (n) => Gt(e, n)
    : Object.assign({}, e || {}, t || {});
}
function ji(e, t) {
  return arguments.length === 1 ? (n) => ji(e, n) : (e(t), t);
}
function nd() {
  return U(() => import("./ym.module-cc840977.js"), [])
    .then(({ defineYmCounters: e }) => {
      const t = e({
        global: {
          id: 94518118,
          enabled: !0,
          ymOptions: {
            clickmap: !0,
            trackLinks: !0,
            accurateTrackBounce: !0,
            webvisor: !0,
            trackHash: !0,
            childIframe: !0,
            userParams: { UserID: V.initDataUnsafe.user?.id ?? -1 },
          },
        },
      });
      return console.log("enable yandex metrics"), t.global.enable(), t.global;
    })
    .catch(() => {});
}
const Jt = "token",
  Zt = "token-expires-at",
  rd = "dev-mode",
  od = "start-key",
  id = () => {
    const e = Number(sessionStorage.getItem(Zt) ?? void 0);
    if (!isNaN(e) && e <= new Date().getTime()) {
      sessionStorage.removeItem(Jt), sessionStorage.removeItem(Zt);
      return;
    }
    return sessionStorage.getItem(Jt) ?? void 0;
  },
  ad = (e, t) => {
    sessionStorage.setItem(Jt, e), sessionStorage.setItem(Zt, String(t * 1e3));
  };
let lo = null;
const sd = (e) => (
    nd(),
    e.POST("/api/auth", {
      params: {
        query: {
          initData: V.initData,
          timeZone: tn(),
          timeZoneId: xt,
          projectId: sessionStorage.getItem(od) || void 0,
          locale: Ge().language,
        },
      },
    })
  ),
  cd = async () =>
    id() ??
    lo ??
    (lo = td
      .then(sd)
      .then((e) => e.data)
      .then(
        ji((e) => {
          if (!e) return;
          const { exp: t } = JSON.parse(window.atob(e.split(".")[1]));
          ad(e, t);
        })
      )
      .catch(() => {})),
  ld = (e) => (e ? { Authorization: `Bearer ${e}` } : {}),
  ud = (e, t = () => cd().then(ld)) => t().then((n) => Gt(n, e)),
  hh = (e = NaN) => {
    console.log("SPY DEV MODE ENABLED"),
      sessionStorage.removeItem(Jt),
      sessionStorage.removeItem(Zt),
      sessionStorage.setItem(rd, "true"),
      t(isNaN(e) ? -1 : e);
    function t(n) {
      const r = "__telegram__initParams",
        o = (a) => (a == null ? null : JSON.parse(a)),
        i = o(sessionStorage.getItem(r));
      try {
        if (i) {
          const a = new URLSearchParams(i.tgWebAppData),
            s = o(a.get("user"));
          a.set("user", JSON.stringify(Object.assign({}, s, { id: n }))),
            sessionStorage.setItem(
              r,
              JSON.stringify({ ...i, tgWebAppData: a.toString() })
            );
        } else throw null;
      } catch {
        console.error(
          "Failed to enable dev mode: no init data provided! Set __telegram__initParams in session storage!"
        );
      }
    }
  };
let Bt;
const Wi = new Proxy(
    {},
    {
      get(e, t) {
        const n = t.toUpperCase();
        return Bt
          ? Bt[n]
          : async (...r) => {
              const o = await Fi;
              Bt = ri({ ...o, headers: await ud() });
              const i = Bt[n];
              return i(...r);
            };
      },
    }
  ),
  gh = (e) => (t) => ({ ...t, data: t.data && e(t.data) }),
  fd = (e) => typeof e == "function",
  dd = (e) => typeof e == "string";
function dr(e) {
  return e
    ? function (t) {
        const n = {};
        for (const r in e) {
          const o = e[r],
            i = t[r];
          if (o === !0) n[r] = i;
          else if (dd(o)) n[r] = t[o];
          else if (fd(o)) n[r] = o(t, n);
          else if (typeof o == "object")
            for (const a in o) {
              const s = t[a];
              n[r] = o[a](s ?? i);
              break;
            }
        }
        return n;
      }
    : dr;
}
const hd = dr({
    locale: [(e) => new Intl.Locale(e)],
    timeZone: (e) =>
      !e.timeZoneId || e.timeZoneId === xt
        ? ct()
        : ct(e.timeZone, e.timeZoneId),
  }),
  gd = dr({
    locale: [(e) => e?.baseName],
    timeZone: [(e) => e?.offset ?? qt().offset],
    timeZoneId: { timeZone: (e) => e?.id ?? qt().id },
  }),
  pd = () =>
    Wi.get("/api/profile/settings")
      .then(
        (e) =>
          e.data ?? { locale: Ge().baseName, timeZone: nn(), timeZoneId: Ko() }
      )
      .then((e) => {
        const t = hd(e);
        return (
          e.timeZone !== t.timeZone.offset && md({ timeZone: t.timeZone }), t
        );
      })
      .catch(() => ({ locale: Ge(), timeZone: qt() })),
  md = (e) =>
    Wi.put("/api/profile/settings", { body: gd(e) })
      .then((t) => t.data)
      .catch(() => {}),
  bd = (e) =>
    JSON.stringify({ locale: e.locale.baseName, timeZone: e.timeZone }),
  yd = (e) => {
    const t = JSON.parse(e);
    return !t || typeof t.locale != "string" || typeof t.timeZone != "object"
      ? { locale: Ge(), timeZone: qt() }
      : { locale: new Intl.Locale(t.locale), timeZone: t.timeZone };
  },
  vd = (e) => (
    localStorage.setItem("settings", bd(e)),
    e?.locale && zc(e.locale),
    e?.timeZone && wc(e.timeZone),
    e
  ),
  wd = Xe(
    Jn(() => pd().then(vd), {
      initialValue: yd(localStorage.getItem("settings") || "null"),
    })
  ),
  Ad = "First telegram-native task manager",
  uo = "UTasks";
function _d(e = {}) {
  const {
    immediate: t = !1,
    onNeedRefresh: n,
    onOfflineReady: r,
    onRegistered: o,
    onRegisteredSW: i,
    onRegisterError: a,
  } = e;
  let s, c, l;
  const u = async (p = !0) => {
    await c, await l?.();
  };
  async function g() {
    if ("serviceWorker" in navigator) {
      const { Workbox: p } = await U(
        () => import("./workbox-window.prod.es5-a7b12eab.js"),
        []
      );
      (s = new p("/utf/sw.js", { scope: "/utf/", type: "classic" })),
        (l = async () => {
          await s?.messageSkipWaiting();
        });
      {
        let m = !1;
        const v = () => {
          (m = !0),
            s?.addEventListener("controlling", (A) => {
              A.isUpdate && window.location.reload();
            }),
            n?.();
        };
        s.addEventListener("installed", (A) => {
          typeof A.isUpdate > "u"
            ? typeof A.isExternal < "u"
              ? A.isExternal
                ? v()
                : !m && r?.()
              : A.isExternal
              ? window.location.reload()
              : !m && r?.()
            : A.isUpdate || r?.();
        }),
          s.addEventListener("waiting", v),
          s.addEventListener("externalwaiting", v);
      }
      s.register({ immediate: t })
        .then((m) => {
          i ? i("/utf/sw.js", m) : o?.(m);
        })
        .catch((m) => {
          a?.(m);
        });
    }
  }
  return (c = g()), u;
}
function Sd(e = {}) {
  const {
      immediate: t = !0,
      onNeedRefresh: n,
      onOfflineReady: r,
      onRegistered: o,
      onRegisteredSW: i,
      onRegisterError: a,
    } = e,
    [s, c] = z(!1),
    [l, u] = z(!1),
    g = _d({
      immediate: t,
      onOfflineReady() {
        u(!0), r?.();
      },
      onNeedRefresh() {
        c(!0), n?.();
      },
      onRegistered: o,
      onRegisteredSW: i,
      onRegisterError: a,
    });
  return { needRefresh: [s, c], offlineReady: [l, u], updateServiceWorker: g };
}
const Hi = (e, t) => {
    const n = e[t];
    return n
      ? typeof n == "function"
        ? n()
        : Promise.resolve(n)
      : new Promise((r, o) => {
          (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(
            o.bind(null, new Error("Unknown variable dynamic import: " + t))
          );
        });
  },
  Ed = (e, t) => () =>
    Ni.then((n) => [n.databaseURL, "utf/locales", e, t + ".json"].join("/"));
function Cd(e, t, n, r) {
  return $i("defaultlocale")
    .then(o)
    .catch(() => o(Ge()))
    .then(([i, a]) => ({
      default: Gt(a, i),
      remote: nt
        .then(Ed(n.language, r))
        .then(fetch)
        .then((s) => s.json())
        .then(Gt(i))
        .catch(() => i),
    }));
  function o(i) {
    const a = i instanceof Intl.Locale ? i : new Intl.Locale(i);
    return Promise.all([
      e(new Intl.Locale(a)).then((s) => s.default),
      t(new Intl.Locale(a)).then((s) => s.default),
    ]);
  }
}
const fo = (e) =>
    Hi(
      Object.assign({
        "./en.json": () =>
          U(
            () =>
              fetch("/utf/assets/locales/home/en-5f4ef0fe.json")
                .then((t) => t.json())
                .then((t) => ({ default: t })),
            void 0
          ),
        "./es.json": () =>
          U(
            () =>
              fetch("/utf/assets/locales/home/es-7a187d5e.json")
                .then((t) => t.json())
                .then((t) => ({ default: t })),
            void 0
          ),
        "./ru.json": () =>
          U(
            () =>
              fetch("/utf/assets/locales/home/ru-62329116.json")
                .then((t) => t.json())
                .then((t) => ({ default: t })),
            void 0
          ),
      }),
      `./${e.language}.json`
    ),
  Mn = Te(() =>
    Gc((e) =>
      Cd(
        (t) =>
          Hi(
            Object.assign({
              "./en.json": () =>
                U(
                  () =>
                    fetch("/utf/assets/locales/home/en-5f4ef0fe.json")
                      .then((n) => n.json())
                      .then((n) => ({ default: n })),
                  void 0
                ),
              "./es.json": () =>
                U(
                  () =>
                    fetch("/utf/assets/locales/home/es-7a187d5e.json")
                      .then((n) => n.json())
                      .then((n) => ({ default: n })),
                  void 0
                ),
              "./ru.json": () =>
                U(
                  () =>
                    fetch("/utf/assets/locales/home/ru-62329116.json")
                      .then((n) => n.json())
                      .then((n) => ({ default: n })),
                  void 0
                ),
            }),
            `./${e.language}.json`
          ).catch(() => fo(t)),
        fo,
        e,
        "home"
      )
    )
  ),
  Pd = tt(
    '<svg viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path clip-rule=evenodd d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11Zm-9.778-5c0-.614-.547-1.111-1.222-1.111-.675 0-1.222.497-1.222 1.111v3.778H7c-.613 0-1.11.547-1.11 1.222 0 .675.497 1.222 1.11 1.222h3.778V17c0 .614.547 1.111 1.222 1.111.675 0 1.222-.497 1.222-1.111v-3.778H17c.614 0 1.111-.547 1.111-1.222 0-.675-.497-1.222-1.11-1.222h-3.779V7Z">'
  ),
  Td = (e = {}) =>
    (() => {
      const t = Pd();
      return De(t, e, !0, !0), t;
    })(),
  Id = tt('<button class="bg-transparent! c-tg_button">'),
  kd = tt(
    '<div class="fixed flex justify-between items-center bottom--20 left-4 right-4 bg-tg_bg rounded-3 py-2 p-3 z-110 app-transition-bottom shadow-xl shadow-black"><div class="flex items-center gap-2"><span>'
  );
function xd() {
  const { updateServiceWorker: t, needRefresh: n } = Sd({
      onRegistered(u) {
        u &&
          setInterval(() => {
            u.update();
          }, 36e5);
      },
    }),
    [r, o] = z(!1);
  At(() => o(Ke(n)));
  const i = 1e3,
    [a, s] = z(!0);
  At(
    Zn(
      r,
      () => {
        r() || setTimeout(() => s(!1), i);
      },
      { defer: !0 }
    )
  );
  const [c, l] = z(!1);
  return M(Io, {
    get children() {
      return M(ze, {
        get when() {
          return a();
        },
        get children() {
          const u = kd(),
            g = u.firstChild,
            p = g.firstChild;
          return (
            le(
              g,
              M(Td, {
                class:
                  "fill-tg_hint rotate--45 app-transition-transform w-4 h-4 cursor-pointer",
                role: "button",
                onClick: () => o(!1),
              }),
              p
            ),
            le(
              p,
              (() => {
                const m = B(() => !!c());
                return () =>
                  m() ? Mn("update title-loading") : Mn("update title");
              })()
            ),
            le(
              u,
              M(ze, {
                get when() {
                  return !c();
                },
                get children() {
                  const m = Id();
                  return (
                    (m.$$click = () => t(l(!0))),
                    le(m, () => Mn("update button")),
                    m
                  );
                },
              }),
              null
            ),
            ie(() => u.classList.toggle("bottom-5", !!(r() && Ke(n)))),
            u
          );
        },
      });
    },
  });
}
Tt(["click"]);
typeof Object.hasOwn != "function" &&
  (Object.hasOwn = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
function Od() {
  Ae(wd);
  const e = Fs();
  return (
    V.requestWriteAccess(),
    V.expand(),
    V.setHeaderColor("secondary_bg_color"),
    V.SettingsButton.show(),
    Qt(() => {
      (document.documentElement.style.colorScheme = V.colorScheme),
        V.SettingsButton.show(),
        V.SettingsButton.onClick(() => {
          e("/profile/");
        }),
        tc();
    }),
    M(Zs, {
      get lang() {
        return (
          V.initDataUnsafe.user?.language_code ?? window.navigator.language
        );
      },
      get children() {
        return [
          M(Ys, {
            get children() {
              return [
                M(is, { children: uo }),
                M(bt, { charset: "utf-8" }),
                M(bt, { name: "title", content: uo }),
                M(bt, { name: "description", content: Ad }),
                M(bt, {
                  name: "viewport",
                  content:
                    "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no",
                }),
                M(bt, { name: "robots", content: "noindex, nofollow" }),
                M(as, {
                  rel: "manifest",
                  get href() {
                    return "/utf/manifest.json";
                  },
                }),
              ];
            },
          }),
          M(Qs, {
            get children() {
              return [
                M(Io, {
                  get children() {
                    return M(Ws, {
                      get children() {
                        return M(Do, {
                          get children() {
                            return M($s, {
                              get children() {
                                return M(Ns, {});
                              },
                            });
                          },
                        });
                      },
                    });
                  },
                }),
                M(Js, {}),
                M(xd, {}),
              ];
            },
          }),
        ];
      },
    })
  );
}
const ho = Object.values(Object.assign({}))[0],
  Md = ho ? ho.default : void 0,
  Dd = ({ routerProps: e } = {}) => {
    let t = {
      get request() {},
      get clientAddress() {},
      get locals() {},
      get prevUrl() {},
      get responseHeaders() {},
      get tags() {},
      get env() {},
      get routerContext() {},
      setStatusCode(i) {},
      getStatusCode() {},
      $type: Wo,
      fetch,
      $islands: new Set(),
      mutation: !1,
    };
    function n(i) {
      return M(Ms, i);
    }
    const r = "/utf/";
    let o = r;
    if (r.startsWith("http"))
      try {
        o = new URL(r).pathname;
      } catch {
        console.warn(
          "BASE_URL starts with http, but `new URL` failed to parse it. Please check your BASE_URL:",
          r
        );
      }
    return M(Ho.Provider, {
      value: t,
      get children() {
        return M(Do, {
          get children() {
            return M(
              n,
              Ut({ base: o, data: Md }, e, {
                get children() {
                  return M(Od, {});
                },
              })
            );
          },
        });
      },
    });
  };
ts(() => M(Dd, {}), document);
export {
  Xs as $,
  zd as A,
  oh as B,
  dh as C,
  dr as D,
  Ea as E,
  Wi as F,
  gh as G,
  Xe as H,
  Zn as I,
  qo as J,
  Qo as K,
  Yn as L,
  Fd as M,
  qd as N,
  Kd as O,
  Ut as P,
  de as Q,
  an as R,
  ze as S,
  is as T,
  Fa as U,
  nh as V,
  V as W,
  Tc as X,
  lh as Y,
  Bd as Z,
  Jd as _,
  ie as a,
  Vo as a0,
  bo as a1,
  Te as a2,
  Wt as a3,
  Uc as a4,
  $i as a5,
  Td as a6,
  hh as a7,
  Vd as a8,
  ja as a9,
  eh as aA,
  Yo as aB,
  ah as aC,
  ch as aD,
  sh as aE,
  qc as aF,
  qt as aG,
  md as aH,
  zc as aI,
  Xd as aJ,
  xt as aK,
  Qd as aL,
  Ac as aM,
  zo as aN,
  ct as aO,
  Go as aP,
  wc as aQ,
  Aa as aR,
  fh as aS,
  uh as aa,
  on as ab,
  wd as ac,
  ye as ad,
  rn as ae,
  Pc as af,
  Ld as ag,
  Co as ah,
  Gc as ai,
  Cd as aj,
  Hi as ak,
  U as al,
  $a as am,
  Hd as an,
  G as ao,
  Nt as ap,
  Yd as aq,
  Zd as ar,
  rh as as,
  Rd as at,
  Wd as au,
  Ge as av,
  Jo as aw,
  or as ax,
  Ko as ay,
  th as az,
  tt as b,
  M as c,
  z as d,
  Uo as e,
  At as f,
  Ke as g,
  ko as h,
  le as i,
  Tt as j,
  De as k,
  Ae as l,
  Io as m,
  $d as n,
  Qt as o,
  B as p,
  Gd as q,
  ec as r,
  Ln as s,
  Mn as t,
  jd as u,
  od as v,
  Fs as w,
  ih as x,
  Jn as y,
  Ud as z,
};
