<template>
  <v-container>
    <div v-if="!step">
      <FilialPage
        :filial="filial"
        :filials="filials"
        @onSelectFilial="onSelectFilial($event)"
      />
    </div>
    <div v-if="step == 1">
      Запись
    </div>
  </v-container>
</template>

<script>
import FilialPage from "@/components/FilialPage.vue"

export default {
  components: { FilialPage },
  props: {
    step: { type: Number, default: 0 },
    filial: { type: String, default: "" },
    filials: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      //
    }
  },
  methods: {
    onSelectFilial (payload) {
      if (payload) {
        this.$emit("onSelectFilial", payload)
      }
    }
  }
}
</script>
