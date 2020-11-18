# Alarm Clock

**Alarm Clock**

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

- Minutes and seconds
  ```bash
  $ node index.js 5m 3s
  ```
- [Date time string](https://tools.ietf.org/html/rfc2822#page-14)
  ```bash
  $ node index.js 11/19/2020 00:00:00
  ```

### Examples

```bash
$ node index.js 5m
Time remaining: 0:0:0
```
