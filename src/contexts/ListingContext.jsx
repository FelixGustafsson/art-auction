import { createContext, useContext, useEffect, useState } from 'react';
import { FetchContext } from './FetchContext';
import { GlobalContext } from './GlobalContext';
const ListingContext = createContext();

const ListingProvider = ({ children }) => {
  const { getFetchGeneral, fetchGeneral } = useContext(FetchContext);

  const { login } = useContext(GlobalContext);
  const [listings, setListings] = useState([]);
  const loggedInUser = login;
  useEffect(() => {
    const getAuctionItems = async () => {

      const data = await getFetchGeneral('/api/items');

      setListings(data);
    };

    getAuctionItems();
  }, [getFetchGeneral]);

  const placeBid = async (auctionId, newBidAmount) => {
    try {
      if (!listings || listings.length === 0) {
        console.error('Listings state is empty or null');
        return;
      }
      const existingAuction = listings.find((item) => item.id === auctionId);
      if (!existingAuction) {
        console.error(`Auction with ID ${auctionId} not found`);
        return;
      }
      const updatedAuction = {
        ...existingAuction,
        highestBid: { amount: newBidAmount },
        allBids: [
          ...existingAuction.allBids,
          {
            userId: loggedInUser.id,
            amount: newBidAmount,
          },
        ],
      };

      //THIS ENDPOINT DOES NOT EXIST YET
      const response = await fetchGeneral(
        `/api/item/${auctionId}`,
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
          bidder: loggedInUser.id,
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
