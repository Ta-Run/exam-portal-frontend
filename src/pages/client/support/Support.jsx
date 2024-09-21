import React, { useState } from "react";
import "./Support.scss";
import { SVGICON } from "../../../constants/IconList";
import SupportCanvas from "../../../components/offcanvas/support/SupportCanvas";
import { SupportData } from "../../../constants/DataList";
import Header from "../../../components/header/admin/Header";

const Support = () => {

    // States
    const [show, setShow] = useState(false);
    const [sortColumn, setSortColumn] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // handleClose
    const handleClose = () => setShow(false);
    // handleShow   
    const handleShow = () => setShow(true);

    // Function to handle sorting
    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    // Function to render sorting icons based on sorting state
    const renderSortingIcon = (column) => {
        if (sortColumn === column) {
            return sortOrder === "asc" ? SVGICON.arrowUp : SVGICON.arrowDown;
        }
        return SVGICON.sortIcon;
    };

    // Function to sort data based on sortColumn and sortOrder
    const sortedData = [...SupportData].sort((a, b) => {
        const valueA = a[sortColumn] || "";
        const valueB = b[sortColumn] || "";
        if (sortOrder === "asc") {
            return valueA.localeCompare(valueB);
        } else {
            return valueB.localeCompare(valueA);
        }
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <Header name="Support" />
            <section className="open-ticket-section">
                <button type="button" className="management-add" onClick={handleShow}>
                    + Create New Ticket
                </button>
                <div className="open-ticket-body">
                    <div className="open-ticket-filters">
                        <select className="form-select">
                            <option defaultValue={""}>Entries</option>
                            <option value="1">10</option>
                            <option value="2">15</option>
                            <option value="3">20</option>
                        </select>
                        <div className="search-input">
                            <input type="text" placeholder="Search.." />
                            <button type="button" className="search-btn">
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="open-ticket-downloads">
                        <button type="button" className="management-download-btns me-3">
                            {SVGICON.PdfSvg}
                        </button>
                        <button type="button" className="management-download-btns me-3">
                            {SVGICON.listSvg}
                        </button>
                        <button type="button" className="management-download-btns">
                            {SVGICON.printerSvg}
                        </button>
                    </div>
                </div>
                <div className="open-ticket-table">
                    <div className="table-responsive">
                        <table className="table content-table">
                            <thead>
                                <tr>
                                    <th scope="col" onClick={() => handleSort("TicketNo")}>
                                        <div className="d-flex align-items-center">
                                            Ticket No {renderSortingIcon("TicketNo")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("AgencyName")}>
                                        <div className="d-flex align-items-center">
                                            Agency Name {renderSortingIcon("AgencyName")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("Category")}>
                                        <div className="d-flex align-items-center">
                                            Category {renderSortingIcon("Category")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("SubCategory")}>
                                        <div className="d-flex align-items-center">
                                            Sub Category {renderSortingIcon("SubCategory")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("Description")}>
                                        <div className="d-flex align-items-center">
                                            Description {renderSortingIcon("Description")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("Image")}>
                                        <div className="d-flex align-items-center">
                                            Image {renderSortingIcon("Image")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("TicketStatus")}>
                                        <div className="d-flex align-items-center">
                                            Ticket Status {renderSortingIcon("TicketStatus")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("TicketPriority")}>
                                        <div className="d-flex align-items-center">
                                            Ticket Priority {renderSortingIcon("TicketPriority")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("AssignedTo")}>
                                        <div className="d-flex align-items-center">
                                            Assigned To {renderSortingIcon("AssignedTo")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("CreatedDate")}>
                                        <div className="d-flex align-items-center">
                                            Created Date {renderSortingIcon("CreatedDate")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("UnreadMessage")}>
                                        <div className="d-flex align-items-center">
                                            Unread Message {renderSortingIcon("UnreadMessage")}
                                        </div>
                                    </th>
                                    <th scope="col">
                                        <div className="d-flex align-items-center">
                                            Action {SVGICON.sortIcon}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <h5 className="table_desc">{item.TicketNo}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.AgencyName}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.Category}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.SubCategory}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.Description}</h5>
                                        </td>
                                        <td>
                                            <img
                                                src={item.Image}
                                                alt="dummy"
                                                className="img-fluid table-img"
                                            />
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.TicketStatus}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.TicketPriority}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.AssignedTo}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.CreatedDate}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.UnreadMessage}</h5>
                                        </td>
                                        <td>
                                            <div className="table_icons">
                                                <button type="button" className="table-btn me-3">
                                                    {SVGICON.editSvg}
                                                </button>
                                                <button type="button" className="table-btn">
                                                    {SVGICON.deleteSvg}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="open-ticket-pagination">
                    <h5 className="pagination-text">
                        {indexOfFirstItem + 1} -{" "}
                        {Math.min(indexOfLastItem, sortedData.length)} of{" "}
                        {sortedData.length} items
                    </h5>
                    <nav>
                        <ul className="pagination">
                            {Array.from(
                                { length: Math.ceil(sortedData.length / itemsPerPage) },
                                (_, i) => (
                                    <li
                                        key={i}
                                        className={`pagination-link ${currentPage === i + 1 ? "active" : ""
                                            }`}
                                    >
                                        <button
                                            onClick={() => paginate(i + 1)}
                                            className="pagination-btn"
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                )
                            )}
                        </ul>
                    </nav>
                </div>
            </section>
            <SupportCanvas
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
            />
        </>
    );
};

export default Support;