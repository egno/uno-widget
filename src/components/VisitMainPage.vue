<template>
  <v-layout column>
    <v-flex>
      <h2>Online - запись</h2>
    </v-flex>
    <v-flex>
      <v-card flat>
        <ButtonToolbar
          icon="arrow_forward"
          :done="employeeId!==undefined"
          @click="goPage('employee')"
        >
          <div>
            {{ (employeeId!==undefined) ? 'Вы выбрали мастера' : 'Выбрать мастера' }}
          </div>
        </ButtonToolbar>
        <EmployeeMiniCard
          v-if="employeeId!==undefined"
          :employee="employee"
        />
      </v-card>
    </v-flex>
    <v-flex>
      <v-card flat>
        <ButtonToolbar
          icon="arrow_forward"
          :done="!!servicesCount"
          @click="goPage('service')"
        >
          <div>
            {{ (servicesCount) ? 'Вы выбрали услугу' : 'Выбрать услугу' }}
          </div>
        </ButtonToolbar>
        <SelectedServices
          v-if="servicesCount"
          @delService="delService($event)"
        />
      </v-card>
    </v-flex>
    <v-flex>
      <v-card flat>
        <ButtonToolbar
          icon="arrow_forward"
          :done="!!(date && time)"
          @click="goPage('date')"
        >
          <div>
            {{ (date && time) ? 'Вы выбрали дату' : 'Выбрать дату' }}
          </div>
        </ButtonToolbar>
        <SelectedTime />
      </v-card>
    </v-flex>
    <v-flex v-if="saveButtonEnable">
      <v-card flat>
        <ButtonToolbar
          icon="arrow_forward"
          @click="goPage('contact')"
        >
          <div>
            Записаться
          </div>
        </ButtonToolbar>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SelectedTime from "@/components/SelectedTime.vue"
import SelectedServices from "@/components/SelectedServices.vue"
import EmployeeMiniCard from "@/components/EmployeeMiniCard.vue"
import ButtonToolbar from "@/components/ButtonToolbar.vue"
import { mapGetters, mapActions } from "vuex"

export default {
  components: {
    EmployeeMiniCard,
    SelectedServices,
    SelectedTime,
    ButtonToolbar
  },
  computed: {
    ...mapGetters(["employee", "employeeId", "date", "time", "servicesCount"]),
    saveButtonEnable () {
      return (
        this.employeeId !== undefined &&
        this.servicesCount &&
        this.date &&
        this.time
      )
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


