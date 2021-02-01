<template>
  <div class="root">
    <canvas ref="canvas" class="hide"></canvas>
    <textarea
      ref="input"
      class="input"
      type="text"
      :rows="lineCount"
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
  data: () => ({
    lineCount: 1,
  }),
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
    handleEnter(e) {
      this.$emit('submit', e.target.value)
    },
    measureText(value) {
      const context = this.$refs.canvas.getContext('2d')

      const inputFontSize = window.getComputedStyle(this.$refs.input).fontSize
      const inputFontFamily = window.getComputedStyle(this.$refs.input).fontFamily

      context.font = `${inputFontSize} ${inputFontFamily}`

      const width = context.measureText(value).width
      return width
    },
  },
  watch: {
    value(value) {
      const width = this.measureText(value)
      const pL = parseFloat(
        window.getComputedStyle(this.$refs.input).getPropertyValue('padding-left')
      )
      const pR = parseFloat(
        window.getComputedStyle(this.$refs.input).getPropertyValue('padding-right')
      )
      this.lineCount = Math.floor(width / (this.$refs.input.clientWidth - pR - pL) + 1)
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
.hide {
  position: absolute;
  top: -10000px;
  left: -10000px;
}

.input {
  background: $color-secondary-dark;
  color: inherit;
  resize: none;

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
