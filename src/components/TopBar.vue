<template>
  <v-toolbar
    app
    flat
  >
    <v-btn
      v-if="step"
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
