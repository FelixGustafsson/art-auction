import AuctionSearchForm from './AuctionSearchForm';
import AuctionList from './AuctionList.jsx';
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
      {searchTerm && <AuctionList searchResult={filteredAuctions} />}
    </div>
  );
}

export default AuctionSearch;
