// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import VueRouter from 'vue-router'
import Vresource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/common.css'
import '../static/js/jquery-1.8.0.js'
Vue.config.productionTip = false
Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });
Vue.use(VueRouter);
Vue.use(Vresource);
Vue.prototype.HOST = '/api';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})
