import { useContext } from 'react';
import { HomeFilterContext } from '../contexts/HomeFilterContext';

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
            <li className='list-group-item'>
              <input
                type='checkbox'
                value='Medieval'
                onChange={(e) => handleChange(e.target.value)}
              />
              <span className='px-3'>Medieval</span>
            </li>
            <li className='list-group-item'>
              <input
                type='checkbox'
                value='Renaissance'
                onChange={(e) => handleChange(e.target.value)}
              />
              <span className='px-3'>Renaissance</span>
            </li>
            <li className='list-group-item'>
              <input
                type='checkbox'
                value='1700s'
                onChange={(e) => handleChange(e.target.value)}
              />
              <span className='px-3'>1700s</span>
            </li>
            <li className='list-group-item'>
              <input
                type='checkbox'
                value='1800s'
                onChange={(e) => handleChange(e.target.value)}
              />
              <span className='px-3'>1800s</span>
            </li>
            <li className='list-group-item'>
              <input
                type='checkbox'
                value='Modern'
                onChange={(e) => handleChange(e.target.value)}
              />
              <span className='px-3'>Modern</span>
            </li>
          </ul>
        </div>
        <div className='mb-3'>
          <h4>Type</h4>
          <ul className='list-group'>
            <li className='list-group-item'>
              <input
                type='checkbox'
                value='Oil'
                onChange={(e) => handleChange(e.target.value)}
              />
              <span className='px-3'>Oil</span>
            </li>
            <li className='list-group-item'>
              <input
                type='checkbox'
                value='Acrylic'
                onChange={(e) => handleChange(e.target.value)}
              />
              <span className='px-3'>Acrylic</span>
            </li>
            <li className='list-group-item'>
              <input
                type='checkbox'
                value='Watercolour'
                onChange={(e) => handleChange(e.target.value)}
              />
              <span className='px-3'>Acrylic</span>
            </li>
            <li className='list-group-item'>
              <input
                type='checkbox'
                value='Drawing'
                onChange={(e) => handleChange(e.target.value)}
              />
              <span className='px-3'>Drawing</span>
            </li>
          </ul>
        </div>
        <div>
          <h4>Location</h4>
          <ul className='list-group'>
            <li className='list-group-item'>
              <input
                type='checkbox'
                value='Europe'
                onChange={(e) => handleChange(e.target.value)}
              />
              <span className='px-3'>Europe</span>
            </li>
            <li className='list-group-item'>
              <input
                type='checkbox'
                value='America'
                onChange={(e) => handleChange(e.target.value)}
              />
              <span className='px-3'>America</span>
            </li>
            <li className='list-group-item'>
              <input
                type='checkbox'
                value='Asia'
                onChange={(e) => handleChange(e.target.value)}
              />
              <span className='px-3'>Asia</span>
            </li>
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default HomeFilterList;
