import { GlobalContext } from "../GlobalContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function Loginbutton(){
    const {login, setLogin} = useContext(GlobalContext)
    const [showModal, setShowModal] = useState(false)
    const [selectedValue, setSelectedValue] = useState("login")
    const [loginError, setLoginError] = useState(null)
    const [showLoginSuccess, setShowLoginSuccess] = useState(false)

    const handleClose = () => {
        setShowModal(false); 
        setLoginError(null)
    }
    const dismiss = () => setShowLoginSuccess(false)
    const handleRadioChange = (value) => setSelectedValue(value) 
    const redirect = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        const form = event.currentTarget
        const purpose = form.elements.login.checked ? "login" : "register"
        const userCredentials = {email: form.elements.email.value, password: form.elements.password.value}
        if (purpose === "login") {
            const response = await fetch("http://localhost:8000/users")
            const users = await response.json()
            const match = users.find((user) => user.email === userCredentials.email)
            if (match === undefined) {
                setLoginError(1)
            }
            else if (match.password === userCredentials.password) {
                setLogin(userCredentials.email)
                setShowModal(false)
                setShowLoginSuccess(true)
            }
            else if (match.password !== userCredentials.password) {
                setLoginError(2)
            }
            else {console.log("Unknown error with login has occurred")}
        }
        else if (purpose === "register") {
            
        }
        else {(console.log("Something has gone wrong with the radio buttons."))}
    }
   
        return(
            <>
            <button className="btn btn-primary" onClick={()=>login ? redirect("/profile") : setShowModal(true)}>{login ? "Profile" : "Login"}</button>
        {
        showModal && (
        <Modal show={showModal} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>{selectedValue === "login" ? "Log in" : "Register"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit} return="false">
            <div key={`inline-radio`} className="mb-3">
            <Form.Check
            inline
            label="Log in"
            name="login"
            type="radio"
            id="login"
            checked={ 
                selectedValue === 
                "login"
            } 
            onChange={() => 
                handleRadioChange( 
                    "login"
                ) 
            }           />
          <Form.Check
            inline
            label="Register"
            name="register"
            type="radio"
            id="register"
            checked={ 
                selectedValue === 
                "register"
            } 
            onChange={() => 
                handleRadioChange( 
                    "register"
                ) 
            }           />
            </div>
            <input type="email" name="email" autoComplete="email" className="form-control mb-2" placeholder="Username" aria-label="Username" required/>
            <input type="password" name="password" className="form-control" placeholder="Password" aria-label="Password" required/>
            <Button variant="secondary" className="my-3" onClick={handleClose}>
            Cancel
            </Button>
            <Button variant="primary" className="my-3 ms-2" type="submit">
            {selectedValue === "login" ? "Login" : "Register"}
            </Button>
            </Form>
            </Modal.Body>
            <Modal.Footer>
        { loginError === 1 && 
            <div className="alert alert-warning" role="alert">
            User not found. Did you mean to register?
            </div>
        }   
        { loginError === 2 && 
            <div className="alert alert-danger" role="alert">
            Incorrect password - please try again.
            </div>
        }    
            </Modal.Footer>
        </Modal>
        )   
        }
        {
            showLoginSuccess && 
            <Modal show={showLoginSuccess} onHide={dismiss} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Success!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Login successful.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={dismiss}>Close</Button>
            </Modal.Footer>
          </Modal>
        }
        </>
    )
}