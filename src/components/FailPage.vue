<template>
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
    <v-flex>
      <v-card>
        <v-toolbar>
          <v-layout column>
            <v-flex>
              Вернуться
            </v-flex>
          </v-layout>
          <v-btn
            flat
            icon
            @click="editVisit()"
          >
            <v-icon>arrow_back</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
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
