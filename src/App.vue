<template>
  <v-app>
    <TopBar
      :company="companyId"
      @onBack="onBack"
      @onMenuSelectFilial="onMenuSelectFilial"
    />
    <v-content>
      <VisitWidget />
    </v-content>
    <v-footer
      app
      height="auto"
    >
      <v-layout
        justify-center
        row
        wrap
      >
        Работает на UNO
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import TopBar from "@/components/TopBar.vue"
import VisitWidget from "./components/VisitWidget.vue"
import { mapGetters, mapActions } from "vuex"

export default {
  name: "App",
  components: {
    TopBar,
    VisitWidget
  },
  data () {
    return {
      //
    }
  },
  computed: {
    ...mapGetters(["filial", "filials", "businessType", "step"]),
    companyId () {
      let uri = window.location.search.substring(1)
      let params = new URLSearchParams(uri)
      return params.get("b")
    }
  },
  watch: {
    companyId: "init",
    businessType: "loadCompany",
    filials: "selectFilial",
    filial: "onFilialChanged"
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions(["loadFilials", "setStep", "setFilial"]),
    goPage (page) {
      this.setStep(page)
    },
    loadCompany () {
      if (!this.companyId) {
        return
      }
      this.loadFilials(this.companyId)
    },
    init () {
      this.loadCompany()
    },
    onBack () {
      const nav = {
        "": "",
        main: "",
        date: "main",
        employee: "main",
        service: "main",
        contact: "main"
      }
      this.setStep(nav[this.step])
    },
    onChangeFilial () {
      this.setStep("")
    },
    onDateChange (payload) {
      this.date = payload
      if (this.date.length > 10) {
        this.setStep("main")
      }
    },
    onFilialChanged (newVal) {
      if (!newVal) {
        this.setStep("")
      } else {
        this.setStep("main")
      }
    },
    onSelectEmployee (payload) {
      this.employee = payload
      this.onBack()
    },
    onMenuSelectFilial () {
      this.setFilial()
      this.setStep("")
    },
    onSelectService () {
      this.onBack()
    },
    selectFilial () {
      //
    }
  }
}
</script>

<style>
#app,
footer,
nav {
  max-width: 400px;
}
.rounded {
  border-radius: 30px;
  border-style: solid;
  border-width: 1px;
  border-color: #eee !important;
}
.rounded .v-card__title {
  padding-left: 24px;
}
</style>

