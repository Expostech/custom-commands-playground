(this["webpackJsonpcustom-command-templates"]=this["webpackJsonpcustom-command-templates"]||[]).push([[0],{1483:function(e,n,t){"use strict";t.r(n);var a=t(4),r=t.n(a),i=t(11),c=t.n(i),s=(t(40),t(9)),l=t(8),o=t.n(l);o.a.registerHelper("eq",(function(e,n){return e===n})),o.a.registerHelper("gt",(function(e,n){return e>n})),o.a.registerHelper("gte",(function(e,n){return e>=n})),o.a.registerHelper("lt",(function(e,n){return e<n})),o.a.registerHelper("lte",(function(e,n){return e<=n})),o.a.registerHelper("ne",(function(e,n){return e!==n}));var d=t(1),u=t.n(d);var m=function(){return{createdAt:1552652314408,updatedAt:1552753112921,id:1,steamId:"76561198028198341",entityId:u.a.random.number(),ip:u.a.internet.ip(),country:u.a.address.countryCode(),currency:u.a.random.number(),avatarUrl:u.a.internet.avatar(),name:u.a.internet.userName(),positionX:u.a.random.number(),positionY:u.a.random.number(),positionZ:u.a.random.number(),inventory:null,playtime:u.a.random.number(),lastOnline:u.a.date.past(),banned:u.a.random.boolean(),deaths:u.a.random.number(),zombieKills:u.a.random.number(),playerKills:u.a.random.number(),score:u.a.random.number(),level:u.a.random.number(),lastTeleportTime:u.a.date.past(),server:1,user:1,role:1}},p=t(14);var b=function(){return{createdAt:1552652314131,updatedAt:1552750573472,id:1,name:u.a.company.companyName(),ip:u.a.internet.ip(),webPort:u.a.random.number(),onlinePlayers:Object(p.a)(Array(u.a.random.number(10))).map((function(e){return m()}))}},j=function(){return{name:"Custom command",data:{date:"2019-03-16",time:"16:18:46",uptime:"612525.066",msg:"Executing command 'w2l testing' by Telnet from 127.0.0.1:37284",type:"Log",player:m(),server:b()}}},g=function(){return{name:"Cron",data:{server:b()}}},f=function(){return{name:"Hook",data:{date:"2019-03-16",time:"16:18:46",uptime:"612525.066",msg:"Executing command 'w2l testing' by Telnet from 127.0.0.1:37284",type:"Log",player:m(),server:b()}}},h=t(0),v=Object(s.a)({input:'\n  pm {{player.steamId}} "Hey {{player.name}} hows it going?"; \n  pm {{player.steamId}} "These high-level players are also online:\n    {{#each server.onlinePlayers}}\n      {{#if (gt this.level 10000)}}\n        {{this.name}}\n      {{/if}}\n    {{/each}}"\n    ',dataTemplates:[j,g,f],data:null});function O(){return Object(h.jsxs)("div",{className:"container",children:[Object(h.jsxs)("div",{className:"container flex flex-row",children:[Object(h.jsxs)("div",{className:"p-5",children:[Object(h.jsx)("div",{className:"py-1",children:Object(h.jsx)(N,{})}),Object(h.jsx)("div",{className:"py-1",children:Object(h.jsx)(y,{})})]}),Object(h.jsx)("div",{className:"p-5 w-full",children:Object(h.jsx)(w,{})})]}),Object(h.jsxs)("div",{className:"container",children:[Object(h.jsx)("h1",{className:"font-extrabold text-xl",children:"Output"}),Object(h.jsx)("div",{className:"p-5",children:Object(h.jsx)(x,{})})]})]})}var x=Object(s.b)((function(){var e,n;try{e=JSON.parse(v.data)}catch(t){e=null}try{n=function(e,n){var t=o.a.compile(e);return console.log(n),t(n)}(v.input,e)}catch(t){n="Invalid template, "+t}return Object(h.jsx)("div",{className:"bg-indigo-400 h-96 rounded-lg p-3",children:n})})),y=Object(s.b)((function(){return Object(h.jsx)("div",{className:"text-sm overflow-auto h-96 w-96  bg-indigo-400 rounded-lg",children:Object(h.jsx)("pre",{children:Object(h.jsx)("code",{children:v.data})})})})),N=Object(s.b)((function(){var e=v.dataTemplates.map((function(e,n){return Object(h.jsx)("option",{value:n,children:e().name})}));return v.data||(v.data=JSON.stringify(j().data,null,4)),Object(h.jsx)("select",{className:"text-black bg-indigo-400 rounded-lg",onChange:function(e){return v.data=JSON.stringify(v.dataTemplates[e.target.value]().data,null,4)},children:e})})),w=Object(s.b)((function(){return Object(h.jsx)("textarea",{className:"bg-indigo-400 h-full w-full rounded-lg p-10",value:v.input,onChange:function(e){return v.input=e.target.value}})}));var T=function(){return Object(h.jsx)("div",{className:"App-header",children:Object(h.jsx)(O,{})})},C=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,1484)).then((function(n){var t=n.getCLS,a=n.getFID,r=n.getFCP,i=n.getLCP,c=n.getTTFB;t(e),a(e),r(e),i(e),c(e)}))};c.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(T,{})}),document.getElementById("root")),C()},40:function(e,n,t){}},[[1483,1,2]]]);
//# sourceMappingURL=main.dd1488b1.chunk.js.map