import Vue from 'vue'
import { Button , Select } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)
Vue.use(Select)
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 } // 有尺寸的组件默认尺寸为 small, zIndex为3000