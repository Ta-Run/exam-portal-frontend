import { useState } from "react";

const usePagination = (initialPage = 1, initialItemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return {
    currentPage,
    itemsPerPage,
    setItemsPerPage,
    paginate,
  };
};

export default usePagination;
