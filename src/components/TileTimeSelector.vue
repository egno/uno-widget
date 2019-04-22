<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      v-for="(time, n) in times"
      :key="n"
      xs3
      py-0
    >
      <v-btn
        flat
        round
        small
        block
        @click="onTimeChange(time)"
      >
        {{ time }}
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex"

export default {
  props: {
    times: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    ...mapActions(["setTime", "setStep"]),
    onTimeChange (payload) {
      this.setTime(payload)
      this.setStep('main')
      this.$emit('click', payload)
    }
  }
}
</script>
