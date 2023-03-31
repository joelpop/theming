(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};window.Vaadin.featureFlags.exampleFeatureFlag=!1;window.Vaadin.featureFlags.collaborationEngineBackend=!1;window.Vaadin.featureFlags.themeEditor=!0;const Rr="modulepreload",Ar=function(t,e){return new URL(t,e).href},Zo={},C=function(e,o,i){if(!o||o.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(o.map(n=>{if(n=Ar(n,i),n in Zo)return;Zo[n]=!0;const s=n.endsWith(".css"),l=s?'[rel="stylesheet"]':"";if(!!i)for(let c=r.length-1;c>=0;c--){const m=r[c];if(m.href===n&&(!s||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${l}`))return;const d=document.createElement("link");if(d.rel=s?"stylesheet":Rr,s||(d.as="script",d.crossOrigin=""),d.href=n,document.head.appendChild(d),s)return new Promise((c,m)=>{d.addEventListener("load",c),d.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>e())};function _t(t){return t=t||[],Array.isArray(t)?t:[t]}function Y(t){return`[Vaadin.Router] ${t}`}function Ir(t){if(typeof t!="object")return String(t);const e=Object.prototype.toString.call(t).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(t)}`:e}const St="module",Et="nomodule",xo=[St,Et];function ei(t){if(!t.match(/.+\.[m]?js$/))throw new Error(Y(`Unsupported type for bundle "${t}": .js or .mjs expected.`))}function Gi(t){if(!t||!K(t.path))throw new Error(Y('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=t.bundle,o=["component","redirect","bundle"];if(!me(t.action)&&!Array.isArray(t.children)&&!me(t.children)&&!Ct(e)&&!o.some(i=>K(t[i])))throw new Error(Y(`Expected route config "${t.path}" to include either "${o.join('", "')}" or "action" function but none found.`));if(e)if(K(e))ei(e);else if(xo.some(i=>i in e))xo.forEach(i=>i in e&&ei(e[i]));else throw new Error(Y('Expected route bundle to include either "'+Et+'" or "'+St+'" keys, or both'));t.redirect&&["bundle","component"].forEach(i=>{i in t&&console.warn(Y(`Route config "${t.path}" has both "redirect" and "${i}" properties, and "redirect" will always override the latter. Did you mean to only use "${i}"?`))})}function ti(t){_t(t).forEach(e=>Gi(e))}function oi(t,e){let o=document.head.querySelector('script[src="'+t+'"][async]');return o||(o=document.createElement("script"),o.setAttribute("src",t),e===St?o.setAttribute("type",St):e===Et&&o.setAttribute(Et,""),o.async=!0),new Promise((i,r)=>{o.onreadystatechange=o.onload=n=>{o.__dynamicImportLoaded=!0,i(n)},o.onerror=n=>{o.parentNode&&o.parentNode.removeChild(o),r(n)},o.parentNode===null?document.head.appendChild(o):o.__dynamicImportLoaded&&i()})}function Or(t){return K(t)?oi(t):Promise.race(xo.filter(e=>e in t).map(e=>oi(t[e],e)))}function Fe(t,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${t}`,{cancelable:t==="go",detail:e}))}function Ct(t){return typeof t=="object"&&!!t}function me(t){return typeof t=="function"}function K(t){return typeof t=="string"}function Ki(t){const e=new Error(Y(`Page not found (${t.pathname})`));return e.context=t,e.code=404,e}const ke=new class{};function Lr(t){const e=t.port,o=t.protocol,n=o==="http:"&&e==="80"||o==="https:"&&e==="443"?t.hostname:t.host;return`${o}//${n}`}function ii(t){if(t.defaultPrevented||t.button!==0||t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)return;let e=t.target;const o=t.composedPath?t.composedPath():t.path||[];for(let l=0;l<o.length;l++){const a=o[l];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||Lr(e))!==window.location.origin)return;const{pathname:r,search:n,hash:s}=e;Fe("go",{pathname:r,search:n,hash:s})&&(t.preventDefault(),t&&t.type==="click"&&window.scrollTo(0,0))}const zr={activate(){window.document.addEventListener("click",ii)},inactivate(){window.document.removeEventListener("click",ii)}},Mr=/Trident/.test(navigator.userAgent);Mr&&!me(window.PopStateEvent)&&(window.PopStateEvent=function(t,e){e=e||{};var o=document.createEvent("Event");return o.initEvent(t,!!e.bubbles,!!e.cancelable),o.state=e.state||null,o},window.PopStateEvent.prototype=window.Event.prototype);function ri(t){if(t.state==="vaadin-router-ignore")return;const{pathname:e,search:o,hash:i}=window.location;Fe("go",{pathname:e,search:o,hash:i})}const Vr={activate(){window.addEventListener("popstate",ri)},inactivate(){window.removeEventListener("popstate",ri)}};var Le=er,Dr=No,Ur=Hr,jr=Xi,Fr=Zi,Yi="/",Ji="./",Br=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function No(t,e){for(var o=[],i=0,r=0,n="",s=e&&e.delimiter||Yi,l=e&&e.delimiters||Ji,a=!1,d;(d=Br.exec(t))!==null;){var c=d[0],m=d[1],h=d.index;if(n+=t.slice(r,h),r=h+c.length,m){n+=m[1],a=!0;continue}var g="",ne=t[r],se=d[2],te=d[3],jt=d[4],F=d[5];if(!a&&n.length){var X=n.length-1;l.indexOf(n[X])>-1&&(g=n[X],n=n.slice(0,X))}n&&(o.push(n),n="",a=!1);var ye=g!==""&&ne!==void 0&&ne!==g,be=F==="+"||F==="*",Ft=F==="?"||F==="*",oe=g||s,nt=te||jt;o.push({name:se||i++,prefix:g,delimiter:oe,optional:Ft,repeat:be,partial:ye,pattern:nt?Wr(nt):"[^"+ae(oe)+"]+?"})}return(n||r<t.length)&&o.push(n+t.substr(r)),o}function Hr(t,e){return Xi(No(t,e))}function Xi(t){for(var e=new Array(t.length),o=0;o<t.length;o++)typeof t[o]=="object"&&(e[o]=new RegExp("^(?:"+t[o].pattern+")$"));return function(i,r){for(var n="",s=r&&r.encode||encodeURIComponent,l=0;l<t.length;l++){var a=t[l];if(typeof a=="string"){n+=a;continue}var d=i?i[a.name]:void 0,c;if(Array.isArray(d)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but got array');if(d.length===0){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var m=0;m<d.length;m++){if(c=s(d[m],a),!e[l].test(c))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'"');n+=(m===0?a.prefix:a.delimiter)+c}continue}if(typeof d=="string"||typeof d=="number"||typeof d=="boolean"){if(c=s(String(d),a),!e[l].test(c))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but got "'+c+'"');n+=a.prefix+c;continue}if(a.optional){a.partial&&(n+=a.prefix);continue}throw new TypeError('Expected "'+a.name+'" to be '+(a.repeat?"an array":"a string"))}return n}}function ae(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Wr(t){return t.replace(/([=!:$/()])/g,"\\$1")}function Qi(t){return t&&t.sensitive?"":"i"}function qr(t,e){if(!e)return t;var o=t.source.match(/\((?!\?)/g);if(o)for(var i=0;i<o.length;i++)e.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return t}function Gr(t,e,o){for(var i=[],r=0;r<t.length;r++)i.push(er(t[r],e,o).source);return new RegExp("(?:"+i.join("|")+")",Qi(o))}function Kr(t,e,o){return Zi(No(t,o),e,o)}function Zi(t,e,o){o=o||{};for(var i=o.strict,r=o.start!==!1,n=o.end!==!1,s=ae(o.delimiter||Yi),l=o.delimiters||Ji,a=[].concat(o.endsWith||[]).map(ae).concat("$").join("|"),d=r?"^":"",c=t.length===0,m=0;m<t.length;m++){var h=t[m];if(typeof h=="string")d+=ae(h),c=m===t.length-1&&l.indexOf(h[h.length-1])>-1;else{var g=h.repeat?"(?:"+h.pattern+")(?:"+ae(h.delimiter)+"(?:"+h.pattern+"))*":h.pattern;e&&e.push(h),h.optional?h.partial?d+=ae(h.prefix)+"("+g+")?":d+="(?:"+ae(h.prefix)+"("+g+"))?":d+=ae(h.prefix)+"("+g+")"}}return n?(i||(d+="(?:"+s+")?"),d+=a==="$"?"$":"(?="+a+")"):(i||(d+="(?:"+s+"(?="+a+"))?"),c||(d+="(?="+s+"|"+a+")")),new RegExp(d,Qi(o))}function er(t,e,o){return t instanceof RegExp?qr(t,e):Array.isArray(t)?Gr(t,e,o):Kr(t,e,o)}Le.parse=Dr;Le.compile=Ur;Le.tokensToFunction=jr;Le.tokensToRegExp=Fr;const{hasOwnProperty:Yr}=Object.prototype,wo=new Map;wo.set("|false",{keys:[],pattern:/(?:)/});function ni(t){try{return decodeURIComponent(t)}catch{return t}}function Jr(t,e,o,i,r){o=!!o;const n=`${t}|${o}`;let s=wo.get(n);if(!s){const d=[];s={keys:d,pattern:Le(t,d,{end:o,strict:t===""})},wo.set(n,s)}const l=s.pattern.exec(e);if(!l)return null;const a=Object.assign({},r);for(let d=1;d<l.length;d++){const c=s.keys[d-1],m=c.name,h=l[d];(h!==void 0||!Yr.call(a,m))&&(c.repeat?a[m]=h?h.split(c.delimiter).map(ni):[]:a[m]=h&&ni(h))}return{path:l[0],keys:(i||[]).concat(s.keys),params:a}}function tr(t,e,o,i,r){let n,s,l=0,a=t.path||"";return a.charAt(0)==="/"&&(o&&(a=a.substr(1)),o=!0),{next(d){if(t===d)return{done:!0};const c=t.__children=t.__children||t.children;if(!n&&(n=Jr(a,e,!c,i,r),n))return{done:!1,value:{route:t,keys:n.keys,params:n.params,path:n.path}};if(n&&c)for(;l<c.length;){if(!s){const h=c[l];h.parent=t;let g=n.path.length;g>0&&e.charAt(g)==="/"&&(g+=1),s=tr(h,e.substr(g),o,n.keys,n.params)}const m=s.next(d);if(!m.done)return{done:!1,value:m.value};s=null,l++}return{done:!0}}}}function Xr(t){if(me(t.route.action))return t.route.action(t)}function Qr(t,e){let o=e;for(;o;)if(o=o.parent,o===t)return!0;return!1}function Zr(t){let e=`Path '${t.pathname}' is not properly resolved due to an error.`;const o=(t.route||{}).path;return o&&(e+=` Resolution had failed on route: '${o}'`),e}function en(t,e){const{route:o,path:i}=e;if(o&&!o.__synthetic){const r={path:i,route:o};if(!t.chain)t.chain=[];else if(o.parent){let n=t.chain.length;for(;n--&&t.chain[n].route&&t.chain[n].route!==o.parent;)t.chain.pop()}t.chain.push(r)}}class He{constructor(e,o={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=o.baseUrl||"",this.errorHandler=o.errorHandler,this.resolveRoute=o.resolveRoute||Xr,this.context=Object.assign({resolver:this},o.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){ti(e);const o=[..._t(e)];this.root.__children=o}addRoutes(e){return ti(e),this.root.__children.push(..._t(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const o=Object.assign({},this.context,K(e)?{pathname:e}:e),i=tr(this.root,this.__normalizePathname(o.pathname),this.baseUrl),r=this.resolveRoute;let n=null,s=null,l=o;function a(d,c=n.value.route,m){const h=m===null&&n.value.route;return n=s||i.next(h),s=null,!d&&(n.done||!Qr(c,n.value.route))?(s=n,Promise.resolve(ke)):n.done?Promise.reject(Ki(o)):(l=Object.assign(l?{chain:l.chain?l.chain.slice(0):[]}:{},o,n.value),en(l,n.value),Promise.resolve(r(l)).then(g=>g!=null&&g!==ke?(l.result=g.result||g,l):a(d,c,g)))}return o.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(d=>{const c=Zr(l);if(d?console.warn(c):d=new Error(c),d.context=d.context||l,d instanceof DOMException||(d.code=d.code||500),this.errorHandler)return l.result=this.errorHandler(d),l;throw d})}static __createUrl(e,o){return new URL(e,o)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const o=this.__effectiveBaseUrl,i=this.constructor.__createUrl(e,o).href;if(i.slice(0,o.length)===o)return i.slice(o.length)}}He.pathToRegexp=Le;const{pathToRegexp:si}=He,ai=new Map;function or(t,e,o){const i=e.name||e.component;if(i&&(t.has(i)?t.get(i).push(e):t.set(i,[e])),Array.isArray(o))for(let r=0;r<o.length;r++){const n=o[r];n.parent=e,or(t,n,n.__children||n.children)}}function li(t,e){const o=t.get(e);if(o&&o.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return o&&o[0]}function di(t){let e=t.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function tn(t,e={}){if(!(t instanceof He))throw new TypeError("An instance of Resolver is expected");const o=new Map;return(i,r)=>{let n=li(o,i);if(!n&&(o.clear(),or(o,t.root,t.root.__children),n=li(o,i),!n))throw new Error(`Route "${i}" not found`);let s=ai.get(n.fullPath);if(!s){let a=di(n),d=n.parent;for(;d;){const g=di(d);g&&(a=g.replace(/\/$/,"")+"/"+a.replace(/^\//,"")),d=d.parent}const c=si.parse(a),m=si.tokensToFunction(c),h=Object.create(null);for(let g=0;g<c.length;g++)K(c[g])||(h[c[g].name]=!0);s={toPath:m,keys:h},ai.set(a,s),n.fullPath=a}let l=s.toPath(r,e)||"/";if(e.stringifyQueryParams&&r){const a={},d=Object.keys(r);for(let m=0;m<d.length;m++){const h=d[m];s.keys[h]||(a[h]=r[h])}const c=e.stringifyQueryParams(a);c&&(l+=c.charAt(0)==="?"?c:`?${c}`)}return l}}let ci=[];function on(t){ci.forEach(e=>e.inactivate()),t.forEach(e=>e.activate()),ci=t}const rn=t=>{const e=getComputedStyle(t).getPropertyValue("animation-name");return e&&e!=="none"},nn=(t,e)=>{const o=()=>{t.removeEventListener("animationend",o),e()};t.addEventListener("animationend",o)};function hi(t,e){return t.classList.add(e),new Promise(o=>{if(rn(t)){const i=t.getBoundingClientRect(),r=`height: ${i.bottom-i.top}px; width: ${i.right-i.left}px`;t.setAttribute("style",`position: absolute; ${r}`),nn(t,()=>{t.classList.remove(e),t.removeAttribute("style"),o()})}else t.classList.remove(e),o()})}const sn=256;function qt(t){return t!=null}function an(t){const e=Object.assign({},t);return delete e.next,e}function q({pathname:t="",search:e="",hash:o="",chain:i=[],params:r={},redirectFrom:n,resolver:s},l){const a=i.map(d=>d.route);return{baseUrl:s&&s.baseUrl||"",pathname:t,search:e,hash:o,routes:a,route:l||a.length&&a[a.length-1]||null,params:r,redirectFrom:n,getUrl:(d={})=>ft(le.pathToRegexp.compile(ir(a))(Object.assign({},r,d)),s)}}function pi(t,e){const o=Object.assign({},t.params);return{redirect:{pathname:e,from:t.pathname,params:o}}}function ln(t,e){e.location=q(t);const o=t.chain.map(i=>i.route).indexOf(t.route);return t.chain[o].element=e,e}function gt(t,e,o){if(me(t))return t.apply(o,e)}function ui(t,e,o){return i=>{if(i&&(i.cancel||i.redirect))return i;if(o)return gt(o[t],e,o)}}function dn(t,e){if(!Array.isArray(t)&&!Ct(t))throw new Error(Y(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${t}`));e.__children=[];const o=_t(t);for(let i=0;i<o.length;i++)Gi(o[i]),e.__children.push(o[i])}function ct(t){if(t&&t.length){const e=t[0].parentNode;for(let o=0;o<t.length;o++)e.removeChild(t[o])}}function ft(t,e){const o=e.__effectiveBaseUrl;return o?e.constructor.__createUrl(t.replace(/^\//,""),o).pathname:t}function ir(t){return t.map(e=>e.path).reduce((e,o)=>o.length?e.replace(/\/$/,"")+"/"+o.replace(/^\//,""):e,"")}class le extends He{constructor(e,o){const i=document.head.querySelector("base"),r=i&&i.getAttribute("href");super([],Object.assign({baseUrl:r&&He.__createUrl(r,document.URL).pathname.replace(/[^\/]*$/,"")},o)),this.resolveRoute=s=>this.__resolveRoute(s);const n=le.NavigationTrigger;le.setTriggers.apply(le,Object.keys(n).map(s=>n[s])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=q({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const o=e.route;let i=Promise.resolve();me(o.children)&&(i=i.then(()=>o.children(an(e))).then(n=>{!qt(n)&&!me(o.children)&&(n=o.children),dn(n,o)}));const r={redirect:n=>pi(e,n),component:n=>{const s=document.createElement(n);return this.__createdByRouter.set(s,!0),s}};return i.then(()=>{if(this.__isLatestRender(e))return gt(o.action,[e,r],o)}).then(n=>{if(qt(n)&&(n instanceof HTMLElement||n.redirect||n===ke))return n;if(K(o.redirect))return r.redirect(o.redirect);if(o.bundle)return Or(o.bundle).then(()=>{},()=>{throw new Error(Y(`Bundle not found: ${o.bundle}. Check if the file name is correct`))})}).then(n=>{if(qt(n))return n;if(K(o.component))return r.component(o.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,o=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),o||this.__onNavigationEvent(),this.ready}render(e,o){const i=++this.__lastStartedRenderId,r=Object.assign({search:"",hash:""},K(e)?{pathname:e}:e,{__renderId:i});return this.ready=this.resolve(r).then(n=>this.__fullyResolveChain(n)).then(n=>{if(this.__isLatestRender(n)){const s=this.__previousContext;if(n===s)return this.__updateBrowserHistory(s,!0),this.location;if(this.location=q(n),o&&this.__updateBrowserHistory(n,i===1),Fe("location-changed",{router:this,location:this.location}),n.__skipAttach)return this.__copyUnchangedElements(n,s),this.__previousContext=n,this.location;this.__addAppearingContent(n,s);const l=this.__animateIfNeeded(n);return this.__runOnAfterEnterCallbacks(n),this.__runOnAfterLeaveCallbacks(n,s),l.then(()=>{if(this.__isLatestRender(n))return this.__removeDisappearingContent(),this.__previousContext=n,this.location})}}).catch(n=>{if(i===this.__lastStartedRenderId)throw o&&this.__updateBrowserHistory(r),ct(this.__outlet&&this.__outlet.children),this.location=q(Object.assign(r,{resolver:this})),Fe("error",Object.assign({router:this,error:n},r)),n}),this.ready}__fullyResolveChain(e,o=e){return this.__findComponentContextAfterAllRedirects(o).then(i=>{const n=i!==o?i:e,l=ft(ir(i.chain),i.resolver)===i.pathname,a=(d,c=d.route,m)=>d.next(void 0,c,m).then(h=>h===null||h===ke?l?d:c.parent!==null?a(d,c.parent,h):h:h);return a(i).then(d=>{if(d===null||d===ke)throw Ki(n);return d&&d!==ke&&d!==i?this.__fullyResolveChain(n,d):this.__amendWithOnBeforeCallbacks(i)})})}__findComponentContextAfterAllRedirects(e){const o=e.result;return o instanceof HTMLElement?(ln(e,o),Promise.resolve(e)):o.redirect?this.__redirect(o.redirect,e.__redirectCount,e.__renderId).then(i=>this.__findComponentContextAfterAllRedirects(i)):o instanceof Error?Promise.reject(o):Promise.reject(new Error(Y(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${Ir(o)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(o=>o===this.__previousContext||o===e?o:this.__fullyResolveChain(o))}__runOnBeforeCallbacks(e){const o=this.__previousContext||{},i=o.chain||[],r=e.chain;let n=Promise.resolve();const s=()=>({cancel:!0}),l=a=>pi(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,i.length){for(let a=0;a<Math.min(i.length,r.length)&&!(i[a].route!==r[a].route||i[a].path!==r[a].path&&i[a].element!==r[a].element||!this.__isReusableElement(i[a].element,r[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=r.length===i.length&&e.__divergedChainIndex==r.length&&this.__isReusableElement(e.result,o.result),e.__skipAttach){for(let a=r.length-1;a>=0;a--)n=this.__runOnBeforeLeaveCallbacks(n,e,{prevent:s},i[a]);for(let a=0;a<r.length;a++)n=this.__runOnBeforeEnterCallbacks(n,e,{prevent:s,redirect:l},r[a]),i[a].element.location=q(e,i[a].route)}else for(let a=i.length-1;a>=e.__divergedChainIndex;a--)n=this.__runOnBeforeLeaveCallbacks(n,e,{prevent:s},i[a])}if(!e.__skipAttach)for(let a=0;a<r.length;a++)a<e.__divergedChainIndex?a<i.length&&i[a].element&&(i[a].element.location=q(e,i[a].route)):(n=this.__runOnBeforeEnterCallbacks(n,e,{prevent:s,redirect:l},r[a]),r[a].element&&(r[a].element.location=q(e,r[a].route)));return n.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,o,i,r){const n=q(o);return e.then(s=>{if(this.__isLatestRender(o))return ui("onBeforeLeave",[n,i,this],r.element)(s)}).then(s=>{if(!(s||{}).redirect)return s})}__runOnBeforeEnterCallbacks(e,o,i,r){const n=q(o,r.route);return e.then(s=>{if(this.__isLatestRender(o))return ui("onBeforeEnter",[n,i,this],r.element)(s)})}__isReusableElement(e,o){return e&&o?this.__createdByRouter.get(e)&&this.__createdByRouter.get(o)?e.localName===o.localName:e===o:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,o,i){if(o>sn)throw new Error(Y(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(o||0)+1,__renderId:i})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(Y(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:o="",hash:i=""},r){if(window.location.pathname!==e||window.location.search!==o||window.location.hash!==i){const n=r?"replaceState":"pushState";window.history[n](null,document.title,e+o+i),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,o){let i=this.__outlet;for(let r=0;r<e.__divergedChainIndex;r++){const n=o&&o.chain[r].element;if(n)if(n.parentNode===i)e.chain[r].element=n,i=n;else break}return i}__addAppearingContent(e,o){this.__ensureOutlet(),this.__removeAppearingContent();const i=this.__copyUnchangedElements(e,o);this.__appearingContent=[],this.__disappearingContent=Array.from(i.children).filter(n=>this.__addedByRouter.get(n)&&n!==e.result);let r=i;for(let n=e.__divergedChainIndex;n<e.chain.length;n++){const s=e.chain[n].element;s&&(r.appendChild(s),this.__addedByRouter.set(s,!0),r===i&&this.__appearingContent.push(s),r=s)}}__removeDisappearingContent(){this.__disappearingContent&&ct(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(ct(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,o){if(o)for(let i=o.chain.length-1;i>=e.__divergedChainIndex&&this.__isLatestRender(e);i--){const r=o.chain[i].element;if(r)try{const n=q(e);gt(r.onAfterLeave,[n,{},o.resolver],r)}finally{this.__disappearingContent.indexOf(r)>-1&&ct(r.children)}}}__runOnAfterEnterCallbacks(e){for(let o=e.__divergedChainIndex;o<e.chain.length&&this.__isLatestRender(e);o++){const i=e.chain[o].element||{},r=q(e,e.chain[o].route);gt(i.onAfterEnter,[r,{},e.resolver],i)}}__animateIfNeeded(e){const o=(this.__disappearingContent||[])[0],i=(this.__appearingContent||[])[0],r=[],n=e.chain;let s;for(let l=n.length;l>0;l--)if(n[l-1].route.animate){s=n[l-1].route.animate;break}if(o&&i&&s){const l=Ct(s)&&s.leave||"leaving",a=Ct(s)&&s.enter||"entering";r.push(hi(o,l)),r.push(hi(i,a))}return Promise.all(r).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:o,search:i,hash:r}=e?e.detail:window.location;K(this.__normalizePathname(o))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:o,search:i,hash:r},!0))}static setTriggers(...e){on(e)}urlForName(e,o){return this.__urlForName||(this.__urlForName=tn(this)),ft(this.__urlForName(e,o),this)}urlForPath(e,o){return ft(le.pathToRegexp.compile(e)(o),this)}static go(e){const{pathname:o,search:i,hash:r}=K(e)?this.__createUrl(e,"http://a"):e;return Fe("go",{pathname:o,search:i,hash:r})}}const cn=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,vt=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function hn(){function t(){return!0}return rr(t)}function pn(){try{return un()?!0:mn()?vt?!gn():!hn():!1}catch{return!1}}function un(){return localStorage.getItem("vaadin.developmentmode.force")}function mn(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function gn(){return!!(vt&&Object.keys(vt).map(e=>vt[e]).filter(e=>e.productionMode).length>0)}function rr(t,e){if(typeof t!="function")return;const o=cn.exec(t.toString());if(o)try{t=new Function(o[1])}catch(i){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",i)}return t(e)}window.Vaadin=window.Vaadin||{};const mi=function(t,e){if(window.Vaadin.developmentMode)return rr(t,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=pn());function fn(){}const vn=function(){if(typeof mi=="function")return mi(fn)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});vn();le.NavigationTrigger={POPSTATE:Vr,CLICK:zr};var Gt,$;(function(t){t.CONNECTED="connected",t.LOADING="loading",t.RECONNECTING="reconnecting",t.CONNECTION_LOST="connection-lost"})($||($={}));class yn{constructor(e){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=e,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(o=>{var i;(i=o==null?void 0:o.active)===null||i===void 0||i.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(e){this.stateChangeListeners.add(e)}removeStateChangeListener(e){this.stateChangeListeners.delete(e)}loadingStarted(){this.state=$.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount($.CONNECTED)}loadingFailed(){this.decreaseLoadingCount($.CONNECTION_LOST)}decreaseLoadingCount(e){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=e))}get state(){return this.connectionState}set state(e){if(e!==this.connectionState){const o=this.connectionState;this.connectionState=e,this.loadingCount=0;for(const i of this.stateChangeListeners)i(o,this.connectionState)}}get online(){return this.connectionState===$.CONNECTED||this.connectionState===$.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(e){typeof e.data=="object"&&e.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(e.data.result===!0&&(this.state=$.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const ht=window;!((Gt=ht.Vaadin)===null||Gt===void 0)&&Gt.connectionState||(ht.Vaadin=ht.Vaadin||{},ht.Vaadin.connectionState=new yn(navigator.onLine?$.CONNECTED:$.CONNECTION_LOST));function j(t,e,o,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bn=!1,yt=window,Po=yt.ShadowRoot&&(yt.ShadyCSS===void 0||yt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ro=Symbol(),gi=new WeakMap;class Ao{constructor(e,o,i){if(this._$cssResult$=!0,i!==Ro)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=o}get styleSheet(){let e=this._styleSheet;const o=this._strings;if(Po&&e===void 0){const i=o!==void 0&&o.length===1;i&&(e=gi.get(o)),e===void 0&&((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),i&&gi.set(o,e))}return e}toString(){return this.cssText}}const xn=t=>{if(t._$cssResult$===!0)return t.cssText;if(typeof t=="number")return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},wn=t=>new Ao(typeof t=="string"?t:String(t),void 0,Ro),x=(t,...e)=>{const o=t.length===1?t[0]:e.reduce((i,r,n)=>i+xn(r)+t[n+1],t[0]);return new Ao(o,t,Ro)},_n=(t,e)=>{Po?t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet):e.forEach(o=>{const i=document.createElement("style"),r=yt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=o.cssText,t.appendChild(i)})},Sn=t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return wn(e)},fi=Po||bn?t=>t:t=>t instanceof CSSStyleSheet?Sn(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Kt,Yt,Jt,nr;const Z=window;let sr,de;const vi=Z.trustedTypes,En=vi?vi.emptyScript:"",bt=Z.reactiveElementPolyfillSupportDevMode;{const t=(Kt=Z.litIssuedWarnings)!==null&&Kt!==void 0?Kt:Z.litIssuedWarnings=new Set;de=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))},de("dev-mode","Lit is in dev mode. Not recommended for production!"),!((Yt=Z.ShadyDOM)===null||Yt===void 0)&&Yt.inUse&&bt===void 0&&de("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded."),sr=e=>({then:(o,i)=>{de("request-update-promise",`The \`requestUpdate\` method should no longer return a Promise but does so on \`${e}\`. Use \`updateComplete\` instead.`),o!==void 0&&o(!1)}})}const Xt=t=>{Z.emitLitDebugLogEvents&&Z.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))},ar=(t,e)=>t,_o={toAttribute(t,e){switch(e){case Boolean:t=t?En:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);break}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}break}return o}},lr=(t,e)=>e!==t&&(e===e||t===t),Qt={attribute:!0,type:String,converter:_o,reflect:!1,hasChanged:lr},So="finalized";class ee extends HTMLElement{constructor(){super(),this.__instanceProperties=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this._initialize()}static addInitializer(e){var o;this.finalize(),((o=this._initializers)!==null&&o!==void 0?o:this._initializers=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((o,i)=>{const r=this.__attributeNameForProperty(i,o);r!==void 0&&(this.__attributeToPropertyMap.set(r,i),e.push(r))}),e}static createProperty(e,o=Qt){var i;if(o.state&&(o.attribute=!1),this.finalize(),this.elementProperties.set(e,o),!o.noAccessor&&!this.prototype.hasOwnProperty(e)){const r=typeof e=="symbol"?Symbol():`__${e}`,n=this.getPropertyDescriptor(e,r,o);n!==void 0&&(Object.defineProperty(this.prototype,e,n),this.hasOwnProperty("__reactivePropertyKeys")||(this.__reactivePropertyKeys=new Set((i=this.__reactivePropertyKeys)!==null&&i!==void 0?i:[])),this.__reactivePropertyKeys.add(e))}}static getPropertyDescriptor(e,o,i){return{get(){return this[o]},set(r){const n=this[e];this[o]=r,this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Qt}static finalize(){if(this.hasOwnProperty(So))return!1;this[So]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e._initializers!==void 0&&(this._initializers=[...e._initializers]),this.elementProperties=new Map(e.elementProperties),this.__attributeToPropertyMap=new Map,this.hasOwnProperty(ar("properties"))){const o=this.properties,i=[...Object.getOwnPropertyNames(o),...Object.getOwnPropertySymbols(o)];for(const r of i)this.createProperty(r,o[r])}this.elementStyles=this.finalizeStyles(this.styles);{const o=(i,r=!1)=>{this.prototype.hasOwnProperty(i)&&de(r?"renamed-api":"removed-api",`\`${i}\` is implemented on class ${this.name}. It has been ${r?"renamed":"removed"} in this version of LitElement.`)};o("initialize"),o("requestUpdateInternal"),o("_getUpdateComplete",!0)}return!0}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)o.unshift(fi(r))}else e!==void 0&&o.push(fi(e));return o}static __attributeNameForProperty(e,o){const i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}_initialize(){var e;this.__updatePromise=new Promise(o=>this.enableUpdating=o),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),(e=this.constructor._initializers)===null||e===void 0||e.forEach(o=>o(this))}addController(e){var o,i;((o=this.__controllers)!==null&&o!==void 0?o:this.__controllers=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var o;(o=this.__controllers)===null||o===void 0||o.splice(this.__controllers.indexOf(e)>>>0,1)}__saveInstanceProperties(){this.constructor.elementProperties.forEach((e,o)=>{this.hasOwnProperty(o)&&(this.__instanceProperties.set(o,this[o]),delete this[o])})}createRenderRoot(){var e;const o=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return _n(o,this.constructor.elementStyles),o}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this.__controllers)===null||e===void 0||e.forEach(o=>{var i;return(i=o.hostConnected)===null||i===void 0?void 0:i.call(o)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this.__controllers)===null||e===void 0||e.forEach(o=>{var i;return(i=o.hostDisconnected)===null||i===void 0?void 0:i.call(o)})}attributeChangedCallback(e,o,i){this._$attributeToProperty(e,i)}__propertyToAttribute(e,o,i=Qt){var r;const n=this.constructor.__attributeNameForProperty(e,i);if(n!==void 0&&i.reflect===!0){const l=(((r=i.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?i.converter:_o).toAttribute(o,i.type);this.constructor.enabledWarnings.indexOf("migration")>=0&&l===void 0&&de("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`),this.__reflectingProperty=e,l==null?this.removeAttribute(n):this.setAttribute(n,l),this.__reflectingProperty=null}}_$attributeToProperty(e,o){var i;const r=this.constructor,n=r.__attributeToPropertyMap.get(e);if(n!==void 0&&this.__reflectingProperty!==n){const s=r.getPropertyOptions(n),l=typeof s.converter=="function"?{fromAttribute:s.converter}:((i=s.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?s.converter:_o;this.__reflectingProperty=n,this[n]=l.fromAttribute(o,s.type),this.__reflectingProperty=null}}requestUpdate(e,o,i){let r=!0;return e!==void 0&&(i=i||this.constructor.getPropertyOptions(e),(i.hasChanged||lr)(this[e],o)?(this._$changedProperties.has(e)||this._$changedProperties.set(e,o),i.reflect===!0&&this.__reflectingProperty!==e&&(this.__reflectingProperties===void 0&&(this.__reflectingProperties=new Map),this.__reflectingProperties.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this.__updatePromise=this.__enqueueUpdate()),sr(this.localName)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(o){Promise.reject(o)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e,o;if(!this.isUpdatePending)return;if(Xt==null||Xt({kind:"update"}),!this.hasUpdated){const n=[];if((e=this.constructor.__reactivePropertyKeys)===null||e===void 0||e.forEach(s=>{var l;this.hasOwnProperty(s)&&!(!((l=this.__instanceProperties)===null||l===void 0)&&l.has(s))&&n.push(s)}),n.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${n.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}this.__instanceProperties&&(this.__instanceProperties.forEach((n,s)=>this[s]=n),this.__instanceProperties=void 0);let i=!1;const r=this._$changedProperties;try{i=this.shouldUpdate(r),i?(this.willUpdate(r),(o=this.__controllers)===null||o===void 0||o.forEach(n=>{var s;return(s=n.hostUpdate)===null||s===void 0?void 0:s.call(n)}),this.update(r)):this.__markUpdated()}catch(n){throw i=!1,this.__markUpdated(),n}i&&this._$didUpdate(r)}willUpdate(e){}_$didUpdate(e){var o;(o=this.__controllers)===null||o===void 0||o.forEach(i=>{var r;return(r=i.hostUpdated)===null||r===void 0?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e),this.isUpdatePending&&this.constructor.enabledWarnings.indexOf("change-in-update")>=0&&de("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties!==void 0&&(this.__reflectingProperties.forEach((o,i)=>this.__propertyToAttribute(i,this[i],o)),this.__reflectingProperties=void 0),this.__markUpdated()}updated(e){}firstUpdated(e){}}nr=So;ee[nr]=!0;ee.elementProperties=new Map;ee.elementStyles=[];ee.shadowRootOptions={mode:"open"};bt==null||bt({ReactiveElement:ee});{ee.enabledWarnings=["change-in-update"];const t=function(e){e.hasOwnProperty(ar("enabledWarnings"))||(e.enabledWarnings=e.enabledWarnings.slice())};ee.enableWarning=function(e){t(this),this.enabledWarnings.indexOf(e)<0&&this.enabledWarnings.push(e)},ee.disableWarning=function(e){t(this);const o=this.enabledWarnings.indexOf(e);o>=0&&this.enabledWarnings.splice(o,1)}}((Jt=Z.reactiveElementVersions)!==null&&Jt!==void 0?Jt:Z.reactiveElementVersions=[]).push("1.6.1");Z.reactiveElementVersions.length>1&&de("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Zt,eo,to,oo;const D=window,v=t=>{D.emitLitDebugLogEvents&&D.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))};let Cn=0,kt;(Zt=D.litIssuedWarnings)!==null&&Zt!==void 0||(D.litIssuedWarnings=new Set),kt=(t,e)=>{e+=t?` See https://lit.dev/msg/${t} for more information.`:"",D.litIssuedWarnings.has(e)||(console.warn(e),D.litIssuedWarnings.add(e))},kt("dev-mode","Lit is in dev mode. Not recommended for production!");const B=!((eo=D.ShadyDOM)===null||eo===void 0)&&eo.inUse&&((to=D.ShadyDOM)===null||to===void 0?void 0:to.noPatch)===!0?D.ShadyDOM.wrap:t=>t,Pe=D.trustedTypes,yi=Pe?Pe.createPolicy("lit-html",{createHTML:t=>t}):void 0,kn=t=>t,zt=(t,e,o)=>kn,$n=t=>{if(fe!==zt)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");fe=t},Tn=()=>{fe=zt},Eo=(t,e,o)=>fe(t,e,o),Co="$lit$",ie=`lit$${String(Math.random()).slice(9)}$`,dr="?"+ie,Nn=`<${dr}>`,Re=document,We=()=>Re.createComment(""),qe=t=>t===null||typeof t!="object"&&typeof t!="function",cr=Array.isArray,Pn=t=>cr(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",io=`[ 	
\f\r]`,Rn=`[^ 	
\f\r"'\`<>=]`,An=`[^\\s"'>=/]`,Me=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bi=1,ro=2,In=3,xi=/-->/g,wi=/>/g,ue=new RegExp(`>|${io}(?:(${An}+)(${io}*=${io}*(?:${Rn}|("|')|))|$)`,"g"),On=0,_i=1,Ln=2,Si=3,no=/'/g,so=/"/g,hr=/^(?:script|style|textarea|title)$/i,zn=1,$t=2,Io=1,Tt=2,Mn=3,Vn=4,Dn=5,Oo=6,Un=7,pr=t=>(e,...o)=>(e.some(i=>i===void 0)&&console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`),{_$litType$:t,strings:e,values:o}),f=pr(zn),Ve=pr($t),ge=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),Ei=new WeakMap,$e=Re.createTreeWalker(Re,129,null,!1);let fe=zt;const jn=(t,e)=>{const o=t.length-1,i=[];let r=e===$t?"<svg>":"",n,s=Me;for(let a=0;a<o;a++){const d=t[a];let c=-1,m,h=0,g;for(;h<d.length&&(s.lastIndex=h,g=s.exec(d),g!==null);)if(h=s.lastIndex,s===Me){if(g[bi]==="!--")s=xi;else if(g[bi]!==void 0)s=wi;else if(g[ro]!==void 0)hr.test(g[ro])&&(n=new RegExp(`</${g[ro]}`,"g")),s=ue;else if(g[In]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else s===ue?g[On]===">"?(s=n??Me,c=-1):g[_i]===void 0?c=-2:(c=s.lastIndex-g[Ln].length,m=g[_i],s=g[Si]===void 0?ue:g[Si]==='"'?so:no):s===so||s===no?s=ue:s===xi||s===wi?s=Me:(s=ue,n=void 0);console.assert(c===-1||s===ue||s===no||s===so,"unexpected parse state B");const ne=s===ue&&t[a+1].startsWith("/>")?" ":"";r+=s===Me?d+Nn:c>=0?(i.push(m),d.slice(0,c)+Co+d.slice(c)+ie+ne):d+ie+(c===-2?(i.push(void 0),a):ne)}const l=r+(t[o]||"<?>")+(e===$t?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw")){let a="invalid template strings array";throw a=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.

          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),new Error(a)}return[yi!==void 0?yi.createHTML(l):l,i]};class Ge{constructor({strings:e,["_$litType$"]:o},i){this.parts=[];let r,n=0,s=0;const l=e.length-1,a=this.parts,[d,c]=jn(e,o);if(this.el=Ge.createElement(d,i),$e.currentNode=this.el.content,o===$t){const m=this.el.content,h=m.firstChild;h.remove(),m.append(...h.childNodes)}for(;(r=$e.nextNode())!==null&&a.length<l;){if(r.nodeType===1){{const m=r.localName;if(/^(?:textarea|template)$/i.test(m)&&r.innerHTML.includes(ie)){const h=`Expressions are not supported inside \`${m}\` elements. See https://lit.dev/msg/expression-in-${m} for more information.`;if(m==="template")throw new Error(h);kt("",h)}}if(r.hasAttributes()){const m=[];for(const h of r.getAttributeNames())if(h.endsWith(Co)||h.startsWith(ie)){const g=c[s++];if(m.push(h),g!==void 0){const se=r.getAttribute(g.toLowerCase()+Co).split(ie),te=/([.?@])?(.*)/.exec(g);a.push({type:Io,index:n,name:te[2],strings:se,ctor:te[1]==="."?Bn:te[1]==="?"?Wn:te[1]==="@"?qn:Mt})}else a.push({type:Oo,index:n})}for(const h of m)r.removeAttribute(h)}if(hr.test(r.tagName)){const m=r.textContent.split(ie),h=m.length-1;if(h>0){r.textContent=Pe?Pe.emptyScript:"";for(let g=0;g<h;g++)r.append(m[g],We()),$e.nextNode(),a.push({type:Tt,index:++n});r.append(m[h],We())}}}else if(r.nodeType===8)if(r.data===dr)a.push({type:Tt,index:n});else{let h=-1;for(;(h=r.data.indexOf(ie,h+1))!==-1;)a.push({type:Un,index:n}),h+=ie.length-1}n++}v==null||v({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,o){const i=Re.createElement("template");return i.innerHTML=e,i}}function Ae(t,e,o=t,i){var r,n,s,l;if(e===ge)return e;let a=i!==void 0?(r=o.__directives)===null||r===void 0?void 0:r[i]:o.__directive;const d=qe(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==d&&((n=a==null?void 0:a._$notifyDirectiveConnectionChanged)===null||n===void 0||n.call(a,!1),d===void 0?a=void 0:(a=new d(t),a._$initialize(t,o,i)),i!==void 0?((s=(l=o).__directives)!==null&&s!==void 0?s:l.__directives=[])[i]=a:o.__directive=a),a!==void 0&&(e=Ae(t,a._$resolve(t,e.values),a,i)),e}class Fn{constructor(e,o){this._parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=o}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){var o;const{el:{content:i},parts:r}=this._$template,n=((o=e==null?void 0:e.creationScope)!==null&&o!==void 0?o:Re).importNode(i,!0);$e.currentNode=n;let s=$e.nextNode(),l=0,a=0,d=r[0];for(;d!==void 0;){if(l===d.index){let c;d.type===Tt?c=new tt(s,s.nextSibling,this,e):d.type===Io?c=new d.ctor(s,d.name,d.strings,this,e):d.type===Oo&&(c=new Gn(s,this,e)),this._parts.push(c),d=r[++a]}l!==(d==null?void 0:d.index)&&(s=$e.nextNode(),l++)}return n}_update(e){let o=0;for(const i of this._parts)i!==void 0&&(v==null||v({kind:"set part",part:i,value:e[o],valueIndex:o,values:e,templateInstance:this}),i.strings!==void 0?(i._$setValue(e,i,o),o+=i.strings.length-2):i._$setValue(e[o])),o++}}class tt{constructor(e,o,i,r){var n;this.type=Tt,this._$committedValue=k,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=o,this._$parent=i,this.options=r,this.__isConnected=(n=r==null?void 0:r.isConnected)!==null&&n!==void 0?n:!0,this._textSanitizer=void 0}get _$isConnected(){var e,o;return(o=(e=this._$parent)===null||e===void 0?void 0:e._$isConnected)!==null&&o!==void 0?o:this.__isConnected}get parentNode(){let e=B(this._$startNode).parentNode;const o=this._$parent;return o!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=o.parentNode),e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,o=this){var i;if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=Ae(this,e,o),qe(e))e===k||e==null||e===""?(this._$committedValue!==k&&(v==null||v({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear()),this._$committedValue=k):e!==this._$committedValue&&e!==ge&&this._commitText(e);else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(((i=this.options)===null||i===void 0?void 0:i.host)===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else Pn(e)?this._commitIterable(e):this._commitText(e)}_insert(e){return B(B(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){var o;if(this._$committedValue!==e){if(this._$clear(),fe!==zt){const i=(o=this._$startNode.parentNode)===null||o===void 0?void 0:o.nodeName;if(i==="STYLE"||i==="SCRIPT"){let r="Forbidden";throw i==="STYLE"?r="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.":r="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.",new Error(r)}}v==null||v({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==k&&qe(this._$committedValue)){const o=B(this._$startNode).nextSibling;this._textSanitizer===void 0&&(this._textSanitizer=Eo(o,"data","property")),e=this._textSanitizer(e),v==null||v({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}else{const o=Re.createTextNode("");this._commitNode(o),this._textSanitizer===void 0&&(this._textSanitizer=Eo(o,"data","property")),e=this._textSanitizer(e),v==null||v({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}this._$committedValue=e}_commitTemplateResult(e){var o;const{values:i,["_$litType$"]:r}=e,n=typeof r=="number"?this._$getTemplate(e):(r.el===void 0&&(r.el=Ge.createElement(r.h,this.options)),r);if(((o=this._$committedValue)===null||o===void 0?void 0:o._$template)===n)v==null||v({kind:"template updating",template:n,instance:this._$committedValue,parts:this._$committedValue._parts,options:this.options,values:i}),this._$committedValue._update(i);else{const s=new Fn(n,this),l=s._clone(this.options);v==null||v({kind:"template instantiated",template:n,instance:s,parts:s._parts,options:this.options,fragment:l,values:i}),s._update(i),v==null||v({kind:"template instantiated and updated",template:n,instance:s,parts:s._parts,options:this.options,fragment:l,values:i}),this._commitNode(l),this._$committedValue=s}}_$getTemplate(e){let o=Ei.get(e.strings);return o===void 0&&Ei.set(e.strings,o=new Ge(e)),o}_commitIterable(e){cr(this._$committedValue)||(this._$committedValue=[],this._$clear());const o=this._$committedValue;let i=0,r;for(const n of e)i===o.length?o.push(r=new tt(this._insert(We()),this._insert(We()),this,this.options)):r=o[i],r._$setValue(n),i++;i<o.length&&(this._$clear(r&&B(r._$endNode).nextSibling,i),o.length=i)}_$clear(e=B(this._$startNode).nextSibling,o){var i;for((i=this._$notifyConnectionChanged)===null||i===void 0||i.call(this,!1,!0,o);e&&e!==this._$endNode;){const r=B(e).nextSibling;B(e).remove(),e=r}}setConnected(e){var o;if(this._$parent===void 0)this.__isConnected=e,(o=this._$notifyConnectionChanged)===null||o===void 0||o.call(this,e);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}}class Mt{constructor(e,o,i,r,n){this.type=Io,this._$committedValue=k,this._$disconnectableChildren=void 0,this.element=e,this.name=o,this._$parent=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$committedValue=new Array(i.length-1).fill(new String),this.strings=i):this._$committedValue=k,this._sanitizer=void 0}get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e,o=this,i,r){const n=this.strings;let s=!1;if(n===void 0)e=Ae(this,e,o,0),s=!qe(e)||e!==this._$committedValue&&e!==ge,s&&(this._$committedValue=e);else{const l=e;e=n[0];let a,d;for(a=0;a<n.length-1;a++)d=Ae(this,l[i+a],o,a),d===ge&&(d=this._$committedValue[a]),s||(s=!qe(d)||d!==this._$committedValue[a]),d===k?e=k:e!==k&&(e+=(d??"")+n[a+1]),this._$committedValue[a]=d}s&&!r&&this._commitValue(e)}_commitValue(e){e===k?B(this.element).removeAttribute(this.name):(this._sanitizer===void 0&&(this._sanitizer=fe(this.element,this.name,"attribute")),e=this._sanitizer(e??""),v==null||v({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),B(this.element).setAttribute(this.name,e??""))}}class Bn extends Mt{constructor(){super(...arguments),this.type=Mn}_commitValue(e){this._sanitizer===void 0&&(this._sanitizer=fe(this.element,this.name,"property")),e=this._sanitizer(e),v==null||v({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===k?void 0:e}}const Hn=Pe?Pe.emptyScript:"";class Wn extends Mt{constructor(){super(...arguments),this.type=Vn}_commitValue(e){v==null||v({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==k),options:this.options}),e&&e!==k?B(this.element).setAttribute(this.name,Hn):B(this.element).removeAttribute(this.name)}}class qn extends Mt{constructor(e,o,i,r,n){if(super(e,o,i,r,n),this.type=Dn,this.strings!==void 0)throw new Error(`A \`<${e.localName}>\` has a \`@${o}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,o=this){var i;if(e=(i=Ae(this,e,o,0))!==null&&i!==void 0?i:k,e===ge)return;const r=this._$committedValue,n=e===k&&r!==k||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==k&&(r===k||n);v==null||v({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:n,addListener:s,oldListener:r}),n&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$committedValue=e}handleEvent(e){var o,i;typeof this._$committedValue=="function"?this._$committedValue.call((i=(o=this.options)===null||o===void 0?void 0:o.host)!==null&&i!==void 0?i:this.element,e):this._$committedValue.handleEvent(e)}}class Gn{constructor(e,o,i){this.element=e,this.type=Oo,this._$disconnectableChildren=void 0,this._$parent=o,this.options=i}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){v==null||v({kind:"commit to element binding",element:this.element,value:e,options:this.options}),Ae(this,e)}}const ao=D.litHtmlPolyfillSupportDevMode;ao==null||ao(Ge,tt);((oo=D.litHtmlVersions)!==null&&oo!==void 0?oo:D.litHtmlVersions=[]).push("2.7.0");D.litHtmlVersions.length>1&&kt("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");const Te=(t,e,o)=>{var i,r;if(e==null)throw new TypeError(`The container to render into may not be ${e}`);const n=Cn++,s=(i=o==null?void 0:o.renderBefore)!==null&&i!==void 0?i:e;let l=s._$litPart$;if(v==null||v({kind:"begin render",id:n,value:t,container:e,options:o,part:l}),l===void 0){const a=(r=o==null?void 0:o.renderBefore)!==null&&r!==void 0?r:null;s._$litPart$=l=new tt(e.insertBefore(We(),a),a,void 0,o??{})}return l._$setValue(t),v==null||v({kind:"end render",id:n,value:t,container:e,options:o,part:l}),l};Te.setSanitizer=$n,Te.createSanitizer=Eo,Te._testOnlyClearSanitizerFactoryDoNotCallOrElse=Tn;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var lo,co,ho;let Lo;{const t=(lo=globalThis.litIssuedWarnings)!==null&&lo!==void 0?lo:globalThis.litIssuedWarnings=new Set;Lo=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))}}class I extends ee{constructor(){super(...arguments),this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){var e,o;const i=super.createRenderRoot();return(e=(o=this.renderOptions).renderBefore)!==null&&e!==void 0||(o.renderBefore=i.firstChild),i}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.__childPart=Te(o,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.__childPart)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.__childPart)===null||e===void 0||e.setConnected(!1)}render(){return ge}}I.finalized=!0;I._$litElement$=!0;(co=globalThis.litElementHydrateSupport)===null||co===void 0||co.call(globalThis,{LitElement:I});const po=globalThis.litElementPolyfillSupportDevMode;po==null||po({LitElement:I});I.finalize=function(){if(!ee.finalize.call(this))return!1;const e=(o,i,r=!1)=>{if(o.hasOwnProperty(i)){const n=(typeof o=="function"?o:o.constructor).name;Lo(r?"renamed-api":"removed-api",`\`${i}\` is implemented on class ${n}. It has been ${r?"renamed":"removed"} in this version of LitElement.`)}};return e(this,"render"),e(this,"getStyles",!0),e(this.prototype,"adoptStyles"),!0};((ho=globalThis.litElementVersions)!==null&&ho!==void 0?ho:globalThis.litElementVersions=[]).push("3.3.0");globalThis.litElementVersions.length>1&&Lo("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Kn=(t,e)=>(customElements.define(t,e),e),Yn=(t,e)=>{const{kind:o,elements:i}=e;return{kind:o,elements:i,finisher(r){customElements.define(t,r)}}},W=t=>e=>typeof e=="function"?Kn(t,e):Yn(t,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jn=(t,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(o){o.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(o){o.createProperty(e.key,t)}},Xn=(t,e,o)=>{e.constructor.createProperty(o,t)};function y(t){return(e,o)=>o!==void 0?Xn(t,e,o):Jn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function T(t){return y({...t,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qn=({finisher:t,descriptor:e})=>(o,i)=>{var r;if(i!==void 0){const n=o.constructor;e!==void 0&&Object.defineProperty(o,i,e(i)),t==null||t(n,i)}else{const n=(r=o.originalKey)!==null&&r!==void 0?r:o.key,s=e!=null?{kind:"method",placement:"prototype",key:n,descriptor:e(o.key)}:{...o,key:n};return t!=null&&(s.finisher=function(l){t(l,n)}),s}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ot(t,e){return Qn({descriptor:o=>{const i={get(){var r,n;return(n=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(t))!==null&&n!==void 0?n:null},enumerable:!0,configurable:!0};if(e){const r=typeof o=="symbol"?Symbol():`__${o}`;i.get=function(){var n,s;return this[r]===void 0&&(this[r]=(s=(n=this.renderRoot)===null||n===void 0?void 0:n.querySelector(t))!==null&&s!==void 0?s:null),this[r]}}return i}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var uo;const Zn=window;((uo=Zn.HTMLSlotElement)===null||uo===void 0?void 0:uo.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const es={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ts=t=>(...e)=>({_$litDirective$:t,values:e});class os{constructor(e){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(e,o,i){this.__part=e,this._$parent=o,this.__attributeIndex=i}_$resolve(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class is extends os{constructor(e){var o;if(super(e),e.type!==es.ATTRIBUTE||e.name!=="class"||((o=e.strings)===null||o===void 0?void 0:o.length)>2)throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(o=>e[o]).join(" ")+" "}update(e,[o]){var i,r;if(this._previousClasses===void 0){this._previousClasses=new Set,e.strings!==void 0&&(this._staticClasses=new Set(e.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in o)o[s]&&!(!((i=this._staticClasses)===null||i===void 0)&&i.has(s))&&this._previousClasses.add(s);return this.render(o)}const n=e.element.classList;this._previousClasses.forEach(s=>{s in o||(n.remove(s),this._previousClasses.delete(s))});for(const s in o){const l=!!o[s];l!==this._previousClasses.has(s)&&!(!((r=this._staticClasses)===null||r===void 0)&&r.has(s))&&(l?(n.add(s),this._previousClasses.add(s)):(n.remove(s),this._previousClasses.delete(s)))}return ge}}const zo=ts(is),mo="css-loading-indicator";var G;(function(t){t.IDLE="",t.FIRST="first",t.SECOND="second",t.THIRD="third"})(G||(G={}));class R extends I{constructor(){super(),this.firstDelay=300,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=G.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=$.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}static create(){var e,o;const i=window;return!((e=i.Vaadin)===null||e===void 0)&&e.connectionIndicator||(i.Vaadin=i.Vaadin||{},i.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(i.Vaadin.connectionIndicator)),(o=i.Vaadin)===null||o===void 0?void 0:o.connectionIndicator}render(){return f`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${zo({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var e;super.connectedCallback();const o=window;!((e=o.Vaadin)===null||e===void 0)&&e.connectionState&&(this.connectionStateStore=o.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(e){e!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=e,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var e;const o=(e=this.connectionStateStore)===null||e===void 0?void 0:e.state;return this.offline=o===$.CONNECTION_LOST,this.reconnecting=o===$.RECONNECTING,this.updateLoading(o===$.LOADING),this.loading?!1:o!==this.lastMessageState?(this.lastMessageState=o,!0):!1}updateLoading(e){this.loading=e,this.loadingBarState=G.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,e,()=>{this.loadingBarState=G.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,e,()=>{this.loadingBarState=G.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,e,()=>{this.loadingBarState=G.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(mo)){const e=document.createElement("style");e.id=mo,e.textContent=this.getDefaultStyle(),document.head.appendChild(e)}}else{const e=document.getElementById(mo);e&&document.head.removeChild(e)}}getDefaultStyle(){return`
      @keyframes v-progress-start {
        0% {
          width: 0%;
        }
        100% {
          width: 50%;
        }
      }
      @keyframes v-progress-delay {
        0% {
          width: 50%;
        }
        100% {
          width: 90%;
        }
      }
      @keyframes v-progress-wait {
        0% {
          width: 90%;
          height: 4px;
        }
        3% {
          width: 91%;
          height: 7px;
        }
        100% {
          width: 96%;
          height: 7px;
        }
      }
      @keyframes v-progress-wait-pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 1;
        }
      }
      .v-loading-indicator,
      .v-status-message {
        position: fixed;
        z-index: 251;
        left: 0;
        right: auto;
        top: 0;
        background-color: var(--lumo-primary-color, var(--material-primary-color, blue));
        transition: none;
      }
      .v-loading-indicator {
        width: 50%;
        height: 4px;
        opacity: 1;
        pointer-events: none;
        animation: v-progress-start 1000ms 200ms both;
      }
      .v-loading-indicator[style*='none'] {
        display: block !important;
        width: 100%;
        opacity: 0;
        animation: none;
        transition: opacity 500ms 300ms, width 300ms;
      }
      .v-loading-indicator.second {
        width: 90%;
        animation: v-progress-delay 3.8s forwards;
      }
      .v-loading-indicator.third {
        width: 96%;
        animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;
      }

      vaadin-connection-indicator[offline] .v-loading-indicator,
      vaadin-connection-indicator[reconnecting] .v-loading-indicator {
        display: none;
      }

      .v-status-message {
        opacity: 0;
        width: 100%;
        max-height: var(--status-height-collapsed, 8px);
        overflow: hidden;
        background-color: var(--status-bg-color-online, var(--lumo-primary-color, var(--material-primary-color, blue)));
        color: var(
          --status-text-color-online,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        transition: all 0.5s;
        padding: 0 0.5em;
      }

      vaadin-connection-indicator[offline] .v-status-message,
      vaadin-connection-indicator[reconnecting] .v-status-message {
        opacity: 1;
        background-color: var(--status-bg-color-offline, var(--lumo-shade, #333));
        color: var(
          --status-text-color-offline,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        background-image: repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      vaadin-connection-indicator[reconnecting] .v-status-message {
        animation: show-reconnecting-status 2s;
      }

      vaadin-connection-indicator[offline] .v-status-message:hover,
      vaadin-connection-indicator[reconnecting] .v-status-message:hover,
      vaadin-connection-indicator[expanded] .v-status-message {
        max-height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[expanded] .v-status-message {
        opacity: 1;
      }

      .v-status-message span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[reconnecting] .v-status-message span::before {
        content: '';
        width: 1em;
        height: 1em;
        border-top: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-left: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: v-spin 0.4s linear infinite;
        margin: 0 0.5em;
      }

      @keyframes v-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `}getLoadingBarStyle(){switch(this.loadingBarState){case G.IDLE:return"display: none";case G.FIRST:case G.SECOND:case G.THIRD:return"display: block";default:return""}}timeoutFor(e,o,i,r){return e!==0&&window.clearTimeout(e),o?window.setTimeout(i,r):0}static get instance(){return R.create()}}j([y({type:Number})],R.prototype,"firstDelay",void 0);j([y({type:Number})],R.prototype,"secondDelay",void 0);j([y({type:Number})],R.prototype,"thirdDelay",void 0);j([y({type:Number})],R.prototype,"expandedDuration",void 0);j([y({type:String})],R.prototype,"onlineText",void 0);j([y({type:String})],R.prototype,"offlineText",void 0);j([y({type:String})],R.prototype,"reconnectingText",void 0);j([y({type:Boolean,reflect:!0})],R.prototype,"offline",void 0);j([y({type:Boolean,reflect:!0})],R.prototype,"reconnecting",void 0);j([y({type:Boolean,reflect:!0})],R.prototype,"expanded",void 0);j([y({type:Boolean,reflect:!0})],R.prototype,"loading",void 0);j([y({type:String})],R.prototype,"loadingBarState",void 0);j([y({type:Boolean})],R.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",R);R.instance;const Ke=window;Ke.Vaadin=Ke.Vaadin||{};Ke.Vaadin.registrations=Ke.Vaadin.registrations||[];Ke.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.17"});class Ci extends Error{}const De=window.document.body,_=window;class rs{constructor(e){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,De.$=De.$||[],this.config=e||{},_.Vaadin=_.Vaadin||{},_.Vaadin.Flow=_.Vaadin.Flow||{},_.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const o=document.head.querySelector("base");this.baseRegex=new RegExp(`^${(document.baseURI||o&&o.href||"/").replace(/^https?:\/\/[^/]+/i,"")}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,_.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,_.Vaadin.connectionState.loadingFinished()}get action(){return async e=>{if(this.pathname=e.pathname,_.Vaadin.connectionState.online)try{await this.flowInit()}catch(o){if(o instanceof Ci)return _.Vaadin.connectionState.state=$.CONNECTION_LOST,this.offlineStubAction();throw o}else return this.offlineStubAction();return this.container.onBeforeEnter=(o,i)=>this.flowNavigate(o,i),this.container.onBeforeLeave=(o,i)=>this.flowLeave(o,i),this.container}}async flowLeave(e,o){const{connectionState:i}=_.Vaadin;return this.pathname===e.pathname||!this.isFlowClientLoaded()||i.offline?Promise.resolve({}):new Promise(r=>{this.loadingStarted(),this.container.serverConnected=n=>{r(o&&n?o.prevent():{}),this.loadingFinished()},De.$server.leaveNavigation(this.getFlowRoutePath(e),this.getFlowRouteQuery(e))})}async flowNavigate(e,o){return this.response?new Promise(i=>{this.loadingStarted(),this.container.serverConnected=(r,n)=>{o&&r?i(o.prevent()):o&&o.redirect&&n?i(o.redirect(n.pathname)):(this.container.style.display="",i(this.container)),this.loadingFinished()},De.$server.connectClient(this.container.localName,this.container.id,this.getFlowRoutePath(e),this.getFlowRouteQuery(e),this.appShellTitle,history.state)}):Promise.resolve(this.container)}getFlowRoutePath(e){return decodeURIComponent(e.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(e){return e.search&&e.search.substring(1)||""}async flowInit(e=!1){if(!this.isFlowClientLoaded()){this.loadingStarted(),this.response=await this.flowInitUi(e),this.response.appConfig.clientRouting=!e;const{pushScript:o,appConfig:i}=this.response;typeof o=="string"&&await this.loadScript(o);const{appId:r}=i;await(await C(()=>import("./FlowBootstrap-feff2646.js"),[],import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(r),await this.config.imports());const s=await C(()=>import("./FlowClient-c1f52f13.js"),[],import.meta.url);if(await this.flowInitClient(s),!e){const l=`flow-container-${r.toLowerCase()}`;this.container=document.createElement(l),De.$[r]=this.container,this.container.id=r}this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(e){return new Promise((o,i)=>{const r=document.createElement("script");r.onload=()=>o(),r.onerror=i,r.src=e,document.body.appendChild(r)})}injectAppIdScript(e){const o=e.substring(0,e.lastIndexOf("-")),i=document.createElement("script");i.type="module",i.setAttribute("data-app-id",o),document.body.append(i)}async flowInitClient(e){return e.init(),new Promise(o=>{const i=setInterval(()=>{Object.keys(_.Vaadin.Flow.clients).filter(n=>n!=="TypeScript").reduce((n,s)=>n||_.Vaadin.Flow.clients[s].isActive(),!1)||(clearInterval(i),o())},5)})}async flowInitUi(e){const o=_.Vaadin&&_.Vaadin.TypeScript&&_.Vaadin.TypeScript.initial;return o?(_.Vaadin.TypeScript.initial=void 0,Promise.resolve(o)):new Promise((i,r)=>{const s=new XMLHttpRequest,l=e?"&serverSideRouting":"",a=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}${l}`;s.open("GET",a),s.onerror=()=>r(new Ci(`Invalid server response when initializing Flow UI.
        ${s.status}
        ${s.responseText}`)),s.onload=()=>{const d=s.getResponseHeader("content-type");d&&d.indexOf("application/json")!==-1?i(JSON.parse(s.responseText)):s.onerror()},s.send()})}addConnectionIndicator(){R.create(),_.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){_.Vaadin.connectionState.state=$.RECONNECTING;const e=new XMLHttpRequest;e.open("HEAD","sw.js"),e.onload=()=>{_.Vaadin.connectionState.state=$.CONNECTED},e.onerror=()=>{_.Vaadin.connectionState.state=$.CONNECTION_LOST},setTimeout(()=>e.send(),50)}}),_.addEventListener("offline",()=>{this.isFlowClientLoaded()||(_.Vaadin.connectionState.state=$.CONNECTION_LOST)})}async offlineStubAction(){const e=document.createElement("iframe"),o="./offline-stub.html";e.setAttribute("src",o),e.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let i;const r=()=>{i!==void 0&&(_.Vaadin.connectionState.removeStateChangeListener(i),i=void 0)};return e.onBeforeEnter=(n,s,l)=>{i=()=>{_.Vaadin.connectionState.online&&(r(),l.render(n,!1))},_.Vaadin.connectionState.addStateChangeListener(i)},e.onBeforeLeave=(n,s,l)=>{r()},e}isFlowClientLoaded(){return this.response!==void 0}}const{serverSideRoutes:ns}=new rs({imports:()=>C(()=>import("./generated-flow-imports-0c5060ef.js"),[],import.meta.url)}),ss=[...ns],as=new le(document.querySelector("#outlet"));as.setRoutes(ss);(function(){if(typeof document>"u"||"adoptedStyleSheets"in document)return;var t="ShadyCSS"in window&&!ShadyCSS.nativeShadow,e=document.implementation.createHTMLDocument(""),o=new WeakMap,i=typeof DOMException=="object"?Error:DOMException,r=Object.defineProperty,n=Array.prototype.forEach,s=/@import.+?;?$/gm;function l(p){var u=p.replace(s,"");return u!==p&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),u.trim()}function a(p){return"isConnected"in p?p.isConnected:document.contains(p)}function d(p){return p.filter(function(u,b){return p.indexOf(u)===b})}function c(p,u){return p.filter(function(b){return u.indexOf(b)===-1})}function m(p){p.parentNode.removeChild(p)}function h(p){return p.shadowRoot||o.get(p)}var g=["addRule","deleteRule","insertRule","removeRule"],ne=CSSStyleSheet,se=ne.prototype;se.replace=function(){return Promise.reject(new i("Can't call replace on non-constructed CSSStyleSheets."))},se.replaceSync=function(){throw new i("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};function te(p){return typeof p=="object"?xe.isPrototypeOf(p)||se.isPrototypeOf(p):!1}function jt(p){return typeof p=="object"?se.isPrototypeOf(p):!1}var F=new WeakMap,X=new WeakMap,ye=new WeakMap,be=new WeakMap;function Ft(p,u){var b=document.createElement("style");return ye.get(p).set(u,b),X.get(p).push(u),b}function oe(p,u){return ye.get(p).get(u)}function nt(p,u){ye.get(p).delete(u),X.set(p,X.get(p).filter(function(b){return b!==u}))}function qo(p,u){requestAnimationFrame(function(){u.textContent=F.get(p).textContent,be.get(p).forEach(function(b){return u.sheet[b.method].apply(u.sheet,b.args)})})}function st(p){if(!F.has(p))throw new TypeError("Illegal invocation")}function Bt(){var p=this,u=document.createElement("style");e.body.appendChild(u),F.set(p,u),X.set(p,[]),ye.set(p,new WeakMap),be.set(p,[])}var xe=Bt.prototype;xe.replace=function(u){try{return this.replaceSync(u),Promise.resolve(this)}catch(b){return Promise.reject(b)}},xe.replaceSync=function(u){if(st(this),typeof u=="string"){var b=this;F.get(b).textContent=l(u),be.set(b,[]),X.get(b).forEach(function(L){L.isConnected()&&qo(b,oe(b,L))})}},r(xe,"cssRules",{configurable:!0,enumerable:!0,get:function(){return st(this),F.get(this).sheet.cssRules}}),r(xe,"media",{configurable:!0,enumerable:!0,get:function(){return st(this),F.get(this).sheet.media}}),g.forEach(function(p){xe[p]=function(){var u=this;st(u);var b=arguments;be.get(u).push({method:p,args:b}),X.get(u).forEach(function(V){if(V.isConnected()){var A=oe(u,V).sheet;A[p].apply(A,b)}});var L=F.get(u).sheet;return L[p].apply(L,b)}}),r(Bt,Symbol.hasInstance,{configurable:!0,value:te});var Go={childList:!0,subtree:!0},Ko=new WeakMap;function we(p){var u=Ko.get(p);return u||(u=new Xo(p),Ko.set(p,u)),u}function Yo(p){r(p.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return we(this).sheets},set:function(u){we(this).update(u)}})}function Ht(p,u){for(var b=document.createNodeIterator(p,NodeFilter.SHOW_ELEMENT,function(V){return h(V)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),L=void 0;L=b.nextNode();)u(h(L))}var at=new WeakMap,_e=new WeakMap,lt=new WeakMap;function Nr(p,u){return u instanceof HTMLStyleElement&&_e.get(p).some(function(b){return oe(b,p)})}function Jo(p){var u=at.get(p);return u instanceof Document?u.body:u}function Wt(p){var u=document.createDocumentFragment(),b=_e.get(p),L=lt.get(p),V=Jo(p);L.disconnect(),b.forEach(function(A){u.appendChild(oe(A,p)||Ft(A,p))}),V.insertBefore(u,null),L.observe(V,Go),b.forEach(function(A){qo(A,oe(A,p))})}function Xo(p){var u=this;u.sheets=[],at.set(u,p),_e.set(u,[]),lt.set(u,new MutationObserver(function(b,L){if(!document){L.disconnect();return}b.forEach(function(V){t||n.call(V.addedNodes,function(A){A instanceof Element&&Ht(A,function(Se){we(Se).connect()})}),n.call(V.removedNodes,function(A){A instanceof Element&&(Nr(u,A)&&Wt(u),t||Ht(A,function(Se){we(Se).disconnect()}))})})}))}if(Xo.prototype={isConnected:function(){var p=at.get(this);return p instanceof Document?p.readyState!=="loading":a(p.host)},connect:function(){var p=Jo(this);lt.get(this).observe(p,Go),_e.get(this).length>0&&Wt(this),Ht(p,function(u){we(u).connect()})},disconnect:function(){lt.get(this).disconnect()},update:function(p){var u=this,b=at.get(u)===document?"Document":"ShadowRoot";if(!Array.isArray(p))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Iterator getter is not callable.");if(!p.every(te))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Failed to convert value to 'CSSStyleSheet'");if(p.some(jt))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Can't adopt non-constructed stylesheets");u.sheets=p;var L=_e.get(u),V=d(p),A=c(L,V);A.forEach(function(Se){m(oe(Se,u)),nt(Se,u)}),_e.set(u,V),u.isConnected()&&V.length>0&&Wt(u)}},window.CSSStyleSheet=Bt,Yo(Document),"ShadowRoot"in window){Yo(ShadowRoot);var Qo=Element.prototype,Pr=Qo.attachShadow;Qo.attachShadow=function(u){var b=Pr.call(this,u);return u.mode==="closed"&&o.set(this,b),b}}var dt=we(document);dt.isConnected()?dt.connect():document.addEventListener("DOMContentLoaded",dt.connect.bind(dt))})();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ur=Symbol.for(""),ls=t=>{if((t==null?void 0:t.r)===ur)return t==null?void 0:t._$litStatic$},ds=t=>{if(t._$litStatic$!==void 0)return t._$litStatic$;throw new Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)},pt=(t,...e)=>({_$litStatic$:e.reduce((o,i,r)=>o+ds(i)+t[r+1],t[0]),r:ur}),ki=new Map,cs=t=>(e,...o)=>{const i=o.length;let r,n;const s=[],l=[];let a=0,d=!1,c;for(;a<i;){for(c=e[a];a<i&&(n=o[a],(r=ls(n))!==void 0);)c+=r+e[++a],d=!0;l.push(n),s.push(c),a++}if(a===i&&s.push(e[i]),d){const m=s.join("$$lit$$");e=ki.get(m),e===void 0&&(s.raw=s,ki.set(m,e=s)),o=l}return t(e,...o)},hs=cs(f),ps="modulepreload",us=function(t){return"/"+t},$i={},E=function(t,e,o){if(!e||e.length===0)return t();const i=document.getElementsByTagName("link");return Promise.all(e.map(r=>{if(r=us(r),r in $i)return;$i[r]=!0;const n=r.endsWith(".css"),s=n?'[rel="stylesheet"]':"";if(o)for(let a=i.length-1;a>=0;a--){const d=i[a];if(d.href===r&&(!n||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${s}`))return;const l=document.createElement("link");if(l.rel=n?"stylesheet":ps,n||(l.as="script",l.crossOrigin=""),l.href=r,document.head.appendChild(l),n)return new Promise((a,d)=>{l.addEventListener("load",a),l.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>t())},ms=(t,e)=>{const o=t[e];return o?typeof o=="function"?o():Promise.resolve(o):new Promise((i,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+e)))})};var P=(t=>(t.text="text",t.checkbox="checkbox",t.range="range",t.color="color",t))(P||{});const J={lumoSize:["--lumo-size-xs","--lumo-size-s","--lumo-size-m","--lumo-size-l","--lumo-size-xl"],lumoSpace:["--lumo-space-xs","--lumo-space-s","--lumo-space-m","--lumo-space-l","--lumo-space-xl"],lumoBorderRadius:["0","--lumo-border-radius-m","--lumo-border-radius-l"],lumoFontSize:["--lumo-font-size-xxs","--lumo-font-size-xs","--lumo-font-size-s","--lumo-font-size-m","--lumo-font-size-l","--lumo-font-size-xl","--lumo-font-size-xxl","--lumo-font-size-xxxl"],lumoTextColor:["--lumo-header-text-color","--lumo-body-text-color","--lumo-secondary-text-color","--lumo-tertiary-text-color","--lumo-disabled-text-color","--lumo-primary-text-color","--lumo-error-text-color","--lumo-success-text-color"],basicBorderSize:["0px","1px","2px","3px"]},gs=Object.freeze(Object.defineProperty({__proto__:null,presets:J},Symbol.toStringTag,{value:"Module"})),je={textColor:{propertyName:"color",displayName:"Text color",editorType:P.color,presets:J.lumoTextColor},fontSize:{propertyName:"font-size",displayName:"Font size",editorType:P.range,presets:J.lumoFontSize,icon:"font"},fontWeight:{propertyName:"font-weight",displayName:"Bold",editorType:P.checkbox,checkedValue:"bold"},fontStyle:{propertyName:"font-style",displayName:"Italic",editorType:P.checkbox,checkedValue:"italic"}},Ce={backgroundColor:{propertyName:"background-color",displayName:"Background color",editorType:P.color},borderColor:{propertyName:"border-color",displayName:"Border color",editorType:P.color},borderWidth:{propertyName:"border-width",displayName:"Border width",editorType:P.range,presets:J.basicBorderSize,icon:"square"},borderRadius:{propertyName:"border-radius",displayName:"Border radius",editorType:P.range,presets:J.lumoBorderRadius,icon:"square"},padding:{propertyName:"padding",displayName:"Padding",editorType:P.range,presets:J.lumoSpace,icon:"square"},gap:{propertyName:"gap",displayName:"Spacing",editorType:P.range,presets:J.lumoSpace,icon:"square"}},fs={height:{propertyName:"height",displayName:"Size",editorType:P.range,presets:J.lumoSize,icon:"square"},paddingInline:{propertyName:"padding-inline",displayName:"Padding",editorType:P.range,presets:J.lumoSpace,icon:"square"}},vs={iconColor:{propertyName:"color",displayName:"Icon color",editorType:P.color,presets:J.lumoTextColor},iconSize:{propertyName:"font-size",displayName:"Icon size",editorType:P.range,presets:J.lumoFontSize,icon:"font"}},ys=Object.freeze(Object.defineProperty({__proto__:null,fieldProperties:fs,iconProperties:vs,shapeProperties:Ce,textProperties:je},Symbol.toStringTag,{value:"Module"}));function mr(t){const e=t.charAt(0).toUpperCase()+t.slice(1);return{tagName:t,displayName:e,elements:[{selector:t,displayName:"Element",properties:[Ce.backgroundColor,Ce.borderColor,Ce.borderWidth,Ce.borderRadius,Ce.padding,je.textColor,je.fontSize,je.fontWeight,je.fontStyle]}]}}const bs=Object.freeze(Object.defineProperty({__proto__:null,createGenericMetadata:mr},Symbol.toStringTag,{value:"Module"})),xs=t=>ms(Object.assign({"./components/defaults.ts":()=>E(()=>Promise.resolve().then(()=>ys),void 0),"./components/generic.ts":()=>E(()=>Promise.resolve().then(()=>bs),void 0),"./components/presets.ts":()=>E(()=>Promise.resolve().then(()=>gs),void 0),"./components/vaadin-app-layout.ts":()=>E(()=>C(()=>import("./vaadin-app-layout-37492a04-83387fe8.js"),[],import.meta.url),[]),"./components/vaadin-avatar.ts":()=>E(()=>C(()=>import("./vaadin-avatar-32f38e18-8cb19c7b.js"),[],import.meta.url),[]),"./components/vaadin-big-decimal-field.ts":()=>E(()=>C(()=>import("./vaadin-big-decimal-field-b42c1de1-4fc995ee.js"),["./vaadin-big-decimal-field-b42c1de1-4fc995ee.js","./vaadin-text-field-e82c445d-a290b0bc.js"],import.meta.url),["assets/vaadin-big-decimal-field-b42c1de1.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-button.ts":()=>E(()=>C(()=>import("./vaadin-button-ebf88059-e1b90281.js"),[],import.meta.url),[]),"./components/vaadin-checkbox.ts":()=>E(()=>C(()=>import("./vaadin-checkbox-2ee310ff-4007ae59.js"),[],import.meta.url),[]),"./components/vaadin-email-field.ts":()=>E(()=>C(()=>import("./vaadin-email-field-da851bcb-7fc9e974.js"),["./vaadin-email-field-da851bcb-7fc9e974.js","./vaadin-text-field-e82c445d-a290b0bc.js"],import.meta.url),["assets/vaadin-email-field-da851bcb.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-horizontal-layout.ts":()=>E(()=>C(()=>import("./vaadin-horizontal-layout-f7b1ab51-59b9e66c.js"),[],import.meta.url),[]),"./components/vaadin-integer-field.ts":()=>E(()=>C(()=>import("./vaadin-integer-field-6e2954cf-079025db.js"),["./vaadin-integer-field-6e2954cf-079025db.js","./vaadin-text-field-e82c445d-a290b0bc.js"],import.meta.url),["assets/vaadin-integer-field-6e2954cf.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-menu-bar.ts":()=>E(()=>C(()=>import("./vaadin-menu-bar-a127a585-94252cc6.js"),[],import.meta.url),[]),"./components/vaadin-number-field.ts":()=>E(()=>C(()=>import("./vaadin-number-field-31df11f5-907bae42.js"),["./vaadin-number-field-31df11f5-907bae42.js","./vaadin-text-field-e82c445d-a290b0bc.js"],import.meta.url),["assets/vaadin-number-field-31df11f5.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-password-field.ts":()=>E(()=>C(()=>import("./vaadin-password-field-49ffb113-41350f9e.js"),["./vaadin-password-field-49ffb113-41350f9e.js","./vaadin-text-field-e82c445d-a290b0bc.js"],import.meta.url),["assets/vaadin-password-field-49ffb113.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-progress-bar.ts":()=>E(()=>C(()=>import("./vaadin-progress-bar-7f2aaca8-d502ff18.js"),[],import.meta.url),[]),"./components/vaadin-scroller.ts":()=>E(()=>C(()=>import("./vaadin-scroller-35e68818-d0b7effa.js"),[],import.meta.url),[]),"./components/vaadin-select.ts":()=>E(()=>C(()=>import("./vaadin-select-a27177f4-1029be5b.js"),[],import.meta.url),[]),"./components/vaadin-split-layout.ts":()=>E(()=>C(()=>import("./vaadin-split-layout-10c9713b-d1f073e1.js"),[],import.meta.url),[]),"./components/vaadin-text-area.ts":()=>E(()=>C(()=>import("./vaadin-text-area-41c5f60c-0271a7b6.js"),["./vaadin-text-area-41c5f60c-0271a7b6.js","./vaadin-text-field-e82c445d-a290b0bc.js"],import.meta.url),["assets/vaadin-text-area-41c5f60c.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-text-field.ts":()=>E(()=>C(()=>import("./vaadin-text-field-e82c445d-a290b0bc.js"),[],import.meta.url),[]),"./components/vaadin-vertical-layout.ts":()=>E(()=>C(()=>import("./vaadin-vertical-layout-ff73c403-268347ce.js"),[],import.meta.url),[]),"./components/vaadin-virtual-list.ts":()=>E(()=>C(()=>import("./vaadin-virtual-list-62d4499a-eed061fa.js"),[],import.meta.url),[])}),`./components/${t}.ts`);class ws{constructor(e=xs){this.loader=e,this.metadata={}}async getMetadata(e){var o;const i=(o=e.element)==null?void 0:o.localName;if(!i)return null;if(!i.startsWith("vaadin-"))return mr(i);let r=this.metadata[i];if(r)return r;try{r=(await this.loader(i)).default,this.metadata[i]=r}catch{console.warn(`Failed to load metadata for component: ${i}`)}return r||null}}const _s=new ws,xt={crosshair:Ve`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
   <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
   <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
   <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
   <path d="M9 12l6 0"></path>
   <path d="M12 9l0 6"></path>
</svg>`,square:Ve`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
</svg>`,font:Ve`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 20l3 0"></path>
   <path d="M14 20l7 0"></path>
   <path d="M6.9 15l6.9 0"></path>
   <path d="M10.2 6.3l5.8 13.7"></path>
   <path d="M5 20l6 -16l2 0l7 16"></path>
</svg>`,undo:Ve`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"></path>
</svg>`,redo:Ve`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M15 13l4 -4l-4 -4m4 4h-11a4 4 0 0 0 0 8h1"></path>
</svg>`};var Ye=(t=>(t.disabled="disabled",t.enabled="enabled",t.missing_theme="missing_theme",t))(Ye||{}),U=(t=>(t.local="local",t.global="global",t))(U||{});function Ti(t,e){return`${t}|${e}`}class ce{constructor(e){this._properties={},this._metadata=e}get metadata(){return this._metadata}get properties(){return Object.values(this._properties)}getPropertyValue(e,o){return this._properties[Ti(e,o)]||null}updatePropertyValue(e,o,i,r){let n=this.getPropertyValue(e,o);n?(n.value=i,n.modified=r||!1):(n={elementSelector:e,propertyName:o,value:i,modified:r||!1},this._properties[Ti(e,o)]=n)}addPropertyValues(e){e.forEach(o=>{this.updatePropertyValue(o.elementSelector,o.propertyName,o.value,o.modified)})}getPropertyValuesForElement(e){return this.properties.filter(o=>o.elementSelector===e)}static combine(...e){if(e.length<2)throw new Error("Must provide at least two themes");const o=new ce(e[0].metadata);return e.forEach(i=>o.addPropertyValues(i.properties)),o}static fromServerRules(e,o,i){const r=new ce(e);return e.elements.forEach(n=>{const s=Je(n,o),l=i.find(a=>a.selector===s);l&&n.properties.forEach(a=>{const d=l.properties[a.propertyName];d&&r.updatePropertyValue(n.selector,a.propertyName,d,!0)})}),r}}function Je(t,e){const o=t.selector;if(e.themeScope==="global")return o;if(!e.localClassName)throw new Error("Can not build local scoped selector without instance class name");const i=o.match(/^[\w\d-_]+/),r=i&&i[0];if(!r)throw new Error(`Selector does not start with a tag name: ${o}`);return`${r}.${e.localClassName}${o.substring(r.length,o.length)}`}function Ss(t,e,o,i){const r=Je(t,e),n={[o]:i};return o==="border-width"&&parseInt(i)>0&&(n["border-style"]="solid"),{selector:r,properties:n}}let ut,Ni="";function Mo(t){ut||(ut=new CSSStyleSheet,document.adoptedStyleSheets=[...document.adoptedStyleSheets,ut]),Ni+=t.cssText,ut.replaceSync(Ni)}const gr=x`
  .editor-row {
    display: flex;
    align-items: baseline;
    padding: var(--theme-editor-section-horizontal-padding);
    gap: 10px;
  }

  .editor-row > .label {
    flex: 0 0 auto;
    width: 120px;
  }

  .editor-row > .editor {
    flex: 1 1 0;
  }

  .editor-row .input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.25rem 0.375rem;
    color: inherit;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;
    border: none;
  }
`,Pi="__vaadin-theme-editor-measure-element",Ri=/((::before)|(::after))$/,Ai=/::part\(([\w\d_-]+)\)$/;Mo(x`
  .__vaadin-theme-editor-measure-element {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
  }
`);async function Es(t){const e=new ce(t),o=document.createElement(t.tagName);o.classList.add(Pi),document.body.append(o),t.setupElement&&await t.setupElement(o);const i={themeScope:U.local,localClassName:Pi};try{t.elements.forEach(r=>{let n=Je(r,i);const s=n.match(Ri);n=n.replace(Ri,"");const l=n.match(Ai),a=n.replace(Ai,"");let d=document.querySelector(a);if(d&&l){const h=`[part~="${l[1]}"]`;d=d.shadowRoot.querySelector(h)}if(!d)return;const c=s?s[1]:null,m=getComputedStyle(d,c);r.properties.forEach(h=>{const g=m.getPropertyValue(h.propertyName);e.updatePropertyValue(r.selector,h.propertyName,g)})})}finally{try{t.cleanupElement&&await t.cleanupElement(o)}finally{o.remove()}}return e}function Ii(t){return t.trim()}function Cs(t){const e=t.element;if(!e)return null;const o=e.querySelector("label");if(o&&o.textContent)return Ii(o.textContent);const i=e.textContent;return i?Ii(i):null}class ks{constructor(){this._localClassNameMap=new Map}get stylesheet(){return this.ensureStylesheet(),this._stylesheet}update(e){this.ensureStylesheet(),this._stylesheet.replaceSync(e)}previewLocalClassName(e,o){if(!e)return;const i=this._localClassNameMap.get(e);i&&e.classList.remove(i),o?(e.classList.add(o),this._localClassNameMap.set(e,o)):this._localClassNameMap.delete(e)}ensureStylesheet(){this._stylesheet||(this._stylesheet=new CSSStyleSheet,this._stylesheet.replaceSync(""),document.adoptedStyleSheets=[...document.adoptedStyleSheets,this._stylesheet])}}const Ee=new ks;class $s{constructor(e){this.pendingRequests={},this.requestCounter=0,this.globalUiId=this.getGlobalUiId(),this.wrappedConnection=e;const o=this.wrappedConnection.onMessage;this.wrappedConnection.onMessage=i=>{i.command==="themeEditorResponse"?this.handleResponse(i.data):o.call(this.wrappedConnection,i)}}sendRequest(e,o){const i=(this.requestCounter++).toString(),r=o.uiId??this.globalUiId;return new Promise((n,s)=>{this.wrappedConnection.send(e,{...o,requestId:i,uiId:r}),this.pendingRequests[i]={resolve:n,reject:s}})}handleResponse(e){const o=this.pendingRequests[e.requestId];if(!o){console.warn("Received response for unknown request");return}delete this.pendingRequests[e.requestId],e.code==="ok"?o.resolve(e):o.reject(e)}loadComponentMetadata(e){return this.sendRequest("themeEditorComponentMetadata",{nodeId:e.nodeId})}setLocalClassName(e,o){return this.sendRequest("themeEditorLocalClassName",{nodeId:e.nodeId,className:o})}setCssRules(e){return this.sendRequest("themeEditorRules",{rules:e})}loadPreview(){return this.sendRequest("themeEditorLoadPreview",{})}loadRules(e){return this.sendRequest("themeEditorLoadRules",{selectors:e})}undo(e){return this.sendRequest("themeEditorHistory",{undo:e})}redo(e){return this.sendRequest("themeEditorHistory",{redo:e})}openCss(e){return this.sendRequest("themeEditorOpenCss",{selector:e})}getGlobalUiId(){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,i=Object.keys(o);for(const r of i){const n=o[r];if(n.getNodeId)return n.getUIId()}}return-1}}const O={index:-1,entries:[]};class Ts{constructor(e){this.api=e}get allowUndo(){return O.index>=0}get allowRedo(){return O.index<O.entries.length-1}get allowedActions(){return{allowUndo:this.allowUndo,allowRedo:this.allowRedo}}push(e,o,i){const r={requestId:e,execute:o,rollback:i};if(O.index++,O.entries=O.entries.slice(0,O.index),O.entries.push(r),o)try{o()}catch(n){console.error("Execute history entry failed",n)}return this.allowedActions}async undo(){if(!this.allowUndo)return this.allowedActions;const e=O.entries[O.index];O.index--;try{await this.api.undo(e.requestId),e.rollback&&e.rollback()}catch(o){console.error("Undo failed",o)}return this.allowedActions}async redo(){if(!this.allowRedo)return this.allowedActions;O.index++;const e=O.entries[O.index];try{await this.api.redo(e.requestId),e.execute&&e.execute()}catch(o){console.error("Redo failed",o)}return this.allowedActions}static clear(){O.entries=[],O.index=-1}}var Ns=Object.defineProperty,Ps=Object.getOwnPropertyDescriptor,Vt=(t,e,o,i)=>{for(var r=i>1?void 0:i?Ps(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&Ns(e,o,r),r};class Rs extends CustomEvent{constructor(e){super("class-name-change",{detail:{value:e}})}}let Xe=class extends I{constructor(){super(...arguments),this.editedClassName="",this.invalid=!1}static get styles(){return[gr,x`
        .editor-row {
          padding-top: 0;
        }

        .editor-row .editor .error {
          display: inline-block;
          color: var(--dev-tools-red-color);
          margin-top: 4px;
        }
      `]}update(t){super.update(t),t.has("className")&&(this.editedClassName=this.className,this.invalid=!1)}render(){return f` <div class="editor-row local-class-name">
      <div class="label">CSS class name</div>
      <div class="editor">
        <input class="input" type="text" .value=${this.editedClassName} @change=${this.handleInputChange} />
        ${this.invalid?f`<br /><span class="error">Please enter a valid CSS class name</span>`:null}
      </div>
    </div>`}handleInputChange(t){const e=t.target;this.editedClassName=e.value;const o=/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;this.invalid=!this.editedClassName.match(o),!this.invalid&&this.editedClassName!==this.className&&this.dispatchEvent(new Rs(this.editedClassName))}};Vt([y({})],Xe.prototype,"className",2);Vt([T()],Xe.prototype,"editedClassName",2);Vt([T()],Xe.prototype,"invalid",2);Xe=Vt([W("vaadin-dev-tools-theme-class-name-editor")],Xe);var As=Object.defineProperty,Is=Object.getOwnPropertyDescriptor,Dt=(t,e,o,i)=>{for(var r=i>1?void 0:i?Is(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&As(e,o,r),r};class Os extends CustomEvent{constructor(e){super("scope-change",{detail:{value:e}})}}Mo(x`
  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] {
    --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
    z-index: 100000;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector']::part(overlay) {
    background: #333;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item {
    color: rgba(255, 255, 255, 0.8);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(content) {
    font-size: 13px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item .title {
    color: rgba(255, 255, 255, 0.95);
    font-weight: bold;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark) {
    margin: 6px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark)::before {
    color: rgba(255, 255, 255, 0.95);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`);let Qe=class extends I{constructor(){super(...arguments),this.value=U.local}static get styles(){return x`
      vaadin-select {
        --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
        width: 100px;
      }

      vaadin-select::part(input-field) {
        background: rgba(0, 0, 0, 0.2);
      }

      vaadin-select vaadin-select-value-button,
      vaadin-select::part(toggle-button) {
        color: var(--dev-tools-text-color);
      }

      vaadin-select:hover vaadin-select-value-button,
      vaadin-select:hover::part(toggle-button) {
        color: var(--dev-tools-text-color-emphasis);
      }

      vaadin-select vaadin-select-item {
        font-size: 13px;
      }
    `}update(t){var e;super.update(t),t.has("metadata")&&((e=this.select)==null||e.requestContentUpdate())}render(){return f` <vaadin-select
      theme="small vaadin-dev-tools-theme-scope-selector"
      .value=${this.value}
      .renderer=${this.selectRenderer.bind(this)}
      @value-changed=${this.handleValueChange}
    ></vaadin-select>`}selectRenderer(t){var e;const o=((e=this.metadata)==null?void 0:e.displayName)||"Component",i=`${o}s`;Te(f`
        <vaadin-list-box>
          <vaadin-item value=${U.local} label="Local">
            <span class="title">Local</span>
            <br />
            <span>Edit styles for this ${o}</span>
          </vaadin-item>
          <vaadin-item value=${U.global} label="Global">
            <span class="title">Global</span>
            <br />
            <span>Edit styles for all ${i}</span>
          </vaadin-item>
        </vaadin-list-box>
      `,t)}handleValueChange(t){const e=t.detail.value;e!==this.value&&this.dispatchEvent(new Os(e))}};Dt([y({})],Qe.prototype,"value",2);Dt([y({})],Qe.prototype,"metadata",2);Dt([ot("vaadin-select")],Qe.prototype,"select",2);Qe=Dt([W("vaadin-dev-tools-theme-scope-selector")],Qe);var Ls=Object.defineProperty,zs=Object.getOwnPropertyDescriptor,it=(t,e,o,i)=>{for(var r=i>1?void 0:i?zs(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&Ls(e,o,r),r};class Ms extends CustomEvent{constructor(e,o,i){super("theme-property-value-change",{bubbles:!0,composed:!0,detail:{element:e,property:o,value:i}})}}class H extends I{constructor(){super(...arguments),this.value=""}static get styles(){return[gr,x`
        :host {
          display: block;
        }

        .editor-row .label .modified {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: orange;
          border-radius: 3px;
          margin-left: 3px;
        }
      `]}update(e){super.update(e),(e.has("propertyMetadata")||e.has("theme"))&&this.updateValueFromTheme()}render(){var e;return f`
      <div class="editor-row">
        <div class="label">
          ${this.propertyMetadata.displayName}
          ${(e=this.propertyValue)!=null&&e.modified?f`<span class="modified"></span>`:null}
        </div>
        <div class="editor">${this.renderEditor()}</div>
      </div>
    `}updateValueFromTheme(){var e;this.propertyValue=this.theme.getPropertyValue(this.elementMetadata.selector,this.propertyMetadata.propertyName),this.value=((e=this.propertyValue)==null?void 0:e.value)||""}dispatchChange(e){this.dispatchEvent(new Ms(this.elementMetadata,this.propertyMetadata,e))}}it([y({})],H.prototype,"elementMetadata",2);it([y({})],H.prototype,"propertyMetadata",2);it([y({})],H.prototype,"theme",2);it([T()],H.prototype,"propertyValue",2);it([T()],H.prototype,"value",2);class Nt{constructor(e){if(this._values=[],this._rawValues={},e){const o=e.propertyName,i=e.presets??[];this._values=(i||[]).map(n=>n.startsWith("--")?`var(${n})`:n);const r=document.createElement("div");r.style.borderStyle="solid",r.style.visibility="hidden",document.body.append(r);try{this._values.forEach(n=>{r.style.setProperty(o,n);const s=getComputedStyle(r);this._rawValues[n]=s.getPropertyValue(o).trim()})}finally{r.remove()}}}get values(){return this._values}get rawValues(){return this._rawValues}tryMapToRawValue(e){return this._rawValues[e]??e}tryMapToPreset(e){return this.findPreset(e)??e}findPreset(e){const o=e&&e.trim();return this.values.find(i=>this._rawValues[i]===o)}}var Vs=Object.defineProperty,Ds=Object.getOwnPropertyDescriptor,Us=(t,e,o,i)=>{for(var r=i>1?void 0:i?Ds(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&Vs(e,o,r),r};let Oi=class extends H{static get styles(){return[H.styles,x`
        .editor-row {
          align-items: center;
        }
      `]}handleInputChange(t){const e=t.target.checked?this.propertyMetadata.checkedValue:"";this.dispatchChange(e||"")}renderEditor(){const t=this.value===this.propertyMetadata.checkedValue;return f` <input type="checkbox" .checked=${t} @change=${this.handleInputChange} /> `}};Oi=Us([W("vaadin-dev-tools-theme-checkbox-property-editor")],Oi);var js=Object.defineProperty,Fs=Object.getOwnPropertyDescriptor,Bs=(t,e,o,i)=>{for(var r=i>1?void 0:i?Fs(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&js(e,o,r),r};let Li=class extends H{handleInputChange(t){const e=t.target;this.dispatchChange(e.value)}renderEditor(){return f` <input class="input" .value=${this.value} @change=${this.handleInputChange} /> `}};Li=Bs([W("vaadin-dev-tools-theme-text-property-editor")],Li);var Hs=Object.defineProperty,Ws=Object.getOwnPropertyDescriptor,Vo=(t,e,o,i)=>{for(var r=i>1?void 0:i?Ws(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&Hs(e,o,r),r};let Pt=class extends H{constructor(){super(...arguments),this.selectedPresetIndex=-1,this.presets=new Nt}static get styles(){return[H.styles,x`
        :host {
          --preset-count: 3;
          --slider-bg: #fff;
          --slider-border: #333;
        }

        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .editor-row .input {
          flex: 0 0 auto;
          width: 80px;
        }

        .slider-wrapper {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: #aaa;
        }

        .icon.prefix > svg {
          transform: scale(0.75);
        }

        .slider {
          flex: 1 1 0;
          -webkit-appearance: none;
          background: linear-gradient(to right, #666, #666 2px, transparent 2px);
          background-size: calc((100% - 13px) / (var(--preset-count) - 1)) 8px;
          background-position: 5px 50%;
          background-repeat: repeat-x;
        }

        .slider::-webkit-slider-runnable-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-moz-range-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .custom-value {
          opacity: 0.5;
        }

        .custom-value:hover,
        .custom-value:focus-within {
          opacity: 1;
        }

        .custom-value:not(:hover, :focus-within) {
          --slider-bg: #333;
          --slider-border: #666;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new Nt(this.propertyMetadata)),super.update(t)}renderEditor(){const t={"slider-wrapper":!0,"custom-value":this.selectedPresetIndex<0},e=this.propertyMetadata.icon,o=e?xt[e]:null,i=this.presets.values.length;return f`
      <div class=${zo(t)}>
        ${o?f` <div class="icon prefix">${o}</div>`:null}
        <input
          type="range"
          class="slider"
          style="--preset-count: ${i}"
          step="1"
          min="0"
          .max=${(i-1).toString()}
          .value=${this.selectedPresetIndex}
          @input=${this.handleSliderInput}
          @change=${this.handleSliderChange}
        />
        ${o?f` <div class="icon suffix">${o}</div>`:null}
      </div>
      <input type="text" class="input" .value=${this.value} @change=${this.handleValueChange} />
    `}handleSliderInput(t){const e=t.target,o=parseInt(e.value),i=this.presets.values[o];this.selectedPresetIndex=o,this.value=this.presets.rawValues[i]}handleSliderChange(){this.dispatchChange(this.value)}handleValueChange(t){const e=t.target;this.value=e.value,this.updateSliderValue(),this.dispatchChange(this.value)}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||""),this.updateSliderValue()}updateSliderValue(){const t=this.presets.findPreset(this.value);this.selectedPresetIndex=t?this.presets.values.indexOf(t):-1}};Vo([T()],Pt.prototype,"selectedPresetIndex",2);Vo([T()],Pt.prototype,"presets",2);Pt=Vo([W("vaadin-dev-tools-theme-range-property-editor")],Pt);const Ie=(t,e=0,o=1)=>t>o?o:t<e?e:t,M=(t,e=0,o=Math.pow(10,e))=>Math.round(o*t)/o,fr=({h:t,s:e,v:o,a:i})=>{const r=(200-e)*o/100;return{h:M(t),s:M(r>0&&r<200?e*o/100/(r<=100?r:200-r)*100:0),l:M(r/2),a:M(i,2)}},ko=t=>{const{h:e,s:o,l:i}=fr(t);return`hsl(${e}, ${o}%, ${i}%)`},go=t=>{const{h:e,s:o,l:i,a:r}=fr(t);return`hsla(${e}, ${o}%, ${i}%, ${r})`},qs=({h:t,s:e,v:o,a:i})=>{t=t/360*6,e=e/100,o=o/100;const r=Math.floor(t),n=o*(1-e),s=o*(1-(t-r)*e),l=o*(1-(1-t+r)*e),a=r%6;return{r:M([o,s,n,n,l,o][a]*255),g:M([l,o,o,s,n,n][a]*255),b:M([n,n,l,o,o,s][a]*255),a:M(i,2)}},Gs=t=>{const{r:e,g:o,b:i,a:r}=qs(t);return`rgba(${e}, ${o}, ${i}, ${r})`},Ks=t=>{const e=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(t);return e?Ys({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):{h:0,s:0,v:0,a:1}},Ys=({r:t,g:e,b:o,a:i})=>{const r=Math.max(t,e,o),n=r-Math.min(t,e,o),s=n?r===t?(e-o)/n:r===e?2+(o-t)/n:4+(t-e)/n:0;return{h:M(60*(s<0?s+6:s)),s:M(r?n/r*100:0),v:M(r/255*100),a:i}},Js=(t,e)=>{if(t===e)return!0;for(const o in t)if(t[o]!==e[o])return!1;return!0},Xs=(t,e)=>t.replace(/\s/g,"")===e.replace(/\s/g,""),zi={},vr=t=>{let e=zi[t];return e||(e=document.createElement("template"),e.innerHTML=t,zi[t]=e),e},Do=(t,e,o)=>{t.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:o}))};let Ne=!1;const $o=t=>"touches"in t,Qs=t=>Ne&&!$o(t)?!1:(Ne||(Ne=$o(t)),!0),Mi=(t,e)=>{const o=$o(e)?e.touches[0]:e,i=t.el.getBoundingClientRect();Do(t.el,"move",t.getMove({x:Ie((o.pageX-(i.left+window.pageXOffset))/i.width),y:Ie((o.pageY-(i.top+window.pageYOffset))/i.height)}))},Zs=(t,e)=>{const o=e.keyCode;o>40||t.xy&&o<37||o<33||(e.preventDefault(),Do(t.el,"move",t.getMove({x:o===39?.01:o===37?-.01:o===34?.05:o===33?-.05:o===35?1:o===36?-1:0,y:o===40?.01:o===38?-.01:0},!0)))};class Uo{constructor(e,o,i,r){const n=vr(`<div role="slider" tabindex="0" part="${o}" ${i}><div part="${o}-pointer"></div></div>`);e.appendChild(n.content.cloneNode(!0));const s=e.querySelector(`[part=${o}]`);s.addEventListener("mousedown",this),s.addEventListener("touchstart",this),s.addEventListener("keydown",this),this.el=s,this.xy=r,this.nodes=[s.firstChild,s]}set dragging(e){const o=e?document.addEventListener:document.removeEventListener;o(Ne?"touchmove":"mousemove",this),o(Ne?"touchend":"mouseup",this)}handleEvent(e){switch(e.type){case"mousedown":case"touchstart":if(e.preventDefault(),!Qs(e)||!Ne&&e.button!=0)return;this.el.focus(),Mi(this,e),this.dragging=!0;break;case"mousemove":case"touchmove":e.preventDefault(),Mi(this,e);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":Zs(this,e);break}}style(e){e.forEach((o,i)=>{for(const r in o)this.nodes[i].style.setProperty(r,o[r])})}}class ea extends Uo{constructor(e){super(e,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:e}){this.h=e,this.style([{left:`${e/360*100}%`,color:ko({h:e,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${M(e)}`)}getMove(e,o){return{h:o?Ie(this.h+e.x*360,0,360):360*e.x}}}class ta extends Uo{constructor(e){super(e,"saturation",'aria-label="Color"',!0)}update(e){this.hsva=e,this.style([{top:`${100-e.v}%`,left:`${e.s}%`,color:ko(e)},{"background-color":ko({h:e.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${M(e.s)}%, Brightness ${M(e.v)}%`)}getMove(e,o){return{s:o?Ie(this.hsva.s+e.x*100,0,100):e.x*100,v:o?Ie(this.hsva.v-e.y*100,0,100):Math.round(100-e.y*100)}}}const oa=':host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}',ia="[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}",ra="[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}",mt=Symbol("same"),fo=Symbol("color"),Vi=Symbol("hsva"),vo=Symbol("update"),Di=Symbol("parts"),Rt=Symbol("css"),At=Symbol("sliders");let na=class extends HTMLElement{static get observedAttributes(){return["color"]}get[Rt](){return[oa,ia,ra]}get[At](){return[ta,ea]}get color(){return this[fo]}set color(t){if(!this[mt](t)){const e=this.colorModel.toHsva(t);this[vo](e),this[fo]=t}}constructor(){super();const t=vr(`<style>${this[Rt].join("")}</style>`),e=this.attachShadow({mode:"open"});e.appendChild(t.content.cloneNode(!0)),e.addEventListener("move",this),this[Di]=this[At].map(o=>new o(e))}connectedCallback(){if(this.hasOwnProperty("color")){const t=this.color;delete this.color,this.color=t}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(t,e,o){const i=this.colorModel.fromAttr(o);this[mt](i)||(this.color=i)}handleEvent(t){const e=this[Vi],o={...e,...t.detail};this[vo](o);let i;!Js(o,e)&&!this[mt](i=this.colorModel.fromHsva(o))&&(this[fo]=i,Do(this,"color-changed",{value:i}))}[mt](t){return this.color&&this.colorModel.equal(t,this.color)}[vo](t){this[Vi]=t,this[Di].forEach(e=>e.update(t))}};class sa extends Uo{constructor(e){super(e,"alpha",'aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"',!1)}update(e){this.hsva=e;const o=go({...e,a:0}),i=go({...e,a:1}),r=e.a*100;this.style([{left:`${r}%`,color:go(e)},{"--gradient":`linear-gradient(90deg, ${o}, ${i}`}]);const n=M(r);this.el.setAttribute("aria-valuenow",`${n}`),this.el.setAttribute("aria-valuetext",`${n}%`)}getMove(e,o){return{a:o?Ie(this.hsva.a+e.x):e.x}}}const aa=`[part=alpha]{flex:0 0 24px}[part=alpha]::after{display:block;content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-radius:inherit;background-image:var(--gradient);box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part^=alpha]{background-color:#fff;background-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')}[part=alpha-pointer]{top:50%}`;class la extends na{get[Rt](){return[...super[Rt],aa]}get[At](){return[...super[At],sa]}}const da={defaultColor:"rgba(0, 0, 0, 1)",toHsva:Ks,fromHsva:Gs,equal:Xs,fromAttr:t=>t};class ca extends la{get colorModel(){return da}}/**
* @license
* Copyright (c) 2017 - 2023 Vaadin Ltd.
* This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/function ha(t){const e=[];for(;t;){if(t.nodeType===Node.DOCUMENT_NODE){e.push(t);break}if(t.nodeType===Node.DOCUMENT_FRAGMENT_NODE){e.push(t),t=t.host;continue}if(t.assignedSlot){t=t.assignedSlot;continue}t=t.parentNode}return e}const yo={start:"top",end:"bottom"},bo={start:"left",end:"right"},Ui=new ResizeObserver(t=>{setTimeout(()=>{t.forEach(e=>{e.target.__overlay&&e.target.__overlay._updatePosition()})})}),pa=t=>class extends t{static get properties(){return{positionTarget:{type:Object,value:null},horizontalAlign:{type:String,value:"start"},verticalAlign:{type:String,value:"top"},noHorizontalOverlap:{type:Boolean,value:!1},noVerticalOverlap:{type:Boolean,value:!1},requiredVerticalSpace:{type:Number,value:0}}}static get observers(){return["__positionSettingsChanged(horizontalAlign, verticalAlign, noHorizontalOverlap, noVerticalOverlap, requiredVerticalSpace)","__overlayOpenedChanged(opened, positionTarget)"]}constructor(){super(),this.__onScroll=this.__onScroll.bind(this),this._updatePosition=this._updatePosition.bind(this)}connectedCallback(){super.connectedCallback(),this.opened&&this.__addUpdatePositionEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.__removeUpdatePositionEventListeners()}__addUpdatePositionEventListeners(){window.addEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes=ha(this.positionTarget),this.__positionTargetAncestorRootNodes.forEach(e=>{e.addEventListener("scroll",this.__onScroll,!0)})}__removeUpdatePositionEventListeners(){window.removeEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes&&(this.__positionTargetAncestorRootNodes.forEach(e=>{e.removeEventListener("scroll",this.__onScroll,!0)}),this.__positionTargetAncestorRootNodes=null)}__overlayOpenedChanged(e,o){if(this.__removeUpdatePositionEventListeners(),o&&(o.__overlay=null,Ui.unobserve(o),e&&(this.__addUpdatePositionEventListeners(),o.__overlay=this,Ui.observe(o))),e){const i=getComputedStyle(this);this.__margins||(this.__margins={},["top","bottom","left","right"].forEach(r=>{this.__margins[r]=parseInt(i[r],10)})),this.setAttribute("dir",i.direction),this._updatePosition(),requestAnimationFrame(()=>this._updatePosition())}}__positionSettingsChanged(){this._updatePosition()}__onScroll(e){this.contains(e.target)||this._updatePosition()}_updatePosition(){if(!this.positionTarget||!this.opened)return;const e=this.positionTarget.getBoundingClientRect(),o=this.__shouldAlignStartVertically(e);this.style.justifyContent=o?"flex-start":"flex-end";const i=this.__isRTL,r=this.__shouldAlignStartHorizontally(e,i),n=!i&&r||i&&!r;this.style.alignItems=n?"flex-start":"flex-end";const s=this.getBoundingClientRect(),l=this.__calculatePositionInOneDimension(e,s,this.noVerticalOverlap,yo,this,o),a=this.__calculatePositionInOneDimension(e,s,this.noHorizontalOverlap,bo,this,r);Object.assign(this.style,l,a),this.toggleAttribute("bottom-aligned",!o),this.toggleAttribute("top-aligned",o),this.toggleAttribute("end-aligned",!n),this.toggleAttribute("start-aligned",n)}__shouldAlignStartHorizontally(e,o){const i=Math.max(this.__oldContentWidth||0,this.$.overlay.offsetWidth);this.__oldContentWidth=this.$.overlay.offsetWidth;const r=Math.min(window.innerWidth,document.documentElement.clientWidth),n=!o&&this.horizontalAlign==="start"||o&&this.horizontalAlign==="end";return this.__shouldAlignStart(e,i,r,this.__margins,n,this.noHorizontalOverlap,bo)}__shouldAlignStartVertically(e){const o=this.requiredVerticalSpace||Math.max(this.__oldContentHeight||0,this.$.overlay.offsetHeight);this.__oldContentHeight=this.$.overlay.offsetHeight;const i=Math.min(window.innerHeight,document.documentElement.clientHeight),r=this.verticalAlign==="top";return this.__shouldAlignStart(e,o,i,this.__margins,r,this.noVerticalOverlap,yo)}__shouldAlignStart(e,o,i,r,n,s,l){const a=i-e[s?l.end:l.start]-r[l.end],d=e[s?l.start:l.end]-r[l.start],c=n?a:d,m=c>(n?d:a)||c>o;return n===m}__adjustBottomProperty(e,o,i){let r;if(e===o.end){if(o.end===yo.end){const n=Math.min(window.innerHeight,document.documentElement.clientHeight);if(i>n&&this.__oldViewportHeight){const s=this.__oldViewportHeight-n;r=i-s}this.__oldViewportHeight=n}if(o.end===bo.end){const n=Math.min(window.innerWidth,document.documentElement.clientWidth);if(i>n&&this.__oldViewportWidth){const s=this.__oldViewportWidth-n;r=i-s}this.__oldViewportWidth=n}}return r}__calculatePositionInOneDimension(e,o,i,r,n,s){const l=s?r.start:r.end,a=s?r.end:r.start,d=parseFloat(n.style[l]||getComputedStyle(n)[l]),c=this.__adjustBottomProperty(l,r,d),m=o[s?r.start:r.end]-e[i===s?r.end:r.start],h=c?`${c}px`:`${d+m*(s?-1:1)}px`;return{[l]:h,[a]:""}}};var ua=Object.defineProperty,ma=Object.getOwnPropertyDescriptor,ve=(t,e,o,i)=>{for(var r=i>1?void 0:i?ma(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&ua(e,o,r),r};class ga extends CustomEvent{constructor(e){super("color-picker-change",{detail:{value:e}})}}const yr=x`
  :host {
    --preview-size: 24px;
    --preview-color: rgba(0, 0, 0, 0);
  }

  .preview {
    --preview-bg-size: calc(var(--preview-size) / 2);
    --preview-bg-pos: calc(var(--preview-size) / 4);

    width: var(--preview-size);
    height: var(--preview-size);
    padding: 0;
    position: relative;
    overflow: hidden;
    background: none;
    border: solid 2px #888;
    border-radius: 4px;
    box-sizing: content-box;
  }

  .preview::before,
  .preview::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .preview::before {
    content: '';
    background: white;
    background-image: linear-gradient(45deg, #666 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #666 75%), linear-gradient(45deg, transparent 75%, #666 75%),
      linear-gradient(45deg, #666 25%, transparent 25%);
    background-size: var(--preview-bg-size) var(--preview-bg-size);
    background-position: 0 0, 0 0, calc(var(--preview-bg-pos) * -1) calc(var(--preview-bg-pos) * -1),
      var(--preview-bg-pos) var(--preview-bg-pos);
  }

  .preview::after {
    content: '';
    background-color: var(--preview-color);
  }
`;let Ze=class extends I{constructor(){super(...arguments),this.commitValue=!1}static get styles(){return[yr,x`
        #toggle {
          display: block;
        }
      `]}update(t){super.update(t),t.has("value")&&this.overlay&&this.overlay.requestContentUpdate()}firstUpdated(){this.overlay=document.createElement("vaadin-dev-tools-color-picker-overlay"),this.overlay.renderer=this.renderOverlayContent.bind(this),this.overlay.positionTarget=this.toggle,this.overlay.noVerticalOverlap=!0,this.overlay.addEventListener("vaadin-overlay-escape-press",this.handleOverlayEscape.bind(this)),this.overlay.addEventListener("vaadin-overlay-close",this.handleOverlayClose.bind(this)),this.append(this.overlay)}render(){const t=this.value||"rgba(0, 0, 0, 0)";return f` <button
      id="toggle"
      class="preview"
      style="--preview-color: ${t}"
      @click=${this.open}
    ></button>`}open(){this.commitValue=!1,this.overlay.opened=!0,this.overlay.style.zIndex="1000000";const t=this.overlay.shadowRoot.querySelector('[part="overlay"]');t.style.background="#333"}renderOverlayContent(t){const e=getComputedStyle(this.toggle,"::after").getPropertyValue("background-color");Te(f` <div>
        <vaadin-dev-tools-color-picker-overlay-content
          .value=${e}
          .presets=${this.presets}
          @color-changed=${this.handleColorChange.bind(this)}
        ></vaadin-dev-tools-color-picker-overlay-content>
      </div>`,t)}handleColorChange(t){this.commitValue=!0,this.dispatchEvent(new ga(t.detail.value)),t.detail.close&&(this.overlay.opened=!1,this.handleOverlayClose())}handleOverlayEscape(){this.commitValue=!1}handleOverlayClose(){const t=this.commitValue?"color-picker-commit":"color-picker-cancel";this.dispatchEvent(new CustomEvent(t))}};ve([y({})],Ze.prototype,"value",2);ve([y({})],Ze.prototype,"presets",2);ve([ot("#toggle")],Ze.prototype,"toggle",2);Ze=ve([W("vaadin-dev-tools-color-picker")],Ze);let It=class extends I{static get styles(){return[yr,x`
        :host {
          display: block;
          padding: 12px;
        }

        .picker::part(saturation),
        .picker::part(hue) {
          margin-bottom: 10px;
        }

        .picker::part(hue),
        .picker::part(alpha) {
          flex: 0 0 20px;
        }

        .picker::part(saturation),
        .picker::part(hue),
        .picker::part(alpha) {
          border-radius: 3px;
        }

        .picker::part(saturation-pointer),
        .picker::part(hue-pointer),
        .picker::part(alpha-pointer) {
          width: 20px;
          height: 20px;
        }

        .swatches {
          display: grid;
          grid-template-columns: repeat(6, var(--preview-size));
          grid-column-gap: 10px;
          grid-row-gap: 6px;
          margin-top: 16px;
        }
      `]}render(){return f` <div>
      <vaadin-dev-tools-rgba-string-color-picker
        class="picker"
        .color=${this.value}
        @color-changed=${this.handlePickerChange}
      ></vaadin-dev-tools-rgba-string-color-picker>
      ${this.renderSwatches()}
    </div>`}renderSwatches(){if(!this.presets||this.presets.length===0)return;const t=this.presets.map(e=>f` <button
        class="preview"
        style="--preview-color: ${e}"
        @click=${()=>this.selectPreset(e)}
      ></button>`);return f` <div class="swatches">${t}</div>`}handlePickerChange(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t.detail.value}}))}selectPreset(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t,close:!0}}))}};ve([y({})],It.prototype,"value",2);ve([y({})],It.prototype,"presets",2);It=ve([W("vaadin-dev-tools-color-picker-overlay-content")],It);customElements.whenDefined("vaadin-overlay").then(()=>{const t=customElements.get("vaadin-overlay");class e extends pa(t){}customElements.define("vaadin-dev-tools-color-picker-overlay",e)});customElements.define("vaadin-dev-tools-rgba-string-color-picker",ca);var fa=Object.defineProperty,va=Object.getOwnPropertyDescriptor,ya=(t,e,o,i)=>{for(var r=i>1?void 0:i?va(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&fa(e,o,r),r};let ji=class extends H{constructor(){super(...arguments),this.presets=new Nt}static get styles(){return[H.styles,x`
        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new Nt(this.propertyMetadata)),super.update(t)}renderEditor(){return f`
      <vaadin-dev-tools-color-picker
        .value=${this.value}
        .presets=${this.presets.values}
        @color-picker-change=${this.handleColorPickerChange}
        @color-picker-commit=${this.handleColorPickerCommit}
        @color-picker-cancel=${this.handleColorPickerCancel}
      ></vaadin-dev-tools-color-picker>
      <input class="input" .value=${this.value} @change=${this.handleInputChange} />
    `}handleInputChange(t){const e=t.target;this.value=e.value,this.dispatchChange(this.value)}handleColorPickerChange(t){this.value=t.detail.value}handleColorPickerCommit(){this.dispatchChange(this.value)}handleColorPickerCancel(){this.updateValueFromTheme()}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||"")}};ji=ya([W("vaadin-dev-tools-theme-color-property-editor")],ji);var ba=Object.defineProperty,xa=Object.getOwnPropertyDescriptor,jo=(t,e,o,i)=>{for(var r=i>1?void 0:i?xa(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&ba(e,o,r),r};class wa extends CustomEvent{constructor(e){super("open-css",{detail:{element:e}})}}let Ot=class extends I{static get styles(){return x`
      .section .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: 0.4rem var(--theme-editor-section-horizontal-padding);
        color: var(--dev-tools-text-color-emphasis);
        background-color: rgba(0, 0, 0, 0.2);
      }

      .section .property-list .property-editor:not(:last-child) {
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .section .header .open-css {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        background-color: rgba(255, 255, 255, 0.12);
        color: var(--dev-tools-text-color);
        font-weight: 600;
        padding: 0.25rem 0.375rem;
        border-radius: 0.25rem;
      }

      .section .header .open-css:hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}render(){const t=this.metadata.elements.map(e=>this.renderSection(e));return f` <div>${t}</div> `}renderSection(t){const e=t.properties.map(o=>this.renderPropertyEditor(t,o));return f`
      <div class="section" data-testid=${t==null?void 0:t.displayName}>
        <div class="header">
          <span> ${t.displayName} </span>
          <button class="open-css" @click=${()=>this.handleOpenCss(t)}>Edit CSS</button>
        </div>
        <div class="property-list">${e}</div>
      </div>
    `}handleOpenCss(t){this.dispatchEvent(new wa(t))}renderPropertyEditor(t,e){let o;switch(e.editorType){case P.checkbox:o=pt`vaadin-dev-tools-theme-checkbox-property-editor`;break;case P.range:o=pt`vaadin-dev-tools-theme-range-property-editor`;break;case P.color:o=pt`vaadin-dev-tools-theme-color-property-editor`;break;default:o=pt`vaadin-dev-tools-theme-text-property-editor`}return hs` <${o}
          class="property-editor"
          .elementMetadata=${t}
          .propertyMetadata=${e}
          .theme=${this.theme}
          data-testid=${e.propertyName}
        >
        </${o}>`}};jo([y({})],Ot.prototype,"metadata",2);jo([y({})],Ot.prototype,"theme",2);Ot=jo([W("vaadin-dev-tools-theme-property-list")],Ot);function _a(t){var e;const o=[];for(;t&&t.parentNode;){const i=Sa(t);if(i.nodeId!==-1){if((e=i.element)!=null&&e.tagName.startsWith("FLOW-CONTAINER-"))break;o.push(i)}t=t.parentElement?t.parentElement:t.parentNode.host}return o.reverse()}function Sa(t){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,i=Object.keys(o);for(const r of i){const n=o[r];if(n.getNodeId){const s=n.getNodeId(t);if(s>=0)return{nodeId:s,uiId:n.getUIId(),element:t}}}}return{nodeId:-1,uiId:-1,element:void 0}}var Ea=Object.defineProperty,Ca=Object.getOwnPropertyDescriptor,ka=(t,e,o,i)=>{for(var r=i>1?void 0:i?Ca(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&Ea(e,o,r),r};let Lt=class extends I{render(){return f`<div
      tabindex="-1"
      @mousemove=${this.onMouseMove}
      @click=${this.onClick}
      @keydown=${this.onKeyDown}
    ></div>`}onClick(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-click",{detail:{target:e}}))}onMouseMove(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-mousemove",{detail:{target:e}}))}onKeyDown(t){this.dispatchEvent(new CustomEvent("shim-keydown",{detail:{originalEvent:t}}))}getTargetElement(t){this.style.display="none";const e=document.elementFromPoint(t.clientX,t.clientY);return this.style.display="",e}};Lt.shadowRootOptions={...I.shadowRootOptions,delegatesFocus:!0};Lt.styles=[x`
      div {
        pointer-events: auto;
        background: rgba(255, 255, 255, 0);
        position: fixed;
        inset: 0px;
        z-index: 1000000;
      }
    `];Lt=ka([W("vaadin-dev-tools-shim")],Lt);const br=x`
  .popup {
    width: auto;
    position: fixed;
    background-color: var(--dev-tools-background-color-active-blurred);
    color: var(--dev-tools-text-color-primary);
    padding: 0.1875rem 0.75rem 0.1875rem 1rem;
    background-clip: padding-box;
    border-radius: var(--dev-tools-border-radius);
    overflow: hidden;
    margin: 0.5rem;
    width: 30rem;
    max-width: calc(100% - 1rem);
    max-height: calc(100vh - 1rem);
    flex-shrink: 1;
    background-color: var(--dev-tools-background-color-active);
    color: var(--dev-tools-text-color);
    transition: var(--dev-tools-transition-duration);
    transform-origin: bottom right;
    display: flex;
    flex-direction: column;
    box-shadow: var(--dev-tools-box-shadow);
    outline: none;
  }
`;var $a=Object.defineProperty,Ta=Object.getOwnPropertyDescriptor,rt=(t,e,o,i)=>{for(var r=i>1?void 0:i?Ta(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&$a(e,o,r),r};let he=class extends I{constructor(){super(...arguments),this.active=!1,this.components=[],this.selected=0}connectedCallback(){super.connectedCallback();const t=new CSSStyleSheet;t.replaceSync(`
    .vaadin-dev-tools-highlight-overlay {
      pointer-events: none;
      position: absolute;
      z-index: 10000;
      background: rgba(158,44,198,0.25);
    }`),document.adoptedStyleSheets=[...document.adoptedStyleSheets,t],this.overlayElement=document.createElement("div"),this.overlayElement.classList.add("vaadin-dev-tools-highlight-overlay")}render(){var t;return this.active?(this.style.display="block",f`
      <vaadin-dev-tools-shim
        @shim-click=${this.shimClick}
        @shim-mousemove=${this.shimMove}
        @shim-keydown=${this.shimKeydown}
      ></vaadin-dev-tools-shim>
      <div class="window popup component-picker-info">${(t=this.options)==null?void 0:t.infoTemplate}</div>
      <div class="window popup component-picker-components-info">
        <div>
          ${this.components.map((e,o)=>f`<div class=${o===this.selected?"selected":""}>
                ${e.element.tagName.toLowerCase()}
              </div>`)}
        </div>
      </div>
    `):(this.style.display="none",null)}open(t){this.options=t,this.active=!0,this.dispatchEvent(new CustomEvent("component-picker-opened",{}))}close(){this.active=!1,this.dispatchEvent(new CustomEvent("component-picker-closed",{}))}update(t){var e;if(super.update(t),(t.has("selected")||t.has("components"))&&this.highlight((e=this.components[this.selected])==null?void 0:e.element),t.has("active")){const o=t.get("active"),i=this.active;!o&&i?requestAnimationFrame(()=>this.shim.focus()):o&&!i&&this.highlight(void 0)}}shimKeydown(t){const e=t.detail.originalEvent;if(e.key==="Escape")this.close(),t.stopPropagation(),t.preventDefault();else if(e.key==="ArrowUp"){let o=this.selected-1;o<0&&(o=this.components.length-1),this.selected=o}else e.key==="ArrowDown"?this.selected=(this.selected+1)%this.components.length:e.key==="Enter"&&(this.pickSelectedComponent(),t.stopPropagation(),t.preventDefault())}shimMove(t){const e=t.detail.target;this.components=_a(e),this.selected=this.components.length-1}shimClick(t){this.pickSelectedComponent()}pickSelectedComponent(){const t=this.components[this.selected];if(t&&this.options)try{this.options.pickCallback(t)}catch(e){console.error("Pick callback failed",e)}this.close()}highlight(t){if(this.highlighted!==t)if(t){const e=t.getBoundingClientRect(),o=getComputedStyle(t);this.overlayElement.style.top=`${e.top}px`,this.overlayElement.style.left=`${e.left}px`,this.overlayElement.style.width=`${e.width}px`,this.overlayElement.style.height=`${e.height}px`,this.overlayElement.style.borderRadius=o.borderRadius,document.body.append(this.overlayElement)}else this.overlayElement.remove();this.highlighted=t}};he.styles=[br,x`
      .component-picker-info {
        left: 1em;
        bottom: 1em;
      }

      .component-picker-components-info {
        right: 3em;
        bottom: 1em;
      }

      .component-picker-components-info .selected {
        font-weight: bold;
      }
    `];rt([T()],he.prototype,"active",2);rt([T()],he.prototype,"components",2);rt([T()],he.prototype,"selected",2);rt([ot("vaadin-dev-tools-shim")],he.prototype,"shim",2);he=rt([W("vaadin-dev-tools-component-picker")],he);const Na=Object.freeze(Object.defineProperty({__proto__:null,get ComponentPicker(){return he}},Symbol.toStringTag,{value:"Module"}));var Pa=Object.defineProperty,Ra=Object.getOwnPropertyDescriptor,pe=(t,e,o,i)=>{for(var r=i>1?void 0:i?Ra(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&Pa(e,o,r),r};Mo(x`
  .vaadin-theme-editor-highlight {
    outline: solid 2px #9e2cc6;
    outline-offset: 3px;
  }
`);let re=class extends I{constructor(){super(...arguments),this.expanded=!1,this.themeEditorState=Ye.enabled,this.context=null,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null}static get styles(){return x`
      :host {
        animation: fade-in var(--dev-tools-transition-duration) ease-in;
        --theme-editor-section-horizontal-padding: 0.75rem;
        display: flex;
        flex-direction: column;
        max-height: 400px;
      }

      .notice {
        padding: var(--theme-editor-section-horizontal-padding);
      }

      .notice a {
        color: var(--dev-tools-text-color-emphasis);
      }

      .header {
        flex: 0 0 auto;
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .header .picker-row {
        padding: var(--theme-editor-section-horizontal-padding);
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
      }

      .picker {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .picker button {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        padding: 0;
        line-height: 20px;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .picker button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .picker svg,
      .picker .component-type {
        flex: 0 0 auto;
        margin-right: 4px;
      }

      .picker .instance-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #e5a2fce5;
      }

      .picker .instance-name-quote {
        color: #e5a2fce5;
      }

      .picker .no-selection {
        font-style: italic;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .property-list {
        flex: 1 1 auto;
        overflow-y: auto;
      }

      .link-button {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        color: inherit;
        font-weight: 600;
        text-decoration: underline;
      }

      .link-button:focus,
      .link-button:hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .icon-button {
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .icon-button:disabled {
        opacity: 0.5;
      }

      .icon-button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}firstUpdated(){this.api=new $s(this.connection),this.history=new Ts(this.api),this.historyActions=this.history.allowedActions}update(t){var e,o;super.update(t),t.has("expanded")&&(this.expanded?this.highlightElement((e=this.context)==null?void 0:e.component.element):this.removeElementHighlight((o=this.context)==null?void 0:o.component.element))}disconnectedCallback(){var t;super.disconnectedCallback(),this.removeElementHighlight((t=this.context)==null?void 0:t.component.element)}render(){var t,e;return this.themeEditorState===Ye.missing_theme?this.renderMissingThemeNotice():f`
      <div class="header">
        <div class="picker-row">
          ${this.renderPicker()}
          <div class="actions">
            ${this.context?f` <vaadin-dev-tools-theme-scope-selector
                  .value=${this.context.scope}
                  .metadata=${this.context.metadata}
                  @scope-change=${this.handleScopeChange}
                ></vaadin-dev-tools-theme-scope-selector>`:null}
            <button
              class="icon-button"
              data-testid="undo"
              ?disabled=${!((t=this.historyActions)!=null&&t.allowUndo)}
              @click=${this.handleUndo}
            >
              ${xt.undo}
            </button>
            <button
              class="icon-button"
              data-testid="redo"
              ?disabled=${!((e=this.historyActions)!=null&&e.allowRedo)}
              @click=${this.handleRedo}
            >
              ${xt.redo}
            </button>
          </div>
        </div>
        ${this.renderLocalClassNameEditor()}
      </div>
      ${this.renderPropertyList()}
    `}renderMissingThemeNotice(){return f`
      <div class="notice">
        It looks like you have not set up a custom theme yet. Theme editor requires an existing theme to work with.
        Please check our
        <a href="https://vaadin.com/docs/latest/styling/custom-theme/creating-custom-theme" target="_blank"
          >documentation</a
        >
        on how to set up a custom theme.
      </div>
    `}renderPropertyList(){if(!this.context)return null;if(this.context.scope===U.local&&!this.context.accessible){const t=this.context.metadata.displayName;return f`
        <div class="notice">
          The selected ${t} can not be styled locally. Currently, theme editor only supports styling
          instances that are assigned to a local variable, like so:
          <pre><code>Button saveButton = new Button("Save");</code></pre>
          If you want to modify the code so that it satisfies this requirement,
          <button class="link-button" @click=${this.handleShowComponent}>click here</button>
          to open it in your IDE. Alternatively you can choose to style all ${t}s by selecting "Global" from
          the scope dropdown above.
        </div>
      `}return f` <vaadin-dev-tools-theme-property-list
      class="property-list"
      .metadata=${this.context.metadata}
      .theme=${this.effectiveTheme}
      @theme-property-value-change=${this.handlePropertyChange}
      @open-css=${this.handleOpenCss}
    ></vaadin-dev-tools-theme-property-list>`}handleShowComponent(){if(!this.context)return;const t=this.context.component,e={nodeId:t.nodeId,uiId:t.uiId};this.connection.sendShowComponentCreateLocation(e)}async handleOpenCss(t){if(!this.context)return;await this.ensureLocalClassName();const e={themeScope:this.context.scope,localClassName:this.context.localClassName},o=Je(t.detail.element,e);this.preventLiveReload(),await this.api.openCss(o)}renderPicker(){let t;if(this.context){const e=this.context.scope===U.local?this.context.metadata.displayName:`All ${this.context.metadata.displayName}s`,o=f`<span class="component-type">${e}</span>`,i=this.context.scope===U.local?Cs(this.context.component):null,r=i?f` <span class="instance-name-quote">"</span><span class="instance-name">${i}</span
            ><span class="instance-name-quote">"</span>`:null;t=f`${o} ${r}`}else t=f`<span class="no-selection">Pick an element to get started</span>`;return f`
      <div class="picker">
        <button @click=${this.pickComponent}>${xt.crosshair} ${t}</button>
      </div>
    `}renderLocalClassNameEditor(){var t;const e=((t=this.context)==null?void 0:t.scope)===U.local&&this.context.accessible;if(!this.context||!e)return null;const o=this.context.localClassName||this.context.suggestedClassName;return f` <vaadin-dev-tools-theme-class-name-editor
      .className=${o}
      @class-name-change=${this.handleClassNameChange}
    >
    </vaadin-dev-tools-theme-class-name-editor>`}async handleClassNameChange(t){if(!this.context)return;const e=this.context.localClassName,o=t.detail.value;if(e){this.preventLiveReload();const i=this.context.component.element;this.context.localClassName=o;const r=await this.api.setLocalClassName(this.context.component,o);this.historyActions=this.history.push(r.requestId,()=>Ee.previewLocalClassName(i,o),()=>Ee.previewLocalClassName(i,e)),await this.updateThemePreview()}else this.context={...this.context,suggestedClassName:o}}async pickComponent(){var t;this.removeElementHighlight((t=this.context)==null?void 0:t.component.element),this.pickerProvider().open({infoTemplate:f`
        <div>
          <h3>Locate the component to style</h3>
          <p>Use the mouse cursor to highlight components in the UI.</p>
          <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
          <p>Click the primary mouse button to select the component.</p>
        </div>
      `,pickCallback:async e=>{const o=await _s.getMetadata(e);if(!o){this.context=null,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}this.highlightElement(e.element),this.refreshComponentAndTheme(e,o)}})}handleScopeChange(t){this.context&&this.refreshTheme({...this.context,scope:t.detail.value})}async handlePropertyChange(t){if(!this.context||!this.baseTheme||!this.editedTheme)return;const{element:e,property:o,value:i}=t.detail;this.editedTheme.updatePropertyValue(e.selector,o.propertyName,i,!0),this.effectiveTheme=ce.combine(this.baseTheme,this.editedTheme),await this.ensureLocalClassName();const r={themeScope:this.context.scope,localClassName:this.context.localClassName},n=Ss(e,r,o.propertyName,i);try{this.preventLiveReload();const s=await this.api.setCssRules([n]);this.historyActions=this.history.push(s.requestId),await this.updateThemePreview()}catch(s){console.error("Failed to update property value",s)}}async handleUndo(){this.preventLiveReload(),this.historyActions=await this.history.undo(),await this.refreshComponentAndTheme()}async handleRedo(){this.preventLiveReload(),this.historyActions=await this.history.redo(),await this.refreshComponentAndTheme()}async ensureLocalClassName(){if(!this.context||this.context.scope===U.global||this.context.localClassName)return;if(!this.context.localClassName&&!this.context.suggestedClassName)throw new Error("Cannot assign local class name for the component because it does not have a suggested class name");const t=this.context.component.element,e=this.context.suggestedClassName;this.context.localClassName=e;const o=await this.api.setLocalClassName(this.context.component,e);this.historyActions=this.history.push(o.requestId,()=>Ee.previewLocalClassName(t,e),()=>Ee.previewLocalClassName(t))}async refreshComponentAndTheme(t,e){var o,i,r;if(t=t||((o=this.context)==null?void 0:o.component),e=e||((i=this.context)==null?void 0:i.metadata),!t||!e)return;const n=await this.api.loadComponentMetadata(t);Ee.previewLocalClassName(t.element,n.className),await this.refreshTheme({scope:((r=this.context)==null?void 0:r.scope)||U.local,metadata:e,component:t,localClassName:n.className,suggestedClassName:n.suggestedClassName,accessible:n.accessible})}async refreshTheme(t){const e=t||this.context;if(!e)return;await this.updateThemePreview(),e.scope===U.local&&!e.accessible&&(this.context=e,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null);let o=new ce(e.metadata);if(!(e.scope===U.local&&!e.localClassName)){const r={themeScope:e.scope,localClassName:e.localClassName},n=e.metadata.elements.map(l=>Je(l,r)),s=await this.api.loadRules(n);o=ce.fromServerRules(e.metadata,r,s.rules)}const i=await Es(e.metadata);this.context=e,this.baseTheme=i,this.editedTheme=o,this.effectiveTheme=ce.combine(i,this.editedTheme)}async updateThemePreview(){const t=await this.api.loadPreview();Ee.update(t.css)}preventLiveReload(){this.dispatchEvent(new CustomEvent("before-save"))}highlightElement(t){t&&t.classList.add("vaadin-theme-editor-highlight")}removeElementHighlight(t){t&&t.classList.remove("vaadin-theme-editor-highlight")}};pe([y({})],re.prototype,"expanded",2);pe([y({})],re.prototype,"themeEditorState",2);pe([y({})],re.prototype,"pickerProvider",2);pe([y({})],re.prototype,"connection",2);pe([T()],re.prototype,"historyActions",2);pe([T()],re.prototype,"context",2);pe([T()],re.prototype,"effectiveTheme",2);re=pe([W("vaadin-dev-tools-theme-editor")],re);var Aa=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,o=[],i=0;i<t.rangeCount;i++)o.push(t.getRangeAt(i));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){t.type==="Caret"&&t.removeAllRanges(),t.rangeCount||o.forEach(function(r){t.addRange(r)}),e&&e.focus()}},Fi={"text/plain":"Text","text/html":"Url",default:"Text"},Ia="Copy to clipboard: #{key}, Enter";function Oa(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function La(t,e){var o,i,r,n,s,l,a=!1;e||(e={}),o=e.debug||!1;try{r=Aa(),n=document.createRange(),s=document.getSelection(),l=document.createElement("span"),l.textContent=t,l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",function(c){if(c.stopPropagation(),e.format)if(c.preventDefault(),typeof c.clipboardData>"u"){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var m=Fi[e.format]||Fi.default;window.clipboardData.setData(m,t)}else c.clipboardData.clearData(),c.clipboardData.setData(e.format,t);e.onCopy&&(c.preventDefault(),e.onCopy(c.clipboardData))}),document.body.appendChild(l),n.selectNodeContents(l),s.addRange(n);var d=document.execCommand("copy");if(!d)throw new Error("copy command was unsuccessful");a=!0}catch(c){o&&console.error("unable to copy using execCommand: ",c),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),a=!0}catch(m){o&&console.error("unable to copy using clipboardData: ",m),o&&console.error("falling back to prompt"),i=Oa("message"in e?e.message:Ia),window.prompt(i,t)}}finally{s&&(typeof s.removeRange=="function"?s.removeRange(n):s.removeAllRanges()),l&&document.body.removeChild(l),r()}return a}const Fo=1e3,Bo=(t,e)=>{const o=Array.from(t.querySelectorAll(e.join(", "))),i=Array.from(t.querySelectorAll("*")).filter(r=>r.shadowRoot).flatMap(r=>Bo(r.shadowRoot,e));return[...o,...i]};let Bi=!1;const et=(t,e)=>{Bi||(window.addEventListener("message",r=>{r.data==="validate-license"&&window.location.reload()},!1),Bi=!0);const o=t._overlayElement;if(o){if(o.shadowRoot){const r=o.shadowRoot.querySelector("slot:not([name])");if(r&&r.assignedElements().length>0){et(r.assignedElements()[0],e);return}}et(o,e);return}const i=e.messageHtml?e.messageHtml:`${e.message} <p>Component: ${e.product.name} ${e.product.version}</p>`.replace(/https:([^ ]*)/g,"<a href='https:$1'>https:$1</a>");t.isConnected&&(t.outerHTML=`<no-license style="display:flex;align-items:center;text-align:center;justify-content:center;"><div>${i}</div></no-license>`)},Be={},Hi={},Oe={},xr={},Q=t=>`${t.name}_${t.version}`,Wi=t=>{const{cvdlName:e,version:o}=t.constructor,i={name:e,version:o},r=t.tagName.toLowerCase();Be[e]=Be[e]??[],Be[e].push(r);const n=Oe[Q(i)];n&&setTimeout(()=>et(t,n),Fo),Oe[Q(i)]||xr[Q(i)]||Hi[Q(i)]||(Hi[Q(i)]=!0,window.Vaadin.devTools.checkLicense(i))},za=t=>{xr[Q(t)]=!0,console.debug("License check ok for",t)},wr=t=>{const e=t.product.name;Oe[Q(t.product)]=t,console.error("License check failed for",e);const o=Be[e];(o==null?void 0:o.length)>0&&Bo(document,o).forEach(i=>{setTimeout(()=>et(i,Oe[Q(t.product)]),Fo)})},Ma=t=>{const e=t.message,o=t.product.name;t.messageHtml=`No license found. <a target=_blank onclick="javascript:window.open(this.href);return false;" href="${e}">Go here to start a trial or retrieve your license.</a>`,Oe[Q(t.product)]=t,console.error("No license found when checking",o);const i=Be[o];(i==null?void 0:i.length)>0&&Bo(document,i).forEach(r=>{setTimeout(()=>et(r,Oe[Q(t.product)]),Fo)})},Va=()=>{window.Vaadin.devTools.createdCvdlElements.forEach(t=>{Wi(t)}),window.Vaadin.devTools.createdCvdlElements={push:t=>{Wi(t)}}};var z=(t=>(t.ACTIVE="active",t.INACTIVE="inactive",t.UNAVAILABLE="unavailable",t.ERROR="error",t))(z||{});const _r=class extends Object{constructor(t){super(),this.status="unavailable",t&&(this.webSocket=new WebSocket(t),this.webSocket.onmessage=e=>this.handleMessage(e),this.webSocket.onerror=e=>this.handleError(e),this.webSocket.onclose=e=>{this.status!=="error"&&this.setStatus("unavailable"),this.webSocket=void 0}),setInterval(()=>{this.webSocket&&self.status!=="error"&&this.status!=="unavailable"&&this.webSocket.send("")},_r.HEARTBEAT_INTERVAL)}onHandshake(){}onReload(){}onConnectionError(t){}onStatusChange(t){}onMessage(t){console.error("Unknown message received from the live reload server:",t)}handleMessage(t){let e;try{e=JSON.parse(t.data)}catch(o){this.handleError(`[${o.name}: ${o.message}`);return}e.command==="hello"?(this.setStatus("active"),this.onHandshake()):e.command==="reload"?this.status==="active"&&this.onReload():e.command==="license-check-ok"?za(e.data):e.command==="license-check-failed"?wr(e.data):e.command==="license-check-nokey"?Ma(e.data):this.onMessage(e)}handleError(t){console.error(t),this.setStatus("error"),t instanceof Event&&this.webSocket?this.onConnectionError(`Error in WebSocket connection to ${this.webSocket.url}`):this.onConnectionError(t)}setActive(t){!t&&this.status==="active"?this.setStatus("inactive"):t&&this.status==="inactive"&&this.setStatus("active")}setStatus(t){this.status!==t&&(this.status=t,this.onStatusChange(t))}send(t,e){const o=JSON.stringify({command:t,data:e});this.webSocket?this.webSocket.readyState!==WebSocket.OPEN?this.webSocket.addEventListener("open",()=>this.webSocket.send(o)):this.webSocket.send(o):console.error(`Unable to send message ${t}. No websocket is available`)}setFeature(t,e){this.send("setFeature",{featureId:t,enabled:e})}sendTelemetry(t){this.send("reportTelemetry",{browserData:t})}sendLicenseCheck(t){this.send("checkLicense",t)}sendShowComponentCreateLocation(t){this.send("showComponentCreateLocation",t)}sendShowComponentAttachLocation(t){this.send("showComponentAttachLocation",t)}};let wt=_r;wt.HEARTBEAT_INTERVAL=18e4;var Da=Object.defineProperty,Ua=Object.getOwnPropertyDescriptor,N=(t,e,o,i)=>{for(var r=i>1?void 0:i?Ua(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&Da(e,o,r),r};const S=class extends I{constructor(){super(),this.expanded=!1,this.messages=[],this.notifications=[],this.frontendStatus=z.UNAVAILABLE,this.javaStatus=z.UNAVAILABLE,this.tabs=[{id:"log",title:"Log",render:()=>this.renderLog(),activate:this.activateLog},{id:"info",title:"Info",render:()=>this.renderInfo()},{id:"features",title:"Feature Flags",render:()=>this.renderFeatures()}],this.activeTab="log",this.serverInfo={flowVersion:"",vaadinVersion:"",javaVersion:"",osVersion:"",productName:""},this.features=[],this.unreadErrors=!1,this.componentPickActive=!1,this.themeEditorState=Ye.disabled,this.nextMessageId=1,this.transitionDuration=0,this.disableLiveReloadTimeout=null,window.Vaadin.Flow&&this.tabs.push({id:"code",title:"Code",render:()=>this.renderCode()})}static get styles(){return[x`
        :host {
          --dev-tools-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
            'Helvetica Neue', sans-serif;
          --dev-tools-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
            monospace;

          --dev-tools-font-size: 0.8125rem;
          --dev-tools-font-size-small: 0.75rem;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);
          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: 206, 100%, 70%;
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: 145, 80%, 42%;
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: 0, 0%, 50%;
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: 38, 98%, 64%;
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: 355, 100%, 68%;
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;

          all: initial;

          direction: ltr;
          cursor: default;
          font: normal 400 var(--dev-tools-font-size) / 1.125rem var(--dev-tools-font-family);
          color: var(--dev-tools-text-color);
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;

          position: fixed;
          z-index: 20000;
          pointer-events: none;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
        }

        .dev-tools {
          pointer-events: auto;
          display: flex;
          align-items: center;
          position: fixed;
          z-index: inherit;
          right: 0.5rem;
          bottom: 0.5rem;
          min-width: 1.75rem;
          height: 1.75rem;
          max-width: 1.75rem;
          border-radius: 0.5rem;
          padding: 0.375rem;
          box-sizing: border-box;
          background-color: var(--dev-tools-background-color-inactive);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          white-space: nowrap;
          line-height: 1rem;
        }

        .dev-tools:hover,
        .dev-tools.active {
          background-color: var(--dev-tools-background-color-active);
          box-shadow: var(--dev-tools-box-shadow);
        }

        .dev-tools.active {
          max-width: calc(100% - 1rem);
        }

        .dev-tools .dev-tools-icon {
          flex: none;
          pointer-events: none;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          fill: #fff;
          transition: var(--dev-tools-transition-duration);
          margin: 0;
        }

        .dev-tools.active .dev-tools-icon {
          opacity: 0;
          position: absolute;
          transform: scale(0.5);
        }

        .dev-tools .status-blip {
          flex: none;
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          z-index: 20001;
          background: var(--dev-tools-grey-color);
          position: absolute;
          top: -1px;
          right: -1px;
        }

        .dev-tools .status-description {
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 0.25rem;
        }

        .dev-tools.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.15);
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        .switch {
          display: inline-flex;
          align-items: center;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .switch .slider {
          display: block;
          flex: none;
          width: 28px;
          height: 18px;
          border-radius: 9px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: var(--dev-tools-transition-duration);
          margin-right: 0.5rem;
        }

        .switch:focus-within .slider,
        .switch .slider:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: none;
        }

        .switch input:focus-visible ~ .slider {
          box-shadow: 0 0 0 2px var(--dev-tools-background-color-active), 0 0 0 4px var(--dev-tools-blue-color);
        }

        .switch .slider::before {
          content: '';
          display: block;
          margin: 2px;
          width: 14px;
          height: 14px;
          background-color: #fff;
          transition: var(--dev-tools-transition-duration);
          border-radius: 50%;
        }

        .switch input:checked + .slider {
          background-color: var(--dev-tools-green-color);
        }

        .switch input:checked + .slider::before {
          transform: translateX(10px);
        }

        .switch input:disabled + .slider::before {
          background-color: var(--dev-tools-grey-color);
        }

        .window.hidden {
          opacity: 0;
          transform: scale(0);
          position: absolute;
        }

        .window.visible {
          transform: none;
          opacity: 1;
          pointer-events: auto;
        }

        .window.visible ~ .dev-tools {
          opacity: 0;
          pointer-events: none;
        }

        .window.visible ~ .dev-tools .dev-tools-icon,
        .window.visible ~ .dev-tools .status-blip {
          transition: none;
          opacity: 0;
        }

        .window {
          border-radius: var(--dev-tools-border-radius);
          overflow: hidden;
          margin: 0.5rem;
          width: 30rem;
          max-width: calc(100% - 1rem);
          max-height: calc(100vh - 1rem);
          flex-shrink: 1;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          display: flex;
          flex-direction: column;
          box-shadow: var(--dev-tools-box-shadow);
          outline: none;
        }

        .window-toolbar {
          display: flex;
          flex: none;
          align-items: center;
          padding: 0.375rem;
          white-space: nowrap;
          order: 1;
          background-color: rgba(0, 0, 0, 0.2);
          gap: 0.5rem;
        }

        .tab {
          color: var(--dev-tools-text-color-secondary);
          font: inherit;
          font-size: var(--dev-tools-font-size-small);
          font-weight: 500;
          line-height: 1;
          padding: 0.25rem 0.375rem;
          background: none;
          border: none;
          margin: 0;
          border-radius: 0.25rem;
          transition: var(--dev-tools-transition-duration);
        }

        .tab:hover,
        .tab.active {
          color: var(--dev-tools-text-color-active);
        }

        .tab.active {
          background-color: rgba(255, 255, 255, 0.12);
        }

        .tab.unreadErrors::after {
          content: '•';
          color: hsl(var(--dev-tools-red-hsl));
          font-size: 1.5rem;
          position: absolute;
          transform: translate(0, -50%);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        .ahreflike:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .button {
          all: initial;
          font-family: inherit;
          font-size: var(--dev-tools-font-size-small);
          line-height: 1;
          white-space: nowrap;
          background-color: rgba(0, 0, 0, 0.2);
          color: inherit;
          font-weight: 600;
          padding: 0.25rem 0.375rem;
          border-radius: 0.25rem;
        }

        .button:focus,
        .button:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .minimize-button {
          flex: none;
          width: 1rem;
          height: 1rem;
          color: inherit;
          background-color: transparent;
          border: 0;
          padding: 0;
          margin: 0 0 0 auto;
          opacity: 0.8;
        }

        .minimize-button:hover {
          opacity: 1;
        }

        .minimize-button svg {
          max-width: 100%;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .features-tray {
          padding: 0.75rem;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .features-tray p {
          margin-top: 0;
          color: var(--dev-tools-text-color-secondary);
        }

        .features-tray .feature {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 0.5em;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        .window.hidden + .notification-tray {
          margin-bottom: 3rem;
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 30rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          max-height: 10em;
          overflow: hidden;
        }

        .message-tray {
          flex: auto;
          overflow: auto;
          max-height: 20rem;
          user-select: text;
        }

        .message-tray .message {
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          padding-left: 2.25rem;
        }

        .message-tray .message.warning {
          background-color: hsla(var(--dev-tools-yellow-hsl), 0.09);
        }

        .message-tray .message.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.09);
        }

        .message-tray .message.error .message-heading {
          color: hsl(var(--dev-tools-red-hsl));
        }

        .message-tray .message.warning .message-heading {
          color: hsl(var(--dev-tools-yellow-hsl));
        }

        .message-tray .message + .message {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .message-tray .dismiss-message,
        .message-tray .persist {
          display: none;
        }

        .info-tray {
          padding: 0.75rem;
          position: relative;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .info-tray dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 0.75rem;
          position: relative;
        }

        .info-tray dt {
          grid-column: 1;
          color: var(--dev-tools-text-color-emphasis);
        }

        .info-tray dt:not(:first-child)::before {
          content: '';
          width: 100%;
          position: absolute;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          margin-top: -0.375rem;
        }

        .info-tray dd {
          grid-column: 2;
          margin: 0;
        }

        .info-tray :is(dt, dd):not(:last-child) {
          margin-bottom: 0.75rem;
        }

        .info-tray dd + dd {
          margin-top: -0.5rem;
        }

        .info-tray .live-reload-status::before {
          content: '•';
          color: var(--status-color);
          width: 0.75rem;
          display: inline-block;
          font-size: 1rem;
          line-height: 0.5rem;
        }

        .info-tray .copy {
          position: fixed;
          z-index: 1;
          top: 0.5rem;
          right: 0.5rem;
        }

        .info-tray .switch {
          vertical-align: -4px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }

        @supports (backdrop-filter: blur(1px)) {
          .dev-tools,
          .window,
          .notification-tray .message {
            backdrop-filter: blur(8px);
          }
          .dev-tools:hover,
          .dev-tools.active,
          .window,
          .notification-tray .message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }
      `,br]}static get isActive(){const t=window.sessionStorage.getItem(S.ACTIVE_KEY_IN_SESSION_STORAGE);return t===null||t!=="false"}static notificationDismissed(t){const e=window.localStorage.getItem(S.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);return e!==null&&e.includes(t)}elementTelemetry(){let t={};try{const e=localStorage.getItem("vaadin.statistics.basket");if(!e)return;t=JSON.parse(e)}catch{return}this.frontendConnection&&this.frontendConnection.sendTelemetry(t)}openWebSocketConnection(){this.frontendStatus=z.UNAVAILABLE,this.javaStatus=z.UNAVAILABLE;const t=s=>this.log("error",s),e=()=>{this.showSplashMessage("Reloading…");const s=window.sessionStorage.getItem(S.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE),l=s?parseInt(s,10)+1:1;window.sessionStorage.setItem(S.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE,l.toString()),window.sessionStorage.setItem(S.TRIGGERED_KEY_IN_SESSION_STORAGE,"true"),window.location.reload()},o=new wt(this.getDedicatedWebSocketUrl());o.onHandshake=()=>{this.log("log","Vaadin development mode initialized"),S.isActive||o.setActive(!1),this.elementTelemetry()},o.onConnectionError=t,o.onReload=e,o.onStatusChange=s=>{this.frontendStatus=s},o.onMessage=s=>this.handleFrontendMessage(s),this.frontendConnection=o;let i;this.backend===S.SPRING_BOOT_DEVTOOLS&&this.springBootLiveReloadPort?(i=new wt(this.getSpringBootWebSocketUrl(window.location)),i.onHandshake=()=>{S.isActive||i.setActive(!1)},i.onReload=e,i.onConnectionError=t):this.backend===S.JREBEL||this.backend===S.HOTSWAP_AGENT?i=o:i=new wt(void 0);const r=i.onStatusChange;i.onStatusChange=s=>{r(s),this.javaStatus=s};const n=i.onHandshake;i.onHandshake=()=>{n(),this.backend&&this.log("information",`Java live reload available: ${S.BACKEND_DISPLAY_NAME[this.backend]}`)},this.javaConnection=i,this.backend||this.showNotification("warning","Java live reload unavailable","Live reload for Java changes is currently not set up. Find out how to make use of this functionality to boost your workflow.","https://vaadin.com/docs/latest/flow/configuration/live-reload","liveReloadUnavailable")}handleFrontendMessage(t){if((t==null?void 0:t.command)==="serverInfo")this.serverInfo=t.data;else if((t==null?void 0:t.command)==="featureFlags")this.features=t.data.features;else if((t==null?void 0:t.command)==="themeEditorState"){const e=!!window.Vaadin.Flow;this.themeEditorState=t.data,e&&this.themeEditorState!==Ye.disabled&&(this.tabs.push({id:"theme-editor",title:"Theme Editor (Free Preview)",render:()=>this.renderThemeEditor()}),this.requestUpdate())}else console.error("Unknown message from front-end connection:",JSON.stringify(t))}getDedicatedWebSocketUrl(){function t(o){const i=document.createElement("div");return i.innerHTML=`<a href="${o}"/>`,i.firstChild.href}if(this.url===void 0)return;const e=t(this.url);if(!e.startsWith("http://")&&!e.startsWith("https://")){console.error("The protocol of the url should be http or https for live reload to work.");return}return`${e.replace(/^http/,"ws")}?v-r=push&debug_window`}getSpringBootWebSocketUrl(t){const{hostname:e}=t,o=t.protocol==="https:"?"wss":"ws";if(e.endsWith("gitpod.io")){const i=e.replace(/.*?-/,"");return`${o}://${this.springBootLiveReloadPort}-${i}`}else return`${o}://${e}:${this.springBootLiveReloadPort}`}connectedCallback(){if(super.connectedCallback(),this.catchErrors(),this.disableEventListener=e=>this.demoteSplashMessage(),document.body.addEventListener("focus",this.disableEventListener),document.body.addEventListener("click",this.disableEventListener),this.openWebSocketConnection(),window.sessionStorage.getItem(S.TRIGGERED_KEY_IN_SESSION_STORAGE)){const e=new Date,o=`${`0${e.getHours()}`.slice(-2)}:${`0${e.getMinutes()}`.slice(-2)}:${`0${e.getSeconds()}`.slice(-2)}`;this.showSplashMessage(`Page reloaded at ${o}`),window.sessionStorage.removeItem(S.TRIGGERED_KEY_IN_SESSION_STORAGE)}this.transitionDuration=parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),10);const t=window;t.Vaadin=t.Vaadin||{},t.Vaadin.devTools=Object.assign(this,t.Vaadin.devTools),Va()}format(t){return t.toString()}catchErrors(){const t=window.Vaadin.ConsoleErrors;t&&t.forEach(e=>{this.log("error",e.map(o=>this.format(o)).join(" "))}),window.Vaadin.ConsoleErrors={push:e=>{this.log("error",e.map(o=>this.format(o)).join(" "))}}}disconnectedCallback(){this.disableEventListener&&(document.body.removeEventListener("focus",this.disableEventListener),document.body.removeEventListener("click",this.disableEventListener)),super.disconnectedCallback()}toggleExpanded(){this.notifications.slice().forEach(t=>this.dismissNotification(t.id)),this.expanded=!this.expanded,this.expanded&&this.root.focus()}showSplashMessage(t){this.splashMessage=t,this.splashMessage&&(this.expanded?this.demoteSplashMessage():setTimeout(()=>{this.demoteSplashMessage()},S.AUTO_DEMOTE_NOTIFICATION_DELAY))}demoteSplashMessage(){this.splashMessage&&this.log("log",this.splashMessage),this.showSplashMessage(void 0)}checkLicense(t){this.frontendConnection?this.frontendConnection.sendLicenseCheck(t):wr({message:"Internal error: no connection",product:t})}log(t,e,o,i){const r=this.nextMessageId;for(this.nextMessageId+=1,this.messages.push({id:r,type:t,message:e,details:o,link:i,dontShowAgain:!1,deleted:!1});this.messages.length>S.MAX_LOG_ROWS;)this.messages.shift();this.requestUpdate(),this.updateComplete.then(()=>{const n=this.renderRoot.querySelector(".message-tray .message:last-child");this.expanded&&n?(setTimeout(()=>n.scrollIntoView({behavior:"smooth"}),this.transitionDuration),this.unreadErrors=!1):t==="error"&&(this.unreadErrors=!0)})}showNotification(t,e,o,i,r){if(r===void 0||!S.notificationDismissed(r)){if(this.notifications.filter(s=>s.persistentId===r).filter(s=>!s.deleted).length>0)return;const n=this.nextMessageId;this.nextMessageId+=1,this.notifications.push({id:n,type:t,message:e,details:o,link:i,persistentId:r,dontShowAgain:!1,deleted:!1}),i===void 0&&setTimeout(()=>{this.dismissNotification(n)},S.AUTO_DEMOTE_NOTIFICATION_DELAY),this.requestUpdate()}else this.log(t,e,o,i)}dismissNotification(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];if(o.dontShowAgain&&o.persistentId&&!S.notificationDismissed(o.persistentId)){let i=window.localStorage.getItem(S.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);i=i===null?o.persistentId:`${i},${o.persistentId}`,window.localStorage.setItem(S.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE,i)}o.deleted=!0,this.log(o.type,o.message,o.details,o.link),setTimeout(()=>{const i=this.findNotificationIndex(t);i!==-1&&(this.notifications.splice(i,1),this.requestUpdate())},this.transitionDuration)}}findNotificationIndex(t){let e=-1;return this.notifications.some((o,i)=>o.id===t?(e=i,!0):!1),e}toggleDontShowAgain(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];o.dontShowAgain=!o.dontShowAgain,this.requestUpdate()}}setActive(t){var e,o;(e=this.frontendConnection)==null||e.setActive(t),(o=this.javaConnection)==null||o.setActive(t),window.sessionStorage.setItem(S.ACTIVE_KEY_IN_SESSION_STORAGE,t?"true":"false")}disableLiveReloadTemporarily(){(S.isActive||this.disableLiveReloadTimeout!=null)&&(this.setActive(!1),clearTimeout(this.disableLiveReloadTimeout),this.disableLiveReloadTimeout=window.setTimeout(()=>{this.setActive(!0),this.disableLiveReloadTimeout=null},2500))}getStatusColor(t){return t===z.ACTIVE?"var(--dev-tools-green-color)":t===z.INACTIVE?"var(--dev-tools-grey-color)":t===z.UNAVAILABLE?"var(--dev-tools-yellow-hsl)":t===z.ERROR?"var(--dev-tools-red-color)":"none"}renderMessage(t){return f`
      <div
        class="message ${t.type} ${t.deleted?"animate-out":""} ${t.details||t.link?"has-details":""}"
      >
        <div class="message-content">
          <div class="message-heading">${t.message}</div>
          <div class="message-details" ?hidden="${!t.details&&!t.link}">
            ${t.details?f`<p>${t.details}</p>`:""}
            ${t.link?f`<a class="ahreflike" href="${t.link}" target="_blank">Learn more</a>`:""}
          </div>
          ${t.persistentId?f`<div
                class="persist ${t.dontShowAgain?"on":"off"}"
                @click=${()=>this.toggleDontShowAgain(t.id)}
              >
                Don’t show again
              </div>`:""}
        </div>
        <div class="dismiss-message" @click=${()=>this.dismissNotification(t.id)}>Dismiss</div>
      </div>
    `}render(){return f` <div
        class="window ${this.expanded&&!this.componentPickActive?"visible":"hidden"}"
        tabindex="0"
        @keydown=${t=>t.key==="Escape"&&this.expanded&&this.toggleExpanded()}
      >
        <div class="window-toolbar">
          ${this.tabs.map(t=>f`<button
                class=${zo({tab:!0,active:this.activeTab===t.id,unreadErrors:t.id==="log"&&this.unreadErrors})}
                id="${t.id}"
                @click=${()=>{this.activeTab=t.id,t.activate&&t.activate.call(this)}}
              >
                ${t.title}
              </button> `)}
          <button class="minimize-button" title="Minimize" @click=${()=>this.toggleExpanded()}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="#fff" opacity=".8">
                <path
                  d="m7.25 1.75c0-.41421.33579-.75.75-.75h3.25c2.0711 0 3.75 1.67893 3.75 3.75v6.5c0 2.0711-1.6789 3.75-3.75 3.75h-6.5c-2.07107 0-3.75-1.6789-3.75-3.75v-3.25c0-.41421.33579-.75.75-.75s.75.33579.75.75v3.25c0 1.2426 1.00736 2.25 2.25 2.25h6.5c1.2426 0 2.25-1.0074 2.25-2.25v-6.5c0-1.24264-1.0074-2.25-2.25-2.25h-3.25c-.41421 0-.75-.33579-.75-.75z"
                />
                <path
                  d="m2.96967 2.96967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46967v-2.68934c0-.41421.33579-.75.75-.75.4142 0 .75.33579.75.75v4.5c0 .4142-.3358.75-.75.75h-4.5c-.41421 0-.75-.3358-.75-.75 0-.41421.33579-.75.75-.75h2.68934l-5.46967-5.46967c-.29289-.29289-.29289-.76777 0-1.06066z"
                />
              </g>
            </svg>
          </button>
        </div>
        ${this.tabs.map(t=>this.activeTab===t.id?t.render():k)}
      </div>

      <div class="notification-tray">${this.notifications.map(t=>this.renderMessage(t))}</div>
      <vaadin-dev-tools-component-picker
        .active=${this.componentPickActive}
        @component-picker-opened=${()=>{this.componentPickActive=!0}}
        @component-picker-closed=${()=>{this.componentPickActive=!1}}
      ></vaadin-dev-tools-component-picker>
      <div
        class="dev-tools ${this.splashMessage?"active":""}${this.unreadErrors?" error":""}"
        @click=${()=>this.toggleExpanded()}
      >
        ${this.unreadErrors?f`<svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="dev-tools-icon error"
            >
              <clipPath id="a"><path d="m0 0h16v16h-16z" /></clipPath>
              <g clip-path="url(#a)">
                <path
                  d="m6.25685 2.09894c.76461-1.359306 2.72169-1.359308 3.4863 0l5.58035 9.92056c.7499 1.3332-.2135 2.9805-1.7432 2.9805h-11.1606c-1.529658 0-2.4930857-1.6473-1.743156-2.9805z"
                  fill="#ff5c69"
                />
                <path
                  d="m7.99699 4c-.45693 0-.82368.37726-.81077.834l.09533 3.37352c.01094.38726.32803.69551.71544.69551.38741 0 .70449-.30825.71544-.69551l.09533-3.37352c.0129-.45674-.35384-.834-.81077-.834zm.00301 8c.60843 0 1-.3879 1-.979 0-.5972-.39157-.9851-1-.9851s-1 .3879-1 .9851c0 .5911.39157.979 1 .979z"
                  fill="#fff"
                />
              </g>
            </svg>`:f`<svg
              fill="none"
              height="17"
              viewBox="0 0 16 17"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              class="dev-tools-icon logo"
            >
              <g fill="#fff">
                <path
                  d="m8.88273 5.97926c0 .04401-.0032.08898-.00801.12913-.02467.42848-.37813.76767-.8117.76767-.43358 0-.78704-.34112-.81171-.76928-.00481-.04015-.00801-.08351-.00801-.12752 0-.42784-.10255-.87656-1.14434-.87656h-3.48364c-1.57118 0-2.315271-.72849-2.315271-2.21758v-1.26683c0-.42431.324618-.768314.748261-.768314.42331 0 .74441.344004.74441.768314v.42784c0 .47924.39576.81265 1.11293.81265h3.41538c1.5542 0 1.67373 1.156 1.725 1.7679h.03429c.05095-.6119.17048-1.7679 1.72468-1.7679h3.4154c.7172 0 1.0145-.32924 1.0145-.80847l-.0067-.43202c0-.42431.3227-.768314.7463-.768314.4234 0 .7255.344004.7255.768314v1.26683c0 1.48909-.6181 2.21758-2.1893 2.21758h-3.4836c-1.04182 0-1.14437.44872-1.14437.87656z"
                />
                <path
                  d="m8.82577 15.1648c-.14311.3144-.4588.5335-.82635.5335-.37268 0-.69252-.2249-.83244-.5466-.00206-.0037-.00412-.0073-.00617-.0108-.00275-.0047-.00549-.0094-.00824-.0145l-3.16998-5.87318c-.08773-.15366-.13383-.32816-.13383-.50395 0-.56168.45592-1.01879 1.01621-1.01879.45048 0 .75656.22069.96595.6993l2.16882 4.05042 2.17166-4.05524c.2069-.47379.513-.69448.9634-.69448.5603 0 1.0166.45711 1.0166 1.01879 0 .17579-.0465.35029-.1348.50523l-3.1697 5.8725c-.00503.0096-.01006.0184-.01509.0272-.00201.0036-.00402.0071-.00604.0106z"
                />
              </g>
            </svg>`}

        <span
          class="status-blip"
          style="background: linear-gradient(to right, ${this.getStatusColor(this.frontendStatus)} 50%, ${this.getStatusColor(this.javaStatus)} 50%)"
        ></span>
        ${this.splashMessage?f`<span class="status-description">${this.splashMessage}</span></div>`:k}
      </div>`}renderLog(){return f`<div class="message-tray">${this.messages.map(t=>this.renderMessage(t))}</div>`}activateLog(){this.unreadErrors=!1,this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".message-tray .message:last-child");t&&t.scrollIntoView()})}renderCode(){return f`<div class="info-tray">
      <div>
        <select id="locationType">
          <option value="create" selected>Create</option>
          <option value="attach">Attach</option>
        </select>
        <button
          class="button pick"
          @click=${async()=>{await E(()=>Promise.resolve().then(()=>Na),void 0),this.componentPicker.open({infoTemplate:f`
                <div>
                  <h3>Locate a component in source code</h3>
                  <p>Use the mouse cursor to highlight components in the UI.</p>
                  <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
                  <p>
                    Click the primary mouse button to open the corresponding source code line of the highlighted
                    component in your IDE.
                  </p>
                </div>
              `,pickCallback:t=>{const e={nodeId:t.nodeId,uiId:t.uiId};this.renderRoot.querySelector("#locationType").value==="create"?this.frontendConnection.sendShowComponentCreateLocation(e):this.frontendConnection.sendShowComponentAttachLocation(e)}})}}
        >
          Find component in code
        </button>
      </div>
      </div>
    </div>`}renderInfo(){return f`<div class="info-tray">
      <button class="button copy" @click=${this.copyInfoToClipboard}>Copy</button>
      <dl>
        <dt>${this.serverInfo.productName}</dt>
        <dd>${this.serverInfo.vaadinVersion}</dd>
        <dt>Flow</dt>
        <dd>${this.serverInfo.flowVersion}</dd>
        <dt>Java</dt>
        <dd>${this.serverInfo.javaVersion}</dd>
        <dt>OS</dt>
        <dd>${this.serverInfo.osVersion}</dd>
        <dt>Browser</dt>
        <dd>${navigator.userAgent}</dd>
        <dt>
          Live reload
          <label class="switch">
            <input
              id="toggle"
              type="checkbox"
              ?disabled=${this.liveReloadDisabled||(this.frontendStatus===z.UNAVAILABLE||this.frontendStatus===z.ERROR)&&(this.javaStatus===z.UNAVAILABLE||this.javaStatus===z.ERROR)}
              ?checked="${this.frontendStatus===z.ACTIVE||this.javaStatus===z.ACTIVE}"
              @change=${t=>this.setActive(t.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </dt>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.javaStatus)}">
          Java ${this.javaStatus} ${this.backend?`(${S.BACKEND_DISPLAY_NAME[this.backend]})`:""}
        </dd>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.frontendStatus)}">
          Front end ${this.frontendStatus}
        </dd>
      </dl>
    </div>`}renderFeatures(){return f`<div class="features-tray">
      ${this.features.map(t=>f`<div class="feature">
          <label class="switch">
            <input
              class="feature-toggle"
              id="feature-toggle-${t.id}"
              type="checkbox"
              ?checked=${t.enabled}
              @change=${e=>this.toggleFeatureFlag(e,t)}
            />
            <span class="slider"></span>
            ${t.title}
          </label>
          <a class="ahreflike" href="${t.moreInfoLink}" target="_blank">Learn more</a>
        </div>`)}
    </div>`}renderThemeEditor(){return f` <vaadin-dev-tools-theme-editor
      .expanded=${this.expanded}  
      .themeEditorState=${this.themeEditorState}
      .pickerProvider=${()=>this.componentPicker}
      .connection=${this.frontendConnection}
      @before-save=${this.disableLiveReloadTemporarily}
    ></vaadin-dev-tools-theme-editor>`}copyInfoToClipboard(){const t=this.renderRoot.querySelectorAll(".info-tray dt, .info-tray dd"),e=Array.from(t).map(o=>(o.localName==="dd"?": ":`
`)+o.textContent.trim()).join("").replace(/^\n/,"");La(e),this.showNotification("information","Environment information copied to clipboard",void 0,void 0,"versionInfoCopied")}toggleFeatureFlag(t,e){const o=t.target.checked;this.frontendConnection?(this.frontendConnection.setFeature(e.id,o),this.showNotification("information",`“${e.title}” ${o?"enabled":"disabled"}`,e.requiresServerRestart?"This feature requires a server restart":void 0,void 0,`feature${e.id}${o?"Enabled":"Disabled"}`)):this.log("error",`Unable to toggle feature ${e.title}: No server connection available`)}};let w=S;w.MAX_LOG_ROWS=1e3;w.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE="vaadin.live-reload.dismissedNotifications";w.ACTIVE_KEY_IN_SESSION_STORAGE="vaadin.live-reload.active";w.TRIGGERED_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggered";w.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggeredCount";w.AUTO_DEMOTE_NOTIFICATION_DELAY=5e3;w.HOTSWAP_AGENT="HOTSWAP_AGENT";w.JREBEL="JREBEL";w.SPRING_BOOT_DEVTOOLS="SPRING_BOOT_DEVTOOLS";w.BACKEND_DISPLAY_NAME={HOTSWAP_AGENT:"HotswapAgent",JREBEL:"JRebel",SPRING_BOOT_DEVTOOLS:"Spring Boot Devtools"};N([y({type:String})],w.prototype,"url",2);N([y({type:Boolean,attribute:!0})],w.prototype,"liveReloadDisabled",2);N([y({type:String})],w.prototype,"backend",2);N([y({type:Number})],w.prototype,"springBootLiveReloadPort",2);N([y({type:Boolean,attribute:!1})],w.prototype,"expanded",2);N([y({type:Array,attribute:!1})],w.prototype,"messages",2);N([y({type:String,attribute:!1})],w.prototype,"splashMessage",2);N([y({type:Array,attribute:!1})],w.prototype,"notifications",2);N([y({type:String,attribute:!1})],w.prototype,"frontendStatus",2);N([y({type:String,attribute:!1})],w.prototype,"javaStatus",2);N([T()],w.prototype,"tabs",2);N([T()],w.prototype,"activeTab",2);N([T()],w.prototype,"serverInfo",2);N([T()],w.prototype,"features",2);N([T()],w.prototype,"unreadErrors",2);N([ot(".window")],w.prototype,"root",2);N([ot("vaadin-dev-tools-component-picker")],w.prototype,"componentPicker",2);N([T()],w.prototype,"componentPickActive",2);N([T()],w.prototype,"themeEditorState",2);customElements.get("vaadin-dev-tools")===void 0&&customElements.define("vaadin-dev-tools",w);const{toString:ja}=Object.prototype;function Fa(t){return ja.call(t)==="[object RegExp]"}function Ba(t,{preserve:e=!0,whitespace:o=!0,all:i}={}){if(i)throw new Error("The `all` option is no longer supported. Use the `preserve` option instead.");let r=e,n;typeof e=="function"?(r=!1,n=e):Fa(e)&&(r=!1,n=c=>e.test(c));let s=!1,l="",a="",d="";for(let c=0;c<t.length;c++){if(l=t[c],t[c-1]!=="\\"&&(l==='"'||l==="'")&&(s===l?s=!1:s||(s=l)),!s&&l==="/"&&t[c+1]==="*"){const m=t[c+2]==="!";let h=c+2;for(;h<t.length;h++){if(t[h]==="*"&&t[h+1]==="/"){r&&m||n&&n(a)?d+=`/*${a}*/`:o||(t[h+2]===`
`?h++:t[h+2]+t[h+3]===`\r
`&&(h+=2)),a="";break}a+=t[h]}c=h+1;continue}d+=l}return d}const Ha=(t,e)=>{const o=/(?:@media\s(.+?))?(?:\s{)?\@import\s*(?:url\(\s*['"]?(.+?)['"]?\s*\)|(["'])((?:\\.|[^\\])*?)\3)([^;]*);(?:})?/g;/\/\*(.|[\r\n])*?\*\//gm.exec(t)!=null&&(t=Ba(t));for(var i,r=t;(i=o.exec(t))!==null;){r=r.replace(i[0],"");const n=document.createElement("link");n.rel="stylesheet",n.href=i[2]||i[4];const s=i[1]||i[5];s&&(n.media=s),e===document?document.head.appendChild(n):e.appendChild(n)}return r},Wa=(t,e,o)=>{const i=new CSSStyleSheet;i.replaceSync(t),o?e.adoptedStyleSheets=[i,...e.adoptedStyleSheets]:e.adoptedStyleSheets=[...e.adoptedStyleSheets,i]},qa=(t,e)=>{const o=document.createElement("style");o.type="text/css",o.textContent=t;let i;if(e){const n=Array.from(document.head.childNodes).filter(s=>s.nodeType===Node.COMMENT_NODE).find(s=>s.data.trim()===e);n&&(i=n)}document.head.insertBefore(o,i)},Ue=(t,e,o,i)=>{if(o===document){const n=Ga(t);if(window.Vaadin.theme.injectedGlobalCss.indexOf(n)!==-1)return;window.Vaadin.theme.injectedGlobalCss.push(n)}const r=Ha(t,o);o===document?qa(r,e):Wa(r,o,i)};window.Vaadin=window.Vaadin||{};window.Vaadin.theme=window.Vaadin.theme||{};window.Vaadin.theme.injectedGlobalCss=[];function qi(t){let e,o,i=2166136261;for(e=0,o=t.length;e<o;e++)i^=t.charCodeAt(e),i+=(i<<1)+(i<<4)+(i<<7)+(i<<8)+(i<<24);return("0000000"+(i>>>0).toString(16)).substr(-8)}function Ga(t){let e=qi(t);return e+qi(e+t)}/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ka extends HTMLElement{static get version(){return"24.1.0-alpha6"}}customElements.define("vaadin-lumo-styles",Ka);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ya=t=>class extends t{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(o,i,r){super.attributeChangedCallback(o,i,r),o==="theme"&&this._set_theme(r)}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Sr=[];function Er(t){return t&&Object.prototype.hasOwnProperty.call(t,"__themes")}function Ja(t){return Er(customElements.get(t))}function Xa(t=[]){return[t].flat(1/0).filter(e=>e instanceof Ao?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function Ut(t,e,o={}){t&&Ja(t)&&console.warn(`The custom element definition for "${t}"
      was finalized before a style module was registered.
      Make sure to add component specific style modules before
      importing the corresponding custom element.`),e=Xa(e),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(t,e,o):Sr.push({themeFor:t,styles:e,include:o.include,moduleId:o.moduleId})}function To(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():Sr}function Qa(t,e){return(t||"").split(" ").some(o=>new RegExp(`^${o.split("*").join(".*")}$`,"u").test(e))}function Za(t=""){let e=0;return t.startsWith("lumo-")||t.startsWith("material-")?e=1:t.startsWith("vaadin-")&&(e=2),e}function Cr(t){const e=[];return t.include&&[].concat(t.include).forEach(o=>{const i=To().find(r=>r.moduleId===o);i?e.push(...Cr(i),...i.styles):console.warn(`Included moduleId ${o} not found in style registry`)},t.styles),e}function el(t,e){const o=document.createElement("style");o.innerHTML=t.map(i=>i.cssText).join(`
`),e.content.appendChild(o)}function tl(t){const e=`${t}-default-theme`,o=To().filter(i=>i.moduleId!==e&&Qa(i.themeFor,t)).map(i=>({...i,styles:[...Cr(i),...i.styles],includePriority:Za(i.moduleId)})).sort((i,r)=>r.includePriority-i.includePriority);return o.length>0?o:To().filter(i=>i.moduleId===e)}const bl=t=>class extends Ya(t){static finalize(){if(super.finalize(),this.elementStyles)return;const o=this.prototype._template;!o||Er(this)||el(this.getStylesForThis(),o)}static finalizeStyles(o){const i=this.getStylesForThis();return o?[...super.finalizeStyles(o),...i]:i}static getStylesForThis(){const o=Object.getPrototypeOf(this.prototype),i=(o?o.constructor.__themes:[])||[];this.__themes=[...i,...tl(this.is)];const r=this.__themes.flatMap(n=>n.styles);return r.filter((n,s)=>s===r.lastIndexOf(n))}},ol="lumo-",ze=(t,...e)=>{const o=document.createElement("style");o.id=`${ol}${t}`,o.textContent=e.map(i=>i.toString()).join(`
`).replace(":host","html"),document.head.insertAdjacentElement("afterbegin",o)};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const il=x`
  :host {
    /* prettier-ignore */
    --lumo-font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    /* Font sizes */
    --lumo-font-size-xxs: 0.75rem;
    --lumo-font-size-xs: 0.8125rem;
    --lumo-font-size-s: 0.875rem;
    --lumo-font-size-m: 1rem;
    --lumo-font-size-l: 1.125rem;
    --lumo-font-size-xl: 1.375rem;
    --lumo-font-size-xxl: 1.75rem;
    --lumo-font-size-xxxl: 2.5rem;

    /* Line heights */
    --lumo-line-height-xs: 1.25;
    --lumo-line-height-s: 1.375;
    --lumo-line-height-m: 1.625;
  }
`,kr=x`
  body,
  :host {
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-m);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  small,
  [theme~='font-size-s'] {
    font-size: var(--lumo-font-size-s);
    line-height: var(--lumo-line-height-s);
  }

  [theme~='font-size-xs'] {
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
  }

  :where(h1, h2, h3, h4, h5, h6) {
    font-weight: 600;
    line-height: var(--lumo-line-height-xs);
    margin-block: 0;
  }

  :where(h1) {
    font-size: var(--lumo-font-size-xxxl);
  }

  :where(h2) {
    font-size: var(--lumo-font-size-xxl);
  }

  :where(h3) {
    font-size: var(--lumo-font-size-xl);
  }

  :where(h4) {
    font-size: var(--lumo-font-size-l);
  }

  :where(h5) {
    font-size: var(--lumo-font-size-m);
  }

  :where(h6) {
    font-size: var(--lumo-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  p,
  blockquote {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
  }

  a {
    text-decoration: none;
  }

  a:where(:any-link):hover {
    text-decoration: underline;
  }

  hr {
    display: block;
    align-self: stretch;
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
    background-color: var(--lumo-contrast-10pct);
  }

  blockquote {
    border-left: 2px solid var(--lumo-contrast-30pct);
  }

  b,
  strong {
    font-weight: 600;
  }

  /* RTL specific styles */
  blockquote[dir='rtl'] {
    border-left: none;
    border-right: 2px solid var(--lumo-contrast-30pct);
  }
`;Ut("",kr,{moduleId:"lumo-typography"});ze("typography-props",il);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const rl=x`
  :host {
    /* Base (background) */
    --lumo-base-color: #fff;

    /* Tint */
    --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
    --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
    --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
    --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
    --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
    --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
    --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
    --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
    --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
    --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
    --lumo-tint: #fff;

    /* Shade */
    --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
    --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
    --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
    --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
    --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
    --lumo-shade-50pct: hsla(214, 45%, 20%, 0.52);
    --lumo-shade-60pct: hsla(214, 43%, 19%, 0.6);
    --lumo-shade-70pct: hsla(214, 42%, 18%, 0.69);
    --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
    --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
    --lumo-shade: hsl(214, 35%, 15%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-shade-5pct);
    --lumo-contrast-10pct: var(--lumo-shade-10pct);
    --lumo-contrast-20pct: var(--lumo-shade-20pct);
    --lumo-contrast-30pct: var(--lumo-shade-30pct);
    --lumo-contrast-40pct: var(--lumo-shade-40pct);
    --lumo-contrast-50pct: var(--lumo-shade-50pct);
    --lumo-contrast-60pct: var(--lumo-shade-60pct);
    --lumo-contrast-70pct: var(--lumo-shade-70pct);
    --lumo-contrast-80pct: var(--lumo-shade-80pct);
    --lumo-contrast-90pct: var(--lumo-shade-90pct);
    --lumo-contrast: var(--lumo-shade);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 100%, 48%);
    --lumo-primary-color-50pct: hsla(214, 100%, 49%, 0.76);
    --lumo-primary-color-10pct: hsla(214, 100%, 60%, 0.13);
    --lumo-primary-text-color: hsl(214, 100%, 43%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 85%, 48%);
    --lumo-error-color-50pct: hsla(3, 85%, 49%, 0.5);
    --lumo-error-color-10pct: hsla(3, 85%, 49%, 0.1);
    --lumo-error-text-color: hsl(3, 89%, 42%);
    --lumo-error-contrast-color: #fff;

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 72%, 31%, 0.5);
    --lumo-success-color-10pct: hsla(145, 72%, 31%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 25%);
    --lumo-success-contrast-color: #fff;
  }
`;ze("color-props",rl);const $r=x`
  [theme~='dark'] {
    /* Base (background) */
    --lumo-base-color: hsl(214, 35%, 21%);

    /* Tint */
    --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
    --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
    --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
    --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
    --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
    --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
    --lumo-tint-60pct: hsla(214, 82%, 90%, 0.58);
    --lumo-tint-70pct: hsla(214, 87%, 92%, 0.69);
    --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
    --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
    --lumo-tint: hsl(214, 100%, 98%);

    /* Shade */
    --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
    --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
    --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
    --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
    --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
    --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
    --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
    --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
    --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
    --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
    --lumo-shade: hsl(214, 33%, 13%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-tint-5pct);
    --lumo-contrast-10pct: var(--lumo-tint-10pct);
    --lumo-contrast-20pct: var(--lumo-tint-20pct);
    --lumo-contrast-30pct: var(--lumo-tint-30pct);
    --lumo-contrast-40pct: var(--lumo-tint-40pct);
    --lumo-contrast-50pct: var(--lumo-tint-50pct);
    --lumo-contrast-60pct: var(--lumo-tint-60pct);
    --lumo-contrast-70pct: var(--lumo-tint-70pct);
    --lumo-contrast-80pct: var(--lumo-tint-80pct);
    --lumo-contrast-90pct: var(--lumo-tint-90pct);
    --lumo-contrast: var(--lumo-tint);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 90%, 48%);
    --lumo-primary-color-50pct: hsla(214, 90%, 70%, 0.69);
    --lumo-primary-color-10pct: hsla(214, 90%, 55%, 0.13);
    --lumo-primary-text-color: hsl(214, 90%, 77%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 79%, 49%);
    --lumo-error-color-50pct: hsla(3, 75%, 62%, 0.5);
    --lumo-error-color-10pct: hsla(3, 75%, 62%, 0.14);
    --lumo-error-text-color: hsl(3, 100%, 80%);

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 92%, 51%, 0.5);
    --lumo-success-color-10pct: hsla(145, 92%, 51%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 46%);
  }

  html {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: light;
  }

  [theme~='dark'] {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: dark;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lumo-header-text-color);
  }

  a:where(:any-link) {
    color: var(--lumo-primary-text-color);
  }

  a:not(:any-link) {
    color: var(--lumo-disabled-text-color);
  }

  blockquote {
    color: var(--lumo-secondary-text-color);
  }

  code,
  pre {
    background-color: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-m);
  }
`;Ut("",$r,{moduleId:"lumo-color"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Tr=x`
  :host {
    /* Square */
    --lumo-space-xs: 0.25rem;
    --lumo-space-s: 0.5rem;
    --lumo-space-m: 1rem;
    --lumo-space-l: 1.5rem;
    --lumo-space-xl: 2.5rem;

    /* Wide */
    --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
    --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
    --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
    --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
    --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

    /* Tall */
    --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
    --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
    --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
    --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
    --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
  }
`;ze("spacing-props",Tr);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const nl=x`
  :host {
    /* Border radius */
    --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */
    --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */
    --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */

    /* Shadow */
    --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);
    --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);
    --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);
    --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);
    --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);

    /* Clickable element cursor */
    --lumo-clickable-cursor: default;
  }
`;x`
  html {
    --vaadin-checkbox-size: calc(var(--lumo-size-m) / 2);
    --vaadin-radio-button-size: calc(var(--lumo-size-m) / 2);
    --vaadin-input-field-border-radius: var(--lumo-border-radius-m);
  }
`;ze("style-props",nl);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ho=x`
  [theme~='badge'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0.4em calc(0.5em + var(--lumo-border-radius-s) / 4);
    color: var(--lumo-primary-text-color);
    background-color: var(--lumo-primary-color-10pct);
    border-radius: var(--lumo-border-radius-s);
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-s);
    line-height: 1;
    font-weight: 500;
    text-transform: initial;
    letter-spacing: initial;
    min-width: calc(var(--lumo-line-height-xs) * 1em + 0.45em);
    flex-shrink: 0;
  }

  /* Ensure proper vertical alignment */
  [theme~='badge']::before {
    display: inline-block;
    content: '\\2003';
    width: 0;
  }

  [theme~='badge'][theme~='small'] {
    font-size: var(--lumo-font-size-xxs);
    line-height: 1;
  }

  /* Colors */

  [theme~='badge'][theme~='success'] {
    color: var(--lumo-success-text-color);
    background-color: var(--lumo-success-color-10pct);
  }

  [theme~='badge'][theme~='error'] {
    color: var(--lumo-error-text-color);
    background-color: var(--lumo-error-color-10pct);
  }

  [theme~='badge'][theme~='contrast'] {
    color: var(--lumo-contrast-80pct);
    background-color: var(--lumo-contrast-5pct);
  }

  /* Primary */

  [theme~='badge'][theme~='primary'] {
    color: var(--lumo-primary-contrast-color);
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='success'][theme~='primary'] {
    color: var(--lumo-success-contrast-color);
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error'][theme~='primary'] {
    color: var(--lumo-error-contrast-color);
    background-color: var(--lumo-error-color);
  }

  [theme~='badge'][theme~='contrast'][theme~='primary'] {
    color: var(--lumo-base-color);
    background-color: var(--lumo-contrast);
  }

  /* Links */

  [theme~='badge'][href]:hover {
    text-decoration: none;
  }

  /* Icon */

  [theme~='badge'] vaadin-icon {
    margin: -0.25em 0;
  }

  [theme~='badge'] vaadin-icon:first-child {
    margin-left: -0.375em;
  }

  [theme~='badge'] vaadin-icon:last-child {
    margin-right: -0.375em;
  }

  vaadin-icon[theme~='badge'][icon] {
    min-width: 0;
    padding: 0;
    font-size: 1rem;
    width: var(--lumo-icon-size-m);
    height: var(--lumo-icon-size-m);
  }

  vaadin-icon[theme~='badge'][icon][theme~='small'] {
    width: var(--lumo-icon-size-s);
    height: var(--lumo-icon-size-s);
  }

  /* Empty */

  [theme~='badge']:not([icon]):empty {
    min-width: 0;
    width: 1em;
    height: 1em;
    padding: 0;
    border-radius: 50%;
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='small']:not([icon]):empty {
    width: 0.75em;
    height: 0.75em;
  }

  [theme~='badge'][theme~='contrast']:not([icon]):empty {
    background-color: var(--lumo-contrast);
  }

  [theme~='badge'][theme~='success']:not([icon]):empty {
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error']:not([icon]):empty {
    background-color: var(--lumo-error-color);
  }

  /* Pill */

  [theme~='badge'][theme~='pill'] {
    --lumo-border-radius-s: 1em;
  }

  /* RTL specific styles */

  [dir='rtl'][theme~='badge'] vaadin-icon:first-child {
    margin-right: -0.375em;
    margin-left: 0;
  }

  [dir='rtl'][theme~='badge'] vaadin-icon:last-child {
    margin-left: -0.375em;
    margin-right: 0;
  }
`;Ut("",Ho,{moduleId:"lumo-badge"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ze("badge",Ho);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const sl=x`
  /* === Screen readers === */
  .sr-only {
    border-width: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const al=x`
  /* === Background color === */
  .bg-base {
    background-color: var(--lumo-base-color);
  }

  .bg-transparent {
    background-color: transparent;
  }

  .bg-contrast-5 {
    background-color: var(--lumo-contrast-5pct);
  }
  .bg-contrast-10 {
    background-color: var(--lumo-contrast-10pct);
  }
  .bg-contrast-20 {
    background-color: var(--lumo-contrast-20pct);
  }
  .bg-contrast-30 {
    background-color: var(--lumo-contrast-30pct);
  }
  .bg-contrast-40 {
    background-color: var(--lumo-contrast-40pct);
  }
  .bg-contrast-50 {
    background-color: var(--lumo-contrast-50pct);
  }
  .bg-contrast-60 {
    background-color: var(--lumo-contrast-60pct);
  }
  .bg-contrast-70 {
    background-color: var(--lumo-contrast-70pct);
  }
  .bg-contrast-80 {
    background-color: var(--lumo-contrast-80pct);
  }
  .bg-contrast-90 {
    background-color: var(--lumo-contrast-90pct);
  }
  .bg-contrast {
    background-color: var(--lumo-contrast);
  }

  .bg-primary {
    background-color: var(--lumo-primary-color);
  }
  .bg-primary-50 {
    background-color: var(--lumo-primary-color-50pct);
  }
  .bg-primary-10 {
    background-color: var(--lumo-primary-color-10pct);
  }

  .bg-error {
    background-color: var(--lumo-error-color);
  }
  .bg-error-50 {
    background-color: var(--lumo-error-color-50pct);
  }
  .bg-error-10 {
    background-color: var(--lumo-error-color-10pct);
  }

  .bg-success {
    background-color: var(--lumo-success-color);
  }
  .bg-success-50 {
    background-color: var(--lumo-success-color-50pct);
  }
  .bg-success-10 {
    background-color: var(--lumo-success-color-10pct);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ll=x`
  /* === Border === */
  .border-0 {
    border: none;
  }
  .border {
    border: 1px solid;
  }
  .border-b {
    border-bottom: 1px solid;
  }
  .border-l {
    border-left: 1px solid;
  }
  .border-r {
    border-right: 1px solid;
  }
  .border-t {
    border-top: 1px solid;
  }

  /* === Border color === */
  .border-contrast-5 {
    border-color: var(--lumo-contrast-5pct);
  }
  .border-contrast-10 {
    border-color: var(--lumo-contrast-10pct);
  }
  .border-contrast-20 {
    border-color: var(--lumo-contrast-20pct);
  }
  .border-contrast-30 {
    border-color: var(--lumo-contrast-30pct);
  }
  .border-contrast-40 {
    border-color: var(--lumo-contrast-40pct);
  }
  .border-contrast-50 {
    border-color: var(--lumo-contrast-50pct);
  }
  .border-contrast-60 {
    border-color: var(--lumo-contrast-60pct);
  }
  .border-contrast-70 {
    border-color: var(--lumo-contrast-70pct);
  }
  .border-contrast-80 {
    border-color: var(--lumo-contrast-80pct);
  }
  .border-contrast-90 {
    border-color: var(--lumo-contrast-90pct);
  }
  .border-contrast {
    border-color: var(--lumo-contrast);
  }

  .border-primary {
    border-color: var(--lumo-primary-color);
  }
  .border-primary-50 {
    border-color: var(--lumo-primary-color-50pct);
  }
  .border-primary-10 {
    border-color: var(--lumo-primary-color-10pct);
  }

  .border-error {
    border-color: var(--lumo-error-color);
  }
  .border-error-50 {
    border-color: var(--lumo-error-color-50pct);
  }
  .border-error-10 {
    border-color: var(--lumo-error-color-10pct);
  }

  .border-success {
    border-color: var(--lumo-success-color);
  }
  .border-success-50 {
    border-color: var(--lumo-success-color-50pct);
  }
  .border-success-10 {
    border-color: var(--lumo-success-color-10pct);
  }

  /* === Border radius === */
  .rounded-none {
    border-radius: 0;
  }
  .rounded-s {
    border-radius: var(--lumo-border-radius-s);
  }
  .rounded-m {
    border-radius: var(--lumo-border-radius-m);
  }
  .rounded-l {
    border-radius: var(--lumo-border-radius-l);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const dl=x`
  /* === Align content === */
  .content-center {
    align-content: center;
  }
  .content-end {
    align-content: flex-end;
  }
  .content-start {
    align-content: flex-start;
  }
  .content-around {
    align-content: space-around;
  }
  .content-between {
    align-content: space-between;
  }
  .content-evenly {
    align-content: space-evenly;
  }
  .content-stretch {
    align-content: stretch;
  }

  /* === Align items === */
  .items-baseline {
    align-items: baseline;
  }
  .items-center {
    align-items: center;
  }
  .items-end {
    align-items: flex-end;
  }
  .items-start {
    align-items: flex-start;
  }
  .items-stretch {
    align-items: stretch;
  }

  /* === Align self === */
  .self-auto {
    align-self: auto;
  }
  .self-baseline {
    align-self: baseline;
  }
  .self-center {
    align-self: center;
  }
  .self-end {
    align-self: flex-end;
  }
  .self-start {
    align-self: flex-start;
  }
  .self-stretch {
    align-self: stretch;
  }

  /* === Flex === */
  .flex-auto {
    flex: auto;
  }
  .flex-none {
    flex: none;
  }

  /* === Flex direction === */
  .flex-col {
    flex-direction: column;
  }
  .flex-col-reverse {
    flex-direction: column-reverse;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-row-reverse {
    flex-direction: row-reverse;
  }

  /* === Flex grow === */
  .flex-grow-0 {
    flex-grow: 0;
  }
  .flex-grow {
    flex-grow: 1;
  }

  /* === Flex shrink === */
  .flex-shrink-0 {
    flex-shrink: 0;
  }
  .flex-shrink {
    flex-shrink: 1;
  }

  /* === Flex wrap === */
  .flex-nowrap {
    flex-wrap: nowrap;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .flex-wrap-reverse {
    flex-wrap: wrap-reverse;
  }

  /* === Gap === */
  .gap-xs {
    gap: var(--lumo-space-xs);
  }
  .gap-s {
    gap: var(--lumo-space-s);
  }
  .gap-m {
    gap: var(--lumo-space-m);
  }
  .gap-l {
    gap: var(--lumo-space-l);
  }
  .gap-xl {
    gap: var(--lumo-space-xl);
  }

  /* === Gap (column) === */
  .gap-x-xs {
    column-gap: var(--lumo-space-xs);
  }
  .gap-x-s {
    column-gap: var(--lumo-space-s);
  }
  .gap-x-m {
    column-gap: var(--lumo-space-m);
  }
  .gap-x-l {
    column-gap: var(--lumo-space-l);
  }
  .gap-x-xl {
    column-gap: var(--lumo-space-xl);
  }

  /* === Gap (row) === */
  .gap-y-xs {
    row-gap: var(--lumo-space-xs);
  }
  .gap-y-s {
    row-gap: var(--lumo-space-s);
  }
  .gap-y-m {
    row-gap: var(--lumo-space-m);
  }
  .gap-y-l {
    row-gap: var(--lumo-space-l);
  }
  .gap-y-xl {
    row-gap: var(--lumo-space-xl);
  }

  /* === Grid auto flow === */
  .grid-flow-col {
    grid-auto-flow: column;
  }
  .grid-flow-row {
    grid-auto-flow: row;
  }

  /* === Grid columns === */
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  .grid-cols-7 {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
  .grid-cols-8 {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  .grid-cols-9 {
    grid-template-columns: repeat(9, minmax(0, 1fr));
  }
  .grid-cols-10 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }
  .grid-cols-11 {
    grid-template-columns: repeat(11, minmax(0, 1fr));
  }
  .grid-cols-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  /* === Grid rows === */
  .grid-rows-1 {
    grid-template-rows: repeat(1, minmax(0, 1fr));
  }
  .grid-rows-2 {
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
  .grid-rows-3 {
    grid-template-rows: repeat(3, minmax(0, 1fr));
  }
  .grid-rows-4 {
    grid-template-rows: repeat(4, minmax(0, 1fr));
  }
  .grid-rows-5 {
    grid-template-rows: repeat(5, minmax(0, 1fr));
  }
  .grid-rows-6 {
    grid-template-rows: repeat(6, minmax(0, 1fr));
  }

  /* === Justify content === */
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-start {
    justify-content: flex-start;
  }
  .justify-around {
    justify-content: space-around;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-evenly {
    justify-content: space-evenly;
  }

  /* === Span (column) === */
  .col-span-1 {
    grid-column: span 1 / span 1;
  }
  .col-span-2 {
    grid-column: span 2 / span 2;
  }
  .col-span-3 {
    grid-column: span 3 / span 3;
  }
  .col-span-4 {
    grid-column: span 4 / span 4;
  }
  .col-span-5 {
    grid-column: span 5 / span 5;
  }
  .col-span-6 {
    grid-column: span 6 / span 6;
  }
  .col-span-7 {
    grid-column: span 7 / span 7;
  }
  .col-span-8 {
    grid-column: span 8 / span 8;
  }
  .col-span-9 {
    grid-column: span 9 / span 9;
  }
  .col-span-10 {
    grid-column: span 10 / span 10;
  }
  .col-span-11 {
    grid-column: span 11 / span 11;
  }
  .col-span-12 {
    grid-column: span 12 / span 12;
  }

  /* === Span (row) === */
  .row-span-1 {
    grid-row: span 1 / span 1;
  }
  .row-span-2 {
    grid-row: span 2 / span 2;
  }
  .row-span-3 {
    grid-row: span 3 / span 3;
  }
  .row-span-4 {
    grid-row: span 4 / span 4;
  }
  .row-span-5 {
    grid-row: span 5 / span 5;
  }
  .row-span-6 {
    grid-row: span 6 / span 6;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:flex-col {
      flex-direction: column;
    }
    .sm\\:flex-row {
      flex-direction: row;
    }
    .sm\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .sm\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .sm\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .sm\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .sm\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .sm\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .sm\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .sm\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .sm\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .sm\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .sm\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .sm\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }

  @media (min-width: 768px) {
    .md\\:flex-col {
      flex-direction: column;
    }
    .md\\:flex-row {
      flex-direction: row;
    }
    .md\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .md\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .md\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .md\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .md\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .md\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .md\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .md\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .md\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .md\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .md\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .md\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1024px) {
    .lg\\:flex-col {
      flex-direction: column;
    }
    .lg\\:flex-row {
      flex-direction: row;
    }
    .lg\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .lg\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .lg\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .lg\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .lg\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .lg\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .lg\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .lg\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .lg\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .lg\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .lg\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .lg\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1280px) {
    .xl\\:flex-col {
      flex-direction: column;
    }
    .xl\\:flex-row {
      flex-direction: row;
    }
    .xl\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .xl\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .xl\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .xl\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .xl\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .xl\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .xl\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .xl\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .xl\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .xl\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .xl\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .xl\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:flex-col {
      flex-direction: column;
    }
    .\\32xl\\:flex-row {
      flex-direction: row;
    }
    .\\32xl\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const cl=x`
  /* === Box sizing === */
  .box-border {
    box-sizing: border-box;
  }
  .box-content {
    box-sizing: content-box;
  }

  /* === Display === */
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .hidden {
    display: none;
  }
  .inline {
    display: inline;
  }
  .inline-block {
    display: inline-block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .inline-grid {
    display: inline-grid;
  }
  .grid {
    display: grid;
  }

  /* === Overflow === */
  .overflow-auto {
    overflow: auto;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-scroll {
    overflow: scroll;
  }

  /* === Position === */
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .static {
    position: static;
  }
  .sticky {
    position: sticky;
  }
  .relative {
    position: relative;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:flex {
      display: flex;
    }
    .sm\\:hidden {
      display: none;
    }
  }
  @media (min-width: 768px) {
    .md\\:flex {
      display: flex;
    }
    .md\\:hidden {
      display: none;
    }
  }
  @media (min-width: 1024px) {
    .lg\\:flex {
      display: flex;
    }
    .lg\\:hidden {
      display: none;
    }
  }
  @media (min-width: 1280px) {
    .xl\\:flex {
      display: flex;
    }
    .xl\\:hidden {
      display: none;
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:flex {
      display: flex;
    }
    .\\32xl\\:hidden {
      display: none;
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const hl=x`
  /* === Box shadows === */
  .shadow-xs {
    box-shadow: var(--lumo-box-shadow-xs);
  }
  .shadow-s {
    box-shadow: var(--lumo-box-shadow-s);
  }
  .shadow-m {
    box-shadow: var(--lumo-box-shadow-m);
  }
  .shadow-l {
    box-shadow: var(--lumo-box-shadow-l);
  }
  .shadow-xl {
    box-shadow: var(--lumo-box-shadow-xl);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const pl=x`
  /* === Height === */
  .h-0 {
    height: 0;
  }
  .h-xs {
    height: var(--lumo-size-xs);
  }
  .h-s {
    height: var(--lumo-size-s);
  }
  .h-m {
    height: var(--lumo-size-m);
  }
  .h-l {
    height: var(--lumo-size-l);
  }
  .h-xl {
    height: var(--lumo-size-xl);
  }
  .h-auto {
    height: auto;
  }
  .h-full {
    height: 100%;
  }
  .h-screen {
    height: 100vh;
  }

  /* === Height (max) === */
  .max-h-full {
    max-height: 100%;
  }
  .max-h-screen {
    max-height: 100vh;
  }

  /* === Height (min) === */
  .min-h-0 {
    min-height: 0;
  }
  .min-h-full {
    min-height: 100%;
  }
  .min-h-screen {
    min-height: 100vh;
  }

  /* === Icon sizing === */
  .icon-s {
    height: var(--lumo-icon-size-s);
    width: var(--lumo-icon-size-s);
  }
  .icon-m {
    height: var(--lumo-icon-size-m);
    width: var(--lumo-icon-size-m);
  }
  .icon-l {
    height: var(--lumo-icon-size-l);
    width: var(--lumo-icon-size-l);
  }

  /* === Width === */
  .w-xs {
    width: var(--lumo-size-xs);
  }
  .w-s {
    width: var(--lumo-size-s);
  }
  .w-m {
    width: var(--lumo-size-m);
  }
  .w-l {
    width: var(--lumo-size-l);
  }
  .w-xl {
    width: var(--lumo-size-xl);
  }
  .w-auto {
    width: auto;
  }
  .w-full {
    width: 100%;
  }

  /* === Width (max) === */
  .max-w-full {
    max-width: 100%;
  }
  .max-w-screen-sm {
    max-width: 640px;
  }
  .max-w-screen-md {
    max-width: 768px;
  }
  .max-w-screen-lg {
    max-width: 1024px;
  }
  .max-w-screen-xl {
    max-width: 1280px;
  }
  .max-w-screen-2xl {
    max-width: 1536px;
  }

  /* === Width (min) === */
  .min-w-0 {
    min-width: 0;
  }
  .min-w-full {
    min-width: 100%;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ul=x`
  /* === Margin === */
  .m-auto {
    margin: auto;
  }
  .m-0 {
    margin: 0;
  }
  .m-xs {
    margin: var(--lumo-space-xs);
  }
  .m-s {
    margin: var(--lumo-space-s);
  }
  .m-m {
    margin: var(--lumo-space-m);
  }
  .m-l {
    margin: var(--lumo-space-l);
  }
  .m-xl {
    margin: var(--lumo-space-xl);
  }

  /* === Margin (bottom) === */
  .mb-auto {
    margin-bottom: auto;
  }
  .mb-0 {
    margin-bottom: 0;
  }
  .mb-xs {
    margin-bottom: var(--lumo-space-xs);
  }
  .mb-s {
    margin-bottom: var(--lumo-space-s);
  }
  .mb-m {
    margin-bottom: var(--lumo-space-m);
  }
  .mb-l {
    margin-bottom: var(--lumo-space-l);
  }
  .mb-xl {
    margin-bottom: var(--lumo-space-xl);
  }

  /* === Margin (end) === */
  .me-auto {
    margin-inline-end: auto;
  }
  .me-0 {
    margin-inline-end: 0;
  }
  .me-xs {
    margin-inline-end: var(--lumo-space-xs);
  }
  .me-s {
    margin-inline-end: var(--lumo-space-s);
  }
  .me-m {
    margin-inline-end: var(--lumo-space-m);
  }
  .me-l {
    margin-inline-end: var(--lumo-space-l);
  }
  .me-xl {
    margin-inline-end: var(--lumo-space-xl);
  }

  /* === Margin (horizontal) === */
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  .mx-0 {
    margin-left: 0;
    margin-right: 0;
  }
  .mx-xs {
    margin-left: var(--lumo-space-xs);
    margin-right: var(--lumo-space-xs);
  }
  .mx-s {
    margin-left: var(--lumo-space-s);
    margin-right: var(--lumo-space-s);
  }
  .mx-m {
    margin-left: var(--lumo-space-m);
    margin-right: var(--lumo-space-m);
  }
  .mx-l {
    margin-left: var(--lumo-space-l);
    margin-right: var(--lumo-space-l);
  }
  .mx-xl {
    margin-left: var(--lumo-space-xl);
    margin-right: var(--lumo-space-xl);
  }

  /* === Margin (left) === */
  .ml-auto {
    margin-left: auto;
  }
  .ml-0 {
    margin-left: 0;
  }
  .ml-xs {
    margin-left: var(--lumo-space-xs);
  }
  .ml-s {
    margin-left: var(--lumo-space-s);
  }
  .ml-m {
    margin-left: var(--lumo-space-m);
  }
  .ml-l {
    margin-left: var(--lumo-space-l);
  }
  .ml-xl {
    margin-left: var(--lumo-space-xl);
  }

  /* === Margin (right) === */
  .mr-auto {
    margin-right: auto;
  }
  .mr-0 {
    margin-right: 0;
  }
  .mr-xs {
    margin-right: var(--lumo-space-xs);
  }
  .mr-s {
    margin-right: var(--lumo-space-s);
  }
  .mr-m {
    margin-right: var(--lumo-space-m);
  }
  .mr-l {
    margin-right: var(--lumo-space-l);
  }
  .mr-xl {
    margin-right: var(--lumo-space-xl);
  }

  /* === Margin (start) === */
  .ms-auto {
    margin-inline-start: auto;
  }
  .ms-0 {
    margin-inline-start: 0;
  }
  .ms-xs {
    margin-inline-start: var(--lumo-space-xs);
  }
  .ms-s {
    margin-inline-start: var(--lumo-space-s);
  }
  .ms-m {
    margin-inline-start: var(--lumo-space-m);
  }
  .ms-l {
    margin-inline-start: var(--lumo-space-l);
  }
  .ms-xl {
    margin-inline-start: var(--lumo-space-xl);
  }

  /* === Margin (top) === */
  .mt-auto {
    margin-top: auto;
  }
  .mt-0 {
    margin-top: 0;
  }
  .mt-xs {
    margin-top: var(--lumo-space-xs);
  }
  .mt-s {
    margin-top: var(--lumo-space-s);
  }
  .mt-m {
    margin-top: var(--lumo-space-m);
  }
  .mt-l {
    margin-top: var(--lumo-space-l);
  }
  .mt-xl {
    margin-top: var(--lumo-space-xl);
  }

  /* === Margin (vertical) === */
  .my-auto {
    margin-bottom: auto;
    margin-top: auto;
  }
  .my-0 {
    margin-bottom: 0;
    margin-top: 0;
  }
  .my-xs {
    margin-bottom: var(--lumo-space-xs);
    margin-top: var(--lumo-space-xs);
  }
  .my-s {
    margin-bottom: var(--lumo-space-s);
    margin-top: var(--lumo-space-s);
  }
  .my-m {
    margin-bottom: var(--lumo-space-m);
    margin-top: var(--lumo-space-m);
  }
  .my-l {
    margin-bottom: var(--lumo-space-l);
    margin-top: var(--lumo-space-l);
  }
  .my-xl {
    margin-bottom: var(--lumo-space-xl);
    margin-top: var(--lumo-space-xl);
  }

  /* === Padding === */
  .p-0 {
    padding: 0;
  }
  .p-xs {
    padding: var(--lumo-space-xs);
  }
  .p-s {
    padding: var(--lumo-space-s);
  }
  .p-m {
    padding: var(--lumo-space-m);
  }
  .p-l {
    padding: var(--lumo-space-l);
  }
  .p-xl {
    padding: var(--lumo-space-xl);
  }

  /* === Padding (bottom) === */
  .pb-0 {
    padding-bottom: 0;
  }
  .pb-xs {
    padding-bottom: var(--lumo-space-xs);
  }
  .pb-s {
    padding-bottom: var(--lumo-space-s);
  }
  .pb-m {
    padding-bottom: var(--lumo-space-m);
  }
  .pb-l {
    padding-bottom: var(--lumo-space-l);
  }
  .pb-xl {
    padding-bottom: var(--lumo-space-xl);
  }

  /* === Padding (end) === */
  .pe-0 {
    padding-inline-end: 0;
  }
  .pe-xs {
    padding-inline-end: var(--lumo-space-xs);
  }
  .pe-s {
    padding-inline-end: var(--lumo-space-s);
  }
  .pe-m {
    padding-inline-end: var(--lumo-space-m);
  }
  .pe-l {
    padding-inline-end: var(--lumo-space-l);
  }
  .pe-xl {
    padding-inline-end: var(--lumo-space-xl);
  }

  /* === Padding (horizontal) === */
  .px-0 {
    padding-left: 0;
    padding-right: 0;
  }
  .px-xs {
    padding-left: var(--lumo-space-xs);
    padding-right: var(--lumo-space-xs);
  }
  .px-s {
    padding-left: var(--lumo-space-s);
    padding-right: var(--lumo-space-s);
  }
  .px-m {
    padding-left: var(--lumo-space-m);
    padding-right: var(--lumo-space-m);
  }
  .px-l {
    padding-left: var(--lumo-space-l);
    padding-right: var(--lumo-space-l);
  }
  .px-xl {
    padding-left: var(--lumo-space-xl);
    padding-right: var(--lumo-space-xl);
  }

  /* === Padding (left) === */
  .pl-0 {
    padding-left: 0;
  }
  .pl-xs {
    padding-left: var(--lumo-space-xs);
  }
  .pl-s {
    padding-left: var(--lumo-space-s);
  }
  .pl-m {
    padding-left: var(--lumo-space-m);
  }
  .pl-l {
    padding-left: var(--lumo-space-l);
  }
  .pl-xl {
    padding-left: var(--lumo-space-xl);
  }

  /* === Padding (right) === */
  .pr-0 {
    padding-right: 0;
  }
  .pr-xs {
    padding-right: var(--lumo-space-xs);
  }
  .pr-s {
    padding-right: var(--lumo-space-s);
  }
  .pr-m {
    padding-right: var(--lumo-space-m);
  }
  .pr-l {
    padding-right: var(--lumo-space-l);
  }
  .pr-xl {
    padding-right: var(--lumo-space-xl);
  }

  /* === Padding (start) === */
  .ps-0 {
    padding-inline-start: 0;
  }
  .ps-xs {
    padding-inline-start: var(--lumo-space-xs);
  }
  .ps-s {
    padding-inline-start: var(--lumo-space-s);
  }
  .ps-m {
    padding-inline-start: var(--lumo-space-m);
  }
  .ps-l {
    padding-inline-start: var(--lumo-space-l);
  }
  .ps-xl {
    padding-inline-start: var(--lumo-space-xl);
  }

  /* === Padding (top) === */
  .pt-0 {
    padding-top: 0;
  }
  .pt-xs {
    padding-top: var(--lumo-space-xs);
  }
  .pt-s {
    padding-top: var(--lumo-space-s);
  }
  .pt-m {
    padding-top: var(--lumo-space-m);
  }
  .pt-l {
    padding-top: var(--lumo-space-l);
  }
  .pt-xl {
    padding-top: var(--lumo-space-xl);
  }

  /* === Padding (vertical) === */
  .py-0 {
    padding-bottom: 0;
    padding-top: 0;
  }
  .py-xs {
    padding-bottom: var(--lumo-space-xs);
    padding-top: var(--lumo-space-xs);
  }
  .py-s {
    padding-bottom: var(--lumo-space-s);
    padding-top: var(--lumo-space-s);
  }
  .py-m {
    padding-bottom: var(--lumo-space-m);
    padding-top: var(--lumo-space-m);
  }
  .py-l {
    padding-bottom: var(--lumo-space-l);
    padding-top: var(--lumo-space-l);
  }
  .py-xl {
    padding-bottom: var(--lumo-space-xl);
    padding-top: var(--lumo-space-xl);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ml=x`
  /* === Font size === */
  .text-2xs {
    font-size: var(--lumo-font-size-xxs);
  }
  .text-xs {
    font-size: var(--lumo-font-size-xs);
  }
  .text-s {
    font-size: var(--lumo-font-size-s);
  }
  .text-m {
    font-size: var(--lumo-font-size-m);
  }
  .text-l {
    font-size: var(--lumo-font-size-l);
  }
  .text-xl {
    font-size: var(--lumo-font-size-xl);
  }
  .text-2xl {
    font-size: var(--lumo-font-size-xxl);
  }
  .text-3xl {
    font-size: var(--lumo-font-size-xxxl);
  }

  /* === Font weight === */
  .font-thin {
    font-weight: 100;
  }
  .font-extralight {
    font-weight: 200;
  }
  .font-light {
    font-weight: 300;
  }
  .font-normal {
    font-weight: 400;
  }
  .font-medium {
    font-weight: 500;
  }
  .font-semibold {
    font-weight: 600;
  }
  .font-bold {
    font-weight: 700;
  }
  .font-extrabold {
    font-weight: 800;
  }
  .font-black {
    font-weight: 900;
  }

  /* === Line height === */
  .leading-none {
    line-height: 1;
  }
  .leading-xs {
    line-height: var(--lumo-line-height-xs);
  }
  .leading-s {
    line-height: var(--lumo-line-height-s);
  }
  .leading-m {
    line-height: var(--lumo-line-height-m);
  }

  /* === List style type === */
  .list-none {
    list-style-type: none;
  }

  /* === Text alignment === */
  .text-left {
    text-align: left;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .text-justify {
    text-align: justify;
  }

  /* === Text color === */
  .text-header {
    color: var(--lumo-header-text-color);
  }
  .text-body {
    color: var(--lumo-body-text-color);
  }
  .text-secondary {
    color: var(--lumo-secondary-text-color);
  }
  .text-tertiary {
    color: var(--lumo-tertiary-text-color);
  }
  .text-disabled {
    color: var(--lumo-disabled-text-color);
  }
  .text-primary {
    color: var(--lumo-primary-text-color);
  }
  .text-primary-contrast {
    color: var(--lumo-primary-contrast-color);
  }
  .text-error {
    color: var(--lumo-error-text-color);
  }
  .text-error-contrast {
    color: var(--lumo-error-contrast-color);
  }
  .text-success {
    color: var(--lumo-success-text-color);
  }
  .text-success-contrast {
    color: var(--lumo-success-contrast-color);
  }

  /* === Text overflow === */
  .overflow-clip {
    text-overflow: clip;
  }
  .overflow-ellipsis {
    text-overflow: ellipsis;
  }

  /* === Text transform === */
  .capitalize {
    text-transform: capitalize;
  }
  .lowercase {
    text-transform: lowercase;
  }
  .uppercase {
    text-transform: uppercase;
  }

  /* === Whitespace === */
  .whitespace-normal {
    white-space: normal;
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .whitespace-pre {
    white-space: pre;
  }
  .whitespace-pre-line {
    white-space: pre-line;
  }
  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .sm\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .sm\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .sm\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .sm\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .sm\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .sm\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .sm\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 768px) {
    .md\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .md\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .md\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .md\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .md\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .md\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .md\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .md\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1024px) {
    .lg\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .lg\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .lg\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .lg\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .lg\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .lg\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .lg\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .lg\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1280px) {
    .xl\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .xl\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .xl\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .xl\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .xl\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .xl\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .xl\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .xl\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .\\32xl\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .\\32xl\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .\\32xl\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .\\32xl\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .\\32xl\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .\\32xl\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .\\32xl\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Wo=x`
${sl}
${al}
${ll}
${hl}
${dl}
${cl}
${pl}
${ul}
${ml}
`;Ut("",Wo,{moduleId:"lumo-utility"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ze("utility",Wo);const gl=t=>{t!==document&&(Ue(kr.cssText,"",t,!0),Ue($r.cssText,"",t,!0),Ue(Tr.cssText,"",t,!0),Ue(Ho.cssText,"",t,!0),Ue(Wo.cssText,"",t,!0)),document._vaadintheme_theming_componentCss||(document._vaadintheme_theming_componentCss=!0)},fl=gl;fl(document);export{J as $,je as B,os as D,I as L,es as P,bl as T,ze as a,Ya as b,x as c,W as d,Te as e,ge as f,ts as g,f as h,$r as i,Sr as j,Ce as k,vs as l,fs as m,k as n,y as p,ot as q,Ut as r,Ve as s,kr as t,wn as u,P as y};
