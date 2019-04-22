<template>
  <v-toolbar
    flat
    dark
    :color="barColor"
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
      :color="barColor"
      class="toolbar-button"
      @click="$emit('click')"
    >
      <v-icon :color="iconColor || barColor">
        {{ icon }}
      </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: "arrow_forward" },
    done: { type: Boolean, default: false },
    color: {type: String, default: 'primary'},
    iconColor: {type: String, default: ''}
  },
  computed: {
    barColor () {
      return (this.done) ? 'grey' : (this.color)
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

