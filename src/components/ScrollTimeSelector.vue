<template>
  <v-layout column>
    <v-flex>
      <v-btn
        flat
        round
        block
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-flex>

    <v-flex
      v-for="(time, n) in allTimes"
      :key="n"
      xs3
      py-0
    >
      <v-btn
        flat
        round
        block
        :disabled="!time.enabled"
        @click="onTimeChange(time)"
      >
        {{ time.time }}
      </v-btn>
    </v-flex>
    <v-flex>
      <v-btn
        flat
        round
        block
      >
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { Hooper, Slide } from "hooper"
import "hooper/dist/hooper.css"

export default {
  components: { Hooper, Slide },
  props: {
    times: {
      type: Array,
      default () {
        return {
          //
        }
      }
    }
  },
  data () {
    return {
      selected: undefined
    }
  },
  computed: {
    allTimes () {
      const hours = 24
      const minutes = 60
      const duration = 15
      function format (x) {
        return ("0" + x).substr(-2)
      }
      function time (i) {
        return `${format(~~(i / (minutes / duration)))}:${format(
          (i % (minutes / duration)) * duration
        )}`
      }
      return Array.from(Array((hours * minutes) / duration)).map((x, i) => ({
        time: time(i),
        enabled: this.times.some(x => x === time(i))
      }))
    },
    timesCurrent () {
      return this.allTimes.filter
    }
  },
  methods: {
    onTimeChange (payload) {
      this.$emit("onTimeChange", payload)
    }
  }
}
</script>
