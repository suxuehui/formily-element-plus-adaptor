import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import Widgets from '@pg/widgets'
import 'element-plus/dist/index.css'
import './style.css'

createApp(App)
    .use(ElementPlus)
    .use(Widgets)
    .mount('#app')
