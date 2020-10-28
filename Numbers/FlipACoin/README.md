# Coin Flip Simulator

**Flip a coin**

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

- **-d**, **--digits**
    <pre>[<em><b>required</b></em>] Number of times to simulate</pre>

- **-o**, **--out**
    <pre>[<em><b>optional</b></em>] Path to save outcomes
    <em>if not specified the outcomes will be output in console</em></pre>

### Examples

```bash
$ node index.js -d 100
THHHHTTTTHTTTTHHTTTTHTTTHHHTHTHTTTTHTHTHHHTHTTHTTTTTTHHTTTHHTTHHHTHTHTTHHTHTTHHHHTTHTHTTTHTTTTTHTTHT
Heads: 41
Tails: 59
Execution time (hr): 0s 4.606397ms
```
