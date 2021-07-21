import Vue from 'vue'
import App from './App'

// Store
import store from './store'
// Style
import './assets/scss/main.scss'

Vue.config.productionTip = false

new Vue({
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
})
