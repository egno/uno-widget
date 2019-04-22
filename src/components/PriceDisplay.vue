<template>
  <span>
    <span> &#8381; </span>
    {{ prefix }} {{ displayValue }} руб.
  </span>
</template>

<script>
export default {
    props: {
        value: {type: Number, default: undefined},
        prefix: {type: String, default: ''}
    },
    computed: {
        displayValue () {
            return (this.value || ' - ')
        }
    }
}
</script>
