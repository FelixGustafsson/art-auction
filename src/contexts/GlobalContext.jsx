import { createContext, useContext, useEffect, useState } from 'react';
import { FetchContext } from './FetchContext';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const {getFetchGeneral} = useContext(FetchContext);
  const [login, setLogin] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getAuctions = async () => {
      const result = await getFetchGeneral('/api/items');
      setListings(result);
    }
    getAuctions();
  }, []);

  return (
    <GlobalContext.Provider value={{ login, setLogin, listings, setListings }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
