<template>
  <v-card>
    <EmployeeMiniCard
      :employee="employee"
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
        @click="onUnselectEmployee"
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
import { mapActions, mapGetters } from "vuex"

export default {
  components: { EmployeeMiniCard },
  props: {
    employee: {
      type: Object,
      default () {
        return {
          id: ''
        }
      }
    }
  },
  data () {
    return {
      freeTimes: []
    }
  },
  computed: {
    ...mapGetters(['filialId','employeeId']),
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
    },
    selected () {
      return this.employee.id === this.employeeId
    }
  },
  watch: {
    filialId: "loadFreeTime",
    employee: "loadFreeTime"
  },
  mounted () {
    this.loadFreeTime()
  },
  methods: {
    ...mapActions(['setEmployee','setStep']),
    loadFreeTime () {
      if (!(this.filialId && this.employee)) return
      let params = {
        dt: timestampLocalISO(),
        business_id: this.filialId,
        days: 3
      }
      if (this.employee.id) {
        params.employee_id = this.employee.id
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
      this.setEmployee(this.employee)
      this.setStep("main")
    },
    onUnselectEmployee () {
      this.setEmployee({})
    }
  }
}
</script>
