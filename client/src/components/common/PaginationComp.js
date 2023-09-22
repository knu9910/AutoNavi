import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComp = ({ currentPage, totalPages, onPageChange }) => {
  const pageItems = [];
  const itemsPerPage = 5;
  const currentPageGroup = Math.ceil(currentPage / itemsPerPage);

  const startPage = (currentPageGroup - 1) * itemsPerPage + 1;
  const endPage = Math.min(startPage + itemsPerPage - 1, totalPages);

  for (let page = startPage; page <= endPage; page++) {
    pageItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => onPageChange(page)}
      >
        {page}
      </Pagination.Item>,
    );
  }

  return (
    <>
      <Pagination size="md">
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pageItems}
        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </>
  );
};

export default PaginationComp;
