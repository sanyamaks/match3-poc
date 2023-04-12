!function(){"use strict";var t,n={950:function(t,n,o){var i=o(311),e=o(358),a=new(o(146).Z);window.addEventListener("resize",(function(){var t=window.innerWidth,n=window.innerHeight;a.emit("resize",t,n)}));var r=a;function s(t,n,o,i,e,a,r){try{var s=t[a](r),u=s.value}catch(t){return void o(t)}s.done?n(u):Promise.resolve(u).then(i,e)}function u(t){return function(){var n=this,o=arguments;return new Promise((function(i,e){var a=t.apply(n,o);function r(t){s(a,i,e,r,u,"next",t)}function u(t){s(a,i,e,r,u,"throw",t)}r(void 0)}))}}var c=function(t,n){var o,i,e,a,r={label:0,sent:function(){if(1&e[0])throw e[1];return e[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(o)throw new TypeError("Generator is already executing.");for(;r;)try{if(o=1,i&&(e=2&a[0]?i.return:a[0]?i.throw||((e=i.return)&&e.call(i),0):i.next)&&!(e=e.call(i,a[1])).done)return e;switch(i=0,e&&(a=[2&a[0],e.value]),a[0]){case 0:case 1:e=a;break;case 4:return r.label++,{value:a[1],done:!1};case 5:r.label++,i=a[1],a=[0];continue;case 7:a=r.ops.pop(),r.trys.pop();continue;default:if(!((e=(e=r.trys).length>0&&e[e.length-1])||6!==a[0]&&2!==a[0])){r=0;continue}if(3===a[0]&&(!e||a[1]>e[0]&&a[1]<e[3])){r.label=a[1];break}if(6===a[0]&&r.label<e[1]){r.label=e[1],e=a;break}if(e&&r.label<e[2]){r.label=e[2],r.ops.push(a);break}e[2]&&r.ops.pop(),r.trys.pop();continue}a=n.call(t,r)}catch(t){a=[6,t],i=0}finally{o=e=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}},d=105,l="./assets/fish.png",f="./assets/star.png",h="./assets/boat.png",p="./assets/mayak.png",y="./assets/FRAME.png",m="./assets/video_2023-04-05_00-59-02.mp4",v=null,w=null,g=null,x=null,b=!1;function D(t){return C.apply(this,arguments)}function C(){return(C=u((function(t){return c(this,(function(n){return[2,new Promise((function(n,o){var e=i.aNw.shared;e.add("background",m),e.add("container",y),e.add("fish",l),e.add("boat",h),e.add("mayak",p),e.add("star",f);var a=new i.W20;t.stage.addChild(a);var s=new i.xvT;s.text="0%",s.position.set(window.innerWidth/2-s.width/2,window.innerHeight/2-s.height/2);var u=new i.TCu;a.addChild(u),a.addChild(s);u.drawRoundedRect(0,0,400,20),u.lineStyle(2,16777215,1,1),u.beginFill(3717080),u.drawRoundedRect(0,0,396,16,10,30),u.endFill(),u.position.set(window.innerWidth/2-200,window.innerHeight/2-10),e.onProgress.add((function(t){u.width=400*t.progress/100,s.text=Math.round(t.progress)+"%"})),e.onComplete.add((function(){t.stage.removeChild(a),t.renderer.backgroundColor=0,n()})),e.onError.add((function(){o()})),e.load(),r.on("resize",(function(t,n){s.position.set(t/2-s.width/2,n/2-s.height/2),u.position.set(t/2-200,n/2-10)}))}))]}))}))).apply(this,arguments)}window.onload=u((function(){var t,n,o,e,a;return c(this,(function(s){switch(s.label){case 0:return(t=new i.MxU({backgroundColor:2307147,width:window.innerWidth,height:window.innerHeight})).renderer.resize(window.innerWidth,window.innerHeight),document.body.appendChild(t.view),[4,D(t)];case 1:return s.sent(),n=E(),(o=document.createElement("video")).src=m,o.autoplay=!0,o.loop=!0,o.muted=!0,document.body.appendChild(o),console.log(o),e=i.xEZ.from(o),(a=new i.jyi(e)).width=window.innerWidth,a.height=window.innerHeight,a.alpha=.5,t.stage.addChild(a),t.stage.addChild(n),r.on("resize",(function(n,o){t.renderer.resize(n,o),t.stage.width=n,t.stage.height=o,t.stage.scale.set(1,1),a.width=n,a.height=o})),[2]}}))}));var k=[["mayak","boat","star","fish"],["fish","star","star","mayak"],["star","star","fish","star"],["star","fish","boat","mayak"]],O={fish:l,star:f,boat:h,mayak:p},j=function(t,n,o,a,r,s){var u=function(t){var n=t.target.width/2+t.target.position.x,o=t.target.height/2+t.target.position.y;w={x:n,y:o},(v=t.target)&&(v.zIndex=1e4,v.alpha=.5)},c=function(n){if(v&&(v.alpha=1),b){if(v&&g){var o=v.customData.position.x,i=v.customData.position.y;v.customData.position.x=g.customData.position.x,v.customData.position.y=g.customData.position.y,g.customData.position.x=o,g.customData.position.y=i,v.position.set(x.x-52.5,x.y-52.5)}}else v&&v.position.set(w.x-52.5,w.y-52.5);v=null,w=null,g=null,x=null,b=!1;var e=function(){var n=function(t){for(var n=function(n){for(var o=function(o){if(t[4*n+o].customData.type===a){if(++e>=3)for(var r=function(t){i.find((function(i){return i.x===n&&i.y===o-t}))||i.push({x:n,y:o-t,type:a})},s=0;s<e;s++)r(s)}else e=1,a=t[4*n+o].customData.type},e=1,a=t[4*n].customData.type,r=1;r<4;r++)o(r)},o=function(n){for(var o=function(o){if(t[4*o+n].customData.type===a){if(++e>=3)for(var r=function(t){i.find((function(i){return i.x===o-t&&i.y===n}))||i.push({x:o-t,y:n,type:a})},s=0;s<e;s++)r(s)}else e=1,a=t[4*o+n].customData.type},e=1,a=t[n].customData.type,r=1;r<4;r++)o(r)},i=[],e=0;e<4;e++)n(e);for(var a=0;a<4;a++)o(a);return i}(t.children.filter((function(t){return"figure"===t.customData.name})).sort((function(t,n){return t.customData.position.x-n.customData.position.x||t.customData.position.y-n.customData.position.y})));n.length>0&&(n.forEach((function(n){var o=t.children.find((function(t){return"figure"===t.customData.name&&t.customData.position.x===n.x&&t.customData.position.y===n.y}));o&&(n.xCoord=o.x,n.yCoord=o.y,console.log("удалилось"),o.destroy())})),console.log(n),n.forEach((function(n){console.log("добавилось");var o=j(t,n.x,n.y,n.xCoord,n.yCoord,!0);t.addChild(o)})),e())};e()},l=function(n){var o=n.data.getLocalPosition(t);if(v){v.position.set(o.x-52.5,o.y-52.5);var i=v.getGlobalPosition(),e=t.children.find((function(t){var n;return"figure"===(null==t||null===(n=t.customData)||void 0===n?void 0:n.name)&&t.containsPoint({x:i.x+52.5,y:i.y+52.5})&&!(v.customData.position.x===t.customData.position.x&&v.customData.position.y===t.customData.position.y)}));if(t.children.find((function(t){var n;return"square"===(null==t||null===(n=t.customData)||void 0===n?void 0:n.name)&&t.containsPoint({x:i.x+52.5,y:i.y+52.5})&&v.customData.position.x===t.customData.position.x&&v.customData.position.y===t.customData.position.y})))return void(g&&x&&(g.alpha=1,g.position.set(x.x-52.5,x.y-52.5),b=!1));if(e)if(1===Math.abs(Math.abs(e.customData.position.x-v.customData.position.x)+Math.abs(e.customData.position.y-v.customData.position.y))){g&&(g.alpha=1,x&&(g.position.set(x.x-52.5,x.y-52.5),b=!1));var a=(g=e).width/2-g.position.x,r=g.height/2-g.position.y;x={x:a,y:r},g.alpha=.5,w&&(g.position.set(w.x-52.5,w.y-52.5),b=!0)}else g&&(g.alpha=1,x&&(g.position.set(x.x-52.5,x.y-52.5),b=!1));else g&&(g.alpha=1)}},f=Math.round(3*Math.random()),h=i.xEZ.from(s?Object.values(O)[f]:O[k[n][o]]),p=new i.jyi(h);return p.width=d,p.height=d,p.x=a,p.y=r,p.customData={name:"figure",type:s?Object.keys(O)[f]:k[n][o],position:{x:n,y:o}},p.alpha=0,e.ZP.to(p,{alpha:1,duration:1,ease:"power1.out",onComplete:function(){}}),p.interactive=!0,p.buttonMode=!0,p.on("mousedown",u),p.on("touchstart",u),p.on("mouseup",c),p.on("mouseupoutside",c),p.on("touchend",c),p.on("touchendoutside",c),p.on("mousemove",l),p.on("touchmove",l),p},E=function(){var t=i.xEZ.from(y),n=new i.jyi(t);n.anchor.set(.5,.5),n.position.set(window.innerWidth/2,window.innerHeight/2),n.width=400,n.height=400;for(var o=0;o<4;o++)for(var e=0;e<4;e++){var a=new i.TCu,s=o*d+7*o-219,u=e*d+7*e-219;a.beginFill(16777215),a.drawRect(s,u,d,d),a.endFill(),a.alpha=0,a.customData={name:"square",position:{x:o,y:e}};var c=j(n,o,e,s,u);n.addChild(a),n.addChild(c)}return n.interactive=!0,r.on("resize",(function(t,o){n.position.set(t/2,o/2)})),n}}},o={};function i(t){var e=o[t];if(void 0!==e)return e.exports;var a=o[t]={id:t,loaded:!1,exports:{}};return n[t].call(a.exports,a,a.exports,i),a.loaded=!0,a.exports}i.m=n,t=[],i.O=function(n,o,e,a){if(!o){var r=1/0;for(d=0;d<t.length;d++){o=t[d][0],e=t[d][1],a=t[d][2];for(var s=!0,u=0;u<o.length;u++)(!1&a||r>=a)&&Object.keys(i.O).every((function(t){return i.O[t](o[u])}))?o.splice(u--,1):(s=!1,a<r&&(r=a));if(s){t.splice(d--,1);var c=e();void 0!==c&&(n=c)}}return n}a=a||0;for(var d=t.length;d>0&&t[d-1][2]>a;d--)t[d]=t[d-1];t[d]=[o,e,a]},i.d=function(t,n){for(var o in n)i.o(n,o)&&!i.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},i.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t},function(){var t={179:0};i.O.j=function(n){return 0===t[n]};var n=function(n,o){var e,a,r=o[0],s=o[1],u=o[2],c=0;if(r.some((function(n){return 0!==t[n]}))){for(e in s)i.o(s,e)&&(i.m[e]=s[e]);if(u)var d=u(i)}for(n&&n(o);c<r.length;c++)a=r[c],i.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return i.O(d)},o=self.webpackChunkpixi_typescript_boilerplate=self.webpackChunkpixi_typescript_boilerplate||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var e=i.O(void 0,[746],(function(){return i(950)}));e=i.O(e)}();