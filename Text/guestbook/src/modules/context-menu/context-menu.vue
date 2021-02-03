<template>
  <div v-if="display" :style="style" class="context-menu" @blur="onBlur" :tabindex="-1">
    <div
      v-for="(item, i) in items"
      :key="i"
      @click="
        (e) => {
          item.onClick(e)
          onBlur(e)
        }
      "
      class="context-menu__item"
    >
      {{ item.label }}
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
  methods: {
    onBlur(e) {
      this.$emit('blur', e)
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
  cursor: pointer;
  color: inherit;

  background: $color-secondary-dark;
  border-radius: $border-radius-input;
  border: $border-width solid $color-tetrary;
  outline: none;

  font-size: $font-size-s;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  row-gap: 6px;

  z-index: 999;

  &__item {
    padding: 5px 10px;

    &:hover {
      color: $color-primary;
    }
  }
}
</style>
