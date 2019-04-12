<template>
  <v-layout column>
    <v-flex>
      <v-card>
        <SelectedServices
          :services="services"
          :duration="duration"
          :price="price"
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
          v-if="employee.id"
          :employee="employee"
          :filial="filial"
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

export default {
  components: { EmployeeMiniCard, SelectedServices },
  props: {
    duration: { type: Number, default: undefined },
    date: { type: String, default: "" },
    price: { type: Number, default: undefined },
    services: {
      type: Array,
      default () {
        return []
      }
    },
    employee: {
      type: Object,
      default () {
        return {}
      }
    },
    filial: { type: String, default: "" }
  },
  methods: {
    delService (payload) {
      this.$emit("delService", payload)
    },
    goPage (page) {
      this.$emit("goPage", page)
    }
  }
}
</script>


