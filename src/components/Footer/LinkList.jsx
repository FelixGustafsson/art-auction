import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function LinkList({ links }) {
  return (
    <ul className='list-unstyled'>
      {links.map((link, index) => (
        <li key={index}>
          <Link className='text-decoration-none text-secondary' to={link.to}>
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
}

LinkList.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LinkList;
