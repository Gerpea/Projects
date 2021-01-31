<template>
  <input class="input" type="text" />
</template>

<script>
export default {
  name: 'gInput',
}
</script>

<style lang="scss" scoped>
.input {
  background: $color-secondary-dark;
  color: inherit;

  border: $border-width solid $color-tetrary;
  border-radius: $border-radius-input;

  padding: 6px 12px;

  width: 100%;
  min-width: 0;
  height: inherit;

  &:focus {
    border-color: $color-primary;
  }
}
</style>
