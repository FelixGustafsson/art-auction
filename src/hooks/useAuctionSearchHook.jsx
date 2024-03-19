import { useState } from 'react';
import items from '../../data/db.json';

function useAuctionSearchHook() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Funktion för att filtrera auktionerna baserat på söktermen
  const searchResult = items.items.filter((auction) => {
    // Returnera true om söktermen matchar titeln eller något värde i filters-arrayen
    return (
      auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(auction.filters).some((filter) =>
        filter
          .map((value) => value.toLowerCase())
          .includes(searchTerm.toLowerCase())
      )
    );
  });

  return {
    searchTerm,
    searchResult,
    handleInputChange,
  };
}

export default useAuctionSearchHook;
