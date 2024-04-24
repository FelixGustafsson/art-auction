// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer.jsx';
import Home from './routes/Home.route.jsx';
import Profile from './routes/Profile.route.jsx';
import ArtInfo from './routes/ArtInfo.route.jsx';
import { GlobalProvider } from './contexts/GlobalContext.jsx';
import BidPage from './routes/Bid.route.jsx';
import { FetchProvider } from './contexts/FetchContext.jsx';

function App() {
  return (
    <>
      <FetchProvider>
        <GlobalProvider>
            <BrowserRouter>

              <Navbar />

              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/info/:id' element={<ArtInfo />} />
                <Route path='/bid/:id' element={<BidPage />} />
              </Routes>
              <Footer />
            </BrowserRouter>
        </GlobalProvider>
      </FetchProvider>
    </>
  );
}

export default App;
