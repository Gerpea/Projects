exports.fizzBuzz = function (rightLimit) {
  return Array.apply(0, Array(rightLimit))
    .map(function (_, index) {
      return (++index % 3 ? '' : 'Fizz') + (index % 5 ? '' : 'Buzz') || index
    })
    .join('\n')
}
