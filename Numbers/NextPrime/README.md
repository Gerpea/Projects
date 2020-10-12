# Prime Number

**Calculates Primes**

_Uses [AKS](https://www.cse.iitk.ac.in/users/manindra/algebra/primality_v6.pdf/) for check if number is prime or not_

## Table of Contents

1. [Run](#run)
2. [Options](#options)
3. [Example](#examples)

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
    <pre>[<em><b>optional</b></em>] Number to start from
    <em>Default is <b>0</b></em></pre>

### Examples

```bash
$ node index.js -n 1000
Prime is: 1009
Execution time (hr): 7s 972.201189ms
Find next prime? [y/n]: y
Prime is: 1013
Execution time (hr): 3s 643.363394ms
Find next prime? [y/n]: y
Prime is: 1019
Execution time (hr): 5s 543.077853ms
Find next prime? [y/n]: n
```
