import { createContext, useContext, useEffect, useState } from 'react';
import { FetchContext } from './FetchContext';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const {getFetchGeneral} = useContext(FetchContext);
  const [login, setLogin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const getLogin = async () => {
      const result = await getFetchGeneral('/api/login');
      setLogin(result);
    }
    getLogin();
  }, []);

  return (
    <GlobalContext.Provider value={{ login, setLogin, searchTerm, setSearchTerm }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
