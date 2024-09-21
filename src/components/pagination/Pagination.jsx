import React from 'react';
import "./Pagination.scss";

const Pagination = ({ pagination, filterData, currentPage, paginate }) => {
    return (
        <div className="portal-pagination">
            <h5 className="pagination-text">
                {pagination?.pagingCounter} - {pagination?.pagingCounter + filterData?.length - 1} of {pagination?.totalDocs} items
            </h5>
            <nav>
                <ul className="pagination">
                    {Array.from({ length: pagination?.totalPages }, (_, i) => (
                        <li key={i} className={`pagination-link ${currentPage === i + 1 ? "active" : ""}`}>
                            <button onClick={() => paginate(i + 1)} className="pagination-btn">{i + 1}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination