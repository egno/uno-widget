<template>
  <v-layout
    column
    class="pa-0"
  >
    <v-flex v-if="servicesCount">
      <v-expansion-panel
        class="elevation-0"
        :class="{'grey':color==='grey'}"
      >
        <v-expansion-panel-content>
          <template
            v-slot:header
            class="pa-1"
          >
            <div>{{ servicesCountDisplay }}</div>
          </template>
          <v-list two-line>
            <template v-for="(service, service_n) in services">
              <v-list-tile :key="service.service.id" class="px-2">
                <v-list-tile-content>
                  <v-list-tile-sub-title>
                    {{ service.service && service.service.group }}
                  </v-list-tile-sub-title>
                  <v-list-tile-title>{{ service.service && service.service.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>
                    <v-layout row>
                      <v-flex xs-6>
                        <DurationDisplay :value="service.service && +service.service.duration" />
                      </v-flex>
                      <v-flex xs-6>
                        <PriceDisplay :value="service.service && +service.service.price" />
                      </v-flex>
                    </v-layout>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn
                    flat
                    icon
                    color="#dee1e9"
                    @click="onRemove(service)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="service_n < services.length -1" :key="`divider-${service.service.id}`" />
            </template>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import DurationDisplay from "@/components/DurationDisplay.vue"
import PriceDisplay from "@/components/PriceDisplay.vue"

export default {
  components: { DurationDisplay, PriceDisplay },
  props: {
    color: { type: String, default: "white" }
  },
  computed: {
    ...mapGetters(["services", "servicesCount", "servicesCountDisplay"])
  },
  methods: {
    ...mapActions(["delService"]),
    onRemove (event) {
      this.delService(event)
    }
  }
}
</script>

<style lang="stylus">
.grey .v-expansion-panel__container {
  background-color: #f3f4f7 !important;
}

.grey .v-list {
  background-color: #f3f4f7 !important;
}
</style>
