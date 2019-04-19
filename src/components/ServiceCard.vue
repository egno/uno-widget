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
        v-else
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
import { mapGetters, mapActions } from "vuex"

export default {
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
        this.services.some(
          x => x.service.id === this.service.service.id
        )
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
    ...mapActions(["addService", "delService"]),
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
    onAdd () {
      this.addService(this.service)
    },
    onRemove () {
      this.delService(this.service)
    }
  }
}
</script>
