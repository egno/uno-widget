<template>
  <v-layout column justify-space-between class="max-height">
    <div>
      <v-flex>
        <h2>Выберите услугу</h2>
      </v-flex>
      <v-flex>
        <v-text-field v-model="searchString" prepend-inner-icon="search" placeholder="Поиск" />
      </v-flex>
      <v-flex>
        <v-layout column>
          <template v-if="progress">
            <div class="text-xs-center">
              <v-progress-circular indeterminate color="primary" />
            </div>
          </template>
          <template v-else>
            <v-flex v-for="group in groups" :key="'grp'+group">
              <v-layout column>
                <v-flex>
                  <span class="subheading">{{ group || 'Прочее' }}</span>
                </v-flex>
                <v-flex>
                  <v-layout column>
                    <v-flex
                      v-for="service in servicesInGroup(group)"
                      :key="'srv'+service.service.id"
                      class="card-item"
                    >
                      <ServiceCard :service="service" :group="groupInfo(group)" />
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </template>
        </v-layout>
      </v-flex>
    </div>
    <div>
      <v-flex v-if="servicesCount">
        <v-card flat color="#f3f4f7">
          <SelectedServices color="grey" />
          <v-toolbar flat>
            <v-toolbar-title flat>
              <v-layout row>
                <v-flex xs-6 class="body-1">
                  <DurationDisplay :value="+duration" />
                </v-flex>
                <v-flex xs-6 class="body-1">
                  <PriceDisplay :value="+price" />
                </v-flex>
              </v-layout>
            </v-toolbar-title>
            <v-spacer />
            <v-btn outline fab small ligth color="#ddd" class="toolbar-button" @click="onNext">
              <v-icon color="black">
                arrow_forward
              </v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-flex>
    </div>
  </v-layout>
</template>

<script>
import Api from "@/api/backend"
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
      searchString: "",
      serviceGroups: [],
      progress: false
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
    this.loadGroupsInfo()
    this.load()
  },
  methods: {
    ...mapActions(["setStep"]),
    groupInfo (group) {
      return this.serviceGroups.find(x => x.name === group)
    },
    loadGroupsInfo () {
      Api()
        .get("service_groups")
        .then(res => {
          this.serviceGroups = res.data
        })
    },
    load () {
      if (!this.filialId) return
      this.progress = true
      Api()
        .get(`business_service?business_id=eq.${this.filialId}`)
        .then(res => {
          this.allServices = res.data
            .filter(
              x =>
                !this.employeeId ||
                (x.j && x.j.employees.includes(this.employeeId))
            )
            .map(x => {
              return {
                service: {
                  id: x.id,
                  group: x.j && x.j.group,
                  name: x.name,
                  employees: x.j && x.j.employees,
                  price: x.j && x.j.price,
                  duration: x.j && x.j.duration
                }
              }
            })
        })
        .finally(() => {
          this.progress = false
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
