<template>
  <v-card
    dark
    ma-3
    flat
    class="rounded"
    :style="style"
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
      <v-layout
        column
      >
        <v-flex py-0>
          <span class="body-1">Ближайшее свободное время</span>
        </v-flex>
        <v-flex
          v-show="firstFreeTimestamp"
          py-0
        >
          <v-layout row>
            <v-flex
              py-0
              class="body-1"
            >
              <span>{{ firstFreeDate }}</span>
            </v-flex>
            <v-flex
              py-0
              class="body-1"
            >
              <TileTimeSelector
                :times="[firstFreeTime]"
                @click="onSelectTime"
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </ButtonToolbar>
  </v-card>
</template>

<script>
import ButtonToolbar from "@/components/ButtonToolbar.vue"
import TileTimeSelector from "@/components/TileTimeSelector.vue"
import {
  filialFullAddress,
  filialEmployees,
  filialName
} from "@/components/filialUtils"
import { uuidToColor } from "@/utils"
import {
  timestampLocalISO,
  displayRESTDate,
  displayRESTTime,
  employeeDisplay
} from "@/utils"
import Api from "@/api/backend"
import { mapActions } from "vuex"

export default {
  components: {
    ButtonToolbar,
    TileTimeSelector
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
    style () {
      const color = uuidToColor(this.filial.id)
      return `background: linear-gradient(90deg, ${color[0]}, ${color[1]})`
    },
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
    ...mapActions(["setDate", "setStep"]),
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
    onSelectTime () {
      this.setDate(this.firstFreeTimestamp)
      this.setStep("main")
    },
    selectFilial () {
      this.$emit("onSelectFilial", this.filial.id)
    }
  }
}
</script>

<style scoped>
</style>
