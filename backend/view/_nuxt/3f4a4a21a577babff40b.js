(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{188:function(t,e,n){var content=n(192);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(30).default)("cab92e08",content,!0,{sourceMap:!1})},191:function(t,e,n){"use strict";var o=n(188);n.n(o).a},192:function(t,e,n){(t.exports=n(29)(!1)).push([t.i,".container[data-v-3677ad56]{position:absolute;margin:0 auto;width:100%;height:100%;padding:100px;display:flex;align-items:center;text-align:center;z-index:2;flex-direction:column}.container .content[data-v-3677ad56]{flex:0 0 auto;display:flex;position:relative;min-width:800px;max-width:1500px;width:100%;height:750px;flex-direction:column}.container .content .line[data-v-3677ad56]{display:flex;position:relative;justify-content:center;align-items:center}.container .content .title[data-v-3677ad56]{font-family:meow;font-size:22px;letter-spacing:2px;margin-bottom:10px;color:#fff}.container .content .chart[data-v-3677ad56]{width:90%;height:400px}.container .content .birthday[data-v-3677ad56],.container .content .sex[data-v-3677ad56]{flex:1 1 auto;display:flex;position:relative;height:450px;flex-direction:column;align-items:center}.container .content .level[data-v-3677ad56]{flex:1 1 auto;display:flex;flex-direction:column;margin-top:10px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.container .content .level .level-chart[data-v-3677ad56]{flex:0 0 auto;display:flex;padding-left:20px;padding-right:20px;height:200px;width:100%;margin-top:10px;align-items:center;justify-content:space-between}.container .content .level .level-chart .circle-wrap[data-v-3677ad56]{flex:0 0 auto;display:flex;position:relative;width:120px;height:120px;flex-direction:column;align-items:center;border-radius:50%;box-shadow:3px 0 5px 0 hsla(0,0%,47.1%,.4);background-color:hsla(0,0%,100%,.8)}.container .content .level .level-chart .circle-wrap .level-title[data-v-3677ad56]{margin-top:20px;font-size:15px;width:70px;padding-bottom:4px;border-bottom:1px solid #7f828b}.container .content .level .level-chart .circle-wrap .level-score[data-v-3677ad56]{font-size:22px;margin-top:10px}.container .footer[data-v-3677ad56]{flex:0 0 auto;display:flex;position:absolute;bottom:5vh;min-width:400px;max-height:700px;height:100px;justify-content:center;align-items:center;flex-direction:column;font-family:meow;font-size:20px;color:#fff;font-weight:600}",""])},193:function(t,e,n){"use strict";n.r(e);n(56),n(57),n(28),n(19),n(13);var o="http://127.0.0.1:47890",l="".concat(o,"/birthday"),r="".concat(o,"/sex"),c="".concat(o,"/level"),f="".concat(o,"/info"),d=n(189),v=n.n(d),h=(n(190),{data:function(){return{levelData:[{score:0},{score:0},{score:0},{score:0},{score:0},{score:0},{score:0}],counter:[],render:[],info:{sample:0,date:null}}},filters:{date_filter:function(t){var e=new Date(t);return"".concat(e)}},methods:{init_info:function(){var t=this;return new Promise((function(e,n){t.$axios.get(f).then((function(n){t.info=n.data.msg,e("ok")})).catch((function(t){console.log(t),n()}))}))},birthday_chart:function(){var t=this;return new Promise((function(e,n){t.$axios.get(l).then((function(n){var o=new v.a.Chart({container:"birthday",forceFit:!0,height:400}),data=n.data.msg;o.source(data),o.axis("quarter",{label:{textStyle:{fill:"#fff"}}}),o.axis("count",{label:{textStyle:{fill:"#fff"}}}),o.legend(!1),o.interval().position("quarter*count").color("quarter",["#40c5ff","#ff5f81","#fb7a5c","#64d8ac"]),t.render.push(o),e("ok")})).catch((function(t){console.log(t),n()}))}))},sex_chart:function(){var t=this;return new Promise((function(e,n){t.$axios.get(r).then((function(n){var o=new v.a.Chart({container:"sex",forceFit:!0,height:400}),data=n.data.msg;o.source(data,{percent:{formatter:function(t){return t=100*t+"%"}}}),o.legend(!1),o.coord("theta",{radius:.75}),o.tooltip({showTitle:!1,itemTpl:'<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'}),o.axis("percent",{label:{textStyle:{fill:"#fff"}}}),o.intervalStack().position("percent").color("title",["#ff5f81","#ffe971","#40c5ff"]).label("percent",{formatter:function(t,e){return e.point.title+": "+t},textStyle:{fill:"#fff"}}).tooltip("title*percent",(function(title,t){return{name:title,value:t=100*t+"%"}})).style({lineWidth:1,stroke:"#fff"}),t.render.push(o),e("ok")})).catch((function(t){console.log(t),n()}))}))},level_chart:function(){var t=this;return new Promise((function(e,n){t.$axios.get(c).then((function(n){var data=n.data.msg;t.levelData=data,console.log(t.levelData),e("ok")})).catch((function(t){console.log(t),n()}))}))},render_view:function(){var t=!0,e=!1,n=void 0;try{for(var o,l=this.render[Symbol.iterator]();!(t=(o=l.next()).done);t=!0){o.value.render()}}catch(t){e=!0,n=t}finally{try{t||null==l.return||l.return()}finally{if(e)throw n}}}},mounted:function(){var t=this;this.$Spin.show(),Promise.all([this.init_info(),this.birthday_chart(),this.sex_chart(),this.level_chart()]).then((function(e){t.$Spin.hide(),t.render_view()})).catch((function(e){console.log(e),t.$Spin.hide()}))}}),x=(n(191),n(24)),component=Object(x.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"content"},[t._m(0),t._v(" "),n("div",{staticClass:"level"},[n("div",{staticClass:"title"},[t._v("B站用户等级分布")]),t._v(" "),n("div",{staticClass:"level-chart"},t._l(t.levelData,(function(e,o){return n("div",{staticClass:"circle-wrap"},[n("div",{staticClass:"level-title"},[t._v("Level "+t._s(o))]),t._v(" "),n("div",{staticClass:"level-score",attrs:{id:"level_"+o}},[t._v(t._s(e.score))]),t._v(" "),n("span",[t._v("%")])])})),0)])]),t._v(" "),n("div",{staticClass:"footer"},[n("div",[t._v("有效样本数据："+t._s(t.info.sample)+"，截止日期："+t._s(t._f("date_filter")(t.info.date)))]),t._v(" "),n("div",[t._v("Author: Terence.Sun 禁止商业使用")])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"line"},[e("div",{staticClass:"birthday"},[e("div",{staticClass:"title"},[this._v("B站用户生日分布")]),this._v(" "),e("div",{staticClass:"chart"},[e("div",{attrs:{id:"birthday"}})])]),this._v(" "),e("div",{staticClass:"sex"},[e("div",{staticClass:"title"},[this._v("B站用户性别分布")]),this._v(" "),e("div",{staticClass:"chart"},[e("div",{attrs:{id:"sex"}})])])])}],!1,null,"3677ad56",null);e.default=component.exports}}]);