import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { testNav, homeNav } from './nav'

const app = createApp(App)
app.use(
  createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/',
        redirect: '/home',
        component: App,
        children: [homeNav.route(), testNav.route()],
      },
    ],
  })
)
console.debug(homeNav.route())
app.mount('#app')
