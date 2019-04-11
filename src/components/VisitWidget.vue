<template>
  <v-container>
    <div v-if="!step && filials.length">
      <FilialPage
        :filial="filial"
        :filials="filials"
        @onSelectFilial="onSelectFilial($event)"
      />
    </div>
    <div v-if="step === 'main' || (!step && !filials.length)">
      <VisitMainPage
        @goPage="goPage($event)"
      />
    </div>
    <div v-if="step === 'date'">
      <DatePage />
    </div>
    <div v-if="step === 'service'">
      <ServicePage :filial="filial" :employee="employee" :selected="" @onNext="onServiceSelect($event)" />
    </div>
    <div v-if="step === 'employee'">
      <EmployeePage />
    </div>
  </v-container>
</template>

<script>
import FilialPage from "@/components/FilialPage.vue"
import VisitMainPage from "@/components/VisitMainPage.vue"
import DatePage from "@/components/DatePage.vue"
import EmployeePage from "@/components/EmployeePage.vue"
import ServicePage from "@/components/ServicePage.vue"

export default {
  components: { DatePage, EmployeePage, FilialPage, ServicePage, VisitMainPage },
  props: {
    employee: { type: String, default: "" },
    step: { type: String, default: "" },
    filial: { type: String, default: "" },
    filials: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      //
    }
  },
  methods: {
    goPage (page) {
      this.$emit("goPage", page)
    },
    onSelectFilial (payload) {
      if (payload) {
        this.$emit("onSelectFilial", payload)
      }
    }
  }
}
</script>
