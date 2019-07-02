<template>
  <v-toolbar
    app
    flat
    class="top-bar"
    height="56"
  >
    <v-layout row align-center justify-space-between class="top-bar__content">
      <v-layout row align-center>
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
        <v-avatar size="40">
          <v-img :src="logo">
            <template v-slot:placeholder>
              <v-layout
                fill-height
                align-center
                justify-center
                ma-0
              >
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-layout>
            </template>
          </v-img>
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
                    class="text-truncate top-bar__text"
                    pt-2
                    v-on="on"
                  >
                    {{ filialCity }}
                  </v-flex>
                  <v-flex
                    class="text-wrap top-bar__text"
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
          <div v-else class="top-bar__text">
            Online–запись
          </div>
        </v-toolbar-title>
      </v-layout>
      <div>
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
      </div>
    </v-layout>
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
.top-bar {
  background-color: transparent;
}
.top-bar__content {
  max-width: 400px;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
}
.top-bar__text {
  font: 400 12px 'Lato', sans-serif;
  color: #8995AF;
}
</style>
