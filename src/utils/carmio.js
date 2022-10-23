import algosdk from "algosdk";
import {
    algodClient,
    indexerClient,
    carmioNote,
    minRound,
    myAlgoConnect,
    numGlobalBytes,
    numGlobalInts,
    numLocalBytes,
    numLocalInts
} from "./constants";
/* eslint import/no-webpack-loader-syntax: off */
import approvalProgram from "!!raw-loader!../contracts/carmio_approval.teal";
import clearProgram from "!!raw-loader!../contracts/carmio_clear.teal";
import {base64ToUTF8String, utf8ToBase64String} from "./conversions";

class Carmio {
    constructor(image, name, brand, initialPrice, currentBidding, description, sold, appId, owner) {
        this.image = image;
        this.name = name;
        this.brand = brand;
        this.initialPrice = initialPrice;
        this.currentBidding = currentBidding;
        this.description = description;
        this.sold = sold;
        this.appId = appId;
        this.owner = owner;
    }
}

// Compile smart contract in .teal format to program
const compileProgram = async (programSource) => {
    let encoder = new TextEncoder();
    let programBytes = encoder.encode(programSource);
    let compileResponse = await algodClient.compile(programBytes).do();
    return new Uint8Array(Buffer.from(compileResponse.result, "base64"));
}

// CREATE Car: ApplicationCreateTxn
export const createCarAction = async (senderAddress, car) => {
    console.log("Adding car...")

    let params = await algodClient.getTransactionParams().do();

    // Compile programs
    const compiledApprovalProgram = await compileProgram(approvalProgram)
    const compiledClearProgram = await compileProgram(clearProgram)

    // Build note to identify transaction later and required app args as Uint8Arrays
    let note = new TextEncoder().encode(carmioNote);
    let image = new TextEncoder().encode(car.image);
    let name = new TextEncoder().encode(car.name);
    let brand = new TextEncoder().encode(car.brand);
    let initialPrice = algosdk.encodeUint64(car.initialPrice);
    let currentBidding = algosdk.encodeUint64(car.currentBidding);
    let description = new TextEncoder().encode(car.description);

    let appArgs = [image, name, brand, initialPrice, currentBidding, description]

    // Create ApplicationCreateTxn
    let txn = algosdk.makeApplicationCreateTxnFromObject({
        from: senderAddress,
        suggestedParams: params,
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        approvalProgram: compiledApprovalProgram,
        clearProgram: compiledClearProgram,
        numLocalInts: numLocalInts,
        numLocalByteSlices: numLocalBytes,
        numGlobalInts: numGlobalInts,
        numGlobalByteSlices: numGlobalBytes,
        note: note,
        appArgs: appArgs
    });

    // Get transaction ID
    let txId = txn.txID().toString();

    // Sign & submit the transaction
    let signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
    console.log("Signed transaction with txID: %s", txId);
    await algodClient.sendRawTransaction(signedTxn.blob).do();

    // Wait for transaction to be confirmed
    let confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);

    // Get the completed Transaction
    console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);

    // Get created application id and notify about completion
    let transactionResponse = await algodClient.pendingTransactionInformation(txId).do();
    let appId = transactionResponse['application-index'];
    console.log("Created new app-id: ", appId);
    return appId;
}