<template>
  <div class="message" @click="toggleCommentInput">
    <div class="message__content">{{ content }}</div>
    <div v-if="!canWriteComment" class="message__bottom">
      <date-time class="color-tetrary-dark" :dateTime="dateTime" />
    </div>
    <div v-if="canWriteComment" class="message__comments" @click.stop="">
      <g-input :maxLength="150" @submit="sendComment" class="message__comments-input" />
      <div class="message__comments-list">
        <comment v-for="comment in comments" v-bind="comment" :key="comment.id" />
      </div>
    </div>
    <div v-if="canWriteComment" class="message__bottom">
      <date-time class="color-tetrary-dark" :dateTime="dateTime" />
    </div>
  </div>
</template>

<script>
import dateTime from '@/components/date-time.vue'
import gInput from '@/components/g-input.vue'
import comment from '@/components/comment.vue'

import { addComment, getComments } from '@/firebase'

export default {
  data: () => ({
    canWriteComment: true,
    comments: [],
  }),
  mounted() {
    getComments(
      this.$props.id,
      (comment) => this.comments.unshift(comment),
      (comment) => {
        const index = this.comments.findIndex((cmt) => cmt.id === comment.id)
        if (index !== -1) {
          this.comments.splice(index, 1)
        }
      }
    )
  },
  methods: {
    toggleCommentInput() {
      this.canWriteComment = !this.canWriteComment
    },
    sendComment(comment) {
      if (comment && comment.length > 0) {
        addComment(comment, this.id).catch((e) => console.log(e))
      }
    },
  },
  name: 'Message',
  props: {
    id: {
      required: true,
      type: String,
    },
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
    'g-input': gInput,
    'date-time': dateTime,
    comment: comment,
  },
}
</script>

<style lang="scss" scoped>
.message {
  color: inherit;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  border-radius: $border-radius;
  border: $border-width solid $color-tetrary;

  row-gap: 10px;
  padding: 17px;

  width: 100%;

  &:hover {
    border-color: $color-primary;
  }

  &__bottom {
    font-size: $font-size-s;
    width: 100%;
  }

  &__send-comment {
    cursor: auto;
    font-size: 0.8rem;

    margin-top: 7px;
    height: 30px;
  }

  &__comments {
    position: relative;
    cursor: auto;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    row-gap: 10px;

    font-size: $font-size-s;
    width: 100%;
  }

  &__comments-input {
    position: sticky;
    top: 0;
    left: unset;

    height: 30px;
    width: 100%;
  }

  &__comments-list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    max-height: 50vh;
  }
}
</style>
