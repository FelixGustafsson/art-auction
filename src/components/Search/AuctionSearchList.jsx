import AuctionSearchListItem from './AuctionSearchListItem';
import { useNavigate } from 'react-router-dom';

function AuctionList({ searchResult }) {
  const navigate = useNavigate();
  const handleAuctionClick = (id) => {
    navigate(`/info/${id}`);
    console.log(id);
  };
  console.log(searchResult);
  return (
    <div className='container-s d-flex flex-wrap p-4 '>
      {searchResult.map((auction) => (
        <div
          className=''
          key={auction.id}
          onClick={() => handleAuctionClick(auction.id)}
        >
          <AuctionSearchListItem auction={auction} />
        </div>
      ))}
    </div>
  );
}

export default AuctionList;
