import { createContext, useContext, useEffect, useState } from 'react';
import { FetchContext } from './FetchContext';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const {getFetchGeneral} = useContext(FetchContext);
  const [login, setLogin] = useState(null);
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const getAuctions = async () => {
      const result = await getFetchGeneral('/api/items');
      setListings(result);
    }
    const getLogin = async () => {
      const result = await getFetchGeneral('/api/login');
      setLogin(result);
    }
    getAuctions();
    getLogin();
  }, []);

  return (
    <GlobalContext.Provider value={{ login, setLogin, listings, setListings, searchTerm, setSearchTerm }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
