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
        <v-flex v-if="firstFreeTimestamp">
          <v-layout row>
            <v-flex>
              <v-layout column>
                <v-flex>
                  Ближайшее свободное время
                </v-flex>
                <v-flex>
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
  dateISOInLocalTimeZone,
  displayRESTDate,
  displayRESTTime,
  numberText
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
      const masterForms = ["мастер", "мастера", "мастеров", "Нет мастеров"]
      return numberText(filialEmployees(this.filial), masterForms)
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
      const diff = 30 // текущее время + 30 минут
      let dt = new Date()
      dt = new Date(dt.getTime() + diff * 60000)
      const isoDate = dateISOInLocalTimeZone(dt)
      Api()
        .post(`rpc/free_time_first`, {
          dt: isoDate,
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
