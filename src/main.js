import Vue from 'vue' //引入vue
import App from './App.vue' //引入主组件
import "./assets/css/common.css"
import 'font-awesome/css/font-awesome.min.css' //引入font-awesom

Vue.config.productionTip = false  //取消生产消息提示
new Vue({

  render: h => h(App),  //动态创建html标签 <app></app>
  beforeCreate(){       //安装全局总线
      Vue.prototype.$bus=this
  }
}).$mount('#app')       //挂载app 相当于el:#app
