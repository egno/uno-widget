<template>
  <v-layout column>
    <template v-if="progress">
      <div class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </div>
    </template>
    <template v-else>
      <v-flex>
        <h2>Online - запись</h2>
      </v-flex>
      <v-flex class="visit-main__option">
        <v-card
          flat
          class="rounded"
        >
          <ButtonToolbar
            icon="arrow_forward"
            :done="employeeId!==undefined"
            icon-color="primary"
            @click="goPage('employee')"
          >
            <div>
              {{ (employeeId!==undefined) ? 'Вы выбрали мастера' : 'Выбрать мастера' }}
            </div>
          </ButtonToolbar>
          <EmployeeMiniCard
            v-if="employeeId!==undefined"
            :employee="employee"
            mode="inMainView"
          />
        </v-card>
      </v-flex>
      <v-flex class="visit-main__option">
        <v-card
          flat
          class="rounded"
        >
          <ButtonToolbar
            icon="arrow_forward"
            :done="!!servicesCount"
            icon-color="primary"
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
      <v-flex class="visit-main__option">
        <v-card
          flat
          class="rounded"
        >
          <ButtonToolbar
            icon="arrow_forward"
            :done="!!(date && time)"
            icon-color="primary"
            @click="goPage('date')"
          >
            <div>
              {{ (date && time) ? 'Вы выбрали дату' : 'Выбрать дату' }}
            </div>
          </ButtonToolbar>
          <SelectedTime v-if="!!(date && time)" />
        </v-card>
      </v-flex>
      <v-flex v-if="saveButtonEnable">
        <v-card
          flat
          class="rounded"
        >
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
    </template>
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
    ...mapGetters([
      "progress",
      "filial",
      "employee",
      "employeeId",
      "date",
      "time",
      "servicesCount"
    ]),
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

<style scoped>
  .visit-main__option {
    margin: 8px 0;
  }
</style>


