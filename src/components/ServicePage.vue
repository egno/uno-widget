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
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex v-if="servicesCount">
      <v-card flat>
        <SelectedServices />
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
import { mapActions, mapGetters } from "vuex"

export default {
  components: { SelectedServices, ServiceCard },
  data () {
    return {
      allServices: [],
      searchString: ""
    }
  },
  computed: {
    ...mapGetters(['filialId','services','servicesCount','duration', 'price']),
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
    ...mapActions(['setStep']),
    load () {
      if (!this.filialId) return
      Api()
        .post("rpc/free_service", {
          dt: timestampLocalISO(),
          business_id: this.filialId
        })
        .then(res => {
          this.allServices = res.data
        })
    },
    onNext () {
      this.setStep('main')
    },
    servicesInGroup (grp) {
      return this.filteredServices.filter(x => x.service.group === grp)
    }
  }
}
</script>
