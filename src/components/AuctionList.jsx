import { useContext } from 'react';
import AuctionListItem from './AuctionListItem';
import { HomeFilterContext } from '../contexts/HomeFilterContext';
import { GlobalContext } from '../contexts/GlobalContext';

export const AuctionList = () => {
  const { chosenFilters } = useContext(HomeFilterContext);
  const { listings } = useContext(GlobalContext);

  const filterAuctions = (listings, filters) => {
    if (filters.length === 0) {
      return listings;
    } else {
      let tempFilteredAuctions = []
      for (const listing of listings) {
        const itemFilters = []
        itemFilters.push(listing.location, listing.type, listing.period)
        if (filters.every(cur => itemFilters.includes(cur))) {
          tempFilteredAuctions.push(listing)
        }
      }
      return tempFilteredAuctions
    }
  };

  const filteredAuctions = filterAuctions(listings, chosenFilters);
  return (
    <ul className='d-flex flex-column gap-5'>
      {filteredAuctions.map((auction) => (
        <AuctionListItem auction={auction} key={auction._id} />
      ))}
    </ul>
  );
};

export default AuctionList;
