<template>
  <v-card
    flat
    class="rounded card-item"
  >
    <EmployeeMiniCard :employee="employee" />
    <ButtonToolbar
      :color="(selected) ? 'green': 'primary'"
      :icon="(selected) ? 'check': 'arrow_forward'"
      @click="onSelectEmployee"
    >
      <v-layout column>
        Выбрать
        <!--<v-flex py-0>
          <span class="body-1">Ближайшая запись {{ firstFreeDate }}</span>
        </v-flex>
        <v-flex
          py-0
          class="body-1"
        >
          <TileTimeSelector
            :times="displayFreeTimes"
            mini
            @click="onSelectTime"
          />
        </v-flex>-->
      </v-layout>
    </ButtonToolbar>
  </v-card>
</template>

<script>
import Api from "@/api/backend"
import { displayRESTDate, displayRESTTime, timestampLocalISO } from "@/utils"
import EmployeeMiniCard from "@/components/EmployeeMiniCard.vue"
import ButtonToolbar from "@/components/ButtonToolbar.vue"
import TileTimeSelector from "@/components/TileTimeSelector.vue"
import { mapActions, mapGetters } from "vuex"

export default {
  components: { ButtonToolbar, EmployeeMiniCard, TileTimeSelector },
  props: {
    employee: {
      type: Object,
      default () {
        return {
          id: ""
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
    ...mapGetters(["filialId", "employeeId"]),
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
    ...mapActions(["setEmployee", "setStep", "setDate"]),
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
      if (this.selected) {
        this.setEmployee({})
      } else {
        this.setEmployee(this.employee)
        this.setStep("main")
      }
    },
    onSelectTime () {
      this.setDate(this.filteredTimes[0])
      this.onSelectEmployee()
    }
  }
}
</script>
