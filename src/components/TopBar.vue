<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <v-btn v-if="step">
          back
        </v-btn>
        <v-btn v-else>
          close
        </v-btn>
      </v-flex>
      <v-flex>
        <div v-if="logo">
          <img
            :src="logo"
            height="50"
          >
        </div>
      </v-flex>
      <v-flex>
        <div>
          <div v-if="filial">
            <v-layout column>
              <v-flex>
                {{ filialCity }}
              </v-flex>
              <v-flex>
                {{ filialAddress }}
              </v-flex>
            </v-layout>
          </div>
          <div v-else>
            Online запись
          </div>
        </div>
      </v-flex>
      <v-flex>
        <v-btn v-if="canChangeFilial">
          {{ filials.length }}
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { filialAddress, filialCity } from "@/components/filialUtils"
export default {
  props: {
    step: { type: Number, default: 0 },
    filial: { type: String, default: "" },
    filials: {
      type: Array,
      default () {
        return []
      }
    },
    logo: { type: String, default: "" }
  },
  computed: {
    canChangeFilial () {
      return this.filial && this.filials.length > 1
    },
    filialCity () {
      return filialCity(this.selectedFilial)
    },
    filialAddress () {
      return filialAddress(this.selectedFilial)
    },
    selectedFilial () {
      return (
        this.filial &&
        this.filials.length &&
        this.filials.filter(x => x["id"] === this.filial)[0]
      )
    }
  }
}
</script>
