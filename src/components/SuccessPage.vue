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
          <span class="caption">к мастеру</span> {{ [apiResult.j.master.name,apiResult.j.master.surname].join(' ') }}
        </v-flex>
        <v-flex class="pb-0">
          <span class="caption">на {{ servicesCountDisplay }}:</span>
        </v-flex>
        <v-flex v-for="(service, n) in services" :key="service.service.id" class="py-0">
          <span>{{ service.service.name }}</span>
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
import {numberText} from '@/utils'
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
    ...mapGetters(["apiResult","employee", "services", "date", "time",'servicesCount']),
    servicesCountDisplay () {
            const forms = [
                "% услугу",
                "% услуги",
                "% услуг"
            ]
            return this.servicesCount && numberText(this.servicesCount || 0, forms)
        },
  },
  methods: {
    ...mapActions(["setStep"]),
    newVisit () {
      this.setStep("main")
    }
  }
}
</script>

<style scoped>
.caption {
  color:grey
}
</style>
