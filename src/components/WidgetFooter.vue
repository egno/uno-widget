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
