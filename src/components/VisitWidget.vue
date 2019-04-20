<template>
  <v-container
    fluid
    grid-list-lg
  >
    <div v-if="!step && hasFilials">
      <FilialPage />
    </div>
    <div v-if="step === 'main' || !(step || hasFilials)">
      <VisitMainPage />
    </div>
    <div v-if="step === 'date'">
      <DatePage />
    </div>
    <div v-if="step === 'service'">
      <ServicePage />
    </div>
    <div v-if="step === 'employee'">
      <EmployeePage />
    </div>
    <div v-if="step === 'contact'">
      <ContactPage />
    </div>
    <div v-if="step === 'success'">
      <SuccessPage />
    </div>
    <div v-if="step === 'fail'">
      <FailPage />
    </div>
  </v-container>
</template>

<script>
import FilialPage from "@/components/FilialPage.vue"
import VisitMainPage from "@/components/VisitMainPage.vue"
import DatePage from "@/components/DatePage.vue"
import EmployeePage from "@/components/EmployeePage.vue"
import ServicePage from "@/components/ServicePage.vue"
import ContactPage from "@/components/ContactPage.vue"
import SuccessPage from "@/components/SuccessPage.vue"
import FailPage from "@/components/FailPage.vue"
import { mapGetters } from "vuex"

export default {
  components: {
    DatePage,
    EmployeePage,
    FilialPage,
    ServicePage,
    VisitMainPage,
    ContactPage,
    SuccessPage,
    FailPage
  },
  computed: {
    ...mapGetters(["step", "hasFilials"])
  },
  methods: {
  }
}
</script>
