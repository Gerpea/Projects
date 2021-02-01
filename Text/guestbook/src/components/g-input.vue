<template>
  <div class="root">
    <input
      class="input"
      type="text"
      :maxlength="maxLength"
      :value="value"
      @input="handleInput"
      @keydown.prevent.enter="handleEnter"
    />
    <span class="char-counter">{{ `${charCount}/${maxLength}` }}</span>
  </div>
</template>

<script>
export default {
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
    handleEnter(e) {
      this.$emit('submit', e.target.value)
    },
  },
  computed: {
    charCount() {
      return this.value.length
    },
  },
  name: 'gInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    maxLength: {
      type: Number,
      default: 10,
    },
  },
}
</script>

<style lang="scss" scoped>
.root {
  position: relative;
  width: 100%;
}
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

    + .char-counter {
      display: inline-block;
    }
  }
}
.char-counter {
  display: none;
  position: absolute;

  color: $color-tetrary-dark;

  border-radius: 3px;

  top: -$font-size-small;
  right: 5px;

  transform: translateY(-5px);
  font-size: $font-size-small;
}
</style>
