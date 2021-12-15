import React, { useEffect, useState } from "react"
import "./App.css"
import twitterLogo from "./assets/twitter-logo.svg"

// Constants
const TWITTER_HANDLE = "kbpsystem"
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

const App = () => {
  // App state
  const [walletAddress, setWalletAddress] = useState(null)
  // Function to check if Phantom wallet is installed
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!")

          /*
           * The solana object gives us a function that will allow us to connect
           * directly with the user's wallet!
           */
          const response = await solana.connect({ onlyIfTrusted: true })
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          )
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻")
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Connecting wallet
  const connectWallet = async () => {
    const { solana } = window
    if (solana) {
      const response = await solana.connect()
      console.log("Wallet connected! ", response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    }
  }

  // Connect wallet button
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect wallet
    </button>
  )

  // Run the wallet checker everytime the component gets mounted
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    }
    window.addEventListener("load", onLoad)
    return () => window.removeEventListener("load", onLoad)
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  )
}

export default App
