<template>
  <v-layout column>
    <v-flex>
      <v-card>
        <SelectedServices
          @delService="delService($event)"
        />
        <v-toolbar>
          <v-layout column>
            <v-flex>
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
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <EmployeeMiniCard
          v-if="employeeId"
        />
        <v-toolbar>
          <v-layout column>
            <v-flex>
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
      </v-card>
    </v-flex>
    <v-flex>
      {{ date }}
      <v-btn @click="goPage('date')">
        Выбрать дату
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SelectedServices from "@/components/SelectedServices.vue"
import EmployeeMiniCard from "@/components/EmployeeMiniCard.vue"
import { mapGetters, mapActions } from "vuex"

export default {
  components: { EmployeeMiniCard, SelectedServices },
  computed: {
    ...mapGetters(['employeeId', 'date'])
  },
  methods: {
    ...mapActions(['setStep']),
    goPage (page) {
      this.setStep(page)
    }
  }
}
</script>


