<template>
  <main>
    <textarea class="user-input" placeholder="Type something" autofocus></textarea>
    <v-select
      :options="ciphers"
      :value="cipher"
      @input="setCipher"
      :reduce="(cipher) => cipher.label"
      :clearable="false"
      :searchable="false"
      class="cipher-selector"
    ></v-select>
    <textarea class="user-input"></textarea>
  </main>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    ciphers: [
      {
        label: 'Ceasar',
      },
      {
        label: 'Vigener',
      },
    ],
    cipher: undefined,
  }),
  methods: {
    setCipher(value) {
      this.cipher = this.ciphers.find((cipher) => cipher.label === value)
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
.cipher-selector {
  height: 33px;
  margin-top: 19px;
  margin-bottom: 19px;
}

.cipher-selector .vs__search::placeholder,
.cipher-selector .vs__dropdown-toggle,
.cipher-selector .vs__dropdown-menu {
  background: #070606;
  border: 1px solid #fff;
}
.cipher-selector .vs__clear,
.cipher-selector .vs__open-indicator {
  fill: #fff;
}
.cipher-selector .vs__selected {
  color: #fff;
}
.cipher-selector .vs__dropdown-option:hover {
  color: #2cfe10;
  background: inherit;
}
.cipher-selector .vs__dropdown-option--highlight {
  color: #555;
  background: inherit;
}
@media only screen and (min-width: 768px) {
  main {
    position: relative;
    flex-direction: row;
    column-gap: 25px;
    padding: 117px 98px 53px 98px;
  }
  .cipher-selector {
    width: 269px;
    margin: 0;
    margin-top: -31px;
    position: absolute !important;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
  }
}
</style>
