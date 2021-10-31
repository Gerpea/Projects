# Minimum spanning tree

[**Minimum spanning tree**](https://en.wikipedia.org/wiki/Minimum_spanning_tree)

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
  ]
}
```

```bash
$ node index.js -f graph.json
'0' => [
  '2'
]
'2' => [
  '3'
]
'3' => [
  '1'
  '4'
  '5'
]
'1' => []
'4' => []
'5' => []
MST cost: 10
Execution time (hr): 0s 1.4089ms
```
