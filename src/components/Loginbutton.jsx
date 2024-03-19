import { GlobalContext } from "../GlobalContext";
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


export default function Loginbutton(){
    const {login, setLogin} = useContext(GlobalContext)
    const [showModal, setShowModal] = useState(false)
    const [selectedValue, setSelectedValue] = useState("login")


    const handleClose = () => setShowModal(false);
    const handleRadioChange = (value) => setSelectedValue(value) 


    async function handleSubmit(event) {
        event.preventDefault()
        const form = event.currentTarget
        const purpose = form.elements.login.checked ? "login" : "register"
        const userCredentials = {email: form.elements.email.value, password: form.elements.password.value}
        if (purpose === "login") {
            setLogin(userCredentials.email)
        }
        else if (purpose === "register") {
            
        }
        else {(console.log("?????????????"))}
    }
   
        return(
            <>
            <button className="btn btn-primary" onClick={()=>setShowModal(true)}>{login ? "Profile" : "Login"}</button>
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
        </Modal>
        )   
        }
        </>
        )

}