import React, { useState, useRef } from "react";
import Header from "./components/Header/Header";
import headerImg from "./assets/header_img.png";
import CusNavbar from "./components/Navbar/Navbar";
import Cars from "./components/Car/Cars/Cars";
import Footer from './components/Footer/Footer';
import { indexerClient, myAlgoConnect } from "./utils/constants";
import { NotificationError } from "./components/Notifications";
import { toast } from "react-toastify";
import logo from "./assets/logo.png";
import './App.css';

function App() {
  // hoofs
  const carSection = useRef(null);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  // variables
  const avatar = "https://library.kissclipart.com/20191116/wze/kissclipart-avatar-icon-awesome-set-icon-forum-user-icon-18f64889026582d3.png";
  const goToCars = () => carSection.current?.scrollIntoView({ behavior: 'smooth' });

  // fetch balance
  const fetchBalance = async (accountAddress) => {
    indexerClient.lookupAccountByID(accountAddress).do()
      .then((response) => {
        const _balance = response.account.amount;
        setBalance(_balance);
      })
      .catch((error) => {
        toast(<NotificationError text={`ERROR: ${error}`} />);
      });
  };

  // connect to wallet
  const connectWallet = async () => {
    myAlgoConnect.connect()
      .then(accounts => {
        const _account = accounts[0];
        setAddress(_account.address);
        fetchBalance(_account.address);
      }).catch(error => {
        toast(<NotificationError text="Could not connect to MyAlgo wallet" />);
        console.error(error);
      })
  };

  // disconnect from wallet
  const disconnectWallet = () => {
    setAddress(null);
    setBalance(null);
  };

  return (
    <div className="App">
      <CusNavbar login={connectWallet} logout={disconnectWallet} logo={logo} balance={balance} address={address} avatar={avatar} />
      <Header headerImg={headerImg} goToCars={goToCars} />
      {address && <Cars carSection={carSection} address={address} balance={balance} fetchBalance={fetchBalance} />}
      <Footer />
    </div>
  );
}

export default App;
