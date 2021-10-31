# Number Names

**Number Names**

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
    <pre>[<em><b>required</b></em>] Number to convert</pre>
- **-l**, **--lang**
  <pre>[<em><b>optional</b></em>] Conversion language
  <em>default is</em> <b>en</b></pre>

### Examples

```bash
$ node index.js -n 999999999 -l en
nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine
Execution time (hr): 0s 0.368043ms
```

```bash
$ node index.js -n 999999999 -l ru
девять сто девяносто девять миллион девять сто девяносто девять тысяча девять сто девяносто девять
Execution time (hr): 0s 0.381553ms
```
