import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from "./routes/Home.route.jsx"
import ArtInfo from './routes/ArtInfo.route.jsx'



function App() {
 

  return (
    <>
      <BrowserRouter>  
      <Navbar/> 
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Art" element={<ArtInfo/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
