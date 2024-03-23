


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx';
import Home from './routes/Home.route.jsx';
import Profile from './routes/Profile.route.jsx';
import Loginbutton from './components/Loginbutton.jsx';
import { GlobalProvider } from './contexts/GlobalContext.jsx';
import ArtInfo from './routes/ArtInfo.route.jsx'
import HelpCenter from './routes/HelpCenter.route.jsx';




function App() {
  return (
    <>
      <GlobalProvider>

        <BrowserRouter>
          <Navbar />
          <Loginbutton />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path="/artinfo/:id" element={<ArtInfo/>}/>
            <Route path='/helpcenter' element={<HelpCenter/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
