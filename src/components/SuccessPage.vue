<template>
  <v-card
    flat
    class="rounded"
  >
    <v-card-text>
      <v-layout column>
        <v-flex>
          <h2>Вы записаны</h2>
        </v-flex>
        <v-flex>
          <span class="body-2">на {{ date }}, в {{ time }}</span>
        </v-flex>
        <v-flex>
          <span class="caption">к мастеру</span> {{ master }}
        </v-flex>
        <v-flex class="pb-0">
          <span class="caption">на {{ servicesCountDisplay }}:</span>
        </v-flex>
        <v-flex
          v-for="(service, n) in services"
          :key="service.id"
          class="py-0"
        >
          <span>{{ service.name }}</span>
          <span v-if="n < (servicesCount - 1)">,</span>
        </v-flex>
        <v-flex class="pt-4">
          <span class="caption">
            Менеджер салона свяжется с вами для подтверждения записи
          </span>
        </v-flex>
      </v-layout>
    </v-card-text>
    <ButtonToolbar
      icon="add"
      @click="newVisit"
    >
      <v-layout column>
        <v-flex>
          Создать новую запись
        </v-flex>
      </v-layout>
    </ButtonToolbar>
  </v-card>
</template>

<script>
import { numberText, displayFullDate, displayRESTTime } from "@/utils"
import { mapActions, mapGetters } from "vuex"
import ButtonToolbar from "@/components/ButtonToolbar.vue"

export default {
  components: { ButtonToolbar },
  data () {
    return {
      //
    }
  },
  computed: {
    ...mapGetters(["apiResult"]),
    visit () {
      return this.apiResult && this.apiResult[0] && this.apiResult[0].j
    },
    services () {
      return this.visit && this.visit.services
    },
    servicesCount () {
      return this.services && this.services.length
    },
    servicesCountDisplay () {
      const forms = ["% услугу", "% услуги", "% услуг"]
      return this.servicesCount && numberText(this.servicesCount || 0, forms)
    },
    ts () {
      return this.apiResult && this.apiResult[0] && this.apiResult[0].ts_begin
    },
    date () {
      return displayFullDate(this.ts)
    },
    time () {
      return displayRESTTime(this.ts)
    },
    master () {
      return this.visit && [this.visit.master.name, this.visit.master.surname].join(' ')
    }
  },
  mounted () {
    this.clearVisit()
  },
  methods: {
    ...mapActions(["setStep", "clearVisit"]),
    newVisit () {
      this.setStep("main")
    }
  }
}
</script>

<style scoped>
.caption {
  color: grey;
}
</style>
