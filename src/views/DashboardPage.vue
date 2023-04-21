<script lang="ts" setup>
import HelloWorld from '../components/HelloWorld.vue'
const dataText = ['Data1', 'data2', 'data3']
</script>

<template>
  <div class="container-fluid">
    <div class="navbar py-3 px-4">Dashboard</div>
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <div class="static-public">Place static files into the <code>/public</code> folder</div>
  </div>
</template>
