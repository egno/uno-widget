<template>
  <v-card
    flat
    class="round"
  >
    <v-card-title>
      <v-layout
        column
        fill-height
        align-start
        justify-center
      >
        <v-flex xs-12>
          <v-layout row>
            <v-flex
              v-if="date"
              xs-6
            >
              <h3>{{ displayDate }},</h3>
            </v-flex>
            <v-flex
              v-if="time"
              xs-6
            >
              <h3>{{ time }}</h3>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-spacer />
      <v-btn
        flat
        icon
        color="#dee1e9"
        @click="onRemove()"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-title>
  </v-card>
</template>

<script>
import { displayFullDate } from "@/utils"
import { mapActions, mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters(["date", "time"]),
    displayDate () {
      return displayFullDate(this.date)
    }
  },
  methods: {
    ...mapActions(["setDate", "setTime"]),
    onRemove () {
      this.setDate(), this.setTime()
    }
  }
}
</script>
