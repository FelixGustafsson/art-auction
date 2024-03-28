import { createContext, useContext, useEffect, useState } from 'react';
import { FetchContext } from './FetchContext';

const ListingContext = createContext();


const ListingProvider = ({ children }) => {
  const { getFetchGeneral } = useContext(FetchContext)
  const [auctionItems, setAuctionItems] = useState([])
  const [listings, setListings] = useState(auctionItems.items);

  useEffect(() => {
    const getAuctionItems = async () => { setAuctionItems(await getFetchGeneral('/items')) }
    getAuctionItems()
  }, [])

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
