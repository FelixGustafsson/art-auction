import AuctionSearchForm from './AuctionSearchForm';
import AuctionList from './AuctionList.jsx';
import useAuctionSearchHook from '../../hooks/useAuctionSearchHook.jsx';

function AuctionSearch() {
  const { searchTerm, searchResult, handleInputChange } =
    useAuctionSearchHook();

  return (
    <div>
      <AuctionSearchForm
        searchTerm={searchTerm}
        onInputChange={handleInputChange}
      />
      {searchTerm && <AuctionList searchResult={searchResult} />}
    </div>
  );
}

export default AuctionSearch;
