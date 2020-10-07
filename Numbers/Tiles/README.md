# Prime Number

**Find Cost of Tile to Cover W x H Floor**

## Table of Contents

1. [Run](#run)
2. [Options](#options)
3. [Example](#examples)

## Run

```
npm install
```

```
node index.js [options]
```

or

```
npm run start -- [options]
```

### Options

- **-w**, **--width**
    <pre>[<em><b>required</b></em>] Floor width</pre>

- **-h**, **--height**
    <pre>[<em><b>optional</b></em>] Floor height
    <em>Default is <b>width</b></em></pre>

- **-tw**, **--tile-width**
    <pre>[<em><b>required</b></em>] Tile width</pre>

- **-h**, **--height**
    <pre>[<em><b>optional</b></em>] Tile height
    <em>Default is <b>tile-width</b></em></pre>

- **-c**, **--cost**
    <pre>[<em><b>required</b></em>] Single tile cost</pre>

- **-uc**, **--use-cut**
    <pre>[<em><b>optional</b></em>] Use the cut tiles?
    <em>Default is <b>false</b></em></pre>

### Examples

```
$ node index.js -c 100 -w 1.5 -h 2 -tw 1 -th 1
Calculated cost is: 400
$ node index.js -c 100 -w 1.5 -h 2 -tw 1 -th 1 -uc
Calculated cost is: 300
```
