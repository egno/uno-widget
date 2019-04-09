<template>
  <div>
    <div>
      <div v-if="step">
        back
      </div>
      <div v-else>
        close
      </div>
    </div>
    <div v-if="logo">
      <img :src="logo">
    </div>
    <div>
      <div v-if="filial">
        <div>{{ filialCity }}</div>
        <div>
          {{ filialAddress }}
        </div>
      </div>
      <div v-else>
        Online запись
      </div>
    </div>
    <div v-if="canChangeFilial">
      {{ filials.length }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: { type: Number, default: 0 },
    filial: { type: String, default: "" },
    filials: {
      type: Array,
      default () {
        return []
      }
    },
    logo: {type: String, default: ''}
  },
  computed: {
    canChangeFilial () {
      return this.filial && this.filials.length > 1
    },
    filialCity () {
      return (
        this.selectedFilial &&
        this.selectedFilial.j &&
        this.selectedFilial.j.address &&
        this.selectedFilial.j.address.addressComponents &&
        this.selectedFilial.j.address.addressComponents.filter(
          x => x.kind === "locality"
        )[0]["name"]
      )
    },
    filialAddress () {
      return (
        this.selectedFilial &&
        this.selectedFilial.j &&
        this.selectedFilial.j.address &&
        this.selectedFilial.j.address.cityAddress
      )
    },
    selectedFilial () {
      return (
        this.filial &&
        this.filials.length &&
        this.filials.filter(x => x["id"] === this.filial)[0]
      )
    }
  }
}
</script>
