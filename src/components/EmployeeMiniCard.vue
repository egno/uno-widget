<template>
  <v-card-title>
    <v-avatar v-if="employee.id && mode==='inMainView'" size="36">
      <img
        :src="employeeAvatar"
        aspect-ratio="1"
      >
    </v-avatar>
    <v-layout column>
      <v-flex v-if="employee.id" class="py-0">
        {{ employeeName }}
      </v-flex>
      <v-flex v-if="employee.id" class="py-0">
        <span class="caption">{{ employeePosition }}</span>
      </v-flex>
      <v-flex v-else>
        Любой свободный мастер
      </v-flex>
    </v-layout>
    <v-avatar v-if="employee.id && mode!=='inMainView'" size="48">
      <img
        :src="employeeAvatar"
        aspect-ratio="1"
      >
    </v-avatar>
    <v-spacer />
    <v-btn
      flat
      icon
      color="#dee1e9"
      @click="onRemove()"
    >
      <v-icon>delete</v-icon>
    </v-btn>
  </v-card-title>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  props: {
    employee: {
      type: Object,
      default () {
        return {}
      }
    },
    mode: {type: String, default: ''}
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
  },
  methods:{
    ...mapActions(['setEmployee']),
    onRemove () {
      this.setEmployee({})
    }
  }
}
</script>

<style scoped>
.v-avatar{
  margin-right: 1em;
}
.caption{
  color: grey;
}
</style>
