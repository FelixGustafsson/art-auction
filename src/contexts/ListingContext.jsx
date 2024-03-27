import { createContext, useState } from 'react';
import auctionItems from '../../data/db.json';

const ListingContext = createContext();

const ListingProvider = ({ children }) => {
  const [listings, setListings] = useState(auctionItems.items);

  const placeBid = (auctionId, newBidAmount) => {
    console.log(auctionId);
    setListings((prevListings) => {
      console.log(prevListings);
      console.log(auctionId, newBidAmount);
      return prevListings.map((auction) => {
        if (auction.id === auctionId) {
          return {
            ...auction,
            highestBid: {
              amount: newBidAmount,
            },
          };
        } else {
          return auction;
        }
      });
    });
  };

  return (
    <ListingContext.Provider value={{ listings, setListings, placeBid }}>
      {children}
    </ListingContext.Provider>
  );
};

export { ListingContext, ListingProvider };

//Is this file deprecated?
