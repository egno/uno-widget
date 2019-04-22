<template>
  <span>
    <v-icon small>access_time</v-icon>
    {{ displayValue }}
  </span>
</template>

<script>
import {numberText} from '@/utils'

export default {
    props: {
        value: {type: Number, default: undefined}
    },
    computed: {
        displayValue () {
          if (!this.value) return '- мин.'
          const hours = ~~(this.value / 60)
          const minutes = this.value % 60
          if (!hours) return `${minutes} мин.`
          if (!minutes) return numberText(hours, ["час", "часа", "часов"])
          if (minutes === 30) return `${hours},5 часа`
          return `${numberText(hours, ["час", "часа", "часов"])} ${minutes} мин.`
        }
    }
}
</script>
