import React from 'react';
import '../../styles/pagination.css';
const PaginationComp = ({ currentPage, totalPages, onPageChange }) => {
  const pageItems = [];
  const itemsPerPage = 5;
  const currentPageGroup = Math.ceil(currentPage / itemsPerPage);

  const startPage = (currentPageGroup - 1) * itemsPerPage + 1;
  const endPage = Math.min(startPage + itemsPerPage - 1, totalPages);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  for (let page = startPage; page <= endPage; page++) {
    pageItems.push(
      <div
        key={page}
        className={`custom-pagination-item ${
          page === currentPage ? 'active' : ''
        }`}
        onClick={() => onPageChange(page)}
      >
        {page}
      </div>,
    );
  }

  return (
    <div className="custom-pagination">
      <div
        className={`is-active custom-pagination-prev ${
          currentPage === 1 ? 'disabled' : ''
        }`}
        onClick={handlePrevClick}
      >
        &lt;
      </div>
      {pageItems}
      <div
        className={`custom-pagination-item custom-pagination-next ${
          currentPage === totalPages ? 'disabled' : ''
        }`}
        onClick={handleNextClick}
      >
        &gt;
      </div>
    </div>
  );
};

export default PaginationComp;
