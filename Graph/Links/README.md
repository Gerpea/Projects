# Graph from links

**[Graph from links](https://en.wikipedia.org/wiki/Collatz_conjecture)**

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

- **-l**, **--link**

    <pre>[<em><b>required</b></em>] First link</pre>

- **-d**, **--depth**
    <pre>[<em><b>optional</b></em>] Depth
    <em>Default is <b>-1</b></em></pre>

### Examples

```bash
$ node index.js -l google.ru -d 1
Graph {
  edges: Map(10) {
    'google.ru' => Set(10) {
      'schema.org',
      'google.com',
      'google.ru',
      'maps.google.ru',
      'play.google.com',
      'youtube.com',
      'news.google.com',
      'mail.google.com',
      'drive.google.com',
      'accounts.google.com'
    },
    'schema.org' => Set(0) {},
    'google.com' => Set(0) {},
    'maps.google.ru' => Set(0) {},
    'play.google.com' => Set(0) {},
    'youtube.com' => Set(0) {},
    'news.google.com' => Set(0) {},
    'mail.google.com' => Set(0) {},
    'drive.google.com' => Set(0) {},
    'accounts.google.com' => Set(0) {}
  }
}
Execution time (hr): 0s 345.300802ms
```
