<template>
  <v-layout row>
    <v-flex v-if="date" xs6>
      <div>{{ date }}</div>
    </v-flex>
    <v-flex v-if="time" xs6>
      <div>{{ time }}</div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters(['date', 'time'])
  },
  methods: {
//
  }
}
</script>
