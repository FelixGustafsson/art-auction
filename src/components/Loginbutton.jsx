import { GlobalContext } from "../GlobalContext";
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Loginbutton(){
    const {login, setLogin} = useContext(GlobalContext)
    const [showModal, setShowModal] = useState(false)


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
                <input type="email" className="form-control" placeholder="Username" aria-label="Username" required/>
                <input type="password" className="form-control" placeholder="Password" aria-label="Password" required/>
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