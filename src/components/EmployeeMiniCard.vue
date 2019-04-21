<template>
  <v-card-title>
    <v-layout column>
      <v-flex v-if="employee.id">
        {{ employeeName }}
      </v-flex>
      <v-flex v-if="employee.id">
        {{ employeePosition }}
      </v-flex>
      <v-flex v-if="employee.id">
        <v-layout row>
          <v-flex />
        </v-layout>
      </v-flex>
      <v-flex v-else>
        Любой свободный мастер
      </v-flex>
    </v-layout>
    <v-avatar v-if="employee.id" size="48">
      <img
        :src="employeeAvatar"
        aspect-ratio="1"
      >
    </v-avatar>
  </v-card-title>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  props: {
    employee: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters(['filial']),
    employeeAvatar () {
      return (
        this.filial &&
        this.employee &&
        this.employee.j &&
        this.employee.j.image &&
        `${process.env.VUE_APP_IMAGES}${this.filial}/${this.employee.j.image}`
      )
    },
    employeeName () {
      return (
        this.employee &&
        this.employee.j &&
        [this.employee.j.name, this.employee.j.surname].join(" ")
      )
    },
    employeePosition () {
      return this.employee && this.employee.j && this.employee.j.position
    }
  }
}
</script>
