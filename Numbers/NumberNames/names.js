const { ones, powers, operations } = require('./const')

function convert(number) {
  let result = ''

  const length = number.length
  let i = 0
  do {
    let subNumber = ''

    let j = 0
    do {
      subNumber = number.substr(i, length - j - i)
      j++
    } while (!ones.hasOwnProperty(subNumber))

    subNumber += new Array(j - 1).fill('0').join('')
    if (ones.hasOwnProperty(subNumber)) {
      result += ones[subNumber]
      i += number.substr(i).length - (j - 1)
    } else {
      if (ones.hasOwnProperty(number.substr(i, length - j))) {
        result += ones[number.substr(i, length - j)]
        result += ' '
        result += powers[j - i]
      } else {
        result += ones[number.substr(i, length - (j - 1))]
        result += ' '
        result += powers[j - 1]
      }
      const fnzi = number.substr(i + 1).search(/[^0]/)
      if (fnzi !== -1) {
        i += fnzi + 1
      } else {
        i += j + 1
      }
    }

    if (i <= number.length - 1) {
      result += ' '
    }
  } while (i < length)

  return result
  // if (number.length < 3) {
  //   if (number[0] === operations['-']) {
  //     return `minus ${lt20(number)}`
  //   } else {
  //     return lt20(number)
  //   }
  // }
  // let result = ''
  // if (number[0] === '-') {
  //   result += 'minus '
  //   number = number.substr(1)
  // }
  // let det = ''
  // const [integer, fractional] = number.split('.')
  // for (let i = 0; i < integer.length - 2; i++) {
  //   det += integer[i]
  //   if (det.match(/[^0+]/)) {
  //     if (b.hasOwnProperty(integer.length - i)) {
  //       result += `${convert(det)} ${b[integer.length - i]} `
  //       det = ''
  //     }
  //   }
  // }
  // result += `${lt20(integer.substr(integer.length - 2))}`
  // if (fractional && fractional.length > 0) {
  //   result += ' point '
  //   det = ''
  //   for (let i = 0; i < fractional.length - 2; i++) {
  //     det += fractional[i]
  //     if (det.match(/[^0+]/)) {
  //       if (b.hasOwnProperty(fractional.length - i)) {
  //         result += `${convert(det)} ${b[fractional.length - i]} `
  //         det = ''
  //       }
  //     }
  //   }
  //   result += `${lt20(fractional.substr(fractional.length - 2))}`
  // }
  // return result
}

function lt20(number) {
  if (number === '00') {
    return ''
  }

  if (a.hasOwnProperty(number)) {
    return `${a[number] || ''} `
  } else {
    return `${a[number.toString().substr(0, 1) + '0'] || ''} ${
      a[number.toString().substr(1, 1)] || ''
    } `
  }
}

module.exports = { convert }
