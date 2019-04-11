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
      <v-card flat>
        <SelectedServices
          :services="selected"
          :duration="duration"
          :price="price"
        />
        <v-toolbar-title flat>
          <v-layout row>
            <v-flex>
              {{ duration }}
            </v-flex>
            <v-flex>
              {{ price }}
            </v-flex>
          </v-layout>
          <v-spacer />
          <v-btn
            flat
            icon
            @click="onNext"
          >
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-toolbar-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Api from "@/api/backend"
import { timestampLocalISO } from "@/utils"
import ServiceCard from "@/components/ServiceCard.vue"
import SelectedServices from "@/components/SelectedServices.vue"

export default {
  components: { SelectedServices, ServiceCard },
  props: {
    duration: { type: Number, default: undefined },
    price: { type: Number, default: undefined },
    employee: {
      type: Object,
      default () {
        return {}
      }
    },
    filial: { type: String, default: "" },
    selected: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      services: [],
      searchString: ""
    }
  },
  computed: {
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
    selectedServices () {
      return this.services.filter(x =>
        this.selected.some(sel => x.service.id === sel.service.id)
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
      this.$emit("addService", payload)
    },
    delService (payload) {
      this.$emit("delService", payload)
    },
    isServiceSelected (service) {
      return this.selected.some(x => x.service.id === service.service.id)
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
        price: this.price,
        duration: this.duration
      })
    },
    servicesInGroup (grp) {
      return this.filteredServices.filter(x => x.service.group === grp)
    }
  }
}
</script>
