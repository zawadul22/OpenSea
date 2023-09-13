import { useState } from 'react'
import './App.css'
import JasmyNavbar from './navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import Grid from './grid'
import NFTPagination from './pagination'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NFTBuyPage from './NFTBuy'
import { Router, Routes, Route } from 'react-router-dom'
import NFTCollection from './gridPage'



function App() {

  return (
    <>
    <JasmyNavbar />

        <Routes>
          <Route path='/' element ={<NFTCollection />} />
          <Route path='/buy' element={<NFTBuyPage />} />
        </Routes> 

      
    </>
    // <>
    // <JasmyNavbar />
    // <NFTBuyPage />
    // </>
   
  )
}

export default App
