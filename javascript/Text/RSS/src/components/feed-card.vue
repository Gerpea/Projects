<template>
  <a class="feed-card" :href="link">
    <div class="feed-card__header">
      {{ title }}
    </div>
    <div v-if="description" class="feed-card__main">
      {{ description }}
    </div>
    <div v-if="author || time" class="feed-card__footer">
      {{ author }}
      <date-time v-if="dateTime" :dateTime="dateTime" />
    </div>
  </a>
</template>

<script>
import dateTime from '../../../Guestbook/src/components/date-time.vue'

export default {
  computed: {
    dateTime() {
      const dt = Date.parse(this.time)
      if (isNaN(dt)) {
        return undefined
      } else {
        return new Date(dt)
      }
    },
  },
  components: { dateTime },
  name: 'feedCard',
  props: {
    title: String,
    description: String,
    author: String,
    time: String,
    link: String,
  },
}
</script>

<style lang="scss" scoped>
.feed-card {
  cursor: pointer;
  text-decoration: none;

  display: flex;
  flex-direction: column;

  color: $color-tetrary;

  border: $border-width solid $color-tetrary;
  border-radius: $border-radius;

  padding: 10px;
  row-gap: 6px;
  margin: 10px 0;

  &:hover {
    border-color: $color-primary;
  }

  &__header {
    font-size: $font-size-l;
  }

  &__main {
    color: $color-tetrary-light;
  }

  &__footer {
    display: flex;
    justify-content: space-between;

    color: $color-tetrary-dark;
    font-size: $font-size-s;
  }
}
</style>
