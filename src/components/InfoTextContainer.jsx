import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FetchContext } from '../contexts/FetchContext';

const InfoTextContainer = () => {
  const navigate = useNavigate()
  const { getFetchGeneral } = useContext(FetchContext)
  const [auction, setAuction] = useState({})
  let { id } = useParams();

  useEffect(() => {
    const getAuction = async () => {
      try {
        const result = await getFetchGeneral(`/api/item/${id}`)
        setAuction(result)
      } catch (error) {
        console.log(error)
      }
    }
    getAuction()

  }, [])


  return (
    <div className='d-flex row container p-5'>
      <div className='col'>

        <img src={auction.image} alt={auction.title} className='rounded-5 shadow-lg' />
      </div>
      <div className='col mx-5'>
        <h2>{auction.title}</h2>
        <p>
          <strong>Description:</strong> {auction.description}
        </p>
        <p>
          <strong>Artist:</strong> {auction.artist}
        </p>
        <p>
          <strong>Starting Price:</strong> £{auction.startingBid} 
        </p>
        <p>
          <strong>Highest Bid: </strong>
          {''/*(auction.highestBid) ? ' £' + auction.highestBid.amount : 'No bid yet'*/}
        </p>
        <p>
          <strong>Ends: </strong>
          {new Date(auction.auctionEnds).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>

        <div className='d-flex gap-4'>
          <button type='button' className='btn btn-danger ' onClick={() => navigate(-1)}>
            Back
          </button>
          <button type='button' className='btn btn-success ' onClick={() => navigate(`/bid/${auction._id}`)}>
            Bid Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoTextContainer;
