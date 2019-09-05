import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import app from './modules/app'
const Store = new Vuex.Store(app)
export default Store
