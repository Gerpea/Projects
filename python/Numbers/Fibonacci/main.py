from argparse import ArgumentParser
from pathlib import Path
from sys import stdout
from fibonacci import calc_fib
import time
import io

parser = ArgumentParser()
parser.add_argument("-d", "--digits", type=int, help="number of digit to calculate", default=5)
parser.add_argument("-o", "--out", type=Path, help="where to save the calculated Fibonacci sequence")
parser.add_argument("-e", "--exclusively", type=bool, help="output only one element of the Fibonacci sequence")

args = parser.parse_args()

stream = io.open(args.out, "w", encoding="utf-8") if isinstance(args.out, Path) else stdout

start_time = time.time_ns()
calc_fib(args.digits, lambda digit: stream.write(f"{digit} "), not args.exclusively)
end_time = time.time_ns()

stream.write("\r\n")
    
if isinstance(args.out, Path):
    print(f"Saved Fibonacci sequence to {args.out}")

exec_time = {"s": (end_time-start_time) // 1000000000, "ms": ((end_time-start_time) - (end_time-start_time) // 1000000000) / 1000000}
print("Execution time: {:.0f}s {:.3f}ms".format(exec_time['s'], exec_time['ms']))
    
