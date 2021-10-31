# Fibonacci Sequence

**Calculates Fibonacci Sequence**

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

- **-d**, **--digits**
    <pre>[<em><b>required</b></em>] Number of digits to calculate</pre>

- **-o**, **--out**
    <pre>[<em><b>optional</b></em>] Path to save calculated Fibonacci sequence
    <em>if not specified the calculation will be output in console</em></pre>

- **-e**, **--exclusively**
    <pre>[<em><b>optional</b></em>] Output only one element of the Fibonacci sequence</pre>

### Examples

```bash
$ node index.js -d 1000 -e
4.3466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875e+208
Execution time (hr): 0s 7.329785ms
```
