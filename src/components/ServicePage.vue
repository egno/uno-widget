<template>
  <v-layout column>
    <v-flex>
      Выберите услугу
    </v-flex>
    <v-flex>
      <v-text-field v-model="searchString" />
    </v-flex>
    <v-flex>
      <v-layout column>
        <v-flex
          v-for="group in groups"
          :key="'grp'+group"
        >
          <v-layout column>
            <v-flex>
              {{ group || 'Прочее' }}
            </v-flex>
            <v-flex>
              <v-layout column>
                <v-flex
                  v-for="service in servicesInGroup(group)"
                  :key="'srv'+service.service.id"
                >
                  <ServiceCard :service="service" />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex v-if="servicesCount">
      <v-card
        flat
        color="#f3f4f7"
      >
        <SelectedServices color="grey" />
        <v-toolbar flat>
          <v-toolbar-title flat>
            <v-layout row>
              <v-flex
                xs-6
                class="body-1"
              >
                <DurationDisplay :value="+duration" />
              </v-flex>
              <v-flex
                xs-6
                class="body-1"
              >
                <PriceDisplay :value="+price" />
              </v-flex>
            </v-layout>
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            outline
            fab
            small
            ligth
            color="#ddd"
            class="toolbar-button "
            @click="onNext"
          >
            <v-icon color="black">
              arrow_forward
            </v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Api from "@/api/backend"
import { timestampLocalISO } from "@/utils"
import ServiceCard from "@/components/ServiceCard.vue"
import SelectedServices from "@/components/SelectedServices.vue"
import DurationDisplay from "@/components/DurationDisplay.vue"
import PriceDisplay from "@/components/PriceDisplay.vue"
import { mapActions, mapGetters } from "vuex"

export default {
  components: { SelectedServices, ServiceCard, DurationDisplay, PriceDisplay },
  data () {
    return {
      allServices: [],
      searchString: ""
    }
  },
  computed: {
    ...mapGetters([
      "employeeId",
      "filialId",
      "services",
      "servicesCount",
      "duration",
      "price",
      "ts"
    ]),
    filteredServices () {
      return [...this.allServices].filter(
        x =>
          x.service.name
            .toUpperCase()
            .indexOf(this.searchString.toUpperCase()) + 1 ||
          x.service.group
            .toUpperCase()
            .indexOf(this.searchString.toUpperCase()) + 1
      )
    },
    groups () {
      return [
        ...new Set(this.filteredServices.map(x => x.service.group))
      ].sort()
    }
  },
  watch: {
    filialId: "load"
  },
  mounted () {
    this.load()
  },
  methods: {
    ...mapActions(["setStep"]),
    load () {
      if (!this.filialId) return
      let params = {
        dt: timestampLocalISO(),
        business_id: this.filialId
      }
      if (this.employeeId) {
        params.employee_id = this.employeeId
      }
      if (this.ts) {
        params.dt = this.ts
      }
      Api()
        .post("rpc/free_service", params)
        .then(res => {
          this.allServices = res.data
        })
    },
    onNext () {
      this.setStep("main")
    },
    servicesInGroup (grp) {
      return this.filteredServices.filter(x => x.service.group === grp)
    }
  }
}
</script>

<style scoped>
.toolbar-button {
  background-color: white !important;
}
</style>
