# @anfo/vue-router-ts

typesafe vue-router api

## Usages

```ts
import { Nav } from '@anfo/vue-router-ts'


const pageANav = Nav<{fromB: string}>({
    name: 'A',
    path: '/a',
    component: () => import('/path/to/PageA.vue'),
})
const pageBNav = Nav<{fromA: string}>({
    name: 'B',
    path: '/b',
    component: () => import('/path/to/PageB.vue'),
})

export const router = 
  createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/',
        redirect: '/a',
        component: App,
        children: [pageA.route(), pageB.route()],
      },
    ],
  })

// toA
pageANav.use().to({fromB: 'hello A'})
pageBNav.use().to({fromA: 'hello B'})
```