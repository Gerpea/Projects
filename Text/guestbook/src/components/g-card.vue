<template>
  <div class="g-card" :class="[`g-card--${size}`]">
    <slot name="header" class="g-card__header"></slot>
    <slot name="main" class="g-card__main"></slot>
    <slot name="footer" class="g-card__footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'gCard',
  props: {
    size: {
      type: String,
      default: 'n',
      validator: function(value) {
        return ['n', 's'].indexOf(value) !== -1
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.g-card {
  color: $color-tetrary;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  border-radius: $border-radius;
  border: $border-width solid $color-tetrary;

  width: 100%;

  &--s {
    font-size: $font-size-s;
    padding: 10px;
  }

  &--m {
    font-size: $font-size-m;

    padding: 17px;
  }

  &:hover {
    border-color: $color-primary;
  }

  &__header {
    font-size: $font-size-l;
  }

  &__main {
    font-size: $font-size-m;
  }
  &__footer {
    font-size: $font-size-s;
  }
}
</style>
