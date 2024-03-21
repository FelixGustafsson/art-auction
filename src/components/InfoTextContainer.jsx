import useAuctionSearchHook from '../hooks/useAuctionSearchHook';
import { useParams } from 'react-router-dom';

const InfoTextContainer = () => {
  const { filteredAuctions } = useAuctionSearchHook();
  let { id } = useParams();
  if (!filteredAuctions) {
    return <div>Loading...</div>;
  }
  const auction = filteredAuctions.find((auction) => auction.id === id);
  if (!auction) {
    return <div>Auktionen kunde inte hittas.</div>;
  }
  return (
    <div className='d-flex row container p-5'>
      <div className='col'>
        <h2>{auction.title}</h2>
        <img src={auction.image} alt={auction.title} />
      </div>
      <div className='col align-self-center'>
        <p>
          <strong>Beskrivning:</strong> {auction.description}
        </p>
        <p>
          <strong>Konstnär:</strong> {auction.artist}
        </p>
        <p>
          <strong>Startpris:</strong> {auction.startingBid} kr
        </p>
        <p>
          <strong>Högsta bud:</strong>{' '}
          {auction.highestBid
            ? auction.highestBid.amount + ' kr'
            : 'Inget bud ännu'}
        </p>
        <p>
          <strong>Slutar:</strong>{' '}
          {new Date(auction.auctionEnds).toLocaleDateString()}
        </p>

        <div className='d-flex gap-4'>
          <button type='button' className='btn btn-danger '>
            Back
          </button>
          <button type='button' className='btn btn-success '>
            Bid Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoTextContainer;
