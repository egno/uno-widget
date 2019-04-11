<template>
  <v-layout column class="pa-0">
    <v-flex v-if="services.length">
      <v-expansion-panel class="elevation-0">
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>{{ servicesCountDisplay(services.length) }}</div>
          </template>
          <v-layout column>
            <v-flex
              v-for="service in services"
              :key="service.service.id"
            >
              <ServiceCardMini
                :service="service"
                @delService="delService($event)"
              />
            </v-flex>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { numberText } from "@/utils"
import ServiceCardMini from "@/components/ServiceCardMini.vue"

export default {
  components: { ServiceCardMini },
  props: {
    duration: { type: Number, default: undefined },
    price: { type: Number, default: undefined },
    services: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    
  },
  methods: {
    delService (payload) {
      this.$emit("delService", payload)
    },
    servicesCountDisplay (n) {
      const masterForms = [
        "Выбрана % услуга",
        "Выбраны % услуги",
        "Выбрано % услуг"
      ]
      return numberText(n, masterForms)
    }
  }
}
</script>
