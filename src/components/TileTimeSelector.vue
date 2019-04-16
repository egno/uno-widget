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
    onTimeChange (payload) {
      this.$emit("onTimeChange", payload)
    }
  }
}
</script>
