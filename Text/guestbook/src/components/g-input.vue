<template>
  <div class="root">
    <div
      ref="input"
      class="input"
      contenteditable
      @contextmenu.stop=""
      @keypress="handleKeypress"
      @input="handleInput"
      @keydown.prevent.enter="handleEnter"
    >
      ' ' <br />
    </div>
    <span class="char-counter">{{ `${charCount}/${maxLength}` }}</span>
    <div ref="confirmButton" class="confirm-button" @click="handleEnter">
      <object class="confirm-icon" type="image/svg+xml" :data="require('@/assets/send-icon.svg')">
        <img class="confirm-icon" src="@/assets/send-icon.svg" alt="send button" />
      </object>
    </div>
  </div>
</template>

<script>
// Workaround for mozilla caret bug: https://bugzilla.mozilla.org/show_bug.cgi?id=389321
// Make contenteditable not empty
// By putting Line Separator \U+2028 when it try to be empty
const emptyChar = String.fromCharCode(8232)

export default {
  data: () => ({
    value: '',
  }),
  mounted() {
    this.$refs.input.innerText = emptyChar
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
    handleKeypress(e) {
      if (this.$refs.input.innerText.length >= this.maxLength + 1) {
        e.preventDefault()
      }
    },
    handleInput() {
      // Remove <br> tags added after space caharacters in mozilla
      // This block should be before innerText is setted
      while (this.$refs.input.lastElementChild) {
        this.$refs.input.removeChild(this.$refs.input.lastElementChild)
      }

      const innerText = this.$refs.input.innerText.replace(emptyChar, '')
      this.$emit('input', innerText.trim())

      if (innerText.length === 0) {
        this.$refs.input.innerText = emptyChar
      }

      this.value = innerText
    },
    handleEnter() {
      const innerText = this.$refs.input.innerText.replace(emptyChar, '')
      this.$emit('submit', innerText.trim())
      this.$refs.input.innerText = emptyChar
      this.value = ''
    },
  },
  computed: {
    charCount() {
      return this.value.length
    },
  },
  name: 'gInput',
  props: {
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
  height: inherit;
}
.hide {
  display: none;
}
.input {
  background: $color-secondary-dark;
  color: inherit;

  resize: none;
  display: inline-flex;
  align-items: center;

  overflow-wrap: anywhere;

  border: $border-width solid $color-tetrary;
  border-radius: $border-radius-input;

  padding: 6px 12px;

  width: 100%;
  height: 100%;

  &:focus {
    outline: none;
    border-color: $color-primary;

    + .char-counter {
      display: inline-block;
    }
  }

  &:empty {
    line-height: 100%;
  }
}
.char-counter {
  display: none;
  position: absolute;

  color: $color-tetrary-dark;

  border-radius: 3px;

  top: -$font-size-s;
  right: 5px;

  transform: translateY(-5px);
  font-size: $font-size-s;
}
.confirm-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  right: 0;
  height: 100%;
  transform: translateY(-50%);
  cursor: pointer;

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
