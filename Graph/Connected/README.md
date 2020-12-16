# Connected Graph

**Connected Graph**

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

    <pre>[<em><b>optional</b></em>] Path to file with graph
    <em>Default is <b>graph.json</b></em></pre>

### Examples

#### _graph.json_

```json
{
  "0": ["1", "2", "3"],
  "1": ["2", "3"],
  "2": ["3"],
  "3": ["0"]
}
```

```bash
$ node index.js -f graph.json
true
Execution time (hr): 0s 0.295515ms
```
