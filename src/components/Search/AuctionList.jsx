import PropTypes from 'prop-types';
import AuctionListItem from './AuctionListItem';

function AuctionList({ searchResult }) {
  return (
    <ul>
      {searchResult.map((auction) => (
        <AuctionListItem key={auction.id} auction={auction} />
      ))}
    </ul>
  );
}

AuctionList.propTypes = {
  searchResult: PropTypes.array,
};

export default AuctionList;
