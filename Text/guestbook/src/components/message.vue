<template>
  <div class="message">
    <div class="message__content">{{ content }}</div>
    <div class="message__bottom">
      <date-time class="color-tetrary-dark" :dateTime="dateTime" />
    </div>
  </div>
</template>

<script>
import dateTime from '@/components/date-time.vue'

export default {
  data: () => ({
    canWriteComment: false,
  }),
  methods: {
    toggleCommentInput() {
      this.canWriteComment = !this.canWriteComment
    },
  },
  name: 'Message',
  props: {
    content: {
      required: true,
      type: String,
      default: '',
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
.message {
  color: inherit;

  border-radius: $border-radius;
  border: 1px solid $color-tetrary;

  display: flex;
  flex-direction: column;
  row-gap: 10px;

  padding: 17px;

  width: 100%;

  &:hover {
    border-color: $color-primary;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    column-gap: 14px;

    font-size: $font-size-small;

    height: 28px;
    width: 100%;

    &-button {
      flex-shrink: 0;
    }
  }
}
</style>
