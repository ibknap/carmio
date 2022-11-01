from pyteal import *


class Carmio:
    class Variables:
        image = Bytes("IMAGE")
        name = Bytes("NAME")
        brand = Bytes("BRAND")
        initialPrice = Bytes("INITIAL PRICE")
        currentBidding = Bytes("CURRENT BIDDING")
        currentOwner = Bytes("CURRENT OWNER")
        sold = Bytes("SOLD")
        description = Bytes("DESCRIPTION")
        bidding_ends = Bytes("BIDDING_ENDS")
        extra_time = Int(60)
        owner = Bytes("OWNER")

    class AppMethods:
        buy = Bytes("buy")
        bid = Bytes("bid")

    def application_creation(self):
        return Seq([
            Assert(Txn.application_args.length() == Int(6)),
            Assert(Txn.note() == Bytes("carmio-contract:v2")),
            Assert(Btoi(Txn.application_args[3]) > Int(0)),
            Assert(Btoi(Txn.application_args[4]) > Int(0)),
            App.globalPut(self.Variables.image, Txn.application_args[0]),
            App.globalPut(self.Variables.name, Txn.application_args[1]),
            App.globalPut(self.Variables.brand, Txn.application_args[2]),
            App.globalPut(self.Variables.initialPrice,
                          Btoi(Txn.application_args[3])),
            App.globalPut(self.Variables.currentBidding,
                          Btoi(Txn.application_args[4])),
            App.globalPut(self.Variables.description, Txn.application_args[5]),
            App.globalPut(self.Variables.currentOwner, Txn.sender()),
            App.globalPut(self.Variables.sold, Int(0)),

            App.globalPut(
                self.Variables.bidding_ends,
                Global.latest_timestamp() + self.Variables.extra_time),
            App.globalPut(self.Variables.owner, Txn.sender()),
            Approve()
        ])

    # buy car at initial price

    def buy(self):
        Assert(
            And(
                Global.group_size() == Int(2),
                Gtxn[1].type_enum() == TxnType.Payment,
                Gtxn[1].receiver() == Global.creator_address(),
                Gtxn[1].amount() == App.globalGet(self.Variables.currentBidding),
                Gtxn[1].sender() == Gtxn[0].sender(),
                Global.latest_timestamp() >= App.globalGet(
                    self.Variables.bidding_ends),
                App.globalGet(self.Variables.sold) == Int(0),
            )
        )

        return Seq([
            App.globalPut(self.Variables.owner, self.Variables.currentOwner),
            App.globalPut(self.Variables.sold, App.globalGet(
                self.Variables.sold) + Int(1000000)),
            Approve()
        ])

    # bid car initial price

    def bid(self):
        Assert(
            And(
                Global.group_size() == Int(2),
                Gtxn[1].type_enum() == TxnType.Payment,
                Gtxn[1].receiver() == Global.creator_address(),
                Gtxn[1].amount() > App.globalGet(
                    self.Variables.currentBidding),
                Gtxn[1].sender() == Gtxn[0].sender(),
                Global.latest_timestamp() < App.globalGet(
                    self.Variables.bidding_ends)
            )
        )

        return Seq([
            App.globalPut(self.Variables.currentBidding, Gtxn[1].amount()),
            App.globalPut(self.Variables.currentOwner, Gtxn[1].sender()),
            Approve()
        ])

    def application_deletion(self):
        return Return(Txn.sender() == Global.creator_address())

    def application_start(self):
        return Cond(
            [Txn.application_id() == Int(0), self.application_creation()],
            [Txn.on_completion() == OnComplete.DeleteApplication,
             self.application_deletion()],
            [Txn.application_args[0] == self.AppMethods.buy, self.buy()],
            [Txn.application_args[0] == self.AppMethods.bid, self.bid()]
        )

    def approval_program(self):
        return self.application_start()

    def clear_program(self):
        return Return(Int(1))


# ----------------------------------------
# TEST DATA
# ----------------------------------------
# ./sandbox goal app create --creator FCVRTOCFLYHMG3GODR6WW5MK373VLUAQHKRQ4BE2CWVC6EROMMFTF55WTY --approval-prog carmio_approval.teal --clear-prog carmio_clear.teal --note carmio-contract:v2 --global-byteslices 4 --global-ints 3 --local-byteslices 0 --local-ints 0  --app-arg str:TestImage --app-arg str:TestName --app-arg str:TestBrand --app-arg int:1000000 --app-arg int:1000000 --app-arg str:TestDescription
# ./sandbox goal app delete --app-id 1 --from FCVRTOCFLYHMG3GODR6WW5MK373VLUAQHKRQ4BE2CWVC6EROMMFTF55WTY
# ./sandbox goal app read --app-id 1 --global
# ./sandbox goal app call --app-id 1 --from FCVRTOCFLYHMG3GODR6WW5MK373VLUAQHKRQ4BE2CWVC6EROMMFTF55WTY
# ./sandbox goal app method --app-id 1 --method buy --from FCVRTOCFLYHMG3GODR6WW5MK373VLUAQHKRQ4BE2CWVC6EROMMFTF55WTY
