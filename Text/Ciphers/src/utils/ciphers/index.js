import { encrypt as encryptCeasar, decrypt as decryptCeasar } from './ceasar'
import { encrypt as encryptVigenere, decrypt as decryptVigenere } from './vigenere'
import { encrypt as encryptVernam, decrypt as decryptVernam } from './vernam'
import { Ciphers } from './const'

function encrypt(value, chiper, params) {
  switch (chiper) {
    case Ciphers.Ceasar:
      return encryptCeasar(value, params)
    case Ciphers.Vigenere:
      return encryptVigenere(value, params)
    case Ciphers.Vernam:
      return encryptVernam(value, params)
  }
}
function decrypt(value, chiper, params) {
  switch (chiper) {
    case Ciphers.Ceasar:
      return decryptCeasar(value, params)
    case Ciphers.Vigenere:
      return decryptVigenere(value, params)
    case Ciphers.Vernam:
      return decryptVernam(value, params)
  }
}

export { Ciphers, encrypt, decrypt }
