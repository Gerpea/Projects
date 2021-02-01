<template>
  <div class="container">
    <section v-if="messages.length > 0" class="messages">
      <message v-for="message in messages" v-bind="message" :key="message.id" />
    </section>
    <section v-else class="messages-empty">
      There is no messages. Write one
    </section>
    <div class="send-message">
      <g-input v-model="message" :maxLength="80" @submit="sendMessage" />
    </div>
  </div>
</template>

<script>
import gInput from '@/components/g-input.vue'
import message from '@/components/message.vue'
import { messagesCollection } from '@/firebase'

//TODO: desktop layout
//TODO: messages should be created throught function

export default {
  data: () => ({
    message: undefined,
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
    sendMessage() {
      if (this.message && this.message.length > 0) {
        messagesCollection.add({
          content: this.message,
          dateTime: new Date().toUTCString(),
        })
      }
      this.message = ''
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

  position: relative;
  height: 100vh;
  width: 100vw;
}

.messages {
  align-items: center;
  display: flex;
  flex-direction: column;

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
.send-message {
  min-height: 38px;
  position: fixed;
  border-radius: $border-radius-input;
  bottom: 12px;
  right: 50%;
  width: calc(100% - 40px);
  transform: translateX(50%);
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
