import AuctionSearchForm from './AuctionSearchForm';
import AuctionSearchList from './AuctionSearchList.jsx';
import useAuctionSearchHook from '../../hooks/useAuctionSearchHook.jsx';

function AuctionSearch() {
  const { searchTerm, filteredAuctions, handleInputChange } =
    useAuctionSearchHook();

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
