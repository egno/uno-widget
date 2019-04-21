<template>
  <v-card dark ma-3 flat class="rounded"
          color="#778ddf"
  >
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
      </v-layout>
    </v-card-title>
    <ButtonToolbar @click="selectFilial()">
      <v-layout column class="compact">
        <v-flex py-0>
          <span class="body-1">Ближайшее свободное время</span>
        </v-flex>
        <v-flex v-if="firstFreeTimestamp" py-0>
          <span class="body-2">
            {{ firstFreeDate }}
            {{ firstFreeTime }}
          </span>
        </v-flex>
      </v-layout>
    </ButtonToolbar>
  </v-card>
</template>

<script>
import ButtonToolbar from "@/components/ButtonToolbar.vue"
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
  components: {
    ButtonToolbar
  },
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

<style scoped>
  .rounded {
    border-radius: 30px;
  }
  .rounded .v-card__title {
      padding-left: 24px;
  }
</style>
