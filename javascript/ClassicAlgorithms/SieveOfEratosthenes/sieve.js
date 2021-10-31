exports.sieveEratosthenes = function (n) {
  const is_prime = Array(n).fill(true)
  is_prime[0] = is_prime[1] = false

  const terms = Math.sqrt(n)
  for (let i = 2; i <= terms; i++) {
    if (is_prime[i]) {
      for (let j = i + i; j <= n; j += i) {
        is_prime[j] = false
      }
    }
  }

  return is_prime.map((el, i) => (el ? i : undefined)).filter((el) => el)
}
