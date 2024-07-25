<template>
  <div>Test Page id: {{ id }}</div>
  <button @click="homeN.go({ name: 'anfo' })">Go Home</button>
</template>
<script setup lang="ts">
import { homeNav, testNav } from './nav'

const testN = testNav.use()
const homeN = homeNav.use()
const id = testN.useP('id')
</script>
