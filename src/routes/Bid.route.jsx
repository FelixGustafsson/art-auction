import { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ListingContext } from '../contexts/ListingContext';
import { FetchContext } from '../contexts/FetchContext';

const BidPageContent = () => {
  const { id } = useParams();
  const { placeBid, setListings } = useContext(ListingContext);
  const { getFetchGeneral } = useContext(FetchContext)
  const [auction, setAuction] = useState({})

  useEffect(() => {
    const fetchListingsAndAuction = async () => {
      const res = await getFetchGeneral("/items");
      setListings(res);

      // Find the auction after listings are fetched
      for (const listing of res) {
        if (parseInt(listing.id) === parseInt(id)) {
          setAuction(listing);
          break; // Once auction is found, exit the loop
        }
      }
    };

    fetchListingsAndAuction();
  }, []);

  const [inputBid, setInputBid] = useState('');

  const handleInputChange = (event) => {
    setInputBid(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentBid = parseInt(inputBid);

    if (isNaN(currentBid) || currentBid <= 0) {
      alert('Please enter a valid bid amount.');
      return;
    }

    const highestBidAmount = auction.highestBid
      ? parseInt(auction.highestBid.amount)
      : 0;
    if (currentBid <= highestBidAmount) {
      alert('Your bid must be higher than the current highest bid.');
      return;
    }

    handleBid(auction.id, currentBid);
  };

  const handleBid = (auctionId, amount) => {
    placeBid(auctionId, amount);
  };

  const calculateBidAmount = () => {
    if (auction.highestBid && auction.highestBid.amount) {
      return parseInt(auction.highestBid.amount) + 500;
    } else {
      return auction.startingBid;
    }
  };

  const handleBidClick = () => {
    const bidAmount = calculateBidAmount();
    handleBid(auction.id, bidAmount);
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
        <img className='img-fluid rounded-5 shadow-lg' src={auction.image} alt={auction.title} />
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
        <p>
          <strong>Ends: </strong>
          {new Date(auction.auctionEnds).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
};

export default BidPageContent;
