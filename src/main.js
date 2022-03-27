import Vue from 'vue' //引入vue
import App from './App.vue' //引入主组件
import {
  Checkbox,
  message,
  MessageBox,
} from 'element-ui' //按需引入element
import "./assets/css/common.css"
import "./assets/css/element.css"
import 'font-awesome/css/font-awesome.min.css' //引入font-awesom
Vue.component("el-checkbox", Checkbox)

Vue.config.productionTip = false //取消生产消息提示
new Vue({
  render: h => h(App), //动态创建html标签 <app></app>
  beforeCreate() { //安装全局总线
    Vue.prototype.$bus = this;
    Vue.prototype.$message = message;
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$alert = MessageBox.alert

  }
}).$mount('#app') //挂载app 相当于el:#app