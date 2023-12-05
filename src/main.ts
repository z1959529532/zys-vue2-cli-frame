import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 全局css引入
import '@/assets/css/z-style.less';

// 使用element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 使用ant-design-vue
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';
// Vue.use(Antd)

// ts代码不识别的声明
import Declare from './declare'
// 所有全局指令
// import './directives/allDirectives'
import Directives from './directives/allDirectives'
Vue.use(Directives)
// 所有全局属性
import './prototypes/allPrototypes'

// @ts-ignore
import allApi from '@/api/allRequest';  //导入api接口
Vue.prototype.$allApi = allApi;  //将api挂载到vue的原型上

// @ts-ignore
import eChartsFn from '@/components/chart/index.js'
import ChartPanel from '@/components/chart/index.vue'
Vue.component(ChartPanel.name, ChartPanel)
Vue.prototype.$eChartsFn = eChartsFn

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// 11.15
// yarn add rimraf -D 自动清除.cache文件
// yarn add thread-loader -D  开启多线程,改善构建速度

// 11.18
// yarn add echarts

// 创建项目
// 代码规范 eslint
// 提交规范 git hooks

