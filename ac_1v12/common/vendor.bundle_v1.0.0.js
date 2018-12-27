/*! jQuery v2.1.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.1",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+Math.random()}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)
    },_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(ob(c,"script"),kb),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(hb,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function tb(a){var b=l,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:"0",fontWeight:"400"},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?zb.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=yb(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(n.cssHooks[a+b].set=Gb)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}n.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Kb.prototype.init,n.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=n.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||tb(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?tb(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ub(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return n.map(k,Ub,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xb,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xb(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),n.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Lb=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Lb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Mb||(Mb=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Mb),Mb=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Yb,Zb,$b=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
    },removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||n.find.attr;$b[b]=function(a,b,d){var e,f;return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=n.now(),dc=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=l.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,n.ajaxSettings),b):tc(n.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=n.ajaxSettings.xhr();a.ActiveXObject&&n(a).on("unload",function(){for(var a in Dc)Dc[a]()}),k.cors=!!Fc&&"withCredentials"in Fc,k.ajax=Fc=!!Fc,n.ajaxTransport(function(a){var b;return k.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||n.expando+"_"+cc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Ic=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Jc})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=yb(k.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Lc=a.jQuery,Mc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Mc),b&&a.jQuery===n&&(a.jQuery=Lc),n},typeof b===U&&(a.jQuery=a.$=n),n});

/**
 * Created by shaoyongkai on 2017/3/30.
 */
(function (doc, win) {
    window.base = document.documentElement.clientWidth / 1920;
    var docEl = doc.documentElement;
    var recalc = function () {
        window.clientWidth = docEl.clientWidth;
        window.clientHeight = docEl.clientHeight;
        let aspectRatio = window.clientWidth / window.clientHeight;
        if (aspectRatio > 1920 / 1080) {
            docEl.style.fontSize = 100 * (window.clientHeight / 1080) + 'px';
            window.base = 100 * (window.clientHeight / 1080);
        } else {
            docEl.style.fontSize = 100 * (window.clientWidth / 1920) + 'px';
            window.base = 100 * (window.clientWidth / 1920);
        }
    };

    var timer = null;
    win.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            recalc();
        },300)
    }, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

/**
 * Created by shaoyongkai on 2017/3/30.
 * h5 drag
 */
(function($) {
    var old = $.fn.drag;

    function Drag(element, options) {
        this.ver = '1.0';
        this.$element = $(element);
        this.options = $.extend({}, $.fn.drag.defaults, options);//所有值被合并到这个空对象上，保护了插件里面的默认值。
        this.init();
    }

    Drag.prototype = {
        constructor: Drag,
        init: function() {
            var options = this.options;
            //todo  记录 【第一次】 初始位置,以便复位使用
            this.$element.each(function() {
                var startPos = $(this).position();
                $(this).data('startPos', {
                    left: startPos.left/base + 'rem',
                    top: startPos.top/base + 'rem'
                });
            });

            this.$element.on('touchstart.drag.founder mousedown.drag.founder', function(e) {
                e.preventDefault();
                var ev = e.type == 'touchstart' ? e.originalEvent.touches[0] : e,
                    startPos = $(this).position(),
                    disX = ev.pageX - startPos.left,
                    disY = ev.pageY - startPos.top,
                    that = this;
                if (options.before && $.isFunction(options.before)) {
                    options.before.call(that, ev);
                }

                $(document).on('touchmove.drag.founder mousemove.drag.founder', function(e) {
                    e.preventDefault();
                    var ev = e.type == 'touchmove' ? e.originalEvent.touches[0] : e,
                        $this = $(that),
                        $parent = $this.offsetParent(),
                        $parent=$parent.is(':root')?$(window):$parent,
                        pPos = $parent.offset(),
                        pPos=pPos?pPos:{left:0,top:0},
                        left = ev.pageX - disX ,
                        top = ev.pageY - disY,
                        r = $parent.width() - $this.outerWidth(true),
                        d = $parent.height() - $this.outerHeight(true);

                    left = left < 0 ? 0 : left > r ? r : left;
                    top = top < 0 ? 0 : top > d ? d : top;


                    $(that).css({
                        left: left/base + 'rem',
                        top: top/base + 'rem'
                    });

                    $(that).attr("data-left", left/base + 'rem');
                    $(that).attr("data-top", top/base + 'rem');

                    if (options.process && $.isFunction(options.process)) {
                        options.process.call(that, ev);
                    }
                });

                $(document).on('touchend.drag.founder mouseup.drag.founder', function(e) {
                    var ev = e.type == 'touchend' ? e.originalEvent.changedTouches[0] : e;
                    $(document).off('.drag.founder');
                    if (options.end && $.isFunction(options.end)) {
                        options.end.call(that, ev);
                    }
                });
            });
        }
    };

    //jQ插件模式
    $.fn.drag = function(options) {
        return this.each(function() {
            var $this = $(this),
                instance = $this.data('drag');

            if (!instance) {
                instance = new Drag(this, options);
                $this.data('drag', instance);
            } else {
                instance.init();
            }

            if (typeof options === 'string') {
                //instance.options[options].call(this);
            }

        });
    };
    //设置默认行为
    $.fn.drag.defaults = {
        before: $.noop,
        process: $.noop,
        end: $.noop
    };
    //释放drag使用权
    $.fn.drag.noConflict = function() {
        $.fn.drag = old;
        return this;
    };
})(window.jQuery);

/**
 * Created by haoweirui on 2017/3/25.
 * 说明：
 *      白板sdk，提供下列功能                 启用状态                           调用方式                            参数 //说明                                         特别说明
 *          |____生成配置文件表接口              √                          createConf(type)                       const  //返回固定配置信息
 *          |                                                                                                  normal //返回可变更配置信息
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____绑定div 并初始化接口            √         bindWB(targetID,constConf,changeConf,callback)         targetID  //需要绑定的div的id
 *          |                                                                                                  constConf //上面生成并按需修改后的固定配置信息
 *          |                                                                                                  changeConf//上面生成并按需修改后的可变更配置信息
 *          |                                                                                                  callback  //白板数据返回调用函数
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____调用工具接口                   √                      draw(toolsType,callback)                   toolsType //工具类型  value见特别说明                pencil/highPencil/rect/rubberOld/rubberNew/draft/seal/text/back/clear
 *          |                                                                                                   callback  //调用成功的回调 toolsType为seal时必须
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____更改白板配置接口                √                    updateChangeConf(changeConf)                 changeConf //要更新的可配置信息                      注意仅支持一级key  例如{a:'',b:{c:''}},支持只传a:''或者b:{},不支持直接传c:''
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____缩放接口接口                   √                            wbResize()                                                                             当白板div大小变化时调用
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____数据传入显示接口                √                           setData(Arr)                          Arr  //要显示的数据数组
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____数据id修改接口                 √                          changeData(obj)                        obj  //要修改的id信息
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____数据获取接口                   √                             getData()                                                                              返回当前绑定白板的所有信息
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____修改印章数据接口                ×                 changeSealSource(sealConf,callback)             sealConf  //关于印章的信息
 *          |                                                                                                   callback  //印章加载完成的回调
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____生成图片接口                   ×          buildCurrentImg(width,height,rotate,callback)          width     //宽度                                   宽高比必须固定
 *          |                                                                                                   height    //高度                                   宽高比必须固定
 *          |                                                                                                   rotate    //背景图片旋转打印                         目前仅支持90度的倍数范围是-270到270
 *          |                                                                                                   callback  //生成的图片数据回调
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 */
(function (root, $) {
    root.WBSDK = (function () {
        var toolsOpen = [];
        var version = '2.0';
        var check = function () {
            var sUserAgent = navigator.userAgent.toLowerCase(),
                bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
                bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
                bIsMidp = sUserAgent.match(/midp/i) == "midp",
                bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
                bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
                bIsAndroid = sUserAgent.match(/android/i) == "android",
                bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
                bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                clientInfo.type = 'mobile';
                clientInfo.eventName.mouseDown = 'touchstart';
                clientInfo.eventName.mouseMove = 'touchmove';
                clientInfo.eventName.mouseUp = 'touchend';
                clientInfo.eventName.mouseOut = false;
            } else {
                clientInfo.type = 'pc';
            }
        }
        var clientInfo = {
            type : 'pc',//pc mobile
            eventName : {
                mouseDown : 'mousedown',
                mouseMove : 'mousemove',
                mouseUp : 'mouseup',
                mouseOut : 'mouseout'
            }
        };
        check();
        var gerFuc = {//通用方法
            initBoard: function (targetID, constConf, changeConf, callback) {
                //首先记录绑定初始化数据
                //可变数据记录
                this.changeConf = changeConf;
                //const数据记录  可枚举和查看，但不可修改和删除
                Object.defineProperties(this, {
                    targetID: {
                        value: targetID,
                        enumerable: true,
                        configurable: false,
                        writable: false
                    },
                    constConf: {
                        value: constConf,
                        enumerable: true,
                        configurable: false,
                        writable: false,
                    },
                    callback: {
                        value: callback,
                        enumerable: true,
                        configurable: false,
                        writable: false,
                    }
                })
                //绑定事件
                var allTools = ['pencil', 'highPencil', 'rect', 'text', 'rubberOld', 'seal', 'back', 'clear', 'reEdit', 'rubberNew', 'draft'];
                var _self = this;
                //初始化开发工具集
                $.each(allTools, function (i, v) {
                    if (_self.constConf[v] && _self.constConf[v].value) {//not undefined or false
                        _self.toolsOpen.push(v);
                    }
                })
                //判断是否处于寻找当前目标元素的模式
                if (_self.toolsOpen.indexOf('reEdit') !== -1 || _self.toolsOpen.indexOf('rubberNew') !== -1 || _self.toolsOpen.indexOf('draft') !== -1) {
                    _self.isSearch = true;//有以上三种情况之一就要支持移动鼠标查找当前数据的操作
                }

                _self.conf.canvas.parentCon = $('#' + _self.targetID);
                //生成canvas元素
                _self.conf.canvas.target = document.createElement('canvas');//结果层
                _self.conf.canvas.target.id = _self.targetID + '_canvas';
                _self.conf.canvas.targetBak = document.createElement('canvas');//过程层
                _self.conf.canvas.targetBak.id = _self.targetID + '_canvasBak';
                _self.conf.canvas.targetImg = document.createElement('canvas');//图片层
                _self.conf.canvas.targetImg.id = _self.targetID + '_canvasImg';
                //插入canvas元素
                var parentDNode = document.getElementById(targetID);
                parentDNode.appendChild(_self.conf.canvas.target);
                parentDNode.appendChild(_self.conf.canvas.targetBak);
                parentDNode.appendChild(_self.conf.canvas.targetImg);
                //设置canvas元素属性
                _self.conf.canvas.parentCon.css('overflow', 'hidden');
                $('#' + _self.conf.canvas.target.id).css(_self.conf.cssInfo.canvas);
                $('#' + _self.conf.canvas.targetBak.id).css(_self.conf.cssInfo.canvasBak);
                $('#' + _self.conf.canvas.targetImg.id).css(_self.conf.cssInfo.canvasImg);
                //获取canvas元素上下文对象
                _self.conf.canvas.targetContext = _self.conf.canvas.target.getContext('2d');
                _self.conf.canvas.targetBakContext = _self.conf.canvas.targetBak.getContext('2d');
                _self.conf.canvas.targetImgContext = _self.conf.canvas.targetImg.getContext('2d');
                ;//图片层

                //文字相关
                _self.conf.paintBoard.input = $('<div id="' + targetID + '_input" autofocus="autofocus" tabindex="-1"></div>').appendTo(_self.conf.canvas.parentCon);//输入框容器
                _self.conf.paintBoard.edit = $('<span id="' + targetID + '_edit" contenteditable="true"></span>').appendTo(_self.conf.paintBoard.input);//输入框
                _self.conf.paintBoard.inputBak = $('<div id="' + targetID + '_inputBak"></span><div>').appendTo(_self.conf.canvas.parentCon);
                _self.conf.paintBoard.editBak = $('<span id="' + targetID + '_editBak">').appendTo(_self.conf.paintBoard.inputBak);
                _self.conf.paintBoard.input.css(_self.conf.cssInfo.input);
                _self.conf.paintBoard.edit.css(_self.conf.cssInfo.edit);
                _self.conf.paintBoard.inputBak.css(_self.conf.cssInfo.inputBak);
                _self.conf.paintBoard.editBak.css(_self.conf.cssInfo.editBak);

                //如果当前模式是绘制模式 防止建立多余的监听机制
                if (_self.constConf.paintModule.value == 'draw') {
                    //建立文本编辑过程中的键盘事件  两个事件必须同时监听否则会出现监听不到的现象
                    // _self.conf.paintBoard.edit.on('keyup', function (e) {
                    //     gerFuc.key_event.call(_self, document.getElementById(_self.targetID + '_edit'), e);
                    // });
                    // _self.conf.paintBoard.edit.on('keydown', function (e) {
                    //     gerFuc.key_event.call(_self, document.getElementById(_self.targetID + '_edit'), e);
                    // });

                    //绑定画布的鼠标事件
                    gerFuc.bindEvent.call(_self, $('#' + _self.conf.canvas.targetBak.id));
                    //绑定文本操作中的事件
                    gerFuc.bindEvent.call(_self, _self.conf.paintBoard.input);

                    //更新当前的默认画笔
                    if (_self.constConf.firstTool && _self.constConf.firstTool.value != '') {
                        _self.curDrawType = _self.constConf.firstTool.value;
                        if (_self.toolsOpen.indexOf(_self.constConf.firstTool.value) !== -1) {
                            gerFuc.draw.call(_self, _self.curDrawType);
                            console.log('[ %s ]---------------------------------> init default tool : %s', getTimeNow(), _self.constConf.firstTool.value);
                        } else {
                            console.error('[ %s ]---------------------------------> error happened when init default tool , unopened tool is used to init current tool : %s', getTimeNow(), _self.constConf.firstTool);
                            return;
                        }
                    } else {
                        console.warn('[ %s ]---------------------------------> there is no default tool type when init default tool!', getTimeNow());
                    }
                }


                gerFuc.drawBackImg.call(_self);//首先绘制背景图片
                //调用一次，为conf复制
                gerFuc.review.call(_self, _self.conf.canvas.parentCon.width(), _self.conf.canvas.parentCon.height());
                _self.isInited = true;
            },
            review: function (wid, hei) {
                //-----------------------屏蔽缩放屏幕时的文字错乱---------------------------
                if (this.conf.paintBoard.input && this.conf.paintBoard.input.css('display') != 'none') {
                    gerFuc.write_end.call(this);
                }
                //-----------------------屏蔽缩放屏幕时的文字错乱---------------------------

                //一些别名
                var temCanvas = this.conf.canvas.target,
                    temCanvasBak = this.conf.canvas.targetBak;

                //设置画布的位置属性
                temCanvas.width = wid;
                temCanvas.height = hei;
                temCanvasBak.width = wid;
                temCanvasBak.height = hei;
                this.conf.paintBoard.inputBak.css('top', hei + 'px');
                //------------------修改---------start------------
                this.conf.canvas.targetImg.style.top = hei + 'px';
                //------------------修改---------end------------
                //获取offset信息，防止绘制的偏移现象
                var offset = this.conf.canvas.parentCon.offset();
                //更新当前的属性信息
                this.conf.canvas.width = wid;
                this.conf.canvas.height = hei;
                this.conf.canvas.left = offset.left;
                this.conf.canvas.top = offset.top;
                //更新数据池的信息

                //用于如果resize之后的重绘本地数据信息
                gerFuc.repaint.call(this);
            },
            bindEvent: function (target) {
                var _self = this;
                target.unbind();
                clientInfo.eventName.mouseDown && target.bind(clientInfo.eventName.mouseDown, gerFuc.mousedown.bind(_self));
                clientInfo.eventName.mouseMove && target.bind(clientInfo.eventName.mouseMove, gerFuc.mousemove.bind(_self));
                clientInfo.eventName.mouseUp && target.bind(clientInfo.eventName.mouseUp, gerFuc.mouseup.bind(_self));
                clientInfo.eventName.mouseOut && target.bind(clientInfo.eventName.mouseOut, gerFuc.mouseout.bind(_self));
            },
            drawBackImg: function (width, height, rotate, callback) {
                if (typeof width == 'function') {
                    callback = width;
                    width = this.conf.canvas.width;
                } else {
                    width = width || this.conf.canvas.width;
                }
                if (typeof height == 'function') {
                    callback = height;
                    height = this.conf.canvas.height;
                } else {
                    height = height || this.conf.canvas.height;
                }
                if (typeof rotate == 'function') {
                    callback = rotate;
                    rotate = 0;
                } else {
                    height = height || 0;
                }
                if (!callback) {
                    //先将背景图放在容器的背景
                    if (this.changeConf.background.module === 'default') {
                        this.conf.canvas.parentCon.css({
                            'background-image': 'url("' + this.changeConf.background.source + '")',
                            'background-size': '100% 100%',
                            '-moz-background-size': '100% 100%',
                            '-webkit-background-size': '100% 100%'
                        });
                    } else if (this.changeConf.background.module === 'real') {
                        this.conf.canvas.parentCon.css({
                            'background-image': 'url("' + this.changeConf.background.source + '")',
                            'background-size': 'auto auto',
                            '-moz-background-size': 'auto auto',
                            '-webkit-background-size': 'auto auto'
                        });
                    }
                    //记录当前的背景信息，防止配置文件被更改
                    this.curBackGIMG.module = this.changeConf.background.module;
                    this.curBackGIMG.source = this.changeConf.background.source;
                }
                else {
                    try {
                        //真实绘图，打印图片

                        //首先暂停绘制
                        this.changeConf.pauseDraw.state = true;

                        //负责绘制canvas的背景图片
                        var temImg = document.createElement('img');
                        var _self = this;
                        temImg.onload = function () {
                            //------------------修改---------start------------
                            //先将本地的画布大小记录并修改为用户想要的尺寸
                            var temW = this.conf.canvas.width,
                                temH = this.conf.canvas.height;
                            _self.conf.canvas.width = width;
                            _self.conf.canvas.height = height;
                            _self.conf.canvas.targetImg.width = 0;
                            _self.conf.canvas.targetImg.width = width;
                            _self.conf.canvas.targetImg.height = height;
                            var base = width / temImg.height;
                            if (rotate !== 0) {
                                _self.conf.canvas.centerPX = Math.round(width / 2);
                                _self.conf.canvas.centerPY = Math.round(height / 2);
                                _self.conf.canvas.targetImgContext.save();//保存状态
                                if (Math.abs(rotate) == 90 || Math.abs(rotate) == 270 || Math.abs(rotate) == 180) {
                                    _self.conf.canvas.targetImgContext.translate(_self.conf.canvas.centerPX, _self.conf.canvas.centerPY);//设置画布上的(0,0)位置，也就是旋转的中心点
                                } else {
                                    console.error('[ %s ]---------------------------------> error happened when build current canvas to base64 images : nonsupport rotate number', getTimeNow());
                                    _self.conf.canvas.targetImgContext.restore();//恢复状态
                                    return;
                                }

                                _self.conf.canvas.targetImgContext.rotate(rotate * Math.PI / 180);
                                _self.conf.canvas.targetImgContext.translate(-_self.conf.canvas.centerPX, -_self.conf.canvas.centerPY);//恢复画布的中心点
                            } else {
                                _self.conf.canvas.centerPX = 0;
                                _self.conf.canvas.centerPY = 0;
                            }

                            _self.conf.canvas.targetImgContext.globalCompositeOperation = 'source-over';


                            //为了保持和当前背景图片一致，使用WEBSDK的对象下的背景数据
                            if (_self.curBackGIMG.module === 'default') {
                                if (Math.abs(rotate) == 90 || Math.abs(rotate) == 270) {
                                    _self.conf.canvas.targetImgContext.drawImage(temImg, _self.conf.canvas.centerPX - temImg.width / 2 * base, _self.conf.canvas.centerPY - temImg.height / 2 * base,
                                        height, width);
                                } else if (Math.abs(rotate) == 180) {
                                    _self.conf.canvas.targetImgContext.drawImage(temImg, _self.conf.canvas.centerPX - temImg.height / 2 * base, _self.conf.canvas.centerPY - temImg.width / 2 * base,
                                        width, height);
                                } else {
                                    _self.conf.canvas.targetImgContext.drawImage(temImg, 0, 0, width, height);
                                }
                                // _self.conf.canvas.targetImgContext.drawImage(temImg,_self.conf.canvas.centerPX-temImg.width/2,_self.conf.canvas.centerPY-temImg.height/2,_self.conf.canvas.width,_self.conf.canvas.height+1000);
                                // _self.conf.canvas.targetImgContext.drawImage(temImg,0,0,);
                            } else if (_self.curBackGIMG.module === 'real') {
                                if (Math.abs(rotate) == 90 || Math.abs(rotate) == 270) {
                                    _self.conf.canvas.targetImgContext.drawImage(temImg, _self.conf.canvas.centerPX - temImg.width / 2 * base, _self.conf.canvas.centerPY - temImg.height / 2 * base);
                                } else if (Math.abs(rotate) == 180) {
                                    _self.conf.canvas.targetImgContext.drawImage(temImg, _self.conf.canvas.centerPX - temImg.height / 2 * base, _self.conf.canvas.centerPY - temImg.width / 2 * base);
                                } else {
                                    _self.conf.canvas.targetImgContext.drawImage(temImg, -temImg.width / 2 * base, -temImg.height / 2 * base);
                                }
                                _self.conf.canvas.targetImgContext.drawImage(temImg, _self.conf.canvas.centerPX - temImg.width / 2, _self.conf.canvas.centerPY - temImg.height / 2);
                                // _self.conf.canvas.targetImgContext.drawImage(temImg,0,0,temImg.width,temImg.height,-_self.conf.canvas.centerPX,-_self.conf.canvas.centerPY,temImg.width,temImg.height);
                            }
                            if (rotate !== 0) {
                                _self.conf.canvas.centerPX = 0;
                                _self.conf.canvas.centerPY = 0;
                                _self.conf.canvas.targetImgContext.restore();//恢复状态
                            }
                            //启动绘制背景图片的模式  目标画布为img
                            gerFuc.repaint.call(_self, 1, _self.conf.canvas.targetImgContext);

                            //再恢复本地的尺寸数据
                            _self.conf.canvas.width = temW;
                            _self.conf.canvas.height = temH;

                            callback(_self.conf.canvas.targetImg.toDataURL('img/png'));

                            //恢复绘制
                            _self.changeConf.pauseDraw.state = false;
                            //------------------修改---------end------------
                        }
                        temImg.onerror = function () {
                            //重新加入背景图片
                            gerFuc.drawBackImg.call(_self);
                            //去除canvas背景重绘
                            gerFuc.repaint.call(_self);
                            callback(_self.conf.canvas.target.toDataURL('img/png'));
                        }
                        //为了保持和当前背景图片一致，使用_self的对象下的背景数据
                        temImg.src = _self.curBackGIMG.source;
                    } catch (e) {
                        console.error('[ %s ]---------------------------------> error happened when build current canvas to base64 images : %s', getTimeNow(), e);
                    }

                }
            },
            buildImg: function (width, height, rotate, callback) {
                //将背景图片绘制到canvas上
                return gerFuc.drawBackImg.call(this, width, height, rotate, callback);
            },
            setSealIMG: function (callback) {
                if (!callback) {
                    console.warn('[ %s ]---------------------------------> there is no callback function,something will be wrong!', getTimeNow());
                }
                try {
                    if (this.changeConf.seal.source !== '' || this.changeConf.seal.type !== '') {
                        if (this.changeConf.seal.source !== '' && this.changeConf.seal.type !== '') {
                            if (!this.conf.canvas.seal.img[this.changeConf.seal.type]) {
                                this.conf.canvas.seal.img[this.changeConf.seal.type] = document.createElement('img');
                                var _self = this;
                                this.conf.canvas.seal.img[this.changeConf.seal.type].onload = function () {
                                    _self.conf.canvas.seal.curType = _self.changeConf.seal.type;
                                    if (callback) {
                                        callback('success');
                                    }
                                };
                                this.conf.canvas.seal.img[_self.seal.type].onerror = function () {
                                    this.conf.canvas.seal.img[_self.changeConf.seal.type] = null;
                                    if (callback) {
                                        callback('error');
                                    }
                                };

                                this.conf.canvas.seal.img[this.changeConf.seal.type].src = this.changeConf.seal.source;
                            } else {
                                this.conf.canvas.seal.curType = this.changeConf.seal.type;
                                if (callback) {
                                    callback('success');
                                }
                            }
                        } else {
                            if (callback) {
                                callback('error');
                            }
                            console.error('[ %s ]---------------------------------> error happened when draw seal type : there is some changeConf for seal lost', getTimeNow());
                        }
                    } else {
                        if (callback) {
                            callback('error');
                        }
                        console.error('[ %s ]---------------------------------> error happened when draw seal type : there is some changeConf for seal lost', getTimeNow());
                    }
                } catch (e) {
                    if (callback) {
                        callback('error');
                    }
                    console.error('[ %s ]---------------------------------> error happened when change seal\'s source : %s', getTimeNow(), e);
                }
            },
            draw: function (graphType, callback) {
                //处理操作信息
                if (graphType == 'back') {
                    if(this.backObj){
                        var targetId = this.backObj.targetID;//取当前的要删除的对象
                        if (targetId) {//防止空
                            gerFuc.handle_back.call(this, targetId);//调用撤销函数
                        }else{
                            console.error('[ %s ]----------->error happened when back: backObj is null', getTimeNow());
                        }
                    }
                    if (callback) {
                        callback('success');
                    }
                }
                else if (graphType == 'clear') {
                    gerFuc.handle_clear.call(this);//清空
                    if (callback) {
                        callback('success');
                    }
                }
                else {
                    this.curDrawType = graphType;//record current draw type 记录当前的画笔类型
                    //如果是图章工具
                    if (graphType === 'seal') {
                        gerFuc.setSealIMG.call(this, callback);
                    } else {
                        if (callback) {
                            callback('success');
                        }
                    }
                }
            },
            mousedown: function (e) {
                e = e || window.event || arguments.callee.caller.arguments[0];
                var winEvent = e;
                if(clientInfo.type == "mobile"){
                    e = e.touches?e.touches[0]:(e.originalEvent?(e.originalEvent.touches[0]?e.originalEvent.touches[0]:e.originalEvent.changedTouches[0]):e);
                }
                //更新outEvent
                this.outEvent = false;
                if (this.constConf.paintModule.value == 'draw' && !this.changeConf.pauseDraw.state) {//if canvas can be allowed to draw now
                    var context = this.conf.canvas.targetBakContext,
                        canvasW = this.conf.canvas.width,
                        canvasH = this.conf.canvas.height;
                    //paint the words to the board when we edit words but not click board  防止在编辑文字时，未点击画布其他位置将文字打印在画布上
                    if (this.conf.paintBoard.input.css('display') != 'none' && this.curDrawType != 'text') {
                        var id_cur = (e.target || e.srcElement).id;
                        if (id_cur != this.targetID + '_input' && id_cur != this.targetID + '_edit') {
                            gerFuc.write_end.call(this);
                        }
                    }
                    this.downEvent = true;//record down event 记录down事件

                    //update offset data
                    var offset = this.conf.canvas.parentCon.offset();
                    this.conf.canvas.left = offset.left;
                    this.conf.canvas.top = offset.top;

                    //update mouse data
                    this.mouseData.startX = Math.round(e.clientX + document.body.scrollLeft - this.conf.canvas.left);
                    this.mouseData.startY = Math.round(e.clientY + document.body.scrollTop - this.conf.canvas.top);

                    //单独处理矩形区域的点，避免溢出看不到绘制的边线
                    if (this.curDrawType === 'rect') {
                        var lineBW = Math.round(this.changeConf.rect.size * canvasW / this.constConf.baseSize.value);
                        this.mouseData.startX = (this.mouseData.startX - lineBW) >= 0 ? this.mouseData.startX : lineBW;
                        this.mouseData.startY = (this.mouseData.startY - lineBW) >= 0 ? this.mouseData.startY : lineBW;
                    }

                    //更新鼠标信息
                    this.mouseData.minX = this.mouseData.startX;
                    this.mouseData.minY = this.mouseData.startY;
                    this.mouseData.maxX = this.mouseData.startX;
                    this.mouseData.maxY = this.mouseData.startY;

                    //clear container of all points 先清空一次鼠标数据
                    this.mouseData.pointArr.length = 0;

                    var _self = this;
                    switch (_self.curDrawType) {
                        //每一个case基本模式都一样，先记录点信息，然后设置canvas的特定属性，之后就是canvas的固定写法
                        case 'pencil':
                            var lineWid = Math.round(_self.changeConf.pencil.size * canvasW / this.constConf.baseSize.value);
                            //set context 设置绘制配置信息
                            context.strokeStyle = _self.changeConf.pencil.color;
                            context.lineWidth = lineWid;
                            context.moveTo(_self.mouseData.startX, _self.mouseData.startY);
                            _self.mouseData.pointArr.push({'x': _self.mouseData.startX, 'y': _self.mouseData.startY});
                            context.beginPath();
                            break;
                        case 'highPencil':
                            context.moveTo(_self.mouseData.startX, _self.mouseData.startY);

                            _self.mouseData.pointArr.push({'x': _self.mouseData.startX, 'y': _self.mouseData.startY});
                            context.save();
                            context.beginPath();
                            context.globalAlpha = _self.changeConf.highPencil.alpha;
                            context.globalCompositeOperation = 'xor';
                            context.strokeStyle = _self.changeConf.highPencil.color;
                            context.lineWidth = _self.changeConf.highPencil.size * canvasW / this.constConf.baseSize.value;
                            break;
                        case 'rect':
                            var lineWid = Math.round(_self.changeConf.rect.size * canvasW / this.constConf.baseSize.value);
                            //set context 设置绘制配置信息
                            context.strokeStyle = _self.changeConf.rect.color;
                            context.lineWidth = lineWid;
                            context.moveTo(_self.mouseData.startX, _self.mouseData.startY);

                            _self.mouseData.pointArr.push({'x': _self.mouseData.startX, 'y': _self.mouseData.startY});
                            break;
                        case 'rubberOld':
                            var sizerub = _self.changeConf.rubberOld.size;
                            _self.mouseData.pointArr.push({'x': _self.mouseData.startX, 'y': _self.mouseData.startY});
                            context.clearRect(_self.mouseData.startX - sizerub / 2, _self.mouseData.startY - sizerub / 2, sizerub, sizerub);
                            break;
                        case 'rubberNew':
                            var tem_e = _self.curTarget;
                            if (tem_e) {
                                //统一颜色
                                gerFuc.reInitColor.call(_self);
                                //修改当前的笔迹颜色
                                tem_e.color = _self.changeConf.targetSelect.color;
                                //所有笔迹重新绘制
                                gerFuc.repaint.call(_self);
                            }
                            break;
                        case 'text':
                            var target = e.target || e.srcElement;
                            if (target.id == _self.targetID + '_input') {//拖拽
                                //标记哨兵 表明现在正在处于拖拽状态
                                _self.textData.signTextDrag = true;
                                //设置为只读状态
                                _self.conf.paintBoard.edit.readOnly = 'true';
                                //设置当前状态下的最大宽高
                                _self.conf.paintBoard.input.css({
                                    'min-width': _self.conf.paintBoard.input.scrollWidth + 'px',
                                    'min-height': _self.conf.paintBoard.input.scrollHeight + 'px'
                                });
                                //阻止事件的默认事件以及向上冒泡
                                winEvent.preventDefault();
                                winEvent.stopPropagation();
                            }
                            else if (target.id == _self.targetID + '_edit') {//输入
                                //更改哨兵
                                _self.textData.signTextDrag = false;
                                //可写
                                _self.conf.paintBoard.edit.readOnly = '';
                                //阻止冒泡
                                e.stopPropagation();
                            } else {
                                if (_self.conf.paintBoard.input.css('display') == "none") {
                                    if (_self.toolsOpen.indexOf('reEdit') !== -1 && _self.curTarget != null && _self.curTarget.drawingType == 4) {//重写
                                        //reedit module
                                        gerFuc.reEditText.call(_self, e);
                                    }
                                    else {//写文字
                                        //first time to text
                                        gerFuc.write_start.call(_self, _self.mouseData.startX, _self.mouseData.startY);
                                    }
                                }
                                else {//打印
                                    gerFuc.write_end.call(_self);
                                    gerFuc.clearConText.call(_self);
                                    _self.textData.signTextDrag = false;
                                }
                            }
                            break;
                        case 'draft':
                            if (_self.curTarget && _self.curTarget.drawingType != 10) {
                                //必须记录的两个重要信息 初始的位置信息
                                _self.dragData.initialLeft = _self.curTarget.drag_left;
                                _self.dragData.initialTop = _self.curTarget.drag_top;
                                _self.curTarget.color = _self.changeConf.targetSelect.color;
                                //先隐藏这笔，但是要画在蒙版上
                                _self.curTarget.display = 0;
                                gerFuc.repaint.call(_self);
                                _self.curTarget.display = 1;
                                _self.curTarget.handle(_self.conf.canvas, _self.constConf.baseSize.value, _self.textData.inputBorder, context);
                            }
                            break;
                        case 'seal'://新增印章 黑鸟
                            //只监听最后的抬起
                            break;
                        default :
                            break;
                    }
                    if (_self.curDrawType != 'text') {
                        winEvent.preventDefault();
                        winEvent.stopPropagation();
                    }
                }
            },
            mousemove: function (e) {
                e = e || window.event || arguments.callee.caller.arguments[0];
                var winEvent = e;
                if(clientInfo.type == "mobile"){
                    e = e.touches?e.touches[0]:(e.originalEvent?(e.originalEvent.touches[0]?e.originalEvent.touches[0]:e.originalEvent.changedTouches[0]):e);
                }
                //更新outEvent
                this.outEvent = false;
                var context = this.conf.canvas.targetBakContext,
                    canvasW = this.conf.canvas.width,
                    canvasH = this.conf.canvas.height;
                //calculate the point {x,y} to line to
                var x = Math.round(e.clientX + document.body.scrollLeft - this.conf.canvas.left);
                var y = Math.round(e.clientY + document.body.scrollTop - this.conf.canvas.top);
                this.mouseData.nowX = x;
                this.mouseData.nowY = y;
                if (this.downEvent) {//in the event of down event is alive 判断如果down事件被点击
                    this.mouseData.minX = (x < this.mouseData.minX) ? x : this.mouseData.minX;
                    this.mouseData.maxX = (x > this.mouseData.maxX) ? x : this.mouseData.maxX;
                    this.mouseData.minY = (y < this.mouseData.minY) ? y : this.mouseData.minY;
                    this.mouseData.maxY = (y > this.mouseData.maxY) ? y : this.mouseData.maxY;

                    var _self = this;
                    switch (_self.curDrawType) {
                        case 'pencil':
                            context.lineTo(x, y);
                            context.stroke();
                            _self.mouseData.pointArr.push({'x': x, 'y': y});
                            break;
                        case 'highPencil':
                            context.lineTo(x, y);
                            context.stroke();
                            _self.mouseData.pointArr.push({'x': x, 'y': y});
                            break;
                        case 'rect':
                            context.beginPath();
                            gerFuc.clearConText.call(_self);
                            context.moveTo(_self.mouseData.startX, _self.mouseData.startY);
                            context.lineTo(x, _self.mouseData.startY);
                            context.lineTo(x, y);
                            context.lineTo(_self.mouseData.startX, y);
                            context.lineTo(_self.mouseData.startX, _self.mouseData.startY);
                            context.lineTo(x, _self.mouseData.startY);
                            context.stroke();
                            break;
                        case 'rubberOld':
                            var sizerub = _self.changeConf.rubberOld.size;
                            _self.mouseData.pointArr.push({'x': x, 'y': y});
                            _self.conf.canvas.targetContext.clearRect(x - sizerub / 2, y - sizerub / 2, sizerub, sizerub);
                            break;
                        case 'rubberNew':
                            _self.curTarget = gerFuc.e_search.call(_self, x, y);
                            var targetCr = _self.curTarget;
                            gerFuc.reInitColor.call(_self);
                            if (targetCr) {
                                targetCr.color = _self.changeConf.targetSelect.color;
                            }
                            gerFuc.repaint.call(_self);
                            break;
                        case 'text':
                            if (_self.textData.signTextDrag)//编辑过程中的拖拽
                            {
                                //_self.textData.pointXTD maybe == _self.mouseData.startX and maybe not
                                _self.conf.paintBoard.input.css({
                                    'left': _self.textData.pointXTD + x - _self.mouseData.startX + 'px',
                                    'top': _self.textData.pointYTD + y - _self.mouseData.startY + 'px'
                                });
                                //_self.textData.pointLeftTD and _self.textData.pointTopTD used to avoid tea turn page when stu is dragging text
                                _self.textData.pointLeftTD = _self.textData.pointXTD + x - _self.mouseData.startX;
                                _self.textData.pointTopTD = _self.textData.pointYTD + y - _self.mouseData.startY;
                            }
                            break;
                        case 'draft':
                            //这里做移动操作
                            //improve safety
                            if (_self.curTarget) {
                                gerFuc.clearConText.call(_self);
                                var s = _self.curTarget.canvasWidth / canvasW;
                                _self.curTarget.drag_left = Math.round((x - _self.mouseData.startX) * s + _self.dragData.initialLeft);
                                _self.curTarget.drag_top = Math.round((y - _self.mouseData.startY) * s + _self.dragData.initialTop);
                                _self.curTarget.handle(_self.conf.canvas, _self.constConf.baseSize.value, _self.textData.inputBorder, context);
                            }
                            break;
                        case 'seal'://新增印章 黑鸟
                            //只监听最后的抬起
                            break;
                        default:
                            break;
                    }
                }
                else if (!this.changeConf.pauseDraw.state && this.isSearch && !this.textData.signREdit) {//新功能中的down未触发，移动鼠标，高亮当前的笔迹
                    this.curTarget = null;
                    this.curTarget = gerFuc.e_search.call(this, x, y);
                    if (this.curTarget) {//当前鼠标区域存在笔迹
                        var a = this.curDrawType == 'rubberNew',//新版橡皮擦 new rubber
                            //draft module but current target type is not Highlighter pen
                            b = this.curDrawType == 'draft' && this.curTarget.drawingType != 10,//当前对象不是荧光笔且处于拖拽模式
                            //text module but current target type is text
                            c = this.curDrawType == 'text' && this.curTarget.drawingType == 4,//处于编辑模式切当前为文字文字
                            //different id from last color changed target
                            d = this.curTarget.id != this.colorChangeId;
                        if ((a || b || c) && d) {
                            gerFuc.reInitColor.call(this);
                            this.colorChange = true;
                            if (this.curTarget.drawingType != 4)//not text
                            {
                                this.colorName = this.curTarget.color;
                                this.curTarget.color = this.changeConf.targetSelect.color;
                            }
                            else//text
                            {
                                this.colorName = this.curTarget.font_color;
                                this.curTarget.font_color = this.changeConf.targetSelect.color;
                            }
                            gerFuc.repaint.call(this);
                            this.colorChangeId = this.curTarget.id;
                        }
                    }
                    else if (this.colorChange) {//当前鼠标区域没有笔迹，但是之前的操作有笔迹颜色的变化
                        //回复颜色
                        gerFuc.reInitColor.call(this);
                        //重绘
                        gerFuc.repaint.call(this);
                        //修改哨兵
                        this.colorChange = false;
                        this.colorChangeId = -1;
                    }
                }
                //除去文本的默认事件处理  文本之前已经处理，不再统一处理，涉及到拖拽
                if (this.curDrawType != 'text') {
                    winEvent.preventDefault();
                    winEvent.stopPropagation();
                }
            },
            mouseup: function (e) {
                e = e || window.event || arguments.callee.caller.arguments[0];
                var winEvent = e;
                if(clientInfo.type == "mobile"){
                    e = e.touches?e.touches[0]:(e.originalEvent?(e.originalEvent.touches[0]?e.originalEvent.touches[0]:e.originalEvent.changedTouches[0]):e);
                }
                if (!this.changeConf.pauseDraw.state && this.downEvent) {
                    var re;
                    var canvasW = this.conf.canvas.width,
                        canvasH = this.conf.canvas.height;
                    //处理文本的拖拽的过程中文本区域超出canvas的区域
                    if (this.curDrawType == 'text') {
                        re = gerFuc.inputRange.call(this);//获取纠正数据
                        this.conf.paintBoard.edit.focus();
                    }
                    //down事件完毕
                    this.downEvent = false;
                    var x = 0,
                        y = 0;

                    //avoid window.event is undefined
                    //避免window.event为undefined
                    x = (e.clientX) ? (Math.round(e.clientX + document.body.scrollLeft - this.conf.canvas.left)) : this.mouseData.nowX;
                    y = (e.clientY) ? (Math.round(e.clientY + document.body.scrollTop - this.conf.canvas.top)) : this.mouseData.nowY;

                    //单独处理矩形区域的点，避免溢出看不到绘制的边线
                    if (this.curDrawType === 'rect') {
                        //策略：先对0做纠正，然后再比较当前的点信息加边宽和canvas的宽高对比，调节当前的点
                        var lineWid = Math.round(this.changeConf.rect.size * canvasW / this.constConf.baseSize.value);
                        x = (x - lineWid) >= 0 ? x : lineWid;
                        y = (y - lineWid) >= 0 ? y : lineWid;

                        x = (x + lineWid - this.conf.canvas.width) <= 0 ? x : this.conf.canvas.width - lineWid;
                        y = (y + lineWid - this.conf.canvas.height) <= 0 ? y : this.conf.canvas.height - lineWid;
                    }

                    if (this.curDrawType === 'seal') {
                        //先对当前的x y做处理  保证不超出当前的  为后面的居中操作做合法数据
                        x = x - this.changeConf.seal.width / 2 > 0 ? x : this.changeConf.seal.width / 2;
                        y = y - this.changeConf.seal.height / 2 > 0 ? y : this.changeConf.seal.height / 2;

                        x = canvasW - x - this.changeConf.seal.width / 2 >= 0 ? x : canvasW - this.changeConf.seal.width / 2;
                        y = canvasH - y - this.changeConf.seal.height / 2 >= 0 ? y : canvasH - this.changeConf.seal.height / 2;

                        //居中显示
                        x -= this.changeConf.seal.width / 2;
                        y -= this.changeConf.seal.height / 2;

                        this.mouseData.minX = x;
                        this.mouseData.maxX = x + this.changeConf.seal.width;
                        this.mouseData.minY = y;
                        this.mouseData.maxY = y + this.changeConf.seal.height;
                    } else {
                        this.mouseData.minX = (x < this.mouseData.minX) ? x : this.mouseData.minX;
                        this.mouseData.maxX = (x > this.mouseData.maxX) ? x : this.mouseData.maxX;
                        this.mouseData.minY = (y < this.mouseData.minY) ? y : this.mouseData.minY;
                        this.mouseData.maxY = (y > this.mouseData.maxY) ? y : this.mouseData.maxY;
                    }

                    //计算当前的笔迹的矩形区域
                    var child_div_W = Math.max(Math.round(this.mouseData.maxX - this.mouseData.minX), 10 * canvasW / this.constConf.baseSize.value);
                    var child_div_H = Math.max(Math.round(this.mouseData.maxY - this.mouseData.minY), 10 * canvasW / this.constConf.baseSize.value);

                    this.mouseData.pointArr.push({'x': x, 'y': y});

                    //mouse's move is effective or not  屏蔽无意义的点击，防抖处理
                    var effectMove = this.mouseData.minX != this.mouseData.maxX || this.mouseData.minY != this.mouseData.maxY;

                    var _self = this;
                    switch (_self.curDrawType) {
                        case 'pencil':
                            /*封装obj*/
                            if (effectMove) {
                                var obj = {
                                    'handleType': 0,//add
                                    'drawingType': 0,//pen
                                    'localID': _self.localIDHead + _self.localID,
                                    'svcID': -1,
                                    'specialValue': {
                                        'ownerID': _self.constConf.ownerID.value,
                                        'color': _self.changeConf.pencil.color,
                                        'size': _self.changeConf.pencil.size,
                                        'canvasWidth': canvasW,
                                        'canvasHeight': canvasH,
                                        'child_div_W': child_div_W,//current handwriting's area  笔迹的矩形区域
                                        'child_div_H': child_div_H,//current handwriting's area  笔迹的矩形区域
                                        'margin_left': _self.mouseData.minX,//current handwriting's position  笔迹矩形区域的边距
                                        'margin_top': _self.mouseData.minY,//current handwriting's position   笔迹矩形区域的边距
                                        'point': _self.mouseData.pointArr.slice(0)//container of points  点信息
                                    }
                                };
                                //发送给callback
                                gerFuc.objFactory.call(_self,'add',_self.localID,obj);

                                //显示该笔迹
                                gerFuc.showPaint.call(_self, obj, 'local');

                                //清除过程层笔迹
                                gerFuc.clearConText.call(_self);
                            }
                            break;
                        case 'highPencil':
                            if (effectMove) {
                                /*封装obj*/
                                var obj = {
                                    'handleType': 0,//add
                                    'drawingType': 10,//sign pen
                                    'localID': _self.localIDHead + _self.localID,
                                    'svcID': -1,
                                    'specialValue': {
                                        'ownerID': _self.constConf.ownerID.value,
                                        'color': _self.changeConf.highPencil.color,
                                        'size': _self.changeConf.highPencil.size,
                                        'alpha': _self.changeConf.highPencil.alpha,
                                        'canvasWidth': canvasW,
                                        'canvasHeight': canvasH,
                                        'child_div_W': child_div_W,//current handwriting's area  笔迹的矩形区域
                                        'child_div_H': child_div_H,//current handwriting's area  笔迹的矩形区域
                                        'margin_left': _self.mouseData.minX,//current handwriting's position  笔迹矩形区域的边距
                                        'margin_top': _self.mouseData.minY,//current handwriting's position  笔迹矩形区域的边距
                                        'point': _self.mouseData.pointArr.slice(0)//container of points 点信息
                                    }
                                };
                                //发送给callback
                                gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                                //显示该笔迹
                                gerFuc.showPaint.call(_self, obj, 'local');

                                //恢复一次
                                _self.conf.canvas.targetBakContext.restore();
                                //清除过程层笔迹
                                gerFuc.clearConText.call(_self);
                            }
                            break;
                        case 'rect':
                            if (effectMove) {
                                child_div_W = _self.mouseData.maxX - _self.mouseData.minX;
                                child_div_H = _self.mouseData.maxY - _self.mouseData.minY;

                                /*封装obj*/
                                var obj = {
                                    'handleType': 0,//add
                                    'drawingType': 2,//rectangle
                                    'localID': _self.localIDHead + _self.localID,
                                    'svcID': -1,
                                    'specialValue': {
                                        'ownerID': _self.constConf.ownerID.value,
                                        'color': _self.changeConf.rect.color,
                                        'size': _self.changeConf.rect.size,
                                        'canvasWidth': canvasW,
                                        'canvasHeight': canvasH,
                                        'child_div_W': child_div_W,//current handwriting's area  笔迹的矩形区域
                                        'child_div_H': child_div_H,//current handwriting's area  笔迹的矩形区域
                                        'margin_left': _self.mouseData.minX,//current handwriting's position  笔迹矩形区域的边距
                                        'margin_top': _self.mouseData.minY,//current handwriting's position  笔迹矩形区域的边距
                                        'point': _self.mouseData.pointArr.slice(0)//container of points  点信息
                                    }
                                };
                                //发送给callback
                                gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                                //显示该笔迹
                                gerFuc.showPaint.call(_self, obj, 'local');

                                //清除过程层笔迹
                                gerFuc.clearConText.call(_self);
                            }
                            break;
                        case 'rubberOld':
                            /*封装obj*/
                            var obj = {
                                'handleType': 0,//add
                                'drawingType': 3,//rubber
                                'localID': _self.localIDHead + _self.localID,
                                'svcID': -1,
                                'specialValue': {
                                    'ownerID': _self.constConf.ownerID.value,
                                    'color': _self.changeConf.pencil.color,
                                    'size': _self.changeConf.rubberOld.size,
                                    'canvasWidth': canvasW,
                                    'canvasHeight': canvasH,
                                    'child_div_W': child_div_W,//current handwriting's area  笔迹的矩形区域
                                    'child_div_H': child_div_H,//current handwriting's area  笔迹的矩形区域
                                    'margin_left': _self.mouseData.minX,//current handwriting's position  笔迹矩形区域的边距
                                    'margin_top': _self.mouseData.minY,//current handwriting's position  笔迹矩形区域的边距
                                    'point': _self.mouseData.pointArr.slice(0)//container of points  点信息
                                }
                            };
                            //发送给callback
                            gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                            var sizerub = _self.changeConf.rubberOld.size;
                            //清除最后一个点
                            _self.conf.canvas.targetContext.clearRect(x - sizerub / 2, y - sizerub / 2, sizerub, sizerub);
                            //显示该笔迹
                            gerFuc.showPaint.call(_self, obj, 'local');
                            break;
                        case 'rubberNew':
                            var tem_e = gerFuc.e_search.call(_self, x, y);
                            if (tem_e) {
                                /*封装obj*/
                                var obj = {
                                    'handleType': 0,//add
                                    'drawingType': 500,//new handle
                                    'localID': _self.localIDHead + _self.localID,
                                    'svcID': -1,
                                    'specialValue': {
                                        'localID': tem_e.id,
                                        'type': 0 //new rubber
                                    }
                                };
                                //发送给callback
                                gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                                //回复颜色
                                switch (tem_e.drawingType) {
                                    case 0://pencil
                                        tem_e.color = _self.changeConf.pencil.color;
                                        break;
                                    case 2://rect
                                        tem_e.color = _self.changeConf.rect.color;
                                        break;
                                    case 4://text
                                        tem_e.color = _self.changeConf.text.fontColor;
                                        break;
                                    case 10:
                                        tem_e.color = _self.changeConf.targetSelect.color;
                                        break;
                                }

                                //显示
                                gerFuc.showPaint.call(_self, obj, 'local');

                                gerFuc.repaint.call(_self);
                            }
                            else {
                                gerFuc.reInitColor.call(_self);
                                gerFuc.repaint.call(_self);
                            }
                            break;
                        case 'text':
                            if (_self.textData.signTextDrag) {
                                var input = document.getElementById(_self.targetID + '_input'),
                                    edit = document.getElementById(_self.targetID + '_edit'),
                                    inputBak = document.getElementById(_self.targetID + '_inputBak');
                                var bor = 2 * _self.textData.inputBorder;//获取input的border宽度
                                var minW = Math.round(_self.changeConf.text.fontSize * canvasW / _self.constConf.baseSize.value);//设置的默认的显示的输入框大小
                                //获取当前的偏移值
                                _self.textData.pointLeftTD = _self.textData.pointXTD + x - _self.mouseData.startX;
                                _self.textData.pointTopTD = _self.textData.pointYTD + y - _self.mouseData.startY;
                                //纠正当前的偏移值
                                _self.textData.pointXTD = _self.textData.pointLeftTD + re.shiftX;
                                _self.textData.pointYTD = _self.textData.pointTopTD + re.shiftY;
                                //获取当前的文本的宽高
                                _self.textData.inputMaxWid = canvasW - _self.textData.pointXTD - bor;
                                _self.textData.inputMaxHei = canvasH - _self.textData.pointYTD - bor;
                                //重置容器的最大的宽高
                                input.style.maxWidth = _self.textData.inputMaxWid + 'px';
                                input.style.maxHeight = _self.textData.inputMaxHei + 'px';
                                inputBak.style.maxWidth = _self.textData.inputMaxWid + 'px';
                                inputBak.style.maxHeight = _self.textData.inputMaxHei + 'px';
                                //根据纠正的值重置边距位置
                                input.style.left = _self.textData.pointXTD + 'px';
                                input.style.top = _self.textData.pointYTD + 'px';
                                //设置最小的宽高
                                input.style.minWidth = minW + 'px';
                                input.style.minHeight = minW + 'px';
                                //还原
                                _self.textData.signTextDrag = false;
                                //可写
                                edit.readOnly = '';
                            }
                            break;
                        case 'draft':
                            if (effectMove) {
                                if (x - _self.mouseData.startX != 0 || y - _self.mouseData.startY != 0) {//是否移动了
                                    if (_self.curTarget && !_self.textData.signREdit) {
                                        //if current target over or not， four kinds 拖拽时是否超出画布，四个方向四种情况
                                        var s = canvasW / _self.curTarget.canvasWidth;
                                        if (s * (_self.curTarget.margin_left + _self.curTarget.drag_left) < 0) {
                                            _self.curTarget.drag_left = Math.round(0 - _self.curTarget.margin_left);
                                        }
                                        if (s * (_self.curTarget.margin_top + _self.curTarget.drag_top) < 0) {
                                            _self.curTarget.drag_top = Math.round(0 - _self.curTarget.margin_top);
                                        }
                                        if (s * (_self.curTarget.margin_left + _self.curTarget.drag_left + _self.curTarget.child_div_W) > canvasW) {
                                            _self.curTarget.drag_left = Math.round((canvasW - 10) / s - _self.curTarget.child_div_W - _self.curTarget.margin_left);
                                        }
                                        if (s * (_self.curTarget.margin_top + _self.curTarget.drag_top + _self.curTarget.child_div_H) > canvasH) {
                                            _self.curTarget.drag_top = Math.round(canvasH / s - _self.curTarget.child_div_H - _self.curTarget.margin_top);
                                        }

                                        gerFuc.clearConText.call(_self);

                                        var obj = {
                                            'handleType': 0,//add
                                            'drawingType': 500,//new handle
                                            'localID': _self.localIDHead + _self.localID,
                                            'svcID': -1,
                                            'specialValue': {
                                                'localID': _self.curTarget.id,
                                                'type': 1,//drag
                                                'drag_left': _self.curTarget.drag_left,//x轴拖拽的距离
                                                'drag_top': _self.curTarget.drag_top//y轴拖拽的距离
                                            }
                                        };
                                        //发送给callback
                                        gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                                        gerFuc.showPaint.call(_self, obj, 'local');

                                        _self.curTarget.handle(_self.conf.canvas, _self.constConf.baseSize.value, _self.textData.inputBorder, _self.conf.canvas.targetContext);
                                    }
                                }
                            } else {
                                gerFuc.repaint.call(_self);
                            }
                            break;
                        case 'seal'://新增印章 黑鸟
                            if (_self.conf.canvas.seal.curType != '' && _self.conf.canvas.seal.img[_self.conf.canvas.seal.curType]) {
                                //只监听最后的抬起
                                var obj = {
                                    'handleType': 0,//add
                                    'drawingType': 20,//seal 图章
                                    'localID': _self.localIDHead + _self.localID,
                                    'svcID': -1,
                                    'specialValue': {
                                        'ownerID': _self.constConf.ownerID.value,
                                        'width': _self.changeConf.seal.width,
                                        'height': _self.changeConf.seal.height,
                                        'sealType': _self.conf.canvas.seal.curType,
                                        'canvasWidth': canvasW,
                                        'canvasHeight': canvasH,
                                        'child_div_W': _self.changeConf.seal.width,//current handwriting's area  笔迹的矩形区域
                                        'child_div_H': _self.changeConf.seal.height,//current handwriting's area  笔迹的矩形区域
                                        'margin_left': _self.mouseData.minX,//current handwriting's position  笔迹矩形区域的边距
                                        'margin_top': _self.mouseData.minY//current handwriting's position   笔迹矩形区域的边距
                                    }
                                };
                                //发送给callback
                                gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                                //直接显示在结果层上显示该笔迹
                                gerFuc.showPaint.call(_self, obj, 'local');
                            }
                            break;
                        default :
                            break;
                    }
                    try {
                        if (this.curDrawType != 'text') {
                            gerFuc.clearConText.call(this);
                            winEvent.preventDefault();
                            winEvent.stopPropagation();
                        }
                    } catch (e) {

                    }
                }
                else if(this.changeConf.pauseDraw.state && this.downEvent){
                    var _self = this;
                    //如果没画完老师就不允许绘制了 此时丢掉当前笔画 并回归状态
                    this.downEvent = false;
                    //清除过程层笔迹
                    gerFuc.clearConText.call(_self);
                }
                this.outEvent = false;
            },
            mouseout: function (e) {
                var target = e.target || e.srcElement;
                var winEvent = e;
                if(clientInfo.type == "mobile"){
                    e = e.touches?e.touches[0]:(e.originalEvent?(e.originalEvent.touches[0]?e.originalEvent.touches[0]:e.originalEvent.changedTouches[0]):e);
                }
                //out事件发生
                this.outEvent = true;

                /*编辑时无视鼠标划出，防止失效*/
                if(!this.textData.signTextDrag)
                {
                    gerFuc.mouseup.call(this, e);
                }

                winEvent.preventDefault();
                winEvent.stopPropagation();
            },
            key_event: function (that, e) {
                //-------------------处理拖住过程中的输入-------------------
                if (this.textData.signTextDrag) {
                    gerFuc.mouseup.call(this);
                }
                //-------------------处理拖住过程中的输入-------------------
                //防止直接复制网页的文字，显示网页乱码
                that.innerText = that.innerText.toString();
                //赋值
                this.textData.textInput = that.innerText;
                //策略
                //用一个属性相同的input和edit来决定看是否超出了canvas的区域
                document.getElementById(this.targetID + '_editBak').innerText = '';
                document.getElementById(this.targetID + '_editBak').innerText = this.textData.textInput;
                var b = Math.round(4 * this.conf.canvas.width / this.constConf.baseSize.value);//border  4是相对与baseSize来说的边框宽度
                if ((document.getElementById(this.targetID + '_inputBak').scrollHeight - 2*b) > parseInt(document.getElementById(this.targetID + '_inputBak').style.maxHeight.replace('px','')) && e.keyCode != 8 && e.keyCode != 46) {
                    //超出了高度  不再允许写入但是允许删除
                    //恢复到之前的文字
                    that.innerText = this.textData.lastTextInput;
                    //移动光标到尾部
                    gerFuc.keyAction.call(this, that);
                    e.preventDefault();
                } else {
                    //没有超出canvas的高度
                    this.textData.lastTextInput = this.textData.textInput;
                    this.textData.textInput = '';
                }
                gerFuc.keyAction.call(this, that);
                document.getElementById(this.targetID + '_editBak').innerText = "";
            },
            write_start: function (x, y) {//x y current point
                var input = document.getElementById(this.targetID + '_input'),
                    edit = document.getElementById(this.targetID + '_edit'),
                    editBak = document.getElementById(this.targetID + '_editBak'),
                    inputBak = document.getElementById(this.targetID + '_inputBak'),
                    canvasW = this.conf.canvas.width,
                    canvasH = this.conf.canvas.height;
                //获取焦点
                edit.autofocus = "true";

                edit.innerText = "";
                this.textData.textInput = "";

                //for set initial input's width and height
                var w = Math.round(this.changeConf.text.fontSize * canvasW / this.constConf.baseSize.value);//根据当前的画布大小和文字的大小动态形成默认的编辑区域的宽度
                var h = Math.round((this.changeConf.text.fontSize + 10) * canvasW / this.constConf.baseSize.value);//根据当前的画布的大小和文字的大小动态形成编辑区域的高度  10是防止出现滚动条的调节值
                var b = Math.round(4 * canvasW / this.constConf.baseSize.value);//border  4是相对与baseSize来说的边框宽度
                //to avoid edit over input 防止刚开始点击时出现的输入框超出canvas的区域 做值得纠正：举例：右下角点击，出现的边框位置纠正
                y = ((y + h + 2 * b) > canvasH) ? (canvasH - h - 2 * b) : y;
                x = ((x + w + 2 * b) > canvasW) ? (canvasW - w - 2 * b) : x;
                //记录css的值
                this.textData.inputBorder = b;
                this.textData.inputMaxWid = canvasW - x - 2 * b;
                this.textData.inputMaxHei = canvasH - y - 2 * b;
                this.textData.fontSize = w;
                //设置css
                input.style.border = 'dashed ' + b + 'px blue';
                input.style.zIndex = 5;
                input.style.maxWidth = this.textData.inputMaxWid + 'px';
                input.style.maxHeight = this.textData.inputMaxHei + 'px';
                input.style.display = 'block';
                input.style.left = x + 'px';
                input.style.top = y + 'px';

                edit.style.minWidth = w + 'px';
                edit.style.display = 'block';
                edit.style.font = 'bold ' + w + "px " + this.changeConf.text.fontStyle;

                inputBak.style.border = 'dashed ' + b + 'px blue';
                inputBak.style.maxWidth = this.textData.inputMaxWid + 'px';
                inputBak.style.maxHeight = this.textData.inputMaxHei + 'px';
                editBak.style.font = 'bold ' + w + "px " + this.changeConf.text.fontStyle;
                //记录当前的初始值
                this.textData.pointXTD = x;
                this.textData.pointYTD = y;
                this.textData.pointLeftTD = x;
                this.textData.pointTopTD = y;
            },
            write_writing: function () {//text but something else is alive,text must be drawed to pain board 已废弃
                if (this.conf.paintBoard.css('display') != 'none') {
                    gerFuc.write_end.call(this);
                }
            },
            write_end: function () {//text end
                var canvasW = this.conf.canvas.width,
                    canvasH = this.conf.canvas.height,
                    input = document.getElementById(this.targetID + '_input'),
                    edit = document.getElementById(this.targetID + '_edit'),
                    editBak = document.getElementById(this.targetID + '_editBak'),
                    inputBak = document.getElementById(this.targetID + '_inputBak');
                var child_w = parseInt(input.scrollWidth),//取编辑器的宽
                    child_h = parseInt(input.scrollHeight);//取编辑器的高
                //隐藏编辑器
                input.style.display = "none";

                var theString = "";//用于存储待处理的文字串
                var changedStr = '';//用于存储处理完的文字串
                var replacedStr = '';//用于存储处理完的文字串
                //一些标记，标记当前未处理串中是否存在各种标签
                var sign_div = -1,//是否存在<div>
                    sign_br = -1,//是否存在<br>
                    sign_div_end = -1,//是否存在</div>
                    sign_for = 0,//for循环
                    sign_len = 0;//avoid dead loop 避免死循环，保证循环能释放
                theString = edit.innerHTML;//取元数据
                theString = gerFuc.removeDanger.call(this, theString);//移除js脚本或者html代码，避免xss攻击

                sign_len = theString.length;
                //因为鉴于使用的是maxHeight,所以会存在以下的各种情况，换行：<div>********</div>  <br>  需要将这几种情况修改掉，替换为换行符
                if (theString.indexOf('<div>') != -1 || theString.indexOf('<br>') != -1) {//there is a line break  存在其中一种情况，存在换行
                    for (sign_for = 0; sign_for < sign_len; sign_for++) {
                        //判断存在哪一种情况
                        sign_div = theString.indexOf('<div>');
                        sign_br = theString.indexOf('<br>');
                        sign_div_end = theString.indexOf('</div>');

                        if (sign_div == -1) {//there is not any div  不存在<div>
                            if (sign_br == -1) {//there is not any div and br 不存在<br>
                                theString = theString.replace(/<\/div>/g, ''); //不管有没有，干掉</div> 容错
                                break;
                            }
                            else {//only br  只有<br>的情况
                                theString = theString.replace(/<br>/g, '\n');
                                break;
                            }
                        } else {//some div is here 存在<div>
                            if (sign_br == -1) {//there is not any br 表明<div></div>之间不存在<br>
                                theString.replace(/<div>/g, '\n').replace(/<\/div>/g, '');
                                break;
                            } else {//some br is here   两种情况都存在
                                if (sign_br < sign_div) {//br is head  这种情况<br>在前
                                    theString = theString.replace(/<br>/, '\n');
                                } else {//div first  这种情况<div>在前
                                    if (sign_br < sign_div_end) {//br between <div> and </div>  这种情况<div><br></div>
                                        theString.replace(/<div>/, '\n').replace(/<\/div>/, '').replace(/<br>/, '');
                                    } else {//br out <div></div> 这种情况<div></div><br>
                                        theString.replace(/<div>/, '\n').replace(/<\/div>/, '');
                                    }
                                }
                            }
                        }
                    }
                    //强制在处理一次，避免出错
                    if (theString.indexOf('<div>') != -1) {
                        theString = theString.replace(/<div>/g, '\n').replace(/<\/div>/g, '').replace(/<br>/g, '');
                    } else {
                        theString = theString.replace(/<br>/g, '\n');
                    }
                }
                //下面开始拿上面处理过的数据，从相同属性的input和edit中过一遍，找到换行的结点插入换行符
                if (theString != '') {
                    var str_temp = "";
                    var recordI = 0;//avoid dead loop  避免死循环
                    var curHeight = 0;//current height  当前的高度

                    editBak.innerText = "";
                    for (var i = 0; i < theString.length; i++, recordI++) {
                        if (theString.charAt(i) != "\n" && theString.charAt(i) != "\r\n")//当前的字符不是换行符
                        {//no any \n
                            editBak.innerText += theString.charAt(i);
                            //策略：
                            //先判断当前的clientHeight和上一个curHeight比较是不是变化了，如果变化了还不足以说明已经还行了，因为一些操作也能造成这种现象
                            //再拿text.fontSize/3和上面两者之间的差值作比较，以确保现在是换行
                            //这样做的理由是如果真的是换行的话，一定会大于text.fontSize/3
                            if (curHeight != 0 && inputBak.clientHeight > curHeight &&
                                Math.abs(inputBak.clientHeight - curHeight) > this.changeConf.text.fontSize / 3)//sign of \n
                            {
                                str_temp += '\n';
                                changedStr += str_temp;
                                str_temp = theString.charAt(i);
                            } else {//no any \n 当前的字符还不是可以换行的字符
                                str_temp += theString.charAt(i);
                            }
                            if (i + 1 == theString.length) {//end  当前为最后一个字符
                                changedStr += str_temp;
                            }
                            //更新记录当前的高度
                            curHeight = inputBak.clientHeight;
                        }
                        else//当前的字符是换行符
                        {//handle of \n
                            str_temp += '\n';
                            changedStr += str_temp;
                            str_temp = "";
                            //换行后从头再来
                            editBak.innerText = '';
                            curHeight = inputBak.clientHeight;
                        }
                    }
                    //回复现场
                    editBak.innerText = "";
                    replacedStr = changedStr;
                }
                var _self = this;
                //区别是重写还是第一次写文字
                if (!_self.textData.signREdit) {
                    //第一次写文字，避免写空
                    if (theString != '') {//avoid null
                        var obj = {
                            'handleType': 0,//add
                            'drawingType': 4,//text
                            'localID': _self.localIDHead + _self.localID,
                            'svcID': -1,
                            'specialValue': {
                                'ownerID': _self.constConf.ownerID.value,
                                'font': {
                                    'font_color': _self.changeConf.text.fontColor,
                                    'font_size': Math.round(_self.changeConf.text.fontSize * canvasW / _self.constConf.baseSize.value),
                                    'font_style': _self.changeConf.text.fontStyle
                                },
                                'canvasWidth': canvasW,
                                'canvasHeight': canvasH,
                                'child_div_W': child_w,//current handwriting's area 笔迹的矩形区域
                                'child_div_H': child_h,//current handwriting's area 笔迹的矩形区域
                                'margin_left': _self.textData.pointXTD,//current handwriting's position 笔迹的矩形区域的边距
                                'margin_top': _self.textData.pointYTD,//current handwriting's position 笔迹的矩形区域的边距
                                'str_text':root.MyBase64.encode(replacedStr)//text   将处理完的文字发送到对端，一、避免再次解析 二、保持两端的一致性
                            }
                        };
                        //发送给callback
                        gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                        //本端显示
                        gerFuc.showPaint.call(this, obj, 'local');
                    }
                }
                else {//重写
                    var s = this.curTarget.canvasWidth / canvasW;
                    //新的笔迹区域的宽高
                    this.curTarget.child_div_W = Math.round(child_w * s);
                    this.curTarget.child_div_H = Math.round(child_h * s);
                    //在重写中拖拽的距离
                    this.curTarget.drag_left = Math.round((this.textData.pointXTD) * s - this.curTarget.margin_left);
                    this.curTarget.drag_top = Math.round((this.textData.pointYTD) * s - this.curTarget.margin_top);


                    var obj = {
                        'handleType': 0,//add
                        'drawingType': 500,//new handle
                        'localID': _self.localIDHead + _self.localID,
                        'svcID': -1,
                        'specialValue': {
                            'localID': _self.curTarget.id,
                            'type': 2,//reedit
                            'font': {
                                'font_color': _self.changeConf.text.fontColor,
                                'font_size': Math.round(_self.changeConf.text.fontSize * s),
                                'font_style': _self.changeConf.text.fontStyle
                            },
                            'child_div_W': _self.curTarget.child_div_W,//current handwriting's area 笔迹的矩形区域
                            'child_div_H': _self.curTarget.child_div_H,//current handwriting's area 笔迹的矩形区域
                            'drag_left': _self.curTarget.drag_left,//drafted distance x轴拖拽的距离
                            'drag_top': _self.curTarget.drag_top,//drafted distance y轴拖拽的距离
                            'str_text': root.MyBase64.encode(replacedStr)//edited text 将处理完的文字发送到对端，一、避免再次解析 二、保持两端的一致性
                        }
                    };
                    //发送给callback
                    gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                    //显示这一笔
                    this.curTarget.display = 1;
                    //本端显示
                    gerFuc.showPaint.call(this, obj, 'local');
                    //更新哨兵
                    this.textData.signREdit = false;
                }
                //downEvent结束
                this.downEvent = false;
                //重置，为下一次的输入
                edit.innerText = '';
            },
            inputRange: function () {
                //文字操作时，用来判断是否需要调整边框的位置 ，避免溢出canvas画布
                var input = this.conf.paintBoard.input,
                    canvasW = this.conf.canvas.width,
                    canvasH = this.conf.canvas.height;

                var inputWid = parseInt(input[0].scrollWidth),
                    inputHei = parseInt(input[0].scrollHeight),
                    inputLeft = parseInt(input.css('left').replace('px', '')),
                    inputTop = parseInt(input.css('top').replace('px', ''));

                var shiftLeft = 0, shiftTop = 0;
                var b = 2 * this.textData.inputBorder;

                //right over
                if ((inputLeft + inputWid + b >= canvasW)) {
                    shiftLeft = canvasW - inputLeft - inputWid - b;
                }
                //bottom over
                if (inputTop + inputHei + b >= canvasH) {
                    shiftTop = canvasH - inputTop - inputHei - b;
                }
                //left over
                if (inputLeft < 0) {
                    shiftLeft = 0 - inputLeft;
                }
                //top over
                if (inputTop < 0) {
                    shiftTop = 0 - inputTop;
                }
                return {shiftX: shiftLeft, shiftY: shiftTop};
            },
            removeDanger: function (str) {//避免xss攻击
                var a = str;
                a = a.replace(/&nbsp;/g, ' ');
                a = a.replace(/&amp;/g, '&');
                a = a.replace(/&quot;/g, '\\');
                a = a.replace(/&#039;/g, '\'');
                a = a.replace(/&lt;/g, '<');
                a = a.replace(/&gt;/g, '>');
                return a;
            },
            keyAction: function (that) {//光标到最后
                var textbox = that;
                var sel = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(textbox);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            },
            objFactory: function (type,localID,value) {
                if(this.isToSvc){
                    var obj = null;
                    var boardID=this.targetID;
                    value.WBDataType='wb';
                    obj = {
                        'localID': localID+'',
                        'value': value,
                        'byteData': '',
                        'byteDataLength': ''
                    };
                    this.callback(type, obj, boardID);
                }
            },
            reEditText: function (e) {//用于重写文字的start
                e = e || window.event || arguments.callee.caller.arguments[0];
                var input = document.getElementById(this.targetID + '_input'),
                    edit = document.getElementById(this.targetID + '_edit'),
                    inputBak = document.getElementById(this.targetID + '_inputBak'),
                    editBak = document.getElementById(this.targetID + '_editBak'),
                    canvasW = this.conf.canvas.width,
                    canvasH = this.conf.canvas.height;

                if (this.curTarget) {
                    if (this.curTarget.handleType == 0 && this.curTarget.drawingType == 4) {//如果当前双击的目标是文字
                        //标记当前的编辑状态是重写状态
                        this.textData.signREdit = true;
                        //先在结果层暂时隐藏这一段文字，显示在过程层上
                        this.curTarget.display = 0;
                        //显示其他的笔迹
                        gerFuc.repaint.call(this);

                        var tem_text = this.curTarget.point_Arr_text,
                            s = this.conf.canvas.width / this.curTarget.canvasWidth;
                        var b = Math.round(4 * canvasW / this.constConf.baseSize.value);//border
                        //更新本地记录的相关值信息
                        this.textData.inputBorder = b;
                        this.textData.inputMaxWid = canvasW - (this.curTarget.drag_left + this.curTarget.margin_left) * s - 2 * b;
                        this.textData.inputMaxHei = canvasH - (this.curTarget.drag_top + this.curTarget.margin_top) * s - 2 * b;
                        this.textData.fontSize = Math.round(this.curTarget.font_size * s);
                        //根据当前比划的数据信息设置新的属性
                        input.style.border = 'dashed ' + this.textData.inputBorder + 'px red';
                        input.style.zIndex = 5;
                        input.style.display = 'block';
                        input.style.maxWidth = this.textData.inputMaxWid + 'px';
                        input.style.maxHeight = this.textData.inputMaxHei + 'px';
                        input.style.left = (this.curTarget.margin_left + this.curTarget.drag_left) * s + 'px';
                        input.style.top = (this.curTarget.margin_top + this.curTarget.drag_top) * s + 'px';

                        edit.style.display = 'block';
                        edit.style.font = 'bold ' + this.textData.fontSize + "px " + this.changeConf.text.fontStyle;

                        editBak.style.font = 'bold ' + this.textData.fontSize + "px " + this.changeConf.text.fontStyle;

                        inputBak.style.border = 'dashed ' + this.textData.inputBorder + 'px red';
                        inputBak.style.maxWidth = this.textData.inputMaxWid + 'px';
                        inputBak.style.maxHeight = this.textData.inputMaxHei + 'px';
                        //值输入
                        edit.innerText = tem_text;
                        //make cursor end  将光标移到最后
                        gerFuc.keyAction.call(this, edit);
                        //记录当前的位置信息
                        this.textData.pointXTD = (this.curTarget.margin_left + this.curTarget.drag_left) * s;
                        this.textData.pointYTD = (this.curTarget.margin_top + this.curTarget.drag_top) * s;
                        //记录当前的位置信息
                        this.textData.pointLeftTD = this.textData.pointXTD;
                        this.textData.pointTopTD = this.textData.pointYTD;
                    }
                }
            },
            reInitColor: function () {//恢复所有比划的颜色
                var temArr = this.recordConArr;
                for (var i = 0, j = temArr.length; i < j; i++) {
                    if (temArr[i].id == this.colorChangeId) {
                        if (temArr[i].drawingType != 4) {
                            temArr[i].color = this.colorName;
                        }
                        else {//text
                            temArr[i].font_color = this.colorName;
                        }
                    }
                }
            },
            e_search: function (x, y) {//寻找当前鼠标位置下的笔迹对象
                var e;
                var s;
                var i, j;
                var offset = this.conf.canvas.parentCon.offset();
                this.conf.canvas.left = offset.left;
                this.conf.canvas.top = offset.top;
                for (i = 0, j = this.recordConArr.length; i < j; i++) {
                    e = this.recordConArr[i];
                    s = this.conf.canvas.width / e.canvasWidth;
                    if (e.handleType == 0 && e.drawingType != 500 && e.drawingType != 3 && e.display == 1) {
                        if (e.drawingType != 10 || this.curDrawType != 'draft') {
                            if (x >= (e.margin_left + e.drag_left) * s && y >= (e.margin_top + e.drag_top) * s) {
                                if (x <= (e.margin_left + e.child_div_W + e.drag_left) * s && y <= (e.margin_top + e.child_div_H + e.drag_top) * s) {
                                    return e;
                                }
                            }
                        }
                    }
                }
                return null;
            },
            showPaint: function (obj, type) {//用于根据分析数据对象来实现数据可视化  type  'local':初始化显示本地数据  'svc': 初始化显示svc数据
                try {
                    //防止是字符串
                    obj.svcID&&(obj.svcID=parseInt(obj.svcID));
                    if (obj.handleType == 0) {//add
                        //本地数据   则本地id +1
                        type == 'local' && this.localID++;
                        if ([0, 2, 3, 4, 10, 20, 500].indexOf(obj.drawingType) != -1) {//legal drawingType  合法的或者当前版本已知的操作type
                            if (obj.drawingType != 500) {//tradition drawingType  旧版本的操作
                                var tem_e = new paint(version, obj.localID, obj);//创建当前笔迹对象
                                tem_e.init_paint(obj);//初始化当前笔迹对象的属性
                                //如果已经有序的数据操作加入操作列表
                                if (this.constConf.isSVC.value && obj.svcID != -1) {
                                    this.changeData({
                                        localID: obj.localID,
                                        svcID: obj.svcID,
                                        targetID: obj.localID
                                    });
                                } else if (!this.constConf.isSVC.value) {
                                    this.orderList.push({
                                        localID: obj.localID,
                                        svcID: obj.svcID,
                                        targetID: obj.localID
                                    });
                                }

                                this.recordConArr.push(tem_e);//加入对应的对象列表
                                //绘制分发
                                tem_e.handle(this.conf.canvas, this.constConf.baseSize.value, this.textData.inputBorder, this.conf.canvas.targetContext);
                            } else//new drawingType  500段的新功能
                            {
                                var _self = this;
                                //从数据池中根据localID寻找到当前的数据
                                var tem_e = gerFuc.searchByID.call(_self, obj.specialValue.localID);
                                if (tem_e != null) {
                                    //重置当前笔迹对象的属性
                                    tem_e.init_paint(obj);
                                    //绘制所有
                                    gerFuc.repaint.call(_self);
                                } else {
                                    console.error('[ %s ]----------->error happened when new rubber: error id is %s', getTimeNow(), obj.specialValue.type);
                                }
                                //如果已经有序的数据操作加入操作列表
                                if (this.constConf.isSVC.value && obj.svcID != -1) {
                                    this.changeData({
                                        localID: obj.localID,
                                        svcID: obj.svcID,
                                        targetID: obj.specialValue.localID
                                    });
                                } else if (!this.constConf.isSVC.value) {
                                    this.orderList.push({
                                        localID: obj.localID,
                                        svcID: obj.svcID,
                                        targetID: obj.specialValue.localID
                                    });
                                }
                            }
                        }
                    } else if (obj.handleType == 1) {//delete
                        if (obj.drawingType == 1) { //back
                            gerFuc.draw.call(this, 'back', 1);
                        }else if (obj.drawingType == 2)  //clear
                            gerFuc.draw.call(this, 'clear', 1);
                    } else if (obj.handleType == 2) {//change

                    }
                } catch (e) {
                    console.error('[ %s ]----------->error happened when Paint update: %s', getTimeNow(), e);
                }
            },
            searchByID: function (id) {//根据id在this.recordConArr中寻找当前笔迹的原始数据
                var i, j;
                var temArr = this.recordConArr;
                for (i = 0, j = temArr.length; i < j; i++) {
                    if (temArr[i].id == id && temArr[i].changeCount != 0) {
                        return temArr[i];
                    }
                }
                return null;
            },
            handle_back: function (target_id) {
                //回退操作
                //策略
                //先回退当前笔迹的修改操作：比如拖拽，新橡皮的擦出，重写等
                //再回退笔迹
                var i, j;
                for (i = 0, j = this.recordConArr.length; i < j; i++) {
                    if (this.recordConArr[i].id == target_id && this.recordConArr[i].changeCount != 0) {//find target
                        gerFuc.clearConText.call(this, 1);
                        var tem_e = this.recordConArr[i];
                        tem_e.changeCount--;//先将当前笔迹的改变总量-1
                        if (tem_e.changeCount == 0)//init state  表示当前的笔迹已经么可以回退的改变了 ，直接隐藏当前的笔迹
                        {
                            tem_e.display = 0;
                            this.svcId--;//id-1
                        }
                        else {//there are some change after init  表示当前的笔迹还存在可以回退的改变 比如拖拽，新橡皮的擦出，重写等
                            var del = tem_e.Arr_data_handle.pop();//pop最近的历史记录
                            if (del.drawingType == 500 && del.specialValue.type == 0)
                                tem_e.display = 1;
                            else {
                                var obj = tem_e.Arr_data_handle[tem_e.Arr_data_handle.length - 1];
                                tem_e.init_paint(obj, 1);
                            }
                        }
                        gerFuc.repaint.call(this);
                    }
                }
                //回退结束 回归回退的对象
                this.backObj=null;
            },
            handle_clear: function () {//清空操作
                var target_e;
                for (var i = 0, j = this.recordConArr.length; i < j; i++) {
                    target_e = this.recordConArr[i];
                    //全部隐藏掉
                    target_e.display = 0;
                    //全部改变总量置为0
                    target_e.changeCount = 0;
                }
                //操作序列置为空
                this.orderList.length = 0;
                gerFuc.repaint.call(this);
                this.svcId = 1;
            },
            clearConText: function (type) {//type为undefined清空过程层，不为undefined清空过程层和结果层
                try {
                    if (!type)
                        this.conf.canvas.targetBakContext.clearRect(0, 0, this.conf.canvas.width, this.conf.canvas.height);
                    else {
                        this.conf.canvas.targetContext.clearRect(0, 0, this.conf.canvas.width, this.conf.canvas.height);
                        this.conf.canvas.targetBakContext.clearRect(0, 0, this.conf.canvas.width, this.conf.canvas.height);
                    }
                } catch (e) {

                }
            },
            repaint: function (type, target) {//重绘
                if (!type) {
                    //是否先清空再绘制
                    gerFuc.clearConText.call(this, 1);
                }
                var e;
                var i = 0, j = this.recordConArr.length;
                var targetContext = target || this.conf.canvas.targetContext;
                while (i < j) {
                    e = this.recordConArr[i];
                    e.handle(this.conf.canvas, this.constConf.baseSize.value, this.textData.inputBorder, targetContext);
                    i++;
                }
            },
            getOffset: function (Node, offset) {
                if (!offset) {
                    offset = {};
                    offset.top = 0;
                    offset.left = 0;
                }
                if (Node == document.body) {//if current node is body，end
                    return offset;
                }
                offset.top += Node.offsetTop;
                offset.left += Node.offsetLeft;
                return this.getOffset(Node.parentNode, offset);//up and account
            },
            quickSort: function (arr) {
                if (arr.length <= 1) {
                    return arr;
                }
                var pivotIndex = Math.floor(arr.length / 2);
                var pivot = arr.splice(pivotIndex, 1)[0];
                var left = [];
                var right = [];
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].svcID < pivot.svcID) {
                        left.push(arr[i]);
                    } else {
                        right.push(arr[i]);
                    }
                }
                return gerFuc.quickSort(left).concat([pivot], gerFuc.quickSort(right));
            }
        }
        var createConf = function (type) {
            if (type) {
                var reObj = {};//要返回的配置信息
                if (type === 'const') {
                    reObj = {
                        ownerID: {
                            value: '',
                            info: '使用白板的用户id'
                        },
                        isSVC: {
                            value: true,
                            info: '是否是svc转发数据，影响撤销时的id处理'
                        },
                        paintModule: {
                            value: 'draw',
                            info: 'const初次设置后不可修改：可选值"draw"/"show",白板的模式,"draw"表示支持绘制和显示,"show"表示仅支持显示'
                        },
                        //要开放的画笔配置
                        //--------start--------------工具：合法值为key
                        pencil: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持画笔功能'
                        },
                        highPencil: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持荧光笔'
                        },
                        rect: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持矩形'
                        },
                        text: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持文字'
                        },
                        rubberOld: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持区域擦除'
                        },
                        seal: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持印章'
                        },
                        //注意下面的功能  任意一个开启之后，在移动鼠标的时候，当前鼠标下的最近绘制的笔迹都会变得高亮，如果不使用这些功能，建议关闭，否则会浪费很大的cpu，下个版本会优化相关的查询算法
                        rubberNew: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持整个目标清除 , 可触发search'
                        },
                        draft: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持拖动 , 可触发search'
                        },
                        //--------end--------------工具：合法值为key

                        reEdit: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持文字重写 , 可触发search'
                        },

                        //默认的画笔类型   注意必须是上面开放过的画笔类型,否则将抛出异常
                        firstTool: {
                            value: 'pencil',
                            info: 'const初次设置后不可修改：可选值 "pencil"/"highPencil"/"rect"/"text"/"rubberOld"/"seal"/"rubberNew"/"draft"/"reEdit" , ' +
                            '默认的画笔类型，必须是开放过的画笔，否则会抛出异常'
                        },

                        baseSize: {
                            value: 800,
                            info: 'const初次设置后不可修改：可选值 非0正整数 , 表示白板中的相对大小基值，参考rem的fontSize , 例如：800时设置为4，则400时变为2,1600时变为8'
                        }
                    }
                }
                else if (type === 'change') {
                    reObj = {
                        pauseDraw: {
                            state: false,
                            info: '是否暂停绘制(true/false 当为true时只显示但暂时不支持绘制)'
                        },
                        pencil: {
                            'color': '#FF0000',//画笔的颜色
                            'size': 3,//画笔的大小
                            'info': '画笔颜色 画笔大小'
                        },
                        highPencil: {
                            'color': '#FF0000',//荧光笔颜色
                            'size': 20,//荧光笔的大小
                            'alpha': 0.5,//荧光笔的透明度
                            'info': '荧光笔颜色  荧光笔大小  荧光笔透明度'
                        },
                        rect: {
                            'color': '#FF0000',//矩形的颜色
                            'size': 3,//矩形边框的大小
                            'info': '矩形边框颜色  矩形边框大小'
                        },
                        text: {
                            'fontStyle': 'songti',//文字的样式
                            'fontSize': 30, //文字的大小
                            'fontColor': '#FF0000',//文字的颜色
                            'info': '文字样式css  文字大小  文字颜色'
                        },
                        rubberOld: {
                            'size': 30,//橡皮的大小
                            'info': '区域擦除工具的区域大小'
                        },
                        seal: {
                            width: 30,//印章的宽度
                            height: 30,//印章的高度
                            type: 'star',//用于标识当前图章的类型  每一个图章对应一个type 要确保唯一性，一个图章被选择多次，传递同一个type，不能为空！
                            source: '',//印章的图片url，相对于index.html  支持base64图片 不支持url的base64编码
                            info: '印章宽度  印章高度  印章类型(用于标识当前图章的类型  每一个图章对应一个type 要确保唯一性，一个图章被选择多次，传递同一个type，不能为空)  ' +
                            '印章图片url(相对于index.html  支持base64图片 不支持url的base64编码)'
                        },
                        targetSelect: {//鼠标移动时的当前选中的画笔的颜色
                            'color': '#0000FF',
                            'info': '鼠标移动时的当前选中的图形的颜色'
                        },
                        background: {
                            module: 'close',//模式    default: 自动充满  real：真实大小
                            source: '', //支持base64图片和url地址  不支持url的base64编码
                            info: '背景样式模式("close"/"default"/"real" close: 无背景  default: 自动充满  real：真实大小)'
                        }
                    }
                }
                else {
                    console.error('[ %s ]---------------------------------> illegal type happened when create conf of board!', getTimeNow());
                }
                return reObj;
            } else {
                console.warn('[ %s ]---------------------------------> there is no type when create conf of board!', getTimeNow());
                return {};
            }
        };
        var getTimeNow = function () {
            var date = new Date();
            var headDes = date.toLocaleTimeString() + ' ' + date.getMilliseconds() + 'ms';
            return headDes;
        };
        var paint = function (version, id, obj) {
            //parent class
            this.Arr_data_handle = new Array();//record every change's all data to back 用于存储所有的历史记录信息
            this.version_type = version;//版本信息
            this.id = id;//服务器id
            this.handleType = obj.handleType;
            this.drawingType = obj.drawingType;
        }
        //初始化信息
        paint.prototype.init_paint = function (obj, type) {//init paint data  为当前的对象赋值
            if (!type)
                this.Arr_data_handle.push(obj);//入栈
            if (obj.handleType == 0) {//add
                if (obj.drawingType != 500) {//旧操作
                    this.canvasWidth = obj.specialValue.canvasWidth;//记录当前的笔迹的相对的画布大小
                    this.canvasHeight = obj.specialValue.canvasHeight;//记录当前的笔迹的相对的画布大小
                    //it maybe change after,but now set 1
                    this.changeCount = 1;//记录更改的次数 默认为1（出生）
                    //1 will show, 0 won't  控制是否显示
                    this.display = 1;

                    this.child_div_W = obj.specialValue.child_div_W;//笔记区域的大小
                    this.child_div_H = obj.specialValue.child_div_H;//笔记区域的大小
                    this.margin_left = obj.specialValue.margin_left;//笔记区域的边距
                    this.margin_top = obj.specialValue.margin_top;//笔记区域的边距
                    this.drag_left = 0;//笔迹的拖拽的距离
                    this.drag_top = 0;//笔迹的拖拽的距离
                    //记录笔迹的属性style
                    if (obj.drawingType == 4)//text 文本
                    {
                        this.font_color = obj.specialValue.font.font_color;
                        this.font_size = obj.specialValue.font.font_size;
                        this.font_style = obj.specialValue.font.font_style;
                        this.point_Arr_text = root.MyBase64.decode(obj.specialValue.str_text);
                    } else if (obj.drawingType == 20) {//seal 印章
                        this.sealWidth = obj.specialValue.width;
                        this.sealHeight = obj.specialValue.height;
                        this.sealType = obj.specialValue.sealType;
                    }
                    else {
                        this.color = obj.specialValue.color;
                        this.size = obj.specialValue.size;
                        this.point_Arr_text = obj.specialValue.point;
                    }
                    if (obj.drawingType == 10) {
                        //荧光笔 有透明度属性
                        this.alpha = obj.specialValue.alpha;
                    }
                } else {
                    //new handle 新操作（具有在已有笔迹的基础上更改性质的操作）

                    if (!type)
                        this.changeCount++;//没更改一次，更新哨兵一次
                    switch (obj.specialValue.type) {
                        case 0://new rubber 新橡皮
                            this.display = 0;
                            break;
                        case 1://drag  拖拽
                            this.drag_left = obj.specialValue.drag_left;
                            this.drag_top = obj.specialValue.drag_top;
                            break;
                        case 2://reedit 重写
                            this.child_div_W = obj.specialValue.child_div_W;
                            this.child_div_H = obj.specialValue.child_div_H;
                            this.drag_left = obj.specialValue.drag_left;
                            this.drag_top = obj.specialValue.drag_top;
                            this.point_Arr_text = root.MyBase64.decode(obj.specialValue.str_text);
                            break;
                        default :
                            break;
                    }
                }
            }
            else if (obj.handleType == 1) {
                /*delete*/
            } else if (obj.handleType == 2) {
                /*change*/
            }
        }

        //按类型操作
        paint.prototype.handle = function (canvasData, baseSize, inputBorder, target_context) {//Message Dispatch 进行分发，实现绘制
            try {
                if (this.display == 1) {
                    switch (this.drawingType) {
                        case 0://pen
                            this.canvas_pencil(canvasData, baseSize, target_context);
                            break;
                        case 2://rectangle
                            this.canvas_square(canvasData, baseSize, target_context);
                            break;
                        case 10://Highlighter pen
                            this.canvas_sign(canvasData, baseSize, target_context);
                            break;
                        case 20://seal
                            this.canvas_seal(canvasData, baseSize, target_context);
                            break;
                        case 4://text
                            this.canvas_write(canvasData, baseSize, inputBorder, target_context);
                            break;
                        case 3://old rubber
                            this.canvas_rubber(canvasData, baseSize, target_context);
                            break;
                        default :
                            break;
                    }
                }
            } catch (e) {
                console.error('[ %s ]--------------------------------->error happened when paint.prototype.handle : %s', getTimeNow(), e);
            }

        }
        //    下面所有的绘制策略都是
        //    先计算缩放比例，用于之后对点信息或者文字大小信息的缩放
        //    根据对象设置当前的绘制属性
        //画笔

        paint.prototype.canvas_pencil = function (canvasData, baseSize, target_context) {
            var s = canvasData.width / this.canvasWidth;
            var s2 = canvasData.width / baseSize;
            var _self = this;
            var lineWid = Math.round(_self.size * s2);
            target_context.lineCap = 'round';
            target_context.lineJoin = "round";
            target_context.strokeStyle = _self.color;
            //-----------------------修改为本地写死--------------------------
            //target_context.lineWidth = this.size*s2;
            target_context.lineWidth = lineWid;
            //-----------------------修改为本地写死--------------------------
            target_context.moveTo((this.point_Arr_text[0].x + this.drag_left) * s - canvasData.centerPX, (this.point_Arr_text[0].y + this.drag_top) * s - canvasData.centerPY);
            target_context.beginPath();
            for (var i = 1; i < this.point_Arr_text.length; i++) {
                target_context.lineTo((this.point_Arr_text[i].x + this.drag_left) * s - canvasData.centerPX, (this.point_Arr_text[i].y + this.drag_top) * s - canvasData.centerPY);
            }
            target_context.stroke();
        }

        //长方形
        paint.prototype.canvas_square = function (canvasData, baseSize, target_context) {
            var s = canvasData.width / this.canvasWidth;
            var s2 = canvasData.width / baseSize;
            var _self = this;
            var lineWid = Math.round(_self.size * s2);
            var CX = canvasData.centerPX,
                CY = canvasData.centerPY;
            target_context.strokeStyle = _self.color;
            target_context.lineJoin = "round";
            //-----------------------修改为本地写死--------------------------
            //target_context.lineWidth = this.size*s2;
            target_context.lineWidth = lineWid;
            //-----------------------修改为本地写死--------------------------
            target_context.moveTo((this.point_Arr_text[0].x + this.drag_left) * s - CX, (this.point_Arr_text[0].y + this.drag_top) * s - CY);
            target_context.beginPath();
            target_context.lineTo((this.point_Arr_text[1].x + this.drag_left) * s - CX, (this.point_Arr_text[0].y + this.drag_top) * s - CY);
            target_context.lineTo((this.point_Arr_text[1].x + this.drag_left) * s - CX, (this.point_Arr_text[1].y + this.drag_top) * s - CY);
            target_context.lineTo((this.point_Arr_text[0].x + this.drag_left) * s - CX, (this.point_Arr_text[1].y + this.drag_top) * s - CY);
            target_context.lineTo((this.point_Arr_text[0].x + this.drag_left) * s - CX, (this.point_Arr_text[0].y + this.drag_top) * s - CY);
            target_context.closePath();
            target_context.stroke();
        }

        //荧光笔
        paint.prototype.canvas_sign = function (canvasData, baseSize, target_context) {
            target_context.save();
            var s = canvasData.width / this.canvasWidth;
            var CX = canvasData.centerPX,
                CY = canvasData.centerPY;
            target_context.lineCap = 'round';
            target_context.lineJoin = "round";
            target_context.strokeStyle = this.color;
            target_context.globalAlpha = this.alpha;
            target_context.globalCompositeOperation = 'source-over';
            target_context.lineWidth = this.size * canvasData.width / baseSize;
            target_context.moveTo((this.point_Arr_text[0].x + this.drag_left) * s - CX, (this.point_Arr_text[0].y + this.drag_top) * s - CY);
            target_context.beginPath();
            for (var i = 2; i < this.point_Arr_text.length; i++) {
                target_context.lineTo((this.point_Arr_text[i].x + this.drag_left) * s - CX, (this.point_Arr_text[i].y + this.drag_top) * s - CY);
            }
            target_context.stroke();
            target_context.restore();
        }

        //文字
        paint.prototype.canvas_write = function (canvasData, baseSize, inputBorder, target_context) {
            var theString = this.point_Arr_text;
            var s = canvasData.width / this.canvasWidth;
            var hei_point = (this.margin_top + this.drag_top) * s;
            var wid_point = (this.margin_left + this.drag_left) * s + inputBorder;
            var words = [];
            var i, j;

            target_context.font = 'bold ' + Math.round(this.font_size * s) + "px " + this.font_style;
            target_context.fillStyle = this.font_color;

            theString.replace(/\r\n/g, '\n');
            words = theString.split(/\n/);

            for (i = 0, j = words.length; i < j; i++) {
                hei_point += (this.font_size + 2.5) * s;
                target_context.fillText(words.shift(), wid_point - canvasData.centerPX, hei_point - canvasData.centerPY);
            }
        }

        //旧版橡皮擦
        paint.prototype.canvas_rubber = function (canvasData, baseSize, target_context) {
            var s = canvasData.width / this.canvasWidth;
            var sizerub = this.size * s;
            target_context.lineCap = 'round';
            target_context.lineJoin = "round";
            for (var i = 0; i < this.point_Arr_text.length; i++) {
                target_context.clearRect((this.point_Arr_text[i].x) * s - sizerub / 2 - canvasData.centerPX, (this.point_Arr_text[i].y) * s - sizerub / 2, sizerub, sizerub - canvasData.centerPY);
            }
        }

        //印章
        paint.prototype.canvas_seal = function (canvasData, baseSize, target_context) {
            var s = canvasData.width / this.canvasWidth;
            var type = this.sealType;
            var sealWidth = this.sealWidth * s,
                sealHeight = this.sealHeight * s,
                source = canvasData.seal.img[type];
            target_context.globalCompositeOperation = 'source-over';

            target_context.drawImage(source, (this.margin_left + this.drag_left) * s - canvasData.centerPX, (this.margin_top + this.drag_top) * s - canvasData.centerPY, sealWidth, sealHeight);
        }
        //白板类
        var WEBBoard = function (ownerID) {
            this.toolsOpen = ['back', 'clear'];//用于记录开发的画笔
            this.isSearch = false;//用于 表示当前是否处于要查找每条数据的模式
            this.conf = {
                'canvas': {
                    //canvas info
                    'parentCon': null,//canvas的父容器的对象
                    'target': null, //结果层
                    'targetContext': null, //结果层的2d对象
                    //------------------修改---------start------------
                    'targetImg': null,
                    //------------------修改---------end------------
                    'targetImgContext': null,
                    //------------------修改---------start------------
                    'centerPX': 0,//画布中心点
                    'centerPY': 0,//画布中心点
                    //------------------修改---------end------------

                    'targetBak': null, //过程层
                    'targetBakContext': null, //过程层的2d对象

                    'width': 0, //宽度
                    'height': 0, //高度

                    'left': 0, //左边距
                    'top': 0, //上边距
                    'seal': {
                        curType: '',
                        img: {}//存储每一种图章的的图片对象信息
                    }
                },
                'paintBoard': {
                    'input': null,//progress input for drag 文本输入框容器的对象
                    'edit': null,//progress edit 文字输入框的对象
                    //策略：建立一个用户看不到的和input和edit完全相同的输入框和容器，输入已经输入的文字，判断何时换行
                    'inputBak': null,//for show words(when newline) 用于识别单词何时换行
                    'editBak': null//for show words(when newline) 用于识别单词何时换行
                },
                'cssInfo': {
                    canvas: {
                        'position': 'absolute',
                        'top': '0px',
                        'left': '0px',
                        'z-index': 1
                    },
                    canvasBak: {
                        'position': 'absolute',
                        'top': '0px',
                        'left': '0px',
                        'z-index': 2
                    },
                    canvasImg: {
                        'position': 'absolute'
                    },
                    input: {
                        'min-width': '0px',
                        '_width': '0px',
                        'min-height': '0px',
                        '_height': '0px',
                        'display': 'none',
                        'position': 'absolute',
                        'overflow': 'hidden'
                    },
                    edit: {
                        'border': '0px',
                        'background-color': 'transparent',
                        'cursor': 'text',
                        'word-break': 'break-all',
                        'white-space': 'pre-wrap',
                        'word-wrap': 'break-word',
                        'overflow': 'hidden',
                        'margin': '0px 0px 0px 0px'
                    },
                    inputBak: {
                        'z-index': '-1',
                        'position': 'absolute',
                        'min-width': '0px',
                        '_width': '0px',
                        'min-height': '0px',
                        '_height': '0px'
                    },
                    editBak: {
                        'width': '0px',
                        'border': '0px',
                        'word-break': 'break-all',
                        'white-space': 'pre-wrap',
                        'word-wrap': 'break-word',
                        'overflow': 'hidden',
                        'position': 'relative',
                        'margin': '0px 0px 0px 0px'
                    }
                }
            };
            this.isInited = false;//是否初始化或者是否初始化成功的标志
            this.recordConArr = [];//record all paint handle 记录所有的绘制数据信息
            this.orderList = [];//record all order according time 存储操作序列 先后顺序
            this.backObj=null;//记录当前需要删除的对象
            this.localIDHead = ownerID+new Date().getTime()+'_';//区别服务器id的头
            this.localID = 0;//local id 维护确保每一条笔迹有不同的id号  为了寻找本地数据更换服务器id
            this.curBackGIMG = {//用于记录当前的背景图片的信息，防止confInfo的信息被改动后的不一致现象
                module: '',
                source: ''
            };

            this.curDrawType = 'pencil';//used to remember current draw type,first time used to set default handle type 记录当前的画笔类型
            //record current target name 记录当前的笔迹对象
            this.curTarget = null;

            //move之前是否触发了down事件防止没有点击操作时的move事件执行
            //down event is made or not before move event
            this.downEvent = false;
            //当up事件被触发,用于检测是否为移出画布被触发
            //out event is made or not when up event is alive
            this.outEvent = false;
            this.isToSvc=true;//是不是向svc发送
            //表示鼠标移动时上一步是否有颜色变化
            //last time there is a color change or not
            this.colorChange = false;
            this.colorName = '';//用来记录被改变的画笔之前的颜色
            this.colorChangeId = -1;//record last color changed target id 记录上一个颜色变化的id

            this.dragData = {
                //initial left and top
                initialLeft: 0,//记录目标对象的初始左偏移
                initialTop: 0,//记录目标对象的初始右偏移
            };

            this.textData = {
                signTextDrag: false,//writing drag or not? 区分是否在文字编辑的过程中进行了文本框的移动
                signREdit: false,//sign of reedit 文本编辑是否处于重写模式
                inputBorder: 0,  //用于拖动的外边框的宽度
                inputMaxWid: 0, //编辑框容器的最大的宽度，用于自动换行
                inputMaxHei: 0, //编辑框容器的最大的高度，用于自动换行
                fontSize: 0, //文字的大小
                //record text input to avoid height is overtop 记录当前已经输入的文本信息，用于当输入文字超出最大高度时的文本还原
                textInput: '',
                //记录上一次已经输入的文本信息，用于当输入文字超出最大高度时的文本还原
                lastTextInput: '',
                //record mouse point when text for click to drag 记录鼠标信息，用于拖拽
                pointXTD: 0,
                pointYTD: 0,
                //record input left and top
                pointLeftTD: 0,//文字输入框左上角位置
                pointTopTD: 0,//文字输入框左上角位置
            };
            this.mouseData = {//鼠标信息

                //开始位置
                startX: 0,
                startY: 0,
                //当前位置
                nowX: 0,
                nowY: 0,
                //结束的位置
                endX: 0,
                endY: 0,
                //一次过程中最小的x坐标
                minX: 0,
                //一次过程中最小的y坐标
                minY: 0,
                //一次过程中最大的x坐标
                maxX: 0,
                //一次过程中最大的y坐标
                maxY: 0,
                //记录所有的点信息
                pointArr: []//record all mouse point data
            }
        };
        WEBBoard.prototype.draw = function (toolType, isToSvc, callback) {
            //首先判断合法性，进行不同的返回
            if (this.isInited) {
                if (this.toolsOpen.indexOf(toolType) !== -1) {
                    console.log('[ %s ]---------------------------------> change current tool : %s', getTimeNow(), toolType);
                    ((isToSvc == undefined)&&(this.isToSvc=true))||(this.isToSvc=isToSvc);
                    if(toolType=='back'){
                        if(this.orderList.length > 0) {
                            //首先清空当前要删除的对象数组
                            this.backObj=this.orderList.pop();
                            if(this.isToSvc){
                                var tID=this.backObj.svcID+'';
                                var boardID=this.targetID;
                                this.callback('back', tID ,boardID);//删除的协议的服务器id
                            }
                        }
                    }else if(toolType=='clear'){
                        var boardID=this.targetID;
                        if(this.isToSvc){
                            this.callback('clear',boardID);
                        }
                    }
                    gerFuc.draw.call(this, toolType, callback);
                } else {
                    console.error('[ %s ]---------------------------------> error happened when change current tool , unopened tool or undefined tool is used : %s', getTimeNow(), toolType);
                    if (callback) {
                        callback('error');
                    }
                }
            }
            else {
                console.error('[ %s ]---------------------------------> error happened when change current tool , please init white board first!', getTimeNow());
                return false;
            }
        };
        WEBBoard.prototype.updateChangeConf = function (changeConf) {
            for (var i in changeConf) {
                if (this.changeConf[i] != undefined) {
                    if (typeof changeConf[i] == 'object') {
                        for (var j in changeConf[i]) {
                            if (this.changeConf[i][j] != undefined) {
                                this.changeConf[i][j] = changeConf[i][j];
                            } else {
                                console.error('[ %s ]---------------------------------> error happened when updateChangeConf : undefined key: {%s : %s}', getTimeNow(), i, j);
                            }
                        }
                    } else {
                        console.error('[ %s ]---------------------------------> error happened when updateChangeConf : it is not a key:value', getTimeNow());
                    }
                } else {
                    console.error('[ %s ]---------------------------------> error happened when updateChangeConf : undefined key: %s', getTimeNow(), i);
                }
            }
            // console.log(this.changeConf);
        };
        WEBBoard.prototype.wbResize = function () {
            if (!this.conf.canvas.parentCon) {
                console.error('[ %s ]---------------------------------> error happened when resize canvas : white board is not inited!', getTimeNow());
                return;
            }
            if (this.conf.canvas.width !== this.conf.canvas.parentCon.width() || this.conf.canvas.height !== this.conf.canvas.parentCon.height()) {
                //只判断宽度的变化，因为宽高比必须固定
                gerFuc.review.call(this, this.conf.canvas.parentCon.width(), this.conf.canvas.parentCon.height());
            }
        };
        WEBBoard.prototype.setData = function (type,ArrObj) {
            var _self = this;
            var wbAH=['1','3','5'];
            if(type=='4'){
                //清空
                gerFuc.draw.call(this,'clear');
            }else if(type=='2'){
                //回退
                this.backObj=this.orderList.pop();
                gerFuc.draw.call(this,'back');
            }
            else if(wbAH.indexOf(type)!==-1){
                //其他
                $.each(ArrObj, function (i, v) {
                    //组建排序数据
                    var objOrder={
                        svcID:v.svcID,//svc返回的服务器id
                        localID:v.value.localID,//该协议的本地id
                        value:v.value,//自己封装别人不关心
                    };
                    gerFuc.showPaint.call(_self, v.value, 'svc');
                    //修改排序
                    _self.changeData(objOrder);
                })
            }else{
                console.error('[ %s ]---------------------------------> error happened when setData : unknow operate happened : %s', getTimeNow(),type);
            }
        };
        WEBBoard.prototype.changeData = function (obj) {
            try {
                var localID = this.localIDHead+obj.localID,
                    svcID = parseInt(obj.svcID),
                    targetID = '';//操作的图形id
                //寻找targetID 操作的图形id
                if (obj.targetID == undefined) {
                    if (obj.value) {
                        var tem = obj.value;
                        if (typeof tem == 'string') {
                            tem = JSON.parse(tem);
                        }
                        targetID = tem.specialValue.localID != undefined ? tem.specialValue.localID : tem.localID;
                    } else {
                        console.error('[ %s ]---------------------------------> error happened when changeData : can\'t get targetID ', getTimeNow());
                    }
                } else {
                    targetID = obj.targetID;
                }
                var orderObj = {
                    localID: localID,
                    svcID: svcID,
                    targetID: targetID
                }
                this.orderList.push(orderObj);

                var newList = gerFuc.quickSort(this.orderList);//快速排序

                //更新this.orderList
                this.orderList = [];
                this.orderList = newList.slice(0);
                //防止内存泄漏
                newList = null;
                //delete newList;
            } catch (e) {
                console.error('[ %s ]---------------------------------> error happened when changeData : %s', getTimeNow(), e);
            }
        };
        WEBBoard.prototype.getData = function () {
            return this.recordConArr;
        };
        WEBBoard.prototype.changeSealSource = function (sealConf, callback) {
            gerFuc.setSealIMG.call(this, callback);
        };
        WEBBoard.prototype.buildCurrentImg = function (width, height, rotate, callback) {
            //rotate 只支持90，-90,180，-180,270，-270
            if (this.conf.canvas.target !== null) {
                console.log('[ %s ]---------------------------------> build current canvas to base64 images', getTimeNow());
                gerFuc.buildImg.call(this, width, height, rotate, callback);
            } else {
                console.error('[ %s ]---------------------------------> error happened when build current canvas to base64 images : please init white board first!', getTimeNow());
            }
        };

        return {
            createConf: function (type) {
                var a = createConf(type);
                return a;
            },
            bindWB: function (targetID, constConf, changeConf, callback) {
                var curTar = new WEBBoard(constConf.ownerID.value);
                gerFuc.initBoard.call(curTar, targetID, constConf, changeConf, callback);

                return curTar;
            }
        }
    })();
    root.MyBase64 = {
        // 转码表
        table : [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
            'I', 'J', 'K', 'L', 'M', 'N', 'O' ,'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '0', '1', '2', '3',
            '4', '5', '6', '7', '8', '9', '+', '/'
        ],
        UTF16ToUTF8 : function(str) {
            var res = [], len = str.length;
            for (var i = 0; i < len; i++) {
                var code = str.charCodeAt(i);
                if (code > 0x0000 && code <= 0x007F) {
                    // 单字节，这里并不考虑0x0000，因为它是空字节
                    // U+00000000 – U+0000007F  0xxxxxxx
                    res.push(str.charAt(i));
                } else if (code >= 0x0080 && code <= 0x07FF) {
                    // 双字节
                    // U+00000080 – U+000007FF  110xxxxx 10xxxxxx
                    // 110xxxxx
                    var byte1 = 0xC0 | ((code >> 6) & 0x1F);
                    // 10xxxxxx
                    var byte2 = 0x80 | (code & 0x3F);
                    res.push(
                        String.fromCharCode(byte1),
                        String.fromCharCode(byte2)
                    );
                } else if (code >= 0x0800 && code <= 0xFFFF) {
                    // 三字节
                    // U+00000800 – U+0000FFFF  1110xxxx 10xxxxxx 10xxxxxx
                    // 1110xxxx
                    var byte1 = 0xE0 | ((code >> 12) & 0x0F);
                    // 10xxxxxx
                    var byte2 = 0x80 | ((code >> 6) & 0x3F);
                    // 10xxxxxx
                    var byte3 = 0x80 | (code & 0x3F);
                    res.push(
                        String.fromCharCode(byte1),
                        String.fromCharCode(byte2),
                        String.fromCharCode(byte3)
                    );
                } else if (code >= 0x00010000 && code <= 0x001FFFFF) {
                    // 四字节
                    // U+00010000 – U+001FFFFF  11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
                } else if (code >= 0x00200000 && code <= 0x03FFFFFF) {
                    // 五字节
                    // U+00200000 – U+03FFFFFF  111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
                } else /** if (code >= 0x04000000 && code <= 0x7FFFFFFF)*/ {
                    // 六字节
                    // U+04000000 – U+7FFFFFFF  1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
                }
            }

            return res.join('');
        },
        UTF8ToUTF16 : function(str) {
            var res = [], len = str.length;
            var i = 0;
            for (var i = 0; i < len; i++) {
                var code = str.charCodeAt(i);
                // 对第一个字节进行判断
                if (((code >> 7) & 0xFF) == 0x0) {
                    // 单字节
                    // 0xxxxxxx
                    res.push(str.charAt(i));
                } else if (((code >> 5) & 0xFF) == 0x6) {
                    // 双字节
                    // 110xxxxx 10xxxxxx
                    var code2 = str.charCodeAt(++i);
                    var byte1 = (code & 0x1F) << 6;
                    var byte2 = code2 & 0x3F;
                    var utf16 = byte1 | byte2;
                    res.push(
                        String.fromCharCode(utf16)
                    );
                } else if (((code >> 4) & 0xFF) == 0xE) {
                    // 三字节
                    // 1110xxxx 10xxxxxx 10xxxxxx
                    var code2 = str.charCodeAt(++i);
                    var code3 = str.charCodeAt(++i);
                    var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
                    var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
                    utf16 = ((byte1 & 0x00FF) << 8) | byte2
                    res.push(String.fromCharCode(utf16));
                } else if (((code >> 3) & 0xFF) == 0x1E) {
                    // 四字节
                    // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
                } else if (((code >> 2) & 0xFF) == 0x3E) {
                    // 五字节
                    // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
                } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {
                    // 六字节
                    // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
                }
            }

            return res.join('');
        },
        encode : function(str) {
            if (!str) {
                return '';
            }
            var utf8    = this.UTF16ToUTF8(str); // 转成UTF8
            var i = 0; // 遍历索引
            var len = utf8.length;
            var res = [];
            while (i < len) {
                var c1 = utf8.charCodeAt(i++) & 0xFF;
                res.push(this.table[c1 >> 2]);
                // 需要补2个=
                if (i == len) {
                    res.push(this.table[(c1 & 0x3) << 4]);
                    res.push('==');
                    break;
                }
                var c2 = utf8.charCodeAt(i++);
                // 需要补1个=
                if (i == len) {
                    res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
                    res.push(this.table[(c2 & 0x0F) << 2]);
                    res.push('=');
                    break;
                }
                var c3 = utf8.charCodeAt(i++);
                res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
                res.push(this.table[((c2 & 0x0F) << 2) | ((c3 & 0xC0) >> 6)]);
                res.push(this.table[c3 & 0x3F]);
            }

            return res.join('');
        },
        decode : function(str) {
            if (!str) {
                return '';
            }

            var len = str.length;
            var i   = 0;
            var res = [];

            while (i < len) {
                var code1 = this.table.indexOf(str.charAt(i++));
                var code2 = this.table.indexOf(str.charAt(i++));
                var code3 = this.table.indexOf(str.charAt(i++));
                var code4 = this.table.indexOf(str.charAt(i++));

                var c1 = (code1 << 2) | (code2 >> 4);
                var c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
                var c3 = ((code3 & 0x3) << 6) | code4;

                res.push(String.fromCharCode(c1));

                if (code3 != 64) {
                    res.push(String.fromCharCode(c2));
                }
                if (code4 != 64) {
                    res.push(String.fromCharCode(c3));
                }

            }

            return this.UTF8ToUTF16(res.join(''));
        }
    };
}(window, window.jQuery));