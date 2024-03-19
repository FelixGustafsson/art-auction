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
    function handleLogin() {
        
    }
   
        return(
            <>
            <button className="btn btn-primary" onClick={()=>setShowModal(true)}>{login ? "Profile" : "Login"}</button>
        {
        showModal && (
        <Modal show={showModal} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
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
            onClick={() => setSelectedValue("login")}
          />
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
            onClick={() => setSelectedValue("register")}

          />
                </div>
                <input type="email" name="email" autoComplete="email" className="form-control" placeholder="Username" aria-label="Username" required/>
                <input type="password" name="password" className="form-control" placeholder="Password" aria-label="Password" required/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cancel
            </Button>
            <Button variant="primary" onClick={handleLogin}>
            Log in
            </Button>
            </Modal.Footer>
        </Modal>
        )   
        }
            </>
        )

}