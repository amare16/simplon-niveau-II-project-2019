import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i=1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    console.log("page numbers: ", pageNumbers)
    return (
        
        <nav className="navbar justify-content-center">
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='/search-partner/' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    )
}

export default Pagination;