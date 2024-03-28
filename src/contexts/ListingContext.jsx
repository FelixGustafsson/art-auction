import { createContext, useContext, useEffect, useState } from 'react';
import { FetchContext } from './FetchContext';
import { GlobalContext } from './GlobalContext';
const ListingContext = createContext();

const ListingProvider = ({ children }) => {
  const { fetchGeneral } = useContext(FetchContext);
  const { login } = useContext(GlobalContext);
  const [listings, setListings] = useState([]);
  const loggedInUser = login;
  useEffect(() => {
    const getAuctionItems = async () => {
      setListings(await fetchGeneral('/items'));
    };
    getAuctionItems();
  }, [fetchGeneral]);

  const placeBid = async (auctionId, newBidAmount) => {
    try {
      const existingAuction = listings.find((item) => item.id === auctionId);
      const updatedAuction = {
        ...existingAuction,
        highestBid: { amount: newBidAmount },
      };

      const response = await fetchGeneral(
        `/items/${auctionId}`,
        'PUT',
        updatedAuction
      );

      if (response.ok) {
        const updatedItem = await response.json();
        setListings((prevListings) => {
          return prevListings.map((item) => {
            if (item.id === auctionId) {
              return updatedItem;
            }
            return item;
          });
        });

        const bidObject = {
          time: 'bidTime',
          bidder: loggedInUser,
          item: auctionId,
          amount: newBidAmount,
        };

        // Utför fetch för att spara budobjektet
        await fetchGeneral('/bids', 'POST', bidObject);
      } else {
        throw new Error('Failed to update bid on server.');
      }
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  return (
    <ListingContext.Provider value={{ listings, setListings, placeBid }}>
      {children}
    </ListingContext.Provider>
  );
};

export { ListingContext, ListingProvider };
