<template>
  <v-layout column>
    <v-flex>
      <v-btn @click="goPage('date')">
        Выбрать дату
      </v-btn>
    </v-flex>
    <v-flex>
      <v-btn @click="goPage('service')">
        Выбрать услугу
      </v-btn>
    </v-flex>
    <v-flex>
      <v-btn @click="goPage('employee')">
        Выбрать мастера
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    goPage (page) {
      this.$emit("goPage", page)
    }
  }
}
</script>
