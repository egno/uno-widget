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
                  <ServiceCard
                    :service="service"
                    :filial="filial"
                    :employee="employee"
                    :selected="isServiceSelected(service)"
                    @addService="addService($event)"
                    @delService="delService($event)"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex v-if="selected.length">
      <v-expansion-panel>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>{{ servicesCountDisplay(selected.length) }}</div>
          </template>
          <v-layout column>
            <v-flex
              v-for="service in selectedServices"
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
    <v-flex v-if="selected.length">
      <v-toolbar flat>
        <v-layout row>
          <v-flex>
            {{ duration }}
          </v-flex>
          <v-flex>
            {{ price }}
          </v-flex>
        </v-layout>
        <v-btn
          flat
          icon
          @click="onNext"
        >
          <v-icon>arrow_forward</v-icon>
        </v-btn>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
import Api from "@/api/backend"
import { numberText, timestampLocalISO } from "@/utils"
import ServiceCard from "@/components/ServiceCard.vue"
import ServiceCardMini from "@/components/ServiceCardMini.vue"

export default {
  components: { ServiceCard, ServiceCardMini },
  props: {
    employee: { type: String, default: "" },
    filial: { type: String, default: "" },
    selected: {type: Array, default () {return []}}
  },
  data () {
    return {
      services: [],
      selected: [],
      searchString: ""
    }
  },
  computed: {
    duration () {
      return this.selectedServices
        .map(x => +x.service.duration)
        .reduce((result, x) => result + x, 0)
    },
    filteredServices () {
      return this.services.filter(
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
    },
    price () {
      return this.selectedServices
        .map(x => +x.service.price)
        .reduce((result, x) => result + x, 0)
    },
    selectedServices () {
      return this.services.filter(x =>
        this.selected.some(sel => x.service.id === sel)
      )
    }
  },
  watch: {
    filial: "load"
  },
  mounted () {
    this.load()
  },
  methods: {
    addService (payload) {
      this.selected.push(payload)
      this.selected = [...new Set(this.selected)]
    },
    delService (payload) {
      const idx = this.selected.indexOf(payload)
      if (idx + 1) {
        this.selected.splice(idx, 1)
      }
    },
    isServiceSelected (service) {
      return this.selected.some(x => x === service.service.id)
    },
    load () {
      if (!this.filial) return
      Api()
        .post("rpc/free_service", {
          dt: timestampLocalISO(),
          business_id: this.filial
        })
        .then(res => {
          this.services = res.data
        })
    },
    onNext () {
      this.$emit("onNext", {
        services: this.selectedServices,
        price: this.price,
        duration: this.duration
      })
    },
    servicesInGroup (grp) {
      return this.filteredServices.filter(x => x.service.group === grp)
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
