# Change Program

**Calculates change**

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

- **-c**, **--cost**
    <pre>[<em><b>required</b></em>] Cost</pre>

- **-m**, **--money**
    <pre>[<em><b>required</b></em>] Amount of money</pre>

### Examples

```bash
$ node index.js -c 99.04 -m 100
Change: 0.96
Quaters: 3, Dimes: 2, Nickels: 0, Pennies: 1
```
