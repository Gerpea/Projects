# Sorting

**[Merge sort](https://en.wikipedia.org/wiki/Merge_sort) and [bubble sort](https://en.wikipedia.org/wiki/Bubble_sort)**

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

- **-s**, **--size**

    <pre>[<em><b>optional</b></em>] Array size
     <em>default is</em> <b>10</b></em></pre>

### Examples

```bash
$ node index.js -s 20
Sorted with recursive merge sort:[ 2,10,13,22,22,27,30,34,46,52,53,54,57,63,65,74,84,90,91,91 ]
Execution time (hr): 0s 0.182371ms
Sorted with iterative merge sort:[ 2,10,13,22,22,27,30,34,46,52,53,54,57,63,65,74,84,90,91,91 ]
Execution time (hr): 0s 0.125206ms
Sorted with bubble sort:[ 2,10,13,22,22,27,30,34,46,52,53,54,57,63,65,74,84,90,91,91 ]
Execution time (hr): 0s 0.119214ms
```
