import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JasmyNavbar from './navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import Grid from './grid'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <JasmyNavbar />

    <Container className='mt-5'>
      <Grid />
    </Container>
    
     
    </>
  )
}

export default App
