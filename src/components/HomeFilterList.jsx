import { useContext } from 'react';
import { HomeFilterContext } from '../contexts/HomeFilterContext';
import Checkbox from './Checkbox';
import {periodTags, typeTags, locationTags} from '../../data/FilterNames.jsx'

const HomeFilterList = () => {
  const { addFilter, removeFilter, chosenFilters } =
    useContext(HomeFilterContext);
  const handleChange = (filterTitle) => {
    if (chosenFilters.includes(filterTitle)) {
      removeFilter(filterTitle);
    } else {
      addFilter(filterTitle);
    }
  };
  return (
    <div>
      <h3>Filters</h3>
      <ul>
        <div className='mb-3'>
          <h4>Periods</h4>
          <ul className='list-group'>
            {periodTags.map((tag) => <Checkbox value={tag} key={tag} onChange={(e) => handleChange(e.target.value)}/>)}
          </ul>
        </div>
        <div className='mb-3'>
          <h4>Type</h4>
          <ul className='list-group'>
            {typeTags.map((tag) => <Checkbox value={tag} key={tag} onChange={(e) => handleChange(e.target.value)}/>)}            
          </ul>
        </div>
        <div>
          <h4>Location</h4>
          <ul className='list-group'>
            {locationTags.map((tag) => <Checkbox value={tag} key={tag} onChange={(e) => handleChange(e.target.value)}/>)}                        
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default HomeFilterList;
