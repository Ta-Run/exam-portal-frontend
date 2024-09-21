import React from "react";

const TopSearchBar = ({ itemsPerPage, setItemsPerPage, searchTerm, setSearchTerm }) => {
  return (
    <>
      <select
        className="form-select"
        name="entries"
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
      >
        {/* {[10, 25, 50, 100].map(value => (
                                <option key={value} value={value}>{value}</option>
                            ))} */}
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <div className="search-input">
        <input
          type="text"
          placeholder="Search.."
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" className="search-btn">
          Search
        </button>
      </div>
    </>
  );
};

export default TopSearchBar;
