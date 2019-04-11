<template>
  <v-card>
    <EmployeeMiniCard
      :employee="employee"
      :filial="filial"
    />
    <v-card-title>
      <v-layout column>
        <v-flex>
          Ближайшая запись {{ firstFreeDate }}
        </v-flex>
        <v-flex>
          <v-layout row>
            <v-flex
              v-for="time in displayFreeTimes"
              :key="time"
            >
              {{ time }}
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-btn
        v-if="selected"
        flat
        icon
        color="green"
      >
        <v-icon>check</v-icon>
      </v-btn>
      <v-btn
        v-else
        flat
        icon
        color="blue"
        @click="onSelectEmployee"
      >
        <v-icon>arrow_forward</v-icon>
      </v-btn>
    </v-card-title>
  </v-card>
</template>

<script>
import Api from "@/api/backend"
import { displayRESTDate, displayRESTTime, timestampLocalISO } from "@/utils"
import EmployeeMiniCard from "@/components/EmployeeMiniCard.vue"

export default {
  components: { EmployeeMiniCard },
  props: {
    employee: {
      type: Object,
      default () {
        return {}
      }
    },
    filial: { type: String, default: "" },
    service: {
      type: Array,
      default () {
        return []
      }
    },
    duration: { type: Number, default: undefined },
    selected: { type: Boolean, default: false }
  },
  data () {
    return {
      freeTimes: []
    }
  },
  computed: {
    filteredTimes () {
      return [...new Set(this.freeTimes.map(x => x.time.begin))]
        .sort()
        .slice(0, 3)
    },
    firstFreeDate () {
      return this.filteredTimes[0] && displayRESTDate(this.filteredTimes[0])
    },
    displayFreeTimes () {
      return this.filteredTimes
        .filter(x => displayRESTDate(x) === this.firstFreeDate)
        .map(x => displayRESTTime(x))
    }
  },
  watch: {
    filial: "loadFreeTime",
    employee: "loadFreeTime"
  },
  mounted () {
    this.loadFreeTime()
  },
  methods: {
    loadFreeTime () {
      if (!(this.filial && this.employee && this.employee.id)) return
      let params = {
        dt: timestampLocalISO(),
        business_id: this.filial,
        employee_id: this.employee.id,
        days: 3
      }
      if (this.duration) {
        params.duration = this.duration
      }
      Api()
        .post(`rpc/free_times`, params)
        .then(res => {
          this.freeTimes = res.data
        })
    },
    onSelectEmployee () {
      this.$emit("onSelectEmployee", this.employee)
    }
  }
}
</script>
