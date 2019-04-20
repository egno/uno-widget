<template>
  <v-card flat>
    <v-toolbar flat>
      <v-layout column>
        <v-flex>
          {{ serviceGroup }}
        </v-flex>
        <v-flex>
          {{ serviceName }}
        </v-flex>
      </v-layout>
      <v-btn
        flat
        icon
        @click="onRemove"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapActions } from "vuex"

export default {
  props: {
    service: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      //
    }
  },
  computed: {
    duration () {
      return this.service && this.service.service && this.service.service.duration
    },
    price () {
      return this.service && this.service.service && this.service.service.price
    },
    serviceGroup () {
      return this.service && this.service.service && this.service.service.group
    },
    serviceName () {
      return this.service && this.service.service && this.service.service.name
    }
  },
  methods: {
    ...mapActions(['delService']),
    onRemove () {
      this.delService(this.service)
    }
  }
}
</script>
