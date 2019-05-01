<template>
  <v-footer
    flat
    app
    :height="height"
  >
    <v-container
      grid-list-sm
      text-xs-center
      pa-1
    >
      <v-layout column>
        <v-flex v-if="showPhone">
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn
                flat
                icon
                outline
                v-on="on"
              >
                <v-icon>phone</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile
                v-for="phone in phones"
                :key="phone"
                href="`tel:${phone}`"
              >
                <v-list-tile-title>{{ phone }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
        <v-divider />
        <v-flex pa-2>
          <v-layout
            justify-center
            row
          >
            Работает на UNO
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  data () {
    return {
      showIcons: true
    }
  },
  computed: {
    ...mapGetters(["step", "filial"]),
    height () {
      return this.showPhone ? '92': 'auto'
    },
    showPhone () {
      const steps = ["main", "contact", "success", "fail"]
      return (steps.indexOf(this.step) > -1) && (this.phones.length)
    },
    phones () {
      return (
        this.filial &&
        this.filial.j &&
        this.filial.j.phones.map(x =>
          x.replace(/^(\d)(\d{3})(\d{3})(\d{4})$/, "+$1($2)$3-$4")
        )
      )
    }
  }
}
</script>
