<template>
  <v-app>
    <v-content>
      <VisitWidget />
    </v-content>
  </v-app>
</template>

<script>
import VisitWidget from './components/VisitWidget.vue'

export default {
  name: 'App',
  components: {
    VisitWidget
  },
  data () {
    return {
      //
    }
  }
}
</script>
