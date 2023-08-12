import React, { useState } from "react";
import { Grid } from "@mui/material";
import "./navigation.css";
export const ClientForm = () => {
    const [cryptoValue,setCryptoValue] = useState("");
  const [walletAddress,setWalletAddress] = useState("");
    const handeleInputChange=(e,type)=>{
        console.log(e.target.value,"event")
    if(type==="crypto"){
    setCryptoValue(e.target.value);
    }else if(type==="wallet"){
    setWalletAddress(e.target.value)
    }
       }
       const convertUsdc=(e)=>{
       console.log(cryptoValue,walletAddress,"form submit");
       }
    
  return (
<div className="form-main">
<form className="convert-form">
<label className="form-head">Convert USDC</label>
<div className="form-content">
  <input placeholder="Crypto"  onChange={(e)=>handeleInputChange(e,"crypto")} className="form-input" type="text"/>
  <input placeholder="Address" onChange={(e)=>handeleInputChange(e,"wallet")} className="form-input" type="text"/>
  <button type="button" className="convert-button" onClick={()=>{convertUsdc()}}>Submit</button>
  {/* <div className="form-button"><button type="button" className="convert-button" onClick={()=>{setIsConnected(true);setIsConvert(true);convertUsdc()}}>Submit</button></div> */}
  </div>
 
</form>
</div>
  )
}