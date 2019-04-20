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
        <v-flex
          v-for="emp in employees"
          :key="emp.id"
        >
          <EmployeeCard :employee="emp" />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Api from "@/api/backend"
import EmployeeCard from "@/components/EmployeeCard.vue"
import { timestampLocalISO } from "@/utils"
import { mapGetters } from "vuex"

export default {
  components: { EmployeeCard },
  data () {
    return {
      employees: [],
      searchString: ""
    }
  },
  computed: {
    ...mapGetters(["filialId",'ts','duration','employee'])
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
      Api()
        .post("rpc/free_employee", params)
        .then(res => {
          this.employees = res.data
        })
    },
    onSelectEmployee (payload) {
      this.$emit("onSelectEmployee", payload)
    }
  }
}
</script>
