import React, { useEffect, useState } from 'react'
import auctionItems from "../../data/db.json"
import AuctionListItem from './AuctionListItem'

const AuctionList = () => {
    const [auctions, setAuctions] = useState([])

    useEffect(() => {
        setAuctions(auctionItems.items)
    }, [])

    return (
        <ul className='d-flex flex-column gap-5'>
            {
                auctions.map((auction) => { return <AuctionListItem auction={auction} /> })
            }
        </ul>

    )
}

export default AuctionList