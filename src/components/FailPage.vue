<template>
  <v-card
    flat
    class="rounded"
  >
    <v-card-text>
      <v-layout column>
        <v-flex>
          Вы опоздали!
        </v-flex>
        <v-flex>
          <span>
            Услуга не может быть оказана.<br>
            Измените параметы подбора.
          </span>
        </v-flex>
      </v-layout>
    </v-card-text>
    <ButtonToolbar
      icon="arrow_back"
      @click="editVisit"
    >
      <v-layout column>
        <v-flex>
          Вернуться
        </v-flex>
      </v-layout>
    </ButtonToolbar>
  </v-card>
</template>

<script>
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
    ...mapGetters(["employee", "services", "date", "time"])
  },
  methods: {
    ...mapActions(["setStep"]),
    editVisit () {
      this.setStep("main")
    }
  }
}
</script>
