<template>
  <div class="container">
    <main class="messages">
      <message v-for="message in messages" v-bind="message" :key="message.id" />
    </main>
    <div class="send-message">
      <g-input class="input" />
    </div>
  </div>
</template>

<script>
//TODO: connect to firebase
import gInput from '@/components/g-input.vue'
import message from '@/components/message.vue'

export default {
  data: () => ({
    messages: [
      {
        id: 1,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis elit ante. Donec egestas venenatis erat vitae sollicitudin. Donec efficitur ex',
        dateTime: new Date(),
      },
      {
        id: 2,
        content: 'Message2',
        dateTime: new Date(),
      },
      {
        id: 3,
        content: 'Message3',
        dateTime: new Date(),
      },
      {
        id: 4,
        content: 'Message4',
        dateTime: new Date(),
      },
    ],
  }),
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
  width: 100%;
  padding: 0 20px 12px 20px;
  background: $color-secondary-dark;
  transform: translateX(50%);
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
