import './App.css'
import JasmyNavbar from './navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import NFTBuyPage from './NFTBuy'
import { Router, Routes, Route } from 'react-router-dom'
import NFTCollection from './gridPage'

function App() {

  return (
    <>
    <JasmyNavbar />
        <Routes>
          <Route path='/' element ={<NFTCollection />} />
          <Route path='/buy/:value' element={<NFTBuyPage />} />
        </Routes> 
    </>
  )
}

export default App
