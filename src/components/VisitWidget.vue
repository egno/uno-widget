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
        :filial="filial"
        :employee="employee"
        :services="services"
        :duration="duration"
        :price="price"
        @delService="delService($event)"
        @goPage="goPage($event)"
      />
    </div>
    <div v-if="step === 'date'">
      <DatePage />
    </div>
    <div v-if="step === 'service'">
      <ServicePage
        :filial="filial"
        :employee="employee"
        :selected="services"
        :duration="duration"
        :price="price"
        @addService="addService($event)"
        @delService="delService($event)"
        @onNext="onSelectService($event)"
      />
    </div>
    <div v-if="step === 'employee'">
      <EmployeePage
        :filial="filial"
        :employee="employee"
        :service="services"
        :duration="duration"
        @onSelectEmployee="onSelectEmployee($event)"
      />
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
  components: {
    DatePage,
    EmployeePage,
    FilialPage,
    ServicePage,
    VisitMainPage
  },
  props: {
    services: {
      type: Array,
      default () {
        return []
      }
    },
    duration: { type: Number, default: undefined },
    price: { type: Number, default: undefined },
    employee: {
      type: Object,
      default () {
        return {}
      }
    },
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
    addService (payload) {
      this.$emit("addService", payload)
    },
    delService (payload) {
      this.$emit("delService", payload)
    },
    goPage (page) {
      this.$emit("goPage", page)
    },
    onSelectEmployee (payload) {
      this.$emit("onSelectEmployee", payload)
    },
    onSelectFilial (payload) {
      if (payload) {
        this.$emit("onSelectFilial", payload)
      }
    },
    onSelectService (payload) {
      this.$emit("onSelectService", payload)
    }
  }
}
</script>
