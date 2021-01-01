<template>
  <div id="app">
    <Navbar :key="$route.fullPath + 1"/>
    <router-view :key="$route.fullPath">
    </router-view>
    <Modals/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Modals from './components/Modals.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Modals
  }
}
</script>
<style></style>