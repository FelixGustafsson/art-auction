import React from 'react'

const AuctionListItem = ({ auction }) => {
    return (
        <li className='d-flex justify-content-between'>
            <div className=''>
                <h2>{auction.title}</h2>
                <p>{auction.description}</p>
                <div className='d-flex flex-column'>
                    <span>Other information:</span>
                    <span>Starting price: £{auction.startingBid}</span>
                    <span>Current bid: £{auction.highestBid.amount}</span>

                </div>
            </div>
            <img src={auction.image} className='w-50 h-auto' />
        </li>
    )
}

export default AuctionListItem