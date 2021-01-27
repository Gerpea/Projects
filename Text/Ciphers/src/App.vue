<template>
  <main>
    <textarea
      class="user-input"
      placeholder="Type something"
      autofocus
      :value="input"
      @input="encryptInput"
    ></textarea>
    <div class="cipher">
      <v-select
        :options="ciphers"
        :value="cipher"
        @input="setCipher"
        :clearable="false"
        :searchable="false"
        class="cipher__selector"
      ></v-select>
      <input
        v-if="cipher.key === 0"
        class="cipher__key cipher__key-number"
        type="number"
        min="0"
        v-model="cipher.params.key"
      />
      <input v-else class="cipher__key cipher__key-text" type="text" v-model="cipher.params.key" />
    </div>
    <textarea class="user-input" :value="encryptedInput" @input="decryptInput"></textarea>
  </main>
</template>

<script>
import { Ciphers, encrypt, decrypt } from './utils/ciphers'
export default {
  name: 'App',
  data: () => ({
    ciphers: Object.keys(Ciphers).map((cipherName) => ({
      label: cipherName,
      key: Ciphers[cipherName],
    })),
    cipher: {
      label: '',
      key: 0,
      params: { key: '' },
    },
    input: '',
    encryptedInput: '',
  }),
  methods: {
    setCipher(value) {
      this.cipher = { ...this.cipher, ...this.ciphers.find((cipher) => cipher.key === value.key) }
      this.encryptedInput = encrypt(this.input, value.key, this.cipher.params)
    },
    decryptInput(event) {
      this.encryptedInput = event.target.value
      this.input = decrypt(event.target.value, this.cipher.key, this.cipher.params)
    },
    encryptInput(event) {
      this.input = event.target.value
      this.encryptedInput = encrypt(event.target.value, this.cipher.key, this.cipher.params)
    },
  },
  watch: {
    'cipher.params.key': {
      handler: function(value) {
        if (this.cipher.key === 0) {
          this.cipher.params.key = parseInt(value) || 0
        }
        this.encryptedInput = encrypt(this.input, this.cipher.key, this.cipher.params)
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.cipher = { ...this.cipher, ...this.ciphers[0] }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  height: 100vh;
  background-color: #070606;
}
body,
input,
textarea,
select {
  color: #fff;
  font-size: 16px;
  font-family: 'Balsamiq Sans', cursive;
}
main {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 7.4% 10% 4.4% 10%;
}
.user-input {
  flex: 1;
  resize: none;
  outline: none;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 10px;
  background: transparent;
  font-size: 1.2rem;
}
.user-input::placeholder {
  color: #999;
}
.user-input:focus {
  border-color: #2cfe10;
}
.cipher {
  display: flex;
  flex-direction: column;
  margin-top: 19px;
  margin-bottom: 19px;
  row-gap: 11px;
}
.cipher__selector {
  height: 33px;
}
.cipher__selector .vs__search::placeholder,
.cipher__selector .vs__dropdown-toggle,
.cipher__selector .vs__dropdown-menu {
  background: #070606;
  border: 1px solid #fff;
}
.cipher__selector .vs__clear,
.cipher__selector .vs__open-indicator {
  fill: #fff;
}
.cipher__selector .vs__selected {
  color: #fff;
}
.cipher__selector .vs__dropdown-option:hover {
  color: #2cfe10;
  background: inherit;
}
.cipher__selector .vs__dropdown-option--highlight {
  color: #555;
  background: inherit;
}
.cipher__key {
  height: 33px;
  background: #070606;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 10px;
  outline: none;
}
.cipher__key-number {
  appearance: textfield;
}
.cipher__key:focus {
  outline: none;
  border-color: #2cfe10;
}
.cipher__key:invalid {
  box-shadow: none;
}
.cipher__key-number::-webkit-inner-spin-button {
  display: none;
}
@media only screen and (min-width: 768px) {
  main {
    position: relative;
    flex-direction: row;
    column-gap: 25px;
    padding: 117px 98px 53px 98px;
  }
  .cipher {
    position: absolute !important;
    flex-direction: row;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    margin: 0;
    margin-top: -31px;
    height: 33px;
    column-gap: 14px;
  }
  .cipher__selector {
    width: 269px;
  }
  .cipher__key-text {
    width: 269px;
  }
  .cipher__key-number {
    width: 70px;
  }
}
</style>
