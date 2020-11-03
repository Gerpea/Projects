# Sieve of Eratosthenes

**Find all small prime numbers with [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)**

## Table of Contents

1. [Run](#run)
2. [Options](#options)
3. [Examples](#examples)

## Run

```bash
npm install
```

```bash
node index.js [options]
```

or

```bash
npm run start -- [options]
```

### Options

- **-n**, **--number**

    <pre>[<em><b>required</b></em>] Number to look for</pre>

- **-o**, **--out**

    <pre>[<em><b>optional</b></em>] Path to save primes
    <em>if not specified the calculated</em> <b>primes</b> <em>will be output in console</em></pre>

### Examples

```bash
$ node index.js -n 100
2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
Execution time (hr): 0s 0.107248ms
```
