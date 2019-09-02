<template>
  <v-card
    flat
    class="rounded card-item"
  >
    <EmployeeMiniCard :employee="employee" />
    <ButtonToolbar
      :color="(selected) ? 'green': 'primary'"
      :icon="(selected) ? 'check': 'arrow_forward'"
      @click="onSelectEmployee"
    >
      <v-layout column>
        Выбрать
      </v-layout>
    </ButtonToolbar>
  </v-card>
</template>

<script>
import EmployeeMiniCard from "@/components/EmployeeMiniCard.vue"
import ButtonToolbar from "@/components/ButtonToolbar.vue"
import { mapActions, mapGetters } from "vuex"

export default {
  components: { ButtonToolbar, EmployeeMiniCard },
  props: {
    employee: {
      type: Object,
      default () {
        return {
          id: ""
        }
      }
    }
  },
  data () {
    return {
      freeTimes: []
    }
  },
  computed: {
    ...mapGetters(["filialId", "employeeId"]),
    selected () {
      return this.employee.id === this.employeeId
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    ...mapActions(["setEmployee", "setStep", "setDate"]),
    onSelectEmployee () {
      if (this.selected) {
        this.setEmployee({})
      } else {
        this.setEmployee(this.employee)
        this.setStep("main")
      }
    },
    onSelectTime () {
      this.setDate(this.filteredTimes[0])
      this.onSelectEmployee()
    }
  }
}
</script>
