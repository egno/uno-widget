<template>
  <v-app>
    <v-toolbar app>
      <TopBar
        :filial="filial"
        :filials="availableFilials"
        :step="step"
        :logo="logo"
        @onBack="onBack"
        @onChangeFilial="onChangeFilial"
      />
    </v-toolbar>
    <v-content>
      <VisitWidget
        :filial="filial"
        :filials="availableFilials"
        :step="step"
        @onSelectFilial="onSelectFilial($event)"
      />
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
import Api from "@/api/backend"

export default {
  name: "App",
  components: {
    TopBar,
    VisitWidget
  },
  data () {
    return {
      businessType: "",
      filials: undefined,
      filial: undefined,
      employee: undefined,
      service: undefined,
      date: undefined,
      step: 0
    }
  },
  computed: {
    availableFilials () {
      if (!this.filials) return
      return this.filials.filter(x => x.j && x.j.address && x.j.address.point)
    },
    companyId () {
      let uri = window.location.search.substring(1)
      let params = new URLSearchParams(uri)
      return params.get("b")
    },
    logo () {
      return (
        this.companyId && `${process.env.VUE_APP_IMAGES}${this.companyId}.png`
      )
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
    loadCompany () {
      if (!this.companyId) {
        return
      }
      if (this.businessType === "business") {
        Api()
          .get(`business?id=eq.${this.companyId}`)
          .then(res => {
            this.filials = res.data
          })
      }
      if (!this.businessType) {
        Api()
          .get(`business?parent=eq.${this.companyId}`)
          .then(res => {
            this.businessType = res.data.length ? "company" : "business"
            this.filials = res.data
          })
      }
    },
    init () {
      this.loadCompany()
    },
    onBack () {
      if (this.step) {
        this.step--
      }
    },
    onChangeFilial () {
      this.step = 0
    },
    onFilialChanged (newVal) {
      if (!newVal) {
        this.step = 0
      } else {
        this.step = 1
      }
    },
    onSelectFilial (payload) {
      if (payload) {
        this.filial = payload
        this.step = 1
      }
    },
    selectFilial () {
      if (this.filials && this.availableFilials.length === 1) {
        this.filial = this.filials[0]["id"]
      }
    }
  }
}
</script>

<style>
#app,
footer,
nav {
  max-width: 500px;
}
</style>

