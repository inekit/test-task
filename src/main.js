import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import BootstrapVue from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

createApp(App).use(store).use(BootstrapVue).mount('#app')
