import Vue from 'vue'
import { Button , Select , Row , Input , Form , FormItem} from 'element-ui'
import './element-variables.scss'

Vue.use(Button)
Vue.use(Select)
Vue.use(Row)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 } // 有尺寸的组件默认尺寸为 small, zIndex为3000