import './App.css'
import JasmyNavbar from './navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import NFTBuyPage from './NFTBuy'
import { Router, Routes, Route } from 'react-router-dom'
import NFTCollection from './gridPage'
import NFTMint from './NFTMint';

function App() {

  return (
    <>
    <JasmyNavbar />
        <Routes>
          <Route path='/' element ={<NFTCollection />} />
          <Route path='/buy/:value' element={<NFTBuyPage />} />
          <Route path='/mint' element={<NFTMint />} />
        </Routes> 
    </>
  )
}

export default App
