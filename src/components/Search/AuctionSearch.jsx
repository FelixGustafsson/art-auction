import React, { useState, useContext, useEffect } from 'react';
import AuctionSearchForm from './AuctionSearchForm.jsx';
import AuctionSearchList from './AuctionSearchList.jsx';
import { GlobalContext } from '../../contexts/GlobalContext.jsx';

function AuctionSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const { listings } = useContext(GlobalContext);
  
  useEffect(() => {
    const filteredAuctions = listings.filter((auction) => {
      const title = auction.title || '';
      const filters = auction.filters || [];
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        filters.some((filter) =>
          filter.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });
    setFilteredAuctions(filteredAuctions);
  }, [searchTerm, listings]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div>
      <AuctionSearchForm
        searchTerm={searchTerm}
        onInputChange={handleInputChange}
      />
      {searchTerm && <AuctionSearchList searchResult={filteredAuctions} />}
    </div>
  );
}

export default AuctionSearch;
