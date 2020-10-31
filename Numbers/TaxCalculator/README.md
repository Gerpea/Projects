# Tax Calculator

**Calculates cost with tax**

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

- **-c**, **--cost**

    <pre>[<em><b>required</b></em>] The cost</pre>

- **-t**, **--tax**

    <pre>[<em><b>required</b></em>] The tax in percent</pre>

### Examples

```bash
$ node index.js -c 123 -t 12.3
The tax is: 12.3%
The total cost with tax: 138.129
Execution time (hr): 0s 1.011302ms
```
