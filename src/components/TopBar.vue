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
      :disabled="true"
    />
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
      v-if="canChangeFilial"
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
        <v-list-tile @click="onChangeFilial">
          <v-list-tile-title>Изменить филиал</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex"
import { filialAddress, filialCity } from "@/components/filialUtils"

export default {
  props: {
    company: {type: String, default: ''}
  },
  computed: {
    ...mapGetters(["filial", "hasFilials", "step"]),
    canBack () {
      return this.step && !(this.step === "main" && !this.hasFilials)
    },
    canChangeFilial () {
      return this.filial && this.hasFilials
    },
    filialCity () {
      return filialCity(this.filial)
    },
    filialAddress () {
      return filialAddress(this.filial)
    },
    logo () {
      return (
        this.company && `${process.env.VUE_APP_IMAGES}${this.company}.png`
      )
    }
  },
  methods: {
    onBack () {
      this.$emit("onBack")
    },
    onChangeFilial () {
      this.$emit("onMenuSelectFilial")
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
