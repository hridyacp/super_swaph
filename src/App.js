import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import { ClientForm } from "./components/clietForm";
import { VendorForm } from "./components/vendorForm";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  window.ethereum.on('accountsChanged', async (account) => {
    console.log(account[0],"change");
    if(account[0]===undefined){
    localStorage.clear();
    const event = new Event("disconnected");
    document.dispatchEvent(event);
  }
  else{
    localStorage.setItem('walletaddress', account[0]);
    const event=new Event("connected");
    document.dispatchEvent(event);
  }
});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
        <Navigation />
    <Routes>
    <Route path="/" element={ <Header data={landingPageData.Header} />} />
    <Route path="/clientForm" element={ <ClientForm />} />
    <Route path="/vendorForm" element={ <VendorForm />} />
      {/* <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} /> */}
 </Routes>
    </div>
  );
};

export default App;
