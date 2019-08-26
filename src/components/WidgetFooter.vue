<template>
  <v-footer
    flat
    app
    :height="55"
  >
    <v-container
      class="footer-container"
    >
      <v-layout column>
        <v-flex v-if="showPhone">
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn
                flat
                icon
                outline
                class="phone-button"
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
        <v-flex>
          <v-layout
            justify-center
            row
            class="label-text"
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

<style scoped>
.v-footer {
  background-color: transparent;
}
.footer-container {
  position: relative;
  max-width: 400px;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid rgba(137, 149, 175, 0.2);
}
.label-text {
  font-size: 12px;
  color: rgba(137, 149, 175, 0.5);
}
.phone-button {
  position: absolute;
  bottom: 96px;
  right: 32px;
}
</style>
