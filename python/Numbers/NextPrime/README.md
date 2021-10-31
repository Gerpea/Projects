# Prime Number

**Calculates Primes**

_Uses [AKS](https://www.cse.iitk.ac.in/users/manindra/algebra/primality_v6.pdf/) for check if number is prime or not_

## Table of Contents

1. [Run](#run)
2. [Options](#options)
3. [Example](#examples)

## Run

```bash
python main.py [options]
```

### Options

- **-n**, **--number**
    <pre>[<em><b>optional</b></em>] Number to start from
    <em>Default is <b>0</b></em></pre>

### Examples

```bash
$ python main.py -n 1000
Prime is: 1009
Execution time: 0s 711.571ms
Find next prime? (y/n): y
Prime is: 1013
Execution time: 0s 341.796ms
Find next prime? (y/n): y
Prime is: 1019
Execution time: 0s 516.510ms
Find next prime? (y/n): n
```
