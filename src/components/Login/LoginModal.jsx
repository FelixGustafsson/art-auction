import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useContext } from 'react';
import { FetchContext } from '../../contexts/FetchContext';
import { GlobalContext } from '../../contexts/GlobalContext';


export default function LoginModal({ showModal, setShowModal, setSuccessText, setShowSuccessModal, purpose }) {

const { setLogin } = useContext(GlobalContext); // create a global login 
const { getFetchGeneral, fetchGeneral } = useContext(FetchContext);  // handles fetch requests
const [selectedValue, setSelectedValue] = useState(purpose); //login & register radio buttons: default=login
const [loginError, setLoginError] = useState(null); //controls error messages

// function for closing the modal window 
const handleClose = () => {
    setShowModal(false);
    setLoginError(null);
  };

async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const purpose = form.elements.login.checked ? 'login' : 'register';
    const userCredentials = {
      email: form.elements.email.value,
      password: form.elements.password.value,
    };
    const users = await getFetchGeneral('/users');
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
    } 
    else if (purpose === 'register') {
      if (match === undefined) {
        const response = await fetchGeneral('/users', 'POST', userCredentials);
        if (response.status === 201) {
          console.log("It worked")
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
    }
  }

return <>
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
</>
}