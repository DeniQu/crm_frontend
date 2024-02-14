import {
  i as a,
  c as e,
  S as w,
  A as I,
  s as j,
  t as v,
  a as A,
  b,
  d as x,
  e as _,
  g as h,
  f as q,
  r as U,
  u as E,
  h as D,
  j as F,
  k as H,
  l as V,
  o as G,
  W as P,
  m as M,
  M as k,
  n as N,
  E as O,
  p as K,
  q as W,
  v as Z,
  w as Q,
  T as z,
  B as J,
} from "./index-a01f92b5.js";
import { p as X, u as Y } from "./project.network-beff772d.js";
import {
  D as ee,
  G as S,
  S as te,
  p as re,
  a as ne,
  P as ae,
  u as se,
} from "./Calendar-81dc3ec9.js";
import {
  A as le,
  C as ie,
  a as oe,
  E as ce,
  b as ue,
  c as de,
} from "./create-task.ui-e3c37910.js";
import { I as ge } from "./project.context-77f57be8.js";
import { P as fe, a as C } from "./profile.context-43c1a76f.js";
import { I as me } from "./initials-avatar-9db499e5.js";
import { S as he } from "./premium-star-370dd05f.js";
import { A as pe } from "./Arrow-d3382362.js";
import { m as _e } from "./model-fc7144ae.js";
import "./persist-resource-4ec7c87b.js";
import "./index-dfeb92b4.js";
import "./Checkmark-572d5fea.js";
import "./Create-b0921969.js";
import "./createPath-63910385.js";
const be = "/utf/assets/Telegram-c3de7996.png",
  ve = b("<span> "),
  we = b(
    '<div class="flex flex-col justify-center flex-grow pb-1"style="max-width:calc(100% - 2.5rem)"><div class="flex items-center max-w-full"><span class="line-height-[1.375rem] font-510 text-ellipsis max-h-[1.375rem] whitespace-nowrap overflow-hidden"style="max-width:calc(100% - 1rem)"></span></div><span class="c-tg_hint line-height-[1rem]"><span>'
  ),
  xe = b(
    '<div class="grid grid-cols-[1fr_auto] gap-4 py-0.5"><a class="p-1 pr-4 inline-flex rounded-full bg-tg_bg max-w-34 my-0.5 overflow-hidden"><img alt=Telegram class="mr-2.5 w-8 h-8 rounded-full"><div class="flex flex-col my--1 justify-center"><p class="m-0 app-text-footnote whitespace-nowrap"></p><span class="m-0 app-text-caption-regular whitespace-nowrap c-tg_hint">'
  );
function $e(t) {
  return (() => {
    const i = xe(),
      c = i.firstChild,
      s = c.firstChild,
      u = s.nextSibling,
      d = u.firstChild,
      g = d.nextSibling;
    return (
      a(
        i,
        e(I, {
          href: "/profile/",
          class: "flex items-center gap-3 px-3 overflow-hidden",
          get children() {
            return [
              e(me, {
                mid: !0,
                get user() {
                  return {
                    title: t.name,
                    avatar: t.avatar,
                    userName: t.username,
                  };
                },
              }),
              (() => {
                const n = we(),
                  r = n.firstChild,
                  f = r.firstChild,
                  o = r.nextSibling,
                  p = o.firstChild;
                return (
                  a(f, () => t.name),
                  a(r, e(pe, { class: "w-4 fill-tg_text!" }), null),
                  a(
                    o,
                    e(w, {
                      get when() {
                        return ![void 0, "FREE", ""].includes(t.plan);
                      },
                      get children() {
                        const l = ve(),
                          $ = l.firstChild;
                        return (
                          a(l, e(he, { class: "w-3.5 h-3.5 mt--1" }), $), l
                        );
                      },
                    }),
                    p
                  ),
                  a(p, () => t.planTitle),
                  n
                );
              })(),
            ];
          },
        }),
        c
      ),
      j(s, "src", be),
      a(d, () => v("telegram channel name")),
      a(g, () => v("telegram channel")),
      A(() => j(c, "href", v("telegram channel link"))),
      i
    );
  })();
}
const Pe = b(
  '<form class="relative bg-tg_bg rounded-3 h-11 min-h-11 overflow-hidden shadow-none"id=create-generic><div class="flex items-center px-4 h-11 w-full gap-4"><input class="flex-grow p-0 py-2.5 placeholder:c-tg_hint app-text-subheadline"id=create-task-input enterkeyhint=send inputmode=text type=text autofocus><div role=button class="flex items-center cursor-pointer"></div><button class="bg-tg_button rounded-full flex items-center p-0.5 cursor-pointer">'
);
function R(t) {
  const i = x(""),
    c = x(!1),
    s = x(!1),
    u = x(!1);
  A(() => {
    _(u, h(i).length === 0);
  });
  let d;
  return (
    q(() => {
      setTimeout(() =>
        requestAnimationFrame(() => {
          d.focus(),
            U(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 300);
        })
      );
    }),
    (() => {
      const n = Pe(),
        r = n.firstChild,
        f = r.firstChild,
        o = f.nextSibling,
        p = o.nextSibling;
      return (
        n.addEventListener("submit", (l) => (l.preventDefault(), !h(u) && g())),
        a(r, () => t.icon, f),
        E((l) => (l.focus(), (d = l)), f),
        E(_e, f, () => i),
        D(o, "click", t.onClose, !0),
        a(o, e(ee, { class: "fill-tg_hint" })),
        a(p, e(le, { class: "fill-tg_text" })),
        A(
          (l) => {
            const $ = t.placeholder,
              y = h(c),
              T = h(u);
            return (
              $ !== l._v$ && j(f, "placeholder", (l._v$ = $)),
              y !== l._v$2 && (f.disabled = l._v$2 = y),
              T !== l._v$3 && (p.disabled = l._v$3 = T),
              l
            );
          },
          { _v$: void 0, _v$2: void 0, _v$3: void 0 }
        ),
        n
      );
    })()
  );
  function g() {
    return (
      _(c, !0),
      t
        .onCreate?.(h(i))
        .then(() => {
          _(s, !0), t.onClose?.();
        })
        .catch(() => {
          _(s, !1);
        })
    );
  }
}
F(["click"]);
const ke = b(
    '<svg width=30 height=30 fill=none xmlns=http://www.w3.org/2000/svg><path d="M11.4 5c-.636 0-1.247.279-1.697.775A2.792 2.792 0 0 0 9 7.647V18.5c0 1 .5 1.5 1.5 1.5h12.1c.636 0 1.247-.279 1.697-.775.45-.497.703-1.17.703-1.872v-7.059c0-.702-.253-1.375-.703-1.872a2.292 2.292 0 0 0-1.697-.775h-5.269l-2.165-2.389A.764.764 0 0 0 14.6 5h-3.2Z"></path><path d="M20.876 22H10a3 3 0 0 1-3-3v-8.84c-1.165.384-2 1.42-2 2.64v8.4C5 22.746 6.343 24 8 24h10c1.359 0 2.507-.843 2.876-2Z">'
  ),
  Ce = (t = {}) =>
    (() => {
      const i = ke();
      return H(i, t, !0, !0), i;
    })(),
  je = b('<main class="h-full p-4 flex flex-col items-stretch gap-4 pb-20.5">'),
  Ae = b('<ul class="reset-list bg-tg_bg rounded-3">');
var m = (function (t) {
  return (
    (t[(t.Task = 0)] = "Task"),
    (t[(t.Project = 1)] = "Project"),
    (t[(t.Area = 2)] = "Area"),
    t
  );
})(m || {});
function Se(t) {
  const [i, { refetch: c }] = V(fe);
  G(() => {
    P.setHeaderColor("secondary_bg_color");
  });
  const s = x(m.Task),
    u = S.defaultValue[1].refetch,
    d = x(!1);
  return (() => {
    const n = je();
    return (
      a(
        n,
        e(M, {
          get fallback() {
            return e(g, {});
          },
          get children() {
            return e(w, {
              get when() {
                return i.latest;
              },
              get fallback() {
                return e(g, {});
              },
              children: (r) => [
                e($e, {
                  get name() {
                    return r().firstName ?? "";
                  },
                  get username() {
                    return r().username;
                  },
                  get avatar() {
                    return r().avatar;
                  },
                  get plan() {
                    return r().role;
                  },
                  get planTitle() {
                    return r().roleTitle;
                  },
                }),
                e(g, {
                  get profile() {
                    return r();
                  },
                }),
              ],
            });
          },
        }),
        null
      ),
      a(
        n,
        e(N, {
          get children() {
            return [
              e(k, {
                get when() {
                  return m.Task === h(s);
                },
                get children() {
                  return e(ie, { isOpen: d });
                },
              }),
              e(k, {
                get when() {
                  return m.Project === h(s);
                },
                get children() {
                  return e(R, {
                    get placeholder() {
                      return v("new-project-quick input-title");
                    },
                    get icon() {
                      return e(Ce, { class: "fill-tg_hint overflow-initial" });
                    },
                    onCreate: (r) =>
                      X({ name: r, type: ge.Private }).then(() => (u(), c())),
                    onClose: () => _(s, m.Task),
                  });
                },
              }),
              e(k, {
                get when() {
                  return m.Area === h(s);
                },
                get children() {
                  return e(R, {
                    get placeholder() {
                      return v("new-area-quick input-title");
                    },
                    get icon() {
                      return e(te, {
                        class: "fill-tg_hint mx-1 overflow-initial",
                      });
                    },
                    onCreate: (r) => re({ name: r }).then(() => (u(), c())),
                    onClose: () => _(s, m.Task),
                  });
                },
              }),
            ];
          },
        }),
        null
      ),
      a(n, e(oe, {}), null),
      a(
        n,
        e(O, {
          get fallback() {
            return [];
          },
          get children() {
            return e(ne, {
              get onReorderProject() {
                return t.onReorderProject;
              },
              get onReorderArea() {
                return t.onReorderArea;
              },
            });
          },
        }),
        null
      ),
      a(n, e(ce, { hide: !0 }), null),
      a(
        n,
        e(ue, {
          onCreate: u,
          onPrivateProjectClick: () => _(s, m.Project),
          onAreaClick: () => _(s, m.Area),
          get hidden() {
            return K(() => !!W())() && h(d);
          },
        }),
        null
      ),
      n
    );
  })();
  function g(n) {
    const r = e(ae, {
      get title() {
        return v("subscribe title");
      },
      get description() {
        return v("subscribe desc");
      },
    });
    return e(w, {
      get when() {
        return n.profile;
      },
      get fallback() {
        return e(f, {
          get publicCount() {
            return n.profile?.getPermission(C.PublicProjectLimit);
          },
        });
      },
      children: (o) =>
        e(w, {
          get when() {
            return o().isFree;
          },
          get children() {
            return e(w, {
              get when() {
                return o().canUse(C.PublicProjectLimit, !0);
              },
              fallback: r,
              get children() {
                return e(f, {
                  get publicCount() {
                    return o().getPermission(C.PublicProjectLimit);
                  },
                });
              },
            });
          },
        }),
    });
    function f(o) {
      return (() => {
        const p = Ae();
        return a(p, e(de, o)), p;
      })();
    }
  }
}
const ye = b(
    '<div class="fixed w-full h-full opacity-50 bg-black top-0 left-0 flex items-center justify-center c-tg_button_text">Loading group project...'
  ),
  B = "ignore-start-param",
  L = (t) => typeof t == "string" && !sessionStorage.getItem(B),
  Te = { "/": /-S-/g, "?": /-Q-/g, "=": /-E-/g, "&": /-A-/g };
function Ke() {
  const t = P.initDataUnsafe.start_param;
  if ((P.SettingsButton.show(), L(t))) {
    sessionStorage.setItem(Z, t), sessionStorage.setItem(B, "true");
    const s = Object.entries(Te).reduce((g, [n, r]) => g.replace(r, n), t),
      u = Q(),
      d = s.split("/");
    d.length > 1 &&
      d.slice(0, -1).reduce((g, n) => {
        const r = `${g}/${n}`;
        return history.pushState(null, "", r), r;
      }, ""),
      u(`/${s}`);
  }
  return [
    e(z, { children: "UTasks" }),
    e(J, { isVisible: !1 }),
    e(w, {
      get when() {
        return !L(P.initDataUnsafe.start_param);
      },
      get fallback() {
        return e(c, {});
      },
      get children() {
        return e(i, {});
      },
    }),
  ];
  function i() {
    return (
      S.defaultValue[0].loading || S.defaultValue[1].refetch(),
      e(Se, { onReorderProject: Y, onReorderArea: se })
    );
  }
  function c() {
    return ye();
  }
}
export { Ke as default };
