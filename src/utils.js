import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import getConfig from "./config";

const nearConfig = getConfig(process.env.NODE_ENV || "development");

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig
    )
  );

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId();

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read only. They don't modify the state, but usually return some value.

      viewMethods: [
<<<<<<< HEAD
        "getAlltopic",
        "getCandidateList",
        "getEventScore",
        "getUserVotedList",
        "didVoted",
        "test",
      ],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: [
        "addToTopicArray",
        "addCandidate",
        "addVote",
        "eventEnd",
        "clearTopicArray",
        "addNum"
=======
        "didVoted",
        "getAlltopic",
        "getScore",
        "test",
        "getCandidateScore",
        "getCandidateList",
        "getEventCretor",
        "getUserVotedList",
        "getAlltopicList",
      ],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: [
        "addCandidate",
        "addToTopicArray",
        "addVote",
        "userVoted",
        "clearTopicArray",
>>>>>>> 23546e3ae897db30e88f3b5f454c9bcd3c28ff35
      ],
    }
  );
}

export function logout() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName);
}
