<template>
  <v-card flat class="round">
    <v-card-title>
      <v-layout column fill-height align-start justify-center>
        <v-flex xs-12>
          <v-layout row>
            <v-flex v-if="date" xs-6>
              <h3>{{ displayDate }},</h3>
            </v-flex>
            <v-flex v-if="time" xs-6>
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
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters(['date', 'time']),
    displayDate () {
      let d = new Date(this.date)
      return d.toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).replace(' г.','')
    }
  }
}
</script>
