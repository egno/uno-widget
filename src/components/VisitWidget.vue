<template>
  <v-container
    class="visit-widget"
  >
    <template v-if="businessType === 'fail'">
      <div class="text-xs-center">
        Виждет настроен неправильно
      </div>
    </template>
    <template v-else>
      <v-layout row class="max-height">
        <v-flex xs12 class="max-height">
          <div v-if="!step && hasFilials">
            <FilialPage />
          </div>
          <div v-if="step === 'main' || !(step || hasFilials)">
            <VisitMainPage />
          </div>
          <div v-if="step === 'date'">
            <DatePage />
          </div>
          <template v-if="step === 'service'">
            <ServicePage />
          </template>
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
        </v-flex>
      </v-layout>
    </template>
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
    ...mapGetters(["businessType", "step", "hasFilials"])
  },
  methods: {}
}
</script>

<style>
  .visit-widget {
    max-width: 400px;
    height: 100%;
    padding-bottom: 0;
    background-color: #fff;
    border-top: 1px solid rgba(137, 149, 175, 0.2);
  }
</style>
