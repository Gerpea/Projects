# Find factorial of n

**Calculates factorial**

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

- **-d**, **--digits**

    <pre>[<em><b>required</b></em>] Number of digits to calculate</pre>

- **-o**, **--out**

    <pre>[<em><b>optional</b></em>] Path to save calculated factorial
    <em>if not specified the calculated</em> <b>factorial</b> <em>will be output in console</em></pre>

- **-r**, **--recursive**
    <pre>[<em><b>optional</b></em>] Use recursive function?</pre>

### Examples

```bash
$ node index.js -d 10
3628800
Execution time (hr): 0s 1.159435ms

$ node index.js -d 10 -r
3628800
Execution time (hr): 0s 1.978627ms
```
