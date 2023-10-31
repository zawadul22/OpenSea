import { useEffect, useState } from 'react';

import './App.css'
import JasmyNavbar from './navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import NFTBuyPage from './NFTBuy'
import { Router, Routes, Route } from 'react-router-dom'
import NFTCollection from './gridPage'
import NFTMintv2 from './NFTMintv2';

// import walletContext from './WalletContext';

function App() {
  const [isLog, setIsLog] = useState(false) // Is the metamask connected?
  const [meta, setMeta] = useState( // set wallet address
    {}
  );

  console.log("LOGGGG:", isLog)

  const loginHandler = () => {
    setIsLog(true)
  }

  const logoutHandler = () => {
    setIsLog(false)
  }

  const connectMeta = (e) => {
    setMeta(e);
  }

  useEffect(()=>{
    let val = localStorage.getItem("Connected");
    if(val === "true"){
      setIsLog(true)
    }
    else if(val === "false"){
      setIsLog(false)
    }
    
  },[isLog])

  console.log('Inside App.jsx file - ', meta)

  return (
    <>
      <JasmyNavbar
        onLogin={loginHandler}
        onLogout={logoutHandler}
        isLog={isLog}
        connectMeta={(e) => connectMeta(e)} meta={meta} />
      <Routes>
        <Route path='/' element={<NFTCollection />} />
        <Route path='/buy/:value' element={<NFTBuyPage />} />
        <Route path='/mint2' element={<NFTMintv2 isLog={isLog} meta={meta}/>} />
      </Routes>
    </>
  )
}

export default App
