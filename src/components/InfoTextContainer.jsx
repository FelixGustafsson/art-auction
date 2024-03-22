<<<<<<< HEAD
import React from 'react'

const InfoTextContainer = ({ title, description, artist, style, material, date, provenance }) => {
    return (
        <div className='d-flex gap-5 m-5'>

            <img src="https://www.sciencefriday.com/wp-content/uploads/2023/06/brain-art.jpg" className="rounded mr-5" alt="BrainArt" height="300px" width="500px"></img>
            <div>
                <h1>{title}</h1>
                <p>
                    Here on the info page we have a slightly smaller version of the picture - why?
                    I don’t know, maye it should be the same size as on the buy now page,
                    that would probably be simpler. There should be a description - perhaps longer than on the main listings page?
                    - and some specific information from the database, such as:
                    <br />
                    <br />
                    Artist: e.g. Gerhard Richter
                    <br />
                    Title: e.g. Blob III
                    Style: e.g. abstract impressionism
                    Date: e.g. 1973
                    Material: e.g. oil on wood panel
                    Provenance: e.g. from the collection of the late duke of Buckinghamshire
                    <br />
                    Anything else?
                </p>

                <h2>Bid on this artwork:</h2>

                <div className='d-flex'>

                    <button type='button' className='btn btn-danger m-5'>Back</button>
                    <button type='button' className='btn btn-success m-5'>Bid Now</button>

                </div>

            </div>






=======
import useAuctionSearchHook from '../hooks/useAuctionSearchHook';
import { useParams } from 'react-router-dom';
>>>>>>> main

const InfoTextContainer = () => {
  const { filteredAuctions } = useAuctionSearchHook();
  let { id } = useParams();
  if (!filteredAuctions) {
    return <div>Loading...</div>;
  }
  const auction = filteredAuctions.find((auction) => auction.id === id);
  if (!auction) {
    return <div>The auction could not be found.</div>;
  }
  return (
    <div className='d-flex row container p-5'>
      <div className='col'>
        <h2>{auction.title}</h2>
        <img src={auction.image} alt={auction.title} />
      </div>
      <div className='col align-self-center'>
        <p>
          <strong>Description:</strong> {auction.description}
        </p>
        <p>
          <strong>Artist:</strong> {auction.artist}
        </p>
        <p>
          <strong>Starting Price:</strong> {auction.startingBid} $
        </p>
        <p>
          <strong>Highest Bid:</strong>{' '}
          {auction.highestBid ? auction.highestBid.amount + ' $' : 'No bid yet'}
        </p>
        <p>
          <strong>Ends:</strong>{' '}
          {new Date(auction.auctionEnds).toLocaleDateString()}
        </p>

        <div className='d-flex gap-4'>
          <button type='button' className='btn btn-danger '>
            Back
          </button>
          <button type='button' className='btn btn-success '>
            Bid Now
          </button>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
    )
}

export default InfoTextContainer
=======
export default InfoTextContainer;
>>>>>>> main
