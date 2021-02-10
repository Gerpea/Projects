<template>
  <div class="feed-app">
    <feed-input v-model="feedUrl" @keypress.enter="handleSubmit" />
    <feed-list :feed="feed" />
  </div>
</template>

<script>
import feedInput from './components/feed-input.vue'
import feedList from './components/feed-list.vue'
import rssParses from 'rss-parser'

export default {
  data: () => ({
    feedUrl: undefined,
    feed: [],
  }),
  methods: {
    async handleSubmit() {
      try {
        const CORS_PROXY = 'http://localhost:5000/'
        this.feed = (await new rssParses().parseURL(CORS_PROXY + this.feedUrl)).items.map(
          (item) => ({
            title: item.title,
            description: item.contentSnippet,
            author: item.creator,
            time: item.isoDate,
            link: item.link,
          })
        )
      } catch (e) {
        console.error(e)
      }
      this.feedUrl = undefined
    },
  },
  components: { feedList, feedInput },
  name: 'App',
}
</script>

<style lang="scss">
.feed-app {
  overflow: scroll;

  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 33.6px 20px 33.6px 20px;
  position: relative;

  > *:first-child {
    position: sticky;
    top: 0;
    width: 100%;
  }

  > *:last-child {
    margin-top: 53.6px;
  }
}
</style>
