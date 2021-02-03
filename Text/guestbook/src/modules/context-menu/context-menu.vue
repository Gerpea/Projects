<template>
  <div v-if="display" :style="style" class="context-menu" @blur="$emit('blur')" :tabindex="-1">
    <div class="menu">
      <div class="menu__item">
        First option
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    style() {
      return {
        left: this.$props.left + 'px',
        top: this.$props.top + 'px',
      }
    },
  },
  name: 'ContextMenu',
  props: {
    items: {
      type: Array,
      required: true,
    },
    left: {
      type: Number,
      default: 0,
    },
    top: {
      type: Number,
      default: 0,
    },
    display: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  background: $color-secondary-dark;
  z-index: 999;
  outline: none;
  cursor: pointer;
}
</style>
