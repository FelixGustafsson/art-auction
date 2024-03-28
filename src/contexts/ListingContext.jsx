import { createContext, useContext, useEffect, useState } from 'react';
import { FetchContext } from './FetchContext';

const ListingContext = createContext();


const ListingProvider = ({ children }) => {
  const { getFetchGeneral } = useContext(FetchContext)

  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getAuctionItems = async () => { setListings(await getFetchGeneral('/items')) }
    getAuctionItems()
  }, [])

  const placeBid = (auctionId, newBidAmount) => {

    setListings((prevListings) => {

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
