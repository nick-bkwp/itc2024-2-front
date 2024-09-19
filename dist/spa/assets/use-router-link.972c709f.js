import{a as c,h as f,z as U,c as D,g as T,U as H,k as X,a0 as Y,q as G,x as J,u as W,v as Z}from"./index.7291a80e.js";const C={xs:18,sm:24,md:32,lg:38,xl:46},ee={size:String};function te(e,t=C){return c(()=>e.size!==void 0?{fontSize:e.size in t?`${t[e.size]}px`:e.size}:null)}function ne(e,t){return e!==void 0&&e()||t}function xe(e,t){if(e!==void 0){const n=e();if(n!=null)return n.slice()}return t}function E(e,t){return e!==void 0?t.concat(e()):t}function $e(e,t){return e===void 0?t:t!==void 0?t.concat(e()):e()}function be(e,t,n,r,s,u){t.key=r+s;const a=f(e,t,n);return s===!0?U(a,u()):a}const O="0 0 24 24",P=e=>e,A=e=>`ionicons ${e}`,V={"mdi-":e=>`mdi ${e}`,"icon-":P,"bt-":e=>`bt ${e}`,"eva-":e=>`eva ${e}`,"ion-md":A,"ion-ios":A,"ion-logo":A,"iconfont ":P,"ti-":e=>`themify-icon ${e}`,"bi-":e=>`bootstrap-icons ${e}`},K={o_:"-outlined",r_:"-round",s_:"-sharp"},F={sym_o_:"-outlined",sym_r_:"-rounded",sym_s_:"-sharp"},re=new RegExp("^("+Object.keys(V).join("|")+")"),ie=new RegExp("^("+Object.keys(K).join("|")+")"),j=new RegExp("^("+Object.keys(F).join("|")+")"),se=/^[Mm]\s?[-+]?\.?\d/,ae=/^img:/,oe=/^svguse:/,ue=/^ion-/,le=/^(fa-(classic|sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;var Se=D({name:"QIcon",props:{...ee,tag:{type:String,default:"i"},name:String,color:String,left:Boolean,right:Boolean},setup(e,{slots:t}){const{proxy:{$q:n}}=T(),r=te(e),s=c(()=>"q-icon"+(e.left===!0?" on-left":"")+(e.right===!0?" on-right":"")+(e.color!==void 0?` text-${e.color}`:"")),u=c(()=>{let a,i=e.name;if(i==="none"||!i)return{none:!0};if(n.iconMapFn!==null){const o=n.iconMapFn(i);if(o!==void 0)if(o.icon!==void 0){if(i=o.icon,i==="none"||!i)return{none:!0}}else return{cls:o.cls,content:o.content!==void 0?o.content:" "}}if(se.test(i)===!0){const[o,p=O]=i.split("|");return{svg:!0,viewBox:p,nodes:o.split("&&").map(y=>{const[m,k,h]=y.split("@@");return f("path",{style:k,d:m,transform:h})})}}if(ae.test(i)===!0)return{img:!0,src:i.substring(4)};if(oe.test(i)===!0){const[o,p=O]=i.split("|");return{svguse:!0,src:o.substring(7),viewBox:p}}let g=" ";const d=i.match(re);if(d!==null)a=V[d[1]](i);else if(le.test(i)===!0)a=i;else if(ue.test(i)===!0)a=`ionicons ion-${n.platform.is.ios===!0?"ios":"md"}${i.substring(3)}`;else if(j.test(i)===!0){a="notranslate material-symbols";const o=i.match(j);o!==null&&(i=i.substring(6),a+=F[o[1]]),g=i}else{a="notranslate material-icons";const o=i.match(ie);o!==null&&(i=i.substring(2),a+=K[o[1]]),g=i}return{cls:a,content:g}});return()=>{const a={class:s.value,style:r.value,"aria-hidden":"true",role:"presentation"};return u.value.none===!0?f(e.tag,a,ne(t.default)):u.value.img===!0?f(e.tag,a,E(t.default,[f("img",{src:u.value.src})])):u.value.svg===!0?f(e.tag,a,E(t.default,[f("svg",{viewBox:u.value.viewBox||"0 0 24 24"},u.value.nodes)])):u.value.svguse===!0?f(e.tag,a,E(t.default,[f("svg",{viewBox:u.value.viewBox},[f("use",{"xlink:href":u.value.src})])])):(u.value.cls!==void 0&&(a.class+=" "+u.value.cls),f(e.tag,a,E(t.default,[u.value.content])))}}});const ce={size:{type:[String,Number],default:"1em"},color:String};function fe(e){return{cSize:c(()=>e.size in C?`${C[e.size]}px`:e.size),classes:c(()=>"q-spinner"+(e.color?` text-${e.color}`:""))}}var Re=D({name:"QSpinner",props:{...ce,thickness:{type:Number,default:5}},setup(e){const{cSize:t,classes:n}=fe(e);return()=>f("svg",{class:n.value+" q-spinner-mat",width:t.value,height:t.value,viewBox:"25 25 50 50"},[f("circle",{class:"path",cx:"50",cy:"50",r:"20",fill:"none",stroke:"currentColor","stroke-width":e.thickness,"stroke-miterlimit":"10"})])}});function de(e,t){const n=e.style;for(const r in t)n[r]=t[r]}function _e(e){if(e==null)return;if(typeof e=="string")try{return document.querySelector(e)||void 0}catch{return}const t=H(e);if(t)return t.$el||t}function qe(e,t){if(e==null||e.contains(t)===!0)return!0;for(let n=e.nextElementSibling;n!==null;n=n.nextElementSibling)if(n.contains(t))return!0;return!1}function pe(e,t=250){let n=!1,r;return function(){return n===!1&&(n=!0,setTimeout(()=>{n=!1},t),r=e.apply(this,arguments)),r}}function L(e,t,n,r){n.modifiers.stop===!0&&W(e);const s=n.modifiers.color;let u=n.modifiers.center;u=u===!0||r===!0;const a=document.createElement("span"),i=document.createElement("span"),g=Z(e),{left:d,top:o,width:p,height:y}=t.getBoundingClientRect(),m=Math.sqrt(p*p+y*y),k=m/2,h=`${(p-m)/2}px`,_=u?h:`${g.left-d-k}px`,q=`${(y-m)/2}px`,w=u?q:`${g.top-o-k}px`;i.className="q-ripple__inner",de(i,{height:`${m}px`,width:`${m}px`,transform:`translate3d(${_},${w},0) scale3d(.2,.2,1)`,opacity:0}),a.className=`q-ripple${s?" text-"+s:""}`,a.setAttribute("dir","ltr"),a.appendChild(i),t.appendChild(a);const S=()=>{a.remove(),clearTimeout(R)};n.abort.push(S);let R=setTimeout(()=>{i.classList.add("q-ripple__inner--enter"),i.style.transform=`translate3d(${h},${q},0) scale3d(1,1,1)`,i.style.opacity=.2,R=setTimeout(()=>{i.classList.remove("q-ripple__inner--enter"),i.classList.add("q-ripple__inner--leave"),i.style.opacity=0,R=setTimeout(()=>{a.remove(),n.abort.splice(n.abort.indexOf(S),1)},275)},250)},50)}function B(e,{modifiers:t,value:n,arg:r}){const s=Object.assign({},e.cfg.ripple,t,n);e.modifiers={early:s.early===!0,stop:s.stop===!0,center:s.center===!0,color:s.color||r,keyCodes:[].concat(s.keyCodes||13)}}var we=X({name:"ripple",beforeMount(e,t){const n=t.instance.$.appContext.config.globalProperties.$q.config||{};if(n.ripple===!1)return;const r={cfg:n,enabled:t.value!==!1,modifiers:{},abort:[],start(s){r.enabled===!0&&s.qSkipRipple!==!0&&s.type===(r.modifiers.early===!0?"pointerdown":"click")&&L(s,e,r,s.qKeyEvent===!0)},keystart:pe(s=>{r.enabled===!0&&s.qSkipRipple!==!0&&Y(s,r.modifiers.keyCodes)===!0&&s.type===`key${r.modifiers.early===!0?"down":"up"}`&&L(s,e,r,!0)},300)};B(r,t),e.__qripple=r,G(r,"main",[[e,"pointerdown","start","passive"],[e,"click","start","passive"],[e,"keydown","keystart","passive"],[e,"keyup","keystart","passive"]])},updated(e,t){if(t.oldValue!==t.value){const n=e.__qripple;n!==void 0&&(n.enabled=t.value!==!1,n.enabled===!0&&Object(t.value)===t.value&&B(n,t))}},beforeUnmount(e){const t=e.__qripple;t!==void 0&&(t.abort.forEach(n=>{n()}),J(t,"main"),delete e._qripple)}});function Ee(e){if(Object(e.$parent)===e.$parent)return e.$parent;let{parent:t}=e.$;for(;Object(t)===t;){if(Object(t.proxy)===t.proxy)return t.proxy;t=t.parent}}function Q(e,t){typeof t.type=="symbol"?Array.isArray(t.children)===!0&&t.children.forEach(n=>{Q(e,n)}):e.add(t)}function Ae(e){const t=new Set;return e.forEach(n=>{Q(t,n)}),Array.from(t)}function ve(e){return e.appContext.config.globalProperties.$router!==void 0}function Ce(e){return e.isUnmounted===!0||e.isDeactivated===!0}function M(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}function N(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function me(e,t){for(const n in t){const r=t[n],s=e[n];if(typeof r=="string"){if(r!==s)return!1}else if(Array.isArray(s)===!1||s.length!==r.length||r.some((u,a)=>u!==s[a]))return!1}return!0}function I(e,t){return Array.isArray(t)===!0?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function ge(e,t){return Array.isArray(e)===!0?I(e,t):Array.isArray(t)===!0?I(t,e):e===t}function he(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(ge(e[n],t[n])===!1)return!1;return!0}const ye={to:[String,Object],replace:Boolean,href:String,target:String,disable:Boolean},ze={...ye,exact:Boolean,activeClass:{type:String,default:"q-router-link--active"},exactActiveClass:{type:String,default:"q-router-link--exact-active"}};function Oe({fallbackTag:e,useDisableForRouterLinkProps:t=!0}={}){const n=T(),{props:r,proxy:s,emit:u}=n,a=ve(n),i=c(()=>r.disable!==!0&&r.href!==void 0),g=t===!0?c(()=>a===!0&&r.disable!==!0&&i.value!==!0&&r.to!==void 0&&r.to!==null&&r.to!==""):c(()=>a===!0&&i.value!==!0&&r.to!==void 0&&r.to!==null&&r.to!==""),d=c(()=>g.value===!0?w(r.to):null),o=c(()=>d.value!==null),p=c(()=>i.value===!0||o.value===!0),y=c(()=>r.type==="a"||p.value===!0?"a":r.tag||e||"div"),m=c(()=>i.value===!0?{href:r.href,target:r.target}:o.value===!0?{href:d.value.href,target:r.target}:{}),k=c(()=>{if(o.value===!1)return-1;const{matched:l}=d.value,{length:v}=l,x=l[v-1];if(x===void 0)return-1;const $=s.$route.matched;if($.length===0)return-1;const b=$.findIndex(N.bind(null,x));if(b!==-1)return b;const z=M(l[v-2]);return v>1&&M(x)===z&&$[$.length-1].path!==z?$.findIndex(N.bind(null,l[v-2])):b}),h=c(()=>o.value===!0&&k.value!==-1&&me(s.$route.params,d.value.params)),_=c(()=>h.value===!0&&k.value===s.$route.matched.length-1&&he(s.$route.params,d.value.params)),q=c(()=>o.value===!0?_.value===!0?` ${r.exactActiveClass} ${r.activeClass}`:r.exact===!0?"":h.value===!0?` ${r.activeClass}`:"":"");function w(l){try{return s.$router.resolve(l)}catch{}return null}function S(l,{returnRouterError:v,to:x=r.to,replace:$=r.replace}={}){if(r.disable===!0)return l.preventDefault(),Promise.resolve(!1);if(l.metaKey||l.altKey||l.ctrlKey||l.shiftKey||l.button!==void 0&&l.button!==0||r.target==="_blank")return Promise.resolve(!1);l.preventDefault();const b=s.$router[$===!0?"replace":"push"](x);return v===!0?b:b.then(()=>{}).catch(()=>{})}function R(l){if(o.value===!0){const v=x=>S(l,x);u("click",l,v),l.defaultPrevented!==!0&&v()}else u("click",l)}return{hasRouterLink:o,hasHrefLink:i,hasLink:p,linkTag:y,resolvedLink:d,linkIsActive:h,linkIsExactActive:_,linkClass:q,linkAttrs:m,getLink:w,navigateToRouterLink:S,navigateOnClick:R}}export{Se as Q,we as R,xe as a,be as b,E as c,ee as d,ye as e,te as f,Oe as g,ne as h,Re as i,_e as j,de as k,Ce as l,$e as m,Ee as n,qe as o,Ae as p,ze as u,ve as v};
