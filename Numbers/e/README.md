# Find e to nth digit

**Calculates e using series from [this](<http://www.brotherstechnology.com/docs/icnsae_(cmj0104-300dpi).pdf>)** paper

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

- **-d**, **--digits**

    <pre>[<em><b>required</b></em>] Number of digits to calculate</pre>

- **-o**, **--out**

    <pre>[<em><b>optional</b></em>] Path to save calculated e
    <em>if not specified the calculated</em> <b>e</b> <em>will be output in console</em></pre>

### Examples

```bash
$ node index.js -d 100
2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274
Execution time (hr): 0s 15.443457ms
```
