<template>
  <v-layout column>
    <v-flex>
      Выберите дату
    </v-flex>
    <v-flex>
      <v-date-picker
        v-model="date"
        locale="ru-RU"
        first-day-of-week="1"
        :allowed-dates="allowedDates"
        @input="onDateChange"
      />
    </v-flex>
    <v-flex v-if="date">
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
          <v-layout
            row
            wrap
          >
            <v-flex
              v-for="(time, n) in availableFreeTimes"
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
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Api from "@/api/backend"
import {
  dateLocalISO,
  displayRESTTime,
  formatDateISO,
  timestampLocalISO
} from "@/utils"

export default {
  props: {
    filial: { type: String, default: "" }
  },
  data () {
    return {
      date: "",
      daysInfo: [],
      months: {},
      freeTimes: [],
      timeOfDay: "",
      timesOfDay: [
        { display: "Утро", value: 2 },
        { display: "День", value: 3 },
        { display: "Вечер", value: 4 },
        { display: "Ночь", value: 1 }
      ]
    }
  },
  computed: {
    availableFreeTimes () {
      const today = timestampLocalISO()
      return (
        this.freeTimes && [
          ...new Set(
            this.freeTimes
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
    filial: "load"
  },
  mounted () {
    this.load()
  },
  methods: {
    allowedDates (dt) {
      if (!this.months[this.dtMonthStart(dt)]) {
        this.load(dt)
      }
      return (
        this.daysInfo &&
        this.daysInfo.some(x => x === dt) &&
        dt >= dateLocalISO()
      )
    },
    dayPart (tsISO) {
      return ~~(+tsISO.slice(11, 13) / 6) + 1
    },
    dtMonthStart (dt) {
      return (dt || dateLocalISO()).slice(0, 8) + "01"
    },
    dtMonthEnd (dt) {
      let d = new Date(this.dtMonthStart(dt))
      d.setMonth(d.getMonth() + 1)
      return formatDateISO(d)
    },
    load (dt) {
      if (!this.filial) return
      const date = this.dtMonthStart(dt)
      if (this.months[date] === "process") return
      this.months[date] = "process"
      Api()
        .get(
          `business_calendar?and=(business_id.eq.${
            this.filial
          },dt.gte.${date},dt.lt.${this.dtMonthEnd(date)})`
        )
        .then(res => {
          this.months[date] = "success"
          this.daysInfo = [...this.daysInfo, ...this.workingDays(res.data)]
        })
        .catch(() => {
          this.months[date] = "fail"
        })
    },
    loadFreeTimes () {
      if (!(this.filial && this.date)) return
      let params = {
        dt: this.date,
        business_id: this.filial
      }
      Api()
        .post("rpc/free_times", params)
        .then(res => {
          this.freeTimes = res.data
        })
    },
    onDateChange () {
      if (this.date) {
        this.timeOfDay = this.timeOfDay || 2
        this.loadFreeTimes()
      }
      this.$emit("onDateChange", this.date)
    },
    onTimeChange (payload) {
      this.$emit("onDateChange", `${this.date}T${payload}:00`)
    },
    workingDays (days) {
      return days
        .filter(
          x =>
            x.j &&
            x.j.schedule &&
            x.j.schedule.reduce((res, s) => res || !!s, false)
        )
        .map(x => x.dt)
    }
  }
}
</script>
