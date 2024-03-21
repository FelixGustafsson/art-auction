import { GlobalContext } from "../GlobalContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function Profile() {
    const {login, setLogin} = useContext(GlobalContext)  // global login status
    const [userInfo, setUserInfo] = useState([])
    const [showEditForm, setShowEditForm] = useState(false)
    const currentUser = login
    const redirect = useNavigate()
    
    useEffect(() => {
        const fetchUser = async () => {
        const response = await fetch('http://localhost:8000/users');
        const users = await response.json();
        const match = users.find((user) => user.email === currentUser)
        if (match === undefined) {console.log("error with profile - user not found")}
        setUserInfo(match)
        };
        fetchUser();
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        console.log(form)
    }

    return <>
        <h1>Welcome {userInfo.name}</h1>
        <button className="btn btn-primary" onClick={()=>setShowEditForm(true)}>Edit account info</button>
        <button className="btn btn-secondary" onClick={()=>{setLogin(null); redirect("/")}}>Logout</button>
        {<Modal show={showEditForm} onHide={()=>setShowEditForm(false)} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Edit account information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit} return="false">
                <input type="text" name="username" className="form-control mb-2" placeholder="Username" aria-label="username" required/>
                <input type="text" name="name" className="form-control mb-2" placeholder="Name" aria-label="name" required/>
                <input type="text" name="surname" className="form-control mb-2" placeholder="Surname" aria-label="surname" required/>
                <input type="email" name="email" autoComplete="email" className="form-control mb-2" placeholder="Email" aria-label="email" required/>
                <input type="text" name="password" className="form-control mb-2" placeholder="Password" aria-label="password" required/>
            <Button variant="secondary" className="my-3" onClick={()=>setShowEditForm(false)}>
            Cancel
            </Button>
            <Button variant="primary" className="my-3 ms-2" type="submit">
            Update your information
            </Button>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>           
        }
       
    </>
}