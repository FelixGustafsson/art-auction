import { GlobalContext } from "../contexts/GlobalContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SuccessModal from "../components/SuccessModal";


export default function Profile() {
    const {login, setLogin} = useContext(GlobalContext)  // global login status
    const [userInfo, setUserInfo] = useState([])
    const [showEditForm, setShowEditForm] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showAuctionForm, setShowAuctionForm] = useState(false)
    const [successText, setSuccessText] = useState("")
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

    const handleSubmitInfo = async (event) => {
        event.preventDefault()
        const form = event.currentTarget.elements
        const newUserInfo = {
            username: form.username.value,
            name: form.name.value,
            lastname: form.lastname.value,
            email: form.email.value,
            password: form.password.value
        }
        const response = await fetch(`http://localhost:8000/users/${userInfo.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserInfo)
        })
        if (response.status === 200) {
            setShowEditForm(false)
            setSuccessText("User information updated.")
            setShowSuccessModal(true)
            const updatedUser = await fetch (`http://localhost:8000/users/${userInfo.id}`)
            const updatedUserInfo = await updatedUser.json()
            setUserInfo(updatedUserInfo)
        }
    }

    const handleSubmitAuction = async(event) => {
        event.preventDefault()
        const form = event.currentTarget.elements
        const newAuctionInfo = {
            title: form.title.value,
            description: form.description.value,
            artist: form.artist.value,
            startingBid: form.startingBid.value,
            image: form.image.value,
            auctionEnds: form.auctionEnds.value
        }
        const response = await fetch("http://localhost:8000/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAuctionInfo)
        })
        if (response.status === 201) {
            setShowEditForm(false)
            setSuccessText("New auction created.")
            setShowSuccessModal(true)
        }
        else{
        console.log(response.status)
        }
    }

    return <>
        <h1>Welcome {userInfo.name}</h1>
        <button className="btn btn-primary" onClick={()=>setShowEditForm(true)}>Edit account info</button>
        <button className="btn btn-secondary" onClick={()=>{setLogin(null); redirect("/")}}>Logout</button>
        <button type="button" className="btn btn-success" onClick={()=>setShowAuctionForm(true)}>Create new auction</button>
        <button onClick={()=>(console.log(userInfo))}>show user info</button>
        <Modal show={showEditForm} onHide={()=>setShowEditForm(false)} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Edit account information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmitInfo} return="false">
                <input type="text" name="username" className="form-control mb-2" placeholder="Username" aria-label="username" required/>
                <input type="text" name="name" className="form-control mb-2" placeholder="Name" aria-label="name" required/>
                <input type="text" name="lastname" className="form-control mb-2" placeholder="Surname" aria-label="lastname" required/>
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

          <Modal show={showAuctionForm} onHide={()=>setShowAuctionForm(false)} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Create a new auction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmitAuction} return="false">
                <input type="text" name="title" className="form-control mb-2" placeholder="Title" aria-label="title" required/>
                <input type="text" name="description" className="form-control mb-2" placeholder="Description" aria-label="description" required/>
                <input type="text" name="artist" className="form-control mb-2" placeholder="Artist" aria-label="artist" required/>
                <input type="number" name="startingBid" className="form-control mb-2" placeholder="Starting price" aria-label="startingBid" required/>
                <input type="text" name="image" className="form-control mb-2" placeholder="Image link" aria-label="image" required/>
                <input type="datetime-local" name="auctionEnds" className="form-control mb-2" placeholder="End date" aria-label="auctionEnds" required/>
            <Button variant="secondary" className="my-3" onClick={()=>setShowAuctionForm(false)}>
            Cancel
            </Button>
            <Button variant="primary" className="my-3 ms-2" type="submit">
            Create auction
            </Button>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>     
          
        <SuccessModal showSuccessModal={showSuccessModal} successText={successText} dismiss={()=>setShowSuccessModal(false)}/> 
    </>
}