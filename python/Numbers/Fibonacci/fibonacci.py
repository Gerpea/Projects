def calc_fib(n, cb = lambda x: x, every = True):
    if n <= 0:
        return
    
    a = 0
    b = 1
    c = 0

    for i in range(2, n + 1):
        if every:
            cb(c)
        c = a + b
        a, b = b, c

    cb(c)