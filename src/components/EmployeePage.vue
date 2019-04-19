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
  props: {
    duration: { type: Number, default: undefined },
    employee: {
      type: Object,
      default () {
        return {}
      }
    },
    filial: { type: String, default: "" },
    service: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      employees: [],
      searchString: ""
    }
  },
  computed: {
    ...mapGetters(["filialId"])
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
      Api()
        .post("rpc/free_employee", {
          dt: timestampLocalISO(),
          business_id: this.filialId
        })
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
