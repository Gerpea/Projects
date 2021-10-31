# Fibonacci Sequence

**Calculates Fibonacci Sequence**

## Table of Contents

1. [Run](#run)
2. [Options](#options)
3. [Example](#examples)

## Run

```bash
python main.py [options]
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
$ python main.py -d 1000 -e=True
43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875 
Execution time: 0s 0.084ms
```
