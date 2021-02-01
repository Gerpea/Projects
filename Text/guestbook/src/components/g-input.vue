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
    <div ref="confirmButton" class="confirm-button" @click="handleEnter">
      <object class="confirm-icon" type="image/svg+xml" :data="require('@/assets/send-icon.svg')">
        <img class="confirm-icon" src="@/assets/send-icon.svg" alt="send button" />
      </object>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    lineCount: 1,
  }),
  mounted() {
    this.$refs.confirmButton.style.width = this.$refs.confirmButton.clientHeight + 'px'
    this.$refs.confirmButton.childNodes.forEach((child) => {
      child.style.height =
        this.$refs.confirmButton.clientHeight *
          (parseFloat(window.getComputedStyle(child).getPropertyValue('max-height')) / 100) +
        'px'
    })
    this.$refs.input.style.paddingRight =
      this.$refs.confirmButton.offsetWidth +
      parseFloat(
        window.getComputedStyle(this.$refs.confirmButton).getPropertyValue('margin-left')
      ) +
      'px'
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
    handleEnter() {
      this.$emit('submit', this.$refs.input.value)
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
  display: none;
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
.confirm-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  position: absolute;
  top: 50%;
  right: 0;
  height: 100%;
  transform: translateY(-50%);
  cursor: pointer !important;

  filter: invert(78%) sepia(13%) saturate(89%) hue-rotate(314deg) brightness(102%) contrast(87%);

  &:hover {
    filter: invert(80%) sepia(12%) saturate(6104%) hue-rotate(58deg) brightness(97%) contrast(118%);
  }
}
.confirm-icon {
  pointer-events: none;
  width: 100%;
  max-height: 70%;
  display: inline-block;
  background-size: cover;
}
</style>
