import { useContext, useEffect, useState } from 'react';
import AuctionListItem from './AuctionListItem';
import { HomeFilterContext } from '../contexts/HomeFilterContext';
import { ListingContext } from '../contexts/ListingContext';
import { FetchContext } from '../contexts/FetchContext';

const AuctionList = () => {
  //const { listings } = useContext(ListingContext);
  const { chosenFilters } = useContext(HomeFilterContext);
  const { getFetchGeneral } = useContext(FetchContext);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      setListings(await getFetchGeneral('/items'));
    };
    fetchListings();
  }, []);

  const filterAuctions = (listings, filters) => {
    if (filters.length === 0) {
      return listings;
    } else {
      return listings.filter((listing) =>
        filters.some((filterTitle) => listing.filters.includes(filterTitle))
      );
    }
  };

  const filteredAuctions = filterAuctions(listings, chosenFilters);

  return (
    <ul className='d-flex flex-column gap-5'>
      {filteredAuctions.map((auction) => (
        <AuctionListItem auction={auction} key={auction.id} />
      ))}
    </ul>
  );
};

export default AuctionList;
