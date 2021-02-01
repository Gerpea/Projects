<template>
  <div class="container">
    <main class="messages">
      <message v-for="message in messages" v-bind="message" :key="message.id" />
    </main>
    <div class="send-message">
      <g-input v-model="message" :maxLength="80" @submit="sendMessage" />
    </div>
  </div>
</template>

<script>
//TODO: add send button to input
//TODO: add placeholder when there is no messages
import gInput from '@/components/g-input.vue'
import message from '@/components/message.vue'
import { messagesCollection } from '@/firebase'

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
  overflow: scroll;
  justify-content: center;
  background: $color-secondary-dark;

  min-height: 100%;
  max-height: 100%;
}

.messages {
  align-items: center;
  display: flex;
  flex-direction: column;

  padding: 20px 20px 73px 20px;
  row-gap: 13px;
}

.send-message {
  min-height: 38px;
  position: absolute;
  bottom: 0;
  right: 50%;
  width: calc(100% - 40px);
  padding: 0 0 12px 0;
  background: $color-secondary-dark;
  transform: translateX(50%);
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
