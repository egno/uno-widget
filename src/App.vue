<template>
  <div id="app">
    <VisitWidget />
  </div>
</template>

<script>
import VisitWidget from './components/VisitWidget.vue'

export default {
  name: 'app',
  components: {
    VisitWidget
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
