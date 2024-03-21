import AuctionListItem from './AuctionListItem';

function AuctionList({ searchResult }) {
  const handleAuctionClick = (id) => {
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
          <AuctionListItem auction={auction} />
        </div>
      ))}
    </div>
  );
}

export default AuctionList;
