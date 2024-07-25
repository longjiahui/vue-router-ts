<template>
  <div>hello {{ name }}</div>
  <button @click="n.go({ id: 'asdf' })">test page nav</button>
</template>

<script setup lang="ts">
import { homeNav, testNav } from './nav'
const n = testNav.use()
const name = homeNav.use().useP('name')
</script>
