<template>
  <v-card>
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
          {{ firstFreeDate }}
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
import { numberText } from "@/utils"
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
      firstFreeDate: undefined
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
      const dt = new Date()
      const isoDate = dt.toISOString()
      Api()
        .post(`rpc/free_time_first`, {
          dt: isoDate,
          business_id: this.filial.id
        })
        .then(res => {
          this.firstFreeDate = res.data[0]["time_begin"]
        })
    }
  }
}
</script>
