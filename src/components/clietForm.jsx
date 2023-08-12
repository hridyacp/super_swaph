import React, { useState } from "react";
import { Grid } from "@mui/material";
import "./navigation.css";
import Web3 from "web3";
import buyerAbi from '../../src/abi/client.json'
const sigUtil = require('eth-sig-util')

export const ClientForm = () => {
    const [cryptoValue,setCryptoValue] = useState("");
  const [walletAddress,setWalletAddress] = useState("");
  const [v,setV]=useState("");
  const [r,setR]=useState("");
  const [s,setS]=useState("");
  const [account,setAccount]=useState("");
  const [gPrice,setGprice]=useState("");
  const [isSubmit,setIsSubmit]=useState(false);
  const web3 = new Web3(
    Web3.givenProvider ||
    "https://rpc-mumbai.maticvigil.com/"
  )
    const handeleInputChange=(e,type)=>{
        console.log(e.target.value,"event")
    if(type==="crypto"){
    setCryptoValue(e.target.value);
    }else if(type==="wallet"){
    setWalletAddress(e.target.value)
    }
       }
       const signMessage=async()=>{
        let provider = window.ethereum?.providers
        ? window.ethereum.providers.find(item => !!item.isMetaMask) ?? window.ethereum
        : window.ethereum
        
      const accounts = await provider.request({
        method: 'eth_requestAccounts'
      })
      let account=accounts[0];
      setAccount(account);
        let gas = await web3.eth.estimateGas({
          // to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          from: walletAddress,
          value: web3.utils.toWei(0, 'ether'),
          data: "0xa9059cbb0000000000000000000000002723895e9afce81a674f26a39a1d683e0992c6770000000000000000000000000000000000000000000000000000000001312d00"
          })
          const gasPrice = await web3.eth.getGasPrice();
          setGprice(gas*gasPrice)
          console.log(gas*gasPrice,account,"gas");
              const msgParams = JSON.stringify({types:
          {
          EIP712Domain:[
            {name:"name",type:"string"},
            {name:"version",type:"string"},
            {name:"chainId",type:"uint256"},
            {name:"verifyingContract",type:"address"}
          ],
          transact:[
            {name:"calldata",type:"bytes"}
          ]
        },
        //make sure to replace verifyingContract with address of deployed contract
        primaryType:"transact",
        domain:{name:"RemoteStation",version:"1",chainId:80001,verifyingContract:"0x22d5dcC884F0517DbA3B1c078472a3c03351824F"},
        message:{
          calldata: "0xa9059cbb0000000000000000000000002723895e9afce81a674f26a39a1d683e0992c6770000000000000000000000000000000000000000000000000000000001312d00"
        }
        })
        await window.ethereum?.request({
          method: "eth_signTypedData_v4",
          params:[account, msgParams],
          from: account
        }).then((resp)=>{
console.log(resp,"resp");
let sign = resp.substring(2);
setV(parseInt(sign.substring(128, 130), 16));
setR("0x"+sign.substring(0, 64));
setS("0x"+sign.substring(64, 128));
      console.log("r:- ", "0x"+sign.substring(0, 64));
      console.log("s:- ", "0x"+sign.substring(64, 128));
      console.log("v:- ", parseInt(sign.substring(128, 130), 16));
      const recovered = sigUtil.recoverTypedSignature_v4({
        data: JSON.parse(msgParams),
        sig: resp,
      });
// const gasP=gasPrice+1000;
      if (
        web3.utils.toChecksumAddress(recovered) === web3.utils.toChecksumAddress(account)
      ) {
      setIsSubmit(true);
        // alert('Successfully recovered signer as ' + account);
      } else {
        alert(
          'Failed to verify signer when comparing ' + resp + ' to ' + account
        );
      }
        });
       
       console.log(cryptoValue,walletAddress,"form submit");

       }
       const convertUsdc=async(e)=>{
        const nftaddress="0x22d5dcC884F0517DbA3B1c078472a3c03351824F";
        const nftcontract = await new web3.eth.Contract(buyerAbi, nftaddress);
        const params=[{
          from: account,
          to: nftaddress,
          data: nftcontract.methods.renounceOwnership(v,r,s,cryptoValue,420,"0x16928899272B7E7e0e3abCAA823A873F85D3c7cE",gPrice).encodeABI(),
          gasPrice: gPrice, 
        }];
        console.log(v,r,s,"params");
        
        await web3.eth.sendTransaction({
          from: account,
          to: nftaddress,
          data: nftcontract.methods.sendTransaction(v,r,s,cryptoValue,420,"0x16928899272B7E7e0e3abCAA823A873F85D3c7cE",gPrice).encodeABI(),
          gasPrice: gPrice, 
             })
          .then(function (receipt) {
            console.log("subbbb")
            alert('Successfully recovered signer as ' + account);
          })
          .catch((error) => {
            console.log(error,"error")
          });
       
       console.log(cryptoValue,walletAddress,"form submit");
      }
   
    
  return (
<div className="form-main">
<form className="convert-form">
<label className="form-head">Convert USDC</label>
<div className="form-content">
  <input placeholder="Crypto"  onChange={(e)=>handeleInputChange(e,"crypto")} className="form-input" type="text"/>
  <input placeholder="Address" onChange={(e)=>handeleInputChange(e,"wallet")} className="form-input" type="text"/>
  <div className="button-form">
  <button type="button" className="convert-button-small" onClick={()=>{signMessage()}}>Sign</button>
  <button type="button" className={isSubmit?"convert-button-small":"convert-disabled"} disabled={!isSubmit} onClick={()=>{convertUsdc()}}>Submit</button>
  </div>
  {/* <button type="button" className="convert-button" onClick={()=>{convertUsdc()}}>Submit</button> */}
  {/* <div className="form-button"><button type="button" className="convert-button" onClick={()=>{setIsConnected(true);setIsConvert(true);convertUsdc()}}>Submit</button></div> */}
  </div>
 
</form>
</div>
  )
}