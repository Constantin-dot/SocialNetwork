(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[4],{292:function(e,a,s){e.exports={dialogs:"Dialogs_dialogs__2sG--",dialogsItems:"Dialogs_dialogsItems__31zXk",active:"Dialogs_active__1z_Ga",messages:"Dialogs_messages__31Eno"}},293:function(e,a,s){e.exports={dialog:"DialogItem_dialog__3lXd5"}},294:function(e,a,s){e.exports={messages:"Message_messages__3LXnT"}},300:function(e,a,s){"use strict";s.r(a);var t=s(126),n=s(0),i=s.n(n),o=s(292),l=s.n(o),c=s(293),m=s.n(c),d=s(12),r=function(e){var a="/dialogs/"+e.id;return i.a.createElement("div",{className:"".concat(m.a.dialog," ").concat(m.a.active)},i.a.createElement(d.b,{to:a},e.name))},g=s(294),u=s.n(g),_=function(e){return i.a.createElement("div",{className:u.a.messages},e.message)},f=s(87),p=s(127),E=s(84),b=s(33),v=Object(E.a)(50),y=Object(p.a)({form:"dialogsAddMessageForm"})((function(e){return i.a.createElement("form",{onSubmit:e.handleSubmit},i.a.createElement("div",null,i.a.createElement(f.a,{component:b.b,validate:[E.b,v],name:"newMessageBody",placeholder:"Enter your message"})),i.a.createElement("div",null,i.a.createElement("button",null,"Add message")))})),M=function(e){var a=e.dialogsPage.dialogs.map((function(e){return i.a.createElement(r,{key:e.id,id:e.id,name:e.name})})),s=e.dialogsPage.messages.map((function(e){return i.a.createElement(_,{key:e.id,message:e.message})}));return i.a.createElement("div",{className:l.a.dialogs},i.a.createElement("div",{className:l.a.dialogsItems},a),i.a.createElement("div",{className:l.a.messages},s,i.a.createElement(y,{onSubmit:function(a){e.addMessage(a.newMessageBody)}})))},h=s(17),j=s(8);a.default=Object(j.d)(Object(h.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{addMessage:function(a){e(Object(t.a)(a))}}})))(M)}}]);
//# sourceMappingURL=4.f013113f.chunk.js.map