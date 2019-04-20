<template>
  <v-layout column>
    <v-flex>
      Вы записаны
    </v-flex>
    <v-flex>
      на {{ date }}, в {{ time }}
    </v-flex>
    <v-flex>
      к мастеру {{ employee.name }}
    </v-flex>
    <v-flex>
      на {{ servicesCountDisplay }}
    </v-flex>
    <v-flex>
      <span>
        Менеджер салона свяжется с вами для подтверждения записи
      </span>
    </v-flex>
    <v-flex>
      <v-card>
        <v-toolbar>
          <v-layout column>
            <v-flex>
              Создать новую запись
            </v-flex>
          </v-layout>
          <v-btn
            flat
            icon
            :disabled="loading"
            @click="newVisit()"
          >
            <v-icon>add</v-icon>
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
    newVisit () {
      this.setStep("main")
    }
  }
}
</script>
