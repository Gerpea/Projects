<template>
  <div class="root">
    <multiselect v-model="value" :options="options" class="filter" /></div
></template>

<script>
import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js'

export default {
  name: 'Filters',
  data: () => ({
    value: null,
    options: ['Date', 'Comments'],
  }),
  components: {
    multiselect: Multiselect,
  },
}
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  column-gap: 40px;
}
.filter {
  width: 100%;
}
</style>
