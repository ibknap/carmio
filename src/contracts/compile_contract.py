from pyteal import *

from carmio_contract import Carmio

if __name__ == "__main__":
    approval_program = Carmio().approval_program()
    clear_program = Carmio().clear_program()

    # Mode.Application specifies that this is a smart contract
    compiled_approval = compileTeal(approval_program, Mode.Application, version=6)
    with open("carmio_approval.teal", "w") as teal:
        teal.write(compiled_approval)
        teal.close()

    # Mode.Application specifies that this is a smart contract
    compiled_clear = compileTeal(clear_program, Mode.Application, version=6)
    with open("carmio_clear.teal", "w") as teal:
        teal.write(compiled_clear)
        teal.close()