import{s as S,e as _,t as f,b as x,d,f as g,h,i as l,j,k as m,l as v,m as $,n as E,o as k}from"../chunks/scheduler.Caius0GU.js";import{S as q,i as y}from"../chunks/index.z-h2UubA.js";import{s as C}from"../chunks/entry.BkvBJfsk.js";const H=()=>{const s=C;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},P={subscribe(s){return H().page.subscribe(s)}};function w(s){var b;let t,r=s[0].status+"",o,n,i,c=((b=s[0].error)==null?void 0:b.message)+"",u;return{c(){t=_("h1"),o=f(r),n=x(),i=_("p"),u=f(c)},l(e){t=d(e,"H1",{});var a=g(t);o=h(a,r),a.forEach(l),n=j(e),i=d(e,"P",{});var p=g(i);u=h(p,c),p.forEach(l)},m(e,a){m(e,t,a),v(t,o),m(e,n,a),m(e,i,a),v(i,u)},p(e,[a]){var p;a&1&&r!==(r=e[0].status+"")&&$(o,r),a&1&&c!==(c=((p=e[0].error)==null?void 0:p.message)+"")&&$(u,c)},i:E,o:E,d(e){e&&(l(t),l(n),l(i))}}}function z(s,t,r){let o;return k(s,P,n=>r(0,o=n)),[o]}let F=class extends q{constructor(t){super(),y(this,t,z,w,S,{})}};export{F as component};
