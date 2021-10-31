def is_prime(n):
    c = {}
    c[0] = 1
    for i in range(0, n):
        c[i + 1] = 1
        for j in range(i, 0, -1):
            c[j] = c[j - 1] - c[j]
        c[0] = -c[0]
    
    c[0] = c[0] + 1
    c[n] = c[n] - 1

    for i in range(n, 0, -1):
        if(c[i] % n != 0):
            return False
    
    return True

def next_prime(n):
    i = n
    while True:
        i += 1
        if is_prime(i):
            return i