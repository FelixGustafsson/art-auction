import AuctionSearchListItem from './AuctionSearchListItem';
import { useNavigate } from 'react-router-dom';

function AuctionList({ searchResult }) {
  const navigate = useNavigate();
  const handleAuctionClick = (id) => {
    navigate(`/info/${id}`);
  };

  return (
    <div className='d-flex p-4 position-absolute start-0 w-100 justify-content-between bg-body-tertiary z-3 mt-4'>
      {searchResult.slice(0, 4).map((auction) => (
        <div key={auction.id} onClick={() => handleAuctionClick(auction.id)}>
          <AuctionSearchListItem auction={auction} />
        </div>
      ))}
    </div>
  );
}

export default AuctionList;
