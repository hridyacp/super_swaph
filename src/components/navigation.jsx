import React, { useState, useEffect } from "react";
import './navigation.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Web3 from "web3";

export const Navigation = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isNotConnected, setIsNotConnected] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(false);
  const vertical='top';
  const horizontal='right';
  const web3 = new Web3(
    Web3.givenProvider ||
    'https://rpc-mumbai.maticvigil.com/'
  )
  const connectWallet = async() => {
    if (window.ethereum) {
      let provider = window.ethereum?.providers
        ? window.ethereum.providers.find(item => !!item.isMetaMask) ?? window.ethereum
        : window.ethereum

      const accounts = await provider.request({
        method: 'eth_requestAccounts'
      }).catch(()=>{
        setIsNotConnected(true);
        setIsConnected(false);
        // alert("User rejected connection")
      })
      if(accounts?.length>0){
          localStorage.setItem('walletaddress', accounts[0]);
          setConnectedAccount(accounts[0]);
          const event=new Event("connected");
          document.dispatchEvent(event);
          setIsConnected(true);
          setIsNotConnected(false);
      }
    }
  }
  const handleClose =() => {
    setIsNotConnected(false);
  };
  const Alert = React.forwardRef(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
 
  useEffect(()=>{
    const accountValue=localStorage.getItem('walletaddress');
    if(accountValue!==null){
      setIsConnected(true);
      setConnectedAccount(accountValue);
    }
  })
 document.addEventListener("disconnected",()=>{
  setIsConnected(false);
 })

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="main-nav-container">
      
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
         Super Hack
          </a>{" "}
      
       
          
            {isConnected && connectedAccount &&
       
              <h5 className="page-scroll">
              Welcome {connectedAccount}
              </h5>}
        
            {!isConnected &&
             <button className="nav-button" onClick={connectWallet}>Connect Wallet</button>
          
            }
    
   
        <Snackbar
         anchorOrigin={{ vertical, horizontal }}
  open={isNotConnected}
  autoHideDuration={3000}
  severity="error"
  onClose={handleClose}
>
<Alert onClose={handleClose} severity="error" sx={{ width: '100%' ,borderRadius: "6px",fontSize:"12px"}}>
          User rejected connection
        </Alert>
        </Snackbar>
      </div>
    </nav>
    
  );
};
