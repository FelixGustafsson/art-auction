import { GlobalContext } from '../contexts/GlobalContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InfoModal from './InfoModal';

export default function Loginbutton() {
  // various states needed for functionality:
  const { login, setLogin } = useContext(GlobalContext); // global login status
  const [showModal, setShowModal] = useState(false); // show & hide login & register modal
  const [selectedValue, setSelectedValue] = useState('login'); //login & register radio buttons: default=login
  const [loginError, setLoginError] = useState(null); //controls 2 different error messages
  const [showSuccessModal, setShowSuccessModal] = useState(false); //show & hide success modal
  const [successText, setSuccessText] = useState(
    "If you're reading this something has gone wrong"
  ); // text for success modal

  // resets default radio button for login modal (i.e. login)
  useEffect(() => setSelectedValue('login'), [showModal]);

  // 2 functions for closing the 2 modal windows (login & login/register success message)
  const handleClose = () => {
    setShowModal(false);
    setLoginError(null);
  };
  const dismiss = () => setShowSuccessModal(false);

  // for redirecting to profile page when user logs in & clicks profile button
  const redirect = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const purpose = form.elements.login.checked ? 'login' : 'register';
    const userCredentials = {
      email: form.elements.email.value,
      password: form.elements.password.value,
    };
    const response = await fetch('http://localhost:8000/users');
    const users = await response.json();
    const match = users.find((user) => user.email === userCredentials.email);
    if (purpose === 'login') {
      if (match === undefined) {
        setLoginError('User not found. Select register to create an account.');
      } else if (match.password === userCredentials.password) {
        setSuccessText('Login successful.');
        setLogin(match);
        setShowModal(false);
        setShowSuccessModal(true);
        setLoginError(null);
      } else if (match.password !== userCredentials.password) {
        setLoginError('Incorrect password - please try again.');
      } else {
        console.log('Unknown error with login has occurred');
      }
    } else if (purpose === 'register') {
      if (match === undefined) {
        let response = await fetch('http://localhost:8000/users', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userCredentials),
        });
        if (response.status === 201) {
          setSuccessText('Registration successful.');
          setShowModal(false);
          setShowSuccessModal(true);
          setLoginError(null);
        } else {
          setLoginError('Unable to register new user.');
        }
      } else {
        setLoginError('This email address already has an account!');
      }
    } else {
      console.log('Something has gone wrong with the radio buttons.');
    }
  }

  return (
    <>
      <button
        className='btn btn-primary'
        onClick={() => (login ? redirect('/profile') : setShowModal(true))}
      >
        {login ? 'Profile' : 'Login'}
      </button>
      {
        <Modal show={showModal} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedValue === 'login' ? 'Log in' : 'Register'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} return='false'>
              <div key={`inline-radio`} className='mb-3'>
                <Form.Check
                  inline
                  label='Log in'
                  name='login'
                  type='radio'
                  id='login'
                  checked={selectedValue === 'login'}
                  onChange={() => setSelectedValue('login')}
                />
                <Form.Check
                  inline
                  label='Register'
                  name='register'
                  type='radio'
                  id='register'
                  checked={selectedValue === 'register'}
                  onChange={() => setSelectedValue('register')}
                />
              </div>
              <input
                type='email'
                name='email'
                autoComplete='email'
                className='form-control mb-2'
                placeholder='email'
                aria-label='email'
                required
              />
              <input
                type='password'
                name='password'
                className='form-control'
                placeholder='Password'
                aria-label='Password'
                required
              />
              <Button
                variant='secondary'
                className='my-3'
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button variant='primary' className='my-3 ms-2' type='submit'>
                {selectedValue === 'login' ? 'Login' : 'Register'}
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {loginError && (
              <div className='alert alert-warning' role='alert'>
                {loginError}
              </div>
            )}
          </Modal.Footer>
        </Modal>
      }
      <InfoModal showInfoModal={showSuccessModal} title="Success!" infoText={successText} dismiss={dismiss} />
    </>
  );
}
