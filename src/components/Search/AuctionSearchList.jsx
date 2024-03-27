import AuctionSearchListItem from './AuctionSearchListItem';
import { useNavigate } from 'react-router-dom';

function AuctionList({ searchResult }) {
  const navigate = useNavigate();
  const handleAuctionClick = (id) => {
    navigate(`/info/${id}`);
  };
  console.log(searchResult);
  return (
    <div className='container-s d-flex p-4 position-absolute bg-dark z-3 mt-5'>
      {searchResult.slice(0, 4).map((auction) => (
        <div key={auction.id} onClick={() => handleAuctionClick(auction.id)}>
          <AuctionSearchListItem auction={auction} />
        </div>
      ))}
    </div>
  );
}

export default AuctionList;
