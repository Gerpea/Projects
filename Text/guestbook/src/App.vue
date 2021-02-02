<template>
  <div class="container">
    <section v-if="messages.length > 0" class="messages">
      <message v-for="message in messages" v-bind="message" :key="message.id" />
    </section>
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
import { messagesCollection } from '@/firebase'

//TODO: messages should be created throught function
//TODO: add comments to messages
//TODO: remove messages every hour
//TODO: link to messages like on github

export default {
  data: () => ({
    messages: [],
  }),
  mounted() {
    messagesCollection.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data()
        if (change.type === 'added') {
          this.messages.push({
            id: change.doc.id,
            content: data.content,
          })
        }
        if (change.type === 'modified') {
          const message = this.messages.find((message) => message.id === change.doc.id)
          if (message) {
            message.content = data.content
          }
        }
        if (change.type === 'removed') {
          const index = this.messages.findIndex((message) => message.id === change.doc.id)
          if (index !== -1) {
            this.messages.splice(index, 1)
          }
        }
      })
    })
  },
  methods: {
    sendMessage(message) {
      if (message && message.length > 0) {
        messagesCollection.add({
          content: message,
          dateTime: new Date().toUTCString(),
        })
      }
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
  display: flex;
  justify-content: center;
  box-sizing: border-box;

  position: relative;
  height: 100vh;
  width: 100vw;
}

.messages {
  align-items: center;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  width: 100%;
  height: max-content;

  padding: 20px 20px 77px 20px;
  row-gap: 13px;
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
  left: unset; //invalid; /* 1 */
  // transform: translateX(-50%);
  width: calc(100% - 40px);
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
