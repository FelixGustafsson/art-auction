import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import BidForm from '../components/Bidding/BidForm';
import { ListingContext } from '../contexts/ListingContext'; // Importera ListingContext

const BidPageContent = () => {
  const { id } = useParams();
  const { listings } = useContext(ListingContext); // Använd useContext för att hämta kontexten

  // Hitta den specifika auktionen med hjälp av id från params
  const auction = listings.find((auction) => auction.id === id);

  if (!auction) {
    return <div>Auction not found.</div>;
  }

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

        <BidForm auction={auction} />
        <p>
          {auction.highestBid && auction.highestBid.amount
            ? `Highest bid: ${parseInt(auction.highestBid.amount)} $`
            : ''}
        </p>
        <p>
          <strong>Ends:</strong>
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

export default BidPageContent;
