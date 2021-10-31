# Closest Pair of Points

**Closest Pair of Points**

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

- **-f**, **--file**
    <pre>[<em><b>optional</b></em>] File with points
    <em>if not specified points will be generated</em></pre>

- **-s**, **--save**
    <pre>[<em><b>optional</b></em>] Where to save generated points</pre>

- **-c**, **--count**
    <pre>[<em><b>optional</b></em>] Number of points to generate
    <em>Default is <b>10</b></em></pre>

- **-n**, **--min**
    <pre>[<em><b>optional</b></em>] Min coordinate
    <em>Default is <b>-100</b></em></pre>

- **-x**, **--max**
    <pre>[<em><b>optional</b></em>] Max coordinate
    <em>Default is <b>200</b></em></pre>

### Examples

```bash
$ node index.js -s points.txt -n -100 -x 200 -c 100
2.88
Execution time (hr): 0s 1.783945ms
```
