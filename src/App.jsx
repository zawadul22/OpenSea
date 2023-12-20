import { useEffect, useState } from 'react';
import './App.css'
import JasmyNavbar from './navbar';
import JasmyNavbar2 from './navbar2';
import 'bootstrap/dist/css/bootstrap.min.css';
import NFTBuyPage from './NFTBuy'
import { Router, Routes, Route } from 'react-router-dom'
import NFTCollection from './gridPage'
import NFTMintv2 from './NFTMintv2';
import ConnectWallet from './connectWallet';
import Profile from './MyProfile';
import View from './NFTView';
import { FlashAuto } from '@mui/icons-material';
import Footer from './FooterPage';
import NFTMintv3 from './NFTMintV3';

function App() {

  const [isLog, setIsLog] = useState(() => {
    if (localStorage.getItem("Connected") === 'true') {
      return true;
    }
    else if (localStorage.getItem("Connected") === 'false') {
      return false;
    }
  }) // Is the metamask connected?

  const loginHandler = () => {
    setIsLog(true)
  }

  const logoutHandler = () => {
    setIsLog(false)
  }

  useEffect(() => {
    let val = localStorage.getItem("Connected");
    if (val === "true") {
      setIsLog(true)
    }
    else if (val === "false") {
      setIsLog(false)
    }

  }, [])

  return (
    <>
      <ConnectWallet>
        <JasmyNavbar
          onLogin={loginHandler}
          onLogout={logoutHandler}
          isLog={isLog} />

        <JasmyNavbar2
          onLogin={loginHandler}
          onLogout={logoutHandler}
          isLog={isLog} />
        <Routes>
          <Route path='/' element={<NFTCollection />} />
          <Route path='/buy/:value' element={<NFTBuyPage />} />
          <Route path='/mint2' element={<NFTMintv2 isLog={isLog} />} />
          <Route path='/mint3' element={<NFTMintv3 isLog={isLog} />} />
          <Route path='/myprofile' element={<Profile />} />
          <Route path='/view/:value' element={<View />} />
        </Routes>
        <Footer />
      </ConnectWallet>
    </>
  )
}

export default App
