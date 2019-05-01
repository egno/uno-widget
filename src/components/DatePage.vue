<template>
  <v-layout column>
    <v-flex>
      Выберите дату
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
      <v-flex>
        <v-date-picker
          v-model="selectedDate"
          locale="ru-RU"
          first-day-of-week="1"
          :allowed-dates="allowedDates"
        />
      </v-flex>
      <v-flex v-if="selectedDate">
        <TimeSelect
          :time="selectedTime"
          :times="freeTimes"
          :progress="progress1"
          @onTimeChange="onTimeChange($event)"
        />
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import Api from "@/api/backend"
import { dateLocalISO, formatDateISO } from "@/utils"
import TimeSelect from "@/components/TimeSelect.vue"
import { mapGetters, mapActions } from "vuex"

export default {
  components: { TimeSelect },
  props: {
    listMode: { type: Boolean, default: false }
  },
  data () {
    return {
      selectedDate: "",
      daysInfo: [],
      months: {},
      freeTimes: [],
      progress: false,
      progress1: false
    }
  },
  computed: {
    ...mapGetters(["date", "filial", "employeeId", "duration"]),
    selectedTime () {
      return this.date && this.date.slice(11, 16)
    }
  },
  watch: {
    filial: "load",
    date: "load",
    selectedDate: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.onDateChange()
      }
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    ...mapActions(["setDate"]),
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
      this.selectedDate = this.date.slice(0, 10)
      if (!(this.filial && this.filial.id)) return
      const date = this.dtMonthStart(dt)
      if (this.months[date] === "process") return
      if (this.months[date] === "success") return
      this.months[date] = "process"
      let params = [
        `business_id.eq.${this.filial.id}`,
        `dt.gte.${date}`,
        `dt.lt.${this.dtMonthEnd(date)}`
      ]
      this.progress = true
      Api()
        .get(`business_calendar?and=(${params.join(",")})`)
        .then(res => {
          this.months[date] = "success"
          this.daysInfo = [...this.daysInfo, ...this.workingDays(res.data)]
        })
        .catch(() => {
          this.months[date] = "fail"
        })
        .finally(() => {
          this.progress = false
        })
    },
    loadFreeTimes () {
      if (!(this.filial && this.selectedDate)) return
      let params = {
        dt: this.selectedDate,
        business_id: this.filial.id
      }
      if (this.employeeId) {
        params.employee_id = this.employeeId
      }
      if (this.duration) {
        params.duration = this.duration
      }
      this.progress1 = true
      Api()
        .post("rpc/free_times", params)
        .then(res => {
          this.freeTimes = res.data
        })
        .finally(() => {
          this.progress1 = false
        })
    },
    onDateChange () {
      if (this.selectedDate) {
        this.loadFreeTimes()
      }
      this.setDate(this.selectedDate)
    },
    onTimeChange (payload) {
      this.$emit("onDateChange", `${this.selectedDate}T${payload}:00`)
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
