<template>
  <v-card>
    <v-card-text>
      <v-layout column>
        <v-flex>
          {{ serviceName }}
        </v-flex>
        <v-flex>
          <v-layout row>
            <v-flex>
              {{ duration }}
            </v-flex>
            <v-flex>
              {{ price }}
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex>
          {{ employeeDisplay }}
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-toolbar flat>
      <v-layout column>
        <v-flex>
          Ближайшее свободное время
        </v-flex>
        <v-flex>
          {{ firstFreeDate }}
          {{ firstFreeTime }}
        </v-flex>
      </v-layout>
      <v-btn
        v-if="selected"
        flat
        icon
        color="green"
        @click="onRemove"
      >
        <v-icon>check</v-icon>
      </v-btn>
      <v-btn
        v-if="!selected"
        flat
        icon
        @click="onAdd"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
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

export default {
  props: {
    employee: { type: String, default: "" },
    filial: { type: String, default: "" },
    service: {
      type: Object,
      default () {
        return {}
      }
    },
    selected: { type: Boolean, default: false }
  },
  data () {
    return {
      firstFreeTimestamp: undefined
    }
  },
  computed: {
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
    loadFreeTime () {
      if (!(this.filial && this.service)) return
      let params = {
        dt: timestampLocalISO(),
        business_id: this.filial,
        service: this.service.service.id,
        days: 3
      }
      if (this.employee) {
        params.employee_id = this.employee
      }
      Api()
        .post(`rpc/free_time_first`, params)
        .then(res => {
          this.firstFreeTimestamp = res.data[0]["time_begin"]
        })
    },
    onAdd () {
      this.$emit("addService", this.service.service.id)
    },
    onRemove () {
      this.$emit("delService", this.service.service.id)
    }
  }
}
</script>
