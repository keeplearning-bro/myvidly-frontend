import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types'

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onClick } = props;
  // return integer greater than or equal to the floating point number
  const pagesCount = Math.ceil(itemsCount / pageSize)
  // console.log(pagesCount, itemsCount, pageSize);
  const pages = _.range(1, pagesCount + 1)

  // won't display page number if there is only one page
  if (pagesCount === 1) return null

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {
          pages.map(page =>
            <li key={page} className={(page === currentPage) ? "page-item active" : "page-item"} >
              <a className="page-link" onClick={() => onClick(page)}>
                {page}</a>
            </li>
          )
        }
      </ul>
    </nav >
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Pagination;