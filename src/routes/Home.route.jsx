import React from 'react'
import HomeFilterList from '../components/HomeFilterList'
import AuctionList from '../components/AuctionList'

const Home = () => {
  return (
    <div className='mt-5 d-flex justify-content-between'>
      <aside>
        <HomeFilterList />

      </aside>
      <main className='mx-5'>
        <AuctionList />
      </main>
    </div>
  )
}

export default Home