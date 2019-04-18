<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <v-layout column>
        <v-flex>
          <v-btn
            flat
            round
            block
            @click.prevent="slidePrev"
          >
            <v-icon>keyboard_arrow_up</v-icon>
          </v-btn>
        </v-flex>

        <v-flex>
          <hooper
            ref="timeslider"
            vertical
            style="height: 180px"
            :items-to-show="3"
            center-mode
            :transition="100"
          >
            <slide
              v-for="(t, n) in allTimes"
              :key="n"
            >
              <v-btn
                depressed
                :flat="!t.enabled"
                round
                block
                large
                :disabled="!t.enabled"
                style="height: 54px"
                @click="setTime(t.time)"
              >
                <div class="title">
                  {{ t.time }}
                </div>
              </v-btn>
            </slide>
          </hooper>
        </v-flex>
        <v-flex>
          <v-btn
            flat
            round
            block
            @click.prevent="slideNext"
          >
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { Hooper, Slide } from "hooper"
import "hooper/dist/hooper.css"
import { mapGetters, mapActions} from "vuex"

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
    ...mapGetters(['time']),
    allTimes () {
      const hours = 24
      const minutes = 60
      const duration = 15
      function format (x) {
        return ("0" + x).substr(-2)
      }
      function formatTime (i) {
        return `${format(~~(i / (minutes / duration)))}:${format(
          (i % (minutes / duration)) * duration
        )}`
      }
      return Array.from(Array((hours * minutes) / duration)).map((x, i) => ({
        time: formatTime(i),
        enabled: this.times.some(x => x === formatTime(i))
      }))
    },
    timesCurrent () {
      return this.allTimes.filter
    }
  },
  watch:{
    time: function (newVal) {
      this.selected = newVal
    }
  },
  mounted () {
    this.selected = this.time
  },
  methods: {
    ...mapActions(['setTime']),
    onTimeChange (payload) {
      this.setTime(payload)
    },
    slideNext () {
      this.$refs.timeslider.slideNext()
    },
    slidePrev () {
      this.$refs.timeslider.slidePrev()
    }
  }
}
</script>
