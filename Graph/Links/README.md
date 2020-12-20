# Graph from links

**Graph from links**

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
$ node index.js -l google.com
'google.com' => [
  'schema.org'
  'google.com'
  'google.ru'
  'maps.google.ru'
  'play.google.com'
  'youtube.com'
  'news.google.com'
  'mail.google.com'
  'drive.google.com'
  'google.ru'
  'google.ru'
  'accounts.google.com'
  'google.ru'
  'google.com'
]
'schema.org' => []
'google.ru' => []
'maps.google.ru' => []
'play.google.com' => []
'youtube.com' => []
'news.google.com' => []
'mail.google.com' => []
'drive.google.com' => []
'accounts.google.com' => []
Execution time (hr): 0s 296.22814ms
```
