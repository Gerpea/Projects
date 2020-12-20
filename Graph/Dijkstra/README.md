# Dijkstra's Algorithm

[**Dijkstra's algorithm**](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)

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
  "0": [
    { "node": "1", "weight": 10, "directed": true },
    { "node": "2", "weight": 1, "directed": false }
  ],
  "2": [
    { "node": "0", "weight": 5, "directed": true },
    { "node": "1", "weight": 5, "directed": true },
    { "node": "3", "weight": 2, "directed": true }
  ],
  "3": [
    { "node": "1", "weight": 1, "directed": true },
    { "node": "4", "weight": 3, "directed": false },
    { "node": "5", "weight": 4, "directed": false },
    { "node": "5", "weight": 3, "directed": true }
  ],
  "4": [{ "node": "5", "weight": 1, "directed": false }]
}
```

```bash
$ node index.js
0 => 0, [
  0
]
1 => 4, [
  0
  2
  3
  1
]
2 => 1, [
  0
  2
]
3 => 3, [
  0
  2
  3
]
4 => 6, [
  0
  2
  3
  4
]
5 => 6, [
  0
  2
  3
  5
]
Execution time (hr): 0s 0.326297ms
```
