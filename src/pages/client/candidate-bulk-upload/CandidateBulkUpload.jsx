import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import { SVGICON } from "../../../constants/IconList";
import { reqToDeleteClientCandidateBulkUpload, reqToGetClientCandidateBulkUpload, reqToMoveClientCandidateBulkUpload } from "../../../reduxToolkit/services/userManagementServices";
import { reqToGetBatchDropDown, reqToGetClientJobRoleDropDown, reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";
import { candidateBulkUploadHeader } from "../../../constants/header";

import Header from "../../../components/header/admin/Header";
import AddCandidate from "../../../components/offcanvas/candidate-bulk-upload/AddCandidate";
import BulkUpload from "../../../components/modal/client/candidate-bulk-upload/BulkUpload";
import TableComponent from "./TableComponent";
import Pagination from "../../../components/pagination/Pagination";
import Loader from "../../../components/loader/Loader";
import usePagination from "../../../hooks/usePagination";
import TopSearchBar from "../../../components/top-search-bar/TopSearchBar";
import DataNoFound from "../../../components/data-no-found/DataNoFound";

const CandidateBulkUpload = () => {

  const dispatch = useDispatch();

  // Selectors
  const { loader, clientCandidateBulk, clientCandidateBulkPagination } = useSelector((state) => state.userManagement);
  const { sectorDropDown, clientJobRoleDropDown, clientBatchDropDown } = useSelector((state) => state.contentManagement);

  // States
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState({ show: false });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Custom hooks
  const { currentPage, itemsPerPage, setItemsPerPage, paginate } = usePagination();

  // handleSelectAll
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allIds = clientCandidateBulk.map(item => item._id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  }

  // handleSelectItem
  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((item) => item !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  }

  // handleClose
  const handleClose = () => setShow(false);
  // handleShow
  const handleShow = () => setShow(true);

  // handleModalShow
  const handleModalShow = (type) => {
    setModalShow({ ...modalShow, [type]: true });
  };

  // handleModalClose
  const handleModalClose = () => {
    setModalShow({ show: false });
  };

  // handleGetCandidate
  const handleGetCandidate = async () => {
    await dispatch(reqToGetClientCandidateBulkUpload({ page: currentPage, limit: itemsPerPage }));
  }

  // handleCandidateDelete
  const handleCandidateDelete = async () => {
    if (selectedItems?.length > 0) {
      await dispatch(reqToDeleteClientCandidateBulkUpload(selectedItems));
      handleGetCandidate();
      setSelectedItems([]);
    }
  }

  // handleCandidateMove
  const handleCandidateMove = async () => {
    if (selectedItems?.length > 0) {
      await dispatch(reqToMoveClientCandidateBulkUpload(selectedItems));
      handleGetCandidate();
      setSelectedItems([]);
    }
  }

  // Filter Data
  const filterData = useMemo(() => clientCandidateBulk?.filter((item) => {
    return (
      item?._id?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.CandidateName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.EnrollmentNumber?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.FatherName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.Email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.Gender?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
  }), [clientCandidateBulk, searchTerm]);

  // Get Candidate Bulk Upload Data
  useEffect(() => {
    handleGetCandidate();
  }, [currentPage, itemsPerPage]);

  // Get Sector & Job Role Dropdown
  useEffect(() => {
    dispatch(reqToGetSectorDropDown());
    dispatch(reqToGetClientJobRoleDropDown());
    dispatch(reqToGetBatchDropDown());
  }, []);

  useEffect(() => {
    if (selectedItems?.length === filterData?.length && selectedItems?.length !== 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedItems, filterData]);

  return (
    <>
      {loader && <Loader />}
      <Header name="User Management" />
      <section className="batch-upload-section">
        <h2 className="manage-question-title">Manage Candidate Bulk Upload</h2>
        <div className="batch-upload-add-main">
          <div className="batch-upload-header">
            <button
              type="button"
              className="management-upload-btn"
              onClick={() => handleModalShow("show")}
            >
              + Add New
            </button>
            <button
              type="button"
              className="management-upload-btn mx-3"
              onClick={handleShow}
            >
              {SVGICON.uploadSvg} Bulk Upload
            </button>
            <CSVLink
              data={filterData || []}
              headers={candidateBulkUploadHeader}
              filename="candidate.csv"
            >
              <button type="button" className="management-download-btn">
                {SVGICON.downloadSvg} Download Template
              </button>
            </CSVLink>
          </div>
          <hr />
          <div className="row align-items-end">
            <div className="col-lg-3 mb-lg-0 mb-4">
              <div className="sector-selector">
                <label htmlFor="sectorType" className="form-label mb-2">
                  Sector
                </label>
                <select className="form-select" name="sector">
                  <option value="">All</option>
                  {sectorDropDown?.map((item) => {
                    return (
                      <option value={item?._id} key={item?._id}>
                        {item?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-lg-3 mb-lg-0 mb-4">
              <div className="sector-selector">
                <label htmlFor="jobRole" className="form-label mb-2">
                  Job Role
                </label>
                <select className="form-select" name="job_Role">
                  <option value="">All</option>
                  {
                    clientJobRoleDropDown?.map((item) => {
                      return (
                        <option value={item?._id} key={item?._id}>{item?.jobRoleName}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="col-lg-3 mb-lg-0 mb-4">
              <div className="sector-selector">
                <label htmlFor="jobRole" className="form-label mb-2">
                  Batch
                </label>
                <select className="form-select" name="Batch">
                  <option value="">All</option>
                  {
                    clientBatchDropDown?.map((item) => {
                      return (
                        <option value={item?._id} key={item?._id}>{item?.BatchCode}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="col-lg-3">
              <button type="button" className="delete-btn me-3" onClick={handleCandidateDelete}>
                Delete
              </button>
              <button type="button" className="move-btn" onClick={handleCandidateMove}>
                Move
              </button>
            </div>
          </div>
        </div>
        <div className="batch-upload-body">
          <div className="batch-upload-filters">
            <TopSearchBar
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>
        <div className="batch-upload-table">
          <div className="table-responsive">
            <TableComponent
              filterData={filterData}
              handleModalShow={handleModalShow}
              selectAll={selectAll}
              handleSelectAll={handleSelectAll}
              selectedItems={selectedItems}
              handleSelectItem={handleSelectItem}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          </div>
          {filterData?.length === 0 && <DataNoFound />}
        </div>
        {filterData?.length > 0 && (
          <Pagination
            pagination={clientCandidateBulkPagination}
            filterData={filterData}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </section>
      {/* Modal */}
      <BulkUpload show={show} handleClose={handleClose} handleGetCandidate={handleGetCandidate} />
      {/* Add Candidate */}
      <AddCandidate show={modalShow.show} handleClose={handleModalClose} handleGetCandidate={handleGetCandidate} clientBatchDropDown={clientBatchDropDown} />
    </>
  );
};

export default CandidateBulkUpload;