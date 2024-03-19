import { useState, useEffect } from 'react';
import items from '../../data/db.json';

function useAuctionSearchHook() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const handleSearch = () => {
      if (!searchTerm.trim()) {
        setSearchResult([]);
        return;
      }

      const filteredAuctions = items.items.filter((auction) => {
        // Check if the search term matches the title or any value in the filters array
        return (
          auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          Object.values(auction.filters).some((filter) =>
            filter
              .map((value) => value.toLowerCase())
              .includes(searchTerm.toLowerCase())
          )
        );
      });

      setSearchResult(filteredAuctions);
    };

    if (searchTerm.trim()) {
      handleSearch();
    } else {
      setSearchResult([]);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return {
    searchTerm,
    searchResult,
    handleInputChange,
  };
}

export default useAuctionSearchHook;
