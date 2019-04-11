<template>
  <v-app>
    <TopBar
      :filial="filial"
      :filials="availableFilials"
      :step="step"
      :logo="logo"
      @onBack="onBack"
      @onChangeFilial="onChangeFilial"
    />
    <v-content>
      <VisitWidget
        :employee="employee"
        :filial="filial"
        :filials="availableFilials"
        :step="step"
        @onSelectFilial="onSelectFilial($event)"
        @goPage="goPage($event)"
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
      step: ""
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
    goPage (page) {
      this.step = page
    },
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
      const nav = {
        "": "",
        main: "",
        date: "main",
        employee: "main",
        service: "main"
      }
      this.step = nav[this.step]
    },
    onChangeFilial () {
      this.step = ""
    },
    onFilialChanged (newVal) {
      if (!newVal) {
        this.step = ""
      } else {
        this.step = "main"
      }
    },
    onSelectFilial (payload) {
      if (payload) {
        this.filial = payload
        this.step = "main"
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
  max-width: 400px;
}
</style>

