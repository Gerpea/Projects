# Happy Numbers

**Find [Happy Numbers](https://en.wikipedia.org/wiki/Happy_number)**

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

- **-c**, **--check**
    <pre>[<em><b>optional</b></em>] Find out if the number is happy</pre>

- **-f**, **--first**
    <pre>[<em><b>optional</b></em>] Find first n happy number
    <em>default value: 8</em></pre>

### Examples

```bash
$ node index.js -c 19 -f 19
true
Execution time (hr): 0s 0.062697ms
1, 10, 19, 28, 37, 46, 55, 64, 73, 82, 91, 100, 109, 118, 127, 136, 145, 154, 163
Execution time (hr): 0s 0.304271ms
```
