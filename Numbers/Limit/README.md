# Limit calculator

**[Limit](<https://en.wikipedia.org/wiki/Limit_(mathematics)>) calculator**

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

- **-f**, **--func**
    <pre>[<em><b>required</b></em>] Function for calculate limit <b>f(x)</b></pre>

- **-l**, **--limit**
    <pre>[<em><b>required</b></em>] Approaches</pre>

### Examples

```bash
$ node index.js -f 'f(x)=(e^x)/(x^2)' -l Infinity
Infinity
Execution time (hr): 0s 28.926801ms
```

```bash
node index.js -f 'f(x)=(x^2+x-6)/(x^2-4)' -l 2
1.25
Execution time (hr): 0s 23.711265ms
```

```bash
node index.js -f 'f(x)=(2-sqrt(x))/(4-x)' -l 4
0.25
Execution time (hr): 0s 25.282271ms
```
