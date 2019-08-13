!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){(function(t){var n;"undefined"!=typeof window?window:void 0!==t||"undefined"!=typeof self&&self,n=function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),n.d(t,"InDB",function(){return c}),n.d(t,"InDBStore",function(){return s});var r=n(1);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}var c=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};u(this,e);var n=t.name,r=t.version,o=void 0===r?1:r,i=t.stores;if(!n)throw new Error("[InDB]: you should pass `name` option.");if(!i||!Array.isArray(i)||!i.length)throw new Error("[InDB]: you should pass `stores` option.");this.name=n,this.version=o,this.stores=i,indexedDB.open(n,o).onupgradeneeded=function(e){var t=e.target.result,n=Array.from(t.objectStoreNames),r=[];i.forEach(function(o){var u=null;if(n.indexOf(o.name)>-1)u=e.target.transaction.objectStore(o.name);else{var i=o.isKeyValue?"key":o.keyPath,a=!o.isKeyValue&&o.autoIncrement;u=t.createObjectStore(o.name,{keyPath:i,autoIncrement:a})}var c=u.indexNames;c&&c.length&&Array.from(c).forEach(function(e){return u.deleteIndex(e)}),o.indexes&&o.indexes.length&&o.indexes.forEach(function(e){u.createIndex(e.name,e.keyPath||e.name,{unique:e.unique,multiEntry:Array.isArray(e.keyPath)})}),r.push(o.name)}),n&&n.forEach(function(e){-1===r.indexOf(e)&&t.deleteObjectStore(e)})},this.using={}}return a(e,[{key:"connect",value:function(){var e=this;return new Promise(function(t,n){var r=indexedDB.open(e.name,e.version);r.onerror=function(e){var t=e.target.error;n(t)},r.onsuccess=function(e){t(e.target.result)}})}},{key:"use",value:function(e){var t=this.stores.find(function(t){return t.name===e});if(!t)throw new Error("[InDB]: store ".concat(e," is not existing."));if(this.using[e])return this.using[e];var n=new s({db:this,store:t});return t.isKeyValue&&(n.key=function(e){return n.keys().then(function(t){return t&&t[e]})},n.getItem=function(e){return n.get(e).then(function(e){return e&&e.value})},n.setItem=function(e,t){return n.put({key:e,value:t})},n.removeItem=function(e){return n.delete(e)}),this.using[e]=n,n}},{key:"close",value:function(){return this.using=null,this.stores=null,this.connect().then(function(e){e.close()})}}]),e}(),s=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};u(this,e);var n=t.store,r=t.db;if("object"!==o(n)||!n.name||"string"!=typeof n.name)throw new Error("[InDBStore]: options.store should be a store config object.");if(!(r instanceof c))throw new Error("[InDBStore]: options.db should be an instanceof InDB.");this.store=n,this.db=r,this.name=n.name,this.keyPath=n.isKeyValue?"key":n.keyPath}return a(e,[{key:"transaction",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this.name,n=e?"readwrite":"readonly";return this.db.connect().then(function(e){return e.transaction(t,n)})}},{key:"objectStore",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this.name;return this.transaction(e).then(function(e){return e.objectStore(t)})}},{key:"request",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new Promise(function(r,o){t.objectStore(n).then(function(t){var n=e(t);n.onsuccess=function(e){var t=e.target.result;r(t)},n.onerror=function(e){var t=e.target.error;o(t)}})})}},{key:"cursor",value:function(e){var t=e.index,n=e.range,r=e.direction,o=e.onTouch,u=e.onDone,i=(e.onError,e.writable),a=void 0!==i&&i;return this.objectStore(a).then(function(e){var i=t?e.index(t):e,a=i.openCursor(n,r);a.onsuccess=function(e){var t=e.target.result;t?o(t,i):u(t,i)},a.onerror=function(e){var t=e.target.error;reject(t)}})}},{key:"iterate",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.writable,o=void 0!==r&&r,u=n.direction,i=void 0===u?"next":u;return new Promise(function(n,r){t.cursor({writable:o,direction:i,onTouch:function(t,r){e(t,function(){return t.continue()},function(){r.transaction.abort(),n()})},onDone:function(){n()},onError:function(e){r(e)}})})}},{key:"batch",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.writable,o=void 0===r||r;return this.transaction(o).then(function(n){var r=t.name,o=[];return e.forEach(function(e){var t=new Promise(function(t,o){var u=n.objectStore(r),i=e(u);i.onsuccess=function(e){var n=e.target.result;t(n)},i.onerror=function(e){var t=e.target.error;o(t)}});o.push(t)}),Promise.all(o)})}},{key:"get",value:function(e){if(!Array.isArray(e))return this.request(function(t){return t.get(e)});var t=e.map(function(e){return function(t){return t.get(e)}});return this.batch(t,{writable:!1})}},{key:"keys",value:function(){return this.request(function(e){return e.getAllKeys()})}},{key:"all",value:function(){return this.request(function(e){return e.getAll()})}},{key:"count",value:function(){return this.request(function(e){return e.count()})}},{key:"each",value:function(e){return this.iterate(function(t,n){var r=t.value;e(r),n()})}},{key:"reverse",value:function(e){return this.iterate(function(t,n){var r=t.value;e(r),n()},{direction:"prev"})}},{key:"some",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return new Promise(function(r,o){var u,i=[],a=0,c=n,s=n+t;n<0&&(u="prev",t=Math.min(t,-n),s=(c=-(n+t)||0)+t),e.iterate(function(e,t,n){a<c?(a++,t()):a<s?(i.push(e.value),a++,t()):n()},{direction:u}).then(function(){n<0&&i.reverse(),r(i)}).catch(o)})}},{key:"first",value:function(){return this.some(1).then(function(e){return e[0]})}},{key:"last",value:function(){return this.some(1,-1).then(function(e){return e[0]})}},{key:"find",value:function(e,t){return this.request(function(n){return n.index(e).get(t)})}},{key:"query",value:function(e,t,n){var o=this,u=function(){switch(n){case">":return IDBKeyRange.lowerBound(t,!0);case">=":return IDBKeyRange.lowerBound(t);case"<":return IDBKeyRange.upperBound(t,!0);case"<=":return IDBKeyRange.upperBound(t);case"%":case"!=":case"in":return;default:return IDBKeyRange.only(t)}}(),i=[];return new Promise(function(a,c){o.cursor({index:e,range:u,onTouch:function(e,o){var u=e.value,a=o.keyPath,c=Object(r.a)(u,a);"!="===n?c!==t&&i.push(u):"%"===n?"string"==typeof c&&c.indexOf(t)>-1&&i.push(u):"in"===n?Array.isArray(t)&&t.indexOf(c)>-1&&i.push(u):i.push(u),e.continue()},onDone:function(){a(i)},onError:function(e){c(e)}})})}},{key:"select",value:function(e){var t=this.store.indexes||[],n={};t.forEach(function(e){var t=e.name,r=e.keyPath;n[t]=r});for(var o=[],u=[],i=0,a=e.length;i<a;i++){var c=e[i],s=c.key,f=c.value,l=c.compare,h=c.optional,v=n[s]||s;h?o.push({keyPath:v,value:f,compare:l}):u.push({keyPath:v,value:f,compare:l})}var d=[];return this.each(function(e){(function(e){for(var t=function(e,t,n){if(void 0===e)return!1;switch(n){case">":return e>t;case">=":return e>=t;case"<":return e<t;case"<=":return e<=t;case"!=":return e!==t;case"%":return"string"==typeof e&&e.indexOf(t)>-1;case"in":return Array.isArray(t)&&t.indexOf(e)>-1;default:return e===t}},n=0,i=u.length;n<i;n++){var a=u[n],c=a.keyPath,s=a.value,f=a.compare;if(!t(Object(r.a)(e,c),s,f))return!1}for(var l=0,h=o.length;l<h;l++){var v=o[l],d=v.keyPath;if(s=v.value,f=v.compare,t(Object(r.a)(e,d),s,f))return!0}return!1})(e)&&d.push(e)}).then(function(){return d})}},{key:"add",value:function(e){if(!Array.isArray(e))return this.request(function(t){return t.add(e)},"readwrite");var t=e.map(function(e){return function(t){return t.add(e)}});return this.batch(t)}},{key:"put",value:function(e){if(!Array.isArray(e))return this.request(function(t){return t.put(e)},"readwrite");var t=e.map(function(e){return function(t){return t.put(e)}});return this.batch(t)}},{key:"delete",value:function(e){if(!Array.isArray(e))return this.request(function(t){return t.delete(e)},"readwrite");var t=e.map(function(e){return function(t){return t.delete(e)}});return this.batch(t)}},{key:"remove",value:function(e){var t=this.keyPath;if(!Array.isArray(e)){var n=Object(r.a)(e,t);return this.delete(n)}var o=e.map(function(e){var n=Object(r.a)(e,t);return function(e){return e.delete(n)}});return this.batch(o)}},{key:"clear",value:function(){return this.request(function(e){return e.clear()},"readwrite")}}]),e}(),f=new c({name:"InDB",stores:[{name:"InDB",isKeyValue:!0}]}).use("InDB");c.setItem=f.setItem.bind(f),c.getItem=f.getItem.bind(f),c.removeItem=f.removeItem.bind(f),c.key=f.key.bind(f),t.default=c},function(e,t,n){"use strict";function r(e,t){var n=function(e){return e.toString().split(/\.|\[|\]/).filter(function(e){return!!e})}(t);if(!n.length)return e;for(var r=e,o=0,u=n.length;o<u;o++){var i=n[o];if(void 0===r[i])return;r=r[i]}return r}n.d(t,"a",function(){return r})}])},e.exports=n()}).call(this,n(2))},,function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r);class u{constructor(e){const t=new o.a({name:e,version:1,stores:[{name:"heat",keyPath:"id",autoIncrement:!0}]});this.heat=t.use("heat")}}let i;class a{constructor(e){this.timer=null,this.interval=e.interval}start(e){this.timer||(this.timer=setInterval(e,this.interval))}stop(){clearInterval(this.timer),this.timer=null}}onmessage=e=>{const{type:t,data:n}=e.data;let r;switch(t){case"start":i=new u(n.dbName);break;case"addData":i.heat.put(n);break;case"startUpload":(r=new a(n)).start(async()=>{const e=await i.heat.some(n.uploadCount);0!==e.length&&(postMessage({type:"uploadData",data:e}),e.forEach(e=>{i.heat.delete(e.id)}))})}}}]);