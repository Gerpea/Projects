<template>
  <div class="feed-list">
    <feed-card v-for="(f, i) of feed" :key="i" v-bind="f" />
  </div>
</template>

<script>
import feedCard from '@/components/feed-card.vue'

export default {
  name: 'feedList',
  props: {
    feed: Array,
  },
  components: {
    feedCard,
  },
}
</script>

<style lang="scss" scoped>
.feed-list {
  height: 100%;
}
</style>
