#!/bin/node
const Arweave = require("arweave");
var player = require("play-sound")((opts = {}));

arweave = Arweave.init({
  host: "arweave.net",
  port: "443",
  protocol: "https",
  logging: false,
});
async function main() {
  let txId = process.argv[2];
  await watchTx(txId);
  player.play("tone.wav", function (err) {
    if (err) throw err;
  });
  console.log("Your transaction with Id " + txId + " is Mined successfully!!");
}

async function watchTx(txId) {
  let tx;
  while (true) {
    try {
      tx = await arweave.transactions.getStatus(txId);
    } catch (e) {
      console.log(error);
    }
    if (tx.status === 200) {
      return;
    } else {
      asyncWait(20);
      tx = null;
    }
  }
}

function asyncWait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
}

main();
