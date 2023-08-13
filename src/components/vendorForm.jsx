import React, { useState } from "react";
import { Grid } from "@mui/material";
import "./navigation.css";
import Web3 from "web3";
export const VendorForm = () => {
    const [cryptoValue,setCryptoValue] = useState("");
  const [walletAddress,setWalletAddress] = useState("");
  const web3 = new Web3(
    Web3.givenProvider ||
    "https://rpc-mumbai.maticvigil.com/"
  )
    const handeleInputChange=(e,type)=>{
        console.log(e.target.value,"event")
    setCryptoValue(e.target.value);
       }
       const convertUsdc=async(e)=>{
        let provider = window.ethereum?.providers
        ? window.ethereum.providers.find(item => !!item.isMetaMask) ?? window.ethereum
        : window.ethereum
        
      const accounts = await provider.request({
        method: 'eth_requestAccounts'
      })
      let account=accounts[0];
      console.log(account,cryptoValue)
      let gas = await web3.eth.estimateGas({
        // to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        from: account,
        value: web3.utils.toWei(0, 'ether'),
        data: "0xa9059cbb0000000000000000000000002723895e9afce81a674f26a39a1d683e0992c6770000000000000000000000000000000000000000000000000000000001312d00"
        })
        const gasPrice = await web3.eth.getGasPrice();
        console.log(gas*gasPrice,"gas")
      // window.ethereum.request({
      //   method: 'eth_sendTransaction',
      //   params: [{
      //     to:"0x22d5dcC884F0517DbA3B1c078472a3c03351824F", from:account, value:web3.utils.toWei(Number(cryptoValue),'ether'),gasPrice: gas*gasPrice
      //   }],
      // })
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }],
        }).then(async(e)=>{
          await web3.eth.sendTransaction({to:"0x43C529677C42EdeAFDb3754EC738D9f9C046C401", from:account, value:web3.utils.toWei(Number(cryptoValue),'ether')})
          .then(() => {
            alert("Transaction successfull!")
          })
          .catch((e) => {
            console.log(e)
            alert("Oops!Transaction failed")
          })
        });
      } catch (switchError) {
        console.log("Unable to switch")
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  "chainId": "0x5",
                  "chainName": "Goerli",
                  rpcUrls: ['https://ethereum-goerli.publicnode.com	'] /* ... */,
                },
              ],
            }).then(()=>{
              web3.eth.sendTransaction({to:"0x590666c009a39F38DdA4d7a1f823273bbDA5E8Fd", from:account, value:web3.utils.toWei(Number(cryptoValue),'ether')})
              .then(() => {
                alert("Woot!")
              })
              .catch((e) => {
                console.log(e)
                alert("Oops!")
              })
            });
          } catch (addError) {
            console.log("unable to add")
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
      
        // await web3.eth.sendTransaction({to:"0x22d5dcC884F0517DbA3B1c078472a3c03351824F", from:account, value:web3.utils.toWei(cryptoValue, "ether")})
        //   .then(function (receipt) {
        //     console.log("subbbb")
        //     alert('Successfully sent' + cryptoValue);
        //   })
        //   .catch((error) => {
        //     console.log(error,"error")
        //   });
       
       console.log(cryptoValue,walletAddress,"form submit");
       }
    
  return (
<div className="form-main">
<form className="convert-form">
<label className="form-head">Convert USDC</label>
<div className="form-content">

  <input placeholder="Crypto"  onChange={(e)=>handeleInputChange(e,"crypto")} className="form-input-vendor" type="text"/>
  {/* <div className="button-form">
  <button type="button" className="convert-button-small" onClick={()=>{convertUsdc()}}>Check</button> */}
  <button type="button" className="convert-button" onClick={()=>{convertUsdc()}}>Submit</button>
  {/* </div> */}
 
  {/* <div className="form-button"><button type="button" className="convert-button" onClick={()=>{setIsConnected(true);setIsConvert(true);convertUsdc()}}>Submit</button></div> */}
  </div>
 
</form>
</div>
  )
}