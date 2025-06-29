import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const siweSign = async (siweMessage) => {
  try {
    const from = accounts[0]
    const msg = `0x${Buffer.from(siweMessage, "utf8").toString("hex")}`
    const sign = await provider // Or window.ethereum if you don't support EIP-6963.
      .request({
        method: "personal_sign",
        params: [msg, from],
      })
    siweResult.innerHTML = sign
  } catch (err) {
    console.error(err)
    siweResult.innerHTML = `Error: ${err.message}`
  }
}

siwe.onclick = async () => {
  const domain = window.location.host
  const from = accounts[0]
  const siweMessage = `${domain} wants you to sign in with your Ethereum account:\n${from}\n\nI accept the MetaMask Terms of Service: https://community.metamask.io/tos\n\nURI: https://${domain}\nVersion: 1\nChain ID: 1\nNonce: 32891757\nIssued At: 2021-09-30T16:25:24.000Z`
  siweSign(siweMessage)
}
// You should only attempt to request the user's account in response to user interaction, such as
// selecting a button. Otherwise, you pop-up spam the user like it's 1999. If you fail to retrieve
// the user's account, you should encourage the user to initiate the attempt.
const ethereumButton = document.querySelector(".enableEthereumButton")
const showAccount = document.querySelector(".showAccount")

ethereumButton.addEventListener("click", () => {
  getAccount()
})

// While awaiting the call to eth_requestAccounts, you should disable any buttons the user can
// select to initiate the request. MetaMask rejects any additional requests while the first is still
// pending.
async function getAccount() {
  const accounts = await provider // Or window.ethereum if you don't support EIP-6963.
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error.
        // If this happens, the user rejected the connection request.
        console.log("Please connect to MetaMask.")
      } else {
        console.error(err)
      }
    })
  const account = accounts[0]
  showAccount.innerHTML = account
}
const chainId = await provider // Or window.ethereum if you don't support EIP-6963.
  .request({ method: "eth_chainId" })

provider // Or window.ethereum if you don't support EIP-6963.
  .on("chainChanged", handleChainChanged)

function handleChainChanged(chainId) {
  // We recommend reloading the page, unless you must do otherwise.
  window.location.reload()
}
let currentAccount = null
provider // Or window.ethereum if you don't support EIP-6963.
  .request({ method: "eth_accounts" })
  .then(handleAccountsChanged)
  .catch((err) => {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available, eth_accounts returns an
    // empty array.
    console.error(err)
  })

// Note that this event is emitted on page load. If the array of accounts is non-empty, you're
// already connected.
provider // Or window.ethereum if you don't support EIP-6963.
  .on("accountsChanged", handleAccountsChanged)

// eth_accounts always returns an array.
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts.
    console.log("Please connect to MetaMask.")
  } else if (accounts[0] !== currentAccount) {
    // Reload your interface with accounts[0].
    currentAccount = accounts[0]
    // Update the account displayed (see the HTML for the connect button)
    showAccount.innerHTML = currentAccount
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
