<template>
  <v-card ma-3>
    <v-card-title>
      <v-layout column>
        <v-flex>
          {{ filialName }}
        </v-flex>
        <v-flex>
          {{ filialFullAddress }}
        </v-flex>
        <v-flex>
          {{ filialEmployees }}
        </v-flex>
        <v-flex>
          <v-layout row>
            <v-flex>
              <v-layout column>
                <v-flex>
                  Ближайшее свободное время
                </v-flex>
                <v-flex v-if="firstFreeTimestamp">
                  {{ firstFreeDate }}
                  {{ firstFreeTime }}
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-btn @click="selectFilial()">
                Выбрать
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-title>
  </v-card>
</template>

<script>
import {
  filialFullAddress,
  filialEmployees,
  filialName
} from "@/components/filialUtils"
import {
  timestampLocalISO,
  displayRESTDate,
  displayRESTTime,
  employeeDisplay
} from "@/utils"
import Api from "@/api/backend"

export default {
  props: {
    filial: {
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
    filialFullAddress () {
      return filialFullAddress(this.filial)
    },
    filialEmployees () {
      return employeeDisplay(filialEmployees(this.filial))
    },
    filialName () {
      return filialName(this.filial)
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
    }
  },
  watch: {
    filial: "loadFreeTime"
  },
  mounted () {
    this.loadFreeTime()
  },
  methods: {
    loadFreeTime () {
      if (!this.filial.id) return
      Api()
        .post(`rpc/free_time_first`, {
          dt: timestampLocalISO(),
          business_id: this.filial.id,
          days: 3
        })
        .then(res => {
          this.firstFreeTimestamp = res.data[0]["time_begin"]
        })
    },
    selectFilial () {
      this.$emit("onSelectFilial", this.filial.id)
    }
  }
}
</script>
