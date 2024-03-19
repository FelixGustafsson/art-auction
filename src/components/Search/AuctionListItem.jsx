import PropTypes from 'prop-types';

function AuctionListItem({ auction }) {
  return (
    <li key={auction.id}>
      <h3>{auction.title}</h3>
      <p>{auction.description}</p>
    </li>
  );
}

AuctionListItem.propTypes = {
  auction: PropTypes.object,
};

export default AuctionListItem;
