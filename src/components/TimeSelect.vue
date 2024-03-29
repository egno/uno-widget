<template>
  <v-layout column>
    <v-layout justify-center class="select-time__header">
      <v-btn-toggle v-model="timeOfDay">
        <v-btn
          v-for="t in timesOfDay"
          :key="t.value"
          :value="t.value"
          flat
          round
        >
          {{ t.display }}
        </v-btn>
      </v-btn-toggle>
    </v-layout>
    <v-flex class="select-time__text">
      Выберите подходящее время из доступных
    </v-flex>
    <v-flex>
      <v-switch
        v-model="timeSelectorView"
        label="Отобразить списком"
      />
    </v-flex>
    <template v-if="progress">
      <div class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </div>
    </template>
    <template v-else>
      <v-flex v-if="timeSelectorView">
        <TileTimeSelector :times="availableFreeTimesInDayPart" />
      </v-flex>
      <v-flex v-else>
        <ScrollTimeSelector
          :times="availableFreeTimes"
          :part="+timeOfDay"
          @onTimeChange="onTimeChange($event)"
        />
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import { displayRESTTime, timestampLocalISO } from "@/utils"
import TileTimeSelector from "@/components/TileTimeSelector.vue"
import ScrollTimeSelector from "@/components/ScrollTimeSelector.vue"
import { mapActions, mapGetters } from "vuex"

export default {
  components: { ScrollTimeSelector, TileTimeSelector },
  props: {
    times: {
      type: Array,
      default () {
        return []
      }
    },
    progress: { type: Boolean, default: false }
  },
  data () {
    return {
      timeOfDay: 2,
      timesOfDay: [
        { display: "Утро", value: 2 },
        { display: "День", value: 3 },
        { display: "Вечер", value: 4 },
        { display: "Ночь", value: 1 }
      ]
    }
  },
  computed: {
    ...mapGetters(["time", "timeSelector"]),
    availableFreeTimes () {
      const today = timestampLocalISO()
      return (
        this.times && [
          ...new Set(
            this.times
              .filter(x => x.time.begin >= today)
              .map(x => displayRESTTime(x.time.begin))
          )
        ]
      )
    },
    availableFreeTimesInDayPart () {
      return this.availableFreeTimes.filter(
        x => !this.timeOfDay || this.dayPart(x) == this.timeOfDay
      )
    },
    timeSelectorView: {
      get () {
        return !!this.timeSelector
      },
      set (val) {
        if (val !== undefined) {
          this.setTimeSelector(val)
        }
      }
    }
  },
  watch: {
    times: "init",
    listMode: "init"
  },
  methods: {
    ...mapActions(["setTime", "setTimeSelector", "setStep"]),
    dayPart (tsISO) {
      const defaultTime = "09:00"
      const time = tsISO || this.time || defaultTime
      const hours = time.length === 5 ? time.slice(0, 2) : time.slice(11, 13)
      return ~~(+hours / 6) + 1
    },
    init () {
      this.timeOfDay = this.timeOfDay || this.dayPart()
      this.timeSelectorView = this.listMode
    },
    onTimeChange (payload) {
      this.setTime(payload)
      this.setStep("main")
    },
    onTimeSelectorChange () {
      this.setTimeSelector()
    }
  }
}
</script>

<style scoped>
  .select-time__header {
    margin: 24px 0;
  }
  .select-time__text {
    text-align: center;
  }
</style>
