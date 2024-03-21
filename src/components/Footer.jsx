import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className='border-top border-bottom w-auto d-flex justify-content-between p-5 '>
        <div>
          <h4>About</h4>
          <ul className='list-unstyled '>
            <li>
              <Link className='text-decoration-none text-secondary' to='#'>
                About
              </Link>
            </li>
            <li>
              <Link className='text-decoration-none text-secondary' to='#'>
                Carrier
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Buy</h4>
          <ul className='list-unstyled'>
            <li>
              <Link className='text-decoration-none text-secondary' to='#'>
                How to buy
              </Link>
            </li>
            <li>
              <Link className='text-decoration-none text-secondary' to='#'>
                Purchase Terms
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Sell</h4>
          <ul className='list-unstyled'>
            <li>
              <Link className='text-decoration-none text-secondary' to='#'>
                How to sell
              </Link>
            </li>
            <li>
              <Link className='text-decoration-none text-secondary' to='#'>
                Sales Terms
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>My account</h4>
          <ul className='list-unstyled'>
            <li>
              <Link className='text-decoration-none text-secondary' to='#'>
                Log in
              </Link>
            </li>
            <li>
              <Link className='text-decoration-none text-secondary' to='#'>
                Register account
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='d-flex justify-content-around p-5'>
        <Link className='text-decoration-none text-secondary' to='#'>
          Terms of user
        </Link>
        <Link className='text-decoration-none text-secondary' to='#'>
          Cookie Policy
        </Link>
        <Link className='text-decoration-none text-secondary' to='#'>
          Data Protection and Privacy Notice
        </Link>
        <Link className='text-decoration-none text-secondary' to='#'>
          Other Policies
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
