# Prime Factorization

**Prime Factorization**

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

- **-n**, **--number**
    <pre>[<em><b>required</b></em>] Number to factorize</pre>

- **-o**, **--out**
    <pre>[<em><b>optional</b></em>] Path to save factors
    <em>if not specified the factors will be output in console</em></pre>

- **-t**, **--trial** [_default_]
    <pre>[<em><b>optional</b></em>] Use trial division</pre>

- **-r**, **--tho**
    <pre>[<em><b>optional</b></em>] Use Pollard's rho</pre>

- **-a**, **--all**
    <pre>[<em><b>optional</b></em>] Find all possible factors</pre>

_If **[-a]** flag is specified it will take much more time with Pollard's rho algorithm, because of the checks for prime numbers._

### Examples

```bash
$ node index.js -n 182141322086431 -t
6491651, 28057781
Execution time (hr): 12s 355.849722ms
```

```bash
$ node index.js -n 182141322086431 -r
6491651, 28057781
Execution time (hr): 0s 724.950614ms
```

```bash
node index.js -n 2020 -ta
2, 2, 5, 101
Execution time (hr): 0s 1.688963ms
```

```bash
$ node index.js -n 2020 -ra
2, 2, 5, 101
Execution time (hr): 4s 783.483054ms
```
