function AuctionListItem({ auction }) {
  return (
    <div className='card m-2 p-2' style={{ width: '18rem' }}>
      <img src={auction.image} className='card-img-top' alt={auction.title} />
      <div className='card-body'>
        <h5 className='card-title'>{auction.title}</h5>
        <p className='card-text'>{auction.description}</p>
      </div>
    </div>
  );
}

export default AuctionListItem;
