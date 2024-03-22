import HomeFilterList from '../components/HomeFilterList';
import AuctionList from '../components/AuctionList';
import { HomeFilterProvider } from '../contexts/HomeFilterContext';

const Home = () => {
  return (
    <div className='m-5 d-flex justify-content-between'>
      <HomeFilterProvider>
        <aside className='w-25'>
          <HomeFilterList />
        </aside>
        <main className='mx-5'>
          <AuctionList />
        </main>
      </HomeFilterProvider>
    </div>
  );
};

export default Home;
