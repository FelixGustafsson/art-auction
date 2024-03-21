import LinkList from './LinkList';

function Footer() {
  const aboutLinks = [
    { to: '#', text: 'About' },
    { to: '#', text: 'Carrier' },
  ];
  const buyLinks = [
    { to: '#', text: 'How to buy' },
    { to: '#', text: 'Purchase Terms' },
  ];
  const sellLinks = [
    { to: '#', text: 'How to sell' },
    { to: '#', text: 'Sales Terms' },
  ];
  const accountLinks = [
    { to: '#', text: 'Log in' },
    { to: '#', text: 'Register account' },
  ];
  const policyLinks = [
    { to: '#', text: 'Terms of user' },
    { to: '#', text: 'Cookie Policy' },
    { to: '#', text: 'Data Protection and Privacy Notice' },
    { to: '#', text: 'Other Policies' },
  ];

  return (
    <footer>
      <div className='border-top border-bottom w-auto d-flex justify-content-between p-5'>
        <div>
          <h4>About</h4>
          <LinkList links={aboutLinks} />
        </div>
        <div>
          <h4>Buy</h4>
          <LinkList links={buyLinks} />
        </div>
        <div>
          <h4>Sell</h4>
          <LinkList links={sellLinks} />
        </div>
        <div>
          <h4>My account</h4>
          <LinkList links={accountLinks} />
        </div>
      </div>
      <div className='d-flex justify-content-between p-5'>
        <LinkList links={policyLinks} />
      </div>
    </footer>
  );
}

export default Footer;
