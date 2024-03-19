import { useState, useEffect } from 'react';
import items from '../../data/db.json';

function useAuctionSearchHook() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  useEffect(() => {
    const filteredAuctions = items.items.filter((auction) => {
      return (
        auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(auction.filters).some((filter) =>
          filter
            .map((value) => value.toLowerCase())
            .includes(searchTerm.toLowerCase())
        )
      );
    });
    setFilteredAuctions(filteredAuctions);
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return {
    searchTerm,
    filteredAuctions,
    handleInputChange,
  };
}

export default useAuctionSearchHook;
