<template>
  <v-layout column>
    <v-flex>
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
    </v-flex>
    <v-flex>
      Выберите подходящее время
    </v-flex>
    <v-flex>
      <v-switch
        v-model="timeSelectorView"
        label="Отобразить списком"
      />
    </v-flex>
    <v-flex v-if="timeSelectorView">
      <TileTimeSelector
        :time="time"
        :times="availableFreeTimes"
        @onTimeChange="onTimeChange($event)"
      />
    </v-flex>
    <v-flex v-else>
      <ScrollTimeSelector
        :times="availableFreeTimes"
        @onTimeChange="onTimeChange($event)"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { displayRESTTime, timestampLocalISO } from "@/utils"
import TileTimeSelector from "@/components/TileTimeSelector.vue"
import ScrollTimeSelector from "@/components/ScrollTimeSelector.vue"

export default {
  components: { ScrollTimeSelector, TileTimeSelector },
  props: {
    time: { type: String, default: "" },
    times: {
      type: Array,
      default () {
        return []
      }
    },
    listMode: {type: Boolean, default: false}
  },
  data () {
    return {
      timeOfDay: "",
      timesOfDay: [
        { display: "Утро", value: 2 },
        { display: "День", value: 3 },
        { display: "Вечер", value: 4 },
        { display: "Ночь", value: 1 }
      ],
      timeSelectorView: false
    }
  },
  computed: {
    availableFreeTimes () {
      const today = timestampLocalISO()
      return (
        this.times && [
          ...new Set(
            this.times
              .filter(
                x =>
                  x.time.begin >= today &&
                  (!this.timeOfDay ||
                    this.dayPart(x.time.begin) == this.timeOfDay)
              )
              .map(x => displayRESTTime(x.time.begin))
          )
        ]
      )
    }
  },
  watch: {
    times: "init",
    listMode: "init"
  },
  methods: {
    dayPart (tsISO) {
      return ~~(+tsISO.slice(11, 13) / 6) + 1
    },
    init () {
      this.timeOfDay = this.timeOfDay || 2
      this.timeSelectorView = this.listMode
    },
    onTimeChange (payload) {
      this.$emit("onTimeChange", payload)
    }
  }
}
</script>
