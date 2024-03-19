import React, { useEffect, useState } from 'react'
import auctionItems from "../../data/db.json"
import AuctionListItem from './AuctionListItem'

const AuctionList = () => {
    const [auctions, setAuctions] = useState([])

    useEffect(() => {
        setAuctions(auctionItems.items)
    }, [])

    return (
        <div>
            {
                auctions.map((auction) => { return <AuctionListItem auction={auction} /> })
            }
        </div>

    )
}

export default AuctionList