import { createContext, useState } from 'react';
import auctionItems from '../../data/db.json';

const ListingContext = createContext();

const ListingProvider = ({ children }) => {
  const [listings, setListings] = useState(auctionItems.items);

  return (
    <ListingContext.Provider value={{ listings, setListings }}>
      {children}
    </ListingContext.Provider>
  );
};

export { ListingContext, ListingProvider };
