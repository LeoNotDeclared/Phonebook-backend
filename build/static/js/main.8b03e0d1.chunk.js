(this.webpackJsonpthephonebook=this.webpackJsonpthephonebook||[]).push([[0],{20:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var o=t(1),c=t(15),r=t.n(c),a=(t(20),t(6)),s=t(3),i=t(0),u=function(e){var n=e.persons,t=e.setPersons,o=e.searchName,c=e.setSearchName;return Object(i.jsxs)("div",{children:["filter shown with ",Object(i.jsx)("input",{value:o,onChange:function(e){e.preventDefault(),c(e.target.value);var o=n;o.forEach((function(n){n.name.toLowerCase().match(e.target.value.toLowerCase())?n.show=!0:(n.show=!1,console.log("change something to False"))})),t(o),console.log("setPersons...",e.target.value)}})]})},d=t(4),l=t.n(d),h="/api/persons",f={create:function(e){return l.a.post(h,e).then((function(e){return e.data}))},deleteId:function(e){return l.a.delete("".concat(h,"/").concat(e)).then((function(e){return e}))},read:function(){return l.a.get(h).then((function(e){return e.data}))},update:function(e,n){return l.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))}},b=function(e){var n=e.persons,t=e.setPersons,c=e.setMessage,r=Object(o.useState)(""),a=Object(s.a)(r,2),u=a[0],d=a[1],l=Object(o.useState)(""),h=Object(s.a)(l,2),b=h[0],j=h[1];return Object(i.jsxs)("form",{onSubmit:function(e){e.preventDefault();var o=[];if(n.forEach((function(e){o.concat(e.name)})),o.includes(u)){if(window.confirm("".concat(u," is already added to phonebook,replace the old number with a new one?"))){var r;n.forEach((function(e){e.name===u&&(r=e.id)}));var a={id:r,name:u,number:b,show:!0};f.update(r,a).then((function(e){console.log(e),t(n.map((function(n){return n.id!==e.id?n:e}))),console.log("update successful id=".concat(r))})).catch((function(e){c("Information of ".concat(u," has already been removed from server.")),console.log("update error")}))}}else{var s={id:n.length+1,name:u,number:b,show:!0};t(n.concat(s)),f.create(s).then((function(e){c("Added ".concat(u,"."))})).catch((function(e){c("".concat(e.response.data.error)),console.log(e.response.data)}))}d(""),j("")},children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{onChange:function(e){d(e.target.value)}})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{onChange:function(e){j(e.target.value)}})]}),Object(i.jsx)("button",{type:"submit",children:"add"})]})},j=function(e){var n=e.persons,t=e.setPersons;console.log("rendering Persons: ".concat(n.length)),console.log("persons:",n);var o=[];n.forEach((function(e){!0===e.show&&(o=o.concat(e))})),console.log("personToShow:",o);var c=function(e){return function(){window.confirm("Delete ".concat(e.name," id:").concat(e.id," ?"))&&(f.deleteId(e.id).then((function(){var o=n.concat();o.splice(o.findIndex((function(n){return n.id===e.id})),1),console.log(n),console.log(o),t(o)})),console.log("deleteID id=".concat(e.id)))}};return Object(i.jsx)("div",{children:o.map((function(e){return Object(i.jsxs)("div",{children:[e.name," ",e.number," ",Object(i.jsx)("button",{onClick:c(e),children:"delele"})]},e.name)}))})},g=function(e){var n=e.message;if(null===n)return null;var t={color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return(n.startsWith("Information")||n.startsWith("Person"))&&(t.color="red"),Object(i.jsx)("div",{style:t,children:n})},m=function(){var e=Object(o.useState)([]),n=Object(s.a)(e,2),t=n[0],c=n[1],r=Object(o.useState)(""),d=Object(s.a)(r,2),l=d[0],h=d[1],m=Object(o.useState)(null),p=Object(s.a)(m,2),O=p[0],v=p[1],x=Object(o.useState)([]),w=Object(s.a)(x,2),S=w[0],P=w[1];return Object(o.useEffect)((function(){f.read().then((function(e){c(e),P(e.map((function(e){return Object(a.a)(Object(a.a)({},e),{},{show:!0})})))}))}),[]),Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(g,{message:O}),Object(i.jsx)(u,{persons:S,setPersons:P,searchName:l,setSearchName:h}),Object(i.jsx)("h3",{children:"Add a new"}),Object(i.jsx)(b,{persons:t,setPersons:c,setMessage:v}),Object(i.jsx)("h3",{children:"Numbers"}),Object(i.jsx)(j,{persons:S,setPersons:P})]})},p=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,41)).then((function(n){var t=n.getCLS,o=n.getFID,c=n.getFCP,r=n.getLCP,a=n.getTTFB;t(e),o(e),c(e),r(e),a(e)}))};r.a.render(Object(i.jsx)(m,{}),document.getElementById("root")),p()}},[[40,1,2]]]);
//# sourceMappingURL=main.8b03e0d1.chunk.js.map