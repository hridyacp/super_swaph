import React, { useState, useEffect, useRef } from "react";
import mainImage from "../assets/crypt.jpg"
import { Grid } from "@mui/material";
import "./navigation.css";
import { ClientForm } from "./clietForm";
import { Navigate, useNavigate } from "react-router-dom";

export const Header = (props) => {
  const [isConnected, setIsConnected]=useState(false);
  const [isNotConnected, setIsNotConnected] = useState(false);
  const [isConvert,setIsConvert] = useState(false);
  const [cryptoValue,setCryptoValue] = useState("");
  const [walletAddress,setWalletAddress] = useState("");
  useEffect(() => {
document.addEventListener('connected',()=>{
setIsConnected(true);
setIsNotConnected(false);
});
document.addEventListener('disconnected',()=>{
  setIsConnected(false);
  setIsNotConnected(true);
  })
  if(localStorage.getItem('walletaddress')!==null){
    setIsConnected(true);
setIsNotConnected(false);
  }
   }, [isConnected,isConvert]);

   const handeleInputChange=(e,type)=>{
    console.log(e.target.value,"event")
if(type==="crypto"){
setCryptoValue(e.target.value);
}else if(type==="wallet"){
setWalletAddress(e.target.value)
}
   }
   let navigate = useNavigate(); 
  const routeChange = () =>{ 
    console.log("in")
    let path = `clientForm`; 
    navigate(path);
  }

   const convertUsdc=(e)=>{
    console.log(isConnected,isConvert,"submit")
   console.log(cryptoValue,walletAddress,"form submit");
   }

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
           <Grid container spacing={3} columns={12} >
            <Grid item xs={6} style={{paddingRight:"20px"}}>
                <h1 style={{color: "#bcb6b6"}}>
                Super Hack
                  <span></span>
                </h1>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum.</p>
              {isConnected ?
                <button
                  className="disconnect-button"
                  onClick={routeChange}
                >
                 Convert USDC
                </button>:<div></div>
}
                </Grid>
          <Grid item xs={6}>
              <img style={{borderRadius:"20px"}} src={mainImage} width={"680px"} height={"680px"} alt="image" />
              </Grid>
              </Grid>
          </div>
        </div>
      </div>
    </header>
  );
};
