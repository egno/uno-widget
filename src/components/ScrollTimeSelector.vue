<template>
  <v-layout row>
    <v-flex
      xs6
      offset-xs3
    >
      <v-layout column>
        <v-flex>
          <v-btn
            flat
            round
            block
            :disabled="!position"
            @click.prevent="slidePrevAvailable"
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
            @afterSlide="onSlide"
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
            :disabled="count - position == 1"
            @click.prevent="slideNextAvailable"
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
import { mapGetters, mapActions } from "vuex"

export default {
  components: { Hooper, Slide },
  props: {
    part: { type: Number, default: 2 },
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
      selected: undefined,
      hours: 24,
      minutes: 60,
      duration: 15,
      position: 0
    }
  },
  computed: {
    ...mapGetters(["time"]),
    allTimes () {
      return Array.from(Array(this.count)).map((x, i) => ({
        time: this.formatTime(i),
        enabled: this.times.some(x => x === this.formatTime(i))
      }))
    },
    timesCurrent () {
      return this.allTimes.filter
    },
    count () {
      return (this.hours * this.minutes) / this.duration
    }
  },
  watch: {
    part: function (newVal, oldVal) {
      if (newVal === oldVal) return
      this.scrollToPart(newVal)
    },
    time: function (newVal) {
      this.selected = newVal
    },
    position: function (newVal) {
      this.$refs.timeslider.slideTo(newVal)
    }
  },
  mounted () {
    this.selected = this.time
    this.scrollToPart(this.part)
  },
  methods: {
    ...mapActions(["setTime"]),
    format (x) {
      return ("0" + x).substr(-2)
    },
    formatTime (i) {
      return `${this.format(
        ~~(i / (this.minutes / this.duration))
      )}:${this.format((i % (this.minutes / this.duration)) * this.duration)}`
    },
    onTimeChange (payload) {
      this.setTime(payload)
    },
    onSlide (payload) {
      this.position = payload.currentSlide
    },
    scrollToPart (part) {
      if (!(this.part && this.$refs && this.$refs.timeslider)) return
      this.position =
        (+part - 1) * ((this.hours / 4) * (this.minutes / this.duration))
    },
    slideNext () {
      this.position = (this.position + 1) % this.count
    },
    slideNextAvailable () {
      if (this.count - this.position == 1) return
      const scroll = this.allTimes
        .slice(this.position + 1, this.count)
        .findIndex(x => x.enabled)
      if (scroll > -1) {
        this.position = this.position + scroll + 1
      }
    },
    slidePrev () {
      this.position = (this.position + this.count - 1) % this.count
    },
    slidePrevAvailable () {
      if (this.count - this.position == 1) return
      const scroll = this.allTimes
        .slice(0, this.position)
        .reverse()
        .findIndex(x => x.enabled)
      if (scroll > -1) {
        this.position = this.position - scroll - 1
      }
    }
  }
}
</script>
