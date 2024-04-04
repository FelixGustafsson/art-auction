import AuctionSearch from './Search/AuctionSearch';
import Loginbutton from './Login/Loginbutton.jsx';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className='navbar bg-body-tertiary pd-flex justify-content-between px-5'>
      <div className='d-flex align-items-center'>
        <img
          src='https://seeklogo.com/images/L/Leonardo_da_Vinci-logo-7467C5036F-seeklogo.com.png'
          alt='Logo'
          width='80'
          height='80'
          className='me-5'
        />
        <AuctionSearch />
      </div>
      <div className='d-flex'>
        <ul className='d-flex gap-4 list-unstyled align-items-center'>
          <li className='nav-item'>
            <a className='nav-link btn' onClick={() => navigate('/')}>
              Auction list
            </a>
          </li>
          <li className='nav-item'>
            <Loginbutton />
          </li>
          <li className="nav-item">
            <a className="nav-link btn" onClick={() => navigate("/helpcenter")}>Help</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
