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
      return this.service.service.duration
    },
    price () {
      return this.service.service.price
    },
    serviceGroup () {
      return this.service.service.group
    },
    serviceName () {
      return this.service.service.name
    }
  },
  methods: {
    onRemove () {
      this.$emit("delService", this.service)
    }
  }
}
</script>
