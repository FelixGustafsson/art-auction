import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from "./routes/Home.route.jsx"
import Profile from './routes/Profile.route.jsx'
import Loginbutton from './components/Loginbutton.jsx'
import { GlobalProvider } from './GlobalContext.jsx'


function App() {
 

  return (
    <>
      <GlobalProvider>
      <BrowserRouter>  
      <Navbar/> 
      <Loginbutton/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
