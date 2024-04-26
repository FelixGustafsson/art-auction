import React, { useState, useContext, useEffect } from 'react';
import AuctionSearchForm from './AuctionSearchForm.jsx';
import AuctionSearchList from './AuctionSearchList.jsx';
import { GlobalContext } from '../../contexts/GlobalContext.jsx';
import { FetchContext } from '../../contexts/FetchContext.jsx';

function AuctionSearch() {
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [listings, setListings] = useState([]);
  const { searchTerm, setSearchTerm } = useContext(GlobalContext);
  const { getFetchGeneral} = useContext(FetchContext);

  useEffect(() => {
    const fetchAllAuctions = async () => {
      const result = await getFetchGeneral('/api/items');
      setListings(result);
    }
    fetchAllAuctions();
  }, [searchTerm])
  
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
