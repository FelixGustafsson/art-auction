import { createContext, useState } from 'react';

const HomeFilterContext = createContext();

function HomeFilterProvider({ children }) {
  const [chosenFilters, setChosenFilters] = useState([]);

  const addFilter = (filter) => {
    setChosenFilters([...chosenFilters, filter]);
    console.log(chosenFilters);
  };

  const removeFilter = (filter) => {
    const updatedFilters = chosenFilters.filter((title) => title != filter);
    setChosenFilters(updatedFilters);
  };
  return (
    <HomeFilterContext.Provider
      value={{ chosenFilters, addFilter, removeFilter }}
    >
      {children}
    </HomeFilterContext.Provider>
  );
}

export { HomeFilterContext, HomeFilterProvider };
