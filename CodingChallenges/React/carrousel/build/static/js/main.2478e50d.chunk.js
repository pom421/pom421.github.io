(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){},18:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(7),i=n.n(a),s=(n(14),n(1)),c=n(2),u=n(4),l=n(3),p=n(5),h=(n(16),n(18),function(e){return Object.keys(e).filter(function(t){return!!e[t]}).join(" ")});var d=function(e){var t=h({dot:!0,selected:e.id===e.selected,pause:e.id===e.selected&&e.pause});return r.a.createElement("span",{className:t,onClick:e.onClick})},m=function e(t){var n=this,o=t.duration,r=t.callback;Object(s.a)(this,e),this.start=function(){n.id||(n.id=setInterval(n.callback,n.duration))},this.isRunning=function(){return!!n.id},this.stop=function(){n.id&&(clearInterval(n.id),n.id=null)},this.reset=function(){n.stop(),n.start()},this.pause=function(){n.stop()},this.duration=o,this.callback=r},f=function(e){function t(){var e,n;Object(s.a)(this,t);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={id:0,pause:!1},n.handleKey=function(e){console.log("key",e.key)," "===e.key||"Spacebar"===e.key?n.runToggleCarrousel():"ArrowRight"===e.key?n.nextPhoto():"ArrowLeft"===e.key&&n.prevPhoto()},n.nextPhoto=function(){n.setState(function(e){return{id:n.nextId(e)}},function(){return!n.state.pause&&n.timer.reset()})},n.prevPhoto=function(){n.setState(function(e){return{id:n.prevId(e)}},function(){return!n.state.pause&&n.timer.reset()})},n.idPhoto=function(e){n.setState(function(t){return{id:e}},function(){return!n.state.pause&&n.timer.reset()})},n.nextId=function(e){var t=e.id+1;return t===n.photosSize?0:t},n.prevId=function(e){var t=e.id-1;return t<0?n.photosSize-1:t},n.runToggleCarrousel=function(){n.timer.isRunning()?(n.timer.pause(),n.setState({pause:!0}),console.log("Arr\xeat du carrousel")):(n.setState({pause:!1}),console.log("Lancement du carrousel"),n.timer.start())},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.photos&&(this.photosSize=this.props.photos.length),this.timer=new m({duration:2e3,callback:function(){e.setState(function(t){return{id:e.nextId(t)}})}}),this.runToggleCarrousel(this.timer),document.addEventListener("keydown",this.handleKey,!1)}},{key:"componentWillUnmount",value:function(){console.log("Suppression du setInterval"),this.timer.stop(),document.removeEventListener("keydown",this.handleKey)}},{key:"render",value:function(){var e=this,t=this.props.photos;return t&&t.length?r.a.createElement("div",null,r.a.createElement("div",{className:"row"},r.a.createElement("span",{className:"arrow-left",onClick:this.prevPhoto}),r.a.createElement("img",{className:"nice",src:t[this.state.id],alt:"Carrousel"}),r.a.createElement("span",{className:"arrow-right",onClick:this.nextPhoto})),r.a.createElement("div",null,t.map(function(t,n){return r.a.createElement(d,{key:n,id:n,selected:e.state.id,pause:e.state.pause,onClick:function(){return e.idPhoto(n)}})}))):r.a.createElement("div",null,"No photos")}}]),t}(o.Component),v=["https://picsum.photos/400/600/?image=609","https://picsum.photos/400/600/?image=817","https://picsum.photos/400/600/?image=388"],g=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("h2",null,"Carrousel"),r.a.createElement("div",null,"See ",r.a.createElement("a",{href:"https://github.com/pom421/pom421.github.io/tree/master/CodingChallenges/React/carrousel"},"code on GitHub")),r.a.createElement(f,{photos:v}))}}]),t}(o.Component);i.a.render(r.a.createElement(g,null),document.getElementById("root"))},8:function(e,t,n){e.exports=n(20)}},[[8,2,1]]]);
//# sourceMappingURL=main.2478e50d.chunk.js.map