<template>
  <v-layout column>
    <v-flex>
      Выберите филиал
    </v-flex>
    <v-flex>
      <v-layout column>
        <v-flex
          v-for="f in filials"
          :key="f.id"
        >
          <FilialCard :filial="f" @onSelectFilial="onSelectFilial($event)" />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import FilialCard from '@/components/FilialCard.vue'
export default {
  components:{FilialCard},
  props: {
    filial: { type: String, default: "" },
    filials: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods:{
    onSelectFilial (payload){
      if (payload) {
        this.$emit("onSelectFilial", payload)
      }
    }
  }
}
</script>
