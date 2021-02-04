<template>
  <div
    :id="id"
    class="message"
    @click="toggleCommentInput"
    @contextmenu.prevent.stop="(e) => showContextMenu(e, id)"
  >
    <div class="message__content">{{ content }}</div>
    <div v-if="canWriteComment" class="message__comments" @click.stop="">
      <g-input :maxLength="150" @submit="sendComment" class="message__comments-input" />
      <transition-group class="message__comments-list" name="comments" tag="div">
        <comment v-for="comment in comments" v-bind="comment" :key="comment.id" />
      </transition-group>
    </div>
    <div class="message__bottom">
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
    canWriteComment: false,
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
    showContextMenu(e, id) {
      this.$contextMenu.show({
        items: [
          {
            label: 'Copy link',
            onClick: () => {
              copyToClipboard(location.origin + '/#' + id)
            },
          },
        ],
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        offset: {
          x: 15,
          y: -5,
        },
      })
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

function copyToClipboard(str) {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
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

  padding: 17px;

  > * {
    margin: 5px 0;
  }
  > *:first-child {
    margin-top: 0;
  }
  > *:last-child {
    margin-bottom: 0;
  }

  width: 100%;

  transition: all 0.2s;

  &:hover {
    border-color: $color-primary;
  }

  &__content {
    font-size: $font-size-l;
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
    overflow-y: auto;
    overflow-x: hidden;

    display: flex;
    flex-direction: column;

    cursor: auto;

    > * {
      margin: 5px 0;
    }
    > *:first-child {
      margin-top: 0;
    }
    > *:last-child {
      margin-bottom: 0;
    }

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
    font-size: $font-size-s;
    display: flex;
    flex-direction: column;

    > * {
      margin: 5px 0;
    }
    > *:first-child {
      margin-top: 0;
    }
    > *:last-child {
      margin-bottom: 0;
    }

    height: auto;
    max-height: 50vh;
  }
}
.comments-enter-active,
.comments-leave-active {
  transition: all 0.2s;
}
.comments-enter,
.comments-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
