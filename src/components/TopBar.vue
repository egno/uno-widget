<template>
  <v-toolbar
    app
    flat
  >
    <v-btn
      v-if="canBack"
      flat
      icon
      @click="onBack()"
    >
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-btn
      v-else
      flat
      icon
    >
      <v-icon>close</v-icon>
    </v-btn>
    <v-avatar size="48">
      <img :src="logo">
    </v-avatar>
    <v-toolbar-title>
      <div
        v-if="filial"
        class="body-2"
      >
        <v-layout column>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-flex
                class="text-truncate"
                v-on="on"
              >
                {{ filialCity }}
              </v-flex>
              <v-flex
                class="text-wrap"
                v-on="on"
              >
                {{ filialAddress }}
              </v-flex>
            </template>
            <span>
              {{ filialCity }}
              {{ filialAddress }}
            </span>
          </v-tooltip>
        </v-layout>
      </div>
      <div v-else>
        Online запись
      </div>
    </v-toolbar-title>
    <v-spacer />
    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on }">
        <v-btn
          flat
          icon
          v-on="on"
        >
          <v-icon>
            more_vert
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile @click="onChangeFilial()">
          <v-list-tile-title>Изменить филиал</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { filialAddress, filialCity } from "@/components/filialUtils"
export default {
  props: {
    step: { type: String, default: "" },
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
    canBack () {
      return this.step && !(this.step === 'main' && this.filials.length <= 1) 
    },
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
  },
  methods: {
    onBack () {
      this.$emit("onBack")
    },
    onChangeFilial () {
      this.$emit("onChangeFilial")
    }
  }
}
</script>

<style scoped>
.text-wrap {
  white-space: normal;
  line-height: 1.1em;
}
</style>
