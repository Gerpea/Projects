<template>
  <main>
    <textarea
      class="user-input"
      placeholder="Type something"
      autofocus
      v-model.trim="input"
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
      <input v-if="cipher" class="cipher__key" type="number" min="0" v-model="key" />
    </div>
    <textarea class="user-input" v-model.trim="encryptedInput"></textarea>
  </main>
</template>

<script>
import { Ciphers, encrypt } from './utils/ciphers'
export default {
  name: 'App',
  data: () => ({
    ciphers: Object.keys(Ciphers).map((cipherName) => ({
      label: cipherName,
      key: Ciphers[cipherName],
    })),
    cipher: undefined,
    input: '',
    encryptedInput: '',
    key: 0,
  }),
  methods: {
    setCipher(value) {
      this.cipher = this.ciphers.find((cipher) => cipher.key === value.key)
    },
  },
  watch: {
    key: function(value) {
      if (value.length === 0) {
        this.key = 0
      }
      this.key = parseInt(this.key, 10)
      this.encryptedInput = encrypt(this.input, this.cipher.key, {
        key: parseInt(this.key, 10).toString(),
      })
    },
    cipher: function(value) {
      this.encryptedInput = encrypt(this.input, value.key, {
        key: this.key,
      })
    },
    input: function(value) {
      this.encryptedInput = encrypt(value, this.cipher.key, {
        key: this.key,
      })
    },
  },
  mounted() {
    this.cipher = this.ciphers[0]
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
  flex-direction: row;
  margin-top: 19px;
  margin-bottom: 19px;
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
  background: #070606;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 10px;
  outline: none;
}
.cipher__key:focus {
  outline: none;
  border-color: #2cfe10;
}
.cipher__key::-webkit-inner-spin-button {
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
    display: flex;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    flex-direction: row;
    margin: 0;
    margin-top: -31px;
    height: 33px;
    column-gap: 14px;
  }
  .cipher__selector {
    width: 269px;
  }

  .cipher__key {
    width: 70px;
  }
}
</style>
