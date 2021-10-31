<template>
  <input
    :value="modelValue"
    @input="(e) => $emit('update:modelValue', e.target.value)"
    class="feed-input"
    type="text"
    name="feed-url"
    placeholder="Input feed url"
  />
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
  name: 'feed-input',
}
</script>

<style lang="scss" scoped>
.feed-input {
  background: $color-secondary-dark;
  color: inherit;

  outline: none;
  border: $border-width solid $color-tetrary;
  border-radius: $border-radius-small;

  padding: 10px 16px;

  &:focus {
    border-color: $color-primary;
  }
}
</style>
