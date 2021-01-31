<template>
  <button
    @click="$emit('click')"
    ref="button"
    class="button"
    :style="{ width: width, height: height }"
  >
    <slot>+</slot>
  </button>
</template>

<script>
export default {
  data: () => ({
    w: null,
    h: null,
  }),
  mounted() {
    if (this.$props.squared) {
      const min = Math.min(this.$refs.button.offsetWidth, this.$refs.button.offsetHeight)
      this.w = min
      this.h = min
    } else {
      this.w = this.$refs.button.offsetWidth
      this.h = this.$refs.button.offsetHeight
    }
  },
  computed: {
    width: function() {
      return this.w + 'px'
    },
    height: function() {
      return this.h + 'px'
    },
  },
  name: 'gButton',
  props: {
    squared: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
.button {
  color: inherit;
  cursor: pointer;

  background: $color-secondary-dark;
  border: $border-width solid $color-tetrary;
  border-radius: $border-radius;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;
  margin: 0;

  width: 100%;
  height: 100%;

  &:hover {
    border-color: $color-primary;
  }
  &:active {
    color: $color-primary-dark;
  }
}
</style>
