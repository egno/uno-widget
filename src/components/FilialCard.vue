<template>
  <v-card
    dark
    ma-3
    flat
    class="rounded filial-card card-item"
    :style="style"
  >
    <v-card-title>
      <v-layout column>
        <v-flex class="filial-card__name">
          {{ filialName }}
        </v-flex>
        <v-flex class="filial-card__address">
          {{ filialFullAddress }}
        </v-flex>
        <div class="filial-card__employees">
          {{ filialEmployees }}
        </div>
      </v-layout>
    </v-card-title>
    <ButtonToolbar @click="selectFilial()">
      <v-layout column>
        <v-flex py-0>
          <span class="body-1">Выбрать</span>
        </v-flex>
      </v-layout>
    </ButtonToolbar>
  </v-card>
</template>

<script>
import ButtonToolbar from "@/components/ButtonToolbar.vue"
// import TileTimeSelector from "@/components/TileTimeSelector.vue"
import {
  filialFullAddress,
  filialEmployees,
  filialName
} from "@/components/filialUtils"
import { uuidToColor } from "@/utils"
import {
  displayRESTDate,
  displayRESTTime,
  employeeDisplay
} from "@/utils"
import { mapActions } from "vuex"

export default {
  components: {
    ButtonToolbar,
    /*TileTimeSelector*/
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
  },
  mounted () {
  },
  methods: {
    ...mapActions(["setDate", "setStep"]),
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
.title-second-row {
  padding-top: 2px !important;
}
.filial-card__name {
  font: 700 18px 'Lato', sans-serif;
  color: #FFFFFF;
}
.filial-card__address {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}
.filial-card__employees {
  width: 115px;
  margin-top: 18px;
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}
</style>
