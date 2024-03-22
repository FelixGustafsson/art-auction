import AuctionSearch from "./Search/AuctionSearch";
import Loginbutton from "./Loginbutton";
const Navbar = () => {
  return (
    
      <nav className="navbar navbar-expand-md bg-body-tertiary m-2 d-flex justify-content-between mx-5">
        
          <img src="https://seeklogo.com/images/L/Leonardo_da_Vinci-logo-7467C5036F-seeklogo.com.png" alt="Logo" width="80" height="80" />
          <div className="d-flex">
            <ul className="d-flex gap-4 list-unstyled">
              <li className="nav-item">
                <AuctionSearch/>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Auction list</a>
              </li>
              <li className="nav-item">
                <Loginbutton/>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Help</a>
              </li>
            </ul>
          </div>
        
      </nav>
  )
}

export default Navbar;
