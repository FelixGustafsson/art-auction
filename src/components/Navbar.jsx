const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-md bg-body-tertiary m-2">
        <div className="container-fluid">
          <a className="Logo" href="#"><img src="https://seeklogo.com/images/L/Leonardo_da_Vinci-logo-7467C5036F-seeklogo.com.png" alt="Logo" width="80" height="80" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-4 mb-lg-0">

              <li className="nav-item">
                <a className="nav-link" href="#">Auction list</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Help</a>
              </li>
            </ul>
            <div class="container text-center">
              <div class="row justify-content-md-center">
                <form class="d-flex">
                  <input class="form-control me-2" type="text" placeholder="Search"></input>
                    <button class="btn btn-primary" type="button">Search</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>

    </div>


  )
}

export default Navbar;
