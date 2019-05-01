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
        :class="{'mini-btn': mini}"
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
    },
    mini: {type: Boolean, default: false}
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

<style scoped>
  .mini-btn{
    height: 20px;
  }
</style>

