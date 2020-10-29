# Credit Card Validator

**Validate a credit card using [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm)**

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

- **-c**, **--card**
    <pre>[<em><b>required</b></em>] Credit card number</pre>

### Examples

```bash
$ node index.js -c 4561-2612-1234-5467
The card is valid
Execution time (hr): 0s 0.061659ms
```
