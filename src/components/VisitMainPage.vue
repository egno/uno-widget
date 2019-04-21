<template>
  <v-layout column>
    <v-flex>
      <v-card>
        <v-toolbar>
          <v-layout column>
            <v-flex v-if="employeeId">
              Вы выбрали мастера
            </v-flex>
            <v-flex v-else>
              Выбрать мастера
            </v-flex>
          </v-layout>
          <v-btn
            flat
            icon
            @click="goPage('employee')"
          >
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-toolbar>
        <EmployeeMiniCard
          v-if="employeeId"
          :employee="employee"
        />
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-toolbar>
          <v-layout column>
            <v-flex v-if="servicesCount">
              Вы выбрали услугу
            </v-flex>
            <v-flex v-else>
              Выбрать услугу
            </v-flex>
          </v-layout>
          <v-btn
            flat
            icon
            @click="goPage('service')"
          >
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-toolbar>
        <SelectedServices @delService="delService($event)" />
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-toolbar>
          <v-layout column>
            <v-flex v-if="date && time">
              Вы выбрали дату
            </v-flex>
            <v-flex v-else>
              Выбрать дату
            </v-flex>
          </v-layout>
          <v-btn
            flat
            icon
            @click="goPage('date')"
          >
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-toolbar>
        <SelectedTime />
      </v-card>
    </v-flex>
    <v-flex v-if="saveButtonEnable">
      <v-card>
        <v-toolbar>
          <v-layout column>
            <v-flex>
              Записаться
            </v-flex>
          </v-layout>
          <v-btn
            flat
            icon
            @click="goPage('contact')"
          >
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SelectedTime from "@/components/SelectedTime.vue"
import SelectedServices from "@/components/SelectedServices.vue"
import EmployeeMiniCard from "@/components/EmployeeMiniCard.vue"
import { mapGetters, mapActions } from "vuex"

export default {
  components: { EmployeeMiniCard, SelectedServices, SelectedTime },
  computed: {
    ...mapGetters(["employee", "employeeId", "date", "time", "servicesCount"]),
    saveButtonEnable () {
      return (this.employeeId !== undefined) && this.servicesCount && this.date && this.time
    }
  },
  methods: {
    ...mapActions(["setStep"]),
    goPage (page) {
      this.setStep(page)
    }
  }
}
</script>


