<template>
  <v-toolbar
    flat
    dark
    :color="color"
    class="round-toolbar"
    :class="{'done-mode':done}"
  >
    <v-toolbar-title>
      <slot />
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      outline
      fab
      light
      :color="color"
      class="toolbar-button"
      @click="$emit('click')"
    >
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: "arrow_forward" },
    done: { type: Boolean, default: false },
    iconColor: {type: String, default: 'primary'}
  },
  computed: {
    color () {
      return (this.done) ? 'grey' : 'primary'
    }
  }
}
</script>

<style lang="scss" scoped>
.round-toolbar {
  padding-left: 10px !important;
  border-radius: 0 30px 30px 30px !important;
}
.toolbar-button {
    margin-right: -16px;
    background-color: white !important;
}
.done-mode {
  border-radius: 30px 30px 30px 0 !important;
}
</style>

