import PropTypes from 'prop-types';

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

AuctionSearchForm.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default AuctionSearchForm;
