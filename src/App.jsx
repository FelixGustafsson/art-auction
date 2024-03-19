import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from "./routes/Home.route.jsx"



function App() {
 

  return (
    <>
      <BrowserRouter>  
      <Navbar/> 
        <Routes>
          <Route path="/" element={<Home/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
