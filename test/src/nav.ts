import { Nav } from '@anfo/vue-router-ts'

export const homeNav = new Nav<{
  name: string
}>({
  name: 'home',
  path: '/home',
  component: () => import('./Home.vue'),
})

export const testNav = new Nav<{
  id: string
}>({
  name: 'test',
  path: '/test',
  component: () => import('./Test.vue'),
})
