import useAuctionSearchHook from '../hooks/useAuctionSearchHook';
import { useParams, useNavigate } from 'react-router-dom';

const InfoTextContainer = () => {
  const navigate = useNavigate()
  const { filteredAuctions } = useAuctionSearchHook();
  let { id } = useParams();
  if (!filteredAuctions) {
    return <div>Loading...</div>;
  }
  const auction = filteredAuctions.find((auction) => auction.id === id);
  if (!auction) {
    return <div>The auction could not be found.</div>;
  }
  return (
    <div className='d-flex row container p-5'>
      <div className='col'>

        <img src={auction.image} alt={auction.title} className='rounded-5 shadow-lg' />
      </div>
      <div className='col mx-5'>
        <h2>{auction.title}</h2>
        <p>
          <strong>Description:</strong> {auction.description}
        </p>
        <p>
          <strong>Artist:</strong> {auction.artist}
        </p>
        <p>
          <strong>Starting Price:</strong> {auction.startingBid} $
        </p>
        <p>
          <strong>Highest Bid:</strong>{' '}
          {auction.highestBid ? auction.highestBid.amount + ' $' : 'No bid yet'}
        </p>
        <p>
          <strong>Ends:</strong>{' '}
          {new Date(auction.auctionEnds).toLocaleDateString()}
        </p>

        <div className='d-flex gap-4'>
          <button type='button' className='btn btn-danger ' onClick={() => navigate(-1)}>
            Back
          </button>
          <button type='button' className='btn btn-success ' onClick={() => navigate(`/bid/${auction.id}`)}>
            Bid Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoTextContainer;
