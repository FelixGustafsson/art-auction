import { GlobalContext } from "../contexts/GlobalContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InfoModal from "../components/InfoModal";
import ProfilePageItem from "../components/ProfilePageItem";
import Dropdown from "../components/Dropdown";
import { periodTags, typeTags, locationTags } from "../../data/FilterNames";


export default function Profile() {
    const {login, setLogin} = useContext(GlobalContext) // login status
    const [userInfo, setUserInfo] = useState([])  // user data from fetch
    const [showEditForm, setShowEditForm] = useState(false) // switches edit account form on and off
    const [showAuctionForm, setShowAuctionForm] = useState(false) //switches create auction form on and off
    const [showSuccessModal, setShowSuccessModal] = useState(false) // handles message after succesful form submission
    const [successText, setSuccessText] = useState("") // provides message text
    const [bids, setBids] = useState([]) // sets and stores user's bids
    const [savedAuctions, setSavedAuctions] = useState([]) // sets and stores user's saved auctions
    const [myAuctions, setMyAuctions] = useState([]) // sets and stores user's active auctions
    const [type, setType] = useState("") // handles type filters in create auctiosn form
    const [period, setPeriod] = useState("") // handles period filters in create auctiosn form
    const [location, setLocation] = useState("") // handles location filters in create auctiosn form
    const currentUser = login // n.b. this is the user's email address
    const redirect = useNavigate()

    const dismiss = () => setShowSuccessModal(false)

    useEffect(() => {
        const fetchUser = async () => {
        const response = await fetch('http://localhost:8000/users');
        const users = await response.json();
        const match = users.find((user) => user.email === currentUser)
        if (match === undefined) {redirect("/")}  // reloads the home page if no-one is logged in
        setUserInfo(match)
        // filters out all except the highest current bid for each object
        const allBids = match.ongoingBids
        const itemIdArray = []
        allBids.forEach(element => {
            const elementID = element.itemId
            !itemIdArray.includes(elementID) && itemIdArray.push(elementID)
        });
        const highestBids = []
        itemIdArray.forEach(id => {
            const itemBids = allBids.filter((bid) => bid.itemId === id)
            let highest = []
            itemBids.forEach(bid => {
                if (highest.length === 0 || bid.bidAmount > highest[0].bidAmount) {
                    highest.length = 0;
                    highest.push(bid)
                }
            })
            highest.forEach(bid => highestBids.push(bid))
        })

        // sets user information to be rendered
        setBids(highestBids)
        setSavedAuctions(match.savedAuctions)
        setMyAuctions(match.myAuctions)
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
            const updatedUser = await fetch (`http://localhost:8000/users/${userInfo.id}`)
            const updatedUserInfo = await updatedUser.json()
            setUserInfo(updatedUserInfo)
            setSuccessText("User information updated.")
            setShowSuccessModal(true)
        }
    }

    const handleSubmitAuction = async(event) => {
        event.preventDefault()
        const form = event.currentTarget.elements
        const filters = [type, period, location]
        const newAuctionInfo = {
            title: form.title.value,
            description: form.description.value,
            artist: form.artist.value,
            startingBid: form.startingBid.value,
            image: form.image.value,
            auctionEnds: form.auctionEnds.value,
            seller: userInfo.id,
            filters: filters
        }
        const response = await fetch("http://localhost:8000/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAuctionInfo)
        })
        if (response.status === 201) {
            setShowAuctionForm(false)
            setSuccessText("New auction created.")
            setShowSuccessModal(true)
        }
        else{
        console.log("Something went wrong")
        }
    }

    return <>
    <div className="container">
        <h1>Welcome {userInfo.name}</h1>
        <button className="btn btn-primary mx-2" onClick={()=>setShowEditForm(true)}>Edit account info</button>
        <button className="btn btn-secondary" onClick={()=>{setLogin(null); redirect("/")}}>Logout</button>
        <div className="row">
        <div className="col">
            <h2>Your bids</h2>
            {bids ? bids.map((bid) => <ProfilePageItem {...bid} bidText="Your bid: " key={bid.bidId}/> ) : <p>You haven't placed any bids!</p>}
        </div>
        <div className="col">
            <h2>Saved auctions</h2>
            {savedAuctions ? savedAuctions.map((auction) => <ProfilePageItem {...auction} key={auction.itemId}/>) : <p>You have no saved auctions!</p> }
        </div>
        <div className="col">
            <h2>Your auctions</h2>
            {myAuctions ? myAuctions.map((auction) => <ProfilePageItem {...auction} bidText={auction.highestBid ? "Highest bid: " : "Your starting price: " } bidAmount={auction.highestBid ? auction.highestBid.amount : auction.startingBid} key={auction.itemId}/> ) : <p>You have no active auctions!</p>}
            <div className="d-flex justify-content-center my-4">
            <button type="button" className="btn btn-success" onClick={()=>setShowAuctionForm(true)}>Create new auction</button>
            </div>
        </div>
        </div>

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
                <div className='mb-3'>Period tag: <br/> 
                <Dropdown optionArray={periodTags} setVariable={setPeriod}/>
                </div>
                <div className='mb-3'>Type tag:  <br/>
                <Dropdown optionArray={typeTags} setVariable={setType}/>
                </div>
                <div className='mb-3'>Location tag:  <br/>
                <Dropdown optionArray={locationTags} setVariable={setLocation}/>
                </div>
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

        <InfoModal showInfoModal={showSuccessModal} title="Success!" infoText={successText} dismiss={dismiss}/> 
    </div>
    </>
}