import { GlobalContext } from '../../contexts/GlobalContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoModal from '../InfoModal';
import LoginModal from './LoginModal';

export default function Loginbutton() {
  // various states needed for functionality:
  const { login } = useContext(GlobalContext); // global login status
  const [showModal, setShowModal] = useState(false); // show & hide login & register modal
  const [showSuccessModal, setShowSuccessModal] = useState(false); //show & hide success modal
  const [successText, setSuccessText] = useState(
    "If you're reading this something has gone wrong"
  ); // text for success modal

  // closes info modal
  const dismiss = () => setShowSuccessModal(false);

  // for redirecting to profile page when user logs in & clicks profile button
  const redirect = useNavigate();

  return (
    <>
      <button
        id='loginButton'
        className='btn btn-primary'
        onClick={() => (login ? redirect('/profile') : setShowModal(true))}
      >
        {login ? 'Profile' : 'Login'}
      </button>
      <LoginModal showModal={showModal} setShowModal={setShowModal} setSuccessText={setSuccessText} setShowSuccessModal={setShowSuccessModal} purpose='login'/>
      <InfoModal showInfoModal={showSuccessModal} title="Success!" infoText={successText} dismiss={dismiss} />
    </>
  );
}
