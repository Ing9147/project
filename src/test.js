const { connect, transactions, keyStores } = require("near-api-js");
const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const CONTRACT_NAME = "nosugar.testnet";
const WASM_PATH = path.join(__dirname, "../build/greeter.wasm");

const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

sendTransactions();

async function sendTransactions() {
  const near = await connect({ ...config, keyStore });
  const account = await near.account(CONTRACT_NAME);
  const args = { some_field: 1, another_field: "hello" };

  const balanceBefore = await account.getAccountBalance();
  console.log("Balance before:", balanceBefore);

  try {
    await account.addToTopicArray({topic:"A"})
  } catch (e) {
    console.log("Error:", e);
  }

}