<template>
  <div class="comment">
    <div class="comment__content">{{ content }}</div>
    <div class="comment__bottom">
      <date-time class="color-tetrary-dark" :dateTime="dateTime" />
    </div>
  </div>
</template>

<script>
import dateTime from '@/components/date-time.vue'

export default {
  name: 'Comment',
  props: {
    content: {
      required: true,
      type: String,
    },
    dateTime: {
      type: Date,
      default: function() {
        return new Date()
      },
    },
  },
  components: {
    'date-time': dateTime,
  },
}
</script>

<style lang="scss" scoped>
.comment {
  color: inherit;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  border-radius: $border-radius;
  border: $border-width solid $color-tetrary;

  padding: 10px;

  width: 100%;

  > * {
    margin: 3px 0;
  }
  > *:first-child {
    margin-top: 0;
  }
  > *:last-child {
    margin-bottom: 0;
  }

  &__bottom {
    font-size: $font-size-xs;
    width: 100%;
  }
}
</style>
