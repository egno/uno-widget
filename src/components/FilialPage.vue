<template>
  <v-layout column>
    <v-flex>
      Выберите филиал
    </v-flex>
    <v-flex>
      <v-layout column>
        <v-flex
          v-for="f in filials"
          :key="f.id"
        >
          <FilialCard
            :filial="f"
            @onSelectFilial="onSelectFilial($event)"
          />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

import FilialCard from "@/components/FilialCard.vue"
export default {
  components: { FilialCard },
  computed: {
    ...mapGetters(["filial",'filials'])
  },
  methods: {
    ...mapActions(["setFilial", 'setStep']),
    onSelectFilial (payload) {
      this.setFilial(payload)
      this.setStep('main')
    }
  }
}
</script>
