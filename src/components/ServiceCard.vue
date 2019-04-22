<template>
  <v-card
    flat
    class="round"
  >
    <v-card-text>
      <v-layout column>
        <v-flex>
          {{ serviceName }}
        </v-flex>
        <v-flex>
          <v-layout row>
            <v-flex xs-6>
              <DurationDisplay :value="+duration" />
            </v-flex>
            <v-flex xs-6>
              <PriceDisplay
                :value="+price"
                prefix="от"
              />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex>
          {{ employeeDisplay }}
        </v-flex>
      </v-layout>
    </v-card-text>
    <ButtonToolbar
      :color="(selected) ? 'green': 'primary'"
      :icon="(selected) ? 'check': 'add'"
      @click="onToolButtonClick"
    >
      <v-layout column>
        <v-flex py-0>
          <span class="body-1">Ближайшее свободное время</span>
        </v-flex>
        <v-flex py-0>
          <v-layout row>
            <v-flex class="body-1">
              {{ firstFreeDate }}
            </v-flex>
            <v-flex class="body-1">
              <TileTimeSelector :times="[firstFreeTime]" @click="onSelectTime" />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </ButtonToolbar>
  </v-card>
</template>

<script>
import Api from "@/api/backend"
import {
  displayRESTDate,
  displayRESTTime,
  employeeDisplay,
  timestampLocalISO
} from "@/utils"
import ButtonToolbar from "@/components/ButtonToolbar.vue"
import DurationDisplay from "@/components/DurationDisplay.vue"
import PriceDisplay from "@/components/PriceDisplay.vue"
import TileTimeSelector from "@/components/TileTimeSelector.vue"
import { mapGetters, mapActions } from "vuex"

export default {
  components: {
    ButtonToolbar,
    DurationDisplay,
    PriceDisplay,
    TileTimeSelector
  },
  props: {
    service: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      firstFreeTimestamp: undefined
    }
  },
  computed: {
    ...mapGetters(["filialId", "services"]),
    duration () {
      return this.service.service.duration
    },
    employeeCount () {
      return this.service.service.employees.length
    },
    employeeDisplay () {
      return employeeDisplay(this.employeeCount)
    },
    firstFreeDate () {
      return (
        this.firstFreeTimestamp && displayRESTDate(this.firstFreeTimestamp)
      )
    },
    firstFreeTime () {
      return (
        this.firstFreeTimestamp && displayRESTTime(this.firstFreeTimestamp)
      )
    },
    price () {
      return this.service.service.price
    },
    selected () {
      return (
        this.service &&
        this.service.service &&
        this.services &&
        this.services.some(x => x.service.id === this.service.service.id)
      )
    },
    serviceName () {
      return this.service.service.name
    }
  },
  watch: {
    filial: "loadFreeTime",
    service: "loadFreeTime"
  },
  mounted () {
    this.loadFreeTime()
  },
  methods: {
    ...mapActions(["addService", "delService", "setDate", "setStep"]),
    loadFreeTime () {
      if (!(this.filialId && this.service)) return
      let params = {
        dt: timestampLocalISO(),
        business_id: this.filialId,
        service: this.service.service.id,
        days: 3
      }
      if (this.employee && this.employee.id) {
        params.employee_id = this.employee.id
      }
      Api()
        .post(`rpc/free_time_first`, params)
        .then(res => {
          this.firstFreeTimestamp = res.data[0]["time_begin"]
        })
    },
    onToolButtonClick () {
      if (this.selected) {
        this.delService(this.service)
      } else {
        this.addService(this.service)
      }
    },
    onSelectTime () {
      this.setDate(this.firstFreeTimestamp)
      this.addService(this.service)
      this.setStep("main")
    }
  }
}
</script>
