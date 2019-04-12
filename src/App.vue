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
        :services="service"
        :step="step"
        :duration="duration"
        :date="date"
        :price="price"
        @addService="addService($event)"
        @delService="delService($event)"
        @onDateChange="onDateChange($event)"
        @onSelectEmployee="onSelectEmployee($event)"
        @onSelectFilial="onSelectFilial($event)"
        @onSelectService="onSelectService($event)"
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
      employee: {},
      service: [],
      step: '',
      date: undefined
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
    duration () {
      return this.service
        .map(x => +x.service.duration)
        .reduce((result, x) => result + x, 0)
    },
    logo () {
      return (
        this.companyId && `${process.env.VUE_APP_IMAGES}${this.companyId}.png`
      )
    },
    price () {
      return this.service
        .map(x => +x.service.price)
        .reduce((result, x) => result + x, 0)
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
    addService (payload) {
      this.service.push(payload)
      this.service = [...new Set(this.service)]
    },
    delService (payload) {
      const idx = this.service.map(x=>x.service.id).indexOf(payload.service.id)
      console.log(idx)
      if (idx + 1) {
        this.service.splice(idx, 1)
      }
    },
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
    onDateChange (payload) {
      this.date = payload
      if (this.date.length > 10) {
        this.step = "main"
      }
    },
    onFilialChanged (newVal) {
      if (!newVal) {
        this.step = ""
      } else {
        this.step = "main"
      }
    },
    onSelectEmployee (payload) {
      this.employee = payload
      this.onBack()
    },
    onSelectFilial (payload) {
      if (payload) {
        this.filial = payload
        this.service = []
        this.step = "main"
      }
    },
    onSelectService () {
      this.onBack()
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

