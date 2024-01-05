n=function(t){var e=t[0],i="'"===e;return t.substring(1,t.length-1).replace(/\\\\/g,"\\").replace(i?/\\'/g:/\\"/g,e)};const t=/\S/g,e=/[\s=]/g;function i(t,e,i){return e.lastIndex=i,e.exec(t)}function r(r,o){let s;let h={},a=r.indexOf(" ");if(a<0)return h;for(;s=i(r,t,a);){if(!(s=i(r,e,a=s.index)))throw Error(`Unexpected "${r.slice(a)}" on line ${o}`);let l=r.slice(a,s.index),d=r.indexOf("=",s.index);if(d<0)throw Error(`Attribute is missing "=" on line ${o}`);if(!(s=i(r,t,d+1)))throw Error(`Attribute is missing value on line ${o}`);let u=s.index,f="";if('"'==r[u]){let t=function(t,e){for(;;){if((e=t.indexOf('"',e))<0)return -1;if(!function(t,e){let i=!1;for(;e>0&&"\\"==t[e-=1];)i=!i;return i}(t,e))break;e+=1}return e}(r,u+1);if(t<0)throw Error(`String missing closing quote on line ${o}`);t+=1,f=n(r.slice(u,t)),a=t}else{let t=r.indexOf(" ",u);t<0&&(t=r.length),f=r.slice(u,t),a=t}h[l]=f}return h}function o(t,e){let i=[t];for(let t in e){let r=e[t];switch(typeof r){case"string":""!=r&&(i.push(" "),i.push(t),i.push("="),i.push('"'+r.replace(/\\|"/g,function(t){return"\\"+t})+'"'));break;case"number":0!=r&&i.push(` ${t}=${r}`);break;case"boolean":!0==r&&(i.push(" "),i.push(t),i.push("=1"));break;case"object":if(Array.isArray(r))break;default:throw Error(`Unexpected ${typeof r} for ${t}`)}}return i.join("")}var n,s={},h={},a=function(){};function l(t,e){let i=t.x+t.w<=e.x,r=t.x>=e.x+e.w,o=t.y+t.h<=e.y,n=t.y>=e.y+e.h;return!(i||r||o||n)}function d(t,e,i){return e>=t.x&&e<=t.x+t.w&&i>=t.y&&i<=t.y+t.h}function u(t){let e=t.frames[0],i=e.x,r=e.y,o=e.x+e.w,n=e.y+e.h;for(let e=1;e<t.frames.length;e++){let s=t.frames[e];i=Math.min(i,s.x),r=Math.min(r,s.y),o=Math.max(o,s.x+s.w),n=Math.max(n,s.y+s.h)}t.x=i,t.y=r,t.w=o-i,t.h=n-r}function f(t,e,i){let r=e-t.x,o=i-t.y;for(let n of(t.x=e,t.y=i,t.frames))n.x+=r,n.y+=o}a.prototype={fit:function(t){var e,i,r,o,n=t.length,s=n>0?t[0].width:0,h=n>0?t[0].height:0;for(e=0,this.root={x:0,y:0,width:s,height:h};e<n;e++)r=t[e],o=(i=this.findNode(this.root,r.width,r.height))?this.splitNode(i,r.width,r.height):this.growNode(r.width,r.height),r.x=o.x,r.y=o.y},findNode:function(t,e,i){return t.used?this.findNode(t.right,e,i)||this.findNode(t.down,e,i):e<=t.width&&i<=t.height?t:null},splitNode:function(t,e,i){return t.used=!0,t.down={x:t.x,y:t.y+i,width:t.width,height:t.height-i},t.right={x:t.x+e,y:t.y,width:t.width-e,height:i},t},growNode:function(t,e){var i=t<=this.root.width,r=e<=this.root.height,o=r&&this.root.height>=this.root.width+t,n=i&&this.root.width>=this.root.height+e;return o?this.growRight(t,e):n?this.growDown(t,e):r?this.growRight(t,e):i?this.growDown(t,e):null},growRight:function(t,e){var i;return(this.root={used:!0,x:0,y:0,width:this.root.width+t,height:this.root.height,down:this.root,right:{x:this.root.width,y:0,width:t,height:this.root.height}},i=this.findNode(this.root,t,e))?this.splitNode(i,t,e):null},growDown:function(t,e){var i;return(this.root={used:!0,x:0,y:0,width:this.root.width,height:this.root.height+e,down:{x:0,y:this.root.height,width:this.root.width,height:e},right:this.root},i=this.findNode(this.root,t,e))?this.splitNode(i,t,e):null}},h=a,s=function(t,e){e=e||{};var i=new h,r=e.inPlace||!1,o=t.map(function(t){return r?t:{width:t.width,height:t.height,item:t}});o=o.sort(function(t,e){return e.width*e.height-t.width*t.height}),i.fit(o);var n={width:o.reduce(function(t,e){return Math.max(t,e.x+e.width)},0),height:o.reduce(function(t,e){return Math.max(t,e.y+e.height)},0)};return r||(n.items=o),n};const c=document.querySelector("#input canvas"),g=new class{#t;#e;#i;#r;#o;#n;#s;#h;#a;#l;#d;#u;constructor(t){this.#t={},this.#e=[],this.#i=[],this.#h=!1,this.#a=!1,this.#d=0,this.#u=0,this.#r=t,this.#o=t.getContext("2d"),this.#n=document.createElement("canvas"),this.#s=this.#n.getContext("2d"),this.#s.globalCompositeOperation="copy";let e=0,i=0,r=r=>{let o=t.getBoundingClientRect(),n=t.width/o.width;e=Math.floor((r.clientX-o.left)*n),i=Math.floor((r.clientY-o.top)*n)};this.#r.addEventListener("mousedown",t=>{r(t),this.#a=!0,this.#d=e,this.#u=i,this.#i.some(({work:t})=>d(t,e,i))?this.#h=!1:(this.#i=this.#e.filter(({work:t})=>d(t,e,i)),this.#h=0==this.#i.length),this.render()}),document.body.addEventListener("mousemove",t=>{if(!this.#a)return;let o=e,n=i;if(r(t),this.#h){let t=Math.min(e,this.#d),r=Math.min(i,this.#u),o={x:t,y:r,w:Math.max(e,this.#d)-t,h:Math.max(i,this.#u)-r};this.#l=o,this.#i=this.#e.filter(({work:t})=>l(o,t))}else{let t=e-o,r=i-n;this.#f(t,r)}this.render()}),document.body.addEventListener("mouseup",()=>{this.#a&&(this.#a=!1,this.#l=void 0,this.render())}),this.#r.addEventListener("keydown",t=>{let e=0,i=0;switch(t.code){case"KeyA":case"ArrowLeft":e-=1;break;case"KeyD":case"ArrowRight":e+=1;break;case"KeyW":case"ArrowUp":i-=1;break;case"KeyS":case"ArrowDown":i+=1}(0!=e||0!=i)&&(t.preventDefault(),t.shiftKey?this.#c(e,i):this.#f(e,i),this.render())})}#f(t,e){for(let{work:i}of this.#i)f(i,i.x+t,i.y+e)}#c(t,e){if(0==this.#i.length)return;this.#i.sort((t,e)=>t.work.x-e.work.x);let i=this.#i[0].work.x,r=0;for(let{work:e}of this.#i)e.x!=i&&(i=e.x,r+=t),f(e,e.x+r,e.y);this.#i.sort((t,e)=>t.work.y-e.work.y);let o=this.#i[0].work.y,n=0;for(let{work:t}of this.#i)t.y!=o&&(o=t.y,n+=e),f(t,t.x,t.y+n)}loadSheet(t){var e;let i=t.image;this.#t=t;let r=function(t){let e=t.flatMap(t=>t.frames),i=[];for(;e.length>0;)i.push(function(t){let e={x:0,y:0,w:0,h:0,frames:[t.pop()]};u(e);for(let i=t.length-1;i>=0;i--){let r=t[i];l(e,r)&&e.frames.some(t=>l(t,r))&&(t[i]=t[t.length-1],t.pop(),e.frames.push(r),u(e))}return e}(e));return i}(t.animations),o=((e=s)&&e.__esModule?e.default:e)(r.map(t=>({width:t.w+2,height:t.h+2,group:t})));for(let t of(this.#e=[],o.items)){let e=t.item.group,i=structuredClone(e);f(i,t.x+1,t.y+1),this.#e.push({work:e,packed:i})}for(let{work:t,packed:e}of(this.#r.width=i.width,this.#r.height=i.height,this.#n.width=o.width,this.#n.height=o.height,this.#e))for(let r=0;r<e.frames.length;r++){let o=t.frames[r],n=e.frames[r],s=o.w,h=o.h;this.#s.drawImage(i,o.x,o.y,s,h,n.x,n.y,s,h)}this.render()}render(){this.#o.clearRect(0,0,this.#r.width,this.#r.height),this.#g(this.#o),this.#m()}#g(t){for(let{work:e,packed:i}of this.#e)for(let r=0;r<i.frames.length;r++){let o=i.frames[r],n=e.frames[r],s=o.w,h=o.h;t.drawImage(this.#n,o.x,o.y,s,h,n.x,n.y,s,h)}}#m(){let t=this.#o;t.strokeStyle="orange",t.fillStyle="rgba(255, 127, 0, 0.2)";let e=e=>{t.beginPath(),t.rect(e.x+.5,e.y+.5,e.w-1,e.h-1),t.fill(),t.stroke()};for(let i of this.#e)t.globalAlpha=this.#i.includes(i)?1:.2,e(i.work);t.globalAlpha=1,this.#l&&e(this.#l)}renderOutput(t){t.width=this.#r.width,t.height=this.#r.height;let e=t.getContext("2d");this.#g(e)}serializeSheet(){return this.#t.animations?function(t){let e=[];for(let i of t){for(let t of(e.push(o("animation",i)),i.frames))for(let i of(e.push(o("frame",t)),t.points))e.push(o("point",i));e.push("")}return e.join("\n")}(this.#t.animations):""}}(c),m={};function w(t){console.error(t),alert(t)}async function p(t){for(let e of t)if(e.name.endsWith(".png"))try{m.image=await function(t){return new Promise((e,i)=>{let r=new FileReader;r.onload=function(){let o=new Image;o.src=r.result,o.onload=function(){e(o)},o.onerror=function(){i(Error(`Failed to load "${t.name}"`))}},r.onerror=function(){i(Error(`Failed to load "${t.name}: ${r.error}"`))},r.readAsDataURL(t)})}(e),m.imageError=void 0}catch(t){console.error(t),m.imageError=t.toString()}else if(e.name.endsWith(".animation"))try{let t=await function(t){return new Promise((e,i)=>{let r=new FileReader;r.onload=function(){e(r.result)},r.onerror=function(){i(Error(`Failed to load "${t.name}: ${r.error}"`))},r.readAsText(t)})}(e);m.animations=function(t){let e,i;let o=[],n=0;for(let s of t.split("\n"))if(s=s.trim(),n+=1,!(""==s||s.startsWith("#")||s.startsWith("imagePath")||s.startsWith("version"))){if(s.startsWith("animation ")){let t=r(s,n),i={state:t.state,frames:[]};if(!t.state)throw Error(`Animation is missing state name on line ${n}`);o.push(i),e=i}else if(s.startsWith("frame ")||s.startsWith("blank ")){if(!e)throw Error(`No animation state to associate frame with on line ${n}`);let t=r(s,n),o={x:parseFloat(t.x)||0,y:parseFloat(t.y)||0,w:parseFloat(t.w)||0,h:parseFloat(t.h)||0,originx:parseFloat(t.originx)||0,originy:parseFloat(t.originy)||0,flipx:parseInt(t.flipy)||0,flipy:parseInt(t.flipy)||0,duration:t.duration||"",points:[]};e.frames.push(o),i=o}else if(s.startsWith("point ")){if(!i)throw Error(`No frame to associate point with on line ${n}`);let t=r(s,n);if(!t.label)throw Error(`Point is missing label on line ${n}`);let e={label:t.label,x:parseFloat(t.x),y:parseFloat(t.y)};i.points.push(e)}else{let t=s.indexOf(" "),e=t<0?s:s.slice(0,t);throw Error(`Unexpected "${e}" on line ${n}`)}}return o}(t),m.animationError=void 0}catch(t){console.error(t),m.animationError=t.toString()}}document.getElementById("bake-button").onclick=function(){let t=document.querySelector("#output canvas"),e=document.querySelector("#output textarea");try{g.renderOutput(t),e.value=g.serializeSheet()}catch(t){w(t)}},document.body.addEventListener("dragover",t=>t.preventDefault()),document.body.addEventListener("drop",t=>{let e=t.dataTransfer?.items;if(!e)return;t.preventDefault();let i=[];for(let t of e){let e=t.getAsFile();e&&i.push(e)}p(i).catch(w).finally(()=>{let t=m.animationError?m.animationError:m.imageError?m.imageError:m.animations?m.image?void 0:"Missing image file":"Missing .animation file";document.querySelector("#input .error-text").innerText=t||"",t||g.loadSheet(m)})});
//# sourceMappingURL=index.a643d7d1.js.map
