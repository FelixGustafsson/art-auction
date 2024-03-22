import { useState } from 'react';

const BidForm = ({ auction }) => {
  const [inputBid, setInputBid] = useState('');

  const handleInputChange = (event) => {
    setInputBid(event.target.value);
    console.log(auction);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Number(inputBid));
    // Ersätt med din logik för att hantera bud
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='form-control'
        type='number'
        value={inputBid}
        onChange={handleInputChange}
        placeholder='Place your bid...'
      />
      <button className='btn btn-success w-100 mt-2' type='submit'>
        Bid
      </button>
    </form>
  );
};

export default BidForm;
