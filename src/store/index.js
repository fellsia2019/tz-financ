import Vue from 'vue'
import Vuex from 'vuex'
import financ from './modules/financ'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    financ
  }
})
