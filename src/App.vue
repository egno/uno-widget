<template>
  <v-app>
    <v-container class="widget-container">
      <TopBar
        :company="companyId"
        @onBack="onBack"
        @onMenuSelectFilial="onMenuSelectFilial"
      />
      <v-content>
        <VisitWidget />
      </v-content>
      <WidgetFooter />
    </v-container>
  </v-app>
</template>

<script>
import TopBar from "@/components/TopBar.vue"
import VisitWidget from "./components/VisitWidget.vue"
import WidgetFooter from '@/components/WidgetFooter.vue'
import { mapGetters, mapActions } from "vuex"

export default {
  name: "App",
  components: {
    TopBar,
    VisitWidget,
    WidgetFooter
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
        contact: "main",
        success: "main",
        fail: "main"
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
.widget-container {
  padding: 0;
  font-family: 'Lato', sans-serif;
}
main.v-content {
  height: calc(100% - 2px);
}
.v-toolbar__content {
  padding: 0;
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

