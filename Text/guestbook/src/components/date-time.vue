<template>
  <div class="date-time">{{ dt }}</div>
</template>

<script>
export default {
  computed: {
    dt: function() {
      return new Intl.DateTimeFormat(navigator.language || navigator.userLanguage, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(this.$props.dateTime)
    },
  },
  name: 'DateTime',
  props: {
    dateTime: {
      type: Date,
      default: function() {
        return new Date()
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
