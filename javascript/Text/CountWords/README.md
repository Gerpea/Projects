# Count Words

**Count Words**

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

- **-s**, **--str**

    <pre>[<em><b>optional</b></em>] String where count words</pre>

or

- **-f**, **--file**

    <pre>[<em><b>optional</b></em>] File where count words</pre>

### Examples

```bash
$ node index.js -s 'Lorem ipsum dolor ames ames dolor ipsum dolor'
Total words:  4
Lorem: 1, 25.00%
ipsum: 2, 50.00%
dolor: 3, 75.00%
ames: 2, 50.00%
Execution time (hr): 0s 0.164388ms
```
