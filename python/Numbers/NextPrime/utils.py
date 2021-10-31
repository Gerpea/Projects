def ask_yes_no_cmd(question):
    while True:
        reply = str(input(f"{question} (y/n): ")).lower().strip()
        if reply[0] == "y":
            return True
        if reply[0] == "n":
            return False
