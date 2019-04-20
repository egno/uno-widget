<template>
  <v-layout column class="pa-0">
    <v-flex v-if="servicesCount">
      <v-expansion-panel class="elevation-0">
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>{{ servicesCountDisplay }}</div>
          </template>
          <v-layout column>
            <v-flex
              v-for="service in services"
              :key="service.service.id"
            >
              <ServiceCardMini
                :service="service"
              />
            </v-flex>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>

<script>

import ServiceCardMini from "@/components/ServiceCardMini.vue"
import { mapGetters } from "vuex"

export default {
  components: { ServiceCardMini },
  computed: {
    ...mapGetters(['services', 'servicesCount','servicesCountDisplay'])
  },
  methods: {
//
  }
}
</script>
