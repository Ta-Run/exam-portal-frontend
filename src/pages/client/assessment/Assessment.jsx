import React, { useState } from "react";
import "./Assessment.scss";
import { SVGICON } from "../../../constants/IconList";
import { AssessmentData } from "../../../constants/DataList";
import Header from "../../../components/header/admin/Header";

const Assessment = () => {

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
    const sortedData = [...AssessmentData].sort((a, b) => {
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
            <Header name="Assessment" />
            <section className="batch-upload-section">
                <div className="batch-upload-add-main">
                    <div className="batch-upload-header">
                        <button type="button" className="management-upload-btn me-3" onClick={handleShow}>
                            {SVGICON.uploadSvg} Bulk Upload
                        </button>
                        <button type="button" className="management-download-btn">
                            {SVGICON.downloadSvg} Download Template
                        </button>
                    </div>
                    <hr />
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            <div className="sector-selector">
                                <label htmlFor="sectorType" className="form-label mb-2">
                                    State
                                </label>
                                <select className="form-select">
                                    <option value="1">Please Select</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="sector-selector ms-lg-4 ms-0 mt-lg-0 mt-4">
                                <label htmlFor="jobRole" className="form-label mb-2">
                                    District
                                </label>
                                <select className="form-select">
                                    <option value="1">Please Select</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-6">
                            <button type="button" className="delete-btn me-3">
                                Delete
                            </button>
                            <button type="button" className="move-btn">
                                Move
                            </button>
                        </div>
                    </div>
                </div>
                <div className="batch-upload-body">
                    <div className="batch-upload-filters">
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
                </div>
                <div className="batch-upload-table">
                    <div className="table-responsive">
                        <table className="table content-table">
                            <thead>
                                <tr>
                                    <th scope="col" onClick={() => handleSort("BatchID")}>
                                        <div className="d-flex align-items-center">
                                            Batch ID {renderSortingIcon("BatchID")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("BatchName")}>
                                        <div className="d-flex align-items-center">
                                            Batch Name {renderSortingIcon("BatchName")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("TPName")}>
                                        <div className="d-flex align-items-center">
                                            TPName {renderSortingIcon("TPName")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("TCenter")}>
                                        <div className="d-flex align-items-center">
                                            TCenter {renderSortingIcon("TCenter")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("ToAssessmentDate")}>
                                        <div className="d-flex align-items-center">
                                            To Assessment Date {renderSortingIcon("ToAssessmentDate")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("StartTime")}>
                                        <div className="d-flex align-items-center">
                                            Start Time {renderSortingIcon("StartTime")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("EndTime")}>
                                        <div className="d-flex align-items-center">
                                            End Time {renderSortingIcon("EndTime")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("TotalCandidate")}>
                                        <div className="d-flex align-items-center">
                                            Total Candidate {renderSortingIcon("TotalCandidate")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("EnablePhoto")}>
                                        <div className="d-flex align-items-center">
                                            Enable Photo {renderSortingIcon("EnablePhoto")}
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort("EnableVideo")}>
                                        <div className="d-flex align-items-center">
                                            Enable Video {renderSortingIcon("EnableVideo")}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <h5 className="table_desc">{item.BatchID}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.BatchName}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.TPName}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.TCenter}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.ToAssessmentDate}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.StartTime}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.EndTime}</h5>
                                        </td>
                                        <td>
                                            <h5 className="table_desc">{item.TotalCandidate}</h5>
                                        </td>
                                        <td>
                                            <img
                                                src={item.EnablePhoto}
                                                alt="dummy"
                                                className="img-fluid table-img"
                                            />
                                        </td>
                                        <td>
                                            <img
                                                src={item.EnableVideo}
                                                alt="dummy"
                                                className="img-fluid table-img"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="batch-upload-pagination">
                    <h5 className="pagination-text">
                        {indexOfFirstItem + 1} -{" "}
                        {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length}{" "}
                        items
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
                    {/* <h5 className="pagination-text">1 - 10 of 11 items</h5>
          <button className="pagination-btn-active">1</button>
          <button className="pagination-btn">2</button> */}
                </div>
            </section>
            {/* <AssessmentCanvas
                show={show} handleClose={handleClose} handleShow={handleShow}
            /> */}
        </>
    );
};

export default Assessment;
