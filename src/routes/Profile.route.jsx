import { GlobalContext } from "../contexts/GlobalContext"
import { FetchContext } from '../contexts/FetchContext';
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InfoModal from "../components/InfoModal";
import ProfilePageItem from "../components/Profile/ProfilePageItem";
import Dropdown from "../components/Dropdown";
import EditInfoForm from "../components/Profile/EditInfoForm";
import { periodTags, typeTags, locationTags } from "../../data/FilterNames";


export default function Profile() {
    const { login, setLogin } = useContext(GlobalContext) // login status
    const [userInfo, setUserInfo] = useState([])  // user data from fetch
    const [showEditForm, setShowEditForm] = useState(false) // switches edit account form on and off
    const [showAuctionForm, setShowAuctionForm] = useState(false) //switches create auction form on and off
    const [showSuccessModal, setShowSuccessModal] = useState(false) // handles message after succesful form submission
    const [successText, setSuccessText] = useState("") // provides message text
    const [bids, setBids] = useState([]) // sets and stores user's bids
    const [savedAuctions, setSavedAuctions] = useState([]) // sets and stores user's saved auctions
    const [myAuctions, setMyAuctions] = useState([]) // sets and stores user's active auctions
    const [type, setType] = useState("") // handles type filters in create auction form
    const [period, setPeriod] = useState("") // handles period filters in create auction form
    const [location, setLocation] = useState("") // handles location filters in create auction form
    const { fetchGeneral, getFetchGeneral } = useContext(FetchContext);  // handles fetch requests
    const redirect = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const dismiss = () => setShowSuccessModal(false)

    const handleDelete = async (id) => {
        const response = await fetch(`/api/favorite/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        //if (response.ok) {
        setShowDeleteModal(true)
        //}

    }

    useEffect(() => {
        const fetchUser = async () => {
            login === null && redirect("/")   // reloads the home page if no-one is logged in
            // fetch user bids
            const allBids = await getFetchGeneral(`/api/bids/user/${login}`);
            // fetch user saved auctions
            const favorites = await getFetchGeneral(`/api/favorites/${login}`);
            // fetch user auctions
            const auctions = await getFetchGeneral(`/api/items/user/${login}`);

            // filters out all except the highest current bid for each object
            const itemIdArray = [];
            allBids !== null && allBids.forEach(element => {
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
                highest && highest.forEach(bid => highestBids.push(bid))
            })

            // sets user information to be rendered
            setBids(highestBids)
            setSavedAuctions(favorites)
            setMyAuctions(auctions)
        }
        fetchUser();
    }, [showDeleteModal]);

    const handleLogout = async () => {
        const response = await fetch("/api/login", { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
        setLogin(null)
        console.log(response)
        console.log(login)
    }


    const handleSubmitAuction = async (event) => {
        event.preventDefault()
        const form = event.currentTarget.elements

        const newAuctionInfo = {
            title: form.title.value,
            description: form.description.value,
            artist: form.artist.value,
            startingBid: form.startingBid.value,
            image: form.image.value,
            auctionEnds: form.auctionEnds.value,
            seller: userInfo.id,
            location: location,
            period: period,
            type: type
        }

        const response = await fetchGeneral('/api/item', 'POST', newAuctionInfo)

        if (response.status === 201) {
            setShowAuctionForm(false)
            setSuccessText("New auction created.")
            setShowSuccessModal(true)
        }

    }

    return <>
        <div className="container">
            <h1 className="mb-4">Welcome {userInfo.name}</h1>
            <button className="btn btn-primary mx-2" onClick={() => setShowEditForm(true)}>Edit account info</button>
            <button className="btn btn-secondary" onClick={() => { handleLogout(); redirect("/") }}>Logout</button>
            <div className="row my-4">
                <div className="col">
                    <h2 className="mb-4">Your bids</h2>
                    {bids.length > 0 ? bids.map((bid) => <ProfilePageItem {...bid} bidText="Your bid: " key={bid.itemId} />) : <p>You haven't placed any bids!</p>}
                </div>
                <div className="col">
                    <h2 className="mb-4">Saved auctions</h2>
                    {savedAuctions.length > 0 ? savedAuctions.map((auction) => <ProfilePageItem {...auction} setSavedAuctions={setSavedAuctions} key={auction._id} handleDelete={handleDelete} deleteButton itemId={auction._id} />) : <p>You have no saved auctions!</p>}
                </div>
                <div className="col">
                    <h2 className="mb-4">Your auctions</h2>
                    {myAuctions ? myAuctions.map((auction) => <ProfilePageItem {...auction} itemId={auction._id} editButton key={auction._id} />) : <p>You have no active auctions!</p>}
                    <div className="d-flex justify-content-center my-4">
                        <button type="button" className="btn btn-success" onClick={() => setShowAuctionForm(true)}>Create new auction</button>
                    </div>
                </div>
            </div>

            <EditInfoForm setSuccessText={setSuccessText} userInfo={userInfo} setUserInfo={setUserInfo} setShowSuccessModal={setShowSuccessModal} showEditForm={showEditForm} setShowEditForm={setShowEditForm} />

            <Modal show={showAuctionForm} onHide={() => setShowAuctionForm(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new auction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitAuction} return="false">
                        <input type="text" name="title" className="form-control mb-2" placeholder="Title" aria-label="title" required />
                        <input type="text" name="description" className="form-control mb-2" placeholder="Description" aria-label="description" required />
                        <input type="text" name="artist" className="form-control mb-2" placeholder="Artist" aria-label="artist" required />
                        <input type="number" name="startingBid" className="form-control mb-2" placeholder="Starting price" aria-label="startingBid" required />
                        <input type="text" name="image" className="form-control mb-2" placeholder="Image link" aria-label="image" required />
                        <input type="datetime-local" name="auctionEnds" className="form-control mb-2" placeholder="End date" aria-label="auctionEnds" required />
                        <div className='mb-3'>Period tag: <br />
                            <Dropdown optionArray={periodTags} setVariable={setPeriod} />
                        </div>
                        <div className='mb-3'>Type tag:  <br />
                            <Dropdown optionArray={typeTags} setVariable={setType} />
                        </div>
                        <div className='mb-3'>Location tag:  <br />
                            <Dropdown optionArray={locationTags} setVariable={setLocation} />
                        </div>
                        <Button variant="secondary" className="my-3" onClick={() => setShowAuctionForm(false)}>
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

            <InfoModal showInfoModal={showSuccessModal} title="Success!" infoText={successText} dismiss={dismiss} />
            <InfoModal showInfoModal={showDeleteModal} title="Success" infoText="You've successfully deleted your favorite auction. Shame on you!" dismiss={() => setShowDeleteModal(false)} />
        </div>
    </>
}