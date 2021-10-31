from argparse import ArgumentParser
from utils import ask_yes_no_cmd
from prime import next_prime
import time

parser = ArgumentParser()
parser.add_argument("-n", "--number", type=int, help="Number to start from", default=0)
args = parser.parse_args();

current_prime = args.number
while True:
    start_time = time.time_ns()
    current_prime = next_prime(current_prime)
    end_time = time.time_ns()
    
    print(f"Prime is: {str(current_prime)}")

    exec_time = {"s": (end_time-start_time) // 1000000000, "ms": ((end_time-start_time) - (end_time-start_time) // 1000000000) / 1000000}
    print("Execution time: {:.0f}s {:.3f}ms".format(exec_time['s'], exec_time['ms']))
    
    if not ask_yes_no_cmd("Find next prime?"):
        break
