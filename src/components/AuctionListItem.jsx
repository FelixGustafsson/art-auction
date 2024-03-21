import { useNavigate } from 'react-router-dom';

const AuctionListItem = ({ auction }) => {
  const navigate = useNavigate();
  const handleMoreInfo = (id) => {
    navigate(`/info/${id}`);
  };
  return (
    <li className='d-flex justify-content-between shadow rounded-5 p-5'>
      <div className='me-5'>
        <h2>{auction.title}</h2>
        <p>{auction.description}</p>
        <div className='d-flex flex-column'>
          <span>Other information:</span>
          <span>Starting price: £{auction.startingBid}</span>
          <span>Current bid: £{auction.highestBid.amount}</span>
          <span>Auction ends: {auction.auctionEnds}</span>
          <div className='my-3 d-flex gap-2'>
            <button
              onClick={() => handleMoreInfo(auction.id)}
              className='btn btn-dark'
            >
              More info
            </button>
            <button className='btn btn-primary'>Add to favourites</button>
            <button className='btn btn-success'>Bid now</button>
          </div>
        </div>
      </div>
      <img src={auction.image} className='w-50 h-auto rounded-5' />
    </li>
  );
};

export default AuctionListItem;
