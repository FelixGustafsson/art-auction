import { useNavigate } from 'react-router-dom';
import { FetchContext } from '../contexts/FetchContext';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import InfoModal from "./InfoModal"
import moment from "moment"

const AuctionListItem = ({ auction }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { fetchGeneral, getFetchGeneral } = useContext(FetchContext)
  const { login } = useContext(GlobalContext)
  const [tempFavoriteAuction, setTempFavoriteAuction] = useState([])
  const [highestBid, setHighestBid] = useState('No bids yet')
  const navigate = useNavigate();
  const handleMoreInfo = (id) => {
    navigate(`/info/${id}`);
  };
  const handleBidNow = (id) => {
    navigate(`/bid/${id}`);
  };

  const dismiss = () => {
    setShowSuccessModal(!showSuccessModal)
  }

  const fetchHighestBid = async (id) => {
    try {
      let highestBid = 0;
      const result = await getFetchGeneral(`/api/bids/${id}`)

      console.log("ALL BIDS:", result)
      for (const bid of result.objectBids) {
        if (bid.amount > highestBid) {
          highestBid = bid.amount
        }
      }
      setHighestBid(highestBid > 0 ? highestBid : "No bids yet")
    } catch (error) {
      console.log(error)
    }
  }



  const renderFavoriteAuctions = (currentAuction) => {
    let result = false;
    if (login.savedAuctions) {
      for (const savedAuction of login.savedAuctions) {
        if (parseInt(savedAuction.itemId) === parseInt(currentAuction._id) | tempFavoriteAuction.includes(parseInt(savedAuction.itemId))) {
          result = true;
          break;
        }
      }
    }
    return result
  }


  const addToFavorites = async (body, auction) => {
    if (!login) {
      dismiss()
    } else {
      setTempFavoriteAuction([...tempFavoriteAuction, parseInt(auction._id)])
      let newBody = body;
      newBody.savedAuctions.push({ itemId: auction._id, title: auction.title, image: auction.image, description: auction.description })
      const result = await fetchGeneral(`/api/users/${newBody._id}`, "PUT", body)
    }
  }

  useEffect(() => {
    fetchHighestBid(auction._id)
  }, [])

  return (
    <>
      <li className='d-flex justify-content-between shadow rounded-5 p-5'>
        <div className='me-5'>
          <h2>{auction.title}</h2>
          <p>{auction.description}</p>
          <div className='d-flex flex-column'>
            <span>Other information:</span>
            <span>Starting price: £{auction.startingBid}</span>
            <span>Highest bid: {highestBid}</span>
            <span>Auction ends: {moment(auction.auctionEnds).utc().format("YYYY-MM-DD HH:MM")}</span>
            <div className='my-3 d-flex gap-2'>
              <button
                onClick={() => handleMoreInfo(auction._id)}
                className='btn btn-dark'
              >
                More info
              </button>
              {
                login && (renderFavoriteAuctions(auction)) ?
                  <button className='btn btn-primary'>Saved auction</button>
                  :
                  <button onClick={() => addToFavorites(login, auction)} className='btn btn-primary'>Add to favourites</button>

              }

              <button
                onClick={() => handleBidNow(auction._id)}
                className='btn btn-success'
              >
                Bid now
              </button>
            </div>
          </div>
        </div>
        <img src={auction.image} className='w-50 h-auto rounded-5' />
      </li>

      <InfoModal showInfoModal={showSuccessModal} title="Can't add to favorites" infoText="You can't add an auction to favorites if you're not logged in" dismiss={dismiss} />
    </>
  );
};

export default AuctionListItem;
