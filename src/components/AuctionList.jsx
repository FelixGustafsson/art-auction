import { useEffect, useState, useContext } from 'react';
import auctionItems from '../../data/db.json';
import AuctionListItem from './AuctionListItem';
import { HomeFilterContext } from '../contexts/HomeFilterContext';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const { chosenFilters } = useContext(HomeFilterContext);

  useEffect(() => {
    setAuctions(auctionItems.items);
  }, []);

  return (
    <ul className='d-flex flex-column gap-5'>
      {auctions.map((auction) => {
        if (chosenFilters.length < 1) {
          return <AuctionListItem auction={auction} />;
        } else {
          for (const filterTitle of chosenFilters) {
            if (auction.filters.includes(filterTitle)) {
              console.log('Hej');
              return <AuctionListItem auction={auction} />;
            }
          }
        }
      })}
    </ul>
  );
};

export default AuctionList;
