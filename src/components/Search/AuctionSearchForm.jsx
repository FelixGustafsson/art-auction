function AuctionSearchForm({ searchTerm, onInputChange }) {
  return (
    <div>
      <input
        type='text'
        placeholder='search for auction'
        value={searchTerm}
        onChange={onInputChange}
      />
    </div>
  );
}

export default AuctionSearchForm;
