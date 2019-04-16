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
      <TimeSelect
        :times="freeTimes"
        @onTimeChange="onTimeChange($event)"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import Api from "@/api/backend"
import { dateLocalISO, formatDateISO } from "@/utils"
import TimeSelect from "@/components/TimeSelect.vue"

export default {
  components: { TimeSelect },
  props: {
    filial: { type: String, default: "" }
  },
  data () {
    return {
      date: "",
      daysInfo: [],
      months: {},
      freeTimes: []
    }
  },
  computed: {},
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
