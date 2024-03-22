import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx';
import Home from './routes/Home.route.jsx';
import Profile from './routes/Profile.route.jsx';
import Loginbutton from './components/Loginbutton.jsx';
import ArtInfo from './routes/ArtInfo.route.jsx';
import { GlobalProvider } from './contexts/GlobalContext.jsx';
import { ListingProvider } from './contexts/ListingContext.jsx';

function App() {
  return (
    <>
      <GlobalProvider>
        <ListingProvider>
          <BrowserRouter>
            <Navbar />
            
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/info/:id' element={<ArtInfo />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ListingProvider>
      </GlobalProvider>
    </>
  );
}

export default App;
