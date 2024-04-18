import { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ListingContext } from '../contexts/ListingContext';
import { FetchContext } from '../contexts/FetchContext';
import { GlobalContext } from '../contexts/GlobalContext';
import InfoModal from '../components/InfoModal';

const BidPageContent = () => {
  const { id } = useParams();
  const { placeBid, setListings } = useContext(ListingContext);
  const { getFetchGeneral } = useContext(FetchContext);
  const [auction, setAuction] = useState({});
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [title, setTitle] = useState('');
  const dismiss = () => setShowInfoModal(false);
  const { login } = useContext(GlobalContext);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const userHasHighestBid =
    login && auction.highestBid && auction.highestBid.userId === login.userId;

  useEffect(() => {
    const fetchListingsAndAuction = async () => {
      const res = await getFetchGeneral(`/api/item/${id}`);
      setAuction(res);
    };
    fetchListingsAndAuction();
  }, [placeBid, getFetchGeneral, setListings, id]);

  const [inputBid, setInputBid] = useState('');

  const handleInputChange = (event) => {
    setInputBid(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentBid = parseInt(inputBid);

    if (login === null) {
      setTitle('Unable to place bid');
      setInfoText('Please log in first.');
      setShowInfoModal(true);
      return;
    }

    if (isNaN(currentBid) || currentBid <= 0) {
      setTitle('Unable to place bid');
      setInfoText('Please enter a valid bid.');
      setShowInfoModal(true);
      return;
    }

    const highestBidAmount = auction.highestBid
      ? parseInt(auction.highestBid.amount)
      : 0;
    if (currentBid <= highestBidAmount) {
      setTitle('Unable to place bid');
      setInfoText('Your bid must be higher than the current highest bid.');
      setShowInfoModal(true);
      return;
    }

    handleBid(auction._id, currentBid);
    setInputBid('');
  };

  const handleBid = (auctionId, amount) => {
    placeBid(auctionId, amount);
    setTitle('Bid placed!');
    setInfoText('Your bid has been successfully placed!');
    setShowInfoModal(true);
  };

  const calculateBidAmount = () => {
    if (auction.highestBid && auction.highestBid.amount) {
      return parseInt(auction.highestBid.amount) + 500;
    } else {
      return auction.startingBid;
    }
  };

  const handleBidClick = () => {
    if (login === null) {
      setTitle('Unable to place bid');
      setInfoText('Please log in first.');
      setShowInfoModal(true);
      return;
    }
    const bidAmount = calculateBidAmount();
    handleBid(auction._id, bidAmount);
  };

  if (!auction) {
    return (
      <div className='container text-center mt-5'>
        <h3>Auction not found.</h3>
        <Link to='/' className='btn btn-primary mt-3 mb-5'>
          Back to Auctions
        </Link>
      </div>
    );
  }

  return (
    <div className='d-flex row container p-5'>
      <div className='col w-25'>
        <img
          className='img-fluid rounded-5 shadow-lg'
          src={auction.image}
          alt={auction.title}
        />
      </div>
      <div className='col '>
        <h2>{auction.title}</h2>
        <p>{auction.artist}</p>
        <div>
          <button
            type='button'
            className='btn btn-danger w-50'
            onClick={handleBidClick}
          >
            {auction.highestBid && auction.highestBid.amount
              ? `Place ${calculateBidAmount()} $`
              : `Place starting bid at ${auction.startingBid} $`}
          </button>
        </div>
        <p>Or enter your bid below</p>

        <form onSubmit={handleSubmit} className='w-50'>
          <input
            className='form-control'
            type='number'
            value={inputBid}
            onChange={handleInputChange}
            placeholder='Place your bid...'
          />
          <button className='btn btn-success w-100 mt-2' type='submit'>
            Bid
          </button>
        </form>

        <p>
          {auction.highestBid && auction.highestBid.amount
            ? `Highest bid: ${parseInt(auction.highestBid.amount)} $`
            : ''}
        </p>
        {login && userHasHighestBid && (
          <p style={{ color: 'green' }}>You have the highest bid.</p>
        )}
        <p>
          <strong>Ends: </strong>
          {new Date(auction.auctionEnds).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
        <button
          className='btn btn-success'
          onClick={() => setShowHistoryModal(true)}
        >
          See bidding history
        </button>
      </div>
      <InfoModal
        showInfoModal={showInfoModal}
        title={title}
        infoText={infoText}
        dismiss={dismiss}
      />
      <InfoModal
        showInfoModal={showHistoryModal}
        title='Bids'
        dismiss={() => setShowHistoryModal(false)}
      >
        <ul>
          {auction.allBids &&
            auction.allBids.map((currentBid) => {
              return (
                <li
                  key={currentBid.amount}
                  className='d-flex justify-content-between'
                >
                  <h5>User: {currentBid.userId}</h5>
                  <span>£{currentBid.amount}</span>
                </li>
              );
            })}
        </ul>
      </InfoModal>
    </div>
  );
};

export default BidPageContent;
