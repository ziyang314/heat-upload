!function(t){var e={};function o(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=e,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(r,n,function(e){return t[e]}.bind(null,n));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=2)}({2:function(t,e,o){"use strict";o.r(e);var r={container:"body",uploadUrl:"",interval:1e4,workerSrc:"wk.js",dbName:"heatmap",uploadCount:5};class n{constructor(t){this.init(t)}init(t){this.options={...r,...t},this.start()}static getResolution(){return{width:document.body.clientWidth,height:document.body.clientHeight,scrollHeight:document.body.scrollHeight}}createService(){if(!window.Worker)throw new Error("您的浏览器不支持web worker");if(!this.options.workerSrc)throw new Error("请指定worker文件的路径");this.wk=new Worker(this.options.workerSrc),this.wk.onerror=t=>{console.error(t)}}start(){this.createService(),this.wk.postMessage({type:"start",data:this.options}),this.wk.onmessageerror=t=>console.error(t),this.listen(),this.wk.onmessage=t=>{const{type:e,data:o}=t.data;"uploadData"===e&&this.uploadData(o)},this.startUpload()}listen(){this.container=document.querySelector(this.options.container),"object"==typeof this.container&&this.container.addEventListener("mousedown",t=>{const e=n.getResolution(),{scrollTop:o}=t.target,r=window.location.pathname+encodeURIComponent(window.location.hash.substring(0,200)),{host:i}=window.location,{width:a,height:s,scrollHeight:c}=e,l=t.path||t.composedPath&&t.composedPath(),d=l.slice(0,l.findIndex(t=>"body"===t.tagName.toLowerCase()));let u=!1;d.length&&d.forEach(t=>{"fixed"===getComputedStyle(t).getPropertyValue("position")&&(u=!0)}),this.wk.postMessage({type:"addData",data:{clientX:t.clientX,clientY:t.clientY+o,clientWidth:a,clientHeight:s,scrollHeight:c,path:r,host:i,isDialog:u}})})}uploadData(t){const e=JSON.stringify({hitdata:t});(new Image).src=`${this.options.uploadUrl}${e}`}startUpload(){this.wk.postMessage({type:"startUpload",data:this.options})}}new n({workerSrc:"./wk.js",uploadUrl:"http://localhost:3001/interface?interface_name=hitdata&interface_params="})}});