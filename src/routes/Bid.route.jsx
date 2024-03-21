import { useState } from 'react';
import useAuctionSearchHook from '../hooks/useAuctionSearchHook';
import { useParams } from 'react-router-dom';

const BidPage = () => {
  const [inputBid, setInputBid] = useState('');

  const { filteredAuctions } = useAuctionSearchHook();
  let { id } = useParams();
  if (!filteredAuctions) {
    return <div>Loading...</div>;
  }
  const auction = filteredAuctions.find((auction) => auction.id === id);
  if (!auction) {
    return <div>Auktionen kunde inte hittas.</div>;
  }

  const handleInputChange = (event) => {
    setInputBid(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Number(inputBid));
  };
  return (
    <div className='d-flex row container p-5'>
      <div className='col w-25'>
        <img className='img-fluid' src={auction.image} alt={auction.title} />
      </div>
      <div className='col '>
        <h2>{auction.title}</h2>

        <p>{auction.artist}</p>
        <div>
          <button type='button' className='btn btn-danger w-50 '>
            {auction.highestBid && auction.highestBid.amount
              ? `Place ${parseInt(auction.highestBid.amount) + 500} $`
              : `Place starting bid at ${auction.startingBid} $`}
          </button>
        </div>
        <p>Or enter your bid below</p>
        <form onSubmit={handleSubmit}>
          <input
            className='form-control'
            type='number'
            value={inputBid}
            onChange={handleInputChange}
            placeholder='Place your bid...'
          />
          <button className='btn btn-success  w-100 mt-2' type='submit'>
            Bid
          </button>
        </form>
        <p>
          {auction.highestBid && auction.highestBid.amount
            ? `Highest bid: ${parseInt(auction.highestBid.amount)} $`
            : ''}
        </p>
        <p>
          <strong>Slutar:</strong>
          {new Date(auction.auctionEnds).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>

        <div className='d-flex gap-4'>
          <button type='button' className='btn btn-success '>
            Bid Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidPage;
