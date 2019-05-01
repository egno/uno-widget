<template>
  <v-layout column>
    <v-flex>
      Выберите мастера
    </v-flex>
    <v-flex>
      <v-text-field v-model="searchString" />
    </v-flex>
    <v-flex>
      <v-layout column>
        <v-flex>
          <EmployeeCard />
        </v-flex>
      </v-layout>
      <v-flex>
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
            <v-flex
              v-for="emp in employees"
              :key="emp.id"
            >
              <EmployeeCard :employee="emp" />
            </v-flex>
          </template>
        </v-layout>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import Api from "@/api/backend"
import EmployeeCard from "@/components/EmployeeCard.vue"
import { timestampLocalISO, pgArray } from "@/utils"
import { mapGetters } from "vuex"

export default {
  components: { EmployeeCard },
  data () {
    return {
      employees: [],
      searchString: "",
      progress: false
    }
  },
  computed: {
    ...mapGetters([
      "filialId",
      "ts",
      "duration",
      "employee",
      "services",
      "servicesCount"
    ])
  },
  watch: {
    filialId: "load"
  },
  mounted () {
    this.load()
  },
  methods: {
    isEmployeeSelected (emp) {
      return emp.id === this.employee.id
    },
    load () {
      if (!this.filialId) return
      let params = {
        dt: timestampLocalISO(),
        business_id: this.filialId
      }
      if (this.duration) {
        params.duration = this.duration
      }
      if (this.ts) {
        params.dt = this.ts
      }
      if (this.servicesCount) {
        params.service = pgArray(this.services.map(x => x.service.id))
      }
      this.progress = true
      Api()
        .post("rpc/free_employee", params)
        .then(res => {
          this.employees = res.data
        })
        .finally(()=>{this.progress = false})
    },
    onSelectEmployee (payload) {
      this.$emit("onSelectEmployee", payload)
    }
  }
}
</script>
