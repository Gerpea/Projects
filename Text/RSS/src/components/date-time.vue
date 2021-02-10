<template>
  <span>{{ dt }}</span>
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
  name: 'dateTime',
  props: {
    dateTime: Date,
  },
}
</script>
