<template>
  <div class="container">
    <transition-group v-if="messages.length > 0" class="messages" name="messages" tag="div">
      <message
        v-for="message in messages"
        v-bind="message"
        :key="message.id"
        :class="{ selected: message.id === getIdFromLink() }"
      />
    </transition-group>
    <section v-else class="messages-empty">
      There is no messages. Write one
    </section>
    <div class="send-message">
      <g-input :maxLength="150" @submit="sendMessage" />
    </div>
  </div>
</template>

<script>
import gInput from '@/components/g-input.vue'
import message from '@/components/message.vue'
import { addMessage, getMessages } from '@/firebase'

//TODO: refactor
//TODO: fix issues with mobile devices
// * - when many comments they shrink padding
// * - when scroll comments first comments appears on top of input
// * - scroll in safari
//TODO: animate

export default {
  data: () => ({
    messages: [],
  }),
  mounted() {
    getMessages(
      (message) => this.messages.push(message),
      (message) => {
        const index = this.messages.findIndex((msg) => msg.id === message.id)
        if (index !== -1) {
          this.messages.splice(index, 1)
        }
      }
    )
  },
  methods: {
    sendMessage(message) {
      if (message && message.length > 0) {
        addMessage(message).catch((e) => console.log(e))
      }
    },
    getIdFromLink() {
      return location.hash.slice(1)
    },
  },
  name: 'App',
  components: {
    'g-input': gInput,
    message: message,
  },
}
</script>

<style lang="scss" scoped>
.container {
  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  justify-content: center;
  box-sizing: border-box;

  position: relative;
  height: 100vh;
  width: 100vw;
}

.messages {
  overflow: hidden;
  align-items: center;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  padding: 20px 20px 77px 20px;

  width: 100%;
  height: max-content;

  > * {
    margin: 6.5px 0;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
}
.messages-empty {
  display: flex;
  align-items: center;
  justify-content: center;

  color: $color-primary-light;

  height: 100vh;
}
/* 
  1. Left is unset to center element, cause transform translate
  calculate element width with border incorrect
  https://stackoverflow.com/questions/66004597/is-an-invalid-css-left-property-acceptable
*/
.send-message {
  box-sizing: border-box;
  min-height: 38px;
  position: fixed;
  border-radius: $border-radius-input;
  bottom: 12px;
  left: 50%; //invalid; /* 1 */
  transform: translateX(-50%);
  width: calc(100% - 40px);
  display: flex;
  justify-content: center;
  align-content: center;
}
.selected {
  animation: blur-out 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

@keyframes blur-out {
  50% {
    transform: scale(1.005);
    filter: blur(0.5px);
    border-color: $color-primary-dark;
  }
}

.messages-enter-active,
.messages-leave-active {
  transition: all 0.2s;
}
.messages-enter,
.messages-leave-to {
  opacity: 0;
}
</style>
